#!/usr/bin/env python3
"""国語ユニット（俳句）のヒント3層＋データモデルの規律を機械チェックする監査ツール。

正典: 推理式指導読方MVP仕様書（国語版第3弾）§8.2。数学版 audit_hints.py を鏡としつつ、
国語固有の規則（技法名の先出し・代筆検出・模範解答フィールドの不在・観点セルフチェックの
位置・出典）を加える。報告専用（CI 化しない・development-loop の方針）。

使い方:
    python3 scripts/audit_hints_kokugo.py

検出規則（§8.2）:
  1. L1/L2 の禁止パターン：技法名の先出し（季語・切れ字・オノマトペ・字余り・自由律・本歌取 等が
     L1/L2 のヒント本文に出る）／指示調（「〜と書きましょう」「〜を使いましょう」）。
     ※問題文（questionText）には技法名が出てよい。検査対象はヒント本文のみ（§12.4-4 偽陽性回避）。
  2. L3 の代筆検出：creation step の L3 に「完成作品の提示形（かぎかっこ引用の中の長いかな連続／
     ／で行を区切ったかな列）」が含まれていないか（moraCount 相当を Python 実装して機械検出）。
     mentorTexts.ts に登録済みの模範文（reading／十分に長い text 由来のかな列）はホワイトリストで
     除外する——模範文側の行を引いて作り方を指さすのは適法だから（handoff §3-1・T-3）。
  3. データモデル検査：creation step に模範解答フィールド（answer/answerIndex/answerOrder）が無いか／
     観点セルフチェック（selfChecklist）が最初の読み比べ（comparison）step より前に出ていないか（G1）。
  4. オペレータ網羅：5オペレータ（同・逆・＋α・質的変化・複合）最低1 step（数学版の検査を流用）。
  5. 出典検査：MentorText 全件に sourceNote と rights があるか（G12）。
"""
import re
import os
import sys
import glob
import unicodedata
import tempfile

LIB = os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "lib")
SERIES_GLOB = os.environ.get("KOKUGO_SERIES_GLOB", os.path.join(LIB, "seriesKokugo*.ts"))
MENTOR_FILE = os.environ.get("KOKUGO_MENTOR_FILE", os.path.join(LIB, "mentorTexts.ts"))

# ── ヒント抽出（数学版と同形式）──────────────────────────────
HINT = re.compile(r"layer:\s*([123])\s*,\s*\n?\s*text:\s*\n?\s*\"((?:[^\"\\]|\\.)*)\"")
COMPARE = re.compile(
    r"(前題|前の句|前の問題|前と|さっき|これまで|くらべ|比べ|何が同じ|どこが同じ|"
    r"何が違|どこが違|step|どう変わ|そのまま|同じ)"
)
QUESTION = re.compile(r"(だろう|どうな|かな|？|\?|どこ|どっち|何を|どんな|いくつ|見えて)")

# L1/L2 に出してはいけない技法名（先出し禁止・G1/§8.2-1）
# 後半は自由詩ジャンルの技法名（docs/自由詩背骨_kokugo.md の言い換え語彙表。
# 改行→「切るところ」「行のかわり目」／感想語→「気持ちのことば」／描写→「見たままを置く」／
# スローモーション→「ゆっくり見せる」／散文→「ふつうの文」）。
# 末尾はお話（散文）ジャンルの技法名（docs/ファージョン背骨_kokugo.md の言い換え語彙表。
# 仮説→「もし」／一貫→「筋を通す」「うそはひとつだけ」／伏線→「先に見せておく」／
# 反転・破調→「形を破る」「さいごの一回だけ変える」／比喩→「物の名前で言う」／
# あらすじ→「みじかく戻した話」）。既存の俳句・自由詩の L1/L2 に偽陽性が無いことを
# 確認して追加（2026-08-19）。
# さらに末尾は日記（生活文）ジャンルの技法名（docs/日記背骨_kokugo.md の言い換え語彙表。
# 時系列・順序→「おきたじゅん」「ました、ました、と」／羅列・要約→「まとめて書く」
# 「〜とか〜とかで書く」／会話文・かぎかっこ→「言ったことをそのまま書く」（※「」の記号
# 自体は子どもの語彙なので可）／描写の密度・省略→「すきま」「時間がとぶ」／擬音語→
# 「音のことば」／内言→「心の中のことば」）。既存の俳句・自由詩・お話の L1/L2 に偽陽性が
# 無いことを確認して追加（2026-08-19）。
# ※「スローモーション」は日記の言い換え語彙表では「先生の教室のことばなのでそのまま可」
#   だが、自由詩ジャンルの技法名として既に登録済みなので、検出語彙は動かさず、日記側の
#   L1/L2 で使わない運用にした（問題文・L3 では使ってよい）。
# さらに末尾は目で見て楽しむ詩（視覚詩）ジャンルの技法名（docs/視覚詩背骨_kokugo.md の
# 言い換え語彙表。視覚詩・具体詩→「目で見て楽しむ詩」（先生の教室のことば。問題文でも
# L1/L2 でも使ってよい言い換えの側）／タイポグラフィ・字形→「文字のすがた」／
# 配置・レイアウト→「ならべ方」「おきば」／反復→「くりかえし」／差異・コントラスト→
# 「一つだけちがう」／種明かし・オチ→「さいごの一行」）。既存の俳句・自由詩・お話・
# 日記の L1/L2 に偽陽性が無いことを確認して追加（2026-08-20）。
# さらに末尾はなぞなぞ詩ジャンルの技法名（docs/なぞなぞ詩背骨_kokugo.md の言い換え語彙表。
# 比喩・ひゆ→「たとえ」「にたものの名前」「〜に見える、の言い方」／見立て→「なにに見えるか」／
# 抽象・象徴→「形をこえる」「心のたとえ」）。「比喩」はお話ジャンルで登録済みなので、
# ここで足すのは かな表記の「ひゆ」・「見立て」・「象徴」の3語（※言い換え語の「たとえ」は
# 検出しない——L1/L2 で使ってよい子どもの語彙だから）。既存の俳句・自由詩・お話・日記・
# 視覚詩の L1/L2 に偽陽性が無いことを確認して追加（2026-08-20）。
# さらに末尾は一口お笑い（脚韻）ジャンルの技法名（docs/一口お笑い背骨_kokugo.md の
# 言い換え語彙表。脚韻・韻→「行のおわりの音」「そろえる音」／自己言及→「じぶんに
# 返ってくる」）。「押韻」は登録済みなので、ここで足すのは「脚韻」1語。
# **「オチ」は入れない**——子どものお笑いの語彙として問題文・L2 で使ってよい、と
# 先生が裁定した審査済みの例外（2026-08-21）。「韻」の単字も入れない（「押韻」「脚韻」で
# 十分で、単字は将来の地の文に誤爆しやすいため）。既存の俳句・自由詩・お話・日記・
# 視覚詩・なぞなぞ詩の L1/L2 に偽陽性が無いことを確認して追加（2026-08-21）。
# さらに末尾は「〜のゆめ（イメージ遊び）」ジャンルの技法名（docs/ゆめ対比背骨_kokugo.md の
# 言い換え語彙表。対比→「あべこべ」「うらがえし」／擬人化・なりきり→「そのものになる」
# 「◯◎の目で」／反転→「うらがえす」／願望・ねがい→「ほんとうは、こうしたい」）。
# 「反転」はお話ジャンルで、「擬人」（＝擬人化を含む）はなぞなぞ詩の追加時に登録済みなので、
# ここで実際に足すのは「対比」1語（3語とも検出されることは確認済み）。「ゆめ」「あのね」
# 「うらがえし」「あべこべ」は子どもの語彙なので入れない。既存10系列の L1/L2 に偽陽性が
# 無いことを確認して追加（2026-08-21）。
# さらに末尾は「ようすことばのかけ合い（オノマトペ）」ジャンルの技法名
# （docs/オノマトペ背骨_kokugo.md の言い換え語彙表。オノマトペ・擬音語・擬態語→
# 「ようすことば」「音のことば」（※「ようすことば」は白谷本・教室の語なので問題文でも
# L1/L2 でも使ってよい言い換えの側）／群読→「みんなで読む」「かけ合い」／
# 地の文→「せつめいのことば」「せつめいの行」／反復→「くりかえし」）。
# 「オノマトペ」は登録済みなので、ここで足すのは「擬音」（＝擬音語を含む・既存の
# 「擬音語」を包む）・「擬態」・「反復」・「群読」・「地の文」の5語。
# 既存11系列の L1/L2 に偽陽性が無いことを確認して追加（2026-08-22）。
# さらに末尾は「6つのへやの詩（くりかえし）」ジャンルの技法名
# （docs/六つのへや背骨_kokugo.md の言い換え語彙表。反復・反復法→「くりかえし」／
# 強調→「つよくなる」「こく見える」／推敲→「書き直し」「みがき」。※「くりかえし」
# 「キーワード」「へや」はワークシートの語＝問題文でも L1/L2 でも使ってよい言い換えの側）。
# 「反復」「比喩」「対比」は登録済みなので、ここで足すのは「強調」「推敲」の2語。
# 既存12系列の L1/L2 に偽陽性が無いことを確認して追加（2026-08-22）。
# さらに末尾は随筆（エッセイ）ジャンルの技法名
# （docs/見つけたこと背骨_kokugo.md の言い換え語彙表。考察→「考えの一歩」「考えたこと」／
# 観察→「よく見る」「見つける」／抽象・具体→使わない。※「随筆（ずいひつ）」「事実」
# 「考え」「見つけた」は問題文でも L1/L2 でも使ってよい教室語＝ジャンル名であって
# 技法名ではないので検出しない）。ここで足すのは「考察」「教訓」「主題」の3語
# （背骨の禁止語のうち「抽象」は、なぞなぞ詩の追加時に「象徴」とセットで運用側の
# 禁止に回してあるので検出語彙は動かさない）。「教訓」はお話系列の L3・作家の風景に
# 出るが、GIHOU の検査対象は L1/L2 だけなので偽陽性にならない——既存13系列の L1/L2 に
# 偽陽性が無いことを実測で確認して追加（2026-08-22）。
# さらに末尾は「二つのことばが出会うと（ファンタジーの二項式）」ジャンルの技法名
# （docs/二項式背骨_kokugo.md の言い換え語彙表。二項式→「二つのことばの出会い」
# 「お話のタネ」／仮定→「もし〜だったら」／設定→「ふしぎなきまり」／誇張→
# 「うんと大きくする」。※「タネ」「もし」「ふしぎなきまり」は問題文でも L1/L2 でも
# 使ってよい言い換えの側）。ここで足すのは「二項式」「仮定」「発想法」の3語。
# 「仮定」は問題文・L3 の「もし〜だったら」の説明と衝突しうるので、追加前に既存14系列
# ＋新規系列の L1/L2 を grep して 0 件（偽陽性なし）を実測で確認した（2026-08-22）。
# 「設定」「誇張」は入れない——「設定」は先生検収済みの Step4 問題文に出る語で、
# GIHOU の検査対象は L1/L2 だけとはいえ、教室語として今後 L2 に出る可能性を残す。
# さらに末尾は「好きリスト」ジャンルの技法名
# （docs/好きリスト背骨_kokugo.md の言い換え語彙表。列挙→「ならべる」／単調→
# 「おなじ言い方ばかり」／推敲→「書き直し」。※「リスト」は系列名の教室語＝問題文でも
# L1/L2 でも使ってよい言い換えの側なので検出しない。「行末」は詩系列④で導入済みの語で、
# L1/L2 では「行のおわり」を使う運用）。「推敲」は⑦の追加時に登録済みなので、
# ここで足すのは「列挙」「単調」の2語。既存16系列の L1/L2 に偽陽性が無いことを
# 実測で確認して追加（2026-08-22）。
# さらに末尾は「物語の書き換え（パロディ作文）」ジャンルの技法名
# （docs/パロディ背骨_kokugo.md の言い換え語彙表。構成・構造→「入れ物」「かたち」「骨」／
# パロディ→「書き換え」／6W1H→「人・とき・場所・道具」／機能→「骨」。※「骨」「図鑑」
# 「書き換え」は教室語＝問題文でも L1/L2 でも使ってよい言い換えの側なので検出しない）。
# ここで足すのは「構成」「構造」「パロディ」「プロップ」「機能」の5語。**「構成」「機能」は
# 一般語なので誤爆しやすい**——追加前に、既存17系列＋新規系列③の L1/L2（計340本）を
# 5語それぞれで grep して 0 件（偽陽性なし）を実測で確認した（2026-08-23）。
# さらに末尾は「登場人物のせっていカード（べファーナの分析）」ジャンルの技法名
# （docs/べファーナ背骨_kokugo.md の言い換え語彙表。因子・基本因子→「せってい」
# 「せっていのパーツ」／分析→「分けてならべる」「カードに分ける」／ギャップ→「じつは」／
# キャラクター・キャラ設定→「登場人物」「人物」。※「せってい」「カード」「じつは」
# 「ストーリー」は教室語＝問題文でも L1/L2 でも使ってよい言い換えの側なので検出しない）。
# ここで足すのは「因子」「キャラ設定」の2語。**「分析」「ギャップ」は入れない**——
# どちらも一般語性が高く、将来の地の文（「〜のギャップ」等）に誤爆しやすいため、
# 検出語彙に載せず運用側の禁止に回す（L1/L2 の遵守は目視＋新系列 grep で確認する）。
# 追加前に、既存19系列＋新規系列⑤の L1/L2（計380本）を4語それぞれで grep して
# 0 件（偽陽性なし）を実測で確認した（2026-08-26）。
# さらに末尾は随筆③「その場にいるように（「」と（　））」ジャンルの技法名
# （docs/その場にいるように背骨_kokugo.md の言い換え語彙表。会話文→「声に出たことば」
# 「言ったことをそのまま書く」／内言→「心の中のことば」／描写→「したとおり・見たとおりに
# 書く」／臨場感→「その場にいるみたい」。※記号そのもの「」（　）は子どもの語彙なので
# 検出しない）。4語のうち「会話文」「内言」「描写」は日記ジャンルの追加時に登録済みなので、
# ここで足すのは「臨場感」1語だけ。**「かぎかっこ」も登録済み**なので、随筆③の L1/L2 では
# 「かぎかっこ」という語を使わず記号「」を直に書く運用にした（問題文・L3 では使ってよい）。
# 追加前に、既存20系列＋新規系列③の L1/L2（計420本）を4語それぞれで grep して
# 0 件（偽陽性なし）を実測で確認した（2026-08-26）。
# さらに末尾は随筆④「ゆれうごく心」ジャンルの技法名
# （docs/ゆれうごく心背骨_kokugo.md の言い換え語彙表。葛藤→「ゆれ」「行ったり来たり」／
# 心情・心理描写→「心のうごき」「心のゆれ」／省筆・余韻→「気持ちを書かない一文」
# 「書かないでつたえる」／因果・関連づけ→「どの出来事から生まれたか」「つながっているか」。
# ※「（　）」の記号そのものは子どもの語彙なので検出しない）。「描写」は日記ジャンルの
# 追加時に登録済みなので、ここで足すのは「葛藤」「心情」「余韻」の3語。**「省筆」は
# 入れない**——「省略」が登録済みで、この語自体は教材の地の文に出ないため。
# 追加前に、既存21系列＋新規系列④の L1/L2（計440本）を4語それぞれで grep して
# 0 件（偽陽性なし）を実測で確認した（2026-08-27）。
# さらに末尾は日記③「思ったことを思ったまま書く」ジャンルの技法名
# （docs/思ったまま背骨_kokugo.md の言い換え語彙表。内言→「心の中のことば」「心の声」／
# 挿入→「文のとちゅうに挟む」／独立文→「一つの文として立つ」／推敲→「書き直し」「けす」／
# 自由間接話法・直叙→使わない・「思ったまま書く」（系列名＝教室語）。
# ※「（　）」の記号そのものと「思ったまま」は子どもの語彙／教室語なので検出しない）。
# 「内言」「推敲」は登録済みなので、ここで足すのは「話法」「挿入」「独立文」の3語。
# **「地の文」は既に登録済み**なので、日記③の L1/L2 では「まわりの文」「出来事の文」と
# 言う運用にした（問題文・L3 では使ってよい）。
# 追加前に、既存22系列＋新規系列③の L1/L2（計460本）を、この3語＋既存の関連語
# （推敲・内言・地の文・省略・描写・会話文・かぎかっこ・切れ）で grep して
# 0 件（偽陽性なし）を実測で確認した（2026-08-27）。
GIHOU = re.compile(
    r"(季語|切れ字|切れ(?!い)|オノマトペ|字余り|字足らず|自由律|本歌取|押韻|脚韻|体言止め"
    r"|行分け|改行|散文|自由詩|描写|感想語|スローモーション"
    r"|仮説|一貫|伏線|反転|破調|比喩|擬人|寓話|起承転結|あらすじ"
    r"|時系列|要約|羅列|会話文|かぎかっこ|擬音|内言|省略"
    r"|視覚詩|具体詩|タイポグラフィ|レイアウト|コントラスト"
    r"|ひゆ|見立て|象徴|対比"
    r"|擬態|反復|群読|地の文"
    r"|強調|推敲"
    r"|考察|教訓|主題"
    r"|二項式|仮定|発想法"
    r"|列挙|単調"
    r"|構成|構造|パロディ|プロップ|機能"
    r"|因子|キャラ設定"
    r"|臨場感"
    r"|葛藤|心情|余韻"
    r"|話法|挿入|独立文)"
)
# 指示調（代筆・お手本を押しつける言い方）
SHIJI = re.compile(r"(と書きましょう|を使いましょう|と書こう|にしましょう|しなさい)")
# 計算・数式（数学版流用。国語では基本出ないが念のため）
CALC = re.compile(r"[0-9０-９]\s*[×÷\+\-=＝*/]\s*[0-9０-９]|→|√|\\sqrt|\\frac")

OPERATOR = re.compile(r'variationFromPrevious:\s*"(\w+)"')
REQUIRED_OPS = {"same", "inverse", "plus_alpha", "qualitative", "composite"}
OP_JP = {"same": "同", "inverse": "逆", "plus_alpha": "＋α", "qualitative": "質的変化", "composite": "複合"}

KANA = re.compile(r"[ぁ-ゖァ-ヺー]+")
# 作品の提示形（かぎかっこ引用）。代筆検出はこの中のかな連続だけを見る。
QUOTED = re.compile(r"[「『]([^」』]*)[」』]")
KANA_PHRASE = re.compile(r"[ぁ-ゖァ-ヺー][ぁ-ゖァ-ヺー\s　／/・、。,.，．「」『』（）()$0-9０-９\\-]*[ぁ-ゖァ-ヺー]")
SMALL = set("ぁぃぅぇぉゃゅょゎゕゖァィゥェォャュョヮヵヶ")
SERIES = re.compile(r"export\s+const\s+\w+\s*:\s*KokugoSeries\s*=\s*{")
MENTOR_ID = re.compile(r'\bid:\s*"([a-z0-9_]+)"')


def count_mora(kana):
    """moraCount.ts と同じ規則（小書き=0、促音・撥音・長音=1）。"""
    n = 0
    for ch in unicodedata.normalize("NFKC", kana):
        if ch in SMALL:
            continue
        if ("ぁ" <= ch <= "ゖ") or ("ァ" <= ch <= "ヺ") or ch == "ー":
            n += 1
    return n


def l1_violation(t):
    """L1 が比較指さし/Socratic でない、または計算・技法名を含む → 違反。"""
    return bool(CALC.search(t) or GIHOU.search(t) or not (COMPARE.search(t) or QUESTION.search(t)))


def split_steps(src):
    """steps 配列を step ごとの (id, block) に分割。"""
    idxs = [m.start() for m in re.finditer(r'\bid:\s*"step\d+"', src)]
    idxs.append(len(src))
    out = []
    for i in range(len(idxs) - 1):
        block = src[idxs[i]:idxs[i + 1]]
        m = re.search(r'id:\s*"(step\d+)"', block)
        out.append((m.group(1), block))
    return out


def extract_object(src, open_brace):
    """open_brace 位置の { ... } を、文字列内の波括弧を無視して切り出す。"""
    depth = 0
    quote = None
    escaped = False
    for i in range(open_brace, len(src)):
        ch = src[i]
        if quote:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == quote:
                quote = None
            continue
        if ch in ('"', "'", "`"):
            quote = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return src[open_brace:i + 1]
    return src[open_brace:]


def split_series(src):
    """KokugoSeries 定義を (series_id, block) に分割。"""
    out = []
    for m in SERIES.finditer(src):
        open_brace = src.find("{", m.start())
        block = extract_object(src, open_brace)
        sid = extract_string_field(block, "id") or "unknown_series"
        out.append((sid, block))
    return out


def extract_string_field(block, field):
    m = re.search(rf"\b{re.escape(field)}\s*:\s*\"((?:[^\"\\]|\\.)*)\"", block, re.S)
    if not m:
        return None
    return (
        m.group(1)
        .replace(r"\"", '"')
        .replace(r"\\", "\\")
        .replace(r"\n", "\n")
    )


def extract_string_array(block, field):
    m = re.search(rf"\b{re.escape(field)}\s*:\s*\[([^\]]*)\]", block, re.S)
    if not m:
        return []
    return re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))


def normalize_kana_text(text):
    return "".join(KANA.findall(unicodedata.normalize("NFKC", text)))


def is_whitelisted_kana_phrase(phrase, mentor_kana):
    """L3 のかな連続が模範文（mentorTexts 登録済み）の引用なら代筆でない。

    G10 が禁じるのは「学習者の作品を AI が書いてしまう」こと。模範文側の行を
    引いて作り方を指さすのは適法（handoff §3-1・T-3 の reading ホワイトリスト）。
    自由詩の模範文はかな書きの複数行なので、reading だけでなく text 由来の
    かな列も照合対象にする（十分に長いものだけ＝短い断片で誤って免罪しない）。
    """
    kana = normalize_kana_text(phrase)
    if not kana:
        return False
    return any(kana in known or known in kana for known in mentor_kana)


# text 由来のかな列をホワイトリストに載せる下限（代筆検出の閾値と同じ 12 拍）。
# これ未満の断片（漢字まじり俳句から拾えるかな片など）で免罪しないための柵。
TEXT_WHITELIST_MIN_MORA = 12


def mentor_kana_pool(mentor_entries):
    """代筆検出のホワイトリスト（reading 全件＋十分に長い text 由来のかな列）。"""
    pool = []
    for entry in mentor_entries.values():
        reading = entry.get("reading")
        if reading:
            kana = normalize_kana_text(reading)
            if kana:
                pool.append(kana)
        text = entry.get("text")
        if text:
            kana = normalize_kana_text(text)
            if kana and count_mora(kana) >= TEXT_WHITELIST_MIN_MORA:
                pool.append(kana)
    return pool


def load_mentor_entries():
    src = open(MENTOR_FILE, encoding="utf-8").read()
    idxs = [m.start() for m in MENTOR_ID.finditer(src)]
    idxs.append(len(src))
    entries = {}
    for i in range(len(idxs) - 1):
        block = src[idxs[i]:idxs[i + 1]]
        mid = extract_string_field(block, "id")
        if not mid:
            continue
        entries[mid] = {
            "block": block,
            "text": extract_string_field(block, "text"),
            "reading": extract_string_field(block, "reading"),
            # 韻文の器の種別。省略＝俳句（音数検算あり）。"free_verse"＝自由詩。
            "form": extract_string_field(block, "form"),
        }
    return entries


def audit_series_file(path, mentor_entries):
    src = open(path, encoding="utf-8").read()
    problems = []
    stats = {
        "series": 0,
        "steps": 0,
        "hint_triples": 0,
        "l1_bad": 0,
        "mentor_refs": 0,
        "compare_refs": 0,
    }
    mentor_kana = mentor_kana_pool(mentor_entries)

    for series_id, series_block in split_series(src):
        stats["series"] += 1
        steps = split_steps(series_block)
        stats["steps"] += len(steps)
        step_ids = {sid for sid, _ in steps}

        # 完了画面「作家の風景」の「もっと読む」の参照整合（系列直下のフィールド）。
        # 出典・権利判定つきの MentorText からしか読み物を出さないための柵。
        for mid in extract_string_array(series_block, "furtherReadingRefs"):
            if mid not in mentor_entries:
                problems.append(f"❌ {series_id}: furtherReadingRefs に未登録ID（{mid}）")

        # 最初の comparison step の位置（G1 セルフチェック順序の基準）
        first_comparison_pos = None
        for i, (sid, block) in enumerate(steps):
            if re.search(r'kind:\s*"comparison"', block):
                first_comparison_pos = i
                break

        for i, (sid, block) in enumerate(steps):
            label = f"{series_id}:{sid}"
            kind_m = re.search(r'kind:\s*"(\w+)"', block)
            kind = kind_m.group(1) if kind_m else "?"
            hints = [(int(m.group(1)), m.group(2)) for m in HINT.finditer(block)]
            by_layer = {}
            for layer, text in hints:
                by_layer[layer] = text
            if 1 in by_layer:
                stats["hint_triples"] += 1
                if l1_violation(by_layer[1]):
                    stats["l1_bad"] += 1
                    problems.append(f"❌ {label}: L1 が比較指さし/Socratic でない・計算/技法名を含む")
            # 規則1: L1/L2 の技法名・指示調
            for layer in (1, 2):
                t = by_layer.get(layer, "")
                if GIHOU.search(t):
                    problems.append(f"❌ {label}: L{layer} に技法名の先出し（{GIHOU.search(t).group(0)}）")
                if SHIJI.search(t):
                    problems.append(f"❌ {label}: L{layer} に指示調（{SHIJI.search(t).group(0)}）")
            # 参照整合: mentorTextRefs と compareWithStepId
            for mid in extract_string_array(block, "mentorTextRefs"):
                stats["mentor_refs"] += 1
                if mid not in mentor_entries:
                    problems.append(f"❌ {label}: mentorTextRefs に未登録ID（{mid}）")
            cmp_id = extract_string_field(block, "compareWithStepId")
            if cmp_id:
                stats["compare_refs"] += 1
                if cmp_id not in step_ids:
                    problems.append(f"❌ {label}: compareWithStepId が同系列内に存在しない（{cmp_id}）")
            # 規則2・3: creation step の検査
            if kind == "creation":
                # 模範解答フィールドが無いこと
                if re.search(r'\b(answer|answerIndex|answerOrder)\s*:', block):
                    problems.append(f"❌ {label}: creation step に模範解答フィールドが存在（代筆禁止違反）")
                # L3 の代筆検出（長いかな連続／区切り付き完成句形式）
                #
                # 自由詩向けの再較正（docs/自由詩背骨_kokugo.md 技術ゲート3）：
                # 「かな連続12拍以上」を L3 本文の全域に当てると、ひらがな主体で書く
                # 低学年向けの地の文（説明・呼びかけ）に必ず誤爆する。代筆＝「完成した
                # 作品を提示すること」なので、作品の提示形（かぎかっこで引用する／
                # ／で行を区切って並べる）に絞って検出する。地の文に紛れた代筆は
                # G10 の目視検収で守る（handoff §3 の人力リスト）。
                l3 = by_layer.get(3, "")
                for quoted in QUOTED.findall(l3):
                    for run in KANA.findall(quoted):
                        if count_mora(run) >= 12 and not is_whitelisted_kana_phrase(run, mentor_kana):
                            problems.append(
                                f"❌ {label}: L3 に完成句らしい長いかな連続（{run}＝{count_mora(run)}音）＝代筆の疑い"
                            )
                for phrase in KANA_PHRASE.findall(l3):
                    if "／" not in phrase and "/" not in phrase:
                        continue
                    mora = count_mora(phrase)
                    if mora >= 12 and not is_whitelisted_kana_phrase(phrase, mentor_kana):
                        problems.append(
                            f"❌ {label}: L3 に完成句らしい長いかな連続（{phrase}＝{mora}音）＝代筆の疑い"
                        )
            # 規則3: selfChecklist が最初の comparison より前に出ていないか
            if "selfChecklist" in block:
                if first_comparison_pos is None or i < first_comparison_pos:
                    problems.append(f"❌ {label}: 観点セルフチェックが読み比べ(comparison)より前（G1違反）")

        # 規則4: オペレータ網羅（系列単位）
        ops = set(OPERATOR.findall(series_block))
        missing = REQUIRED_OPS - ops
        if missing:
            problems.append(f"⚠ {series_id}: オペレータ欠落: " + "・".join(OP_JP[o] for o in sorted(missing)))

    return stats, problems


def audit_series(mentor_entries):
    all_stats = {
        "files": 0,
        "series": 0,
        "steps": 0,
        "hint_triples": 0,
        "l1_bad": 0,
        "mentor_refs": 0,
        "compare_refs": 0,
    }
    problems = []
    files = sorted(glob.glob(SERIES_GLOB))
    for path in files:
        stats, file_problems = audit_series_file(path, mentor_entries)
        all_stats["files"] += 1
        for key in ("series", "steps", "hint_triples", "l1_bad", "mentor_refs", "compare_refs"):
            all_stats[key] += stats[key]
        problems.extend(file_problems)
    return files, all_stats, problems


def audit_mentor(used_mentor_ids):
    entries = load_mentor_entries()
    problems = []
    reading_mora = {}
    for mid, entry in entries.items():
        block = entry["block"]
        if not re.search(r"sourceNote:\s*\n?\s*\"", block):
            problems.append(f"❌ {mid}: sourceNote が無い（G12）")
        # quoted＝保護中の可能性がある作品の適法な引用（32条・翻訳しての引用は47条の6）。
        # ファージョン条項（docs/ファージョン背骨_kokugo.md §権利規律）で追加した区分。
        if not re.search(r'rights:\s*"(PD|original|licensed|quoted)"', block):
            problems.append(f"❌ {mid}: rights（PD/original/licensed/quoted）が無い（G12）")
        # 自由詩（form: "free_verse"）・お話（form: "prose"）・目で見て楽しむ詩
        # （form: "visual"）は音数の器を持たない＝moraCount 非適用
        # （docs/自由詩背骨_kokugo.md 技術ゲート1・docs/ファージョン背骨_kokugo.md
        # 技術ゲート1・docs/視覚詩背骨_kokugo.md 技術ゲート）。reading は読みの補助
        # として任意で持てるが、音数検算の対象からは外す。
        free_verse = entry.get("form") in ("free_verse", "prose", "visual")
        reading = entry.get("reading")
        if not reading:
            if not free_verse:
                problems.append(f"❌ {mid}: reading が無い（音数検算不可）")
        elif not free_verse:
            mora = count_mora(reading)
            reading_mora[mid] = mora
            if mora <= 0:
                problems.append(f"❌ {mid}: reading の音数が 0（音数検算不可）")
    unused = sorted(set(entries) - used_mentor_ids)
    return entries, reading_mora, unused, problems


def main():
    if "--self-test" in sys.argv:
        return self_test()

    print("# audit_hints_kokugo — 国語ユニット（俳句）の規律チェック\n")
    mentor_entries = load_mentor_entries()
    files, stats, sprob = audit_series(mentor_entries)
    used_mentor_ids = set()
    for path in files:
        src = open(path, encoding="utf-8").read()
        # step の模範文参照に加え、完了画面「作家の風景」の「もっと読む」
        # （series.furtherReadingRefs）も使用扱いにする——読み物として出るので
        # 未使用報告に出さない（未使用の意味＝どこにも出ていない、を保つ）。
        for field in ("mentorTextRefs", "furtherReadingRefs"):
            for refs in re.finditer(rf"\b{field}\s*:\s*\[([^\]]*)\]", src, re.S):
                used_mentor_ids.update(re.findall(r'"((?:[^"\\]|\\.)*)"', refs.group(1)))
    mentor_entries, reading_mora, unused, mprob = audit_mentor(used_mentor_ids)
    print(f"## 系列 {os.path.relpath(SERIES_GLOB, os.getcwd())}")
    print(f"  対象ファイル = {stats['files']}  系列数 = {stats['series']}  step数 = {stats['steps']}")
    print(f"  三層ヒント数 = {stats['hint_triples']}  L1違反 = {stats['l1_bad']}")
    print(f"  mentorTextRefs = {stats['mentor_refs']}  compareWithStepId = {stats['compare_refs']}")
    print(f"## 模範句 mentorTexts.ts")
    print(f"  MentorText 件数 = {len(mentor_entries)}  reading検算 = {len(reading_mora)}  未使用 = {len(unused)}")
    if reading_mora:
        hist = {}
        for mora in reading_mora.values():
            hist[mora] = hist.get(mora, 0) + 1
        summary = " / ".join(f"{mora}音:{hist[mora]}" for mora in sorted(hist))
        print(f"  reading音数分布 = {summary}")
    if unused:
        print(f"  未使用MentorText = {', '.join(unused)}")

    problems = sprob + mprob
    print("\n" + "=" * 52)
    if not problems:
        rate = 100
        print(f"✅ 準拠 100%（L1違反 0・技法名/指示調 0・代筆 0・模範解答フィールド 0・出典欠落 0）")
    else:
        print(f"要修正 {len(problems)} 件:")
        for p in problems:
            print("  " + p)
    return 0 if not problems else 1


def self_test():
    """壊したフィクスチャで主要な検出器が発火することを確認する。"""
    global SERIES_GLOB, MENTOR_FILE
    original_series_glob = SERIES_GLOB
    original_mentor_file = MENTOR_FILE
    with tempfile.TemporaryDirectory() as tmp:
        mentor_path = os.path.join(tmp, "mentorTexts.ts")
        series_path = os.path.join(tmp, "seriesKokugoBroken.ts")
        with open(mentor_path, "w", encoding="utf-8") as f:
            f.write(
                '''
export const HAIKU_MENTOR_TEXTS = [
  {
    id: "known_mentor",
    text: "古池や蛙飛びこむ水の音",
    reading: "ふるいけやかわずとびこむみずのおと",
    sourceNote: "松尾芭蕉（1644-1694）。",
    rights: "PD",
  },
  {
    id: "unused_mentor",
    text: "咳をしても一人",
    reading: "せきをしてもひとり",
    sourceNote: "尾崎放哉（1885-1926）。",
    rights: "PD",
  },
];
'''
            )
        with open(series_path, "w", encoding="utf-8") as f:
            f.write(
                '''
export const BROKEN_SERIES: KokugoSeries = {
  id: "kokugo_broken_01",
  steps: [
    {
      id: "step1",
      kind: "creation",
      mentorTextRefs: ["missing_mentor"],
      input: { answer: "代筆" },
      selfChecklist: ["先に出てしまった観点"],
      hints: [
        { layer: 1, text: "季語を使いましょう" },
        { layer: 2, text: "季語を使いましょう" },
        { layer: 3, text: "「きょうもまたあさのひかりがまどにさした」あさひさす／まどべにひかる／ゆめのあと" },
      ],
      variationFromPrevious: "same",
      compareWithStepId: "missing_step",
    },
  ],
};
'''
            )
        SERIES_GLOB = series_path
        MENTOR_FILE = mentor_path
        mentor_entries = load_mentor_entries()
        _, _, series_problems = audit_series(mentor_entries)
        _, _, unused, mentor_problems = audit_mentor({"missing_mentor"})
        problems = series_problems + mentor_problems
        SERIES_GLOB = original_series_glob
        MENTOR_FILE = original_mentor_file

    expected = [
        "L1 が比較指さし/Socratic でない",
        "技法名の先出し",
        "指示調",
        "mentorTextRefs に未登録ID",
        "compareWithStepId が同系列内に存在しない",
        "creation step に模範解答フィールドが存在",
        "L3 に完成句らしい長いかな連続",
        "観点セルフチェックが読み比べ(comparison)より前",
        "オペレータ欠落",
    ]
    joined = "\n".join(problems)
    missing = [needle for needle in expected if needle not in joined]
    print("# audit_hints_kokugo --self-test")
    print(f"  壊したフィクスチャ検出 = {len(problems)} 件")
    print(f"  未使用MentorText検出 = {len(unused)} 件")
    if missing:
        print("  ❌ 未発火: " + " / ".join(missing))
        for p in problems:
            print("  " + p)
        return 1
    print("  ✅ 主要検出器が発火")
    return 0


if __name__ == "__main__":
    sys.exit(main())
