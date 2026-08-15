#!/usr/bin/env python3
"""相互参照の監査ツール——「二か所の関係」の欠陥を機械で拾う。

## なぜ要るのか

既存の検査はすべて **一か所** しか見ていない：

- `audit_hints.py` … ヒント 1 つを走査する
- SymPy の検算       … 答え 1 つを確かめる
- `grep`             … 文字列 1 つに当たる

ところが 2026-08-15 に別モデル（Grok）へ横断監査を通したところ、微分・積分と
指数関数・対数関数の両方で見つかった欠陥は、**ほぼ全部が「二か所の関係」**だった：

| 見つかったもの | どこと、どこの関係か |
|---|---|
| step6 の解式が step7 の答え 6 を先出し（微積） | step N の解式 ↔ step N+1 の答え |
| step9 の L3 が step10 の答え 480 を先出し（指数対数） | 同上（別ユニットで再発） |
| 系列3 step10 と系列5 step10 が同じ問題 | 系列 ↔ 系列 |
| 図の `<text>` に `$` が生 | 図の中身 ↔ 描画経路 |
| 「前題の答え」が実は提出値でなく途中式（微積 2 件） | L3 の参照 ↔ 前 step の提出値 |
| L3 の「書き出しでは届かない」が偽（数列 1 件） | 本文の主張 ↔ 実際の手数 |

同じ型が 2 ユニット連続で出たのは偶然ではなく、**相互参照を見る道具が無い**という
構造的な穴。本スクリプトはその穴を 5 本のチェックで塞ぐ（1〜3 は微積・指数対数の
監査から、4〜5 は数列の監査から。詳しくは `docs/quality_bar_fable_2026-07-17.md`
「メインの検収が構造的に見落とす層」）。

**5 本目だけは性質が違う**——「届かない」が本当かは機械には判定できないので、
*人が数えて確かめる場所を絞り込む棚卸し* として出す。

## 使い方

    python3 scripts/audit_cross_refs.py                   # 全 series*.ts ＋ 図
    python3 scripts/audit_cross_refs.py seriesExpLog.ts   # 特定ファイルのみ
    python3 scripts/audit_cross_refs.py --check leak      # leak/dup/svg/ref/claim を個別に
    python3 scripts/audit_cross_refs.py --self-test       # 既知の 6 事例で回帰テスト

`audit_hints.py` と同じく **報告専用**（CI ゲートにしない）。ヒットは「怪しい候補」で
あって違反の断定ではない。★ が付いたものから目で確かめる。
"""
import argparse
import difflib
import os
import re
import subprocess
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LIB = os.path.join(ROOT, "frontend", "src", "lib")
COMPONENTS = os.path.join(ROOT, "frontend", "src", "components")

TS_STR = r'"((?:[^"\\]|\\.)*)"'


# ─────────────────────────────── 解析 ───────────────────────────────

def parse_series(source):
    """series*.ts の中身を [(系列名, [step, ...]), ...] に分解する。

    step は dict(id, question, answer, display, l3, preview, texts)。
    """
    out = []
    bounds = [(m.start(), m.group(1))
              for m in re.finditer(r"^export const (\w+_SERIES)\b", source, re.M)]
    bounds.append((len(source), None))
    for k in range(len(bounds) - 1):
        block = source[bounds[k][0]:bounds[k + 1][0]]
        sid = re.search(r'id:\s*' + TS_STR, block)
        name = sid.group(1) if sid else bounds[k][1]
        marks = [m.start() for m in re.finditer(r'\n      id:\s*"step', block)]
        marks.append(len(block))
        steps = []
        for j in range(len(marks) - 1):
            seg = block[marks[j]:marks[j + 1]]
            step = {
                "id": _one(seg, r'id:\s*' + TS_STR),
                "question": _one(seg, r"questionText:\s*\n?\s*" + TS_STR),
                "answer": _one(seg, r"\n      answer:\s*([^,\n]+),"),
                "display": _one(seg, r"answerDisplay:\s*" + TS_STR),
                "preview": _one(seg, r"formulaPreview:\s*\n?\s*" + TS_STR),
            }
            hints = re.findall(r"layer:\s*([123])\s*,\s*\n?\s*text:\s*\n?\s*" + TS_STR, seg)
            step["l3"] = " ".join(t for lv, t in hints if lv == "3")
            step["texts"] = {"L3": step["l3"], "解式": step["preview"] or "",
                             "問題文": step["question"] or ""}
            if step["id"]:
                steps.append(step)
        if steps:
            out.append((name, steps))
    return out


def _one(text, pattern):
    m = re.search(pattern, text)
    return m.group(1) if m else None


# ────────────────────── 1. 答えの先出し ──────────────────────

def numerals(answer, display):
    """答えを、本文中で探すべき文字列の集合にする。"""
    got = set()
    if answer:
        a = answer.strip()
        if re.fullmatch(r"-?\d+", a):
            got.add(a.lstrip("-"))
        elif re.fullmatch(r"-?\d+\s*/\s*\d+", a):
            got.add(re.sub(r"\s+", "", a).lstrip("-"))
        elif re.fullmatch(r"-?\d+\.\d+", a):
            got.add(a.lstrip("-"))
    if display:
        d = display.strip().replace("−", "-")
        if re.fullmatch(r"-?[\d/\s]+", d):
            got.add(re.sub(r"\s+", "", d).lstrip("-"))
    return {g for g in got if g}


def check_leak(files, verbose=False):
    """step N の解式・L3・問題文に、あとの step の答えが出ていないか。

    - 隣（N+1）の答えは、小さい数でも報告する（★）
    - 2 つ以上先は、$10$ 以上の数だけ報告する（小さい数は本文に頻出するため）
    """
    rows = []
    for path in files:
        src = open(path, encoding="utf-8").read()
        for name, steps in parse_series(src):
            # その系列で何 step にまたがって出てくる数か（＝系列の常連の定数か）を先に数える
            spread = {}
            for st in steps:
                joined = " ".join(st["texts"].values())
                for tok in set(re.findall(r"(?<![\d.\/])\d+(?:/\d+)?(?![\d.\/])", joined)):
                    spread[tok] = spread.get(tok, 0) + 1
            for i, step in enumerate(steps):
                own = numerals(step["answer"], step["display"])
                given = step["question"] or ""
                for j in range(i + 1, len(steps)):
                    later = steps[j]
                    dist = j - i
                    for num in numerals(later["answer"], later["display"]):
                        big = re.fullmatch(r"\d+", num) and int(num) >= 10
                        if dist > 1 and not big:
                            continue
                        if dist > 3:
                            continue
                        # 除外1：その step 自身の答えと同じ数（偶然の一致）
                        if num in own:
                            continue
                        # 除外2：その step の問題文に出ている＝与件であって先出しではない
                        if re.search(r"(?<![\d.\/])" + re.escape(num) + r"(?![\d.\/])", given):
                            continue
                        # 除外3：系列の 3 step 以上に出てくる数＝その系列の常連の定数。
                        # ただし「すぐ次の step の答え」（★＝本命）には掛けない——
                        # 微分積分 系列1 の 6 のように、常連の数がそのまま次の答えに
                        # なる配列こそ、いちばん危ない先出しだから。
                        if dist > 1 and spread.get(num, 0) >= 3:
                            continue
                        for where, text in step["texts"].items():
                            if not text:
                                continue
                            if where == "問題文" and dist > 1:
                                continue
                            for m in re.finditer(
                                    r"(?<![\d.\/])" + re.escape(num) + r"(?![\d.\/])", text):
                                # 「先出し」の署名＝値として言い切っている形。
                                # 「= のすぐ後」か「**強調** の中」。実例の 480 は
                                # 「f(25)=480」、6 は「**$6$ に限りなく近づく**」だった。
                                left = text[max(0, m.start() - 6):m.start()]
                                strong = bool(re.search(r"=\s*\$?\s*$", left)
                                              or re.search(r"\*\*\$?$", left))
                                rows.append({
                                    "file": os.path.basename(path), "series": name,
                                    "from": step["id"], "to": later["id"], "dist": dist,
                                    "num": num, "where": where, "strong": strong,
                                    "snip": _snippet(text, m.start(), len(num)),
                                })
    _report_leak(rows, verbose)
    return rows


def _snippet(text, at, width, pad=26):
    lo, hi = max(0, at - pad), min(len(text), at + width + pad)
    return ("…" if lo else "") + text[lo:hi].replace("\\n", " ") + ("…" if hi < len(text) else "")


def _report_leak(rows, verbose):
    print("\n## 1. 答えの先出し（step N の解式・L3 に、あとの step の答えが出ていないか）")
    if not rows:
        print("  ヒットなし")
        return
    rows.sort(key=lambda r: (not (r["strong"] and r["dist"] == 1), r["dist"],
                             not r["strong"], -len(r["num"])))
    head = [r for r in rows if r["strong"] and r["dist"] == 1]
    shown = rows if verbose else head
    for r in shown:
        star = "★★" if (r["strong"] and r["dist"] == 1) else ("★ " if r["dist"] == 1 else "  ")
        print(f"  {star} {r['file']}／{r['series']}")
        print(f"     {r['from']} の{r['where']} に、{r['to']} の答え「{r['num']}」")
        print(f"     {r['snip']}")
    if not shown:
        print("  ★★（本命）なし")
    if len(rows) > len(shown):
        print(f"  … ほかに候補 {len(rows) - len(shown)} 件（--verbose で全部）")
    print(f"  計 {len(rows)} 件 ／ うち本命 ★★ {len(head)} 件"
          "（★★＝すぐ次の step の答えを、= の後か **強調** の中で言い切っている）")


# ────────────────────── 2. 系列間の問題文の重複 ──────────────────────

def math_tokens(text):
    """問題文から「数式のかたまり」を取り出して正規化した集合にする。

    文字列の類似度だと、**意図した対応**（指数の系列と対数の系列が同じ骨格で
    並ぶ mirror）と、**本物の重複**（同じ問題の再掲）が区別できない。
    区別できるのは、実際に出てくる数式そのもの——指数側は `y=5^x`、対数側は
    `y=log_5 x` と、トークンが別物になるから。
    """
    if not text:
        return set()
    toks = set()
    for frag in re.findall(r"\$([^$\n]+)\$", text):
        f = re.sub(r"\\\\(left|right|,|;|!|quad|qquad|displaystyle|text|mathrm)", "", frag)
        f = re.sub(r"\\\\d?frac\s*", "frac", f)
        f = re.sub(r"[\s{}\\]", "", f)
        if len(f) >= 2:
            toks.add(f)
    for n in re.findall(r"(?<![\d.])\d+(?![\d.])", re.sub(r"\$[^$\n]*\$", "", text)):
        toks.add(n)
    return toks


def retired_series():
    """SERIES_REDIRECTS の移動元＝吸収されて学習者が到達しない系列 id。"""
    path = os.path.join(LIB, "seriesCatalog.ts")
    if not os.path.exists(path):
        return set()
    src = open(path, encoding="utf-8").read()
    m = re.search(r"SERIES_REDIRECTS[^=]*=\s*\{(.*?)\n\};", src, re.S)
    if not m:
        return set()
    return set(re.findall(r"^\s*(\w+):", m.group(1), re.M))


def check_dup(files, threshold=0.6, verbose=False):
    """別々の系列に、同じ問題の再掲が無いか（歩くと同じ問題に二度当たる）。

    判定は「数式トークンの重なり（Jaccard）」＋「答えが同じ」。
    値だけ違う同じ文型（材料置換）はトークンが違うので落ちる。
    """
    retired = retired_series()
    items = []
    for path in files:
        src = open(path, encoding="utf-8").read()
        for name, steps in parse_series(src):
            if name in retired:          # 吸収済み＝学習者が到達しない系列は対象外
                continue
            for step in steps:
                if step["question"]:
                    items.append((os.path.basename(path), name, step["id"],
                                  step["answer"], math_tokens(step["question"]),
                                  step["question"]))
    rows = []
    for a in range(len(items)):
        for b in range(a + 1, len(items)):
            fa, na, sa, ansa, ta, qa = items[a]
            fb, nb, sb, ansb, tb, qb = items[b]
            if na == nb or not ta or not tb:
                continue
            if (ansa or "") != (ansb or ""):     # 答えが違えば別の問題
                continue
            shared = ta & tb
            if len(shared) < 2:                  # 数式が 1 つしか重ならないのは偶然
                continue
            # 裸の数字だけの一致は偶然（「4 と 6 の最小公倍数」と
            # 「底辺 4・高さ 6 の三角形の面積」がどちらも 12、のような組）
            if not any(re.search(r"[a-zA-Z=+\-*/^]", t) for t in shared):
                continue
            inter = len(shared)
            jac = inter / len(ta | tb)
            if jac >= threshold:
                rows.append({"ratio": jac, "a": (fa, na, sa, ansa, qa),
                             "b": (fb, nb, sb, ansb, qb), "same_answer": True,
                             "shared": sorted(ta & tb)[:4]})
    rows.sort(key=lambda r: -r["ratio"])
    print(f"\n## 2. 系列をまたいだ問題の再掲（数式の重なり {threshold} 以上・答えも同じ）")
    if not rows:
        print("  ヒットなし")
        return rows
    shown = rows if verbose else rows[:15]
    for r in shown:
        (fa, na, sa, ansa, qa), (fb, nb, sb, ansb, qb) = r["a"], r["b"]
        print(f"  ★ 数式の重なり {r['ratio']:.2f}（答えはどちらも {ansa}）"
              f"／共通 {'・'.join(r['shared'])}")
        print(f"     {na} {sa}: {qa[:76]}")
        print(f"     {nb} {sb}: {qb[:76]}")
    if len(rows) > len(shown):
        print(f"  … 他 {len(rows) - len(shown)} 件（--verbose で全部）")
    print(f"  計 {len(rows)} 件（歩くと同じ問題に二度当たる候補）")
    return rows


# ────────────────────── 3. 図の中の生の $ と [用語] ──────────────────────

def check_svg(paths=None, verbose=False):
    """SVG の <text> は MathText を通らない。$...$ も [用語] もそのまま見える。"""
    paths = paths or [os.path.join(COMPONENTS, f)
                      for f in sorted(os.listdir(COMPONENTS)) if f.endswith(".tsx")]
    rows = []
    for path in paths:
        src = open(path, encoding="utf-8").read()
        offs = [0]
        for ch in src.split("\n"):
            offs.append(offs[-1] + len(ch) + 1)
        for m in re.finditer(r"<text\b[^>]*>(.*?)</text>", src, re.S):
            inner = m.group(1)
            # JSX 式（{labels[i]} や `${...}`）は authored 文字列ではないので先に落とす
            inner_wo = re.sub(r"\{[^{}]*\}", "", inner)
            bad = []
            if "$" in inner_wo:
                bad.append("$")
            if re.search(r"\[[^\[\]\n]{1,20}\]", inner_wo):
                bad.append("[用語]")
            if bad:
                line = next(i for i, o in enumerate(offs) if o > m.start())
                rows.append({"file": os.path.basename(path), "line": line,
                             "kind": "・".join(bad),
                             "text": " ".join(inner.split())[:90]})
    print("\n## 3. 図（SVG の <text>）に、生の $ や [用語] が入っていないか")
    if not rows:
        print("  ヒットなし")
        return rows
    shown = rows if verbose else rows[:30]
    for r in shown:
        print(f"  ★ {r['file']}:{r['line']}  ({r['kind']})")
        print(f"     {r['text']}")
    if len(rows) > len(shown):
        print(f"  … 他 {len(rows) - len(shown)} 件（--verbose で全部）")
    print(f"  計 {len(rows)} 件（SVG は KaTeX も用語リンクも効かない。素の文字で書く）")
    return rows


# ────────────────────── 4. 「前題の答え」の参照先 ──────────────────────

# 「前題の答え」と書いてあるのに、指しているのが提出値ではなく
# L3 や解式にだけ出た途中式、という食い違い（微分積分の監査で 2 件）。
# L3 を開かずに答えだけ出した学習者には、その参照が宙に浮く。
REF_PAT = re.compile(
    r"(前題|step\s*(\d+))\s*(?:の|で)\s*(答え|出した値|求めた値|分かった値|分かっています|分かりました)")
# 数式の中の文字（変数・累乗・分数）＝「値」ではなく「式」を指している signal
ALGEBRA = re.compile(r"[a-zA-Z]\s*[\^_]|\\dfrac|\\sum|\\int|[a-zA-Z]\^|\^\{")


def _token_in(num, text):
    """num が、英字や他の数字とくっついていない独立した数として text に出るか。"""
    return re.search(r"(?<![\d.\/A-Za-z])" + re.escape(num) + r"(?![\d.\/A-Za-z])", text)


def check_ref(files, verbose=False):
    """L3 の「前題の答え」が、本当に前 step の提出値を指しているか。"""
    rows = []
    for path in files:
        src = open(path, encoding="utf-8").read()
        for name, steps in parse_series(src):
            index = {st["id"]: k for k, st in enumerate(steps)}
            for i, step in enumerate(steps):
                for label, body in (("L3", step["l3"]), ("解式", step["preview"] or "")):
                    if not body:
                        continue
                    for m in REF_PAT.finditer(body):
                        if m.group(2):                      # step N と番号で呼んでいる
                            tgt = index.get("step" + m.group(2))
                        else:                               # 「前題」＝1 つ前
                            tgt = i - 1 if i > 0 else None
                        if tgt is None or tgt >= len(steps):
                            continue
                        want = numerals(steps[tgt]["answer"], steps[tgt]["display"])
                        if not want:
                            continue
                        zone = body[m.end():m.end() + 70]
                        if any(_token_in(w, zone) for w in want):
                            continue                        # 提出値がそこにある＝正しい参照
                        if not ALGEBRA.search(zone):
                            continue                        # 式でもないなら、ただの言及
                        rows.append({"file": os.path.basename(path), "series": name,
                                     "step": step["id"], "where": label,
                                     "ref": steps[tgt]["id"],
                                     "want": "/".join(sorted(want)),
                                     "zone": " ".join(zone.split())[:70]})
    print("\n## 4. 「前題の答え」の参照先が、提出値でなく途中式になっていないか")
    if not rows:
        print("  ヒットなし")
        return rows
    shown = rows if verbose else rows[:20]
    for r in shown:
        print(f"  ★ {r['file']}／{r['series']}")
        print(f"     {r['step']} の{r['where']}が「{r['ref']} の答え」と呼ぶ先に、"
              f"提出値 {r['want']} が無い")
        print(f"     …{r['zone']}…")
    if len(rows) > len(shown):
        print(f"  … 他 {len(rows) - len(shown)} 件（--verbose で全部）")
    print(f"  計 {len(rows)} 件（提出値を指すときだけ「答え」と書く。"
          "途中式なら「前題の解式で見たとおり」と、どこで見たかまで書く）")
    return rows


# ────────────────────── 5. 本文が書いた「規模の宣言」 ──────────────────────

# 「書き出しでは届かない」「N 行かかる」は、値ではないので検算の網にかからない。
# 数列 系列11 step9 は「届きませんでした」と書いていたが実際は 7 行で届いた。
# 判定は機械にできないので、"人が数えて確かめる場所" を絞り込むだけの棚卸し。
CLAIM_PAT = re.compile(
    r"(届き(?:ません|ませんでした)|届かない|現実的で(?:は)?(?:ない|ありません)|"
    r"非現実的|書き出せ(?:ない|ません)|骨が折れ|手で(?:足す|書く)気に|到底|永久に)")
# 明示的な行数の主張は、それだけで確かめる価値がある
CLAIM_ROWS = re.compile(r"\d+\s*(?:行|項)(?:ぶん|ずつ)?(?:書|足|並|write)?")
# 「届かない」は道具の必要性の比喩でも使う（例：「なければ届かない道具」）。
# 素朴な道＝手で書き出す道について言っているときだけ拾う。
BRUTE = re.compile(
    r"書き出|書き並べ|１つずつ|1 ?つずつ|ひとつずつ|順に足|全部足|すべて足|"
    r"手で|何行|行ぶん|列挙|数え上げ|足していく")


def check_claim(files, verbose=False):
    """本文の「規模の宣言」を集めて、行数を数え直す対象リストにする。"""
    rows = []
    for path in files:
        src = open(path, encoding="utf-8").read()
        series = step = "—"
        in_comment = False
        for ln, line in enumerate(src.split("\n"), 1):
            # 設計メモのコメントは学習者に出ないので数えない
            stripped = line.lstrip()
            if in_comment:
                if "*/" in line:
                    in_comment = False
                continue
            if stripped.startswith("/*"):
                if "*/" not in line:
                    in_comment = True
                continue
            if stripped.startswith("*") or stripped.startswith("//"):
                continue
            ms = re.search(r"^export const (\w+_SERIES)\b", line)
            if ms:
                series, step = ms.group(1), "—"
            mi = re.search(r'^\s+id:\s*"(step\d+)"', line)
            if mi:
                step = mi.group(1)
            if re.match(r"\s*derivation:", line):
                step = "derivation"
            for m in CLAIM_PAT.finditer(line):
                lo = max(0, m.start() - 120)
                near = line[lo:m.end() + 120]
                if not BRUTE.search(near):
                    continue          # 道具の必要性の比喩＝規模の主張ではない
                rows.append({"file": os.path.basename(path), "line": ln,
                             "series": series, "step": step, "word": m.group(1),
                             "text": " ".join(line[max(0, m.start() - 40):m.end() + 40].split())})
            for m in CLAIM_ROWS.finditer(line):
                lo = max(0, m.start() - 80)
                if not BRUTE.search(line[lo:m.end() + 80]):
                    continue
                rows.append({"file": os.path.basename(path), "line": ln,
                             "series": series, "step": step, "word": m.group(0).strip(),
                             "text": " ".join(line[max(0, m.start() - 40):m.end() + 40].split())})
    print("\n## 5. 本文が書いた「規模の宣言」（人が数えて確かめる棚卸し）")
    if not rows:
        print("  ヒットなし")
        return rows
    shown = rows if verbose else rows[:25]
    for r in shown:
        print(f"  ★ {r['file']}:{r['line']}  {r['series']} {r['step']}  「{r['word']}」")
        print(f"     …{r['text']}…")
    if len(rows) > len(shown):
        print(f"  … 他 {len(rows) - len(shown)} 件（--verbose で全部）")
    print(f"  計 {len(rows)} 件（「届かない」と書いたら、何行で届くかを実際に数えてから書く。"
          "学習者が書き出して届いた瞬間に、教材への信頼が失われる）")
    return rows


# ────────────────────── 回帰テスト（既知の 3 事例） ──────────────────────

def self_test():
    """直す前のコミットを取り出して、5 本のチェックが実際に拾うかを確かめる。"""
    cases = [
        ("答えの先出し（指数対数 系列4 step9 → step10 の 480）",
         "460483d~1", "frontend/src/lib/seriesExpLog.ts", "leak", "480"),
        ("答えの先出し（微分積分 系列1 step6 → step7 の 6）",
         "5ea022c~1", "frontend/src/lib/seriesCalculus.ts", "leak", "6"),
        ("系列間の重複（指数対数 系列3 step10 ＝ 系列5 step10）",
         "460483d~1", "frontend/src/lib/seriesExpLog.ts", "dup", "step10,step10"),
        ("図の生の $（指数対数 SciNotationDigits ほか）",
         "460483d~1", "frontend/src/components/Math.tsx", "svg", None),
        ("参照先ずれ（微分積分 系列11 step3 が「step 1 の答え」と呼ぶ先が式）",
         "5ea022c~1", "frontend/src/lib/seriesCalculus.ts", "ref", "step1"),
        ("規模の宣言（数列 系列11 step9 の「届きませんでした」）",
         "33442a0~1", "frontend/src/lib/seriesSequence.ts", "claim", "届きませんでした"),
    ]
    ok = True
    for label, rev, path, kind, needle in cases:
        try:
            blob = subprocess.check_output(["git", "show", f"{rev}:{path}"],
                                           cwd=ROOT, text=True, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError:
            print(f"  ?  {label} … 取得できず（履歴が浅い可能性）")
            continue
        tmp = os.path.join("/tmp", "audit_selftest_" + os.path.basename(path))
        open(tmp, "w", encoding="utf-8").write(blob)
        buf, sys.stdout = sys.stdout, open(os.devnull, "w")
        try:
            if kind == "leak":
                rows = check_leak([tmp])
                hit = any(r["num"] == needle and r["dist"] == 1 for r in rows)
            elif kind == "dup":
                rows = check_dup([tmp])
                # 「同じ答えの組がどれか 1 つある」では通ってしまう。
                # 狙った組（needle の 2 つの step id を含む）を拾ったかで判定する
                want = set(needle.split(","))
                hit = any(want == {r["a"][2], r["b"][2]}
                          and r["a"][1] != r["b"][1] and r["same_answer"]
                          for r in rows)
            elif kind == "ref":
                rows = check_ref([tmp])
                hit = any(r["ref"] == needle for r in rows)
            elif kind == "claim":
                rows = check_claim([tmp])
                hit = any(needle in r["word"] or needle in r["text"] for r in rows)
            else:
                rows = check_svg([tmp])
                hit = len(rows) > 0
        finally:
            sys.stdout.close()
            sys.stdout = buf
            os.remove(tmp)
        print(("  OK " if hit else "  NG ") + label)
        ok = ok and hit
    print("\n回帰テスト:", "全件で検出できた" if ok else "検出できなかったものがある")
    return ok


# ─────────────────────────────── 入口 ───────────────────────────────

def main():
    ap = argparse.ArgumentParser(description="相互参照（二か所の関係）の監査")
    ap.add_argument("files", nargs="*", help="series*.ts のファイル名（省略時は全部）")
    ap.add_argument("--check", choices=["leak", "dup", "svg", "ref", "claim"],
                    help="1 本だけ走らせる")
    ap.add_argument("--verbose", action="store_true", help="件数を省略せず全部出す")
    ap.add_argument("--self-test", action="store_true", help="既知の 6 事例で回帰テスト")
    args = ap.parse_args()

    if args.self_test:
        sys.exit(0 if self_test() else 1)

    files = ([os.path.join(LIB, f) for f in args.files] if args.files
             else sorted(os.path.join(LIB, f) for f in os.listdir(LIB)
                         if f.startswith("series") and f.endswith(".ts")
                         and "Template" not in f and "Builder" not in f))
    print("対象:", ", ".join(os.path.basename(f) for f in files) if args.files else
          f"series*.ts {len(files)} ファイル")
    if args.check in (None, "leak"):
        check_leak(files, args.verbose)
    if args.check in (None, "dup"):
        check_dup(files, verbose=args.verbose)
    if args.check in (None, "svg"):
        check_svg(verbose=args.verbose)
    if args.check in (None, "ref"):
        check_ref(files, args.verbose)
    if args.check in (None, "claim"):
        check_claim(files, args.verbose)
    print("\n報告専用。ヒットは候補であって違反の断定ではない——★から目で確かめる。")


if __name__ == "__main__":
    main()
