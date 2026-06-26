#!/usr/bin/env python3
"""ヒント3層の「比較の指さし」準拠を機械チェックする監査ツール。

推理式の中核ふるまい（第2弾§4.3 フェードイン3層 / 第3弾§6.3.2 比較指さしの
禁止条項）が系列ごとに守られているかを走査して報告する。

使い方:
    python3 scripts/audit_hints.py            # 全 series*.ts を走査
    python3 scripts/audit_hints.py seriesAdvanced.ts   # 特定ファイルのみ

判定基準（Layer 1 がNGになる条件 = 中核ふるまいの裏切り）:
  - 計算・式が出ている（"8 - 2" "x²" など）        → Layer 3 まで温存すべき
  - 手順・公式名を直接指示している（"360°を引く" "公式：" 等）
  - 比較指さしでも Socratic な問いかけでもない（"前題と比べ" 等の語が無い）

誤検出に注意：Layer 1 が比較指さしの中で数式記法（√ x² (2,1) や問いかけの
「何を代入する？」など）に触れると「計算」「手順」と誤判定される。比較対象の形を
名指ししているだけなら違反ではない。△（違反 1〜3）はたいていこの誤検出。実害は
「Layer 1 が手順・計算結果・答えを実際に与えているか」を目視で確かめる。

これは「報告」ツール。CI ゲートにはしない（原則が落ち着くまで保留・memory
ruisuishiki-development-loop 2026-06-26 決定）。コミット前の手動確認に使う。
"""
import re
import sys
import glob
import os

LIB = os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "lib")

CALC = re.compile(r"[0-9０-９]\s*[×÷\+\-=＝*/]\s*[0-9０-９]|→|√|\\sqrt|\\frac|\^2|²")
METHOD = re.compile(
    r"(ずれる|代入する|代入し|移項|を引く|を足す|を割る|をかける|"
    r"平方完成する|展開する|因数分解する|公式：|２乗する|2乗する|逆数をかけ)"
)
COMPARE = re.compile(
    r"(前題|前の問題|前と|前々題|さっき|比べ|くらべ|どこが同じ|何が同じ|"
    r"何が違|どこが違|Step|どう変わ|そのまま使え|同じ仕組み)"
)
QUESTION = re.compile(
    r"(だろう|どうな|かな|？|\?|できる|見え|表せ|どこ|どっち|何を|"
    r"ありそう|出せそう|なる？|だろうか)"
)

HINT = re.compile(
    r"layer:\s*([123])\s*,\s*\n?\s*text:\s*\n?\s*\"((?:[^\"\\]|\\.)*)\""
)
SERIES = re.compile(r"^export const ([A-Z0-9_]+_SERIES)\b", re.M)
TITLE = re.compile(r'title:\s*"([^"]*)"')


def triples(block):
    flat = [(int(m.group(1)), m.group(2)) for m in HINT.finditer(block)]
    out, i = [], 0
    while i < len(flat):
        if flat[i][0] == 1:
            g = [flat[i]]
            j = i + 1
            while j < len(flat) and flat[j][0] in (2, 3) and flat[j][0] > g[-1][0]:
                g.append(flat[j])
                j += 1
            out.append(dict(g))
            i = j
        else:
            i += 1
    return out


def l1_violation(t):
    return bool(CALC.search(t) or METHOD.search(t) or not (COMPARE.search(t) or QUESTION.search(t)))


def audit_file(path):
    s = open(path, encoding="utf-8").read()
    bounds = [(m.start(), m.group(1)) for m in SERIES.finditer(s)]
    bounds.append((len(s), None))
    rows = []
    for k in range(len(bounds) - 1):
        seg = s[bounds[k][0]:bounds[k + 1][0]]
        name = bounds[k][1]
        tm = TITLE.search(seg)
        title = tm.group(1) if tm else name
        tr = triples(seg)
        if not tr:
            continue
        bad = sum(1 for d in tr if l1_violation(d.get(1, "")))
        rows.append((title, len(tr), bad))
    return rows


def main():
    args = sys.argv[1:]
    files = (
        [os.path.join(LIB, a) for a in args]
        if args
        else sorted(glob.glob(os.path.join(LIB, "series*.ts")))
    )
    total = bad_total = 0
    worst = []
    for f in files:
        rows = audit_file(f)
        if not rows:
            continue
        print(f"\n## {os.path.basename(f)}")
        for title, n, bad in rows:
            total += n
            bad_total += bad
            mark = "✅" if bad == 0 else ("△" if bad <= n // 2 else "❌")
            print(f"  {mark} {title:28s} 三層={n:3d} L1違反={bad:3d}")
            if bad > 1:
                worst.append((bad, title, os.path.basename(f)))
    print(f"\n{'='*50}\n合計 三層={total}  L1違反={bad_total}  準拠率={100*(total-bad_total)//max(total,1)}%")
    if worst:
        print("\n要修正（違反>1）の系列、違反数の多い順:")
        for bad, title, f in sorted(worst, reverse=True):
            print(f"  ❌ {title}  ({f}, L1違反={bad})")


if __name__ == "__main__":
    main()
