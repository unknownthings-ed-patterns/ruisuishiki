/**
 * 「ベクトル」ユニットの系列（数Ⅲ・C 第9章）。
 *
 * 背骨設計は docs/math3c_vector_design.md
 * （Fable 5・2026-08-30・岩井裁定 → Round 1 背骨監査〔却下ゼロ〕→ 全件反映 → 凍結）。
 * 系列1（お手本）はメインが実装し、系列2〜13 は並列委譲＋メイン検収（C15）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第9章 ベクトル（旺文社・2024）の
 * 章構成を借り、問題の値・場面はすべてオリジナルに変更（copyright-credit-vs-copy）。
 *
 * ハブ胚細胞（背骨 D1）：
 *   矢印から「向き」と「大きさ」だけを取り出した瞬間、それは場所に縛られない概念になり、
 *   足し算と実数倍について数と同じ性質をもつと確かめられた——だから文字と同じように計算してよい。
 *   そして基準を 2 本（空間なら 3 本）決めれば、どんな点も「数の組」にただ 1 通りに翻訳される。
 *   ひらめきや補助線が要る図形の問題が、手順で解ける式計算に変わる。
 *
 * 入力の折り方（背骨 D2・入力系の拡張は不要＝実運用8例目）：
 * - 順序対（成分・座標・(s,t)）を 1 問で答えさせない。片側ずつ別 step。
 *   同じ連立から出る 2 文字・k と比 k:(1−k) のような「割れない順序対」も別 step に並べない
 * - 大きさは |p|^2 で提出（√ を作らない）。角は特別角の度数か cos の分数。内積は数値そのまま
 * - 判定（同一直線上・垂直・零ベクトル）は k・t・比の値へ
 * - 提出値が「教える結論だけから言えてしまう」step（零ベクトルの大きさ・重心の係数・垂直な内積）を作らない
 */

import type { LearnerSeries } from "./types";

/** M3V1: ベクトルという量（向きと大きさだけを取り出す）。
 *  章の入口。矢印から「向き」と「大きさ」だけを取り出して場所を忘れると、
 *  矢印は数のように足したり何倍かしたりできる「概念」になる——ここを体で渡す。
 *  質的変化 step6 は「等しい」とは位置が同じことではない（向きと大きさが同じなら同じ）。
 *  山場 step10 は a−b の向き（b の終点から a の終点へ）を、格子の 5 組で確かめる。 */
export const M3V_QUANTITY_SERIES: LearnerSeries = {
  id: "math3_vec_quantity_01",
  title: "ベクトルという量（向きと大きさだけを取り出す）",
  subtitle:
    "数Ⅲ・C ベクトルより — 矢印から「向き」と「大きさ」だけを取り出して、置いてある場所を忘れる。タイルの上で数える入口から、$\\vec{a}-\\vec{b}$ の向きを体で確かめる山場まで $10$ 問。",
  patternId: "M3V1",
  unit: "math_3",
  revelationLabel:
    "**「等しい」とは、同じ場所にあることではなかった**。向きと大きさが同じなら、どこに置いてあっても同じ $1$ 本の矢印——位置を忘れた瞬間に、矢印は数のように扱える「概念」になる",
  drivingQuestion:
    "矢印から「向き」と「大きさ」だけを取り出して、**置いてある場所を忘れてしまう**——そうすると、矢印はなぜ**数のように足したり何倍かしたりできる**ようになるのか？ そして「同じ」とは、何が同じことなのか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "平行四辺形のタイルを敷きつめた床があります。タイル $1$ 枚ぶんの $2$ つの辺に沿った矢印を $\\vec{a}$、$\\vec{b}$ とします（図）。\n\n床の上の $2$ 点 P, Q について、P から Q へ向かう矢印 $\\overrightarrow{PQ}$ は、$\\vec{a}$ を何枚ぶんか、$\\vec{b}$ を何枚ぶんかつないだものとして $\\overrightarrow{PQ} = s\\vec{a} + t\\vec{b}$ と書けます。\n\n図を見て、**$s$ の値**を求めましょう。",
      answer: 3,
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "P から Q まで、タイルの辺に沿って歩くとしたら、どんな道順になるだろう？ $\\vec{a}$ の向きに進む歩数と、$\\vec{b}$ の向きに進む歩数は、別々に数えられる？",
        },
        {
          layer: 2,
          text: "見るところは $1$ つだけ——**$\\vec{a}$ の向きに何枚ぶん進んだか**。$\\vec{b}$ の向きの歩数は、今は聞かれていない。斜めのタイルでも、$\\vec{a}$ の辺に沿った枚数だけを数えよう。",
        },
        {
          layer: 3,
          text: "P から Q へは、$\\vec{a}$ の向きに $3$ 枚、$\\vec{b}$ の向きに $2$ 枚進むと着きます。だから $\\overrightarrow{PQ} = 3\\vec{a} + 2\\vec{b}$、つまり $s = 3$。このとき道順は何通りもあって（先に $\\vec{b}$ の向きに $2$ 枚進んでから $\\vec{a}$ の向きに $3$ 枚でも同じ Q に着く）、どの道順でも $\\vec{a}$ は $3$ 枚、$\\vec{b}$ は $2$ 枚です。中心の問いへの最初の部分回答がここ：**矢印は「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」という $2$ つの数で言い表せる**——場所ではなく、進み方で。",
        },
      ],
      formulaPreview: "PQ = 3a + 2b（a の向きに 3 枚・b の向きに 2 枚）",
      figureMarker: "<<M3V_TILE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ床の上で、Q から $\\vec{a}$ の向きに $1$ 枚ぶん**戻り**、さらに $\\vec{b}$ の向きに $5$ 枚ぶん**戻った**点を R とします。\n\n$\\overrightarrow{PR} = s\\vec{a} + t\\vec{b}$ と書くとき、**$t$ の値**を求めましょう。",
      answer: -3,
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は P から Q へまっすぐ数えた。今度は Q からさらに動いた先が R。P から R へ行くのに、前題の道をそのまま使える？ 何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**「戻る」という動きが混じった**こと $1$ つ。$\\vec{b}$ の向きに進むのが $+$ なら、戻るのは何と書けばいい？",
        },
        {
          layer: 3,
          text: "前題で $\\overrightarrow{PQ} = 3\\vec{a} + 2\\vec{b}$ でした。Q から R へは $\\vec{a}$ を $1$ 枚戻り $\\vec{b}$ を $5$ 枚戻るので、$\\overrightarrow{QR} = -\\vec{a} - 5\\vec{b}$（戻るは負の枚数）。P から R へは「P → Q → R」とつなげばよいので、$\\overrightarrow{PR} = \\overrightarrow{PQ} + \\overrightarrow{QR} = (3-1)\\vec{a} + (2-5)\\vec{b} = 2\\vec{a} - 3\\vec{b}$。よって $t = -3$。中心の問いへの部分回答：**矢印をつなぐことは、枚数を足すこと**でした。戻る動きは負の数として、同じ足し算に乗ります。",
        },
      ],
      formulaPreview: "PR = PQ + QR = (3−1)a + (2−5)b = 2a − 3b",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは向きを入れかえます。R から P へ向かう矢印 $\\overrightarrow{RP}$ を $\\overrightarrow{RP} = s\\vec{a} + t\\vec{b}$ と書くとき、**$s$ の値**を求めましょう。",
      answer: -2,
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 点は同じ P と R。違うのは、どちらからどちらへ向かうか。前題の矢印をそのまま使って、今度の矢印を言えないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**始点と終点が入れかわった**こと $1$ つ。P から R へ行く道を、そっくり逆向きにたどると、$\\vec{a}$ の枚数の符号はどうなる？",
        },
        {
          layer: 3,
          text: "前題で $\\overrightarrow{PR} = 2\\vec{a} - 3\\vec{b}$ でした。R から P へは、この道を逆向きにたどればよく、$\\vec{a}$ の向きに $2$ 枚**戻り**、$\\vec{b}$ の向きに $3$ 枚**進む**ので $\\overrightarrow{RP} = -2\\vec{a} + 3\\vec{b}$。よって $s = -2$。始点と終点を入れかえた矢印は、大きさが同じで向きが反対——これを [逆ベクトル] といい、$\\overrightarrow{RP} = -\\overrightarrow{PR}$ と書きます。中心の問いへの部分回答：**向きを反対にすることは、枚数の符号をひっくり返すこと**。矢印の操作が、また $1$ つ数の操作に翻訳されました。",
        },
      ],
      formulaPreview: "RP = −PR = −(2a − 3b) = −2a + 3b",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "床の話から離れて、文字だけで進めます。$2$ つのベクトルを $\\vec{p} = 3\\vec{a} - 2\\vec{b}$、$\\vec{q} = -2\\vec{a} + 5\\vec{b}$ とします。\n\n$2\\vec{p} + 3\\vec{q}$ を $s\\vec{a} + t\\vec{b}$ の形に整理したとき、**$t$ の値**を求めましょう。",
      answer: 11,
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは床の上を歩いて枚数を数えていた。今度は床が無い。それでも、前題までにやった「つなぐ」「何倍かする」は、文字の式の上でそのままできる？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**矢印に名前がついて、何倍かする操作が加わった**こと。$\\vec{p}$ を $2$ 倍するとき、$\\vec{a}$ の枚数と $\\vec{b}$ の枚数は、それぞれどうなる？",
        },
        {
          layer: 3,
          text: "前題までで、矢印をつなぐのは枚数の足し算、向きを反対にするのは符号の反転でした。何倍かするのも同じで、**枚数を何倍かする**だけです。$2\\vec{p} = 6\\vec{a} - 4\\vec{b}$、$3\\vec{q} = -6\\vec{a} + 15\\vec{b}$。足すと $2\\vec{p} + 3\\vec{q} = (6-6)\\vec{a} + (-4+15)\\vec{b} = 0\\vec{a} + 11\\vec{b}$。よって $t = 11$。$\\vec{a}$ の枚数がちょうど打ち消し合って $0$ になったのも見どころです——$2\\vec{p}+3\\vec{q}$ は $\\vec{b}$ の向きだけを向いている。中心の問いへの部分回答：**矢印は、ふつうの文字と同じように、展開して整理してよい**。床が無くても計算は進みます。",
        },
      ],
      formulaPreview: "2p + 3q = (6−6)a + (−4+15)b = 0a + 11b",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ $\\vec{p} = 3\\vec{a} - 2\\vec{b}$、$\\vec{q} = -2\\vec{a} + 5\\vec{b}$ について、$\\dfrac{1}{2}\\vec{p} - \\vec{q}$ を $s\\vec{a} + t\\vec{b}$ の形に整理したときの **$s$ の値**を求めましょう。\n\n答えは既約分数で答えましょう。",
      answer: 3.5,
      answerDisplay: "7/2",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ $\\vec{p}$ と $\\vec{q}$。組み合わせ方だけが違う。前題の整理の仕方は、そのまま使える？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**倍率が分数になり、引き算が混じった**こと。$\\dfrac{1}{2}$ 倍すると $\\vec{a}$ の枚数は？ $\\vec{q}$ を引くとき、$\\vec{q}$ の $\\vec{a}$ の枚数 $-2$ はどう効く？",
        },
        {
          layer: 3,
          text: "前題と同じ手つきです。$\\dfrac{1}{2}\\vec{p} = \\dfrac{3}{2}\\vec{a} - \\vec{b}$。引き算は「逆ベクトルを足す」ことなので、$-\\vec{q} = 2\\vec{a} - 5\\vec{b}$ を足して $\\dfrac{1}{2}\\vec{p} - \\vec{q} = \\left(\\dfrac{3}{2} + 2\\right)\\vec{a} + (-1 - 5)\\vec{b} = \\dfrac{7}{2}\\vec{a} - 6\\vec{b}$。よって $s = \\dfrac{7}{2}$。枚数が分数になっても、タイルの $\\dfrac{7}{2}$ 枚ぶん進む矢印として意味は保たれます。中心の問いへの部分回答：**倍率も足し引きも、枚数の上でふつうの数の計算になる**。矢印はもう「数のようなもの」です。",
        },
      ],
      formulaPreview: "p/2 − q = (3/2 + 2)a + (−1 − 5)b = (7/2)a − 6b",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "ここで、いちばん最初の問いに戻ります。「同じ」とは何が同じことか。\n\n図には、床の上の $2$ 点 P, Q を結ぶ矢印 $\\overrightarrow{PQ}$ と、①〜⑤の $5$ 本の矢印が描かれています。$5$ 本はどれも P, Q とは違う場所に置いてあります。\n\nこの $5$ 本のうち、**ベクトルとして $\\overrightarrow{PQ}$ と等しいものは何本**あるでしょうか。",
      answer: 2,
      unit: "本",
      unknownLabel: "$\\overrightarrow{PQ}$ と等しい矢印の本数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで矢印は「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」という $2$ つの数で言い表してきた。その言い表し方に、**置いてある場所**は入っていただろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**同じ矢印が、別の場所に置かれている**こと。①〜⑤のそれぞれについて、「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」を数えてみよう。向きが反対のもの、長さが違うものは、数えると何が違う？",
        },
        {
          layer: 3,
          text: "step 1 で $\\overrightarrow{PQ} = 3\\vec{a} + 2\\vec{b}$ でした。矢印を「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」で言い表すとき、始点がどこかは一度も使っていません。だから**向きと大きさが同じなら、置いてある場所が違っても同じベクトル**です。①〜⑤を数えると、③と⑤は $3\\vec{a} + 2\\vec{b}$ で $\\overrightarrow{PQ}$ と等しい。①は $-3\\vec{a} - 2\\vec{b}$ で、長さは同じでも**向きが反対**（逆ベクトル）なので等しくない。②は $6\\vec{a} + 4\\vec{b}$ で、向きは同じでも長さが $2$ 倍。④は $2\\vec{a} + 3\\vec{b}$ で向きが違う。等しいのは **$2$ 本**です。\n\n**やってしまいがちな誤り**：「同じ場所にないから別のもの」と考えること。ベクトルは、向きと大きさを取り出したあとの「概念」で、場所は最初から持っていません。公園の広さを「野球場 $3$ 個分」と言うとき、公園が野球場と同じ場所にあるとは誰も思わないのと同じです。\n\n中心の問いへの部分回答：**「同じ」とは、向きと大きさが同じこと**。場所を忘れたからこそ、矢印は足したり何倍かしたりできる相手になったのです。",
        },
      ],
      formulaPreview: "① −3a−2b（逆向き）② 6a+4b（2 倍）③ 3a+2b ✓ ④ 2a+3b ⑤ 3a+2b ✓　等しいのは 2 本",
      figureMarker: "<<M3V_EQUAL_ARROWS>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\vec{u} = 6\\vec{a} - 9\\vec{b}$、$\\vec{v} = -4\\vec{a} + 6\\vec{b}$ とします。\n\n$\\vec{u} + k\\vec{v}$ が [零ベクトル] $\\vec{0}$（大きさ $0$ の矢印）になるような **$k$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 1.5,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step 4・5 と比べてみよう。あのときは倍率が分かっていて、整理したあとの枚数を求めた。今度は整理したあとの姿（零ベクトル）が先に分かっていて、倍率のほうが分からない。向きが入れかわっている——前の道を逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**分からないものが倍率 $k$ のほうにある**こと。零ベクトルとは「$\\vec{a}$ の枚数も $\\vec{b}$ の枚数も $0$」の矢印。$\\vec{u} + k\\vec{v}$ の $\\vec{a}$ の枚数を $k$ の式で書くと？",
        },
        {
          layer: 3,
          text: "step 4 と同じように整理すると $\\vec{u} + k\\vec{v} = (6 - 4k)\\vec{a} + (-9 + 6k)\\vec{b}$。これが零ベクトルになるには、$\\vec{a}$ の枚数も $\\vec{b}$ の枚数も $0$ でなければなりません。$6 - 4k = 0$ から $k = \\dfrac{3}{2}$、$-9 + 6k = 0$ からも $k = \\dfrac{3}{2}$——$2$ つの条件が同じ $k$ を指しています。だから $k = \\dfrac{3}{2}$。もし $2$ つの条件が別の $k$ を指したら、どんな $k$ でも零ベクトルにはなりません。今回そろったのは、$\\vec{u}$ と $\\vec{v}$ が**同じ直線の上に乗る**（$\\vec{u} = -\\dfrac{3}{2}\\vec{v}$）矢印だったからです。中心の問いへの部分回答：**「消える」という図形の出来事も、枚数がそろって $0$ になるという数の条件に翻訳できる**。",
        },
      ],
      formulaPreview: "u + kv = (6−4k)a + (−9+6k)b = 0 ⟺ k = 3/2（両方の枚数が同時に 0）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ $\\vec{u} = 6\\vec{a} - 9\\vec{b}$ と、新しい $\\vec{w} = 4\\vec{a} + \\vec{b}$ について、$\\vec{u} + k\\vec{w}$ が **$\\vec{a}$ を含まない**（$\\vec{b}$ の向きだけを向く）ような **$k$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -1.5,
      answerDisplay: "−3/2",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は「両方の枚数が $0$」だった。今度は片方だけ。前題で立てた条件のうち、どちらを使えばいい？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**条件が $1$ つだけになった**こと。「$\\vec{a}$ を含まない」を、$\\vec{a}$ の枚数の式で言い直すと？",
        },
        {
          layer: 3,
          text: "前題と同じ整理で $\\vec{u} + k\\vec{w} = (6 + 4k)\\vec{a} + (-9 + k)\\vec{b}$。「$\\vec{a}$ を含まない」は $\\vec{a}$ の枚数が $0$ ということなので $6 + 4k = 0$、$k = -\\dfrac{3}{2}$。このとき $\\vec{b}$ の枚数は $-9 - \\dfrac{3}{2} = -\\dfrac{21}{2}$ で、$\\vec{u} + k\\vec{w} = -\\dfrac{21}{2}\\vec{b}$ と $\\vec{b}$ の向きだけを向きます（$0$ でなくてよい）。前題は $2$ つの枚数を同時に $0$ にする話、今度は $1$ つだけ——条件の数が減ったぶん、$\\vec{b}$ の枚数は自由です。中心の問いへの部分回答：**「この向きの成分を消す」も枚数の条件 $1$ つ**。矢印を数で扱えるようになると、こういう調整が式 $1$ 本でできます。",
        },
      ],
      formulaPreview: "u + kw = (6+4k)a + (−9+k)b、a の枚数 6+4k = 0 より k = −3/2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "平行四辺形 ABCD で、$\\overrightarrow{AB} = \\vec{a}$、$\\overrightarrow{AD} = \\vec{b}$ とします。$2$ 本の対角線 AC, BD の交点を M、辺 CD 上に $CE : ED = 1 : 2$ となる点 E をとります。\n\n$\\overrightarrow{ME} = s\\vec{a} + t\\vec{b}$ と書くとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.16666666666666666,
      answerDisplay: "1/6",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "step 2 と比べてみよう。あのとき P から R へ行くのに、Q に寄り道して矢印をつないだ。M から E へ行くのに、寄り道できる点はある？ 平行四辺形の中で、$\\vec{a}$ 何枚・$\\vec{b}$ 何枚と言える矢印はどれだろう。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**床のタイルではなく、平行四辺形の中の点**になったこと。対角線の交点 M は、A から見て $\\vec{a}$ 何枚・$\\vec{b}$ 何枚の位置？ そして E は、C からどれだけ戻った位置？",
        },
        {
          layer: 3,
          text: "step 2 の「寄り道してつなぐ」をそのまま使います。まず M は対角線 AC の真ん中なので $\\overrightarrow{AM} = \\dfrac{1}{2}\\overrightarrow{AC} = \\dfrac{1}{2}(\\vec{a} + \\vec{b})$。E は C から D の向きへ辺 CD の $\\dfrac{1}{3}$ だけ進んだ点で、$\\overrightarrow{CD} = -\\vec{a}$ だから $\\overrightarrow{CE} = -\\dfrac{1}{3}\\vec{a}$。寄り道して $\\overrightarrow{ME} = \\overrightarrow{MC} + \\overrightarrow{CE} = \\dfrac{1}{2}(\\vec{a} + \\vec{b}) - \\dfrac{1}{3}\\vec{a} = \\dfrac{1}{6}\\vec{a} + \\dfrac{1}{2}\\vec{b}$。よって $s = \\dfrac{1}{6}$。\n\n**別の道でも同じ答えに着きます**：$\\overrightarrow{AE} = \\overrightarrow{AD} + \\overrightarrow{DE} = \\vec{b} + \\dfrac{2}{3}\\vec{a}$ と出しておいて、$\\overrightarrow{ME} = \\overrightarrow{AE} - \\overrightarrow{AM} = \\dfrac{2}{3}\\vec{a} + \\vec{b} - \\dfrac{1}{2}\\vec{a} - \\dfrac{1}{2}\\vec{b} = \\dfrac{1}{6}\\vec{a} + \\dfrac{1}{2}\\vec{b}$。寄り道の道と、始点をそろえて引く道が合流しました。中心の問いへの部分回答：**図形の中の点も、$\\vec{a}$ と $\\vec{b}$ の枚数で言い表せる**。平行四辺形の性質（対角線が互いを二等分する）が、$\\dfrac{1}{2}$ という枚数に翻訳されています。",
        },
      ],
      formulaPreview: "ME = MC + CE = (a+b)/2 − a/3 = a/6 + b/2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "平行四辺形のタイルを、縦横 $2$ 枚ずつ、計 $4$ 枚敷きます。格子点は $9$ つでき、下の段を左から A, B, C、真ん中の段を左から D, E, F、上の段を左から G, H, I と名づけます。$\\overrightarrow{AB} = \\vec{a}$、$\\overrightarrow{AD} = \\vec{b}$ です。\n\n次の $5$ 本の矢印のうち、**ベクトルとして $\\vec{a} - \\vec{b}$ と等しいものは何本**あるでしょうか。\n\n① $\\overrightarrow{DB}$　② $\\overrightarrow{BD}$　③ $\\overrightarrow{EC}$　④ $\\overrightarrow{HF}$　⑤ $\\overrightarrow{GE}$",
      answer: 4,
      unit: "本",
      unknownLabel: "$\\vec{a}-\\vec{b}$ と等しい矢印の本数",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 6 と比べてみよう。あのときは「$\\overrightarrow{PQ}$ と等しい矢印」を、向きと大きさで見分けた。今度の相手は $\\vec{a} - \\vec{b}$ という**引き算の形**をしている。まず、$\\vec{a} - \\vec{b}$ そのものは、格子の上でどこからどこへ向かう矢印だろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**比べる相手が引き算で書かれている**こと。step 3・5 で、引き算は「逆ベクトルを足す」ことだった。$\\vec{a}$ を $1$ 枚進んで、$\\vec{b}$ を $1$ 枚**戻る**——そういう矢印を、①〜⑤の中から探そう。",
        },
        {
          layer: 3,
          text: "$\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$ は「$\\vec{a}$ の向きに $1$ 枚、$\\vec{b}$ の向きに $-1$ 枚」の矢印です。格子で言えば、**右へ $1$・下へ $1$**。$5$ 本を数えると、① $\\overrightarrow{DB}$ は D（左・真ん中）から B（真ん中・下）へで右 $1$・下 $1$ ✓。② $\\overrightarrow{BD}$ はその逆向きで $-\\vec{a} + \\vec{b}$ ✗。③ $\\overrightarrow{EC}$ は E から C へで右 $1$・下 $1$ ✓。④ $\\overrightarrow{HF}$ は H から F へで右 $1$・下 $1$ ✓。⑤ $\\overrightarrow{GE}$ は G から E へで右 $1$・下 $1$ ✓。等しいのは **$4$ 本**です。\n\n**やってしまいがちな誤り**：$\\vec{a} - \\vec{b}$ の向きを「$\\vec{a}$ の終点から $\\vec{b}$ の終点へ」と逆に取ること。始点をそろえて $\\vec{a}$ と $\\vec{b}$ を描いたとき、$\\vec{a} - \\vec{b}$ は **$\\vec{b}$ の終点から $\\vec{a}$ の終点へ**向かいます（A から $\\vec{b}$ で D、$\\vec{a}$ で B。D から B へが $\\vec{a}-\\vec{b}$）。②はまさにこの取り違えの矢印で、正しい向きの逆ベクトルです。\n\n中心の問いへの答え：**矢印から向きと大きさだけを取り出して場所を忘れると、矢印は「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」という数の組になり、足す・引く・何倍かするが数の計算になる**。「同じ」とは、この数の組が同じこと——場所は関係ありません。だからこそ、①③④⑤のように別々の場所にある矢印が、全部同じ $1$ 本の $\\vec{a}-\\vec{b}$ なのです。",
        },
      ],
      formulaPreview: "a − b は「右へ 1・下へ 1」。① DB ✓ ② BD ✗（逆向き）③ EC ✓ ④ HF ✓ ⑤ GE ✓　4 本",
    },
  ],
  derivation: `**中心の問い** ｜ 矢印から「向き」と「大きさ」だけを取り出して、**置いてある場所を忘れてしまう**——そうすると、矢印はなぜ**数のように足したり何倍かしたりできる**ようになるのか？ そして「同じ」とは、何が同じことなのか？

────────

**「動け」と言うには、向きと大きさの $2$ つが要る**

舞台の上で、演出家が役者に「$1$ m 動いて」とだけ言っても、役者は困ります。どちらへ？——「向き」と「大きさ」の $2$ つがそろって、はじめて「動け」という指示になります。この $2$ つを持つ量が [ベクトル] です。風も、力も、速度も、「どちらへ・どれだけ」を持っています。

矢印で描けば、矢印の向きがベクトルの向き、矢印の長さがベクトルの大きさ。$2$ 点 A, B があれば、A を始点・B を終点とする矢印から向きと大きさを**取り出して**、$\\overrightarrow{AB}$ と書きます。

<<M3V_EXTRACT>>

**取り出したあとは、場所に縛られない**

ここが最初の急所です。$\\overrightarrow{AB}$ の向きと大きさを取り出すために A と B は必要でした。けれど、いったん取り出してしまえば、**$\\overrightarrow{AB}$ はもう A や B という場所には縛られません**。同じ向きと大きさをもつ矢印は、どこに置いてあっても、すべて $\\overrightarrow{AB}$ と呼んでよいのです。

公園の広さを「野球場 $3$ 個分」と言うとき、公園が野球場と同じ場所にあると思う人はいません。「広さ」だけを頭の中に取り出して、$3$ 倍して、別の場所の公園に当てている。「広さ」は場所に縛られない**概念**として扱われています。ベクトルも同じで、「向き」と「大きさ」という $2$ つの情報だけを持つ概念です。step 6 で数えた $5$ 本のうち、$\\overrightarrow{PQ}$ と等しいのは、場所がまったく違う③と⑤でした。

**ここが胚細胞**：場所を忘れた瞬間に、矢印は「もの」から「概念」になります。概念どうしなら、**足したり・何倍かしたり**という操作を**決めてやる**ことができる。この系列で歩いたのは、その操作を $1$ つずつ手に入れる道でした。

**足し算——矢印をつなぐ**

$2$ つのベクトル $\\vec{a}$、$\\vec{b}$ の矢印をこの順につないだとき、「$\\vec{a}$ の始点」から「$\\vec{b}$ の終点」へ向かうベクトルを $\\vec{a} + \\vec{b}$ と決めます。始点をそろえて描けば、平行四辺形の対角線が $\\vec{a} + \\vec{b}$ です。

<<M3V_ADD_JOIN>>

つないでも、始点をそろえて対角線を引いても、同じ矢印に着く——だから $\\vec{a} + \\vec{b} = \\vec{b} + \\vec{a}$ も成り立ちます。ただしここで気をつけたいのは、**「足し算なんだから当たり前」とは言えない**ということ。私たちはいま、ベクトルという得体の知れないものに「足し算」のルールを**決めている最中**です。数の足し算と同じ性質をもつ保証は、どこにもありません。当たり前に見えることも、図で確かめてはじめて使えるようになります。

**逆ベクトルと零ベクトル、そして引き算**

$\\vec{a}$ と大きさが同じで向きが反対のベクトルを [逆ベクトル] $-\\vec{a}$ といいます。始点と終点を入れかえると逆ベクトルになるので $\\overrightarrow{BA} = -\\overrightarrow{AB}$（step 3）。始点と終点が同じ矢印は、大きさ $0$ で向きを持たない特別なベクトル＝[零ベクトル] $\\vec{0}$ です（step 7 で、$\\vec{u} + k\\vec{v}$ がこれになる $k$ を求めました）。

引き算は「逆ベクトルを足す」と決めます：$\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$。始点をそろえて描くと、$\\vec{a} - \\vec{b}$ は **$\\vec{b}$ の終点から $\\vec{a}$ の終点へ**向かう矢印になります。

<<M3V_SUB_DIRECTION>>

**実数倍——矢印を伸び縮みさせる**

$k\\vec{a}$ は、$\\vec{a}$ の向きを保ったまま長さを $k$ 倍したベクトル（$k$ が負なら向きが反対）。この「足し算」と「実数倍」を組み合わせると、$2$ 本の矢印 $\\vec{a}$、$\\vec{b}$ から $3\\vec{a} + 2\\vec{b}$ や $\\dfrac{7}{2}\\vec{a} - 6\\vec{b}$ のような、いろいろな矢印が作れます。

**だから、文字と同じように計算してよい**

足し算と実数倍について、ベクトルには $k(\\vec{a} + \\vec{b}) = k\\vec{a} + k\\vec{b}$ という分配法則も成り立ちます（相似な平行四辺形を描けば確かめられます）。**足し算と実数倍について、ベクトルは数と全く同じ性質をもつ**——これが分かった瞬間、$\\vec{a}$ をふつうの文字 $a$ と同じように扱って式変形してよいことになります。step 4・5 で $2\\vec{p} + 3\\vec{q}$ や $\\dfrac{1}{2}\\vec{p} - \\vec{q}$ を展開して整理したのは、まさにこれです。

数Ⅲ・C の第 $1$ 章で、関数に $f$ という名前をつけて中身に蓋をした瞬間、関数が「$1$ 個のもの」になって操作の対象になりました。ベクトルも同じ構造です——矢印に $\\vec{a}$ と名前をつけ、場所に蓋をした瞬間、矢印は操作の対象になる。

**Step の道筋**

- **Step 1**：タイルの上で「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」と数える。矢印が $2$ つの数で言い表せる
- **Step 2〜3**：つなぐと枚数が足される。向きを反対にすると符号が反転する（逆ベクトル）
- **Step 4〜5**：床を離れて文字だけで。何倍かするのは枚数を何倍かすること。展開して整理してよい
- **Step 6（転換点）**：「同じ」とは向きと大きさが同じこと。場所は最初から持っていない
- **Step 7〜8**：零ベクトルになる条件・ある向きの成分を消す条件が、枚数の式 $1$ 本になる
- **Step 9**：平行四辺形の中の点も枚数で言える。寄り道の道と、始点をそろえる道が合流する
- **Step 10（山場）**：$\\vec{a} - \\vec{b}$ の向きを格子で確かめる。$\\vec{b}$ の終点から $\\vec{a}$ の終点へ

────────

**もっと深く** — 決めたルールが、なぜ「数と同じ」に見えるのか

**忘れても導ける**：ベクトルの計算規則を丸暗記する必要はありません。**「矢印をつなぐ」「矢印を伸び縮みさせる」の $2$ つを図に描く**——それだけで、交換法則も分配法則も、逆ベクトルの意味も、その場で確かめられます。step 9 の $\\overrightarrow{ME}$ も、公式ではなく「M に寄り道して C を経由する」道順を描けば出ます。

**やってしまいがちな誤り $1$：$\\vec{a} - \\vec{b}$ の向きを逆に取る**。始点をそろえたとき、$\\vec{a} - \\vec{b}$ は $\\vec{b}$ の終点から $\\vec{a}$ の終点へ向かいます。逆に取ると $\\vec{b} - \\vec{a}$、すなわち逆ベクトルになってしまう（step 10 の②）。迷ったら「$\\vec{b}$ に何を足せば $\\vec{a}$ になるか」と考えると向きが決まります——$\\vec{b} + (\\vec{a} - \\vec{b}) = \\vec{a}$ なので、$\\vec{b}$ の先から $\\vec{a}$ の先へ。

**やってしまいがちな誤り $2$：「別の場所にあるから別のベクトル」**。ベクトルは向きと大きさだけを持ち、場所を持ちません。平行移動して重なる矢印は、すべて同じ $1$ 本です。逆に、**長さが同じでも向きが反対なら別のベクトル**（逆ベクトル）です。

**ベクトルには「かけ算」が、まだ無い**：この系列で決めたのは足し算・引き算・実数倍だけです。ベクトルどうしの「かけ算」は決めていません——あとの系列で「内積」という、かけ算に似て非なる演算を新しく決めます。そのときも「決めている最中だ」という構えは同じです。

**この先の景色**：次の系列では、矢印を「寄り道」と「終点−始点」で書き換える $2$ つの基本変形を手に入れ、三角形の中のどんな点も $\\vec{b}$、$\\vec{c}$ の枚数で言い表せるようになります。さらに進むと、基準の矢印を $2$ 本決めるだけで**どんな矢印もただ $1$ 通りに数の組へ翻訳される**ことが分かり、図形の問題が式の計算に変わります。第 $10$ 章の複素数平面では、複素数の足し算と実数倍がベクトルのそれと**まったく同じ**であることを見ます。大学では、この「足し算と実数倍ができる量」の集まりを線形空間と呼び、基準の取り替えが行列になります。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（$2$ 点を使ったベクトルの表し方 $\\to$ 逆ベクトルと零ベクトル $\\to$ 足し算と実数倍）と、
  「いったん取り出されてしまえば、ベクトルはもはや位置には縛られない」「足し算のルールを決めている最中」「数と全く同じ性質をもつから文字と同じように式変形できる」という着眼を参考。問題の値・場面（タイル・格子）はすべてオリジナル。

────────

**問いに戻ると**

「矢印はなぜ数のように足したり何倍かしたりできるのか」——**向きと大きさだけを取り出して場所を忘れたから**です。場所を持たない概念どうしなら、「つなぐ」「伸び縮みさせる」という操作を決めてやれて、その操作が数の足し算・実数倍と同じ性質をもつと図で確かめられました。だから $\\vec{a}$ は文字 $a$ のように展開して整理してよい。

「『同じ』とは何が同じことか」——**向きと大きさが同じこと**。タイルの上で言えば「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」が同じこと。step 6 の③と⑤も、step 10 の①③④⑤も、場所はばらばらなのに同じ $1$ 本の矢印でした。

**矢印を「もの」から「概念」へ。** この $1$ 歩で、図形の言葉が数の言葉に翻訳され始めます。次の系列では、その翻訳を三角形の中で自由に使えるようにする $2$ つの基本変形を手に入れます。`,
};

/** M3V2: 基本変形（寄り道と、終点−始点）。
 *  ①寄り道 AB = A■ + ■B ②終点−始点 AB = □B − □A の 2 つだけで、
 *  三角形の中のどんな点も b, c の式になる——この系列はその 2 つを手に入れる道。
 *  質的変化 step7 は「基準点を三角形の外に出す」（始点は自分で選んでよい）。
 *  山場 step10 は四角形の 2 本の対角線の内分点を結ぶ矢印。両方の比と AC の分解の
 *  3 つが全部効き、2 つの書き換えを重ねないと届かない。
 *  内分・外分の公式（p.354）は次の系列。ここでは公式化の手前で止める。 */
export const M3V_TRANSFORM_SERIES: LearnerSeries = {
  id: "math3_vec_transform_01",
  title: "基本変形（寄り道と、終点−始点）",
  subtitle:
    "数Ⅲ・C ベクトルより — A から B へ行く矢印は、寄り道しても同じ矢印。そして矢印は「終点を指す矢印 $-$ 始点を指す矢印」に必ず書き直せる。$2$ つの書き換えだけで三角形の中を測る入口から、四角形の $2$ 本の対角線をつなぐ山場まで $10$ 問。",
  patternId: "M3V2",
  unit: "math_3",
  revelationLabel:
    "**始点は、自分で選んでよかった**。「途中に点を挟む」「基準点を外に出す」——この $2$ つの書き換えだけで、図形の中のどんな点も、好きな $1$ 点から見た $2$ 本の矢印の式になる",
  drivingQuestion:
    "A から B へ行く矢印は、**寄り道しても**同じ矢印。そして矢印は「**終点を指す矢印 $-$ 始点を指す矢印**」に必ず書き直せる——たった $2$ つの書き換えで、なぜ三角形の中のどんな点も $\\vec{b}$、$\\vec{c}$ の式に翻訳できてしまうのか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 ABC で、$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$ とします（三角形なので $\\vec{b}$ と $\\vec{c}$ は平行ではなく、$s\\vec{b} + t\\vec{c}$ の形の表し方はただ $1$ 通りに決まります）。\n\n辺 BC 上に、$BP : PC = 1 : 3$ となる点 P をとります。\n\n$\\overrightarrow{BP} = s\\vec{b} + t\\vec{c}$ と書くとき、**$t$ の値**（$\\vec{c}$ の係数）を求めましょう。答えは既約分数で答えましょう。",
      answer: 1 / 4,
      answerDisplay: "1/4",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "B から C へ向かう矢印は、手もとの $\\vec{b}$ でも $\\vec{c}$ でもありません。でも、前の系列で矢印はつないでよかった。B から C へ行く道を、いったん A を通る道に置きかえてみたら、何が見えるだろう？",
        },
        {
          layer: 2,
          text: "見るところは $2$ つ。まず、B から C への矢印が $\\vec{b}$、$\\vec{c}$ で書けるかどうか。次に、$BP : PC = 1 : 3$ のとき、BP は BC 全体のどれだけにあたるか。この $2$ つが決まれば、答えは出ます。",
        },
        {
          layer: 3,
          text: "まず $\\overrightarrow{BC}$ を [ベクトル] のつなぐ足し算で書き直します。B から C へ行くのに A に寄り道すると $\\overrightarrow{BC} = \\overrightarrow{BA} + \\overrightarrow{AC}$。$\\overrightarrow{BA}$ は $\\overrightarrow{AB}$ の [逆ベクトル] なので $-\\vec{b}$。したがって\n\n$\\overrightarrow{BC} = -\\vec{b} + \\vec{c} = \\vec{c} - \\vec{b}$\n\nこれが「**終点 C を指す矢印から、始点 B を指す矢印を引く**」という形です（基準は A）。\n\n次に P の位置。$BP : PC = 1 : 3$ なら、BP は BC 全体を $1 + 3 = 4$ に分けたうちの $1$ つぶんなので $\\overrightarrow{BP} = \\dfrac{1}{4}\\overrightarrow{BC}$。よって\n\n$\\overrightarrow{BP} = \\dfrac{1}{4}(\\vec{c} - \\vec{b}) = -\\dfrac{1}{4}\\vec{b} + \\dfrac{1}{4}\\vec{c}$\n\nつまり $t = \\dfrac{1}{4}$ です。中心の問いへの最初の部分回答：**どの $2$ 点を結ぶ矢印も、好きな $1$ 点（ここでは A）から見た $2$ 本の矢印だけで書き直せる**。三角形の辺の上にいる点が、これで $\\vec{b}$、$\\vec{c}$ の式になりました。",
        },
      ],
      formulaPreview: "BC = BA + AC = c − b、BP = (1/4)BC = −(1/4)b + (1/4)c",
      figureMarker: "<<M3V_END_MINUS_START>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ三角形 ABC（$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$）で、辺 BC を $2 : 5$ に [内分] する点を R とします（$BR : RC = 2 : 5$）。\n\n$\\overrightarrow{AR} = s\\vec{b} + t\\vec{c}$ と書くとき、**$t$ の値**（$\\vec{c}$ の係数）を求めましょう。答えは既約分数で答えましょう。",
      answer: 2 / 7,
      answerDisplay: "2/7",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も、辺 BC 上の点という設定も同じ。違うのは、矢印がどこから出発しているか。前題で歩いた道は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**矢印の始点が B から A に移った**こと $1$ つ（分ける比も新しくなっています）。A から R へ行く道の途中に、前題で出したものをそのまま置ける場所はないだろうか？",
        },
        {
          layer: 3,
          text: "前題で $\\overrightarrow{BP} = \\dfrac{1}{4}(\\vec{c} - \\vec{b})$ と出しました。同じつくりを使います。\n\nまず、A から R へ行く道を、**B に寄り道する道**に置きかえます：$\\overrightarrow{AR} = \\overrightarrow{AB} + \\overrightarrow{BR}$。これが $1$ つ目の書き換えです。\n\n次に $\\overrightarrow{BR}$。$BR : RC = 2 : 5$ なので BR は BC 全体の $\\dfrac{2}{2+5} = \\dfrac{2}{7}$、前題と同じく $\\overrightarrow{BC} = \\vec{c} - \\vec{b}$ だから $\\overrightarrow{BR} = \\dfrac{2}{7}(\\vec{c} - \\vec{b})$。したがって\n\n$\\overrightarrow{AR} = \\vec{b} + \\dfrac{2}{7}(\\vec{c} - \\vec{b}) = \\left(1 - \\dfrac{2}{7}\\right)\\vec{b} + \\dfrac{2}{7}\\vec{c} = \\dfrac{5}{7}\\vec{b} + \\dfrac{2}{7}\\vec{c}$\n\nよって $t = \\dfrac{2}{7}$。中心の問いへの部分回答：**「寄り道する」書き換えと「終点 $-$ 始点」の書き換えを続けて使うと、辺の上の点が $\\vec{b}$、$\\vec{c}$ の式になる**。数直線で内分点を出したときの「遠い方の比が重み」（$\\vec{b}$ の係数が $\\dfrac{5}{7}$）が、そのまま矢印の世界にも現れています。",
        },
      ],
      formulaPreview: "AR = AB + BR = b + (2/7)(c − b) = (5/7)b + (2/7)c",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ三角形 ABC で、辺 BC を $3 : 4$ に内分する点を S とします（$BS : SC = 3 : 4$）。\n\n$\\overrightarrow{AS} = s\\vec{b} + t\\vec{c}$ と書くとき、こんどは **$s$ の値**（$\\vec{b}$ の係数）を求めましょう。答えは既約分数で答えましょう。",
      answer: 4 / 7,
      answerDisplay: "4/7",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も、辺 BC 上の点という設定も同じ。変わったのは、分ける比と、どちらの係数を聞かれているか。前題の道はそのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**聞かれているのが $\\vec{b}$ の係数のほうになった**こと。前題と同じように $\\overrightarrow{AS}$ を最後まで書けば、$2$ つの係数は同時に見えます。ところで、A から S へ行く道は、B に寄る道のほかにもう $1$ つあります——どこに寄れるだろう？",
        },
        {
          layer: 3,
          text: "前題と同じ道から行きます。$BS : SC = 3 : 4$ なので $\\overrightarrow{BS} = \\dfrac{3}{7}\\overrightarrow{BC} = \\dfrac{3}{7}(\\vec{c} - \\vec{b})$。B に寄り道して\n\n$\\overrightarrow{AS} = \\vec{b} + \\dfrac{3}{7}(\\vec{c} - \\vec{b}) = \\dfrac{4}{7}\\vec{b} + \\dfrac{3}{7}\\vec{c}$\n\nよって $s = \\dfrac{4}{7}$。\n\n**もう $1$ つの道でも同じ場所に着きます**。こんどは C に寄り道してみます：$\\overrightarrow{AS} = \\overrightarrow{AC} + \\overrightarrow{CS}$。S から見ると $CS : SB = 4 : 3$ なので $\\overrightarrow{CS} = \\dfrac{4}{7}\\overrightarrow{CB} = \\dfrac{4}{7}(\\vec{b} - \\vec{c})$。だから\n\n$\\overrightarrow{AS} = \\vec{c} + \\dfrac{4}{7}(\\vec{b} - \\vec{c}) = \\dfrac{4}{7}\\vec{b} + \\dfrac{3}{7}\\vec{c}$\n\n——B に寄っても C に寄っても、同じ式に着きました。中心の問いへの部分回答：**寄り道する点はどこに選んでもよく、どの道を通っても答えは同じ $1$ つ**。道順が自由なのに答えが $1$ つに決まるのは、$\\vec{b}$ と $\\vec{c}$ が平行でないおかげです。",
        },
      ],
      formulaPreview:
        "B に寄る道：b + (3/7)(c − b) = (4/7)b + (3/7)c ／ C に寄る道：c + (4/7)(b − c) = (4/7)b + (3/7)c",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "同じ三角形 ABC で、辺 BC 上に点 T をとったところ、$\\overrightarrow{AT}$ を $\\vec{b}$、$\\vec{c}$ で表したときの **$\\vec{c}$ の係数が $\\dfrac{5}{9}$** になりました。\n\nこのとき、$\\dfrac{BT}{TC}$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 4,
      answerDisplay: "5/4",
      unit: "",
      unknownLabel: "$\\dfrac{BT}{TC}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。これまでは分ける比が先に分かっていて、係数を求めた。今度は、分かっているものと求めるものが入れかわっている。同じ道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**出発点が比ではなく係数になった**こと $1$ つ。辺 BC を $m : n$ に内分する点なら、前題までの道でどんな式が立つだろう。その式を、$m$ と $n$ を分からないままにして書いてみよう。",
        },
        {
          layer: 3,
          text: "step 2・3 で書いた式を、比を文字にしたまま書き直します。辺 BC を $m : n$ に内分する点 T なら、B に寄り道して\n\n$\\overrightarrow{AT} = \\vec{b} + \\dfrac{m}{m+n}(\\vec{c} - \\vec{b}) = \\dfrac{n}{m+n}\\vec{b} + \\dfrac{m}{m+n}\\vec{c}$\n\n$\\vec{c}$ の係数は $\\dfrac{m}{m+n}$。これが $\\dfrac{5}{9}$ なのだから $\\dfrac{m}{m+n} = \\dfrac{5}{9}$、つまり $m : (m+n) = 5 : 9$、$m : n = 5 : 4$。よって $\\dfrac{BT}{TC} = \\dfrac{5}{4}$。\n\n**確かめ**：$BT : TC = 5 : 4$ とすると $\\overrightarrow{AT} = \\vec{b} + \\dfrac{5}{9}(\\vec{c} - \\vec{b}) = \\dfrac{4}{9}\\vec{b} + \\dfrac{5}{9}\\vec{c}$ で、たしかに $\\vec{c}$ の係数が $\\dfrac{5}{9}$ になっています。\n\n中心の問いへの部分回答：**係数と比は、$2$ つの書き換えを通してどちらからどちらへも行き来できる**。図形の言葉（比）と式の言葉（係数）が、往復できる翻訳になったということです。",
        },
      ],
      formulaPreview: "AT = (n/(m+n))b + (m/(m+n))c、m/(m+n) = 5/9 より m : n = 5 : 4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ三角形 ABC で、こんどは辺 BC を $4 : 1$ に [外分] する点を Q とします（$BQ : QC = 4 : 1$ で、Q は線分 BC の外、C の側に出ます）。\n\n$\\overrightarrow{AQ} = s\\vec{b} + t\\vec{c}$ と書くとき、**$s$ の値**（$\\vec{b}$ の係数）を求めましょう。答えは既約分数で答えましょう。",
      answer: -1 / 3,
      answerDisplay: "−1/3",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。三角形も $\\vec{b}$、$\\vec{c}$ も同じ。違うのは、点が線分の内側ではなく外側にいること。前題までの道は、点が外に出ても同じように歩けるだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**点が線分 BC の外に出た**こと $1$ つ。内分のときは、BP が BC 全体のどれだけかを比から読みました。外分のときは、BQ は BC 全体のどれだけになるだろう？",
        },
        {
          layer: 3,
          text: "手つきは step 2 とまったく同じで、変わるのは「BC の何倍か」だけです。$BQ : QC = 4 : 1$ の外分は、B から数えて $4$、Q から C へ $1$ だけ**戻る**という配置なので、BQ は BC 全体の $\\dfrac{4}{4-1} = \\dfrac{4}{3}$ 倍。つまり $\\overrightarrow{BQ} = \\dfrac{4}{3}\\overrightarrow{BC} = \\dfrac{4}{3}(\\vec{c} - \\vec{b})$。B に寄り道して\n\n$\\overrightarrow{AQ} = \\vec{b} + \\dfrac{4}{3}(\\vec{c} - \\vec{b}) = \\left(1 - \\dfrac{4}{3}\\right)\\vec{b} + \\dfrac{4}{3}\\vec{c} = -\\dfrac{1}{3}\\vec{b} + \\dfrac{4}{3}\\vec{c}$\n\nよって $s = -\\dfrac{1}{3}$。\n\n**やってしまいがちな誤り**：係数が負になったのを「計算まちがい」と思って直してしまうこと。$\\vec{b}$ の係数が負なのは、A から Q へ行くには $\\vec{b}$ の向きに**戻る**成分が要るから——つまり Q が辺 BC の外に出ているという事実が、そのまま符号に現れています。[内分] の式で $n$ を $-n$ に置きかえると [外分] の式になる、というのもこれと同じことです。\n\n中心の問いへの部分回答：**内でも外でも、書き換えは同じ $2$ つ**。外分のために新しい道具は要りませんでした。倍率が $1$ より大きくなり、係数に負が現れるだけです。",
        },
      ],
      formulaPreview: "BQ = (4/3)BC、AQ = b + (4/3)(c − b) = −(1/3)b + (4/3)c",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ三角形 ABC で、辺 BC の [中点] を M とします。線分 AM 上に、$AG : GM = 5 : 2$ となる点 G をとります。\n\n$\\overrightarrow{AG} = s\\vec{b} + t\\vec{c}$ と書くとき、**$s$ の値**（$\\vec{b}$ の係数）を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 14,
      answerDisplay: "5/14",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。三角形も $\\vec{b}$、$\\vec{c}$ も同じ。変わったのは、点がどの線分の上にいるか。これまでは辺 BC の上だった。前題までの道は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**分ける相手の線分が BC から AM に変わった**こと $1$ つ。AM を分ける前に、その端にいる M 自身が $\\vec{b}$、$\\vec{c}$ でどう書けるかを先に言えるだろうか？",
        },
        {
          layer: 3,
          text: "$2$ 段に分けます。まず M。M は BC の中点、つまり $BM : MC = 1 : 1$ の内分点なので、step 2 とまったく同じ道で\n\n$\\overrightarrow{AM} = \\vec{b} + \\dfrac{1}{2}(\\vec{c} - \\vec{b}) = \\dfrac{1}{2}\\vec{b} + \\dfrac{1}{2}\\vec{c}$\n\n次に G。G は線分 AM を $5 : 2$ に分ける点で、しかも**始点が A のまま**なので、単純に $\\overrightarrow{AG} = \\dfrac{5}{7}\\overrightarrow{AM}$。したがって\n\n$\\overrightarrow{AG} = \\dfrac{5}{7}\\left(\\dfrac{1}{2}\\vec{b} + \\dfrac{1}{2}\\vec{c}\\right) = \\dfrac{5}{14}\\vec{b} + \\dfrac{5}{14}\\vec{c}$\n\nよって $s = \\dfrac{5}{14}$。\n\n図形の性質で習った三角形の [重心] は、中線 AM を $2 : 1$ に内分する点でした。そのときは $\\overrightarrow{AG} = \\dfrac{2}{3}\\overrightarrow{AM} = \\dfrac{1}{3}\\vec{b} + \\dfrac{1}{3}\\vec{c}$ で、係数がどちらも $\\dfrac{1}{3}$ になります。今回の G は $5 : 2$ なので重心より M 寄りにいて、係数もそれだけ大きい $\\dfrac{5}{14}$ になりました。\n\n中心の問いへの部分回答：**一度 $\\vec{b}$、$\\vec{c}$ の式にしてしまえば、その点をさらに分けた点も、同じ式の中で扱える**。翻訳したものの上に、そのまま次の翻訳を重ねられるということです。",
        },
      ],
      formulaPreview: "AM = (1/2)b + (1/2)c、AG = (5/7)AM = (5/14)b + (5/14)c",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "ここで、**基準になる点を三角形の外に移して**みます。\n\n三角形 ABC と、その外にある点 O をとり、$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$、$\\overrightarrow{OC} = \\vec{c}$ とします（**ここからの $\\vec{b}$、$\\vec{c}$ は O を始点とする矢印**です。O は直線 AB, BC, CA のどれの上にもないものとします）。辺 BC を $1 : 3$ に内分する点を P とします（$BP : PC = 1 : 3$）。\n\n$\\overrightarrow{OP}$ を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で表しましょう。ただし、**O をどこに置きなおしても、そのまま成り立つ式**にします（そのような式は $1$ 通りに決まります）。\n\nその式の **$\\vec{b}$ の係数**を求めましょう。答えは既約分数で答えましょう。",
      answer: 3 / 4,
      answerDisplay: "3/4",
      unit: "",
      unknownLabel: "$\\vec{b}$ の係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step 2 と比べてみよう。あのときも、辺 BC を分ける点へ向かう矢印を求めた。違うのは、矢印がどこから出ているか——A ではなく、三角形の外の O から。前題までの道は、始点が図の外に出ても同じように歩けるだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは **矢印の始点が、図形の頂点から図形の外の点 O に移った**こと $1$ つ。O から P へ行く道の途中にも、寄り道できる点があります。どこに寄れば、手もとの $3$ 本のうち知っている矢印にたどりつくだろう？",
        },
        {
          layer: 3,
          text: "step 2 とまったく同じ道です。O から P へ行くのに、**B に寄り道**します：\n\n$\\overrightarrow{OP} = \\overrightarrow{OB} + \\overrightarrow{BP}$\n\n$\\overrightarrow{BP}$ は step 1 と同じつくりで、$BP : PC = 1 : 3$ なので $\\overrightarrow{BP} = \\dfrac{1}{4}\\overrightarrow{BC}$。ここで $\\overrightarrow{BC}$ を「終点 $-$ 始点」で書き直すと、こんどの基準点は O なので $\\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} = \\vec{c} - \\vec{b}$。したがって\n\n$\\overrightarrow{OP} = \\vec{b} + \\dfrac{1}{4}(\\vec{c} - \\vec{b}) = \\dfrac{3}{4}\\vec{b} + \\dfrac{1}{4}\\vec{c}$\n\nよって $\\vec{b}$ の係数は $\\dfrac{3}{4}$。\n\n**ここが今日いちばんの見どころ**：$\\vec{a}$ が一度も出てきませんでした。$\\vec{a}$ の係数は $0$ です。P は辺 BC の上にいるので、B と C さえ指させれば足りて、A は要らなかった——A を通らずに O から B へ直接向かえるからです。\n\nもう $1$ つ。A を基準にして同じ P を書くと $\\overrightarrow{AP} = \\dfrac{3}{4}\\overrightarrow{AB} + \\dfrac{1}{4}\\overrightarrow{AC}$ で、**係数がまったく同じ $\\dfrac{3}{4}$ と $\\dfrac{1}{4}$** になります。係数は「どこから見るか」ではなく「点が線分をどう分けているか」だけで決まるのです。\n\n中心の問いへの部分回答：**基準点は自分で選んでよい**。基本変形②が「どこから見るか」を自由にしてくれたので、図の外に立っても、同じ係数で同じ点を言い当てられます。",
        },
      ],
      formulaPreview: "OP = OB + BP = b + (1/4)(c − b) = (3/4)b + (1/4)c（a の係数は 0）",
      figureMarker: "<<M3V_DETOUR>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ設定（三角形 ABC、外の点 O、$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$、$\\overrightarrow{OC} = \\vec{c}$、辺 BC を $1 : 3$ に内分する点 P）で、こんどは**線分 AP 上**に、$AU : UP = 4 : 1$ となる点 U をとります。\n\n$\\overrightarrow{OU}$ を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で、**O をどこに置きなおしてもそのまま成り立つ式**に表したとき、**$\\vec{a}$ の係数**を求めましょう。答えは既約分数で答えましょう。",
      answer: 1 / 5,
      answerDisplay: "1/5",
      unit: "",
      unknownLabel: "$\\vec{a}$ の係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も O も P も同じ。増えたのは、線分 AP の上にもう $1$ つ点が乗ったこと。前題で出したものは、そのまま材料に使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分ける相手の線分が、辺 BC から線分 AP になった**こと $1$ つ。step 6 でも、いちど求めた点を端にして、その先の線分を分けました。あのときと同じ重ね方ができないだろうか？",
        },
        {
          layer: 3,
          text: "step 6 と同じ「$2$ 段重ね」ですが、始点が O なので $1$ か所だけ違います。step 6 では始点が A のままだったので $\\overrightarrow{AG} = \\dfrac{5}{7}\\overrightarrow{AM}$ と単純に何倍かできました。今度は始点が O なので、まず A に寄り道します：\n\n$\\overrightarrow{OU} = \\overrightarrow{OA} + \\overrightarrow{AU}$\n\n$AU : UP = 4 : 1$ なので $\\overrightarrow{AU} = \\dfrac{4}{5}\\overrightarrow{AP}$。そして $\\overrightarrow{AP}$ は「終点 $-$ 始点」で $\\overrightarrow{AP} = \\overrightarrow{OP} - \\overrightarrow{OA}$。前題で $\\overrightarrow{OP} = \\dfrac{3}{4}\\vec{b} + \\dfrac{1}{4}\\vec{c}$ と出しているので\n\n$\\overrightarrow{OU} = \\vec{a} + \\dfrac{4}{5}(\\overrightarrow{OP} - \\vec{a}) = \\dfrac{1}{5}\\vec{a} + \\dfrac{4}{5}\\overrightarrow{OP}$\n\n$= \\dfrac{1}{5}\\vec{a} + \\dfrac{4}{5}\\left(\\dfrac{3}{4}\\vec{b} + \\dfrac{1}{4}\\vec{c}\\right) = \\dfrac{1}{5}\\vec{a} + \\dfrac{3}{5}\\vec{b} + \\dfrac{1}{5}\\vec{c}$\n\nよって $\\vec{a}$ の係数は $\\dfrac{1}{5}$。前題では消えていた $\\vec{a}$ が、こんどは戻ってきました——U は辺 BC の上にいないので、A を指す矢印がどうしても要るのです。\n\n中心の問いへの部分回答：**$2$ つの書き換えは、何段でも重ねられる**。$1$ 段目で P を $\\vec{b}$、$\\vec{c}$ の式にし、$2$ 段目でその P を材料にして U を書く。翻訳の上に翻訳を積むことで、図形の中のどんな点にも手が届きます。",
        },
      ],
      formulaPreview: "OU = OA + (4/5)AP = (1/5)a + (4/5)OP = (1/5)a + (3/5)b + (1/5)c",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ設定（三角形 ABC、外の点 O、辺 BC を $1 : 3$ に内分する点 P）で、線分 AP 上に点 V をとったところ、$\\overrightarrow{OV}$ を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で（O をどこに置きなおしても成り立つ形に）表したときの **$\\vec{c}$ の係数が $\\dfrac{5}{28}$** になりました。\n\nこのとき、$\\dfrac{AV}{VP}$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 2,
      answerDisplay: "5/2",
      unit: "",
      unknownLabel: "$\\dfrac{AV}{VP}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も O も P も、線分 AP 上の点という設定も同じ。入れかわったのは、分かっているものと求めるものだけ。step 4 でも同じ向きの入れかえをした。あのときの歩き方は使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分ける比のほうが分からない**こと $1$ つ。前題の道を、比を文字のままにして最後まで書いてみよう。$\\vec{c}$ の係数は、その文字でどう表されるだろう？",
        },
        {
          layer: 3,
          text: "step 4 と同じ向きの歩き方です。$AV : VP = p : q$ とおき、$k = \\dfrac{p}{p+q}$ と書くと、前題の道はそのまま\n\n$\\overrightarrow{OV} = \\vec{a} + k(\\overrightarrow{OP} - \\vec{a}) = (1-k)\\vec{a} + k\\,\\overrightarrow{OP}$\n\n前題で $\\overrightarrow{OP} = \\dfrac{3}{4}\\vec{b} + \\dfrac{1}{4}\\vec{c}$ でしたから\n\n$\\overrightarrow{OV} = (1-k)\\vec{a} + \\dfrac{3k}{4}\\vec{b} + \\dfrac{k}{4}\\vec{c}$\n\n$\\vec{c}$ の係数は $\\dfrac{k}{4}$。これが $\\dfrac{5}{28}$ なので $k = \\dfrac{5}{7}$。$k = \\dfrac{p}{p+q} = \\dfrac{5}{7}$ より $p : (p+q) = 5 : 7$、つまり $p : q = 5 : 2$。よって $\\dfrac{AV}{VP} = \\dfrac{5}{2}$。\n\n**確かめ**：$AV : VP = 5 : 2$ なら $\\overrightarrow{OV} = \\dfrac{2}{7}\\vec{a} + \\dfrac{15}{28}\\vec{b} + \\dfrac{5}{28}\\vec{c}$ で、たしかに $\\vec{c}$ の係数が $\\dfrac{5}{28}$ です。\n\n中心の問いへの部分回答：**翻訳は両方向に通る**。比から係数へ行けるだけでなく、係数$1$ つから比を割り出すこともできる。しかも $\\vec{c}$ の係数という「$1$ 本ぶんの情報」だけで、V の位置が決まってしまいました。",
        },
      ],
      formulaPreview: "OV = (1−k)a + (3k/4)b + (k/4)c、k/4 = 5/28 より k = 5/7、p : q = 5 : 2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "四角形 ABCD があり、$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AD} = \\vec{d}$ とします（$\\vec{b}$ と $\\vec{d}$ は平行ではありません）。この四角形は、対角線 AC が\n\n$\\overrightarrow{AC} = 2\\vec{b} + 3\\vec{d}$\n\nとなる形をしています。\n\n対角線 AC を $3 : 4$ に内分する点を P（$AP : PC = 3 : 4$）、対角線 BD を $2 : 5$ に内分する点を Q（$BQ : QD = 2 : 5$）とします。\n\n$\\overrightarrow{PQ}$ を $\\vec{b}$、$\\vec{d}$ の $2$ 本だけで表したときの **$\\vec{b}$ の係数**を求めましょう。答えは既約分数で答えましょう。",
      answer: -1 / 7,
      answerDisplay: "−1/7",
      unit: "",
      unknownLabel: "$\\vec{b}$ の係数",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 8 と比べてみよう。あのときも、書き換えを $2$ 段重ねて $1$ つの点を言い当てた。今度は、聞かれている矢印の両端がどちらも「分ける点」になっている。前題までの道を、$2$ 回使えないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**求める矢印の両端が、どちらも分ける点になった**こと $1$ つ。P も Q も、A から見た矢印としてなら書けます。それに、$\\overrightarrow{BD}$ はまだ $\\vec{b}$、$\\vec{d}$ の式になっていません——先にそこを片づける必要がありそうです。",
        },
        {
          layer: 3,
          text: "この問題は、$1$ 本の内分の式を当てるだけでは届きません。$3$ 段に分けて歩きます。\n\n**$1$ 段目：P**。P は対角線 AC を $3 : 4$ に分ける点で、始点が A のままなので $\\overrightarrow{AP} = \\dfrac{3}{7}\\overrightarrow{AC}$。ここで $\\overrightarrow{AC}$ が $\\vec{b}$、$\\vec{d}$ の式で与えられているのが効きます：\n\n$\\overrightarrow{AP} = \\dfrac{3}{7}(2\\vec{b} + 3\\vec{d}) = \\dfrac{6}{7}\\vec{b} + \\dfrac{9}{7}\\vec{d}$\n\n**$2$ 段目：Q**。Q は対角線 BD の上なので、まず「終点 $-$ 始点」で $\\overrightarrow{BD} = \\overrightarrow{AD} - \\overrightarrow{AB} = \\vec{d} - \\vec{b}$。次に B に寄り道して\n\n$\\overrightarrow{AQ} = \\vec{b} + \\dfrac{2}{7}(\\vec{d} - \\vec{b}) = \\dfrac{5}{7}\\vec{b} + \\dfrac{2}{7}\\vec{d}$\n\n**$3$ 段目：PQ**。両端が A から見た式になったので、もう一度「終点 $-$ 始点」を使います：\n\n$\\overrightarrow{PQ} = \\overrightarrow{AQ} - \\overrightarrow{AP} = \\left(\\dfrac{5}{7} - \\dfrac{6}{7}\\right)\\vec{b} + \\left(\\dfrac{2}{7} - \\dfrac{9}{7}\\right)\\vec{d} = -\\dfrac{1}{7}\\vec{b} - \\vec{d}$\n\nよって $\\vec{b}$ の係数は $-\\dfrac{1}{7}$。\n\nこの答えには、**AC を $3 : 4$ に分けたこと・BD を $2 : 5$ に分けたこと・$\\overrightarrow{AC}$ が $2\\vec{b} + 3\\vec{d}$ だったこと**の $3$ つが全部効いています。どれか $1$ つでも変えれば答えは変わる——たとえば $\\overrightarrow{AC} = 3\\vec{b} + 3\\vec{d}$ なら $-\\dfrac{4}{7}$、BD を $3 : 4$ に分けたなら $-\\dfrac{2}{7}$ です。「対角線の内分点」という言葉から式を $1$ 本当てて終わり、とはいかないのはそのためです。素朴な道が無いのではなく、**$2$ つの書き換えを何段も重ねる**必要がある、ということです。\n\n中心の問いへの答え：**寄り道と「終点 $-$ 始点」の $2$ つだけで、図形の中のどんな点も、好きな $1$ 点から見た $2$ 本の矢印の式になる**。式になってしまえば、あとは文字式の計算です。この問題で使ったのも、その $2$ つを $3$ 回並べただけでした。",
        },
      ],
      formulaPreview:
        "AP = (3/7)(2b + 3d) = (6/7)b + (9/7)d、AQ = (5/7)b + (2/7)d、PQ = AQ − AP = (5/7 − 6/7)b + (2/7 − 9/7)d = −(1/7)b − d",
    },
  ],
  derivation: `**中心の問い** ｜ A から B へ行く矢印は、**寄り道しても**同じ矢印。そして矢印は「**終点を指す矢印 $-$ 始点を指す矢印**」に必ず書き直せる——たった $2$ つの書き換えで、なぜ三角形の中のどんな点も $\\vec{b}$、$\\vec{c}$ の式に翻訳できてしまうのか？

────────

**道順が違っても、着く先は同じ**

A から B へ行くのに、いったん C に寄ってから B へ向かっても、着く先は B のままです。前の系列で見たとおり、[ベクトル] は「向き」と「大きさ」しか持たないので、A から B への矢印は道順に関係なくいつでも同じ $1$ 本。式で書けば

$\\overrightarrow{AB} = \\overrightarrow{AC} + \\overrightarrow{CB}$

これが**基本変形①（寄り道）**です。寄り道する点はどこにとってもかまいません——三角形の頂点でも、辺の上の点でも、図形の外の点でも。

<<M3V_DETOUR>>

**どこから見るかを、自分で決める**

もう $1$ つ。好きな点 O を基準にとると、$\\overrightarrow{AB}$ は「O から見た $2$ 本」だけで書き直せます。①の寄り道する点を O にして $\\overrightarrow{AB} = \\overrightarrow{AO} + \\overrightarrow{OB}$、$\\overrightarrow{AO}$ は $\\overrightarrow{OA}$ の [逆ベクトル] だから

$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}$

ことばにすれば「**終点を指す矢印から、始点を指す矢印を引く**」。これが**基本変形②**です。引く順を逆にすると [逆ベクトル] になってしまうので、そこだけ気をつけます。

<<M3V_END_MINUS_START>>

**ここが胚細胞**：この $2$ つは、どちらも「**始点を自分の好きな場所に取り替える道具**」です。①は途中に点を挟んで始点を分け、②は基準点をまるごと外に出す。**始点をそろえた瞬間、ばらばらだった矢印が同じ $2$ 本の物差しで測れるようになり、図形の中の点が式になります**。この系列で手に入れたのは、公式ではなく、この $2$ つの取り替えだけです。

**三角形の中を、$2$ 本で測る**

三角形 ABC で $\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$ としたとき、辺 BC 上の点はどれも $\\vec{b}$、$\\vec{c}$ の式になります。まず②で $\\overrightarrow{BC} = \\vec{c} - \\vec{b}$（step 1）。次に①で A から B に寄り道すれば、[内分] 点 R について $\\overrightarrow{AR} = \\vec{b} + \\dfrac{2}{7}(\\vec{c} - \\vec{b})$（step 2）。寄り道の相手を C に変えても同じ式に着きます（step 3）——道順は自由なのに答えは $1$ つ。これは $\\vec{b}$ と $\\vec{c}$ が平行でないおかげで、そのわけは次の次の系列で正面から扱います。

[外分] も同じ $2$ つで足ります。$\\overrightarrow{BQ}$ が $\\overrightarrow{BC}$ の何倍かが $1$ を超え、係数に負が現れるだけ（step 5）。線分 AM 上の点のように、いちど式にした点を端にして次を分けることもできます（step 6）。

**基準点は、外に出してよい**

step 7 で基準点を三角形の外の O に移しました。それでも辺 BC 上の点 P は $\\overrightarrow{OP} = \\dfrac{3}{4}\\vec{b} + \\dfrac{1}{4}\\vec{c}$ と書けて、$\\vec{a}$ は一度も要りません。しかも係数は、A を基準にしたときと**まったく同じ**でした。係数は「どこから見るか」ではなく「点が線分をどう分けているか」だけで決まるからです。この「基準点を自分で決める」という構えは、次の系列で公式になり、その先で [位置ベクトル] という名前をもらいます。

**幾何の道と、計算の道**

step 2 の $\\overrightarrow{AR} = \\dfrac{5}{7}\\vec{b} + \\dfrac{2}{7}\\vec{c}$ には、図形だけで着く道もあります。R を通って AC, AB に平行な直線をそれぞれ引き、AB との交点を $B'$、AC との交点を $C'$ とすると、四角形 $AB'RC'$ は平行四辺形になり、$AB' : AB = RC : BC = 5 : 7$、$AC' : AC = BR : BC = 2 : 7$。だから $\\overrightarrow{AR} = \\dfrac{5}{7}\\vec{b} + \\dfrac{2}{7}\\vec{c}$——同じ式です。

見た目にはこちらのほうが分かりやすい。けれど、**どこに補助線を引くかを思いつく必要があります**。いっぽうベクトルの道は、図形の性質を $1$ つも使いません。寄り道と「終点 $-$ 始点」を機械的に並べるだけで、同じ場所に着きます。ひらめきが要る図形の問題が、手順の要る式の計算に変わる——この系列は、その入口です。

**Step の道筋**

- **Step 1**：$\\overrightarrow{BC} = \\vec{c} - \\vec{b}$。$2$ 点を結ぶ矢印を、A から見た $2$ 本の引き算に書き直す（基本変形②）
- **Step 2**：A から R へ、B に寄り道してつなぐ（基本変形①）。辺の上の点が $\\vec{b}$、$\\vec{c}$ の式になる
- **Step 3**：寄り道の相手を C に変えても同じ式に着く。道順は自由、答えは $1$ つ
- **Step 4**：係数から比を逆算する。図形の言葉と式の言葉が往復できる
- **Step 5**：外分でも道具は同じ。倍率が $1$ を超え、係数に負が現れるだけ
- **Step 6**：いちど式にした点（中点 M）を端にして、その先の線分を分ける
- **Step 7（転換点）**：基準点を図形の外へ。$\\vec{a}$ が消え、係数は基準点によらない
- **Step 8**：外の基準点のまま $2$ 段重ね。消えていた $\\vec{a}$ が戻ってくる
- **Step 9**：係数 $1$ つから、線分 AP を分ける比を割り出す
- **Step 10（山場）**：四角形の $2$ 本の対角線。$2$ つの書き換えを $3$ 回並べて、$\\overrightarrow{PQ}$ を $\\vec{b}$、$\\vec{d}$ だけで書く

────────

**もっと深く** — 公式を覚える前に、この $2$ つで足りる

**忘れても導ける**：内分点の位置を表す式を忘れても、作り直せます。「A から P へ行く道を、B に寄り道する道に置きかえる」——これだけで $\\overrightarrow{AP} = \\overrightarrow{AB} + \\overrightarrow{BP}$。あとは $\\overrightarrow{BP}$ が $\\overrightarrow{BC}$ の何倍かを比から読み、$\\overrightarrow{BC}$ を「終点 $-$ 始点」で書き直せば終わりです。式を思い出す代わりに、**道順を描く**。次の系列で公式を作りますが、その公式もこの $3$ 行から生まれます。

**やってしまいがちな誤り $1$：引く順を逆にする**。$\\overrightarrow{AB}$ を $\\overrightarrow{OA} - \\overrightarrow{OB}$ と書いてしまうつまずきです。正しくは「**終点 $-$ 始点**」で $\\overrightarrow{OB} - \\overrightarrow{OA}$。迷ったら「$\\overrightarrow{OA}$ に何を足せば $\\overrightarrow{OB}$ になるか」と考えます。$\\overrightarrow{OA} + \\overrightarrow{AB} = \\overrightarrow{OB}$ なので、$\\overrightarrow{AB}$ は $\\overrightarrow{OB}$ から $\\overrightarrow{OA}$ を取り去ったもの。逆にすると [逆ベクトル] になり、点が反対側に飛びます。

**やってしまいがちな誤り $2$：負の係数を計算まちがいだと思う**。[外分] では係数に負が現れます（step 5 の $-\\dfrac{1}{3}$）。これは誤りではなく、点が線分の外に出ているという事実がそのまま符号に現れたものです。逆に、係数が全部正なら点は三角形の内側にいます——符号は位置を語っています。

**やってしまいがちな誤り $3$：内分比の向きを取り違える**。「BC を $2 : 5$ に内分」は $BR : RC = 2 : 5$ で、R は B 寄りです。$\\overrightarrow{BR}$ が $\\overrightarrow{BC}$ の $\\dfrac{2}{7}$ 倍なのか $\\dfrac{5}{7}$ 倍なのかは、ここで決まります。どちらの端から数えているかを、毎回声に出して確かめるとまちがえません。

**この先の景色**：次の系列では、この $2$ つの書き換えを毎回くり返すのが面倒になり、[内分]・[外分]・[中点]・[重心] の式を**公式**にまとめます。「やり方が分かる $\\to$ くり返しが面倒になる $\\to$ 公式にする」という順番が大事で、やり方を知らないまま公式だけ覚えても、それは数学を学んだことになりません。さらに進むと、基準点を自由に選ぶ構えが [位置ベクトル] という考え方になり、$2$ 本の基準を決めれば平面上のどんな点もただ $1$ 通りの数の組になることが分かります。そこまで来ると、図形の問題はほとんど文字式の計算です。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（ベクトルの基本変形①②を、内分・外分の公式の手前に独立して置く順序）と、
  「A から B へ行くのに C に寄り道する」「終点を指すベクトルから始点を指すベクトルを引く」「本来センスやひらめきが必要な図形問題を、単純な式計算に落とし込む」という着眼を参考。問題の値・場面（比の組・四角形の形）はすべてオリジナル。

────────

**問いに戻ると**

「たった $2$ つの書き換えで、なぜ三角形の中のどんな点も $\\vec{b}$、$\\vec{c}$ の式になるのか」——**$2$ つとも「始点を取り替える道具」だから**です。①で始点を途中の点まで運び、②で始点を好きな基準点にそろえる。この $2$ 手があれば、どんな $2$ 点を結ぶ矢印も、決めておいた $2$ 本の矢印の式に書き直せます。あとは分ける比が「何倍か」を決めるだけ。

だから道順は自由でした。B に寄っても C に寄っても、基準点が三角形の頂点でも外の点でも、同じ係数に着く（step 3・step 7）。**着き方が自由なのに、着く先が $1$ つ**——これが、図形を式に翻訳できるということの中身です。

**始点は、自分で選んでよかった。** 次の系列では、この $2$ つの書き換えを毎回やる代わりに、よく出てくる形を公式にまとめます。`,
};

/** M3V3: 内分・外分・重心（「平均」という顔）。
 *  原典 p.354〜356（内分・外分の公式／中点・重心の公式／重心の一致）に対応。
 *  「やり方が分かる → 何度も出てきて面倒 → 公式にして覚える」という順序を骨格にし、
 *  内分・外分・中点・重心を「重み付き平均」1 本の式の家族として渡す。
 *  質的変化 step6 は「混ぜる点が 3 つになるだけ」（重心＝3 つの平均）。
 *  山場 step10 は「G, P, Q が同一直線上か」を、2 つの係数が同じ k を指すことで決める。
 *
 *  追補10 の警戒（背骨 D2-2）：中点の係数 1/2・重心の係数 1/3 を提出値にする step は 0 件。
 *  step6 は 3 辺を別々の比で内分した三角形の重心なので係数が動く（11/40）。
 */
export const M3V_DIVISION_SERIES: LearnerSeries = {
  id: "math3_vec_division_01",
  title: "内分・外分・重心（「平均」という顔）",
  subtitle:
    "数Ⅲ・C ベクトルより — やり方が分かったあとで、なぜ公式にするのか。線分を分ける点の重みから、平行四辺形の $3$ 点が一直線に並ぶ山場まで $10$ 問。",
  patternId: "M3V3",
  unit: "math_3",
  revelationLabel:
    "**内分も外分も中点も重心も、$1$ 本の「重み付き平均」だった**。重みの選び方を変えるだけで、線分の内も外も、三角形のつり合いの点も、同じ式から出てくる——だから公式は $1$ 本でいい",
  drivingQuestion:
    "やり方が分かったあとで、なぜ**公式にして覚える**のか？——そして内分の公式は、数Ⅱで習った座標の公式と**同じ式**なのはなぜ？ 中点が「$2$ つの平均」、重心が「$3$ つの平均」に見えるのは偶然か？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "平面上に $2$ 点 A, B があり、その線分の外にもう $1$ つ点 O をとります。線分 AB を $1:4$ に [内分] する点を P とします（つまり $AP:PB = 1:4$）。\n\nこのとき $\\overrightarrow{OP}$ は、$\\overrightarrow{OA}$ と $\\overrightarrow{OB}$ を使って $\\overrightarrow{OP} = \\alpha\\overrightarrow{OA} + \\beta\\overrightarrow{OB}$ の形に書けます。\n\n**$\\beta$ の値**を求めましょう。答えは既約分数で答えましょう。\n\n（図は位置関係だけを表した模式図です。比は図からは読み取れません。）",
      answer: 1 / 5,
      answerDisplay: "1/5",
      unit: "",
      unknownLabel: "$\\beta$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "数直線の上で、$A(x_1)$ と $B(x_2)$ を $m:n$ に [内分] する点の座標を出したことがある。あれは両端の座標を重みをつけて混ぜた [重み付き平均] だった。いま両端は数ではなく矢印の先だけれど、**A から P まで進むのは、線分 AB の何割ぶん**だろう？",
        },
        {
          layer: 2,
          text: "見るところは $1$ つ——**A から P までが、線分 AB の何割ぶんか**。それが言えれば $\\overrightarrow{AP}$ は $\\overrightarrow{AB}$ の実数倍で書けます。あとは、前の系列で身につけた「寄り道」と「終点$-$始点」がそのまま使えます。",
        },
        {
          layer: 3,
          text: "$AP:PB = 1:4$ なので、A から P までは線分 AB の $\\dfrac{1}{1+4} = \\dfrac{1}{5}$ です。だから $\\overrightarrow{AP} = \\dfrac{1}{5}\\overrightarrow{AB}$。\n\nあとは基準点 O から見た形にそろえます。寄り道して $\\overrightarrow{OP} = \\overrightarrow{OA} + \\overrightarrow{AP}$、そして「終点$-$始点」で $\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}$ なので\n\n$\\overrightarrow{OP} = \\overrightarrow{OA} + \\dfrac{1}{5}(\\overrightarrow{OB} - \\overrightarrow{OA}) = \\dfrac{4}{5}\\overrightarrow{OA} + \\dfrac{1}{5}\\overrightarrow{OB}$。\n\nよって $\\beta = \\dfrac{1}{5}$。数Ⅱ「数直線上の点」で $\\dfrac{n x_1 + m x_2}{m+n}$ と書いた式と、文字の並びまで同じです——座標が矢印に変わっただけ。中心の問いへの最初の部分回答：**内分の公式は、数Ⅱの式の「座標」を「矢印」に置きかえたもの**。A の重み $\\dfrac{4}{5}$、B の重み $\\dfrac{1}{5}$、合計 $1$ の [重み付き平均] です。",
        },
      ],
      formulaPreview: "OP = OA + (1/5)(OB − OA) = (4/5)OA + (1/5)OB",
      figureMarker: "<<M3V_DIVISION_ARROW>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ基準点 O から見て、こんどは別の $2$ 点 C, D をとります。線分 CD を $2:7$ に内分する点を R とします（$CR:RD = 2:7$）。\n\n$\\overrightarrow{OR} = \\alpha\\overrightarrow{OC} + \\beta\\overrightarrow{OD}$ と書くとき、**$\\alpha$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 7 / 9,
      answerDisplay: "7/9",
      unit: "",
      unknownLabel: "$\\alpha$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 点も比も変わった。そして前題で求めたのは終点側 B の重み、今度求めるのは始点側 C の重み——同じ式の、どちら側だろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**求めるのが、分ける点 R に近い側の端 C の重み**になったこと。R は C の近くにいて、D からは遠い。近い端と遠い端では、どちらが重く効くだろう。",
        },
        {
          layer: 3,
          text: "前題と同じ道です。$CR:RD = 2:7$ なので $\\overrightarrow{CR} = \\dfrac{2}{9}\\overrightarrow{CD}$。寄り道と「終点$-$始点」で\n\n$\\overrightarrow{OR} = \\overrightarrow{OC} + \\dfrac{2}{9}(\\overrightarrow{OD} - \\overrightarrow{OC}) = \\dfrac{7}{9}\\overrightarrow{OC} + \\dfrac{2}{9}\\overrightarrow{OD}$。\n\nよって $\\alpha = \\dfrac{7}{9}$。\n\n**やってしまいがちな誤り**：比の $2$ を C に、$7$ を D に、そのまま貼りつけること。式を見ると **$2$ が付くのは D の側**です。R は C の近くにいるのに C の重みのほうが大きい（$\\dfrac{7}{9} > \\dfrac{2}{9}$）——**近い端ほど重い**、言いかえると**比の数は遠い方の端に付く**。分ける点をぐっと C に寄せた極端な場合（$1:100$）を思い浮かべると、C の重みが $1$ に近づくのが見えます。\n\n中心の問いへの部分回答：**重みは「どちらにどれだけ寄っているか」を表す数**であって、比の数字をそのまま並べたものではありません。",
        },
      ],
      formulaPreview: "OR = OC + (2/9)(OD − OC) = (7/9)OC + (2/9)OD",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは重みのほうが分かっています。線分 AB 上の点 S について\n\n$\\overrightarrow{OS} = \\dfrac{5}{8}\\overrightarrow{OA} + \\dfrac{3}{8}\\overrightarrow{OB}$\n\nと分かりました。このとき S は線分 AB を $AS:SB$ の比に内分しています。**$\\dfrac{AS}{SB}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 3 / 5,
      answerDisplay: "3/5",
      unit: "",
      unknownLabel: "$\\dfrac{AS}{SB}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。前題までは比が分かっていて重みを求めた。今度は分かっているものと求めるものが入れかわっている。前題までの道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**分からないものが比のほうにある**こと。小 $5$ の [平均] でも、平均と片方の値から残りを逆算したことがあった。$2$ つの重みを足すといくつになっているだろう。",
        },
        {
          layer: 3,
          text: "前題までで、$AS:SB = m:n$ のとき $\\overrightarrow{OS} = \\dfrac{n}{m+n}\\overrightarrow{OA} + \\dfrac{m}{m+n}\\overrightarrow{OB}$ でした。この形と見比べます。\n\n$\\overrightarrow{OA}$ の重みが $\\dfrac{5}{8}$ なので $\\dfrac{n}{m+n} = \\dfrac{5}{8}$。分母を $m+n = 8$ とみれば $n = 5$、残りが $m = 8 - 5 = 3$。よって $AS:SB = 3:5$ で、$\\dfrac{AS}{SB} = \\dfrac{3}{5}$。\n\n確かめると $\\dfrac{n}{m+n} = \\dfrac{5}{8}$、$\\dfrac{m}{m+n} = \\dfrac{3}{8}$ で、もとの式に戻ります。**$2$ つの重みは足すと $1$**（$\\dfrac{5}{8} + \\dfrac{3}{8} = 1$）なので、片方が分かればもう片方も決まる——だから比は $1$ 通りに逆算できます。小 $5$ の [平均] で、平均と個数から合計を逆算したのと同じ向きの計算です。\n\n中心の問いへの部分回答：**重みと比は、どちらからどちらへも行き来できる**。同じ $1$ つのことを $2$ 通りに言っているだけでした。",
        },
      ],
      formulaPreview: "n/(m+n) = 5/8 → m+n = 8, n = 5, m = 3 → AS:SB = 3:5、AS/SB = 3/5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "こんどは線分の**外側**です。線分 AB を $7:2$ に [外分] する点を Q とします（$AQ:QB = 7:2$ で、Q は線分 AB の外にあります）。\n\n$\\overrightarrow{OQ} = \\alpha\\overrightarrow{OA} + \\beta\\overrightarrow{OB}$ と書くとき、**$\\alpha$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -2 / 5,
      answerDisplay: "−2/5",
      unit: "",
      unknownLabel: "$\\alpha$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "step 1・2 と比べてみよう。分ける点が線分の中から外へ出た。中のときに歩いた道のうち、どこがそのまま使えて、どこが変わるだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**A から Q までが、線分 AB の何倍ぶんか**。内分のときその割合は $1$ より小さかった。Q が線分の外に出るとき、割合はどうなっている？",
        },
        {
          layer: 3,
          text: "step 1 とまったく同じ道を歩きます。$AQ:QB = 7:2$ の外分では Q は B の先にあり、A から Q までは線分 AB の $\\dfrac{7}{7-2} = \\dfrac{7}{5}$ 倍（$1$ より大きいので線分の外へ出る）。だから $\\overrightarrow{AQ} = \\dfrac{7}{5}\\overrightarrow{AB}$ で\n\n$\\overrightarrow{OQ} = \\overrightarrow{OA} + \\dfrac{7}{5}(\\overrightarrow{OB} - \\overrightarrow{OA}) = -\\dfrac{2}{5}\\overrightarrow{OA} + \\dfrac{7}{5}\\overrightarrow{OB}$。\n\nよって $\\alpha = -\\dfrac{2}{5}$。この式は、内分の公式 $\\dfrac{n\\overrightarrow{OA} + m\\overrightarrow{OB}}{m+n}$ の **$n$ を $-n$ に置きかえた**だけの形です（$\\dfrac{-2\\overrightarrow{OA} + 7\\overrightarrow{OB}}{7-2}$）。[外分] の公式を別に覚える必要はありません。\n\n重みを足すと $-\\dfrac{2}{5} + \\dfrac{7}{5} = 1$ で、合計はやはり $1$ のまま。$m < n$ の外分（たとえば $2:7$）なら分母が負になり、こんどは A の側の外に出ます——符号がひっくり返るだけで、式は同じです。\n\n中心の問いへの部分回答：**線分の外の点も、重みの片方を負にした [重み付き平均] で書ける**。内分と外分は、$1$ 本の式の家族でした。",
        },
      ],
      formulaPreview: "OQ = OA + (7/5)(OB − OA) = (−2/5)OA + (7/5)OB = (−2·OA + 7·OB)/(7−2)",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "三角形 OAB があります。辺 AB の [中点] を M、辺 OB を $1:4$ に内分する点を N とします（$ON:NB = 1:4$）。さらに線分 MN を $3:5$ に内分する点を R とします（$MR:RN = 3:5$）。\n\n$\\overrightarrow{OR} = s\\overrightarrow{OA} + t\\overrightarrow{OB}$ と書くとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 16,
      answerDisplay: "5/16",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。前題までは、分ける $2$ 点がはじめから $\\overrightarrow{OA}$・$\\overrightarrow{OB}$ の形で与えられていた。今度の線分 MN の両端はどうだろう？ そのまま公式に入れられる形になっている？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**公式を当てる相手が、いきなりは書けない $2$ 点 M, N になった**こと。M と N は、それぞれどの線分の上にいる点だろう。",
        },
        {
          layer: 3,
          text: "step 1・2 と同じ公式を、順に $3$ 回使うだけです。\n\nまず M は辺 AB の [中点] なので、重みが等しく $\\overrightarrow{OM} = \\dfrac{\\overrightarrow{OA} + \\overrightarrow{OB}}{2}$。次に N は $ON:NB = 1:4$ なので $\\overrightarrow{ON} = \\dfrac{1}{5}\\overrightarrow{OB}$（O から N までは辺 OB の $\\dfrac{1}{5}$）。\n\n最後に R は線分 MN を $MR:RN = 3:5$ に内分するので、遠い方の比を重みにして\n\n$\\overrightarrow{OR} = \\dfrac{5\\overrightarrow{OM} + 3\\overrightarrow{ON}}{3+5} = \\dfrac{1}{8}\\left(\\dfrac{5}{2}\\overrightarrow{OA} + \\dfrac{5}{2}\\overrightarrow{OB} + \\dfrac{3}{5}\\overrightarrow{OB}\\right)$。\n\n$\\overrightarrow{OB}$ の係数は $\\dfrac{5}{2} + \\dfrac{3}{5} = \\dfrac{25 + 6}{10} = \\dfrac{31}{10}$ なので\n\n$\\overrightarrow{OR} = \\dfrac{5}{16}\\overrightarrow{OA} + \\dfrac{31}{80}\\overrightarrow{OB}$、よって $s = \\dfrac{5}{16}$。\n\nここで効いているのが、**公式にしておくこと**の値打ちです。$3$ 回とも「寄り道して、終点$-$始点で書き直して」を一からやり直すこともできますが、それを $3$ 回くり返すのは面倒——だから $1$ 本の式にしておく。中心の問いへの部分回答：**公式にするのは、同じ作業が何度も来ると分かったから**。導き方を知っていれば、公式は思い出すためのメモになります。",
        },
      ],
      formulaPreview:
        "OM = (OA+OB)/2、ON = (1/5)OB、OR = (5·OM + 3·ON)/8 = (5/16)OA + (31/80)OB",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 ABC があります。辺 AB を $1:4$ に内分する点を P（$AP:PB = 1:4$）、辺 BC を $3:5$ に内分する点を Q（$BQ:QC = 3:5$）、辺 CA を $2:7$ に内分する点を R（$CR:RA = 2:7$）とします。\n\n三角形 PQR の [重心] を G' とします。$\\overrightarrow{AG'} = s\\overrightarrow{AB} + t\\overrightarrow{AC}$ と書くとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。\n\n（図は位置関係だけを表した模式図です。比は図からは読み取れません。）",
      answer: 11 / 40,
      answerDisplay: "11/40",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで混ぜてきたのは、いつも $2$ 点だった。今度は $3$ 点。前題で「中点＝重みの等しい混ぜ方」だったように、[重心] は $3$ 点をどう混ぜた点だろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**混ぜる点が $3$ つになった**こと。P, Q, R をそれぞれ $\\overrightarrow{AB}$、$\\overrightarrow{AC}$ で書くところまでは、前題までとまったく同じです。",
        },
        {
          layer: 3,
          text: "$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$ とおいて、まず $3$ 点を書きます。\n\n$\\overrightarrow{AP} = \\dfrac{1}{5}\\vec{b}$（$AP:PB = 1:4$）。\n$\\overrightarrow{AQ} = \\dfrac{5\\vec{b} + 3\\vec{c}}{3+5} = \\dfrac{5}{8}\\vec{b} + \\dfrac{3}{8}\\vec{c}$（辺 BC の内分。遠い方の比が重み）。\n$\\overrightarrow{AR} = \\dfrac{7}{9}\\vec{c}$（$CR:RA = 2:7$ なので R は A 寄りで、A から R までは辺 CA の $\\dfrac{7}{9}$）。\n\n[重心] は「$3$ つの平均」——$3$ 点を足して $3$ で割ります：\n\n$\\overrightarrow{AG'} = \\dfrac{\\overrightarrow{AP} + \\overrightarrow{AQ} + \\overrightarrow{AR}}{3} = \\dfrac{1}{3}\\left(\\left(\\dfrac{1}{5} + \\dfrac{5}{8}\\right)\\vec{b} + \\left(\\dfrac{3}{8} + \\dfrac{7}{9}\\right)\\vec{c}\\right)$。\n\n$\\dfrac{1}{5} + \\dfrac{5}{8} = \\dfrac{8 + 25}{40} = \\dfrac{33}{40}$ を $3$ で割って $\\dfrac{11}{40}$、$\\dfrac{3}{8} + \\dfrac{7}{9} = \\dfrac{27 + 56}{72} = \\dfrac{83}{72}$ を $3$ で割って $\\dfrac{83}{216}$。つまり $\\overrightarrow{AG'} = \\dfrac{11}{40}\\vec{b} + \\dfrac{83}{216}\\vec{c}$ で、$s = \\dfrac{11}{40}$。\n\n**ここが転換点です**。[中点] が「$2$ つの平均」なら、[重心] は「$3$ つの平均」。$2$ 点用の公式と $3$ 点用の公式が別々にあるのではなく、**混ぜる点の数が増えただけ**でした。$3$ つの比をばらばらにしたので係数も読みにくい分数になりましたが、比を変えれば $s$ も動きます——次の問題では、その $s$ のほうを先に決めてみます。\n\n中心の問いへの部分回答：**中点・内分・外分・重心は、混ぜる点の数と重みが違うだけの、$1$ 本の「平均」の式**。",
        },
      ],
      formulaPreview:
        "AG' = (AP+AQ+AR)/3 = ((1/5+5/8)b + (3/8+7/9)c)/3 = (11/40)b + (83/216)c",
      figureMarker: "<<M3V_DIVISION_G3>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "前題と同じ三角形 ABC で、辺 AB を $1:4$ に内分する点 P（$AP:PB = 1:4$）と、辺 CA を $2:7$ に内分する点 R（$CR:RA = 2:7$）はそのままにして、**辺 BC 上の点 Q だけを動かします**。\n\n三角形 PQR の重心を G' とし、$\\overrightarrow{AG'} = s\\overrightarrow{AB} + t\\overrightarrow{AC}$ と書きます。\n\n$s = \\dfrac{1}{4}$ になるとき、Q は辺 BC をどのような比に内分しているでしょうか。**$\\dfrac{BQ}{QC}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 9 / 11,
      answerDisplay: "9/11",
      unit: "",
      unknownLabel: "$\\dfrac{BQ}{QC}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$3$ 点のうち $2$ 点はそのままで、動かせるのは Q だけ。そして前題は $3$ つの比が分かっていて係数 $s$ を求めた。今度は $s$ のほうが先に分かっている。分かっているものと求めるものが入れかわっている——前題の道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**分からないものが、Q の内分比のほうにある**こと。前題で $s$ を組み立てたとき、$3$ 本のうち $\\overrightarrow{AQ}$ はどんな形で $s$ に効いていただろう。",
        },
        {
          layer: 3,
          text: "前題とまったく同じ道を、$1$ か所だけ文字にして歩きます。$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$ として、動かさない $2$ 点は前題のまま：\n\n$\\overrightarrow{AP} = \\dfrac{1}{5}\\vec{b}$（$AP:PB = 1:4$）、$\\overrightarrow{AR} = \\dfrac{7}{9}\\vec{c}$（$CR:RA = 2:7$）。\n\nQ は辺 BC 上の点なので、B から Q までが辺 BC の $q$ ぶんだとして $BQ:QC = q:(1-q)$ とおくと\n\n$\\overrightarrow{AQ} = (1-q)\\vec{b} + q\\vec{c}$。\n\n重心は $3$ つの平均なので\n\n$\\overrightarrow{AG'} = \\dfrac{1}{3}\\left(\\left(\\dfrac{1}{5} + 1 - q\\right)\\vec{b} + \\left(q + \\dfrac{7}{9}\\right)\\vec{c}\\right)$、つまり $s = \\dfrac{1}{3}\\left(\\dfrac{6}{5} - q\\right)$。\n\n$s = \\dfrac{1}{4}$ とおくと $\\dfrac{6}{5} - q = \\dfrac{3}{4}$、$q = \\dfrac{6}{5} - \\dfrac{3}{4} = \\dfrac{24 - 15}{20} = \\dfrac{9}{20}$。\n\n$q$ は B から Q までが辺 BC の何割かなので、$BQ:QC = \\dfrac{9}{20} : \\dfrac{11}{20} = 9:11$、よって $\\dfrac{BQ}{QC} = \\dfrac{9}{11}$。\n\n**$q$ がただ $1$ 通りに決まる**ところに注目してください。$s$ は $q$ についての $1$ 次式（$s = \\dfrac{2}{5} - \\dfrac{q}{3}$）なので、$s$ を決めれば当てはまる比は $1$ つだけ。前題で「比を決めれば G' が決まる」と歩いた道が、そのまま逆向きに歩けました。\n\n中心の問いへの部分回答：**重みと比の行き来は、混ぜる点が $3$ つになっても同じ**。step 3 で $2$ 点の重みから比を逆算したのと、やっていることは変わりません。",
        },
      ],
      formulaPreview:
        "AQ = (1−q)b + qc、s = (1/5 + 1 − q)/3 = 2/5 − q/3 = 1/4 → q = 6/5 − 3/4 = 9/20 → BQ:QC = 9:11",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "平行四辺形 ABCD で、$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AD} = \\vec{d}$ とします（$\\vec{b}$ と $\\vec{d}$ は平行でない $2$ 本の矢印です）。\n\n辺 CD を $5:3$ に外分する点を Q とします（$CQ:QD = 5:3$）。\n\n$\\overrightarrow{AQ} = s\\vec{b} + t\\vec{d}$ と書くとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -3 / 2,
      answerDisplay: "−3/2",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "step 4 と比べてみよう。あのときも外分だったが、分ける $2$ 点はどちらも、はじめから基準の矢印そのものだった。今度分けるのは C と D。この $2$ 点を指す矢印は、どちらも $\\vec{b}$、$\\vec{d}$ の式になっているだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**外分する $2$ 点のうち C が、$\\vec{b}$、$\\vec{d}$ で書き直さないと使えない**こと。平行四辺形 ABCD の中で、A から C へ行く道はどうなっている？",
        },
        {
          layer: 3,
          text: "step 4 と同じ外分の式を使いますが、その前に C を書き直します。平行四辺形なので、A から B へ行ってから D の向きに同じだけ進めば C に着く：$\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{AD} = \\vec{b} + \\vec{d}$。\n\n$CQ:QD = 5:3$ の外分なので、外分の式（内分の $n$ を $-n$ にしたもの）で\n\n$\\overrightarrow{AQ} = \\dfrac{-3\\overrightarrow{AC} + 5\\overrightarrow{AD}}{5-3} = \\dfrac{-3(\\vec{b} + \\vec{d}) + 5\\vec{d}}{2} = \\dfrac{-3\\vec{b} + 2\\vec{d}}{2} = -\\dfrac{3}{2}\\vec{b} + \\vec{d}$。\n\nよって $s = -\\dfrac{3}{2}$。$\\vec{b}$ の係数が負なのは、Q が D をこえた外側、つまり $\\vec{b}$ とは逆向きに出た位置にあるからです。\n\nついでに見えたこと：この平行四辺形では **CD が AB と平行**なので、辺 CD 上（およびその延長上）のどこに点をとっても $\\vec{d}$ の係数は $1$ のまま動きません。動くのは $\\vec{b}$ の係数のほうだけです。\n\n中心の問いへの部分回答：**基準を $2$ 本決めてしまえば、図形の中のどの点も同じ形の式に落ちる**。平行四辺形という図形の性質は、$\\overrightarrow{AC} = \\vec{b} + \\vec{d}$ という $1$ 行に翻訳されました。",
        },
      ],
      formulaPreview:
        "AC = b + d、AQ = (−3·AC + 5·AD)/(5−3) = (−3b + 2d)/2 = −(3/2)b + d",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ平行四辺形 ABCD で、対角線 BD を $8:3$ に内分する点を P とします（$BP:PD = 8:3$）。また、三角形 BCD の重心を G とします。\n\n$\\overrightarrow{GP} = s\\vec{b} + t\\vec{d}$ と書くとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -13 / 33,
      answerDisplay: "−13/33",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで求めてきたのは、いつも $1$ つの基準点を始点とする矢印だった。今度の $\\overrightarrow{GP}$ は、始点も終点も基準点ではない。前の系列で身につけた「終点$-$始点」は、ここでも使えるだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**始点が A ではない矢印**を求めること。$\\overrightarrow{GP}$ を、A を始点とする矢印だけから作れないだろうか。",
        },
        {
          layer: 3,
          text: "「終点$-$始点」で $\\overrightarrow{GP} = \\overrightarrow{AP} - \\overrightarrow{AG}$ と書き直せば、あとは A を始点とする矢印を $2$ 本作るだけです。\n\nP は対角線 BD を $BP:PD = 8:3$ に内分するので、遠い方の比を重みにして\n$\\overrightarrow{AP} = \\dfrac{3\\overrightarrow{AB} + 8\\overrightarrow{AD}}{8+3} = \\dfrac{3}{11}\\vec{b} + \\dfrac{8}{11}\\vec{d}$。\n\nG は三角形 BCD の重心なので、$3$ つの平均で（step 8 の $\\overrightarrow{AC} = \\vec{b} + \\vec{d}$ を使って）\n$\\overrightarrow{AG} = \\dfrac{\\overrightarrow{AB} + \\overrightarrow{AC} + \\overrightarrow{AD}}{3} = \\dfrac{\\vec{b} + (\\vec{b} + \\vec{d}) + \\vec{d}}{3} = \\dfrac{2}{3}\\vec{b} + \\dfrac{2}{3}\\vec{d}$。\n\nしたがって\n$\\overrightarrow{GP} = \\left(\\dfrac{3}{11} - \\dfrac{2}{3}\\right)\\vec{b} + \\left(\\dfrac{8}{11} - \\dfrac{2}{3}\\right)\\vec{d} = -\\dfrac{13}{33}\\vec{b} + \\dfrac{2}{33}\\vec{d}$\n\n（$\\dfrac{3}{11} - \\dfrac{2}{3} = \\dfrac{9 - 22}{33}$、$\\dfrac{8}{11} - \\dfrac{2}{3} = \\dfrac{24 - 22}{33}$）。よって $s = -\\dfrac{13}{33}$。\n\n中心の問いへの部分回答：**始点をどこにそろえるかは、自分で選んでよい**。いったん A にそろえてしまえば、あとは引き算だけで、図形の中のどの $2$ 点を結ぶ矢印でも作れます。",
        },
      ],
      formulaPreview:
        "GP = AP − AG = (3/11 − 2/3)b + (8/11 − 2/3)d = −(13/33)b + (2/33)d",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "同じ平行四辺形 ABCD で、$3$ 点を考えます。G は三角形 BCD の重心、P は対角線 BD を $8:3$ に内分する点（$BP:PD = 8:3$）、Q は辺 CD を $5:3$ に外分する点（$CQ:QD = 5:3$）です。\n\nこの $3$ 点が同じ $1$ 本の直線の上に並ぶかどうかは、$\\overrightarrow{GQ} = k\\overrightarrow{GP}$ となる実数 $k$ があるかどうかで決まります。\n\nこの $k$ の値を求めましょう。答えは既約分数で答えましょう。",
      answer: 11 / 2,
      answerDisplay: "11/2",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題で作ったのは $\\overrightarrow{GP}$ の $1$ 本だけだった。今度はもう $1$ 本要る。$2$ 本の矢印が「同じ向き（または反対向き）で長さだけ違う」ことは、$\\vec{b}$、$\\vec{d}$ の係数を並べたとき、どこに現れるだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**比べる矢印が $2$ 本になった**こと。もう $1$ 本のほうも、前題とまったく同じ道で作れます。$2$ 本を並べたとき、$k$ 倍という関係はいくつの場所で成り立っていなければならないだろう。",
        },
        {
          layer: 3,
          text: "前題で $\\overrightarrow{GP} = -\\dfrac{13}{33}\\vec{b} + \\dfrac{2}{33}\\vec{d}$ でした。同じ道でもう $1$ 本を作ります。step 8 の解式で $\\overrightarrow{AQ} = -\\dfrac{3}{2}\\vec{b} + \\vec{d}$、前題の解式で $\\overrightarrow{AG} = \\dfrac{2}{3}\\vec{b} + \\dfrac{2}{3}\\vec{d}$ だったので\n\n$\\overrightarrow{GQ} = \\overrightarrow{AQ} - \\overrightarrow{AG} = \\left(-\\dfrac{3}{2} - \\dfrac{2}{3}\\right)\\vec{b} + \\left(1 - \\dfrac{2}{3}\\right)\\vec{d} = -\\dfrac{13}{6}\\vec{b} + \\dfrac{1}{3}\\vec{d}$。\n\n$\\overrightarrow{GQ} = k\\overrightarrow{GP}$ とおきます。$\\vec{b}$ と $\\vec{d}$ は平行でないので、**$\\vec{b}$ の係数どうし・$\\vec{d}$ の係数どうしが、それぞれ別々に等しく**なければなりません：\n\n$-\\dfrac{13}{6} = k\\left(-\\dfrac{13}{33}\\right)$ より $k = \\dfrac{33}{6} = \\dfrac{11}{2}$、\n$\\dfrac{1}{3} = k\\cdot\\dfrac{2}{33}$ より $k = \\dfrac{33}{6} = \\dfrac{11}{2}$。\n\n**$2$ つの式が同じ $k$ を指した**——これが「$3$ 点が同じ直線の上にある」ことの証人です。もし $2$ つが別々の $k$ を指したら、どんな $k$ をとっても $\\overrightarrow{GQ} = k\\overrightarrow{GP}$ にはならず、$3$ 点は一直線上にありません。よって $k = \\dfrac{11}{2}$。\n\n**やってしまいがちな誤り**：図をながめて「たぶん並んでいるだろう」と決めてしまうこと。G は三角形 BCD のつり合いの点、P は対角線の上、Q は辺 CD の延長の先——この $3$ つが並ぶかどうかは、ていねいに図を描いても目では決まりません。$\\vec{b}$、$\\vec{d}$ という $2$ 本の基準にそろえて係数を見比べる、この道だけが決めてくれます。\n\n中心の問いへの答え：**公式にして覚えるのは、同じ「重み付き平均」を何度も使う場面が来ると分かったから**。そしてその公式は、数Ⅱの座標の内分・外分の式の「座標」を「矢印」に置きかえただけのものでした。中点が $2$ つの平均、重心が $3$ つの平均に見えるのも偶然ではなく、混ぜる点の数が違うだけの同じ式だから。この $1$ 本の式のおかげで、「$3$ 点が一直線に並ぶ」という目では決められない図形の事実が、係数を $2$ つ見比べる計算になりました。",
        },
      ],
      formulaPreview:
        "GQ = AQ − AG = −(13/6)b + (1/3)d、GP = −(13/33)b + (2/33)d → 両方の係数から k = 11/2",
    },
  ],
  derivation: `**中心の問い** ｜ やり方が分かったあとで、なぜ**公式にして覚える**のか？——そして内分の公式は、数Ⅱで習った座標の公式と**同じ式**なのはなぜ？ 中点が「$2$ つの平均」、重心が「$3$ つの平均」に見えるのは偶然か？

────────

**「やり方が分かる」→「面倒になる」→「公式にする」**

前の系列で、線分を分ける点も三角形の重心も、$2$ つの基本変形（寄り道と、終点$-$始点）を組み合わせれば書けることが分かりました。分かったのだから、それでいいはずです。

けれど、この先この作業は**何度も何度も**出てきます。step 5 では $1$ 問のうちに $3$ 回、step 6 では $3$ 点ぶん。そのたびに「A から出て、P まで行って、終点$-$始点で書き直して……」と一からやり直すのは面倒です。**だから公式にする**。

順序が大事です。**やり方が分かる → 何度も出てきて面倒になる → だから公式にして覚える**。この順序でなく、やり方を知らないまま公式だけ丸暗記したら、それは数学を学んだことにはなりません。公式は、**すでに歩ける道の近道**として持つものです。

**内分の公式は、$3$ 行で導ける**

線分 AB を $m:n$ に [内分] する点 P と、基準点 O。A から P までは線分 AB の $\\dfrac{m}{m+n}$ だけ進んだところです。

<<M3V_DIVISION_ARROW>>

あとは基本変形を $2$ つ使うだけ：

寄り道（基本変形①）で　$\\overrightarrow{OP} = \\overrightarrow{OA} + \\overrightarrow{AP} = \\overrightarrow{OA} + \\dfrac{m}{m+n}\\overrightarrow{AB}$

終点$-$始点（基本変形②）で　$= \\overrightarrow{OA} + \\dfrac{m}{m+n}(\\overrightarrow{OB} - \\overrightarrow{OA})$

整理して　$= \\dfrac{n\\overrightarrow{OA} + m\\overrightarrow{OB}}{m+n}$

$3$ 行です。忘れてもこの $3$ 行を書けば復元できます。そして出てきた式を、数Ⅱ「数直線上の点」で習った $\\dfrac{n x_1 + m x_2}{m+n}$ と並べてみてください——**座標が矢印になっただけで、文字の並びは完全に同じ**。数Ⅱでやったことは、ここでそのまま生きています。

**ここが胚細胞**：内分・外分・中点・重心は、別々の公式ではありません。**「$2$ つ（あるいは $3$ つ）の点を、重みをつけて混ぜる」という $1$ 本の式**を、重みの選び方だけ変えて使い分けているのです。重みは足すと必ず $1$——その $1$ を $m:n$ に割り振るか、半分ずつにするか、$3$ 等分するか、片方を負にするか。それだけの違いです。

**中点は「$2$ つの平均」、重心は「$3$ つの平均」**

$m:n = 1:1$ とすれば、重みは半分ずつ：

$$\\overrightarrow{OM} = \\dfrac{\\overrightarrow{OA} + \\overrightarrow{OB}}{2}$$

足して $2$ で割る——[中点] は文字どおり「$2$ つのベクトルの平均」です。

三角形 ABC の [重心] G は、辺 BC の中点 M と頂点 A を結んだ中線を $2:1$ に内分する点でした（図形の性質で学んだとおり）。内分の公式を $2$ 段重ねると：

$$\\overrightarrow{OG} = \\dfrac{\\overrightarrow{OA} + 2\\overrightarrow{OM}}{2+1} = \\dfrac{\\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC}}{3}$$

<<GEO_CENTROID>>

足して $3$ で割る——**重心は「$3$ つのベクトルの平均」**。中点が $2$ つの平均だったのだから、重心が $3$ つの平均になるのは偶然ではありません。**混ぜる点の数が $1$ つ増えただけ**です。step 6 では $3$ 辺をばらばらの比で分けた $3$ 点を混ぜましたが、やったことは同じ「足して $3$ で割る」でした。

**外分は「重みが負になった平均」**

$m:n$ に [外分] する点は、内分の公式の $n$ を $-n$ に置きかえるだけ：

$$\\overrightarrow{OQ} = \\dfrac{-n\\overrightarrow{OA} + m\\overrightarrow{OB}}{m-n}$$

重みは $\\dfrac{-n}{m-n}$ と $\\dfrac{m}{m-n}$ で、合計はやはり $1$。**片方の重みが負になると、点は線分の外へ出ます**（step 4・step 8）。負の重みという言い方が奇妙に見えても、式のうえでは何も特別なことは起きていません。

**「一直線に並ぶ」も、係数の話になる**

$3$ 点 G, P, Q が同じ直線の上にあることは、$\\overrightarrow{GQ} = k\\overrightarrow{GP}$ となる実数 $k$ があること——つまり「一方の矢印を何倍かすれば、もう一方になる」ことです。$2$ 本の基準の矢印にそろえて書けば、$\\vec{b}$ の係数と $\\vec{d}$ の係数の $2$ か所で同じ $k$ が出るかどうかを見るだけになります（step 10）。目で見ても分からない図形の事実が、$2$ つの分数を見比べる作業に変わりました。

**Step の道筋**

- **Step 1**：内分の公式を、寄り道と終点$-$始点から自分で作る。数Ⅱの座標の式と同じ形
- **Step 2**：重みは「遠い方の比」。近い端ほど重い
- **Step 3**：重みから比へ逆算する。$2$ つの重みは足すと $1$
- **Step 4**：外分は、内分の $n$ を $-n$ に。重みの片方が負になる
- **Step 5**：公式を $3$ 回重ねる。ここで「公式にしてよかった」が効いてくる
- **Step 6（転換点）**：混ぜる点が $3$ つになる。重心は「$3$ つの平均」
- **Step 7**：係数 $s$ のほうを先に決めて、$3$ つ目の点の内分比を逆算する
- **Step 8**：平行四辺形の頂点 C を $\\vec{b} + \\vec{d}$ に翻訳してから外分する
- **Step 9**：始点を A にそろえて引く。始点は自分で選んでよい
- **Step 10（山場）**：$\\overrightarrow{GQ} = k\\overrightarrow{GP}$。$2$ つの係数が同じ $k$ を指すことが、一直線の証人

────────

**もっと深く** — 公式を「覚えるもの」から「作れるもの」へ

**忘れても導ける**：内分の公式を忘れても困りません。紙に O, A, B, P を打って、**「A から P までは線分 AB の何割か」を書き、寄り道と終点$-$始点の $2$ つを当てる**——上の $3$ 行がそのまま復元です。外分も、割合が $1$ をこえるだけで同じ $3$ 行。中点は $m:n$ を $1:1$ に、重心は公式を $2$ 段重ねるだけ。覚えているのは公式ではなく、**「基準点から寄り道して、終点$-$始点で書き直す」という手つき $1$ つ**でいい。公式は、その手つきを毎回くり返さずにすませるための近道です。

**やってしまいがちな誤り $1$：比の数を、近い方の端に貼りつける**。$AP:PB = m:n$ のとき、$\\overrightarrow{OA}$ に付く重みは $m$ ではなく $\\dfrac{n}{m+n}$ です。**比の数は、遠い方の端に付く**（step 2）。迷ったら極端な場合を思い浮かべてください——$1:100$ に内分すれば P はほとんど A の上にいて、$\\overrightarrow{OP}$ はほとんど $\\overrightarrow{OA}$。つまり A の重みが $1$ に近い。$\\dfrac{100}{101}$ が A に付いていなければおかしい、と気づけます。

**やってしまいがちな誤り $2$：比を測る向きを取り違える**。$AR:RC$ と $CR:RA$ は、同じ点を反対から見た比で、数の並びが逆さになります。step 6・7 の R は「$CR:RA = 2:7$」であって「$AR:RC = 2:7$」ではありません（だから $\\overrightarrow{AR} = \\dfrac{7}{9}\\overrightarrow{AC}$）。三角形の $3$ 辺を「同じ比で」内分すると言うときは、$A \\to B$、$B \\to C$、$C \\to A$ と**向きをそろえて**測っているかを必ず確かめましょう。

**やってしまいがちな誤り $3$：図で「並んでいる」と決めてしまう**。$3$ 点が一直線上にあるかどうかは、どれだけていねいに描いても目では決まりません。決めてくれるのは、$2$ 本の基準にそろえたときの係数だけです（step 10）。

**$3$ 辺を同じ比で分けると、重心は動かない**：step 6・7 では $3$ 辺をばらばらの比で内分し、G' はもとの重心 G とは別の点になりました。では、どんなときに $2$ つの重心は一致するのでしょうか。上の書き方でそのまま調べられます。$\\overrightarrow{AP} = x\\vec{b}$、$\\overrightarrow{AQ} = (1-y)\\vec{b} + y\\vec{c}$、$\\overrightarrow{AR} = z\\vec{c}$ とおくと

$$\\overrightarrow{AG'} = \\dfrac{x + 1 - y}{3}\\vec{b} + \\dfrac{y + z}{3}\\vec{c}$$

で、これが $\\overrightarrow{AG} = \\dfrac{1}{3}\\vec{b} + \\dfrac{1}{3}\\vec{c}$ と一致する条件は $x = y$ かつ $y + z = 1$。$3$ 辺を $A \\to B$、$B \\to C$、$C \\to A$ の向きにそろえて同じ比 $m:n$ で内分すれば $x = y = \\dfrac{m}{m+n}$、$z = \\dfrac{n}{m+n}$ となって、$2$ つとも自動的に満たされます。逆に $x = y$ と $y + z = 1$ を比に読み直すと、$3$ つの比がすべて等しいことに行き着く——つまり **$2$ つの重心が一致するのは、$3$ 辺を同じ向きに同じ比で分けたときに限る**のです。step 7 で $s$ を $\\dfrac{1}{4}$ に指定したとき Q が $9:11$ という半端な比になったのも、$3$ 辺がそろっていないからでした。

**重みの合計が $1$ という目印**：内分でも外分でも中点でも重心でも、重みを全部足すと必ず $1$ になります。計算の途中でこれが崩れたら、どこかで間違えています——検算に使える、いちばん手軽な目印です。

**この先の景色**：次の系列では、いま当たり前のように使った「$\\vec{b}$ の係数どうし・$\\vec{d}$ の係数どうしを別々に等しいとおいてよい」という手つきそのものを問い直します。$2$ 本の矢印が平行でないとき、どんな矢印もその $2$ 本で**ただ $1$ 通り**に書ける——だから係数を比べてよい。この事実（$1$ 次独立）が分かると、$2$ 直線の交点のような「$2$ 通りの書き方」を突き合わせる問題が、そのまま連立方程式になります。さらに進むと、基準点 O 自身を自分の好きな場所に選び直す [位置ベクトル] の考え方に届きます——図形に合わせて座標軸を作り替えてしまう、という発想です。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（ベクトルの基本変形 $\\to$ 内分・外分の公式 $\\to$ 中点・重心の公式）と、
  「やり方がわかる $\\to$ 繰り返しが面倒になる $\\to$ 公式化して覚える、という順序がとても大切」「数学Ⅱで学んだ内分・外分の公式と実質同じ」「中点は $2$ つのベクトルの平均、重心は $3$ つのベクトルの平均」という着眼を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ公式にして覚えるのか」——**やり方が分かったうえで、それが何度も出てくると分かったから**です。step 5 では $1$ 問のうちに $3$ 回使いました。導き方（寄り道と終点$-$始点の $3$ 行）を手放さずに持っているかぎり、公式は暗記ではなく近道です。

「なぜ数Ⅱの座標の公式と同じ式なのか」——**同じことをしているから**です。数直線の上で座標を重みで混ぜたのと、平面の上で矢印を重みで混ぜたのは、まったく同じ操作でした。座標が矢印に変わっても、重みの割り振り方は変わりません。

「中点が $2$ つの平均、重心が $3$ つの平均に見えるのは偶然か」——**偶然ではありません**。両方とも同じ「重み付き平均」の式で、混ぜる点の数と重みが違うだけ。$1:1$ に割れば中点、$3$ 等分すれば重心、$m:n$ に割れば内分、片方を負にすれば外分。

**$1$ 本の式の家族。** 重みの選び方を変えるだけで、線分の内も外も、三角形のつり合いの点も出てくる——次の系列では、この「係数を見比べてよい」という手つきの根拠そのものを問い直します。`,
};

/**
 * 「ベクトル」ユニット 系列4（数Ⅲ・C 第9章）。
 *
 * 背骨設計は docs/math3c_vector_design.md（凍結・2026-08-30）の「系列4」節。
 * お手本は frontend/src/lib/seriesMath3Vector.ts（系列1）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第9章 ベクトル（旺文社・2024）の
 * 章構成を借り、問題の値・場面はすべてオリジナルに変更（copyright-credit-vs-copy）。
 *
 * 入力の折り方（背骨 D2）：
 * - 交点の位置は k（AP = k AD の実数）で提出。比は分数（AP/PD・OC/CA・OP/PQ）で提出
 * - 同じ連立から出る k と l を別 step に並べない。k と比 k:(1−k) も並べない
 *   （step5 は内分比を替えた別の三角形・step9 は別の交点・step10 は逆問題）
 * - 「1 次独立なら表し方は 1 通り」（つねに 1）は問わず、「1 次独立でない組の個数」を問う
 */

/** M3V4: 1 次独立と 2 通りの表し方（一里塚）。
 *  基準の 2 本を決めれば、どんな矢印もただ 1 通りに「数の組」へ翻訳される。
 *  質的変化 step4 は、比の分からない交点を「2 通りに書いて係数を比べる」で決める一里塚。
 *  山場 step10 は、その連立を逆向きに使って、交点の比から辺上の点の内分比を逆算する。 */
export const M3V_INDEPENDENT_SERIES: LearnerSeries = {
  id: "math3_vec_independent_01",
  title: "1 次独立と 2 通りの表し方（一里塚）",
  subtitle:
    "数Ⅲ・C ベクトルより — 基準の矢印を $2$ 本決めれば、どんな矢印もただ $1$ 通りに「$2$ つの数の組」になる。基準に使える組の見分けから、比の分からない交点を計算だけで決める一里塚を通り、比の逆算まで $10$ 問。",
  patternId: "M3V4",
  unit: "math_3",
  revelationLabel:
    "**「ただ $1$ 通り」が、$2$ つの式を連立方程式に変えていた**。同じ $1$ 点を $2$ 通りに書けたら、基準の $2$ 本が $1$ 次独立であるかぎり、係数どうしは一致するしかない——だから、比の分からない交点が計算だけで決まる",
  drivingQuestion:
    "基準の矢印を $2$ 本決めると、**どんな矢印も「$2$ つの数の組」にただ $1$ 通りで翻訳される**——なぜ「ただ $1$ 通り」なのか。そしてその「ただ $1$ 通り」が、比の分からない交点を**計算だけで**決めてしまうのはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "平行四辺形のタイルを敷きつめた床で、タイル $1$ 枚ぶんの $2$ つの辺に沿った矢印を $\\vec{e}$、$\\vec{f}$ とします。この $2$ 本を組み合わせれば、床の上のどんな矢印も $s\\vec{e} + t\\vec{f}$ の形で表せました。\n\nでは、$\\vec{e}$、$\\vec{f}$ のかわりに別の $2$ 本を基準にしたら、どうでしょう。$2$ 本の矢印が**ともに [零ベクトル] でなく、たがいに平行でもない**とき、その $2$ 本は [1次独立] であるといいます（図）。基準に使えるのは、$1$ 次独立な $2$ 本だけです。\n\n次の①〜⑤のうち、**$1$ 次独立でない組は何組**あるでしょうか。\n\n① $\\vec{u} = 2\\vec{e} + 3\\vec{f}$、$\\vec{v} = 4\\vec{e} + 6\\vec{f}$\n\n② $\\vec{u} = 3\\vec{e} - \\vec{f}$、$\\vec{v} = 2(\\vec{e} + \\vec{f}) - 8\\vec{e} + \\vec{f}$\n\n③ $\\vec{u} = 5\\vec{e} + 2\\vec{f}$、$\\vec{v} = 3\\vec{e} + 6\\vec{f} - 3(\\vec{e} + 2\\vec{f})$\n\n④ $\\vec{u} = -\\vec{e} + 4\\vec{f}$、$\\vec{v} = 2\\vec{e} - 8\\vec{f}$\n\n⑤ $\\vec{u} = \\vec{e} + 5\\vec{f}$、$\\vec{v} = 2\\vec{e} + 9\\vec{f}$",
      answer: 3,
      unit: "組",
      unknownLabel: "$1$ 次独立でない組の数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "タイルの床の上を、$2$ 本の矢印だけをつないで歩くと考えてみよう。もし $2$ 本が同じ $1$ 本の直線に沿って並んでいたら、歩いて行ける場所はどんな形になるだろう？ 床じゅうのどこへでも行けるだろうか。$2$ 本のうち一方が長さ $0$ だったら、どうだろう。",
        },
        {
          layer: 2,
          text: "見るところは $1$ つ——**まず①〜⑤のそれぞれを「$\\vec{e}$ 何枚・$\\vec{f}$ 何枚」の形に整理する**こと。かっこのついたものは、そのままでは正体が見えない。整理してから $2$ 本を見くらべよう。$5$ 組それぞれで結果が変わるので、順に確かめていく。",
        },
        {
          layer: 3,
          text: "まず全部を「$\\vec{e}$ 何枚・$\\vec{f}$ 何枚」に整理します。\n\n① $\\vec{u} = 2\\vec{e} + 3\\vec{f}$、$\\vec{v} = 4\\vec{e} + 6\\vec{f} = 2\\vec{u}$。$\\vec{v}$ は $\\vec{u}$ の $2$ 倍——同じ向きに並んでいるので**平行**。$1$ 次独立ではありません。\n\n② $\\vec{v} = 2\\vec{e} + 2\\vec{f} - 8\\vec{e} + \\vec{f} = -6\\vec{e} + 3\\vec{f}$。$\\vec{u} = 3\\vec{e} - \\vec{f}$ を $-2$ 倍すると $-6\\vec{e} + 2\\vec{f}$ で、$\\vec{v}$ とは $\\vec{f}$ の枚数が違います。何倍しても重ならないので**平行ではなく**、どちらも $\\vec{0}$ でない——$1$ 次独立です。\n\n③ $\\vec{v} = 3\\vec{e} + 6\\vec{f} - 3\\vec{e} - 6\\vec{f} = \\vec{0}$。$\\vec{v}$ が [零ベクトル] なので、$1$ 次独立ではありません。\n\n④ $\\vec{v} = 2\\vec{e} - 8\\vec{f} = -2\\vec{u}$。向きが反対の平行——$1$ 次独立ではありません。\n\n⑤ $\\vec{u} = \\vec{e} + 5\\vec{f}$ を $2$ 倍すると $2\\vec{e} + 10\\vec{f}$ で、$\\vec{v} = 2\\vec{e} + 9\\vec{f}$ とは $\\vec{f}$ の枚数が $1$ 枚違います。**平行ではない**ので $1$ 次独立です。\n\n$1$ 次独立でないのは①③④の **$3$ 組**。\n\n①②④⑤はどれも「$\\vec{e}$ の枚数はきれいに何倍かになっている」のに、②⑤は $\\vec{f}$ の枚数がそろわない——**枚数を両方そろえて見ないと、平行かどうかは決まりません**。中心の問いへの最初の部分回答：**基準に使える $2$ 本には条件がある**。$2$ 本が同じ直線に沿って並んでいたら、その直線から外れた点へは永久に行けません。$3$ 点 O, A, B が**三角形をなしている**とき、$\\overrightarrow{OA}$ と $\\overrightarrow{OB}$ は $1$ 次独立です。",
        },
      ],
      formulaPreview:
        "① v = 2u（平行）② v = −6e+3f（平行でない）③ v = 0（零ベクトル）④ v = −2u（平行）⑤ 平行でない　1 次独立でないのは 3 組",
      figureMarker: "<<M3V_HANDSIGN_2>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "三角形 OAB で、$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$ とします。三角形なので $\\vec{a}$ と $\\vec{b}$ は $1$ 次独立で、基準として使えます。\n\n辺 AB を $4:7$ に [内分] する点（$AM:MB = 4:7$）を M とします。$\\overrightarrow{OM} = s\\vec{a} + t\\vec{b}$ と書くとき、**$s$ の値**を既約分数で求めましょう。",
      answer: 7 / 11,
      answerDisplay: "7/11",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は「この $2$ 本を基準にしてよいか」を見分けるところだった。今度は基準として使える $2$ 本がすでにあって、その上で $1$ つの点を表す。前の系列（内分・外分・重心）で作った内分点の式は、ここでもそのまま使える？ 何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**見分ける側から、実際に表す側へ移った**こと。求めるのは $\\vec{a}$ の側の係数 $s$ だけで、$\\vec{b}$ の係数は今は聞かれていない。M が A と B のどちら寄りにあるかを、比から読もう。",
        },
        {
          layer: 3,
          text: "$AM:MB = 4:7$ なので、M は線分 AB を $4:7$ に内分する点です。前の系列の内分の公式（$AM:MB = m:n$ のとき $\\overrightarrow{OM} = \\dfrac{n\\overrightarrow{OA} + m\\overrightarrow{OB}}{m+n}$）に $m = 4$、$n = 7$ を入れると\n\n$\\overrightarrow{OM} = \\dfrac{7\\vec{a} + 4\\vec{b}}{11} = \\dfrac{7}{11}\\vec{a} + \\dfrac{4}{11}\\vec{b}$\n\nよって $s = \\dfrac{7}{11}$。**遠い方の比が重み**になる（M は B より A に近いので、$\\vec{a}$ の重みのほうが大きい）のは前の系列で見たとおりです。\n\n中心の問いへの部分回答：**基準が $1$ 次独立なら、図形の中の点は「$2$ つの数の組」になる**。ここでは $\\left(\\dfrac{7}{11},\\ \\dfrac{4}{11}\\right)$ という組が M の住所です。",
        },
      ],
      formulaPreview: "AM:MB = 4:7 → OM = (7a + 4b)/11、a の係数 s = 7/11",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ三角形 OAB で、辺 OB を $1:5$ に内分する点（$OD:DB = 1:5$）を D とします。線分 AD 上に、$\\overrightarrow{AE} = \\dfrac{3}{5}\\overrightarrow{AD}$ となる点 E をとります。\n\n$\\overrightarrow{OE} = s\\vec{a} + t\\vec{b}$ と書くとき、**$t$ の値**を既約分数で求めましょう。",
      answer: 1 / 10,
      answerDisplay: "1/10",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題の M は「線分 AB を $4:7$ に内分する」と、比で与えられていた。今度の E は「$\\overrightarrow{AD}$ の何倍か」という、矢印の倍率で与えられている。前題の道はそのまま使える？ 何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**点の与えられ方が「比」から「矢印の何倍か」に替わった**こと。しかも E が乗っている線分 AD の端 D は、$\\vec{b}$ そのものではない。求めるのは $\\vec{b}$ の側の係数だけ。",
        },
        {
          layer: 3,
          text: "$OD:DB = 1:5$ なので $\\overrightarrow{OD} = \\dfrac{1}{6}\\vec{b}$。系列2 の寄り道（O から A を経由して E へ）で\n\n$\\overrightarrow{OE} = \\overrightarrow{OA} + \\overrightarrow{AE} = \\vec{a} + \\dfrac{3}{5}\\overrightarrow{AD} = \\vec{a} + \\dfrac{3}{5}\\left(\\overrightarrow{OD} - \\overrightarrow{OA}\\right)$\n\n$= \\left(1 - \\dfrac{3}{5}\\right)\\vec{a} + \\dfrac{3}{5} \\cdot \\dfrac{1}{6}\\vec{b} = \\dfrac{2}{5}\\vec{a} + \\dfrac{1}{10}\\vec{b}$\n\nよって $t = \\dfrac{1}{10}$。\n\nここで形をよく見ておきます。$\\overrightarrow{AE} = k\\overrightarrow{AD}$ とおくと、倍率 $k$ がどんな値でも\n\n$\\overrightarrow{OE} = (1-k)\\overrightarrow{OA} + k\\overrightarrow{OD}$\n\nの形になります。$\\vec{a}$ の係数と $\\overrightarrow{OD}$ の係数を足すと、いつでも $1$。**「直線 AD 上にある」という条件が、この $1$ 本の式に丸ごと入っています**。\n\n中心の問いへの部分回答：**点の与えられ方が比でも倍率でも、行き着く先は同じ「$2$ つの数の組」**。翻訳の窓口が $2$ つあるだけです。",
        },
      ],
      formulaPreview:
        "OD = b/6、OE = OA + (3/5)(OD − OA) = (2/5)a + (1/10)b、b の係数 t = 1/10",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "同じ三角形 OAB で、辺 OA を $3:1$ に内分する点（$OC:CA = 3:1$）を C、辺 OB を $1:5$ に内分する点（$OD:DB = 1:5$）を D とします。線分 AD と線分 BC の交点を P とします（図）。\n\nP は線分 AD 上にあるので、実数 $k$ を使って $\\overrightarrow{AP} = k\\overrightarrow{AD}$ とおけます。**$k$ の値**を既約分数で求めましょう。",
      answer: 2 / 7,
      answerDisplay: "2/7",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題の E は「$\\overrightarrow{AD}$ の何倍か」が**分かっていた**。今度の P は、それが分からない。分からないままでも、前題と同じ形の式は書けるだろうか。そして P には、前題の E にはなかった手がかりがもう $1$ つある——図の $2$ 本の矢印を見くらべてみよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**$\\overrightarrow{AD}$ の何倍かが分からない**こと。そのかわり、P には条件がもう $1$ つついている。P は線分 AD の上にあり、同時に線分 BC の上にもある。図の $2$ 本の矢印は、どちらも同じ $1$ 点を指している。",
        },
        {
          layer: 3,
          text: "前題では倍率が $\\dfrac{3}{5}$ と分かっていたので $\\overrightarrow{OE} = \\left(1-\\dfrac{3}{5}\\right)\\vec{a} + \\dfrac{3}{5}\\overrightarrow{OD}$ と書けました。今度は倍率が分からない——**分からないまま $k$ とおいて、同じ形の式を書きます**。$OD:DB = 1:5$ より $\\overrightarrow{OD} = \\dfrac{1}{6}\\vec{b}$ なので\n\n$\\overrightarrow{OP} = (1-k)\\vec{a} + k \\cdot \\dfrac{1}{6}\\vec{b} = (1-k)\\vec{a} + \\dfrac{k}{6}\\vec{b}$ …①\n\nP は線分 BC 上にもあるので、同じことを BC の側からもやります。$\\overrightarrow{BP} = l\\overrightarrow{BC}$ とおくと、$OC:CA = 3:1$ より $\\overrightarrow{OC} = \\dfrac{3}{4}\\vec{a}$ なので\n\n$\\overrightarrow{OP} = (1-l)\\vec{b} + l \\cdot \\dfrac{3}{4}\\vec{a} = \\dfrac{3l}{4}\\vec{a} + (1-l)\\vec{b}$ …②\n\n①と②は、同じ $1$ 点 P を指す同じ矢印を、$2$ 通りに書いたものです。**ここが急所**——$\\vec{a}$ と $\\vec{b}$ は $1$ 次独立（三角形 OAB がつぶれていない）なので、$\\overrightarrow{OP}$ の表し方は**ただ $1$ 通り**。だから①と②で $\\vec{a}$ の係数どうし、$\\vec{b}$ の係数どうしが**一致するしかありません**。\n\n$1 - k = \\dfrac{3l}{4}$ …(i)　　$\\dfrac{k}{6} = 1 - l$ …(ii)\n\n(ii) より $l = 1 - \\dfrac{k}{6}$。これを (i) に入れて $1 - k = \\dfrac{3}{4}\\left(1 - \\dfrac{k}{6}\\right) = \\dfrac{3}{4} - \\dfrac{k}{8}$。移項すると $\\dfrac{1}{4} = k - \\dfrac{k}{8} = \\dfrac{7k}{8}$、よって $k = \\dfrac{2}{7}$。\n\nついでに見えてしまうこと（ここでは提出しません）：$\\overrightarrow{AP} = \\dfrac{2}{7}\\overrightarrow{AD}$ なら、P は線分 AD を $\\dfrac{2}{7} : \\dfrac{5}{7}$、つまり $AP:PD = 2:5$ に分ける点です。**$k$ と比は、同じ $1$ つのことの $2$ つの言い方**——$k$ が決まった瞬間に比も決まります。さらに①に代入すれば $\\overrightarrow{OP} = \\dfrac{5}{7}\\vec{a} + \\dfrac{1}{21}\\vec{b}$ で、P の位置そのものも決まります。\n\n**やってしまいがちな誤り**：$1$ 次独立にふれずに係数を比べること。①と②の係数が一致するのは、$\\vec{a}$、$\\vec{b}$ が $1$ 次独立で表し方がただ $1$ 通りだからです。もし $\\vec{a}$ と $\\vec{b}$ が平行だったら、同じ矢印を何通りにも書けてしまい、係数はそろわなくてかまいません。答案では「$\\vec{a}$、$\\vec{b}$ は $1$ 次独立であるから」と書いてから比較します。\n\n中心の問いへの部分回答：**「ただ $1$ 通り」が、$2$ 通りの書き方を連立方程式に変える**。比の分からない交点でも、文字を置いて $2$ 通りに書けば、あとは計算だけで決まります。",
        },
      ],
      formulaPreview:
        "① OP = (1−k)a + (k/6)b　② OP = (3l/4)a + (1−l)b　1 次独立 → 係数比較 → k = 2/7",
      figureMarker: "<<M3V_TWO_WAYS>>",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ形の問題を、**内分の比だけ替えて**歩きます。三角形 OAB で、辺 OA を $7:3$ に内分する点（$OC:CA = 7:3$）を C、辺 OB を $5:9$ に内分する点（$OD:DB = 5:9$）を D とし、線分 AD と線分 BC の交点を P とします。\n\n$\\overrightarrow{AP} = k\\overrightarrow{AD}$ とおくとき、**$k$ の値**を既約分数で求めましょう。",
      answer: 2 / 5,
      answerDisplay: "2/5",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も、$2$ 点の作り方も、交点の取り方も、聞かれているものも同じ。違うのは内分の比の数値だけ。前題で立てた $2$ 本の式は、そのまま作れる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**$2$ つの内分の比の数値だけ**。変わるのは $\\overrightarrow{OC}$ と $\\overrightarrow{OD}$ が $\\vec{a}$、$\\vec{b}$ の何倍になるか。式の形は前題とまったく同じ。",
        },
        {
          layer: 3,
          text: "前題と同じ手つきです。$OC:CA = 7:3$ より $\\overrightarrow{OC} = \\dfrac{7}{10}\\vec{a}$、$OD:DB = 5:9$ より $\\overrightarrow{OD} = \\dfrac{5}{14}\\vec{b}$。\n\nP は線分 AD 上にあるので $\\overrightarrow{OP} = (1-k)\\vec{a} + \\dfrac{5k}{14}\\vec{b}$ …①\n\nP は線分 BC 上にあるので、$\\overrightarrow{BP} = l\\overrightarrow{BC}$ とおいて $\\overrightarrow{OP} = \\dfrac{7l}{10}\\vec{a} + (1-l)\\vec{b}$ …②\n\n$\\vec{a}$、$\\vec{b}$ は $1$ 次独立だから係数を比較して\n\n$1 - k = \\dfrac{7l}{10}$ …(i)　　$\\dfrac{5k}{14} = 1 - l$ …(ii)\n\n(ii) より $l = 1 - \\dfrac{5k}{14}$。(i) に入れて $1 - k = \\dfrac{7}{10}\\left(1 - \\dfrac{5k}{14}\\right) = \\dfrac{7}{10} - \\dfrac{k}{4}$。移項して $\\dfrac{3}{10} = k - \\dfrac{k}{4} = \\dfrac{3k}{4}$、よって $k = \\dfrac{3}{10} \\cdot \\dfrac{4}{3} = \\dfrac{2}{5}$。\n\n前題の $\\dfrac{2}{7}$ とは別の値になりますが、**歩いた道は $1$ 歩も違いません**。比が変われば交点は動く——動かないのは手つきのほうです。\n\n中心の問いへの部分回答：**「$2$ 通りに書いて係数を比べる」は、材料が変わっても同じ道具**。$2$ 直線の交点を求めるのに、いちいち新しい工夫は要りません。",
        },
      ],
      formulaPreview:
        "OC = (7/10)a, OD = (5/14)b → 1−k = 7l/10, 5k/14 = 1−l → k = 2/5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "三角形 OAB で、辺 OA を $1:5$ に内分する点（$OC:CA = 1:5$）を C とします。こんどは D を、線分 OB を $9:5$ に [外分] する点（$OD:DB = 9:5$。D は B の向こう側にあります）とします。\n\n直線 AD と直線 BC の交点を P とし、$\\overrightarrow{AP} = k\\overrightarrow{AD}$ とおくとき、**$k$ の値**を既約分数で求めましょう。",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。C の作り方は同じ。違うのは D が線分 OB の**外**にあること。式の立て方は、どこか変える必要があるだろうか。それとも変えなくてよいだろうか。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**D が線分 OB の外にある**こと。前題までは $\\overrightarrow{OD}$ が $\\vec{b}$ の何倍かを内分の比から出した。外分の点では、$\\overrightarrow{OD}$ は $\\vec{b}$ の何倍になるだろう。",
        },
        {
          layer: 3,
          text: "外分でも、$\\overrightarrow{OD}$ が $\\vec{b}$ の何倍かさえ決まれば、あとは前題までとまったく同じです。$OD:DB = 9:5$ で D が B の向こう側なので $OD = \\dfrac{9}{9-5}OB = \\dfrac{9}{4}OB$、つまり $\\overrightarrow{OD} = \\dfrac{9}{4}\\vec{b}$。$OC:CA = 1:5$ より $\\overrightarrow{OC} = \\dfrac{1}{6}\\vec{a}$。\n\nP は直線 AD 上なので $\\overrightarrow{OP} = (1-k)\\vec{a} + \\dfrac{9k}{4}\\vec{b}$ …①\n\nP は直線 BC 上なので $\\overrightarrow{BP} = l\\overrightarrow{BC}$ とおいて $\\overrightarrow{OP} = \\dfrac{l}{6}\\vec{a} + (1-l)\\vec{b}$ …②\n\n$1$ 次独立だから係数比較して $1 - k = \\dfrac{l}{6}$、$\\dfrac{9k}{4} = 1 - l$。第 $2$ 式から $l = 1 - \\dfrac{9k}{4}$、これを第 $1$ 式に入れて $1 - k = \\dfrac{1}{6} - \\dfrac{3k}{8}$。移項して $\\dfrac{5}{6} = k - \\dfrac{3k}{8} = \\dfrac{5k}{8}$、よって $k = \\dfrac{4}{3}$。\n\n$k > 1$ になりました。$\\overrightarrow{AP} = \\dfrac{4}{3}\\overrightarrow{AD}$ は「A から D へ行って、さらに先へ進む」という意味で、**P は線分 AD の外**（D の向こう側）にあります。$l = -2$ も負なので、P は線分 BC の外です。それでも式は何も変わりませんでした。$\\overrightarrow{AP} = k\\overrightarrow{AD}$ という式は、$0 < k < 1$ なら内分点、$k > 1$ や $k < 0$ なら外分点、$k = 0$ で A、$k = 1$ で D——**「点 P が直線 AD 上にある」を丸ごと $1$ 本で言い表しています**。\n\n中心の問いへの部分回答：**内分と外分の違いは、式にとっては $k$ の値の違いでしかない**。図では大違いに見えるものが、翻訳した先では同じ $1$ 本の式の中に住んでいます。",
        },
      ],
      formulaPreview:
        "外分 9:5 → OD = (9/4)b。1−k = l/6, 9k/4 = 1−l → k = 4/3（> 1 なので P は線分 AD の外）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "三角形 OAB で、点 R を $\\overrightarrow{OR} = \\dfrac{7}{8}\\vec{a} + \\dfrac{1}{4}\\vec{b}$ で定めます。直線 OR 上の点 Q を、実数 $k$ を使って $\\overrightarrow{OQ} = k\\overrightarrow{OR}$ とおきます。\n\nQ が**直線 AB 上にある**ような **$k$ の値**を既約分数で求めましょう。",
      answer: 8 / 9,
      answerDisplay: "8/9",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。前題までは $2$ 直線の交点を、$2$ 通りに書いて係数を比べて求めた。今度も交点の問題だけれど、分からない文字は $1$ つだけ。ところで前題までに何度も書いた「直線上の点」の式には、$2$ つの係数のあいだに共通の特徴がなかっただろうか。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**分からない文字が $1$ つしかない**こと。文字が $1$ つなら、条件も $1$ つで足りるはず。直線 AB 上の点を $\\vec{a}$、$\\vec{b}$ で表したとき、$2$ つの係数のあいだにいつも成り立っていた関係を思い出そう。",
        },
        {
          layer: 3,
          text: "step 3・4 で書いた式を思い出します。直線 AB 上の点 Q は $\\overrightarrow{AQ} = t\\overrightarrow{AB}$ とおけて\n\n$\\overrightarrow{OQ} = (1-t)\\vec{a} + t\\vec{b}$\n\nと書けました。$\\vec{a}$ の係数と $\\vec{b}$ の係数を足すと $(1-t) + t = 1$。**直線 AB 上にあることは「$2$ つの係数の和が $1$」と同じこと**です（[共線条件]）。\n\nいま $\\overrightarrow{OQ} = k\\overrightarrow{OR} = \\dfrac{7}{8}k\\vec{a} + \\dfrac{1}{4}k\\vec{b}$ なので、係数の和が $1$ になればよく\n\n$\\dfrac{7}{8}k + \\dfrac{1}{4}k = 1$　　$\\dfrac{9}{8}k = 1$　　$k = \\dfrac{8}{9}$\n\n**同じ答えに、前題までの道からも着きます**：$\\overrightarrow{OQ} = (1-t)\\vec{a} + t\\vec{b}$ と $2$ 通りに書いて、$1$ 次独立から係数比較すると $\\dfrac{7}{8}k = 1-t$、$\\dfrac{1}{4}k = t$。$2$ 式を足すと $t$ が消えて $\\dfrac{9}{8}k = 1$、やはり $k = \\dfrac{8}{9}$。連立を立てて $t$ を消す作業が、「和が $1$」ではじめから済んでいたわけです（このとき $t = \\dfrac{2}{9}$ で、$\\overrightarrow{OQ} = \\dfrac{7}{9}\\vec{a} + \\dfrac{2}{9}\\vec{b}$）。\n\n**やってしまいがちな誤り**：係数の和が $1$ でない式を見て「直線 AB 上にある」と早合点すること。たとえば $\\overrightarrow{OR}$ 自身は係数の和が $\\dfrac{7}{8} + \\dfrac{1}{4} = \\dfrac{9}{8}$ で $1$ ではないので、R は直線 AB 上にはありません。和が $1$ になるように $k$ 倍して、はじめて直線 AB に乗ります。\n\n中心の問いへの部分回答：**同じ事実には $2$ つ目の道がある**。「ただ $1$ 通り」から出てくる係数比較を $1$ 度だけ済ませておくと、「和が $1$」という合言葉になって、連立を立てずに答えが出ます。",
        },
      ],
      formulaPreview:
        "直線 AB 上 ⟺ 係数の和が 1。(7/8)k + (1/4)k = 1 → (9/8)k = 1 → k = 8/9",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "平行四辺形 OACB で、$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$ とします（頂点は O, A, C, B の順に並んでいます）。辺 AC 上に $AM:MC = 1:6$ となる点 M、辺 BC 上に $BN:NC = 2:7$ となる点 N をとります。\n\n直線 BM と直線 AN の交点を P とし、$\\overrightarrow{BP} = k\\overrightarrow{BM}$ とおくとき、**$k$ の値**を既約分数で求めましょう。",
      answer: 2 / 3,
      answerDisplay: "2/3",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "step 4・5 と比べてみよう。あそこでは、$2$ 点 C, D が基準の $2$ 辺 OA・OB の上に乗っていたので、$\\overrightarrow{OC}$、$\\overrightarrow{OD}$ はすぐ $\\vec{a}$、$\\vec{b}$ の何倍かで書けた。今度の M と N が乗っている辺は、OA でも OB でもない。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**点が乗っている辺が、基準の $2$ 本から離れている**こと。平行四辺形では、向かい合う $2$ 辺の矢印はどうなっていただろう。それが分かれば、$\\overrightarrow{OM}$ と $\\overrightarrow{ON}$ が $\\vec{a}$、$\\vec{b}$ で書ける。",
        },
        {
          layer: 3,
          text: "平行四辺形なので、向かい合う辺の矢印は等しく、$\\overrightarrow{AC} = \\overrightarrow{OB} = \\vec{b}$、$\\overrightarrow{BC} = \\overrightarrow{OA} = \\vec{a}$（対角線は $\\overrightarrow{OC} = \\vec{a} + \\vec{b}$）。ここを寄り道すれば、あとは step 4・5 と同じです。\n\n$AM:MC = 1:6$ より $\\overrightarrow{AM} = \\dfrac{1}{7}\\overrightarrow{AC} = \\dfrac{1}{7}\\vec{b}$、よって $\\overrightarrow{OM} = \\vec{a} + \\dfrac{1}{7}\\vec{b}$。\n$BN:NC = 2:7$ より $\\overrightarrow{BN} = \\dfrac{2}{9}\\overrightarrow{BC} = \\dfrac{2}{9}\\vec{a}$、よって $\\overrightarrow{ON} = \\dfrac{2}{9}\\vec{a} + \\vec{b}$。\n\nP は直線 BM 上なので $\\overrightarrow{OP} = (1-k)\\vec{b} + k\\overrightarrow{OM} = k\\vec{a} + \\left(1 - \\dfrac{6k}{7}\\right)\\vec{b}$ …①\n\nP は直線 AN 上なので $\\overrightarrow{AP} = u\\overrightarrow{AN}$ とおいて $\\overrightarrow{OP} = (1-u)\\vec{a} + u\\overrightarrow{ON} = \\left(1 - \\dfrac{7u}{9}\\right)\\vec{a} + u\\vec{b}$ …②\n\n$1$ 次独立だから係数比較して $k = 1 - \\dfrac{7u}{9}$、$1 - \\dfrac{6k}{7} = u$。第 $2$ 式を第 $1$ 式に入れると\n\n$k = 1 - \\dfrac{7}{9}\\left(1 - \\dfrac{6k}{7}\\right) = 1 - \\dfrac{7}{9} + \\dfrac{2k}{3} = \\dfrac{2}{9} + \\dfrac{2k}{3}$\n\n$k - \\dfrac{2k}{3} = \\dfrac{2}{9}$、$\\dfrac{k}{3} = \\dfrac{2}{9}$、よって $k = \\dfrac{2}{3}$。このとき $u = \\dfrac{3}{7}$ で、$\\overrightarrow{OP} = \\dfrac{2}{3}\\vec{a} + \\dfrac{3}{7}\\vec{b}$ です。\n\n中心の問いへの部分回答：**基準の $2$ 本から離れた点でも、寄り道 $1$ つで「$2$ つの数の組」に翻訳できる**。翻訳さえ済めば、あとは同じ連立です。",
        },
      ],
      formulaPreview:
        "OM = a + b/7、ON = (2/9)a + b。① OP = ka + (1−6k/7)b　② OP = (1−7u/9)a + ub → k = 2/3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ平行四辺形 OACB で、前題の交点 P について、直線 OP と直線 AB の交点を Q とします。\n\n$\\dfrac{OP}{PQ}$（線分 OP の長さと線分 PQ の長さの比）の値を既約分数で求めましょう。",
      answer: 23 / 2,
      answerDisplay: "23/2",
      unit: "",
      unknownLabel: "$\\dfrac{OP}{PQ}$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題で $\\overrightarrow{OP}$ が $\\vec{a}$、$\\vec{b}$ の式で書けた。Q は直線 OP の上にあるので、$\\overrightarrow{OQ}$ は $\\overrightarrow{OP}$ の何倍かで書ける。そして Q は直線 AB の上にもある——step 7 で $1$ 度だけ使った条件が、ここでも使えないだろうか。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**求めるものが、倍率そのものではなく長さの比**になったこと。倍率が出たあと、それを $OP$ と $PQ$ の比に読みかえるひと手間が要る。O、Q、P がこの順に並んでいることに注意しよう。",
        },
        {
          layer: 3,
          text: "前題で $\\overrightarrow{OP} = \\dfrac{2}{3}\\vec{a} + \\dfrac{3}{7}\\vec{b}$。Q は直線 OP 上なので $\\overrightarrow{OQ} = m\\overrightarrow{OP} = \\dfrac{2m}{3}\\vec{a} + \\dfrac{3m}{7}\\vec{b}$ とおけます。\n\nQ は直線 AB 上にもあるので、step 7 の合言葉——**係数の和が $1$**——を使って\n\n$\\dfrac{2m}{3} + \\dfrac{3m}{7} = 1$　　$\\dfrac{14m + 9m}{21} = 1$　　$\\dfrac{23m}{21} = 1$　　$m = \\dfrac{21}{23}$\n\n$\\overrightarrow{OQ} = \\dfrac{21}{23}\\overrightarrow{OP}$ で、$m < 1$ なので Q は O と P のあいだにあります。長さで言えば $OQ = \\dfrac{21}{23}OP$、したがって\n\n$PQ = OP - OQ = \\left(1 - \\dfrac{21}{23}\\right)OP = \\dfrac{2}{23}OP$\n\nよって $\\dfrac{OP}{PQ} = \\dfrac{OP}{\\frac{2}{23}OP} = \\dfrac{23}{2}$。\n\nもし step 7 の合言葉を知らなければ、$\\overrightarrow{OQ} = (1-t)\\vec{a} + t\\vec{b}$ とおいて係数比較し、$\\dfrac{2m}{3} = 1-t$、$\\dfrac{3m}{7} = t$ を連立して同じ $m$ を出すことになります（$t = \\dfrac{9}{23}$）。どちらの道でも着く先は同じです。\n\n中心の問いへの部分回答：**「数の組」に翻訳しておくと、長さの比まで計算で出る**。$\\vec{a}$、$\\vec{b}$ の長さも角度も一度も使っていないのに、線分の比が決まりました。",
        },
      ],
      formulaPreview:
        "OQ = mOP の係数の和 = 23m/21 = 1 → m = 21/23。PQ = (2/23)OP → OP/PQ = 23/2",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 OAB で、辺 OB を $1:6$ に内分する点（$OD:DB = 1:6$）を D とします。辺 OA 上に点 C をとり、線分 AD と線分 BC の交点を P とします。\n\nC を辺 OA の上で動かすと、交点 P も動きます。$AP:PD = 5:6$ となるようにしたいとき、C は辺 OA をどんな比に内分すればよいでしょうか。**$\\dfrac{OC}{CA}$ の値**を既約分数で求めましょう。",
      answer: 7 / 5,
      answerDisplay: "7/5",
      unit: "",
      unknownLabel: "$\\dfrac{OC}{CA}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 4・5 と比べてみよう。あそこでは $2$ つの内分比が分かっていて、交点の位置を求めた。今度は交点の位置のほうが先に決まっていて、内分比のひとつが分からない。向きがちょうど逆になっている——前題までに歩いた道を、逆からたどれるだろうか。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**分からないものが、交点の側から辺 OA の上の点の側へ移った**こと。step 4 で見たように、$AP:PD$ と「$\\overrightarrow{AD}$ の何倍か」は同じ $1$ つのことの $2$ つの言い方だった。今度はそちらが先に分かっている。",
        },
        {
          layer: 3,
          text: "step 4・5 と同じ $2$ 本の式を立てて、今度は**分からない場所を入れかえて**解きます。\n\nまず $AP:PD = 5:6$ より、P は線分 AD を $5:6$ に内分する点なので $\\overrightarrow{AP} = \\dfrac{5}{11}\\overrightarrow{AD}$。つまり step 4・5 の $k$ が、はじめから $\\dfrac{5}{11}$ と分かっています。$OD:DB = 1:6$ より $\\overrightarrow{OD} = \\dfrac{1}{7}\\vec{b}$ なので\n\n$\\overrightarrow{OP} = \\left(1 - \\dfrac{5}{11}\\right)\\vec{a} + \\dfrac{5}{11} \\cdot \\dfrac{1}{7}\\vec{b} = \\dfrac{6}{11}\\vec{a} + \\dfrac{5}{77}\\vec{b}$ …①\n\nつぎに、分からない比のほうを文字にします。$\\overrightarrow{OC} = c\\vec{a}$（$c$ は $0 < c < 1$ の実数）とおくと、P は線分 BC 上にあるので $\\overrightarrow{BP} = l\\overrightarrow{BC}$ として\n\n$\\overrightarrow{OP} = lc\\vec{a} + (1-l)\\vec{b}$ …②\n\n$\\vec{a}$、$\\vec{b}$ は $1$ 次独立だから係数比較して\n\n$lc = \\dfrac{6}{11}$ …(i)　　$1 - l = \\dfrac{5}{77}$ …(ii)\n\n(ii) から $l = \\dfrac{72}{77}$。(i) に入れて $c = \\dfrac{6}{11} \\cdot \\dfrac{77}{72} = \\dfrac{42}{72} = \\dfrac{7}{12}$。\n\n$\\overrightarrow{OC} = \\dfrac{7}{12}\\vec{a}$ は「C が線分 OA を $OC:OA = 7:12$ の位置で分ける」ということなので、$CA$ のぶんは $12 - 7 = 5$。したがって $OC:CA = 7:5$、$\\dfrac{OC}{CA} = \\dfrac{7}{5}$。\n\n（確かめ：$OC:CA = 7:5$ として step 4 と同じ向きに解くと、$\\overrightarrow{OC} = \\dfrac{7}{12}\\vec{a}$ から $1-k = \\dfrac{7l}{12}$、$\\dfrac{k}{7} = 1-l$ が出て $k = \\dfrac{5}{11}$、つまり $AP:PD = 5:6$。ちゃんと戻ってきます。）\n\n**やってしまいがちな誤り**：$\\overrightarrow{OC} = \\dfrac{7}{12}\\vec{a}$ を見て $OC:CA = 7:12$ と答えること。$\\dfrac{7}{12}$ は OA 全体に対する OC の割合なので、残りの CA は $\\dfrac{5}{12}$。比は $7:5$ です。\n\n中心の問いへの答え：**「ただ $1$ 通り」が効いているかぎり、連立はどちら向きにも使える**。分かっているものが $2$ つの内分比なら交点が決まり、分かっているものが交点の比なら内分比が決まる。図形の中では「C を動かして P を合わせる」という試行錯誤になるところが、翻訳した先では**同じ $2$ 本の式のどこを文字にするか**の違いでしかありませんでした。",
        },
      ],
      formulaPreview:
        "AP:PD = 5:6 → k = 5/11 → OP = (6/11)a + (5/77)b。OC = ca とおいて lc = 6/11, 1−l = 5/77 → c = 7/12 → OC:CA = 7:5",
    },
  ],
  derivation: `**中心の問い** ｜ 基準の矢印を $2$ 本決めると、**どんな矢印も「$2$ つの数の組」にただ $1$ 通りで翻訳される**——なぜ「ただ $1$ 通り」なのか。そしてその「ただ $1$ 通り」が、比の分からない交点を**計算だけで**決めてしまうのはなぜ？

────────

**「その $2$ 本では行けない」ことがある**

系列1 から系列3 まで、私たちはずっと「$\\vec{a}$ 何枚・$\\vec{b}$ 何枚」という言い方で矢印を表してきました。当たり前のように使ってきたこの言い方には、じつは条件がついています。

基準の $2$ 本が同じ直線に沿って並んでいたら（平行だったら）、いくら組み合わせても、その直線から外れた点へは永久に行けません。片方が [零ベクトル] なら、そもそも向きを持たないので基準になりません。逆にいえば、**どちらも $\\vec{0}$ でなく、たがいに平行でもない**——このときだけ、平面上のどんな矢印も $s\\vec{a} + t\\vec{b}$ の形に書けます。この条件を [1次独立] といいます。

言いかえると、$3$ 点 O, A, B が**三角形をなしている**こと。三角形がつぶれて $1$ 本の線になった瞬間に、表せない矢印が現れます（step 1 の①③④）。

**ここが胚細胞**：$1$ 次独立な $2$ 本を選ぶと、平面のすべての点が「$2$ つの数の組」になります。しかも——ここが要——**その組はただ $1$ 通り**です。始点をそろえて $\\vec{a}$、$\\vec{b}$、$\\vec{p}$ を描き、$\\vec{p}$ の先から $\\vec{a}$ の直線と $\\vec{b}$ の直線へそれぞれ平行線を引くと、平行四辺形が $1$ つだけ決まります。作図が $1$ 本道だから、$s$ と $t$ も $1$ 組しかない。$2$ 本の基準は、図形に合わせて傾けた「座標軸」なのです。

**「ただ $1$ 通り」は、何の役に立つのか**

$1$ 通りしかないなら、$2$ 人が別々に計算して $p\\vec{a} + q\\vec{b}$ と $p'\\vec{a} + q'\\vec{b}$ という答えを出したとき、**$p = p'$ かつ $q = q'$ でなければなりません**。同じ矢印の書き表し方が $2$ 通りあってはいけないからです。これが**係数比較**——ベクトルの式が、$2$ 本の等式（連立方程式）に化ける瞬間です。

比較してよいのは $1$ 次独立のときだけ、というのを忘れないでください。$\\vec{a}$ と $\\vec{b}$ が平行だったら、同じ矢印を何通りにも書けてしまうので、係数がそろう理由がありません。答案では「$\\vec{a}$、$\\vec{b}$ は $1$ 次独立であるから」と一言書いてから比較します。

**比の分からない交点を、計算だけで決める**

三角形 OAB の辺の上に $2$ 点 C, D をとり、線分 AD と線分 BC の交点を P とします。ここで困るのは、**P が AD をどんな比に分けるのかが分からない**ことです。分からないので、内分の公式をそのまま当てることができません。

そこで、**分からないまま文字を置きます**。P は直線 AD 上にあるから $\\overrightarrow{AP} = k\\overrightarrow{AD}$ とおけて、始点を O にそろえると

$$\\overrightarrow{OP} = (1-k)\\overrightarrow{OA} + k\\overrightarrow{OD}$$

P は直線 BC 上にもあるから、同じことを BC の側からもやって

$$\\overrightarrow{OP} = (1-l)\\overrightarrow{OB} + l\\overrightarrow{OC}$$

どちらも同じ $1$ 点 P を指しています。$1$ 次独立だから係数は一致するしかなく、$k$ と $l$ の連立方程式が立ちます。あとは解くだけ——**ひらめきの要る図形問題が、手順で解ける式計算に変わりました**。数Ⅱ「図形と方程式」で $2$ 直線の方程式を連立して交点の座標を出したのと、まったく同じことをしています。座標のかわりに $\\vec{a}$、$\\vec{b}$ という傾いた基準を使っているだけです。

上の $2$ 本の式は、内分・外分・一致のすべてを丸ごと包んでいます。$0 < k < 1$ なら P は内分点、$k > 1$ や $k < 0$ なら外分点、$k = 0$ で A、$k = 1$ で D。図の上では大違いに見える内分と外分が、式にとっては $k$ の値の違いでしかない（step 6）。だからこの式は「内分の式」ではなく「**点 P が直線 AD 上にあるための条件式**」、もっといえば「**直線 AD そのもの**」と見るのが正しい見方です。

**係数の和が $1$ ——同じ事実の $2$ つ目の道**

$\\overrightarrow{OP} = (1-k)\\overrightarrow{OA} + k\\overrightarrow{OD}$ の $2$ つの係数を足すと、$k$ が何であっても $(1-k) + k = 1$。つまり

$$\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB},\\quad s + t = 1 \\iff \\text{P は直線 AB 上}$$

これが [共線条件] です。

<<M3V_SUM_ONE>>

係数比較の連立を $1$ 度だけ済ませて合言葉に変えておくと、次からは連立を立てずに済みます（step 7・step 9）。同じ事実へ $2$ つの道が通じている——片方で出した答えを、もう片方で確かめられるということでもあります。

**Step の道筋**

- **Step 1**：基準に使える $2$ 本には条件がある（$\\vec{0}$ でなく、平行でない＝三角形をなす）
- **Step 2〜3**：$1$ 次独立な基準の上で、点を「$2$ つの数の組」に翻訳する。比で与えても倍率で与えても同じ
- **Step 4（転換点・一里塚）**：比の分からない交点。文字を置いて $2$ 通りに書き、$1$ 次独立を根拠に係数を比較する
- **Step 5**：材料（内分比）が変わっても、歩く道は $1$ 歩も変わらない
- **Step 6**：交点が線分の外に出る。$k > 1$ になるだけで、式は何も変わらない
- **Step 7**：係数の和が $1$。連立を立てずに解ける $2$ つ目の道
- **Step 8〜9**：平行四辺形で寄り道を $1$ つ足す。$2$ つ目の交点の位置を、長さの比まで計算で出す
- **Step 10（山場）**：連立を逆向きに使う。交点の比を先に決めて、辺の上の点の内分比を逆算する

────────

**もっと深く** — 「ただ $1$ 通り」という、地味で強い事実

**忘れても導ける**：交点の問題で公式を思い出す必要はありません。手順は $3$ つだけです。①**分からない比は文字にする**（$\\overrightarrow{AP} = k\\overrightarrow{AD}$）②**始点を $1$ か所にそろえて、基準の $2$ 本で書く** ③**$2$ 通りに書けたら、$1$ 次独立を言ってから係数を比べる**。「係数の和が $1$」も覚える必要はありません。$(1-k) + k = 1$ を $1$ 行書けば、その場で出てきます。

**やってしまいがちな誤り $1$：$1$ 次独立にふれずに係数を比較する**。係数が一致するのは、表し方がただ $1$ 通りだからです。この一言を書かないと、いちばん働いている条件が答案から消えてしまいます。

**やってしまいがちな誤り $2$：係数の和が $1$ でない式を「直線 AB 上」と読む**。$\\overrightarrow{OQ} = \\dfrac{7}{8}\\vec{a} + \\dfrac{1}{4}\\vec{b}$ の和は $\\dfrac{9}{8}$ で、この点は直線 AB の上にはありません（step 7）。和が $1$ になるように何倍かして、はじめて乗ります。

**やってしまいがちな誤り $3$：$\\overrightarrow{OC} = c\\vec{a}$ の $c$ を、そのまま比 $OC:CA$ と読む**。$c$ は OA 全体に対する割合なので、比は $c : (1-c)$。$\\dfrac{7}{12}$ なら $7:5$ です（step 10）。

**この先の景色**：次の系列では基準点そのものを自分で選び（位置ベクトル）、$s + t = 1$ を $s + t \\le 1$ に緩めて、点が動く「範囲」を扱います——数Ⅱ「不等式と領域」との再会です。系列8 では基準の $2$ 本を「長さ $1$ で直交する $2$ 本」に固定します。それが成分表示で、$1$ 次独立の特別に便利な場合にすぎません。空間（系列10 以降）では基準が $3$ 本になりますが、「$1$ 次独立なら表し方はただ $1$ 通り」という骨組みは何ひとつ変わりません。大学では、この「基準の組」を**基底**と呼び、基底を取り替える操作が行列になります。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（$2$ つのベクトルの組み合わせ $\\to$ $1$ 次独立 $\\to$ $2$ 直線の交点と係数比較 $\\to$ 共線条件）と、「どのようなベクトルもただ $1$ 通りに書き表すことができる」「$2$ つの直線の方程式を連立させて交点を求めるのと同じこと」「ベクトルの学習における一里塚」という着眼を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ『ただ $1$ 通り』なのか」——**基準の $2$ 本が $1$ 次独立だから**です。始点をそろえて平行線を引く作図が $1$ 本道なので、平行四辺形が $1$ つに決まり、$s$ と $t$ も $1$ 組しかありません。三角形がつぶれた瞬間に、この保証は消えます。

「その『ただ $1$ 通り』が、なぜ交点を計算だけで決めるのか」——**$1$ 通りしかないなら、$2$ 通りに書いた式の係数どうしは一致するしかない**からです。図形の「$2$ 直線が交わる」という事実が、この一致を通じて連立方程式に翻訳されます。比が分からなくても、分からないまま文字を置いて $2$ 通りに書けば、あとは計算が答えを出してくれる。

**「表し方はただ $1$ 通り」という、言われてみれば当たり前の事実が、この章でいちばん強い道具でした。** 次の系列では、基準の $2$ 本だけでなく**基準点も自分で選び**、図形に合わせて座標軸をまるごと作り替えます。`,
};

/** M3V5: 位置ベクトル（座標軸をカスタマイズする）。
 *  基準点を 1 つ決めた瞬間、ベクトルは点の位置を表す。しかも基準点と 2 本の矢印は
 *  自分で選べるので、三角形の頂点を (0,0)・(1,0)・(0,1) にしてしまえる——
 *  「図形が座標にあわないなら、座標のほうを図形にあわせる」。
 *  質的変化 step6 は (s, t) が「斜めに傾いた世界の座標」だと気づくところ。
 *  山場 step10 は係数に動く文字が入っても、内部の条件が不等式で書けること。 */
export const M3V_POSITION_SERIES: LearnerSeries = {
  id: "math3_vec_position_01",
  title: "位置ベクトル（座標軸をカスタマイズする）",
  subtitle:
    "数Ⅲ・C ベクトルより — 基準点を $1$ つ決めると、点は $2$ つの数の組になる。始点をそろえる入口から、$(s, t)$ を「斜めに傾いた座標」として読み、動く係数の範囲まで出す山場まで $10$ 問。",
  patternId: "M3V5",
  unit: "math_3",
  revelationLabel:
    "**$(s, t)$ は、この三角形にあわせて傾けた「座標」だった**——基準点と $2$ 本の矢印を自分で選べるから、頂点は $(0,0)$、$(1,0)$、$(0,1)$ になり、「三角形の内部」というひらめきの要る条件が、ただの不等式に変わる",
  drivingQuestion:
    "ベクトルは「位置」と無関係だったはずなのに、**基準点を $1$ つ決めた瞬間**、点の位置を表せるようになる——そのとき、基準点と $2$ 本の矢印を**自分で選べる**ことは、何を可能にするのか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 ABC と点 P があり、\n\n$3\\overrightarrow{AP} + 6\\overrightarrow{BP} + 5\\overrightarrow{CP} = \\vec{0}$\n\nが成り立っています。このままでは $3$ 本の矢印の始点が A, B, C とばらばらです。始点をすべて **A** にそろえて書き直すと、$\\overrightarrow{AP}$ を $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ で表すことができます（三角形なので $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ は平行ではなく、表し方はただ $1$ 通りに決まります）。\n\n$\\overrightarrow{AP} = s\\overrightarrow{AB} + t\\overrightarrow{AC}$ と書くとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 3 / 7,
      answerDisplay: "3/7",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "宝の地図に「北へ $300$ 歩」とだけ書いてあったら、宝は掘り出せるだろうか。あと $1$ つ、何が書いてあれば場所は決まる？ この問題の $3$ 本の矢印も、始点がばらばらのままでは読みにくい。どの点を「ここから」に選ぶと、いちばん見通しがよくなるだろう？",
        },
        {
          layer: 2,
          text: "見るところは $1$ つだけ——**式の中の矢印の始点**です。$\\overrightarrow{AP}$ の始点は A、$\\overrightarrow{BP}$ の始点は B、$\\overrightarrow{CP}$ の始点は C。前の系列で、始点のちがう矢印を $1$ つの始点にそろえる書き直しを手に入れました。$\\overrightarrow{BP}$ を、始点が A の矢印だけで書き直すとどうなる？",
        },
        {
          layer: 3,
          text: "始点を A にそろえます。「終点を指す矢印 − 始点を指す矢印」より $\\overrightarrow{BP} = \\overrightarrow{AP} - \\overrightarrow{AB}$、$\\overrightarrow{CP} = \\overrightarrow{AP} - \\overrightarrow{AC}$。これを与えられた式に入れると\n\n$3\\overrightarrow{AP} + 6(\\overrightarrow{AP} - \\overrightarrow{AB}) + 5(\\overrightarrow{AP} - \\overrightarrow{AC}) = \\vec{0}$\n\n$\\overrightarrow{AP}$ でまとめて $(3 + 6 + 5)\\overrightarrow{AP} = 6\\overrightarrow{AB} + 5\\overrightarrow{AC}$、すなわち $14\\overrightarrow{AP} = 6\\overrightarrow{AB} + 5\\overrightarrow{AC}$。よって\n\n$\\overrightarrow{AP} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{14} = \\dfrac{6}{14}\\overrightarrow{AB} + \\dfrac{5}{14}\\overrightarrow{AC}$\n\nしたがって $s = \\dfrac{6}{14} = \\dfrac{3}{7}$。\n\nいま起きたことを見てください。基準点に A を、基準の矢印に $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ を選んだだけで、点 P は「$\\overrightarrow{AB}$ の $\\dfrac{3}{7}$ 倍と $\\overrightarrow{AC}$ の $\\dfrac{5}{14}$ 倍を足した位置」という **$2$ つの数**で言い表せました。基準点を決めたベクトルで点の位置を指すとき、それを [位置ベクトル] といいます。中心の問いへの最初の部分回答：**基準点を $1$ つ決めると、点は数の組になる**。",
        },
      ],
      formulaPreview: "14AP = 6AB + 5AC → AP = (6/14)AB + (5/14)AC、s = 3/7",
      figureMarker: "<<M3V_CUSTOM_AXES>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ三角形 ABC と同じ点 P（$3\\overrightarrow{AP} + 6\\overrightarrow{BP} + 5\\overrightarrow{CP} = \\vec{0}$ を満たす点）について考えます。\n\n直線 AP と辺 BC の交点を D とするとき、**$\\dfrac{BD}{DC}$ の値**を求めましょう（$BD : DC = m : n$ のときの $\\dfrac{m}{n}$ の値です）。答えは既約分数で答えましょう。",
      answer: 5 / 6,
      answerDisplay: "5/6",
      unit: "",
      unknownLabel: "$\\dfrac{BD}{DC}$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。式も、三角形も、点 P も同じ。違うのは、聞かれているのが P そのものではなく、直線 AP が辺 BC を切る点 D だということ。前題で書き直した $\\overrightarrow{AP}$ の式は、D についても何か言っているだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**見る点が P から D に移った**こと。D は辺 BC の上にあります。辺 BC 上の点を、基準点 A から見て $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ で表したとき、$2$ つの係数には共通の特徴がありました。それは何だったでしょう。",
        },
        {
          layer: 3,
          text: "前題の解式で $\\overrightarrow{AP} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{14}$ を得ました。D は直線 AP 上にあるので $\\overrightarrow{AD} = k\\overrightarrow{AP}$ とおけます。同時に D は直線 BC 上にあるので、$\\overrightarrow{AD}$ を $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ で表したときの**係数の和が $1$**（系列4 の共線条件）。\n\n$\\overrightarrow{AD} = k \\cdot \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{14}$ の係数の和は $\\dfrac{6k}{14} + \\dfrac{5k}{14} = \\dfrac{11k}{14}$ なので、$\\dfrac{11k}{14} = 1$ より $k = \\dfrac{14}{11}$。したがって\n\n$\\overrightarrow{AD} = \\dfrac{14}{11} \\cdot \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{14} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{11}$\n\nこれは内分点の式そのものです。$BD : DC = m : n$ のとき $\\overrightarrow{AD} = \\dfrac{n\\overrightarrow{AB} + m\\overrightarrow{AC}}{m + n}$ でしたから、$n = 6$、$m = 5$、つまり $BD : DC = 5 : 6$、$\\dfrac{BD}{DC} = \\dfrac{5}{6}$。\n\n分母を $14$ から $11$ にそろえ直しただけで、辺の切れ方が読めました。中心の問いへの部分回答：**基準点を A に選ぶと、辺 BC の切れ方まで係数だけで読める**——補助線もひらめきも要りません。",
        },
      ],
      formulaPreview: "係数の和 11k/14 = 1 → k = 14/11、AD = (6AB + 5AC)/11 は BC を 5:6 に内分 → BD/DC = 5/6",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ三角形 ABC で、**係数の組を替えた**別の点 Q を考えます。Q は\n\n$4\\overrightarrow{AQ} + 8\\overrightarrow{BQ} + 7\\overrightarrow{CQ} = \\vec{0}$\n\nを満たします。直線 AQ と辺 BC の交点を E とするとき、**$\\dfrac{AQ}{QE}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 15 / 4,
      answerDisplay: "15/4",
      unit: "",
      unknownLabel: "$\\dfrac{AQ}{QE}$",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。式の形も、始点をそろえる下ごしらえも同じ。違うのは、係数の組が入れかわっていることと、聞かれているのが辺の切れ方ではなく、A から E までの線分が Q でどう切れるかだということ。前題で $\\overrightarrow{AD}$ を出したときの道は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**見る線分が辺 BC から線分 AE に移った**こと。前題では $\\overrightarrow{AP}$ と $\\overrightarrow{AD}$ の $2$ 本の式を作りました。そのとき、その $2$ 本はどんな関係にありましたか。",
        },
        {
          layer: 3,
          text: "前題とまったく同じ手つきです。始点を A にそろえると $4\\overrightarrow{AQ} + 8(\\overrightarrow{AQ} - \\overrightarrow{AB}) + 7(\\overrightarrow{AQ} - \\overrightarrow{AC}) = \\vec{0}$ から $19\\overrightarrow{AQ} = 8\\overrightarrow{AB} + 7\\overrightarrow{AC}$、すなわち\n\n$\\overrightarrow{AQ} = \\dfrac{8\\overrightarrow{AB} + 7\\overrightarrow{AC}}{19}$\n\nE は直線 BC 上なので、係数の和が $1$ になるようにそろえ直して $\\overrightarrow{AE} = \\dfrac{8\\overrightarrow{AB} + 7\\overrightarrow{AC}}{15}$。$2$ 本を見比べると\n\n$\\overrightarrow{AQ} = \\dfrac{15}{19}\\overrightarrow{AE}$\n\nつまり A から E までを $19$ 等分すると Q は $15$ 目盛りのところ。よって $AQ : QE = 15 : (19 - 15) = 15 : 4$、$\\dfrac{AQ}{QE} = \\dfrac{15}{4}$。\n\n前題の点 P についても、同じことをすれば線分 AD の切れ方が出ます。$\\overrightarrow{AP} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{14}$ と $\\overrightarrow{AD} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{11}$ を見比べると $\\overrightarrow{AP} = \\dfrac{11}{14}\\overrightarrow{AD}$ なので $AP : PD = 11 : 3$。**始点をそろえた $1$ 本の式は、辺の切れ方と、中線の切れ方の両方を同時に持っている**のです。中心の問いへの部分回答：**基準点を選んで書き直した式 $1$ 本に、三角形の中の比がまとめて入っている**。",
        },
      ],
      formulaPreview: "AQ = (8AB + 7AC)/19、AE = (8AB + 7AC)/15 → AQ = (15/19)AE → AQ:QE = 15:4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "step 2 の点 P（$3\\overrightarrow{AP} + 6\\overrightarrow{BP} + 5\\overrightarrow{CP} = \\vec{0}$ を満たす点）に戻ります。\n\n三角形 PBC の面積は、三角形 ABC の面積の**何倍**でしょうか。答えは既約分数で答えましょう。",
      answer: 3 / 14,
      answerDisplay: "3/14",
      unit: "倍",
      unknownLabel: "三角形 PBC は三角形 ABC の何倍か",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは「どこにあるか」を長さの比で答えてきた。今度は面積。三角形 PBC と三角形 ABC は、辺 BC を共有しています——共有しているということは、$2$ つの三角形で違うのは何だけ、ということだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**問われているのが長さの比ではなく面積の比**になったこと。底辺を BC にそろえて見ると、$2$ つの三角形で違うのは高さだけです。その $2$ つの高さは、どの $2$ つの線分の長さに比例するでしょう。",
        },
        {
          layer: 3,
          text: "まず点 P の位置を step 1・2 と同じように出します。$\\overrightarrow{AP} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{14}$、$\\overrightarrow{AD} = \\dfrac{6\\overrightarrow{AB} + 5\\overrightarrow{AC}}{11}$ を見比べると $\\overrightarrow{AP} = \\dfrac{11}{14}\\overrightarrow{AD}$。つまり $AP : PD = 11 : 3$ で、$\\dfrac{PD}{AD} = \\dfrac{3}{14}$。\n\nここから面積へ渡ります。三角形 PBC と三角形 ABC は底辺 BC が共通。D は辺 BC 上にあるので、P から BC までの高さと A から BC までの高さの比は、線分 AD 上の $PD$ と $AD$ の比にそのまま等しい。底辺が同じなら面積の比は高さの比ですから\n\n$\\dfrac{\\triangle PBC}{\\triangle ABC} = \\dfrac{PD}{AD} = \\dfrac{3}{14}$\n\nよって $\\dfrac{3}{14}$ 倍。\n\n数Ⅰ の図形の性質で「高さが同じ $2$ つの三角形の面積の比は、底辺の比に等しい」を使いました。ここではその裏返しで、底辺が同じなら高さの比。どちらも**面積という量が、長さの比に翻訳される**という同じ仕組みです。中心の問いへの部分回答：**基準点を選んだ式 $1$ 本から出た比は、長さだけでなく面積まで決めてしまう**。",
        },
      ],
      formulaPreview: "AP = (11/14)AD → AP:PD = 11:3 → PD/AD = 3/14。底辺 BC 共通なので 面積比 = 高さの比 = 3/14",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "こんどは係数の $1$ つが分かっていません。三角形 ABC と点 R があり、正の数 $c$ を使って\n\n$2\\overrightarrow{AR} + 3\\overrightarrow{BR} + c\\overrightarrow{CR} = \\vec{0}$\n\nが成り立っています。三角形 RBC の面積が三角形 ABC の面積の $\\dfrac{1}{5}$ 倍であるとき、**$c$ の値**を求めましょう。",
      answer: 5,
      unit: "",
      unknownLabel: "$c$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。同じ「面積が何倍か」の話をしている。違うのは、分かっているものと求めるものが入れかわっていること。前題は係数から面積の倍率へ進んだ。今度は逆向きに歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**面積の倍率が先に分かっていて、係数のほうが分からない**こと。前題で面積の倍率を作った式を、$c$ についての方程式として読むと、どんな式になるでしょう。",
        },
        {
          layer: 3,
          text: "前題と同じ道を、逆に歩きます。始点を A にそろえると $2\\overrightarrow{AR} + 3(\\overrightarrow{AR} - \\overrightarrow{AB}) + c(\\overrightarrow{AR} - \\overrightarrow{AC}) = \\vec{0}$ から\n\n$(5 + c)\\overrightarrow{AR} = 3\\overrightarrow{AB} + c\\overrightarrow{AC}$\n\n$c$ は正なので $5 + c$ も正で、$0$ で割る心配はありません。直線 AR と辺 BC の交点を F とすると、係数の和を $1$ にそろえ直して $\\overrightarrow{AF} = \\dfrac{3\\overrightarrow{AB} + c\\overrightarrow{AC}}{3 + c}$。$2$ 本を見比べると $\\overrightarrow{AR} = \\dfrac{3 + c}{5 + c}\\overrightarrow{AF}$ なので\n\n$\\dfrac{RF}{AF} = 1 - \\dfrac{3 + c}{5 + c} = \\dfrac{2}{5 + c}$\n\n前題と同じ理屈（底辺 BC が共通・面積の比は高さの比）で $\\dfrac{\\triangle RBC}{\\triangle ABC} = \\dfrac{RF}{AF} = \\dfrac{2}{5 + c}$。これが $\\dfrac{1}{5}$ に等しいので $5 + c = 10$、$c = 5$。\n\n振り返ると、この面積の倍率は「$\\overrightarrow{AR}$ についていた係数（ここでは $2$）を、$3$ つの係数の和で割ったもの」でした。中心の問いへの部分回答：**係数を動かせば点が動く**——位置と係数は、行きも帰りも同じ $1$ 本の道でつながっています。",
        },
      ],
      formulaPreview: "(5+c)AR = 3AB + cAC → RF/AF = 2/(5+c) = 面積比。2/(5+c) = 1/5 より 5+c = 10、c = 5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "場面を変えます。三角形 OAB があり（$\\overrightarrow{OA}$ と $\\overrightarrow{OB}$ は平行でないので、表し方はただ $1$ 通りに決まります）、点 P が\n\n$\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB}$\n\nと表されています。実数 $s$, $t$ が\n\n$s + 4t = 1$\n\nを満たしながら動くとき、点 P は $1$ 本の直線をえがきます。この直線と辺 OB の交点を B' とするとき、**$\\dfrac{OB'}{OB}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 1 / 4,
      answerDisplay: "1/4",
      unit: "",
      unknownLabel: "$\\dfrac{OB'}{OB}$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで、係数はぜんぶ数で与えられていて、点は $1$ か所に決まっていた。今度は $s$ と $t$ が動く。動いているのに「直線」という決まった形が出てくるのはなぜだろう？ $s$ と $t$ の条件の式は、系列4 でどこかで見た形をしていないだろうか。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**係数が数ではなく、条件を満たしながら動く**こと。系列4 で「$2$ つの係数の和が $1$」という条件を見ました。いまの条件は、それと同じ形でしょうか、それとも違う形でしょうか。",
        },
        {
          layer: 3,
          text: "かぎは、条件を「係数の和が $1$」の形にそろえ直すことです。$4t$ をひとかたまりと見て\n\n$\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB} = s\\overrightarrow{OA} + (4t) \\cdot \\dfrac{\\overrightarrow{OB}}{4}$\n\nと書き直します。$\\overrightarrow{OB'} = \\dfrac{\\overrightarrow{OB}}{4}$ とおけば $\\overrightarrow{OP} = s\\overrightarrow{OA} + (4t)\\overrightarrow{OB'}$ で、$s + 4t = 1$ ですから $2$ つの係数の和はちょうど $1$。つまり **P は直線 AB' の上**を動きます。B' は $\\overrightarrow{OB}$ を $\\dfrac{1}{4}$ 倍した点なので $\\dfrac{OB'}{OB} = \\dfrac{1}{4}$。\n\nここが、この系列でいちばん景色の変わるところです。$\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB}$ と書いたとき、**$(s, t)$ は点 P の「座標」**です。ただし直交する目盛りではなく、$\\overrightarrow{OA}$ と $\\overrightarrow{OB}$ に沿って傾いた目盛りの座標。そう読むと「$s + 4t = 1$」は、その傾いた世界での**直線の方程式**そのもの。数Ⅱ で $x + 4y = 1$ が直線を表したのと、まったく同じことが起きています（[領域]）。\n\n**やってしまいがちな誤り**：$s + t = 1$ や $s + 4t = 1$ を「内分」の式だと思い込むこと。$s$ や $t$ は負でもよいので、P は線分 AB' の内側だけでなく**直線 AB' の全体**を動きます。[内分] の公式は、この直線のうち両端にはさまれた部分だけを切り取った特別な場合です。\n\n中心の問いへの部分回答：**基準点と $2$ 本の矢印を自分で選べるから、図形の条件を「傾いた座標の方程式」として読める**。",
        },
      ],
      formulaPreview: "OP = sOA + (4t)(OB/4)、s + 4t = 1 は係数の和 1 → P は直線 AB' 上、OB'/OB = 1/4",
      figureMarker: "<<M3V_REGION_ST>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "同じ三角形 OAB と $\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB}$ について、こんどは実数 $s$, $t$ が\n\n$s \\ge 0$、$t \\ge 0$、$s + t \\le 2$\n\nを満たしながら動きます。このとき点 P が動きうる範囲（存在範囲）の面積は、三角形 OAB の面積の**何倍**でしょうか。",
      answer: 4,
      unit: "倍",
      unknownLabel: "存在範囲の面積は三角形 OAB の何倍か",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$s$ と $t$ が動くのは同じ。違うのは、条件が等号ではなく不等号になったこと。等号のとき P は直線をえがいた。不等号になると、P はどこまで行けるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**条件が等式から不等式になった**こと。前題で「傾いた座標の直線の方程式」と読んだのと同じ読み方をすると、不等式のほうは何を表すことになるでしょう（[領域]）。",
        },
        {
          layer: 3,
          text: "前題と同じく $(s, t)$ を「傾いた座標」と読みます。数Ⅱ の $x \\ge 0$、$y \\ge 0$、$x + y \\le 2$ は、$3$ 点 $(0, 0)$、$(2, 0)$、$(0, 2)$ を頂点とする三角形の周と内部でした（[領域]）。傾いた座標でも、読み方はまったく同じです。\n\n$(s, t) = (0, 0)$ は点 O、$(2, 0)$ は $\\overrightarrow{OP} = 2\\overrightarrow{OA}$ の点、$(0, 2)$ は $\\overrightarrow{OP} = 2\\overrightarrow{OB}$ の点。つまり P の存在範囲は、**三角形 OAB を、O を中心に $2$ 倍に拡大した三角形**（の周と内部）です。\n\n相似な図形では、相似比が $2$ なら面積の比はその $2$ 乗。よって面積は三角形 OAB の $4$ 倍です。\n\n$2$ 倍に広げたのに面積は $2$ 倍ではなく $4$ 倍——長さの世界と面積の世界のずれが、傾いた座標でもそのまま成り立っています。傾けても「面積の比」は変わらない、というのがここの効きどころです。中心の問いへの部分回答：**傾いた座標でも、不等式は領域を表し、面積の比まで読める**。",
        },
      ],
      formulaPreview: "s,t ≥ 0, s+t ≤ 2 → 三角形 OAB を O 中心に 2 倍拡大した三角形。相似比 2 → 面積比 2 の 2 乗 = 4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ設定で、条件を\n\n$s \\ge 0$、$t \\ge 0$、$s + t \\le k$（$k$ は正の定数）\n\nとします。点 P の存在範囲の面積が三角形 OAB の面積の $\\dfrac{16}{9}$ 倍になるとき、**$k$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 4 / 3,
      answerDisplay: "4/3",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。条件の形はそっくりで、右辺の数が文字になっている。そして分かっているものと求めるものが入れかわった。前題で面積の倍率を出した道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**面積の倍率が先に分かっていて、条件の右辺のほうが分からない**こと。前題で、右辺の数と面積の倍率は、どうつながっていたでしょう。",
        },
        {
          layer: 3,
          text: "前題と同じ道です。$s \\ge 0$、$t \\ge 0$、$s + t \\le k$ の存在範囲は、三角形 OAB を O を中心に $k$ 倍に拡大した三角形（の周と内部）。相似比が $k$ なので面積の比は $k^2$ です。よって $k^2 = \\dfrac{16}{9}$。\n\n$k$ は正の定数なので $k = \\dfrac{4}{3}$（$k$ が正であることを使わないと $-\\dfrac{4}{3}$ も残ってしまいます。長さの倍率なので正のほうだけです）。\n\n確かめ：$k = \\dfrac{4}{3}$ のとき存在範囲は $3$ 点 $(0, 0)$、$\\left(\\dfrac{4}{3}, 0\\right)$、$\\left(0, \\dfrac{4}{3}\\right)$ を頂点とする三角形にあたり、面積は三角形 OAB の $\\left(\\dfrac{4}{3}\\right)^2 = \\dfrac{16}{9}$ 倍。合っています。\n\n中心の問いへの部分回答：**面積の倍率のほうから、条件の式を逆に決められる**——傾いた座標の世界でも、行きと帰りは同じ道です。",
        },
      ],
      formulaPreview: "面積比 = k の 2 乗 = 16/9、k > 0 より k = 4/3",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ三角形 OAB と $\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB}$ について、こんどは実数 $s$, $t$ が\n\n$s \\ge 0$、$t \\ge 0$、$3s + 2t \\le 4$\n\nを満たしながら動きます。点 P の存在範囲の面積は、三角形 OAB の面積の**何倍**でしょうか。答えは既約分数で答えましょう。",
      answer: 8 / 3,
      answerDisplay: "8/3",
      unit: "倍",
      unknownLabel: "存在範囲の面積は三角形 OAB の何倍か",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。不等式で領域を切り出すところは同じ。違うのは、$s$ にも $t$ にも数がついていること。step 6 では片方にだけ数がついていた。あのときの読み替えは、両方でも同じように効くだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**$s$ の側にも係数がついた**こと。step 6 では、片方の係数を基準の矢印のほうへ移して新しい点 B' を作りました。いまは、新しく作る点はいくつになるでしょう。",
        },
        {
          layer: 3,
          text: "step 6 の読み替えを、両方の軸で同時にやります。\n\n$\\overrightarrow{OP} = s\\overrightarrow{OA} + t\\overrightarrow{OB} = (3s) \\cdot \\dfrac{\\overrightarrow{OA}}{3} + (2t) \\cdot \\dfrac{\\overrightarrow{OB}}{2}$\n\n$\\overrightarrow{OA'} = \\dfrac{\\overrightarrow{OA}}{3}$、$\\overrightarrow{OB'} = \\dfrac{\\overrightarrow{OB}}{2}$ とおき、新しい係数を $S = 3s$、$T = 2t$ と呼ぶと、$\\overrightarrow{OP} = S\\overrightarrow{OA'} + T\\overrightarrow{OB'}$ で、条件は $S \\ge 0$、$T \\ge 0$、$S + T \\le 4$。step 7・8 とそっくり同じ形になりました。\n\nだから P の存在範囲は、三角形 OA'B' を O を中心に $4$ 倍に拡大した三角形（の周と内部）で、その面積は三角形 OA'B' の $16$ 倍。\n\nあとは三角形 OA'B' が三角形 OAB の何倍かです。$\\overrightarrow{OA'}$ は $\\overrightarrow{OA}$ の $\\dfrac{1}{3}$ 倍、$\\overrightarrow{OB'}$ は $\\overrightarrow{OB}$ の $\\dfrac{1}{2}$ 倍で、はさむ角は共通。$2$ 辺がそれぞれ $\\dfrac{1}{3}$ 倍・$\\dfrac{1}{2}$ 倍になるので、面積は $\\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$ 倍です。\n\nしたがって存在範囲の面積は、三角形 OAB の $16 \\times \\dfrac{1}{6} = \\dfrac{8}{3}$ 倍。\n\n軸を $2$ 本とも取り替えても、やることは「係数の和を見る」だけでした。基準を自分で選べるというのは、**問題に合わせて目盛りを両方とも付け替えてよい**ということ。中心の問いへの部分回答：**軸の目盛りを両方付け替えれば、どんな $1$ 次不等式の領域も、見慣れた形に戻せる**。",
        },
      ],
      formulaPreview:
        "OP = (3s)(OA/3) + (2t)(OB/2)、S+T ≤ 4 → 三角形 OA'B' の 16 倍。OA'B' は OAB の (1/3)×(1/2) = 1/6 倍 → 16 × 1/6 = 8/3",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "最後に、はじめの形に戻ります。三角形 ABC と点 P があり、実数 $c$ を使って\n\n$(c - 2)\\overrightarrow{AP} + 5\\overrightarrow{BP} + (9 - c)\\overrightarrow{CP} = \\vec{0}$\n\nが成り立っています。\n\n$c$ が実数全体を動くとき、点 P が**三角形 ABC の内部**にあるような $c$ の値の範囲を考えます。ここで「内部」は**周（$3$ つの辺と $3$ つの頂点）を含みません**。\n\nこの範囲に含まれる**整数 $c$ の個数**を求めましょう。",
      answer: 6,
      unit: "個",
      unknownLabel: "範囲に含まれる整数 $c$ の個数",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 1 と比べてみよう。始点をそろえる下ごしらえは同じ形。違うのは、係数の中に動く文字 $c$ が入っていること。$c$ が動けば P も動くので、図を $1$ 枚かいて目で追いかけることはできるだろうか？ step 6・7 で、点のいる場所を「係数についての条件」として読んだことが、ここでどう効くだろう。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**$3$ つの係数のうち $2$ つに、動く文字 $c$ が入っている**こと。step 1 と同じように始点を A にそろえれば、$\\overrightarrow{AP}$ は $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ の式になります。そのとき「P が三角形の内部にある」は、$2$ つの係数についてのどんな条件になるでしょう。",
        },
        {
          layer: 3,
          text: "step 1 と同じように始点を A にそろえます。$\\overrightarrow{BP} = \\overrightarrow{AP} - \\overrightarrow{AB}$、$\\overrightarrow{CP} = \\overrightarrow{AP} - \\overrightarrow{AC}$ を入れると\n\n$\\left((c - 2) + 5 + (9 - c)\\right)\\overrightarrow{AP} = 5\\overrightarrow{AB} + (9 - c)\\overrightarrow{AC}$\n\n左のかっこの中は $c$ が打ち消し合って $12$。$c$ がどんな値でも $0$ にならないので、P はいつでもただ $1$ つに決まります。よって\n\n$\\overrightarrow{AP} = \\dfrac{5}{12}\\overrightarrow{AB} + \\dfrac{9 - c}{12}\\overrightarrow{AC}$\n\nここで $s = \\dfrac{5}{12}$、$t = \\dfrac{9 - c}{12}$ とおけば、step 6・7 と同じ「傾いた座標」です。基準点 A・基準の矢印 $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ で見ると、三角形の頂点は $(0, 0)$、$(1, 0)$、$(0, 1)$。P が三角形の内部（周を含まない）にある条件は\n\n$s > 0$ かつ $t > 0$ かつ $s + t < 1$\n\nです。順に見ます。$s = \\dfrac{5}{12}$ は正なので、$1$ つめはいつでも成り立つ。$t > 0$ は $9 - c > 0$、つまり $c < 9$。$s + t = \\dfrac{5 + (9 - c)}{12} = \\dfrac{14 - c}{12}$ が $1$ より小さいのは $14 - c < 12$、つまり $c > 2$。\n\nまとめると $2 < c < 9$。この範囲に入る整数は $3, 4, 5, 6, 7, 8$ の **$6$ 個**です。\n\n**端をよく見てください**。$c = 2$ のときは $s + t = 1$ で P は辺 BC の上、$c = 9$ のときは $t = 0$ で P は辺 AB の上——どちらも「周」なので内部には入りません。もし周を含めてよいなら $c = 2$ と $c = 9$ も数えて $8$ 個になり、答えが $2$ つずれます。「内部」と書いてあるかどうかを、必ず読むこと。\n\n**やってしまいがちな誤り**：図をかいて $c$ をいくつか代入し、目で範囲を決めようとすること。$c$ が動けば P も動くので、$1$ 枚の図では決まりません。始点をそろえて $(s, t)$ に翻訳してはじめて、範囲が不等式として書けます。\n\n中心の問いへの答え：**基準点と $2$ 本の矢印を自分で選べるから、三角形の頂点を $(0, 0)$、$(1, 0)$、$(0, 1)$ にしてしまえる**。すると「三角形の内部」というひらめきの要りそうな図形の条件が、$s > 0$、$t > 0$、$s + t < 1$ というただの連立不等式になり、動く文字の範囲まで計算だけで出せるのです。\n\nひとつ、言えないことも添えておきます。$s + t = 1$ という条件だけでは、点は「直線 BC 上のどこか」としか言えません。位置を $1$ 点に決めるには、条件がもう $1$ つ要ります。",
        },
      ],
      formulaPreview:
        "AP = (5/12)AB + ((9−c)/12)AC。内部 ⟺ s>0 かつ t>0 かつ s+t<1 ⟺ 2 < c < 9 → 整数は 3, 4, 5, 6, 7, 8 の 6 個",
    },
  ],
  derivation: `**中心の問い** ｜ ベクトルは「位置」と無関係だったはずなのに、**基準点を $1$ つ決めた瞬間**、点の位置を表せるようになる——そのとき、基準点と $2$ 本の矢印を**自分で選べる**ことは、何を可能にするのか？

────────

**「北へ $300$ 歩」だけでは、宝は見つからない**

宝の地図に「北へ $300$ 歩」とだけ書いてあっても、宝は掘り出せません。「**どの木から**」が抜けているからです。「大きな樫の木から、北へ $300$ 歩」と書いてあれば、場所はきちんと $1$ 点に決まります。

ベクトルは「向き」と「大きさ」だけを持つ量で、置いてある場所とは無関係でした（系列1）。ところが、基準点を $1$ つ決めて「その点から $\\vec{p}$ だけ進んだ先の点」と読むことにすると、$\\vec{p}$ はちょうど平面上の $1$ 点を指すようになる。この使い方をするとき、$\\vec{p}$ を基準点 O についての点 P の [位置ベクトル] といいます。無関係だったはずの「位置」が、基準点を足しただけで戻ってくる——ここがこの系列の入口です。

**基準は、自分で選んでよい**

そして勘所はここから。基準点 O をどこに置くか、基準の矢印 $\\vec{a}$、$\\vec{b}$ をどの向き・どの長さに取るかは、**すべてこちらが決めてよい**のです。$\\vec{a}$、$\\vec{b}$ が [1次独立]（どちらも $\\vec{0}$ でなく、平行でもない）でありさえすれば、平面上のどんな点 P も

$$\\overrightarrow{OP} = s\\vec{a} + t\\vec{b}$$

とただ $1$ 通りに書けます（系列4）。つまり、点 P に実数の組 $(s, t)$ がただ $1$ つ対応する。

これは、点に**座標を与えている**のと同じことです。$\\vec{a}$、$\\vec{b}$ の長さを $1$ 目盛りにした平行四辺形の格子を思い浮かべると、$(s, t)$ が「斜めに傾いた世界の座標」であることがよく見えます。

**ここが胚細胞**：中学からずっと、座標といえば「$1$ 目盛りの長さが $1$ で、直交する $2$ 本の軸」でした。その決まった軸の上に一般の三角形を置こうとすると、頂点は $A(p, 0)$、$B(q, r)$ のように文字だらけになる。図形のほうが座標に合わないのです。それなら、**座標のほうを図形に合わせてしまえばよい**。三角形の頂点の $1$ つを基準点にとり、$2$ 辺に沿って $\\vec{a}$、$\\vec{b}$ を選ぶ。すると $3$ つの頂点の座標は $(0, 0)$、$(1, 0)$、$(0, 1)$ になって、文字定数が $1$ つも要らなくなります。基準を自分で選べるとは、**問題に合わせて座標軸をカスタマイズしてよい**ということでした。

**始点をそろえる、という下ごしらえ**

$a\\overrightarrow{AP} + b\\overrightarrow{BP} + c\\overrightarrow{CP} = \\vec{0}$ のような式は、$3$ 本の矢印の始点がばらばらで、そのままでは何も読めません。基準点を A に決めて始点をそろえると（系列2 の「終点を指す矢印 − 始点を指す矢印」）

$$\\overrightarrow{AP} = \\frac{b\\overrightarrow{AB} + c\\overrightarrow{AC}}{a + b + c}$$

という $1$ 本の式になります。この $1$ 本が、三角形の中の比を**まとめて**持っています。係数の和が $1$ になるようにそろえ直せば辺 BC の切れ方（Step 2）、そろえ直す前と後の $2$ 本を見比べれば A から引いた線分の切れ方（Step 3）、そこから面積の比（Step 4）。全部、同じ式から落ちてきます。

**条件が式になり、式が図形になる**

$(s, t)$ が座標なら、$s$ と $t$ についての条件は「傾いた世界の図形の方程式」です。$s + t = 1$ は直線 AB、$s + 4t = 1$ は $\\overrightarrow{OB}$ を $\\frac{1}{4}$ に縮めた点 B' を通る直線 AB'（Step 6）。不等号にすれば領域になり（Step 7）、両方の係数を付け替えれば軸の目盛りが両方変わる（Step 9）。数Ⅱ「不等式と領域」でやったことが、傾いた座標でもそっくりそのまま効きます。

**Step の道筋**

- **Step 1**：始点を A にそろえて、点 P を $2$ つの数の組に翻訳する
- **Step 2**：同じ $1$ 本の式から、辺 BC の切れ方を読む（係数の和を $1$ にそろえる）
- **Step 3**：係数の組を替えて、こんどは線分 AE の切れ方を読む
- **Step 4**：長さの比が、面積の比に翻訳される
- **Step 5**：面積の比のほうから、係数を逆に決める
- **Step 6（転換点）**：$(s, t)$ は「傾いた座標」だった。条件の式は直線の方程式
- **Step 7〜8**：不等号は領域を作る。相似比と面積比は $2$ 乗でつながる
- **Step 9**：両方の軸の目盛りを付け替える
- **Step 10（山場）**：係数に動く文字が入っても、内部の条件は連立不等式で書ける

────────

**もっと深く** — 基準を選ぶ自由は、何を安くしているのか

**忘れても導ける**：内分点の公式も、始点統一のあとの形も、覚えていなくて構いません。手つきは $2$ 行だけです。①**「終点を指す矢印 − 始点を指す矢印」**で始点をそろえる（系列2）。②**「直線 BC 上の点は、$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ の係数の和が $1$」**（系列4）。$a\\overrightarrow{AP} + b\\overrightarrow{BP} + c\\overrightarrow{CP} = \\vec{0}$ を見たら、まず $\\overrightarrow{BP}$、$\\overrightarrow{CP}$ を A 始点に書き直す。それだけで $\\overrightarrow{AP}$ の式が出て、あとは係数の和を $1$ にそろえるだけ。存在範囲のほうも同じで、係数についた数は「基準の矢印のほうへ」移せば、いつでも「和が $1$」の形に戻せます。

**やってしまいがちな誤り $1$：$s + t = 1$ を「内分」だと思い込む**。$s$、$t$ が負でもよいので、この条件が表すのは線分 AB ではなく**直線 AB の全体**です。[内分] は、そのうち両端にはさまれた部分を切り取った特別な場合にすぎません。Step 6 の直線 AB' も、B' の向こう側まで伸びています。

**やってしまいがちな誤り $2$：「内部」と「周を含む」を区別しない**。Step 10 で、範囲の端の $2$ 値はちょうど P が辺の上に乗るところでした。周を含めるかどうかで、数えるべき整数が $2$ つ変わります。「内部」「周および内部」「線分上」——問題文のこの一語で答えが変わるので、必ず読むこと。

**やってしまいがちな誤り $3$：面積の倍率を、長さの倍率と同じだと思う**。Step 7 で $2$ 倍に広げた領域の面積は $2$ 倍ではなく $4$ 倍でした。傾いた座標でも、相似比と面積比の関係（面積比は相似比の $2$ 乗）はそのまま成り立ちます。逆に言えば、**傾けても面積の「比」は変わらない**。だからこそ、直交座標で描いた図で面積比を考えてよいのです。

**この先の景色**：$(s, t)$ を座標と見るこの見方は、そのまま**重心座標**（三角形の $3$ つの頂点への重み $a : b : c$ で点を指す座標）に育ちます。Step 4・5 で見た「面積の比が係数の比になる」というのは、重心座標のいちばん基本の性質です。上に伸ばせば、基準の取り替えは大学の線形代数で**基底変換**と呼ばれ、$2$ 行 $2$ 列の行列で書かれます。ここで「軸を自分で選ぶ」ことに慣れておくと、そこで戸惑いません。すぐ次の系列では、この翻訳に「長さ」と「角」を測る道具（内積）を足します。比しか出せなかった世界が、計量のできる世界に変わります。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（内分・外分の公式 $\\to$ 始点の統一 $\\to$ 位置ベクトルと座標軸のカスタマイズ $\\to$ 点の存在範囲）と、
  「図形が座標にあわないのであれば、座標の方を図形にあわせてしまおう」「$(s, t)$ は P の『座標』であると考えるとわかりやすくなる」という着眼を参考。問題の値・場面（係数の組・存在範囲の条件・宝の地図）はすべてオリジナル。

────────

**問いに戻ると**

「基準点と $2$ 本の矢印を自分で選べることは、何を可能にするのか」——**図形のほうに座標を合わせることを可能にします**。三角形の頂点の $1$ つを基準点に、$2$ 辺を基準の矢印に選べば、頂点は $(0, 0)$、$(1, 0)$、$(0, 1)$。文字定数がゼロになり、「辺をどう切るか」「内部にあるか」「面積は何倍か」といった図形の問いが、$s$ と $t$ についての式の問いに変わります。

Step 1 で $1$ 本の式に翻訳した点 P から、辺の比も、線分 AD の比も、面積の比も落ちてきました。Step 6 で $(s, t)$ を座標と読んでからは、直線も領域も面積比も、数Ⅱ で習った読み方がそのまま通りました。そして Step 10 では、係数が動いても——図では追えなくても——「内部」がただの連立不等式になりました。

**ひらめきの要る幾何が、手順の要る代数に変わる。** その変換の鍵は、公式ではなく「基準は自分で選んでよい」という一言でした。次の系列では、この舞台に長さと角を持ち込みます。`,
};

/** M3V6: 内積——影で測る。
 *  ベクトルどうしの「かけ算」に見える新しい演算を決める系列。核は「なぜ cosθ なのか」。
 *  cosθ は影を作るためにいる——長さの足し算は壊れるが、影の足し算は保存されるので
 *  分配法則が成り立ち、内積は数のかけ算と同じ計算規則をもてる。
 *  質的変化 step6 は「定義の式では計算できない内積」（b+c の大きさもなす角も与えない）。
 *  山場 step10 は |b−a|^2 の展開が余弦定理そのものになるところ。
 *
 *  背骨設計は docs/math3c_vector_design.md 系列6 の節（凍結済み）。
 *  出典: 池田洋介『数学Ⅲ・C 入門問題精講』第9章（旺文社・2024）の章構成を借り、
 *  問題の値・場面はすべてオリジナルに変更（copyright-credit-vs-copy）。 */
export const M3V_DOT_SERIES: LearnerSeries = {
  id: "math3_vec_dot_01",
  title: "内積——影で測る",
  subtitle:
    "数Ⅲ・C ベクトルより — 内積は「地面のベクトルの長さ」×「影の長さ」。影の長さを読む入口から、$2$ 乗の展開が余弦定理そのものになる山場まで $10$ 問。",
  patternId: "M3V6",
  unit: "math_3",
  revelationLabel:
    "**$\\cos\\theta$ は、影を作るために置かれていた**。長さそのものでは足し算が壊れるのに、影に直すと $\\vec{b}$ の影 $+$ $\\vec{c}$ の影 $=$ $\\vec{b}+\\vec{c}$ の影——足し算が保存されるから、内積は数のかけ算とそっくりな計算規則をもてる",
  drivingQuestion:
    "ベクトルどうしの「かけ算」を、なぜ $\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ という**奇妙な式**で決めるのか？——$\\cos\\theta$ が「影の長さ」だとしたら、この決め方は何を**保存する**ために選ばれているのか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "真上から光が当たっている地面に、棒を斜めに立てかけます。棒と地面のなす角が $\\theta$ なら、地面に落ちる影の長さは（棒の長さ）$\\times\\cos\\theta$ です（[三角比]）。\n\nこの「影」を使って、$2$ つのベクトルに $1$ つの実数を対応させる新しい演算を決めます。$\\vec{a}$ に沿う直線を地面と見立て、そこに落ちる $\\vec{b}$ の影の長さを測り、それに $\\vec{a}$ の長さをかけたものを **内積** といい、$\\vec{a}\\cdot\\vec{b}$ と書きます。$\\vec{a}$ と $\\vec{b}$ の [なす角]（始点をそろえて測った開き）を $\\theta$ とすると\n\n$$\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$$\n\nです。$\\lvert\\vec{a}\\rvert = 6$、$\\lvert\\vec{b}\\rvert = 5$ で、なす角が $60°$ のとき、$\\vec{a}\\cdot\\vec{b}$ の値を求めましょう。",
      answer: 15,
      unit: "",
      unknownLabel: "$\\vec{a}\\cdot\\vec{b}$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "真上から光が当たっているとき、地面に対して $60°$ に傾いた棒の影は、棒そのものより短くなるだろうか、長くなるだろうか？ 数Ⅰ の [三角比] は、まさに「何倍になるか」を答える道具だった。$\\vec{b}$ の影の長さが読めたら、あと $1$ つ使っていない材料は何だろう？",
        },
        {
          layer: 2,
          text: "見るところは $2$ つだけ——**$\\vec{b}$ の影の長さ**と、**$\\vec{a}$ の長さ**。$60°$ のコサインの値は、数Ⅰ の特別な角の表にある。",
        },
        {
          layer: 3,
          text: "$\\cos 60° = \\dfrac{1}{2}$ なので、$\\vec{b}$ の影の長さは $5 \\times \\dfrac{1}{2} = \\dfrac{5}{2}$。これに地面の役をしている $\\vec{a}$ の長さ $6$ をかけて、$\\vec{a}\\cdot\\vec{b} = 6 \\times \\dfrac{5}{2} = 15$。定義の式にそのまま入れても同じで、$6 \\times 5 \\times \\dfrac{1}{2} = 15$ です。\n\nここで確かめておきたいことが $1$ つ。$\\vec{a}$ も $\\vec{b}$ もベクトルなのに、$\\vec{a}\\cdot\\vec{b} = 15$ は**ただの実数**です。「$\\cdot$」は数のかけ算と同じ記号を使っていますが、内積はベクトルどうしのかけ算ではなく、**$2$ つのベクトルに $1$ つの実数を返す新しい演算**——いま決めている最中の演算です。\n\n中心の問いへの最初の部分回答：**内積とは「地面のベクトルの長さ $\\times$ 影の長さ」**。奇妙に見える $\\cos\\theta$ は、まず「影の長さを作る係数」として入っています。",
        },
      ],
      formulaPreview: "a・b = 6 × 5 × cos60° = 6 × 5/2 = 15（a の長さ × b の影の長さ）",
      figureMarker: "<<M3V_SHADOW>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\lvert\\vec{a}\\rvert = 6$、$\\lvert\\vec{b}\\rvert = 7$ で、$\\vec{a}$ と $\\vec{b}$ のなす角が $120°$ のとき、$\\vec{a}\\cdot\\vec{b}$ の値を求めましょう。",
      answer: -21,
      unit: "",
      unknownLabel: "$\\vec{a}\\cdot\\vec{b}$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\vec{a}$ の長さは同じで、$2$ 本の開き方だけが変わった。真上からの光が作る $\\vec{b}$ の影は、地面のどちら側に伸びるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**なす角が直角より大きくなった**こと $1$ つ。$120°$ のコサインの符号はどうなる？",
        },
        {
          layer: 3,
          text: "前題と同じ道です。$\\cos 120° = -\\dfrac{1}{2}$ なので $\\vec{a}\\cdot\\vec{b} = 6 \\times 7 \\times \\left(-\\dfrac{1}{2}\\right) = -21$。\n\n影の言葉で読むと、$\\vec{b}$ の影は $\\vec{a}$ と**反対側**に伸びています。そこで「影の長さ」に符号をもたせ、$\\vec{a}$ と同じ向きに伸びる影を正、反対向きに伸びる影を負と決めておきます。$\\vec{b}$ の影の長さは $7 \\times \\left(-\\dfrac{1}{2}\\right) = -\\dfrac{7}{2}$、これに $6$ をかけて $-21$。\n\n中心の問いへの部分回答：**内積の符号は、影がどちら側に伸びるかを教えている**。同じ「地面の長さ $\\times$ 影の長さ」という $1$ つの決め方が、鋭角でも鈍角でもそのまま通ります。",
        },
      ],
      formulaPreview: "a・b = 6 × 7 × cos120° = 6 × 7 × (−1/2) = −21（影が反対側に伸びる＝負）",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\lvert\\vec{a}\\rvert = 4$、$\\lvert\\vec{b}\\rvert = 6$ で、$\\vec{a}\\cdot\\vec{b} = 12\\sqrt{3}$ であることが分かっています。\n\n$\\vec{a}$ と $\\vec{b}$ のなす角 $\\theta$（$0° \\le \\theta \\le 180°$）は何度でしょうか。",
      answer: 30,
      unit: "",
      unknownLabel: "$\\theta$（度）",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。前題までは大きさと開き方が分かっていて、内積を答えた。今度は、分かっているものと分からないものが入れかわっている。前題までの道を、逆からたどれないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**分からないものがなす角のほうにある**こと $1$ つ。定義の式のうち、$\\cos\\theta$ 以外の場所はすべて数が入っている。",
        },
        {
          layer: 3,
          text: "前題までは $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ の右辺をそのまま計算しました。今度は左辺の値が分かっているので、同じ式を $\\cos\\theta$ について解きます。$12\\sqrt{3} = 4 \\times 6 \\times \\cos\\theta$ より $\\cos\\theta = \\dfrac{12\\sqrt{3}}{24} = \\dfrac{\\sqrt{3}}{2}$。$0° \\le \\theta \\le 180°$ でこれを満たす角は $\\theta = 30°$ ただ $1$ つです。\n\n影の言葉では、$\\vec{b}$ の影の長さが $\\dfrac{12\\sqrt{3}}{4} = 3\\sqrt{3}$ で、$\\vec{b}$ そのものの長さ $6$ の $\\dfrac{\\sqrt{3}}{2}$ 倍。この「縮み具合」が開き方を決めています。\n\n中心の問いへの部分回答：**内積は角の情報を隠し持っている**。長さ $2$ つと内積 $1$ つの、たった $3$ つの数から角が復元できる——のちに「$3$ つの値さえあれば長さも角も面積も出る」という道につながります。",
        },
      ],
      formulaPreview: "12√3 = 4 × 6 × cosθ より cosθ = √3/2、0°≦θ≦180° で θ = 30°",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "ひし形 ABCD があり、$1$ 辺の長さは $6$、$\\angle DAB = 60°$ です。\n\n$\\overrightarrow{AB}$ と $\\overrightarrow{BD}$ の内積 $\\overrightarrow{AB}\\cdot\\overrightarrow{BD}$ を求めましょう。",
      answer: -18,
      unit: "",
      unknownLabel: "$\\overrightarrow{AB}\\cdot\\overrightarrow{BD}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは大きさも開き方も問題文に書いてあった。今度はひし形の中の $2$ 本で、どちらも自分で読み取ることになる。この $2$ 本は、いま同じ点から出ているだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**$2$ 本の始点がそろっていない**こと $1$ つ。$\\overrightarrow{AB}$ は A から、$\\overrightarrow{BD}$ は B から出ている。なす角は、どういう置き方で測ると決めたのだった？",
        },
        {
          layer: 3,
          text: "必要なのは $3$ つ——$\\lvert\\overrightarrow{AB}\\rvert$、$\\lvert\\overrightarrow{BD}\\rvert$、そしてなす角です。\n\nまず長さ。三角形 ABD は $AB = AD = 6$ で $\\angle DAB = 60°$ だから正三角形になり、$\\lvert\\overrightarrow{BD}\\rvert = BD = 6$。\n\n次になす角。ここが急所です。$\\overrightarrow{AB}$ は A から、$\\overrightarrow{BD}$ は B から出ているので、**始点をそろえてから**測らなければなりません。$\\overrightarrow{AB}$ を平行移動して始点を B に持ってくると、それは B から A の**反対向き**、つまり $\\overrightarrow{BA}$ とは逆を向きます。正三角形 ABD で $\\angle ABD = 60°$、すなわち $\\overrightarrow{BA}$ と $\\overrightarrow{BD}$ のなす角が $60°$ ですから、$\\overrightarrow{AB}$ と $\\overrightarrow{BD}$ のなす角は $180° - 60° = 120°$ です。\n\nよって $\\overrightarrow{AB}\\cdot\\overrightarrow{BD} = 6 \\times 6 \\times \\left(-\\dfrac{1}{2}\\right) = -18$。\n\n**やってしまいがちな誤り**：図の上で $\\angle ABD = 60°$ が見えるので、そのまま $6 \\times 6 \\times \\dfrac{1}{2} = 18$ としてしまうこと。符号まで逆になります。なす角は「そこに見えている角」ではなく、**始点をそろえた $2$ 本の開き**です。$\\overrightarrow{AB}$ の始点は A、$\\overrightarrow{BD}$ の始点は B——別々の場所にある矢印を、そのまま角度だけ読んではいけません。\n\n中心の問いへの部分回答：**内積は「向きの相性」を測る演算**なので、向きを正しく読むことが計算のすべて。図形の中で使うときは、まず始点をそろえるのが手順の $0$ 番目です。",
        },
      ],
      formulaPreview: "BD = 6（三角形 ABD は正三角形）。AB と BD は始点をそろえると 180° − 60° = 120°。6 × 6 × (−1/2) = −18",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "一直線上に $3$ 点 O, A, B がこの順に並んでいて、$OA = 4$、$OB = 7$ です。\n\n$\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$ を求めましょう。",
      answer: 28,
      unit: "",
      unknownLabel: "$\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $2$ 本が開いていて、始点をそろえる手間があった。今度は $3$ 点が一直線に並んでいる。始点をそろえた $2$ 本は、どれくらい開いているだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$2$ 本が同じ向きを向いている**こと $1$ つ。開きが $0°$ のとき、コサインの値はいくつだった？",
        },
        {
          layer: 3,
          text: "$\\overrightarrow{OA}$ も $\\overrightarrow{OB}$ も O が始点で、O, A, B がこの順に並んでいるので、$2$ 本は最初から同じ向き。なす角は $0°$ で $\\cos 0° = 1$ です。だから $\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = 4 \\times 7 \\times 1 = 28$。\n\n影の言葉で読むと、$\\overrightarrow{OB}$ は地面（$\\overrightarrow{OA}$ に沿う直線）に寝そべっているので、影は縮まず、影の長さは $\\overrightarrow{OB}$ の長さそのもの $7$。それに $\\overrightarrow{OA}$ の長さ $4$ をかけて $28$ です。\n\nこの場合だけは、内積が「長さと長さのふつうのかけ算」に見えます。**内積がかけ算に見えるのは、向きがぴったりそろった特別な場合だけ**——ふだんは $\\cos\\theta$ のぶんだけ縮んでいる、と言い換えることもできます。とくに $\\vec{a}$ と $\\vec{a}$ 自身のなす角は $0°$ なので、$\\vec{a}\\cdot\\vec{a} = \\lvert\\vec{a}\\rvert\\lvert\\vec{a}\\rvert\\cos 0° = \\lvert\\vec{a}\\rvert^2$。この形は step 8 以降で効いてきます。\n\n中心の問いへの部分回答：**内積は「かけ算の親戚」**。ただし親戚である理由は記号が似ているからではなく、向きがそろったときにかけ算と一致し、そこから外れるぶんだけ $\\cos\\theta$ で縮むから、です。",
        },
      ],
      formulaPreview: "同じ向きだから θ = 0°、cos0° = 1。4 × 7 × 1 = 28（a・a = |a| の 2 乗 の前触れ）",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$\\lvert\\vec{a}\\rvert = 4$ で、$\\vec{a}\\cdot\\vec{b} = 22$ であることが分かっています（**$\\vec{b}$ の大きさは分かっていません**）。また、$\\lvert\\vec{c}\\rvert = 5$ で、$\\vec{a}$ と $\\vec{c}$ のなす角は $120°$ です。\n\n$\\vec{a}\\cdot(\\vec{b}+\\vec{c})$ の値を求めましょう。",
      answer: 12,
      unit: "",
      unknownLabel: "$\\vec{a}\\cdot(\\vec{b}+\\vec{c})$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。前題までは、どの問題も $2$ 本の大きさと開き方がそろっていたから、決めたばかりの定義にそのまま入れられた。今度、$\\vec{b}+\\vec{c}$ の大きさは分かるだろうか。$\\vec{a}$ との開き方は？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**定義の式に入れる材料がそろっていない**こと $1$ つ。$\\vec{b}+\\vec{c}$ の大きさもなす角も、この問題文からは決まらない。それでも値がただ $1$ つに決まるのはなぜだろう。",
        },
        {
          layer: 3,
          text: "まず、定義の式では動けないことを確かめます。$\\vec{b}$ の大きさが与えられていないのだから、$\\vec{b}+\\vec{c}$ の大きさも、$\\vec{a}$ とのなす角も決まりません。$\\lvert\\vec{a}\\rvert\\lvert\\vec{b}+\\vec{c}\\rvert\\cos\\theta$ には入れようがない。\n\nそこで**影**に戻ります。$\\vec{a}$ に沿う地面の上で、$\\vec{b}$ の影の長さを $B'$、$\\vec{c}$ の影の長さを $C'$、$\\vec{b}+\\vec{c}$ の影の長さを $X'$ とします。$\\vec{b}$ の先に $\\vec{c}$ をつないだ折れ線を真上から見ると、$B'$ と $C'$ が地面の上でそのままつながって $X'$ になります（符号つきの長さなので、$\\vec{c}$ の影が反対向きに伸びる場合も含めて）。つまり\n\n$$B' + C' = X'$$\n\nこの両辺に $\\vec{a}$ の長さをかければ、そのまま\n\n$$\\vec{a}\\cdot\\vec{b} + \\vec{a}\\cdot\\vec{c} = \\vec{a}\\cdot(\\vec{b}+\\vec{c})$$\n\n——分配法則です。あとは $\\vec{a}\\cdot\\vec{c} = 4 \\times 5 \\times \\cos 120° = -10$ を出して、$22 + (-10) = 12$。\n\n**ここで長さのままだったら成り立ちません**。$\\lvert\\vec{b}\\rvert + \\lvert\\vec{c}\\rvert$ は $\\lvert\\vec{b}+\\vec{c}\\rvert$ とは一致しない（三角形の $2$ 辺の長さの和は、残りの $1$ 辺より長い）。もし内積が「長さと長さのかけ算」だったら、分配法則は壊れていたのです。影に直したときだけ足し算がそのまま残る——$\\cos\\theta$ は、まさにそれを起こすために置かれていました。\n\n中心の問いへの部分回答：**$\\cos\\theta$ は「足し算を保存させる」ために選ばれている**。奇妙に見えた定義は、分配法則という一点のために理にかなった形だったのです。",
        },
      ],
      formulaPreview: "b+c の大きさは決まらない。影の足し算 B' + C' = X' の両辺に |a| をかけて分配法則。a・c = 4 × 5 × (−1/2) = −10、22 + (−10) = 12",
      figureMarker: "<<M3V_SHADOW_ADD>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\lvert\\vec{a}\\rvert = 9$、$\\lvert\\vec{b}\\rvert = 4$ で、$\\vec{a}$ と $\\vec{b}$ のなす角は $135°$ です。\n\n$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})$ の値を求めましょう。",
      answer: 65,
      unit: "",
      unknownLabel: "$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $\\vec{a}$ と「かっこの中の和」との内積だった。今度はかっこが $2$ つある。前題で通った道は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**かっこが両側になった**こと $1$ つ。ふつうの数で $(x+y)(x-y)$ を計算したとき、真ん中の $2$ 項はどうなったか思い出してみよう。",
        },
        {
          layer: 3,
          text: "前題の分配法則を、こんどは両側に使います。\n\n$$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b}) = \\vec{a}\\cdot\\vec{a} - \\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{a} - \\vec{b}\\cdot\\vec{b}$$\n\nここで、$\\vec{a}$ と $\\vec{b}$ を入れかえても大きさもなす角も変わらないので $\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$（交換法則）。真ん中の $2$ 項は打ち消し合って消えます。さらに step 5 で見たとおり $\\vec{a}\\cdot\\vec{a} = \\lvert\\vec{a}\\rvert^2$ なので\n\n$$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b}) = \\lvert\\vec{a}\\rvert^2 - \\lvert\\vec{b}\\rvert^2 = 81 - 16 = 65$$\n\n**なす角 $135°$ を一度も使いませんでした**。実際 $\\vec{a}\\cdot\\vec{b} = 9 \\times 4 \\times \\left(-\\dfrac{\\sqrt{2}}{2}\\right) = -18\\sqrt{2}$ という無理数ですが、$+$ と $-$ で現れて消えてしまうので、値には残らないのです。$135°$ を $30°$ に変えても答えは $65$ のまま。\n\n中心の問いへの部分回答：**内積は数のかけ算とそっくりな計算規則をもつので、展開の公式がそのまま流用できる**。$(x+y)(x-y) = x^2 - y^2$ が $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b}) = \\lvert\\vec{a}\\rvert^2 - \\lvert\\vec{b}\\rvert^2$ に化けました。",
        },
      ],
      formulaPreview: "展開して a・b と b・a が打ち消し合い、|a| の 2 乗 − |b| の 2 乗 = 81 − 16 = 65（なす角は使わない）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$\\lvert\\vec{a}\\rvert = 6$、$\\lvert\\vec{b}\\rvert = 5$、$\\vec{a}$ と $\\vec{b}$ のなす角は $60°$ です（step 1 と同じ $2$ 本）。\n\n$\\lvert\\vec{a}+2\\vec{b}\\rvert^2$ の値を求めましょう。",
      answer: 196,
      unit: "",
      unknownLabel: "$\\lvert\\vec{a}+2\\vec{b}\\rvert^2$",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $2$ つのかっこの中身が違っていた。今度は聞かれているのが、$1$ 本のベクトルの大きさのほう。大きさを内積の言葉に置き換えられないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$2$ つのかっこの中身が同じもの**になったこと $1$ つ。step 5 の最後に出てきた「自分自身との内積」が、ここで橋になる。",
        },
        {
          layer: 3,
          text: "step 5 で見たとおり、どんなベクトル $\\vec{p}$ についても $\\vec{p}\\cdot\\vec{p} = \\lvert\\vec{p}\\rvert^2$（自分自身とのなす角は $0°$）。この式を逆向きに使うと、**大きさの $2$ 乗は内積に書き換えられる**——これが「大きさは $2$ 乗して初めて動き出す」ということです。$\\lvert\\vec{a}+2\\vec{b}\\rvert$ のままでは手も足も出ませんが、$2$ 乗すれば\n\n$$\\lvert\\vec{a}+2\\vec{b}\\rvert^2 = (\\vec{a}+2\\vec{b})\\cdot(\\vec{a}+2\\vec{b}) = \\lvert\\vec{a}\\rvert^2 + 4\\,\\vec{a}\\cdot\\vec{b} + 4\\lvert\\vec{b}\\rvert^2$$\n\nと、前題と同じ展開で開けます（数の $(x+2y)^2 = x^2+4xy+4y^2$ と同じ形）。step 1 で求めたとおり $\\vec{a}\\cdot\\vec{b} = 15$ なので\n\n$$36 + 4 \\times 15 + 4 \\times 25 = 36 + 60 + 100 = 196$$\n\n**やってしまいがちな誤り**：$\\lvert\\vec{a}+2\\vec{b}\\rvert = \\lvert\\vec{a}\\rvert + 2\\lvert\\vec{b}\\rvert = 16$ としてしまうこと。大きさは分配できません（実際 $\\sqrt{196} = 14$ で $16$ とは違う）。step 6 で見た「長さの足し算は成り立たない」が、ここでも効いています。\n\n中心の問いへの部分回答：**$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの数さえ持っていれば、$\\vec{a}$ と $\\vec{b}$ を混ぜたどんなベクトルの大きさも計算で出る**。内積は、長さを計算に乗せる入口だったのです。",
        },
      ],
      formulaPreview: "|a+2b| の 2 乗 = (a+2b)・(a+2b) = 36 + 4 × 15 + 4 × 25 = 196",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ $\\vec{a}$、$\\vec{b}$（$\\lvert\\vec{a}\\rvert = 6$、$\\lvert\\vec{b}\\rvert = 5$、なす角 $60°$）について、$\\lvert\\vec{a}+k\\vec{b}\\rvert^2 = 76$ となる **正の数 $k$** を求めましょう。\n\n答えは既約分数で答えましょう。",
      answer: 0.8,
      answerDisplay: "4/5",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 本はまったく同じ。前題は倍率が分かっていて答えの値を求めた。今度は値のほうが先に分かっていて、倍率が分からない。前題の道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分からないものが倍率 $k$ のほうにある**こと $1$ つ。前題の展開で、倍率はどの項に、何乗の形で顔を出していただろう。",
        },
        {
          layer: 3,
          text: "前題とまったく同じ展開を、倍率を $k$ のままで行います。\n\n$$\\lvert\\vec{a}+k\\vec{b}\\rvert^2 = \\lvert\\vec{a}\\rvert^2 + 2k\\,\\vec{a}\\cdot\\vec{b} + k^2\\lvert\\vec{b}\\rvert^2 = 36 + 30k + 25k^2$$\n\nこれが $76$ に等しいので $25k^2 + 30k - 40 = 0$、両辺を $5$ で割って $5k^2 + 6k - 8 = 0$。因数分解すると $(5k - 4)(k + 2) = 0$ なので $k = \\dfrac{4}{5}$ または $k = -2$。$k$ は正の数という条件から $k = \\dfrac{4}{5}$ です。\n\n捨てたほうの解にも意味があります。$k = -2$ は $\\vec{b}$ と**反対向き**に $2$ 倍伸ばした場合で、そのときも大きさの $2$ 乗はちょうど $76$。$\\lvert\\vec{a}+k\\vec{b}\\rvert^2$ は $k$ の $2$ 次式なので、同じ値をとる $k$ は一般に $2$ つあり、「正の数」という条件が $1$ つを選んでいます。\n\n中心の問いへの部分回答：**内積で書き直したあとは、もう図形の問題ではなく $2$ 次方程式**。ひらめきの要る作図が、解いて選ぶだけの計算に変わりました。",
        },
      ],
      formulaPreview: "36 + 30k + 25k の 2 乗 = 76 より 5k の 2 乗 + 6k − 8 = 0、(5k − 4)(k + 2) = 0。k > 0 より k = 4/5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 OAB で $OA = 7$、$OB = 3$、$\\angle AOB = 120°$ です。$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$ とおきます。\n\n$AB^2$ の値を求めましょう。",
      answer: 79,
      unit: "",
      unknownLabel: "$AB^2$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。前題までは $\\vec{a}$ と $\\vec{b}$ を混ぜた $1$ 本の大きさを扱ってきた。今度は三角形の辺 AB。A から B へ向かう矢印は、$\\vec{a}$ と $\\vec{b}$ で書き表せるだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**$2$ 乗する相手が図形の辺**になったこと $1$ つ。始点をそろえた $2$ 本の引き算が、どの矢印になるかを思い出してみよう。",
        },
        {
          layer: 3,
          text: "$\\overrightarrow{AB}$ は、始点を O にそろえた $2$ 本の引き算で $\\overrightarrow{AB} = \\vec{b} - \\vec{a}$。したがって $AB^2 = \\lvert\\vec{b}-\\vec{a}\\rvert^2$ で、あとは前題までとまったく同じ展開です。\n\n$$AB^2 = \\lvert\\vec{b}-\\vec{a}\\rvert^2 = \\lvert\\vec{b}\\rvert^2 - 2\\,\\vec{a}\\cdot\\vec{b} + \\lvert\\vec{a}\\rvert^2$$\n\n$\\vec{a}\\cdot\\vec{b} = 7 \\times 3 \\times \\cos 120° = -\\dfrac{21}{2}$ なので\n\n$$AB^2 = 9 - 2 \\times \\left(-\\dfrac{21}{2}\\right) + 49 = 9 + 21 + 49 = 79$$\n\n**同じ答えに、別の道からも着きます**。数Ⅰ の [余弦定理] を三角形 OAB に当てると $AB^2 = OA^2 + OB^2 - 2 \\cdot OA \\cdot OB\\cos\\angle AOB = 49 + 9 - 2 \\times 7 \\times 3 \\times \\left(-\\dfrac{1}{2}\\right) = 79$。ぴったり一致しました。\n\n偶然ではありません。展開の式に $\\vec{a}\\cdot\\vec{b} = OA \\cdot OB\\cos\\theta$ を入れると\n\n$$AB^2 = OB^2 - 2 \\cdot OA \\cdot OB\\cos\\theta + OA^2$$\n\n——これは**余弦定理そのもの**です。数Ⅰ で「三角形の辺と角を結ぶ定理」として覚えた式は、内積の言葉では $(x-y)^2 = x^2 - 2xy + y^2$ という中学の展開公式にすぎなかった。\n\n中心の問いへの答え：**$\\cos\\theta$ を含む奇妙な定義は、影の足し算を保存するために選ばれていた**。足し算が保存されるから分配法則が成り立ち、分配法則が成り立つから数の展開公式がそのまま使え、その展開公式が余弦定理に化けた——だから、補助線とひらめきが要った図形の計量が、式を展開するだけの計算になったのです。",
        },
      ],
      formulaPreview: "AB = b − a なので AB の 2 乗 = |b| の 2 乗 − 2 a・b + |a| の 2 乗 = 9 + 21 + 49 = 79（余弦定理と一致）",
    },
  ],
  derivation: `**中心の問い** ｜ ベクトルどうしの「かけ算」を、なぜ $\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ という**奇妙な式**で決めるのか？——$\\cos\\theta$ が「影の長さ」だとしたら、この決め方は何を**保存する**ために選ばれているのか？

────────

**ここまでのベクトルは、長さも角も出せなかった**

前の系列まで、ベクトルで解いてきたのは「どの点がどこにあるか」「比がいくつか」という話ばかりでした。$\\vec{a}$ と $\\vec{b}$ を何枚ぶんずつ混ぜたか——そこまでは分かる。けれど**線分の長さも、角の大きさも、面積も、ひとつも出せていません**。図形の問題を式に翻訳したはずなのに、肝心の「量」が出ないままなのです。

足りないのは、$\\vec{a}$ と $\\vec{b}$ の**大きさ**と**開き方**を式の中に呼び込む道具です。そこで、$2$ つのベクトルに $1$ つの実数を対応させる新しい演算を決めます。

$$\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$$

はじめて見た人がまず思うのは「なぜ突然コサインが出てくるのか」でしょう。この系列は、その一点を解く道でした。

**まず、これはかけ算ではない**

記号「$\\cdot$」は数のかけ算と同じですが、これは**かけ算ではありません**。ベクトルどうしのかけ算を決めたのではなく、**$2$ つのベクトルを受け取って $1$ 個の実数を返す**という、まったく新しい演算に「内積」と名前をつけただけです。step 1 で $6$ と $5$ と $60°$ から出てきた $15$ は、矢印ではなくただの数でした。ここを取り違えると、この先の式がすべて読めなくなります。

**内積の正体は「地面の長さ $\\times$ 影の長さ」**

$\\vec{a}$ に沿う直線を「地面」と見立て、真上から光を当てて、$\\vec{b}$ が地面に落とす影を見ます。$\\vec{b}$ と地面のなす角が $\\theta$ なら、影の長さは $\\lvert\\vec{b}\\rvert\\cos\\theta$。したがって

$$\\vec{a}\\cdot\\vec{b} = (\\vec{a}\\text{ の長さ}) \\times (\\vec{b}\\text{ の影の長さ})$$

と読めます。影の長さは**符号つき**で、$\\vec{a}$ と同じ側に伸びれば正、反対側なら負（step 2 の $-21$）。$\\theta$ が直角なら影はつぶれて $0$、$\\theta$ が $0°$ なら影は縮まず、内積はふつうのかけ算に一致します（step 5）。

ここまでで「内積が何を測っているか」は分かりました。けれど、いちばん根っこの疑問は残っています——**なぜわざわざ影なのか。**

**ここが胚細胞**：答えは「**影なら足し算が保存されるから**」です。$\\vec{b}$ の先に $\\vec{c}$ をつないだ折れ線を真上から見ると、地面の上では $\\vec{b}$ の影と $\\vec{c}$ の影がそのままつながって $\\vec{b}+\\vec{c}$ の影になります。影の長さを $B'$、$C'$、$X'$ とすれば

$$B' + C' = X'$$

ところが、**長さそのものでは、この足し算は成り立ちません**。$\\lvert\\vec{b}\\rvert + \\lvert\\vec{c}\\rvert$ は $\\lvert\\vec{b}+\\vec{c}\\rvert$ より一般に長い（三角形の $2$ 辺の和は残りの $1$ 辺より長い）。もし内積を「長さ $\\times$ 長さ」と決めていたら、足し算はここで壊れていた。$\\cos\\theta$ は、**壊れる足し算を壊れないところまで射影し直すために**置かれていたのです。

$B' + C' = X'$ の両辺に $\\lvert\\vec{a}\\rvert$ をかければ、そのまま

$$\\vec{a}\\cdot\\vec{b} + \\vec{a}\\cdot\\vec{c} = \\vec{a}\\cdot(\\vec{b}+\\vec{c})$$

——分配法則が出ます（step 6）。奇妙な定義は、この一点のために理にかなった形だったのです。

**性質①〜④は、すべて「影」から生える**

覚える必要はありません。影の図を思い浮かべれば、その場で出てきます。

- ① $\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$（交換法則）——$\\vec{a}$ と $\\vec{b}$ を入れかえても、大きさ $2$ つとなす角は変わらない
- ② $\\vec{a}\\cdot(\\vec{b}+\\vec{c}) = \\vec{a}\\cdot\\vec{b} + \\vec{a}\\cdot\\vec{c}$（分配法則）——影の足し算 $B' + C' = X'$ に $\\lvert\\vec{a}\\rvert$ をかけたもの
- ③ $\\vec{a}\\cdot\\vec{a} = \\lvert\\vec{a}\\rvert^2$——自分自身とのなす角は $0°$ で影が縮まないから（step 5）
- ④ $(k\\vec{a})\\cdot\\vec{b} = k(\\vec{a}\\cdot\\vec{b})$——地面の長さを $k$ 倍すれば、積も $k$ 倍

**数のかけ算とのアナロジー**

この $4$ つを、数のかけ算の規則と並べてみます。

| ベクトルの内積 | 数のかけ算 |
|---|---|
| $\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$ | $ab = ba$ |
| $\\vec{a}\\cdot(\\vec{b}+\\vec{c}) = \\vec{a}\\cdot\\vec{b} + \\vec{a}\\cdot\\vec{c}$ | $a(b+c) = ab + ac$ |
| $\\vec{a}\\cdot\\vec{a} = \\lvert\\vec{a}\\rvert^2$ | $aa = a^2$ |
| $(k\\vec{a})\\cdot\\vec{b} = k(\\vec{a}\\cdot\\vec{b})$ | $(ka)b = k(ab)$ |

左と右は、本来まったく別のものです。それなのに、規則の形がそっくり重なっている。**別々のものの間に見える、この構造の重なりをアナロジー**といいます。そしてアナロジーが成り立つ以上、**数の世界で覚えた展開の公式が、内積の計算にそのまま流用できる**ことになります。step 7 の $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b}) = \\lvert\\vec{a}\\rvert^2 - \\lvert\\vec{b}\\rvert^2$ も、step 8 の $\\lvert\\vec{a}+2\\vec{b}\\rvert^2 = \\lvert\\vec{a}\\rvert^2 + 4\\,\\vec{a}\\cdot\\vec{b} + 4\\lvert\\vec{b}\\rvert^2$ も、$(x+y)(x-y)$ と $(x+2y)^2$ の写しです。

**そして、余弦定理と再会する**

三角形 OAB で $\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$ とおくと $\\overrightarrow{AB} = \\vec{b} - \\vec{a}$ なので、$AB^2 = \\lvert\\vec{b}-\\vec{a}\\rvert^2$。これを展開すると

$$AB^2 = \\lvert\\vec{b}\\rvert^2 - 2\\,\\vec{a}\\cdot\\vec{b} + \\lvert\\vec{a}\\rvert^2$$

<<M3V_COSINE_TRIANGLE>>

$\\vec{a}\\cdot\\vec{b} = OA \\cdot OB\\cos\\theta$ を入れれば $AB^2 = OA^2 + OB^2 - 2 \\cdot OA \\cdot OB\\cos\\theta$——**余弦定理そのもの**です（step 10）。数Ⅰ で「三角形の辺と角を結ぶ定理」として別々に覚えた式が、中学の展開公式 $(x-y)^2 = x^2 - 2xy + y^2$ の顔をして戻ってきます。

これがこの系列のいちばん大きな収穫です。**図形の計量が、式を展開するのと同じ手つきになる**。補助線を思いつくかどうかに賭けていた問題が、決まった手順で最後まで進む計算に変わりました。

**Step の道筋**

- **Step 1**：影の長さを読んで、内積を初めて計算する。結果は矢印ではなく実数
- **Step 2**：鈍角のとき影は反対側に伸びる。同じ決め方が符号込みで通る
- **Step 3**：内積と大きさから、なす角を逆に読む。内積は角を隠し持っている
- **Step 4**：ひし形の中の $2$ 本。なす角は必ず**始点をそろえて**測る
- **Step 5**：同じ向きなら影は縮まず、内積はふつうのかけ算に一致する（$\\vec{a}\\cdot\\vec{a} = \\lvert\\vec{a}\\rvert^2$ の前触れ）
- **Step 6（転換点）**：定義の式では計算できない内積。影の足し算＝分配法則だけが道
- **Step 7**：両側のかっこを展開する。$(x+y)(x-y)$ の写しになる
- **Step 8**：大きさは $2$ 乗すると動き出す。$3$ つの数だけで計算が閉じる
- **Step 9**：$2$ 乗の値から倍率を逆算する。図形の問題が $2$ 次方程式になる
- **Step 10（山場）**：$\\lvert\\vec{b}-\\vec{a}\\rvert^2$ の展開が、余弦定理そのものになる

────────

**もっと深く** — 決めた演算が、なぜ「かけ算のように」ふるまうのか

**忘れても導ける**：内積の公式を丸暗記する必要はありません。**「$\\vec{a}$ を地面にして、$\\vec{b}$ の影を見る」**——この $1$ 枚の絵さえ思い出せば、定義も、符号の決まりも、性質①〜④も、その場で再建できます。展開の公式（$\\lvert\\vec{b}-\\vec{a}\\rvert^2 = \\lvert\\vec{b}\\rvert^2 - 2\\,\\vec{a}\\cdot\\vec{b} + \\lvert\\vec{a}\\rvert^2$）も覚える対象ではありません。$(\\vec{b}-\\vec{a})\\cdot(\\vec{b}-\\vec{a})$ を性質②と①で開けば、数の展開とまったく同じ手つきで出てきます。余弦定理も、覚えていなければこの展開から生やせばよい。

**やってしまいがちな誤り $1$：内積をベクトルだと思う**。「かけ算に似た記号だから、答えもベクトルだろう」と考えてしまうつまずきです。内積は**$2$ つのベクトルに $1$ 個の実数を返す**演算で、$\\vec{a}\\cdot\\vec{b} = 15$ の $15$ には向きがありません。だからこそ「$\\vec{a}\\cdot\\vec{b}\\cdot\\vec{c}$」のような式は書けません（$\\vec{a}\\cdot\\vec{b}$ が実数になった時点で、次の「$\\cdot$」は内積ではなくなる）。「$\\cdot$」の左右にはいつもベクトルが $2$ つ、結果はいつも実数 $1$ つ、と唱えておくと転びません。

**やってしまいがちな誤り $2$：始点をそろえずに角を読む**。step 4 で $\\overrightarrow{AB}\\cdot\\overrightarrow{BD}$ を求めたとき、図の上には $\\angle ABD = 60°$ が見えています。これをそのままなす角として使うと $+18$、符号まで逆の答えになります。$\\overrightarrow{AB}$ の始点は A、$\\overrightarrow{BD}$ の始点は B——別々の場所にある矢印の角を、そこに見えている角のまま読んではいけません。**なす角は、$2$ 本を同じ点から出るように平行移動してから測る**。図形の中で内積を使うときは、これが手順の $0$ 番目です。

**やってしまいがちな誤り $3$：大きさを分配する**。$\\lvert\\vec{a}+2\\vec{b}\\rvert$ を $\\lvert\\vec{a}\\rvert + 2\\lvert\\vec{b}\\rvert$ としてしまう誤りです。step 6 で見たとおり、長さは足し算を保存しません。$\\lvert\\vec{a}+2\\vec{b}\\rvert$ はこのままでは動きませんが、**$2$ 乗すれば内積の式に開ける**。「長さは $2$ 乗して初めて動き出す」——この一手が、次の系列の主題になります。

**この先の景色**：次の系列では、$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ という**たった $3$ つの数**さえ持っていれば、その平面のどんな線分の長さも、どんな角も、三角形の面積も出せることを見ます（step 8 で、$3$ つの数だけで計算が閉じたのがその予告です）。さらに進むと、基準の $2$ 本を「長さ $1$ で直交する $2$ 本」に固定した瞬間、内積が「成分どうしの積の和」という、角を一度も使わない式で書けてしまいます——なぜそうなるかは、この系列で手に入れた分配法則が答えます。空間へ出ても、影の絵は $1$ ミリも変わりません。その先、大学では「長さと角をもつ空間」を内積のほうから定義し直し（内積空間）、物理では力と移動の内積が「仕事」に、統計では $2$ 組のデータの内積が「相関係数」になります。**向きの相性を $1$ つの数で測る**という発想は、そこまで届きます。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（内積の定義 $\\to$ 図形的な意味＝影 $\\to$ 内積の性質 $\\to$ かけ算とのアナロジー $\\to$ $2$ 乗の展開公式と余弦定理）と、
  「内積を計算した結果は実数になる」「影の長さの足し算が成り立つから分配法則が成り立つ」「$\\cos\\theta$ は分配法則を成り立たせる上で必要不可欠」「余弦定理は $2$ 乗の展開公式とのアナロジー」「図形の計量問題を、式展開をするのと同じ感覚で」という着眼を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ $\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ という奇妙な式で決めるのか」——**$\\cos\\theta$ が影を作るからです。** 長さそのものでは $\\lvert\\vec{b}\\rvert + \\lvert\\vec{c}\\rvert \\ne \\lvert\\vec{b}+\\vec{c}\\rvert$ で足し算が壊れる。ところが地面に落とした影なら $B' + C' = X'$ がぴったり成り立つ。$\\cos\\theta$ は、壊れる足し算を壊れない場所へ移すために置かれていました。

「この決め方は何を保存するために選ばれているのか」——**足し算（分配法則）です。** 足し算が保存されるから、内積は数のかけ算とそっくりな計算規則をもち、展開の公式がそのまま流用でき、その展開が余弦定理に化けた。step 10 で $2$ つの道が同じ $79$ に着いたのは偶然ではなく、余弦定理がもともと $(x-y)^2$ の展開だったからです。

**奇妙な定義は、保存したいものから逆算して選ばれていた。** 次の系列では、この内積を $3$ つの数のうちの $1$ つとして持ち、長さ・角・面積を計算だけで取り出しにいきます。`,
};

/**
 * 「ベクトル」ユニット 系列7（数Ⅲ・C 第9章）。
 *
 * 背骨設計は docs/math3c_vector_design.md（凍結・2026-08-30）の「系列7」節。
 * お手本は frontend/src/lib/seriesMath3Vector.ts（系列1）。
 *
 * 出典: 池田洋介『数学Ⅲ・C 入門問題精講』第9章 ベクトル（旺文社・2024）の
 * 章構成を借り、問題の値・場面はすべてオリジナルに変更（copyright-credit-vs-copy）。
 *
 * 入力の折り方（背骨 D2）：
 * - 長さは |OP|^2 で提出（√ を作らない）。角は cos の分数。面積は根号の中が平方数になる 3 辺に設計
 * - 比は分数で提出（AS/SB・OC/CB）。垂直は「垂直になる t」「垂線の足の u」へ
 * - 垂心の s と t は同じ連立から出るので、問うのは s だけ（t は L3 で見せる）
 * - step7 の t と、そこから出る比 AP:PB は同じ 1 本の式から同時に落ちるので並べない
 *   （step8 は別の辺に下ろした垂線の足＝別の条件・別の式）
 */

/** M3V7: 3 つの値で長さ・角・面積。
 *  基準の 2 本について |a|、|b|、a・b の 3 つの実数をそろえると、
 *  平面上のどんな長さも角も面積も式計算で出る——位置の翻訳（s, t）に計量の翻訳を重ねる系列。
 *  質的変化 step7 は「直角」という図形の言葉が内積 = 0 という数の条件に変わるところ。
 *  山場 step10 は垂心。垂直条件 2 本を連立するので、3 つの値をそろえないと 1 本も式が立たない。 */
export const M3V_MEASURE_SERIES: LearnerSeries = {
  id: "math3_vec_measure_01",
  title: "3 つの値で長さ・角・面積",
  subtitle:
    "数Ⅲ・C ベクトルより — 基準の $2$ 本について $\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの数をそろえると、長さも角も面積も計算で出る。$2$ 乗して動き出す入口から、垂心を連立で決める山場まで $10$ 問。",
  patternId: "M3V7",
  unit: "math_3",
  revelationLabel:
    "**「直角」も「面積」も、$3$ つの数の式に化けた**。長さの式はそのままでは動かないが、$2$ 乗した瞬間に $\\lvert\\vec{a}\\rvert^2$、$\\vec{a}\\cdot\\vec{b}$、$\\lvert\\vec{b}\\rvert^2$ だけの式に開ける——だから、ひらめきの要る図形の問題が式の展開になる",
  drivingQuestion:
    "基準の $2$ 本について $\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の **$3$ つの数**さえ持っていれば、平面上のどんな線分の長さも、角も、面積も計算で出る——なぜ**この $3$ つで足りる**のか？ そして長さは、なぜ「$2$ 乗して初めて動き出す」のか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "三角形 OAB で、$OA = 4$、$OB = 6$、$\\angle AOB = 60°$ とします。$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$ とおきます（三角形なので $\\vec{a}$ と $\\vec{b}$ は $1$ 次独立で、基準として使えます）。\n\n辺 AB を $5:1$ に [内分] する点（$AP : PB = 5 : 1$）を P とします。\n\n**$\\lvert\\overrightarrow{OP}\\rvert^2$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 259 / 9,
      answerDisplay: "259/9",
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{OP}\\rvert^2$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$\\overrightarrow{OP}$ は、$\\vec{a}$ と $\\vec{b}$ を何枚ずつつないだ矢印だろう？ そこまでは前の系列の道具で書ける。けれど、そう書いた矢印の**長さ**を知りたいとき、与えられている $3$ つの数（$OA$、$OB$、なす角）は、その式のどこにも顔を出していない。前の系列で、$2$ 本の矢印から実数が $1$ つ生まれる仕組みを手に入れていた。そこへ持ちこむには、$\\overrightarrow{OP}$ をどう扱えばよさそう？",
        },
        {
          layer: 2,
          text: "見るところは $1$ つ——**長さの記号のままでは、なす角がどこにも入ってこない**こと。なす角が入ってくる式は [内積] しかない。だから、まず $\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの数を先にそろえてしまおう。そのうえで、$\\overrightarrow{OP}$ をその $3$ つが入る形に変えられないか考える。",
        },
        {
          layer: 3,
          text: "まず $3$ つの数をそろえます。$\\lvert\\vec{a}\\rvert = 4$、$\\lvert\\vec{b}\\rvert = 6$、そして [内積] の定義から $\\vec{a}\\cdot\\vec{b} = 4 \\times 6 \\times \\cos 60° = 4 \\times 6 \\times \\dfrac{1}{2} = 12$。\n\n次に P の位置です。$AP : PB = 5 : 1$ の [内分] なので $\\overrightarrow{OP} = \\dfrac{1 \\cdot \\vec{a} + 5 \\cdot \\vec{b}}{5 + 1} = \\dfrac{1}{6}\\vec{a} + \\dfrac{5}{6}\\vec{b}$。\n\nここからが急所です。$\\left\\lvert \\dfrac{1}{6}\\vec{a} + \\dfrac{5}{6}\\vec{b} \\right\\rvert$ は、このままではどうにもなりません。ところが**$2$ 乗すると動き出します**——大きさの $2$ 乗は、自分自身との内積だからです（$\\lvert\\vec{p}\\rvert^2 = \\vec{p}\\cdot\\vec{p}$）。あとは数の式 $\\left(\\dfrac{1}{6}a + \\dfrac{5}{6}b\\right)^2$ を展開するのと同じ手つきで開けます。\n\n$\\lvert\\overrightarrow{OP}\\rvert^2 = \\dfrac{1}{36}\\lvert\\vec{a}\\rvert^2 + 2 \\times \\dfrac{1}{6} \\times \\dfrac{5}{6}(\\vec{a}\\cdot\\vec{b}) + \\dfrac{25}{36}\\lvert\\vec{b}\\rvert^2 = \\dfrac{16 + 120 + 900}{36} = \\dfrac{1036}{36} = \\dfrac{259}{9}$。\n\n**やってしまいがちな誤り**：$\\left\\lvert \\dfrac{1}{6}\\vec{a} + \\dfrac{5}{6}\\vec{b} \\right\\rvert = \\dfrac{1}{6}\\lvert\\vec{a}\\rvert + \\dfrac{5}{6}\\lvert\\vec{b}\\rvert$ と、大きさの記号を配ってしまうこと。この右辺は $\\dfrac{4}{6} + \\dfrac{30}{6} = \\dfrac{17}{3}$ で、$2$ 乗すると $\\dfrac{289}{9}$。正しい $\\dfrac{259}{9}$ とは違います。$\\vec{a}$ と $\\vec{b}$ が同じ向きに一直線に並んでいるときだけ足し算になり、それ以外は必ず短くなる——だから大きさは配れません。\n\n中心の問いへの最初の部分回答：**長さは、$2$ 乗した瞬間に $\\lvert\\vec{a}\\rvert^2$、$\\vec{a}\\cdot\\vec{b}$、$\\lvert\\vec{b}\\rvert^2$ の $3$ つだけの式になる**。",
        },
      ],
      formulaPreview:
        "3 つの値 |a| = 4, |b| = 6, a・b = 12。OP = a/6 + 5b/6 を 2 乗して (16 + 120 + 900)/36 = 259/9",
      figureMarker: "<<M3V_THREE_VALUES>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ三角形 OAB（$OA = 4$、$OB = 6$、$\\angle AOB = 60°$）で、こんどは辺 AB を $2:9$ に内分する点（$AR : RB = 2 : 9$）を R とします。\n\n**$\\lvert\\overrightarrow{OR}\\rvert^2$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 1872 / 121,
      answerDisplay: "1872/121",
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{OR}\\rvert^2$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も、はじめにそろえた $3$ つの数も、まったく同じ。違うのは点の取り方だけ。前題の道はそのまま使えるだろうか。それとも、$3$ つの数からやり直す必要があるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは **[内分] の比だけ**。$3$ つの数はもう手元にあるので、作り直す必要はない。$\\overrightarrow{OR}$ を $\\vec{a}$、$\\vec{b}$ で書いたときの $2$ つの係数はいくつになる？",
        },
        {
          layer: 3,
          text: "前題で $\\lvert\\vec{a}\\rvert = 4$、$\\lvert\\vec{b}\\rvert = 6$、$\\vec{a}\\cdot\\vec{b} = 12$ をそろえました。三角形が同じなので、この $3$ つはそのまま使えます（$1$ 度そろえれば、その三角形の中の計量は全部これで足ります）。\n\n$AR : RB = 2 : 9$ より $\\overrightarrow{OR} = \\dfrac{9\\vec{a} + 2\\vec{b}}{2 + 9} = \\dfrac{9}{11}\\vec{a} + \\dfrac{2}{11}\\vec{b}$。前題と同じく $2$ 乗して開くと\n\n$\\lvert\\overrightarrow{OR}\\rvert^2 = \\dfrac{81}{121}\\lvert\\vec{a}\\rvert^2 + 2 \\times \\dfrac{9}{11} \\times \\dfrac{2}{11}(\\vec{a}\\cdot\\vec{b}) + \\dfrac{4}{121}\\lvert\\vec{b}\\rvert^2 = \\dfrac{81 \\times 16 + 36 \\times 12 + 4 \\times 36}{121} = \\dfrac{1296 + 432 + 144}{121} = \\dfrac{1872}{121}$。\n\n$\\dfrac{1872}{121}$ は $15.47\\cdots$ で、$\\lvert\\vec{a}\\rvert^2 = 16$ よりわずかに小さい——R は A のすぐ近くにありますが、O から見ると A よりほんの少しだけ手前です。答えが図と合っているかは、こうして端の値と比べると確かめられます。\n\n中心の問いへの部分回答：**$3$ つの数は、その三角形について $1$ 度そろえれば使い回せる**。点が変わっても、変わるのは係数だけです。",
        },
      ],
      formulaPreview:
        "OR = 9a/11 + 2b/11。2 乗して (81×16 + 36×12 + 4×36)/121 = 1872/121",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ三角形 OAB（$OA = 4$、$OB = 6$、$\\angle AOB = 60°$）で、辺 AB 上に点 S をとります。\n\n$\\lvert\\overrightarrow{OS}\\rvert^2 = 27$ となる点 S は、辺 AB 上にただ $1$ つあります。このとき **$\\dfrac{AS}{SB}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 11 / 3,
      answerDisplay: "11/3",
      unit: "",
      unknownLabel: "$\\dfrac{AS}{SB}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。三角形も $3$ つの数も同じ。違うのは、分かっているものと求めるものが入れかわっていること——前は比が与えられて長さの $2$ 乗を出した。今度は長さの $2$ 乗が先に与えられている。前の道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**分からないのが内分の比のほう**だということ。比が分からないなら、まず文字でおいてしまおう。$AS : SB = t : (1 - t)$ とおくと、$\\overrightarrow{OS}$ は $\\vec{a}$、$\\vec{b}$ でどう書ける？",
        },
        {
          layer: 3,
          text: "$AS : SB = t : (1 - t)$（$0 < t < 1$）とおくと、前題と同じ [内分] の書き方で $\\overrightarrow{OS} = (1 - t)\\vec{a} + t\\vec{b}$ です。前題までとまったく同じように $2$ 乗して開きます。\n\n$\\lvert\\overrightarrow{OS}\\rvert^2 = (1-t)^2 \\lvert\\vec{a}\\rvert^2 + 2t(1-t)(\\vec{a}\\cdot\\vec{b}) + t^2 \\lvert\\vec{b}\\rvert^2 = 16(1-t)^2 + 24t(1-t) + 36t^2$。\n\n整理すると $16 - 32t + 16t^2 + 24t - 24t^2 + 36t^2 = 28t^2 - 8t + 16$。ここで $t^2$ の係数 $28$ は $\\lvert\\vec{b} - \\vec{a}\\rvert^2 = 36 - 2 \\times 12 + 16 = 28$、つまり $AB^2$ そのものです（これは [余弦定理] にほかなりません）。\n\n$28t^2 - 8t + 16 = 27$ より $28t^2 - 8t - 11 = 0$。左辺は $(14t - 11)(2t + 1)$ と因数分解できるので $t = \\dfrac{11}{14}$、$t = -\\dfrac{1}{2}$。$t = -\\dfrac{1}{2}$ は辺 AB の外（A の側へはみ出した点）なので落とし、$t = \\dfrac{11}{14}$ だけが残ります。\n\nよって $AS : SB = \\dfrac{11}{14} : \\dfrac{3}{14} = 11 : 3$、$\\dfrac{AS}{SB} = \\dfrac{11}{3}$。\n\n$2$ 次方程式が解を $2$ つ出したのに答えが $1$ つに決まったのは、「辺 AB 上」という条件が片方を切ったからです。中心の問いへの部分回答：**$3$ つの数で書いた式は、逆にも読める**——長さから位置を決める問題が、$2$ 次方程式に翻訳されました。",
        },
      ],
      formulaPreview:
        "OS = (1−t)a + tb を 2 乗して 28t² − 8t + 16 = 27。(14t − 11)(2t + 1) = 0、辺の上は t = 11/14、AS:SB = 11:3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "こんどは別の三角形です。三角形 ABC で、$AB = 9$、$AC = 10$、$BC = 17$ とします。$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$ とおきます。\n\nこの三角形では**なす角が与えられていません**。それでも $3$ つの数をそろえたい——**$\\vec{b}\\cdot\\vec{c}$ の値**を求めましょう。",
      answer: -54,
      unit: "",
      unknownLabel: "$\\vec{b}\\cdot\\vec{c}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。三角形の形を決めている材料が入れかわっている——前は $2$ 辺となす角、今度は $3$ 辺。$3$ つの数のうち、いま手元にすぐ書けるのはどれで、足りないのはどれだろう？ そして、$3$ つ目の代わりに与えられた $BC$ という長さは、$\\vec{b}$ と $\\vec{c}$ でどう書けるだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**なす角のかわりに、向かい合う辺の長さが与えられた**こと。$\\overrightarrow{BC}$ を $\\vec{b}$、$\\vec{c}$ で書けば、$BC = 17$ という条件が式になる。前題までで、長さの条件を式にするときにやったことは？",
        },
        {
          layer: 3,
          text: "$\\lvert\\vec{b}\\rvert = 9$、$\\lvert\\vec{c}\\rvert = 10$ はすぐ書けます。足りないのは $\\vec{b}\\cdot\\vec{c}$ です。\n\n残った材料は $BC = 17$。基本変形（終点 $-$ 始点）で $\\overrightarrow{BC} = \\vec{c} - \\vec{b}$ なので、$\\lvert\\vec{c} - \\vec{b}\\rvert = 17$。前題までと同じで、この形はそのままでは動きません——**$2$ 乗します**。\n\n$\\lvert\\vec{c} - \\vec{b}\\rvert^2 = \\lvert\\vec{c}\\rvert^2 - 2(\\vec{b}\\cdot\\vec{c}) + \\lvert\\vec{b}\\rvert^2 = 100 - 2(\\vec{b}\\cdot\\vec{c}) + 81$。これが $17^2 = 289$ に等しいので $181 - 2(\\vec{b}\\cdot\\vec{c}) = 289$、$\\vec{b}\\cdot\\vec{c} = -54$。\n\nこれで $\\lvert\\vec{b}\\rvert = 9$、$\\lvert\\vec{c}\\rvert = 10$、$\\vec{b}\\cdot\\vec{c} = -54$ の $3$ つがそろいました。内積が負になったのは、角 A が鈍角だからです（$9 + 10$ とほとんど変わらない長さの $17$ が向かい側にあるので、A のところは大きく開いています）。\n\nこの計算は、実は [余弦定理] $BC^2 = AB^2 + AC^2 - 2 \\cdot AB \\cdot AC \\cos A$ をそのまま逆に使ったのと同じことです。**$2$ 乗の展開公式と余弦定理は同じ式**でした。\n\n中心の問いへの部分回答：**$3$ つ目の数は、与えられていなければ作ればよい**。$2$ 乗の展開が、$3$ 辺という材料を $\\vec{b}\\cdot\\vec{c}$ に変えてくれます。",
        },
      ],
      formulaPreview:
        "BC = c − b を 2 乗して 100 − 2(b・c) + 81 = 289、b・c = −54",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ三角形 ABC（$AB = 9$、$AC = 10$、$BC = 17$）について、$\\angle BAC = \\theta$ とします。\n\n**$\\cos\\theta$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -3 / 5,
      answerDisplay: "−3/5",
      unit: "",
      unknownLabel: "$\\cos\\theta$",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形は同じで、$3$ つの数はもうそろっている。求めるものが長さから角に変わっただけ。$3$ つの数と角を結んでいる式は、どこかで見なかっただろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**求めるものが角になった**こと。[内積] の定義の式を思い出して、そこに何が入っているかを見てみよう。分からないのは $\\cos\\theta$ だけになっていないだろうか。",
        },
        {
          layer: 3,
          text: "[内積] の定義は $\\vec{b}\\cdot\\vec{c} = \\lvert\\vec{b}\\rvert \\lvert\\vec{c}\\rvert \\cos\\theta$ でした。この式に入っているのは $3$ つの数と $\\cos\\theta$ だけです。だから $\\cos\\theta$ について解けば\n\n$\\cos\\theta = \\dfrac{\\vec{b}\\cdot\\vec{c}}{\\lvert\\vec{b}\\rvert \\lvert\\vec{c}\\rvert} = \\dfrac{-54}{9 \\times 10} = \\dfrac{-54}{90} = -\\dfrac{3}{5}$。\n\n前題で作った $-54$ が、そのまま角の情報に化けました。値が負なので $\\theta$ は鈍角——$\\theta$ はおよそ $127°$ です（角そのものの値は求めなくてよく、$\\cos$ の分数が分かれば計算はすべて進みます）。\n\n中心の問いへの部分回答：**角は、$3$ つの数の割り算 $1$ つで出る**。$3$ つの数さえそろっていれば、角のために新しい材料は要りません。",
        },
      ],
      formulaPreview: "cos θ = (b・c)/(|b||c|) = −54/(9×10) = −3/5",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ三角形 ABC（$AB = 9$、$AC = 10$、$BC = 17$）の**面積**を求めましょう。",
      answer: 36,
      unit: "",
      unknownLabel: "三角形 ABC の面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も $3$ つの数も同じで、求めるものだけが角から面積に変わった。数Ⅰ で習った三角形の面積の出し方には、何が要っただろう？ そのうち、いま手元にないものはどれだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**求めるものが面積になった**こと。数Ⅰ の面積の式に要るのは $2$ 辺と、はさむ角の $\\sin$。前題で出したのは $\\cos$ のほうだった。$\\sin$ と $\\cos$ を結ぶ関係が [三角比] にあったはず。",
        },
        {
          layer: 3,
          text: "数Ⅰ の面積の式は $S = \\dfrac{1}{2} \\cdot AB \\cdot AC \\cdot \\sin\\theta$ でした。要るのは $\\sin\\theta$ ですが、手元にあるのは前題の $\\cos\\theta = -\\dfrac{3}{5}$。[三角比] の相互関係 $\\sin^2\\theta + \\cos^2\\theta = 1$ から作れます。\n\n$\\sin^2\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$。三角形の内角なので $\\sin\\theta > 0$ より $\\sin\\theta = \\dfrac{4}{5}$。よって $S = \\dfrac{1}{2} \\times 9 \\times 10 \\times \\dfrac{4}{5} = 36$。\n\n**同じ答えに、もう $1$ つの道でも着きます**。いまの流れをそのまま文字でたどると、$S = \\dfrac{1}{2}\\lvert\\vec{b}\\rvert\\lvert\\vec{c}\\rvert\\sqrt{1 - \\cos^2\\theta}$ に $\\cos\\theta = \\dfrac{\\vec{b}\\cdot\\vec{c}}{\\lvert\\vec{b}\\rvert\\lvert\\vec{c}\\rvert}$ を入れて、根号の外の $\\lvert\\vec{b}\\rvert\\lvert\\vec{c}\\rvert$ を中へ入れると\n\n$S = \\dfrac{1}{2}\\sqrt{\\lvert\\vec{b}\\rvert^2\\lvert\\vec{c}\\rvert^2 - (\\vec{b}\\cdot\\vec{c})^2}$。\n\n数を入れると $S = \\dfrac{1}{2}\\sqrt{81 \\times 100 - 54^2} = \\dfrac{1}{2}\\sqrt{8100 - 2916} = \\dfrac{1}{2}\\sqrt{5184} = \\dfrac{1}{2} \\times 72 = 36$。$2$ つの道が同じ $36$ に着きました。根号の中は $90^2 - 54^2 = (90 - 54)(90 + 54) = 36 \\times 144$ と見ると暗算でも開けます。\n\nこの式は $3$ つの数だけでできています——角を経由せずに面積が出る。中心の問いへの部分回答：**長さ・角・面積の $3$ つとも、$3$ つの数の式に書けた**。これが「この $3$ つで足りる」の中身です。",
        },
      ],
      formulaPreview:
        "sin θ = 4/5 より S = (1/2)×9×10×(4/5) = 36。別の道: S = (1/2)√(81×100 − 54²) = (1/2)×72 = 36",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "はじめの三角形 OAB（$OA = 4$、$OB = 6$、$\\angle AOB = 60°$、$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$）に戻ります。\n\n辺 OB を $5:4$ に内分する点（$OC : CB = 5 : 4$）を C とします。辺 AB 上に点 P を、$\\overrightarrow{OP}$ と $\\overrightarrow{AC}$ が [垂直] になるようにとります（このような P は辺 AB 上にただ $1$ つあります）。\n\nP は辺 AB 上の点なので $\\overrightarrow{OP} = (1 - t)\\vec{a} + t\\vec{b}$ と書けます。**$t$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 7 / 13,
      answerDisplay: "7/13",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step 1〜3 と比べてみよう。三角形も、そろえた $3$ つの数も同じ。$\\vec{a}$ と $\\vec{b}$ で矢印を書くところまでも同じ。違うのは、点 P の決められ方だけ——前は比が与えられていた。今度は比が分からず、代わりに直角が $1$ つ与えられている。ここまでに手に入れた道具のうち、$2$ 本の矢印の間の角と結びついているのはどれだった？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**P の位置が未知で、代わりに直角が与えられた**こと。直角は「$2$ 本の矢印の関係」なので、まず相手の矢印 $\\overrightarrow{AC}$ を $\\vec{a}$、$\\vec{b}$ で書いてみよう。そうすると、$2$ 本とも $\\vec{a}$、$\\vec{b}$ の式になる。",
        },
        {
          layer: 3,
          text: "$3$ つの数は step 1 と同じ $\\lvert\\vec{a}\\rvert = 4$、$\\lvert\\vec{b}\\rvert = 6$、$\\vec{a}\\cdot\\vec{b} = 12$ です。\n\nまず相手の矢印を書きます。$OC : CB = 5 : 4$ より $\\overrightarrow{OC} = \\dfrac{5}{9}\\vec{b}$、よって $\\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\dfrac{5}{9}\\vec{b} - \\vec{a}$。\n\nここが転換点です。**[垂直] であることは、[内積] が $0$ であることと同じ**でした。図形の言葉（直角）が、数の条件に翻訳されます：\n\n$\\left\\{(1-t)\\vec{a} + t\\vec{b}\\right\\} \\cdot \\left(\\dfrac{5}{9}\\vec{b} - \\vec{a}\\right) = 0$。\n\n左辺を、数の式を展開するのと同じ手つきで開くと\n\n$\\dfrac{5}{9}(1-t)(\\vec{a}\\cdot\\vec{b}) - (1-t)\\lvert\\vec{a}\\rvert^2 + \\dfrac{5}{9}t\\lvert\\vec{b}\\rvert^2 - t(\\vec{a}\\cdot\\vec{b}) = 0$。\n\n$3$ つの数を入れます。$\\dfrac{5}{9} \\times 12 = \\dfrac{20}{3}$、$\\dfrac{5}{9} \\times 36 = 20$ なので\n\n$(1-t)\\left(\\dfrac{20}{3} - 16\\right) + t(20 - 12) = 0$、つまり $-\\dfrac{28}{3}(1-t) + 8t = 0$。\n\n両辺を $3$ 倍して $-28(1-t) + 24t = 0$、$52t = 28$、$t = \\dfrac{7}{13}$。\n\n$t$ が求まると P の位置は完全に決まります（ついでに言えば $\\overrightarrow{AP} = t\\overrightarrow{AB}$ なので $AP : PB = 7 : 6$ です）。ここで起きたことを見てください——**未知数が長さの側から位置の側に移ったのに、使った式は step 1 と同じ「$3$ つの数で開く」だけ**。直角という $1$ つの条件が、$t$ についての $1$ 次方程式に化けました。\n\n中心の問いへの部分回答：**「直角」も $3$ つの数の言葉に翻訳できる**。だから、補助線を探さずに点の位置が計算で決まります。",
        },
      ],
      formulaPreview:
        "AC = (5/9)b − a。OP・AC = 0 を開いて −28(1−t) + 24t = 0、t = 7/13",
      figureMarker: "<<M3V_SQUARE_TO_MOVE>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ三角形 OAB（$OA = 4$、$OB = 6$、$\\angle AOB = 60°$）で、こんどは頂点 A から辺 OB に垂線を下ろします。その足を Q とします。\n\nQ は辺 OB 上の点なので $\\overrightarrow{OQ} = u\\vec{b}$ と書けます。**$u$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 1 / 3,
      answerDisplay: "1/3",
      unit: "",
      unknownLabel: "$u$",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。三角形も $3$ つの数も同じ。直角が $1$ つ与えられていて、点の位置を求めるのも同じ。違うのは、どの $2$ 本が直角に交わるかだけ。前題の式の立て方は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**直角をなす $2$ 本の相手が変わった**こと。Q は辺 OB 上なので、未知数は $u$ ひとつ。垂線を下ろすというのは、$\\overrightarrow{AQ}$ がどの矢印と直角に交わるということだろう？",
        },
        {
          layer: 3,
          text: "前題と同じ立て方です。$\\overrightarrow{AQ} = \\overrightarrow{OQ} - \\overrightarrow{OA} = u\\vec{b} - \\vec{a}$。A から辺 OB へ下ろした垂線なので、$\\overrightarrow{AQ}$ は辺 OB の向き、つまり $\\vec{b}$ と [垂直] です。\n\n$(u\\vec{b} - \\vec{a}) \\cdot \\vec{b} = 0$ を開くと $u\\lvert\\vec{b}\\rvert^2 - \\vec{a}\\cdot\\vec{b} = 0$、すなわち $36u - 12 = 0$、$u = \\dfrac{1}{3}$。\n\n**同じ答えに、もう $1$ つの道でも着きます**。$OQ$ は、$\\vec{a}$ が $\\vec{b}$ の上に落とす「影の長さ」でした（[内積] を影で読んだときの話）。影の長さは $OA\\cos 60° = 4 \\times \\dfrac{1}{2} = 2$ なので、$OB = 6$ に対して $u = \\dfrac{2}{6} = \\dfrac{1}{3}$。式で出した $u = \\dfrac{\\vec{a}\\cdot\\vec{b}}{\\lvert\\vec{b}\\rvert^2}$ は、まさに「影の長さ $\\div$ $OB$」を表していたわけです。\n\n前題との違いは、垂直の相手が $\\overrightarrow{AC}$ から $\\vec{b}$ に変わっただけ。それだけで未知数が $t$ から $u$ に移り、式が別のものになりました。中心の問いへの部分回答：**垂直の条件は、どの $2$ 本についても同じ形で立つ**。$3$ つの数さえあれば、どの垂線の足も同じ手つきで出せます。",
        },
      ],
      formulaPreview:
        "AQ = ub − a。AQ・b = 0 より 36u − 12 = 0、u = 1/3（影の長さ 2 ÷ OB 6 と一致）",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ三角形 OAB（$OA = 4$、$OB = 6$、$\\angle AOB = 60°$）で、辺 OB 上に点 C をとり、辺 AB 上の点 P を $\\overrightarrow{OP}$ と $\\overrightarrow{AC}$ が [垂直] になるようにとります。\n\nC を辺 OB の上で動かすと、P も辺 AB の上を動きます。**P がちょうど $AP : PB = 5 : 6$ の位置に来る**ようにしたいとき、C は辺 OB をどんな比に内分すればよいでしょうか。**$\\dfrac{OC}{CB}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 13 / 8,
      answerDisplay: "13/8",
      unit: "",
      unknownLabel: "$\\dfrac{OC}{CB}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "step 7 と比べてみよう。三角形も、直角の付き方も、登場する点もそっくり同じ。違うのは、分かっているものと求めるものが入れかわっていること——step 7 は C の位置が与えられて P を求めた。今度は P の位置が与えられていて、C のほうが分からない。step 7 の道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**未知数が C の側にある**こと。step 7 では $\\overrightarrow{OC}$ の係数が数で、$t$ が文字だった。今度はどちらが数で、どちらが文字になるだろう？ P の位置が先に決まっているという条件は、$\\overrightarrow{OP}$ をどう書くことになる？",
        },
        {
          layer: 3,
          text: "step 7 と同じ式を、役割を入れかえて立てます。$OC : CB = k : (1 - k)$ とおくと $\\overrightarrow{OC} = k\\vec{b}$、$\\overrightarrow{AC} = k\\vec{b} - \\vec{a}$。P のほうは位置が決まっていて、$AP : PB = 5 : 6$ より $\\overrightarrow{OP} = \\dfrac{6}{11}\\vec{a} + \\dfrac{5}{11}\\vec{b}$ です（step 7 の $t$ が $\\dfrac{5}{11}$ に決まっている状態）。\n\n[垂直] の条件は step 7 とまったく同じ形：\n\n$\\left(\\dfrac{6}{11}\\vec{a} + \\dfrac{5}{11}\\vec{b}\\right) \\cdot (k\\vec{b} - \\vec{a}) = 0$。\n\n開くと $\\dfrac{6k}{11}(\\vec{a}\\cdot\\vec{b}) - \\dfrac{6}{11}\\lvert\\vec{a}\\rvert^2 + \\dfrac{5k}{11}\\lvert\\vec{b}\\rvert^2 - \\dfrac{5}{11}(\\vec{a}\\cdot\\vec{b}) = 0$。両辺を $11$ 倍して $3$ つの数を入れると\n\n$72k - 96 + 180k - 60 = 0$、$252k = 156$、$k = \\dfrac{13}{21}$。\n\n$k$ は $OC : OB$ の比なので $OC : CB = \\dfrac{13}{21} : \\dfrac{8}{21} = 13 : 8$、よって $\\dfrac{OC}{CB} = \\dfrac{13}{8}$。\n\n$k$ が $1$ 次で出てきたので、答えはただ $1$ つ。「P をその位置にする C は、辺 OB 上にちょうど $1$ 個ある」ことまで、この式が言っています。step 7 で C を与えて P を出した式と、今回 P を与えて C を出した式は、**同じ $1$ 本の式を別の文字について解いただけ**です。\n\n中心の問いへの部分回答：**$3$ つの数で書いた条件式は、どちらの向きにも読める**——位置から直角を、直角から位置を。同じ式が両方をつなぎます。",
        },
      ],
      formulaPreview:
        "OP = (6a + 5b)/11、AC = kb − a。内積 = 0 を開いて 252k = 156、k = 13/21、OC:CB = 13:8",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "三角形 ABC で、$AB = 7$、$AC = 8$、$BC = 9$ とします。$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$ とおきます（三角形なので $\\vec{b}$ と $\\vec{c}$ は $1$ 次独立です）。\n\n三角形の $3$ つの頂点から、それぞれの向かい合う辺に下ろした $3$ 本の垂線は、$1$ 点で交わります。この点を**垂心**といい、H とします。\n\nH も平面上の点なので $\\overrightarrow{AH} = s\\vec{b} + t\\vec{c}$ と書けます。**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 4 / 15,
      answerDisplay: "4/15",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 4 と step 7〜9 を、両方思い出して比べてみよう。step 4 は $3$ 辺しか与えられていない三角形だった。step 7〜9 は直角が $1$ つ与えられていて、未知数が $1$ つだった。今度はその両方が重なっている——$3$ 辺しか与えられておらず、しかも未知数は $s$ と $t$ の $2$ つ。未知数が $2$ つあるとき、条件はいくつ要るだろう？ そして、この図の中に直角はいくつあるだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**直角が $1$ 本ではなく $2$ 本使える**こと。垂心は「$3$ 本の垂線が集まる点」だが、$2$ 本で交点は決まる（$3$ 本目は勝手についてくる）。$2$ 本の垂線は、それぞれどの矢印とどの矢印が直角に交わっていることだろう？",
        },
        {
          layer: 3,
          text: "まず、いつもどおり $3$ つの数をそろえます。ここは step 4 と同じ道です。$\\lvert\\vec{b}\\rvert = 7$、$\\lvert\\vec{c}\\rvert = 8$。$\\overrightarrow{BC} = \\vec{c} - \\vec{b}$ で $BC = 9$ なので、$2$ 乗して\n\n$64 - 2(\\vec{b}\\cdot\\vec{c}) + 49 = 81$、$\\vec{b}\\cdot\\vec{c} = 16$。\n\n**$3$ つの数がそろわないと、このあと $1$ 本も式が立ちません**——ここが、この山場の入口です。\n\n次に垂直条件を $2$ 本立てます。$\\overrightarrow{AH} = s\\vec{b} + t\\vec{c}$ とおきます。\n\n$1$ 本目：A から下ろした垂線は辺 BC に垂直なので $\\overrightarrow{AH} \\cdot \\overrightarrow{BC} = 0$。\n$(s\\vec{b} + t\\vec{c}) \\cdot (\\vec{c} - \\vec{b}) = s(\\vec{b}\\cdot\\vec{c}) + t\\lvert\\vec{c}\\rvert^2 - s\\lvert\\vec{b}\\rvert^2 - t(\\vec{b}\\cdot\\vec{c}) = 16s + 64t - 49s - 16t = -33s + 48t = 0$。\n\n$2$ 本目：B から下ろした垂線は辺 AC に垂直なので $\\overrightarrow{BH} \\cdot \\overrightarrow{AC} = 0$。$\\overrightarrow{BH} = \\overrightarrow{AH} - \\vec{b} = (s-1)\\vec{b} + t\\vec{c}$ なので\n$(s-1)(\\vec{b}\\cdot\\vec{c}) + t\\lvert\\vec{c}\\rvert^2 = 16(s-1) + 64t = 0$、両辺を $16$ で割って $s + 4t = 1$。\n\n$1$ 本目から $t = \\dfrac{33}{48}s = \\dfrac{11}{16}s$。これを $2$ 本目に入れて $s + \\dfrac{44}{16}s = 1$、$\\dfrac{15}{4}s = 1$、**$s = \\dfrac{4}{15}$**（ついでに $t = \\dfrac{11}{16} \\times \\dfrac{4}{15} = \\dfrac{11}{60}$ で、H の位置が完全に決まります）。\n\n$s$ も $t$ も正で $s + t = \\dfrac{9}{20} < 1$——H はちゃんと三角形の内部にあります（この三角形は $3$ 角とも鋭角だからです）。$3$ 本目の垂線 $\\overrightarrow{CH} \\cdot \\overrightarrow{AB}$ も $0$ になることは、$2$ 本の式から自動的に従います。\n\n**幾何のやり方**なら、垂心を出すのに補助線と円周角や相似の組み合わせを探すことになります。ベクトルでは、探すものが何もありません——$3$ つの数をそろえ、直角を $2$ 回 $0$ に置き、連立を解く。それだけです。\n\n中心の問いへの答え：**$3$ つの数は、その平面の「ものさし」だった**。位置を $s$、$t$ で翻訳し、計量を $3$ つの数で翻訳すると、長さも角も面積も垂直も、全部が同じ式計算の中に入ってきます。",
        },
      ],
      formulaPreview:
        "b・c = 16。AH・BC = 0 より −33s + 48t = 0、BH・AC = 0 より s + 4t = 1。解いて s = 4/15",
    },
  ],
  derivation: `**中心の問い** ｜ 基準の $2$ 本について $\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の **$3$ つの数**さえ持っていれば、平面上のどんな線分の長さも、角も、面積も計算で出る——なぜ**この $3$ つで足りる**のか？ そして長さは、なぜ「$2$ 乗して初めて動き出す」のか？

────────

**まず「$3$ つの数」をそろえる**

前の系列までで、基準の矢印を $2$ 本決めれば平面上のどんな点 P も $\\overrightarrow{OP} = s\\vec{a} + t\\vec{b}$ と書けることを手に入れました。これは**位置の翻訳**です。けれど、位置が翻訳できても、それだけでは長さも角も面積も出ません。$\\vec{a}$ と $\\vec{b}$ が「どれくらいの長さで、どれくらい開いているか」を、まだ一度も数にしていないからです。

そこに足すのが**計量の翻訳**——$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの実数です。ベクトルで図形の計量を扱うときは、何をおいてもまず「この $3$ つの数をそろえよう」と考えます。step 1 では $2$ 辺となす角から、step 4 では $3$ 辺から、step 10 では同じく $3$ 辺から——材料は毎回違っても、そろえる先はいつもこの $3$ つでした。

**なぜ $3$ つで足りるのか**

平面上の $2$ 点 P、Q を $\\overrightarrow{OP} = s_1\\vec{a} + t_1\\vec{b}$、$\\overrightarrow{OQ} = s_2\\vec{a} + t_2\\vec{b}$ と書いて、内積を分配法則で開いてみます。

$$\\overrightarrow{OP}\\cdot\\overrightarrow{OQ} = s_1 s_2 \\lvert\\vec{a}\\rvert^2 + (s_1 t_2 + t_1 s_2)(\\vec{a}\\cdot\\vec{b}) + t_1 t_2 \\lvert\\vec{b}\\rvert^2$$

開いたあとに残る「ベクトルのままの部分」は、$\\lvert\\vec{a}\\rvert^2$、$\\vec{a}\\cdot\\vec{b}$、$\\lvert\\vec{b}\\rvert^2$ の $3$ つしかありません。しかも長さは $\\lvert\\overrightarrow{OP}\\rvert^2 = \\overrightarrow{OP}\\cdot\\overrightarrow{OP}$、角は $\\cos\\theta = \\dfrac{\\overrightarrow{OP}\\cdot\\overrightarrow{OQ}}{\\lvert\\overrightarrow{OP}\\rvert\\lvert\\overrightarrow{OQ}\\rvert}$、垂直は内積 $= 0$、面積も後で見るように内積の式——**計量の問いは全部、内積に帰着する**。

**ここが胚細胞**：内積は分配法則で開けるので、どんな内積も「係数の積」と「$3$ つの数」だけの式になります。だから、その平面の計量を全部決めているのは $3$ つの数であり、それ以上は要らない。位置の翻訳（$s$、$t$）に計量の翻訳（$3$ つの数）を重ねた瞬間、図形の計量が**式の展開**に変わります。

**$2$ 乗して初めて動き出す**

$\\left\\lvert \\dfrac{1}{6}\\vec{a} + \\dfrac{5}{6}\\vec{b} \\right\\rvert$ という式は、このままではどうにもなりません。大きさの記号の中に足し算が入っているのに、その足し算を外へ出す方法がないからです。ところが $2$ 乗した瞬間、$\\lvert\\vec{p}\\rvert^2 = \\vec{p}\\cdot\\vec{p}$ という橋がかかり、内積の分配法則が使えるようになります。

$$\\left\\lvert s\\vec{a} + t\\vec{b} \\right\\rvert^2 = s^2\\lvert\\vec{a}\\rvert^2 + 2st(\\vec{a}\\cdot\\vec{b}) + t^2\\lvert\\vec{b}\\rvert^2$$

数の世界の $(sa + tb)^2 = s^2a^2 + 2stab + t^2b^2$ と、字面がそっくりです。ベクトルは足し算と実数倍について数と同じ性質をもつと確かめてあり、内積にも分配法則があるので、**文字式と同じ感覚で展開してよい**。だから提出させる値も $\\lvert\\overrightarrow{OP}\\rvert^2$ の形にしてあります——$2$ 乗こそが、この系列の核の手つきだからです。

**「直角」も $3$ つの数の言葉になる**

step 7 で起きたことは、この系列でいちばん大きな転換です。「$\\overrightarrow{OP}$ と $\\overrightarrow{AC}$ が直角に交わる」という図形の言葉は、$\\overrightarrow{OP}\\cdot\\overrightarrow{AC} = 0$ という数の条件に置きかわります。左辺を $3$ つの数で開けば、未知の $t$ についてのただの $1$ 次方程式。補助線を探す必要も、うまい定理を思い出す必要もありません。

条件を $2$ 本にすれば、未知数も $2$ つ扱えます。それが step 10 の垂心でした。垂線は $3$ 本ありますが、条件を $2$ 本立てれば交点は決まり、$3$ 本目は自動的に通ります。

**角と面積**

内積の定義 $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ を $\\cos\\theta$ について解けば、角は $3$ つの数の割り算 $1$ つ。面積は、数Ⅰ の $S = \\dfrac{1}{2}\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\sin\\theta$ から出発して $\\sin\\theta = \\sqrt{1 - \\cos^2\\theta}$ を代入し、根号の外の $\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert$ を中に入れると

$$S = \\dfrac{1}{2}\\sqrt{\\lvert\\vec{a}\\rvert^2\\lvert\\vec{b}\\rvert^2 - (\\vec{a}\\cdot\\vec{b})^2}$$

——これも $3$ つの数だけの式です。step 6 では、この式と数Ⅰ の $\\dfrac{1}{2}\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\sin\\theta$ の $2$ つの道が、同じ $36$ に着きました。

**Step の道筋**

- **Step 1**：$2$ 辺となす角から $3$ つの数をそろえ、内分点までの長さを $2$ 乗で出す。大きさは配れない
- **Step 2**：点が変わっても $3$ つの数は使い回せる。変わるのは係数だけ
- **Step 3**：長さから位置を逆に決める。$2$ 次方程式になり、「辺の上」という条件が片方の解を切る
- **Step 4**：なす角がない三角形。$3$ 辺から $3$ つ目の数を作る（$2$ 乗の展開＝余弦定理）
- **Step 5**：同じ $3$ つの数から角の $\\cos$。割り算 $1$ つ
- **Step 6**：同じ $3$ つの数から面積。数Ⅰ の面積公式と、根号の式の $2$ 通りで確かめる
- **Step 7（転換点）**：直角が内積 $= 0$ になり、点の位置が $1$ 次方程式で決まる
- **Step 8**：垂直の相手を変えても、立て方は同じ。垂線の足は「影の長さ」でもある
- **Step 9**：位置を先に決めて、条件のほうを逆算する。同じ式を別の文字について解く
- **Step 10（山場）**：垂心。$3$ 辺から $3$ つの数を作り、直角 $2$ 本を連立する

────────

**もっと深く** — $3$ つの数が、その平面のものさしになっている

**忘れても導ける**：面積の公式 $\\dfrac{1}{2}\\sqrt{\\lvert\\vec{a}\\rvert^2\\lvert\\vec{b}\\rvert^2 - (\\vec{a}\\cdot\\vec{b})^2}$ は覚えなくてかまいません。数Ⅰ の $\\dfrac{1}{2}\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\sin\\theta$ から出発して、$\\sin\\theta = \\sqrt{1-\\cos^2\\theta}$ と $\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert}$ を入れ、外の $\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert$ を根号の中へ入れれば、その場で生えてきます。$2$ 乗の展開公式も同じで、$(\\vec{c}-\\vec{b})\\cdot(\\vec{c}-\\vec{b})$ を分配法則で開くだけ。覚えるのは「まず $3$ つの数をそろえる」という**手つき $1$ つ**で足ります。

**やってしまいがちな誤り $1$：大きさを配ってしまう**。$\\lvert s\\vec{a} + t\\vec{b} \\rvert = s\\lvert\\vec{a}\\rvert + t\\lvert\\vec{b}\\rvert$ は成り立ちません。step 1 の値で確かめると、左辺の $2$ 乗は $\\dfrac{259}{9}$、右辺の $2$ 乗は $\\dfrac{289}{9}$ で違います。大きさは「つないだ結果の長さ」なので、$2$ 本が同じ向きに一直線に並んでいるときだけ足し算になり、少しでも開いていれば必ず短くなる（三角不等式）。**大きさの記号の中では、足し算は外へ出せない**——出すには $2$ 乗して内積に変えるしかありません。

**やってしまいがちな誤り $2$：真ん中の符号**。$\\lvert\\vec{c}-\\vec{b}\\rvert^2 = \\lvert\\vec{c}\\rvert^2 - 2(\\vec{b}\\cdot\\vec{c}) + \\lvert\\vec{b}\\rvert^2$ の真ん中を $+$ にしてしまう間違いはよく起きます。数の $(c-b)^2$ とまったく同じ形だと思い出せば防げます。ここを間違えると、$3$ つ目の数が符号ごと狂い、以降の長さ・角・面積が全部ずれます。

**なぜ内積 $= 0$ が直角なのか**：定義 $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ で、$\\vec{a}$ も $\\vec{b}$ も $\\vec{0}$ でなければ $\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert \\ne 0$。だから内積が $0$ になるのは $\\cos\\theta = 0$、つまり $\\theta = 90°$ のときだけです。影で読むなら「相手の上に落ちる影の長さが $0$」——真上から光を当てたとき、棒が地面に垂直に立っていれば影は点になります。

**この先の景色**：次の系列で出てくる成分表示は、この $3$ つの数が $\\lvert\\vec{e_1}\\rvert = 1$、$\\lvert\\vec{e_2}\\rvert = 1$、$\\vec{e_1}\\cdot\\vec{e_2} = 0$ という**いちばん簡単な値になった特別な場合**です。だから成分の計算では交差項が消えて、内積が「成分どうしの積の和」になります。空間（系列 $10$ 以降）では基準が $3$ 本になるので、そろえる数は $3$ つではなく $6$ つ（$3$ 本の大きさと $3$ 組の内積）——けれど手つきは何ひとつ変わりません。大学では、この $3$ つ（や $6$ つ）の数を並べた表をグラム行列と呼び、「基準を決めると計量が数の表になる」ことそのものが線形代数の主題になります。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（線分の長さを内積で $\\to$ $3$ 辺から内積・角・面積 $\\to$ 角と面積の公式 $\\to$ 垂直条件）と、
  「$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの値をそろえよう」「大きさの式は $2$ 乗することで動き始める」という着眼を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ $3$ つの数で足りるのか」——**計量の問いはすべて内積に帰着し、内積は分配法則で開くと $\\lvert\\vec{a}\\rvert^2$、$\\vec{a}\\cdot\\vec{b}$、$\\lvert\\vec{b}\\rvert^2$ の $3$ つしか残さないから**です。位置を $s$、$t$ で翻訳し、計量を $3$ つの数で翻訳すれば、その平面の長さ・角・面積・垂直は、もう全部が式の中にあります。

「なぜ長さは $2$ 乗して初めて動き出すのか」——**大きさの記号は足し算を外へ出せないが、$2$ 乗は大きさを内積に変え、内積は分配法則をもっているから**です。$2$ 乗は、ベクトルの式を「開ける」形に変える鍵でした。

**ひらめきの要る幾何が、手順の要る代数になる。** step 10 の垂心では、補助線を $1$ 本も引かずに、$3$ つの数と直角 $2$ 本だけで点の位置が決まりました。次の系列では、この $3$ つの数がいちばん簡単な値になるように基準を選び直します——長さ $1$ で直角に交わる $2$ 本。そのとき、ベクトルは座標と同じ顔の「数の組」になります。`,
};

/** M3V8: 成分表示（直交する基準に固定する）。
 *  基準の矢印を「長さ 1・直交」の e1, e2 に固定すると、ベクトルは座標と同じ顔の数の組になる。
 *  そのとき内積が a1b1 + a2b2 という、角を一度も使わない式で出る——|e1|=|e2|=1 と e1・e2=0 で
 *  分配法則の交差項が消えるから。長さ（三平方）・内積・角・面積・垂直・平行が、
 *  すべて 4 つの数の四則計算に翻訳される。
 *  質的変化 step6 は「平行四辺形である」という図形の条件が成分の等式に翻訳される所。
 *  山場 step10 は基準を斜めに戻す——成分表示は万能ではなく「直交にそろえたときだけの特別な顔」だと分かる。
 *
 *  順序対の折り方（背骨 D2-1）：成分・座標は片側だけ（step1 は x 成分だけ、step6 は D の x 座標だけ）。
 *  step10 の s と t は同じ連立から一度に落ちる「割れない順序対」なので、t は L3 で見せるだけにして提出させない。
 *  大きさは旧系列・原典と重ならないピタゴラス数（12,35,37）(9,40,41) で整数に。角は特別角の度数。 */
export const M3V_COMPONENT_SERIES: LearnerSeries = {
  id: "math3_vec_component_01",
  title: "成分表示（直交する基準に固定する）",
  subtitle:
    "数Ⅲ・C ベクトルより — 基準の矢印を「長さ $1$・直交」の $2$ 本に固定すると、ベクトルは数の組になる。$2$ 点から成分を読む入口から、基準を斜めに戻す山場まで $10$ 問。",
  patternId: "M3V8",
  unit: "math_3",
  revelationLabel:
    "**成分表示は、万能の魔法ではなかった**。基準を「長さ $1$・直交」の $2$ 本に固定したからこそ、係数はそのまま読め、内積から角が消えた——基準を斜めに戻したとたん、連立を解く仕事が戻ってくる",
  drivingQuestion:
    "基準の矢印を「長さ $1$・直交」の $2$ 本に**固定**すると、ベクトルは座標と同じ顔の**数の組**になる——そのとき内積が「成分どうしの積の和」という、**角の情報を一度も使わない式**で出せてしまうのはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "座標平面上に $2$ 点 A$(-4, 2)$、B$(3, 6)$ があります。\n\nベクトル $\\overrightarrow{AB}$ を、始点を原点に置きなおしたときの終点の座標で $\\overrightarrow{AB} = (a_1, a_2)$ と書き表すことを [成分表示] といいます。$a_1$ を $x$ 成分、$a_2$ を $y$ 成分といいます。\n\nA から B へ行くとき、$x$ 軸の向きにはどれだけ進むでしょうか。**$\\overrightarrow{AB}$ の $x$ 成分**を求めましょう（$y$ 成分は聞きません）。",
      answer: 7,
      unit: "",
      unknownLabel: "$\\overrightarrow{AB}$ の $x$ 成分",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "数直線の上で $-4$ から $3$ へ動くとき、どちら向きに、どれだけ動いたと言えるだろう？ 平面でも、$x$ 軸の向きの動きだけを取り出せば、同じ話にならないだろうか。",
        },
        {
          layer: 2,
          text: "見るところは $1$ つだけ——**$x$ 座標だけ**。$y$ 座標のことはいったん忘れてよい。「動いた量」は、出発した場所と着いた場所の、どちらからどちらを引くと出る？",
        },
        {
          layer: 3,
          text: "A の $x$ 座標は $-4$、B の $x$ 座標は $3$。A から B へは $x$ 軸の向きに $3 - (-4) = 7$ だけ進みます。だから $\\overrightarrow{AB}$ の $x$ 成分は $7$ です（ついでに $y$ 成分は $6 - 2 = 4$ なので $\\overrightarrow{AB} = (7, 4)$）。\n\n**やってしまいがちな誤り $1$**：$-4 - 3 = -7$ と、**始点から終点を引いてしまう**こと。成分は「**終点の座標 $-$ 始点の座標**」です。迷ったら「A から B へどちらへ動いたか」と口に出すと向きが決まります（$-4$ から $3$ へは右へ動いたので正）。\n\n**やってしまいがちな誤り $2$**：$(7, 4)$ という数の組を**点の座標だと読む**こと。$(7, 4)$ は「$x$ 軸の向きに $7$、$y$ 軸の向きに $4$ 進む矢印」であって、点 $(7,4)$ のことではありません。成分と座標は同じ形をしているので、どちらの話をしているのかは前後の文から読むしかありません（ベクトルは矢印、座標は場所）。\n\n中心の問いへの最初の部分回答：**矢印は、$x$ 方向の進みと $y$ 方向の進みという $2$ つの数に分解できる**。ここから、図形の話を数の話に翻訳する道が開きます。",
        },
      ],
      formulaPreview: "AB =（終点 − 始点）= (3 − (−4), 6 − 2) = (7, 4)　x 成分は 7",
      figureMarker: "<<M3V_COMPONENT_GRID>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "別の $2$ 点 P$(-5, 2)$、Q$(7, 37)$ について、こんどは**矢印の長さ**を求めます。\n\n$\\overrightarrow{PQ}$ の大きさ $\\lvert\\overrightarrow{PQ}\\rvert$ を求めましょう。",
      answer: 37,
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{PQ}\\rvert$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 点から矢印を作るところは、そっくり同じ。違うのは聞かれているもの。前題で出した $2$ つの数から、矢印そのものの長さは言えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**聞かれているのが成分ではなく長さ**になったこと $1$ つ。$x$ 方向の進みと $y$ 方向の進みは、たがいに直角に交わっている。この $2$ つと矢印そのものは、合わせてどんな形をつくっている？",
        },
        {
          layer: 3,
          text: "前題と同じように、まず成分を出します。$\\overrightarrow{PQ} = (7 - (-5),\\ 37 - 2) = (12, 35)$。これは「$x$ 方向に $12$、$y$ 方向に $35$ 進む矢印」なので、$x$ 方向の進みと $y$ 方向の進みを直角をはさむ $2$ 辺とする直角三角形をつくると、**斜辺がちょうど $\\overrightarrow{PQ}$ そのもの**です。中学で習った [三平方の定理] がそのまま使えて\n\n$\\lvert\\overrightarrow{PQ}\\rvert^2 = 12^2 + 35^2 = 144 + 1225 = 1369$。\n\n$1369$ の $1$ の位は $9$ なので、$2$ 乗して $1369$ になる数の $1$ の位は $3$ か $7$。$33^2 = 1089$ では小さすぎ、$37^2 = 1369$ でぴたり合います。よって $\\lvert\\overrightarrow{PQ}\\rvert = 37$。\n\n中心の問いへの部分回答：**成分さえ分かれば、長さは中学の定理だけで出る**——ここまでに「角」の情報は一度も要りませんでした。基準の $2$ 本が直角に交わっているからこそ、三平方がそのまま当たるのです。",
        },
      ],
      formulaPreview: "PQ = (12, 35)、|PQ|² = 12² + 35² = 1369 = 37² より |PQ| = 37",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは長さのほうが先に分かっています。\n\nベクトル $\\vec{a}$ は、大きさが $\\lvert\\vec{a}\\rvert = 41$、$x$ 成分が $9$、そして $y$ 成分は正の数だと分かっています。\n\n**$\\vec{a}$ の $y$ 成分**を求めましょう。",
      answer: 40,
      unit: "",
      unknownLabel: "$\\vec{a}$ の $y$ 成分",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。出てくる登場人物（$x$ 成分・$y$ 成分・長さ）は同じ $3$ つ。違うのは、そのうちどれが分かっていて、どれが分からないか。前題で立てた式を、そのまま逆から読めないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分からないものが「長さ」から「$y$ 成分」に移った**こと $1$ つ。前題の式を、そのまま書いてみよう。いま値が入っていないのはどこ？",
        },
        {
          layer: 3,
          text: "前題では $\\lvert\\overrightarrow{PQ}\\rvert^2 = 12^2 + 35^2$ と、$2$ つの成分から長さを出しました。今度は同じ式を逆から読みます。$y$ 成分を $y$ とおくと\n\n$9^2 + y^2 = 41^2$、つまり $81 + y^2 = 1681$、$y^2 = 1600$。\n\n$y^2 = 1600$ を満たすのは $y = 40$ と $y = -40$ の $2$ つですが、問題が「$y$ 成分は正」と言っているので $y = 40$。（条件がなければ $(9, 40)$ と $(9, -40)$ の $2$ 本があり、どちらも大きさは $41$ です。$x$ 軸について折り返した矢印は、長さが変わりませんから。）\n\n中心の問いへの部分回答：**成分と大きさは、$1$ 本の式で結ばれている**。だから、どちらからどちらへも行き来できます——長さを出すのも、長さから成分を逆算するのも、使う式は同じ $1$ 本です。",
        },
      ],
      formulaPreview: "9² + y² = 41² → y² = 1681 − 81 = 1600 → y = 40（y > 0 より）",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "ここからは、はじめから成分表示されたベクトルを扱います。\n\n$\\vec{a} = (5, 2)$、$\\vec{b} = (3, 7)$ とします（点の座標ではなく、ベクトルの成分です）。\n\n**内積 $\\vec{a}\\cdot\\vec{b}$** を求めましょう。\n\n内積の定義は $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$（$\\theta$ は $2$ 本のなす角）でしたが、この問題では $\\theta$ の値は与えられていません。",
      answer: 29,
      unit: "",
      unknownLabel: "$\\vec{a}\\cdot\\vec{b}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでの $2$ 問は、角を一度も使わずに長さを出し入れしていた。今度の相手は [内積]——定義には $\\cos\\theta$ が入っている。それでも、角を知らないまま進める道はあるだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**聞かれているのが $1$ 本の長さではなく、$2$ 本の内積**になったこと $1$ つ。$\\vec{a} = (5, 2)$ とは「$x$ 軸の向きに $5$、$y$ 軸の向きに $2$」という意味でした。この「$x$ 軸の向き」と「$y$ 軸の向き」の $2$ 本は、たがいにどんな関係にある？",
        },
        {
          layer: 3,
          text: "$x$ 軸の正の向きをもつ長さ $1$ のベクトルを $\\vec{e}_1$、$y$ 軸の正の向きをもつ長さ $1$ のベクトルを $\\vec{e}_2$ と名づけます。成分表示 $\\vec{a} = (5, 2)$ は $\\vec{a} = 5\\vec{e}_1 + 2\\vec{e}_2$ ということ、$\\vec{b} = (3, 7)$ は $\\vec{b} = 3\\vec{e}_1 + 7\\vec{e}_2$ ということです。内積には分配法則が成り立つので、ふつうの文字式のように展開できます。\n\n$\\vec{a}\\cdot\\vec{b} = (5\\vec{e}_1 + 2\\vec{e}_2)\\cdot(3\\vec{e}_1 + 7\\vec{e}_2) = 15\\lvert\\vec{e}_1\\rvert^2 + 35\\,\\vec{e}_1\\cdot\\vec{e}_2 + 6\\,\\vec{e}_2\\cdot\\vec{e}_1 + 14\\lvert\\vec{e}_2\\rvert^2$\n\nここで $\\lvert\\vec{e}_1\\rvert = \\lvert\\vec{e}_2\\rvert = 1$、そして $\\vec{e}_1$ と $\\vec{e}_2$ は直角なので $\\vec{e}_1\\cdot\\vec{e}_2 = 0$。**まん中の交差した $2$ 項が丸ごと消えて**\n\n$\\vec{a}\\cdot\\vec{b} = 5\\cdot3 + 2\\cdot7 = 15 + 14 = 29$。\n\n角を使った定義でも同じ値になるか、確かめておきましょう。$\\lvert\\vec{a}\\rvert = \\sqrt{25+4} = \\sqrt{29}$、$\\lvert\\vec{b}\\rvert = \\sqrt{9+49} = \\sqrt{58} = \\sqrt{2}\\,\\sqrt{29}$。この $2$ 本のなす角はちょうど $45°$ で、$\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos 45° = \\sqrt{29}\\cdot\\sqrt{2}\\sqrt{29}\\cdot\\dfrac{1}{\\sqrt{2}} = 29$。ぴたりと一致します。\n\n中心の問いへの部分回答：**角の情報は消えたのではなく、基準の $2$ 本を直交にそろえた時点で「交差項が $0$」という形で式の中に畳み込まれていた**のです。",
        },
      ],
      formulaPreview: "a・b = (5e1 + 2e2)・(3e1 + 7e2) = 5·3 + 2·7 = 29（e1・e2 = 0 で交差項が消える）",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "座標平面上に $3$ 点 A$(-1, 2)$、B$(3, 3)$、C$(-6, 5)$ があります（こんどは点の座標です）。\n\n$\\angle BAC$、すなわち $\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ のなす角の大きさを、**度**で求めましょう。単位はつけず、数だけ答えてください。",
      answer: 135,
      unit: "",
      unknownLabel: "$\\angle BAC$（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は $2$ 本のベクトルが最初から成分で与えられていた。今度は $3$ つの点から始まる。step 1 の「$2$ 点から成分へ」と、前題の「成分から内積へ」を、続けて歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**聞かれているのが内積そのものではなく、なす角**になったこと $1$ つ。内積の定義 $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ に出てくる $4$ つの量のうち、いま手に入れられないのはどれ？",
        },
        {
          layer: 3,
          text: "step 1 と前題を続けて使います。まず成分：$\\overrightarrow{AB} = (3-(-1),\\ 3-2) = (4, 1)$、$\\overrightarrow{AC} = (-6-(-1),\\ 5-2) = (-5, 3)$。前題の成分公式で内積は\n\n$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 4\\cdot(-5) + 1\\cdot3 = -20 + 3 = -17$。\n\n大きさは step 2 と同じ三平方で $\\lvert\\overrightarrow{AB}\\rvert = \\sqrt{16+1} = \\sqrt{17}$、$\\lvert\\overrightarrow{AC}\\rvert = \\sqrt{25+9} = \\sqrt{34} = \\sqrt{2}\\,\\sqrt{17}$。これを定義の式にあてはめると\n\n$-17 = \\sqrt{17}\\cdot\\sqrt{2}\\sqrt{17}\\,\\cos\\theta = 17\\sqrt{2}\\,\\cos\\theta$、すなわち $\\cos\\theta = -\\dfrac{1}{\\sqrt{2}}$。\n\nなす角は $0° \\le \\theta \\le 180°$ の範囲で測るので、これを満たすのは $\\theta = 135°$。答えは $135$ です。\n\n内積が**負**になった時点で、鈍角だと分かっていました（$\\lvert\\vec{a}\\rvert$ と $\\lvert\\vec{b}\\rvert$ はいつも正なので、内積の符号は $\\cos\\theta$ の符号そのもの）。\n\n中心の問いへの部分回答：**角も、成分だけから出る**。角を知らないまま内積を出し、その内積から角を取り出す——順序がすっかり逆転しています。",
        },
      ],
      formulaPreview: "AB = (4,1)、AC = (−5,3)、内積 −17、|AB| = √17、|AC| = √34 → cos θ = −1/√2 → 135 度",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "座標平面上の $3$ 点 A$(-6, 2)$、B$(3, 4)$、C$(6, 7)$ に、もう $1$ つ点 D を加えて、**頂点がこの順に並ぶ平行四辺形 ABCD** をつくります（辺 AB と辺 DC が向かい合い、辺 BC と辺 AD が向かい合う四角形のことです）。\n\n**D の $x$ 座標**を求めましょう（$y$ 座標は聞きません）。",
      answer: -3,
      unit: "",
      unknownLabel: "D の $x$ 座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは点や成分がすべて与えられていて、そこから内積や角を計算していた。今度は、点そのものがまだ決まっていない。「平行四辺形である」という**図形の言葉**は、成分の言葉に翻訳できないだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**図形の条件のほうから点を決める**ことになった。ベクトルが「等しい」とは、向きと大きさが同じことでした。平行四辺形 ABCD で、向かい合う $2$ 辺をなぞる矢印 $\\overrightarrow{AB}$ と $\\overrightarrow{DC}$ は、向きも大きさもどうなっている？",
        },
        {
          layer: 3,
          text: "頂点が A, B, C, D の順に並ぶ平行四辺形では、辺 AB と辺 DC が平行で長さも等しく、たどる向きもそろっています。つまり $\\overrightarrow{AB} = \\overrightarrow{DC}$。そして**ベクトルが等しいとは、成分がそろうこと**なので、この $1$ 本の等式が $2$ つの数の等式になります。\n\n$\\overrightarrow{AB} = (3-(-6),\\ 4-2) = (9, 2)$。D の座標を $(x, y)$ とおくと $\\overrightarrow{DC} = (6 - x,\\ 7 - y)$。$x$ 成分どうしを比べて\n\n$6 - x = 9$、よって $x = -3$。\n\n（$y$ 成分どうしを比べれば $7 - y = 2$ で $y = 5$ ですが、いま聞かれているのは $x$ 座標だけです。）\n\n**やってしまいがちな誤り**：$\\overrightarrow{AB} = \\overrightarrow{CD}$ としてしまうこと。ABCD の順に一周する平行四辺形では、辺 AB をたどる向きと辺 CD をたどる向きは**反対**です（$\\overrightarrow{CD} = -\\overrightarrow{AB}$）。$\\overrightarrow{AB}$ と同じ向きなのは $\\overrightarrow{DC}$ のほう。図に頂点を順に打って、ぐるりと一周する矢印を描いてみると取り違えません。\n\n中心の問いへの部分回答：**「平行四辺形である」という図形の条件が、成分の等式 $2$ 本にそっくり翻訳された**。補助線を探す代わりに、引き算だけで $4$ つ目の頂点が決まります。ここが、この系列でいちばん景色の変わるところです。",
        },
      ],
      formulaPreview: "平行四辺形 ABCD ⟺ AB = DC。(9, 2) = (6 − x, 7 − y)、x 成分から 6 − x = 9 → x = −3",
      figureMarker: "<<M3V_PARALLELOGRAM_D>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "座標平面上に $3$ 点 A$(-4, 1)$、B$(1, 2)$、C$(-2, 7)$ があります。\n\n**三角形 ABC の面積**を求めましょう。",
      answer: 14,
      unit: "",
      unknownLabel: "三角形 ABC の面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "step 5 と比べてみよう。あのときも $3$ 点から始まり、$2$ 本の矢印を作って角を出した。今度は同じ出だしで、聞かれているものだけが違う。$2$ 本の矢印について前に出した値は、そのまま今度も効くだろうか？",
        },
        {
          layer: 2,
          text: "step 5 と変わったのは、**聞かれているのが角ではなく面積**になったこと $1$ つ。step 5 で手に入れた $3$ つの値（$2$ 本の長さと内積）だけで、面積まで行けるかどうかを考えてみよう。",
        },
        {
          layer: 3,
          text: "step 5 と同じ出だしです。$\\overrightarrow{AB} = (1-(-4),\\ 2-1) = (5, 1)$、$\\overrightarrow{AC} = (-2-(-4),\\ 7-1) = (2, 6)$。内積は $5\\cdot2 + 1\\cdot6 = 16$、長さの $2$ 乗は $\\lvert\\overrightarrow{AB}\\rvert^2 = 25 + 1 = 26$、$\\lvert\\overrightarrow{AC}\\rvert^2 = 4 + 36 = 40$。$2$ 本の矢印が張る三角形の面積は\n\n$S = \\dfrac{1}{2}\\sqrt{\\lvert\\vec{a}\\rvert^2\\lvert\\vec{b}\\rvert^2 - (\\vec{a}\\cdot\\vec{b})^2}$\n\nでした。あてはめると $S = \\dfrac{1}{2}\\sqrt{26\\cdot40 - 16^2} = \\dfrac{1}{2}\\sqrt{1040 - 256} = \\dfrac{1}{2}\\sqrt{784} = \\dfrac{28}{2} = 14$。\n\n**成分のときだけ使える近道**：$\\vec{a} = (a_1, a_2)$、$\\vec{b} = (b_1, b_2)$ を上の式に入れて展開すると、根号の中は $(a_1b_2 - a_2b_1)^2$ にきれいにまとまります。だから成分なら\n\n$S = \\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$。\n\n今回なら $\\dfrac{1}{2}\\lvert 5\\cdot6 - 1\\cdot2\\rvert = \\dfrac{1}{2}\\cdot 28 = 14$ で、$1$ 行で同じ答えに着きます。しかも**根号がいつも外れる**（中身が必ず何かの $2$ 乗になる）——これが成分表示のごほうびです。\n\n中心の問いへの部分回答：**長さ・角に続いて、面積まで成分だけで出た**。図形の量が、$4$ つの数の四則計算になっています。",
        },
      ],
      formulaPreview: "AB = (5,1)、AC = (2,6)、S = (1/2)√(26·40 − 16²) = (1/2)√784 = 14 ＝ (1/2)|5·6 − 1·2|",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$\\vec{a} = (7, 2)$ と $\\vec{b} = (x, 7)$ が [垂直] になるように、**$x$ の値**を定めましょう。",
      answer: -2,
      unit: "",
      unknownLabel: "$x$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "step 4・5 と比べてみよう。あのときは $2$ 本のベクトルが完全に分かっていて、内積やなす角を求めた。今度は、なす角のほうが先に決まっていて、成分に文字が残っている。分かっているものと分からないものが入れかわった——前の道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**分からないものが $\\vec{b}$ の $x$ 成分に移った**こと。step 5 では、内積の符号となす角が連動していた（内積が負なら鈍角）。角がちょうど $90°$ のとき、内積はどのあたりにいる？",
        },
        {
          layer: 3,
          text: "なす角が $90°$ のとき $\\cos 90° = 0$ なので、定義 $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ から内積は $0$ です。逆に、どちらも $\\vec{0}$ でない $2$ 本の内積が $0$ なら $\\cos\\theta = 0$ で $\\theta = 90°$。だから「垂直」と「内積 $= 0$」は言いかえの関係にあります。\n\nそこで step 4 の成分公式で内積を $x$ の式にします。\n\n$\\vec{a}\\cdot\\vec{b} = 7\\cdot x + 2\\cdot 7 = 7x + 14$。これが $0$ になるのは $7x + 14 = 0$、よって $x = -2$。\n\n確かめると $\\vec{b} = (-2, 7)$ で、$\\vec{a} = (7, 2)$ の $2$ つの成分を入れかえて片方の符号を変えた形になっています——矢印を直角に曲げるとは、成分の上ではこういうことでした。\n\n中心の問いへの部分回答：**「垂直」という図形の条件も、成分の $1$ 次方程式 $1$ 本に翻訳される**。角度を測る道具は要りません。",
        },
      ],
      formulaPreview: "垂直 ⟺ 内積 0。a・b = 7x + 2·7 = 7x + 14 = 0 → x = −2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ $\\vec{a} = (7, 2)$ と、こんどは $\\vec{c} = (x, 6)$ が**平行**（$\\vec{c} = k\\vec{a}$ となる実数 $k$ が存在する）になるように、**$x$ の値**を定めましょう。",
      answer: 21,
      unit: "",
      unknownLabel: "$x$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。相手のベクトルの形も、聞かれている文字も同じ。違うのは、$2$ 本に課された条件が垂直から平行に変わったこと。前題の道は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**条件が垂直から平行になった**こと $1$ つ。垂直は内積の言葉で言えた。平行のほうは、系列のはじめに決めた**実数倍**の言葉で言える——$\\vec{c}$ が $\\vec{a}$ の何倍かだとしたら、$y$ 成分どうしはどうなっている？",
        },
        {
          layer: 3,
          text: "$\\vec{c}$ が $\\vec{a}$ と平行とは、$\\vec{c} = k\\vec{a}$ となる実数 $k$ があること。成分で書くと\n\n$(x, 6) = k(7, 2) = (7k, 2k)$。\n\nベクトルが等しいとは成分がそろうこと（step 6 で使ったのと同じ言いかえ）なので、$y$ 成分どうしから $6 = 2k$、$k = 3$。これを $x$ 成分どうしに入れて $x = 7\\cdot3 = 21$。\n\n**垂直と平行を並べてみると**：垂直は $7x + 14 = 0$（内積を $0$ とおく $1$ 本の式）、平行は $(x, 6) = k(7, 2)$（成分ごとに $2$ 本の式と、新しい文字 $k$）。ずいぶん違う形をしていますが、平行のほうも $k$ を消せば $x\\cdot2 - 6\\cdot7 = 0$、つまり $a_1c_2 - a_2c_1 = 0$ という $1$ 本の式にまとまります。\n\nこの $a_1c_2 - a_2c_1$ は、step 7 の面積の式で根号の中にいた数そのものです。**$2$ 本が平行なら、その $2$ 本が張る三角形はつぶれて面積 $0$**——同じ $1$ つの数が「面積」と「平行かどうか」の両方を持っていました。\n\n中心の問いへの部分回答：**垂直も平行も、成分の式に翻訳される**。しかも翻訳された式どうしが、面積の式と地続きにつながっています。",
        },
      ],
      formulaPreview: "(x, 6) = k(7, 2)。y 成分から 6 = 2k で k = 3、x 成分から x = 7·3 = 21",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "最後に、基準の $2$ 本を**直交でないもの**に取りかえます。\n\n$\\vec{a} = (3, 2)$、$\\vec{b} = (1, 3)$ とします（この $2$ 本は平行でないので [1次独立] であり、平面上のどのベクトルもこの $2$ 本でただ $1$ 通りに表せます）。\n\n座標平面上の $2$ 点 A$(-4, 1)$、P$(1, 7)$ について、$\\overrightarrow{AP} = s\\vec{a} + t\\vec{b}$ と表すとき、**$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 1.2857142857142858,
      answerDisplay: "9/7",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 4 と比べてみよう。あのとき計算がすっきりしたのは、基準の $2$ 本が「長さ $1$・直交」だったから。今度の $\\vec{a}$、$\\vec{b}$ は直交してもいないし長さも $1$ ではない。それでも $\\overrightarrow{AP}$ を、この $2$ 本の枚数で言い表せるだろうか？ 斜めの $2$ 本を基準にしたときは、何を手がかりにしていた？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**基準の $2$ 本が直交でなくなった**こと。$s\\vec{a} + t\\vec{b}$ を成分で書くと、$x$ 成分も $y$ 成分も $s$ と $t$ の式になる。それを $\\overrightarrow{AP}$ の成分とそろえるには、等式はいくつ立つ？",
        },
        {
          layer: 3,
          text: "まず step 1 と同じで $\\overrightarrow{AP} = (1-(-4),\\ 7-1) = (5, 6)$。次に右辺を成分で書きます。\n\n$s\\vec{a} + t\\vec{b} = s(3, 2) + t(1, 3) = (3s + t,\\ 2s + 3t)$。\n\nベクトルが等しいとは成分がそろうこと（step 6・9 で使ったのと同じ言いかえ）なので\n\n$3s + t = 5$、$2s + 3t = 6$。\n\n第 $1$ 式から $t = 5 - 3s$。第 $2$ 式に入れて $2s + 3(5 - 3s) = 6$、$2s + 15 - 9s = 6$、$-7s = -9$、$s = \\dfrac{9}{7}$。（このとき $t = 5 - \\dfrac{27}{7} = \\dfrac{8}{7}$。$s$ と $t$ は同じ連立から一度に落ちるので、片方が出れば、もう片方はもう手の中にあります。確かめると $\\dfrac{9}{7}(3,2) + \\dfrac{8}{7}(1,3) = \\left(\\dfrac{27+8}{7},\\ \\dfrac{18+24}{7}\\right) = (5, 6)$ で、たしかに $\\overrightarrow{AP}$ に戻ります。）\n\nここで起きたことを、step 1〜9 と比べてください。基準が $\\vec{e}_1$、$\\vec{e}_2$ のときは、$\\overrightarrow{AP} = (5, 6)$ と書いた瞬間に**係数がそのまま読めていました**（$5$ 枚と $6$ 枚）。ところが基準を斜めにしたとたん、係数を出すのに連立方程式を解く仕事が戻ってきます。\n\n**やってしまいがちな誤り**：$\\vec{a}$ の $x$ 成分 $3$ と $\\overrightarrow{AP}$ の $x$ 成分 $5$ だけを見て $s = \\dfrac{5}{3}$ としてしまうこと。$\\vec{b}$ も $x$ 成分を $1$ 持っているので、$x$ 方向の $5$ は $\\vec{a}$ と $\\vec{b}$ が分け合っています。$1$ 本の式だけでは決まりません。\n\n中心の問いへの答え：**成分表示とは、基準を「長さ $1$・直交」の $2$ 本に固定した、特別な位置ベクトル**でした。固定したごほうびが、交差項が消える内積の公式であり、根号が外れる面積の公式であり、係数をそのまま読める気楽さです。基準を斜めに戻したとたん、そのごほうびは消えます。成分表示は万能の魔法ではなく、**基準を直交にそろえたときにだけ手に入る、特別に気持ちのよい顔**なのです。",
        },
      ],
      formulaPreview: "AP = (5,6)、s(3,2) + t(1,3) = (3s+t, 2s+3t)。3s+t = 5・2s+3t = 6 → s = 9/7",
    },
  ],
  derivation: `**中心の問い** ｜ 基準の矢印を「長さ $1$・直交」の $2$ 本に**固定**すると、ベクトルは座標と同じ顔の**数の組**になる——そのとき内積が「成分どうしの積の和」という、**角の情報を一度も使わない式**で出せてしまうのはなぜ？

────────

**ここまで、ベクトルを表す方法は「矢印の絵をかく」ことしかなかった**

前の系列まで、ベクトルは $\\vec{a}$、$\\vec{b}$ という名前と、紙の上の矢印で扱ってきました。長さや角を知りたいときは、$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの値を与えてもらう必要がありました。もしベクトルそのものを**数値で**表せたら、もっと直接に計算できるはずです。

そこで、ベクトル $\\vec{a}$ の始点を $xy$ 座標平面の原点に置きなおします。すると終点の座標が必ずただ $1$ つに決まる——その座標 $(a_1, a_2)$ を使って $\\vec{a} = (a_1, a_2)$ と書き表すのが [成分表示] です。$a_1$ を $x$ 成分、$a_2$ を $y$ 成分といいます。$\\vec{a} = (a_1, a_2)$ は「$x$ 軸の向きに $a_1$、$y$ 軸の向きに $a_2$ 進む」矢印のことだ、と読めば十分です。

<<M3V_COMPONENT_GRID>>

$2$ 点 A, B から $\\overrightarrow{AB}$ の成分を出すときは、**終点の座標から始点の座標を引きます**（step 1）。これは基本変形の「終点 $-$ 始点」（$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}$）を、成分の上でやっているだけです。

**成分と座標は、同じ形をしている**

ここに $1$ つ、避けられない紛らわしさがあります。$(3, 6)$ と書かれたとき、それが**点の座標**なのか**ベクトルの成分**なのかは、見た目では区別できません。前後の文脈から読むしかない——だから問題文では「点 B$(3,6)$」「ベクトル $\\vec{a} = (3,6)$」と、どちらの話かを必ず書きます。成分表示のときだけ縦に $2$ つ並べて書く流儀があるのも、この紛らわしさを避けるためです。

**なぜ「長さ $1$・直交」の $2$ 本なのか——ここが胚細胞**

成分表示は、まったく新しい発明ではありません。前の系列で、三角形に合わせて座標軸を傾け、$\\vec{a}$、$\\vec{b}$ という斜めの $2$ 本を基準にして、平面上のどの点も「$\\vec{a}$ を $s$ 枚・$\\vec{b}$ を $t$ 枚」と表しました。成分表示は、**その基準の $2$ 本を「長さ $1$・たがいに直交」に固定した特別な場合**です。

$x$ 軸の正の向きをもつ長さ $1$ のベクトルを $\\vec{e}_1$、$y$ 軸の正の向きをもつ長さ $1$ のベクトルを $\\vec{e}_2$ とすると

$$\\vec{a} = (a_1, a_2) \\quad\\text{とは}\\quad \\vec{a} = a_1\\vec{e}_1 + a_2\\vec{e}_2 \\quad\\text{のこと}$$

**ここが胚細胞**：基準を固定すると、$2$ つの性質が手に入ります——$\\lvert\\vec{e}_1\\rvert = \\lvert\\vec{e}_2\\rvert = 1$（長さ $1$）と $\\vec{e}_1\\cdot\\vec{e}_2 = 0$（直交）。この $2$ つが、これから起きるすべての気持ちよさの出どころです。

**大きさ——三平方の定理がそのまま顔を出す**

$\\vec{a} = (a_1, a_2)$ は「$x$ 方向に $a_1$、$y$ 方向に $a_2$」。この $2$ つの向きは直角に交わっているので、$a_1$ と $a_2$ を直角をはさむ $2$ 辺とする直角三角形をつくれば、**斜辺がちょうど $\\vec{a}$** です。中学の [三平方の定理] から

$$\\lvert\\vec{a}\\rvert = \\sqrt{a_1^2 + a_2^2}$$

これが [ベクトルの大きさ] の成分による公式。step 2 で長さを出し、step 3 では同じ式を逆から読んで成分を出しました。ここでも「直交」が効いています——基準が斜めなら、三平方はそのままでは当たりません。

**単位ベクトル**：長さが $1$ のベクトルを単位ベクトルといいます。$\\vec{e}_1$、$\\vec{e}_2$ はその代表で、どんな $\\vec{a}$（$\\vec{a} \\ne \\vec{0}$）も $\\dfrac{1}{\\lvert\\vec{a}\\rvert}\\vec{a}$ とすれば長さ $1$ になり、**向きだけを取り出した矢印**が手に入ります。「長さ $1$」に決めておくと、係数がそのまま「何枚ぶん」の意味になる——だから基準には単位ベクトルを選ぶのです。

**内積——角の情報が、式から消える**

いよいよ中心の問いです。内積の定義は $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ で、$\\cos\\theta$ という角の情報が入っています。ところが成分で書くと、角を知らないまま計算できてしまう。なぜでしょうか。

$\\vec{a} = a_1\\vec{e}_1 + a_2\\vec{e}_2$、$\\vec{b} = b_1\\vec{e}_1 + b_2\\vec{e}_2$ と書いて、内積の分配法則で展開します（内積には $\\vec{p}\\cdot(\\vec{q}+\\vec{r}) = \\vec{p}\\cdot\\vec{q} + \\vec{p}\\cdot\\vec{r}$ が成り立つことを、前の系列で「影の足し算」として確かめました）。

$$\\vec{a}\\cdot\\vec{b} = a_1b_1\\lvert\\vec{e}_1\\rvert^2 + a_1b_2\\,\\vec{e}_1\\cdot\\vec{e}_2 + a_2b_1\\,\\vec{e}_2\\cdot\\vec{e}_1 + a_2b_2\\lvert\\vec{e}_2\\rvert^2$$

ここで $\\lvert\\vec{e}_1\\rvert = \\lvert\\vec{e}_2\\rvert = 1$ なので両端の項は $a_1b_1$ と $a_2b_2$ になり、$\\vec{e}_1\\cdot\\vec{e}_2 = 0$ なので**まん中の交差した $2$ 項は丸ごと消えます**。残るのは

$$\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2$$

「$x$ 成分どうし、$y$ 成分どうしをかけて足す」だけ。角が消えたように見えますが、消えたのではありません——**基準の $2$ 本を直交にそろえた時点で、角の情報は「交差項が $0$」という形で式の中に畳み込まれた**のです。もし基準が斜め（$\\vec{e}_1\\cdot\\vec{e}_2 \\ne 0$）なら交差項は残り、その値がそのまま「基準どうしの角」を式の中に持ち込みます。中心の問いの答えは、この $1$ 行にあります。

**長さ・角・面積・垂直・平行——全部が四則計算になる**

いったん内積が成分で出せると、前の系列でつくった道具がすべて成分に乗り換えます。

- **角**：$\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert}$ の右辺が全部成分で出るので、角も成分から出る（step 5）
- **面積**：$S = \\dfrac{1}{2}\\sqrt{\\lvert\\vec{a}\\rvert^2\\lvert\\vec{b}\\rvert^2 - (\\vec{a}\\cdot\\vec{b})^2}$ に成分を入れて展開すると、根号の中は $(a_1b_2 - a_2b_1)^2$ にまとまり、$S = \\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$。**根号がいつも外れる**（step 7）
- **垂直**：$\\vec{a}\\cdot\\vec{b} = 0$、成分では $a_1b_1 + a_2b_2 = 0$（step 8）
- **平行**：$\\vec{b} = k\\vec{a}$、$k$ を消せば $a_1b_2 - a_2b_1 = 0$（step 9）

面積の式と平行の式に、同じ $a_1b_2 - a_2b_1$ が顔を出しているのは偶然ではありません。**$2$ 本が平行なら、その $2$ 本が張る平行四辺形はつぶれて面積 $0$**。$1$ つの数が、面積と平行判定の両方を持っています。

**そして、基準を斜めに戻すと**

最後の step で、基準を直交でない $\\vec{a}$、$\\vec{b}$ に取りかえました。同じ「$s$ 枚・$t$ 枚」を求めるのに、こんどは連立方程式を解かなければなりません。直交する基準のときは、$(5, 6)$ と書いた瞬間に係数が読めていたのに——です。

<<M3V_CUSTOM_AXES>>

成分表示の気楽さは、**基準を直交にそろえたことへのごほうび**でした。それが分かると、$\\vec{e}_1$、$\\vec{e}_2$ という $2$ 本を選んだことの重みが見えてきます。

**Step の道筋**

- **Step 1**：$2$ 点から $\\overrightarrow{AB}$ の $x$ 成分。終点 $-$ 始点。成分と座標は同じ形をしている
- **Step 2**：成分から大きさ。中学の三平方の定理がそのまま当たる
- **Step 3**：同じ式を逆から読んで、大きさと $x$ 成分から $y$ 成分を出す
- **Step 4**：成分で内積。$\\vec{e}_1$、$\\vec{e}_2$ に分けて分配すると交差項が消える。角を使った定義と同じ値になることも確かめる
- **Step 5**：$3$ 点から角。内積から $\\cos\\theta$ を取り出す。負の内積は鈍角の合図
- **Step 6（転換点）**：「平行四辺形である」という図形の条件が、成分の等式に翻訳される
- **Step 7**：面積。成分なら根号が外れる
- **Step 8**：垂直になる $x$。垂直は内積 $0$ の $1$ 次方程式に
- **Step 9**：平行になる $x$。平行は実数倍の式に。面積の式と再会する
- **Step 10（山場）**：基準を斜めに戻すと、係数は連立を解かないと出ない

────────

**もっと深く** — 固定したから、気楽になった

**忘れても導ける**：成分の公式を丸暗記する必要はありません。覚えておくのは**$\\vec{a} = (a_1, a_2)$ とは $\\vec{a} = a_1\\vec{e}_1 + a_2\\vec{e}_2$ のこと**という $1$ 行だけ。あとはその場で生やせます。内積なら、$2$ 本をこの形に書いてふつうの文字式のように展開し、$\\lvert\\vec{e}_1\\rvert = \\lvert\\vec{e}_2\\rvert = 1$ と $\\vec{e}_1\\cdot\\vec{e}_2 = 0$ を入れれば $a_1b_1 + a_2b_2$ が $30$ 秒で出ます。大きさなら、$x$ 方向と $y$ 方向が直角だと思い出せば三平方。面積の $\\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ も、根号の式に成分を入れて展開すれば出ます。**公式を $4$ つ覚えるのではなく、$1$ 行から $4$ つ生やす**——このほうが、あとで空間（$3$ 成分）に行くときも同じ手つきで済みます。

**やってしまいがちな誤り $1$：$\\overrightarrow{AB}$ を「始点 $-$ 終点」で引く**。$\\overrightarrow{AB}$ は A から B へ向かう矢印なので、成分は「B の座標から A の座標を引く」。逆に引くと $\\overrightarrow{BA}$、つまり逆ベクトルが出てしまいます。「A から B へどちらへ動いたか」と口に出して確かめる癖をつけると迷いません。

**やってしまいがちな誤り $2$：成分と座標を混同する**。$(3, 6)$ が点なのか矢印なのかで、意味はまったく違います。点は場所、成分は「どちらへ・どれだけ」。$\\overrightarrow{OA}$（原点を始点とするベクトル）の成分だけは、たまたま点 A の座標と一致します——一致するのは原点を始点にしたときだけだ、と覚えておくと混乱しません。

**やってしまいがちな誤り $3$：平行四辺形 ABCD で $\\overrightarrow{AB} = \\overrightarrow{CD}$ とする**。頂点を A → B → C → D と一周する向きで考えると、辺 AB と辺 CD をたどる向きは反対です。$\\overrightarrow{AB}$ と等しいのは $\\overrightarrow{DC}$ のほう。

**この先の景色**：次の系列では、この成分表示を使って**直線**を式にします——「ここから」（始点ベクトル）と「この向きに」（方向ベクトル）に実数 $t$ を $1$ つ添えるだけで、直線上のすべての点が $\\overrightarrow{OP} = \\overrightarrow{OA} + t\\vec{d}$ と書けてしまう。数Ⅱ で習った直線の方程式 $y = mx + n$ と、同じ直線の別の顔です。さらに進むと、成分が $3$ つになるだけで空間の点も同じ手つきで計量できます（$\\lvert\\vec{a}\\rvert = \\sqrt{a_1^2 + a_2^2 + a_3^2}$、$\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3$——導き方は今日とまったく同じで、基準が $\\vec{e}_1$、$\\vec{e}_2$、$\\vec{e}_3$ の $3$ 本になるだけ）。大学では、この「長さ $1$・たがいに直交」な基準の組を正規直交基底と呼び、基準を取りかえる操作そのものが行列になります。今日の山場で味わった「基準を斜めに戻すと連立が要る」という手ざわりが、そこでは基底の取りかえの計算として戻ってきます。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（成分表示 $\\to$ 成分による大きさ $\\to$ 成分による内積 $\\to$ 平行四辺形の頂点 $\\to$ 角と面積）と、
  「成分表示は座標と同じ形をしているので、見た目だけでは区別できない」「$\\theta$ についての情報が何もなくても内積が簡単に計算できてしまうのは少し驚き」という着眼、および $\\vec{e}_1$、$\\vec{e}_2$ に分けて分配する導出の筋を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ、角の情報を一度も使わない式で内積が出せてしまうのか」——**基準の $2$ 本を「長さ $1$・直交」に固定したから**です。$\\vec{a} = a_1\\vec{e}_1 + a_2\\vec{e}_2$ と書いて分配すると、$\\lvert\\vec{e}_1\\rvert = \\lvert\\vec{e}_2\\rvert = 1$ が両端の項をきれいにし、$\\vec{e}_1\\cdot\\vec{e}_2 = 0$ が交差項を丸ごと消します。角の情報が消えたのではなく、**基準を直交にそろえた瞬間に、角の情報は「交差項が $0$」という形で式の中へ畳み込まれた**のです。

だから成分表示は、ベクトルの新しい種類ではなく、**基準の選び方を $1$ つに決めた特別な顔**でした。固定したごほうびとして、長さは三平方だけで、角は内積だけで、面積は根号の外れる式で、垂直と平行は $1$ 本の方程式で出る——図形の問題が、$4$ つの数の四則計算になります。そして基準を斜めに戻したとたん、そのごほうびは消えて連立方程式が戻ってくる（step 10）。

**図形を、選んだ基準の上の数の組へ。** 次の系列では、この数の組で直線そのものを表します。
`,
};

/** M3V9: 直線のベクトル方程式と垂線の足（数Ⅲ・C 第9章・系列9）。
 *  背骨は docs/math3c_vector_design.md「系列9」。
 *
 *  直線は「ここから（始点ベクトル）」と「この向きに（方向ベクトル）」の 2 つで決まる。
 *  実数 t を 1 つ添えた OP = OA + t d が、直線上のすべての点をちょうど 1 度ずつ通る。
 *  質的変化 step6 は「垂直」という図形の関係が t の 1 次方程式に翻訳される瞬間。
 *  山場 step10 は |KP|^2 の最小（2 次関数）と垂線の足（内積 0）が同じ t に着くこと。
 *
 *  値の設計（すべてオリジナル・原典 練習問題14 の A(2,1)・d=(2,3)・B(−2,0)・
 *  t=−11/13・H(4/13,−20/13) は使わない）：
 *    直線 l ＝ 点 A(−1, 4) を通り d = (4, 3) に平行（|d|^2 = 25）
 *    直線 m ＝ 点 C(−4, 5) を通り f = (3, 1) に平行
 *    直線外の点 B(3, 2)（step6〜8）・K(0, −4)（step10・別の定点に置き換えて step6 がタダにならないようにした）
 *  座標・|BH|^2 はすべて有理数（無理数を出さない）。 */
export const M3V_LINE_SERIES: LearnerSeries = {
  id: "math3_vec_line_01",
  title: "直線のベクトル方程式と垂線の足",
  subtitle:
    "数Ⅲ・C ベクトルより — 直線は「ここから」と「この向きに」の $2$ つで決まる。実数 $t$ を $1$ つ添えた式で直線上の点をたどる入口から、へだたりが最小になる点と垂線の足が同じ $t$ に着く山場まで $10$ 問。",
  patternId: "M3V9",
  unit: "math_3",
  revelationLabel:
    "**$1$ つの文字 $t$ が、直線という $1$ 次元を走りきる**。直線上の点は「A から $\\vec{d}$ の何倍か」でただ $1$ 通りに名前がつき、「垂直」も「いちばん近い」も、その $t$ についての式 $1$ 本になる",
  drivingQuestion:
    "直線は「**ここから**」と「**この向きに**」の $2$ つで決まる——始点ベクトルと方向ベクトルに実数 $t$ を $1$ つ添えるだけで、なぜ直線上の**すべての点**が書けてしまうのか？ そして「垂線の足」が、たった **$1$ 本の式**で決まるのはなぜ？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "座標平面上に、点 A$(-1,\\ 4)$ を通り、$\\vec{d} = (4,\\ 3)$ に平行な直線 $l$ があります（$(4,\\ 3)$ は点の座標ではなく、ベクトルの成分です）。この $\\vec{d}$ を $l$ の**方向ベクトル**といいます。\n\n原点を O とすると、$l$ 上の点 P は、実数 $t$ を使って\n\n$\\overrightarrow{OP} = \\overrightarrow{OA} + t\\vec{d}$\n\nと表せます。\n\n$t = 3$ のときの点 P の **$x$ 座標**を求めましょう。",
      answer: 11,
      unit: "",
      unknownLabel: "P の $x$ 座標",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "A から出発して、$\\vec{d}$ の向きへ $\\vec{d}$ の $3$ つぶん進んだところが、いまの P。$\\vec{d}$ を $3$ 倍したベクトルは、成分で見るとどんな矢印になるだろう？ そして、A から矢印のぶんだけ動いた点の座標は、どうやって言えるだろうか？",
        },
        {
          layer: 2,
          text: "見るところは $1$ つだけ——**$x$ 成分**。$\\overrightarrow{OA}$ の $x$ 成分に、$t\\vec{d}$ の $x$ 成分を足せば P の $x$ 座標になります。$y$ のほうは、いまは聞かれていません。",
        },
        {
          layer: 3,
          text: "ベクトルの実数倍は成分をそれぞれ何倍かすることなので $t\\vec{d} = 3(4,\\ 3) = (12,\\ 9)$。これを $\\overrightarrow{OA} = (-1,\\ 4)$ に足して $\\overrightarrow{OP} = (-1,\\ 4) + (12,\\ 9) = (11,\\ 13)$。よって P の $x$ 座標は $11$ です。\n\nここで起きていることを $1$ 行で言うと——**A という「ここから」に、$\\vec{d}$ という「この向きに」を何倍かして足した**。この $2$ つが決まれば直線は $1$ 本に決まります（[共線条件] で見た「始点ベクトル ＋ 方向ベクトル」の形です）。中心の問いへの最初の部分回答：**直線上の点には、A から見て「$\\vec{d}$ の何倍か」という $1$ つの数で名前がつく**。その数が $t$ です。",
        },
      ],
      formulaPreview: "OP = OA + 3d = (−1, 4) + (12, 9) = (11, 13)　x 座標は 11",
      figureMarker: "<<M3V_LINE_PARAM>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ直線 $l$（点 A$(-1,\\ 4)$ を通り $\\vec{d} = (4,\\ 3)$ に平行）の上に、**$x$ 座標が $-3$** である点 P があります。\n\nこのときの **$t$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -1 / 2,
      answerDisplay: "−1/2",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。直線も方向ベクトルも同じ。違うのは、分かっているものと求めるものが入れかわっていること。前題でたどった道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**$t$ のほうが分からず、$x$ 座標が先に与えられている**こと。前題では $t$ に数を入れて $x$ 座標を出しました。今度は $t$ を文字のまま残しておくと、何が見えるでしょう。",
        },
        {
          layer: 3,
          text: "前題では $t = 3$ を代入してから計算しました。今度は $t$ を文字のままにしておきます。$t\\vec{d} = (4t,\\ 3t)$ なので\n\n$\\overrightarrow{OP} = (-1,\\ 4) + (4t,\\ 3t) = (-1 + 4t,\\ \\ 4 + 3t)$\n\nと、$l$ 上の点が $t$ の式で書けます。この $x$ 成分が $-3$ に等しいので $-1 + 4t = -3$、$4t = -2$、$t = -\\dfrac{1}{2}$。\n\n$t$ が負なのは、P が A から $\\vec{d}$ とは**反対の向き**にあるということです。中心の問いへの部分回答：**$t$ は直線につけた目盛りで、直線上の点と実数 $t$ はちょうど $1$ 対 $1$ に対応する**。だから座標のほうから $t$ を逆にたどることもできます。",
        },
      ],
      formulaPreview: "l 上の点は (−1 + 4t, 4 + 3t)。x 成分より −1 + 4t = −3、t = −1/2",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ直線 $l$ の、同じ点 P（$x$ 座標が $-3$）について、こんどは **$y$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 2,
      answerDisplay: "5/2",
      unit: "",
      unknownLabel: "P の $y$ 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。直線も点 P も同じ。求めるものが $t$ から座標に変わっただけ。前題で手に入れたものは、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**見る成分が $y$ のほうになった**こと。$l$ 上の点を $t$ の式で書いたとき、$y$ 成分はどう書けていましたか。",
        },
        {
          layer: 3,
          text: "前題の解式で、$l$ 上の点は $(-1 + 4t,\\ \\ 4 + 3t)$ と書けていました。$y$ 成分は $4 + 3t$ です。前題で $t = -\\dfrac{1}{2}$ と分かっているので、代入して\n\n$4 + 3\\left(-\\dfrac{1}{2}\\right) = 4 - \\dfrac{3}{2} = \\dfrac{5}{2}$\n\nよって P$\\left(-3,\\ \\dfrac{5}{2}\\right)$。\n\n**$x$ から $t$ へ、$t$ から $y$ へ**——$x$ と $y$ を直接つながずに、$t$ をいったん経由しました。$x$ と $y$ が別々に $t$ の式で書いてあるからこそ、片方から $t$ を出して、もう片方に渡せます。この書き方は数Ⅱ の [媒介変数表示] とまったく同じ構造です。中心の問いへの部分回答：**$t$ は $x$ と $y$ の間に立つ仲立ち**。$1$ つの文字が直線という $1$ 次元ぶんを引き受けています。",
        },
      ],
      formulaPreview: "y 成分は 4 + 3t。t = −1/2 を入れて 4 − 3/2 = 5/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "同じ直線 $l$ が **$x$ 軸と交わる点**の **$x$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: -19 / 3,
      answerDisplay: "−19/3",
      unit: "",
      unknownLabel: "交点の $x$ 座標",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは「$x$ 座標が $-3$」のように、点が数で名指しされていた。今度の点を決めているのは「$x$ 軸の上にいる」という**条件**だけ。条件のほうを、$t$ についてのことばに言い直せないだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**点を決めているのが座標の値ではなく、位置についての条件**であること。点が $x$ 軸の上にあるとは、$2$ つの座標のうち、どちらがどうなっていることでしょう。",
        },
        {
          layer: 3,
          text: "$x$ 軸上の点は $y$ 座標が $0$ です。$l$ 上の点は $(-1 + 4t,\\ \\ 4 + 3t)$ でしたから、$y$ 成分を $0$ とおいて\n\n$4 + 3t = 0$、$t = -\\dfrac{4}{3}$\n\nこの $t$ を $x$ 成分に入れて $-1 + 4\\left(-\\dfrac{4}{3}\\right) = -1 - \\dfrac{16}{3} = -\\dfrac{19}{3}$。\n\n**同じ直線を、数Ⅱ の式で書くと**：$x = -1 + 4t$、$y = 4 + 3t$ から $t$ を消してみます。$x + 1 = 4t$、$y - 4 = 3t$ なので $3(x+1) = 12t = 4(y-4)$、整理して $3x - 4y + 19 = 0$。この式に $y = 0$ を入れても $3x = -19$、$x = -\\dfrac{19}{3}$ で、同じ答えに着きます。**$t$ を使う書き方と $x$、$y$ だけの書き方は、同じ $1$ 本の直線の $2$ つの顔**です。中心の問いへの部分回答：**「$x$ 軸上」のような図形の条件も、$t$ についての式 $1$ 本になる**。",
        },
      ],
      formulaPreview: "y = 4 + 3t = 0 より t = −4/3。x = −1 + 4(−4/3) = −1 − 16/3 = −19/3",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "こんどは方向ベクトルのほうが分かりません。\n\n点 A$(-1,\\ 4)$ を通り、$\\vec{e} = (2,\\ m)$ に平行な直線を $l'$ とします（$x$ 成分が $2$ であることは決まっていて、$y$ 成分 $m$ だけが分かりません）。\n\n直線 $l'$ が点 E$(3,\\ -4)$ を通るような **$m$ の値**を求めましょう。",
      answer: -4,
      unit: "",
      unknownLabel: "$m$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは方向ベクトルが分かっていて、直線の上の点を探していた。今度は**直線が通る点のほうが分かっていて、方向ベクトルを探す**。向きが入れかわっている——前の道を逆からたどれないだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**分からないものが、方向ベクトルの側にある**こと。E が $l'$ の上にあるということは、A から E へ向かう矢印と $\\vec{e}$ の間に、どんな関係があるということでしょう。",
        },
        {
          layer: 3,
          text: "E が $l'$ 上にあるとは、ある実数 $t$ について $\\overrightarrow{OE} = \\overrightarrow{OA} + t\\vec{e}$ となること、つまり $\\overrightarrow{AE} = t\\vec{e}$ ということです。成分で $\\overrightarrow{AE} = (3,\\ -4) - (-1,\\ 4) = (4,\\ -8)$。よって $(4,\\ -8) = t(2,\\ m)$。$x$ 成分から $4 = 2t$、$t = 2$。この $t$ を $y$ 成分に入れて $-8 = 2m$、$m = -4$。\n\n**やってしまいがちな誤り**：方向ベクトルを $1$ 通りだと思うこと。$\\vec{e} = (2,\\ -4)$ でも $(1,\\ -2)$ でも $(-3,\\ 6)$ でも、指している向きは同じで、表す直線も同じ $l'$ です——**実数倍はどれも方向ベクトル**。だから「方向ベクトルを求めよ」だけでは答えが $1$ つに決まりません。この問題が $x$ 成分を $2$ と決めているのは、そのためです。同じ理由で、**$t$ の値も方向ベクトルの取り方で変わります**（$\\vec{e}$ を $(1,\\ -2)$ にとれば同じ E に着く $t$ は $4$）。中心の問いへの部分回答：**直線を決めるのは「ここから」と「この向きに」の $2$ つだけ。向きは長さを問わない**——だから同じ直線に、方向ベクトルは何通りもあります。",
        },
      ],
      formulaPreview: "AE = (4, −8) = t(2, m)。x 成分より t = 2、y 成分より −8 = 2m、m = −4",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "直線 $l$（点 A$(-1,\\ 4)$ を通り $\\vec{d} = (4,\\ 3)$ に平行）に戻ります。\n\n$l$ 上にない点 B$(3,\\ 2)$ から $l$ に**垂線**を下ろし、その足を H とします（図）。H は $l$ 上の点なので、実数 $t$ を使って $\\overrightarrow{OH} = \\overrightarrow{OA} + t\\vec{d}$ と書けます。\n\nこの **$t$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 2 / 5,
      answerDisplay: "2/5",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで直線上の点を決めていた条件は、「$x$ 座標が $-3$」「$x$ 軸の上」のように、**その点だけを見て言えること**だった。今度の条件には、直線の外にいる点 B が関わっている。B と H を結ぶ矢印と、直線の向きとの間には、どんな関係があるだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**H を決めている条件が「垂直」になった**こと。垂直という関係は、これまでの系列ですでに数の式に翻訳できるようになっています。ここでは、何と何が [垂直] なのでしょう。",
        },
        {
          layer: 3,
          text: "H は $l$ 上の点なので $\\overrightarrow{OH} = (-1 + 4t,\\ \\ 4 + 3t)$。ここから B を引いて\n\n$\\overrightarrow{BH} = \\overrightarrow{OH} - \\overrightarrow{OB} = (-1 + 4t - 3,\\ \\ 4 + 3t - 2) = (4t - 4,\\ \\ 3t + 2)$\n\nBH が $l$ に垂直だということは、$\\overrightarrow{BH}$ が $l$ の方向ベクトル $\\vec{d}$ に垂直だということ。$2$ つのベクトルが垂直 ⟺ [内積] が $0$ なので $\\overrightarrow{BH}\\cdot\\vec{d} = 0$、すなわち\n\n$(4t - 4)\\cdot 4 + (3t + 2)\\cdot 3 = 0$、$16t - 16 + 9t + 6 = 0$、$25t - 10 = 0$、$t = \\dfrac{2}{5}$\n\n**ここが転換点です**。「垂線の足」は、図の上では定規を当てて探すものでした。それが、$t$ についての **$1$ 次方程式 $1$ 本**になった——$1$ 次方程式の解はただ $1$ つなので、垂線の足がただ $1$ つ決まることまで式が言っています。中心の問いへの部分回答：**「垂直」という図形の関係が、内積を通って $t$ の $1$ 次方程式になる**。直線を $t$ で書いておいたおかげです。",
        },
      ],
      formulaPreview: "BH = (4t − 4, 3t + 2)。BH・d = (4t−4)·4 + (3t+2)·3 = 25t − 10 = 0 より t = 2/5",
      figureMarker: "<<M3V_FOOT>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "同じ垂線の足 H について、**$x$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: 3 / 5,
      answerDisplay: "3/5",
      unit: "",
      unknownLabel: "H の $x$ 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。点 H は同じ。求めるものが $t$ から座標に変わっただけ。step 2 から step 3 へ進んだときと、同じ道が通っていないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**答える相手が $t$ ではなく座標**になったこと。H が $l$ 上の点だと書いた式の、どちらの成分を見ればよいでしょう。",
        },
        {
          layer: 3,
          text: "step 3 とまったく同じ手つきです。$l$ 上の点は $(-1 + 4t,\\ \\ 4 + 3t)$ で、$x$ 成分は $-1 + 4t$。前題で $t = \\dfrac{2}{5}$ でしたから\n\n$-1 + 4\\cdot\\dfrac{2}{5} = -1 + \\dfrac{8}{5} = \\dfrac{3}{5}$\n\nよって H の $x$ 座標は $\\dfrac{3}{5}$。同じように $y$ 成分は $4 + 3\\cdot\\dfrac{2}{5} = \\dfrac{26}{5}$ なので、H$\\left(\\dfrac{3}{5},\\ \\dfrac{26}{5}\\right)$ です。\n\n$t$ を出す仕事（垂直の式を解く）と、座標に直す仕事（$t$ を成分に入れる）は別物で、**$t$ を先に出しておけば座標はいつでも取り出せます**。中心の問いへの部分回答：**$t$ さえ決まれば、点は座標として手に入る**——直線上の点の「本名」は $t$ のほうだと言ってもよいくらいです。",
        },
      ],
      formulaPreview: "x 成分は −1 + 4t。t = 2/5 を入れて −1 + 8/5 = 3/5",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "点 B$(3,\\ 2)$ と直線 $l$ の距離は、線分 BH の長さです。\n\n$\\lvert\\overrightarrow{BH}\\rvert^{2}$ の値を求めましょう。",
      answer: 16,
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{BH}\\rvert^{2}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。H の居場所はもう分かっている。今度きかれているのは、B から H までの**へだたり**。前題までに手に入れた材料だけで、へだたりまで言えるだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**求めるものが位置ではなく長さ**になったこと。$\\overrightarrow{BH}$ の成分は、step 6 で $t$ の式のまま書いてありました。$t$ が決まったいま、その成分はどんな数の組になるでしょう。",
        },
        {
          layer: 3,
          text: "step 6 で $\\overrightarrow{BH} = (4t - 4,\\ \\ 3t + 2)$ と書いてありました。$t = \\dfrac{2}{5}$ を入れると\n\n$\\overrightarrow{BH} = \\left(\\dfrac{8}{5} - 4,\\ \\ \\dfrac{6}{5} + 2\\right) = \\left(-\\dfrac{12}{5},\\ \\ \\dfrac{16}{5}\\right)$\n\n大きさの $2$ 乗は成分の $2$ 乗の和なので\n\n$\\lvert\\overrightarrow{BH}\\rvert^{2} = \\dfrac{144}{25} + \\dfrac{256}{25} = \\dfrac{400}{25} = 16$\n\n**同じ値へ、もう $1$ 本の道**：step 4 で、この直線は $3x - 4y + 19 = 0$ とも書けると見ました。数Ⅱ で習った点と直線の距離の公式に B$(3,\\ 2)$ を入れると\n\n$\\dfrac{\\lvert 3\\cdot 3 - 4\\cdot 2 + 19\\rvert}{\\sqrt{3^{2} + (-4)^{2}}} = \\dfrac{20}{5} = 4$\n\n$2$ 乗すれば $16$——ベクトルで出した値とぴったり一致します。片方は垂線の足を実際に求めてから測る道、もう片方は足を求めずに距離だけを出す道。**同じ事実に $2$ 本の道が通じている**ので、たがいに確かめ算になります。中心の問いへの部分回答：**足の場所（$t$）が分かれば、へだたりも計算で出る**。大きさは $2$ 乗のまま扱うと、根号を作らずに済みます。",
        },
      ],
      formulaPreview: "BH = (−12/5, 16/5)。|BH|² = 144/25 + 256/25 = 400/25 = 16",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "もう $1$ 本、直線を用意します。点 C$(-4,\\ 5)$ を通り $\\vec{f} = (3,\\ 1)$ に平行な直線を $m$ とし、$m$ 上の点 Q を、実数 $s$ を使って $\\overrightarrow{OQ} = \\overrightarrow{OC} + s\\vec{f}$ と表します。\n\n直線 $l$ と直線 $m$ は $1$ 点で交わります。その交点を $l$ のほうの式で表したときの、**$t$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 6 / 5,
      answerDisplay: "6/5",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで直線は $1$ 本だけで、点を決めていたのは座標の値や垂直という条件だった。今度は、**同じ $1$ つの点が $2$ 本の直線の上にいる**。$2$ 通りの書き方をした同じ点について、何が言えるだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**文字が $t$ と $s$ の $2$ つになった**こと。交点は $l$ 上の点でもあり、$m$ 上の点でもあります。同じ点なら、$x$ 座標どうし・$y$ 座標どうしはどうなっているでしょう。",
        },
        {
          layer: 3,
          text: "$l$ 上の点は $(-1 + 4t,\\ \\ 4 + 3t)$、$m$ 上の点は $(-4 + 3s,\\ \\ 5 + s)$ と書けます。交点はどちらの書き方でも同じ点ですから、$x$ 座標どうし・$y$ 座標どうしが等しく\n\n$-1 + 4t = -4 + 3s$ …①　　$4 + 3t = 5 + s$ …②\n\n②から $s = 3t - 1$。①に入れて $-1 + 4t = -4 + 3(3t - 1) = 9t - 7$、$6 = 5t$、$t = \\dfrac{6}{5}$。\n\n（このとき $s = 3\\cdot\\dfrac{6}{5} - 1 = \\dfrac{13}{5}$ で、交点は $\\left(\\dfrac{19}{5},\\ \\dfrac{38}{5}\\right)$。$m$ の式に $s = \\dfrac{13}{5}$ を入れても同じ点になり、計算が合っていることが確かめられます。）\n\n**なぜ交点が $1$ つだと言えるのか**：$\\vec{d} = (4,\\ 3)$ と $\\vec{f} = (3,\\ 1)$ は平行ではありません（$\\vec{f} = k\\vec{d}$ となる実数 $k$ は無い）。方向が違う $2$ 直線は、ちょうど $1$ 点で交わります。中心の問いへの部分回答：**それぞれの直線が自分の文字（$t$ と $s$）を $1$ つずつ持ち、$2$ 本の式で $2$ つの文字が決まる**。図で交点を読み取らなくても、連立方程式が場所を教えてくれます。",
        },
      ],
      formulaPreview: "−1 + 4t = −4 + 3s、4 + 3t = 5 + s。s = 3t − 1 を代入して −1 + 4t = 9t − 7、t = 6/5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "直線 $l$（点 A$(-1,\\ 4)$ を通り $\\vec{d} = (4,\\ 3)$ に平行）の上を、点 P が動きます。$\\overrightarrow{OP} = \\overrightarrow{OA} + t\\vec{d}$ で、$t$ が実数全体を動くとき、P は $l$ の上のすべての点を通ります。\n\n定点 K$(0,\\ -4)$ について、$\\lvert\\overrightarrow{KP}\\rvert^{2}$ が**最小**になる **$t$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -4 / 5,
      answerDisplay: "−4/5",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで直線上の点を決めていたのは、「$x$ 軸の上」「垂直」「$2$ 直線の上」という**条件**だった。今度は条件ではなく、**K といちばん近づくところ**を探す。P が $t$ とともに動くとき、K とのへだたりはどんなふうに変わっていくだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**点を決めるのが方程式ではなく「いちばん小さい」になった**こと。K から P への矢印の成分を $t$ の式で書いてみると、へだたりの $2$ 乗は $t$ について何次の式になるでしょう。",
        },
        {
          layer: 3,
          text: "step 6 と同じように、まず $t$ の式で書きます。$\\overrightarrow{KP} = \\overrightarrow{OP} - \\overrightarrow{OK} = (-1 + 4t - 0,\\ \\ 4 + 3t + 4) = (4t - 1,\\ \\ 3t + 8)$。大きさの $2$ 乗は\n\n$\\lvert\\overrightarrow{KP}\\rvert^{2} = (4t - 1)^{2} + (3t + 8)^{2} = 16t^{2} - 8t + 1 + 9t^{2} + 48t + 64 = 25t^{2} + 40t + 65$\n\n$t$ の $2$ 次式で、$t^{2}$ の係数 $25$ が正なので下に凸。[平方完成] して $25\\left(t + \\dfrac{4}{5}\\right)^{2} + 49$。よって $t = -\\dfrac{4}{5}$ のとき最小で、最小値は $49$（つまり最短のへだたりは $7$）です。\n\n**同じ $t$ へ、もう $1$ 本の道**：K から $l$ に垂線を下ろした足を、step 6 と同じやり方で出してみます。$\\overrightarrow{KP}\\cdot\\vec{d} = (4t - 1)\\cdot 4 + (3t + 8)\\cdot 3 = 16t - 4 + 9t + 24 = 25t + 20 = 0$ から $t = -\\dfrac{4}{5}$——**$2$ 次関数の最小と、垂線の足が、同じ $t$ に着きました**。step 8 で使った点と直線の距離の公式でも $\\dfrac{\\lvert 3\\cdot 0 - 4\\cdot(-4) + 19\\rvert}{5} = \\dfrac{35}{5} = 7$ で、$2$ 乗すれば $49$。$3$ 本の道が $1$ 点に集まります。\n\n**なぜ一致するのか**：$\\lvert\\overrightarrow{KP}\\rvert^{2}$ を $t$ で展開すると、$t$ の $1$ 次の項の係数は $2\\,\\overrightarrow{KA}\\cdot\\vec{d}$、$2$ 次の項の係数は $\\lvert\\vec{d}\\rvert^{2}$ になります。この $2$ 次式の頂点を出す計算と、$\\overrightarrow{KP}\\cdot\\vec{d} = 0$ を解く計算は、**同じ $1$ 次方程式**なのです（微分で言えば、$2$ 乗した距離の $t$ についての変化率がちょうど $2\\,\\overrightarrow{KP}\\cdot\\vec{d}$）。「最短距離は垂線」という小学校以来の事実が、ここで式として証明されました。\n\n中心の問いへの答え：**直線を「始点 ＋ $t$ × 方向」で書いた瞬間、直線上の点は実数 $t$ ひとつで名前がつき、直線にまつわる問いはすべて $t$ の式になる**。垂直も、$2$ 直線の交わりも、最短も——形は違って見えても、たどり着くのは $t$ についての方程式 $1$ 本でした。",
        },
      ],
      formulaPreview:
        "|KP|² = (4t − 1)² + (3t + 8)² = 25t² + 40t + 65 = 25(t + 4/5)² + 49。最小は t = −4/5（最小値 49）",
    },
  ],
  derivation: `**中心の問い** ｜ 直線は「**ここから**」と「**この向きに**」の $2$ つで決まる——始点ベクトルと方向ベクトルに実数 $t$ を $1$ つ添えるだけで、なぜ直線上の**すべての点**が書けてしまうのか？ そして「垂線の足」が、たった **$1$ 本の式**で決まるのはなぜ？

────────

**直線を決めるのに要るのは、$2$ つだけ**

まっすぐな道を人に伝えるとき、要るのは $2$ つです。**どこから始まるか**と、**どちらを向いているか**。この $2$ つが決まれば道は $1$ 本に決まり、逆にどちらかが欠ければ決まりません。

ベクトルのことばにすると、「どこから」は通る点 A を指す $\\overrightarrow{OA}$（**始点ベクトル**）、「どちらを向いているか」は向きを表す $\\vec{d}$（**方向ベクトル**）。直線上の点 P は、A から $\\vec{d}$ の何倍かだけ進んだところにあるので、実数 $t$ を使って

$$\\overrightarrow{OP} = \\overrightarrow{OA} + t\\vec{d}$$

と書けます。これを直線の**ベクトル方程式**といいます。$t$ を大きくすれば P は $\\vec{d}$ の向きへ遠ざかり、負にすれば反対側へ行き、$t = 0$ でちょうど A。**$t$ が実数全体を動けば、P は直線全体をもれなく、重なりなく走ります**。

**ここが胚細胞**：$1$ つの文字 $t$ が、直線という $1$ 次元ぶんをまるごと引き受けています。平面は $2$ 次元なので、点を指すには本来 $2$ つの数（座標）が要りました。ところが「直線の上にいる」と決めた瞬間、自由度は $1$ に減る——だから文字も $1$ つで足りる。この「制約が自由度を減らし、減った自由度のぶんだけ文字を使う」という見方は、このあと空間の直線（文字 $1$ つ）と平面（文字 $2$ つ）でそのまま効きます。

**同じ直線に、方向ベクトルは何通りもある**

$\\vec{d}$ の実数倍は、どれも同じ向き（または正反対の向き）を指すので、**どれも同じ直線の方向ベクトル**です。$(4,\\ 3)$ でも $(8,\\ 6)$ でも $(-4,\\ -3)$ でも、表す直線は変わりません。変わるのは **$t$ の値のほう**です。同じ点を指すのに、$\\vec{d}$ を $2$ 倍すれば $t$ は半分になります。だから問題では、どの方向ベクトルを使うかを先に決めておきます（step 5）。

**$t$ を消すと、数Ⅱ で見た顔になる**

$x = -1 + 4t$、$y = 4 + 3t$ のように、$x$ と $y$ が別々に $t$ の式で書かれている形は、数Ⅱ の [媒介変数表示] そのものです。ここから $t$ を消せば $x$ と $y$ だけの式——見慣れた直線の方程式に戻ります（step 4 では $3x - 4y + 19 = 0$ が出ました）。**同じ $1$ 本の直線に、$2$ つの顔がある**わけです。どちらが偉いということはなく、問いによって使い分けます。点が「動く」話や空間の直線は $t$ の顔が強く、点と直線の距離は $x$、$y$ の顔が強い。

**垂線の足——「垂直」を式に翻訳する**

直線 $l$ の外にある点 B から $l$ に垂線を下ろした足を H とします。H を探すのに、定規は要りません。H は $l$ 上の点だから $\\overrightarrow{OH} = \\overrightarrow{OA} + t\\vec{d}$ と書けて、**まだ分からないのは $t$ だけ**。そして BH が $l$ に垂直だということは、$\\overrightarrow{BH}$ と方向ベクトル $\\vec{d}$ が [垂直]、すなわち

$$\\overrightarrow{BH}\\cdot\\vec{d} = 0$$

$\\overrightarrow{BH}$ の成分は $t$ の $1$ 次式なので、この内積も $t$ の $1$ 次式。**未知数 $1$ つ・$1$ 次方程式 $1$ 本**で、$t$ がただ $1$ つ決まります。「垂線の足はただ $1$ つ」という図形の事実が、「$1$ 次方程式の解はただ $1$ つ」という代数の事実に翻訳されました。

**Step の道筋**

- **Step 1**：始点 ＋ $t$ × 方向で、直線上の点をたどる。$t$ を決めれば座標が出る
- **Step 2〜3**：座標から $t$ を逆にたどり、その $t$ から別の座標へ渡す。$t$ は $x$ と $y$ の仲立ち
- **Step 4**：「$x$ 軸の上」という条件も $t$ の式 $1$ 本。$t$ を消せば数Ⅱ の直線の方程式
- **Step 5（逆）**：通る点から方向ベクトルを逆算する。実数倍はどれも方向ベクトル
- **Step 6（転換点）**：垂直を内積で書くと、垂線の足が $t$ の $1$ 次方程式になる
- **Step 7〜8**：$t$ から座標へ、そして点と直線の距離へ。公式による道と一致する
- **Step 9**：$2$ 直線それぞれが自分の文字を持ち、交点は連立で出る
- **Step 10（山場）**：へだたりの $2$ 乗を $t$ の $2$ 次式にすると、最小の $t$ が垂線の足に一致する

────────

**もっと深く** — $1$ つの文字が、$1$ 次元を引き受ける

**忘れても導ける**：直線のベクトル方程式を公式として覚える必要はありません。**「A から出て、$\\vec{d}$ の向きに何倍か進む」と絵にする**だけで $\\overrightarrow{OP} = \\overrightarrow{OA} + t\\vec{d}$ は書けます。垂線の足も同じで、「足は直線の上にいる」→ 文字 $t$ で置く、「BH は直線と垂直」→ 内積を $0$ とおく、の $2$ 段だけ。$2$ 直線の交点も「同じ点を $2$ 通りに書いて、座標どうしを等しいとおく」で出ます。**分からないものを文字で置き、条件を式にする**——この手つきさえあれば、公式は毎回その場で組み立てられます。

**やってしまいがちな誤り $1$：方向ベクトルは $1$ 通りだと思う**。$\\vec{d}$ の実数倍はどれも同じ直線の方向ベクトルです。したがって「方向ベクトルを求めよ」という問いは、そのままでは答えが $1$ つに決まりません（step 5 では $x$ 成分を決めて一意にしています）。同じ理由で、**$t$ の値は「その方向ベクトルを使ったときの目盛り」**であって、点そのものの性質ではありません。友だちと答えが違ったら、まず $\\vec{d}$ をそろえてみましょう。

**やってしまいがちな誤り $2$：$\\overrightarrow{BH}$ を「B ー H」と引く**。終点から始点を引くのが約束なので $\\overrightarrow{BH} = \\overrightarrow{OH} - \\overrightarrow{OB}$。逆に引くと符号が全部ひっくり返り、内積を $0$ とおく式では**たまたま同じ $t$ が出てしまう**ので、間違いに気づけません（$-\\overrightarrow{BH}\\cdot\\vec{d} = 0$ も同じ方程式）。ところが距離や座標を出す段になると合わなくなります。step 6 で正しい向きを確かめておくと、step 7・8 で困りません。

**やってしまいがちな誤り $3$：$H$ を「B から直線に近そうなところ」と目分量で置く**。垂線の足は、図を正確に描いても読み取れません（この系列の H は $x$ 座標が $\\dfrac{3}{5}$ という半端な位置でした）。**図は式を立てるためにあり、答えを読み取るためにはない**——この構えは、図がそもそも描きにくい空間の問題でそのまま効いてきます。

**なぜ「最小」と「垂線」が同じ $t$ なのか**：$\\lvert\\overrightarrow{KP}\\rvert^{2}$ を $t$ で展開すると $\\lvert\\vec{d}\\rvert^{2}t^{2} + 2(\\overrightarrow{KA}\\cdot\\vec{d})\\,t + \\lvert\\overrightarrow{KA}\\rvert^{2}$ という $2$ 次式になります。$\\lvert\\vec{d}\\rvert^{2} > 0$ なので下に凸で、頂点はただ $1$ つ。その頂点を与える $t$ を求める式と、$\\overrightarrow{KP}\\cdot\\vec{d} = 0$ を解く式は、並べてみるとまったく同じ $1$ 次方程式です。**「最短距離は垂線」は、$2$ 次関数の頂点の話だった**——小学校からずっと絵で納得してきた事実に、はじめて計算による裏づけが立ちます。これは大学で学ぶ最小二乗法（データにいちばん合う直線を引く方法）の中心にある考え方と、同じ形をしています。

**この先の景色**：この「始点 ＋ $t$ × 方向」は、空間に出てもそのままの形で使えます。成分が $3$ つになるだけで、$xy$ 平面との交点も、点から直線への垂線の足も、この系列と同じ $2$ 段（文字で置く・条件を式にする）で出ます。さらに、平行でない $2$ 本の $\\vec{u}$、$\\vec{v}$ を使って文字を $2$ つにした $\\overrightarrow{OP} = \\overrightarrow{OA} + s\\vec{u} + t\\vec{v}$ は**平面**を表します——文字の本数が、そのまま次元の数になるのです。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（成分表示の末尾に直線のベクトル方程式と垂線の足を置く並び）と、
  「直線は『ここから』と『この向きに』で決まる」「垂線の足は、垂直の条件を内積で表せば求まる」という着眼を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ $t$ を $1$ つ添えるだけで直線上のすべての点が書けるのか」——**直線の上にいると決めた点は、自由度が $1$ しか残っていないから**です。平面の点は本来 $2$ つの数で決まりますが、「A を通り $\\vec{d}$ に平行な直線の上」という制約が $1$ つ入ると、残る自由は「$\\vec{d}$ の何倍か」だけ。その $1$ つの数が $t$ で、$t$ と直線上の点は $1$ 対 $1$ に対応します。

「なぜ垂線の足が $1$ 本の式で決まるのか」——**足の居場所を $t$ ひとつに減らしておいてから、「垂直」を内積 $= 0$ で式にしたから**です。未知数 $1$ つに条件 $1$ 本。$\\overrightarrow{BH}$ の成分は $t$ の $1$ 次式なので、内積も $t$ の $1$ 次式になり、解はただ $1$ つ。定規を当てて探していたものが、$1$ 次方程式に変わりました。

**図形を、文字の本数で数える。** 直線なら $1$ 本、平面なら $2$ 本。次に空間へ出ても、この数え方は何ひとつ変わりません。`,
};

/** M3V10: 空間ベクトル（基準が 3 本になるだけ）。
 *  背骨設計 docs/math3c_vector_design.md 系列10。
 *  前半（step1〜4）は平面で覚えた内分・重心・共線の道具が空間でそのまま動くこと、
 *  後半（step5〜10）は計量の材料が 3 つから 6 つに増えるだけであることを歩く。
 *  質的変化 step6 は「位置の係数」から「長さの 2 乗」へ。
 *  山場 step10 は平面 ABC に下ろした垂線の足——空間では作図で追えず、
 *  6 つの値がそろっていないと 1 行も書けない。 */
export const M3V_SPACE_SERIES: LearnerSeries = {
  id: "math3_vec_space_01",
  title: "空間ベクトル（基準が 3 本になるだけ）",
  subtitle:
    "数Ⅲ・C ベクトルより — 平面で手に入れた内分・重心・共線・内積が、基準を $1$ 本足すだけでそのまま空間で動く。四面体の内分点から、平面に下ろした垂線の足まで $10$ 問。",
  patternId: "M3V10",
  unit: "math_3",
  revelationLabel:
    "**公式は一文字も変わらなかった**。変わったのは基準の矢印が $2$ 本から $3$ 本へ、計量の材料が $3$ つから $6$ つへ——それだけで、図に描けない空間の点まで計算が届く",
  drivingQuestion:
    "平面が空間に変わっても、内分も重心も「同じ直線の上」も**一文字も変えずに**使えるのはなぜか？ 基準の矢印が「$3$ 本」でなければならないのは**なぜ**で、長さや角を出すのに要る値が $3$ つから **$6$ つ**に増えるのはなぜか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "空間に四面体 ABCD があります（$4$ 点は同じ平面の上にありません）。$\\overrightarrow{AB} = \\vec{b}$、$\\overrightarrow{AC} = \\vec{c}$、$\\overrightarrow{AD} = \\vec{d}$ とおきます。この $3$ 本は [1次独立] で、空間のどんな矢印もこの $3$ 本でただ $1$ 通りに書けます（[空間ベクトル]）。\n\n辺 CD を $CM : MD = 3 : 7$ に内分する点を M とします。\n\n$\\overrightarrow{AM}$ を $\\vec{b}$、$\\vec{c}$、$\\vec{d}$ で表したときの **$\\vec{c}$ の係数**を、既約分数で答えましょう。",
      answer: 0.7,
      answerDisplay: "7/10",
      unit: "",
      unknownLabel: "$\\overrightarrow{AM}$ の $\\vec{c}$ の係数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "平面の三角形で、辺を分ける点を基準の $2$ 本で書いたときのことを思い出そう。M は辺 CD の上だけを動く点——四面体の $4$ つの頂点のうち、M の場所を決めるのに本当に要るのはどれとどれだろう？ そのとき $\\vec{b}$ の出番はある？",
        },
        {
          layer: 2,
          text: "見るところは $1$ つだけ——**M は線分 CD を分ける点**だということ。M が C と D のどちらに近いかを決めているのは、$3 : 7$ のどちらの数だろう？",
        },
        {
          layer: 3,
          text: "平面で三角形の辺を分ける点を書いたときと、手つきはまったく同じです。M は線分 CD を $CM : MD = 3 : 7$ に分ける点なので、C から D の向きへ $\\overrightarrow{CD}$ の $\\dfrac{3}{10}$ だけ進んだ位置。A から寄り道してつなぐと\n\n$\\overrightarrow{AM} = \\overrightarrow{AC} + \\overrightarrow{CM} = \\vec{c} + \\dfrac{3}{10}(\\vec{d} - \\vec{c}) = \\dfrac{7}{10}\\vec{c} + \\dfrac{3}{10}\\vec{d}$\n\nよって $\\vec{c}$ の係数は $\\dfrac{7}{10}$（$\\vec{b}$ の係数は $0$ で、M の位置に B は関わりません）。\n\n**やってしまいがちな誤り**：比の $3$ をそのまま $\\vec{c}$ の係数にしてしまうこと。$CM : MD = 3 : 7$ のとき、**遠いほうの数が近いほうの点につきます**（C に $7$、D に $3$）。M は C 寄りなのだから C の係数のほうが大きいはずだ、と図で確かめられます。\n\n中心の問いへの最初の部分回答：**内分の公式は、平面でも空間でもまったく同じ**。変わったのは、基準の矢印が $\\vec{b}$、$\\vec{c}$、$\\vec{d}$ の $3$ 本になったことだけです。",
        },
      ],
      formulaPreview: "AM = AC + CM = c + (3/10)(d − c) = (7/10)c + (3/10)d",
      figureMarker: "<<M3V_HANDSIGN_3>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ四面体 ABCD で、辺 AB を $AK : KB = 5 : 3$ に内分する点を K、辺 BC を $BL : LC = 3 : 1$ に内分する点を L とします。M は前題と同じ点（辺 CD を $CM : MD = 3 : 7$ に内分）です。\n\n三角形 KLM の [重心] を G' とするとき、$\\overrightarrow{AG'}$ を $\\vec{b}$、$\\vec{c}$、$\\vec{d}$ で表したときの **$\\vec{c}$ の係数**を、既約分数で答えましょう。",
      answer: 0.48333333333333334,
      answerDisplay: "29/60",
      unit: "",
      unknownLabel: "$\\overrightarrow{AG'}$ の $\\vec{c}$ の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。見る点が $1$ つから $3$ つになった。前題で M を書いたやり方は、K にも L にもそのまま使えるだろうか？ そして、$3$ 点の重心を書く式は、平面の三角形のときと何か違うところがある？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**見る点が $3$ つになって、その重心を A から見る**こと $1$ 点。重心の式は平面のときと同じものが使えるだろうか——それとも、空間だから何か足りなくなる？",
        },
        {
          layer: 3,
          text: "前題と同じ寄り道で、$3$ 点をそれぞれ書きます。\n$\\overrightarrow{AK} = \\dfrac{5}{8}\\vec{b}$（AB を $5 : 3$）、$\\overrightarrow{AL} = \\vec{b} + \\dfrac{3}{4}(\\vec{c} - \\vec{b}) = \\dfrac{1}{4}\\vec{b} + \\dfrac{3}{4}\\vec{c}$（BC を $3 : 1$）、$\\overrightarrow{AM} = \\dfrac{7}{10}\\vec{c} + \\dfrac{3}{10}\\vec{d}$（$\\vec{c}$ の係数 $\\dfrac{7}{10}$ が前題の答えでした）。\n\n重心は $3$ つの平均なので $\\overrightarrow{AG'} = \\dfrac{\\overrightarrow{AK} + \\overrightarrow{AL} + \\overrightarrow{AM}}{3}$。$\\vec{c}$ の係数だけ集めると\n\n$\\dfrac{1}{3}\\left(\\dfrac{3}{4} + \\dfrac{7}{10}\\right) = \\dfrac{1}{3} \\times \\dfrac{29}{20} = \\dfrac{29}{60}$。\n\nついでに $\\vec{b}$ の係数は $\\dfrac{1}{3}\\left(\\dfrac{5}{8} + \\dfrac{1}{4}\\right) = \\dfrac{7}{24}$、$\\vec{d}$ の係数は $\\dfrac{1}{3} \\times \\dfrac{3}{10} = \\dfrac{1}{10}$。**$3$ つの係数はばらばら**です——これは次の問題で効いてきます。\n\n中心の問いへの部分回答：**重心の公式も、平面と空間で一文字も変わりません**。$3$ つの平均を取るだけ。増えたのは、平均を書き表すときに並ぶ基準の本数だけです。",
        },
      ],
      formulaPreview: "AG' = (AK + AL + AM)/3、c の係数 = (3/4 + 7/10)/3 = (29/20)/3 = 29/60",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "同じ四面体 ABCD で、$3$ 点の取り方だけを変えます。辺 AB を $AK : KB = 1 : 6$、辺 BC を $BL : LC = 3 : 4$、辺 CD を $CM : MD = 5 : 2$ に内分する点を、それぞれ K, L, M とします。三角形 KLM の重心を G'、三角形 BCD の重心を G とします。\n\nこの取り方だと、$3$ 点 A, G', G は同じ直線の上に並びます。$\\overrightarrow{AG'} = k\\,\\overrightarrow{AG}$ となる **$k$ の値**を、既約分数で答えましょう。",
      answer: 0.7142857142857143,
      answerDisplay: "5/7",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。四面体も、重心を取る手つきも同じ。変わったのは $3$ つの比だけ。前題では $\\vec{b}$、$\\vec{c}$、$\\vec{d}$ の係数がそろっていなかった——今度はどうなっているだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$3$ つの内分比**だけ。「同じ直線の上に並ぶ」というのは、$\\overrightarrow{AG'}$ と $\\overrightarrow{AG}$ が、$2$ 本の矢印としてどんな関係にあるということだろう？",
        },
        {
          layer: 3,
          text: "前題とまったく同じ手つきで $3$ 点を書きます。\n$\\overrightarrow{AK} = \\dfrac{1}{7}\\vec{b}$、$\\overrightarrow{AL} = \\dfrac{4}{7}\\vec{b} + \\dfrac{3}{7}\\vec{c}$、$\\overrightarrow{AM} = \\dfrac{2}{7}\\vec{c} + \\dfrac{5}{7}\\vec{d}$。\n\n重心を取ると\n$\\overrightarrow{AG'} = \\dfrac{1}{3}\\left\\{\\left(\\dfrac{1}{7} + \\dfrac{4}{7}\\right)\\vec{b} + \\left(\\dfrac{3}{7} + \\dfrac{2}{7}\\right)\\vec{c} + \\dfrac{5}{7}\\vec{d}\\right\\} = \\dfrac{5}{21}(\\vec{b} + \\vec{c} + \\vec{d})$。\n\n今度は $3$ つの係数が $\\dfrac{5}{21}$ でそろいました。一方 $\\overrightarrow{AG} = \\dfrac{1}{3}(\\vec{b} + \\vec{c} + \\vec{d})$ なので\n\n$\\overrightarrow{AG'} = \\dfrac{5}{7} \\times \\dfrac{1}{3}(\\vec{b} + \\vec{c} + \\vec{d}) = \\dfrac{5}{7}\\overrightarrow{AG}$、つまり $k = \\dfrac{5}{7}$。\n\n**同じ答えへのもう $1$ つの道**：$\\vec{b}$ の係数から出しても、$\\vec{c}$ からでも、$\\vec{d}$ からでも $\\dfrac{5}{7}$。$3$ つが一致したこと自体が「$\\overrightarrow{AG'}$ は $\\overrightarrow{AG}$ の実数倍」＝ A, G', G が同じ直線の上にある証拠です。前題の $3$ つ（$\\dfrac{7}{24}$、$\\dfrac{29}{60}$、$\\dfrac{1}{10}$）はそろっていなかったので、あちらでは並びませんでした。\n\n中心の問いへの部分回答：**平面で「同じ直線の上」を言うのに使った合言葉（$1$ 本の矢印の実数倍で書ける）が、空間でもそのまま合言葉になります**。確かめる係数が $2$ つから $3$ つに増えただけです。",
        },
      ],
      formulaPreview: "AG' = (5/21)(b + c + d) = (5/7)·(1/3)(b + c + d) = (5/7)AG",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "同じ四面体 ABCD で、こんどは点の取り方が分かっていません。辺 AB 上に点 K、辺 BC を $BL : LC = 4 : 1$ に内分する点 L、辺 CD 上に点 M をとり、三角形 KLM の重心を G' とします。三角形 BCD の重心は前題と同じ G です。\n\nこのとき $\\overrightarrow{AG'} = \\dfrac{9}{10}\\overrightarrow{AG}$ となりました。$\\dfrac{AK}{KB}$ の値を既約分数で答えましょう。",
      answer: 2.3333333333333335,
      answerDisplay: "7/3",
      unit: "",
      unknownLabel: "$\\dfrac{AK}{KB}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。分かっているものと、求めるものが入れかわっている。前題は $3$ つの比が分かっていて $k$ を出した。今度は $k$ のほうが先に分かっている。前題で歩いた道を、逆からたどれないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$k$ が与えられて、比の $1$ つが分からない**という向き $1$ 点。K の位置は $\\vec{b}$、$\\vec{c}$、$\\vec{d}$ のうち、どの係数に効いているだろう？",
        },
        {
          layer: 3,
          text: "K の位置を比のまま置くより、$\\overrightarrow{AK} = \\beta\\,\\vec{b}$（$\\beta$ は $0$ と $1$ のあいだの数）と置いたほうが式が軽くなります。前題と同じように $3$ 点を書くと\n$\\overrightarrow{AK} = \\beta\\vec{b}$、$\\overrightarrow{AL} = \\dfrac{1}{5}\\vec{b} + \\dfrac{4}{5}\\vec{c}$（BC を $4 : 1$）、$\\overrightarrow{AM}$ は $\\vec{c}$ と $\\vec{d}$ だけでできています。\n\n右辺のほうは $\\overrightarrow{AG'} = \\dfrac{9}{10}\\overrightarrow{AG} = \\dfrac{9}{10} \\times \\dfrac{1}{3}(\\vec{b} + \\vec{c} + \\vec{d}) = \\dfrac{3}{10}(\\vec{b} + \\vec{c} + \\vec{d})$。\n\n$\\vec{b}$ の係数だけ見比べれば $1$ 本で決まります：\n$\\dfrac{1}{3}\\left(\\beta + \\dfrac{1}{5}\\right) = \\dfrac{3}{10}$ より $\\beta + \\dfrac{1}{5} = \\dfrac{9}{10}$、$\\beta = \\dfrac{7}{10}$。\n\nつまり $\\overrightarrow{AK} = \\dfrac{7}{10}\\vec{b}$ で $AK : KB = 7 : 3$、$\\dfrac{AK}{KB} = \\dfrac{7}{3}$。\n\n（M の位置も自動的に決まります。$\\vec{d}$ の係数を見比べると $CM : MD = 9 : 1$。そのとき $\\vec{c}$ の係数もちょうど $\\dfrac{1}{3}\\left(\\dfrac{4}{5} + \\dfrac{1}{10}\\right) = \\dfrac{3}{10}$ になっていて、$3$ 本とも辻褄が合います。）\n\n中心の問いへの部分回答：**「係数を見比べる」という平面での道具が、空間では $3$ 本ぶんの見比べになる**だけ。見比べる本数が $1$ つ増えても、解き方は変わりません。",
        },
      ],
      formulaPreview: "b の係数 (β + 1/5)/3 = 3/10 より β = 7/10、AK:KB = 7:3",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "ここからは計量（長さと角）の話です。四面体 OABC で\n$OA = 3$、$OB = 2$、$OC = 6$、$\\angle AOB = 120°$、$\\angle BOC = 120°$、$\\angle COA = 60°$\nとします（正四面体ではありません）。$\\overrightarrow{OA} = \\vec{a}$、$\\overrightarrow{OB} = \\vec{b}$、$\\overrightarrow{OC} = \\vec{c}$ とおきます。\n\n[内積] $\\vec{b} \\cdot \\vec{c}$ の値を求めましょう。",
      answer: -6,
      unit: "",
      unknownLabel: "$\\vec{b} \\cdot \\vec{c}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは「点がどこにあるか」を係数で答えてきた。ここから聞かれるのは長さと角。平面で長さや角を出したときは、基準の $2$ 本についていくつの値をそろえておいた？ 基準が $3$ 本になると、その数はどうなりそうだろう？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**問われているのが点の位置ではなく計量になった**こと $1$ 点。$\\vec{b}$ と $\\vec{c}$ について、問題文が渡している数はどれとどれだろう？",
        },
        {
          layer: 3,
          text: "[内積] の定義は平面のときとまったく同じです：$\\vec{b} \\cdot \\vec{c} = \\lvert\\vec{b}\\rvert\\,\\lvert\\vec{c}\\rvert\\cos\\angle BOC$。ここでは $\\lvert\\vec{b}\\rvert = OB = 2$、$\\lvert\\vec{c}\\rvert = OC = 6$、$\\angle BOC = 120°$ なので\n\n$\\vec{b} \\cdot \\vec{c} = 2 \\times 6 \\times \\cos 120° = 12 \\times \\left(-\\dfrac{1}{2}\\right) = -6$。\n\n同じように $\\vec{a} \\cdot \\vec{b} = 3 \\times 2 \\times \\cos 120° = -3$、$\\vec{c} \\cdot \\vec{a} = 6 \\times 3 \\times \\cos 60° = 9$。長さのほうは $\\lvert\\vec{a}\\rvert = 3$、$\\lvert\\vec{b}\\rvert = 2$、$\\lvert\\vec{c}\\rvert = 6$。この **$6$ つの値**が、これから先の計量をぜんぶ支えます。\n\n**やってしまいがちな誤り $1$：正四面体だと思いこんで、内積を辺の長さの $2$ 乗にしてしまう**こと。たとえ $\\lvert\\vec{b}\\rvert = \\lvert\\vec{c}\\rvert$ であっても $\\vec{b} \\cdot \\vec{c}$ は $\\lvert\\vec{b}\\rvert^2$ にはなりません——あいだに $\\cos$ が必ず入るからです（$\\cos 0°$ のときだけ一致する、つまり $2$ 本が同じ向きのときだけ）。この四面体は辺の長さが $3$ 種類、なす角が $2$ 種類で、$6$ つの値は全部ばらばらです。\n\n**やってしまいがちな誤り $2$：$2$ 本でも足りると思うこと**。$\\vec{a}$ と $\\vec{b}$ だけでは、平面 OAB の上の点にしか届きません。C はその平面の外にあるので、$3$ 本目がどうしても要ります。\n\n中心の問いへの部分回答：**計量に要る値が $3$ つから $6$ つに増えるのは、基準 $2$ 本の組み合わせが $1$ 通りから $3$ 通りに増えるから**。長さが $3$ つ、内積が $3$ つ——それだけです。",
        },
      ],
      formulaPreview: "b・c = OB × OC × cos120° = 2 × 6 × (−1/2) = −6",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ四面体 OABC（$6$ つの値は前題のとおり）で、辺 OA を $OP : PA = 7 : 3$ に内分する点を P、辺 BC を $BQ : QC = 3 : 7$ に内分する点を Q とします。\n\n$\\lvert\\overrightarrow{PQ}\\rvert^2$ の値を求めましょう。答えは既約分数で。",
      answer: 6.25,
      answerDisplay: "25/4",
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{PQ}\\rvert^2$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$6$ つの値がそろったところまでは同じ。今度は四面体の中に引いた線分 PQ の長さが聞かれている。P も Q も辺の上の点——前半で内分点を書いたやり方は、ここでもそのまま使えるだろうか？ 書けたあと、長さはどこから出てくる？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**問われているのが $1$ 本の矢印の長さになった**こと $1$ 点。$\\overrightarrow{PQ}$ を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で書いてしまえば、あとは平面のときと同じ形。長さそのものではなく、その $2$ 乗が聞かれているのはなぜだろう？",
        },
        {
          layer: 3,
          text: "まず $\\overrightarrow{PQ}$ を基準の $3$ 本で書きます。$\\overrightarrow{OP} = \\dfrac{7}{10}\\vec{a}$、$\\overrightarrow{OQ} = \\dfrac{7\\vec{b} + 3\\vec{c}}{10}$（$BQ : QC = 3 : 7$ なので B に $7$、C に $3$）だから\n\n$\\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} = \\dfrac{1}{10}\\left(-7\\vec{a} + 7\\vec{b} + 3\\vec{c}\\right)$。\n\n長さは $2$ 乗して展開します（平面のときとまったく同じ手つきで、文字式のように）：\n\n$100\\,\\lvert\\overrightarrow{PQ}\\rvert^2 = 49\\lvert\\vec{a}\\rvert^2 + 49\\lvert\\vec{b}\\rvert^2 + 9\\lvert\\vec{c}\\rvert^2 - 98\\,\\vec{a} \\cdot \\vec{b} - 42\\,\\vec{c} \\cdot \\vec{a} + 42\\,\\vec{b} \\cdot \\vec{c}$\n\n$6$ つの値を入れると\n$49 \\times 9 + 49 \\times 4 + 9 \\times 36 - 98 \\times (-3) - 42 \\times 9 + 42 \\times (-6)$\n$= 441 + 196 + 324 + 294 - 378 - 252 = 625$。\n\nよって $\\lvert\\overrightarrow{PQ}\\rvert^2 = \\dfrac{625}{100} = \\dfrac{25}{4}$。\n\n**ここが折り返し**：平面では $\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a} \\cdot \\vec{b}$ の $3$ つで長さが出ました。空間では $6$ つ。**展開して現れる項の種類が、ちょうどその $6$ つ**です。だから「$6$ つをそろえておく」だけで、四面体の中のどの $2$ 点の距離も計算で出せます。\n\n中心の問いへの部分回答：**図が描きにくい空間でも、$6$ つの値さえ持っていれば距離は式の展開で出ます**——ひらめきも補助線も要りません。",
        },
      ],
      formulaPreview: "PQ = (−7a + 7b + 3c)/10、100|PQ|の2乗 = 441 + 196 + 324 + 294 − 378 − 252 = 625 より 25/4",
      figureMarker: "<<M3V_SIX_VALUES>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "同じ四面体・同じ P、Q について、$\\overrightarrow{PQ} \\cdot \\overrightarrow{BC}$ の値を求めましょう。答えは既約分数で。",
      answer: -2.8,
      answerDisplay: "−14/5",
      unit: "",
      unknownLabel: "$\\overrightarrow{PQ} \\cdot \\overrightarrow{BC}$",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\overrightarrow{PQ}$ を基準の $3$ 本で書くところまでは、そっくり同じ。変わったのは、その $\\overrightarrow{PQ}$ を何と組ませるかだけ。相手の $\\overrightarrow{BC}$ も、基準の $3$ 本で書けるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**かける相手が自分自身から $\\overrightarrow{BC}$ になった**こと $1$ 点。$\\overrightarrow{BC}$ を基準の $3$ 本で書くと、$3$ 本のうち何本が顔を出すだろう？",
        },
        {
          layer: 3,
          text: "前題で $\\overrightarrow{PQ} = \\dfrac{1}{10}(-7\\vec{a} + 7\\vec{b} + 3\\vec{c})$ と書けていました。相手は $\\overrightarrow{BC} = \\vec{c} - \\vec{b}$（終点から始点を引くだけ。$\\vec{a}$ は顔を出しません）。あとは文字式のように展開して、$6$ つの値を入れます：\n\n$10\\,\\overrightarrow{PQ} \\cdot \\overrightarrow{BC} = (-7\\vec{a} + 7\\vec{b} + 3\\vec{c}) \\cdot (\\vec{c} - \\vec{b})$\n$= -7\\,\\vec{c} \\cdot \\vec{a} + 7\\,\\vec{a} \\cdot \\vec{b} + 7\\,\\vec{b} \\cdot \\vec{c} - 7\\lvert\\vec{b}\\rvert^2 + 3\\lvert\\vec{c}\\rvert^2 - 3\\,\\vec{b} \\cdot \\vec{c}$\n$= -7 \\times 9 + 7 \\times (-3) + 7 \\times (-6) - 7 \\times 4 + 3 \\times 36 - 3 \\times (-6)$\n$= -63 - 21 - 42 - 28 + 108 + 18 = -28$。\n\nよって $\\overrightarrow{PQ} \\cdot \\overrightarrow{BC} = \\dfrac{-28}{10} = -\\dfrac{14}{5}$。\n\n値が $0$ ではないので、**この位置の P では PQ と BC は垂直ではありません**。負なのは、$2$ 本を始点をそろえて測ったときのなす角が鈍角だということ。\n\n中心の問いへの部分回答：**内積の展開も、平面と空間でまったく同じ**。増えたのは、展開したあとに入れる値が $3$ つから $6$ つになったことだけです。",
        },
      ],
      formulaPreview: "10 PQ・BC = −63 − 21 − 42 − 28 + 108 + 18 = −28 より PQ・BC = −14/5",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ四面体 OABC で、Q は前題と同じ点（辺 BC を $BQ : QC = 3 : 7$ に内分）のまま、P だけを辺 OA の上で動かします。\n\n$\\overrightarrow{PQ}$ と $\\overrightarrow{BC}$ が [垂直] になるのは、P が辺 OA をどんな比に分けるときでしょうか。$\\dfrac{OP}{PA}$ の値を既約分数で答えましょう。",
      answer: 0.875,
      answerDisplay: "7/8",
      unit: "",
      unknownLabel: "$\\dfrac{OP}{PA}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。四面体も Q も同じ。前題は P の場所が決まっていて内積の値を出した。今度は内積のほうの条件が先に決まっていて、P の場所が分からない。前題の道を、逆からたどれないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**分からないものが P の位置になった**こと $1$ 点。前題では $\\overrightarrow{OP}$ が $\\vec{a}$ の決まった倍率でした。その倍率を文字にすると、前題の計算はどこがどう変わるだろう？",
        },
        {
          layer: 3,
          text: "$\\overrightarrow{OP} = x\\,\\vec{a}$（$0 < x < 1$）と置きます。Q は前題のままなので $\\overrightarrow{OQ} = \\dfrac{7\\vec{b} + 3\\vec{c}}{10}$ で\n\n$\\overrightarrow{PQ} = -x\\,\\vec{a} + \\dfrac{7}{10}\\vec{b} + \\dfrac{3}{10}\\vec{c}$。\n\n前題とまったく同じ展開を、$x$ を文字のまま残して行います：\n$\\overrightarrow{PQ} \\cdot \\overrightarrow{BC} = -x\\left(\\vec{c} \\cdot \\vec{a} - \\vec{a} \\cdot \\vec{b}\\right) + \\dfrac{7}{10}\\left(\\vec{b} \\cdot \\vec{c} - \\lvert\\vec{b}\\rvert^2\\right) + \\dfrac{3}{10}\\left(\\lvert\\vec{c}\\rvert^2 - \\vec{b} \\cdot \\vec{c}\\right)$\n$= -x(9 + 3) + \\dfrac{7}{10}(-6 - 4) + \\dfrac{3}{10}(36 + 6) = -12x - 7 + \\dfrac{63}{5} = -12x + \\dfrac{28}{5}$。\n\n[垂直] は内積が $0$ ということなので $-12x + \\dfrac{28}{5} = 0$、$x = \\dfrac{7}{15}$。\n\nこのとき $OP : PA = \\dfrac{7}{15} : \\dfrac{8}{15} = 7 : 8$ なので $\\dfrac{OP}{PA} = \\dfrac{7}{8}$。\n\n**確かめ**：前題の $x = \\dfrac{7}{10}$ を入れると $-12 \\times \\dfrac{7}{10} + \\dfrac{28}{5} = -\\dfrac{42}{5} + \\dfrac{28}{5} = -\\dfrac{14}{5}$ で、前題の答えとちゃんと一致します。文字のまま解いた式は、前題を含んでいるのです。\n\n中心の問いへの部分回答：**「垂直である」という図形の言葉が、空間でも $1$ 次方程式 $1$ 本に化けます**。空間だからといって、式が何本も増えるわけではありません。",
        },
      ],
      formulaPreview: "PQ・BC = −12x + 28/5 = 0 より x = 7/15、OP:PA = 7:8",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "同じ四面体 OABC で、P は辺 OA を $OP : PA = 7 : 3$ に内分する点、Q は辺 BC を $BQ : QC = 3 : 7$ に内分する点とします（$\\lvert\\overrightarrow{PQ}\\rvert^2$ を求めたときと同じ $2$ 点です）。\n\n三角形 OPQ の、頂点 P のところの角 $\\angle OPQ$ について、$\\cos\\angle OPQ$ の値を求めましょう。答えは既約分数で。",
      answer: 0.76,
      answerDisplay: "19/25",
      unit: "",
      unknownLabel: "$\\cos\\angle OPQ$",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "長さを出した問題と、内積を出した問題を並べて見よう。ここで聞かれているのは角だけれど、この四面体で角を知る道具は、$1$ つも新しく増えていない。$\\angle OPQ$ をはさんでいる $2$ 本の矢印は、どれとどれだろう？ その $2$ 本は、もう書けている？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**始点が O でも B でもなく、P になった**こと。$\\angle OPQ$ をはさむのは $\\overrightarrow{PO}$ と $\\overrightarrow{PQ}$ です。この $2$ 本は、どちらもすでに $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で書けているだろうか？",
        },
        {
          layer: 3,
          text: "角をはさむ $2$ 本を、始点を P にそろえて書きます。\n$\\overrightarrow{PO} = -\\dfrac{7}{10}\\vec{a}$、$\\overrightarrow{PQ} = \\dfrac{1}{10}(-7\\vec{a} + 7\\vec{b} + 3\\vec{c})$。\n\n**内積（分子）**：\n$100\\,\\overrightarrow{PO} \\cdot \\overrightarrow{PQ} = -7\\,\\vec{a} \\cdot (-7\\vec{a} + 7\\vec{b} + 3\\vec{c}) = -7\\left(-7\\lvert\\vec{a}\\rvert^2 + 7\\,\\vec{a} \\cdot \\vec{b} + 3\\,\\vec{c} \\cdot \\vec{a}\\right)$\n$= -7\\left(-63 - 21 + 27\\right) = -7 \\times (-57) = 399$、つまり $\\overrightarrow{PO} \\cdot \\overrightarrow{PQ} = \\dfrac{399}{100}$。\n\n**長さ（分母）**：$\\lvert\\overrightarrow{PO}\\rvert = \\dfrac{7}{10}\\lvert\\vec{a}\\rvert = \\dfrac{21}{10}$。$\\lvert\\overrightarrow{PQ}\\rvert$ は、さきに求めた $\\lvert\\overrightarrow{PQ}\\rvert^2 = \\dfrac{25}{4}$ から $\\dfrac{5}{2}$。\n\n$\\cos\\angle OPQ = \\dfrac{399/100}{\\dfrac{21}{10} \\times \\dfrac{5}{2}} = \\dfrac{399/100}{21/4} = \\dfrac{399}{100} \\times \\dfrac{4}{21} = \\dfrac{19}{25}$。\n\n$2$ 乗の形で持っておいた長さが、ここでちょうど根号の外に出ました（$\\dfrac{25}{4}$ は $\\dfrac{5}{2}$ の $2$ 乗）。長さを $2$ 乗のまま運ぶのは、こういうときのためです。\n\n中心の問いへの部分回答：**長さ・内積・角の $3$ つは、空間でも同じ $6$ つの値から出ます**。新しい公式は $1$ つも要りませんでした。",
        },
      ],
      formulaPreview: "PO・PQ = 399/100、|PO| = 21/10、|PQ| = 5/2 より cos∠OPQ = 19/25",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "同じ四面体 OABC（$6$ つの値は同じ）で、平面 ABC の上に点 H をとったところ、$\\overrightarrow{OH} \\perp \\overrightarrow{BC}$ かつ $\\overrightarrow{OH} \\perp \\overrightarrow{AC}$ になりました。\n\n平面 ABC の上の点は、実数 $s$、$t$ を使って $\\overrightarrow{OH} = (1 - s - t)\\vec{a} + s\\,\\vec{b} + t\\,\\vec{c}$ の形に書けます。このときの **$s$ の値**を既約分数で答えましょう。",
      answer: 0.6428571428571429,
      answerDisplay: "9/14",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは点の場所が先に決まっていて、そこから長さや角を出した。今度は逆で、**満たすべき条件が $2$ 本**あって、点のほうが分からない。垂直の条件を $1$ 本だけ使った問題は、もう歩いてきた——あれを $2$ 本にすると、何が変わるだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**分からない文字が $2$ つ（$s$ と $t$）になった**こと。そのぶん、垂直の条件も $2$ 本あります。$\\overrightarrow{OH} \\cdot \\overrightarrow{BC}$ と $\\overrightarrow{OH} \\cdot \\overrightarrow{AC}$ を、$6$ つの値で書き下すとどうなるだろう？",
        },
        {
          layer: 3,
          text: "H を作図で出すのは、空間では至難です——紙に四面体を描いても、平面 ABC に下ろした垂線の足がどこに落ちるかは目で追えません。けれど計算なら、平面のときと同じ手つきで届きます。\n\n$\\overrightarrow{OH} = (1 - s - t)\\vec{a} + s\\vec{b} + t\\vec{c}$ とおいて、$6$ つの値で $3$ つの内積を作ります：\n$\\overrightarrow{OH} \\cdot \\vec{a} = 9(1 - s - t) - 3s + 9t = 9 - 12s$\n$\\overrightarrow{OH} \\cdot \\vec{b} = -3(1 - s - t) + 4s - 6t = -3 + 7s - 3t$\n$\\overrightarrow{OH} \\cdot \\vec{c} = 9(1 - s - t) - 6s + 36t = 9 - 15s + 27t$\n\n$\\overrightarrow{OH} \\cdot \\overrightarrow{BC} = 0$ は $\\overrightarrow{OH} \\cdot \\vec{c} - \\overrightarrow{OH} \\cdot \\vec{b} = 0$ のこと、$\\overrightarrow{OH} \\cdot \\overrightarrow{AC} = 0$ は $\\overrightarrow{OH} \\cdot \\vec{c} - \\overrightarrow{OH} \\cdot \\vec{a} = 0$ のこと。整理すると\n\n・$12 - 22s + 30t = 0$\n・$-3s + 27t = 0$\n\n下の式から $s = 9t$。上に入れて $12 - 198t + 30t = 0$、$168t = 12$、$t = \\dfrac{1}{14}$。よって $s = \\dfrac{9}{14}$。\n\n（$t$ は同じ連立から一緒に落ちてくる相方なので、ここで見せておきます。$1 - s - t = \\dfrac{2}{7}$ で $3$ つとも正——H は三角形 ABC の内部にあります。ついでに $\\lvert\\overrightarrow{OH}\\rvert^2 = \\dfrac{9}{7}$ で、これがこの四面体の、底面 ABC から見た高さの $2$ 乗です。）\n\n**なぜ条件が $2$ 本で足りるのか**：$\\overrightarrow{OH}$ が $\\overrightarrow{BC}$ とも $\\overrightarrow{AC}$ とも垂直なら、平面 ABC の中のどの向きとも垂直になります（平面の中のどの矢印も、この $2$ 本の組み合わせで書けるから）。$2$ 本の条件が、$2$ つの文字をちょうど決めるのです。\n\n**この問題は、$6$ つの値がそろっていないと $1$ 行も書けません**。長さだけでも角だけでも足りず、$3$ つの長さと $3$ つの内積が全部要ります——空間の計量が「$6$ つ」でできていることが、ここでいちばんはっきりします。\n\n中心の問いへの答え：**平面が空間に変わっても、内分・重心・同じ直線の上・内積・垂直の道具は一文字も変わりません**。変わるのは、基準の矢印が $2$ 本から $3$ 本へ、計量の材料が $3$ つから $6$ つへ増えることだけ。見比べる係数が $1$ つ、立てる式が $1$ 本増える——それだけで、図に描けない点にまで計算が届きました。",
        },
      ],
      formulaPreview: "12 − 22s + 30t = 0 と −3s + 27t = 0 より s = 9t、168t = 12、s = 9/14",
    },
  ],
  derivation: `**中心の問い** ｜ 平面が空間に変わっても、内分も重心も「同じ直線の上」も**一文字も変えずに**使えるのはなぜか？ 基準の矢印が「$3$ 本」でなければならないのは**なぜ**で、長さや角を出すのに要る値が $3$ つから **$6$ つ**に増えるのはなぜか？

────────

**「空間だから新しいことを覚える」ではない**

この系列で新しく覚えた公式は、$1$ つもありません。内分の書き方も、重心の書き方も、「同じ直線の上にある」の合言葉も、内積の定義も展開も、垂直の条件も——**平面で手に入れたものを、そのまま持ってきただけ**です。

それでも空間の問題が解けてしまうのは、ベクトルが最初から「場所を持たない量」として作られているからです。矢印から向きと大きさだけを取り出したとき、その矢印が平面の中にいるか空間の中にいるかは、どこにも書いてありませんでした。だから足し算も実数倍も内積も、次元をまたいでそのまま通用します。

**変わるのは、基準の本数だけ**

平面では、$1$ 次独立な $2$ 本 $\\vec{a}$、$\\vec{b}$ を決めれば、どんな矢印も $s\\vec{a} + t\\vec{b}$ とただ $1$ 通りに書けました。始点をそろえて $3$ 点 O, A, B が三角形をなす、というのがその条件でした。

空間では $3$ 本要ります。条件も同じ形で言えます——**$4$ 点 O, A, B, C が四面体をなす**（$3$ 本とも $\\vec{0}$ でなく、$3$ 本が同じ平面に乗らない）。これを空間の [1次独立] といいます。$2$ 本しかないと、その $2$ 本が張る平面の上の点にしか届きません。平面の外にある点へ行くには、平面から出る向きをもつ $3$ 本目がどうしても要る——親指・人差し指・中指を三方向に開いた手が、そのままこの条件の絵になります。

**ここが胚細胞**：**次元が上がっても、手つきは変わらない。変わるのは基準の本数だけ**。この一文が分かっていれば、空間ベクトルは「平面ベクトルの、係数が $1$ つ多い版」として最初から読めます。$4$ 次元でも $n$ 次元でも、話は同じです。

**前半で確かめたこと**

step 1 では、辺 CD を分ける点を書きました。$\\vec{b}$ の出番はゼロ——M の位置を決めるのに C と D しか要らないからです。空間に出ても、$1$ 本の線分の上の話は平面のときと寸分違いません。

step 2 の重心も、$3$ つの平均を取るだけ。step 3 では、$3$ つの係数が**そろう**取り方を歩きました。$\\overrightarrow{AG'} = \\dfrac{5}{21}(\\vec{b} + \\vec{c} + \\vec{d})$ のように $3$ つの係数が等しくなると、それは $\\overrightarrow{AG}$ の実数倍だということで、A, G', G が同じ直線の上に並びます。step 2 の $\\left(\\dfrac{7}{24},\\ \\dfrac{29}{60},\\ \\dfrac{1}{10}\\right)$ はそろっていなかったので、あちらでは並びませんでした。**「同じ直線の上」を確かめる作業が、$2$ つの係数の照合から $3$ つの照合になっただけ**です。

step 4 はその逆——$k$ が先に分かっていて、比のほうを逆算しました。$3$ 本のうち $1$ 本を見比べれば決まり、残りの $2$ 本は辻褄合わせの検算になります。**$1$ 本ぶん増えた式は、負担ではなく検算の道具**でもあるのです。

**後半：$3$ つの値が $6$ つになる、その勘定**

平面の計量では $\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a} \\cdot \\vec{b}$ の $3$ つをそろえれば、長さも角も面積も出ました。空間では $6$ つ：

- 長さが $3$ つ：$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\lvert\\vec{c}\\rvert$
- 内積が $3$ つ：$\\vec{a} \\cdot \\vec{b}$、$\\vec{b} \\cdot \\vec{c}$、$\\vec{c} \\cdot \\vec{a}$

<<M3V_SIX_VALUES>>

なぜ $6$ つかは、勘定してみればすぐ分かります。$s\\vec{a} + t\\vec{b} + u\\vec{c}$ の形の矢印を $2$ 乗して展開すると、出てくる項は「自分どうし」が $3$ つ（$\\lvert\\vec{a}\\rvert^2$、$\\lvert\\vec{b}\\rvert^2$、$\\lvert\\vec{c}\\rvert^2$）と、「相手ちがい」が $3$ 通り（$3$ 本から $2$ 本を選ぶ選び方が $3$ 通り）。$3 + 3 = 6$。**展開して現れる項の種類の数が、そのまま「そろえておくべき値」の数**です。平面なら $2 + 1 = 3$ でした。

だから step 6 で $\\lvert\\overrightarrow{PQ}\\rvert^2$ を求めたとき、$6$ つの値を全部使い切りました。step 7 の $\\overrightarrow{PQ} \\cdot \\overrightarrow{BC}$ も、step 9 の $\\cos\\angle OPQ$ も、材料は同じ $6$ つ。**新しい材料を仕入れずに、長さも角も出る**——ここが空間ベクトルのいちばんの見どころです。

**山場：図では追えない点に、計算だけで届く**

step 10 の H は、O から平面 ABC に下ろした垂線の足です。平面図形なら、垂線の足は定規とコンパスで作図できました。空間では、紙に四面体を描いても垂線の足がどこに落ちるかは目で追えません。**ひらめきや補助線の出番がない**のです。

それでも $\\overrightarrow{OH} \\cdot \\overrightarrow{BC} = 0$ と $\\overrightarrow{OH} \\cdot \\overrightarrow{AC} = 0$ という $2$ 本の式を立てて、$6$ つの値を入れて、$2$ 元 $1$ 次連立方程式を解けば $s = \\dfrac{9}{14}$、$t = \\dfrac{1}{14}$ が出ます。図形が計算に翻訳されるという、この章の約束が、いちばん強く効く場所です。

**Step の道筋**

- **Step 1**：四面体の辺を分ける点。平面の内分がそのまま動く
- **Step 2**：$3$ 点の重心も、平均を取るだけ。$3$ つの係数はばらばらでよい
- **Step 3**：比を選ぶと $3$ つの係数がそろう。それが「同じ直線の上」の証人
- **Step 4**：逆に、$k$ から比を逆算する。$1$ 本の見比べで決まり、残り $2$ 本が検算になる
- **Step 5**：計量へ。長さ $3$ つと内積 $3$ つ、合わせて $6$ つの値をそろえる
- **Step 6（転換点）**：位置の係数から、長さの $2$ 乗へ。展開に現れる項が、ちょうど $6$ つ
- **Step 7**：同じ展開で、相手を変えるだけ。垂直でない組の内積は $0$ にならない
- **Step 8**：逆に、垂直にする比を求める。図形の条件が $1$ 次方程式 $1$ 本に化ける
- **Step 9**：長さと内積がそろえば角も出る。$2$ 乗で持っていた長さがここで効く
- **Step 10（山場）**：平面 ABC に下ろした垂線の足。条件 $2$ 本、文字 $2$ つ、作図の道は無い

────────

**もっと深く** — 「本数が増えるだけ」を、いつでも自分で立て直す

**忘れても導ける**：空間ベクトルで覚えることは、実は $1$ つもありません。困ったら次の $2$ つを自分に問えば戻れます。

$1$ つめ、**「いま、基準は何本か」**。平面なら $2$ 本、空間なら $3$ 本。書き表したい矢印を、その本数ぶんの係数で書くところから始めます。$2$ 本で書こうとして詰まったら、それは行き先が平面の外にあるという合図です。

$2$ つめ、**「その計算に要る値は、何種類か」**。$2$ 乗して展開したときに出てくる項を数えれば、答えは自分で出ます。基準が $n$ 本なら、自分どうしが $n$ 個、相手ちがいが $n$ 本から $2$ 本を選ぶ選び方だけ。公式として覚える必要はありません。

**やってしまいがちな誤り $1$：正四面体のつもりで内積を出す**。正四面体は $6$ つの値が辺の長さから一発で決まってしまうので、練習にはなっても、$6$ つがそれぞれ独立の材料だという実感は残りません。辺の長さが違えば内積も違い、なす角が違えばもっと違う。$\\vec{b} \\cdot \\vec{c}$ は $\\lvert\\vec{b}\\rvert\\,\\lvert\\vec{c}\\rvert$ ではなく、あいだに必ず $\\cos$ が入ります。

**やってしまいがちな誤り $2$：「$2$ 本で足りる」と思う**。$\\vec{a}$、$\\vec{b}$ の $2$ 本で書ける点は、平面 OAB の上の点だけ。C はその平面の外にいます。逆に言えば、**ある点が $2$ 本で書けてしまったら、その点は平面 OAB の上にいる**ということ——この裏返しが、次の系列の主題になります。

**やってしまいがちな誤り $3$：空間だから連立が増えると思いこむ**。step 10 は文字 $2$ つ、式 $2$ 本でした。空間の点を平面の上に縛った瞬間、自由に動ける向きは $2$ つに減っています。**縛りの本数と文字の本数は、いつも釣り合います**。

**この先の景色**：次の系列では「点 P が平面 ABC の上にある」という条件そのものを扱います（[共面条件]）。平面の世界では「どんな点も $2$ 方向で書ける」のは当たり前でした——空間に出た瞬間、それが条件に変わる。この系列の step 10 で、平面 ABC の上の点をわざわざ $(1 - s - t)\\vec{a} + s\\vec{b} + t\\vec{c}$ の形で書いたのは、その予告でもあります。さらに進むと、基準を $3$ 本の直交する矢印に固定した空間座標に移り、$6$ つの値が成分の計算に化けます。大学では、この $6$ つの値を並べた表をグラム行列と呼び、$n$ 本の基準に対して同じ勘定（自分どうしが $n$ 個、相手ちがいが選び方のぶん）が成り立つことを学びます。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（空間ベクトル $\\to$ 基準の本数 $\\to$ 内分・重心・共線 $\\to$ $6$ つの値による計量）と、
  「『平面』が『空間』になっても、基本的な考え方は何一つ変わらない」「基準となるベクトルが $2$ つから $3$ つになる」「平面では $3$ つの値、空間では $6$ つの値をあらかじめ準備しておく」という着眼を参考。問題の値・場面（四面体 ABCD の内分点、四面体 OABC の $6$ つの値）はすべてオリジナル。

────────

**問いに戻ると**

「なぜ一文字も変えずに使えるのか」——**ベクトルが最初から場所を持たない量として作られたから**です。向きと大きさだけを取り出したとき、その矢印が平面にいるか空間にいるかは、どこにも書き込まれませんでした。だから内分も重心も内積も、次元をまたいでそのまま通用します。

「なぜ $3$ 本でなければならないのか」——**$2$ 本では、その $2$ 本が張る平面の外へ出られないから**。四面体をなす $3$ 本があれば、空間のどの点にもただ $1$ 通りに届きます。

「なぜ $3$ つが $6$ つになるのか」——**$2$ 乗して展開したときに現れる項の種類が、$3$ 種類から $6$ 種類に増えるから**。自分どうしが $3$ つ、相手ちがいが $3$ 通り。増えたのはそれだけで、$6$ つさえ手元にあれば、長さも角も、図に描けない垂線の足まで計算で出せました。

**「新しい世界」ではなく、「同じ道具の、係数が $1$ つ多い版」。** 次の系列では、この $3$ 本で書けるかどうかが、そのまま「平面の上にあるか」の条件に変わります。`,
};

/** M3V11: 共面条件（当たり前が、条件になる）。
 *  空間パート 2 本目。平面の中では「どの点も 2 方向で書ける」のは当たり前だったのに、
 *  空間に出た瞬間それが「点 P が平面 ABC 上にある条件」に変わる——この裏返りを体で渡す。
 *  質的変化 step5 は直線 LG と平面 AMN の交点（文字 3 つ・方程式 3 本＝空間の一里塚）。
 *  山場 step10 は直線 LM と平面 ABC の交点で、交点が線分の外（k が負）に出る。 */
export const M3V_COPLANAR_SERIES: LearnerSeries = {
  id: "math3_vec_coplanar_01",
  title: "共面条件（当たり前が、条件になる）",
  subtitle:
    "数Ⅲ・C ベクトルより — 平面の中では当たり前だった「$2$ 方向で書ける」が、空間では「その平面の上にいる」という条件になる。係数の和が $1$ を読む入口から、交点が線分の外へ飛び出す山場まで $10$ 問。",
  patternId: "M3V11",
  unit: "math_3",
  revelationLabel:
    "**世界が広がると、当たり前が条件になる**。平面の中では、どの点も $2$ つの向きへ進めば届いた——空間では、そう書けること自体が「平面 ABC 上にいる」という条件になる。そして直線のときの合言葉「係数の和が $1$」は、方向が $2$ つになっても、そのままの形で生き残る",
  drivingQuestion:
    "平面の世界では、どんな点も $\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ と書けるのは**当たり前**だった。空間に出た瞬間、それが「点 P が平面 ABC 上にある**条件**」に変わる——世界が広がると、なぜ当たり前が条件になるのか？ そして直線のときの合言葉「係数の和が $1$」は、平面になっても生きているのか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "四面体 OABC で、$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$、$\\overrightarrow{OC}=\\vec{c}$ とします（$4$ 点 O, A, B, C は同じ平面上にないので、$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ は [1次独立] です）。\n\n辺 OA を $OL:LA=1:7$ に内分する点を L、辺 OB の中点を M とします。\n\n点 P は**平面 ABC 上**にあり、$\\overrightarrow{OP}=\\alpha\\vec{a}+\\beta\\vec{b}+\\gamma\\vec{c}$ と書けています。ここで $\\alpha$ は $\\overrightarrow{OL}=\\alpha\\vec{a}$ となる値、$\\beta$ は $\\overrightarrow{OM}=\\beta\\vec{b}$ となる値と同じです。\n\n**$\\gamma$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.375,
      answerDisplay: "3/8",
      unit: "",
      unknownLabel: "$\\gamma$",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "直線 AB 上の点なら $\\overrightarrow{OP}=(1-k)\\vec{a}+k\\vec{b}$ と書けて、$2$ つの係数の和は必ず $1$ でした（[共線条件]）。今度の舞台は平面 ABC です。平面の上の点は、A から**$2$ つの向き**へ進めば届く——それを O から見た形に書き直したら、$3$ つの係数の間には何が起きるだろう？",
        },
        {
          layer: 2,
          text: "見るところは $2$ つだけ。ひとつは、**$\\alpha$ と $\\beta$ が辺の上の点 L, M の内分比から読み取れる**こと（[内分] でやったとおり）。もうひとつは、**平面 ABC 上の点の $3$ つの係数が満たす関係**。この $2$ つがそろえば $\\gamma$ は決まってしまいます。",
        },
        {
          layer: 3,
          text: "点 P が平面 ABC 上にあるとは、A を始点にして $\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ と書ける実数 $s$、$t$ がとれるということです。これを O 始点に直すと\n\n$\\overrightarrow{OP}=\\overrightarrow{OA}+s(\\vec{b}-\\vec{a})+t(\\vec{c}-\\vec{a})=(1-s-t)\\vec{a}+s\\vec{b}+t\\vec{c}$\n\nとなり、$3$ つの係数を足すと $(1-s-t)+s+t=1$。つまり**平面 ABC 上の点は、係数の和が $1$**（[共面条件]）。\n\n次に $\\alpha$ と $\\beta$ を読みます。$OL:LA=1:7$ なので L は OA を $8$ 等分した $1$ つめ、$\\overrightarrow{OL}=\\dfrac{1}{8}\\vec{a}$ で $\\alpha=\\dfrac{1}{8}$。M は OB の中点なので $\\overrightarrow{OM}=\\dfrac{1}{2}\\vec{b}$ で $\\beta=\\dfrac{1}{2}$。よって\n\n$\\gamma=1-\\dfrac{1}{8}-\\dfrac{1}{2}=\\dfrac{8-1-4}{8}=\\dfrac{3}{8}$。\n\n中心の問いへの最初の部分回答：**「平面 ABC 上にある」という図形の言葉が、「係数の和が $1$」という数の言葉になった**。平面の中で暮らしていたら、どの点もこう書けたので言うまでもないことでした。空間では、それが条件になります。",
        },
      ],
      formulaPreview: "平面 ABC 上なら α+β+γ = 1。α = 1/8、β = 1/2 → γ = 1 − 1/8 − 1/2 = 3/8",
      figureMarker: "<<M3V_COPLANAR>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ四面体 OABC で、辺 OA を $OL:LA=1:7$ に内分する点を L、辺 OB の中点を M、辺 OC を $ON:NC=4:3$ に内分する点を N とします。\n\n点 P は**平面 LMN 上**にあり、$\\overrightarrow{OP}=p\\vec{a}+q\\vec{b}+r\\vec{c}$ と書けています。$p=\\dfrac{1}{16}$、$q=\\dfrac{1}{8}$ のとき、**$r$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.14285714285714285,
      answerDisplay: "1/7",
      unit: "",
      unknownLabel: "$r$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。四面体も、$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ も同じ。変わったのは、点が乗っている平面です。前題で見つけた合言葉は、**そのままの形**で使えるだろうか？ 何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**平面を決める $3$ 点が、頂点 A, B, C ではなく辺の上の点 L, M, N になった**こと。前題の合言葉は「A, B, C を基準にしたときの係数」の話でした。いま手元にある $p$、$q$、$r$ は、何を基準にした係数だろう。",
        },
        {
          layer: 3,
          text: "前題とまったく同じ道を、基準の $3$ 点を L, M, N に取り替えて歩きます。P が平面 LMN 上にあるとは、$x+y+z=1$ となる実数で\n\n$\\overrightarrow{OP}=x\\overrightarrow{OL}+y\\overrightarrow{OM}+z\\overrightarrow{ON}$\n\nと書けること。ここで $\\overrightarrow{OL}=\\dfrac{1}{8}\\vec{a}$、$\\overrightarrow{OM}=\\dfrac{1}{2}\\vec{b}$、$\\overrightarrow{ON}=\\dfrac{4}{7}\\vec{c}$ なので、$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ の係数を見比べて $p=\\dfrac{x}{8}$、$q=\\dfrac{y}{2}$、$r=\\dfrac{4z}{7}$、すなわち $x=8p$、$y=2q$、$z=\\dfrac{7}{4}r$。これを $x+y+z=1$ に入れて\n\n$8p+2q+\\dfrac{7}{4}r=1$、$\\ \\dfrac{1}{2}+\\dfrac{1}{4}+\\dfrac{7}{4}r=1$、$\\ \\dfrac{7}{4}r=\\dfrac{1}{4}$、$\\ r=\\dfrac{1}{7}$。\n\nためしに $p+q+r=\\dfrac{1}{16}+\\dfrac{1}{8}+\\dfrac{1}{7}$ を計算すると $1$ にはなりません。**「係数の和が $1$」が使えるのは、平面を決める $3$ 点そのものを基準に取ったとき**です。中心の問いへの部分回答：合言葉は形を変えずに引っ越せる——ただし「誰を基準にしているか」を取り違えないこと。",
        },
      ],
      formulaPreview: "x = 8p、y = 2q、z = (7/4)r、x+y+z = 1 → 1/2 + 1/4 + (7/4)r = 1 → r = 1/7",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "四面体 OABC で、辺 OA を $OL:LA=4:3$ に内分する点を L、辺 OB の中点を M、辺 OC を $ON:NC=4:3$ に内分する点を N とします。また、三角形 ABC の [重心] を G とします。\n\n直線 OG と平面 LMN の交点を K とすると、$\\overrightarrow{OK}=k\\overrightarrow{OG}$ と書けます。**$k$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.5454545454545454,
      answerDisplay: "6/11",
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。平面の作り方（$3$ つの辺の上の点を通る平面）は同じです。違うのは、点 K の居場所が**まだ分かっていない**こと——分かっているのは「O から G へ向かう直線の上にいる」ということだけ。前題で効いた合言葉は、この設定でどこに効く？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**$3$ つの係数が、$k$ という文字 $1$ つで書けてしまう**こと。重心 G を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で書くとどうなるか。そこから $\\overrightarrow{OK}=k\\overrightarrow{OG}$ の $3$ つの係数を並べてみよう。",
        },
        {
          layer: 3,
          text: "重心の公式から $\\overrightarrow{OG}=\\dfrac{1}{3}(\\vec{a}+\\vec{b}+\\vec{c})$ なので\n\n$\\overrightarrow{OK}=k\\overrightarrow{OG}=\\dfrac{k}{3}\\vec{a}+\\dfrac{k}{3}\\vec{b}+\\dfrac{k}{3}\\vec{c}$。\n\nこれが平面 LMN 上にある条件を、前題の形で書きます。$\\overrightarrow{OL}=\\dfrac{4}{7}\\vec{a}$、$\\overrightarrow{OM}=\\dfrac{1}{2}\\vec{b}$、$\\overrightarrow{ON}=\\dfrac{4}{7}\\vec{c}$ だったので、前題の $8p+2q+\\dfrac{7}{4}r=1$ にあたる式は\n\n$\\dfrac{7}{4}\\cdot\\dfrac{k}{3}+2\\cdot\\dfrac{k}{3}+\\dfrac{7}{4}\\cdot\\dfrac{k}{3}=1$、$\\ \\dfrac{k}{3}\\left(\\dfrac{7}{4}+2+\\dfrac{7}{4}\\right)=1$、$\\ \\dfrac{k}{3}\\cdot\\dfrac{11}{2}=1$、$\\ k=\\dfrac{6}{11}$。\n\n**同じ答えに、別の道からも着きます**。K が平面 LMN 上にあることを $\\overrightarrow{OK}=(1-s-t)\\overrightarrow{OL}+s\\overrightarrow{OM}+t\\overrightarrow{ON}$ と書いて、$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ の係数を $1$ つずつ見比べると $\\dfrac{4}{7}(1-s-t)=\\dfrac{k}{3}$、$\\dfrac{s}{2}=\\dfrac{k}{3}$、$\\dfrac{4t}{7}=\\dfrac{k}{3}$ の $3$ 本。ここから $s=\\dfrac{2k}{3}$、$t=\\dfrac{7k}{12}$ を第 $1$ 式に入れても $k=\\dfrac{6}{11}$ が出ます。中心の問いへの部分回答：**共線条件（直線の上）と共面条件（平面の上）を同時に立てると、位置が $1$ 点に決まる**。",
        },
      ],
      formulaPreview: "OK = (k/3)(a+b+c)、(7/4 + 2 + 7/4)(k/3) = 1 → (11/2)(k/3) = 1 → k = 6/11",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "同じ四面体 OABC で、M は辺 OB の中点、N は辺 OC を $ON:NC=4:3$ に内分する点、G は三角形 ABC の重心とします。\n\n辺 OA 上に点 L をとって平面 LMN を作ったところ、直線 OG との交点 K が $\\overrightarrow{OK}=\\dfrac{3}{7}\\overrightarrow{OG}$ を満たしました。\n\nこのとき **$\\dfrac{OL}{LA}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.4444444444444444,
      answerDisplay: "4/9",
      unit: "",
      unknownLabel: "$\\dfrac{OL}{LA}$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。四面体も、M も N も G も、交点の作り方も同じ。入れかわったのは、**先に分かっているもの**と**求めるもの**です。前題でたどった道を、逆から歩けないだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**$k$ が先に分かっていて、L の位置のほうが分からない**こと。前題で $k$ を出したとき、L の位置は式のどこに顔を出していただろう。",
        },
        {
          layer: 3,
          text: "L の位置を $\\overrightarrow{OL}=l\\vec{a}$（$0<l<1$）と置きます。前題の式は、L の位置だけを文字にすると\n\n$\\dfrac{1}{l}\\cdot\\dfrac{k}{3}+2\\cdot\\dfrac{k}{3}+\\dfrac{7}{4}\\cdot\\dfrac{k}{3}=1$、すなわち $\\dfrac{1}{l}+2+\\dfrac{7}{4}=\\dfrac{3}{k}$。\n\n（前題は $l=\\dfrac{4}{7}$、つまり $\\dfrac{1}{l}=\\dfrac{7}{4}$ の場合でした。）$k=\\dfrac{3}{7}$ を入れると $\\dfrac{3}{k}=7$ なので\n\n$\\dfrac{1}{l}=7-2-\\dfrac{7}{4}=\\dfrac{13}{4}$、$\\ l=\\dfrac{4}{13}$。\n\n$\\overrightarrow{OL}=\\dfrac{4}{13}\\vec{a}$ とは、OA を $13$ 等分して O 側から $4$ つめということ。したがって $OL:LA=4:(13-4)=4:9$ で、$\\dfrac{OL}{LA}=\\dfrac{4}{9}$。\n\n中心の問いへの部分回答：**条件は、どちら向きにも読める**。「この位置なら交点はここ」も、「交点をここにしたいなら位置はここ」も、同じ $1$ 本の式です。",
        },
      ],
      formulaPreview: "1/l + 2 + 7/4 = 3/k。k = 3/7 のとき 1/l = 7 − 2 − 7/4 = 13/4 → OL = (4/13)OA → OL:LA = 4:9",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "四面体 OABC で、辺 OA を $OL:LA=4:3$ に内分する点を L、辺 OB の中点を M、辺 OC を $ON:NC=1:7$ に内分する点を N、三角形 ABC の重心を G とします。\n\n直線 LG と平面 AMN の交点を K とするとき、$\\overrightarrow{OK}=\\alpha\\vec{a}+\\beta\\vec{b}+\\gamma\\vec{c}$ の **$\\alpha$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.5384615384615384,
      answerDisplay: "7/13",
      unit: "",
      unknownLabel: "$\\alpha$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでの直線は、いつも O から出ていました（O から G へ）。今度の直線は L から G へで、**O を通りません**。同じ点 K を「直線の上の点」と「平面の上の点」の $2$ 通りに書く、という手は、それでもまだ使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**置かなければならない文字が、$1$ つから $3$ つに増えた**こと。直線 LG 上であることに $1$ つ、平面 AMN 上であることに $2$ つ。それでも $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ が [1次独立] であることを使うと、式は何本立つだろう。",
        },
        {
          layer: 3,
          text: "K を $2$ 通りに書きます。$\\overrightarrow{OL}=\\dfrac{4}{7}\\vec{a}$、$\\overrightarrow{OM}=\\dfrac{1}{2}\\vec{b}$、$\\overrightarrow{ON}=\\dfrac{1}{8}\\vec{c}$、$\\overrightarrow{OG}=\\dfrac{1}{3}(\\vec{a}+\\vec{b}+\\vec{c})$ です。\n\n①K は直線 LG 上（共線条件・文字 $k$）：\n$\\overrightarrow{OK}=(1-k)\\overrightarrow{OL}+k\\overrightarrow{OG}=\\left(\\dfrac{4}{7}(1-k)+\\dfrac{k}{3}\\right)\\vec{a}+\\dfrac{k}{3}\\vec{b}+\\dfrac{k}{3}\\vec{c}$\n\n②K は平面 AMN 上（共面条件・文字 $s$、$t$）：\n$\\overrightarrow{OK}=(1-s-t)\\overrightarrow{OA}+s\\overrightarrow{OM}+t\\overrightarrow{ON}=(1-s-t)\\vec{a}+\\dfrac{s}{2}\\vec{b}+\\dfrac{t}{8}\\vec{c}$\n\n$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ は $1$ 次独立なので、書き表し方はただ $1$ 通り。だから①②の係数どうしが等しく、式が $3$ 本立ちます。$\\vec{b}$ から $\\dfrac{s}{2}=\\dfrac{k}{3}$ より $s=\\dfrac{2k}{3}$、$\\vec{c}$ から $\\dfrac{t}{8}=\\dfrac{k}{3}$ より $t=\\dfrac{8k}{3}$。これを $\\vec{a}$ の式へ：\n\n$\\dfrac{4}{7}(1-k)+\\dfrac{k}{3}=1-\\dfrac{2k}{3}-\\dfrac{8k}{3}=1-\\dfrac{10k}{3}$\n\n$\\dfrac{4}{7}+k\\left(-\\dfrac{4}{7}+\\dfrac{1}{3}+\\dfrac{10}{3}\\right)=1$、$\\ k\\cdot\\dfrac{65}{21}=\\dfrac{3}{7}$、$\\ k=\\dfrac{9}{65}$。\n\nあとは①に戻して $\\vec{a}$ の係数を計算します。$1-k=\\dfrac{56}{65}$ なので $\\dfrac{4}{7}\\cdot\\dfrac{56}{65}=\\dfrac{32}{65}$、また $\\dfrac{k}{3}=\\dfrac{3}{65}$。足して\n\n$\\alpha=\\dfrac{32}{65}+\\dfrac{3}{65}=\\dfrac{35}{65}=\\dfrac{7}{13}$。\n\nついでに見えてしまうことも書いておきます。$k=\\dfrac{9}{65}$ とは $LK:KG=9:56$ ということ。また $\\vec{b}$ と $\\vec{c}$ の係数はどちらも $\\dfrac{k}{3}=\\dfrac{3}{65}$ です。\n\n中心の問いへの部分回答：**空間で交点を出す道は、図の中には無い**。ここは図を描いても位置がつかめないところで、「共線条件で $1$ 文字・共面条件で $2$ 文字・$1$ 次独立で $3$ 本の式」という計算だけが交点まで連れて行ってくれます。",
        },
      ],
      formulaPreview:
        "①(4/7)(1−k) + k/3, k/3, k/3　②1−s−t, s/2, t/8 → s = 2k/3, t = 8k/3, k = 9/65 → α = 32/65 + 3/65 = 7/13",
      figureMarker: "<<M3V_TWO_WAYS_3D>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ四面体 OABC で、M（辺 OB の中点）、N（辺 OC を $ON:NC=1:7$ に内分する点）、G（三角形 ABC の重心）はそのままにして、**L を辺 OA の中点に取り替えます**。\n\n直線 LG と平面 AMN の交点を K とするとき、$\\overrightarrow{OK}$ の **$\\vec{b}$ の係数**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.05263157894736842,
      answerDisplay: "1/19",
      unit: "",
      unknownLabel: "$\\vec{b}$ の係数",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。四面体も、平面 AMN も、重心 G も、交点の作り方も同じ。動いたのは点が $1$ つだけです。前題で立てた $3$ 本の式は、そのまま作れるだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**L が辺 OA のどこにいるか**だけ。前題で立てた $3$ 本の式のうち、L の位置が顔を出していたのはどれだっただろう。",
        },
        {
          layer: 3,
          text: "前題とまったく同じ $2$ 通りの書き方をします。今度は $\\overrightarrow{OL}=\\dfrac{1}{2}\\vec{a}$ なので、①は\n\n$\\overrightarrow{OK}=\\left(\\dfrac{1}{2}(1-k)+\\dfrac{k}{3}\\right)\\vec{a}+\\dfrac{k}{3}\\vec{b}+\\dfrac{k}{3}\\vec{c}$\n\n②は前題と同じ $(1-s-t)\\vec{a}+\\dfrac{s}{2}\\vec{b}+\\dfrac{t}{8}\\vec{c}$。$\\vec{b}$、$\\vec{c}$ の比較から $s=\\dfrac{2k}{3}$、$t=\\dfrac{8k}{3}$ となるのも前題と同じで、変わるのは $\\vec{a}$ の式だけ：\n\n$\\dfrac{1}{2}(1-k)+\\dfrac{k}{3}=1-\\dfrac{10k}{3}$、$\\ \\dfrac{1}{2}+k\\left(-\\dfrac{1}{2}+\\dfrac{1}{3}+\\dfrac{10}{3}\\right)=1$、$\\ k\\cdot\\dfrac{19}{6}=\\dfrac{1}{2}$、$\\ k=\\dfrac{3}{19}$。\n\n$\\vec{b}$ の係数は $\\dfrac{k}{3}=\\dfrac{1}{19}$。（ついでに $\\vec{a}$ の係数は $\\dfrac{1}{2}\\cdot\\dfrac{16}{19}+\\dfrac{1}{19}=\\dfrac{9}{19}$ です。）\n\n中心の問いへの部分回答：**手つきは配置に左右されない**。L がどこにいても、立てる式は $3$ 本・使う条件は共線と共面の $2$ つ。動いた $1$ か所だけが式の $1$ 本を書き換えます。",
        },
      ],
      formulaPreview: "(1/2)(1−k) + k/3 = 1 − 10k/3 → k(19/6) = 1/2 → k = 3/19 → b の係数 = k/3 = 1/19",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "四面体 OABC で、辺 OA を $OL:LA=4:3$ に内分する点を L、辺 OB を $OM:MB=1:7$ に内分する点を M、辺 OC の中点を N とします。\n\n平面 LMN と平面 ABC は、$1$ 本の直線で交わります。その交線上の点 P のうち、$\\overrightarrow{OP}=\\alpha\\vec{a}+\\beta\\vec{b}+\\gamma\\vec{c}$ が $\\alpha=0$ となるものについて、**$\\beta$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -0.16666666666666666,
      answerDisplay: "−1/6",
      unit: "",
      unknownLabel: "$\\beta$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは「直線と平面の交点」を探していました。今度は**平面と平面**が交わります。交わってできるのは点ではなく直線ですが、その上の点が $2$ つの条件を同時に満たすことは変わりません。前題までの書き方は、そのまま使えるだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**満たすべき条件が、$2$ つとも「ある平面の上にある」になった**こと。$\\alpha=0$ が指定されているので、残った文字は $\\beta$ と $\\gamma$ の $2$ つです。条件は何本立つだろう。",
        },
        {
          layer: 3,
          text: "$2$ つの条件を、どちらも係数の言葉に翻訳します。\n\n①平面 ABC 上（step 1 の合言葉）：$\\alpha+\\beta+\\gamma=1$。$\\alpha=0$ だから $\\beta+\\gamma=1$。\n\n②平面 LMN 上（step 2 の形）：$\\overrightarrow{OL}=\\dfrac{4}{7}\\vec{a}$、$\\overrightarrow{OM}=\\dfrac{1}{8}\\vec{b}$、$\\overrightarrow{ON}=\\dfrac{1}{2}\\vec{c}$ なので $\\dfrac{7}{4}\\alpha+8\\beta+2\\gamma=1$。$\\alpha=0$ だから $8\\beta+2\\gamma=1$。\n\n②に $\\gamma=1-\\beta$ を入れて $8\\beta+2-2\\beta=1$、$6\\beta=-1$、$\\beta=-\\dfrac{1}{6}$（このとき $\\gamma=\\dfrac{7}{6}$）。\n\n$\\alpha=0$ で $\\beta+\\gamma=1$ とは、この点が**直線 BC 上**にあるということ。しかも $\\beta$ が負なので、線分 BC の外——C の側へはみ出した位置です。$2$ 平面の交線は、三角形 ABC の外まで伸びています。\n\n中心の問いへの部分回答：**条件は重ねられる**。$1$ つの平面が「係数の和が $1$」、もう $1$ つの平面が別の $1$ 次式——重ねると点が $1$ つに決まり、$1$ つゆるめると直線が残ります。",
        },
      ],
      formulaPreview: "β+γ = 1（平面 ABC・α=0）と 8β+2γ = 1（平面 LMN・α=0）→ 6β = −1 → β = −1/6（γ = 7/6）",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "四面体 OABC について、$\\lvert\\vec{a}\\rvert=3$、$\\lvert\\vec{b}\\rvert=5$、$\\lvert\\vec{c}\\rvert=2$、$\\vec{a}\\cdot\\vec{b}=6$、$\\vec{b}\\cdot\\vec{c}=4$、$\\vec{c}\\cdot\\vec{a}=3$ が分かっています。\n\n辺 BC の中点を D、線分 AD の中点を P とするとき、**$\\overrightarrow{OP}\\cdot\\vec{a}$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 6.75,
      answerDisplay: "27/4",
      unit: "",
      unknownLabel: "$\\overrightarrow{OP}\\cdot\\vec{a}$",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは「どこにあるか」だけを追いかけてきました。今度は長さと角の情報が $6$ つ与えられています。それでも、まず P の居場所を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で書く——そこまでの道は同じだろうか？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**位置を書いたあとに、[内積] の計算がひと続き足された**こと。$\\overrightarrow{OP}$ を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で書いてから $\\vec{a}$ との内積を作ると、与えられた $6$ つの値のうちどれが顔を出すだろう。",
        },
        {
          layer: 3,
          text: "まず位置です。D は BC の中点なので $\\overrightarrow{OD}=\\dfrac{\\vec{b}+\\vec{c}}{2}$、P は AD の中点なので\n\n$\\overrightarrow{OP}=\\dfrac{\\overrightarrow{OA}+\\overrightarrow{OD}}{2}=\\dfrac{1}{2}\\vec{a}+\\dfrac{1}{4}\\vec{b}+\\dfrac{1}{4}\\vec{c}$。\n\n係数の和は $\\dfrac{1}{2}+\\dfrac{1}{4}+\\dfrac{1}{4}=1$ なので、P はたしかに平面 ABC 上にあります（step 1 の合言葉が検算になっています）。\n\nここに $\\vec{a}$ との内積をとると、内積は分配法則と実数倍について式の展開と同じように扱えるので\n\n$\\overrightarrow{OP}\\cdot\\vec{a}=\\dfrac{1}{2}\\lvert\\vec{a}\\rvert^2+\\dfrac{1}{4}(\\vec{b}\\cdot\\vec{a})+\\dfrac{1}{4}(\\vec{c}\\cdot\\vec{a})=\\dfrac{1}{2}\\cdot 9+\\dfrac{1}{4}\\cdot 6+\\dfrac{1}{4}\\cdot 3$\n\n$=\\dfrac{9}{2}+\\dfrac{3}{2}+\\dfrac{3}{4}=\\dfrac{18+6+3}{4}=\\dfrac{27}{4}$。\n\n$\\vec{b}\\cdot\\vec{c}=4$ は一度も使いませんでした——$\\vec{a}$ との内積だから、$\\vec{b}$ と $\\vec{c}$ どうしの関係は効かないのです。中心の問いへの部分回答：**位置を係数に翻訳しておくと、計量はそのまま数の計算になる**。空間で必要な材料は $6$ つの値、そのうちどれが要るかは、何と内積をとるかで決まります。",
        },
      ],
      formulaPreview: "OP = (1/2)a + (1/4)b + (1/4)c（係数の和 1）、OP・a = (1/2)(9) + (1/4)(6) + (1/4)(3) = 27/4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "四面体 OABC で、点 P を $\\overrightarrow{OP}=\\dfrac{1}{2}\\vec{a}+\\dfrac{1}{5}\\vec{b}+\\gamma\\vec{c}$ で定めます。\n\n点 P が**平面 ABC 上にない**ようにしたい。このとき $\\gamma$ は、ある $1$ つの値だけを避ければよいことが分かります。**その避けるべき値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 0.3,
      answerDisplay: "3/10",
      unit: "",
      unknownLabel: "避けるべき $\\gamma$ の値",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "step 1 と比べてみよう。あのときは「平面 ABC 上にある」ことから $\\gamma$ を $1$ つに決めました。今度は反対に「平面 ABC 上に**ない**」ようにしたい。同じ関係を、どちら向きに読めばいいだろう？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**求めるものが「満たすべき値」から「避けるべき値」に裏返った**こと。平面の上に乗ってしまう $\\gamma$ は、いったい何個あるだろう。",
        },
        {
          layer: 3,
          text: "step 1 で見たとおり、P が平面 ABC 上にあることと「$3$ つの係数の和が $1$」は同じことでした。だから\n\nP が平面 ABC 上 $\\iff \\dfrac{1}{2}+\\dfrac{1}{5}+\\gamma=1 \\iff \\gamma=1-\\dfrac{7}{10}=\\dfrac{3}{10}$。\n\n$\\gamma$ の値ごとに P はただ $1$ つ決まり、平面に乗ってしまうのは $\\gamma=\\dfrac{3}{10}$ の $1$ 回だけ。よって「平面 ABC 上にない」は $\\gamma\\ne\\dfrac{3}{10}$、避けるべき値は $\\dfrac{3}{10}$ です。$\\gamma$ がこれより大きければ P は平面より O と反対の側へ、小さければ O のある側へ離れます（$\\gamma=0$ なら係数の和は $\\dfrac{7}{10}$ で、O と同じ側です）。\n\n中心の問いへの部分回答：**条件が $1$ 本の等式だからこそ、外れ方は「たった $1$ つの値を避ける」という形になる**。もしこれが「直線 AB 上にない」だったら、条件は $2$ 本（係数の和が $1$、$\\vec{c}$ の係数が $0$）なので、そのどちらかを破ればよく、避け方の形はもっと込み入ります。",
        },
      ],
      formulaPreview: "平面 ABC 上 ⟺ 1/2 + 1/5 + γ = 1 ⟺ γ = 3/10。平面上にない ⟺ γ ≠ 3/10",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "四面体 OABC で、辺 OA を $OL:LA=4:3$ に内分する点を L、辺 OB の中点を M とします。\n\n直線 LM 上の点 P が平面 ABC 上にあるとき、$\\overrightarrow{LP}=k\\overrightarrow{LM}$ となる **$k$ の値**を求めましょう。",
      answer: -6,
      unit: "",
      unknownLabel: "$k$",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 7 と比べてみよう。あそこでは、$2$ つの平面が交わってできる直線の上の点を探しました。今度は、直線 LM の上の点で平面 ABC に乗るものを探します。何が同じで、何が違う？",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**点が乗っているのが平面ではなく直線 LM** であること。L も M も、O から出る辺の上にあります。そのことが $\\overrightarrow{OP}$ の書き方にどう効いてくるだろう。",
        },
        {
          layer: 3,
          text: "直線 LM 上の点は文字 $1$ つで書けます（共線条件）。$\\overrightarrow{OL}=\\dfrac{4}{7}\\vec{a}$、$\\overrightarrow{OM}=\\dfrac{1}{2}\\vec{b}$ なので\n\n$\\overrightarrow{OP}=(1-k)\\overrightarrow{OL}+k\\overrightarrow{OM}=\\dfrac{4}{7}(1-k)\\vec{a}+\\dfrac{k}{2}\\vec{b}+0\\cdot\\vec{c}$。\n\nこれが平面 ABC 上にある条件は、係数の和が $1$：\n\n$\\dfrac{4}{7}(1-k)+\\dfrac{k}{2}=1$、$\\ \\dfrac{4}{7}-\\dfrac{4k}{7}+\\dfrac{k}{2}=1$、$\\ k\\left(-\\dfrac{8}{14}+\\dfrac{7}{14}\\right)=\\dfrac{3}{7}$、$\\ -\\dfrac{k}{14}=\\dfrac{3}{7}$、$\\ k=-6$。\n\n**$k$ が負**ということは、交点は線分 LM の内側ではなく、M と反対の側へ、LM の $6$ 倍だけ進んだところにあります。実際 $\\overrightarrow{OP}=4\\vec{a}-3\\vec{b}$ で、係数の和は $4-3=1$、$\\vec{c}$ の係数は $0$。つまり P は直線 AB の上、しかも B のはるか向こうです。L も M も四面体の辺の上にあるのに、直線 LM が平面 ABC と出会うのは三角形 ABC のずっと外でした。\n\n**やってしまいがちな誤り**：「平面 ABC 上」と「直線 AB 上」を取り違えること。$3$ 点 A, B, C が一直線上にない限り、この $3$ 点を通る平面はただ $1$ つに決まりますが、$3$ 点を通る直線は**存在しません**。「平面 ABC 上」は係数の和が $1$ という条件 $1$ 本、「直線 AB 上」はそれに加えて $\\vec{c}$ の係数が $0$ という条件がもう $1$ 本——条件の本数が違います。今回 P がたまたま直線 AB 上に来たのは、L と M が $\\vec{c}$ を含まない辺の上にあったからで、はじめから直線 AB を探していたわけではありません。\n\n中心の問いへの答え：**平面の中では「$2$ 方向で書ける」は全員に当てはまる当たり前でした。空間では、それが「平面 ABC 上にいる」という $1$ 本の条件になる**——係数の和が $1$、という形で。そしてこの条件は、線分の内側という気持ちよさを保証してはくれません。式が $k=-6$ と言えば、交点はそこにあるのです。",
        },
      ],
      formulaPreview: "OP = (4/7)(1−k)a + (k/2)b、係数の和 = 1 → 4/7 − 4k/7 + k/2 = 1 → k = −6（交点は線分の外）",
    },
  ],
  derivation: `**中心の問い** ｜ 平面の世界では、どんな点も $\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ と書けるのは**当たり前**だった。空間に出た瞬間、それが「点 P が平面 ABC 上にある**条件**」に変わる——世界が広がると、なぜ当たり前が条件になるのか？ そして直線のときの合言葉「係数の和が $1$」は、平面になっても生きているのか？

────────

**$3$ 点は平面を決める。$4$ つ目の点は、決めてもらえない**

空間に、同じ直線上にはない $3$ 点 A, B, C があるとします。この $3$ 点を通る平面は、必ず、ただ $1$ つに決まります。ところが $4$ つ目の点 P が現れたとき、**P がその平面の上にいるかどうかは分かりません**。

<<M3V_COPLANAR>>

平面の中だけで暮らしていたときのことを思い出してみましょう。平面上に三角形 ABC があれば、平面上のどの点 P についても $\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ となる実数 $s$、$t$ が必ずとれました。とれて当たり前——それは「$2$ 本の $1$ 次独立なベクトルがあれば、平面のどんなベクトルもただ $1$ 通りに表せる」という、平面の住人にとっての空気のような事実でした。

空間に出ると、この空気が消えます。$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ の $2$ 本で作れるのは、A を通る $1$ 枚の平面ぶんだけ。空間には、その平面の外の点がいくらでもあります。だから「$\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ と書けること」は、もはや全員に当てはまる話ではなく、**平面 ABC の上にいる点だけが満たす条件**になります。これを [共面条件] といいます。

**ここが胚細胞**：**世界が広がると、当たり前が条件になる。** 狭い世界では全員が満たしていた性質が、世界を広げた瞬間に「その狭い世界にいること」を言い当てる目印に変わる——数学のあちこちで起きる裏返りが、ここでは目で見える形で起きています。

**始点を O に移すと、合言葉が現れる**

条件を A 始点のままにしておくと、四面体 OABC のように別の基準点があるときに使いにくい。そこで O 始点に書き直します。$\\overrightarrow{AP}=\\overrightarrow{OP}-\\overrightarrow{OA}$ などを使うと

$$\\overrightarrow{OP}=\\overrightarrow{OA}+s(\\overrightarrow{OB}-\\overrightarrow{OA})+t(\\overrightarrow{OC}-\\overrightarrow{OA})=(1-s-t)\\vec{a}+s\\vec{b}+t\\vec{c}$$

$3$ つの係数を足すと $(1-s-t)+s+t=1$。逆に $\\alpha+\\beta+\\gamma=1$ ならば $\\alpha=1-\\beta-\\gamma$ と書き直せて、上の形に戻ります。つまり

$$\\overrightarrow{OP}=\\alpha\\vec{a}+\\beta\\vec{b}+\\gamma\\vec{c}\\ \\text{が平面 ABC 上}\\iff \\alpha+\\beta+\\gamma=1$$

**直線のときと、並べてみる**

[共線条件]（直線 AB 上）と共面条件（平面 ABC 上）を並べると、同じ話が次元を $1$ つ上げただけだと分かります。

| 見るところ | 直線 AB 上（$1$ 次元） | 平面 ABC 上（$2$ 次元） |
|---|---|---|
| 進む向き | $1$ つ（$\\overrightarrow{AB}$） | $2$ つ（$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$） |
| A を始点に | $\\overrightarrow{AP}=k\\overrightarrow{AB}$ | $\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ |
| 動かせる文字 | $1$ つ | $2$ つ |
| O を始点に | $\\overrightarrow{OP}=(1-k)\\vec{a}+k\\vec{b}$ | $\\overrightarrow{OP}=(1-s-t)\\vec{a}+s\\vec{b}+t\\vec{c}$ |
| 係数の和 | $1$ | $1$ |
| 条件の本数 | $2$ 本（和が $1$ ＋ $\\vec{c}$ の係数が $0$） | $1$ 本（和が $1$） |

左と右で違うのは**向きの数と文字の数だけ**。「係数の和が $1$」という合言葉は、形を変えずにそのまま引っ越します。この合言葉は、$1$ 次元の世界にも $2$ 次元の世界にも同じ顔で現れる——だから覚えるべきなのは公式ではなく、「A 始点で書いて、O 始点に直す」という手つきのほうです。

**基準に選んだ $3$ 点が頂点でないときは、和は $1$ にならない**

step 2 で確かめたとおり、平面 LMN（L, M, N は辺の上の点）についても話はまったく同じで、$x+y+z=1$ として

$$\\overrightarrow{OP}=x\\overrightarrow{OL}+y\\overrightarrow{OM}+z\\overrightarrow{ON}$$

と書けることが条件です。ただし $\\overrightarrow{OL}=l\\vec{a}$ のように辺の上の点を $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ で書き直すと、$\\overrightarrow{OP}=p\\vec{a}+q\\vec{b}+r\\vec{c}$ の係数のほうは

$$\\dfrac{p}{l}+\\dfrac{q}{m}+\\dfrac{r}{n}=1$$

という形になります。$p+q+r$ は $1$ ではありません。**合言葉が「和が $1$」の形をとるのは、平面を決める $3$ 点そのものを基準に取ったときだけ**——ここは取り違えの起きやすい場所です。

**直線と平面の交点＝文字 $3$ つ、式 $3$ 本**

この単元の山は、O を通らない直線と、頂点を通らない平面の交点です（step 5）。交点 K を「直線の上の点」として書けば文字が $1$ つ、「平面の上の点」として書けば文字が $2$ つ。合わせて $3$ つの文字が現れますが、$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ が [1次独立] であれば**書き表し方はただ $1$ 通り**なので、$2$ つの表し方の係数どうしが等しいという式が $3$ 本立ちます。文字 $3$ つに式 $3$ 本——解けます。

<<M3V_TWO_WAYS_3D>>

空間では、この計算に代わる道がほとんどありません。平面図形なら補助線を引いて相似で押し切れることもありますが、空間は図を描いても位置関係がつかめない。**計算だけが交点まで連れて行ってくれる**——ベクトルの威力がいちばんはっきり出るのがここです。

**Step の道筋**

- **Step 1**：平面 ABC 上の点は、係数の和が $1$。辺の内分比から $2$ つの係数を読んで、残りを出す
- **Step 2**：平面を決める $3$ 点を辺の上の点に取り替える。合言葉は同じ形で引っ越すが、基準を取り違えない
- **Step 3**：直線 OG と平面 LMN の交点。共線条件と共面条件を同時に立てると点が決まる
- **Step 4**：同じ式を逆から読む。交点の位置を先に決めて、L の内分比を逆算する
- **Step 5（転換点）**：O を通らない直線と、頂点を通らない平面の交点。文字 $3$ つ・式 $3$ 本
- **Step 6**：L だけを動かした別の配置で、同じ手つきをもう一度
- **Step 7**：平面と平面の交線。条件を $2$ 本重ねると点、$1$ 本ゆるめると直線
- **Step 8**：位置を係数に翻訳しておくと、$6$ つの値で計量がそのまま計算になる
- **Step 9**：条件を裏返す。平面の上に「ない」ようにするには、たった $1$ つの値を避ければよい
- **Step 10（山場）**：直線 LM と平面 ABC の交点は、線分のはるか外。式が言えば、そこにある

────────

**もっと深く** — 当たり前が条件になる、ということ

**忘れても導ける**：共面条件を公式として覚える必要はありません。**「A を始点にして $2$ 方向で書く → O 始点に直す」**——この $2$ 手だけ手が覚えていれば、$(1-s-t)+s+t=1$ はその場で出ます。同じ手つきで、直線なら $(1-k)+k=1$。平面を決める $3$ 点が頂点でないときも、まず「その $3$ 点を基準にして和が $1$」と書いてから $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ に翻訳し直せば、$\\dfrac{p}{l}+\\dfrac{q}{m}+\\dfrac{r}{n}=1$ が自分の手から出てきます。

**やってしまいがちな誤り $1$：「平面 ABC 上」と「直線 AB 上」を混同する**。$3$ 点 A, B, C が一直線上になければ、この $3$ 点を通る平面はただ $1$ つに決まります。ところが $3$ 点を通る直線は、一直線上にない限り**存在しません**。「$3$ 点で決まるもの」は平面であって直線ではない、と押さえておくこと。条件の本数も違います——平面 ABC 上は「係数の和が $1$」の $1$ 本、直線 AB 上はそれに「$\\vec{c}$ の係数が $0$」を加えた $2$ 本です。

**やってしまいがちな誤り $2$：どんな $3$ 点を基準にしても「和が $1$」と書いてしまう**。和が $1$ という形は、平面を決める $3$ 点を基準に取ったときの姿です。$\\vec{a}$、$\\vec{b}$、$\\vec{c}$ の係数で書き直したら、和は $1$ ではなくなります（step 2）。

**やってしまいがちな誤り $3$：交点は線分の内側にあるはずだと思い込む**。$k$ が $0$ と $1$ の間に入る保証はどこにもありません。step 10 の $k=-6$ のように、交点が線分のはるか外に出ることはふつうに起きます。図が描けない空間では、この思い込みが命取りになります——**式の答えを、図の感じで却下しない**こと。

**この先の景色**：次の系列では、空間に座標を入れて $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ を成分で書きます。そのあと、この系列で作った「直線と平面の交点」の技が、$xy$ 平面との交点・平面への垂線の足・四面体の体積へとつながっていきます。さらに先では、「係数の和が $1$」の形はアフィン結合と呼ばれ、点の集まりのうち直線・平面・空間といった「まっすぐな部分」を取り出す道具になります。向きの本数が $1$、$2$、$3$ と増えるのに合わせて次元が上がる——この数え方は、大学の線形代数でそのまま使われます。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（空間ベクトル $\\to$ 共面条件 $\\to$ 直線と平面の交点）と、
  「平面の世界では当たり前だったことが、世界が広がったことで条件になる」「共線条件と共面条件を対比させると、いろいろなことが $1$ つから $2$ つになっているのが読み取れる」という着眼を参考。問題の値・場面（四面体の分点の比・$6$ つの値・交点の配置）はすべてオリジナル。

────────

**問いに戻ると**

「世界が広がると、なぜ当たり前が条件になるのか」——**$2$ 本の向きで作れる範囲が、平面の中では全部だったのに、空間ではその一部でしかなくなったから**です。$\\overrightarrow{AP}=s\\overrightarrow{AB}+t\\overrightarrow{AC}$ と書けることは、平面の住人には無条件、空間の住人には「あの平面の上にいます」という自己紹介になります。

「係数の和が $1$ は、平面になっても生きているのか」——**そのままの形で生きています**。直線なら向き $1$ つ・文字 $1$ つ、平面なら向き $2$ つ・文字 $2$ つ。増えたのは向きと文字の数だけで、O 始点に直したときに現れる合言葉は、どちらも「係数の和が $1$」でした。

**当たり前を、条件として書けるようにしておくこと。** それができると、図に描けない空間の交点が、文字 $3$ つと式 $3$ 本の計算に変わります。次の系列では、この空間に座標を入れます。`,
};

/** M3V12: 空間座標（成分で計量する）。
 *  座標を 1 つ足して (a, b, c) にすると、大きさも内積も角も面積も
 *  「平面の式に項を 1 つ足すだけ」で出る。その正体は
 *  (1) 三平方の定理を 2 回重ねること（直方体の対角線）と
 *  (2) 基準の 3 本がたがいに直交していて、内積の展開で交差項が全部消えること。
 *  質的変化 step6 は「足すだけ」が通じない所——平面の面積の近道
 *  (1/2)|a1b2 - a2b1| は、空間では座標平面に落とした「影」の面積しか測っていない。
 *  3 つの値だけで書かれた面積公式（成分の個数を一度も使わない式）だけが生き延びる。
 *  山場 step10 は「3 点が同一直線上」を成分の等式へ翻訳し、成分から座標へ戻す所。
 *
 *  順序対の折り方（背骨 D2-1）：成分・座標は片側だけ
 *  （step1 は z 成分だけ、step3 は 3 つ目の成分だけ、step10 は x 座標だけ）。
 *  大きさは 3 平方数の組（4,4,7→9 と 11,10,2→15）で整数に。角は特別角の度数。
 *  面積は根号の中が平方数（729）になる組を全探索で選び、素朴な流用が外れることを機械で確認した。 */
export const M3V_SPACE_COORD_SERIES: LearnerSeries = {
  id: "math3_vec_space_coord_01",
  title: "空間座標（成分で計量する）",
  subtitle:
    "数Ⅲ・C ベクトルより — 座標を $1$ つ足して $(a,\\ b,\\ c)$ にするだけで、長さも角も面積も計算で出る。直方体の対角線を測る入口から、空間の三角形の面積という山場を越えて、$3$ 点が一直線に並ぶ条件まで $10$ 問。",
  patternId: "M3V12",
  unit: "math_3",
  revelationLabel:
    "**「項が $1$ つ増えるだけ」で済むものと、済まないものがあった**。長さも内積も角も、三平方の定理を $2$ 回重ね、たがいに直交する $3$ 本を基準にしただけで平面の式がそのまま伸びる——けれど**成分の個数に寄りかかった式**（平面の面積の近道）は、空間では影の面積しか測っていない",
  drivingQuestion:
    "座標を $1$ つ足して $(a,\\ b,\\ c)$ にしただけで、大きさも内積も角も面積も、**平面の式に項を $1$ つ足すだけ**で出てしまう——なぜ「足すだけ」で済むのか？ 直方体の対角線に、三平方の定理は何回効いているのか？ そして、**足すだけでは済まない式**は、どこが違うのか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$xyz$ 空間に $2$ 点 P$(-2,\\ -3,\\ 4)$、Q$(2,\\ 1,\\ -3)$ をとります。\n\n空間の点は、$x$ 軸・$y$ 軸・$z$ 軸という**たがいに直角な $3$ 本**の向きの座標で決まります（図）。平面のときと同じように、ベクトル $\\overrightarrow{PQ}$ も $3$ つの数の組で書けます（[成分表示]）。\n\nこの $\\overrightarrow{PQ}$ の **$z$ 成分**を求めましょう（$x$ 成分・$y$ 成分は聞きません）。",
      answer: -7,
      unit: "",
      unknownLabel: "$\\overrightarrow{PQ}$ の $z$ 成分",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "平面のとき、$2$ 点 A, B から $\\overrightarrow{AB}$ の成分をどうやって出しただろう？ 「A から B へ、$x$ の向きにどれだけ動くか」を数で言うには、どちらの座標をどちらの座標から見ればよかった？ $z$ の向きも、まったく同じ見方でいけそうかな。",
        },
        {
          layer: 2,
          text: "見るところは $1$ つだけ——**$z$ の向きに、P から Q へどれだけ動いたか**。$x$ と $y$ の向きは、いまは聞かれていない。動いた向きが $z$ 軸の正の向きと逆だったら、数はどんな顔になるだろう。",
        },
        {
          layer: 3,
          text: "平面のときとまったく同じで、**終点の座標から始点の座標をとります**。$\\overrightarrow{PQ}$ の $z$ 成分は、Q の $z$ 座標 $-3$ から P の $z$ 座標 $4$ をとって $-3 - 4 = -7$。ついでに $x$ 成分は $2 - (-2) = 4$、$y$ 成分は $1 - (-3) = 4$ なので $\\overrightarrow{PQ} = (4,\\ 4,\\ -7)$ です。\n\n**やってしまいがちな誤り**：始点から終点を見て $4 - (-3) = 7$ としてしまうこと。これは $\\overrightarrow{QP}$ の $z$ 成分、つまり [逆ベクトル] のほうの数です。\n\n中心の問いへの最初の部分回答：**座標が $1$ つ増えても、成分の出し方は「終点 $-$ 始点」のまま**。増えたぶんの $z$ を、$x$ や $y$ とまったく同じ扱いで、もう $1$ 行足しただけです。",
        },
      ],
      formulaPreview: "PQ = (2−(−2), 1−(−3), −3−4) = (4, 4, −7)　z 成分は −7",
      figureMarker: "<<M3V_SPACE_COORD>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ $2$ 点 P$(-2,\\ -3,\\ 4)$、Q$(2,\\ 1,\\ -3)$ について、[ベクトルの大きさ] $\\lvert\\overrightarrow{PQ}\\rvert$ を求めましょう。",
      answer: 9,
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{PQ}\\rvert$",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$2$ 点も、成分も同じ。違うのは、聞かれているのが成分ではなく**矢印の長さ**だということ。平面のとき、成分から長さをどうやって出しただろう？ 空間でも、その見方はそのまま通じそうかな。",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**成分の値ではなく、長さ**を聞かれていること。平面では $2$ つの成分だけで長さが決まった。いま、向きは $3$ つある。",
        },
        {
          layer: 3,
          text: "平面では $\\lvert\\vec{a}\\rvert = \\sqrt{a_1^2 + a_2^2}$ でした。空間でも、[三平方の定理] を **$2$ 回**重ねれば同じことができます。\n\n前題で $\\overrightarrow{PQ} = (4,\\ 4,\\ -7)$ でした。まず $x$ と $y$ の向きに進んだぶん（$xy$ 平面に落ちた影）の長さを考えると、その $2$ 乗は $4^2 + 4^2 = 32$。次に、その影と $z$ の向きの進み $-7$ は直角に交わるので、もう一度三平方の定理を当てて $\\lvert\\overrightarrow{PQ}\\rvert^2 = 32 + (-7)^2 = 32 + 49 = 81$。よって $\\lvert\\overrightarrow{PQ}\\rvert = 9$。\n\n途中に出た $\\sqrt{32}$ は整数になりませんが、**$2$ 乗のまま持ち歩けば根号は一度も顔を出しません**。まとめると $\\lvert\\vec{a}\\rvert = \\sqrt{a_1^2 + a_2^2 + a_3^2}$——平面の式に、項が $1$ つ増えただけの形です。\n\n中心の問いへの部分回答：**「項が $1$ つ増えるだけ」の正体は、三平方の定理を $2$ 回重ねたこと**。$z$ 軸が $x$ 軸にも $y$ 軸にも直角だから、$2$ 回目が使えました。",
        },
      ],
      formulaPreview: "|PQ|² = (4² + 4²) + (−7)² = 32 + 49 = 81 → |PQ| = 9",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "空間のベクトル $\\vec{a}$ について、$x$ 成分が $11$、$z$ 成分が $-2$、大きさが $\\lvert\\vec{a}\\rvert = 15$ であることが分かっています。\n\n$\\vec{a}$ の **$y$ 成分**を求めましょう。ただし $y$ 成分は正の数とします。",
      answer: 10,
      unit: "",
      unknownLabel: "$\\vec{a}$ の $y$ 成分",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は成分がぜんぶ分かっていて、長さを聞かれた。今度は長さのほうが先に分かっていて、成分の $1$ つが分からない。向きが入れかわっている——前題の道を、逆からたどれないだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**分からないものが、長さから成分へ移った**こと。前題で $3$ つの成分と長さを結んだ関係そのものは、いまもそっくり成り立っている。",
        },
        {
          layer: 3,
          text: "前題で $\\lvert\\vec{a}\\rvert^2 = a_1^2 + a_2^2 + a_3^2$ でした。この式は、どこが分かっていなくても同じように成り立ちます。$y$ 成分を $y$ とおくと $11^2 + y^2 + (-2)^2 = 15^2$、つまり $121 + y^2 + 4 = 225$。よって $y^2 = 100$ で、$y > 0$ より $y = 10$ です。\n\n$z$ 成分の $-2$ は、$2$ 乗した時点で符号が消えて $4$ になりました。**符号は大きさに効かない**——ここも平面のときと同じです。だからこそ $y = -10$ も式は満たしてしまう。問題文が「正の数」と断っていて、はじめて答えが $1$ つに決まります。\n\n中心の問いへの部分回答：**大きさの式は、どの成分から見ても同じ $1$ 本の関係**。$3$ つの成分と長さのうち、どれか $3$ つが分かれば残り $1$ つが決まります。",
        },
      ],
      formulaPreview: "11² + y² + (−2)² = 15² → y² = 225 − 121 − 4 = 100 → y = 10（y > 0）",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "空間の $2$ つのベクトル $\\vec{u} = (3,\\ -5,\\ 2)$、$\\vec{v} = (4,\\ 6,\\ -1)$ について、[内積] $\\vec{u}\\cdot\\vec{v}$ を求めましょう。",
      answer: -20,
      unit: "",
      unknownLabel: "$\\vec{u}\\cdot\\vec{v}$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは矢印 $1$ 本の長さの話だった。今度は矢印が $2$ 本ある。平面のとき、成分から内積をどうやって出しただろう？ 空間でも、同じ形が使えそうかな。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**矢印が $2$ 本になり、聞かれているのが内積**であること。平面では、それぞれの矢印がもつ成分は $2$ つずつだった。いまは $3$ つずつある。",
        },
        {
          layer: 3,
          text: "平面では $\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2$ でした。空間でも導き方は同じです。$x$ 軸・$y$ 軸・$z$ 軸の向きの、長さ $1$ のベクトルを $\\vec{e}_1$、$\\vec{e}_2$、$\\vec{e}_3$ とおくと $\\vec{u} = 3\\vec{e}_1 - 5\\vec{e}_2 + 2\\vec{e}_3$、$\\vec{v} = 4\\vec{e}_1 + 6\\vec{e}_2 - \\vec{e}_3$。これを分配法則で展開すると、$\\vec{e}_1\\cdot\\vec{e}_1 = \\vec{e}_2\\cdot\\vec{e}_2 = \\vec{e}_3\\cdot\\vec{e}_3 = 1$ の $3$ 項だけが残り、$\\vec{e}_1\\cdot\\vec{e}_2$ のような**交差項は $3$ 本がたがいに直角なので全部 $0$** になります。だから $\\vec{u}\\cdot\\vec{v} = u_1v_1 + u_2v_2 + u_3v_3$。\n\n数を入れると $3\\cdot4 + (-5)\\cdot6 + 2\\cdot(-1) = 12 - 30 - 2 = -20$。\n\n内積が負になったのは、$2$ 本のなす角が鈍角だからです。定義 $\\vec{u}\\cdot\\vec{v} = \\lvert\\vec{u}\\rvert\\lvert\\vec{v}\\rvert\\cos\\theta$ で、負になれるのは $\\cos\\theta$ のところだけですから。\n\n中心の問いへの部分回答：**内積でも「項が $1$ つ増えるだけ」**。増えたのは $u_3v_3$ の $1$ 項で、残りは平面の式そのまま。交差項が消えるのは、基準の $3$ 本がたがいに直交しているからでした。",
        },
      ],
      formulaPreview: "u・v = 3·4 + (−5)·6 + 2·(−1) = 12 − 30 − 2 = −20",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$xyz$ 空間に $3$ 点 A$(-1,\\ 3,\\ 2)$、B$(0,\\ 2,\\ 4)$、C$(1,\\ 4,\\ 3)$ があります。\n\n$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ のなす角 $\\angle BAC$ の大きさを、**度**を単位として求めましょう。",
      answer: 60,
      unit: "",
      unknownLabel: "$\\angle BAC$ の大きさ（度）",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。前題は成分が最初から与えられていた。今度は点の座標から始まり、しかも内積で止まらずその先まで聞かれている。step 1 と前題で歩いた道は、どこまでそのまま使えるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**内積で止めずに、角まで戻すこと**。角と内積を結んでいるのは、成分の式のほうではなく、内積のもともとの定義のほうだ。",
        },
        {
          layer: 3,
          text: "まず step 1 と同じ「終点 $-$ 始点」で $\\overrightarrow{AB} = (1,\\ -1,\\ 2)$、$\\overrightarrow{AC} = (2,\\ 1,\\ 1)$。前題の要領で内積は $1\\cdot2 + (-1)\\cdot1 + 2\\cdot1 = 3$。大きさは $\\lvert\\overrightarrow{AB}\\rvert^2 = 1 + 1 + 4 = 6$、$\\lvert\\overrightarrow{AC}\\rvert^2 = 4 + 1 + 1 = 6$ なので、どちらも $\\sqrt{6}$ です。\n\n内積の定義 $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$ を角について読み直すと $\\cos\\angle BAC = \\dfrac{3}{\\sqrt{6}\\cdot\\sqrt{6}} = \\dfrac{3}{6} = \\dfrac{1}{2}$。$0°$ 以上 $180°$ 以下でこれを満たす角は $\\angle BAC = 60°$。\n\n**同じ答えへ、もう $1$ つの道**：$\\overrightarrow{BC} = (1,\\ 2,\\ -1)$ の大きさも $\\sqrt{6}$ で、三角形 ABC は $3$ 辺が等しい正三角形でした。正三角形の $1$ つの角は $60°$——計算とぴたり合います。\n\n中心の問いへの部分回答：**角も「項が $1$ つ増えるだけ」で出る**。空間だからといって新しい道具は要りません。内積と大きさという、平面と同じ $2$ つで角が決まります。",
        },
      ],
      formulaPreview: "cos∠BAC = 3/(√6·√6) = 1/2 → ∠BAC = 60 度（3 辺とも √6 の正三角形）",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$xyz$ 空間に $3$ 点 A$(-3,\\ 3,\\ 1)$、B$(1,\\ 4,\\ 2)$、C$(3,\\ -2,\\ 3)$ があります。この $3$ 点をふくむ平面は、$xy$ 平面・$yz$ 平面・$zx$ 平面のどれとも平行ではありません（図）。\n\n三角形 ABC の**面積**を求めましょう。答えは既約分数で答えましょう。",
      answer: 27 / 2,
      answerDisplay: "27/2",
      unit: "",
      unknownLabel: "三角形 ABC の面積",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$3$ 点から $2$ 本の矢印を作るところまでは、そっくり同じ。違うのは、聞かれているのが角ではなく面積であること。平面の座標でやったとき、面積はどんな道で出しただろう？ その道は、空間でもそのまま通れるだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**聞かれているのが面積**であること。平面のときに使えた近道は、成分が $2$ つしかない世界のものだった。いま、成分は $3$ つある。",
        },
        {
          layer: 3,
          text: "**やってしまいがちな誤り（この単元の急所）**：平面で使えた $S = \\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ を、そのまま空間へ持ち込むこと。$\\overrightarrow{AB} = (4,\\ 1,\\ 1)$、$\\overrightarrow{AC} = (6,\\ -5,\\ 2)$ で $x$ 成分と $y$ 成分だけを拾うと $\\dfrac{1}{2}\\lvert 4\\cdot(-5) - 1\\cdot6\\rvert = 13$。$y$ と $z$ を拾えば $\\dfrac{7}{2}$、$z$ と $x$ を拾えば $1$——**どの $2$ つを選ぶかで答えが変わってしまいます**。この式が測っていたのは三角形そのものではなく、**座標平面に落ちた影**の面積でした。平面では三角形と影が同じものだったので、気づかずに済んでいたのです。\n\n**通れる道**：$3$ つの値だけで面積を書いた式 $S = \\dfrac{1}{2}\\sqrt{\\lvert\\vec{a}\\rvert^2\\lvert\\vec{b}\\rvert^2 - (\\vec{a}\\cdot\\vec{b})^2}$ を使います。これは $S = \\dfrac{1}{2}\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\sin\\theta$ と $\\sin^2\\theta + \\cos^2\\theta = 1$ から出た式で、**成分が何個あるかを一度も使っていません**。だから次元をまたいでも、そのまま効きます。\n\n数を入れると $\\lvert\\overrightarrow{AB}\\rvert^2 = 16 + 1 + 1 = 18$、$\\lvert\\overrightarrow{AC}\\rvert^2 = 36 + 25 + 4 = 65$、$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 24 - 5 + 2 = 21$。よって $S = \\dfrac{1}{2}\\sqrt{18\\cdot65 - 21^2} = \\dfrac{1}{2}\\sqrt{1170 - 441} = \\dfrac{1}{2}\\sqrt{729} = \\dfrac{27}{2}$。\n\n**確かめの道**：始点を B に取り直しても、同じ三角形です。$\\overrightarrow{BA} = (-4,\\ -1,\\ -1)$、$\\overrightarrow{BC} = (2,\\ -6,\\ 1)$ で $18$、$41$、$-3$ となり、$\\dfrac{1}{2}\\sqrt{18\\cdot41 - (-3)^2} = \\dfrac{1}{2}\\sqrt{729} = \\dfrac{27}{2}$。途中の数はまるで違うのに、根号の中は同じ $729$ に着きます。\n\n中心の問いへの部分回答：**「足すだけ」が通じないのは、成分の個数に寄りかかった式のほう**。$3$ つの値だけで書かれた式は、空間へ出てもそのまま生き延びました。",
        },
      ],
      formulaPreview:
        "S = (1/2)√(18·65 − 21²) = (1/2)√729 = 27/2　（成分の近道 13・7/2・1 はどれも影の面積）",
      figureMarker: "<<M3V_SPACE_TRIANGLE>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$\\vec{a} = (3,\\ 2,\\ -4)$ と $\\vec{b} = (5,\\ -4,\\ c)$ が [垂直] になるような、**$c$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 7 / 4,
      answerDisplay: "7/4",
      unit: "",
      unknownLabel: "$c$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまでは成分がぜんぶ分かっていて、そこから角や面積を出した。今度は角のほうが先に決まっていて、成分の $1$ つが分からない。step 3 で歩いた向きに、もう一度たどれないだろうか。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**角のほうが先に決まっている**こと。しかも、その角はとりわけ特別な角だ。内積の定義のどこが、その角のときだけ特別なことになるだろう？",
        },
        {
          layer: 3,
          text: "内積の定義は $\\vec{a}\\cdot\\vec{b} = \\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\cos\\theta$。$\\theta = 90°$ のとき $\\cos 90° = 0$ なので、（どちらも $\\vec{0}$ でないとき）**$2$ 本が垂直であることと、内積が $0$ であることは同じ**です。これは平面でも空間でも変わりません。\n\nそこで step 4 の要領で内積を $c$ の式にすると $3\\cdot5 + 2\\cdot(-4) + (-4)\\cdot c = 15 - 8 - 4c = 7 - 4c$。これが $0$ になるのは $c = \\dfrac{7}{4}$。\n\n確かめ：$\\vec{b} = \\left(5,\\ -4,\\ \\dfrac{7}{4}\\right)$ として $15 - 8 - 7 = 0$ です。\n\nこの問題が「垂直ですか」ではなく「垂直になる $c$ は」と聞いているのには、わけがあります。前者は答えが $0$ に決まっていて、どんな矢印を持ってきても値が動かない。後者は、**垂直という図形の条件が、$c$ という $1$ つの数に翻訳されている**のです。\n\n中心の問いへの部分回答：**図形の条件が、成分についての $1$ 次方程式になる**。空間でも項が $1$ つ増えるだけで、解き方は平面とそっくり同じでした。",
        },
      ],
      formulaPreview: "3·5 + 2·(−4) + (−4)c = 7 − 4c = 0 → c = 7/4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ $\\vec{a} = (3,\\ 2,\\ -4)$ と、$\\vec{c} = (x,\\ -5,\\ 10)$ が**平行**である（$\\vec{c} = k\\vec{a}$ となる実数 $k$ がある）とき、**$x$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: -15 / 2,
      answerDisplay: "−15/2",
      unit: "",
      unknownLabel: "$x$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$\\vec{a}$ は同じ。違うのは、$2$ 本の関係が垂直ではなく平行だということ。前題では「かたむきが直角」を式に翻訳した。今度の関係は、成分の上でどんな形に見えるだろう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $1$ つ——**関係が垂直から平行へ**移ったこと。垂直の条件は式 $1$ 本で言えた。平行のほうは、$3$ つの成分それぞれについて何か言っている。",
        },
        {
          layer: 3,
          text: "平行とは、片方がもう片方の実数倍だということ、つまり $\\vec{c} = k\\vec{a}$ です。成分で書くと $x = 3k$、$-5 = 2k$、$10 = -4k$ の $3$ 本が同時に成り立ちます。\n\n$k$ が読める $2$ 本から先に決めましょう。$-5 = 2k$ より $k = -\\dfrac{5}{2}$、$10 = -4k$ からも $k = -\\dfrac{5}{2}$——$2$ 本が同じ $k$ を指しているので、この $2$ 方向については確かに比がそろっています。残る $1$ 本に入れて $x = 3\\cdot\\left(-\\dfrac{5}{2}\\right) = -\\dfrac{15}{2}$。\n\n確かめ：$-\\dfrac{5}{2}(3,\\ 2,\\ -4) = \\left(-\\dfrac{15}{2},\\ -5,\\ 10\\right)$ です。\n\n**空間ならではの注意**：平面では成分が $2$ つなので、$k$ を消して $a_1c_2 - a_2c_1 = 0$ という $1$ 本の式にまとめられました。空間では条件が $3$ 本になり、$1$ 本にはまとまりません。だから $k$ を経由するのがいちばん確かです。\n\n中心の問いへの部分回答：**増えた $1$ 項は、条件も $1$ 本増やす**。垂直（内積が $0$）は $1$ 本のままなのに、平行は $2$ 本から $3$ 本になりました。「足すだけ」で済むものと済まないものの境目が、ここにも顔を出しています。",
        },
      ],
      formulaPreview: "c = ka：−5 = 2k・10 = −4k より k = −5/2、x = 3·(−5/2) = −15/2",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$\\vec{p} = (4,\\ -3,\\ 12)$ に真上から光を当てて、$xy$ 平面に影を落とします。この影のベクトル（$z$ 成分を $0$ にしたベクトル）を $\\vec{q} = (4,\\ -3,\\ 0)$ とします。\n\n$\\vec{p}$ と $\\vec{q}$ のなす角を $\\theta$ とするとき、**$\\cos\\theta$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 13,
      answerDisplay: "5/13",
      unit: "",
      unknownLabel: "$\\cos\\theta$",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。ここまで、角も内積も成分から出してきた。今度の相手は、自分自身の影。もとの矢印と影とで、成分のどこが同じで、どこが違うだろう？",
        },
        {
          layer: 2,
          text: "前題までと変わったのは $1$ つ——**$2$ 本のうち片方が、もう片方から作られている**こと。影は、もとの矢印の成分のうち $2$ つをそのまま持っていて、残る $1$ つだけを手放している。",
        },
        {
          layer: 3,
          text: "step 5 とまったく同じ道で出ます。まず内積：$\\vec{p}\\cdot\\vec{q} = 4\\cdot4 + (-3)\\cdot(-3) + 12\\cdot0 = 16 + 9 = 25$。次に大きさ：$\\lvert\\vec{p}\\rvert^2 = 16 + 9 + 144 = 169$ で $\\lvert\\vec{p}\\rvert = 13$、$\\lvert\\vec{q}\\rvert^2 = 16 + 9 = 25$ で $\\lvert\\vec{q}\\rvert = 5$。よって $\\cos\\theta = \\dfrac{25}{13\\cdot5} = \\dfrac{5}{13}$。\n\n**ここで見えてくること**：内積 $25$ は、影の長さの $2$ 乗 $\\lvert\\vec{q}\\rvert^2$ とぴったり同じでした。だから $\\cos\\theta = \\dfrac{\\lvert\\vec{q}\\rvert^2}{\\lvert\\vec{p}\\rvert\\lvert\\vec{q}\\rvert} = \\dfrac{\\lvert\\vec{q}\\rvert}{\\lvert\\vec{p}\\rvert}$——**影の長さ $\\div$ もとの長さ**が、そのまま $\\cos$ になります。step 2 の直方体で言えば、底面の対角線と、空間の対角線の長さの比です。\n\nこの問題では大きさが両方とも整数になりましたが、それは $16 + 9 = 25$ と $25 + 144 = 169$ がどちらも平方数だったからで、たまたまではなく、そう作ってあります。\n\n中心の問いへの部分回答：**内積の「影で測る」という顔が、空間でははっきり目に見える**。$z$ 成分を $0$ にするという成分の操作が、光を当てて影を落とすという図形の操作そのものでした。",
        },
      ],
      formulaPreview: "cosθ = 25/(13·5) = 5/13　（＝影の長さ 5 ÷ もとの長さ 13）",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$xyz$ 空間に $3$ 点 D$(x,\\ -3,\\ -5)$、E$(-3,\\ 2,\\ 5)$、F$(3,\\ -2,\\ -3)$ があります。\n\nこの $3$ 点が**同一直線上にある**とき、**D の $x$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: 9 / 2,
      answerDisplay: "9/2",
      unit: "",
      unknownLabel: "D の $x$ 座標",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "step 8 と比べてみよう。あのときは、矢印 $2$ 本が平行になる条件を成分で書いた。今度は点が $3$ つ並んでいる。「$3$ 点が同じ直線の上にある」を、矢印の言葉に言いかえられないだろうか？ そして、使える $2$ 点はどれとどれだろう？",
        },
        {
          layer: 2,
          text: "step 8 と変わったのは $1$ つ——**与えられているのが矢印ではなく点**であること。分からない数がまぎれこんでいるのは、$3$ 点のうちの $1$ つだけだ。",
        },
        {
          layer: 3,
          text: "$3$ 点が同一直線上にあることは、そこから作った $2$ 本の矢印が平行であることと同じ——[共線条件] です。\n\nここで効くのが、**どの $2$ 点から始めるか**。D には分からない数がまぎれているので、座標がぜんぶ分かっている E と F を先に使います。$\\overrightarrow{EF} = (3 - (-3),\\ -2 - 2,\\ -3 - 5) = (6,\\ -4,\\ -8)$。\n\nD がこの直線の上にあるということは、$\\overrightarrow{ED} = k\\overrightarrow{EF}$ となる実数 $k$ があるということ。step 8 と同じで、$k$ が読める成分から決めます。$y$ 成分で $-3 - 2 = -4k$ より $k = \\dfrac{5}{4}$。$z$ 成分でも $-5 - 5 = -8k$ より $k = \\dfrac{5}{4}$——同じ $k$ を指しているので、D は確かに直線 EF 上にあります。\n\n最後がこの問題の落とし穴です。$\\overrightarrow{ED}$ の $x$ **成分**は $6k = 6\\cdot\\dfrac{5}{4} = \\dfrac{15}{2}$。けれど聞かれているのは D の $x$ **座標**ですから、始点 E の $x$ 座標を足し戻して $x = -3 + \\dfrac{15}{2} = \\dfrac{9}{2}$。\n\n確かめ：D$\\left(\\dfrac{9}{2},\\ -3,\\ -5\\right)$ として $\\overrightarrow{ED} = \\left(\\dfrac{15}{2},\\ -5,\\ -10\\right) = \\dfrac{5}{4}(6,\\ -4,\\ -8)$。$k = \\dfrac{5}{4}$ は $1$ より大きいので、D は線分 EF の外、F の向こう側にあります——**同一直線上は、$2$ 点のあいだとはかぎりません**。\n\n中心の問いへの答え：**空間でも、図形の条件はぜんぶ成分の等式に翻訳できた**。「同一直線上」という、空間では目で確かめようのない条件でさえ、$2$ 本の成分で $k$ を決め、$3$ 本目で確かめるという数の作業に変わります。座標が $1$ つ増えたぶん条件も $1$ 本増えましたが、増えた $1$ 本は答えを決めるためではなく、**答えが正しいことを保証するために**働いていました。",
        },
      ],
      formulaPreview:
        "EF = (6, −4, −8)、ED = kEF：−5 = −4k より k = 5/4、x = −3 + 6·(5/4) = 9/2",
    },
  ],
  derivation: `**中心の問い** ｜ 座標を $1$ つ足して $(a,\\ b,\\ c)$ にしただけで、大きさも内積も角も面積も、**平面の式に項を $1$ つ足すだけ**で出てしまう——なぜ「足すだけ」で済むのか？ 直方体の対角線に、三平方の定理は何回効いているのか？ そして、**足すだけでは済まない式**は、どこが違うのか？

────────

**高さを $1$ 本、直角に立てる**

見なれた $xy$ 座標平面に、「高さ」を表す軸をもう $1$ 本足します。$x$ 軸とも $y$ 軸とも直角になるように $z$ 軸をとると、空間のどんな点も $(a,\\ b,\\ c)$ という **$3$ つの実数の組**でただ $1$ 通りに書けます。これが空間座標です。$x$ 軸と $y$ 軸をふくむ平面を $xy$ 平面、$y$ 軸と $z$ 軸をふくむ平面を $yz$ 平面、$z$ 軸と $x$ 軸をふくむ平面を $zx$ 平面といいます。

矢印のほうも同じで、始点を原点に置きなおしたときの終点の座標をとって $\\vec{a} = (a_1,\\ a_2,\\ a_3)$ と書きます。$2$ 点から成分を出すときは、平面のときとまったく同じ「終点 $-$ 始点」（step 1）。

<<M3V_SPACE_COORD>>

**なぜ「項を $1$ つ足すだけ」で済むのか（その一）——三平方の定理を $2$ 回**

$\\vec{a} = (a_1,\\ a_2,\\ a_3)$ の大きさは、上の図の点線でできる直方体の、対角線の長さです。ここに [三平方の定理] が **$2$ 回**効いています。

$1$ 回目は底面。$x$ の向きの進み $a_1$ と $y$ の向きの進み $a_2$ は直角に交わるので、底面の対角線の長さの $2$ 乗は $a_1^2 + a_2^2$。$2$ 回目は縦。その底面の対角線と、$z$ の向きの進み $a_3$ もまた直角に交わるので、

$$\\lvert\\vec{a}\\rvert^2 = (a_1^2 + a_2^2) + a_3^2 = a_1^2 + a_2^2 + a_3^2$$

$2$ 回目が使えるのは、**$z$ 軸が $x$ 軸にも $y$ 軸にも直角だから**です。ここが効いています。もし $z$ 軸が斜めに立っていたら、$2$ 回目の三平方は使えず、この式は成り立ちません。

途中の底面の対角線は、たいてい整数になりません（step 2 では $\\sqrt{32}$ でした）。それでも **$2$ 乗のまま持ち歩けば根号は一度も顔を出さない**——これは平面のときから続いている手つきです。

**なぜ「項を $1$ つ足すだけ」で済むのか（その二）——交差項が全部消える**

内積のほうも同じ理由です。$x$、$y$、$z$ の向きの長さ $1$ のベクトルを $\\vec{e}_1$、$\\vec{e}_2$、$\\vec{e}_3$ とおくと、$\\vec{a} = a_1\\vec{e}_1 + a_2\\vec{e}_2 + a_3\\vec{e}_3$、$\\vec{b} = b_1\\vec{e}_1 + b_2\\vec{e}_2 + b_3\\vec{e}_3$。これを分配法則で展開すると $9$ 項出ますが、

- $\\vec{e}_1\\cdot\\vec{e}_1 = \\vec{e}_2\\cdot\\vec{e}_2 = \\vec{e}_3\\cdot\\vec{e}_3 = 1$ なので、同じ向きどうしの $3$ 項は係数だけが残り、
- $\\vec{e}_1\\cdot\\vec{e}_2 = \\vec{e}_2\\cdot\\vec{e}_3 = \\vec{e}_3\\cdot\\vec{e}_1 = 0$ なので、**残り $6$ 項の交差項はまるごと消えます**。

$$\\vec{a}\\cdot\\vec{b} = a_1b_1 + a_2b_2 + a_3b_3$$

**ここが胚細胞**：「項が $1$ つ増えるだけ」の正体は、**基準にとった $3$ 本がたがいに直交していること**、ただそれだけです。直交しているから三平方が $2$ 回重ねられ、直交しているから交差項が消える。$3$ 本が斜めなら、どちらも起きません。そして同じ理由から、基準が $4$ 本、$5$ 本、$n$ 本になっても、たがいに直交していれば式は同じ形のまま伸びていきます。

**角も面積も、$3$ つの値だけで決まる**

大きさと内積が出れば、あとは平面のときと同じ道具立てです。$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ という $3$ つの値さえそろえば、

$$\\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert},\\qquad S = \\frac{1}{2}\\sqrt{\\lvert\\vec{a}\\rvert^2\\lvert\\vec{b}\\rvert^2 - (\\vec{a}\\cdot\\vec{b})^2}$$

で角も三角形の面積も出ます（step 5・step 6）。空間には「傾き」も「$y$ 切片」もなく、図もろくに描けないのに、計量だけは平面と同じ顔で進みます。

**「足すだけ」が通じないところ**

<<M3V_SPACE_TRIANGLE>>

ところが step 6 で、通じないものに出会いました。平面で使えた面積の近道 $S = \\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ です。これを空間に持ち込むと、**どの $2$ 成分を拾うかで答えが変わってしまいます**。理由ははっきりしていて、この式が測っていたのは三角形そのものではなく、**座標平面に落ちた影**の面積だったから。平面では三角形と影が同じものだったので、区別する必要がなかっただけなのです。

生き延びたほうの式（$3$ つの値で書いた面積公式）は、$S = \\dfrac{1}{2}\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\sin\\theta$ と $\\sin^2\\theta + \\cos^2\\theta = 1$ から出ていて、**成分が何個あるかを一度も使っていません**。次元をまたげるかどうかの分かれ目は、そこにありました。

同じ境目は平行条件にもあります（step 8）。平面では $k$ を消して $1$ 本の式にまとめられたのに、空間では条件が $3$ 本になり、$1$ 本にはまとまりません。$2$ 本で $k$ が決まり、$3$ 本目が検算になる——この形は、$3$ 点が同一直線上に並ぶ条件（step 10）でもそのまま働きました。

**Step の道筋**

- **Step 1**：$2$ 点から $z$ 成分。「終点 $-$ 始点」は座標が増えても変わらない
- **Step 2**：直方体の対角線。三平方の定理が $2$ 回効いている
- **Step 3**：長さと $2$ 成分から、残る $1$ 成分を逆算。符号は $2$ 乗で消える
- **Step 4**：$3$ 項の内積。交差項が消えるのは基準が直交しているから
- **Step 5**：$3$ 点からなす角。内積と大きさだけで角が決まる
- **Step 6（山場・転換点）**：空間の三角形の面積。平面の近道は影しか測っていない
- **Step 7〜8**：垂直になる成分・平行になる成分。条件は $1$ 本と $3$ 本
- **Step 9**：$xy$ 平面に落ちた影とのなす角。内積の「影で測る」顔が目に見える
- **Step 10（山場）**：$3$ 点が同一直線上に並ぶ条件。成分で $k$ を決め、座標へ戻す

────────

**もっと深く** — 影の面積には、三平方の定理がもう一度かくれている

**忘れても導ける**：空間の $3$ つの式は、どれも覚えるものではありません。大きさは**直方体を描いて三平方を $2$ 回**、内積は **$\\vec{e}_1,\\vec{e}_2,\\vec{e}_3$ で書いて分配法則**（交差項は直交だから $0$）、面積は **$\\dfrac{1}{2}\\lvert\\vec{a}\\rvert\\lvert\\vec{b}\\rvert\\sin\\theta$ に $\\sin^2\\theta = 1 - \\cos^2\\theta$ を入れる**。この $3$ つの手つきさえ残っていれば、式はその場で作り直せます。

**やってしまいがちな誤り $1$：平面の面積の近道を空間へ持ち込む**。step 6 で見たとおり、$\\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ は影の面積です。見分け方は簡単で、**その式が「成分が $2$ つしかないこと」に寄りかかっていないか**を見ればよい。寄りかかっている式は、空間では別のものを測り始めます。

**やってしまいがちな誤り $2$：成分と座標を取りちがえる**。$(4,\\ -3,\\ 12)$ が点の場所を指しているのか、矢印の「どちらへ・どれだけ」を指しているのかは、記号の形では区別できません。step 10 の落とし穴もここで、$\\overrightarrow{ED}$ の $x$ 成分を出したところで止めると、答えは始点のぶんだけずれます。

**やってしまいがちな誤り $3$：同一直線上を「あいだ」だと思う**。step 10 の $k$ は $1$ より大きく、D は線分 EF の外にありました。空間では図が描けないぶん、「だいたいこのあたり」という感覚が当てになりません。

**影の面積には、三平方の定理がもう一度かくれている**：step 6 の三角形を $3$ つの座標平面に落とした影の面積は、順に $13$、$\\dfrac{7}{2}$、$1$ でした。この $3$ つを $2$ 乗して足すと $169 + \\dfrac{49}{4} + 1 = \\dfrac{729}{4}$。そして本当の面積 $\\dfrac{27}{2}$ の $2$ 乗も $\\dfrac{729}{4}$ です。**$3$ つの影の面積の $2$ 乗の和が、本体の面積の $2$ 乗に等しい**——長さについての三平方の定理が、面積の世界でもう一度出てきた形です（$18$ 世紀のド・グアの定理）。「平面の近道が空間で外れる」のは、たった $1$ 枚の影しか見ていなかったからでした。

**この先の景色**：ここまでは点と点のあいだの計量でした。次に来るのは、空間の直線と平面そのものです。空間の直線は「始点 $+\\ t\\ \\times$ 方向」という $1$ 本の式で走り、平面は $2$ 文字で走ります。図が描けない世界でも、この $2$ つの部品と「内積が $0$」だけで、直線と $xy$ 平面の交点も、点から直線に下ろした垂線の足も、四面体の体積も決まってしまいます。さらに先では、成分が $4$ つ、$n$ つになっても同じ式が生き延びること（$n$ 次元ユークリッド空間）を見ます。長さと角を「成分の積の和」で定義してしまう、という大学の線形代数のやり方は、この系列で見た「たがいに直交する基準」の考えをそのまま押し進めたものです。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（空間座標 $\\to$ 空間ベクトルの成分表示 $\\to$ 大きさと内積 $\\to$ $3$ 点からなす角と面積）と、「どの式も平面ベクトルのときの結果を自然に拡張したもの」「『平面』が『空間』になっても、基本的な考え方は何一つ変わらない」という着眼を参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「なぜ『足すだけ』で済むのか」——**基準にとった $3$ 本が、たがいに直交しているから**です。直交しているから三平方の定理を $2$ 回重ねられて大きさの式に項が $1$ つ増え、直交しているから内積の展開で交差項が全部消えて、こちらも項が $1$ つ増えるだけで済みました。「直方体の対角線に三平方は何回効いているか」の答えは **$2$ 回**。そしてその $2$ 回目を許しているのが、$z$ 軸の直角です。

「足すだけでは済まない式はどこが違うのか」——**成分の個数に寄りかかっている**かどうかです。$\\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ は成分が $2$ つの世界の式で、空間では影の面積になってしまいました。いっぽう $3$ つの値だけで書かれた面積公式は、成分の個数を一度も使っていないので、そのまま生き延びます。

**次元が $1$ つ増えても、たがいに直交する基準を選ぶかぎり、計量は同じ顔をしている。** 空間には図がありません。それでも成分の等式だけで、長さも角も面積も、$3$ 点が一直線に並ぶことさえ決められました。次の系列では、その手つきのまま、空間の直線と平面そのものへ踏み出します。`,
};

/** M3V13: 空間の直線と平面（交点・垂線の足・体積）。数Ⅲ・C 第9章・系列13＝章の閉じ石。
 *  背骨は docs/math3c_vector_design.md「系列13」。
 *
 *  空間では、直線も平面も「正確な図」には描けない。それでも
 *  直線は 1 文字（始点＋t×方向）、平面は 2 文字（OA + sAB + tAC）で走り、
 *  垂直は内積 = 0——この 3 つの部品だけで、交点も垂線の足も四面体の体積も決まる。
 *  質的変化 step6 は「平面に垂直」が垂直条件 2 本の連立になる瞬間（図では見えない）。
 *  山場 step10 は、底面のとり方を取り替えると高さが z そのものになる逆算。
 *
 *  値の設計（すべてオリジナル。原典 練習問題19 の A(4,4,1) B(−4,−8,−3) C(6,6,5)・
 *  AB=(−8,−12,−4)・t=±1/4・P(2,1,0)・H(6,7,2)、練習問題20 の A(2,1,−3) B(3,1,−2)
 *  C(4,3,−2)・(1,0,1)・(2,2,1)・s=2,t=−1・H(2,−1,−2)・面積 3/2・|OH|=3・体積 3/2 は
 *  ひとつも使わない）：
 *    直線 l ＝ 点 K(−1, −3, 3) を通り d = (3, 2, 6) に平行（|d|^2 = 49）
 *    直線 m ＝ 同じ K を通り e = (3, 2, p)（step3 の逆）・通ってほしい点 R(2, −1, −2)
 *    直線外の点 T(5, 3, 5)、垂線の足 M（step4・5）
 *    平面 ABC ＝ A(−5, −3, 0)、B(1, 3, 0)、C(2, 2, −4)、原点からの垂線の足 H
 *    step10 の頂点 D(−3, 5, z)
 *  答えはすべて有理数（無理数を出さない）。大きさは 2 乗のまま提出する。 */
export const M3V_SPACE_LINE_SERIES: LearnerSeries = {
  id: "math3_vec_space_line_01",
  title: "空間の直線と平面（交点・垂線の足・体積）",
  subtitle:
    "数Ⅲ・C ベクトルより — 空間の直線は、正確な図には描けない。それでも $1$ つの文字で座標平面との交点をつかむ入口から、底面をとり替えて四面体の高さを逆算する山場まで $10$ 問。",
  patternId: "M3V13",
  unit: "math_3",
  revelationLabel:
    "**図が描けなくても、式のほうは見えている**。直線は $1$ 文字、平面は $2$ 文字で走り、「垂直」は内積 $=0$——この $3$ つの部品だけで、交点も垂線の足も体積も決まってしまう",
  drivingQuestion:
    "空間では、直線を**正確な図に描くことができない**。それでも「始点 ＋ $t$ × 方向」という $1$ 本の式と「内積 $=0$」だけで、直線と平面の交点も、垂線の足も、四面体の体積も**計算だけで**決まる——図が描けない世界で、式は何を代わりに見ているのだろうか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$xyz$ 空間に、点 K$(-1,\\ -3,\\ 3)$ を通り、$\\vec{d} = (3,\\ 2,\\ 6)$ に平行な直線 $\\ell$ があります（$(3,\\ 2,\\ 6)$ は点の座標ではなく、ベクトルの成分です）。原点を O とすると、$\\ell$ 上の点 P は、実数 $t$ を使って\n\n$\\overrightarrow{OP} = \\overrightarrow{OK} + t\\vec{d}$\n\nと表せます（[共線条件] で見た「始点ベクトル ＋ 方向ベクトル」の形が、成分 $3$ つになっただけです）。\n\nこの直線 $\\ell$ は、$xy$ 平面（$z$ 座標が $0$ である点の全体）をちょうど $1$ 点で突き抜けます。その交点 P の **$x$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: -5 / 2,
      answerDisplay: "−5/2",
      unit: "",
      unknownLabel: "P の $x$ 座標",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$xy$ 平面の上に乗っている点は、$3$ つの座標のうちどれが決まっているだろう？ そして直線 $\\ell$ 上の点は、どれも $t$ という $1$ つの数で名前がついている。いま探している P は、そのうちのどんな $t$ の点だろうか。",
        },
        {
          layer: 2,
          text: "まず見るところは $1$ つだけ——**$z$ 座標**です。$\\overrightarrow{OP}$ の $z$ 成分が $0$ になる $t$ は、たった $1$ つに決まります。$x$ 座標を出すのは、その $t$ が見つかってからです。",
        },
        {
          layer: 3,
          text: "ベクトルの実数倍は成分をそれぞれ何倍かすることなので、$\\overrightarrow{OP} = \\overrightarrow{OK} + t\\vec{d} = (-1 + 3t,\\ -3 + 2t,\\ 3 + 6t)$。\n\nP が $xy$ 平面上にあるのは $z$ 座標が $0$ のとき、つまり $3 + 6t = 0$ から $t = -\\dfrac{1}{2}$。このときの $x$ 座標は $-1 + 3\\cdot\\left(-\\dfrac{1}{2}\\right) = -\\dfrac{5}{2}$ です。\n\n図は「何となくこんな感じ」で十分でした——直線が平面を突き抜けるようすが分かればよく、正確に描く必要はありません。中心の問いへの最初の部分回答：**空間の直線は図に描けなくても、$t$ を $1$ つ含む $3$ つの式として、まるごと手のうちにある**。「$xy$ 平面と交わる」という図形の言葉が、「$z$ 成分 $= 0$」という式 $1$ 本に翻訳されました。",
        },
      ],
      formulaPreview: "OP = (−1+3t, −3+2t, 3+6t)、z 成分 3+6t = 0 より t = −1/2、x 座標は −5/2",
      figureMarker: "<<M3V_LINE_PARAM_3D>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ直線 $\\ell$（点 K$(-1,\\ -3,\\ 3)$ を通り $\\vec{d} = (3,\\ 2,\\ 6)$ に平行）は、$yz$ 平面（$x$ 座標が $0$ である点の全体）も、ちょうど $1$ 点で突き抜けます。\n\nその交点 Q の **$y$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: -7 / 3,
      answerDisplay: "−7/3",
      unit: "",
      unknownLabel: "Q の $y$ 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。直線はそのまま。違うのは、突き抜ける相手の平面だけ。前題では $3$ つの座標のうち $1$ つが $0$ だと分かっていた。今度は、どの座標が $0$ になるだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$0$ になる座標が $z$ から $x$ に替わった**こと $1$ つ。$t$ を決める式がどれになるかが入れかわるだけで、そのあとの手つきは前題とそっくり同じです。",
        },
        {
          layer: 3,
          text: "前題と同じ形で $\\overrightarrow{OQ} = (-1 + 3t,\\ -3 + 2t,\\ 3 + 6t)$。Q が $yz$ 平面上にあるのは $x$ 座標が $0$ のとき、つまり $-1 + 3t = 0$ から $t = \\dfrac{1}{3}$。このときの $y$ 座標は $-3 + 2\\cdot\\dfrac{1}{3} = -\\dfrac{7}{3}$ です。\n\n前題と今題で、使った式はまったく同じ $1$ 本でした。中心の問いへの部分回答：**どの座標平面と交わるかは、$t$ を決める式にどの成分を選ぶか、という違いでしかない**。図の上では「別の面を突き抜ける」という別の出来事に見えるのに、式の上では選ぶ行が変わるだけです。",
        },
      ],
      formulaPreview: "OQ = (−1+3t, −3+2t, 3+6t)、x 成分 −1+3t = 0 より t = 1/3、y 座標は −7/3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "こんどは、直線のほうが決まっていません。\n\n同じ点 K$(-1,\\ -3,\\ 3)$ を通り、$\\vec{e} = (3,\\ 2,\\ p)$ に平行な直線 $m$ を考えます（$x$ 成分と $y$ 成分は $\\vec{d}$ と同じで、$z$ 成分 $p$ だけが分かっていません）。\n\nこの直線 $m$ が点 R$(2,\\ -1,\\ -2)$ を通るとき、**$p$ の値**を求めましょう。",
      answer: -5,
      unit: "",
      unknownLabel: "$p$",
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までと比べてみよう。これまでは直線が先に決まっていて、通る点のほうを探した。今度は逆で、通ってほしい点が先に決まっていて、直線のほうが決まっていない。前題までに書いた式を、どちら向きに読むことになるだろうか。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**分からないものが方向ベクトルの側に移った**こと $1$ つ。R が $m$ 上にあるということは、R が「ある $t$ の点」として書けるということ。その $t$ は、$z$ 成分をまだ見なくても決まります。",
        },
        {
          layer: 3,
          text: "$m$ 上の点は $\\overrightarrow{OK} + t\\vec{e} = (-1 + 3t,\\ -3 + 2t,\\ 3 + pt)$ と書けます。これが R$(2,\\ -1,\\ -2)$ と一致すればよいので、まず $x$ 座標から $-1 + 3t = 2$、$t = 1$。$y$ 座標からも $-3 + 2t = -1$、$t = 1$——$2$ つが同じ $t$ を指したので、R はたしかにこの向きの直線に乗れます。あとは $z$ 座標で $3 + p\\cdot 1 = -2$、よって $p = -5$。\n\n前題までとまったく同じ $1$ 本の式を、こんどは下から読み上げただけでした。中心の問いへの部分回答：**式は、どこを未知にするかを取り替えても壊れない**。図では「直線を傾ける」という別の操作に見えるのに、式では文字の置き場所が動いただけです。",
        },
      ],
      formulaPreview: "(−1+3t, −3+2t, 3+pt) = (2, −1, −2)。x から t = 1、y からも t = 1、z から 3+p = −2、p = −5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "直線 $\\ell$（点 K$(-1,\\ -3,\\ 3)$ を通り $\\vec{d} = (3,\\ 2,\\ 6)$ に平行）に戻ります。\n\n$\\ell$ 上にない点 T$(5,\\ 3,\\ 5)$ から $\\ell$ に垂線を下ろし、その足（$\\ell$ と交わる点）を M とします。M は $\\ell$ 上の点なので $\\overrightarrow{OM} = \\overrightarrow{OK} + t\\vec{d}$ と書けます。\n\nこのときの **$t$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 6 / 7,
      answerDisplay: "6/7",
      unit: "",
      unknownLabel: "$t$",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題までは「$xy$ 平面の上にある」「点 R を通る」という条件で $t$ が決まった。今度の条件は「T と M を結ぶ矢印が、直線の向きと [垂直]」。図形の「垂直」を、これまで何の言葉に言いかえてきただろうか。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは、**$t$ を決める条件が「垂直」になった**こと $1$ つ。$\\overrightarrow{TM}$ も、M と同じように $t$ の式で書けます。$2$ つのベクトルが垂直であることが数の条件になるのは、どんな計算をしたときでしたか。",
        },
        {
          layer: 3,
          text: "$\\ell$ 上の点は $(-1 + 3t,\\ -3 + 2t,\\ 3 + 6t)$ なので、$\\overrightarrow{TM} = \\overrightarrow{OM} - \\overrightarrow{OT} = (-6 + 3t,\\ -6 + 2t,\\ -2 + 6t)$。垂線の足とは「$\\overrightarrow{TM}$ が $\\vec{d}$ と垂直になる点」のことなので、内積を $0$ とおきます：\n\n$3(-6 + 3t) + 2(-6 + 2t) + 6(-2 + 6t) = 49t - 42 = 0$\n\nよって $t = \\dfrac{6}{7}$。平面のときにやった垂線の足と、やっていることは同じです——成分が $1$ つ増えて、内積の項が $3$ つになっただけ。\n\n中心の問いへの部分回答：**「いちばん近い点」という図形の言葉も、$t$ についての $1$ 次方程式 $1$ 本に翻訳される**。空間の図では T と $\\ell$ の位置関係すら描きにくいのに、式のほうは何も困っていません。",
        },
      ],
      formulaPreview: "TM = (−6+3t, −6+2t, −2+6t)、TM・d = 3(−6+3t) + 2(−6+2t) + 6(−2+6t) = 49t − 42 = 0 より t = 6/7",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "同じ垂線の足 M（点 T$(5,\\ 3,\\ 5)$ から直線 $\\ell$ に下ろした垂線の足）の **$z$ 座標**を求めましょう。答えは既約分数で答えましょう。",
      answer: 57 / 7,
      answerDisplay: "57/7",
      unit: "",
      unknownLabel: "M の $z$ 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。点も直線も同じ、求めた $t$ も同じ。違うのは、最後に何を答えるかだけ。step 1 で $t$ が決まったあとにやったことを、もう一度思い出してみよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**$t$ から座標に戻る一歩が足された**こと $1$ つ。$z$ 座標は、$\\ell$ 上の点を $t$ で書いた式のどこにあったでしょう。",
        },
        {
          layer: 3,
          text: "前題で $t = \\dfrac{6}{7}$ でした。M は $\\ell$ 上の点なので $\\overrightarrow{OM} = (-1 + 3t,\\ -3 + 2t,\\ 3 + 6t)$。$z$ 座標は $3 + 6\\cdot\\dfrac{6}{7} = 3 + \\dfrac{36}{7} = \\dfrac{57}{7}$ です。\n\nついでに $x$ 座標は $\\dfrac{11}{7}$、$y$ 座標は $-\\dfrac{9}{7}$ なので M$\\left(\\dfrac{11}{7},\\ -\\dfrac{9}{7},\\ \\dfrac{57}{7}\\right)$。確かめ算をしておくと $\\overrightarrow{TM} = \\left(-\\dfrac{24}{7},\\ -\\dfrac{30}{7},\\ \\dfrac{22}{7}\\right)$ で、$\\vec{d}$ との内積は $\\dfrac{-72 - 60 + 132}{7} = 0$——たしかに垂直でした。\n\n中心の問いへの部分回答：**$t$ は直線の上での住所、座標はその住所を空間の言葉に直したもの**。空間の点をつかまえる仕事は、いつもこの $2$ 段になっています。",
        },
      ],
      formulaPreview: "t = 6/7 を z 成分に入れて 3 + 6·(6/7) = 3 + 36/7 = 57/7",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "ここからは、相手が平面になります。\n\n$xyz$ 空間に $3$ 点 A$(-5,\\ -3,\\ 0)$、B$(1,\\ 3,\\ 0)$、C$(2,\\ 2,\\ -4)$ があります（この $3$ 点は同一直線上にありません）。原点 O から平面 ABC に垂線を下ろし、その足を H とします。\n\nH は平面 ABC 上の点なので、[共面条件] より、実数 $s,\\ t$ を使って\n\n$\\overrightarrow{OH} = \\overrightarrow{OA} + s\\overrightarrow{AB} + t\\overrightarrow{AC}$\n\nと書けます。このときの **$s$ の値**を求めましょう。答えは既約分数で答えましょう。",
      answer: 5 / 9,
      answerDisplay: "5/9",
      unit: "",
      unknownLabel: "$s$",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題までは、相手が直線だった。$1$ つの文字 $t$ だけで、直線上のすべての点に名前がついた。今度の相手は平面。平面の上のすべての点に名前をつけるには、文字はいくつ要るだろう？ そして「直線と垂直」と「平面と垂直」では、確かめることの数はどう違うだろうか。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**相手が直線から平面になった**こと。直線のときは「向き $1$ 本と垂直」で足が決まりました。平面には、平行でない向きが $2$ 本あります。",
        },
        {
          layer: 3,
          text: "$\\overrightarrow{AB} = (6,\\ 6,\\ 0)$、$\\overrightarrow{AC} = (7,\\ 5,\\ -4)$ なので\n\n$\\overrightarrow{OH} = (-5 + 6s + 7t,\\ -3 + 6s + 5t,\\ -4t)$。\n\n直線 OH が平面 ABC に垂直だというのは、**平面の上にある平行でない $2$ つの向きの、どちらとも垂直**だということです。だから条件は $2$ 本になります。\n\n$\\overrightarrow{OH}\\cdot\\overrightarrow{AB} = 72s + 72t - 48 = 0$、つまり $3s + 3t = 2$ …①\n$\\overrightarrow{OH}\\cdot\\overrightarrow{AC} = 72s + 90t - 50 = 0$、つまり $36s + 45t = 25$ …②\n\n①を $12$ 倍すると $36s + 36t = 24$。これを②から引いて $9t = 1$、$t = \\dfrac{1}{9}$。①に戻して $3s = 2 - \\dfrac{1}{3} = \\dfrac{5}{3}$、$s = \\dfrac{5}{9}$。（$s$ と $t$ は同じ連立から同時に出ます。$s$ を出した人は、もう $t$ も持っています。）\n\n**やってしまいがちな誤り**：正確な図を描こうとして止まってしまうこと。空間の図は「何となくこんな感じ」で十分で、図はあくまで式を作るための道具です。この H の座標も、どんなに丁寧に描いた図からも読み取れません。読み取れるのは式のほうです。\n\n中心の問いへの部分回答：**「平面に垂直」は、内積 $= 0$ を $2$ 本ならべた連立方程式に翻訳される**。図では見えないものが、式では $2$ 行で捕まりました。",
        },
      ],
      formulaPreview: "OH = (−5+6s+7t, −3+6s+5t, −4t)。OH・AB = 72s+72t−48 = 0、OH・AC = 72s+90t−50 = 0 を解いて s = 5/9（t = 1/9）",
      figureMarker: "<<M3V_PLANE_FOOT>>",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "同じ垂線の足 H について、**$\\lvert\\overrightarrow{OH}\\rvert^2$** を求めましょう（原点 O から平面 ABC までのへだたりの $2$ 乗にあたる値です）。答えは既約分数で答えましょう。",
      answer: 16 / 9,
      answerDisplay: "16/9",
      unit: "",
      unknownLabel: "$\\lvert\\overrightarrow{OH}\\rvert^2$",
      variationFromPrevious: "same",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。点も平面も同じ、垂線の足も同じ H。違うのは、H について何を聞かれているかだけ。step 5 で、$t$ が決まったあとにやったことと、どこが同じだろうか。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、**係数から座標に戻って、そこからへだたりを聞かれている**こと $1$ つ。$\\overrightarrow{OH}$ の $3$ つの成分は、前題の連立の答えを式に入れれば出ます。",
        },
        {
          layer: 3,
          text: "前題で $s = \\dfrac{5}{9}$、$t = \\dfrac{1}{9}$ でした。$\\overrightarrow{OH} = (-5 + 6s + 7t,\\ -3 + 6s + 5t,\\ -4t)$ に入れると\n\n$x$ 成分 $= -5 + \\dfrac{30}{9} + \\dfrac{7}{9} = -\\dfrac{8}{9}$、$y$ 成分 $= -3 + \\dfrac{30}{9} + \\dfrac{5}{9} = \\dfrac{8}{9}$、$z$ 成分 $= -\\dfrac{4}{9}$。\n\n空間でも大きさは $3$ つの成分の $2$ 乗の和なので\n\n$\\lvert\\overrightarrow{OH}\\rvert^2 = \\dfrac{8^2 + 8^2 + 4^2}{9^2} = \\dfrac{144}{81} = \\dfrac{16}{9}$（$\\lvert\\overrightarrow{OH}\\rvert = \\dfrac{4}{3}$）。\n\n**同じ答えに、もう $1$ つの道があります**。H は垂線の足なので、$\\overrightarrow{OH}$ は平面上のどの向きとも垂直、とくに $\\overrightarrow{AH}$ とも垂直です。$\\overrightarrow{OA} = \\overrightarrow{OH} - \\overrightarrow{AH}$ なので $\\overrightarrow{OH}\\cdot\\overrightarrow{OA} = \\lvert\\overrightarrow{OH}\\rvert^2 - \\overrightarrow{OH}\\cdot\\overrightarrow{AH} = \\lvert\\overrightarrow{OH}\\rvert^2$。実際に計算すると $\\left(-\\dfrac{8}{9}\\right)\\cdot(-5) + \\dfrac{8}{9}\\cdot(-3) + \\left(-\\dfrac{4}{9}\\right)\\cdot 0 = \\dfrac{40 - 24}{9} = \\dfrac{16}{9}$——同じ値に着きました。\n\n中心の問いへの部分回答：**成分にさえ戻せば、空間のへだたりは $3$ つの $2$ 乗を足すだけ**。平面のときの式に項が $1$ つ増えただけで、手つきは何も変わりません。",
        },
      ],
      formulaPreview: "OH = (−8/9, 8/9, −4/9)、|OH|^2 = (8^2 + 8^2 + 4^2)/9^2 = 144/81 = 16/9",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ $3$ 点 A$(-5,\\ -3,\\ 0)$、B$(1,\\ 3,\\ 0)$、C$(2,\\ 2,\\ -4)$ が作る**三角形 ABC の面積**を求めましょう。",
      answer: 18,
      unit: "",
      unknownLabel: "三角形 ABC の面積",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題までは、原点から平面までのへだたりを追いかけてきた。今度は、その平面にある三角形そのものの大きさ。$2$ 本の矢印から面積を出す道は、平面のときにもう歩いている。相手が空間になって、何か変わるだろうか。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**成分が $3$ つになった**こと。平面のときに面積を出した式が要るのは、$2$ 本の矢印の大きさと内積という $3$ つの値だけでした。その $3$ つは、成分が $3$ つになっても同じように出ます。",
        },
        {
          layer: 3,
          text: "$\\overrightarrow{AB} = (6,\\ 6,\\ 0)$、$\\overrightarrow{AC} = (7,\\ 5,\\ -4)$ から $3$ つの値を出します。\n\n$\\lvert\\overrightarrow{AB}\\rvert^2 = 36 + 36 + 0 = 72$、$\\lvert\\overrightarrow{AC}\\rvert^2 = 49 + 25 + 16 = 90$、$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 42 + 30 + 0 = 72$。\n\n$S = \\dfrac{1}{2}\\sqrt{\\lvert\\overrightarrow{AB}\\rvert^2\\lvert\\overrightarrow{AC}\\rvert^2 - (\\overrightarrow{AB}\\cdot\\overrightarrow{AC})^2} = \\dfrac{1}{2}\\sqrt{72\\cdot 90 - 72^2} = \\dfrac{1}{2}\\sqrt{6480 - 5184} = \\dfrac{1}{2}\\sqrt{1296} = 18$。\n\n**やってしまいがちな誤り**：平面で使えた $\\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ を、そのまま空間に持ち込むこと。この式は $x$ 成分と $y$ 成分しか見ていないので、いまの $2$ 本に当てると $\\dfrac{1}{2}\\lvert 6\\cdot 5 - 6\\cdot 7\\rvert = 6$ になります。これは三角形 ABC の面積ではなく、それを $xy$ 平面に落とした**影**の面積です。空間では、$3$ つの値の式のほうが唯一の道になります。\n\n中心の問いへの部分回答：**平面と空間で変わったのは、成分の個数だけ**。$3$ つの値さえ出れば、面積の出方は何も変わりません。",
        },
      ],
      formulaPreview: "|AB|^2 = 72、|AC|^2 = 90、AB・AC = 72。S = (1/2)√(72·90 − 72^2) = (1/2)√1296 = 18",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$4$ 点 O$(0,\\ 0,\\ 0)$、A$(-5,\\ -3,\\ 0)$、B$(1,\\ 3,\\ 0)$、C$(2,\\ 2,\\ -4)$ を頂点とする**四面体 OABC の体積**を求めましょう。",
      answer: 8,
      unit: "",
      unknownLabel: "四面体 OABC の体積",
      variationFromPrevious: "composite",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までに、三角形 ABC の大きさと、原点 O から平面 ABC までのへだたりが手に入った。小学校で角錐の体積を出したとき、要るものは何と何だっただろう？ その $2$ つは、いま両方とも手のうちにあるだろうか。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**平面の話から立体の話になった**こと。四面体を角錐だと見ると、底面はどの三角形で、高さはどの長さにあたるでしょう。",
        },
        {
          layer: 3,
          text: "四面体 OABC を、三角形 ABC を底面とする角錐だと見ます。すると高さは、頂点 O から底面の平面に下ろした垂線の長さ——つまり $\\lvert\\overrightarrow{OH}\\rvert$ そのものです。step 7 で $\\lvert\\overrightarrow{OH}\\rvert^2 = \\dfrac{16}{9}$ だったので $\\lvert\\overrightarrow{OH}\\rvert = \\dfrac{4}{3}$、step 8 で底面積は $18$。\n\n小学校・中学校で使った「角錐の体積 $=$ $\\dfrac{1}{3}\\times$ 底面積 $\\times$ 高さ」に、この $2$ つを入れるだけです：\n\n$V = \\dfrac{1}{3}\\cdot 18\\cdot\\dfrac{4}{3} = 8$。\n\nこの $\\dfrac{1}{3}$ は、角柱と角錐の容器で水をうつして確かめた、あの $\\dfrac{1}{3}$ と同じものです。座標が付いても、立体の体積の意味は何も変わっていません。\n\n中心の問いへの部分回答：**式でつかまえた $2$ つの量（面積とへだたり）を、昔からの公式に入れるだけで体積が出る**。空間の図が描けないことは、ここまで一度も邪魔をしませんでした。",
        },
      ],
      formulaPreview: "底面 = 三角形 ABC の面積 18、高さ = |OH| = 4/3。V = (1/3)·18·(4/3) = 8",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "最後に、頂点を $1$ つだけ取り替えます。\n\n$3$ 点 O$(0,\\ 0,\\ 0)$、A$(-5,\\ -3,\\ 0)$、B$(1,\\ 3,\\ 0)$ はそのままにして、C のかわりに点 D$(-3,\\ 5,\\ z)$ をとります（$z > 0$）。\n\n四面体 OABD の体積が $26$ になるような、**D の $z$ 座標**を求めましょう。",
      answer: 13,
      unit: "",
      unknownLabel: "D の $z$ 座標",
      variationFromPrevious: "inverse",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$4$ つの頂点のうち $3$ つはそのまま。動いたのは残りの $1$ 点で、しかもその位置のほうが分かっていない。前題で使った底面と高さは、そのまま使えるだろうか——D が動くと、平面 ABD はどうなるだろう。",
        },
        {
          layer: 2,
          text: "変わったのは $1$ つ——**分からないものが、体積のほうから頂点の位置のほうへ移った**こと。前題の底面（三角形 ABC）は、C を D に取り替えるともう使えません。でも、**底面のとり方は $1$ 通りではありません**。O, A, B の $z$ 座標を並べて見てみましょう。",
        },
        {
          layer: 3,
          text: "前題の道をそのままなぞろうとすると行き詰まります。D が動けば平面 ABD も傾くので、三角形 ABD の面積も、O からその平面までのへだたりも、両方作り直さなければなりません。しかも $z$ が分からないままでは、その $2$ つはどちらも $z$ の入った根号の式になってしまいます。\n\n**そこで、底面を取り替えます。** O$(0,\\ 0,\\ 0)$、A$(-5,\\ -3,\\ 0)$、B$(1,\\ 3,\\ 0)$ は $z$ 座標がどれも $0$——つまり $3$ 点とも $xy$ 平面の上にあります。だから三角形 OAB を底面にとれば、底面はまるごと $xy$ 平面の中にあり、高さは頂点 D から $xy$ 平面までのへだたり、すなわち $z$ そのもの（$z > 0$）になります。\n\n底面積は step 8 と同じ式で出ます。$\\overrightarrow{OA} = (-5,\\ -3,\\ 0)$、$\\overrightarrow{OB} = (1,\\ 3,\\ 0)$ から $\\lvert\\overrightarrow{OA}\\rvert^2 = 34$、$\\lvert\\overrightarrow{OB}\\rvert^2 = 10$、$\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = -5 - 9 = -14$ なので\n\n$\\triangle OAB = \\dfrac{1}{2}\\sqrt{34\\cdot 10 - (-14)^2} = \\dfrac{1}{2}\\sqrt{144} = 6$。\n\nよって体積は $\\dfrac{1}{3}\\cdot 6\\cdot z = 2z$。これが $26$ になるので $z = 13$ です。\n\n**確かめ**：同じ見方を前題の四面体 OABC に当てると、C の $z$ 座標は $-4$ なので高さは $4$、体積は $\\dfrac{1}{3}\\cdot 6\\cdot 4 = 8$——三角形 ABC を底面にして出した step 9 の答えと、ぴたり一致します。底面のとり方を変えても、体積はもちろん同じものでした。\n\nもう $1$ つ見どころがあります。この計算に、D の $x$ 座標 $-3$ と $y$ 座標 $5$ は**一度も出てきません**。頂点を $xy$ 平面と平行に動かしても、底面も高さも変わらないので、体積は変わらないのです。\n\n中心の問いへの答え：**図が描けない空間で、式は「どの $1$ 文字で走る直線か」「どの $2$ 文字で広がる平面か」「どこが垂直か」「どこを底面と見るか」を代わりに見ている**。直線は $1$ 文字、平面は $2$ 文字、垂直は内積 $= 0$——この $3$ つの部品だけで、交点も、垂線の足も、面積も、体積も決まりました。",
        },
      ],
      formulaPreview: "底面を三角形 OAB に取り替える。面積 = (1/2)√(34·10 − 14^2) = 6、体積 = (1/3)·6·z = 2z = 26 より z = 13",
    },
  ],
  derivation: `**中心の問い** ｜ 空間では、直線を**正確な図に描くことができない**。それでも「始点 ＋ $t$ × 方向」という $1$ 本の式と「内積 $=0$」だけで、直線と平面の交点も、垂線の足も、四面体の体積も**計算だけで**決まる——図が描けない世界で、式は何を代わりに見ているのだろうか？

────────

**「何となくこんな感じ」の図でいい**

平面のうちは、図がずいぶん助けてくれました。点を打ち、直線を引き、垂線を下ろせば、答えの見当くらいはつきます。ところが空間に入ったとたん、それができなくなります。紙は平らなので、奥行きは「そう見えるように描いた嘘」でしかありません。$3$ 点が本当に手前と奥のどちらにあるのか、直線が平面のどちら側を通るのか、描いた図は教えてくれない。

だから空間の問題では、**図に正確さを求めるのをやめます**。「何となくこんな感じ」というイメージ図を描いて、それで十分とする。図は答えを読み取るためのものではなく、**式を作るためのもの**です。実際この系列でも、step 1 の交点 P も、step 6 の垂線の足 H も、その座標はどんなに丁寧に描いた図からも読み取れませんでした。読み取れたのは式のほうです。

**直線は $1$ 文字、平面は $2$ 文字**

では、図の代わりに何を書くのか。$2$ つだけです。

直線は「**どこから**（始点ベクトル）」と「**どの向きに**（方向ベクトル）」が決まれば $1$ 本に決まり、その上の点は実数 $t$ を $1$ つ添えて $\\overrightarrow{OP} = \\overrightarrow{OK} + t\\vec{d}$ と書けます（[共線条件]）。成分が $3$ つになっても、この形は何も変わりません。

平面は、$1$ 点と、その平面に乗っている**平行でない $2$ 本の向き**が決まれば $1$ 枚に決まり、その上の点は実数 $s,\\ t$ を $2$ つ添えて $\\overrightarrow{OH} = \\overrightarrow{OA} + s\\overrightarrow{AB} + t\\overrightarrow{AC}$ と書けます（[共面条件]）。

**ここが胚細胞**：**図が描けなくても、式のほうは何も困っていない**。直線という $1$ 次元は文字 $1$ つで、平面という $2$ 次元は文字 $2$ つで、余すところなく走りきれます。空間の点をつかまえる仕事は、いつも「文字を決める」→「座標に戻す」の $2$ 段です。step 1〜5 も step 6〜7 も、やったのはこの $2$ 段でした。

**「交わる」「垂直」を、式の言葉に置きかえる**

あとは、図形の言葉を式の言葉に置きかえるだけです。この系列で置きかえたのは $3$ つ。

- **「$xy$ 平面と交わる」**＝ $z$ 成分が $0$（step 1）。「$yz$ 平面と交わる」なら $x$ 成分が $0$（step 2）。座標平面のどれと交わるかは、$t$ を決める式にどの行を選ぶかの違いでしかありません
- **「直線と垂直」**＝ 方向ベクトルとの内積が $0$。条件は **$1$ 本**（step 4）
- **「平面と垂直」**＝ 平面上の平行でない $2$ 本の向きの、どちらとも内積が $0$。条件は **$2$ 本**（step 6）

垂直の条件が $1$ 本から $2$ 本へ増えたところが、この系列の転換点です。$1$ 本増えるだけなのに、図で見当をつける道は完全に閉じます。連立方程式を解く以外に、平面への垂線の足を捕まえる手はありません。

**体積は「底面と高さ」に戻すだけ**

四面体の体積も、新しい公式は要りません。角錐の体積 $=$ $\\dfrac{1}{3}\\times$ 底面積 $\\times$ 高さ——小学校・中学校で水をうつして確かめた、あの式に戻すだけです。要るのは底面積と高さの $2$ つで、底面積は $3$ つの値（$2$ 本の矢印の大きさと内積）から、高さは垂線の足までのへだたりから出ます（step 8・9）。

そして最後に、**底面のとり方は $1$ 通りではない**ということが効きます（step 10）。同じ四面体でも、どの面を底面と見るかで、計算の重さがまるで変わる。O, A, B の $z$ 座標がどれも $0$ なら、三角形 OAB を底面にとった瞬間、高さは残る頂点の $z$ 座標そのものになります。図では「同じ立体を別の向きに置き直す」だけの、何も起きていない操作。式の上では、根号だらけの計算が $1$ 次方程式に変わる大事件でした。

**Step の道筋**

- **Step 1**：直線が $xy$ 平面を突き抜ける点。「$z$ 成分 $= 0$」で $t$ が決まる
- **Step 2**：$yz$ 平面のときは「$x$ 成分 $= 0$」。選ぶ行が変わるだけ
- **Step 3**：通ってほしい点が先に決まっている。未知は方向ベクトルの $z$ 成分へ
- **Step 4**：直線への垂線の足。「垂直」が内積 $= 0$ という $t$ の $1$ 次方程式になる
- **Step 5**：$t$ から座標に戻る。直線上の住所を、空間の言葉に直す
- **Step 6（転換点）**：平面への垂線の足。垂直条件が $2$ 本になり、連立でしか捕まらない
- **Step 7**：同じ H のへだたりの $2$ 乗。成分に戻せば $3$ つの $2$ 乗の和。もう $1$ つの道もある
- **Step 8**：三角形の面積。空間では $3$ つの値の式が唯一の道
- **Step 9**：四面体の体積。角錐の公式に、面積とへだたりを入れるだけ
- **Step 10（山場）**：体積から頂点の高さを逆算。底面をとり替えると、高さが $z$ そのものになる

────────

**もっと深く** — 図が描けない場所で、式が代わりに見ているもの

**忘れても導ける**：この系列に、覚えるべき新しい公式はほとんどありません。**「直線は $1$ 文字、平面は $2$ 文字」**と**「垂直は内積 $= 0$」**の $2$ つだけ握っていれば、あとはその場で組み立てられます。垂線の足を求める式を忘れても、「足は相手の上にある」（$t$ の式、または $s,\\ t$ の式で書く）と「結ぶ矢印が相手と垂直」（内積を $0$ とおく）の $2$ つを書き下せば、方程式は自分から立ち上がります。条件の本数は、相手の向きの本数と同じ——直線なら $1$ 本、平面なら $2$ 本。数える必要すらありません。

**やってしまいがちな誤り $1$：イメージ図を正確な図だと思うこと**。空間の図は、あくまで式を作るための下書きです。step 1 の交点 P は、$t$ が負でしたから、K から $\\vec{d}$ の向きへ進んだ側ではなく、その**反対側**にあります。イメージ図でそこを逆に描いてしまっていても、問題を解くうえでは何も困りません。困るのは、図から答えの見当をつけようとしたときだけです。

**やってしまいがちな誤り $2$：平面の面積公式を空間に持ち込むこと**。$\\dfrac{1}{2}\\lvert a_1b_2 - a_2b_1\\rvert$ は $x$ 成分と $y$ 成分しか見ていないので、空間の三角形に当てると、$xy$ 平面に落とした影の面積が出てきます（step 8 では $6$。本当の面積は $18$ でした）。空間では、$\\lvert\\vec{a}\\rvert$、$\\lvert\\vec{b}\\rvert$、$\\vec{a}\\cdot\\vec{b}$ の $3$ つの値から作る式が唯一の道です。

**やってしまいがちな誤り $3$：底面を $1$ 通りに決めつけること**。step 10 で、前題の底面（三角形 ABC）にしがみつくと、根号だらけの $z$ の式と格闘することになります。四面体の面は $4$ つあり、どれを底面と見てもよい。**いちばん高さが読みやすい面を選ぶ**——これは図形の問題全体に効く構えです。

**この先の景色**：次の第 $10$ 章は複素数平面です。そこでいちばん最初に置かれているのが、「**数の演算を考えるときは、数をベクトルととらえるとわかりやすい**」という一文——数直線の上で $2 + (-3) = -1$ を計算することは、右向きに $2$ 進んで左向きに $3$ 戻るという、まさにベクトルの足し算でした。「$-1$ をかける」はベクトルの向きを $180°$ 変えることです。そして「数直線上には $2$ 乗して $-1$ になる数が無い」ところから、直線を平面に広げる話が始まります。この章で手に入れた「向きと大きさをもつ量」「足し算と実数倍」「基準を決めれば数の組になる」という道具立ては、そっくりそのまま次の章の土台になります。

さらに先では、この系列でやった「平面に垂直な向きを $2$ 本の内積 $= 0$ で捕まえる」手つきが**法線ベクトル**と**平面の方程式**という名前をもらい、「与えられた点から、ある平面（もっと一般には、ある空間）にいちばん近い点を下ろす」という操作が**射影**と呼ばれるようになります。統計で使う最小二乗法も、正体はこの射影です。図が描けない次元でも、内積 $= 0$ という条件はそのまま生き続けます。

**出典**

- 池田洋介（2024）『数学Ⅲ・C 入門問題精講』旺文社
  — 章構成（空間座標 $\\to$ 空間の直線と座標平面の交点 $\\to$ 直線への垂線の足 $\\to$ 平面への垂線の足と四面体の体積）と、
  「空間座標では図が具体的にはかきづらいので、何となくこんな感じというイメージ図でよい。あくまで式を作るための図である」「直線 OH が平面に垂直である条件は、平面上の平行でない $2$ つの向きと垂直であること」という着眼、および次章の扉にある「演算を考えるときは数をベクトルととらえる」という見通しを参考。問題の値・場面はすべてオリジナル。

────────

**問いに戻ると**

「図が描けない世界で、式は何を代わりに見ているのか」——**走る向きの本数**です。直線には向きが $1$ 本しかないから文字は $1$ つ、垂直の条件も $1$ 本。平面には平行でない向きが $2$ 本あるから文字は $2$ つ、垂直の条件も $2$ 本。式は、図が見せてくれる「奥行き」や「傾き」の代わりに、**その図形が何本の向きで広がっているか**を見ています。だから次元が上がっても、手つきは増えも減りもしませんでした。

そして体積では、**どの面を底面と見るか**という自由も式が引き受けてくれました。同じ四面体を別の向きに置き直すだけで、根号だらけの計算が $1$ 次方程式に変わる。図では何も起きていない操作が、式の上では大事件になる——これが、この章の最後に手に入れた見方です。

**ひらめきや補助線が要る図形の問題を、手順で解ける式計算に変える。** この章のはじめに、矢印から向きと大きさだけを取り出したときに始まった仕事が、図がまったく描けない空間まで届きました。次の章では、この「向きと大きさをもつ量」が、数そのものの顔をして戻ってきます。`,
};

/** カタログ・ALL_STATIC_SERIES 用の一覧。系列を足したらここにも足す。 */
export const MATH3_VECTOR_SERIES_LIST: LearnerSeries[] = [
  M3V_QUANTITY_SERIES,
  M3V_TRANSFORM_SERIES,
  M3V_DIVISION_SERIES,
  M3V_INDEPENDENT_SERIES,
  M3V_POSITION_SERIES,
  M3V_DOT_SERIES,
  M3V_MEASURE_SERIES,
  M3V_COMPONENT_SERIES,
  M3V_LINE_SERIES,
  M3V_SPACE_SERIES,
  M3V_COPLANAR_SERIES,
  M3V_SPACE_COORD_SERIES,
  M3V_SPACE_LINE_SERIES,
];
