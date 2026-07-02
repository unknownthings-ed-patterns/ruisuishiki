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
  2. L3 の代筆検出：creation step の L3 に「完成句形式（長いかな連続＝5-7-5 のモーラ列）」が
     含まれていないか（moraCount 相当を Python 実装して機械検出）。
  3. データモデル検査：creation step に模範解答フィールド（answer/answerIndex/answerOrder）が無いか／
     観点セルフチェック（selfChecklist）が最初の読み比べ（comparison）step より前に出ていないか（G1）。
  4. オペレータ網羅：5オペレータ（同・逆・＋α・質的変化・複合）最低1 step（数学版の検査を流用）。
  5. 出典検査：MentorText 全件に sourceNote と rights があるか（G12）。
"""
import re
import os
import sys

LIB = os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "lib")
SERIES_FILE = os.path.join(LIB, "seriesKokugoHaiku.ts")
MENTOR_FILE = os.path.join(LIB, "mentorTexts.ts")

# ── ヒント抽出（数学版と同形式）──────────────────────────────
HINT = re.compile(r"layer:\s*([123])\s*,\s*\n?\s*text:\s*\n?\s*\"((?:[^\"\\]|\\.)*)\"")
COMPARE = re.compile(
    r"(前題|前の句|前の問題|前と|さっき|これまで|くらべ|比べ|何が同じ|どこが同じ|"
    r"何が違|どこが違|step|どう変わ|そのまま|同じ)"
)
QUESTION = re.compile(r"(だろう|どうな|かな|？|\?|どこ|どっち|何を|どんな|いくつ|見えて)")

# L1/L2 に出してはいけない技法名（先出し禁止・G1/§8.2-1）
GIHOU = re.compile(r"(季語|切れ字|切れ(?!い)|オノマトペ|字余り|字足らず|自由律|本歌取|押韻|体言止め)")
# 指示調（代筆・お手本を押しつける言い方）
SHIJI = re.compile(r"(と書きましょう|を使いましょう|と書こう|にしましょう|しなさい)")
# 計算・数式（数学版流用。国語では基本出ないが念のため）
CALC = re.compile(r"[0-9０-９]\s*[×÷\+\-=＝*/]\s*[0-9０-９]|→|√|\\sqrt|\\frac")

OPERATOR = re.compile(r'variationFromPrevious:\s*"(\w+)"')
REQUIRED_OPS = {"same", "inverse", "plus_alpha", "qualitative", "composite"}
OP_JP = {"same": "同", "inverse": "逆", "plus_alpha": "＋α", "qualitative": "質的変化", "composite": "複合"}

KANA = re.compile(r"[ぁ-ゖァ-ヺー]+")
SMALL = set("ぁぃぅぇぉゃゅょゎゕゖァィゥェォャュョヮヵヶ")


def count_mora(kana):
    """moraCount.ts と同じ規則（小書き=0、促音・撥音・長音=1）。"""
    n = 0
    for ch in kana:
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


def audit_series():
    src = open(SERIES_FILE, encoding="utf-8").read()
    problems = []
    steps = split_steps(src)

    # 最初の comparison step の位置（G1 セルフチェック順序の基準）
    first_comparison_pos = None
    for i, (sid, block) in enumerate(steps):
        if re.search(r'kind:\s*"comparison"', block):
            first_comparison_pos = i
            break

    l1_bad = 0
    triple_count = 0
    for i, (sid, block) in enumerate(steps):
        kind_m = re.search(r'kind:\s*"(\w+)"', block)
        kind = kind_m.group(1) if kind_m else "?"
        hints = [(int(m.group(1)), m.group(2)) for m in HINT.finditer(block)]
        by_layer = {}
        for layer, text in hints:
            by_layer[layer] = text
        if 1 in by_layer:
            triple_count += 1
            if l1_violation(by_layer[1]):
                l1_bad += 1
                problems.append(f"❌ {sid}: L1 が比較指さし/Socratic でない・計算/技法名を含む")
        # 規則1: L1/L2 の技法名・指示調
        for layer in (1, 2):
            t = by_layer.get(layer, "")
            if GIHOU.search(t):
                problems.append(f"❌ {sid}: L{layer} に技法名の先出し（{GIHOU.search(t).group(0)}）")
            if SHIJI.search(t):
                problems.append(f"❌ {sid}: L{layer} に指示調（{SHIJI.search(t).group(0)}）")
        # 規則2・3: creation step の検査
        if kind == "creation":
            # 模範解答フィールドが無いこと
            if re.search(r'\b(answer|answerIndex|answerOrder)\s*:', block):
                problems.append(f"❌ {sid}: creation step に模範解答フィールドが存在（代筆禁止違反）")
            # L3 の代筆検出（長いかな連続＝完成句形式）
            l3 = by_layer.get(3, "")
            for run in KANA.findall(l3):
                if count_mora(run) >= 12:
                    problems.append(
                        f"❌ {sid}: L3 に完成句らしい長いかな連続（{run}＝{count_mora(run)}音）＝代筆の疑い"
                    )
        # 規則3: selfChecklist が最初の comparison より前に出ていないか
        if "selfChecklist" in block:
            if first_comparison_pos is None or i < first_comparison_pos:
                problems.append(f"❌ {sid}: 観点セルフチェックが読み比べ(comparison)より前（G1違反）")

    # 規則4: オペレータ網羅
    ops = set(OPERATOR.findall(src))
    missing = REQUIRED_OPS - ops
    if missing:
        problems.append("⚠ オペレータ欠落: " + "・".join(OP_JP[o] for o in sorted(missing)))

    return triple_count, l1_bad, problems


def audit_mentor():
    src = open(MENTOR_FILE, encoding="utf-8").read()
    problems = []
    # id ごとにブロック分割して sourceNote / rights の有無を検査
    idxs = [m.start() for m in re.finditer(r'\bid:\s*"[a-z_]+"', src)]
    idxs.append(len(src))
    n = 0
    for i in range(len(idxs) - 1):
        block = src[idxs[i]:idxs[i + 1]]
        m = re.search(r'id:\s*"([a-z_]+)"', block)
        mid = m.group(1)
        n += 1
        if not re.search(r"sourceNote:\s*\n?\s*\"", block):
            problems.append(f"❌ {mid}: sourceNote が無い（G12）")
        if not re.search(r'rights:\s*"(PD|original|licensed)"', block):
            problems.append(f"❌ {mid}: rights（PD/original/licensed）が無い（G12）")
    return n, problems


def main():
    print("# audit_hints_kokugo — 国語ユニット（俳句）の規律チェック\n")
    triples, l1_bad, sprob = audit_series()
    print(f"## 系列 seriesKokugoHaiku.ts")
    print(f"  三層ヒント数 = {triples}  L1違反 = {l1_bad}")
    n_mentor, mprob = audit_mentor()
    print(f"## 模範句 mentorTexts.ts")
    print(f"  MentorText 件数 = {n_mentor}")

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


if __name__ == "__main__":
    sys.exit(main())
