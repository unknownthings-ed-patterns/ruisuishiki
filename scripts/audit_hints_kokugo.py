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
GIHOU = re.compile(r"(季語|切れ字|切れ(?!い)|オノマトペ|字余り|字足らず|自由律|本歌取|押韻|体言止め)")
# 指示調（代筆・お手本を押しつける言い方）
SHIJI = re.compile(r"(と書きましょう|を使いましょう|と書こう|にしましょう|しなさい)")
# 計算・数式（数学版流用。国語では基本出ないが念のため）
CALC = re.compile(r"[0-9０-９]\s*[×÷\+\-=＝*/]\s*[0-9０-９]|→|√|\\sqrt|\\frac")

OPERATOR = re.compile(r'variationFromPrevious:\s*"(\w+)"')
REQUIRED_OPS = {"same", "inverse", "plus_alpha", "qualitative", "composite"}
OP_JP = {"same": "同", "inverse": "逆", "plus_alpha": "＋α", "qualitative": "質的変化", "composite": "複合"}

KANA = re.compile(r"[ぁ-ゖァ-ヺー]+")
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


def is_whitelisted_kana_phrase(phrase, mentor_readings):
    kana = normalize_kana_text(phrase)
    if not kana:
        return False
    return any(kana in reading or reading in kana for reading in mentor_readings)


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
    mentor_readings = [
        normalize_kana_text(v["reading"])
        for v in mentor_entries.values()
        if v.get("reading")
    ]

    for series_id, series_block in split_series(src):
        stats["series"] += 1
        steps = split_steps(series_block)
        stats["steps"] += len(steps)
        step_ids = {sid for sid, _ in steps}

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
                l3 = by_layer.get(3, "")
                for run in KANA.findall(l3):
                    if count_mora(run) >= 12 and not is_whitelisted_kana_phrase(run, mentor_readings):
                        problems.append(
                            f"❌ {label}: L3 に完成句らしい長いかな連続（{run}＝{count_mora(run)}音）＝代筆の疑い"
                        )
                for phrase in KANA_PHRASE.findall(l3):
                    if "／" not in phrase and "/" not in phrase:
                        continue
                    mora = count_mora(phrase)
                    if mora >= 12 and not is_whitelisted_kana_phrase(phrase, mentor_readings):
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
        if not re.search(r'rights:\s*"(PD|original|licensed)"', block):
            problems.append(f"❌ {mid}: rights（PD/original/licensed）が無い（G12）")
        reading = entry.get("reading")
        if not reading:
            problems.append(f"❌ {mid}: reading が無い（音数検算不可）")
        else:
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
        for refs in re.finditer(r"\bmentorTextRefs\s*:\s*\[([^\]]*)\]", src, re.S):
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
        { layer: 3, text: "あさひさす／まどべにひかる／ゆめのあと" },
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
