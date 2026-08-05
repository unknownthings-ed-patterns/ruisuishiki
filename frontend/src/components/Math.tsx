"use client";

import "katex/dist/katex.min.css";
import React, { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { GLOSSARY, type GlossaryEntry, type VerifyResult } from "@/lib/glossary";
import { seriesHref } from "@/lib/seriesCatalog";

/**
 * 用語リンク：[用語名] と書かれた部分が、辞書に登録されていれば
 * ホバーまたはクリックで簡易説明と関連系列リンクを表示する。
 *
 * 辞書にない用語はそのまま素通し（リンクなし）で表示。
 */
function TermLink({ term }: { term: string }) {
  const [open, setOpen] = useState(false);
  const [easyOpen, setEasyOpen] = useState(false);
  const entry = GLOSSARY[term];

  // 辞書にない用語はそのまま素通し（角括弧は外す）
  if (!entry) {
    return <>{term}</>;
  }

  return (
    <>
      <span className="relative inline-block">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          className="text-accent underline underline-offset-2 cursor-help"
          style={{ textDecorationStyle: "dotted", textDecorationThickness: "1px" }}
          aria-expanded={open}
          aria-label={`用語の説明：${term}`}
        >
          {term}
        </button>
        {open && (
          <span
            role="tooltip"
            className="absolute z-20 left-0 top-full mt-1 w-64 sm:w-72 max-w-[calc(100vw-2rem)] p-3 rounded-lg border border-border shadow-lg"
            style={{
              background: "var(--background)",
              fontSize: "12px",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              textAlign: "left",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span className="block text-foreground">
              <MathText text={entry.short} />
            </span>
            <span className="flex flex-col gap-1 mt-2">
              {(entry.easy || entry.meaning) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEasyOpen(true);
                    setOpen(false);
                  }}
                  className="text-accent hover:underline text-left"
                  style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                >
                  もっと詳しく → 辞書ページを開く
                </button>
              )}
              {entry.relatedSeriesId && (
                <a
                  href={seriesHref(entry.relatedSeriesId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                  style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  歩いて学ぶ → 関連の系列へ
                </a>
              )}
            </span>
          </span>
        )}
      </span>
      {easyOpen && (entry.easy || entry.meaning) && (
        <EasyExplanationModal
          term={term}
          entry={entry}
          onClose={() => setEasyOpen(false)}
        />
      )}
    </>
  );
}

/**
 * 用語の「易しい例」を全画面のモーダルで表示する。
 * 易しい例は MathBody 互換のテキスト（$...$ や **強調**、図マーカーも使える）。
 */
/**
 * 構造化された辞書ページ。
 * 教師のワークシート方式（4象限）に対応する 4セクション：
 *   §1 定義（説明）と例
 *   §2 図や絵
 *   §3 使う場面 / 生活の中では？
 *   §4 にていることば / なかまのことば
 *
 * 空のセクション（未記入）は描画しない。書く対象が一目で見える設計。
 */
export function StructuredDictionaryPage({ entry }: { entry: GlossaryEntry }) {
  const sections: { label: string; text: string }[] = [];
  if (entry.meaning) sections.push({ label: "定義（説明）と例", text: entry.meaning });
  if (entry.figures) sections.push({ label: "図や絵", text: entry.figures });
  if (entry.scenes) sections.push({ label: "使う場面 — 生活の中では？", text: entry.scenes });
  if (entry.relatedTerms)
    sections.push({ label: "にていることば — なかまのことば", text: entry.relatedTerms });
  return (
    <>
      {sections.map((s, i) => (
        <span
          key={s.label}
          className={
            i === 0
              ? "block"
              : "block mt-6 pt-5 border-t border-border/60"
          }
        >
          <span
            className="block text-muted mb-3"
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "none",
            }}
          >
            §{i + 1}　{s.label}
          </span>
          <span
            className="block text-foreground/85"
            style={{ fontSize: "14px" }}
          >
            <MathBody text={s.text} />
          </span>
        </span>
      ))}
    </>
  );
}

function EasyExplanationModal({
  term,
  entry,
  onClose,
}: {
  term: string;
  entry: GlossaryEntry;
  onClose: () => void;
}) {
  const relatedSeriesId = entry.relatedSeriesId;
  // ESC キーで閉じる
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    // body スクロールを止める
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <span
      role="dialog"
      aria-modal="true"
      aria-label={`${term} の易しい例`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "color-mix(in oklch, var(--background) 70%, transparent)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <span
        className="relative block w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg border border-border p-6 sm:p-8 shadow-xl"
        style={{ background: "var(--background)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex items-baseline justify-between mb-4">
          <span
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(20px, 1.5rem, 24px)", letterSpacing: "0.06em" }}
          >
            {term}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors"
            style={{ fontSize: "13px", letterSpacing: "0.1em" }}
            aria-label="閉じる"
          >
            閉じる ✕
          </button>
        </span>
        {entry.meaning ? (
          <StructuredDictionaryPage entry={entry} />
        ) : entry.easy ? (
          <span className="block text-foreground/85" style={{ fontSize: "14px" }}>
            <MathBody text={entry.easy} />
          </span>
        ) : null}

        {entry.example && <TryExample term={term} entry={entry} />}

        {relatedSeriesId && (
          <span className="block mt-6 pt-4 border-t border-border">
            <a
              href={seriesHref(relatedSeriesId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background transition-transform hover:scale-[1.02]"
              style={{ fontSize: "13px", letterSpacing: "0.15em" }}
            >
              系列を歩いて体感する →
            </a>
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * 文字列中の **強調** 部分を <strong> に変換し、その断片を返す。
 * 用語 [...] は TermLink に置換する。
 * MathText の中で使う。
 */
function renderTermLinks(text: string, keyPrefix: string): React.ReactNode[] {
  // [用語名] の形式を検出して、辞書にあれば TermLink に置換
  // 中身は日本語英数字を許容、改行や ] は含まない
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\[\]\n]+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <TermLink key={`${keyPrefix}t${keyCounter++}`} term={match[1]} />
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

/**
 * `$...$` を KaTeX インライン数式に、`[用語]` を TermLink に変換する。
 * 強調の内側でも同じ処理を通したいので、独立した関数にしてある。
 */
function renderMathAndTerms(
  text: string,
  keyPrefix: string,
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\$([^$\n]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(...renderTermLinks(before, `${keyPrefix}m${keyCounter}`));
    }
    parts.push(
      <InlineMath key={`${keyPrefix}m${keyCounter++}`} math={match[1]} />
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex);
    parts.push(...renderTermLinks(tail, `${keyPrefix}mt${keyCounter}`));
  }
  return parts;
}

/**
 * 問題文中の `$...$` を KaTeX でインライン描画する。
 * `**強調**` も <strong> として処理する。
 *
 * 使い方：問題文の数式部分を $...$ で囲む。
 * 例：「$(x+1)(x+2)$ を展開すると $x^2 + \\square x + 2$ になります。」
 *
 * $...$ の外は通常テキストとして表示する。
 *
 * パース順は **強調 → 数式・用語**。逆順にすると `**周期は $n-1$ 桁以下**` の
 * ような「数式をまたぐ強調」で `**` が別断片に分かれ、閉じ側が見つからずに
 * アスタリスクがそのまま学習者に見えてしまう。
 */
export function MathText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*\n]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(...renderMathAndTerms(before, `p${keyCounter}`));
    }
    parts.push(
      <strong key={`b${keyCounter}`} className="text-foreground">
        {renderMathAndTerms(match[1], `s${keyCounter++}`)}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex);
    parts.push(...renderMathAndTerms(tail, `pt${keyCounter}`));
  }
  return <>{parts}</>;
}

/**
 * 「自分で例を作って確かめる」インタラクティブセクション。
 * 結城浩さんのパタン「例示は理解の試金石」を実装。
 *
 * - 入力フィールドに値を入れる
 * - 「確かめる」ボタンで verify 関数を呼ぶ
 * - 結果（成功・失敗）と詳細・メッセージ・ヒントを表示
 * - 成功した例は localStorage に蓄積（「集める喜び」）
 */
function TryExample({
  term,
  entry,
}: {
  term: string;
  entry: GlossaryEntry;
}) {
  const spec = entry.example;
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(spec?.inputs.map((i) => [i.name, ""]) ?? []),
  );
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [foundExamples, setFoundExamples] = useState<string[]>([]);

  const storageKey = `ruisuishiki:examples:${term}`;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setFoundExamples(parsed);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  if (!spec) return null;

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!spec) return;
    const parsed: Record<string, number> = {};
    for (const i of spec.inputs) {
      const raw = (values[i.name] || "").trim();
      if (raw === "") return;
      const num = parseFloat(
        raw
          .replace(/[０-９]/g, (c) =>
            String.fromCharCode(c.charCodeAt(0) - 0xfee0),
          )
          .replace(/[ー−–—]/g, "-"),
      );
      if (Number.isNaN(num)) return;
      parsed[i.name] = num;
    }
    const r = spec.verify(parsed);
    setResult(r);

    // 成功で自明でなく、まだ見つけていない例なら追加
    if (r.ok && !r.trivial && !foundExamples.includes(r.canonicalKey)) {
      const updated = [r.canonicalKey, ...foundExamples].slice(0, 30); // 最大30件
      setFoundExamples(updated);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
    }
  }

  function handleReset() {
    if (!spec) return;
    setValues(Object.fromEntries(spec.inputs.map((i) => [i.name, ""])));
    setResult(null);
  }

  // 新規発見か（成功時のみ意味あり）
  const isNew =
    result?.ok && !result.trivial && foundExamples[0] === result.canonicalKey;
  // 既に見つけていた例（成功・既出）
  const isRepeat =
    result?.ok &&
    !result.trivial &&
    !isNew &&
    foundExamples.includes(result.canonicalKey);

  return (
    <span className="block mt-6 pt-4 border-t border-border">
      <span
        className="block text-foreground mb-2"
        style={{ fontSize: "13px", letterSpacing: "0.2em" }}
      >
        🔧 自分で例を作ってみる
      </span>
      <span
        className="block text-muted mb-4"
        style={{ fontSize: "13px", lineHeight: 1.8 }}
      >
        <MathText text={spec.prompt} />
      </span>

      <form onSubmit={handleCheck} className="flex flex-col gap-3 mb-4">
        <span className="flex flex-wrap gap-3 items-baseline">
          {spec.inputs.map((i) => (
            <label
              key={i.name}
              className="flex items-baseline gap-2"
              style={{ fontSize: "13px" }}
            >
              <span className="text-muted">{i.label} =</span>
              <input
                type="text"
                inputMode="numeric"
                value={values[i.name]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [i.name]: e.target.value }))
                }
                className="w-16 px-2 py-1 rounded border border-border bg-background text-foreground text-center tnum focus-visible:outline-none focus-visible:border-accent transition-colors"
                style={{ fontSize: "14px" }}
                aria-label={i.label}
              />
            </label>
          ))}
        </span>
        <span className="flex gap-3">
          <button
            type="submit"
            disabled={spec.inputs.some((i) => !values[i.name]?.trim())}
            className="px-5 py-2 rounded-lg bg-accent text-background disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-[1.02]"
            style={{ fontSize: "12px", letterSpacing: "0.15em" }}
          >
            確かめる
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-muted hover:text-foreground transition-colors"
            style={{ fontSize: "12px", letterSpacing: "0.1em" }}
          >
            リセット
          </button>
        </span>
      </form>

      {result && (
        <span
          className="block rounded-lg p-4 mb-4"
          style={{
            background: result.ok
              ? result.trivial
                ? "color-mix(in oklch, var(--surface) 85%, var(--warning) 15%)"
                : "color-mix(in oklch, var(--surface) 75%, var(--success) 25%)"
              : "color-mix(in oklch, var(--surface) 85%, var(--warning) 15%)",
          }}
          role="status"
          aria-live="polite"
        >
          <span
            className="block mb-1"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: result.ok && !result.trivial ? "var(--success)" : "var(--warning)",
            }}
          >
            {result.ok ? (result.trivial ? "🤔" : isRepeat ? "✓ また見つけました" : isNew ? "🎉 新しい発見！" : "✓") : "✗"}
          </span>
          <span
            className="block text-foreground mb-2"
            style={{ fontSize: "13px", lineHeight: 1.8 }}
          >
            <MathText text={result.detail} />
          </span>
          <span
            className="block text-foreground/85"
            style={{ fontSize: "13px", lineHeight: 1.8 }}
          >
            <MathText text={result.message} />
          </span>
          {result.hint && (
            <span
              className="block mt-2 text-muted"
              style={{ fontSize: "12px", lineHeight: 1.7 }}
            >
              💡 <MathText text={result.hint} />
            </span>
          )}
        </span>
      )}

      {foundExamples.length > 0 && (
        <span className="block">
          <span
            className="block text-muted mb-2"
            style={{ fontSize: "11px", letterSpacing: "0.2em" }}
          >
            📦 これまでに見つけた例（{foundExamples.length}）
          </span>
          <span className="flex flex-wrap gap-2">
            {foundExamples.map((ex, i) => (
              <span
                key={ex}
                className="px-2.5 py-1 rounded border border-border text-foreground tnum"
                style={{
                  fontSize: "12px",
                  background:
                    i === 0
                      ? "color-mix(in oklch, var(--surface) 70%, var(--success) 30%)"
                      : "var(--surface)",
                }}
              >
                ({ex})
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}

/**
 * 円と直線の位置関係 3 通り（離れている・接する・交わる）を一枚で示す図。
 * 各パネルで距離 d と半径 r の関係を視覚化。
 */
export function CircleLinePositions() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 480 220"
      className="w-full h-auto"
      style={{ maxWidth: 480 }}
      role="img"
      aria-label="円と直線の位置関係 3 通り：離れている・接する・交わる"
    >
      {/* Panel 1: d > r 離れている */}
      <circle cx="80" cy="80" r="30" fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      <circle cx="80" cy="80" r="2.5" fill={stroke} />
      <line x1="20" y1="160" x2="140" y2="160" stroke={stroke} strokeWidth="1.5" />
      <line x1="80" y1="80" x2="80" y2="160" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <text x="86" y="125" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">d</text>
      <text x="80" y="184" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        d &gt; r
      </text>
      <text x="80" y="204" fontSize="11" fill={stroke} textAnchor="middle">
        離れている（0 個）
      </text>

      {/* Panel 2: d = r 接する */}
      <circle cx="240" cy="80" r="30" fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      <circle cx="240" cy="80" r="2.5" fill={stroke} />
      <line x1="180" y1="110" x2="300" y2="110" stroke={stroke} strokeWidth="1.5" />
      <line x1="240" y1="80" x2="240" y2="110" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <text x="246" y="100" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">d</text>
      <circle cx="240" cy="110" r="3.5" fill={accent} />
      <text x="240" y="184" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        d = r
      </text>
      <text x="240" y="204" fontSize="11" fill={stroke} textAnchor="middle">
        接する（1 個）
      </text>

      {/* Panel 3: d < r 交わる */}
      <circle cx="400" cy="80" r="30" fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      <circle cx="400" cy="80" r="2.5" fill={stroke} />
      <line x1="340" y1="90" x2="460" y2="90" stroke={stroke} strokeWidth="1.5" />
      <line x1="400" y1="80" x2="400" y2="90" stroke={accent} strokeWidth="1.2" strokeDasharray="2,1.5" />
      <text x="408" y="89" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">d</text>
      <circle cx="372" cy="90" r="3.5" fill={accent} />
      <circle cx="428" cy="90" r="3.5" fill={accent} />
      <text x="400" y="184" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        d &lt; r
      </text>
      <text x="400" y="204" fontSize="11" fill={stroke} textAnchor="middle">
        交わる（2 個）
      </text>
    </svg>
  );
}

/**
 * 円の接線（接点が与えられた場合）。
 * 円・接点 P(a, b)・半径 OP・接線・直角マーカー・公式ラベル。
 */
export function CircleTangentAtPoint() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const Ox = 200;
  const Oy = 130;
  const r = 65;
  /* P at math angle from atan(4/3) ≈ 53.13°, i.e. (3, 4) scaled — gives clean placement */
  const Px = Ox + (r * 3) / 5; // 239
  const Py = Oy - (r * 4) / 5; // 78
  /* tangent unit direction (perpendicular to OP), going down-right */
  const tux = 4 / 5;
  const tuy = 3 / 5;
  const halfLen = 80;
  const Tx1 = Px - halfLen * tux;
  const Ty1 = Py - halfLen * tuy;
  const Tx2 = Px + halfLen * tux;
  const Ty2 = Py + halfLen * tuy;
  return (
    <svg
      viewBox="0 0 460 240"
      className="w-full h-auto"
      style={{ maxWidth: 460 }}
      role="img"
      aria-label="円の接線：接点 P(a, b) における接線 ax + by = r²"
    >
      {/* 円 */}
      <circle cx={Ox} cy={Oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      {/* 軸（薄く） */}
      <line x1={Ox - 100} y1={Oy} x2={Ox + 130} y2={Oy} stroke={muted} strokeWidth="0.8" />
      <line x1={Ox} y1={Oy - 100} x2={Ox} y2={Oy + 100} stroke={muted} strokeWidth="0.8" />
      {/* 半径 OP */}
      <line x1={Ox} y1={Oy} x2={Px} y2={Py} stroke={stroke} strokeWidth="1.4" strokeDasharray="3,2" />
      {/* 接線 */}
      <line x1={Tx1} y1={Ty1} x2={Tx2} y2={Ty2} stroke={accent} strokeWidth="2" />
      {/* 直角マーカー */}
      <polyline
        points={`${Px - 8 * 3 / 5},${Py + 8 * 4 / 5} ${Px - 8 * 3 / 5 + 8 * 4 / 5},${Py + 8 * 4 / 5 + 8 * 3 / 5} ${Px + 8 * 4 / 5},${Py + 8 * 3 / 5}`}
        fill="none"
        stroke={accent}
        strokeWidth="1.1"
      />
      {/* O */}
      <circle cx={Ox} cy={Oy} r="2.5" fill={stroke} />
      <text x={Ox - 8} y={Oy + 14} fontSize="12" fill={stroke} fontStyle="italic">O</text>
      {/* P(a, b) */}
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text x={Px + 8} y={Py - 6} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic">
        P(a, b)
      </text>
      {/* 接線ラベル */}
      <text
        x={Tx2 + 6}
        y={Ty2 + 6}
        fontSize="12"
        fill={accent}
        fontStyle="italic"
        fontWeight="600"
      >
        ax + by = r²
      </text>
      {/* 円の式（左上） */}
      <text x="20" y="28" fontSize="12" fill={muted} fontStyle="italic">
        x² + y² = r²
      </text>
      {/* 半径ラベル */}
      <text x={Ox + 18} y={Oy - 24} fontSize="11" fill={muted} fontStyle="italic">
        r
      </text>
    </svg>
  );
}

/**
 * Step 1 専用：円 x²+y² = 10、接点 P(3, 1)、接線 3x + y = 10。
 * 30 px / 1 math unit。
 */
export function CircleTangentStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const Ox = 140;
  const Oy = 140;
  const scale = 30;
  const r = Math.sqrt(10) * scale; // ≈ 94.87
  /* P math(3, 1) → SVG */
  const Px = Ox + 3 * scale; // 230
  const Py = Oy - 1 * scale; // 110
  /* OP svg vector = (90, -30). 接線は OP に直交 → 単位ベクトル (1/√10, 3/√10) */
  const tux = 1 / Math.sqrt(10);
  const tuy = 3 / Math.sqrt(10);
  const halfLen = 80;
  const T1x = Px - halfLen * tux;
  const T1y = Py - halfLen * tuy;
  const T2x = Px + halfLen * tux;
  const T2y = Py + halfLen * tuy;
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="円 x² + y² = 10、接点 P(3, 1)、接線 3x + y = 10"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="260" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>
      <circle cx={Ox} cy={Oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      {/* 半径 OP（破線） */}
      <line x1={Ox} y1={Oy} x2={Px} y2={Py} stroke={stroke} strokeWidth="1.2" strokeDasharray="3,2" />
      {/* 接線 */}
      <line x1={T1x} y1={T1y} x2={T2x} y2={T2y} stroke={accent} strokeWidth="2" />
      {/* 直角マーカー */}
      <polyline
        points={`${Px - 8 * 3 / Math.sqrt(10)},${Py + 8 / Math.sqrt(10)} ${Px - 8 * 3 / Math.sqrt(10) + 8 / Math.sqrt(10)},${Py + 8 / Math.sqrt(10) + 8 * 3 / Math.sqrt(10)} ${Px + 8 / Math.sqrt(10)},${Py + 8 * 3 / Math.sqrt(10)}`}
        fill="none"
        stroke={accent}
        strokeWidth="1.1"
      />
      <circle cx={Ox} cy={Oy} r="2.5" fill={stroke} />
      <text x={Ox - 6} y={Oy + 14} fontSize="11" fill={stroke} textAnchor="end" fontStyle="italic">O</text>
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text x={Px + 8} y={Py - 6} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic">
        P(3, 1)
      </text>
      <text x="20" y="28" fontSize="12" fill={muted} fontStyle="italic">
        x² + y² = 10
      </text>
      <text
        x={T2x - 6}
        y={T2y + 16}
        fontSize="12"
        fill={accent}
        fontStyle="italic"
        fontWeight="600"
      >
        3x + y = N
      </text>
    </svg>
  );
}

/**
 * 円外の点 + 2 接点 を描く共通レンダラ（Step 8〜10 で使用）。
 */
function CircleTangentFromExtFig({
  rSqLabel,
  scale,
  Q,
  T1,
  T2,
}: {
  rSqLabel: string;
  scale: number;
  Q: [number, number];
  T1: [number, number];
  T2: [number, number];
}) {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const rMath = Math.sqrt(T1[0] * T1[0] + T1[1] * T1[1]);
  const rSvg = rMath * scale;
  /* viewBox は外側の点まで余裕を持って入るように、原点を左に寄せて配置 */
  const xs = [0, Q[0], T1[0], T2[0]];
  const ys = [0, Q[1], T1[1], T2[1]];
  const minX = Math.min(...xs) - 1.5;
  const maxX = Math.max(...xs) + 1.5;
  const minY = Math.min(...ys) - 1.5;
  const maxY = Math.max(...ys) + 1.5;
  const padding = 30;
  const vbW = (maxX - minX) * scale + padding * 2;
  const vbH = (maxY - minY) * scale + padding * 2;
  const Ox = -minX * scale + padding;
  const Oy = maxY * scale + padding;
  const toSvg = (p: [number, number]): [number, number] => [Ox + p[0] * scale, Oy - p[1] * scale];
  const [Qx, Qy] = toSvg(Q);
  const [T1x, T1y] = toSvg(T1);
  const [T2x, T2y] = toSvg(T2);
  /* 接線を Q の向こう側にも少し延ばす */
  const extend = (a: [number, number], b: [number, number], t1: number, t2: number): [number, number, number, number] => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return [a[0] - t1 * dx, a[1] - t1 * dy, b[0] + t2 * dx, b[1] + t2 * dy];
  };
  const [l1x1, l1y1, l1x2, l1y2] = extend([T1x, T1y], [Qx, Qy], 0.25, 0.15);
  const [l2x1, l2y1, l2x2, l2y2] = extend([T2x, T2y], [Qx, Qy], 0.25, 0.15);
  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className="w-full h-auto"
      style={{ maxWidth: Math.min(360, vbW * 1.05) }}
      role="img"
      aria-label={`円 ${rSqLabel}、外側の点 Q(${Q[0]}, ${Q[1]}) から接線 2 本、接点 (${T1[0]}, ${T1[1]}) と (${T2[0]}, ${T2[1]})`}
    >
      <line x1="0" y1={Oy} x2={vbW} y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2={vbH} stroke={muted} strokeWidth="0.5" />
      <circle cx={Ox} cy={Oy} r={rSvg} fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      <line x1={Ox} y1={Oy} x2={T1x} y2={T1y} stroke={stroke} strokeWidth="1" strokeDasharray="3,2" />
      <line x1={Ox} y1={Oy} x2={T2x} y2={T2y} stroke={stroke} strokeWidth="1" strokeDasharray="3,2" />
      <line x1={l1x1} y1={l1y1} x2={l1x2} y2={l1y2} stroke={accent} strokeWidth="2" />
      <line x1={l2x1} y1={l2y1} x2={l2x2} y2={l2y2} stroke={accent} strokeWidth="2" />
      <circle cx={Ox} cy={Oy} r="2.5" fill={stroke} />
      <text x={Ox - 6} y={Oy + 14} fontSize="11" fill={stroke} textAnchor="end" fontStyle="italic">O</text>
      <circle cx={Qx} cy={Qy} r="4" fill={stroke} />
      <text x={Qx + 8} y={Qy - 4} fontSize="12" fill={stroke} fontWeight="600" fontStyle="italic">
        Q({Q[0]}, {Q[1]})
      </text>
      <circle cx={T1x} cy={T1y} r="4" fill={accent} />
      <text x={T1x - 10} y={T1y - 6} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic" textAnchor="end">
        ({T1[0]}, {T1[1] < 0 ? `−${Math.abs(T1[1])}` : T1[1]})
      </text>
      <circle cx={T2x} cy={T2y} r="4" fill={accent} />
      <text x={T2x + 8} y={T2y + 14} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic">
        ({T2[0]}, {T2[1] < 0 ? `−${Math.abs(T2[1])}` : T2[1]})
      </text>
      <text x="12" y="20" fontSize="12" fill={muted} fontStyle="italic">
        {rSqLabel}
      </text>
    </svg>
  );
}

/** Step 8：円 x²+y²=5、外側 (3, 1)、接点 (1, 2), (2, -1) */
export function CircleTangentStep8() {
  return <CircleTangentFromExtFig rSqLabel="x² + y² = 5" scale={32} Q={[3, 1]} T1={[1, 2]} T2={[2, -1]} />;
}

/** Step 9：円 x²+y²=10、外側 (4, 2)、接点 (1, 3), (3, -1) */
export function CircleTangentStep9() {
  return <CircleTangentFromExtFig rSqLabel="x² + y² = 10" scale={28} Q={[4, 2]} T1={[1, 3]} T2={[3, -1]} />;
}

/** Step 10：円 x²+y²=25、外側 (7, 1)、接点 (3, 4), (4, -3) */
export function CircleTangentStep10() {
  return <CircleTangentFromExtFig rSqLabel="x² + y² = 25" scale={20} Q={[7, 1]} T1={[3, 4]} T2={[4, -3]} />;
}

/**
 * 束の考え方 Step 1：2 直線 L₁: x+y-3=0、L₂: 2x-y=0 の交点 Q(1, 2)、
 * 通したい点 P(0, 1)、Q を通る直線の家族（束）を薄い破線で示唆。
 * 答え（k = -2 / 結果の直線 x-y+1=0）は描かない。
 */
export function BundleStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 160;
  const Oy = 200;
  const scale = 35;
  // 交点 Q (math: 1, 2)
  const Qx = Ox + 1 * scale;
  const Qy = Oy - 2 * scale;
  // 通したい点 P (math: 0, 1)
  const Px = Ox;
  const Py = Oy - 1 * scale;
  // 束の家族（L₁ の傾き -1、L₂ の傾き 2、答え線の傾き 1 を避ける）
  const familySlopes = [-2, 0, 0.5, 3];
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 直線 L₁, L₂ の交点 Q、通したい点 P、Q を通る直線の家族（束）"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="280" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      {/* 束の家族（薄い破線） */}
      {familySlopes.map((m, i) => {
        // 直線 y = m·x + (2 - m) を math x = ±5 で延長
        const yL = -6 * m + 2;
        const yR = 4 * m + 2;
        const x1 = Ox - 5 * scale;
        const y1 = Oy - yL * scale;
        const x2 = Ox + 5 * scale;
        const y2 = Oy - yR * scale;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={muted}
            strokeWidth="0.9"
            strokeDasharray="3,3"
            opacity="0.4"
          />
        );
      })}

      {/* L₁: x+y-3=0（傾き -1、(3,0) と (0,3) を通る） */}
      <line x1="65" y1="0" x2="320" y2="255" stroke={stroke} strokeWidth="1.5" />
      {/* L₂: 2x-y=0（傾き 2、原点と (1,2)） */}
      <line x1="260" y1="0" x2="120" y2="280" stroke={stroke} strokeWidth="1.5" />

      {/* ラベル */}
      <text x="92" y="22" fontSize="12" fill={stroke} fontStyle="italic">L₁</text>
      <text x="265" y="22" fontSize="12" fill={stroke} fontStyle="italic">L₂</text>

      {/* 交点 Q */}
      <circle cx={Qx} cy={Qy} r="4" fill={accent} />
      <text x={Qx + 8} y={Qy - 6} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic">
        Q（交点）
      </text>

      {/* 通したい点 P */}
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text
        x={Px - 8}
        y={Py + 16}
        fontSize="11"
        fill={accent}
        fontWeight="600"
        fontStyle="italic"
        textAnchor="end"
      >
        P(0, 1)
      </text>
    </svg>
  );
}

/**
 * 束の考え方 Step 5（質的変化：直線 → 円）：2 円 C₁, C₂ の 2 交点と
 * 通したい点 P。「直線が円に変わっただけで手順は同じ」を視覚化。
 * 答え（k=1 / 結果の円）は描かない。
 */
export function BundleStep5() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const Ox = 130;
  const Oy = 170;
  const scale = 35;
  // C₁: 中心 (0,0), r=2
  const C1x = Ox;
  const C1y = Oy;
  const C1r = 2 * scale;
  // C₂: 中心 (1,2), r=1
  const C2x = Ox + 1 * scale;
  const C2y = Oy - 2 * scale;
  const C2r = 1 * scale;
  // 2 交点 (0, 2) と (8/5, 6/5)
  const Ax = Ox;
  const Ay = Oy - 2 * scale;
  const Bx = Ox + 1.6 * scale;
  const By = Oy - 1.2 * scale;
  // P (1, 0)
  const Px = Ox + 1 * scale;
  const Py = Oy;
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 円 C₁, C₂ の交点 2 つと通したい点 P"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="280" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      <circle cx={C1x} cy={C1y} r={C1r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      <circle cx={C2x} cy={C2y} r={C2r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      <text x="40" y={Oy - 60} fontSize="12" fill={stroke} fontStyle="italic">C₁</text>
      <text x={C2x + C2r + 4} y={C2y - C2r + 12} fontSize="12" fill={stroke} fontStyle="italic">C₂</text>

      {/* 2 交点 */}
      <circle cx={Ax} cy={Ay} r="3" fill={accent} />
      <circle cx={Bx} cy={By} r="3" fill={accent} />
      <text x={Ax - 8} y={Ay - 6} fontSize="10" fill={accent} fontStyle="italic" textAnchor="end">
        2 交点
      </text>

      {/* 通したい点 P */}
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text x={Px + 10} y={Py + 4} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic">
        P(1, 0)
      </text>
    </svg>
  );
}

/**
 * 束の考え方 Step 8（質的変化：k=-1 で根軸が現れる）：2 円 C₁, C₂ と、
 * 束 C₁ + kC₂ = 0 が直線になる瞬間に現れる根軸を accent 色で示す。
 * 答え（k=-1）は問題で問うているもの。図には現れない。
 */
export function BundleStep8() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const Ox = 120;
  const Oy = 160;
  const scale = 16;
  // C₁: 中心 (0,0), r=5
  const C1x = Ox;
  const C1y = Oy;
  const C1r = 5 * scale;
  // C₂: 中心 (3,4), r=5
  const C2x = Ox + 3 * scale;
  const C2y = Oy - 4 * scale;
  const C2r = 5 * scale;
  // 根軸 6x+8y=25：math x=-3 から x=7 までで viewBox を横切る
  const RxL = Ox - 3 * scale;
  const RyL = Oy - 5.375 * scale;
  const RxR = Ox + 7 * scale;
  const RyR = Oy - -2.125 * scale;
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 円 C₁, C₂ と、束で現れる根軸（直線）"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="280" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      <circle cx={C1x} cy={C1y} r={C1r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      <circle cx={C2x} cy={C2y} r={C2r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      <text x="20" y={Oy + 56} fontSize="12" fill={stroke} fontStyle="italic">C₁</text>
      <text x={C2x + C2r - 14} y={C2y - C2r + 14} fontSize="12" fill={stroke} fontStyle="italic">C₂</text>

      {/* 根軸（束で直線になる瞬間に現れる） */}
      <line x1={RxL} y1={RyL} x2={RxR} y2={RyR} stroke={accent} strokeWidth="2" />
      <text x={RxR - 60} y={RyR + 18} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">
        根軸（直線）
      </text>
    </svg>
  );
}

/**
 * 束の考え方 Step 10（逆：定点問題）：パラメータ a を変えると直線
 * (a+1)x + (a-1)y - 2a = 0 が回転するが、必ず定点 (1, 1) を通る。
 * 4 つの a 値の代表線を薄く描き、定点を accent 色で強調。
 * 答え（定点の x 座標 = 1）の数値そのものは図に書かない（座標ラベル
 * では「(1, 1)」と位置として示し、問題で問うているのは x 座標）。
 */
export function BundleStep10() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 130;
  const Oy = 200;
  const scale = 35;
  // 定点 (1, 1)
  const Fx = Ox + 1 * scale;
  const Fy = Oy - 1 * scale;
  // 代表の a 値
  const aValues = [-1, 0, 1, 2];
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="パラメータ a を変えると直線が回転するが、定点を必ず通る"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="280" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      {/* 4 本の代表直線（すべて定点を通る） */}
      {aValues.map((a, i) => {
        // 法線 (a+1, a-1)、方向 (1-a, a+1)。定点 (1, 1) から halfM 単位だけ伸ばす
        const dxM = 1 - a;
        const dyM = a + 1;
        const lenM = Math.sqrt(dxM * dxM + dyM * dyM);
        const halfM = 6;
        const x1M = 1 + (halfM * dxM) / lenM;
        const y1M = 1 + (halfM * dyM) / lenM;
        const x2M = 1 - (halfM * dxM) / lenM;
        const y2M = 1 - (halfM * dyM) / lenM;
        const x1 = Ox + x1M * scale;
        const y1 = Oy - y1M * scale;
        const x2 = Ox + x2M * scale;
        const y2 = Oy - y2M * scale;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={muted}
            strokeWidth="1.2"
            opacity="0.55"
          />
        );
      })}

      {/* 定点 */}
      <circle cx={Fx} cy={Fy} r="5" fill={accent} />
      <text x={Fx + 10} y={Fy + 4} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic">
        定点
      </text>

      {/* 説明（隅） */}
      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        (a + 1) x + (a − 1) y − 2 a = 0
      </text>
      <text x="14" y="36" fontSize="10" fill={muted}>
        a を動かすと直線は回転する
      </text>
    </svg>
  );
}

/**
 * 新しい数を作る Step 1：複素平面（実軸 + 虚軸）に i と -i を強調。
 * $x^2 = -1$ の解が虚軸上にある $2$ 点であることを視覚化。答え（-1）は描かない。
 */
export function ComplexStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 160;
  const Oy = 140;
  const scale = 50;
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="複素平面：i と -i は虚軸上の 2 点（x² = -1 の解）"
    >
      <defs>
        <marker id="cx1-arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
        </marker>
        <marker id="cx1-arr-u" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,10 L5,0 L10,10 z" fill="var(--muted)" />
        </marker>
      </defs>

      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="1" markerEnd="url(#cx1-arr-r)" />
      <line x1={Ox} y1="260" x2={Ox} y2="20" stroke={muted} strokeWidth="1" markerEnd="url(#cx1-arr-u)" />

      <text x="286" y={Oy + 14} fontSize="11" fill={muted} fontStyle="italic">実軸</text>
      <text x={Ox + 6} y="30" fontSize="11" fill={muted} fontStyle="italic">虚軸</text>

      {/* 0, 1, -1 on real axis */}
      <circle cx={Ox - scale} cy={Oy} r="2.5" fill={stroke} />
      <text x={Ox - scale} y={Oy + 16} fontSize="11" fill={stroke} textAnchor="middle">−1</text>
      <circle cx={Ox + scale} cy={Oy} r="2.5" fill={stroke} />
      <text x={Ox + scale} y={Oy + 16} fontSize="11" fill={stroke} textAnchor="middle">1</text>
      <circle cx={Ox} cy={Oy} r="2" fill={muted} />
      <text x={Ox - 6} y={Oy + 16} fontSize="11" fill={muted} textAnchor="end">0</text>

      {/* i (highlighted) */}
      <circle cx={Ox} cy={Oy - scale} r="5" fill={accent} />
      <text x={Ox + 10} y={Oy - scale + 5} fontSize="14" fill={accent} fontWeight="700" fontStyle="italic">
        i
      </text>

      {/* -i (highlighted) */}
      <circle cx={Ox} cy={Oy + scale} r="5" fill={accent} />
      <text x={Ox + 10} y={Oy + scale + 5} fontSize="14" fill={accent} fontWeight="700" fontStyle="italic">
        −i
      </text>

      <text x="20" y="22" fontSize="10" fill={muted} fontStyle="italic">
        x² = −1 の解は虚軸上の 2 点（i と −i）
      </text>
    </svg>
  );
}

/**
 * 新しい数を作る Step 4：複素平面で 1+i と 1-i を共役対として強調。
 * 実軸に関して対称な 2 点。答え（積 = 2）は描かない。
 */
export function ComplexStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 140;
  const Oy = 140;
  const scale = 55;
  const Px = Ox + scale;
  const Py1 = Oy - scale;
  const Py2 = Oy + scale;
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="複素平面：1+i と 1-i は実軸に関して対称な共役対"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="1" />
      <line x1={Ox} y1="260" x2={Ox} y2="20" stroke={muted} strokeWidth="1" />
      <text x="286" y={Oy + 14} fontSize="11" fill={muted} fontStyle="italic">実軸</text>
      <text x={Ox + 6} y="30" fontSize="11" fill={muted} fontStyle="italic">虚軸</text>

      <circle cx={Ox} cy={Oy} r="2" fill={muted} />
      <text x={Ox - 6} y={Oy + 16} fontSize="11" fill={muted} textAnchor="end">0</text>
      <circle cx={Ox + scale} cy={Oy} r="2.5" fill={muted} />
      <text x={Ox + scale} y={Oy + 16} fontSize="10" fill={muted} textAnchor="middle">1</text>

      {/* 1 + i */}
      <circle cx={Px} cy={Py1} r="5" fill={accent} />
      <text x={Px + 10} y={Py1 + 5} fontSize="13" fill={accent} fontWeight="700" fontStyle="italic">
        1 + i
      </text>

      {/* 1 - i */}
      <circle cx={Px} cy={Py2} r="5" fill={accent} />
      <text x={Px + 10} y={Py2 + 5} fontSize="13" fill={accent} fontWeight="700" fontStyle="italic">
        1 − i
      </text>

      {/* vertical dashed line showing symmetry */}
      <line x1={Px} y1={Py1} x2={Px} y2={Py2} stroke={accent} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

      <text x="20" y="22" fontSize="10" fill={muted} fontStyle="italic">
        1+i と 1−i は実軸に関して対称（共役対）
      </text>
    </svg>
  );
}

/**
 * 新しい数を作る Step 6：分母の実数化の手順を schematic で示す。
 * 「分母の共役を分母・分子に掛ける」というレシピ。
 * 答え（虚部 = 1）は描かない。
 */
export function ComplexStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 230"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="分母の実数化：分母の共役を分母・分子に掛ける"
    >
      <defs>
        <marker id="cx6-arr-d" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* before */}
      <text x="58" y="36" fontSize="11" fill={stroke}>分子</text>
      <text x="58" y="80" fontSize="11" fill={stroke}>分母</text>
      <line x1="100" y1="50" x2="240" y2="50" stroke={stroke} strokeWidth="1.5" />
      <text x="170" y="36" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        a + bi
      </text>
      <text x="170" y="74" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        c + di
      </text>

      {/* arrow down */}
      <line x1="170" y1="100" x2="170" y2="135" stroke={muted} strokeWidth="1" markerEnd="url(#cx6-arr-d)" />
      <text x="180" y="122" fontSize="10" fill={muted} fontStyle="italic">
        分母の共役 c − di を上下に掛ける
      </text>

      {/* after */}
      <line x1="60" y1="175" x2="280" y2="175" stroke={accent} strokeWidth="1.5" />
      <text x="170" y="163" fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        (a + bi)(c − di)
      </text>
      <text x="170" y="198" fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        c² + d²
      </text>

      <text x="14" y="222" fontSize="10" fill={muted} fontStyle="italic">
        分母が実数 c² + d² になる → 複素数の標準形に戻せる
      </text>
    </svg>
  );
}

/**
 * 2 次方程式の実数解 Step 1（D > 0）：放物線 y = x² - 5x + 6 が x 軸と 2 点で交わる。
 * 答え（大きい方の解 = 3）は数値ラベルとしては描かない。dot は描くが目盛りは付けない。
 */
export function QuadraticStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 40;
  const Oy = 220;
  const xScale = 40;
  const yScale = 20;
  const samples: string[] = [];
  for (let xi = -0.5; xi <= 5.5; xi += 0.1) {
    const yi = xi * xi - 5 * xi + 6;
    const sx = Ox + xi * xScale;
    const sy = Oy - yi * yScale;
    samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="放物線 y = x² − 5x + 6 が x 軸と 2 点で交わる（D > 0、異なる 2 実数解）"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="240" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      <polyline points={samples.join(" ")} fill="none" stroke={stroke} strokeWidth="1.5" />

      {/* 2 つの交点（accent ドット、数値ラベルなし） */}
      <circle cx={Ox + 2 * xScale} cy={Oy} r="4" fill={accent} />
      <circle cx={Ox + 3 * xScale} cy={Oy} r="4" fill={accent} />

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        y = x² − 5x + 6（D &gt; 0）
      </text>
      <text x="14" y="38" fontSize="10" fill={muted}>
        x 軸と 2 点で交わる → 異なる 2 実数解
      </text>
    </svg>
  );
}

/**
 * 2 次方程式の実数解 Step 4（D = 0）：放物線 y = x² - 12x + 36 = (x-6)² が
 * x 軸に「接する」。重解 1 点を accent ドット。答え（重解の値 = 6）は数値で描かない。
 */
export function QuadraticStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 50;
  const Oy = 230;
  const xScale = 25;
  const yScale = 13;
  const samples: string[] = [];
  for (let xi = 2; xi <= 10; xi += 0.1) {
    const yi = (xi - 6) * (xi - 6);
    const sx = Ox + xi * xScale;
    const sy = Oy - yi * yScale;
    samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="放物線 y = (x − 6)² が x 軸に接する（D = 0、重解）"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="240" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      <polyline points={samples.join(" ")} fill="none" stroke={stroke} strokeWidth="1.5" />

      {/* 接点（accent ドット、重解の場所、数値ラベルなし） */}
      <circle cx={Ox + 6 * xScale} cy={Oy} r="4.5" fill={accent} />

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        y = (x − 6)²（D = 0）
      </text>
      <text x="14" y="38" fontSize="10" fill={muted}>
        x 軸に接する → 重解（1 つの値が 2 重）
      </text>
    </svg>
  );
}

/**
 * 2 次方程式の実数解 Step 5（D < 0）：放物線 y = x² + 2x + 5 が x 軸と
 * 交わらない（実数解なし → 複素数の世界に 2 つの虚数解が住む）。
 * 答え（虚部 b = 2）は描かない。
 */
export function QuadraticStep5() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 130;
  const Oy = 220;
  const xScale = 30;
  const yScale = 14;
  const samples: string[] = [];
  for (let xi = -4; xi <= 2; xi += 0.1) {
    const yi = xi * xi + 2 * xi + 5;
    const sx = Ox + xi * xScale;
    const sy = Oy - yi * yScale;
    samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="放物線 y = x² + 2x + 5 が x 軸と交わらない（D < 0、虚数解）"
    >
      <line x1="0" y1={Oy} x2="320" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="0" x2={Ox} y2="240" stroke={muted} strokeWidth="0.5" />
      <text x="312" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="12" fontSize="10" fill={muted}>y</text>

      <polyline points={samples.join(" ")} fill="none" stroke={stroke} strokeWidth="1.5" />

      {/* 頂点（accent ドット、x 軸の上にあることを示す） */}
      <circle cx={Ox - 1 * xScale} cy={Oy - 4 * yScale} r="3.5" fill={accent} />

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        y = x² + 2x + 5（D &lt; 0）
      </text>
      <text x="14" y="38" fontSize="10" fill={muted}>
        x 軸と交わらない → 実数解なし。複素数の世界に虚数解が 2 つ
      </text>
    </svg>
  );
}

/**
 * 解と因数分解 Step 1：因数分解 → 解 の流れ図（schematic）。
 * 具体的な数値（解の積 = 6）は描かず、構造だけを示す。
 */
export function FactorStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 230"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 次方程式の因数分解 → 解 の流れ図"
    >
      <defs>
        <marker id="fac1-arr-d" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* equation */}
      <text x="160" y="30" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        x² − 5x + 6 = 0
      </text>

      {/* arrow + 因数分解 */}
      <line x1="160" y1="48" x2="160" y2="80" stroke={muted} strokeWidth="1" markerEnd="url(#fac1-arr-d)" />
      <text x="170" y="68" fontSize="11" fill={muted} fontStyle="italic">因数分解</text>

      {/* factored form */}
      <text x="160" y="110" fontSize="15" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        (x − α)(x − β) = 0
      </text>

      {/* arrow + AB=0 の原理 */}
      <line x1="160" y1="128" x2="160" y2="160" stroke={muted} strokeWidth="1" markerEnd="url(#fac1-arr-d)" />
      <text x="170" y="148" fontSize="11" fill={muted} fontStyle="italic">AB = 0 なら A = 0 か B = 0</text>

      {/* roots */}
      <text x="160" y="190" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        x = α  または  x = β
      </text>

      {/* annotation */}
      <text x="14" y="218" fontSize="10" fill={muted} fontStyle="italic">
        係数を比較すれば：α + β = 5、α β = ?
      </text>
    </svg>
  );
}

/**
 * 解と因数分解 Step 4：非モニック（a ≠ 1）の因数分解で
 * 先頭の a が前に出ることを強調。値（α β = -1）は描かない。
 */
export function FactorStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="非モニックの 2 次式の因数分解：先頭の a が前に出る"
    >
      {/* general form with a highlighted */}
      <text x="14" y="44" fontSize="14" fill={muted} fontStyle="italic">
        モニック（a = 1）:
      </text>
      <text x="170" y="44" fontSize="14" fill={stroke} fontStyle="italic">
        x² + bx + c = (x − α)(x − β)
      </text>

      <line x1="14" y1="62" x2="306" y2="62" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />

      <text x="14" y="92" fontSize="14" fill={muted} fontStyle="italic">
        一般（a ≠ 1）:
      </text>
      <text x="170" y="92" fontSize="14" fill={stroke} fontStyle="italic">
        ax² + bx + c =
      </text>
      <text x="170" y="116" fontSize="15" fill={accent} fontStyle="italic" fontWeight="700">
        a
      </text>
      <text x="184" y="116" fontSize="14" fill={stroke} fontStyle="italic">
        (x − α)(x − β)
      </text>

      <text x="14" y="155" fontSize="11" fill={muted} fontStyle="italic">
        x² の係数を合わせるため、先頭に a が必要
      </text>
      <text x="14" y="175" fontSize="10" fill={muted}>
        例：2x² + 3x − 2 = 2(x − α)(x − β)
      </text>
    </svg>
  );
}

/**
 * 解と因数分解 Step 5：複素数解（共役対）でも因数分解できる。
 * 複素平面で 2 つの共役解を accent ドットで表示。値（α β = 8）は描かない。
 */
export function FactorStep5() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 140;
  const Oy = 130;
  const scale = 28;
  // -2 + 2i → (Ox - 2*scale, Oy - 2*scale)
  // -2 - 2i → (Ox - 2*scale, Oy + 2*scale)
  const Ax = Ox - 2 * scale;
  const Ay = Oy - 2 * scale;
  const Bx = Ox - 2 * scale;
  const By = Oy + 2 * scale;
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="複素数解の共役ペア：複素平面で実軸に関して対称"
    >
      <line x1="20" y1={Oy} x2="290" y2={Oy} stroke={muted} strokeWidth="1" />
      <line x1={Ox} y1="20" x2={Ox} y2="240" stroke={muted} strokeWidth="1" />
      <text x="280" y={Oy + 14} fontSize="11" fill={muted} fontStyle="italic">実軸</text>
      <text x={Ox + 6} y="30" fontSize="11" fill={muted} fontStyle="italic">虚軸</text>

      <circle cx={Ox} cy={Oy} r="2" fill={muted} />
      <text x={Ox - 6} y={Oy + 14} fontSize="11" fill={muted} textAnchor="end">0</text>

      {/* α = -2 + 2i */}
      <circle cx={Ax} cy={Ay} r="5" fill={accent} />
      <text x={Ax - 8} y={Ay - 6} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic" textAnchor="end">α</text>

      {/* β = -2 - 2i */}
      <circle cx={Bx} cy={By} r="5" fill={accent} />
      <text x={Bx - 8} y={By + 14} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic" textAnchor="end">β</text>

      {/* vertical dashed line connecting them (showing symmetry) */}
      <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke={accent} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

      {/* labels */}
      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        x² + 4x + 8 = (x − α)(x − β)
      </text>
      <text x="14" y="252" fontSize="10" fill={muted}>
        α, β は実軸に関して対称な共役ペア
      </text>
    </svg>
  );
}

/**
 * 解と係数の関係 Step 1：因数分解 → 展開 → 係数比較 の流れ図。
 * 答え（α + β = 7、αβ = 12）は描かない。「? = 7」「? = 12」とせず、
 * 比較で結びつく構造だけを示す。
 */
export function VietaStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 次方程式 → 因数分解 → 展開 → 係数比較 の流れ図"
    >
      <defs>
        <marker id="vieta1-arr" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* 元の式 */}
      <text x="160" y="26" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        x² − 7x + 12 = 0
      </text>

      {/* 矢印 + 因数分解 */}
      <line x1="160" y1="40" x2="160" y2="70" stroke={muted} strokeWidth="1" markerEnd="url(#vieta1-arr)" />
      <text x="170" y="59" fontSize="11" fill={muted} fontStyle="italic">因数分解</text>

      {/* 因数分解形 */}
      <text x="160" y="96" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        (x − α)(x − β) = 0
      </text>

      {/* 矢印 + 展開 */}
      <line x1="160" y1="110" x2="160" y2="140" stroke={muted} strokeWidth="1" markerEnd="url(#vieta1-arr)" />
      <text x="170" y="129" fontSize="11" fill={muted} fontStyle="italic">展開</text>

      {/* 展開形 */}
      <text x="160" y="166" fontSize="15" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        x² − (α + β) x + α β = 0
      </text>

      {/* 係数比較の点線 */}
      <line x1="40" y1="186" x2="280" y2="186" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />
      <text x="160" y="200" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        ↑ 係数を比較すると ↑
      </text>

      {/* 比較結果（値は未知のまま） */}
      <text x="160" y="226" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        α + β = −(−7),   α β = 12
      </text>
      <text x="160" y="248" fontSize="10" fill={muted} textAnchor="middle">
        x の係数を符号反転、定数項そのまま（a = 1 のとき）
      </text>
    </svg>
  );
}

/**
 * 解と係数の関係 Step 4：a = 1 と a ≠ 1 の対比表。
 * 「a で割る」一手間が加わることを強調。具体値（α + β = 4）は描かない。
 */
export function VietaStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="モニック（a = 1）と非モニック（a ≠ 1）の対比：解と係数の関係に a で割る一手間が加わる"
    >
      {/* モニック側 */}
      <text x="14" y="32" fontSize="12" fill={muted} fontStyle="italic">
        モニック（a = 1）:
      </text>
      <text x="14" y="56" fontSize="14" fill={stroke} fontStyle="italic">
        x² + bx + c = 0
      </text>
      <text x="14" y="80" fontSize="13" fill={stroke} fontStyle="italic">
        α + β = −b,   α β = c
      </text>

      <line x1="14" y1="100" x2="306" y2="100" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />

      {/* 非モニック側 */}
      <text x="14" y="124" fontSize="12" fill={muted} fontStyle="italic">
        一般（a ≠ 1）:
      </text>
      <text x="14" y="148" fontSize="14" fill={stroke} fontStyle="italic">
        ax² + bx + c = 0
      </text>
      <text x="14" y="174" fontSize="13" fill={accent} fontStyle="italic" fontWeight="700">
        α + β = −b/a,   α β = c/a
      </text>

      <text x="14" y="200" fontSize="10" fill={muted} fontStyle="italic">
        x² の係数 a で割る一手間が加わる
      </text>
    </svg>
  );
}

/**
 * 解と係数の関係 Step 5：α² + β² = (α+β)² − 2αβ の幾何的視覚化。
 * 大きな正方形 (α+β)² の中に α², β² と 2 つの αβ 長方形が並ぶ
 * 「正方形分解」図。具体的な値（21）は描かない。
 */
export function VietaStep5() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillAB = "color-mix(in oklch, var(--accent) 14%, transparent)";
  const fillAA = "color-mix(in oklch, var(--foreground) 8%, transparent)";
  // 正方形 (α+β)² を 4 つに分割
  // 簡略化のため α : β = 3 : 2 で図示
  const Ox = 60;
  const Oy = 40;
  const aSize = 90;
  const bSize = 60;
  const total = aSize + bSize;
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="(α+β)² を α², αβ, αβ, β² の 4 つに分割した正方形図。2 つの αβ を引くと α² + β² が残る"
    >
      {/* 大正方形の輪郭 */}
      <rect x={Ox} y={Oy} width={total} height={total} fill="none" stroke={stroke} strokeWidth="1" />

      {/* α² の正方形（左上） */}
      <rect x={Ox} y={Oy} width={aSize} height={aSize} fill={fillAA} stroke={stroke} strokeWidth="0.6" />
      <text x={Ox + aSize / 2} y={Oy + aSize / 2 + 5} fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        α²
      </text>

      {/* αβ の長方形（右上） */}
      <rect x={Ox + aSize} y={Oy} width={bSize} height={aSize} fill={fillAB} stroke={stroke} strokeWidth="0.6" />
      <text x={Ox + aSize + bSize / 2} y={Oy + aSize / 2 + 5} fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        α β
      </text>

      {/* αβ の長方形（左下） */}
      <rect x={Ox} y={Oy + aSize} width={aSize} height={bSize} fill={fillAB} stroke={stroke} strokeWidth="0.6" />
      <text x={Ox + aSize / 2} y={Oy + aSize + bSize / 2 + 5} fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        α β
      </text>

      {/* β² の正方形（右下） */}
      <rect x={Ox + aSize} y={Oy + aSize} width={bSize} height={bSize} fill={fillAA} stroke={stroke} strokeWidth="0.6" />
      <text x={Ox + aSize + bSize / 2} y={Oy + aSize + bSize / 2 + 5} fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        β²
      </text>

      {/* 外側ラベル：α と β */}
      <text x={Ox + aSize / 2} y={Oy - 8} fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">α</text>
      <text x={Ox + aSize + bSize / 2} y={Oy - 8} fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">β</text>
      <text x={Ox - 12} y={Oy + aSize / 2 + 4} fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">α</text>
      <text x={Ox - 12} y={Oy + aSize + bSize / 2 + 4} fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">β</text>

      {/* 上側の総辺ラベル */}
      <text x={Ox + total / 2} y={Oy + total + 18} fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">
        辺の長さ：α + β
      </text>

      {/* 注記 */}
      <text x="14" y="246" fontSize="11" fill={muted} fontStyle="italic">
        (α + β)² の正方形から αβ 2 つを引くと α² + β² が残る
      </text>
    </svg>
  );
}

/**
 * 解と係数の関係 Step 8：解 → 方程式の逆向き図。
 * 「解 3, 5」→ α + β, αβ → 方程式 x² + bx + c = 0 の流れ。
 * 答え（c = 15）は描かない。「c = ?」のまま。
 */
export function VietaStep8() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 解 3, 5 から x² + bx + c = 0 を逆向きに作る流れ図"
    >
      <defs>
        <marker id="vieta8-arr" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* 数直線（解の可視化） */}
      <line x1="40" y1="40" x2="280" y2="40" stroke={muted} strokeWidth="1" />
      {/* 目盛り 0, 3, 5 */}
      {[0, 3, 5].map((v) => {
        const x = 40 + v * 36;
        return (
          <g key={v}>
            <line x1={x} y1="36" x2={x} y2="44" stroke={muted} strokeWidth="0.6" />
            <text x={x} y="58" fontSize="10" fill={muted} textAnchor="middle">{v}</text>
          </g>
        );
      })}
      {/* 解 3, 5 の accent ドット */}
      <circle cx={40 + 3 * 36} cy="40" r="4.5" fill={accent} />
      <circle cx={40 + 5 * 36} cy="40" r="4.5" fill={accent} />
      <text x={40 + 3 * 36} y="28" fontSize="11" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">α</text>
      <text x={40 + 5 * 36} y="28" fontSize="11" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">β</text>

      {/* 矢印 ↓ */}
      <line x1="160" y1="78" x2="160" y2="106" stroke={muted} strokeWidth="1" markerEnd="url(#vieta8-arr)" />
      <text x="170" y="96" fontSize="10" fill={muted} fontStyle="italic">和と積を計算</text>

      {/* 和と積 */}
      <text x="160" y="128" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        α + β = 3 + 5,   α β = 3 · 5
      </text>

      {/* 矢印 ↓ */}
      <line x1="160" y1="142" x2="160" y2="166" stroke={muted} strokeWidth="1" markerEnd="url(#vieta8-arr)" />
      <text x="170" y="158" fontSize="10" fill={muted} fontStyle="italic">−(α+β), αβ を係数に</text>

      {/* 方程式（c は未知のまま） */}
      <text x="160" y="190" fontSize="15" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        x² + b x + c = 0
      </text>
      <text x="160" y="210" fontSize="10" fill={muted} textAnchor="middle">
        b と c をそれぞれ係数として読む
      </text>
    </svg>
  );
}

/**
 * 剰余の定理 Step 1：割り算 → 代入の翻訳を縦に並べた流れ図。
 * 「$x = 1$ を代入すると $(x - 1) Q$ が消える」ことを示す。
 * 具体的な答え（R = 4）は描かない。$R$ のまま。
 */
export function RemainderStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="P(x) = (x − 1) Q(x) + R に x = 1 を代入すると (x − 1) Q の部分が消えて R だけが残る流れ図"
    >
      <defs>
        <marker id="rem1-arr" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* 上段：もとの式 */}
      <text x="160" y="28" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        P(x) = (x − 1) Q(x) + R
      </text>

      {/* 矢印 + ラベル */}
      <line x1="160" y1="42" x2="160" y2="78" stroke={muted} strokeWidth="1" markerEnd="url(#rem1-arr)" />
      <text x="170" y="64" fontSize="11" fill={muted} fontStyle="italic">x = 1 を代入</text>

      {/* 中段：代入結果 */}
      <text x="160" y="102" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        P(1) = (1 − 1) Q(1) + R
      </text>

      {/* ハイライト：(1 − 1) = 0 */}
      <text x="160" y="128" fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        = 0 · Q(1) + R
      </text>
      <text x="160" y="148" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        Q の部分が消える
      </text>

      {/* 矢印 + ラベル */}
      <line x1="160" y1="160" x2="160" y2="194" stroke={muted} strokeWidth="1" markerEnd="url(#rem1-arr)" />

      {/* 下段：結論 */}
      <text x="160" y="220" fontSize="16" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">
        R = P(1)
      </text>

      {/* 一番下の注記 */}
      <line x1="40" y1="240" x2="280" y2="240" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />
      <text x="160" y="260" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        割り算 → 1 点での代入に翻訳
      </text>
    </svg>
  );
}

/**
 * 剰余の定理 Step 4：因数定理「3 通りの言い方」の三角形図。
 * P(a) = 0、x − a が因数、x = a が解 — 3 つが等価。
 * 具体的な数値は使わず、a のまま。
 */
export function RemainderStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 三角形の頂点座標
  const top = { x: 160, y: 50 };
  const bl = { x: 50, y: 180 };
  const br = { x: 270, y: 180 };
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="P(a) = 0、x − a が因数、x = a が解 — 3 通りの言い方が等価であることを示す三角形図"
    >
      {/* 三角形の 3 辺（双方向の同値関係） */}
      <line x1={top.x} y1={top.y + 8} x2={bl.x + 10} y2={bl.y - 12} stroke={muted} strokeWidth="1" />
      <line x1={top.x} y1={top.y + 8} x2={br.x - 10} y2={bl.y - 12} stroke={muted} strokeWidth="1" />
      <line x1={bl.x + 20} y1={bl.y} x2={br.x - 20} y2={bl.y} stroke={muted} strokeWidth="1" />

      {/* ⟺ 記号を辺の中央に */}
      <text x={(top.x + bl.x) / 2 - 6} y={(top.y + bl.y) / 2 + 4} fontSize="16" fill={accent} fontWeight="700" textAnchor="middle">⟺</text>
      <text x={(top.x + br.x) / 2 + 6} y={(top.y + bl.y) / 2 + 4} fontSize="16" fill={accent} fontWeight="700" textAnchor="middle">⟺</text>
      <text x={(bl.x + br.x) / 2} y={bl.y - 4} fontSize="16" fill={accent} fontWeight="700" textAnchor="middle">⟺</text>

      {/* 頂点：上 — P(a) = 0 */}
      <text x={top.x} y={top.y} fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        P(a) = 0
      </text>
      <text x={top.x} y={top.y - 14} fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">1 点での値</text>

      {/* 頂点：左下 — x − a が因数 */}
      <text x={bl.x} y={bl.y + 4} fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        x − a が因数
      </text>
      <text x={bl.x} y={bl.y + 20} fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">割り切れる</text>

      {/* 頂点：右下 — x = a が解 */}
      <text x={br.x} y={bl.y + 4} fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        x = a が解
      </text>
      <text x={br.x} y={bl.y + 20} fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">方程式の根</text>

      {/* 中央のラベル */}
      <text x="160" y="130" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        同じ事柄の
      </text>
      <text x="160" y="144" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        3 通りの言い方
      </text>

      {/* 一番下の注記 */}
      <text x="160" y="240" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        1 点の値が、整式の大域構造（因数・解）を見抜く
      </text>
    </svg>
  );
}

/**
 * 剰余の定理 Step 6：1 次式 ax + b のゼロ点を代入する図。
 * 直線 y = ax + b が x 軸を切る点を強調。具体的な答え（R = 1）は描かない。
 */
export function RemainderStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 座標系：原点 (160, 150)、x 軸は y = 150、ゼロ点を x = 200 あたりに
  const Ox = 160;
  const Oy = 150;
  const zeroX = 200; // ゼロ点の x 座標（具体値は隠す）
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="直線 y = ax + b が x 軸を切るゼロ点 x = −b/a を強調。この点を代入すると (ax + b) Q が消える"
    >
      {/* 上部の式 */}
      <text x="160" y="26" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        P(x) = (ax + b) Q(x) + R
      </text>

      {/* 座標軸 */}
      <line x1="40" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.6" />
      <line x1={Ox} y1="60" x2={Ox} y2="220" stroke={muted} strokeWidth="0.6" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="64" fontSize="10" fill={muted}>y</text>
      <text x={Ox - 4} y={Oy + 12} fontSize="10" fill={muted} textAnchor="end">O</text>

      {/* 直線 y = ax + b（斜め） */}
      <line x1="60" y1={Oy + 75} x2="290" y2={Oy - 70} stroke={stroke} strokeWidth="1.4" />
      <text x="60" y={Oy + 92} fontSize="12" fill={stroke} fontStyle="italic">y = ax + b</text>

      {/* ゼロ点の強調 */}
      <circle cx={zeroX} cy={Oy} r="5" fill={accent} />
      <text x={zeroX} y={Oy + 24} fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">
        x = −b/a
      </text>
      <line x1={zeroX} y1={Oy - 30} x2={zeroX} y2={Oy} stroke={accent} strokeWidth="0.6" strokeDasharray="2,2" />

      {/* 注記 */}
      <text x="160" y={Oy + 50} fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        この点を代入すると (ax + b) Q(x) = 0
      </text>

      {/* 結論 */}
      <line x1="40" y1="224" x2="280" y2="224" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />
      <text x="160" y="246" fontSize="14" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">
        R = P(−b/a)
      </text>
    </svg>
  );
}

/**
 * 剰余の定理 Step 9：除数が 2 次のときの「2 点で代入」図。
 * 数直線上の x = a, x = b を強調。具体的な値は描かない（a, b のまま）。
 */
export function RemainderStep9() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 280"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="除数 (x − a)(x − b) のゼロ点 x = a, x = b を数直線上に示し、両方を代入することで余り px + q の p, q を決める流れ図"
    >
      <defs>
        <marker id="rem9-arr" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,10 L5,0 L10,10 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* 上段：式 */}
      <text x="160" y="26" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        P(x) = (x − a)(x − b) Q(x) + (px + q)
      </text>

      {/* 数直線 */}
      <line x1="40" y1="100" x2="280" y2="100" stroke={muted} strokeWidth="1" />
      <text x="296" y="104" fontSize="10" fill={muted}>x</text>

      {/* 数直線上の 2 点（accent ドット） */}
      <circle cx="100" cy="100" r="5" fill={accent} />
      <circle cx="220" cy="100" r="5" fill={accent} />
      <text x="100" y="120" fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">x = a</text>
      <text x="220" y="120" fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">x = b</text>

      {/* 矢印 ↑（2 点それぞれから上の式へ） */}
      <line x1="100" y1="92" x2="100" y2="56" stroke={muted} strokeWidth="0.8" markerEnd="url(#rem9-arr)" />
      <line x1="220" y1="92" x2="220" y2="56" stroke={muted} strokeWidth="0.8" markerEnd="url(#rem9-arr)" />

      {/* 注記 */}
      <text x="160" y="150" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        代入すると (x − a)(x − b) Q = 0 になり、
      </text>
      <text x="160" y="166" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        余りの式に値を入れた結果が残る
      </text>

      {/* 結論行 */}
      <line x1="40" y1="184" x2="280" y2="184" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />
      <text x="160" y="208" fontSize="14" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">
        P(a) = pa + q
      </text>
      <text x="160" y="230" fontSize="14" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">
        P(b) = pb + q
      </text>

      {/* 一番下の注記 */}
      <text x="160" y="262" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        除数の次数が上がると、代入する点の数も増える
      </text>
    </svg>
  );
}

/**
 * 軌跡 Step 1：原点 O を中心とする円（条件 OP = r、変数 r で抽象的に表示）。
 * 具体的な r 値や答え（N = 9）は描かない。
 */
export function LocusStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const Ox = 160;
  const Oy = 130;
  const r = 75;
  // P を 30 度位置に置く（時計回り上方）
  const angle = -Math.PI / 6;
  const Px = Ox + r * Math.cos(angle);
  const Py = Oy + r * Math.sin(angle);
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="原点 O を中心とする円。P は OP = r の条件を満たして動く"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="240" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      <circle cx={Ox} cy={Oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      <circle cx={Ox} cy={Oy} r="2.5" fill={muted} />
      <text x={Ox - 4} y={Oy + 14} fontSize="11" fill={muted} textAnchor="end" fontStyle="italic">O</text>

      <line x1={Ox} y1={Oy} x2={Px} y2={Py} stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text x={Px + 8} y={Py + 4} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic">P</text>
      <text x={(Ox + Px) / 2 - 8} y={(Oy + Py) / 2 - 8} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">
        OP = r
      </text>

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        P の軌跡 = O を中心とする半径 r の円
      </text>
    </svg>
  );
}

/**
 * 軌跡 Step 4：アポロニウスの円。O と A の間で「距離の比 = 一定」の点 P の軌跡が円。
 * 内分点と外分点を accent ドットで示す。中心位置は明示しない。
 */
export function LocusStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // 単位スケール
  const Ox = 60;
  const Oy = 140;
  const scale = 32;
  const Opx = Ox; // O = (0, 0)
  const Apx = Ox + 3 * scale; // A = (3, 0)
  const InPx = Ox + 2 * scale; // 内分点 (2, 0)
  const ExPx = Ox + 6 * scale; // 外分点 (6, 0)
  const Cx = Ox + 4 * scale; // 中心 (4, 0)
  const radius = 2 * scale;
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="アポロニウスの円：OP : AP = 2 : 1 の点 P の軌跡"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />

      <circle cx={Cx} cy={Oy} r={radius} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      <circle cx={Opx} cy={Oy} r="3.5" fill={muted} />
      <text x={Opx - 4} y={Oy + 16} fontSize="11" fill={muted} textAnchor="end" fontStyle="italic">O</text>

      <circle cx={Apx} cy={Oy} r="3.5" fill={muted} />
      <text x={Apx + 4} y={Oy + 16} fontSize="11" fill={muted} fontStyle="italic">A</text>

      <circle cx={InPx} cy={Oy} r="3" fill={accent} />
      <text x={InPx} y={Oy + 26} fontSize="9" fill={accent} fontStyle="italic" textAnchor="middle">内分</text>

      <circle cx={ExPx} cy={Oy} r="3" fill={accent} />
      <text x={ExPx} y={Oy + 26} fontSize="9" fill={accent} fontStyle="italic" textAnchor="middle">外分</text>

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        OP : AP = 2 : 1 の点 P の軌跡（アポロニウスの円）
      </text>
      <text x="14" y="218" fontSize="10" fill={muted}>
        内分点と外分点を直径の両端とする円
      </text>
    </svg>
  );
}

/**
 * 軌跡 Step 6：2 点 A, B から等距離 → 垂直二等分線。
 * 中点 M を通り、AB に垂直な直線を accent 色で。中点の具体的座標は明示しない。
 */
export function LocusStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 80;
  const Oy = 140;
  const scale = 28;
  const Ax = Ox;
  const Bx = Ox + 6 * scale;
  const Mx = Ox + 3 * scale;
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="2 点 A, B から等距離の軌跡：AB の垂直二等分線"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.4" />

      {/* AB 線分 */}
      <line x1={Ax} y1={Oy} x2={Bx} y2={Oy} stroke={stroke} strokeWidth="1.5" />

      <circle cx={Ax} cy={Oy} r="4" fill={muted} />
      <text x={Ax - 4} y={Oy + 18} fontSize="11" fill={muted} textAnchor="end" fontStyle="italic">A</text>

      <circle cx={Bx} cy={Oy} r="4" fill={muted} />
      <text x={Bx + 4} y={Oy + 18} fontSize="11" fill={muted} fontStyle="italic">B</text>

      <circle cx={Mx} cy={Oy} r="3" fill={accent} />
      <text x={Mx} y={Oy + 18} fontSize="10" fill={accent} fontStyle="italic" textAnchor="middle">M</text>

      {/* 垂直二等分線 */}
      <line x1={Mx} y1={Oy - 95} x2={Mx} y2={Oy + 95} stroke={accent} strokeWidth="2" />

      {/* 直角マーカー */}
      <polyline
        points={`${Mx + 8},${Oy} ${Mx + 8},${Oy - 8} ${Mx},${Oy - 8}`}
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        AP = BP の軌跡 → AB の垂直二等分線（直線）
      </text>
      <text x="14" y="218" fontSize="10" fill={muted}>
        中点 M を通り、AB に垂直な直線
      </text>
    </svg>
  );
}

/**
 * 軌跡 Step 8：定直線（准線）と定点（焦点）から等距離の点の軌跡 = 放物線。
 * 焦点 A、准線 x 軸、放物線上の点 P と、PA = PH（H は P から x 軸への垂線の足）を示す。
 * 具体的な頂点座標（答え N = 2）は描かない。
 */
export function LocusStep8() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 160;
  const Oy = 220;
  const xScale = 18;
  const yScale = 17;
  // 放物線 y = x²/8 + 2 を x ∈ [-8, 8] で sample
  const samples: string[] = [];
  for (let xi = -8; xi <= 8; xi += 0.2) {
    const yi = (xi * xi) / 8 + 2;
    const sx = Ox + xi * xScale;
    const sy = Oy - yi * yScale;
    samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  // 焦点 A = (0, 4)
  const Ax = Ox;
  const Ay = Oy - 4 * yScale;
  // 放物線上の P、x = 4：y = 16/8 + 2 = 4
  const Px = Ox + 4 * xScale;
  const Py = Oy - 4 * yScale;
  // 准線（x 軸）への垂線の足 H = (4, 0)
  const Hx = Px;
  const Hy = Oy;
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="焦点と准線から等距離の点の軌跡 = 放物線"
    >
      {/* 准線 = x 軸（accent 色強調なし、muted のままで地味に） */}
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="1.5" />
      <text x="220" y={Oy + 14} fontSize="10" fill={muted} fontStyle="italic">准線 (x 軸)</text>

      {/* 放物線 */}
      <polyline points={samples.join(" ")} fill="none" stroke={stroke} strokeWidth="1.5" />

      {/* 焦点 A */}
      <circle cx={Ax} cy={Ay} r="4" fill={accent} />
      <text x={Ax + 8} y={Ay - 6} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic">
        A (焦点)
      </text>

      {/* 点 P */}
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text x={Px + 8} y={Py + 4} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic">P</text>

      {/* PA */}
      <line x1={Px} y1={Py} x2={Ax} y2={Ay} stroke={accent} strokeWidth="1" strokeDasharray="3,2" />
      <text x={(Px + Ax) / 2 - 4} y={(Py + Ay) / 2 - 4} fontSize="10" fill={accent} fontStyle="italic">PA</text>

      {/* PH（x 軸への垂線） */}
      <line x1={Px} y1={Py} x2={Hx} y2={Hy} stroke={accent} strokeWidth="1" strokeDasharray="3,2" />
      <circle cx={Hx} cy={Hy} r="2" fill={accent} />
      <text x={Hx + 6} y={(Py + Hy) / 2 + 4} fontSize="10" fill={accent} fontStyle="italic">PH</text>

      <text x="14" y="22" fontSize="11" fill={muted} fontStyle="italic">
        PA = PH（焦点 A と准線 x 軸から等距離）→ 放物線
      </text>
    </svg>
  );
}

/**
 * 媒介変数表示 Step 1：直線の媒介変数表示。$t$ 値を変えると点が直線上を動く。
 * 答え（傾き 7）は具体的に描かない（直線の傾き感を表すのみ）。
 */
export function ParametricStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 80;
  const Oy = 200;
  const xScale = 35;
  const yScale = 18;
  // 線 y = 7t + 2、x = t、t = -2..2
  // sample t values: -1, 0, 1 → 各 SVG (x = t*scale + Ox, y = Oy - (7t+2)*yScale)
  const ts = [-1, 0, 1];
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="直線の媒介変数表示：t を変えると点 (t, 7t+2) が直線上を動く"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 直線 y = 7x + 2 を t ∈ [-1.5, 1.5] で描く */}
      {(() => {
        const samples: string[] = [];
        for (let ti = -1.5; ti <= 1.5; ti += 0.1) {
          const xi = ti;
          const yi = 7 * ti + 2;
          const sx = Ox + xi * xScale;
          const sy = Oy - yi * yScale;
          samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
        }
        return (
          <polyline
            points={samples.join(" ")}
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
          />
        );
      })()}

      {/* サンプル点（各 t での点の位置） */}
      {ts.map((t, i) => {
        const sx = Ox + t * xScale;
        const sy = Oy - (7 * t + 2) * yScale;
        return (
          <g key={i}>
            <circle cx={sx} cy={sy} r="4" fill={accent} />
            <text
              x={sx + 8}
              y={sy + 4}
              fontSize="10"
              fill={accent}
              fontStyle="italic"
              fontWeight="600"
            >
              t = {t}
            </text>
          </g>
        );
      })}

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        x = t, y = 7t + 2（t を変えると点が直線上を動く）
      </text>
    </svg>
  );
}

/**
 * 媒介変数表示 Step 4：円の媒介変数表示。中心 (2, 1)、半径 3 の円を θ で表す。
 * P の動きと、角度 θ を可視化。答え（r² = 9）は描かない。
 */
export function ParametricStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const Ox = 60;
  const Oy = 160;
  const scale = 28;
  // 中心 (2, 1) → SVG
  const Cx = Ox + 2 * scale;
  const Cy = Oy - 1 * scale;
  const r = 3 * scale;
  // P を θ = 60° の位置に
  const theta = -Math.PI / 3;
  const Px = Cx + r * Math.cos(theta);
  const Py = Cy + r * Math.sin(theta);
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="円の媒介変数表示：θ を変えると点 P が円周上を動く"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />

      {/* 円 */}
      <circle cx={Cx} cy={Cy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 中心 */}
      <circle cx={Cx} cy={Cy} r="2.5" fill={muted} />
      <text x={Cx + 6} y={Cy + 14} fontSize="10" fill={muted} fontStyle="italic">中心 (2, 1)</text>

      {/* 半径線 */}
      <line x1={Cx} y1={Cy} x2={Px} y2={Py} stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />

      {/* 角度 θ の弧（短く） */}
      <path
        d={`M ${Cx + 18},${Cy} A 18,18 0 0 0 ${Cx + 18 * Math.cos(theta)},${Cy + 18 * Math.sin(theta)}`}
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />
      <text x={Cx + 24} y={Cy - 6} fontSize="11" fill={accent} fontStyle="italic">θ</text>

      {/* P */}
      <circle cx={Px} cy={Py} r="4" fill={accent} />
      <text x={Px + 8} y={Py + 4} fontSize="12" fill={accent} fontWeight="600" fontStyle="italic">P</text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        x = 2 + 3 cos θ, y = 1 + 3 sin θ（θ を変えると P が円周を動く）
      </text>
    </svg>
  );
}

/**
 * 媒介変数表示 Step 6：動く放物線と頂点の軌跡。
 * 異なる t 値で放物線を 3 本描き、各頂点を accent ドット、頂点の軌跡を破線で。
 * 答え（軌跡の頂点 x = 3）は具体的には描かない。
 */
export function ParametricStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 160;
  const Oy = 130;
  const xScale = 14;
  const yScale = 4;
  // 放物線 y = x² - 2(t+3)x + 6t の頂点 (t+3, -t² - 9)
  // t = -2, 0, 2 で 3 本描く
  const ts = [-2, 0, 2];
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="t を変えると放物線が動く。頂点の軌跡も放物線になる"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />

      {/* 3 本の放物線 */}
      {ts.map((t, idx) => {
        const samples: string[] = [];
        const vx = t + 3;
        const vy = -t * t - 9;
        for (let xi = vx - 6; xi <= vx + 6; xi += 0.3) {
          const yi = (xi - vx) * (xi - vx) + vy;
          const sx = Ox + xi * xScale;
          const sy = Oy - yi * yScale;
          samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
        }
        return (
          <polyline
            key={idx}
            points={samples.join(" ")}
            fill="none"
            stroke={muted}
            strokeWidth="1"
            opacity="0.6"
          />
        );
      })}

      {/* 頂点の軌跡（破線、accent） y = -(x-3)² - 9 を x = -1..7 */}
      {(() => {
        const locusSamples: string[] = [];
        for (let xi = -1; xi <= 7; xi += 0.2) {
          const yi = -(xi - 3) * (xi - 3) - 9;
          const sx = Ox + xi * xScale;
          const sy = Oy - yi * yScale;
          locusSamples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
        }
        return (
          <polyline
            points={locusSamples.join(" ")}
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
            strokeDasharray="4,3"
          />
        );
      })()}

      {/* 各頂点を accent ドット */}
      {ts.map((t, idx) => {
        const vx = t + 3;
        const vy = -t * t - 9;
        const sx = Ox + vx * xScale;
        const sy = Oy - vy * yScale;
        return (
          <g key={`v${idx}`}>
            <circle cx={sx} cy={sy} r="3.5" fill={accent} />
            <text
              x={sx + 6}
              y={sy + 4}
              fontSize="9"
              fill={accent}
              fontStyle="italic"
            >
              t = {t}
            </text>
          </g>
        );
      })}

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        t を変えると放物線が動き、頂点も軌跡を描く（破線）
      </text>
    </svg>
  );
}

/**
 * 媒介変数表示 Step 10：放物線 y = x² 上の動点 P と定点 A の中点 M の軌跡。
 * 元の放物線、A、いくつかの P、対応する M、M の軌跡（別の放物線、破線）を示す。
 * 答え（軌跡の頂点 y = 1）は具体的に書かない。
 */
export function ParametricStep10() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const Ox = 160;
  const Oy = 220;
  const xScale = 30;
  const yScale = 16;
  // 元の放物線 y = x², x = -2.5..2.5
  // 動点 P at t = -1, 0, 1
  // 定点 A = (0, 2)
  // 中点 M = (t/2, (t²+2)/2)
  const ts = [-1.5, 0, 1.5];
  const Ax = Ox;
  const Ay = Oy - 2 * yScale;
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="放物線上の動点 P と定点 A の中点 M の軌跡"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="235" stroke={muted} strokeWidth="0.5" />

      {/* 元の放物線 y = x² */}
      {(() => {
        const samples: string[] = [];
        for (let xi = -2.5; xi <= 2.5; xi += 0.1) {
          const yi = xi * xi;
          const sx = Ox + xi * xScale;
          const sy = Oy - yi * yScale;
          samples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
        }
        return (
          <polyline
            points={samples.join(" ")}
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
          />
        );
      })()}

      {/* 中点の軌跡 y = 2x² + 1 を破線で */}
      {(() => {
        const locusSamples: string[] = [];
        for (let xi = -1.5; xi <= 1.5; xi += 0.1) {
          const yi = 2 * xi * xi + 1;
          const sx = Ox + xi * xScale;
          const sy = Oy - yi * yScale;
          locusSamples.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
        }
        return (
          <polyline
            points={locusSamples.join(" ")}
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
            strokeDasharray="4,3"
          />
        );
      })()}

      {/* 定点 A */}
      <circle cx={Ax} cy={Ay} r="4" fill={muted} />
      <text x={Ax + 8} y={Ay + 4} fontSize="11" fill={muted} fontStyle="italic">A</text>

      {/* 各 t で P, M を */}
      {ts.map((t, idx) => {
        const Px = Ox + t * xScale;
        const Py = Oy - t * t * yScale;
        const Mx = Ox + (t / 2) * xScale;
        const My = Oy - ((t * t + 2) / 2) * yScale;
        return (
          <g key={idx}>
            {/* PA 線分 */}
            <line x1={Px} y1={Py} x2={Ax} y2={Ay} stroke={muted} strokeWidth="0.8" opacity="0.4" />
            {/* P */}
            <circle cx={Px} cy={Py} r="2.5" fill={muted} />
            {/* M */}
            <circle cx={Mx} cy={My} r="3.5" fill={accent} />
          </g>
        );
      })}

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        P (放物線上) と A の中点 M の軌跡（破線）も放物線
      </text>
    </svg>
  );
}

/**
 * 領域 Step 1：直線 y = x + 1 の上側の領域。
 * 境界（直線）は破線（不等号 > なので含まない）、上側を網掛けで示す。
 * 問われている境界値 N は描かない。
 */
export function RegionStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const Ox = 60;
  const Oy = 200;
  const xScale = 30;
  const yScale = 18;
  // 直線 y = x + 1、x = -1..7
  const Px = (xi: number) => Ox + xi * xScale;
  const Py = (yi: number) => Oy - yi * yScale;
  // 領域多角形（上側）：(-1,0), (-1, 10), (7, 10), (7, 8)
  const polyPts = [
    `${Px(-1)},${Py(0)}`,
    `${Px(-1)},${Py(10)}`,
    `${Px(7)},${Py(10)}`,
    `${Px(7)},${Py(8)}`,
  ].join(" ");
  // 直線サンプル
  const lineSamples: string[] = [];
  for (let xi = -1; xi <= 7; xi += 0.2) {
    lineSamples.push(`${Px(xi).toFixed(1)},${Py(xi + 1).toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="直線 y = x + 1 の上側の領域。境界は破線、上側を網掛けで表示"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 領域（網掛け） */}
      <polygon points={polyPts} fill={fillColor} />

      {/* 境界の直線（破線：不等号 > なので含まない） */}
      <polyline
        points={lineSamples.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />

      {/* 「上側」の矢印（領域の中の点に置く） */}
      <text x={Px(3) - 14} y={Py(6)} fontSize="12" fill={accent} fontStyle="italic" fontWeight="600">
        y &gt; x + 1
      </text>

      {/* 直線ラベル */}
      <text x={Px(5.5) + 4} y={Py(6.5) + 4} fontSize="11" fill={muted} fontStyle="italic">
        y = x + 1
      </text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        直線が境界、不等号 &gt; は上側の広がりを選ぶ
      </text>
    </svg>
  );
}

/**
 * 領域 Step 4：縦の直線 x = 3 の右側の領域（x > 3）。
 * 「上下」が「左右」に変わる質的変化を可視化。
 */
export function RegionStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const Ox = 60;
  const Oy = 130;
  const xScale = 28;
  const yScale = 14;
  const Px = (xi: number) => Ox + xi * xScale;
  const Py = (yi: number) => Oy - yi * yScale;
  // 領域多角形（右側）
  const polyPts = [
    `${Px(3)},${Py(-7)}`,
    `${Px(3)},${Py(7)}`,
    `${Px(8.5)},${Py(7)}`,
    `${Px(8.5)},${Py(-7)}`,
  ].join(" ");
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="縦の直線 x = 3 の右側の領域。上下ではなく左右の領域として現れる"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 領域 */}
      <polygon points={polyPts} fill={fillColor} />

      {/* 境界の縦線（破線） */}
      <line
        x1={Px(3)}
        y1={Py(7)}
        x2={Px(3)}
        y2={Py(-7)}
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />

      {/* x = 3 ラベル */}
      <text x={Px(3) - 36} y={Py(6)} fontSize="11" fill={muted} fontStyle="italic">
        x = 3
      </text>

      {/* 「右側」表示 */}
      <text x={Px(5.5)} y={Py(0) + 4} fontSize="12" fill={accent} fontStyle="italic" fontWeight="600">
        x &gt; 3
      </text>

      {/* 左右の矢印 */}
      <text x={Px(1)} y={Py(-5)} fontSize="10" fill={muted}>← 左側</text>
      <text x={Px(5)} y={Py(-5)} fontSize="10" fill={muted}>右側 →</text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        縦線 x = 3 の境界——上下はあいまい、左右で区別する
      </text>
    </svg>
  );
}

/**
 * 領域 Step 8：円 x² + y² = 9 の外側の領域。
 * 「距離 OP > 3」として距離条件で読み解く質的変化。
 */
export function RegionStep8() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillOuter = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const Ox = 160;
  const Oy = 130;
  const scale = 22;
  const Cx = Ox;
  const Cy = Oy;
  const r = 3 * scale;
  // サンプル点 P at (4, 0) を中心からの矢印として
  const Pangle = -Math.PI / 4;
  const Px = Cx + 4 * scale * Math.cos(Pangle);
  const Py = Cy + 4 * scale * Math.sin(Pangle);
  // ビューポート外周の正方形からくり抜きで「外側」を表す
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="円 x² + y² = 9 の外側の領域。距離 OP > 3 として読む"
    >
      {/* 外側網掛け（円の外を fillOuter で塗る） */}
      <defs>
        <mask id="region-outside-circle">
          <rect x="0" y="0" width="320" height="240" fill="white" />
          <circle cx={Cx} cy={Cy} r={r} fill="black" />
        </mask>
      </defs>
      <rect
        x="20"
        y="20"
        width="280"
        height="200"
        fill={fillOuter}
        mask="url(#region-outside-circle)"
      />

      {/* 軸 */}
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 境界の円（破線） */}
      <circle
        cx={Cx}
        cy={Cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />

      {/* 中心 O */}
      <circle cx={Cx} cy={Cy} r="2.5" fill={muted} />
      <text x={Cx - 10} y={Cy + 14} fontSize="10" fill={muted} fontStyle="italic">O</text>

      {/* OP の矢印（半径 4 の位置に P） */}
      <line x1={Cx} y1={Cy} x2={Px} y2={Py} stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <circle cx={Px} cy={Py} r="3.5" fill={accent} />
      <text x={Px + 6} y={Py + 4} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic">P</text>

      {/* OP > 3 ラベル */}
      <text x={(Cx + Px) / 2 - 6} y={(Cy + Py) / 2 - 6} fontSize="10" fill={accent} fontStyle="italic">
        OP &gt; 3
      </text>

      {/* x² + y² > 9 表示 */}
      <text x="38" y="56" fontSize="12" fill={accent} fontStyle="italic" fontWeight="600">
        x² + y² &gt; 9
      </text>
      <text x="38" y="72" fontSize="10" fill={muted}>
        ⟺ OP &gt; 3 ⟺ 円の外側
      </text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        円が境界、不等式は『中心からの距離 vs 半径』で読む
      </text>
    </svg>
  );
}

/**
 * 領域 Step 10：連立 {x² + y² < 25, y > x − 1} の領域。
 * 円の内側 ∩ 直線の上側 = 共通部分（複合）。
 */
export function RegionStep10() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillCircle = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const fillCommon = "color-mix(in oklch, var(--accent) 18%, transparent)";
  const Ox = 160;
  const Oy = 130;
  const scale = 18;
  const Cx = Ox;
  const Cy = Oy;
  const r = 5 * scale;
  const Px = (xi: number) => Ox + xi * scale;
  const Py = (yi: number) => Oy - yi * scale;
  // 円 x²+y² < 25 の内側
  // 直線 y = x − 1 の上側
  // 共通部分は概ね、円の内側で y > x − 1 を満たす部分
  // SVG では clip-path で「円の内側」と「直線の上側半平面」の積を描く
  // 直線サンプル
  const lineSamples: string[] = [];
  for (let xi = -5.5; xi <= 5.5; xi += 0.2) {
    lineSamples.push(`${Px(xi).toFixed(1)},${Py(xi - 1).toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="連立 x² + y² < 25 かつ y > x − 1 の領域。円の内側と直線の上側の共通部分"
    >
      {/* 軸 */}
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="250" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* clip-path: 円の内側 */}
      <defs>
        <clipPath id="region-step10-circle-clip">
          <circle cx={Cx} cy={Cy} r={r} />
        </clipPath>
      </defs>

      {/* 円の内側（薄い fill） */}
      <circle cx={Cx} cy={Cy} r={r} fill={fillCircle} />

      {/* 共通部分（円の内側で直線の上側）を polygon でクリップ */}
      {(() => {
        // 直線 y = x − 1 から上を多角形でクリップ → 円との交わり
        // 多角形：(−5.5, −4.5)→(−5.5, 6)→(5.5, 6)→(5.5, 4.5) で直線の上側半平面
        const pts = [
          `${Px(-5.5)},${Py(-4.5)}`,
          `${Px(-5.5)},${Py(7)}`,
          `${Px(5.5)},${Py(7)}`,
          `${Px(5.5)},${Py(4.5)}`,
        ].join(" ");
        return (
          <polygon
            points={pts}
            fill={fillCommon}
            clipPath="url(#region-step10-circle-clip)"
          />
        );
      })()}

      {/* 境界の円（破線） */}
      <circle
        cx={Cx}
        cy={Cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />

      {/* 境界の直線（破線） */}
      <polyline
        points={lineSamples.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />

      {/* ラベル */}
      <text x="34" y="50" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">
        x² + y² &lt; 25
      </text>
      <text x="34" y="66" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">
        かつ y &gt; x − 1
      </text>
      <text x="34" y="82" fontSize="10" fill={muted}>
        ＝ 円の内側 ∩ 直線の上側
      </text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        連立は『共通部分』——内外と上下を組み合わせる
      </text>
    </svg>
  );
}

/**
 * 不等式と領域 Step 1：三角形領域 D と直線等高線 x + y = k。
 * 等高線を平行移動するイメージを示す。最大値（z = 6）は描かない（k 軸は伏せる）。
 */
export function LPStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillD = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const Ox = 60;
  const Oy = 210;
  const s = 22;
  const Px = (x: number) => Ox + x * s;
  const Py = (y: number) => Oy - y * s;
  // 三角形領域 D: (0,0), (6,0), (0,6)
  const triangle = `${Px(0)},${Py(0)} ${Px(6)},${Py(0)} ${Px(0)},${Py(6)}`;
  // 等高線 x + y = k で k = 1, 3, 5 を描く（最大値の k=6 は伏せる）
  const isolines = [1, 3, 5];
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="三角形領域 D と直線等高線 x + y = k を動かすイメージ"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 領域 D */}
      <polygon points={triangle} fill={fillD} stroke={stroke} strokeWidth="1.5" />
      <text x={Px(1.5)} y={Py(1.5)} fontSize="14" fill={accent} fontWeight="700" fontStyle="italic">D</text>

      {/* 等高線（k=1, 3, 5） */}
      {isolines.map((k, i) => {
        // x + y = k → y = k - x、領域全体を貫くように
        const x1 = -1, y1 = k - x1;
        const x2 = k + 1, y2 = -1;
        return (
          <line
            key={i}
            x1={Px(x1)}
            y1={Py(y1)}
            x2={Px(x2)}
            y2={Py(y2)}
            stroke={accent}
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.6"
          />
        );
      })}

      {/* 矢印で「k を大きく」 */}
      <text x={Px(2.5)} y={Py(4.5)} fontSize="11" fill={accent} fontStyle="italic">→ k 大</text>
      <text x={Px(0.5)} y={Py(1.0)} fontSize="11" fill={accent} fontStyle="italic">← k 小</text>

      {/* 頂点ラベル */}
      <circle cx={Px(0)} cy={Py(0)} r="2.5" fill={muted} />
      <text x={Px(0) - 14} y={Py(0) + 14} fontSize="10" fill={muted}>(0, 0)</text>
      <circle cx={Px(6)} cy={Py(0)} r="2.5" fill={muted} />
      <text x={Px(6) - 14} y={Py(0) + 14} fontSize="10" fill={muted}>(6, 0)</text>
      <circle cx={Px(0)} cy={Py(6)} r="2.5" fill={muted} />
      <text x={Px(0) + 6} y={Py(6) + 4} fontSize="10" fill={muted}>(0, 6)</text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        等高線 x + y = k を動かす——D から離れる瞬間が最大
      </text>
    </svg>
  );
}

/**
 * 不等式と領域 Step 6：三角形領域 D と円の等高線 x² + y² = k。
 * 最大値（z = 36）は描かない（接触頂点を accent ドットで示すのみ）。
 */
export function LPStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillD = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const Ox = 60;
  const Oy = 210;
  const s = 22;
  const Px = (x: number) => Ox + x * s;
  const Py = (y: number) => Oy - y * s;
  // 三角形領域 D: (0,0), (6,0), (0,6)
  const triangle = `${Px(0)},${Py(0)} ${Px(6)},${Py(0)} ${Px(0)},${Py(6)}`;
  // 円の等高線、半径 = sqrt(k)、k = 1, 9, 25
  const radii = [1, 3, 5];
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="三角形領域 D と円の等高線 x² + y² = k を動かすイメージ"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 領域 D */}
      <polygon points={triangle} fill={fillD} stroke={stroke} strokeWidth="1.5" />
      <text x={Px(1.5)} y={Py(1.5)} fontSize="14" fill={accent} fontWeight="700" fontStyle="italic">D</text>

      {/* 円の等高線 */}
      {radii.map((r, i) => (
        <circle
          key={i}
          cx={Px(0)}
          cy={Py(0)}
          r={r * s}
          fill="none"
          stroke={accent}
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.6"
        />
      ))}

      {/* 最遠頂点 (6, 0) と (0, 6) を accent ドット */}
      <circle cx={Px(6)} cy={Py(0)} r="4" fill={accent} />
      <circle cx={Px(0)} cy={Py(6)} r="4" fill={accent} />

      {/* k を大きくする方向 */}
      <text x={Px(3.5)} y={Py(3.5)} fontSize="11" fill={accent} fontStyle="italic">→ k 大</text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        等高線が円——膨らませて D の最遠頂点に最後に接する
      </text>
    </svg>
  );
}

/**
 * 不等式と領域 Step 9：直線 y = 2tx - t² の通過領域。
 * 複数の t について直線を描き、包絡線（放物線 y = x² の下側）が現れることを示す。
 * 答え (N = 9) は描かない。
 */
export function LPStep9() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillRegion = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const Ox = 160;
  const Oy = 50;
  const xs = 24;
  const ys = 3;
  const Px = (x: number) => Ox + x * xs;
  const Py = (y: number) => Oy + (-y) * ys; // y は下向き（放物線が下に開く感じだが、ここでは y=x² なので上向き）

  // 実際は、y = x² の下側を通過領域として描く。SVG では y 軸が下向きなので、
  // (x, x²) は数学座標で y が大きい = SVG では下の値
  // ここでは Oy を上方に置き、y_math を下に大きくするほど SVG では下に行くようにする
  // Px(x) = Ox + x*xs, Py(y_math) = Oy + y_math * ys (y_math 大なら下)
  const Py2 = (y: number) => Oy + y * ys;

  // 通過領域（y ≤ x²）の塗りつぶし。x = -7..7、y_math = x²..maxY
  const maxY = 60;
  const fillPoints: string[] = [];
  // 上辺（境界 y = x²）を左から右へ
  for (let xi = -7; xi <= 7; xi += 0.2) {
    fillPoints.push(`${Px(xi).toFixed(1)},${Py2(xi * xi).toFixed(1)}`);
  }
  // 右下角・左下角
  fillPoints.push(`${Px(7).toFixed(1)},${Py2(maxY).toFixed(1)}`);
  fillPoints.push(`${Px(-7).toFixed(1)},${Py2(maxY).toFixed(1)}`);

  // y = x² の境界
  const boundary: string[] = [];
  for (let xi = -7; xi <= 7; xi += 0.2) {
    boundary.push(`${Px(xi).toFixed(1)},${Py2(xi * xi).toFixed(1)}`);
  }

  // 複数の t について直線 y = 2 t x - t² を描く
  const ts = [-3, -1.5, 0, 1.5, 3];

  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="直線 y = 2tx - t² の通過領域は放物線 y = x² の下側"
    >
      {/* 通過領域（y ≤ x²）を塗りつぶし */}
      <polygon points={fillPoints.join(" ")} fill={fillRegion} />

      {/* 軸：x 軸は y_math = 0、Py2(0) = Oy */}
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* t を変えた複数の直線 */}
      {ts.map((t, i) => {
        // y = 2 t x - t² で x = -7..7
        const x1 = -7, y1 = 2 * t * x1 - t * t;
        const x2 = 7, y2 = 2 * t * x2 - t * t;
        return (
          <line
            key={i}
            x1={Px(x1)}
            y1={Py2(y1)}
            x2={Px(x2)}
            y2={Py2(y2)}
            stroke={muted}
            strokeWidth="0.8"
            opacity="0.5"
          />
        );
      })}

      {/* 包絡線 y = x²（破線 + accent） */}
      <polyline
        points={boundary.join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth="1.8"
        strokeDasharray="5,3"
      />

      {/* ラベル */}
      <text x="34" y={Oy + 24} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">
        境界：y = x²
      </text>
      <text x="34" y={Oy + 40} fontSize="10" fill={muted}>
        通過領域は y ≤ x²
      </text>

      <text x="14" y="18" fontSize="11" fill={muted} fontStyle="italic">
        t を動かすと直線の包絡線（破線）が現れる
      </text>
    </svg>
  );
}

/**
 * 不等式と領域 Step 10：工場の生産最適化。
 * 4 つの制約による多角形領域 + 利益等高線 + 最適頂点 (4, 5) を accent ドット。
 * 最大値 (22) は数値として描かない。
 */
export function LPStep10() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillD = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const Ox = 50;
  const Oy = 210;
  const xs = 30;
  const ys = 22;
  const Px = (x: number) => Ox + x * xs;
  const Py = (y: number) => Oy - y * ys;
  // 領域頂点: (0,0), (5,0), (4,5), (0,7)
  const poly = `${Px(0)},${Py(0)} ${Px(5)},${Py(0)} ${Px(4)},${Py(5)} ${Px(0)},${Py(7)}`;
  // 利益等高線 3x + 2y = k、k = 6, 14, 22 でラインを描く
  const isolines = [6, 14, 22];
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="工場の生産領域と利益等高線。最適は (4, 5) で実現"
    >
      <line x1="20" y1={Oy} x2="300" y2={Oy} stroke={muted} strokeWidth="0.5" />
      <line x1={Ox} y1="20" x2={Ox} y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y={Oy + 12} fontSize="10" fill={muted}>x</text>
      <text x={Ox + 4} y="22" fontSize="10" fill={muted}>y</text>

      {/* 領域 D */}
      <polygon points={poly} fill={fillD} stroke={stroke} strokeWidth="1.5" />
      <text x={Px(1.5)} y={Py(2.5)} fontSize="14" fill={accent} fontWeight="700" fontStyle="italic">D</text>

      {/* 利益等高線 3x + 2y = k → y = (k - 3x)/2 */}
      {isolines.map((k, i) => {
        // 端点：x_min, x_max を決めて y を計算
        const x1 = -1, y1 = (k - 3 * x1) / 2;
        const x2 = 8, y2 = (k - 3 * x2) / 2;
        return (
          <line
            key={i}
            x1={Px(x1)}
            y1={Py(y1)}
            x2={Px(x2)}
            y2={Py(y2)}
            stroke={accent}
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.6"
          />
        );
      })}

      {/* 最適頂点 (4, 5) を強調 */}
      <circle cx={Px(4)} cy={Py(5)} r="5" fill={accent} />
      <text x={Px(4) + 8} y={Py(5)} fontSize="11" fill={accent} fontWeight="600" fontStyle="italic">
        (4, 5)
      </text>

      {/* 他の頂点 */}
      <circle cx={Px(0)} cy={Py(0)} r="2.5" fill={muted} />
      <circle cx={Px(5)} cy={Py(0)} r="2.5" fill={muted} />
      <circle cx={Px(0)} cy={Py(7)} r="2.5" fill={muted} />

      {/* k を大きく */}
      <text x={Px(5)} y={Py(5.5)} fontSize="11" fill={accent} fontStyle="italic">→ k 大</text>

      <text x="14" y="20" fontSize="11" fill={muted} fontStyle="italic">
        利益等高線 3x + 2y = k——$2$ 制約が同時に効く頂点で最大化
      </text>
    </svg>
  );
}

/**
 * 新しい数を作る Step 8：ルートの計算規則の落とし穴。
 * 答え（-6）は描かない。
 */
export function ComplexStep8() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const danger = "color-mix(in oklch, var(--accent) 75%, transparent)";
  return (
    <svg
      viewBox="0 0 320 230"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="ルートの計算規則：負の数が混ざると壊れる"
    >
      <text x="20" y="36" fontSize="13" fill={stroke}>
        √a · √b = √(ab)
      </text>
      <text x="200" y="36" fontSize="11" fill={muted} fontStyle="italic">
        a, b ≧ 0 のとき ✓
      </text>

      <line x1="14" y1="60" x2="306" y2="60" stroke={muted} strokeWidth="0.4" strokeDasharray="2,3" />

      <text x="20" y="98" fontSize="13" fill={danger} fontWeight="600">
        √(−a) · √(−b) ≠ √(ab)
      </text>
      <text x="200" y="98" fontSize="11" fill={danger} fontStyle="italic">
        ⚠ 落とし穴
      </text>

      <text x="20" y="138" fontSize="13" fill={accent}>
        √(−a) · √(−b)
      </text>
      <text x="20" y="162" fontSize="13" fill={accent}>
        = √a · i · √b · i
      </text>
      <text x="20" y="186" fontSize="13" fill={accent} fontWeight="600">
        = i² · √(ab) = −√(ab)
      </text>

      <text x="14" y="218" fontSize="10" fill={muted} fontStyle="italic">
        負のルートはまず √(−a) = √a·i で i を取り出してから計算する
      </text>
    </svg>
  );
}

/**
 * 円外の点 Q から円に引いた 2 本の接線。
 * 接点 P₁, P₂ で接し、QP₁ ⊥ OP₁、QP₂ ⊥ OP₂。
 */
export function CircleTangentFromExternal() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const Ox = 160;
  const Oy = 140;
  const r = 60;
  const Qx = 310;
  const Qy = 140;
  /* d=150, r=60 → cos α = 0.4, sin α = √0.84 ≈ 0.9165 */
  const cosA = 0.4;
  const sinA = Math.sqrt(1 - cosA * cosA);
  /* tangent points */
  const T1x = Ox + r * cosA;
  const T1y = Oy + r * sinA;
  const T2x = Ox + r * cosA;
  const T2y = Oy - r * sinA;
  return (
    <svg
      viewBox="0 0 400 280"
      className="w-full h-auto"
      style={{ maxWidth: 400 }}
      role="img"
      aria-label="円外の点 Q から円に引いた 2 本の接線と 2 つの接点 P₁, P₂"
    >
      <circle cx={Ox} cy={Oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />
      {/* OQ 補助線 */}
      <line x1={Ox} y1={Oy} x2={Qx} y2={Qy} stroke={muted} strokeWidth="0.8" strokeDasharray="2,2" />
      {/* 半径 OT1, OT2 */}
      <line x1={Ox} y1={Oy} x2={T1x} y2={T1y} stroke={stroke} strokeWidth="1.2" strokeDasharray="3,2" />
      <line x1={Ox} y1={Oy} x2={T2x} y2={T2y} stroke={stroke} strokeWidth="1.2" strokeDasharray="3,2" />
      {/* 接線 1, 2 */}
      <line x1={T1x} y1={T1y} x2={Qx} y2={Qy} stroke={accent} strokeWidth="2" />
      <line x1={T2x} y1={T2y} x2={Qx} y2={Qy} stroke={accent} strokeWidth="2" />
      {/* O */}
      <circle cx={Ox} cy={Oy} r="2.5" fill={stroke} />
      <text x={Ox - 8} y={Oy + 16} fontSize="12" fill={stroke} fontStyle="italic">O</text>
      {/* Q */}
      <circle cx={Qx} cy={Qy} r="4" fill={stroke} />
      <text x={Qx + 8} y={Qy + 4} fontSize="12" fill={stroke} fontStyle="italic" fontWeight="600">
        Q(x₀, y₀)
      </text>
      {/* P1, P2 (tangent points) */}
      <circle cx={T1x} cy={T1y} r="4" fill={accent} />
      <text x={T1x - 12} y={T1y + 18} fontSize="12" fill={accent} fontStyle="italic" fontWeight="600">
        P₁
      </text>
      <circle cx={T2x} cy={T2y} r="4" fill={accent} />
      <text x={T2x - 12} y={T2y - 8} fontSize="12" fill={accent} fontStyle="italic" fontWeight="600">
        P₂
      </text>
      {/* 注記 */}
      <text x="20" y="28" fontSize="12" fill={muted} fontStyle="italic">
        x² + y² = r²
      </text>
      <text x="20" y="262" fontSize="11" fill={muted}>
        円外の点 Q から接線は 2 本：接点 P₁, P₂ で円に触れる
      </text>
    </svg>
  );
}

/**
 * 数直線上の 2 点の距離（汎用）。
 * A(x₁), B(x₂) と、|x₂ − x₁| の弧を上に描く。
 */
export function NumLineDistance() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 320 110" className="w-full h-auto" style={{ maxWidth: 320 }} role="img" aria-label="数直線上の 2 点 A, B と距離">
      <line x1="20" y1="70" x2="300" y2="70" stroke={stroke} strokeWidth="1.5" />
      <polyline points="294,65 300,70 294,75" fill="none" stroke={stroke} strokeWidth="1.2" />
      <line x1="80" y1="65" x2="80" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="240" y1="65" x2="240" y2="75" stroke={stroke} strokeWidth="1" />
      <circle cx="80" cy="70" r="4" fill={accent} />
      <circle cx="240" cy="70" r="4" fill={accent} />
      <text x="80" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">A(x₁)</text>
      <text x="240" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">B(x₂)</text>
      <path d="M 80,55 Q 160,30 240,55" fill="none" stroke={muted} strokeWidth="1" />
      <text x="160" y="32" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        |x₂ − x₁|
      </text>
    </svg>
  );
}

/**
 * 数直線上の中点（汎用）。
 * A(x₁), M（中点）, B(x₂)。AM = MB を弧で示す。
 */
export function NumLineMidpoint() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 320 110" className="w-full h-auto" style={{ maxWidth: 320 }} role="img" aria-label="数直線上の中点 M">
      <line x1="20" y1="70" x2="300" y2="70" stroke={stroke} strokeWidth="1.5" />
      <polyline points="294,65 300,70 294,75" fill="none" stroke={stroke} strokeWidth="1.2" />
      <line x1="80" y1="65" x2="80" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="160" y1="65" x2="160" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="240" y1="65" x2="240" y2="75" stroke={stroke} strokeWidth="1" />
      <circle cx="80" cy="70" r="4" fill={stroke} />
      <circle cx="240" cy="70" r="4" fill={stroke} />
      <circle cx="160" cy="70" r="4.5" fill={accent} />
      <text x="80" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">A(x₁)</text>
      <text x="160" y="92" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">M</text>
      <text x="240" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">B(x₂)</text>
      <path d="M 80,55 Q 120,38 160,55" fill="none" stroke={muted} strokeWidth="1" />
      <path d="M 160,55 Q 200,38 240,55" fill="none" stroke={muted} strokeWidth="1" />
      <text x="160" y="32" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        AM = MB（等しい）
      </text>
    </svg>
  );
}

/**
 * 数直線上の内分（汎用）。AB を m:n に内分する点 P を示す。
 * m:n = 2:3 で描く。
 */
export function NumLineInternal() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // A=60, B=260, AB=200. m:n=2:3 → P at A + (2/5)*200 = 60+80 = 140
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto" style={{ maxWidth: 320 }} role="img" aria-label="数直線上の内分点">
      <line x1="20" y1="70" x2="300" y2="70" stroke={stroke} strokeWidth="1.5" />
      <polyline points="294,65 300,70 294,75" fill="none" stroke={stroke} strokeWidth="1.2" />
      <line x1="60" y1="65" x2="60" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="140" y1="65" x2="140" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="260" y1="65" x2="260" y2="75" stroke={stroke} strokeWidth="1" />
      <circle cx="60" cy="70" r="4" fill={stroke} />
      <circle cx="140" cy="70" r="4.5" fill={accent} />
      <circle cx="260" cy="70" r="4" fill={stroke} />
      <text x="60" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">A(x₁)</text>
      <text x="140" y="92" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">P</text>
      <text x="260" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">B(x₂)</text>
      {/* 比 m:n */}
      <text x="100" y="55" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">m</text>
      <text x="200" y="55" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">n</text>
      <text x="160" y="115" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        AB を m : n に内分する点 P
      </text>
    </svg>
  );
}

/**
 * 数直線上の外分（汎用）。AB を m:n に外分する点 P を示す（P が線分の外）。
 * m:n = 3:1（B より右側に外分）で描く。
 */
export function NumLineExternal() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // A=40, B=160, AB=120. 3:1 外分 → AP/BP=3/1, AP=AB+BP=120+BP, AP=3BP → BP=60, AP=180
  // P = A + AP = 40 + 180 = 220
  return (
    <svg viewBox="0 0 320 140" className="w-full h-auto" style={{ maxWidth: 320 }} role="img" aria-label="数直線上の外分点">
      <line x1="20" y1="70" x2="300" y2="70" stroke={stroke} strokeWidth="1.5" />
      <polyline points="294,65 300,70 294,75" fill="none" stroke={stroke} strokeWidth="1.2" />
      <line x1="40" y1="65" x2="40" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="160" y1="65" x2="160" y2="75" stroke={stroke} strokeWidth="1" />
      <line x1="220" y1="65" x2="220" y2="75" stroke={stroke} strokeWidth="1" />
      <circle cx="40" cy="70" r="4" fill={stroke} />
      <circle cx="160" cy="70" r="4" fill={stroke} />
      <circle cx="220" cy="70" r="4.5" fill={accent} />
      <text x="40" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">A(x₁)</text>
      <text x="160" y="92" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic">B(x₂)</text>
      <text x="220" y="92" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">P</text>
      {/* AP の弧 */}
      <path d="M 40,55 Q 130,28 220,55" fill="none" stroke={muted} strokeWidth="1" />
      <text x="130" y="32" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">AP : BP = m : n</text>
      <text x="160" y="125" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        P は線分 AB の外（外分）
      </text>
    </svg>
  );
}

/**
 * Step 1 用の足場図：A(2), B(8) の距離。具体値は座標だけ表示。
 */
export function NumLineDistStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 数直線：0 を SVG x=40, 1 単位 = 28 px
  // A(2) → 40+56 = 96, B(8) → 40+224 = 264
  return (
    <svg viewBox="0 0 320 110" className="w-full h-auto" style={{ maxWidth: 320 }} role="img" aria-label="数直線上の A(2) と B(8)">
      <line x1="20" y1="70" x2="300" y2="70" stroke={stroke} strokeWidth="1.5" />
      <polyline points="294,65 300,70 294,75" fill="none" stroke={stroke} strokeWidth="1.2" />
      {/* 目盛り */}
      {[0, 5, 10].map((v) => (
        <g key={v}>
          <line x1={40 + v * 28} y1="66" x2={40 + v * 28} y2="74" stroke={muted} strokeWidth="0.8" />
          <text x={40 + v * 28} y="86" fontSize="9" fill={muted} textAnchor="middle">{v}</text>
        </g>
      ))}
      {/* A, B */}
      <circle cx="96" cy="70" r="4" fill={accent} />
      <circle cx="264" cy="70" r="4" fill={accent} />
      <text x="96" y="100" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">A(2)</text>
      <text x="264" y="100" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">B(8)</text>
      {/* 距離の弧 */}
      <path d="M 96,55 Q 180,32 264,55" fill="none" stroke={muted} strokeWidth="1" />
      <text x="180" y="32" fontSize="13" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">AB = ?</text>
    </svg>
  );
}

/**
 * Step 9 用の足場図：A(2), B(8) を 3:1 に外分する点。位置の数値は隠す。
 */
export function NumLineExtStep9() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 数直線：0 を SVG x=40, 1 単位 = 22 px (12 まで見える)
  // A(2) → 40+44 = 84, B(8) → 40+176 = 216, P(11) → 40+242 = 282
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto" style={{ maxWidth: 320 }} role="img" aria-label="A(2), B(8) を 3:1 に外分する点">
      <line x1="20" y1="70" x2="300" y2="70" stroke={stroke} strokeWidth="1.5" />
      <polyline points="294,65 300,70 294,75" fill="none" stroke={stroke} strokeWidth="1.2" />
      {/* 目盛り */}
      {[0, 5, 10].map((v) => (
        <g key={v}>
          <line x1={40 + v * 22} y1="66" x2={40 + v * 22} y2="74" stroke={muted} strokeWidth="0.8" />
          <text x={40 + v * 22} y="86" fontSize="9" fill={muted} textAnchor="middle">{v}</text>
        </g>
      ))}
      <circle cx="84" cy="70" r="4" fill={stroke} />
      <circle cx="216" cy="70" r="4" fill={stroke} />
      <circle cx="282" cy="70" r="4.5" fill={accent} />
      <text x="84" y="100" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">A(2)</text>
      <text x="216" y="100" fontSize="12" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">B(8)</text>
      <text x="282" y="100" fontSize="12" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">P(?)</text>
      {/* 比 3:1 */}
      <path d="M 84,55 Q 183,30 282,55" fill="none" stroke={muted} strokeWidth="1" />
      <text x="183" y="30" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">AP : BP = 3 : 1</text>
      <text x="160" y="120" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        P は線分 AB の外（B より右）
      </text>
    </svg>
  );
}

/**
 * 指数関数の急成長グラフ。
 * y = 2^x を x=0 から x=10 まで描き、爆発的増加を視覚化。
 * x が 10 でも y が 1024 を超える、を一目で伝える。
 */
export function ExpGrowth() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // viewBox 320x230, 原点 SVG (40, 200), 1 unit x = 24 px, y scale: 1024 → 180 px
  const yMax = 1024;
  const yPx = 180;
  const pts: string[] = [];
  const markedPoints: { x: number; y: number; label: string; emph?: boolean }[] = [];
  for (let i = 0; i <= 10; i++) {
    const y = Math.pow(2, i);
    const sx = 40 + i * 24;
    const sy = 200 - (y / yMax) * yPx;
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    if (i === 0 || i === 3 || i === 5 || i === 7 || i === 10) {
      markedPoints.push({ x: sx, y: sy, label: `${y}`, emph: i === 10 });
    }
  }
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="y = 2^x の指数関数的増加。x = 10 で y は 1024 を超える"
    >
      {/* 軸 */}
      <line x1="20" y1="200" x2="300" y2="200" stroke={muted} strokeWidth="0.5" />
      <line x1="40" y1="10" x2="40" y2="220" stroke={muted} strokeWidth="0.5" />
      <text x="296" y="213" fontSize="9" fill={muted}>x</text>
      <text x="36" y="12" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 曲線 */}
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />

      {/* マークと注釈 */}
      {markedPoints.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r={p.emph ? 4.5 : 3} fill={p.emph ? accent : muted} />
          {p.emph && (
            <text x={p.x - 6} y={p.y - 8} fontSize="11" fill={accent} fontWeight="600" textAnchor="end">
              {p.label}
            </text>
          )}
        </g>
      ))}

      {/* 軸目盛りラベル */}
      <text x="40" y="215" fontSize="9" fill={muted} textAnchor="middle">0</text>
      <text x="160" y="215" fontSize="9" fill={muted} textAnchor="middle">5</text>
      <text x="280" y="215" fontSize="9" fill={muted} textAnchor="middle">10</text>

      {/* キャプション */}
      <text x="160" y="232" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        n が 10 でも、結果は 1000 倍を超える——これが指数の威力
      </text>
    </svg>
  );
}

/**
 * 指数と対数の対応図。
 * 「$2^3 = 8$」と「$\\log_2 8 = 3$」が同じ関係の 2 方向の表現であることを示す。
 * 底・指数・値の役割が両側でどう入れ替わるかを視覚化。
 */
export function ExpLogMirror() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const boxFill = "color-mix(in oklch, var(--surface) 80%, var(--accent) 20%)";
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="指数と対数の対応：2^3 = 8 と log_2 8 = 3 は同じ関係の 2 方向"
    >
      {/* 指数の箱 */}
      <rect x="10" y="40" width="140" height="90" rx="6" fill={boxFill} stroke={stroke} strokeWidth="1" />
      <text x="80" y="30" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">指数の式</text>
      <text x="80" y="78" fontSize="22" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        2³ = 8
      </text>
      <text x="80" y="108" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        2 を 3 回かけたら 8
      </text>

      {/* 対数の箱 */}
      <rect x="190" y="40" width="140" height="90" rx="6" fill={boxFill} stroke={stroke} strokeWidth="1" />
      <text x="260" y="30" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">対数の式</text>
      <text x="260" y="78" fontSize="22" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        log₂ 8 = 3
      </text>
      <text x="260" y="108" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        2 を何回かけて 8？ → 3 回
      </text>

      {/* 中央の双方向矢印 */}
      <line x1="155" y1="85" x2="185" y2="85" stroke={accent} strokeWidth="1.5" />
      <polyline points="160,80 155,85 160,90" fill="none" stroke={accent} strokeWidth="1.5" />
      <polyline points="180,80 185,85 180,90" fill="none" stroke={accent} strokeWidth="1.5" />

      {/* 役割の対応説明 */}
      <text x="170" y="160" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        どちらも「2 を 3 回かけたら 8」という同じ事実
      </text>
      <text x="170" y="178" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        指数：底 → 値　／　対数：値 → 指数
      </text>
      <text x="170" y="200" fontSize="11" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="600">
        同じものを 2 方向から書いただけ
      </text>
    </svg>
  );
}

/**
 * 対数 系列5 Step 5：y=a^x（y>0）と負の水平線が交わらない図。
 * 真数が負なら対数は定義されない——交点は 0 個。
 */
export function LogNegMiss() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const warn = "color-mix(in oklch, var(--accent) 70%, red 30%)";
  const ox = 50;
  const oy = 160;
  const scaleX = 36;
  const scaleY = 22;
  const pts: string[] = [];
  for (let i = -1.2; i <= 3.2; i += 0.2) {
    const y = Math.pow(1.6, i);
    pts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const negLineY = oy + 28;
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="指数関数 y=a^x は y>0 のみ。負の水平線 y=-25 とは交わらない"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="24" x2={ox} y2={oy + 36} stroke={muted} strokeWidth="0.8" />
      <text x="322" y={oy + 12} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 6} y="32" fontSize="10" fill={muted} textAnchor="end">
        y
      </text>
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.8" />
      <text x="240" y="48" fontSize="11" fill={stroke} fontStyle="italic">
        y = a^x（y &gt; 0）
      </text>
      <line
        x1="24"
        y1={negLineY}
        x2="320"
        y2={negLineY}
        stroke={warn}
        strokeWidth="1.4"
        strokeDasharray="7,5"
      />
      <text x="28" y={negLineY + 16} fontSize="11" fill={warn} fontWeight="600">
        y = −25
      </text>
      <text x="180" y="210" fontSize="11" fill={muted} textAnchor="middle">
        交点はいくつ？——真数が負なら [対数] は？
      </text>
    </svg>
  );
}

/**
 * 対数法則 系列6 Step 1・5：$x$ 軸の和 ↔ $y$ 軸の積（$y=a^x$ の schematic）。
 * 答えの数値は書かない。
 */
export function LogAxisAdd() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const ox = 48;
  const oy = 148;
  const scaleX = 42;
  const scaleY = 18;
  const pts: string[] = [];
  for (let i = -0.4; i <= 2.6; i += 0.15) {
    const y = Math.pow(2.2, i);
    pts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const x1 = ox + 0.6 * scaleX;
  const x2 = ox + 1.4 * scaleX;
  const x3 = ox + 2.2 * scaleX;
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="y=a^x の x 軸の和が y 軸の積に対応する schematic。値は書かない"
    >
      <line x1="24" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="28" x2={ox} y2={oy + 28} stroke={muted} strokeWidth="0.8" />
      <text x="322" y={oy + 12} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 6} y="36" fontSize="10" fill={muted} textAnchor="end">
        y
      </text>
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.8" />
      <text x="250" y="44" fontSize="11" fill={stroke} fontStyle="italic">
        y = a^x
      </text>

      <line x1={x1} y1={oy + 6} x2={x2} y2={oy + 6} stroke={accent} strokeWidth="2" />
      <line x1={x2} y1={oy + 6} x2={x3} y2={oy + 6} stroke={accent} strokeWidth="2" strokeDasharray="5,3" />
      <text x={(x1 + x3) / 2} y={oy + 24} fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        x 軸：p + q
      </text>

      <rect x={x1 - 8} y={oy - 52} width={x3 - x1 + 16} height="36" rx="6" fill={fillColor} stroke={muted} strokeWidth="0.8" />
      <text x={(x1 + x3) / 2} y={oy - 30} fontSize="11" fill={stroke} textAnchor="middle" fontStyle="italic">
        y 軸：M · N
      </text>

      <text x="180" y="210" fontSize="11" fill={muted} textAnchor="middle">
        [対数] の外側の和 ↔ 真数の中の積——指数法則の逆読み？
      </text>
      <text x="180" y="230" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        底をそろえた [対数] の和は、何を指している？
      </text>
    </svg>
  );
}

/**
 * 対数法則 系列6 Step 9：底が異なる log が並ぶ式（値は書かない）。
 */
export function LogBaseMix() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const boxFill = "color-mix(in oklch, var(--surface) 80%, var(--accent) 20%)";
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="底が異なる対数の積。値は書かない"
    >
      <rect x="40" y="48" width="280" height="88" rx="8" fill={boxFill} stroke={stroke} strokeWidth="1" />
      <text x="180" y="88" fontSize="22" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        log₅ M · log₇ N
      </text>
      <text x="180" y="118" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        底 5 と底 7——[対数法則] だけではそろわない
      </text>

      <line x1="100" y1="160" x2="260" y2="160" stroke={accent} strokeWidth="1.2" strokeDasharray="6,4" />
      <text x="180" y="182" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        [底の変換公式] で底を 1 つに？
      </text>
      <text x="180" y="204" fontSize="11" fill={muted} textAnchor="middle">
        底がバラバラの積——変換なしでは法則が使えない
      </text>
    </svg>
  );
}

/**
 * 点と直線の距離 Step 1 の足場図：直線 3x-4y-9=0 と点 (1, 6) の配置。
 * 答え（距離）も垂線も描かない、配置だけ。
 */
export function LineDistanceStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // viewBox 280x250、原点 SVG (60, 180)、1 unit = 20 px
  // 直線 3x-4y-9=0 → y=(3x-9)/4
  // x=-1: y=-3 → SVG (40, 240); x=10: y=5.25 → SVG (260, 75)
  // 点 (1, 6) → SVG (80, 60)
  return (
    <svg
      viewBox="0 0 280 250"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="直線 3x-4y-9=0 と 点 (1, 6) の配置"
    >
      <line x1="20" y1="180" x2="260" y2="180" stroke={muted} strokeWidth="0.5" />
      <line x1="60" y1="10" x2="60" y2="220" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="193" fontSize="9" fill={muted}>x</text>
      <text x="56" y="12" fontSize="9" fill={muted} textAnchor="end">y</text>
      {/* 直線 */}
      <line x1="40" y1="240" x2="260" y2="75" stroke={stroke} strokeWidth="1.6" />
      <text x="246" y="68" fontSize="10" fill={muted} fontStyle="italic">3x − 4y − 9 = 0</text>
      {/* 点 */}
      <circle cx="80" cy="60" r="4" fill={accent} />
      <text x="86" y="58" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">(1, 6)</text>
      <text x="140" y="240" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        この点から直線までの最短距離は？
      </text>
    </svg>
  );
}

/**
 * ピタゴラスの定理 Step 1 の足場図：直角三角形（2 辺 3, 4、斜辺 ?）。
 */
export function PythagorasStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="直角三角形：2 辺が 3 と 4、斜辺は ?"
    >
      <polygon points="60,160 200,160 60,55" fill={fillColor} stroke={stroke} strokeWidth="1.6" />
      <polyline points="68,160 68,152 60,152" fill="none" stroke={stroke} strokeWidth="0.8" />
      <text x="48" y="115" fontSize="13" fill={stroke} textAnchor="end" fontStyle="italic">3</text>
      <text x="130" y="180" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">4</text>
      <text x="140" y="100" fontSize="14" fill={accent} fontStyle="italic" fontWeight="700">?</text>
      <text x="140" y="195" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        斜辺（直角の向かいの辺）はいくつ？
      </text>
    </svg>
  );
}

/**
 * ピタゴラスの定理 Step 5 の足場図：1 辺 7 の正方形と対角線。
 */
export function PythagorasStep5() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="1 辺 7 の正方形と対角線（長さは ?）"
    >
      <rect x="70" y="35" width="140" height="140" fill={fillColor} stroke={stroke} strokeWidth="1.6" />
      <line x1="70" y1="35" x2="210" y2="175" stroke={accent} strokeWidth="1.6" />
      <polyline points="78,175 78,167 70,167" fill="none" stroke={stroke} strokeWidth="0.8" />
      <text x="140" y="28" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">7</text>
      <text x="220" y="110" fontSize="13" fill={stroke} fontStyle="italic">7</text>
      <text x="155" y="100" fontSize="14" fill={accent} fontStyle="italic" fontWeight="700">?</text>
      <text x="140" y="200" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        対角線は a√2 の形。a はいくつ？
      </text>
    </svg>
  );
}

/**
 * 直線の方程式 Step 1 の足場図：2 点を通る直線。
 */
export function TwoPointsLineStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 原点 SVG (40, 200)、1 unit = 25 px
  // (1,2) → (65, 150)、(3,8) → (115, 0) はみ出すので scale 縮小
  // 1 unit = 18 px に。(1,2) → (58, 164)、(3,8) → (94, 56)
  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="2 点 (1, 2) と (3, 8) を通る直線"
    >
      <line x1="20" y1="200" x2="260" y2="200" stroke={muted} strokeWidth="0.5" />
      <line x1="40" y1="10" x2="40" y2="220" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="213" fontSize="9" fill={muted}>x</text>
      <text x="36" y="12" fontSize="9" fill={muted} textAnchor="end">y</text>
      {/* 直線（点を結び、外側に少し延長） */}
      <line x1="35" y1="179" x2="200" y2="-16" stroke={stroke} strokeWidth="1.6" strokeDasharray="0" />
      {/* 2点 */}
      <circle cx="58" cy="164" r="4" fill={accent} />
      <text x="64" y="178" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">(1, 2)</text>
      <circle cx="94" cy="56" r="4" fill={accent} />
      <text x="100" y="52" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">(3, 8)</text>
      <text x="140" y="232" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        この直線の傾きは？
      </text>
    </svg>
  );
}

/**
 * 直線の方程式 Step 7 の足場図：2 点と中点。
 */
export function MidpointStep7() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 原点 SVG (40, 180)、1 unit = 22 px
  // (1, 5) → (62, 70)、(7, 3) → (194, 114)、中点 (4, 4) → (128, 92)
  return (
    <svg
      viewBox="0 0 280 220"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="2 点 (1, 5) と (7, 3) の中点 M"
    >
      <line x1="20" y1="180" x2="260" y2="180" stroke={muted} strokeWidth="0.5" />
      <line x1="40" y1="10" x2="40" y2="200" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="193" fontSize="9" fill={muted}>x</text>
      <text x="36" y="12" fontSize="9" fill={muted} textAnchor="end">y</text>
      <line x1="62" y1="70" x2="194" y2="114" stroke={stroke} strokeWidth="1.6" />
      <circle cx="62" cy="70" r="4" fill={stroke} />
      <text x="50" y="66" fontSize="11" fill={stroke} textAnchor="end" fontStyle="italic">(1, 5)</text>
      <circle cx="194" cy="114" r="4" fill={stroke} />
      <text x="200" y="116" fontSize="11" fill={stroke} fontStyle="italic">(7, 3)</text>
      <circle cx="128" cy="92" r="4.5" fill={accent} />
      <text x="134" y="88" fontSize="11" fill={accent} fontStyle="italic" fontWeight="700">M = ?</text>
      <text x="140" y="210" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        中点 M の x 座標は？
      </text>
    </svg>
  );
}

/**
 * 直線の方程式 Step 9 の足場図：傾き 2 の直線と、垂直な直線。
 */
export function PerpendicularStep9() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // viewBox 280x200, 中心 (140, 100)
  // 直線 1：傾き 2、通る (140, 100) → (110, 160), (170, 40)
  // 直線 2（垂直）：傾き -1/2、通る (140, 100) → (80, 130), (200, 70)
  return (
    <svg
      viewBox="0 0 280 220"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="傾き 2 の直線と、それに垂直な直線"
    >
      <line x1="10" y1="100" x2="270" y2="100" stroke={muted} strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="190" stroke={muted} strokeWidth="0.5" />
      {/* 直線 1（傾き 2） */}
      <line x1="110" y1="160" x2="170" y2="40" stroke={stroke} strokeWidth="1.6" />
      <text x="174" y="44" fontSize="11" fill={stroke} fontStyle="italic">傾き 2</text>
      {/* 直線 2（傾き -1/2、垂直） */}
      <line x1="80" y1="130" x2="200" y2="70" stroke={accent} strokeWidth="1.6" />
      <text x="206" y="74" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">傾き ?</text>
      {/* 直角マーカー at (140, 100) */}
      <polyline points="148,97 153,99 151,104" fill="none" stroke={muted} strokeWidth="1" />
      <text x="140" y="210" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        傾き 2 の直線に垂直な直線の傾きは？
      </text>
    </svg>
  );
}

/**
 * 2次関数の最小値 Step 1 の足場図：下に凸の放物線と、底の最小値マーク。
 * 数値は載せない、概形だけ。
 */
export function ParabolaMinStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // 放物線 y = 0.05(x-140)² + 50 を SVG 直接で描画（viewBox 280x180、頂点 (140, 130)）
  const pts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const sx = 60 + (i / 50) * 160;
    const dx = sx - 140;
    const sy = 130 - 0.05 * dx * dx;
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="下に凸の放物線。底が最小値"
    >
      <line x1="20" y1="160" x2="260" y2="160" stroke={muted} strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="180" stroke={muted} strokeWidth="0.5" />
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <circle cx="140" cy="130" r="4" fill={accent} />
      {/* 矢印で 最小値 を指す */}
      <line x1="200" y1="80" x2="148" y2="128" stroke={accent} strokeWidth="0.8" />
      <text x="206" y="80" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">最小値 = ?</text>
      <text x="140" y="195" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        お椀の底の高さが最小値
      </text>
    </svg>
  );
}

/**
 * 2次関数のグラフ Step 1 の足場図：頂点と対称軸を強調した放物線。
 */
export function ParabolaSymmetryStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const pts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const sx = 60 + (i / 50) * 160;
    const dx = sx - 140;
    const sy = 130 - 0.05 * dx * dx;
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="放物線の頂点と対称軸"
    >
      <line x1="20" y1="160" x2="260" y2="160" stroke={muted} strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="180" stroke={muted} strokeWidth="0.5" />
      {/* 対称軸（頂点を通る縦の破線） */}
      <line x1="140" y1="20" x2="140" y2="160" stroke={accent} strokeWidth="1.2" strokeDasharray="4,3" opacity="0.7" />
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <circle cx="140" cy="130" r="4" fill={accent} />
      <text x="148" y="135" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">頂点</text>
      <text x="144" y="30" fontSize="10" fill={accent} fontStyle="italic">対称軸</text>
      <text x="140" y="195" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        頂点の x 座標は？（対称軸の x と同じ）
      </text>
    </svg>
  );
}

/**
 * 2次関数のグラフ Step 9 の足場図：頂点 (3, 5) を持つ放物線。
 * 「頂点から元の式の c を逆算する」問題用。c の値は見せない。
 */
export function ParabolaVertexStep9() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // viewBox 280x240、原点 SVG (40, 200)、1 unit = 20 px
  // 頂点 (3, 5) → SVG (100, 100)
  // 放物線 f(x) = (x-3)² + 5、x ∈ [-1, 7]
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = -1 + (i / 60) * 8;
    const y = (x - 3) ** 2 + 5;
    const sx = 40 + x * 20;
    const sy = 200 - y * 20;
    if (sy < 0) continue;
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="頂点 (3, 5) を持つ放物線"
    >
      <line x1="20" y1="200" x2="260" y2="200" stroke={muted} strokeWidth="0.5" />
      <line x1="40" y1="10" x2="40" y2="220" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="213" fontSize="9" fill={muted}>x</text>
      <text x="36" y="12" fontSize="9" fill={muted} textAnchor="end">y</text>
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <circle cx="100" cy="100" r="4" fill={accent} />
      <text x="108" y="98" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">頂点 (3, 5)</text>
      <text x="140" y="232" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        この頂点を持つ f(x) = x² + bx + c の c は？
      </text>
    </svg>
  );
}

/**
 * 円の方程式 Step 1 の足場図：原点中心、半径 3 の円。
 * 円の上の任意の点 P(x, y) から原点までの距離 = 半径 3。
 * ピタゴラスから x² + y² = N の N がどこにあるか（= 右辺）を視覚化。
 * 答えの数値（N=9）は見せない。
 */
export function CircleStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 280x290
  // 原点 SVG (140, 120)、1 unit = 28 px、半径 3 = 84 px
  // P 取り方：(2.12, 2.12) ≒ (√4.5, √4.5)。SVG (199, 61)
  return (
    <svg
      viewBox="0 0 280 290"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="原点中心、半径 3 の円。点 P(x, y) と原点との直角三角形（ピタゴラス）"
    >
      {/* 軸 */}
      <line x1="20" y1="120" x2="260" y2="120" stroke={muted} strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="220" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="133" fontSize="9" fill={muted}>x</text>
      <text x="136" y="12" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 円 */}
      <circle cx="140" cy="120" r="84" fill={fillColor} stroke={stroke} strokeWidth="1.6" />

      {/* x 軸沿いの補助線（原点 → P の真下） */}
      <line x1="140" y1="120" x2="199" y2="120" stroke={stroke} strokeWidth="1.4" />
      {/* y 軸方向の補助線（P → x 軸、破線） */}
      <line x1="199" y1="120" x2="199" y2="61" stroke={stroke} strokeWidth="1" strokeDasharray="3,2" />
      {/* 半径 OP（強調） */}
      <line x1="140" y1="120" x2="199" y2="61" stroke={accent} strokeWidth="1.7" />

      {/* 直角マーカー at (199, 120) */}
      <polyline points="193,120 193,114 199,114" fill="none" stroke={stroke} strokeWidth="0.8" />

      {/* 原点と P */}
      <circle cx="140" cy="120" r="3" fill={stroke} />
      <circle cx="199" cy="61" r="3.5" fill={accent} />

      {/* 点ラベル */}
      <text x="130" y="135" fontSize="10" fill={muted} textAnchor="end">O</text>
      <text x="205" y="58" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">P(x, y)</text>

      {/* 辺ラベル */}
      <text x="170" y="135" fontSize="11" fill={muted} fontStyle="italic">x</text>
      <text x="204" y="94" fontSize="11" fill={muted} fontStyle="italic">y</text>
      <text x="153" y="84" fontSize="12" fill={accent} fontStyle="italic" fontWeight="600">3</text>

      {/* 方程式タグ（N がどこにあるか明示、N は accent で強調） */}
      <line
        x1="60"
        y1="240"
        x2="220"
        y2="240"
        stroke="var(--border)"
        strokeWidth="0.5"
        strokeDasharray="3,3"
      />
      <text x="140" y="260" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        x² + y² ={" "}
        <tspan fill={accent} fontWeight="700">
          N
        </tspan>
      </text>
      <text
        x="140"
        y="278"
        fontSize="10"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        ↑ この N を求めます（円の上ならどこでも同じ値）
      </text>
    </svg>
  );
}

/**
 * 一般角・三角関数 系列1 Step 1 / 辞書「単位円」の足場図。
 * 半径 1 の単位円と、x 軸から θ 回した第 1 象限の点 P。
 * sinθ = P の y 座標、cosθ = P の x 座標、tanθ = OP の傾き を示す。
 * 答えの数値（1/2 など）は描かない——配置・関係だけ（自得を裏切らない）。
 */
export function UnitCircleStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 280x280、原点 O = (130, 150)、半径 1 = 96 px
  // P は θ ≒ 33°：(130 + 96cos33, 150 - 96sin33) ≒ (210.5, 97.7)
  const ox = 130;
  const oy = 150;
  const px = 210.5;
  const py = 97.7;
  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="半径 1 の単位円。x 軸から θ 回した点 P の y 座標が sinθ、x 座標が cosθ"
    >
      {/* 軸 */}
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="20" x2={ox} y2="262" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 単位円 */}
      <circle cx={ox} cy={oy} r="96" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* x 座標（O → P の真下、cosθ） */}
      <line x1={ox} y1={oy} x2={px} y2={oy} stroke={accent} strokeWidth="1.6" />
      {/* y 座標（P → x 軸、破線、sinθ） */}
      <line x1={px} y1={oy} x2={px} y2={py} stroke={accent} strokeWidth="1.6" strokeDasharray="3,2" />
      {/* 半径 OP */}
      <line x1={ox} y1={oy} x2={px} y2={py} stroke={stroke} strokeWidth="1.6" />

      {/* 角 θ の弧 */}
      <path d={`M ${ox + 34} ${oy} A 34 34 0 0 0 ${ox + 28.5} ${oy - 18.5}`} fill="none" stroke={muted} strokeWidth="1" />
      <text x={ox + 40} y={oy - 8} fontSize="11" fill={muted} fontStyle="italic">θ</text>

      {/* 直角マーカー at (px, oy) */}
      <polyline points={`${px - 6},${oy} ${px - 6},${oy - 6} ${px},${oy - 6}`} fill="none" stroke={muted} strokeWidth="0.8" />

      {/* O と P */}
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <circle cx={px} cy={py} r="3.5" fill={accent} />
      <text x={ox - 5} y={oy + 14} fontSize="10" fill={muted} textAnchor="end">O</text>
      <text x={px + 6} y={py - 2} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">P</text>

      {/* 半径 = 1 のラベル */}
      <text x={ox + 28} y={oy - 40} fontSize="11" fill={stroke} fontStyle="italic">1</text>

      {/* 座標の意味（数値は書かない） */}
      <text x={(ox + px) / 2 - 6} y={oy + 15} fontSize="10.5" fill={accent} textAnchor="middle">cosθ</text>
      <text x={px + 8} y={(oy + py) / 2 + 4} fontSize="10.5" fill={accent}>sinθ</text>

      {/* 凡例 */}
      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        sinθ = P の y 座標 ／ cosθ = P の x 座標 ／ tanθ = OP の傾き
      </text>
    </svg>
  );
}

/**
 * 一般角・三角関数 系列1 Step 4（質的変化）の足場図。
 * 第 2 象限（左上）の点 P：x 座標が負・y 座標が正になる「符号が出る」場面。
 * 答えの数値は描かず、符号（x < 0, y > 0）と配置だけを示す。
 */
export function UnitCircleQ2() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // 原点 O = (140, 150)、半径 1 = 96 px、P は θ ≒ 123°：
  // (140 + 96cos123, 150 - 96sin123) ≒ (87.7, 69.5)
  const ox = 140;
  const oy = 150;
  const px = 87.7;
  const py = 69.5;
  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円の第 2 象限の点 P。x 座標は負、y 座標は正"
    >
      {/* 軸 */}
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="20" x2={ox} y2="262" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 第 2 象限の淡い網（左上） */}
      <rect x={ox - 96} y={oy - 96} width="96" height="96" fill="color-mix(in oklch, var(--accent) 4%, transparent)" />

      {/* 単位円 */}
      <circle cx={ox} cy={oy} r="96" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* x 座標（O の真上の足 → P、負側、accent 破線） */}
      <line x1={ox} y1={oy} x2={px} y2={oy} stroke={accent} strokeWidth="1.6" />
      {/* y 座標（P → x 軸、破線） */}
      <line x1={px} y1={oy} x2={px} y2={py} stroke={accent} strokeWidth="1.6" strokeDasharray="3,2" />
      {/* 半径 OP */}
      <line x1={ox} y1={oy} x2={px} y2={py} stroke={stroke} strokeWidth="1.6" />

      {/* 直角マーカー at (px, oy) */}
      <polyline points={`${px + 6},${oy} ${px + 6},${oy - 6} ${px},${oy - 6}`} fill="none" stroke={muted} strokeWidth="0.8" />

      {/* O と P */}
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <circle cx={px} cy={py} r="3.5" fill={accent} />
      <text x={ox + 5} y={oy + 14} fontSize="10" fill={muted}>O</text>
      <text x={px - 6} y={py - 4} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600" textAnchor="end">P</text>

      {/* 符号ラベル（数値でなく符号だけ） */}
      <text x={(ox + px) / 2} y={oy + 15} fontSize="10.5" fill={accent} textAnchor="middle">x 座標 &lt; 0</text>
      <text x={px - 8} y={(oy + py) / 2 + 4} fontSize="10.5" fill={accent} textAnchor="end">y 座標 &gt; 0</text>

      {/* 凡例 */}
      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        第 2 象限：P は y 軸より左 → x 座標（cosθ）が負になる
      </text>
    </svg>
  );
}

/**
 * 三角方程式 系列3 Step 4（質的変化）の足場図。
 * tanθ を「原点を通る直線の傾き」として見ると、同じ直線が単位円の
 * 反対側でも交わることを示す。具体角・傾きの値・答えは描かない。
 */
export function UnitCircleTanLine() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 5%, transparent)";
  const ox = 140;
  const oy = 150;
  const px = 221;
  const py = 99;
  const qx = 59;
  const qy = 201;
  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="原点を通る同じ傾きの直線が、単位円の手前側と反対側の2点で交わる図"
    >
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="20" x2={ox} y2="262" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      <circle cx={ox} cy={oy} r="96" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 原点を突き抜ける1本の直線 */}
      <line x1="30" y1="219" x2="250" y2="81" stroke={accent} strokeWidth="1.8" />
      <circle cx={qx} cy={qy} r="4" fill={accent} />
      <circle cx={px} cy={py} r="4" fill={accent} />
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={ox - 7} y={oy + 15} fontSize="10" fill={muted} textAnchor="end">O</text>
      <text x={px + 7} y={py - 4} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">P</text>
      <text x={qx - 7} y={qy + 15} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600" textAnchor="end">P′</text>

      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        同じ傾きの直線は、原点の反対側でも円と交わる
      </text>
    </svg>
  );
}

/**
 * 三角方程式 系列3 Step 8（質的変化）の足場図。
 * 方程式の「2点」が、不等式では境界になり、その間の弧へ広がることを示す。
 * 境界の角度・高さの値・答えは描かない。
 */
export function UnitCircleArc() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 4%, transparent)";
  const arcFill = "color-mix(in oklch, var(--accent) 13%, transparent)";
  const ox = 140;
  const oy = 150;
  const leftX = 66.7;
  const rightX = 213.3;
  const boundaryY = 88;
  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円上の2つの境界点と、その間に広がる上側の弧を示す図"
    >
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="20" x2={ox} y2="262" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      <circle cx={ox} cy={oy} r="96" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 境界線と、その上側の領域 */}
      <path
        d={`M ${leftX} ${boundaryY} A 96 96 0 0 1 ${rightX} ${boundaryY} L ${leftX} ${boundaryY} Z`}
        fill={arcFill}
        stroke="none"
      />
      <line
        x1="40"
        y1={boundaryY}
        x2="240"
        y2={boundaryY}
        stroke={muted}
        strokeWidth="0.9"
        strokeDasharray="4,3"
      />
      <path
        d={`M ${leftX} ${boundaryY} A 96 96 0 0 1 ${rightX} ${boundaryY}`}
        fill="none"
        stroke={accent}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx={leftX} cy={boundaryY} r="4" fill={accent} />
      <circle cx={rightX} cy={boundaryY} r="4" fill={accent} />
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={leftX - 7} y={boundaryY + 17} fontSize="10" fill={accent} textAnchor="end">境界</text>
      <text x={rightX + 7} y={boundaryY + 17} fontSize="10" fill={accent}>境界</text>

      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        ちょうどの2点が境界になり、その間の弧へ広がる
      </text>
    </svg>
  );
}

/**
 * 相互関係 系列 Step 1 の足場図（T1）：単位円上の点 P と、x 軸への垂線が作る
 * 直角三角形。辺は 1（斜辺）・sinθ（縦）・cosθ（横）のラベルだけを示し、
 * 恒等式そのものは書かない（Socratic に気づかせる。答えの数値も見せない）。
 */
export function UnitCircleIdentity() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const triFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  // viewBox 280x280、原点 O = (130, 150)、半径 1 = 96 px
  // P は θ ≒ 37°：(130 + 96cos37, 150 - 96sin37) ≒ (206.7, 92.2)
  const ox = 130;
  const oy = 150;
  const px = 206.7;
  const py = 92.2;
  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円上の点 P から x 軸に垂線を下ろすと、斜辺 1・縦 sinθ・横 cosθ の直角三角形ができる"
    >
      {/* 軸 */}
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="20" x2={ox} y2="262" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 単位円 */}
      <circle cx={ox} cy={oy} r="96" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 直角三角形（塗り） */}
      <polygon points={`${ox},${oy} ${px},${oy} ${px},${py}`} fill={triFill} stroke="none" />

      {/* 横（cosθ）・縦（sinθ）・斜辺（1） */}
      <line x1={ox} y1={oy} x2={px} y2={oy} stroke={accent} strokeWidth="1.8" />
      <line x1={px} y1={oy} x2={px} y2={py} stroke={accent} strokeWidth="1.8" />
      <line x1={ox} y1={oy} x2={px} y2={py} stroke={stroke} strokeWidth="1.8" />

      {/* 直角マーカー */}
      <polyline points={`${px - 7},${oy} ${px - 7},${oy - 7} ${px},${oy - 7}`} fill="none" stroke={muted} strokeWidth="0.8" />

      {/* O と P */}
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <circle cx={px} cy={py} r="3.5" fill={accent} />
      <text x={ox - 5} y={oy + 14} fontSize="10" fill={muted} textAnchor="end">O</text>
      <text x={px + 6} y={py - 2} fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">P</text>

      {/* 辺のラベル */}
      <text x={(ox + px) / 2} y={oy + 15} fontSize="10.5" fill={accent} textAnchor="middle">cosθ</text>
      <text x={px + 8} y={(oy + py) / 2 + 4} fontSize="10.5" fill={accent}>sinθ</text>
      <text x={(ox + px) / 2 - 14} y={(oy + py) / 2 - 4} fontSize="11" fill={stroke} fontStyle="italic">1</text>

      {/* 凡例（恒等式は書かない——問いの形で） */}
      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        斜辺 1 の直角三角形——三平方の定理は、この 3 辺に何を言っている？
      </text>
    </svg>
  );
}

/** サイン波の SVG パス文字列を作るヘルパ（グラフ系の足場図で共用）。
 *  x0..x1 の横幅に cycles 周期ぶんの sin を描く。amp は px 単位の振幅、
 *  phase は周期単位（0.25 = 1/4 周期の右ずれ）。 */
function sinePath(
  x0: number,
  x1: number,
  midY: number,
  amp: number,
  cycles: number,
  phase = 0,
): string {
  const n = 96;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = x0 + (x1 - x0) * t;
    const y = midY - amp * Math.sin(2 * Math.PI * (cycles * t - phase));
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

/**
 * グラフ系列 Step 1 の足場図（W1）：単位円を回る点の高さを、角を横軸に
 * 開いて写し取ると波になる。周期の数値ラベルは書かない（それが問い）。
 */
export function TrigCircleToWave() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // 左：単位円（中心 (60, 80)・半径 40）。P は θ=50°
  const cx = 60;
  const cy = 80;
  const r = 40;
  const th = (50 * Math.PI) / 180;
  const px = cx + r * Math.cos(th);
  const py = cy - r * Math.sin(th);
  // 右：波（x 120→300、1 周期、振幅 40、中心線 y=80）
  const waveX = px + (120 - cx) * 0 + 120; // 波の開始 x
  const waveEnd = 300;
  const wavePeakX = waveX + (waveEnd - waveX) * (50 / 360);
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="単位円を回る点の高さを、角を横軸にして写し取ると波（サインカーブ）になる"
    >
      {/* 左：単位円 */}
      <circle cx={cx} cy={cy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.3" />
      <line x1={cx - r - 8} y1={cy} x2={cx + r + 8} y2={cy} stroke={muted} strokeWidth="0.5" />
      <line x1={cx} y1={cy - r - 8} x2={cx} y2={cy + r + 8} stroke={muted} strokeWidth="0.5" />
      <line x1={cx} y1={cy} x2={px} y2={py} stroke={stroke} strokeWidth="1.4" />
      <circle cx={px} cy={py} r="3" fill={accent} />
      <text x={px + 4} y={py - 4} fontSize="10" fill={accent} fontStyle="italic" fontWeight="600">P</text>
      {/* 回る向きの矢印 */}
      <path d={`M ${cx + r + 4} ${cy - 10} A ${r + 6} ${r + 6} 0 0 0 ${cx + 14} ${cy - r - 4}`} fill="none" stroke={muted} strokeWidth="0.9" markerEnd="url(#arrowW1)" />
      <defs>
        <marker id="arrowW1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <text x={cx} y={cy + r + 20} fontSize="9.5" fill={muted} textAnchor="middle">単位円を回る点</text>

      {/* 高さを写す破線 */}
      <line x1={px} y1={py} x2={wavePeakX} y2={py} stroke={accent} strokeWidth="0.9" strokeDasharray="3,3" />

      {/* 右：波の軸 */}
      <line x1={waveX - 6} y1={cy} x2={waveEnd + 10} y2={cy} stroke={muted} strokeWidth="0.5" />
      <text x={waveEnd + 12} y={cy + 3} fontSize="9" fill={muted}>θ</text>
      {/* 1 周期ぶんの sin 波（数値ラベルは書かない） */}
      <path d={sinePath(waveX, waveEnd, cy, r, 1)} fill="none" stroke={accent} strokeWidth="1.8" />
      <circle cx={wavePeakX} cy={py} r="2.6" fill={accent} />
      <text x={(waveX + waveEnd) / 2} y={cy + r + 20} fontSize="9.5" fill={muted} textAnchor="middle">
        角を横軸に、高さを写し取る
      </text>
    </svg>
  );
}

/**
 * グラフ系列 Step 5 の足場図（W2）：元の波（破線）と、右へずれた波（実線）。
 * ずれの量の数値は書かない（それが問い）。
 */
export function TrigWavePhase() {
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const x0 = 20;
  const x1 = 300;
  const midY = 70;
  const amp = 42;
  const shift = 0.11; // 周期単位の右ずれ（見た目用）
  const arrowY = midY - amp - 8;
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="元の波と、横に平行移動した波。波の形は同じで、位置だけが右へずれている"
    >
      <line x1={x0 - 6} y1={midY} x2={x1 + 10} y2={midY} stroke={muted} strokeWidth="0.5" />
      <text x={x1 + 12} y={midY + 3} fontSize="9" fill={muted}>θ</text>
      {/* 元の波（破線・muted） */}
      <path d={sinePath(x0, x1, midY, amp, 1.5)} fill="none" stroke={muted} strokeWidth="1.3" strokeDasharray="5,4" />
      {/* ずれた波（実線・accent） */}
      <path d={sinePath(x0, x1, midY, amp, 1.5, shift)} fill="none" stroke={accent} strokeWidth="1.8" />
      {/* ずれを示す矢印（山→山） */}
      <line x1={x0 + (x1 - x0) * (0.25 / 1.5)} y1={arrowY} x2={x0 + (x1 - x0) * (0.25 / 1.5 + shift / 1.5)} y2={arrowY} stroke={accent} strokeWidth="1.2" markerEnd="url(#arrowW2)" />
      <defs>
        <marker id="arrowW2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
        </marker>
      </defs>
      <text x="160" y="140" fontSize="9.5" fill={muted} textAnchor="middle" fontStyle="italic">
        形は同じ、位置だけが横へずれる——山も谷もゼロ点も、そっくり同じだけ動く
      </text>
    </svg>
  );
}

/**
 * グラフ系列 Step 7 の足場図（W3）：読み取り用の波形。横軸の目盛り（π/2, π,
 * 3π/2, 2π）だけが与えられ、式のラベルは書かない（式を読むことが問い）。
 * 波は 0〜2π に 2 周期（周期 π）。
 */
export function TrigWaveReading() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const x0 = 30;
  const x1 = 290;
  const midY = 66;
  const amp = 40;
  const tick = (k: number) => x0 + ((x1 - x0) * k) / 4; // k/4 × 2π の位置
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="横軸に π/2 ごとの目盛りが入った波形。0 から 2π までに 2 回くり返している"
    >
      <line x1={x0 - 8} y1={midY} x2={x1 + 12} y2={midY} stroke={muted} strokeWidth="0.5" />
      <text x={x1 + 14} y={midY + 3} fontSize="9" fill={muted}>θ</text>
      <line x1={x0} y1={midY - amp - 6} x2={x0} y2={midY + amp + 6} stroke={muted} strokeWidth="0.5" />
      {/* y = ±1 の目盛り */}
      <line x1={x0 - 3} y1={midY - amp} x2={x0 + 3} y2={midY - amp} stroke={stroke} strokeWidth="0.8" />
      <text x={x0 - 6} y={midY - amp + 3} fontSize="8.5" fill={muted} textAnchor="end">1</text>
      <line x1={x0 - 3} y1={midY + amp} x2={x0 + 3} y2={midY + amp} stroke={stroke} strokeWidth="0.8" />
      <text x={x0 - 6} y={midY + amp + 3} fontSize="8.5" fill={muted} textAnchor="end">−1</text>
      {/* 横軸目盛り */}
      {[1, 2, 3, 4].map((k) => (
        <g key={k}>
          <line x1={tick(k)} y1={midY - 3} x2={tick(k)} y2={midY + 3} stroke={stroke} strokeWidth="0.8" />
        </g>
      ))}
      <text x={tick(1)} y={midY + 16} fontSize="9" fill={muted} textAnchor="middle">π/2</text>
      <text x={tick(2)} y={midY + 16} fontSize="9" fill={muted} textAnchor="middle">π</text>
      <text x={tick(3)} y={midY + 16} fontSize="9" fill={muted} textAnchor="middle">3π/2</text>
      <text x={tick(4)} y={midY + 16} fontSize="9" fill={muted} textAnchor="middle">2π</text>
      <text x={x0} y={midY + 16} fontSize="9" fill={muted} textAnchor="middle">0</text>
      {/* 0〜2π に 2 周期の波（式ラベルなし） */}
      <path d={sinePath(x0, x1, midY, amp, 2)} fill="none" stroke={accent} strokeWidth="1.8" />
      <text x="160" y="140" fontSize="9.5" fill={muted} textAnchor="middle" fontStyle="italic">
        目盛りから、波が 1 回くり返す長さを読み取ろう
      </text>
    </svg>
  );
}

/**
 * グラフ系列 Step 8 の足場図（W4）：y = tanθ のグラフと漸近線（破線）。
 * 周期の値は書かない（それが問い）。漸近線の位置 −π/2・π/2・3π/2 は目盛りとして与える。
 */
export function TrigTanGraph() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const x0 = 24;
  const x1 = 296;
  const midY = 72;
  const scale = 16; // y=1 の px
  // −3π/4 〜 7π/4 を横幅に対応させる（2.5π ぶん）
  const thetaMin = -0.75 * Math.PI;
  const thetaMax = 1.75 * Math.PI;
  const toX = (t: number) => x0 + ((t - thetaMin) / (thetaMax - thetaMin)) * (x1 - x0);
  const branch = (center: number) => {
    const pts: string[] = [];
    const n = 60;
    for (let i = 0; i <= n; i++) {
      const t = center - 0.42 * Math.PI + (0.84 * Math.PI * i) / n;
      const y = midY - scale * Math.tan(t - center);
      pts.push(`${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const asymptotes = [-Math.PI / 2, Math.PI / 2, (3 * Math.PI) / 2];
  const asymLabels = ["−π/2", "π/2", "3π/2"];
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="y = tanθ のグラフ。π/2 の奇数倍の縦の漸近線に沿って、同じ形の枝がくり返し並ぶ"
    >
      <line x1={x0 - 6} y1={midY} x2={x1 + 10} y2={midY} stroke={muted} strokeWidth="0.5" />
      <text x={x1 + 12} y={midY + 3} fontSize="9" fill={muted}>θ</text>
      {/* 漸近線 */}
      {asymptotes.map((a, i) => (
        <g key={i}>
          <line x1={toX(a)} y1="12" x2={toX(a)} y2="126" stroke={muted} strokeWidth="0.9" strokeDasharray="4,3" />
          <text x={toX(a)} y="138" fontSize="9" fill={muted} textAnchor="middle">{asymLabels[i]}</text>
        </g>
      ))}
      {/* O の目盛り */}
      <line x1={toX(0)} y1={midY - 3} x2={toX(0)} y2={midY + 3} stroke={stroke} strokeWidth="0.8" />
      <text x={toX(0) + 2} y={midY + 14} fontSize="9" fill={muted}>O</text>
      <text x={toX(Math.PI)} y={midY + 14} fontSize="9" fill={muted} textAnchor="middle">π</text>
      <line x1={toX(Math.PI)} y1={midY - 3} x2={toX(Math.PI)} y2={midY + 3} stroke={stroke} strokeWidth="0.8" />
      {/* tan の枝（3 本） */}
      <path d={branch(0)} fill="none" stroke={accent} strokeWidth="1.7" />
      <path d={branch(Math.PI)} fill="none" stroke={accent} strokeWidth="1.7" />
      <path d={branch(-Math.PI)} fill="none" stroke={accent} strokeWidth="1.7" />
      <text x="160" y="149" fontSize="9.5" fill={muted} textAnchor="middle" fontStyle="italic">
        同じ形の枝が、縦の壁（漸近線）ごとにくり返す
      </text>
    </svg>
  );
}

/**
 * 性質系列 Step 4 の足場図（S1）：単位円上の θ の点と π−θ の点が
 * y 軸対称に向かい合う。座標の値は書かない（符号と配置だけ）。
 */
export function TrigSymmetryYAxis() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const ox = 140;
  const oy = 140;
  const r = 92;
  const th = (35 * Math.PI) / 180;
  const px = ox + r * Math.cos(th);
  const py = oy - r * Math.sin(th);
  const qx = ox - r * Math.cos(th);
  const qy = py;
  return (
    <svg
      viewBox="0 0 280 270"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円上で θ の点と π−θ の点が y 軸に関して対称に向かい合う図"
    >
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="18" x2={ox} y2="252" stroke={muted} strokeWidth="0.7" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="20" fontSize="9" fill={muted} textAnchor="end">y</text>
      <circle cx={ox} cy={oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 2 本の半径 */}
      <line x1={ox} y1={oy} x2={px} y2={py} stroke={stroke} strokeWidth="1.5" />
      <line x1={ox} y1={oy} x2={qx} y2={qy} stroke={stroke} strokeWidth="1.5" />

      {/* 対称を示す水平の破線 */}
      <line x1={qx} y1={qy} x2={px} y2={py} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />

      {/* 折り返しの矢印（上側の弧） */}
      <path d={`M ${px - 14} ${py - 14} A ${r + 14} ${r + 14} 0 0 0 ${qx + 14} ${qy - 14}`} fill="none" stroke={muted} strokeWidth="0.9" markerEnd="url(#arrowS1)" />
      <defs>
        <marker id="arrowS1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)" />
        </marker>
      </defs>

      <circle cx={px} cy={py} r="3.5" fill={accent} />
      <circle cx={qx} cy={qy} r="3.5" fill={accent} />
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={px + 7} y={py + 2} fontSize="10.5" fill={accent} fontStyle="italic">θ の点</text>
      <text x={qx - 7} y={qy + 2} fontSize="10.5" fill={accent} fontStyle="italic" textAnchor="end">π−θ の点</text>
      <text x={ox + 5} y={oy + 14} fontSize="10" fill={muted}>O</text>

      <text x="140" y="264" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        y 軸で折り返すと重なる 2 点——高さは同じ、横の符号だけ反対
      </text>
    </svg>
  );
}

/**
 * 性質系列 Step 7 の足場図（S2）：直線 y = x での折り返しで、点 (a, b) が
 * (b, a) に移る——座標の入れ替わり。値は文字のまま（答えを書かない）。
 */
export function TrigSymmetryDiagonal() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const ox = 130;
  const oy = 150;
  const r = 92;
  const th = (28 * Math.PI) / 180;
  const px = ox + r * Math.cos(th);
  const py = oy - r * Math.sin(th);
  const qx = ox + r * Math.sin(th);
  const qy = oy - r * Math.cos(th);
  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円上の点 (a, b) を直線 y = x で折り返すと (b, a) に移る——座標が入れ替わる"
    >
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="20" x2={ox} y2="262" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <text x={ox - 4} y="22" fontSize="9" fill={muted} textAnchor="end">y</text>
      <circle cx={ox} cy={oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 直線 y = x（45°） */}
      <line x1={ox - 105} y1={oy + 105} x2={ox + 118} y2={oy - 118} stroke={muted} strokeWidth="1" strokeDasharray="6,4" />
      <text x={ox + 108} y={oy - 120} fontSize="9.5" fill={muted} fontStyle="italic">y = x</text>

      {/* 2 点と半径 */}
      <line x1={ox} y1={oy} x2={px} y2={py} stroke={stroke} strokeWidth="1.4" />
      <line x1={ox} y1={oy} x2={qx} y2={qy} stroke={stroke} strokeWidth="1.4" />
      <line x1={px} y1={py} x2={qx} y2={qy} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
      <circle cx={px} cy={py} r="3.5" fill={accent} />
      <circle cx={qx} cy={qy} r="3.5" fill={accent} />
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={px + 7} y={py + 3} fontSize="10.5" fill={accent} fontStyle="italic">(a, b)</text>
      <text x={qx + 7} y={qy - 4} fontSize="10.5" fill={accent} fontStyle="italic">(b, a)</text>
      <text x={ox - 5} y={oy + 14} fontSize="10" fill={muted} textAnchor="end">O</text>

      <text x="140" y="274" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        y = x で折り返すと、x 座標と y 座標が入れ替わる
      </text>
    </svg>
  );
}

/**
 * 加法定理系列 Step 1 の足場図（A1）：単位円上に角 α と、その上に重ねた β。
 * 「角を足す＝回転を重ねる」の配置だけを示す。値は書かない。
 */
export function TrigAngleSum() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const ox = 140;
  const oy = 156;
  const r = 100;
  const a = (28 * Math.PI) / 180;
  const ab = (73 * Math.PI) / 180;
  const p1x = ox + r * Math.cos(a);
  const p1y = oy - r * Math.sin(a);
  const p2x = ox + r * Math.cos(ab);
  const p2y = oy - r * Math.sin(ab);
  return (
    <svg
      viewBox="0 0 280 270"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円上で角 α の上に角 β を重ねると α+β の点に届く——角の和は回転の重ね"
    >
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="24" x2={ox} y2="258" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <circle cx={ox} cy={oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* α の半径と α+β の半径 */}
      <line x1={ox} y1={oy} x2={p1x} y2={p1y} stroke={muted} strokeWidth="1.2" strokeDasharray="4,3" />
      <line x1={ox} y1={oy} x2={p2x} y2={p2y} stroke={stroke} strokeWidth="1.6" />

      {/* α の弧（内側） */}
      <path d={`M ${ox + 40} ${oy} A 40 40 0 0 0 ${ox + 40 * Math.cos(a)} ${oy - 40 * Math.sin(a)}`} fill="none" stroke={muted} strokeWidth="1.1" />
      <text x={ox + 52} y={oy - 9} fontSize="11" fill={muted} fontStyle="italic">α</text>
      {/* β の弧（外側・α の上に重ねる） */}
      <path d={`M ${ox + 56 * Math.cos(a)} ${oy - 56 * Math.sin(a)} A 56 56 0 0 0 ${ox + 56 * Math.cos(ab)} ${oy - 56 * Math.sin(ab)}`} fill="none" stroke={accent} strokeWidth="1.4" />
      <text x={ox + 64 * Math.cos((a + ab) / 2)} y={oy - 64 * Math.sin((a + ab) / 2) + 4} fontSize="11" fill={accent} fontStyle="italic">β</text>

      <circle cx={p1x} cy={p1y} r="2.6" fill={muted} />
      <circle cx={p2x} cy={p2y} r="3.5" fill={accent} />
      <text x={p1x + 6} y={p1y + 3} fontSize="9.5" fill={muted} fontStyle="italic">α の点</text>
      <text x={p2x + 6} y={p2y - 2} fontSize="10" fill={accent} fontStyle="italic">α+β の点</text>
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={ox - 5} y={oy + 14} fontSize="10" fill={muted} textAnchor="end">O</text>

      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        α まで回して、さらに β 回す——足した角の点の座標は、元の 2 つの角から作れる？
      </text>
    </svg>
  );
}

/**
 * 加法定理系列 Step 9 の足場図（A2）：原点を通る 2 直線と、そのなす角 θ。
 * 傾きの値・角の値は書かない（それが問い）。
 */
export function TrigLinesAngle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ox = 140;
  const oy = 150;
  // 直線1（急な正の傾き）・直線2（ゆるい負の傾き）
  const a1 = Math.atan(2.2);
  const a2 = Math.atan(-0.45);
  const L = 118;
  const line = (ang: number) => ({
    x1: ox - L * Math.cos(ang),
    y1: oy + L * Math.sin(ang),
    x2: ox + L * Math.cos(ang),
    y2: oy - L * Math.sin(ang),
  });
  const l1 = line(a1);
  const l2 = line(a2);
  return (
    <svg
      viewBox="0 0 280 260"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="原点で交わる 2 本の直線と、その間のなす角 θ"
    >
      <line x1="16" y1={oy} x2="264" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="16" x2={ox} y2="244" stroke={muted} strokeWidth="0.5" />
      <text x="260" y={oy + 13} fontSize="9" fill={muted}>x</text>

      <line {...l1} stroke={stroke} strokeWidth="1.6" />
      <line {...l2} stroke={stroke} strokeWidth="1.6" />
      <text x={l1.x2 + 4} y={l1.y2 + 8} fontSize="10" fill={muted} fontStyle="italic">ℓ₁</text>
      <text x={l2.x2 + 4} y={l2.y2 + 3} fontSize="10" fill={muted} fontStyle="italic">ℓ₂</text>

      {/* なす角 θ の弧（2 直線の間・鋭角側） */}
      <path d={`M ${ox + 44 * Math.cos(a2)} ${oy - 44 * Math.sin(a2)} A 44 44 0 0 0 ${ox + 44 * Math.cos(a1)} ${oy - 44 * Math.sin(a1)}`} fill="none" stroke={accent} strokeWidth="1.6" />
      <text x={ox + 56 * Math.cos((a1 + a2) / 2)} y={oy - 56 * Math.sin((a1 + a2) / 2) + 4} fontSize="12" fill={accent} fontStyle="italic">θ</text>

      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={ox - 5} y={oy + 14} fontSize="10" fill={muted} textAnchor="end">O</text>

      <text x="140" y="256" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        2 本の直線のなす角——それぞれの傾き（tan）から作れる？
      </text>
    </svg>
  );
}

/**
 * 2倍角系列 Step 1 の足場図（D1）：単位円上の θ の点と、その 2 倍の角 2θ の点。
 * 「同じ角をもう一度重ねる」配置だけを示す。値は書かない。
 */
export function TrigDoubleAngle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const ox = 140;
  const oy = 156;
  const r = 100;
  const a = (32 * Math.PI) / 180;
  const p1x = ox + r * Math.cos(a);
  const p1y = oy - r * Math.sin(a);
  const p2x = ox + r * Math.cos(2 * a);
  const p2y = oy - r * Math.sin(2 * a);
  return (
    <svg
      viewBox="0 0 280 270"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="単位円上の θ の点と 2θ の点——同じ角をもう一度重ねると倍の角に届く"
    >
      <line x1="18" y1={oy} x2="262" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="24" x2={ox} y2="258" stroke={muted} strokeWidth="0.5" />
      <text x="258" y={oy + 13} fontSize="9" fill={muted}>x</text>
      <circle cx={ox} cy={oy} r={r} fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      <line x1={ox} y1={oy} x2={p1x} y2={p1y} stroke={muted} strokeWidth="1.2" strokeDasharray="4,3" />
      <line x1={ox} y1={oy} x2={p2x} y2={p2y} stroke={stroke} strokeWidth="1.6" />

      {/* θ の弧と、その上に重ねるもう 1 つの θ */}
      <path d={`M ${ox + 40} ${oy} A 40 40 0 0 0 ${ox + 40 * Math.cos(a)} ${oy - 40 * Math.sin(a)}`} fill="none" stroke={muted} strokeWidth="1.1" />
      <text x={ox + 50 * Math.cos(a / 2)} y={oy - 50 * Math.sin(a / 2) + 4} fontSize="11" fill={muted} fontStyle="italic">θ</text>
      <path d={`M ${ox + 56 * Math.cos(a)} ${oy - 56 * Math.sin(a)} A 56 56 0 0 0 ${ox + 56 * Math.cos(2 * a)} ${oy - 56 * Math.sin(2 * a)}`} fill="none" stroke={accent} strokeWidth="1.4" />
      <text x={ox + 68 * Math.cos((3 * a) / 2)} y={oy - 68 * Math.sin((3 * a) / 2) + 4} fontSize="11" fill={accent} fontStyle="italic">θ</text>

      <circle cx={p1x} cy={p1y} r="2.6" fill={muted} />
      <circle cx={p2x} cy={p2y} r="3.5" fill={accent} />
      <text x={p1x + 6} y={p1y + 3} fontSize="9.5" fill={muted} fontStyle="italic">θ の点</text>
      <text x={p2x + 6} y={p2y - 2} fontSize="10" fill={accent} fontStyle="italic">2θ の点</text>
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={ox - 5} y={oy + 14} fontSize="10" fill={muted} textAnchor="end">O</text>

      <text x="140" y="266" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        同じ角を、わざともう一度重ねる——2θ の座標は θ の座標から作れる？
      </text>
    </svg>
  );
}

/**
 * 合成系列の足場図（C1/C2 共通実装）：sin の係数 a を x 座標・cos の係数 b を
 * y 座標とする点 P(a, b) と、OP の長さ r・x 軸となす角 α。
 * r・α の値は書かない（それが問い）。quadrant2 で第 2 象限版（C2）。
 */
function TrigCompositionPointBase({ quadrant2 }: { quadrant2: boolean }) {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ox = quadrant2 ? 150 : 90;
  const oy = 170;
  const ang = quadrant2 ? (135 * Math.PI) / 180 : (48 * Math.PI) / 180;
  const L = 118;
  const px = ox + L * Math.cos(ang);
  const py = oy - L * Math.sin(ang);
  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label={
        quadrant2
          ? "sin の係数が負のとき、点 P(a, b) は第 2 象限に移る。OP の長さと x 軸からの角が合成の鍵"
          : "sin の係数 a を x 座標、cos の係数 b を y 座標とする点 P(a, b)。OP の長さ r と角 α が合成の鍵"
      }
    >
      <line x1="14" y1={oy} x2="266" y2={oy} stroke={muted} strokeWidth="0.5" />
      <line x1={ox} y1="18" x2={ox} y2="228" stroke={muted} strokeWidth="0.5" />
      <text x="262" y={oy + 13} fontSize="9" fill={muted}>X</text>
      <text x={ox - 4} y="20" fontSize="9" fill={muted} textAnchor="end">Y</text>

      {/* P への線分と破線の座標 */}
      <line x1={ox} y1={oy} x2={px} y2={py} stroke={accent} strokeWidth="1.8" />
      <line x1={px} y1={oy} x2={px} y2={py} stroke={muted} strokeWidth="0.8" strokeDasharray="3,3" />
      <line x1={ox} y1={py} x2={px} y2={py} stroke={muted} strokeWidth="0.8" strokeDasharray="3,3" />

      {/* α の弧 */}
      {quadrant2 ? (
        <path d={`M ${ox + 30} ${oy} A 30 30 0 0 0 ${ox + 30 * Math.cos(ang)} ${oy - 30 * Math.sin(ang)}`} fill="none" stroke={muted} strokeWidth="1" />
      ) : (
        <path d={`M ${ox + 30} ${oy} A 30 30 0 0 0 ${ox + 30 * Math.cos(ang)} ${oy - 30 * Math.sin(ang)}`} fill="none" stroke={muted} strokeWidth="1" />
      )}
      <text x={ox + (quadrant2 ? 34 : 38)} y={oy - 14} fontSize="11" fill={muted} fontStyle="italic">α</text>

      <circle cx={px} cy={py} r="3.5" fill={accent} />
      <text x={px + (quadrant2 ? -8 : 8)} y={py - 6} fontSize="10.5" fill={accent} fontStyle="italic" textAnchor={quadrant2 ? "end" : "start"}>P(a, b)</text>
      <text x={(ox + px) / 2 + (quadrant2 ? -14 : 10)} y={(oy + py) / 2 - 6} fontSize="10.5" fill={accent} fontStyle="italic">r</text>
      <circle cx={ox} cy={oy} r="3" fill={stroke} />
      <text x={ox + 5} y={oy + 14} fontSize="10" fill={muted}>O</text>

      {/* 係数の説明 */}
      <text x={px} y={oy + 14} fontSize="9.5" fill={muted} textAnchor="middle">a（sin の係数）</text>
      <text x={quadrant2 ? ox + 6 : ox - 6} y={py + 3} fontSize="9.5" fill={muted} textAnchor={quadrant2 ? "start" : "end"}>b（cos の係数）</text>

      <text x="140" y="237" fontSize="10" fill={muted} textAnchor="middle" fontStyle="italic">
        {quadrant2
          ? "係数が負なら、P は第 1 象限を出る——α は鈍角や負の角になる"
          : "OP の長さ r と、x 軸からの角 α——この 2 つが合成された波の正体"}
      </text>
    </svg>
  );
}

/** 合成系列 Step 1 の足場図（C1）：第 1 象限の点 P(a, b)。 */
export function TrigCompositionPoint() {
  return <TrigCompositionPointBase quadrant2={false} />;
}

/** 合成系列 Step 6 の足場図（C2）：係数が負で P が第 2 象限にある版。 */
export function TrigCompositionPointQ2() {
  return <TrigCompositionPointBase quadrant2={true} />;
}

/**
 * 円の方程式 Step 6 の足場図：2 点 A(1, 2), B(7, 10) を直径の両端とする状態。
 * 中心 M（中点）と、それを直径とする円を示す。答えの数値は見せない。
 */
export function CircleStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 280x260
  // 1 unit = 18 px, origin SVG (50, 230)
  // A=(1,2) → SVG (50+18, 230-36) = (68, 194)
  // B=(7,10) → SVG (50+126, 230-180) = (176, 50)
  // M=(4,6) → SVG (50+72, 230-108) = (122, 122)
  // r = 5 = 90 px
  return (
    <svg
      viewBox="0 0 280 260"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="2 点 A, B を直径の両端とする円"
    >
      {/* 軸 */}
      <line x1="20" y1="230" x2="260" y2="230" stroke={muted} strokeWidth="0.5" />
      <line x1="50" y1="20" x2="50" y2="250" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="243" fontSize="9" fill={muted}>x</text>
      <text x="46" y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 円（中心 M、半径 5） */}
      <circle cx="122" cy="122" r="90" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 直径 AB */}
      <line x1="68" y1="194" x2="176" y2="50" stroke={accent} strokeWidth="1.6" />

      {/* A, B, M */}
      <circle cx="68" cy="194" r="3.5" fill={stroke} />
      <circle cx="176" cy="50" r="3.5" fill={stroke} />
      <circle cx="122" cy="122" r="3.5" fill={accent} />

      {/* 点ラベル */}
      <text x="56" y="208" fontSize="11" fill={stroke}>A(1, 2)</text>
      <text x="182" y="46" fontSize="11" fill={stroke}>B(7, 10)</text>
      <text x="128" y="115" fontSize="11" fill={accent} fontWeight="600">M</text>
    </svg>
  );
}

/**
 * 円の方程式 Step 7 の足場図：一般形 x²+y²-4x+6y-12=0 が表す円。
 * 中心 (2, -3)、半径 5。答え（半径 5）の数値は控えめに、配置を示す。
 */
export function CircleStep7() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 280x260
  // 1 unit = 18 px, origin SVG (90, 130)
  // 中心 (2, -3) → SVG (90+36, 130+54) = (126, 184)
  // 半径 5 → 90 px
  return (
    <svg
      viewBox="0 0 280 290"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="一般形で表された円のグラフ（具体的な中心・半径は問題で求める）"
    >
      {/* 軸 */}
      <line x1="20" y1="130" x2="260" y2="130" stroke={muted} strokeWidth="0.5" />
      <line x1="90" y1="20" x2="90" y2="280" stroke={muted} strokeWidth="0.5" />
      <text x="256" y="143" fontSize="9" fill={muted}>x</text>
      <text x="86" y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 原点 */}
      <text x="86" y="146" fontSize="9" fill={muted} textAnchor="end">O</text>

      {/* 円（中心 (2, -3) → SVG (126, 184)、半径 90 px） */}
      <circle cx="126" cy="184" r="90" fill={fillColor} stroke={stroke} strokeWidth="1.6" />

      {/* 中心の点（マークだけ、座標は見せない） */}
      <circle cx="126" cy="184" r="2.5" fill={accent} />

      {/* キャプション（式そのものを再掲、中心と半径の数値は見せない） */}
      <text x="140" y="280" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        x² + y² − 4x + 6y − 12 = 0 が表す円
      </text>
    </svg>
  );
}

/**
 * 斜辺 1 の直角三角形。横が cos θ、高さが sin θ、斜辺が 1。
 * サイン・コサインの「斜辺 1 のときの縦・横」という直感を視覚化。
 * 例として角度は arctan(3/4) ≈ 36.87°（3-4-5 直角三角形）。
 */
export function UnitTriangleSinCos() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 320x230
  // 三角形：(60, 180), (220, 180), (220, 60)
  // 横 160px, 高さ 120px, 斜辺 200px（= 1 と読む）
  return (
    <svg
      viewBox="0 0 320 230"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="斜辺 1 の直角三角形：横が cos θ、高さが sin θ"
    >
      {/* 地面参照線 */}
      <line
        x1="20"
        y1="180"
        x2="300"
        y2="180"
        stroke="var(--border)"
        strokeWidth="0.5"
        strokeDasharray="3,3"
      />

      {/* 三角形 */}
      <polygon
        points="60,180 220,180 220,60"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />

      {/* 直角マーカー at (220, 180) */}
      <polyline
        points="212,180 212,172 220,172"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />

      {/* θ 弧 at (60, 180)
          斜辺方向：(160, -120) normalized = (0.8, -0.6)
          arc from (80, 180) to (60+20*0.8, 180-20*0.6) = (76, 168) */}
      <path
        d="M 80,180 A 20,20 0 0,0 76,168"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="88" y="175" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>

      {/* 辺ラベル */}
      <text
        x="140"
        y="198"
        fontSize="13"
        fill={accent}
        textAnchor="middle"
        fontStyle="italic"
        fontWeight="600"
      >
        cos θ
      </text>
      <text
        x="232"
        y="124"
        fontSize="13"
        fill={accent}
        fontStyle="italic"
        fontWeight="600"
      >
        sin θ
      </text>
      <text x="120" y="110" fontSize="14" fill={stroke} fontStyle="italic" fontWeight="600">
        1
      </text>

      {/* キャプション */}
      <text
        x="160"
        y="220"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        斜辺 1 の直角三角形——横が cos θ、高さが sin θ
      </text>
    </svg>
  );
}

/**
 * 直線の傾き m = (y₂ − y₁) / (x₂ − x₁) を視覚化する図。
 * 2 点 P₁, P₂ と、ステップ三角形（Δx, Δy）を一緒に描く。
 */
export function LineSlope() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 320x250, origin SVG (50, 200), 1 unit = 25 px
  // P₁ = (1, 2) → SVG (75, 150), P₂ = (5, 6) → SVG (175, 50)
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="2 点 P₁, P₂ を通る直線。傾き m = (y₂-y₁)/(x₂-x₁)"
    >
      {/* 軸 */}
      <line x1="20" y1="200" x2="300" y2="200" stroke={muted} strokeWidth="0.5" />
      <line x1="50" y1="20" x2="50" y2="230" stroke={muted} strokeWidth="0.5" />
      <text x="296" y="213" fontSize="9" fill={muted}>x</text>
      <text x="46" y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* ステップ三角形 */}
      <polygon
        points="75,150 175,150 175,50"
        fill={fillColor}
        stroke={muted}
        strokeWidth="0.8"
        strokeDasharray="3,2"
      />

      {/* 直線（実は線分として描く） */}
      <line x1="55" y1="170" x2="195" y2="30" stroke={stroke} strokeWidth="1.8" />

      {/* P1, P2 */}
      <circle cx="75" cy="150" r="3.5" fill={accent} />
      <circle cx="175" cy="50" r="3.5" fill={accent} />

      {/* ラベル */}
      <text x="60" y="170" fontSize="11" fill={stroke}>P₁(x₁, y₁)</text>
      <text x="180" y="48" fontSize="11" fill={stroke}>P₂(x₂, y₂)</text>
      <text x="125" y="167" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        x₂ − x₁
      </text>
      <text x="183" y="105" fontSize="11" fill={muted} fontStyle="italic">
        y₂ − y₁
      </text>

      {/* キャプション */}
      <text
        x="160"
        y="248"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        傾き m = (y の差) ÷ (x の差) ——「x の変化に対する y の変化」
      </text>
    </svg>
  );
}

/**
 * 平方完成からグラフの 3 つの読みどころ（頂点・軸・y 切片）が見える図。
 * 例として f(x) = (x-2)² + 1（頂点 (2, 1)、y 切片 5）。
 */
export function ParabolaWithLabels() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  // viewBox 360x260, origin SVG (180, 210), x: 30 px/unit, y: 18 px/unit
  // 放物線 f(x) = (x-2)² + 1, x ∈ [-1, 5]
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const x = -1 + (i / 60) * 6;
    const y = (x - 2) ** 2 + 1;
    const sx = 180 + x * 30;
    const sy = 210 - y * 18;
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 360 270"
      className="w-full h-auto"
      style={{ maxWidth: 380 }}
      role="img"
      aria-label="放物線 y = (x-2)² + 1 の頂点・対称軸・y 切片"
    >
      {/* x 軸 */}
      <line x1="20" y1="210" x2="340" y2="210" stroke={muted} strokeWidth="0.5" />
      {/* y 軸 */}
      <line x1="180" y1="20" x2="180" y2="240" stroke={muted} strokeWidth="0.5" />
      <text x="336" y="223" fontSize="9" fill={muted}>x</text>
      <text x="176" y="22" fontSize="9" fill={muted} textAnchor="end">y</text>

      {/* 対称軸（縦の破線、頂点を通る） */}
      <line
        x1="240"
        y1="20"
        x2="240"
        y2="210"
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="4,3"
        opacity="0.7"
      />
      <text x="244" y="35" fontSize="10" fill={accent} fontStyle="italic">
        x = −b/2
      </text>

      {/* 放物線 */}
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />

      {/* 頂点 (2, 1) */}
      <circle cx="240" cy="192" r="4" fill={accent} />
      <text x="248" y="198" fontSize="11" fill={accent} fontStyle="italic" fontWeight="600">
        頂点
      </text>
      <text x="248" y="212" fontSize="9" fill={muted}>
        (−b/2, c − b²/4)
      </text>

      {/* y 切片 (0, 5) */}
      <circle cx="180" cy="120" r="4" fill={accent} />
      <text
        x="172"
        y="116"
        fontSize="11"
        fill={accent}
        fontStyle="italic"
        fontWeight="600"
        textAnchor="end"
      >
        y 切片
      </text>
      <text x="172" y="130" fontSize="9" fill={muted} textAnchor="end">
        (0, c)
      </text>

      {/* キャプション */}
      <text
        x="180"
        y="260"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        平方完成 1 つで、頂点・軸・y 切片が一度に見える
      </text>
    </svg>
  );
}

/**
 * 平方完成の幾何的意味を示す図。
 * x² + bx を「x×x の正方形 + 2つの x×(b/2) の長方形」と捉え、
 * 隙間の (b/2)² を補うと、辺 (x + b/2) の大きな正方形が完成する。
 * 「平方完成」という名前の由来そのものを視覚化。
 */
export function CompleteSquareVisual() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const xSquareFill = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const rectFill = "color-mix(in oklch, var(--foreground) 5%, transparent)";
  const addedFill = "color-mix(in oklch, var(--accent) 28%, transparent)";
  // x = 130, b/2 = 70 で 大きな正方形 (40,40)-(240,240)
  return (
    <svg
      viewBox="0 0 280 310"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="平方完成の幾何的意味：x² + bx に (b/2)² を補って (x + b/2)² を完成させる"
    >
      {/* 左上: x² */}
      <rect x="40" y="40" width="130" height="130" fill={xSquareFill} stroke={stroke} strokeWidth="1" />
      {/* 右上: x × (b/2) */}
      <rect x="170" y="40" width="70" height="130" fill={rectFill} stroke={stroke} strokeWidth="1" />
      {/* 左下: (b/2) × x */}
      <rect x="40" y="170" width="130" height="70" fill={rectFill} stroke={stroke} strokeWidth="1" />
      {/* 右下: (b/2)²（補うぶん、破線で強調） */}
      <rect
        x="170"
        y="170"
        width="70"
        height="70"
        fill={addedFill}
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="4,2"
      />
      {/* 大きな正方形の外枠 */}
      <rect
        x="40"
        y="40"
        width="200"
        height="200"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />

      {/* 内部ラベル */}
      <text x="105" y="110" fontSize="18" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        x²
      </text>
      <text x="205" y="110" fontSize="11" fill={stroke} textAnchor="middle" fontStyle="italic">
        (b/2)x
      </text>
      <text x="105" y="212" fontSize="11" fill={stroke} textAnchor="middle" fontStyle="italic">
        (b/2)x
      </text>
      <text
        x="205"
        y="212"
        fontSize="12"
        fill={accent}
        textAnchor="middle"
        fontStyle="italic"
        fontWeight="700"
      >
        (b/2)²
      </text>

      {/* 上辺ラベル */}
      <text x="105" y="32" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        x
      </text>
      <text x="205" y="32" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        b/2
      </text>
      {/* 左辺ラベル */}
      <text x="32" y="110" fontSize="11" fill={muted} textAnchor="end" fontStyle="italic">
        x
      </text>
      <text x="32" y="212" fontSize="11" fill={muted} textAnchor="end" fontStyle="italic">
        b/2
      </text>

      {/* キャプション */}
      <text
        x="140"
        y="275"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        x² + bx に (b/2)² を補うと、辺 (x + b/2) の正方形が完成
      </text>
      <text
        x="140"
        y="294"
        fontSize="11"
        fill={accent}
        textAnchor="middle"
        fontStyle="italic"
      >
        破線の正方形が「平方を完成させる」一手
      </text>
    </svg>
  );
}

/**
 * 原点中心、半径 r の円と、円上の点 P(x, y)、原点との直角三角形。
 * x² + y² = r² の式が、ピタゴラスから自然に出てくることを視覚化。
 * 例として 3-4-5 直角三角形（P=(3,4)、r=5）。
 */
export function CircleAroundOrigin() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 320x290, origin SVG (160, 200), 1 unit = 20 px, radius 5 units = 100 px
  // P = (3, 4) → SVG (160+60, 200-80) = (220, 120)
  return (
    <svg
      viewBox="0 0 320 290"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="原点を中心とする半径 r の円。点 P(x, y) と原点との直角三角形（ピタゴラス）"
    >
      {/* 軸 */}
      <line x1="20" y1="200" x2="300" y2="200" stroke={muted} strokeWidth="0.5" />
      <line x1="160" y1="20" x2="160" y2="280" stroke={muted} strokeWidth="0.5" />
      <text x="296" y="213" fontSize="10" fill={muted}>x</text>
      <text x="156" y="22" fontSize="10" fill={muted} textAnchor="end">y</text>

      {/* 円 */}
      <circle cx="160" cy="200" r="100" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* x（横の補助線） */}
      <line x1="160" y1="200" x2="220" y2="200" stroke={stroke} strokeWidth="1.5" />
      {/* y（縦の補助線、破線） */}
      <line x1="220" y1="200" x2="220" y2="120" stroke={stroke} strokeWidth="1" strokeDasharray="3,2" />
      {/* OP（半径） */}
      <line x1="160" y1="200" x2="220" y2="120" stroke={accent} strokeWidth="1.7" />
      {/* 直角マーカー at foot=(220, 200) */}
      <polyline points="214,200 214,194 220,194" fill="none" stroke={stroke} strokeWidth="0.8" />

      {/* 原点 */}
      <circle cx="160" cy="200" r="3" fill={stroke} />
      {/* P */}
      <circle cx="220" cy="120" r="3" fill={accent} />

      {/* ラベル */}
      <text x="148" y="215" fontSize="11" fill={stroke}>O</text>
      <text x="226" y="118" fontSize="11" fill={stroke}>P(x, y)</text>
      <text x="186" y="215" fontSize="11" fill={muted} fontStyle="italic">x</text>
      <text x="226" y="166" fontSize="11" fill={muted} fontStyle="italic">y</text>
      <text x="178" y="155" fontSize="13" fill={accent} fontStyle="italic" fontWeight="600">r</text>

      {/* キャプション */}
      <text x="160" y="275" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        x² + y² = r² —— ピタゴラスから自然に出てくる円の方程式
      </text>
    </svg>
  );
}

/**
 * 中心 A(a, b)、半径 r の円と、円上の点 P(x, y)。
 * 標準形 (x-a)² + (y-b)² = r² が、A から P までの距離を表していることを視覚化。
 */
export function CircleAroundCenter() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  // viewBox 320x270, origin SVG (50, 220), 1 unit = 25 px
  // A=(4,3) → SVG (50+100, 220-75) = (150, 145), radius 90 px (= 3.6 units)
  // P = A + (54, -72) で AP = 90 px ピッタリ（54²+72²=8100=90²）
  return (
    <svg
      viewBox="0 0 320 270"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="中心 A(a, b)、半径 r の円。P(x, y) は円の上の点"
    >
      {/* 軸 */}
      <line x1="20" y1="220" x2="300" y2="220" stroke={muted} strokeWidth="0.5" />
      <line x1="50" y1="20" x2="50" y2="250" stroke={muted} strokeWidth="0.5" />
      <text x="296" y="233" fontSize="10" fill={muted}>x</text>
      <text x="46" y="22" fontSize="10" fill={muted} textAnchor="end">y</text>

      {/* 円 */}
      <circle cx="150" cy="145" r="90" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* AP（半径） */}
      <line x1="150" y1="145" x2="204" y2="73" stroke={accent} strokeWidth="1.7" />

      {/* 中心 A */}
      <circle cx="150" cy="145" r="3" fill={stroke} />
      {/* P */}
      <circle cx="204" cy="73" r="3" fill={accent} />

      {/* ラベル */}
      <text x="118" y="138" fontSize="11" fill={stroke}>A(a, b)</text>
      <text x="210" y="68" fontSize="11" fill={stroke}>P(x, y)</text>
      <text x="186" y="100" fontSize="13" fill={accent} fontStyle="italic" fontWeight="600">r</text>

      {/* キャプション */}
      <text x="160" y="262" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        中心 A から P までの距離が r —— (x-a)² + (y-b)² = r²
      </text>
    </svg>
  );
}

/**
 * 直径の両端 A, B から円が決まる図。
 * 中心 M = AB の中点、半径 r = AB / 2 を可視化。
 */
export function DiameterCircle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="直径の両端 A, B から円が決まる：中心 M は AB の中点、半径は AB / 2"
    >
      {/* 円 */}
      <circle cx="160" cy="110" r="70" fill={fillColor} stroke={stroke} strokeWidth="1.5" />

      {/* 直径 AB */}
      <line x1="90" y1="110" x2="230" y2="110" stroke={accent} strokeWidth="1.7" />

      {/* A, B, M */}
      <circle cx="90" cy="110" r="3.5" fill={stroke} />
      <circle cx="230" cy="110" r="3.5" fill={stroke} />
      <circle cx="160" cy="110" r="3.5" fill={accent} />

      <text x="78" y="128" fontSize="11" fill={stroke}>A</text>
      <text x="228" y="128" fontSize="11" fill={stroke}>B</text>
      <text x="155" y="128" fontSize="11" fill={accent} fontWeight="600">M</text>

      {/* 半径ラベル */}
      <text x="120" y="103" fontSize="10" fill={muted}>半径</text>
      <text x="190" y="103" fontSize="10" fill={muted}>半径</text>

      {/* キャプション */}
      <text x="160" y="200" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        中心 M は AB の中点、半径 = AB ÷ 2
      </text>
    </svg>
  );
}

/**
 * 三角形の面積を「底辺 × 高さ ÷ 2」で求める図。
 * 例：A(0,0), B(4,0), C(0,3) の三角形で、
 * 底辺 BC、高さ d = A から BC への距離。
 *
 * 座標系：原点 A を SVG (50, 170)、1 単位 = 30 pixel。
 * H（垂線の足）は線分 BC 上、計算で (93.2, 112.4) 付近。
 */
export function TriangleAreaByDistance() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 280 220"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="3点 A(0,0), B(4,0), C(0,3) の三角形と、A から BC への垂線（高さ d）"
    >
      {/* 軸 */}
      <line x1="40" y1="170" x2="240" y2="170" stroke={muted} strokeWidth="0.5" />
      <line x1="50" y1="170" x2="50" y2="30" stroke={muted} strokeWidth="0.5" />
      <text x="232" y="183" fontSize="9" fill={muted}>
        x
      </text>
      <text x="48" y="35" fontSize="9" fill={muted} textAnchor="end">
        y
      </text>

      {/* 三角形（塗り） */}
      <polygon
        points="50,170 170,170 50,80"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.5"
      />
      {/* BC を強調（底辺） */}
      <line x1="170" y1="170" x2="50" y2="80" stroke={stroke} strokeWidth="2" />

      {/* A から BC への垂線（高さ d、破線で示す） */}
      <line
        x1="50"
        y1="170"
        x2="93.2"
        y2="112.4"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      {/* 直角マーカー at H=(93.2,112.4) */}
      <polyline
        points="99.6,117.2 94.8,123.6 88.4,118.8"
        fill="none"
        stroke={stroke}
        strokeWidth="0.8"
      />

      {/* 点 */}
      <circle cx="50" cy="170" r="3" fill={stroke} />
      <circle cx="170" cy="170" r="3" fill={stroke} />
      <circle cx="50" cy="80" r="3" fill={stroke} />

      {/* 点ラベル */}
      <text x="42" y="186" fontSize="11" fill={stroke}>
        A
      </text>
      <text x="174" y="184" fontSize="11" fill={stroke}>
        B
      </text>
      <text x="42" y="76" fontSize="11" fill={stroke}>
        C
      </text>

      {/* 距離 d ラベル */}
      <text
        x="58"
        y="138"
        fontSize="13"
        fill={accent}
        fontStyle="italic"
        fontWeight="600"
      >
        d
      </text>

      {/* キャプション */}
      <text
        x="140"
        y="208"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        底辺 BC、高さ d（A から BC への距離）
      </text>
    </svg>
  );
}

/**
 * 直角三角形の anatomy 図。
 * 2辺を a, b、斜辺を c とラベルし、直角マーカーを付ける。
 * ピタゴラスの定理の「役者の紹介」に相当。
 */
export function RightTriangleAnatomy() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="直角三角形：直角を挟む2辺 a, b と 斜辺 c"
    >
      {/* 三角形：右下が直角。底辺 b、左辺 a、斜辺 c */}
      <polygon
        points="60,60 60,180 240,180"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 直角マーカー（左下） */}
      <polyline
        points="68,180 68,172 60,172"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* 辺ラベル */}
      <text x="48" y="125" fontSize="14" fill={stroke} textAnchor="end" fontStyle="italic">
        a
      </text>
      <text x="150" y="200" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        b
      </text>
      <text x="162" y="115" fontSize="14" fill={accent} fontStyle="italic" fontWeight="600">
        c
      </text>
      {/* キャプション */}
      <text
        x="160"
        y="215"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        a と b が直角をはさむ 2辺、c が斜辺
      </text>
    </svg>
  );
}

/**
 * 数え方その1：$(a+b)^2$ を 4 つに分けた図。
 *   左上の a² 正方形、右上の ab 長方形、左下の ab 長方形、右下の b² 正方形。
 *   PythagorasProof と「同じ大きな正方形」を別の見方で見ていることを強調するため、
 *   座標と寸法（a=60, b=140）を統一している。
 */
export function ExpansionSquare() {
  const stroke = "var(--foreground)";
  const muted = "var(--muted)";
  const aFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const abFill = "color-mix(in oklch, var(--foreground) 5%, transparent)";
  const bFill = "color-mix(in oklch, var(--accent) 24%, transparent)";
  return (
    <svg
      viewBox="0 0 280 290"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="(a+b)の2乗 を a², ab, ab, b² の 4 つに分けた図"
    >
      {/* 4 つの分割（外枠を兼ねる） */}
      {/* 左上: a² */}
      <rect x="40" y="40" width="60" height="60" fill={aFill} stroke={stroke} strokeWidth="1" />
      {/* 右上: ab */}
      <rect x="100" y="40" width="140" height="60" fill={abFill} stroke={stroke} strokeWidth="1" />
      {/* 左下: ab */}
      <rect x="40" y="100" width="60" height="140" fill={abFill} stroke={stroke} strokeWidth="1" />
      {/* 右下: b² */}
      <rect x="100" y="100" width="140" height="140" fill={bFill} stroke={stroke} strokeWidth="1" />
      {/* 大きな正方形の外枠 */}
      <rect
        x="40"
        y="40"
        width="200"
        height="200"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />

      {/* 内部ラベル */}
      <text x="70" y="76" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        a²
      </text>
      <text x="170" y="76" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        ab
      </text>
      <text x="70" y="175" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        ab
      </text>
      <text x="170" y="178" fontSize="20" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        b²
      </text>

      {/* 上辺ラベル */}
      <text x="70" y="32" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        a
      </text>
      <text x="170" y="32" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        b
      </text>
      {/* 左辺ラベル */}
      <text x="32" y="75" fontSize="12" fill={muted} textAnchor="end" fontStyle="italic">
        a
      </text>
      <text x="32" y="175" fontSize="12" fill={muted} textAnchor="end" fontStyle="italic">
        b
      </text>

      {/* キャプション */}
      <text
        x="140"
        y="270"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        (a+b)² = a² + ab + ab + b² = a² + 2ab + b²
      </text>
    </svg>
  );
}

/**
 * ピタゴラスの定理の「面積による証明」図。
 * 1辺 (a+b) の大きな正方形の中に、4枚の同じ直角三角形と、
 * 真ん中の c×c の正方形を配置する古典的な構図。
 * 視覚的に：
 *   (a+b)² = 4 × (ab/2) + c² →  a² + b² = c²
 */
export function PythagorasProof() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const triFill = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const cFill = "color-mix(in oklch, var(--accent) 22%, transparent)";
  // a=60, b=140, a+b=200 で大きな正方形 (40,40)-(240,240)
  return (
    <svg
      viewBox="0 0 280 290"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="ピタゴラスの定理の面積による証明：(a+b)の正方形の中に 4枚の直角三角形と c の正方形"
    >
      {/* 大きな正方形 (a+b)×(a+b) */}
      <rect
        x="40"
        y="40"
        width="200"
        height="200"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />
      {/* 4つの直角三角形 */}
      <polygon points="40,240 100,240 40,100" fill={triFill} stroke={stroke} strokeWidth="1" />
      <polygon points="40,40 40,100 180,40" fill={triFill} stroke={stroke} strokeWidth="1" />
      <polygon points="240,40 180,40 240,180" fill={triFill} stroke={stroke} strokeWidth="1" />
      <polygon points="240,240 240,180 100,240" fill={triFill} stroke={stroke} strokeWidth="1" />
      {/* 中の正方形 c×c */}
      <polygon
        points="100,240 40,100 180,40 240,180"
        fill={cFill}
        stroke={accent}
        strokeWidth="1.5"
      />
      {/* ラベル：a, b 上辺で */}
      <text x="110" y="32" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        b
      </text>
      <text x="210" y="32" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        a
      </text>
      {/* 中の正方形に c */}
      <text
        x="140"
        y="148"
        fontSize="20"
        fill={accent}
        textAnchor="middle"
        fontStyle="italic"
        fontWeight="600"
      >
        c
      </text>
      {/* キャプション */}
      <text
        x="140"
        y="270"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        この同じ正方形の面積を、「2通り」で数えてみる
      </text>
    </svg>
  );
}

/**
 * 正方形の対角線図。
 * 1辺 a の正方形の中に対角線を引き、その長さが a√2 になる。
 * Pythagoras 系列の Step 5（質の変化：a=b の場合）に対応。
 */
export function SquareDiagonal() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 260 230"
      className="w-full h-auto"
      style={{ maxWidth: 280 }}
      role="img"
      aria-label="正方形の対角線：1辺 a の正方形、対角線は a√2"
    >
      {/* 正方形 */}
      <rect
        x="50"
        y="50"
        width="140"
        height="140"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 対角線 */}
      <line
        x1="50"
        y1="50"
        x2="190"
        y2="190"
        stroke={accent}
        strokeWidth="1.6"
      />
      {/* 直角マーカー（左下） */}
      <polyline
        points="58,190 58,182 50,182"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* ラベル */}
      <text x="120" y="42" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        a
      </text>
      <text x="200" y="125" fontSize="13" fill={stroke} fontStyle="italic">
        a
      </text>
      <text x="135" y="108" fontSize="14" fill={accent} fontStyle="italic" fontWeight="600">
        a√2
      </text>
      {/* キャプション */}
      <text
        x="120"
        y="218"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        正方形の対角線は、必ず辺の √2 倍
      </text>
    </svg>
  );
}

/**
 * ゆるい坂と急な坂の比較図。
 * 同じ「進んだ長さ」（底辺）で、角度が違うと のぼり方（縦辺）が変わる。
 * 角が小さい → のぼり方 小、角が大きい → のぼり方 大、を一目で示す。
 *
 * 左：tan ≈ 0.5（θ ≈ 27°、ゆるい坂）
 * 右：tan ≈ 1.7（θ ≈ 60°、急な坂）
 * 二つの三角形の底辺の長さは同じにそろえて、角度の違いだけが効くようにしてある。
 */
export function SlopeAngleCompare() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const groundColor = "var(--border)";
  return (
    <svg
      viewBox="0 0 460 280"
      className="w-full h-auto"
      style={{ maxWidth: 460 }}
      role="img"
      aria-label="ゆるい坂と急な坂の比較。同じ底辺でも、角が急なほどのぼり方が大きい"
    >
      {/* 地面参照線 */}
      <line
        x1="20"
        y1="220"
        x2="440"
        y2="220"
        stroke={groundColor}
        strokeWidth="1"
        strokeDasharray="3,3"
      />

      {/* === 左：ゆるい坂（tan ≈ 0.5、θ ≈ 27°） === */}
      <polygon
        points="50,220 150,220 150,170"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 直角マーカー P1=(150,220) */}
      <polyline
        points="142,220 142,212 150,212"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* θ arc at S1=(50,220) */}
      <path
        d="M 70,220 A 20,20 0 0,0 67.14,209.71"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="76" y="215" fontSize="12" fill={accent} fontStyle="italic">
        θ
      </text>
      {/* 棒人間 at F1=(150,170) */}
      <circle cx="150" cy="145" r="5" fill="none" stroke={stroke} strokeWidth="1.3" />
      <line x1="150" y1="150" x2="150" y2="168" stroke={stroke} strokeWidth="1.3" />
      <line x1="150" y1="156" x2="145" y2="161" stroke={stroke} strokeWidth="1.3" />
      <line x1="150" y1="156" x2="155" y2="161" stroke={stroke} strokeWidth="1.3" />
      <line x1="150" y1="168" x2="146" y2="170" stroke={stroke} strokeWidth="1.3" />
      <line x1="150" y1="168" x2="154" y2="170" stroke={stroke} strokeWidth="1.3" />
      {/* キャプション */}
      <text x="100" y="245" fontSize="11" fill={muted} textAnchor="middle">
        角がゆるい
      </text>
      <text x="100" y="262" fontSize="12" fill={stroke} textAnchor="middle">
        のぼり方{" "}
        <tspan fill={accent} fontWeight="600">
          小
        </tspan>
      </text>

      {/* === 右：急な坂（tan ≈ 1.7、θ ≈ 60°） === */}
      <polygon
        points="270,220 370,220 370,50"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 直角マーカー P2=(370,220) */}
      <polyline
        points="362,220 362,212 370,212"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* θ arc at S2=(270,220) */}
      <path
        d="M 290,220 A 20,20 0 0,0 279.71,202.51"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="294" y="215" fontSize="12" fill={accent} fontStyle="italic">
        θ
      </text>
      {/* 棒人間 at F2=(370,50) */}
      <circle cx="370" cy="25" r="5" fill="none" stroke={stroke} strokeWidth="1.3" />
      <line x1="370" y1="30" x2="370" y2="48" stroke={stroke} strokeWidth="1.3" />
      <line x1="370" y1="36" x2="365" y2="41" stroke={stroke} strokeWidth="1.3" />
      <line x1="370" y1="36" x2="375" y2="41" stroke={stroke} strokeWidth="1.3" />
      <line x1="370" y1="48" x2="366" y2="50" stroke={stroke} strokeWidth="1.3" />
      <line x1="370" y1="48" x2="374" y2="50" stroke={stroke} strokeWidth="1.3" />
      {/* キャプション */}
      <text x="320" y="245" fontSize="11" fill={muted} textAnchor="middle">
        角が急
      </text>
      <text x="320" y="262" fontSize="12" fill={stroke} textAnchor="middle">
        のぼり方{" "}
        <tspan fill={accent} fontWeight="600">
          大
        </tspan>
      </text>
    </svg>
  );
}

/**
 * タンジェントの定義図（基本図／anatomy）。
 * 坂を登る棒人間と、直角三角形の anatomy を一枚で示す。
 * 役割：「なぜタンジェントなんて比を考えるのか」を絵で語る。
 *
 *   F (棒人間が登った位置)
 *   |\
 *   | \
 *   |  \  斜辺
 *   |   \
 * のぼった \
 *   |    \
 *   | θ   \
 *   --------
 *   S 進んだ長さ P
 */
export function TangentDefinition() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const groundColor = "var(--border)";
  // S=(110,230) 坂の根元, P=(270,230) 直角の頂点, F=(270,80) 坂の上
  return (
    <svg
      viewBox="0 0 460 290"
      className="w-full h-auto"
      style={{ maxWidth: 460 }}
      role="img"
      aria-label="坂を登った棒人間と直角三角形。底辺『進んだ長さ』、垂直辺『のぼった高さ』、底辺の角に θ"
    >
      {/* 地面の参照線 */}
      <line
        x1="40"
        y1="230"
        x2="440"
        y2="230"
        stroke={groundColor}
        strokeWidth="1"
        strokeDasharray="3,3"
      />

      {/* 直角三角形（坂） */}
      <polygon
        points="110,230 270,230 270,80"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 直角マーカー at P */}
      <polyline
        points="262,230 262,222 270,222"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* 角 θ at S。CA 方向(1,0) と CF 方向(150,-150) の間 */}
      <path
        d="M 130,230 A 20,20 0 0,0 124.14,215.86"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="138" y="225" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>

      {/* 棒人間（F = 坂の上に立っている） */}
      {/* 頭 */}
      <circle cx="270" cy="62" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      {/* 体 */}
      <line x1="270" y1="68" x2="270" y2="88" stroke={stroke} strokeWidth="1.5" />
      {/* 腕（両側に少し広げる） */}
      <line x1="270" y1="76" x2="261" y2="80" stroke={stroke} strokeWidth="1.5" />
      <line x1="270" y1="76" x2="279" y2="80" stroke={stroke} strokeWidth="1.5" />
      {/* 脚 */}
      <line x1="270" y1="88" x2="263" y2="100" stroke={stroke} strokeWidth="1.5" />
      <line x1="270" y1="88" x2="277" y2="100" stroke={stroke} strokeWidth="1.5" />

      {/* 「進んだ長さ」ラベル（底辺の下） */}
      <text x="190" y="252" fontSize="11" fill={muted} textAnchor="middle">
        進んだ長さ
      </text>
      {/* 「のぼった高さ」ラベル（右辺の右） */}
      <text x="285" y="152" fontSize="11" fill={muted}>
        のぼった
      </text>
      <text x="285" y="167" fontSize="11" fill={muted}>
        高さ
      </text>

      {/* キャプション */}
      <text
        x="230"
        y="278"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        坂のきつさは、「歩いた分のうち、どれだけ上がったか」で表せる
      </text>
    </svg>
  );
}

/**
 * 川幅を tan で測る図。
 * 岸を 10 m 歩いて、向こう岸の木を見上げた角度が 60° なら、
 * 川幅 = 10 × tan 60° ≈ 10 × 2 = 約 20 m。
 *
 * 池田洋介『数学Ⅰ・A 入門問題精講』（旺文社）の設例に着想を得て、
 * ruisuishiki の視覚言語でオリジナルに描き起こしたもの。
 * 数値（10 m / 60° / 約 20 m）は本サイトの教師の概数例に合わせている。
 */
export function RiverWidthMeasure() {
  const stroke = "var(--foreground)";
  const muted = "var(--muted)";
  const accent = "var(--accent)";
  const water =
    "color-mix(in oklch, var(--background) 78%, var(--accent) 22%)";
  const triFill =
    "color-mix(in oklch, var(--accent) 6%, transparent)";
  const leaf =
    "color-mix(in oklch, var(--accent) 35%, var(--foreground) 10%)";
  // 座標
  //   T = (130, 80)  木（向こう岸）
  //   A = (130, 220) 木の真下、手前岸
  //   C = (200, 220) 人（手前岸）
  //   AT = 140 (= 川幅、約 20m に対応)
  //   AC = 70  (= 歩いた距離、10m に対応、tan ≈ 2)
  return (
    <svg
      viewBox="0 0 460 320"
      className="w-full h-auto"
      style={{ maxWidth: 480 }}
      role="img"
      aria-label="川幅をタンジェントで測る図：直角三角形 ACT、角C で 60°、AC=10m、川幅 ≈ 20m"
    >
      {/* 川 */}
      <rect x="0" y="80" width="460" height="140" fill={water} opacity="0.55" />
      {/* 川岸の線 */}
      <line x1="0" y1="80" x2="460" y2="80" stroke="var(--border)" strokeWidth="1" />
      <line x1="0" y1="220" x2="460" y2="220" stroke="var(--border)" strokeWidth="1" />

      {/* 三角形 ACT */}
      <polygon
        points="130,80 200,220 130,220"
        fill={triFill}
        stroke={stroke}
        strokeWidth="1.4"
        strokeDasharray="0"
      />
      {/* 直角マーカー at A=(130,220) */}
      <polyline
        points="130,212 138,212 138,220"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />

      {/* 木（向こう岸、T） */}
      {/* 幹 */}
      <rect x="127" y="64" width="6" height="16" fill="color-mix(in oklch, var(--foreground) 35%, transparent)" />
      {/* 葉 */}
      <circle cx="130" cy="55" r="14" fill={leaf} />
      <circle cx="120" cy="62" r="10" fill={leaf} />
      <circle cx="140" cy="62" r="10" fill={leaf} />

      {/* 人（手前岸、C） */}
      {/* 頭 */}
      <circle cx="200" cy="200" r="5" fill="none" stroke={stroke} strokeWidth="1.4" />
      {/* 体 */}
      <line x1="200" y1="205" x2="200" y2="220" stroke={stroke} strokeWidth="1.4" />
      {/* 木を見上げる視線（細い破線） */}
      <line
        x1="200"
        y1="200"
        x2="135"
        y2="80"
        stroke={accent}
        strokeWidth="0.8"
        strokeDasharray="3,3"
        opacity="0.5"
      />

      {/* 角 60° の弧（C = 200,220 から、CA 方向と CT 方向の間） */}
      {/* CA = 左（-1,0）。 CT 方向は (-0.447,-0.894)。弧は半径 16 で */}
      <path
        d="M 184,220 A 16,16 0 0,0 192.8,205.7"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="170" y="212" fontSize="11" fill={accent} fontStyle="italic">
        60°
      </text>

      {/* 川幅ラベル（A-T 中点付近、川の上） */}
      <text x="122" y="150" fontSize="10" fill={muted} textAnchor="end">
        川幅
      </text>
      <text
        x="122"
        y="166"
        fontSize="14"
        fill={accent}
        textAnchor="end"
        fontWeight="600"
      >
        ? m
      </text>

      {/* AC=10m ラベル */}
      <text x="165" y="238" fontSize="11" fill={muted} textAnchor="middle">
        歩いた距離
      </text>
      <text x="165" y="252" fontSize="12" fill={stroke} textAnchor="middle">
        10 m
      </text>

      {/* 点ラベル */}
      <text x="118" y="78" fontSize="10" fill={muted} textAnchor="end">
        T
      </text>
      <text x="118" y="232" fontSize="10" fill={muted} textAnchor="end">
        A
      </text>
      <text x="210" y="232" fontSize="10" fill={muted}>
        C
      </text>

      {/* 計算式 */}
      <text
        x="230"
        y="290"
        fontSize="13"
        fill={stroke}
        textAnchor="middle"
        style={{ letterSpacing: "0.05em" }}
      >
        川幅 = 10 × tan 60° ≈ 10 × 2 = 約 20 m
      </text>
    </svg>
  );
}

/**
 * 同じ角 θ をもつ、大きさの違う 2 つの直角三角形。
 * タンジェントの本質「角だけで決まる量、大きさによらない」を視覚化する。
 * 教師ワークシートの「タンジェント」の絵（複数の同角三角形）に対応。
 *
 * 横:高さ = 1:2（slope 2）で 2サイズ描画。
 * SVG y軸は下向きなので、高さは y を小さくする方向に描く。
 */
export function TangentScale() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 460 240"
      className="w-full h-auto"
      style={{ maxWidth: 460 }}
      role="img"
      aria-label="同じ角 θ をもつ、大きさの違う 2つの直角三角形（横:高さ = 1:2）"
    >
      {/* 地面 */}
      <line
        x1="0"
        y1="200"
        x2="460"
        y2="200"
        stroke="var(--border)"
        strokeWidth="0.5"
        strokeDasharray="3,3"
      />
      {/* 小さい三角形：横40, 高さ80 */}
      <polygon
        points="40,200 80,200 80,120"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 直角マーカー（小） */}
      <polyline
        points="74,200 74,194 80,194"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* θ ラベル（小） */}
      <text
        x="48"
        y="194"
        fontSize="13"
        fill={accent}
        fontStyle="italic"
      >
        θ
      </text>
      <text x="60" y="222" fontSize="10" fill={muted} textAnchor="middle">
        1 cm
      </text>
      <text x="86" y="165" fontSize="10" fill={muted}>
        2 cm
      </text>

      {/* 大きい三角形：横100, 高さ200 */}
      <polygon
        points="220,200 320,200 320,0"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 直角マーカー（大） */}
      <polyline
        points="314,200 314,194 320,194"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* θ ラベル（大） */}
      <text
        x="228"
        y="194"
        fontSize="13"
        fill={accent}
        fontStyle="italic"
      >
        θ
      </text>
      <text x="270" y="222" fontSize="10" fill={muted} textAnchor="middle">
        1 m
      </text>
      <text x="326" y="110" fontSize="10" fill={muted}>
        2 m
      </text>

      {/* 中央のメッセージ */}
      <text
        x="150"
        y="118"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        style={{ letterSpacing: "0.1em" }}
      >
        同じ θ
      </text>
      <text
        x="150"
        y="138"
        fontSize="10"
        fill={muted}
        textAnchor="middle"
      >
        同じかたむき
      </text>
    </svg>
  );
}

/**
 * 三角比系列1 step1：現場の川幅測量とノートの相似三角形。
 * 教科書風の簡単な場面図。川幅＝直角三角形の「たて」の対応を見せる。
 * 答えの長さ・完成した比・原典の 10m/68° は書かない。
 */
export function TrigSimilarMeasure() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const water =
    "color-mix(in oklch, var(--background) 78%, var(--accent) 22%)";
  const fill =
    "color-mix(in oklch, var(--accent) 7%, transparent)";
  const leaf =
    "color-mix(in oklch, var(--accent) 35%, var(--foreground) 10%)";
  // 現場: A=目印(向こう岸) B=直角(手前岸) C=歩いた地点
  // AB が川幅（三角形のたて）、BC が歩いた辺（よこ）
  const spiralYs = [58, 78, 98, 118, 138, 158];
  return (
    <svg
      viewBox="0 0 480 280"
      className="w-full h-auto"
      style={{ maxWidth: 480 }}
      role="img"
      aria-label="川幅を測る現場の直角三角形と、同じ角のノートの小さな三角形。川幅は三角形のたてに対応する。長さの答えは書かない"
    >
      <defs>
        <marker
          id="trigSimArrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={muted} />
        </marker>
      </defs>

      {/* —— 左：現場 —— */}
      <text x="130" y="22" fontSize="12" fill={muted} textAnchor="middle">
        現場
      </text>
      <rect x="20" y="48" width="220" height="100" fill={water} opacity="0.55" />
      <line x1="20" y1="48" x2="240" y2="48" stroke="var(--border)" strokeWidth="1" />
      <line x1="20" y1="148" x2="240" y2="148" stroke="var(--border)" strokeWidth="1" />
      <text x="230" y="105" fontSize="11" fill={muted} textAnchor="end">
        川
      </text>

      <polygon
        points="90,48 90,148 200,148"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <polyline
        points="90,140 98,140 98,148"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      <path
        d="M 182,148 A 18,18 0 0,0 191,132"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="168" y="138" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>

      <rect
        x="87"
        y="30"
        width="6"
        height="18"
        fill="color-mix(in oklch, var(--foreground) 35%, transparent)"
      />
      <circle cx="90" cy="22" r="11" fill={leaf} />
      <circle cx="82" cy="28" r="8" fill={leaf} />
      <circle cx="98" cy="28" r="8" fill={leaf} />
      <text x="90" y="14" fontSize="11" fill={muted} textAnchor="middle">
        A
      </text>

      <circle cx="200" cy="132" r="4.5" fill="none" stroke={stroke} strokeWidth="1.3" />
      <line x1="200" y1="136.5" x2="200" y2="148" stroke={stroke} strokeWidth="1.3" />
      <text x="210" y="162" fontSize="11" fill={muted}>
        C
      </text>
      <text x="78" y="162" fontSize="11" fill={muted} textAnchor="end">
        B
      </text>

      <text x="78" y="100" fontSize="11" fill={accent} textAnchor="end" fontWeight="600">
        ?
      </text>
      <text x="78" y="114" fontSize="10" fill={muted} textAnchor="end">
        川幅
      </text>
      <text x="145" y="168" fontSize="10" fill={muted} textAnchor="middle">
        歩いた
      </text>

      <text x="268" y="110" fontSize="12" fill={muted} textAnchor="middle">
        相似
      </text>
      <path
        d="M 248,120 L 288,120"
        fill="none"
        stroke={muted}
        strokeWidth="1.2"
        markerEnd="url(#trigSimArrow)"
      />

      <rect
        x="300"
        y="40"
        width="160"
        height="150"
        rx="5"
        fill="color-mix(in oklch, var(--background) 92%, var(--foreground) 4%)"
        stroke="var(--border)"
        strokeWidth="1.2"
      />
      <line x1="312" y1="48" x2="312" y2="182" stroke="var(--border)" strokeWidth="1" />
      {spiralYs.map((y) => (
        <circle
          key={y}
          cx="312"
          cy={y}
          r="2.2"
          fill="none"
          stroke={muted}
          strokeWidth="0.9"
        />
      ))}
      <text x="390" y="58" fontSize="11" fill={muted} textAnchor="middle">
        ノート
      </text>

      <polygon
        points="330,160 330,95 400,160"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <polyline
        points="330,152 338,152 338,160"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      <path
        d="M 386,160 A 14,14 0 0,0 393,148"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
      />
      <text x="372" y="152" fontSize="12" fill={accent} fontStyle="italic">
        θ
      </text>
      <text x="318" y="128" fontSize="10" fill={accent} textAnchor="end">
        川の向き
      </text>
      <text x="365" y="176" fontSize="10" fill={muted} textAnchor="middle">
        歩いた向き
      </text>
      <text x="380" y="200" fontSize="10" fill={muted} textAnchor="middle">
        （ここは測れる）
      </text>

      <text x="240" y="250" fontSize="12" fill={muted} textAnchor="middle">
        三角形の「たて」↔ 川幅　「よこ」↔ 歩いた長さ
      </text>
      <text
        x="240"
        y="270"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        同じ角——同じなのは辺の長さ？ それとも比？
      </text>
    </svg>
  );
}

/**
 * 三角比系列1 質的変化：向きが標準でない直角三角形。
 * 縦に見える辺が「となり」になりうる——答えの辺の長さは書かない。
 */
export function TrigTanReorient() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill =
    "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 320 250"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="直角が左上の直角三角形。角θのとなりは縦に見える辺。向かいの辺は？"
    >
      {/* 直角が左上：頂点 (60,50) 直角、(60,200) 下、(220,50) 右 */}
      <polygon
        points="60,50 220,50 60,200"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <polyline
        points="60,58 68,58 68,50"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      {/* θ at bottom (60,200) */}
      <path
        d="M 60,180 A 20,20 0 0,1 78,192"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="78" y="205" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>
      {/* 縦辺＝となり */}
      <text x="48" y="130" fontSize="11" fill={muted} textAnchor="end">
        となり
      </text>
      <text x="48" y="145" fontSize="10" fill={muted} textAnchor="end">
        （縦に見える）
      </text>
      {/* 横辺＝向かい（答え側） */}
      <text x="140" y="42" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        向かい ？
      </text>
      <text
        x="160"
        y="235"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        どの辺が『のぼり』？ 角から読もう
      </text>
    </svg>
  );
}

/** 斜辺が未知の直角三角形（答えの長さは書かない）。 */
export function TrigHypUnknown() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 320 230"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="となりの辺が既知で斜辺が未知の直角三角形"
    >
      <polygon
        points="50,180 230,180 50,70"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <polyline
        points="50,172 58,172 58,180"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      <path
        d="M 70,180 A 20,20 0 0,0 63,163"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="78" y="175" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>
      <text x="140" y="198" fontSize="12" fill={muted} textAnchor="middle">
        となり
      </text>
      <text
        x="155"
        y="110"
        fontSize="13"
        fill={accent}
        fontWeight="600"
        textAnchor="middle"
      >
        斜辺 ？
      </text>
      <text
        x="160"
        y="220"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        角ととなりから、斜辺は読める？
      </text>
    </svg>
  );
}

/** 正三角形を半分にした 30-60-90（答えの比は書かない）。 */
export function TrigEquilateralHalf() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 340 240"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="正三角形を半分にした直角三角形。辺の比は？"
    >
      <polygon
        points="60,200 280,200 170,40"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.2"
        strokeDasharray="4,3"
      />
      <polygon
        points="170,200 280,200 170,40"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <polyline
        points="170,192 178,192 178,200"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      <text x="210" y="198" fontSize="11" fill={muted} textAnchor="middle">
        半分
      </text>
      <text x="155" y="120" fontSize="12" fill={accent} fontStyle="italic">
        60°
      </text>
      <text x="250" y="130" fontSize="12" fill={accent} fontStyle="italic">
        30°
      </text>
      <text
        x="170"
        y="228"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        正三角形を半分——辺の比は図から生える
      </text>
    </svg>
  );
}

/** 鋭角三角形に垂線を下ろした図（高さ・答えは書かない）。 */
export function TrigAcuteAltitude() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="鋭角三角形に垂線を下ろす。高さはどの辺と角で読める？"
    >
      <polygon
        points="40,190 320,190 120,50"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <line
        x1="120"
        y1="50"
        x2="120"
        y2="190"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="4,3"
      />
      <polyline
        points="120,182 128,182 128,190"
        fill="none"
        stroke={accent}
        strokeWidth="1"
      />
      <path
        d="M 60,190 A 22,22 0 0,0 52,172"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="68" y="178" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>
      <text x="128" y="120" fontSize="12" fill={accent} fontWeight="600">
        h ？
      </text>
      <text
        x="180"
        y="218"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        垂線を下ろすと、直角三角形が現れる
      </text>
    </svg>
  );
}

/** 上半の単位円（0°〜180°）。答えの座標は書かない。 */
export function TrigUnitSemi() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="上半の単位円。点Pの座標は角でどう読める？"
    >
      <line x1="30" y1="160" x2="290" y2="160" stroke={muted} strokeWidth="1" />
      <line x1="160" y1="160" x2="160" y2="20" stroke={muted} strokeWidth="1" />
      <path
        d="M 40,160 A 120,120 0 0,1 280,160"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <circle cx="100" cy="56" r="4" fill={accent} />
      <line
        x1="160"
        y1="160"
        x2="100"
        y2="56"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="88" y="50" fontSize="13" fill={accent} fontWeight="600">
        P
      </text>
      <text x="275" y="175" fontSize="11" fill={muted}>
        0°
      </text>
      <text x="155" y="18" fontSize="11" fill={muted}>
        90°
      </text>
      <text x="28" y="175" fontSize="11" fill={muted}>
        180°
      </text>
      <text
        x="160"
        y="195"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        高さ＝？ 横＝？——直角三角形が無くても読める
      </text>
    </svg>
  );
}

/** 鈍角を含む三角形（答えの辺・面積は書かない）。 */
export function TrigObtuseTriangle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="鈍角を含む三角形。挟む角と2辺から何が読める？"
    >
      <polygon
        points="40,60 300,180 80,180"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <path
        d="M 100,180 A 24,24 0 0,0 88,158"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="108" y="168" fontSize="13" fill={accent} fontStyle="italic">
        θ
      </text>
      <text x="70" y="50" fontSize="12" fill={muted}>
        鈍角？
      </text>
      <text
        x="180"
        y="210"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        直角でなくても、2辺と挟む角で面積は？
      </text>
    </svg>
  );
}

/** 3辺だけの三角形（角・面積の答えは書かない）。 */
export function TrigSssTriangle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="3辺だけが分かっている三角形。角の度数なしで面積は？"
    >
      <polygon
        points="50,180 290,180 200,50"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <text x="170" y="198" fontSize="12" fill={muted} textAnchor="middle">
        a
      </text>
      <text x="255" y="120" fontSize="12" fill={muted}>
        b
      </text>
      <text x="110" y="120" fontSize="12" fill={muted}>
        c
      </text>
      <text x="185" y="100" fontSize="13" fill={accent} fontWeight="600">
        θ ？
      </text>
      <text
        x="170"
        y="215"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        角の度数は分からなくても、面積は出せる？
      </text>
    </svg>
  );
}

/** 外接円と三角形（R の値は書かない）。 */
export function TrigCircumTriangle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="三角形とその外接円。辺と対角は円を介してどう結ばれる？"
    >
      <circle
        cx="160"
        cy="130"
        r="90"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.4"
      />
      <polygon
        points="90,180 250,170 140,60"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <circle cx="160" cy="130" r="3" fill={accent} />
      <text x="168" y="128" fontSize="12" fill={accent} fontWeight="600">
        O
      </text>
      <line
        x1="160"
        y1="130"
        x2="250"
        y2="170"
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="3,3"
      />
      <text x="210" y="140" fontSize="12" fill={accent} fontStyle="italic">
        R ？
      </text>
      <text
        x="160"
        y="230"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        向かい合う辺と角——円が要るのはなぜ？
      </text>
    </svg>
  );
}

/**
 * 図形の性質・系列1（角の二等分線と比）step1 の図。
 * DE ∥ BC の三角形。平行線が比を運ぶことを問いの形で示す（値・答えは書かない）。
 */
export function GeoParallelRatio() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 320 250"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="三角形 ABC と、BC に平行な線分 DE。AD:DB と AE:EC はどんな関係？"
    >
      <polygon
        points="160,40 60,200 260,200"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* DE（BC と平行） */}
      <line x1="115" y1="112" x2="205" y2="112" stroke={accent} strokeWidth="1.8" />
      {/* 平行マーク（DE と BC に同じ向きの矢羽） */}
      <path d="M 156 108 L 164 112 L 156 116" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 156 196 L 164 200 L 156 204" fill="none" stroke={muted} strokeWidth="1.4" />
      {/* 頂点・分点ラベル */}
      <text x="160" y="30" fontSize="13" fill={stroke} textAnchor="middle">A</text>
      <text x="48" y="212" fontSize="13" fill={stroke}>B</text>
      <text x="264" y="212" fontSize="13" fill={stroke}>C</text>
      <circle cx="115" cy="112" r="3" fill={accent} />
      <circle cx="205" cy="112" r="3" fill={accent} />
      <text x="98" y="112" fontSize="13" fill={accent}>D</text>
      <text x="212" y="112" fontSize="13" fill={accent}>E</text>
      <text
        x="160"
        y="238"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        DE ∥ BC のとき、AD:DB と AE:EC はどんな関係？
      </text>
    </svg>
  );
}

/**
 * 図形の性質・系列1 step3 の図。
 * ∠A の二等分線が BC を切る。比は書かない（問いのまま）。
 */
export function GeoAngleBisector() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 320 250"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="三角形 ABC と ∠A の二等分線 AP。BP:PC はどんな比？"
    >
      <polygon
        points="150,40 50,200 270,200"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* 二等分線 AP */}
      <line x1="150" y1="40" x2="157" y2="200" stroke={accent} strokeWidth="1.8" />
      {/* 等しい半角のマーク（同じ印＝等しい角） */}
      <path d="M 139.9 61.7 A 24 24 0 0 1 147.9 63.9" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M 154.2 63.6 A 24 24 0 0 1 162 60.8" fill="none" stroke={accent} strokeWidth="1.3" />
      <circle cx="142.2" cy="69" r="2" fill={accent} />
      <circle cx="160.3" cy="68.2" r="2" fill={accent} />
      {/* ラベル */}
      <text x="150" y="30" fontSize="13" fill={stroke} textAnchor="middle">A</text>
      <text x="38" y="212" fontSize="13" fill={stroke}>B</text>
      <text x="274" y="212" fontSize="13" fill={stroke}>C</text>
      <circle cx="157" cy="200" r="3" fill={accent} />
      <text x="153" y="216" fontSize="13" fill={accent}>P</text>
      <text
        x="160"
        y="238"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        ∠A をちょうど半分に切る線は、BC をどんな比で切る？
      </text>
    </svg>
  );
}

/**
 * 図形の性質・系列1 step7 の図。
 * ∠A の外角の二等分線が BC の延長と交わる（外分）。値・比は書かない。
 */
export function GeoAngleBisectorExt() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 380 240"
      className="w-full h-auto"
      style={{ maxWidth: 380 }}
      role="img"
      aria-label="三角形 ABC の ∠A の外角の二等分線が、BC の延長と点 Q で交わる。BQ:QC は？"
    >
      <polygon
        points="150,80 30,190 170,190"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* BA の延長（外角を作る側） */}
      <line x1="150" y1="80" x2="215" y2="21" stroke={muted} strokeWidth="1.2" strokeDasharray="4,3" />
      {/* BC の延長 */}
      <line x1="170" y1="190" x2="320" y2="190" stroke={muted} strokeWidth="1.2" strokeDasharray="4,3" />
      {/* 外角の二等分線 A→Q */}
      <line x1="150" y1="80" x2="320" y2="190" stroke={accent} strokeWidth="1.8" />
      {/* 外角の半分ずつのマーク */}
      <path d="M 166 62 A 24 24 0 0 1 174 87" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M 172 95 A 24 24 0 0 1 158 103" fill="none" stroke={accent} strokeWidth="1.3" />
      <circle cx="173" cy="74" r="2" fill={accent} />
      <circle cx="167" cy="100" r="2" fill={accent} />
      {/* ラベル */}
      <text x="146" y="70" fontSize="13" fill={stroke} textAnchor="middle">A</text>
      <text x="18" y="202" fontSize="13" fill={stroke}>B</text>
      <text x="162" y="206" fontSize="13" fill={stroke}>C</text>
      <circle cx="320" cy="190" r="3" fill={accent} />
      <text x="324" y="202" fontSize="13" fill={accent}>Q</text>
      <text
        x="190"
        y="230"
        fontSize="11"
        fill={muted}
        textAnchor="middle"
        fontStyle="italic"
      >
        外側の角を半分に切ると、分ける点 Q は辺の外へ——BQ:QC は？
      </text>
    </svg>
  );
}

/**
 * 上向きの放物線（お椀の形）を描く SVG。
 * 「公式の景色」で2次関数の最小値を視覚的に支える。
 *
 * 注意：SVG の y 軸は下向きなので、数学的な「上向き」のお椀は
 * SVG 座標では「頂点が下、左右が上」になる。式に -1 を掛けて
 * 反転している。
 */
export function ParabolaUp() {
  // SVG 座標で「上向きのお椀」になるよう、頂点を下に置く
  // y = -(x - 100)² / 80 + 125 で頂点 (100, 125) のお椀
  const points: string[] = [];
  for (let x = 20; x <= 180; x += 2) {
    const y = -((x - 100) * (x - 100)) / 80 + 125;
    points.push(`${x},${y}`);
  }
  const pathD = `M ${points.join(" L ")}`;
  return (
    <svg
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "260px", height: "auto" }}
      role="img"
      aria-label="上向きの放物線。頂点が最小値"
    >
      {/* x軸（頂点より少し下に） */}
      <line x1="15" y1="140" x2="195" y2="140" stroke="var(--muted)" strokeWidth="0.6" />
      {/* y軸 */}
      <line x1="100" y1="10" x2="100" y2="155" stroke="var(--muted)" strokeWidth="0.6" />
      {/* x = -b/2 の点線（頂点から x軸まで） */}
      <line x1="100" y1="125" x2="100" y2="140" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="3,3" />
      {/* 放物線 */}
      <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="2" />
      {/* 頂点（最小値）の点 */}
      <circle cx="100" cy="125" r="3.5" fill="var(--accent-warm)" />
      {/* 頂点ラベル（頂点の下に） */}
      <text x="106" y="129" fontSize="9" fill="var(--foreground)">
        頂点（お椀の底）
      </text>
      <text x="106" y="139" fontSize="8" fill="var(--muted)">
        ＝最小値
      </text>
      {/* 軸ラベル */}
      <text x="192" y="136" fontSize="9" fill="var(--muted)">x</text>
      <text x="103" y="14" fontSize="9" fill="var(--muted)">y</text>
      {/* x = -b/2 のラベル */}
      <text x="103" y="152" fontSize="8" fill="var(--muted)">
        x = -b/2
      </text>
    </svg>
  );
}

/**
 * 点と直線の距離を示す SVG。
 * 直線 ℓ、点 A、A から ℓ に下ろした垂線の足 H、距離 d を描く。
 */
export function PointLineDistance() {
  // 座標系：viewBox 240x180、原点を (40, 145) に
  // x 軸方向 18px = 1 単位、y 軸方向 18px = 1 単位
  const ox = 40;
  const oy = 145;
  const u = 18;
  const m = (mx: number, my: number) => [ox + mx * u, oy - my * u] as const;

  // 直線：y = -x/2 + 5（傾き -1/2、y切片 5）
  // 端点：x = 0 → y = 5、x = 10 → y = 0
  const [lineX0, lineY0] = m(0, 5);
  const [lineX1, lineY1] = m(10, 0);

  // 点 A = (4, 7)
  const [ax, ay] = m(4, 7);

  // 垂線の足 H = (2.4, 3.8)
  const [hx, hy] = m(2.4, 3.8);

  return (
    <svg
      viewBox="0 0 240 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "300px", height: "auto" }}
      role="img"
      aria-label="座標平面上の点 A と直線 ℓ。A から ℓ に下ろした垂線の足が H、AH の長さが距離 d"
    >
      {/* 座標軸 */}
      <line x1="20" y1={oy} x2="225" y2={oy} stroke="var(--muted)" strokeWidth="0.6" />
      <line x1={ox} y1="15" x2={ox} y2="170" stroke="var(--muted)" strokeWidth="0.6" />
      <text x="227" y={oy + 4} fontSize="9" fill="var(--muted)">x</text>
      <text x={ox - 9} y="14" fontSize="9" fill="var(--muted)">y</text>
      <text x={ox - 9} y={oy + 11} fontSize="8" fill="var(--muted)">O</text>

      {/* 直線 ℓ */}
      <line x1={lineX0} y1={lineY0} x2={lineX1} y2={lineY1} stroke="var(--accent)" strokeWidth="1.8" />
      <text x={lineX1 + 4} y={lineY1 - 2} fontSize="11" fill="var(--accent)">ℓ</text>

      {/* 垂線（A から H への点線） */}
      <line x1={ax} y1={ay} x2={hx} y2={hy} stroke="var(--accent-warm)" strokeWidth="1.4" strokeDasharray="3,3" />

      {/* 垂線の足 H に「直角マーク」 */}
      {(() => {
        // 直線の方向ベクトル: (10, 0) - (0, 5) = (10, -5)、つまり (2, -1) 方向
        // 垂線の方向: (1, 2) 方向
        const s = 6;
        const dx1 = 2 / Math.sqrt(5) * s; // 直線方向
        const dy1 = -1 / Math.sqrt(5) * s;
        const dx2 = 1 / Math.sqrt(5) * s; // 垂線方向（H から A へ）
        const dy2 = 2 / Math.sqrt(5) * s;
        return (
          <path
            d={`M ${hx + dx1} ${hy + dy1} L ${hx + dx1 + dx2} ${hy + dy1 + dy2} L ${hx + dx2} ${hy + dy2}`}
            fill="none" stroke="var(--accent-warm)" strokeWidth="1"
          />
        );
      })()}

      {/* 点 A */}
      <circle cx={ax} cy={ay} r="3.5" fill="var(--accent-warm)" />
      <text x={ax + 6} y={ay - 5} fontSize="11" fill="var(--foreground)">A(x₀, y₀)</text>

      {/* 点 H */}
      <circle cx={hx} cy={hy} r="3" fill="var(--accent)" />
      <text x={hx - 14} y={hy + 14} fontSize="10" fill="var(--foreground)">H</text>

      {/* 距離 d のラベル（A と H の中点付近に） */}
      <text x={(ax + hx) / 2 + 6} y={(ay + hy) / 2} fontSize="11" fill="var(--accent-warm)" fontStyle="italic">d</text>
    </svg>
  );
}

/**
 * 直線の式に代入したときの「ずれ」を可視化する SVG。
 * 直線 ℓ と、その近くの 3 点（直線上・少しずれた点・大きくずれた点）を示し、
 * 「式に代入した値の大きさ ＝ 直線からの離れ具合」が見える形に。
 */
export function PointLineDeviation() {
  const ox = 40;
  const oy = 145;
  const u = 18;
  const m = (mx: number, my: number) => [ox + mx * u, oy - my * u] as const;

  // 直線：y = -x/2 + 5
  const [lineX0, lineY0] = m(0, 5);
  const [lineX1, lineY1] = m(10, 0);

  // 3 つの点
  // P1: 直線上の点（x=2, y=4） → ax+by+c = 2 + 2·4 - 10 = 0
  const [p1x, p1y] = m(2, 4);
  // P2: 少し上にずれた点（x=4, y=6） → 4 + 2·6 - 10 = 6（ずれ +6）
  const [p2x, p2y] = m(4, 6);
  // P3: 下にずれた点（x=2, y=2） → 2 + 2·2 - 10 = -4（ずれ -4）
  const [p3x, p3y] = m(2, 2);

  return (
    <svg
      viewBox="0 0 240 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "300px", height: "auto" }}
      role="img"
      aria-label="直線とその近くの3点。式に代入した値の絶対値が、点の直線からの離れ具合を表す"
    >
      {/* 座標軸 */}
      <line x1="20" y1={oy} x2="225" y2={oy} stroke="var(--muted)" strokeWidth="0.6" />
      <line x1={ox} y1="15" x2={ox} y2="170" stroke="var(--muted)" strokeWidth="0.6" />
      <text x="227" y={oy + 4} fontSize="9" fill="var(--muted)">x</text>
      <text x={ox - 9} y="14" fontSize="9" fill="var(--muted)">y</text>

      {/* 直線 ℓ */}
      <line x1={lineX0} y1={lineY0} x2={lineX1} y2={lineY1} stroke="var(--accent)" strokeWidth="1.8" />
      <text x={lineX1 + 4} y={lineY1 - 2} fontSize="10" fill="var(--accent)">
        ℓ: x + 2y − 10 = 0
      </text>

      {/* P1: 直線上の点 */}
      <circle cx={p1x} cy={p1y} r="3.5" fill="var(--success)" />
      <text x={p1x + 6} y={p1y + 4} fontSize="9" fill="var(--success)">
        P₁ → 0
      </text>

      {/* P2: 直線より上の点（正のずれ） */}
      <circle cx={p2x} cy={p2y} r="3.5" fill="var(--accent-warm)" />
      <text x={p2x + 6} y={p2y - 2} fontSize="9" fill="var(--accent-warm)">
        P₂ → +6
      </text>

      {/* P3: 直線より下の点（負のずれ） */}
      <circle cx={p3x} cy={p3y} r="3.5" fill="var(--warning)" />
      <text x={p3x + 6} y={p3y + 10} fontSize="9" fill="var(--warning)">
        P₃ → −4
      </text>

      {/* 凡例 */}
      <text x={140} y={163} fontSize="8" fill="var(--muted)">
        式に代入した値 → ずれの大きさ
      </text>
    </svg>
  );
}

/**
 * 直方体（1 cm³ ブロックの集まり）を等角投影で描く SVG。
 * 「公式の景色」で体積の意味を視覚的に支える。
 *
 * 横 3 × 奥行 2 × 高さ 2 の直方体 = 12 個の 1 cm³ ブロック。
 */
export function CuboidIsometric() {
  // 等角投影のパラメータ
  const unit = 22; // 1 cm（1ブロックの辺）= 22 px
  const dx = 11;   // 奥行方向の x オフセット
  // SVG の y 軸は下向き。「奥に行くと上に上がる」よう、dy は負（上方向）に
  const dy = -8;
  const w = 3;     // 横（cm）
  const d = 2;     // 奥行（cm）
  const h = 2;     // 高さ（cm）

  // 前面・左下を原点に（奥が上に伸びる分、画面下寄りに）
  const ox = 35;
  const oy = 142;

  // 3D の (x, y, z) を 2D の (sx, sy) に投影
  function p(x: number, y: number, z: number) {
    return [ox + x * unit + y * dx, oy - z * unit + y * dy] as const;
  }

  // 各頂点
  const [fbl, fblY] = p(0, 0, 0);
  const [fbr, fbrY] = p(w, 0, 0);
  const [ftl, ftlY] = p(0, 0, h);
  const [ftr, ftrY] = p(w, 0, h);
  const [bbr, bbrY] = p(w, d, 0);
  const [btl, btlY] = p(0, d, h);
  const [btr, btrY] = p(w, d, h);

  return (
    <svg
      viewBox="0 0 220 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "280px", height: "auto" }}
      role="img"
      aria-label="1 cm³ のブロックが12個積み重なった直方体（横3・奥行2・高さ2）"
    >
      {/* 上面（平行四辺形） */}
      <path
        d={`M ${ftl} ${ftlY} L ${ftr} ${ftrY} L ${btr} ${btrY} L ${btl} ${btlY} Z`}
        fill="color-mix(in oklch, var(--surface) 70%, var(--accent-soft) 30%)"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      {/* 右面（平行四辺形） */}
      <path
        d={`M ${fbr} ${fbrY} L ${ftr} ${ftrY} L ${btr} ${btrY} L ${bbr} ${bbrY} Z`}
        fill="color-mix(in oklch, var(--surface) 80%, var(--accent-soft) 20%)"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      {/* 前面（長方形） */}
      <path
        d={`M ${fbl} ${fblY} L ${fbr} ${fbrY} L ${ftr} ${ftrY} L ${ftl} ${ftlY} Z`}
        fill="color-mix(in oklch, var(--surface) 90%, var(--accent-warm) 10%)"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />

      {/* 前面の格子線 */}
      {Array.from({ length: w - 1 }).map((_, i) => {
        const x = i + 1;
        const [x1, y1] = p(x, 0, 0);
        const [x2, y2] = p(x, 0, h);
        return (
          <line
            key={`fv${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent)" strokeWidth="0.6" opacity="0.7"
          />
        );
      })}
      {Array.from({ length: h - 1 }).map((_, i) => {
        const z = i + 1;
        const [x1, y1] = p(0, 0, z);
        const [x2, y2] = p(w, 0, z);
        return (
          <line
            key={`fh${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent)" strokeWidth="0.6" opacity="0.7"
          />
        );
      })}

      {/* 上面の格子線（横方向） */}
      {Array.from({ length: w - 1 }).map((_, i) => {
        const x = i + 1;
        const [x1, y1] = p(x, 0, h);
        const [x2, y2] = p(x, d, h);
        return (
          <line
            key={`tw${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent)" strokeWidth="0.6" opacity="0.7"
          />
        );
      })}
      {/* 上面の格子線（奥行方向） */}
      {Array.from({ length: d - 1 }).map((_, i) => {
        const y = i + 1;
        const [x1, y1] = p(0, y, h);
        const [x2, y2] = p(w, y, h);
        return (
          <line
            key={`td${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent)" strokeWidth="0.6" opacity="0.7"
          />
        );
      })}

      {/* 右面の格子線（高さ方向） */}
      {Array.from({ length: h - 1 }).map((_, i) => {
        const z = i + 1;
        const [x1, y1] = p(w, 0, z);
        const [x2, y2] = p(w, d, z);
        return (
          <line
            key={`rh${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent)" strokeWidth="0.6" opacity="0.7"
          />
        );
      })}
      {/* 右面の格子線（奥行方向） */}
      {Array.from({ length: d - 1 }).map((_, i) => {
        const y = i + 1;
        const [x1, y1] = p(w, y, 0);
        const [x2, y2] = p(w, y, h);
        return (
          <line
            key={`rd${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--accent)" strokeWidth="0.6" opacity="0.7"
          />
        );
      })}

      {/* 辺の長さラベル */}
      {/* 横（前面下辺） */}
      <text
        x={(fbl + fbr) / 2 - 14}
        y={fblY + 13}
        fontSize="10" fill="var(--muted)"
      >
        横 3 cm
      </text>
      {/* 高さ（前面左辺） */}
      <text
        x={fbl - 30}
        y={(fblY + ftlY) / 2 + 3}
        fontSize="10" fill="var(--muted)"
      >
        高さ 2
      </text>
      {/* 奥行（左奥に伸びる辺） */}
      <text
        x={btl - 24}
        y={btlY - 2}
        fontSize="10" fill="var(--muted)"
      >
        縦 2
      </text>
    </svg>
  );
}

/**
 * markdown 風の表（| col | col | / |---|---| / | val | val |）を判定する。
 * 2 行以上で全行が | で始まり | で終わり、2 行目が区切り行（---のみ）。
 */
function isMarkdownTable(lines: string[]): boolean {
  if (lines.length < 2) return false;
  const allPipeBounded = lines.every((line) => {
    const t = line.trim();
    return t.startsWith("|") && t.endsWith("|");
  });
  if (!allPipeBounded) return false;
  const sep = lines[1].trim();
  return /^\|[\s|:\-]+\|$/.test(sep) && sep.includes("-");
}

function parseTableRow(line: string): string[] {
  // 先頭末尾の | を取り除き、| で分割（セル内の $...$ 中の | は稀なので無視）
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((c) => c.trim());
}

function MarkdownTable({ lines }: { lines: string[] }) {
  const headerCells = parseTableRow(lines[0]);
  const bodyRows = lines.slice(2).map(parseTableRow);
  return (
    <div className="my-4 overflow-x-auto">
      <table
        className="w-full"
        style={{ borderCollapse: "collapse", fontSize: "13px" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {headerCells.map((c, i) => (
              <th
                key={i}
                className="text-foreground"
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
              >
                <MathText text={c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid color-mix(in oklch, var(--border) 50%, transparent)",
              }}
            >
              {row.map((c, j) => (
                <td
                  key={j}
                  className="text-foreground/85"
                  style={{ padding: "7px 10px", verticalAlign: "top" }}
                >
                  <MathText text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * 三角比の表（0°〜90°、sin・cos・tan、小数第 4 位までの概数）。
 * 教科書の三角比表に対応。特別な角（0, 30, 45, 60, 90°）は背景を変えて目立たせる。
 * スティッキーヘッダ付きスクロールテーブル。
 */
export function TrigTable() {
  const rows = Array.from({ length: 91 }, (_, deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      deg,
      sin: Math.sin(rad),
      cos: Math.cos(rad),
      tan: deg === 90 ? null : Math.tan(rad),
    };
  });
  const special = new Set([0, 30, 45, 60, 90]);
  const accentTint =
    "color-mix(in oklch, var(--background) 84%, var(--accent) 16%)";
  return (
    <div
      className="w-full overflow-y-auto rounded-lg border border-border"
      style={{
        maxWidth: "min(420px, 100%)",
        maxHeight: "420px",
        background: "var(--background)",
      }}
    >
      <table
        className="w-full tnum"
        style={{ fontSize: "12px", borderCollapse: "collapse" }}
      >
        <thead
          className="sticky top-0"
          style={{
            background: "var(--background)",
            borderBottom: "1px solid var(--border)",
            zIndex: 1,
          }}
        >
          <tr>
            <th
              className="text-muted"
              style={{
                padding: "8px 12px",
                textAlign: "left",
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
            >
              角
            </th>
            <th
              className="text-muted"
              style={{
                padding: "8px 12px",
                textAlign: "right",
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
            >
              sin
            </th>
            <th
              className="text-muted"
              style={{
                padding: "8px 12px",
                textAlign: "right",
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
            >
              cos
            </th>
            <th
              className="text-muted"
              style={{
                padding: "8px 12px",
                textAlign: "right",
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
            >
              tan
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isSpecial = special.has(r.deg);
            return (
              <tr
                key={r.deg}
                style={{
                  background: isSpecial ? accentTint : undefined,
                }}
              >
                <td
                  className="text-foreground"
                  style={{
                    padding: "4px 12px",
                    fontWeight: isSpecial ? 600 : 400,
                  }}
                >
                  {r.deg}°
                </td>
                <td
                  className="text-foreground/85"
                  style={{ padding: "4px 12px", textAlign: "right" }}
                >
                  {r.sin.toFixed(4)}
                </td>
                <td
                  className="text-foreground/85"
                  style={{ padding: "4px 12px", textAlign: "right" }}
                >
                  {r.cos.toFixed(4)}
                </td>
                <td
                  className="text-foreground/85"
                  style={{ padding: "4px 12px", textAlign: "right" }}
                >
                  {r.tan === null ? "—" : r.tan.toFixed(4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** 小5「合同な図形」Step 1：対応する点・辺を読む入口図。 */
export function CongruenceStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 500 250"
      className="w-full h-auto"
      style={{ maxWidth: 520 }}
      role="img"
      aria-label="合同な三角形 ABC と DEF。対応する点と辺をたどる図"
    >
      <polygon
        points="70,185 165,185 112,70"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <polygon
        points="330,185 425,185 372,70"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.8"
      />

      <text x="62" y="205" fontSize="14" fill={stroke} fontWeight="600">
        A
      </text>
      <text x="168" y="205" fontSize="14" fill={stroke} fontWeight="600">
        B
      </text>
      <text x="106" y="60" fontSize="14" fill={stroke} fontWeight="600">
        C
      </text>
      <text x="322" y="205" fontSize="14" fill={stroke} fontWeight="600">
        D
      </text>
      <text x="428" y="205" fontSize="14" fill={stroke} fontWeight="600">
        E
      </text>
      <text x="366" y="60" fontSize="14" fill={stroke} fontWeight="600">
        F
      </text>

      <path d="M 92 190 L 92 180" stroke={accent} strokeWidth="2" />
      <path d="M 113 190 L 113 180" stroke={accent} strokeWidth="2" />
      <path d="M 352 190 L 352 180" stroke={accent} strokeWidth="2" />
      <path d="M 373 190 L 373 180" stroke={accent} strokeWidth="2" />

      <path d="M 52 215 C 145 240, 335 240, 448 215" fill="none" stroke={muted} strokeWidth="1" strokeDasharray="4,4" />
      <text x="250" y="236" fontSize="12" fill={muted} textAnchor="middle">
        ぴったり重ねると、対応する辺どうしが重なる
      </text>
    </svg>
  );
}

/** 小5「合同な図形」Step 7：読むことから作ることへの質的変化図。 */
export function CongruenceStep7() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 520 260"
      className="w-full h-auto"
      style={{ maxWidth: 540 }}
      role="img"
      aria-label="三角形 ABC と、それに合同に作る三角形 DEF。対応する3つの辺をそろえる図"
    >
      <polygon
        points="80,200 175,200 124,72"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <polygon
        points="345,200 440,200 389,72"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeDasharray="5,4"
      />

      <text x="72" y="220" fontSize="14" fill={stroke} fontWeight="600">
        A
      </text>
      <text x="178" y="220" fontSize="14" fill={stroke} fontWeight="600">
        B
      </text>
      <text x="118" y="62" fontSize="14" fill={stroke} fontWeight="600">
        C
      </text>
      <text x="337" y="220" fontSize="14" fill={stroke} fontWeight="600">
        D
      </text>
      <text x="443" y="220" fontSize="14" fill={stroke} fontWeight="600">
        E
      </text>
      <text x="383" y="62" fontSize="14" fill={stroke} fontWeight="600">
        F
      </text>

      <text x="128" y="215" fontSize="12" fill={accent} textAnchor="middle">
        5cm
      </text>
      <text x="145" y="132" fontSize="12" fill={accent}>
        6cm
      </text>
      <text x="90" y="132" fontSize="12" fill={accent}>
        7cm
      </text>

      <text x="392" y="215" fontSize="12" fill={accent} textAnchor="middle">
        5cm
      </text>
      <text x="411" y="132" fontSize="12" fill={accent}>
        6cm
      </text>
      <text x="346" y="132" fontSize="12" fill={muted}>
        ?
      </text>

      <path d="M 205 136 L 310 136" stroke={muted} strokeWidth="1.4" strokeDasharray="4,4" />
      <path d="M 298 130 L 310 136 L 298 142" fill="none" stroke={muted} strokeWidth="1.4" />
      <text x="260" y="122" fontSize="12" fill={muted} textAnchor="middle">
        合同に作る
      </text>
    </svg>
  );
}

/** 小5「小数のわり算」Step 1：1mあたりを読む二段数直線。 */
export function DecimalDivisionStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 7%, transparent)";
  return (
    <svg
      viewBox="0 0 560 260"
      className="w-full h-auto"
      style={{ maxWidth: 560 }}
      role="img"
      aria-label="2.5メートルで300円のリボンから1メートルのねだんを読む二段数直線"
    >
      <rect x="58" y="44" width="444" height="170" rx="12" fill={fillColor} stroke="none" />
      <text x="86" y="36" fontSize="14" fill={stroke} fontWeight="600">
        1mのねだんを □ 円とする
      </text>
      <line x1="92" y1="98" x2="474" y2="98" stroke={stroke} strokeWidth="2.2" />
      <line x1="92" y1="138" x2="474" y2="138" stroke={stroke} strokeWidth="2.2" />

      {[92, 245, 474].map((x) => (
        <g key={x}>
          <line x1={x} y1="88" x2={x} y2="148" stroke={stroke} strokeWidth="1.5" />
        </g>
      ))}

      <text x="92" y="82" fontSize="13" fill={muted} textAnchor="middle">
        0
      </text>
      <text x="245" y="82" fontSize="17" fill={accent} textAnchor="middle" fontWeight="700">
        □
      </text>
      <text x="474" y="82" fontSize="15" fill={stroke} textAnchor="middle" fontWeight="600">
        300
      </text>
      <text x="506" y="103" fontSize="13" fill={muted}>
        円
      </text>
      <text x="92" y="168" fontSize="13" fill={muted} textAnchor="middle">
        0
      </text>
      <text x="245" y="168" fontSize="15" fill={stroke} textAnchor="middle" fontWeight="600">
        1
      </text>
      <text x="474" y="168" fontSize="15" fill={stroke} textAnchor="middle" fontWeight="600">
        2.5
      </text>
      <text x="506" y="142" fontSize="13" fill={muted}>
        m
      </text>

      <path d="M 245 58 C 310 36 414 42 474 72" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M 462 68 L 474 72 L 465 80" fill="none" stroke={accent} strokeWidth="1.8" />
      <text x="360" y="45" fontSize="13" fill={accent} textAnchor="middle">
        ×2.5
      </text>
      <path d="M 245 188 C 310 212 414 207 474 178" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M 466 170 L 474 178 L 462 181" fill="none" stroke={accent} strokeWidth="1.8" />
      <text x="360" y="224" fontSize="13" fill={accent} textAnchor="middle">
        ×2.5
      </text>

      <text x="280" y="244" fontSize="13" fill={muted} textAnchor="middle">
        1mのところと2.5mのところを、上下でそろえて読む
      </text>
    </svg>
  );
}

/** 小5「小数のわり算」Step 5：1より長い長さから1mあたりを読む図。 */
export function DecimalDivisionStep5() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 560 230"
      className="w-full h-auto"
      style={{ maxWidth: 540 }}
      role="img"
      aria-label="1.2メートルで240円のリボンについて1メートルのねだんを考える二段数直線"
    >
      <rect x="56" y="46" width="442" height="128" rx="12" fill={fillColor} stroke="none" />
      <line x1="92" y1="92" x2="472" y2="92" stroke={stroke} strokeWidth="2.2" />
      <line x1="92" y1="132" x2="472" y2="132" stroke={stroke} strokeWidth="2.2" />
      {[92, 396, 472].map((x) => (
        <line key={x} x1={x} y1="82" x2={x} y2="142" stroke={stroke} strokeWidth="1.5" />
      ))}
      <text x="92" y="76" fontSize="13" fill={muted} textAnchor="middle">
        0
      </text>
      <text x="396" y="76" fontSize="15" fill={stroke} textAnchor="middle" fontWeight="600">
        □
      </text>
      <text x="472" y="76" fontSize="17" fill={accent} textAnchor="middle" fontWeight="700">
        240
      </text>
      <text x="506" y="96" fontSize="13" fill={muted}>
        円
      </text>
      <text x="92" y="160" fontSize="13" fill={muted} textAnchor="middle">
        0
      </text>
      <text x="396" y="160" fontSize="15" fill={stroke} textAnchor="middle" fontWeight="600">
        1
      </text>
      <text x="472" y="160" fontSize="15" fill={stroke} textAnchor="middle" fontWeight="600">
        1.2
      </text>
      <text x="506" y="136" fontSize="13" fill={muted}>
        m
      </text>
      <path d="M 472 180 L 396 180" stroke={accent} strokeWidth="1.8" />
      <path d="M 404 172 L 396 180 L 404 188" fill="none" stroke={accent} strokeWidth="1.8" />
      <text x="434" y="204" fontSize="13" fill={accent} textAnchor="middle">
        1mのところは、1.2mの左側
      </text>
    </svg>
  );
}

/** 小5「純小数でわる」Step 7：小さい基準で何倍かを読む数直線。 */
export function DecimalDivisionPureStep7() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const xFor = (v: number) => 70 + v * 190;
  return (
    <svg
      viewBox="0 0 520 210"
      className="w-full h-auto"
      style={{ maxWidth: 540 }}
      role="img"
      aria-label="2が0.4の何倍かを小さい基準で考える数直線"
    >
      <rect x="46" y="46" width="430" height="104" rx="12" fill={fillColor} stroke="none" />
      <line x1={xFor(0)} y1="94" x2={xFor(2)} y2="94" stroke={stroke} strokeWidth="2.2" />
      {[0, 0.4, 1, 2].map((v) => (
        <g key={v}>
          <line x1={xFor(v)} y1="82" x2={xFor(v)} y2="108" stroke={v === 0.4 ? accent : stroke} strokeWidth="1.6" />
          <text x={xFor(v)} y="132" fontSize="13" fill={v === 0.4 ? accent : stroke} textAnchor="middle" fontWeight={v === 0.4 ? "700" : "400"}>
            {v}
          </text>
        </g>
      ))}
      <path d={`M ${xFor(0.4)} 66 C ${xFor(0.8)} 38 ${xFor(1.6)} 38 ${xFor(2)} 66`} fill="none" stroke={accent} strokeWidth="1.7" strokeDasharray="5,4" />
      <text x="260" y="180" fontSize="13" fill={muted} textAnchor="middle">
        0.4を1つ分と見ると、2は何こ分？
      </text>
    </svg>
  );
}

/** 小5「純小数でわる」Step 1：0.5mのまとまりを数える数直線。 */
export function DecimalDivisionPureStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const ticks = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  const xFor = (v: number) => 74 + v * 126;
  return (
    <svg viewBox="0 0 520 210" className="w-full h-auto" style={{ maxWidth: 540 }} role="img" aria-label="3メートルの中に0.5メートルが何こ入るかを考える数直線">
      <rect x="48" y="46" width="426" height="100" rx="12" fill={fillColor} stroke="none" />
      <line x1="74" y1="92" x2="452" y2="92" stroke={stroke} strokeWidth="2.2" />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={xFor(v)} y1="82" x2={xFor(v)} y2="102" stroke={stroke} strokeWidth={Number.isInteger(v) ? 1.8 : 1.2} />
          <text x={xFor(v)} y="128" fontSize="12" fill={Number.isInteger(v) ? stroke : muted} textAnchor="middle">
            {v}
          </text>
        </g>
      ))}
      {[0, 0.5, 1, 1.5, 2, 2.5].map((v) => (
        <g key={v}>
          <path d={`M ${xFor(v) + 6} 70 C ${xFor(v) + 34} 50 ${xFor(v + 0.5) - 34} 50 ${xFor(v + 0.5) - 6} 70`} fill="none" stroke={accent} strokeWidth="1.5" />
        </g>
      ))}
      <text x="263" y="176" fontSize="13" fill={muted} textAnchor="middle">
        0.5mのまとまりが、3mの中に何こ入る？
      </text>
    </svg>
  );
}

/** 小5「商を概数で表す」Step 1：1.66...を1.7へ丸める数直線。 */
export function DecimalDivisionRoundingStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg viewBox="0 0 520 200" className="w-full h-auto" style={{ maxWidth: 540 }} role="img" aria-label="5割る3の商を小数第一位までの概数にするときに近い目もりを考える数直線">
      <rect x="52" y="50" width="416" height="90" rx="12" fill={fillColor} stroke="none" />
      <line x1="92" y1="96" x2="430" y2="96" stroke={stroke} strokeWidth="2.2" />
      {[1.5, 1.6, 1.7, 1.8].map((v, i) => {
        const x = 92 + i * 112;
        return (
          <g key={v}>
            <line x1={x} y1="84" x2={x} y2="108" stroke={stroke} strokeWidth="1.6" />
            <text x={x} y="130" fontSize="13" fill={stroke} textAnchor="middle">
              {v}
            </text>
          </g>
        );
      })}
      <text x="260" y="184" fontSize="13" fill={muted} textAnchor="middle">
        商はどのあたりにくる？
      </text>
    </svg>
  );
}

/** 小5「余り」Step 1：5.7mから2mを2本取った残りを読む数直線。 */
export function DecimalDivisionRemainderStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const xFor = (v: number) => 70 + v * 66;
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto" style={{ maxWidth: 540 }} role="img" aria-label="5.7メートルから2メートルを2本取った余りを読む数直線">
      <rect x="46" y="48" width="430" height="112" rx="12" fill={fillColor} stroke="none" />
      <line x1={xFor(0)} y1="98" x2={xFor(6)} y2="98" stroke={stroke} strokeWidth="2.2" />
      {[0, 2, 4, 5.7].map((v) => (
        <g key={v}>
          <line x1={xFor(v)} y1="84" x2={xFor(v)} y2="112" stroke={v === 5.7 ? accent : stroke} strokeWidth="1.7" />
          <text x={xFor(v)} y="136" fontSize="13" fill={v === 5.7 ? accent : stroke} textAnchor="middle" fontWeight={v === 5.7 ? "700" : "400"}>
            {v}
          </text>
        </g>
      ))}
      <path d={`M ${xFor(0) + 8} 70 C ${xFor(1)} 44 ${xFor(1)} 44 ${xFor(2) - 8} 70`} fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d={`M ${xFor(2) + 8} 70 C ${xFor(3)} 44 ${xFor(3)} 44 ${xFor(4) - 8} 70`} fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d={`M ${xFor(4) + 6} 122 C ${xFor(4.85)} 152 ${xFor(4.85)} 152 ${xFor(5.7) - 6} 122`} fill="none" stroke={accent} strokeWidth="1.8" />
      <text x={(xFor(4) + xFor(5.7)) / 2} y="174" fontSize="13" fill={accent} textAnchor="middle" fontWeight="700">
        余り ?
      </text>
      <text x="260" y="202" fontSize="13" fill={muted} textAnchor="middle">
        余りは、もとの数直線に残った長さで読む
      </text>
    </svg>
  );
}

/** 小5「小数の除法の考え方と筆算形式」Step 1：小数点を同じだけ動かす筆算。 */
export function DecimalDivisionAlgorithmStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 7%, transparent)";
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <svg
      viewBox="0 0 560 250"
      className="w-full h-auto"
      style={{ maxWidth: 560 }}
      role="img"
      aria-label="7.56割る6.3の筆算で、わる数とわられる数の小数点を同じだけ動かす図"
    >
      <text x="105" y="42" fontSize="13" fill={muted} textAnchor="middle">
        もとの筆算
      </text>
      <path d="M 98 85 L 178 85" fill="none" stroke={stroke} strokeWidth="2.2" />
      <text x="84" y="126" fontSize="48" fill={stroke} fontFamily={mono}>
        )
      </text>
      <text x="58" y="124" fontSize="24" fill={stroke} textAnchor="middle" fontFamily={mono}>
        6.3
      </text>
      <text x="122" y="124" fontSize="26" fill={stroke} fontWeight="600" fontFamily={mono}>
        7.56
      </text>
      <circle cx="150" cy="128" r="2.8" fill={accent} />
      <circle cx="65" cy="128" r="2.8" fill={accent} />

      <path d="M 216 112 L 316 112" stroke={muted} strokeWidth="1.6" strokeDasharray="5,4" />
      <path d="M 303 105 L 316 112 L 303 119" fill="none" stroke={muted} strokeWidth="1.6" />
      <text x="266" y="95" fontSize="12" fill={muted} textAnchor="middle">
        同じだけ右へ
      </text>

      <text x="420" y="42" fontSize="13" fill={muted} textAnchor="middle">
        わる数を整数にした筆算
      </text>
      <rect x="332" y="72" width="170" height="90" rx="8" fill={fillColor} stroke="none" />
      <path d="M 412 85 L 486 85" fill="none" stroke={stroke} strokeWidth="2.2" />
      <text x="398" y="126" fontSize="48" fill={stroke} fontFamily={mono}>
        )
      </text>
      <text x="370" y="124" fontSize="24" fill={stroke} textAnchor="middle" fontFamily={mono}>
        63
      </text>
      <text x="434" y="124" fontSize="26" fill={accent} fontWeight="700" fontFamily={mono}>
        N
      </text>
      <text x="420" y="185" fontSize="13" fill={muted} textAnchor="middle">
        わられる数も同じだけ動く
      </text>
      <text x="280" y="226" fontSize="12" fill={muted} textAnchor="middle">
        筆算の小数点移動は、数直線の上下を同じ倍率で見直すこと
      </text>
    </svg>
  );
}

/** 小5「小数の除法の考え方と筆算形式」Step 7：直した筆算で商を読む図。 */
export function DecimalDivisionAlgorithmStep7() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 7%, transparent)";
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <svg
      viewBox="0 0 560 260"
      className="w-full h-auto"
      style={{ maxWidth: 560 }}
      role="img"
      aria-label="小数のわり算を筆算で見直し、商を上に立てる場所を考える図"
    >
      <text x="112" y="46" fontSize="13" fill={muted} textAnchor="middle">
        小数の筆算
      </text>
      <path d="M 102 96 L 190 96" fill="none" stroke={stroke} strokeWidth="2.2" />
      <text x="88" y="137" fontSize="48" fill={stroke} fontFamily={mono}>
        )
      </text>
      <text x="60" y="135" fontSize="24" fill={stroke} textAnchor="middle" fontFamily={mono}>
        6.3
      </text>
      <text x="126" y="135" fontSize="26" fill={stroke} fontWeight="600" fontFamily={mono}>
        7.56
      </text>

      <path d="M 224 122 L 316 122" stroke={muted} strokeWidth="1.6" strokeDasharray="5,4" />
      <path d="M 303 115 L 316 122 L 303 129" fill="none" stroke={muted} strokeWidth="1.6" />
      <text x="270" y="105" fontSize="12" fill={muted} textAnchor="middle">
        10倍して直す
      </text>

      <rect x="330" y="60" width="180" height="140" rx="8" fill={fillColor} stroke="none" />
      <text x="448" y="86" fontSize="26" fill={accent} fontWeight="700" textAnchor="middle" fontFamily={mono}>
        ?
      </text>
      <path d="M 412 104 L 492 104" fill="none" stroke={stroke} strokeWidth="2.2" />
      <text x="398" y="145" fontSize="48" fill={stroke} fontFamily={mono}>
        )
      </text>
      <text x="370" y="143" fontSize="24" fill={stroke} textAnchor="middle" fontFamily={mono}>
        63
      </text>
      <text x="434" y="143" fontSize="26" fill={stroke} fontWeight="600" fontFamily={mono}>
        N
      </text>
      <path d="M 402 160 L 476 160" stroke={muted} strokeWidth="1.3" />
      <text x="438" y="181" fontSize="18" fill={muted} textAnchor="middle">
        ?
      </text>
      <text x="280" y="235" fontSize="12" fill={muted} textAnchor="middle">
        直した筆算で、商を上に立てる
      </text>
    </svg>
  );
}

/**
 * 数と式 系列1 Step 1：数の入れ子（自然数 ⊂ 整数 ⊂ 有理数）。
 * 外に出る矢印には「引き算」「割り算」だけを書き、
 * その先に何があるか（負の数・分数・無理数の名前）は書かない＝問いで終える。
 */
export function NumberExpansionStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="自然数が整数に、整数が有理数に含まれる入れ子の図。外へ出る矢印に引き算・割り算のラベル"
    >
      <rect x="20" y="24" width="250" height="180" rx="14" fill={fillColor} stroke={muted} strokeWidth="1" />
      <rect x="46" y="52" width="198" height="126" rx="12" fill="none" stroke={muted} strokeWidth="1" />
      <rect x="72" y="80" width="146" height="72" rx="10" fill="none" stroke={stroke} strokeWidth="1.4" />

      <text x="145" y="120" fontSize="13" fill={stroke} textAnchor="middle">
        自然数
      </text>
      <text x="145" y="140" fontSize="11" fill={muted} textAnchor="middle">
        1, 2, 3, …
      </text>
      <text x="145" y="70" fontSize="12" fill={muted} textAnchor="middle">
        整数
      </text>
      <text x="145" y="42" fontSize="12" fill={muted} textAnchor="middle">
        有理数
      </text>

      <path d="M 218 116 L 262 116" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 252 110 L 262 116 L 252 122" fill="none" stroke={accent} strokeWidth="1.4" />
      <text x="286" y="112" fontSize="11" fill={accent} textAnchor="middle">
        引き算
      </text>
      <text x="286" y="127" fontSize="11" fill={accent} textAnchor="middle">
        割り算
      </text>

      <path d="M 270 150 L 316 150" fill="none" stroke={muted} strokeWidth="1.2" strokeDasharray="5,4" />
      <path d="M 306 144 L 316 150 L 306 156" fill="none" stroke={muted} strokeWidth="1.2" />
      <text x="330" y="154" fontSize="20" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="180" y="230" fontSize="11" fill={muted} textAnchor="middle">
        できない計算に出会うたび、外側の枠が増えてきた
      </text>
    </svg>
  );
}

/**
 * 数と式 系列1 Step 6：わり算の筆算で「同じ余りが再来する」様子。
 * 商の数字は書かず（答えを見せない）、余りが循環して戻る矢印と
 * 「同じところに戻ったら？」の問いで終える。
 */
export function RepeatingDecimalStep6() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <svg
      viewBox="0 0 360 256"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="わり算の筆算で余りが同じ値に戻る循環の図。商の数字は書かない"
    >
      <text x="24" y="34" fontSize="12" fill={muted}>
        筆算のとちゅうに出てくる「余り」
      </text>

      <circle cx="90" cy="90" r="20" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="90" y="95" fontSize="14" fill={stroke} textAnchor="middle" fontFamily={mono}>
        余り
      </text>
      <circle cx="200" cy="90" r="20" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="200" y="95" fontSize="14" fill={stroke} textAnchor="middle" fontFamily={mono}>
        余り
      </text>
      <circle cx="200" cy="170" r="20" fill="none" stroke={accent} strokeWidth="1.6" />
      <text x="200" y="175" fontSize="14" fill={accent} textAnchor="middle" fontFamily={mono}>
        余り
      </text>

      <path d="M 112 90 L 176 90" fill="none" stroke={muted} strokeWidth="1.3" />
      <path d="M 166 84 L 176 90 L 166 96" fill="none" stroke={muted} strokeWidth="1.3" />
      <path d="M 200 112 L 200 146" fill="none" stroke={muted} strokeWidth="1.3" />
      <path d="M 194 136 L 200 146 L 206 136" fill="none" stroke={muted} strokeWidth="1.3" />
      <path
        d="M 180 170 C 120 170 90 140 90 114"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="6,4"
      />
      <path d="M 84 124 L 90 112 L 96 124" fill="none" stroke={accent} strokeWidth="1.6" />
      <text x="240" y="150" fontSize="11" fill={accent}>
        前と同じ余りが再来
      </text>

      <text x="180" y="230" fontSize="11" fill={muted} textAnchor="middle">
        同じ余りに戻ったら、そのあとの数字はどうなる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列1 Step 10：1 辺 1 の正方形の対角線を数直線に倒す図。
 * 対角線の長さの値（√2 ≒ 1.41…）は書かない。目盛りだけ置いて
 * 「目盛りのすきまに落ちる長さ」を問いで終える。
 */
export function IrrationalDiagonal() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const Oy = 190;
  const unit = 74;
  const Ox = 46;
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="1 辺 1 の正方形の対角線を数直線の上に倒した図。対角線の長さの値は書かない"
    >
      <rect x={Ox} y={Oy - unit} width={unit} height={unit} rx="2" fill={fillColor} stroke={stroke} strokeWidth="1.3" />
      <path d={`M ${Ox} ${Oy} L ${Ox + unit} ${Oy - unit}`} fill="none" stroke={accent} strokeWidth="1.8" />
      <text x={Ox + unit * 0.72} y={Oy - 10} fontSize="11" fill={muted} textAnchor="middle">
        1
      </text>
      <text x={Ox - 12} y={Oy - unit / 2} fontSize="11" fill={muted} textAnchor="middle">
        1
      </text>

      <line x1="20" y1={Oy} x2="344" y2={Oy} stroke={muted} strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <line x1={Ox + k * (unit / 2)} y1={Oy - 5} x2={Ox + k * (unit / 2)} y2={Oy + 5} stroke={muted} strokeWidth="1" />
        </g>
      ))}
      <text x={Ox} y={Oy + 19} fontSize="11" fill={muted} textAnchor="middle">
        0
      </text>
      <text x={Ox + unit} y={Oy + 19} fontSize="11" fill={muted} textAnchor="middle">
        1
      </text>
      <text x={Ox + 2 * unit} y={Oy + 19} fontSize="11" fill={muted} textAnchor="middle">
        2
      </text>

      <path
        d={`M ${Ox + unit} ${Oy - unit} A ${unit * 1.414} ${unit * 1.414} 0 0 1 ${Ox + unit * 1.414} ${Oy}`}
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="5,4"
      />
      <circle cx={Ox + unit * 1.414} cy={Oy} r="4" fill={accent} />

      <text x="240" y="60" fontSize="11" fill={muted}>
        対角線を数直線に倒すと、
      </text>
      <text x="240" y="78" fontSize="11" fill={muted}>
        どの目盛りにも重ならない
      </text>
      <text x="240" y="100" fontSize="18" fill={accent} fontWeight="700">
        ?
      </text>

      <text x="180" y="236" fontSize="11" fill={muted} textAnchor="middle">
        この長さは、分数で言い当てられる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列2 Step 1：x を並べたかけ算で「指数＝回数」を示す。
 * step1 の問題 $x^3 \cdot x^6$ に合わせ、3回分と6回分の2グループを描く。
 * 合計の回数（答え）は書かず、「つなぐと回数は？」の問いで終える。
 */
export function ExponentCountStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  /** 左グループ＝3回分、右グループ＝6回分（問題の指数に対応。合計は描かない） */
  const left = [28, 60, 92];
  const right = [148, 180, 212, 244, 276, 308];
  const box = (x: number, key: string) => (
    <g key={key}>
      <rect
        x={x}
        y="58"
        width="28"
        height="36"
        rx="6"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text
        x={x + 14}
        y="82"
        fontSize="15"
        fill={stroke}
        textAnchor="middle"
        fontStyle="italic"
      >
        x
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="x を3回かけたものと6回かけたものをつなぐ図。合計の回数は書かない"
    >
      <text x="180" y="26" fontSize="12" fill={muted} textAnchor="middle">
        x を並べてかけると…
      </text>

      {left.map((x, i) => box(x, `L${i}`))}
      {right.map((x, i) => box(x, `R${i}`))}

      {/* グループの括り */}
      <path
        d="M 28 104 L 28 118 L 120 118 L 120 104"
        fill="none"
        stroke={muted}
        strokeWidth="1.2"
      />
      <text x="74" y="134" fontSize="11" fill={muted} textAnchor="middle">
        3回分
      </text>
      <path
        d="M 148 104 L 148 118 L 336 118 L 336 104"
        fill="none"
        stroke={muted}
        strokeWidth="1.2"
      />
      <text x="242" y="134" fontSize="11" fill={muted} textAnchor="middle">
        6回分
      </text>

      {/* つなぐ矢印（合計は ?） */}
      <path
        d="M 74 148 L 74 168 L 242 168 L 242 148"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
      />
      <path d="M 74 148 L 68 158" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 242 148 L 248 158" fill="none" stroke={accent} strokeWidth="1.4" />
      <text x="180" y="188" fontSize="13" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="180" y="216" fontSize="11" fill={muted} textAnchor="middle">
        3回分と6回分をつなぐと、回数はどうなる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列2 Step 5：かけ算では指数が足せる／足し算ではまとまらない対比。
 * 足し算側は「？」で終え、まとめ方の答えは書かない。
 */
export function ExponentAddVsMul() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="かけ算のときと足し算のときの指数の対比図。足し算側は問いで終える"
    >
      <rect x="16" y="28" width="152" height="160" rx="12" fill={fillColor} stroke={muted} strokeWidth="1" />
      <text x="92" y="52" fontSize="12" fill={accent} textAnchor="middle">
        かけ算のとき
      </text>
      <text x="92" y="88" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        a² × a³
      </text>
      <path d="M 92 102 L 92 122" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 86 114 L 92 124 L 98 114" fill="none" stroke={muted} strokeWidth="1.2" />
      <text x="92" y="148" fontSize="12" fill={muted} textAnchor="middle">
        回数を足せる
      </text>
      <text x="92" y="170" fontSize="13" fill={stroke} textAnchor="middle" fontStyle="italic">
        a · a · a · a · a
      </text>

      <rect x="192" y="28" width="152" height="160" rx="12" fill="none" stroke={muted} strokeWidth="1" />
      <text x="268" y="52" fontSize="12" fill={muted} textAnchor="middle">
        足し算のとき
      </text>
      <text x="268" y="88" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        a² + a³
      </text>
      <path d="M 268 102 L 268 122" fill="none" stroke={accent} strokeWidth="1.2" />
      <path d="M 262 114 L 268 124 L 274 114" fill="none" stroke={accent} strokeWidth="1.2" />
      <text x="268" y="158" fontSize="22" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="180" y="226" fontSize="11" fill={muted} textAnchor="middle">
        足し算でも、同じように1つにまとまる？
      </text>
    </svg>
  );
}

/**
 * 指数拡張 系列1 Step 1：回数ブロックと「0個のかけ算？」
 * a^0=1 の答えは書かない。
 */
export function ExpZeroBlock() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const boxes = [40, 78, 116];
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="a を並べてかける回数の図。0個のときの値は問いで終える"
    >
      <text x="180" y="28" fontSize="12" fill={muted} textAnchor="middle">
        a を m 回かける
      </text>
      {boxes.map((x, i) => (
        <g key={i}>
          <rect
            x={x}
            y="48"
            width="32"
            height="40"
            rx="6"
            fill={fillColor}
            stroke={stroke}
            strokeWidth="1.2"
          />
          <text
            x={x + 16}
            y="74"
            fontSize="15"
            fill={stroke}
            textAnchor="middle"
            fontStyle="italic"
          >
            a
          </text>
        </g>
      ))}
      <text x="170" y="74" fontSize="16" fill={muted} textAnchor="middle">
        …
      </text>
      <rect
        x="200"
        y="48"
        width="32"
        height="40"
        rx="6"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x="216" y="74" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        a
      </text>
      <text x="180" y="120" fontSize="12" fill={muted} textAnchor="middle">
        では、0 回分のかけ算は？
      </text>
      <rect
        x="130"
        y="136"
        width="100"
        height="40"
        rx="8"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="5,4"
      />
      <text x="180" y="162" fontSize="22" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>
      <text x="180" y="202" fontSize="11" fill={muted} textAnchor="middle">
        かけても相手を変えない数は何？
      </text>
    </svg>
  );
}

/**
 * 指数拡張 系列1 Step 5：比一定の半歩（分数乗）。
 * √a の具体値は書かない。
 */
export function ExpHalfStep() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="指数が1増えると決まった倍率。半歩の倍率は問いで終える"
    >
      <text x="40" y="40" fontSize="13" fill={muted}>
        指数
      </text>
      <text x="36" y="78" fontSize="15" fill={stroke} textAnchor="middle">
        0
      </text>
      <text x="120" y="78" fontSize="15" fill={stroke} textAnchor="middle">
        1/2
      </text>
      <text x="204" y="78" fontSize="15" fill={stroke} textAnchor="middle">
        1
      </text>
      <text x="288" y="78" fontSize="15" fill={stroke} textAnchor="middle">
        3/2
      </text>
      <path d="M 50 90 L 300 90" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 36 90 L 36 100" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 120 90 L 120 100" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 204 90 L 204 100" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 288 90 L 288 100" fill="none" stroke={muted} strokeWidth="1.2" />
      <text x="40" y="130" fontSize="13" fill={muted}>
        値
      </text>
      <text x="36" y="158" fontSize="15" fill={stroke} textAnchor="middle">
        1
      </text>
      <text x="120" y="158" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>
      <text x="204" y="158" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        a
      </text>
      <text x="288" y="158" fontSize="15" fill={muted} textAnchor="middle">
        …
      </text>
      <path
        d="M 50 168 C 80 188 100 188 110 168"
        fill="none"
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="180" y="192" fontSize="11" fill={muted} textAnchor="middle">
        1歩で a 倍なら、半歩の倍率は？
      </text>
    </svg>
  );
}

/**
 * 指数拡張 系列1 Step 9：引ける／くくれる対比。
 * 簡約後の答えは書かない。
 */
export function ExpLikeTerms() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="指数の引き算ではまとめられない。くくると見える対比。答えは書かない"
    >
      <rect x="16" y="24" width="152" height="140" rx="12" fill="none" stroke={muted} strokeWidth="1" />
      <text x="92" y="48" fontSize="12" fill={muted} textAnchor="middle">
        指数を引く？
      </text>
      <text x="92" y="88" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        a^p − a^q
      </text>
      <path d="M 92 102 L 92 120" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 86 112 L 92 122 L 98 112" fill="none" stroke={muted} strokeWidth="1.2" />
      <text x="92" y="148" fontSize="20" fill={muted} textAnchor="middle" fontWeight="700">
        ×
      </text>

      <rect
        x="192"
        y="24"
        width="152"
        height="140"
        rx="12"
        fill={fillColor}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="268" y="48" fontSize="12" fill={accent} textAnchor="middle">
        くくると？
      </text>
      <text x="268" y="88" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        a^q ( □ − 1 )
      </text>
      <path d="M 268 102 L 268 120" fill="none" stroke={accent} strokeWidth="1.2" />
      <path d="M 262 112 L 268 122 L 274 112" fill="none" stroke={accent} strokeWidth="1.2" />
      <text x="268" y="148" fontSize="22" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="180" y="200" fontSize="11" fill={muted} textAnchor="middle">
        引き算に指数法則は使える？ くくると何が見える？
      </text>
    </svg>
  );
}

/**
 * 指数関数 系列2 Step 1：a>1 の曲線＋(0,1) だけ印。
 * 問う y の数値は書かない。
 */
export function ExpGraphInc() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ox = 50;
  const oy = 180;
  const scaleX = 38;
  const scaleY = 28;
  const pts: string[] = [];
  for (let i = -2; i <= 3; i += 0.25) {
    const y = Math.pow(1.6, i);
    const sx = ox + i * scaleX;
    const sy = oy - y * scaleY;
    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  const p01x = ox;
  const p01y = oy - 1 * scaleY;
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="底が1より大きい指数関数の曲線。原点側の通る点の y は問いで終える"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="20" x2={ox} y2={oy + 16} stroke={muted} strokeWidth="0.8" />
      <text x="322" y={oy + 14} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 8} y="28" fontSize="10" fill={muted} textAnchor="end">
        y
      </text>
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.8" />
      <line
        x1={p01x}
        y1={oy}
        x2={p01x}
        y2={p01y}
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="4,3"
      />
      <circle cx={p01x} cy={p01y} r="5" fill={accent} />
      <text x={p01x + 10} y={p01y - 8} fontSize="11" fill={accent} fontWeight="600">
        (0, ?)
      </text>
      <text x="180" y="212" fontSize="11" fill={muted} textAnchor="middle">
        a &gt; 1 — 右へ行くほど y は大きい
      </text>
    </svg>
  );
}

/**
 * 指数関数 系列2 Step 5：増加／減少の2曲線。
 * 大小の答えは書かない。
 */
export function ExpGraphBoth() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dec = "color-mix(in oklch, var(--foreground) 55%, transparent)";
  const ox = 180;
  const oy = 190;
  const scaleX = 32;
  const scaleY = 26;
  const incPts: string[] = [];
  const decPts: string[] = [];
  for (let i = -2; i <= 2; i += 0.2) {
    const yInc = Math.pow(1.55, i);
    const yDec = Math.pow(0.65, i);
    incPts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - yInc * scaleY).toFixed(1)}`);
    decPts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - yDec * scaleY).toFixed(1)}`);
  }
  const p01y = oy - scaleY;
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="底が1より大きい曲線と0と1のあいだの曲線。どちらが増えるか問いで終える"
    >
      <line x1="20" y1={oy} x2="340" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="24" x2={ox} y2={oy + 12} stroke={muted} strokeWidth="0.8" />
      <polyline points={incPts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <polyline points={decPts.join(" ")} fill="none" stroke={dec} strokeWidth="1.7" strokeDasharray="6,4" />
      <circle cx={ox} cy={p01y} r="4.5" fill={accent} />
      <text x="300" y="56" fontSize="11" fill={stroke}>
        a &gt; 1
      </text>
      <text x="300" y="72" fontSize="11" fill={dec}>
        0 &lt; a &lt; 1
      </text>
      <path d="M 248 88 L 278 68" fill="none" stroke={stroke} strokeWidth="1" markerEnd="url(#expBothArrow)" />
      <path d="M 248 108 L 218 88" fill="none" stroke={dec} strokeWidth="1" />
      <defs>
        <marker id="expBothArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={stroke} />
        </marker>
      </defs>
      <text x="180" y="222" fontSize="11" fill={muted} textAnchor="middle">
        どちらが右へ行くほど y が大きくなる？
      </text>
    </svg>
  );
}

/**
 * 指数関数 系列2 Step 9：変域付き曲線（端だけ示唆）。
 * 最大／最小の値は書かない。
 */
export function ExpGraphDomain() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const ox = 60;
  const oy = 190;
  const scaleX = 42;
  const scaleY = 32;
  const x0 = 0;
  const x1 = 3;
  const pts: string[] = [];
  for (let i = x0; i <= x1; i += 0.15) {
    const y = Math.pow(0.4, i);
    pts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const leftX = ox + x0 * scaleX;
  const rightX = ox + x1 * scaleX;
  const leftY = oy - Math.pow(0.4, x0) * scaleY;
  const rightY = oy - Math.pow(0.4, x1) * scaleY;
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="変域付きの減少する指数関数。最大をとる端は問いで終える"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox - 8} y1="24" x2={ox - 8} y2={oy + 12} stroke={muted} strokeWidth="0.8" />
      <rect
        x={leftX}
        y="36"
        width={rightX - leftX}
        height={oy - 36}
        fill={fillColor}
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="5,4"
        rx="4"
      />
      <line x1={leftX} y1="36" x2={leftX} y2={oy} stroke={accent} strokeWidth="1.2" />
      <line x1={rightX} y1="36" x2={rightX} y2={oy} stroke={accent} strokeWidth="1.2" />
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.8" />
      <circle cx={leftX} cy={leftY} r="5" fill={accent} />
      <circle cx={rightX} cy={rightY} r="4" fill={muted} />
      <text x={leftX} y={oy + 16} fontSize="10" fill={accent} textAnchor="middle">
        左端
      </text>
      <text x={rightX} y={oy + 16} fontSize="10" fill={muted} textAnchor="middle">
        右端
      </text>
      <text x="180" y="222" fontSize="11" fill={muted} textAnchor="middle">
        0 ≤ x ≤ 3 — 最大はどちらの端？
      </text>
    </svg>
  );
}

/**
 * 対数関数 系列7 Step 1・5：y=a^x / y=log_a x / y=x の折り返し。
 * 通る点の座標（答え）は書かない。
 */
export function LogGraphReflect() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dec = "color-mix(in oklch, var(--foreground) 55%, transparent)";
  const ox = 52;
  const oy = 188;
  const scaleX = 34;
  const scaleY = 22;
  const base = 1.55;
  const expPts: string[] = [];
  const logPts: string[] = [];
  for (let i = -0.8; i <= 2.4; i += 0.15) {
    const y = Math.pow(base, i);
    expPts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  for (let x = 0.35; x <= 3.6; x += 0.12) {
    const y = Math.log(x) / Math.log(base);
    logPts.push(`${(ox + x * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const mirrorPts = [
    `${ox},${oy}`,
    `${ox + 2.8 * scaleX},${oy - 2.8 * scaleY}`,
  ].join(" ");
  const p1x = ox + 1 * scaleX;
  const p1y = oy - 0 * scaleY;
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="y=a^x と y=log_a x が y=x で折り返し合う。x=1 の y は問いで終える"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="24" x2={ox} y2={oy + 14} stroke={muted} strokeWidth="0.8" />
      <text x="322" y={oy + 12} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 6} y="32" fontSize="10" fill={muted} textAnchor="end">
        y
      </text>
      <polyline points={mirrorPts} fill="none" stroke={muted} strokeWidth="1" strokeDasharray="5,4" />
      <text x={ox + 2.6 * scaleX - 8} y={oy - 2.6 * scaleY - 6} fontSize="10" fill={muted} fontStyle="italic">
        y = x
      </text>
      <polyline points={expPts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <polyline points={logPts.join(" ")} fill="none" stroke={accent} strokeWidth="1.7" />
      <text x="248" y="44" fontSize="11" fill={stroke} fontStyle="italic">
        y = a^x
      </text>
      <text x="248" y="62" fontSize="11" fill={accent} fontStyle="italic">
        y = log_a x
      </text>
      <line x1={p1x} y1={oy} x2={p1x} y2={p1y - 10} stroke={dec} strokeWidth="1" strokeDasharray="4,3" />
      <circle cx={p1x} cy={p1y} r="5" fill={accent} />
      <text x={p1x + 10} y={p1y - 12} fontSize="11" fill={accent} fontWeight="600">
        (1, ?)
      </text>
      <text x="180" y="222" fontSize="11" fill={muted} textAnchor="middle">
        指数のグラフを y = x で折り返すと——[対数関数]？
      </text>
    </svg>
  );
}

/**
 * 対数関数 系列7 Step 9：底 0<a<1 の減少曲線（値ラベルなし）。
 * 真数の大小をそのまま使うと落とす——向きを疑う問いで終える。
 */
export function LogGraphDec() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const ox = 58;
  const oy = 188;
  const scaleX = 44;
  const scaleY = 28;
  const base = 0.4;
  const x0 = 1;
  const x1 = 3;
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += 0.12) {
    const y = Math.log(x) / Math.log(base);
    pts.push(`${(ox + x * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const leftX = ox + x0 * scaleX;
  const rightX = ox + x1 * scaleX;
  const leftY = oy - Math.log(x0) / Math.log(base) * scaleY;
  const rightY = oy - Math.log(x1) / Math.log(base) * scaleY;
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="底が1より小さい減少する対数関数。4点の大小は問いで終える"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox - 6} y1="28" x2={ox - 6} y2={oy + 12} stroke={muted} strokeWidth="0.8" />
      <rect
        x={leftX}
        y="36"
        width={rightX - leftX}
        height={oy - 36}
        fill={fillColor}
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="5,4"
        rx="4"
      />
      <line x1={leftX} y1="36" x2={leftX} y2={oy} stroke={accent} strokeWidth="1.2" />
      <line x1={rightX} y1="36" x2={rightX} y2={oy} stroke={muted} strokeWidth="1.2" />
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.8" />
      <circle cx={leftX} cy={leftY} r="5" fill={accent} />
      <circle cx={rightX} cy={rightY} r="4" fill={muted} />
      <circle cx={ox + 1.6 * scaleX} cy={oy - (Math.log(1.6) / Math.log(base)) * scaleY} r="3.5" fill={stroke} />
      <circle cx={ox + 2.2 * scaleX} cy={oy - (Math.log(2.2) / Math.log(base)) * scaleY} r="3.5" fill={stroke} />
      <text x={leftX} y={oy + 16} fontSize="10" fill={accent} textAnchor="middle">
        左端
      </text>
      <text x={rightX} y={oy + 16} fontSize="10" fill={muted} textAnchor="middle">
        右端
      </text>
      <text x="180" y="222" fontSize="11" fill={muted} textAnchor="middle">
        0 &lt; a &lt; 1 — 真数が大きいほど [対数] は小さい？
      </text>
    </svg>
  );
}

/**
 * 対数方程式 系列8 Step 1・5：真数条件の数直線（解の値は書かない）。
 */
export function LogDomainLine() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const oy = 120;
  const xStart = 48;
  const xEnd = 310;
  const boundaryX = 110;
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="真数条件の数直線。解の境界値は問いで終える"
    >
      <line x1={xStart} y1={oy} x2={xEnd} y2={oy} stroke={muted} strokeWidth="1" />
      <polygon
        points={`${boundaryX + 8},${oy - 5} ${xEnd - 4},${oy - 5} ${xEnd - 4},${oy + 5} ${boundaryX + 8},${oy + 5}`}
        fill={fillColor}
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="5,4"
      />
      <circle cx={boundaryX} cy={oy} r="5" fill="var(--surface)" stroke={accent} strokeWidth="2" />
      <text x={boundaryX} y={oy + 22} fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        ?
      </text>
      <text x={boundaryX + 60} y={oy - 14} fontSize="11" fill={accent} fontWeight="600">
        定義される x
      </text>
      <text x={xStart} y={oy + 22} fontSize="10" fill={muted}>
        x
      </text>
      <text x="180" y="168" fontSize="11" fill={muted} textAnchor="middle">
        log の真数が正——境界はどこ？
      </text>
      <text x="180" y="186" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        [真数条件] を先に書かないと何が起きうる？
      </text>
    </svg>
  );
}

/**
 * 対数方程式 系列8 Step 9：t=log x と t の許容帯（解の値は書かない）。
 */
export function LogTBand() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ox = 58;
  const oy = 200;
  const scaleX = 34;
  const scaleY = 22;
  const logPts: string[] = [];
  for (let x = 0.35; x <= 3.2; x += 0.12) {
    const t = Math.log(x) / Math.log(5);
    logPts.push(`${(ox + x * scaleX).toFixed(1)},${(oy - (t + 2.5) * scaleY).toFixed(1)}`);
  }
  const bandTop = oy - 1.2 * scaleY;
  const bandBot = oy - 2.8 * scaleY;
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="t=log x のグラフと t の許容帯。解の x は問いで終える"
    >
      <line x1="24" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox - 8} y1="28" x2={ox - 8} y2={oy + 10} stroke={muted} strokeWidth="0.8" />
      <text x="318" y={oy + 12} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 14} y="36" fontSize="10" fill={muted} textAnchor="end">
        t
      </text>
      <polyline points={logPts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <text x="248" y="48" fontSize="11" fill={stroke} fontStyle="italic">
        t = log x
      </text>
      <rect
        x={ox + 0.8 * scaleX}
        y={bandBot}
        width={2.4 * scaleX}
        height={bandTop - bandBot}
        fill="color-mix(in oklch, var(--accent) 12%, transparent)"
        stroke={accent}
        strokeWidth="0.8"
        strokeDasharray="5,4"
        rx="2"
      />
      <text x={ox + 2 * scaleX} y={bandBot - 8} fontSize="10" fill={accent} textAnchor="middle">
        t の許容帯？
      </text>
      <line x1={ox} y1={oy - 0.2 * scaleY} x2="300" y2={oy - 0.2 * scaleY} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
      <text x="302" y={oy - 0.2 * scaleY - 4} fontSize="10" fill={accent}>
        x &gt; 0
      </text>
      <text x="180" y="236" fontSize="11" fill={muted} textAnchor="middle">
        2次を解いたあと——[真数条件] で残る x は？
      </text>
    </svg>
  );
}

/**
 * 常用対数 系列9 Step 1：$1.2\times10^k$ 型の桁が伸びる表（問う桁数は空欄）。
 */
export function SciNotationDigits() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const headerFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const rows = [
    { k: "1", sample: "1.2 × 10¹", digits: "2" },
    { k: "3", sample: "1.2 × 10³", digits: "4" },
    { k: "6", sample: "1.2 × 10⁶", digits: "?" },
  ];
  const rowH = 36;
  const tableTop = 52;
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="科学記数法 1.2×10^k の桁数が n とどう対応するか。問う桁数は空欄"
    >
      <rect x="32" y={tableTop - 28} width="296" height="24" rx="4" fill={headerFill} stroke={muted} strokeWidth="0.8" />
      <text x="180" y={tableTop - 12} fontSize="11" fill={stroke} textAnchor="middle" fontWeight="600">
        $1 \\le A &lt; 10$ のとき $A \\times 10^n$ の [桁数]
      </text>
      {rows.map((row, i) => {
        const y = tableTop + i * rowH;
        return (
          <g key={row.k}>
            <rect x="32" y={y} width="296" height={rowH - 4} rx="4" fill="var(--surface)" stroke={muted} strokeWidth="0.8" />
            <text x="52" y={y + 22} fontSize="12" fill={stroke} fontStyle="italic">
              {row.sample}
            </text>
            <text x="268" y={y + 22} fontSize="13" fill={row.digits === "?" ? accent : muted} textAnchor="middle" fontWeight={row.digits === "?" ? 700 : 500}>
              {row.digits} 桁
            </text>
            {i < rows.length - 1 && (
              <text x="180" y={y + rowH + 2} fontSize="10" fill={accent} textAnchor="middle">
                ↓ n が 1 増えると…
              </text>
            )}
          </g>
        );
      })}
      <text x="180" y="196" fontSize="11" fill={muted} textAnchor="middle">
        肩の上 $n$ と [桁数] の関係——$n$ か $n+1$ か？
      </text>
      <text x="180" y="214" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        具体の $A \\times 10^n$ で確かめてみよう
      </text>
    </svg>
  );
}

/**
 * 常用対数 系列9 Step 5・9：元の世界（累乗）↔ 肩の上の世界（和）。
 * 最終の $A\times10^n$ や桁数は書かない。
 */
export function Log10Shoulder() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const leftFill = "color-mix(in oklch, var(--surface) 85%, var(--foreground) 15%)";
  const rightFill = "color-mix(in oklch, var(--accent) 10%, transparent)";
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="累乗の世界と常用対数の肩の上の世界。桁数は問いで終える"
    >
      <rect x="24" y="36" width="130" height="120" rx="8" fill={leftFill} stroke={stroke} strokeWidth="1" />
      <text x="89" y="58" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        元の世界
      </text>
      <text x="89" y="88" fontSize="18" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        2^30
      </text>
      <text x="89" y="112" fontSize="11" fill={muted} textAnchor="middle">
        巨大な累乗
      </text>
      <text x="89" y="132" fontSize="10" fill={muted} textAnchor="middle">
        かけ算が重なる
      </text>

      <path
        d="M 168 96 L 192 96"
        stroke={accent}
        strokeWidth="2"
        markerEnd="url(#log10Arrow)"
      />
      <defs>
        <marker id="log10Arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
        </marker>
      </defs>
      <text x="180" y="84" fontSize="10" fill={accent} textAnchor="middle" fontWeight="600">
        log₁₀
      </text>
      <text x="180" y="118" fontSize="10" fill={accent} textAnchor="middle">
        翻訳
      </text>

      <rect x="206" y="36" width="130" height="120" rx="8" fill={rightFill} stroke={accent} strokeWidth="1.2" />
      <text x="271" y="58" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        肩の上の世界
      </text>
      <text x="271" y="88" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic" fontWeight="600">
        30 × log₁₀ 2
      </text>
      <text x="271" y="112" fontSize="11" fill={muted} textAnchor="middle">
        かけ算 → 足し算
      </text>
      <text x="271" y="132" fontSize="10" fill={muted} textAnchor="middle">
        整数部分 + 仮数
      </text>

      <rect x="48" y="172" width="264" height="56" rx="6" fill="color-mix(in oklch, var(--accent) 8%, transparent)" stroke={muted} strokeWidth="0.8" strokeDasharray="5,4" />
      <text x="180" y="194" fontSize="11" fill={stroke} textAnchor="middle">
        仮数を $0 \\le$ 仮数 $&lt; 1$ に揃えると…
      </text>
      <text x="180" y="214" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
        [桁数] と最高位が同時に読める？
      </text>
    </svg>
  );
}

/**
 * 指数方程式 系列3 Step 1：a>1 の曲線＋水平線。
 * 交点の x は書かない。
 */
export function ExpEqLine() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ox = 50;
  const oy = 190;
  const scaleX = 36;
  const scaleY = 24;
  const pts: string[] = [];
  for (let i = -1.5; i <= 3.2; i += 0.2) {
    const y = Math.pow(1.55, i);
    pts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const lineY = oy - 3.2 * scaleY;
  const meetX = ox + 2 * scaleX;
  const meetY = oy - Math.pow(1.55, 2) * scaleY;
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="底が1より大きい指数関数と水平線。交点のxは問いで終える"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="24" x2={ox} y2={oy + 14} stroke={muted} strokeWidth="0.8" />
      <text x="322" y={oy + 12} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 6} y="32" fontSize="10" fill={muted} textAnchor="end">
        y
      </text>
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.8" />
      <line
        x1="24"
        y1={lineY}
        x2="320"
        y2={lineY}
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="7,5"
      />
      <text x="28" y={lineY - 8} fontSize="11" fill={accent} fontWeight="600">
        y = M
      </text>
      <circle cx={meetX} cy={meetY} r="5.5" fill={accent} />
      <line
        x1={meetX}
        y1={meetY}
        x2={meetX}
        y2={oy}
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="4,3"
      />
      <text x={meetX + 8} y={meetY - 10} fontSize="11" fill={accent} fontWeight="600">
        交点（x = ?）
      </text>
      <text x="180" y="222" fontSize="11" fill={muted} textAnchor="middle">
        水平線は曲線と何回交わる？
      </text>
    </svg>
  );
}

/**
 * 指数不等式 系列3 Step 8：減少曲線＋不等号の向き反転。
 * 境界の値は書かない。
 */
export function ExpIneqFlip() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dec = "color-mix(in oklch, var(--foreground) 60%, transparent)";
  const ox = 60;
  const oy = 190;
  const scaleX = 38;
  const scaleY = 28;
  const pts: string[] = [];
  for (let i = -1; i <= 3.5; i += 0.2) {
    const y = Math.pow(0.55, i);
    pts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const boundX = ox + 2.2 * scaleX;
  const boundY = oy - Math.pow(0.55, 2.2) * scaleY;
  const hY = boundY;
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="減少する指数関数と水平境界。不等号の向き反転を矢印で示す。境界の値は書かない"
    >
      <line x1="20" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox - 6} y1="24" x2={ox - 6} y2={oy + 12} stroke={muted} strokeWidth="0.8" />
      <polyline points={pts.join(" ")} fill="none" stroke={dec} strokeWidth="1.8" />
      <line x1="24" y1={hY} x2="310" y2={hY} stroke={accent} strokeWidth="1.3" strokeDasharray="6,4" />
      <text x="28" y={hY - 8} fontSize="11" fill={accent}>
        境界 y = ?
      </text>
      <line x1={boundX} y1={boundY} x2={boundX} y2={oy} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
      <circle cx={boundX} cy={boundY} r="5" fill="none" stroke={accent} strokeWidth="1.6" />
      <text x="248" y="52" fontSize="11" fill={dec}>
        0 &lt; a &lt; 1 — 右へ行くほど y は小さい
      </text>
      <path d="M 200 78 L 230 58" fill="none" stroke={stroke} strokeWidth="1.2" markerEnd="url(#expIneqInc)" />
      <text x="236" y="56" fontSize="10" fill={stroke}>
        a &gt; 1
      </text>
      <text x="236" y="70" fontSize="10" fill={stroke}>
        p &lt; q ⇒ x &lt; ?
      </text>
      <path d="M 200 98 L 170 118" fill="none" stroke={dec} strokeWidth="1.2" markerEnd="url(#expIneqDec)" />
      <text x="118" y="132" fontSize="10" fill={dec}>
        0 &lt; a &lt; 1
      </text>
      <text x="118" y="146" fontSize="10" fill={dec}>
        p &lt; q ⇒ x &gt; ?（反転）
      </text>
      <defs>
        <marker id="expIneqInc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={stroke} />
        </marker>
        <marker id="expIneqDec" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={dec} />
        </marker>
      </defs>
      <text x="180" y="232" fontSize="11" fill={muted} textAnchor="middle">
        底が 1 より小さいと、不等号だけ裏返る
      </text>
    </svg>
  );
}

/**
 * 指数の置き換え 系列4 Step 1・5：$t=a^x$ の曲線と正の $t$ 軸。
 * 具体解・境界値は書かない。
 */
export function ExpTPos() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dec = "color-mix(in oklch, var(--foreground) 55%, transparent)";
  const ox = 58;
  const oy = 200;
  const scaleX = 34;
  const scaleY = 22;
  const incPts: string[] = [];
  for (let i = -1.2; i <= 2.8; i += 0.18) {
    const t = Math.pow(1.6, i);
    incPts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - t * scaleY).toFixed(1)}`);
  }
  const decPts: string[] = [];
  for (let i = -1.2; i <= 2.8; i += 0.18) {
    const t = Math.pow(0.62, i);
    decPts.push(`${(ox + i * scaleX).toFixed(1)},${(oy - t * scaleY).toFixed(1)}`);
  }
  const bandTop = oy - 5 * scaleY;
  const bandBot = oy - 1 * scaleY;
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="t=a^x の曲線と正の t 軸。具体解は問いで終える"
    >
      <line x1="24" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox - 8} y1="28" x2={ox - 8} y2={oy + 10} stroke={muted} strokeWidth="0.8" />
      <text x="318" y={oy + 12} fontSize="10" fill={muted}>
        x
      </text>
      <text x={ox - 14} y="36" fontSize="10" fill={muted} textAnchor="end">
        t
      </text>
      <rect
        x={ox - 4}
        y={bandTop}
        width={2.8 * scaleX + 8}
        height={bandBot - bandTop}
        fill="color-mix(in oklch, var(--accent) 12%, transparent)"
        stroke={accent}
        strokeWidth="0.8"
        strokeDasharray="5,4"
        rx="2"
      />
      <text x={ox + scaleX + 6} y={bandTop + 14} fontSize="10" fill={accent}>
        t の許容帯？
      </text>
      <polyline points={incPts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <polyline points={decPts.join(" ")} fill="none" stroke={dec} strokeWidth="1.4" strokeDasharray="6,4" />
      <text x="248" y="52" fontSize="10" fill={stroke}>
        a &gt; 1 — t は x と同じ向き
      </text>
      <text x="248" y="68" fontSize="10" fill={dec}>
        0 &lt; a &lt; 1 — t は x と逆
      </text>
      <line x1={ox} y1={oy - 0.3 * scaleY} x2="300" y2={oy - 0.3 * scaleY} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
      <text x="302" y={oy - 0.3 * scaleY - 4} fontSize="10" fill={accent}>
        t &gt; 0
      </text>
      <text x="180" y="236" fontSize="11" fill={muted} textAnchor="middle">
        t = a^x — 正の t だけが x に戻せる
      </text>
    </svg>
  );
}

/**
 * 指数の置き換え 系列4 Step 9：変域付き放物線 f(t)=t²−6t+5。
 * 頂点の y 座標は問いに残す。
 */
export function ExpTParabola() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ox = 52;
  const oy = 210;
  const scaleT = 11;
  const scaleY = 3.2;
  const parPts: string[] = [];
  for (let t = 0; t <= 28; t += 0.4) {
    const y = t * t - 6 * t + 5;
    parPts.push(`${(ox + t * scaleT).toFixed(1)},${(oy - y * scaleY).toFixed(1)}`);
  }
  const tMin = 1;
  const tMax = 25;
  const vx = ox + 3 * scaleT;
  const vy = oy - (-4) * scaleY;
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="t の変域付き放物線。頂点の y は問いで終える"
    >
      <line x1="28" y1={oy} x2="330" y2={oy} stroke={muted} strokeWidth="0.8" />
      <line x1={ox} y1="24" x2={ox} y2={oy + 8} stroke={muted} strokeWidth="0.8" />
      <text x="322" y={oy + 12} fontSize="10" fill={muted}>
        t
      </text>
      <text x={ox - 6} y="32" fontSize="10" fill={muted} textAnchor="end">
        f(t)
      </text>
      <polyline points={parPts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.7" />
      <line
        x1={ox + tMin * scaleT}
        y1={oy - 2}
        x2={ox + tMin * scaleT}
        y2={oy + 6}
        stroke={accent}
        strokeWidth="1.4"
      />
      <line
        x1={ox + tMax * scaleT}
        y1={oy - 2}
        x2={ox + tMax * scaleT}
        y2={oy + 6}
        stroke={accent}
        strokeWidth="1.4"
      />
      <line
        x1={ox + tMin * scaleT}
        y1={oy + 4}
        x2={ox + tMax * scaleT}
        y2={oy + 4}
        stroke={accent}
        strokeWidth="2.2"
      />
      <text x={ox + tMin * scaleT - 4} y={oy + 18} fontSize="10" fill={accent} textAnchor="middle">
        t = ?
      </text>
      <text x={ox + tMax * scaleT + 4} y={oy + 18} fontSize="10" fill={accent} textAnchor="middle">
        t = ?
      </text>
      <circle cx={vx} cy={vy} r="5" fill="none" stroke={accent} strokeWidth="1.6" />
      <line x1={vx} y1={vy} x2={vx} y2={oy} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
      <text x={vx + 8} y={vy - 8} fontSize="11" fill={accent} fontWeight="600">
        頂点（y = ?）
      </text>
      <text x="180" y="236" fontSize="11" fill={muted} textAnchor="middle">
        変域内で頂点は使える？ 端点との大小は？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列3 Step 1：分配の「軸足」を移す矢印図。
 * どの項とどの項をかけるかを矢印で示すだけ。積の結果は書かない。
 */
export function ExpandPivotStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="かっこのかけ算で軸足を移す矢印図。積の結果は書かない"
    >
      <text x="180" y="30" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        (x + p)(y + q)
      </text>

      <circle cx="110" cy="90" r="16" fill="none" stroke={accent} strokeWidth="1.5" />
      <text x="110" y="95" fontSize="14" fill={accent} textAnchor="middle" fontStyle="italic">
        x
      </text>
      <text x="140" y="95" fontSize="14" fill={muted} textAnchor="middle">
        +
      </text>
      <circle cx="170" cy="90" r="16" fill="none" stroke={muted} strokeWidth="1.2" />
      <text x="170" y="95" fontSize="14" fill={muted} textAnchor="middle" fontStyle="italic">
        p
      </text>

      <circle cx="230" cy="90" r="16" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="230" y="95" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        y
      </text>
      <text x="260" y="95" fontSize="14" fill={muted} textAnchor="middle">
        +
      </text>
      <circle cx="290" cy="90" r="16" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="290" y="95" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        q
      </text>

      <path d="M 122 102 C 150 130 200 130 218 106" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 210 112 L 220 104 L 214 118" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 122 102 C 160 150 250 150 278 106" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 270 112 L 280 104 L 274 118" fill="none" stroke={accent} strokeWidth="1.4" />
      <text x="70" y="140" fontSize="11" fill={accent}>
        軸足 x
      </text>

      <path d="M 170 108 L 170 168 L 230 168" fill="none" stroke={muted} strokeWidth="1.3" strokeDasharray="5,4" />
      <path d="M 220 162 L 230 168 L 220 174" fill="none" stroke={muted} strokeWidth="1.3" />
      <path d="M 170 168 L 290 168" fill="none" stroke={muted} strokeWidth="1.3" strokeDasharray="5,4" />
      <path d="M 280 162 L 290 168 L 280 174" fill="none" stroke={muted} strokeWidth="1.3" />
      <text x="70" y="172" fontSize="11" fill={muted}>
        次に軸足 p
      </text>

      <text x="180" y="214" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>
      <text x="180" y="238" fontSize="11" fill={muted} textAnchor="middle">
        全部で何回のかけ算が起きる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列3 Step 4：打ち消される項に取り消し線を引く図。
 * 係数や具体値は書かず、「何が消えるか」だけを問う。
 */
export function ExpandCancelStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="打ち消される項に取り消し線を引いた図。係数は書かない"
    >
      <text x="180" y="34" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        (x + □)(x − □)
      </text>

      <path d="M 180 48 L 180 72" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 174 64 L 180 74 L 186 64" fill="none" stroke={muted} strokeWidth="1.2" />

      <text x="70" y="110" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        x²
      </text>
      <text x="110" y="110" fontSize="15" fill={muted} textAnchor="middle">
        +
      </text>
      <text x="160" y="110" fontSize="15" fill={muted} textAnchor="middle" fontStyle="italic">
        □x
      </text>
      <line x1="136" y1="104" x2="184" y2="104" stroke={accent} strokeWidth="1.8" />
      <text x="210" y="110" fontSize="15" fill={muted} textAnchor="middle">
        −
      </text>
      <text x="250" y="110" fontSize="15" fill={muted} textAnchor="middle" fontStyle="italic">
        □x
      </text>
      <line x1="226" y1="104" x2="274" y2="104" stroke={accent} strokeWidth="1.8" />
      <text x="290" y="110" fontSize="15" fill={muted} textAnchor="middle">
        +
      </text>
      <text x="320" y="110" fontSize="15" fill={stroke} textAnchor="middle" fontStyle="italic">
        …
      </text>

      <text x="180" y="148" fontSize="11" fill={accent} textAnchor="middle">
        反対向きの項が打ち消し合う
      </text>

      <text x="180" y="196" fontSize="11" fill={muted} textAnchor="middle">
        残るのはどの項？　x の係数はどうなる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列3 Step 8／系列4 Step 9：かたまりを囲む図（共用）。
 * 囲みだけ示し、展開や因数分解の結果は書かない。
 */
export function ChunkBox() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="式のなかのかたまりを囲んだ図。展開結果は書かない"
    >
      <text x="180" y="36" fontSize="12" fill={muted} textAnchor="middle">
        かたまりを1つの文字と見る
      </text>

      <rect x="48" y="70" width="110" height="52" rx="10" fill={fillColor} stroke={accent} strokeWidth="1.6" />
      <text x="103" y="102" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic">
        x + y
      </text>
      <text x="178" y="102" fontSize="16" fill={muted} textAnchor="middle">
        +
      </text>
      <text x="210" y="102" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic">
        p
      </text>

      <text x="250" y="102" fontSize="18" fill={muted} textAnchor="middle">
        )
      </text>
      <text x="36" y="102" fontSize="18" fill={muted} textAnchor="middle">
        (
      </text>

      <rect x="48" y="148" width="110" height="52" rx="10" fill={fillColor} stroke={accent} strokeWidth="1.6" />
      <text x="103" y="180" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic">
        x + y
      </text>
      <text x="178" y="180" fontSize="16" fill={muted} textAnchor="middle">
        −
      </text>
      <text x="210" y="180" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic">
        p
      </text>
      <text x="250" y="180" fontSize="18" fill={muted} textAnchor="middle">
        )
      </text>
      <text x="36" y="180" fontSize="18" fill={muted} textAnchor="middle">
        (
      </text>

      <text x="290" y="102" fontSize="11" fill={accent}>
        同じ塊
      </text>
      <path d="M 160 122 L 160 148" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="4,3" />

      <text x="180" y="220" fontSize="11" fill={muted} textAnchor="middle">
        この囲みを1文字に置き換えると、何の公式になる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列4 Step 1：展開⇄因数分解の往復（ばらす／組み立てる）。
 * 具体式は置かず、文字のままの関係だけを示す。
 */
export function FactoringRoundtripStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="展開と因数分解の往復図。具体式は書かない"
    >
      <rect x="24" y="70" width="120" height="70" rx="12" fill={fillColor} stroke={stroke} strokeWidth="1.3" />
      <text x="84" y="100" fontSize="13" fill={stroke} textAnchor="middle">
        積の形
      </text>
      <text x="84" y="122" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        (　)(　)
      </text>

      <rect x="216" y="70" width="120" height="70" rx="12" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="276" y="100" fontSize="13" fill={stroke} textAnchor="middle">
        和の形
      </text>
      <text x="276" y="122" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        □ + □ + …
      </text>

      <path d="M 150 88 L 208 88" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M 198 82 L 210 88 L 198 94" fill="none" stroke={accent} strokeWidth="1.5" />
      <text x="180" y="78" fontSize="11" fill={accent} textAnchor="middle">
        ばらす
      </text>

      <path d="M 208 122 L 150 122" fill="none" stroke={muted} strokeWidth="1.5" />
      <path d="M 160 116 L 148 122 L 160 128" fill="none" stroke={muted} strokeWidth="1.5" />
      <text x="180" y="146" fontSize="11" fill={muted} textAnchor="middle">
        組み立てる
      </text>

      <text x="180" y="196" fontSize="11" fill={muted} textAnchor="middle">
        組み立てるときは、何を探せばよい？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列4 Step 5：「積が○になる組」の候補表。
 * 和の欄は空のまま残し、問いで終える（答えの組は書かない）。
 */
export function FactoringSearchTable() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const rows = [
    { a: "1", b: "○" },
    { a: "2", b: "…" },
    { a: "…", b: "…" },
  ];
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="積が丸になる組の候補表。和の欄は空で問いで終える"
    >
      <text x="180" y="28" fontSize="12" fill={muted} textAnchor="middle">
        積が ○ になる組を並べる
      </text>

      <rect x="50" y="48" width="260" height="140" rx="8" fill={fillColor} stroke={muted} strokeWidth="1" />
      <line x1="50" y1="84" x2="310" y2="84" stroke={muted} strokeWidth="1" />
      <line x1="136" y1="48" x2="136" y2="188" stroke={muted} strokeWidth="1" />
      <line x1="222" y1="48" x2="222" y2="188" stroke={muted} strokeWidth="1" />

      <text x="93" y="72" fontSize="12" fill={stroke} textAnchor="middle">
        一方
      </text>
      <text x="179" y="72" fontSize="12" fill={stroke} textAnchor="middle">
        他方
      </text>
      <text x="266" y="72" fontSize="12" fill={accent} textAnchor="middle">
        和
      </text>

      {rows.map((r, idx) => {
        const y = 112 + idx * 28;
        return (
          <g key={idx}>
            <text x="93" y={y} fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
              {r.a}
            </text>
            <text x="179" y={y} fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
              {r.b}
            </text>
            <text x="266" y={y} fontSize="16" fill={accent} textAnchor="middle">
              {idx === 0 ? "?" : ""}
            </text>
            {idx < rows.length - 1 && (
              <line x1="50" y1={y + 10} x2="310" y2={y + 10} stroke={muted} strokeWidth="0.6" strokeDasharray="3,3" />
            )}
          </g>
        );
      })}

      <text x="180" y="226" fontSize="11" fill={muted} textAnchor="middle">
        和が x の係数と一致する組はどれ？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列5 Step 1：傾いた天秤に同じ重さを足す図。
 * 傾きが保たれることだけ示し、負の数をかける場面は描かない。
 */
export function IneqBalanceStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="傾いた天秤の両側に同じ重さを足す図。負の数をかける場面は描かない"
    >
      <line x1="180" y1="48" x2="180" y2="170" stroke={muted} strokeWidth="1.4" />
      <polygon points="180,170 150,200 210,200" fill="none" stroke={muted} strokeWidth="1.2" />

      <line x1="90" y1="70" x2="270" y2="100" stroke={stroke} strokeWidth="2" />
      <circle cx="180" cy="85" r="4" fill={stroke} />

      <rect x="58" y="78" width="44" height="28" rx="4" fill={fillColor} stroke={stroke} strokeWidth="1.2" />
      <text x="80" y="97" fontSize="12" fill={stroke} textAnchor="middle">
        左
      </text>
      <rect x="248" y="108" width="44" height="28" rx="4" fill={fillColor} stroke={stroke} strokeWidth="1.2" />
      <text x="270" y="127" fontSize="12" fill={stroke} textAnchor="middle">
        右
      </text>

      <path d="M 80 70 L 80 52" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M 74 60 L 80 50 L 86 60" fill="none" stroke={accent} strokeWidth="1.3" />
      <rect x="66" y="28" width="28" height="18" rx="3" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <text x="80" y="41" fontSize="10" fill={accent} textAnchor="middle">
        +w
      </text>

      <path d="M 270 100 L 270 82" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M 264 90 L 270 80 L 276 90" fill="none" stroke={accent} strokeWidth="1.3" />
      <rect x="256" y="58" width="28" height="18" rx="3" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" />
      <text x="270" y="71" fontSize="10" fill={accent} textAnchor="middle">
        +w
      </text>

      <text x="180" y="226" fontSize="11" fill={muted} textAnchor="middle">
        同じ重さを両側に足すと、傾きはどうなる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列5 Step 4：数直線上の範囲（塗りと矢印）。
 * 境界の値は書かず、向きと塗りだけを示す。
 */
export function IneqNumlineFlip() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const y = 110;
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="数直線上の範囲を塗りと矢印で示した図。境界の値は書かない"
    >
      <text x="180" y="36" fontSize="12" fill={muted} textAnchor="middle">
        不等式の答えは「範囲」
      </text>

      <line x1="30" y1={y} x2="330" y2={y} stroke={muted} strokeWidth="1.2" />
      <path d="M 320 104 L 332 110 L 320 116" fill="none" stroke={muted} strokeWidth="1.2" />
      <path d="M 40 104 L 28 110 L 40 116" fill="none" stroke={muted} strokeWidth="1.2" />

      <rect x="40" y={y - 14} width="140" height="28" fill={fillColor} stroke="none" />
      <line x1="40" y1={y} x2="180" y2={y} stroke={accent} strokeWidth="3" />
      <circle cx="180" cy={y} r="6" fill="none" stroke={accent} strokeWidth="1.6" />
      <path d="M 52 92 L 40 110" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 48 100 L 40 110 L 56 108" fill="none" stroke={accent} strokeWidth="1.4" />

      <text x="180" y="150" fontSize="11" fill={muted} textAnchor="middle">
        境界（値は伏せる）
      </text>
      <text x="100" y="150" fontSize="11" fill={accent} textAnchor="middle">
        この側
      </text>

      <text x="180" y="196" fontSize="11" fill={muted} textAnchor="middle">
        向きが裏返ると、塗る側はどう変わる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列5 Step 8：2本の数直線と共通部分。
 * 境界値は書かず、重なりの塗りだけを示す。
 */
export function IneqNumlineAnd() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 260"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="2本の数直線と共通部分の図。境界の値は書かない"
    >
      <text x="40" y="40" fontSize="12" fill={muted}>
        条件 A
      </text>
      <line x1="30" y1="60" x2="330" y2="60" stroke={muted} strokeWidth="1.1" />
      <rect x="80" y="48" width="180" height="24" fill={fillColor} />
      <line x1="80" y1="60" x2="260" y2="60" stroke={stroke} strokeWidth="2.4" />
      <circle cx="80" cy="60" r="5" fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle cx="260" cy="60" r="5" fill={stroke} />

      <text x="40" y="110" fontSize="12" fill={muted}>
        条件 B
      </text>
      <line x1="30" y1="130" x2="330" y2="130" stroke={muted} strokeWidth="1.1" />
      <rect x="140" y="118" width="160" height="24" fill={fillColor} />
      <line x1="140" y1="130" x2="300" y2="130" stroke={stroke} strokeWidth="2.4" />
      <circle cx="140" cy="130" r="5" fill={stroke} />
      <circle cx="300" cy="130" r="5" fill="none" stroke={stroke} strokeWidth="1.4" />

      <text x="40" y="180" fontSize="12" fill={accent}>
        共通部分
      </text>
      <line x1="30" y1="200" x2="330" y2="200" stroke={muted} strokeWidth="1.1" />
      <rect x="140" y="188" width="120" height="24" fill={fillColor} />
      <line x1="140" y1="200" x2="260" y2="200" stroke={accent} strokeWidth="3" />
      <circle cx="140" cy="200" r="5" fill={accent} />
      <circle cx="260" cy="200" r="5" fill={accent} />

      <text x="180" y="246" fontSize="11" fill={muted} textAnchor="middle">
        重なっている区間に入る整数は、いくつある？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列6 Step 1：原点から等距離の2点。
 * 距離の値や座標は書かず、「いくつあるか」を問う。
 */
export function QuadPmStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const y = 120;
  const Ox = 180;
  const d = 90;
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="原点から等距離にある2点の数直線。値は書かない"
    >
      <text x="180" y="36" fontSize="12" fill={muted} textAnchor="middle">
        2乗して同じ数になる点
      </text>

      <line x1="30" y1={y} x2="330" y2={y} stroke={muted} strokeWidth="1.2" />
      <path d="M 320 114 L 332 120 L 320 126" fill="none" stroke={muted} strokeWidth="1.2" />

      <circle cx={Ox} cy={y} r="3" fill={muted} />
      <text x={Ox} y={y + 22} fontSize="12" fill={muted} textAnchor="middle">
        0
      </text>

      <circle cx={Ox - d} cy={y} r="6" fill={accent} />
      <circle cx={Ox + d} cy={y} r="6" fill={accent} />
      <path
        d={`M ${Ox - d} ${y - 18} A ${d} ${d * 0.35} 0 0 1 ${Ox + d} ${y - 18}`}
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="5,4"
      />
      <text x={Ox} y={y - 36} fontSize="11" fill={accent} textAnchor="middle">
        同じ距離
      </text>

      <text x={Ox - d} y={y + 36} fontSize="14" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>
      <text x={Ox + d} y={y + 36} fontSize="14" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="180" y="206" fontSize="11" fill={muted} textAnchor="middle">
        原点から同じ距離の点は、いくつある？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列6 Step 4：1本の2次方程式が2本の1次方程式に分岐する図。
 * α, β は文字のまま残し、具体値は書かない。
 */
export function QuadSplitStep4() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="2次方程式が2本の1次方程式に分かれる図。アルファとベータは文字のまま"
    >
      <rect x="90" y="28" width="180" height="40" rx="8" fill={fillColor} stroke={stroke} strokeWidth="1.3" />
      <text x="180" y="54" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        (x − α)(x − β) = 0
      </text>

      <path d="M 140 72 L 100 110" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 108 104 L 98 112 L 112 112" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 220 72 L 260 110" fill="none" stroke={accent} strokeWidth="1.4" />
      <path d="M 248 112 L 262 112 L 252 104" fill="none" stroke={accent} strokeWidth="1.4" />

      <rect x="40" y="120" width="120" height="40" rx="8" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="100" y="146" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        x − α = 0
      </text>
      <rect x="200" y="120" width="120" height="40" rx="8" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="260" y="146" fontSize="14" fill={stroke} textAnchor="middle" fontStyle="italic">
        x − β = 0
      </text>

      <text x="180" y="188" fontSize="12" fill={muted} textAnchor="middle">
        積が 0 ⇒ どちらかが 0
      </text>

      <text x="180" y="226" fontSize="11" fill={muted} textAnchor="middle">
        1本の2次方程式は、何本の1次方程式に分かれる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列7 Step 1：面積の切り貼りで平方完成のイメージ。
 * 足りない角に足す値は書かず、「？」のまま問いで終える。
 */
export function CompleteSquareArea() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const sideFill = "color-mix(in oklch, var(--foreground) 5%, transparent)";
  return (
    <svg
      viewBox="0 0 360 270"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="平方完成の面積図。足りない角に足す値は書かない"
    >
      <rect x="70" y="40" width="120" height="120" fill={fillColor} stroke={stroke} strokeWidth="1.3" />
      <text x="130" y="108" fontSize="18" fill={stroke} textAnchor="middle" fontStyle="italic">
        x²
      </text>

      <rect x="190" y="40" width="50" height="120" fill={sideFill} stroke={stroke} strokeWidth="1.2" />
      <text x="215" y="108" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        (b/2)x
      </text>
      <rect x="70" y="160" width="120" height="50" fill={sideFill} stroke={stroke} strokeWidth="1.2" />
      <text x="130" y="190" fontSize="12" fill={muted} textAnchor="middle" fontStyle="italic">
        (b/2)x
      </text>

      <rect
        x="190"
        y="160"
        width="50"
        height="50"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="5,3"
      />
      <text x="215" y="190" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="130" y="32" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        x
      </text>
      <text x="215" y="32" fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
        b/2
      </text>

      <text x="180" y="246" fontSize="11" fill={muted} textAnchor="middle">
        正方形に足りない角には、何を足せばよい？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列7 Step 5：一般形→平方完成→基本形→解 の帰着チャート。
 * 矢印と段階名だけ示し、具体値は書かない。
 */
export function ReductionChart() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const boxes = [
    { y: 28, label: "一般形", sub: "ax² + bx + c = 0" },
    { y: 84, label: "平方完成", sub: "(x + □)² = …" },
    { y: 140, label: "基本形", sub: "□² = A" },
    { y: 196, label: "解", sub: "± …" },
  ];
  return (
    <svg
      viewBox="0 0 360 270"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="一般形から解への帰着チャート。矢印だけ示し値は書かない"
    >
      {boxes.map((b, idx) => (
        <g key={idx}>
          <rect
            x="90"
            y={b.y}
            width="180"
            height="42"
            rx="8"
            fill={idx === 2 ? fillColor : "none"}
            stroke={idx === 2 ? accent : stroke}
            strokeWidth={idx === 2 ? 1.5 : 1.2}
          />
          <text x="180" y={b.y + 18} fontSize="12" fill={idx === 2 ? accent : stroke} textAnchor="middle">
            {b.label}
          </text>
          <text x="180" y={b.y + 34} fontSize="11" fill={muted} textAnchor="middle" fontStyle="italic">
            {b.sub}
          </text>
          {idx < boxes.length - 1 && (
            <>
              <path d={`M 180 ${b.y + 42} L 180 ${b.y + 54}`} fill="none" stroke={muted} strokeWidth="1.2" />
              <path
                d={`M 174 ${b.y + 48} L 180 ${b.y + 56} L 186 ${b.y + 48}`}
                fill="none"
                stroke={muted}
                strokeWidth="1.2"
              />
            </>
          )}
        </g>
      ))}

      <text x="180" y="258" fontSize="11" fill={muted} textAnchor="middle">
        どこまで帰着すれば、既知の問いに落ちる？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列8 Step 1：解の公式からルートの中だけを枠で囲って取り出す。
 * 符号の場合分け（Dの正負）は書かない。
 */
export function DiscriminantExtract() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="解の公式からルートの中だけを枠で囲った図。場合分けは書かない"
    >
      <text x="180" y="36" fontSize="12" fill={muted} textAnchor="middle">
        解の公式
      </text>

      <text x="70" y="100" fontSize="18" fill={stroke} textAnchor="middle" fontStyle="italic">
        x =
      </text>
      <text x="118" y="84" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic">
        −b ± √
      </text>
      <rect x="168" y="62" width="96" height="32" rx="6" fill={fillColor} stroke={accent} strokeWidth="1.6" />
      <text x="216" y="84" fontSize="15" fill={accent} textAnchor="middle" fontStyle="italic" fontWeight="700">
        b² − 4ac
      </text>
      <line x1="110" y1="96" x2="280" y2="96" stroke={stroke} strokeWidth="1.2" />
      <text x="195" y="118" fontSize="16" fill={stroke} textAnchor="middle" fontStyle="italic">
        2a
      </text>

      <path d="M 216 96 L 216 150" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M 210 142 L 216 152 L 222 142" fill="none" stroke={accent} strokeWidth="1.3" />
      <text x="216" y="172" fontSize="12" fill={accent} textAnchor="middle">
        ここだけ取り出す
      </text>

      <text x="180" y="212" fontSize="11" fill={muted} textAnchor="middle">
        解の個数を決めているのは、どの部分？
      </text>
    </svg>
  );
}

/**
 * 数と式 系列8 Step 5：放物線と x 軸の交わり方3通り。
 * D>0 / D=0 / D<0 のラベルだけ置き、交点の値は書かない。
 */
export function DiscriminantThreeCases() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const axisY = 95;
  const panels = [
    {
      x: 20,
      label: "D > 0",
      // 下に開く放物線が x 軸を2点で切る
      path: `M 28 55 Q 70 145 112 55`,
      dots: [48, 92],
      note: "2点",
    },
    {
      x: 130,
      label: "D = 0",
      // 頂点で x 軸に接する
      path: `M 138 55 Q 180 ${axisY + 2} 222 55`,
      dots: [180],
      note: "接する",
    },
    {
      x: 240,
      label: "D < 0",
      // x 軸の上側だけで交わらない
      path: "M 248 50 Q 290 78 332 50",
      dots: [],
      note: "交わらない",
    },
  ];
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="判別式の符号による放物線とx軸の交わり方3通り。交点の値は書かない"
    >
      {panels.map((p, idx) => (
        <g key={idx}>
          <text x={p.x + 50} y="28" fontSize="12" fill={idx === 1 ? accent : muted} textAnchor="middle">
            {p.label}
          </text>
          <line x1={p.x + 8} y1={axisY} x2={p.x + 92} y2={axisY} stroke={muted} strokeWidth="1" />
          <path d={p.path} fill="none" stroke={stroke} strokeWidth="1.5" />
          {p.dots.map((dx, j) => (
            <circle key={j} cx={dx} cy={axisY} r="4" fill={accent} />
          ))}
          <text x={p.x + 50} y="130" fontSize="11" fill={muted} textAnchor="middle">
            {p.note}
          </text>
        </g>
      ))}

      <text x="180" y="168" fontSize="12" fill={muted} textAnchor="middle">
        交点の個数だけ見る
      </text>
      <text x="180" y="206" fontSize="11" fill={muted} textAnchor="middle">
        D = 0 のとき、解はいくつあると考える？
      </text>
    </svg>
  );
}

/**
 * 関数とグラフ 系列1 Step 1：入力→関数箱→出力の対応図。
 * 出力の具体値は書かず、「ただ1つ？」の問いで終える。
 */

/** 系列2 step1：a の符号と開き（目盛り値なし）。 */
export function ParabolaOpeningBundle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" style={{ maxWidth: 360 }} role="img" aria-label="下に凸と上に凸の放物線。目盛り値は書かない">
      <text x="90" y="24" fontSize="12" fill={muted} textAnchor="middle">a &gt; 0</text>
      <line x1="30" y1="150" x2="150" y2="150" stroke={muted} strokeWidth="1" />
      <line x1="90" y1="170" x2="90" y2="40" stroke={muted} strokeWidth="1" />
      <path d="M 40 60 Q 90 170 140 60" fill="none" stroke={accent} strokeWidth="2" />
      <text x="270" y="24" fontSize="12" fill={muted} textAnchor="middle">a &lt; 0</text>
      <line x1="210" y1="80" x2="330" y2="80" stroke={muted} strokeWidth="1" />
      <line x1="270" y1="170" x2="270" y2="40" stroke={muted} strokeWidth="1" />
      <path d="M 220 150 Q 270 40 320 150" fill="none" stroke={stroke} strokeWidth="2" />
      <text x="180" y="192" fontSize="11" fill={muted} textAnchor="middle">開きの向きは a の符号だけが決める</text>
    </svg>
  );
}

/** 系列2 step5：平行移動＝値が遅れて現れる模式（数値空欄）。 */
export function TranslateDelay() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" style={{ maxWidth: 360 }} role="img" aria-label="x を x-p に置き換えると値が遅れて現れる模式。数値は空欄">
      <text x="180" y="28" fontSize="12" fill={muted} textAnchor="middle">x → x − p のとき、同じ高さは右へずれる</text>
      <rect x="40" y="50" width="100" height="70" rx="8" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="90" y="78" fontSize="12" fill={stroke} textAnchor="middle">もとの式</text>
      <text x="90" y="100" fontSize="11" fill={muted} textAnchor="middle">x = □ で y = □</text>
      <path d="M 150 85 L 200 85" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M 190 79 L 200 85 L 190 91" fill="none" stroke={accent} strokeWidth="1.5" />
      <rect x="210" y="50" width="110" height="70" rx="8" fill="color-mix(in oklch, var(--accent) 6%, transparent)" stroke={accent} strokeWidth="1.3" />
      <text x="265" y="78" fontSize="12" fill={stroke} textAnchor="middle">置き換え後</text>
      <text x="265" y="100" fontSize="11" fill={muted} textAnchor="middle">同じ y は x = □+p</text>
      <text x="180" y="150" fontSize="11" fill={muted} textAnchor="middle">「1を引いたら −1 移動」ではない——遅延</text>
    </svg>
  );
}

/** 系列2/3：標準形の頂点（座標値なし）。 */
export function StandardFormVertex() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="上に凸の放物線と頂点。座標値は書かない">
      <line x1="40" y1="120" x2="260" y2="120" stroke={muted} strokeWidth="1" />
      <line x1="150" y1="180" x2="150" y2="30" stroke={muted} strokeWidth="1" />
      <path d="M 60 160 Q 150 40 240 160" fill="none" stroke={accent} strokeWidth="2.2" />
      <circle cx="150" cy="55" r="4.5" fill={accent} />
      <text x="168" y="52" fontSize="12" fill={stroke}>頂点</text>
      <line x1="150" y1="55" x2="150" y2="160" stroke={stroke} strokeWidth="1" strokeDasharray="3,3" />
      <text x="150" y="190" fontSize="11" fill={muted} textAnchor="middle">y = a(x − p)² + q —— 頂点はどこ？</text>
    </svg>
  );
}

/** 系列3 step1：一般形→標準形の矢印（係数は文字）。 */
export function GeneralToStandard() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 360 140" className="w-full h-auto" style={{ maxWidth: 360 }} role="img" aria-label="一般形から標準形への矢印。係数は文字のまま">
      <rect x="20" y="35" width="130" height="60" rx="8" fill="none" stroke={stroke} strokeWidth="1.3" />
      <text x="85" y="60" fontSize="12" fill={stroke} textAnchor="middle">一般形</text>
      <text x="85" y="80" fontSize="11" fill={muted} textAnchor="middle">ax²+bx+c</text>
      <path d="M 160 65 L 210 65" fill="none" stroke={accent} strokeWidth="1.6" />
      <path d="M 200 59 L 210 65 L 200 71" fill="none" stroke={accent} strokeWidth="1.6" />
      <text x="185" y="52" fontSize="10" fill={accent} textAnchor="middle">平方完成</text>
      <rect x="220" y="35" width="120" height="60" rx="8" fill="color-mix(in oklch, var(--accent) 6%, transparent)" stroke={accent} strokeWidth="1.3" />
      <text x="280" y="60" fontSize="12" fill={stroke} textAnchor="middle">標準形</text>
      <text x="280" y="80" fontSize="11" fill={muted} textAnchor="middle">a(x−p)²+q</text>
      <text x="180" y="122" fontSize="11" fill={muted} textAnchor="middle">代数の帰着は、幾何の読み取りになる</text>
    </svg>
  );
}

/** 系列4：変域で切った放物線（最小／最大）。 */
export function DomainWindowMin() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="変域で切り取った下に凸の放物線。最小の位置は問いかけるのみ">
      <line x1="40" y1="150" x2="260" y2="150" stroke={muted} strokeWidth="1" />
      <line x1="80" y1="180" x2="80" y2="30" stroke={muted} strokeWidth="1" />
      <path d="M 50 40 Q 150 170 250 40" fill="none" stroke={stroke} strokeWidth="1.4" strokeDasharray="4,3" />
      <path d="M 100 95 Q 150 155 200 95" fill="none" stroke={accent} strokeWidth="2.4" />
      <circle cx="100" cy="95" r="3.5" fill={accent} />
      <circle cx="200" cy="95" r="3.5" fill={accent} />
      <line x1="100" y1="30" x2="100" y2="160" stroke={muted} strokeWidth="1" strokeDasharray="2,2" />
      <line x1="200" y1="30" x2="200" y2="160" stroke={muted} strokeWidth="1" strokeDasharray="2,2" />
      <text x="150" y="190" fontSize="11" fill={muted} textAnchor="middle">窓の中——最小はどこ？</text>
    </svg>
  );
}

export function DomainWindowMax() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="変域で切り取った上に凸の放物線。最大の位置は問いかけるのみ">
      <line x1="40" y1="150" x2="260" y2="150" stroke={muted} strokeWidth="1" />
      <line x1="80" y1="180" x2="80" y2="30" stroke={muted} strokeWidth="1" />
      <path d="M 50 170 Q 150 30 250 170" fill="none" stroke={stroke} strokeWidth="1.4" strokeDasharray="4,3" />
      <path d="M 110 120 Q 150 55 190 120" fill="none" stroke={accent} strokeWidth="2.4" />
      <circle cx="110" cy="120" r="3.5" fill={accent} />
      <circle cx="190" cy="120" r="3.5" fill={accent} />
      <text x="150" y="190" fontSize="11" fill={muted} textAnchor="middle">上に凸の窓——最大はどこ？</text>
    </svg>
  );
}

/** 系列5 step1：f(□) の穴あき表記。 */
export function FNotationHole() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 140" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="f のかっこに穴。代入結果は書かない">
      <text x="150" y="55" fontSize="28" fill={stroke} textAnchor="middle" fontFamily="serif">f (</text>
      <rect x="168" y="32" width="36" height="36" rx="6" fill="none" stroke={accent} strokeWidth="1.8" strokeDasharray="4,3" />
      <text x="210" y="55" fontSize="28" fill={stroke} textAnchor="middle" fontFamily="serif">) = ?</text>
      <text x="150" y="100" fontSize="12" fill={muted} textAnchor="middle">かっこ内の数を、式の x の場所へ</text>
      <text x="150" y="122" fontSize="11" fill={muted} textAnchor="middle">出てくる値は書かない——名前をつけただけ</text>
    </svg>
  );
}

/** 系列5 step5：長方形と辺の制約。 */
export function RectConstraint() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 180" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="長方形の辺に x と空欄。数値なし">
      <rect x="70" y="40" width="160" height="90" fill="color-mix(in oklch, var(--accent) 6%, transparent)" stroke={stroke} strokeWidth="1.5" />
      <text x="150" y="95" fontSize="13" fill={stroke} textAnchor="middle">面積 f(x)</text>
      <text x="150" y="30" fontSize="12" fill={accent} textAnchor="middle">x</text>
      <text x="248" y="90" fontSize="12" fill={accent}>□</text>
      <text x="150" y="155" fontSize="11" fill={muted} textAnchor="middle">辺の長さは正？——それが変域</text>
    </svg>
  );
}

/** 系列5 step9：放物線と内接長方形（座標なし）。 */
export function InscribedRect() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="放物線と内接長方形。座標値なし">
      <line x1="40" y1="160" x2="260" y2="160" stroke={muted} strokeWidth="1" />
      <line x1="150" y1="180" x2="150" y2="30" stroke={muted} strokeWidth="1" />
      <path d="M 60 160 Q 150 40 240 160" fill="none" stroke={stroke} strokeWidth="1.8" />
      <rect x="110" y="100" width="80" height="60" fill="color-mix(in oklch, var(--accent) 8%, transparent)" stroke={accent} strokeWidth="1.6" />
      <text x="150" y="130" fontSize="11" fill={accent} textAnchor="middle">t</text>
      <text x="150" y="192" fontSize="11" fill={muted} textAnchor="middle">独立変数は t —— 放物線の x と混同しない</text>
    </svg>
  );
}

/** 系列6：3形対応チャート（具体式なし）。 */
export function ThreeFormsChart() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const boxes = [
    { x: 20, title: "一般形", part: "y 切片" },
    { x: 125, title: "標準形", part: "頂点" },
    { x: 230, title: "因数分解形", part: "x 切片" },
  ];
  return (
    <svg viewBox="0 0 360 150" className="w-full h-auto" style={{ maxWidth: 360 }} role="img" aria-label="3つの形と読める部品。具体式なし">
      {boxes.map((b) => (
        <g key={b.title}>
          <rect x={b.x} y={30} width={100} height={70} rx="8" fill="none" stroke={stroke} strokeWidth="1.3" />
          <text x={b.x + 50} y={58} fontSize="12" fill={stroke} textAnchor="middle">{b.title}</text>
          <text x={b.x + 50} y={82} fontSize="12" fill={accent} textAnchor="middle">{b.part}</text>
        </g>
      ))}
      <text x="180" y="130" fontSize="11" fill={muted} textAnchor="middle">目的が形を選ばせる——同じ放物線の顔</text>
    </svg>
  );
}

/** 系列7 step1：符号チャート（境界は N）。 */
export function QuadIneqSign() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 360 160" className="w-full h-auto" style={{ maxWidth: 360 }} role="img" aria-label="放物線と x 軸。境界は N。答えの範囲は書かない">
      <line x1="40" y1="100" x2="320" y2="100" stroke={muted} strokeWidth="1" />
      <line x1="60" y1="140" x2="60" y2="30" stroke={muted} strokeWidth="1" />
      <path d="M 70 40 Q 180 160 290 40" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="130" cy="100" r="4" fill={stroke} />
      <circle cx="230" cy="100" r="4" fill={stroke} />
      <text x="130" y="120" fontSize="12" fill={stroke} textAnchor="middle">N₁</text>
      <text x="230" y="120" fontSize="12" fill={stroke} textAnchor="middle">N₂</text>
      <text x="90" y="55" fontSize="11" fill={muted} textAnchor="middle">上？</text>
      <text x="180" y="145" fontSize="11" fill={muted} textAnchor="middle">下？</text>
      <text x="270" y="55" fontSize="11" fill={muted} textAnchor="middle">上？</text>
      <text x="180" y="20" fontSize="11" fill={muted} textAnchor="middle">答えは点ではなく範囲</text>
    </svg>
  );
}

/** 系列7 step7：交わらない上側。 */
export function AlwaysAbove() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 300 180" className="w-full h-auto" style={{ maxWidth: 300 }} role="img" aria-label="x 軸より上で交わらない放物線。頂点座標なし">
      <line x1="40" y1="140" x2="260" y2="140" stroke={muted} strokeWidth="1" />
      <line x1="80" y1="160" x2="80" y2="30" stroke={muted} strokeWidth="1" />
      <path d="M 60 50 Q 150 120 240 50" fill="none" stroke={accent} strokeWidth="2.2" />
      <text x="150" y="170" fontSize="11" fill={muted} textAnchor="middle">交わらない・常に上 → すべての実数？</text>
    </svg>
  );
}

/** 系列8 step7：正根の失敗例2枚。 */
export function ParamRootFail() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" style={{ maxWidth: 360 }} role="img" aria-label="正の2実数根の失敗例2枚。座標値なし">
      <text x="90" y="24" fontSize="11" fill={muted} textAnchor="middle">失敗① 頂点が左</text>
      <line x1="30" y1="120" x2="150" y2="120" stroke={muted} strokeWidth="1" />
      <line x1="90" y1="160" x2="90" y2="40" stroke={muted} strokeWidth="1" />
      <path d="M 40 60 Q 70 150 140 70" fill="none" stroke={stroke} strokeWidth="1.8" />
      <circle cx="55" cy="120" r="3" fill={accent} />
      <circle cx="120" cy="120" r="3" fill={accent} />
      <text x="270" y="24" fontSize="11" fill={muted} textAnchor="middle">失敗② 切片が非正</text>
      <line x1="210" y1="120" x2="330" y2="120" stroke={muted} strokeWidth="1" />
      <line x1="240" y1="160" x2="240" y2="40" stroke={muted} strokeWidth="1" />
      <path d="M 220 80 Q 280 160 320 50" fill="none" stroke={stroke} strokeWidth="1.8" />
      <circle cx="255" cy="120" r="3" fill={accent} />
      <circle cx="305" cy="120" r="3" fill={accent} />
      <text x="180" y="185" fontSize="11" fill={muted} textAnchor="middle">D&gt;0 だけでは足りない——3条件のチェック</text>
    </svg>
  );
}

export function FuncBoxStep1() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  return (
    <svg
      viewBox="0 0 360 180"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="x を入れると y がただ1つ出てくる関数の箱。出力の値は書かない"
    >
      <text x="48" y="78" fontSize="14" fill={stroke} textAnchor="middle">
        x
      </text>
      <path d="M 68 72 L 118 72" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M 108 66 L 118 72 L 108 78" fill="none" stroke={accent} strokeWidth="1.5" />

      <rect x="122" y="40" width="116" height="64" rx="10" fill={fillColor} stroke={stroke} strokeWidth="1.4" />
      <text x="180" y="68" fontSize="13" fill={stroke} textAnchor="middle">
        関数
      </text>
      <text x="180" y="88" fontSize="11" fill={muted} textAnchor="middle">
        y = ⋯
      </text>

      <path d="M 242 72 L 292 72" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M 282 66 L 292 72 L 282 78" fill="none" stroke={accent} strokeWidth="1.5" />
      <text x="318" y="78" fontSize="14" fill={stroke} textAnchor="middle">
        y
      </text>
      <text x="318" y="98" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
        ?
      </text>

      <text x="180" y="140" fontSize="12" fill={muted} textAnchor="middle">
        1回の入力に対して、出てくる y はいくつ？
      </text>
      <text x="180" y="162" fontSize="11" fill={muted} textAnchor="middle">
        「ただ1つ」とは、何を禁じている？
      </text>
    </svg>
  );
}

/**
 * 関数とグラフ 系列1 Step 5/9：上り坂／下り坂と変域の端。
 * 端点の座標値は書かず、「最大はどちらの端？」で終える。
 */
export function LinearSlopeDomain() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="傾きが正の直線と負の直線。変域の両端に点だけ置き、値は書かない"
    >
      {/* 左：上り坂 */}
      <text x="90" y="28" fontSize="12" fill={muted} textAnchor="middle">
        傾き &gt; 0
      </text>
      <line x1="30" y1="150" x2="150" y2="150" stroke={muted} strokeWidth="1" />
      <line x1="40" y1="170" x2="40" y2="50" stroke={muted} strokeWidth="1" />
      <line
        x1="50"
        y1="140"
        x2="140"
        y2="70"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      <line x1="70" y1="124" x2="120" y2="86" stroke={accent} strokeWidth="2.2" />
      <circle cx="70" cy="124" r="4" fill={accent} />
      <circle cx="120" cy="86" r="4" fill={accent} />
      <text x="90" y="190" fontSize="11" fill={muted} textAnchor="middle">
        変域の端だけ実線
      </text>

      {/* 右：下り坂 */}
      <text x="270" y="28" fontSize="12" fill={muted} textAnchor="middle">
        傾き &lt; 0
      </text>
      <line x1="210" y1="150" x2="330" y2="150" stroke={muted} strokeWidth="1" />
      <line x1="220" y1="170" x2="220" y2="50" stroke={muted} strokeWidth="1" />
      <line
        x1="230"
        y1="70"
        x2="320"
        y2="140"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      <line x1="250" y1="86" x2="300" y2="124" stroke={accent} strokeWidth="2.2" />
      <circle cx="250" cy="86" r="4" fill={accent} />
      <circle cx="300" cy="124" r="4" fill={accent} />
      <text x="270" y="190" fontSize="11" fill={muted} textAnchor="middle">
        高い端はどちら？
      </text>

      <text x="180" y="212" fontSize="11" fill={muted} textAnchor="middle">
        最大はどちらの端？——傾きの符号が決める
      </text>
    </svg>
  );
}

/**
 * 段落全体が 1 つ以上の $$...$$ ディスプレイ数式だけなら、各ブロックの中身を返す。
 * 空行なしで $$ が連続したときに貪欲マッチで壊れるのを防ぐ（非貪欲で逐次抽出）。
 * 数式以外の文字が混ざる段落では null。
 */
function extractDisplayMathBlocks(trimmed: string): string[] | null {
  const re = /\$\$([\s\S]+?)\$\$/g;
  const blocks: string[] = [];
  let lastEnd = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(trimmed)) !== null) {
    if (trimmed.slice(lastEnd, match.index).trim() !== "") {
      return null;
    }
    blocks.push(match[1].trim());
    lastEnd = match.index + match[0].length;
  }
  if (blocks.length === 0) return null;
  if (trimmed.slice(lastEnd).trim() !== "") return null;
  return blocks;
}

/**
 * 複数段落・ディスプレイ数式を含むテキストを KaTeX で描画する。
 *
 * 「公式の景色」のような導出説明用：
 * - 段落は空行で区切る
 * - $$...$$ だけの行は BlockMath（中央寄せのディスプレイ数式）
 * - 空行なしで $$...$$ が連続しても、各ブロックを個別に描画する
 * - <<PARABOLA_UP>> のような特殊マーカーは対応する図に置き換える
 * - markdown 風の表（| col | col | / |---|---|）は <table> に変換
 * - 段落内の $...$ は InlineMath
 */
export function MathBody({ text }: { text: string }) {
  // 段落分割（空行区切り）
  const paragraphs = text.split(/\n\s*\n/);
  return (
    <>
      {paragraphs.map((p, i) => {
        const trimmed = p.trim();
        // 特殊マーカー：図
        if (trimmed === "<<PARABOLA_UP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParabolaUp />
            </div>
          );
        }
        if (trimmed === "<<CUBOID>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CuboidIsometric />
            </div>
          );
        }
        if (trimmed === "<<CONGRUENCE_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CongruenceStep1 />
            </div>
          );
        }
        if (trimmed === "<<CONGRUENCE_STEP7>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CongruenceStep7 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionStep1 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_STEP5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionStep5 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_PURE_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionPureStep1 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_PURE_STEP7>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionPureStep7 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_ROUNDING_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionRoundingStep1 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_REMAINDER_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionRemainderStep1 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_ALGORITHM_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionAlgorithmStep1 />
            </div>
          );
        }
        if (trimmed === "<<DECIMAL_DIV_ALGORITHM_STEP7>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DecimalDivisionAlgorithmStep7 />
            </div>
          );
        }
        if (trimmed === "<<POINT_LINE_DIST>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <PointLineDistance />
            </div>
          );
        }
        if (trimmed === "<<POINT_LINE_DEVIATION>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <PointLineDeviation />
            </div>
          );
        }
        if (trimmed === "<<TANGENT_SCALE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TangentScale />
            </div>
          );
        }
        if (trimmed === "<<TRIG_SIMILAR_MEASURE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigSimilarMeasure />
            </div>
          );
        }
        if (trimmed === "<<TRIG_TAN_REORIENT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigTanReorient />
            </div>
          );
        }
        if (trimmed === "<<TRIG_HYP_UNKNOWN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigHypUnknown />
            </div>
          );
        }
        if (trimmed === "<<TRIG_EQUILATERAL_HALF>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigEquilateralHalf />
            </div>
          );
        }
        if (trimmed === "<<TRIG_ACUTE_ALTITUDE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigAcuteAltitude />
            </div>
          );
        }
        if (trimmed === "<<TRIG_UNIT_SEMI>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigUnitSemi />
            </div>
          );
        }
        if (trimmed === "<<TRIG_OBTUSE_TRIANGLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigObtuseTriangle />
            </div>
          );
        }
        if (trimmed === "<<TRIG_SSS_TRIANGLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigSssTriangle />
            </div>
          );
        }
        if (trimmed === "<<TRIG_CIRCUM_TRIANGLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigCircumTriangle />
            </div>
          );
        }
        if (trimmed === "<<GEO_PARA_RATIO>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <GeoParallelRatio />
            </div>
          );
        }
        if (trimmed === "<<GEO_BISECTOR>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <GeoAngleBisector />
            </div>
          );
        }
        if (trimmed === "<<GEO_BISECTOR_EXT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <GeoAngleBisectorExt />
            </div>
          );
        }
        if (trimmed === "<<TRIG_TABLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigTable />
            </div>
          );
        }
        if (trimmed === "<<RIVER_WIDTH>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RiverWidthMeasure />
            </div>
          );
        }
        if (trimmed === "<<TANGENT_DEF>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TangentDefinition />
            </div>
          );
        }
        if (trimmed === "<<SLOPE_COMPARE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SlopeAngleCompare />
            </div>
          );
        }
        if (trimmed === "<<RIGHT_TRIANGLE_ANATOMY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RightTriangleAnatomy />
            </div>
          );
        }
        if (trimmed === "<<PYTHAGORAS_PROOF>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <PythagorasProof />
            </div>
          );
        }
        if (trimmed === "<<EXPANSION_SQUARE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpansionSquare />
            </div>
          );
        }
        if (trimmed === "<<SQUARE_DIAGONAL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SquareDiagonal />
            </div>
          );
        }
        if (trimmed === "<<TRIANGLE_AREA_DIST>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TriangleAreaByDistance />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_AROUND_ORIGIN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleAroundOrigin />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_AROUND_CENTER>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleAroundCenter />
            </div>
          );
        }
        if (trimmed === "<<DIAMETER_CIRCLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DiameterCircle />
            </div>
          );
        }
        if (trimmed === "<<COMPLETE_SQUARE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CompleteSquareVisual />
            </div>
          );
        }
        if (trimmed === "<<PARABOLA_WITH_LABELS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParabolaWithLabels />
            </div>
          );
        }
        if (trimmed === "<<LINE_SLOPE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LineSlope />
            </div>
          );
        }
        if (trimmed === "<<UNIT_TRIANGLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <UnitTriangleSinCos />
            </div>
          );
        }
        if (trimmed === "<<UNIT_CIRCLE_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <UnitCircleStep1 />
            </div>
          );
        }
        if (trimmed === "<<UNIT_CIRCLE_Q2>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <UnitCircleQ2 />
            </div>
          );
        }
        if (trimmed === "<<UNIT_CIRCLE_TAN_LINE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <UnitCircleTanLine />
            </div>
          );
        }
        if (trimmed === "<<UNIT_CIRCLE_ARC>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <UnitCircleArc />
            </div>
          );
        }
        if (trimmed === "<<UNIT_CIRCLE_IDENTITY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <UnitCircleIdentity />
            </div>
          );
        }
        if (trimmed === "<<TRIG_CIRCLE_TO_WAVE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigCircleToWave />
            </div>
          );
        }
        if (trimmed === "<<TRIG_WAVE_PHASE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigWavePhase />
            </div>
          );
        }
        if (trimmed === "<<TRIG_WAVE_READING>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigWaveReading />
            </div>
          );
        }
        if (trimmed === "<<TRIG_TAN_GRAPH>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigTanGraph />
            </div>
          );
        }
        if (trimmed === "<<TRIG_SYMMETRY_Y_AXIS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigSymmetryYAxis />
            </div>
          );
        }
        if (trimmed === "<<TRIG_SYMMETRY_DIAGONAL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigSymmetryDiagonal />
            </div>
          );
        }
        if (trimmed === "<<TRIG_ANGLE_SUM>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigAngleSum />
            </div>
          );
        }
        if (trimmed === "<<TRIG_LINES_ANGLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigLinesAngle />
            </div>
          );
        }
        if (trimmed === "<<TRIG_DOUBLE_ANGLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigDoubleAngle />
            </div>
          );
        }
        if (trimmed === "<<TRIG_COMPOSITION_POINT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigCompositionPoint />
            </div>
          );
        }
        if (trimmed === "<<TRIG_COMPOSITION_POINT_Q2>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TrigCompositionPointQ2 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleStep1 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleStep6 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_STEP7>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleStep7 />
            </div>
          );
        }
        if (trimmed === "<<LINE_DIST_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LineDistanceStep1 />
            </div>
          );
        }
        if (trimmed === "<<PYTHAGORAS_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <PythagorasStep1 />
            </div>
          );
        }
        if (trimmed === "<<PYTHAGORAS_STEP5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <PythagorasStep5 />
            </div>
          );
        }
        if (trimmed === "<<TWO_POINTS_LINE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TwoPointsLineStep1 />
            </div>
          );
        }
        if (trimmed === "<<MIDPOINT_STEP7>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <MidpointStep7 />
            </div>
          );
        }
        if (trimmed === "<<PERP_STEP9>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <PerpendicularStep9 />
            </div>
          );
        }
        if (trimmed === "<<PARABOLA_MIN_STEP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParabolaMinStep1 />
            </div>
          );
        }
        if (trimmed === "<<PARABOLA_SYMMETRY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParabolaSymmetryStep1 />
            </div>
          );
        }
        if (trimmed === "<<PARABOLA_VERTEX_3_5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParabolaVertexStep9 />
            </div>
          );
        }
        if (trimmed === "<<EXP_GROWTH>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpGrowth />
            </div>
          );
        }
        if (trimmed === "<<EXP_LOG_MIRROR>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpLogMirror />
            </div>
          );
        }
        if (trimmed === "<<LOG_NEG_MISS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogNegMiss />
            </div>
          );
        }
        if (trimmed === "<<LOG_AXIS_ADD>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogAxisAdd />
            </div>
          );
        }
        if (trimmed === "<<LOG_BASE_MIX>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogBaseMix />
            </div>
          );
        }
        if (trimmed === "<<NUMLINE_DIST>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumLineDistance />
            </div>
          );
        }
        if (trimmed === "<<NUMLINE_MID>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumLineMidpoint />
            </div>
          );
        }
        if (trimmed === "<<NUMLINE_INTERNAL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumLineInternal />
            </div>
          );
        }
        if (trimmed === "<<NUMLINE_EXTERNAL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumLineExternal />
            </div>
          );
        }
        if (trimmed === "<<NUMLINE_DIST_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumLineDistStep1 />
            </div>
          );
        }
        if (trimmed === "<<NUMLINE_EXT_STEP9>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumLineExtStep9 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_LINE_POSITIONS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleLinePositions />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_TANGENT_AT_POINT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleTangentAtPoint />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_TANGENT_FROM_EXTERNAL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleTangentFromExternal />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_TANGENT_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleTangentStep1 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_TANGENT_STEP8>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleTangentStep8 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_TANGENT_STEP9>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleTangentStep9 />
            </div>
          );
        }
        if (trimmed === "<<CIRCLE_TANGENT_STEP10>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CircleTangentStep10 />
            </div>
          );
        }
        if (trimmed === "<<BUNDLE_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <BundleStep1 />
            </div>
          );
        }
        if (trimmed === "<<BUNDLE_STEP5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <BundleStep5 />
            </div>
          );
        }
        if (trimmed === "<<BUNDLE_STEP8>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <BundleStep8 />
            </div>
          );
        }
        if (trimmed === "<<BUNDLE_STEP10>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <BundleStep10 />
            </div>
          );
        }
        if (trimmed === "<<COMPLEX_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ComplexStep1 />
            </div>
          );
        }
        if (trimmed === "<<COMPLEX_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ComplexStep4 />
            </div>
          );
        }
        if (trimmed === "<<COMPLEX_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ComplexStep6 />
            </div>
          );
        }
        if (trimmed === "<<COMPLEX_STEP8>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ComplexStep8 />
            </div>
          );
        }
        if (trimmed === "<<QUADRATIC_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <QuadraticStep1 />
            </div>
          );
        }
        if (trimmed === "<<QUADRATIC_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <QuadraticStep4 />
            </div>
          );
        }
        if (trimmed === "<<QUADRATIC_STEP5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <QuadraticStep5 />
            </div>
          );
        }
        if (trimmed === "<<FACTOR_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FactorStep1 />
            </div>
          );
        }
        if (trimmed === "<<FACTOR_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FactorStep4 />
            </div>
          );
        }
        if (trimmed === "<<FACTOR_STEP5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FactorStep5 />
            </div>
          );
        }
        if (trimmed === "<<VIETA_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <VietaStep1 />
            </div>
          );
        }
        if (trimmed === "<<VIETA_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <VietaStep4 />
            </div>
          );
        }
        if (trimmed === "<<VIETA_STEP5>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <VietaStep5 />
            </div>
          );
        }
        if (trimmed === "<<VIETA_STEP8>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <VietaStep8 />
            </div>
          );
        }
        if (trimmed === "<<REMAINDER_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RemainderStep1 />
            </div>
          );
        }
        if (trimmed === "<<REMAINDER_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RemainderStep4 />
            </div>
          );
        }
        if (trimmed === "<<REMAINDER_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RemainderStep6 />
            </div>
          );
        }
        if (trimmed === "<<REMAINDER_STEP9>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RemainderStep9 />
            </div>
          );
        }
        if (trimmed === "<<LOCUS_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LocusStep1 />
            </div>
          );
        }
        if (trimmed === "<<LOCUS_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LocusStep4 />
            </div>
          );
        }
        if (trimmed === "<<LOCUS_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LocusStep6 />
            </div>
          );
        }
        if (trimmed === "<<LOCUS_STEP8>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LocusStep8 />
            </div>
          );
        }
        if (trimmed === "<<PARAMETRIC_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParametricStep1 />
            </div>
          );
        }
        if (trimmed === "<<PARAMETRIC_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParametricStep4 />
            </div>
          );
        }
        if (trimmed === "<<PARAMETRIC_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParametricStep6 />
            </div>
          );
        }
        if (trimmed === "<<PARAMETRIC_STEP10>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParametricStep10 />
            </div>
          );
        }
        if (trimmed === "<<REGION_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RegionStep1 />
            </div>
          );
        }
        if (trimmed === "<<REGION_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RegionStep4 />
            </div>
          );
        }
        if (trimmed === "<<REGION_STEP8>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RegionStep8 />
            </div>
          );
        }
        if (trimmed === "<<REGION_STEP10>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RegionStep10 />
            </div>
          );
        }
        if (trimmed === "<<LP_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LPStep1 />
            </div>
          );
        }
        if (trimmed === "<<LP_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LPStep6 />
            </div>
          );
        }
        if (trimmed === "<<LP_STEP9>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LPStep9 />
            </div>
          );
        }
        if (trimmed === "<<LP_STEP10>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LPStep10 />
            </div>
          );
        }
        if (trimmed === "<<NUMBER_EXPANSION_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <NumberExpansionStep1 />
            </div>
          );
        }
        if (trimmed === "<<REPEATING_DECIMAL_STEP6>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RepeatingDecimalStep6 />
            </div>
          );
        }
        if (trimmed === "<<IRRATIONAL_DIAGONAL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <IrrationalDiagonal />
            </div>
          );
        }
        if (trimmed === "<<EXPONENT_COUNT_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExponentCountStep1 />
            </div>
          );
        }
        if (trimmed === "<<EXPONENT_ADD_VS_MUL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExponentAddVsMul />
            </div>
          );
        }
        if (trimmed === "<<EXP_ZERO_BLOCK>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpZeroBlock />
            </div>
          );
        }
        if (trimmed === "<<EXP_HALF_STEP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpHalfStep />
            </div>
          );
        }
        if (trimmed === "<<EXP_LIKE_TERMS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpLikeTerms />
            </div>
          );
        }
        if (trimmed === "<<EXP_GRAPH_INC>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpGraphInc />
            </div>
          );
        }
        if (trimmed === "<<EXP_GRAPH_BOTH>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpGraphBoth />
            </div>
          );
        }
        if (trimmed === "<<EXP_GRAPH_DOMAIN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpGraphDomain />
            </div>
          );
        }
        if (trimmed === "<<LOG_GRAPH_REFLECT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogGraphReflect />
            </div>
          );
        }
        if (trimmed === "<<LOG_GRAPH_DEC>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogGraphDec />
            </div>
          );
        }
        if (trimmed === "<<LOG_DOMAIN_LINE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogDomainLine />
            </div>
          );
        }
        if (trimmed === "<<LOG_T_BAND>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogTBand />
            </div>
          );
        }
        if (trimmed === "<<SCI_NOTATION_DIGITS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SciNotationDigits />
            </div>
          );
        }
        if (trimmed === "<<LOG10_SHOULDER>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <Log10Shoulder />
            </div>
          );
        }
        if (trimmed === "<<EXP_EQ_LINE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpEqLine />
            </div>
          );
        }
        if (trimmed === "<<EXP_INEQ_FLIP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpIneqFlip />
            </div>
          );
        }
        if (trimmed === "<<EXP_T_POS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpTPos />
            </div>
          );
        }
        if (trimmed === "<<EXP_T_PARABOLA>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpTParabola />
            </div>
          );
        }
        if (trimmed === "<<EXPAND_PIVOT_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpandPivotStep1 />
            </div>
          );
        }
        if (trimmed === "<<EXPAND_CANCEL_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ExpandCancelStep4 />
            </div>
          );
        }
        if (trimmed === "<<CHUNK_BOX>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ChunkBox />
            </div>
          );
        }
        if (trimmed === "<<FACTORING_ROUNDTRIP_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FactoringRoundtripStep1 />
            </div>
          );
        }
        if (trimmed === "<<FACTORING_SEARCH_TABLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FactoringSearchTable />
            </div>
          );
        }
        if (trimmed === "<<INEQ_BALANCE_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <IneqBalanceStep1 />
            </div>
          );
        }
        if (trimmed === "<<INEQ_NUMLINE_FLIP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <IneqNumlineFlip />
            </div>
          );
        }
        if (trimmed === "<<INEQ_NUMLINE_AND>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <IneqNumlineAnd />
            </div>
          );
        }
        if (trimmed === "<<QUAD_PM_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <QuadPmStep1 />
            </div>
          );
        }
        if (trimmed === "<<QUAD_SPLIT_STEP4>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <QuadSplitStep4 />
            </div>
          );
        }
        if (trimmed === "<<COMPLETE_SQUARE_AREA>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CompleteSquareArea />
            </div>
          );
        }
        if (trimmed === "<<REDUCTION_CHART>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ReductionChart />
            </div>
          );
        }
        if (trimmed === "<<DISCRIMINANT_EXTRACT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DiscriminantExtract />
            </div>
          );
        }
        if (trimmed === "<<DISCRIMINANT_THREE_CASES>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DiscriminantThreeCases />
            </div>
          );
        }
        if (trimmed === "<<FUNC_BOX_STEP1>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FuncBoxStep1 />
            </div>
          );
        }
        if (trimmed === "<<LINEAR_SLOPE_DOMAIN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LinearSlopeDomain />
            </div>
          );
        }
        if (trimmed === "<<PARABOLA_OPENING_BUNDLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParabolaOpeningBundle />
            </div>
          );
        }
        if (trimmed === "<<TRANSLATE_DELAY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <TranslateDelay />
            </div>
          );
        }
        if (trimmed === "<<STANDARD_FORM_VERTEX>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <StandardFormVertex />
            </div>
          );
        }
        if (trimmed === "<<GENERAL_TO_STANDARD>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <GeneralToStandard />
            </div>
          );
        }
        if (trimmed === "<<DOMAIN_WINDOW_MIN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DomainWindowMin />
            </div>
          );
        }
        if (trimmed === "<<DOMAIN_WINDOW_MAX>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DomainWindowMax />
            </div>
          );
        }
        if (trimmed === "<<F_NOTATION_HOLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <FNotationHole />
            </div>
          );
        }
        if (trimmed === "<<RECT_CONSTRAINT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <RectConstraint />
            </div>
          );
        }
        if (trimmed === "<<INSCRIBED_RECT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <InscribedRect />
            </div>
          );
        }
        if (trimmed === "<<THREE_FORMS_CHART>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ThreeFormsChart />
            </div>
          );
        }
        if (trimmed === "<<QUAD_INEQ_SIGN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <QuadIneqSign />
            </div>
          );
        }
        if (trimmed === "<<ALWAYS_ABOVE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <AlwaysAbove />
            </div>
          );
        }
        if (trimmed === "<<PARAM_ROOT_FAIL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ParamRootFail />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_LEX>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeLex />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_NORETURN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeNoReturn />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_PRODUCT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeProduct />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_SUM>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeSum />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_UNEVEN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeUneven />
            </div>
          );
        }
        if (trimmed === "<<COUNT_SEQ_GAP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountSeqGap />
            </div>
          );
        }
        if (trimmed === "<<COUNT_COMPLEMENT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountComplement />
            </div>
          );
        }
        if (trimmed === "<<PROB_GRAIN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbGrain />
            </div>
          );
        }
        if (trimmed === "<<PROB_COIN_SPLIT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbCoinSplit />
            </div>
          );
        }
        if (trimmed === "<<PROB_DICE_GRID>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbDiceGrid />
            </div>
          );
        }
        if (trimmed === "<<PROB_DISJOINT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbDisjoint />
            </div>
          );
        }
        if (trimmed === "<<PROB_AREA>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbArea />
            </div>
          );
        }
        if (trimmed === "<<PROB_TREE_WEIGHTED>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbTreeWeighted />
            </div>
          );
        }
        if (trimmed === "<<PROB_PATHS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbPaths />
            </div>
          );
        }
        if (trimmed === "<<PROB_PATHS_LAST>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbPathsLast />
            </div>
          );
        }
        if (trimmed === "<<PROB_SHRINK>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbShrink />
            </div>
          );
        }
        if (trimmed === "<<PROB_POSTERIOR>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbPosterior />
            </div>
          );
        }
        if (trimmed === "<<PROB_EXPECT_BALANCE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProbExpectBalance />
            </div>
          );
        }
        if (trimmed === "<<SET_MEMBERS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetMembers />
            </div>
          );
        }
        if (trimmed === "<<SET_SUBSET>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetSubset />
            </div>
          );
        }
        if (trimmed === "<<SET_SUBSET_BITS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetSubsetBits />
            </div>
          );
        }
        if (trimmed === "<<SET_VENN_THREE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetVennThree />
            </div>
          );
        }
        if (trimmed === "<<SET_DEMORGAN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetDeMorgan />
            </div>
          );
        }
        if (trimmed === "<<LOGIC_NUMLINE_GAP>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogicNumlineGap />
            </div>
          );
        }
        if (trimmed === "<<LOGIC_ARROW_ONEWAY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogicArrowOneway />
            </div>
          );
        }
        if (trimmed === "<<LOGIC_CHART>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogicChart />
            </div>
          );
        }
        if (trimmed === "<<SET_NECSUF>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetNecSuf />
            </div>
          );
        }
        if (trimmed === "<<SET_NECSUF_BREAK>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <SetNecSufBreak />
            </div>
          );
        }
        if (trimmed === "<<PROOF_PARITY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProofParity />
            </div>
          );
        }
        if (trimmed === "<<PROOF_LADDER>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <ProofLadder />
            </div>
          );
        }
        if (trimmed === "<<LOGIC_NUMLINE_NEG>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <LogicNumlineNeg />
            </div>
          );
        }
        if (trimmed === "<<COUNT_VENN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountVenn />
            </div>
          );
        }
        if (trimmed === "<<COUNT_PAIR_BUNDLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountPairBundle />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TRIPLE_BUNDLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTripleBundle />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_SHRINK>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeShrink />
            </div>
          );
        }
        if (trimmed === "<<COUNT_SLOT_BOUND>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountSlotBound />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TREE_CONST>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTreeConst />
            </div>
          );
        }
        if (trimmed === "<<COUNT_ROOM_CHOICE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountRoomChoice />
            </div>
          );
        }
        if (trimmed === "<<COUNT_TWO_TREES>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountTwoTrees />
            </div>
          );
        }
        if (trimmed === "<<COUNT_PERM_BUNDLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountPermBundle />
            </div>
          );
        }
        if (trimmed === "<<COUNT_GRID_ARROWS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountGridArrows />
            </div>
          );
        }
        if (trimmed === "<<COUNT_STARS_BARS>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountStarsBars />
            </div>
          );
        }
        if (trimmed === "<<COUNT_SAME_BUNDLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountSameBundle />
            </div>
          );
        }
        if (trimmed === "<<COUNT_BLOCK>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountBlock />
            </div>
          );
        }
        if (trimmed === "<<COUNT_CIRCLE_NUM>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountCircleNum />
            </div>
          );
        }
        if (trimmed === "<<COUNT_ROTATE_BUNDLE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountRotateBundle />
            </div>
          );
        }
        if (trimmed === "<<COUNT_FLIP_PAIR>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountFlipPair />
            </div>
          );
        }
        if (trimmed === "<<COUNT_POLYGON_PICK>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <CountPolygonPick />
            </div>
          );
        }
        if (trimmed === "<<DATA_TALLY>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataTally />
            </div>
          );
        }
        if (trimmed === "<<DATA_HIST_WIDTH>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataHistWidth />
            </div>
          );
        }
        if (trimmed === "<<DATA_HIST_READ>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataHistRead />
            </div>
          );
        }
        if (trimmed === "<<DATA_SHIFT_SPREAD>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataShiftSpread />
            </div>
          );
        }
        if (trimmed === "<<DATA_SCALE_SPREAD>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataScaleSpread />
            </div>
          );
        }
        if (trimmed === "<<DATA_LEVELING>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataLeveling />
            </div>
          );
        }
        if (trimmed === "<<DATA_MEDIAN_POSITION>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataMedianPosition />
            </div>
          );
        }
        if (trimmed === "<<DATA_OUTLIER_PULL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataOutlierPull />
            </div>
          );
        }
        if (trimmed === "<<DATA_ASSUMED_MEAN>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataAssumedMean />
            </div>
          );
        }
        if (trimmed === "<<DATA_CLASS_VALUE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataClassValue />
            </div>
          );
        }
        if (trimmed === "<<DATA_QUARTILE_SPLIT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataQuartileSplit />
            </div>
          );
        }
        if (trimmed === "<<DATA_BOXPLOT_READ>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataBoxplotRead />
            </div>
          );
        }
        if (trimmed === "<<DATA_BOXPLOT_COMPARE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataBoxplotCompare />
            </div>
          );
        }
        if (trimmed === "<<DATA_IQR_BAND>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataIqrBand />
            </div>
          );
        }
        if (trimmed === "<<DATA_OUTLIER_FENCE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataOutlierFence />
            </div>
          );
        }
        if (trimmed === "<<DATA_TEST_TAIL>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataTestTail />
            </div>
          );
        }
        if (trimmed === "<<DATA_DEVIATION_SQUARE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataDeviationSquare />
            </div>
          );
        }
        if (trimmed === "<<DATA_SD_UNIT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataSdUnit />
            </div>
          );
        }
        if (trimmed === "<<DATA_SCATTER_QUADRANT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataScatterQuadrant />
            </div>
          );
        }
        if (trimmed === "<<DATA_COV_SCALE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataCovScale />
            </div>
          );
        }
        if (trimmed === "<<DATA_R_NONLINEAR>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataRNonlinear />
            </div>
          );
        }
        // 水平区切り（「もっと深く」セクションへの分岐線）
        if (/^─{3,}$/.test(trimmed) || /^-{3,}$/.test(trimmed)) {
          return (
            <hr
              key={i}
              className="my-8"
              style={{
                border: 0,
                borderTop: "1px dashed var(--border)",
              }}
            />
          );
        }
        // $$...$$ だけの段落は BlockMath。
        // 空行なしで $$...$$ が連続すると 1 段落になるため、
        // 貪欲マッチだと中間の $$ が数式に混入し KaTeX が赤字エラーになる。
        // 空白以外がすべて $$...$$ ブロックなら、各ブロックを個別に描画する。
        const displayBlocks = extractDisplayMathBlocks(trimmed);
        if (displayBlocks) {
          return (
            <div key={i}>
              {displayBlocks.map((math, j) => (
                <div key={j} className="my-4">
                  <BlockMath math={math} />
                </div>
              ))}
            </div>
          );
        }
        // markdown 表
        const lines = trimmed.split("\n");
        if (isMarkdownTable(lines)) {
          return <MarkdownTable key={i} lines={lines} />;
        }
        return (
          <p key={i} className="my-3" style={{ lineHeight: 2 }}>
            {lines.map((line, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                <MathText text={line} />
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

/* ============================================================================
 * 場合の数（seriesCounting.ts）用の図
 * 「フェードアウトする足場」：step1 と質的変化 step のみ。答え（総数）は描かない。
 * ========================================================================== */

/** 系1 step1: 辞書式（五十音順）の樹形図。3枚から2枚を並べる。総数は描かない。 */
export function CountTreeLex() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const firsts = [
    { label: "こ", y: 62, children: ["た", "ね"] },
    { label: "た", y: 122, children: ["こ", "ね"] },
    { label: "ね", y: 182, children: ["こ", "た"] },
  ];
  const node = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <rect
        x={x - 14}
        y={y - 14}
        width="28"
        height="28"
        rx="6"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x={x} y={y + 5} fontSize="14" fill={stroke} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="五十音順の樹形図。先頭の文字こ・た・ねのそれぞれから2文字目の枝が伸びる。総数は書かない"
    >
      <text x="60" y="24" fontSize="11" fill={muted} textAnchor="middle">
        先頭（五十音順）
      </text>
      <text x="200" y="24" fontSize="11" fill={muted} textAnchor="middle">
        2文字目
      </text>
      {firsts.map((f, i) => (
        <g key={`f${i}`}>
          {node(60, f.y, f.label, `n${i}`)}
          {f.children.map((c, j) => {
            const cy = f.y - 16 + j * 32;
            return (
              <g key={`c${i}${j}`}>
                <path
                  d={`M 76 ${f.y} L 184 ${cy}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1.2"
                />
                {node(200, cy, c, `cn${i}${j}`)}
              </g>
            );
          })}
        </g>
      ))}
      <path
        d="M 250 46 L 250 198"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      <text x="262" y="118" fontSize="12" fill={accent}>
        枝の先は
      </text>
      <text x="262" y="136" fontSize="12" fill={accent}>
        全部で何本？
      </text>
    </svg>
  );
}

/** 系1 step5: 後もどりしない規則の樹形図。4人から順番のない2人組。総数は描かない。 */
export function CountTreeNoReturn() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  /** 五十音順: つ→な,は,る／な→は,る／は→る（後もどりしない） */
  const rows = [
    { label: "つ", y: 58, children: ["な", "は", "る"] },
    { label: "な", y: 120, children: ["は", "る"] },
    { label: "は", y: 166, children: ["る"] },
  ];
  const node = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <rect
        x={x - 14}
        y={y - 14}
        width="28"
        height="28"
        rx="6"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x={x} y={y + 5} fontSize="14" fill={stroke} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="後もどりしない規則の樹形図。つ・な・はのそれぞれから、五十音であとの文字だけへ枝が伸びる。る・は のような後もどりの枝はない。総数は書かない"
    >
      <text x="60" y="24" fontSize="11" fill={muted} textAnchor="middle">
        前の文字
      </text>
      <text x="200" y="24" fontSize="11" fill={muted} textAnchor="middle">
        あとの文字（後もどりしない）
      </text>
      {rows.map((f, i) => (
        <g key={`f${i}`}>
          {node(60, f.y, f.label, `n${i}`)}
          {f.children.map((c, j) => {
            const cy = f.y - 16 * (f.children.length - 1) + j * 32;
            return (
              <g key={`c${i}${j}`}>
                <path
                  d={`M 76 ${f.y} L 184 ${cy}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1.2"
                />
                {node(200, cy, c, `cn${i}${j}`)}
              </g>
            );
          })}
        </g>
      ))}
      <text x="252" y="200" fontSize="12" fill={accent}>
        「る・は」は
      </text>
      <text x="252" y="218" fontSize="12" fill={accent}>
        どこへ消えた？
      </text>
    </svg>
  );
}

/** 系2 step1: 省略樹形図。どの枝からも同じ本数の枝が伸びる（積の法則）。総数は描かない。 */
export function CountTreeProduct() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  /** 1段目 3 本、そのどれからも 2段目が同じ本数（ここでは 3 本）伸びる略式図。 */
  const firsts = [58, 116, 174];
  const dot = (x: number, y: number, key: string) => (
    <circle
      key={key}
      cx={x}
      cy={y}
      r="9"
      fill={fillColor}
      stroke={stroke}
      strokeWidth="1.2"
    />
  );
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="省略樹形図。1段目のどの枝からも、同じ本数の2段目の枝が伸びる。総数は書かない"
    >
      <text x="60" y="24" fontSize="11" fill={muted} textAnchor="middle">
        1段目
      </text>
      <text x="210" y="24" fontSize="11" fill={muted} textAnchor="middle">
        2段目（どこも同じ本数）
      </text>
      {firsts.map((fy, i) => (
        <g key={`f${i}`}>
          <path
            d={`M 40 116 L 60 ${fy}`}
            fill="none"
            stroke={muted}
            strokeWidth="1.2"
          />
          {dot(60, fy, `n${i}`)}
          {[-24, 0, 24].map((dy, j) => {
            const cy = fy + dy;
            return (
              <g key={`c${i}${j}`}>
                <path
                  d={`M 69 ${fy} L 200 ${cy}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {dot(200, cy, `cn${i}${j}`)}
              </g>
            );
          })}
        </g>
      ))}
      {dot(40, 116, "root")}
      <path
        d="M 250 40 L 250 200"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      <text x="262" y="112" fontSize="12" fill={accent}>
        ぜんぶ描かずに
      </text>
      <text x="262" y="130" fontSize="12" fill={accent}>
        数えられる？
      </text>
    </svg>
  );
}

/** 系2 step5: 分かれて並ぶ2本の木（和の法則・場合分け）。総数は描かない。 */
export function CountTreeSum() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const dot = (x: number, y: number, key: string) => (
    <circle
      key={key}
      cx={x}
      cy={y}
      r="9"
      fill={fillColor}
      stroke={stroke}
      strokeWidth="1.2"
    />
  );
  /** 左の木＝ある場合（枝 4 本）／右の木＝別の場合（枝 3 本）。同時には起こらない。 */
  const tree = (
    ox: number,
    label: string,
    ys: number[],
    keyp: string,
  ) => (
    <g key={keyp}>
      <text x={ox + 70} y="34" fontSize="11" fill={muted} textAnchor="middle">
        {label}
      </text>
      <path
        d={`M ${ox} 128 L ${ox + 22} 128`}
        fill="none"
        stroke={muted}
        strokeWidth="1.2"
      />
      {dot(ox, 128, `${keyp}root`)}
      {ys.map((cy, j) => (
        <g key={`${keyp}c${j}`}>
          <path
            d={`M ${ox + 9} 128 L ${ox + 118} ${cy}`}
            fill="none"
            stroke={muted}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          {dot(ox + 118, cy, `${keyp}n${j}`)}
        </g>
      ))}
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="分かれて並ぶ2本の木。左の場合と右の場合は同時には起こらない。総数は書かない"
    >
      {tree(20, "運動部を選ぶ", [76, 108, 140, 172], "L")}
      {tree(190, "文化部を選ぶ", [92, 128, 164], "R")}
      <path
        d="M 170 44 L 170 196"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="2 5"
      />
      <text x="170" y="214" fontSize="11" fill={accent} textAnchor="middle">
        同時には起こらない——数えたら？
      </text>
    </svg>
  );
}

/** 系2 step9: 枝数が場所で変わる樹形図（積の一発が壊れる）。総数は描かない。 */
export function CountTreeUneven() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const dot = (x: number, y: number, key: string, faded = false) => (
    <circle
      key={key}
      cx={x}
      cy={y}
      r="9"
      fill={faded ? "none" : fillColor}
      stroke={faded ? muted : stroke}
      strokeWidth="1.2"
      strokeDasharray={faded ? "3 3" : undefined}
    />
  );
  /** 1段目の枝の先ごとに、2段目の枝の本数が変わる（ある枝は 2 本・別の枝は 3 本）。 */
  const firsts = [
    { y: 62, children: [46, 78] }, // しばりの強い枝＝本数が少ない
    { y: 122, children: [104, 130, 156] },
    { y: 182, children: [166, 196] },
  ];
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="枝の数が場所で変わる樹形図。ある枝からは2本、別の枝からは3本が伸びる。どこも同じ本数ではない。総数は書かない"
    >
      <text x="60" y="24" fontSize="11" fill={muted} textAnchor="middle">
        1段目
      </text>
      <text x="205" y="24" fontSize="11" fill={muted} textAnchor="middle">
        2段目（本数がそろわない）
      </text>
      {firsts.map((f, i) => (
        <g key={`f${i}`}>
          <path
            d={`M 40 122 L 60 ${f.y}`}
            fill="none"
            stroke={muted}
            strokeWidth="1.2"
          />
          {dot(60, f.y, `n${i}`)}
          {f.children.map((cy, j) => (
            <g key={`c${i}${j}`}>
              <path
                d={`M 69 ${f.y} L 200 ${cy}`}
                fill="none"
                stroke={muted}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {dot(200, cy, `cn${i}${j}`)}
            </g>
          ))}
        </g>
      ))}
      {dot(40, 122, "root")}
      <text x="252" y="106" fontSize="12" fill={accent}>
        同じ数の
      </text>
      <text x="252" y="124" fontSize="12" fill={accent}>
        かけ算でよい？
      </text>
    </svg>
  );
}

/** 系3 step1: 背番号の列と「すき間」。連続する数と、その間のすき間。個数は描かない。 */
export function CountSeqGap() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  /** 連番の玉（値は伏せ、●で表す）と、玉と玉の「すき間」を弧で示す。 */
  const xs = [56, 104, 152, 200, 248];
  const cy = 108;
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="連続した番号の玉が横一列に並び、玉と玉のあいだに「すき間」の弧がある。玉の数とすき間の数のどちらが引き算の答えかを問う図。個数は書かない"
    >
      <text x="170" y="30" fontSize="11" fill={muted} textAnchor="middle">
        連続した番号がならぶ
      </text>
      <line
        x1="36"
        y1={cy}
        x2="268"
        y2={cy}
        stroke={muted}
        strokeWidth="1.2"
      />
      {xs.map((x, i) => (
        <g key={`b${i}`}>
          <circle
            cx={x}
            cy={cy}
            r="12"
            fill={fillColor}
            stroke={stroke}
            strokeWidth="1.2"
          />
          {i === 0 && (
            <text x={x} y={cy + 4} fontSize="12" fill={stroke} textAnchor="middle">
              始
            </text>
          )}
          {i === xs.length - 1 && (
            <text x={x} y={cy + 4} fontSize="12" fill={stroke} textAnchor="middle">
              終
            </text>
          )}
        </g>
      ))}
      {xs.slice(0, -1).map((x, i) => {
        const mid = (x + xs[i + 1]) / 2;
        return (
          <g key={`g${i}`}>
            <path
              d={`M ${x + 12} ${cy - 4} Q ${mid} ${cy - 26} ${xs[i + 1] - 12} ${cy - 4}`}
              fill="none"
              stroke={accent}
              strokeWidth="1.3"
              strokeDasharray="4 3"
            />
          </g>
        );
      })}
      <text x="170" y="70" fontSize="11" fill={accent} textAnchor="middle">
        すき間
      </text>
      <text x="170" y="162" fontSize="12" fill={accent} textAnchor="middle">
        玉の数と「すき間」の数——どちらが引き算の答え？
      </text>
    </svg>
  );
}

/** 系3 step4: 全体と「残った方」。ほしい方は直接数えず、残りを引く。個数は描かない。 */
export function CountComplement() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const wholeFill = "color-mix(in oklch, var(--accent) 5%, transparent)";
  const restFill = "color-mix(in oklch, var(--accent) 18%, transparent)";
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="大きな四角が全体、その中の小さな角の領域が「残った方」。ほしいのは残り以外の部分で、全体から残りを引いて求める。個数は書かない"
    >
      <rect
        x="24"
        y="34"
        width="292"
        height="140"
        rx="10"
        fill={wholeFill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="40" y="56" fontSize="12" fill={muted}>
        全体（数は分かっている）
      </text>
      <rect
        x="214"
        y="104"
        width="86"
        height="56"
        rx="8"
        fill={restFill}
        stroke={accent}
        strokeWidth="1.3"
        strokeDasharray="4 3"
      />
      <text x="257" y="128" fontSize="11" fill={accent} textAnchor="middle">
        残った方
      </text>
      <text x="257" y="146" fontSize="11" fill={accent} textAnchor="middle">
        （数えやすい）
      </text>
      <text x="110" y="120" fontSize="12" fill={stroke} textAnchor="middle">
        ほしいのはこちら
      </text>
      <text x="170" y="192" fontSize="12" fill={accent} textAnchor="middle">
        直接数える？ それとも全体から残りを引く？
      </text>
    </svg>
  );
}

/** 確率 系1 step1: 事象を均等な粒にたたき割る。確率値は書かない。 */
export function ProbGrain() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const blobFill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const grainFill = "color-mix(in oklch, var(--accent) 20%, transparent)";
  const cells: { x: number; y: number; hit: boolean }[] = [];
  const hits = [1, 4, 6, 9, 10];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const i = r * 4 + c;
      cells.push({ x: 196 + c * 34, y: 52 + r * 34, hit: hits.includes(i) });
    }
  }
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="左のいびつなかたまり（事象）を、右の同じ大きさの粒に割り直す。色つきの粒があてはまる場合。確率の値は書かない"
    >
      <path
        d="M 30 90 Q 22 56 56 46 Q 84 34 110 54 Q 140 44 148 76 Q 160 104 132 122 Q 118 148 84 140 Q 46 148 36 118 Q 22 110 30 90 Z"
        fill={blobFill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="88" y="92" fontSize="12" fill={stroke} textAnchor="middle">
        起こりやすさを
      </text>
      <text x="88" y="108" fontSize="12" fill={stroke} textAnchor="middle">
        測りたい事象
      </text>
      <path d="M 158 96 L 186 96" stroke={accent} strokeWidth="1.6" />
      <path d="M 186 96 l -7 -4 l 0 8 Z" fill={accent} />
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width="30"
          height="30"
          rx="4"
          fill={cell.hit ? grainFill : "transparent"}
          stroke={cell.hit ? accent : muted}
          strokeWidth="1.2"
        />
      ))}
      <text x="262" y="42" fontSize="12" fill={muted} textAnchor="middle">
        同じ重さの粒に割る
      </text>
      <text x="180" y="196" fontSize="12" fill={accent} textAnchor="middle">
        同じ重さの粒に割れたら、あとは何を数えればいい？
      </text>
    </svg>
  );
}

/** 確率 系1 step4: コイン2枚の分け方の対比。左の3分割は同じ重さか。確率値は書かない。 */
export function ProbCoinSplit() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const boxFill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const grainFill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const leftLabels = ["2枚とも表", "1枚ずつ", "2枚とも裏"];
  const rightLabels = ["A表 B表", "A表 B裏", "A裏 B表", "A裏 B裏"];
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="左は「2枚とも表・1枚ずつ・2枚とも裏」の3つの箱に重さのはてなマーク。右はコインをA・Bと区別した4つの均等な粒。確率の値は書かない"
    >
      <text x="92" y="30" fontSize="12" fill={muted} textAnchor="middle">
        枚数で分けた 3 つの箱
      </text>
      {leftLabels.map((label, i) => (
        <g key={i}>
          <rect
            x="34"
            y={44 + i * 46}
            width="116"
            height="36"
            rx="7"
            fill={boxFill}
            stroke={stroke}
            strokeWidth="1.3"
          />
          <text
            x="84"
            y={66 + i * 46}
            fontSize="12"
            fill={stroke}
            textAnchor="middle"
          >
            {label}
          </text>
          <text
            x="138"
            y={67 + i * 46}
            fontSize="13"
            fill={accent}
            textAnchor="middle"
          >
            ？
          </text>
        </g>
      ))}
      <path d="M 166 112 L 194 112" stroke={accent} strokeWidth="1.6" />
      <path d="M 194 112 l -7 -4 l 0 8 Z" fill={accent} />
      <text x="266" y="30" fontSize="12" fill={muted} textAnchor="middle">
        A・B と名前をつけて割る
      </text>
      {rightLabels.map((label, i) => (
        <g key={i}>
          <rect
            x="208"
            y={44 + i * 34}
            width="116"
            height="26"
            rx="6"
            fill={grainFill}
            stroke={accent}
            strokeWidth="1.2"
          />
          <text
            x="266"
            y={61 + i * 34}
            fontSize="11.5"
            fill={stroke}
            textAnchor="middle"
          >
            {label}
          </text>
        </g>
      ))}
      <text x="180" y="208" fontSize="12" fill={accent} textAnchor="middle">
        左の 3 つの箱は、どれも同じ重さと言える？
      </text>
    </svg>
  );
}

/** 確率 系1 step9: サイコロ2個の6×6のマス。和のまとまり方を問う。マスの個数・確率は書かない。 */
export function ProbDiceGrid() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const cellFill = "color-mix(in oklch, var(--accent) 5%, transparent)";
  const cells: { x: number; y: number }[] = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      cells.push({ x: 96 + c * 28, y: 40 + r * 24 });
    }
  }
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="サイコロA・Bの目を縦横に並べた6×6の36マスの表。どのマスも同じ大きさ。和が同じマスの並び方を問う。個数や確率は書かない"
    >
      <text x="90" y="26" fontSize="12" fill={muted}>
        B の目 →
      </text>
      <text x="30" y="52" fontSize="12" fill={muted}>
        A の目
      </text>
      <text x="42" y="68" fontSize="12" fill={muted}>
        ↓
      </text>
      {[1, 2, 3, 4, 5, 6].map((n, i) => (
        <text
          key={`b${n}`}
          x={110 + i * 28}
          y={36}
          fontSize="11"
          fill={stroke}
          textAnchor="middle"
        >
          {n}
        </text>
      ))}
      {[1, 2, 3, 4, 5, 6].map((n, i) => (
        <text
          key={`a${n}`}
          x={84}
          y={56 + i * 24}
          fontSize="11"
          fill={stroke}
          textAnchor="end"
        >
          {n}
        </text>
      ))}
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width="26"
          height="22"
          rx="3"
          fill={cellFill}
          stroke={muted}
          strokeWidth="1"
        />
      ))}
      <text x="180" y="216" fontSize="12" fill={accent} textAnchor="middle">
        36 のマスはみんな同じ重さ——和が同じマスは、どの向きに並ぶ？
      </text>
    </svg>
  );
}

/** 確率 系3 step1: 排反な2事象（重ならない2領域）と全体1。各確率値・答えは書かない。 */
export function ProbDisjoint() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const wholeFill = "color-mix(in oklch, var(--accent) 4%, transparent)";
  const fillA = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const fillB = "color-mix(in oklch, var(--accent) 28%, transparent)";
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="全体の面積を1とする大きな角丸長方形の中に、重ならない2つの領域Aと領域Bが並んでいる。2つは同時には起こらない（排反）。それぞれの確率値・答えは書かない"
    >
      <rect
        x="24"
        y="34"
        width="312"
        height="128"
        rx="12"
        fill={wholeFill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="40" y="54" fontSize="12" fill={muted}>
        全体の面積 ＝ 1
      </text>
      {/* 重ならない 2 領域 */}
      <rect
        x="44"
        y="72"
        width="104"
        height="74"
        rx="8"
        fill={fillA}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="96" y="114" fontSize="14" fill={stroke} textAnchor="middle">
        A
      </text>
      <rect
        x="176"
        y="72"
        width="80"
        height="74"
        rx="8"
        fill={fillB}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x="216" y="114" fontSize="14" fill={stroke} textAnchor="middle">
        B
      </text>
      <text x="298" y="114" fontSize="11" fill={muted} textAnchor="middle">
        すきま
      </text>
      <text x="180" y="184" fontSize="12" fill={accent} textAnchor="middle">
        2 つが同時に起こらないとき、「A か B が起こる」の面積はどう作れる？
      </text>
    </svg>
  );
}

/** 確率 系4 step1: 独立な2試行の面積図。横=Aの割合・たて=Bの割合、重なる長方形がAかつB。面積（積の値）は書かない。 */
export function ProbArea() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const wholeFill = "color-mix(in oklch, var(--accent) 4%, transparent)";
  const bandFill = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const overlapFill = "color-mix(in oklch, var(--accent) 30%, transparent)";
  // 1辺の正方形（面積1）。x0..x0+side, y0..y0+side
  const x0 = 118;
  const y0 = 40;
  const side = 150;
  // 横はば（Aの割合）・たてはば（Bの割合）——具体的な数値は書かない
  const aW = 90; // A が起こる横の割合ぶん
  const bH = 96; // B が起こる縦の割合ぶん（上から）
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="面積1の正方形。横はばが事象Aの起こる割合、たてはばが事象Bの起こる割合。左上の重なる長方形がAとBがともに起こる場合で、その面積はたて×横。面積や確率の値は書かない"
    >
      {/* 全体＝面積1の正方形 */}
      <rect
        x={x0}
        y={y0}
        width={side}
        height={side}
        fill={wholeFill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      {/* Aの縦帯（横はば=Aの割合） */}
      <rect
        x={x0}
        y={y0}
        width={aW}
        height={side}
        fill={bandFill}
        stroke="none"
      />
      {/* Bの横帯（たてはば=Bの割合） */}
      <rect
        x={x0}
        y={y0}
        width={side}
        height={bH}
        fill={bandFill}
        stroke="none"
      />
      {/* 重なり＝AかつB */}
      <rect
        x={x0}
        y={y0}
        width={aW}
        height={bH}
        fill={overlapFill}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text
        x={x0 + aW / 2}
        y={y0 + bH / 2 - 4}
        fontSize="11.5"
        fill={stroke}
        textAnchor="middle"
      >
        A かつ B
      </text>
      <text
        x={x0 + aW / 2}
        y={y0 + bH / 2 + 12}
        fontSize="11.5"
        fill={stroke}
        textAnchor="middle"
      >
        （ともに起こる）
      </text>
      {/* 全体の目印 */}
      <text x={x0 + side - 4} y={y0 + side - 8} fontSize="11" fill={muted} textAnchor="end">
        全体の面積 ＝ 1
      </text>
      {/* 横の割合ブラケット（A） */}
      <path
        d={`M ${x0} ${y0 - 10} L ${x0 + aW} ${y0 - 10}`}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text x={x0 + aW / 2} y={y0 - 16} fontSize="11" fill={accent} textAnchor="middle">
        横：A の起こる割合
      </text>
      {/* たての割合ブラケット（B） */}
      <path
        d={`M ${x0 - 10} ${y0} L ${x0 - 10} ${y0 + bH}`}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text
        x={x0 - 16}
        y={y0 + bH / 2}
        fontSize="11"
        fill={accent}
        textAnchor="middle"
        transform={`rotate(-90 ${x0 - 16} ${y0 + bH / 2})`}
      >
        たて：B の起こる割合
      </text>
      <text x="180" y={y0 + side + 26} fontSize="12" fill={accent} textAnchor="middle">
        縦の割合と横の割合から、重なりの面積は作れる？
      </text>
    </svg>
  );
}

/** 確率 系4 step5・系6 step5: 確率つき樹形図。枝に p と 1−p（起こる／起こらない）。道の終端の確率値は書かない。 */
export function ProbTreeWeighted() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const rootX = 44;
  const rootY = 120;
  const x1 = 150; // 1段目のノード
  const x2 = 300; // 2段目（終端）
  const y1a = 66; // 1段目 上（起こる）
  const y1b = 174; // 1段目 下（起こらない）
  const ends = [
    { y: 40, top: true, top2: true },
    { y: 92, top: true, top2: false },
    { y: 148, top: false, top2: true },
    { y: 200, top: false, top2: false },
  ];
  return (
    <svg
      viewBox="0 0 360 232"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="2段の樹形図。1段目は試行1が起こる（確率p）・起こらない（確率1−p）に分かれ、それぞれが2段目で試行2の起こる（q）・起こらない（1−q）に分かれる。各枝に確率の記号がつく。道の終端の確率の値は書かない"
    >
      {/* 根 */}
      <circle cx={rootX} cy={rootY} r="4" fill={accent} />
      <text x={rootX} y={rootY + 20} fontSize="10.5" fill={muted} textAnchor="middle">
        スタート
      </text>
      {/* 1段目の枝 */}
      <path d={`M ${rootX} ${rootY} L ${x1} ${y1a}`} stroke={stroke} strokeWidth="1.3" />
      <path d={`M ${rootX} ${rootY} L ${x1} ${y1b}`} stroke={stroke} strokeWidth="1.3" />
      <text x={(rootX + x1) / 2 - 6} y={(rootY + y1a) / 2 - 4} fontSize="11" fill={accent}>
        p（起こる）
      </text>
      <text x={(rootX + x1) / 2 - 6} y={(rootY + y1b) / 2 + 14} fontSize="11" fill={accent}>
        1−p（起こらない）
      </text>
      <circle cx={x1} cy={y1a} r="4" fill={accent} />
      <circle cx={x1} cy={y1b} r="4" fill={accent} />
      {/* 2段目の枝 */}
      {ends.map((e, i) => {
        const from = e.top ? y1a : y1b;
        return (
          <g key={i}>
            <path
              d={`M ${x1} ${from} L ${x2} ${e.y}`}
              stroke={stroke}
              strokeWidth="1.2"
            />
            <text
              x={(x1 + x2) / 2}
              y={(from + e.y) / 2 + (e.top2 ? -4 : 12)}
              fontSize="10.5"
              fill={muted}
            >
              {e.top2 ? "q" : "1−q"}
            </text>
            <circle cx={x2} cy={e.y} r="3.4" fill="none" stroke={accent} strokeWidth="1.2" />
          </g>
        );
      })}
      <text x="180" y="226" fontSize="12" fill={accent} textAnchor="middle">
        枝の確率をかけながら道をたどると、その道の起こりやすさになる——どの道をたどる？
      </text>
    </svg>
  );
}

/** 確率 系5 step1・辞書: ◯×の道を数本並べる（反復試行）。どの道もかける数の顔ぶれは同じか。道の本数・確率は書かない。 */
export function ProbPaths() {
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const hitFill = "color-mix(in oklch, var(--accent) 20%, transparent)";
  // 2回のうちちょうど1回「起こる（◯）」の2本の道：◯× と ×◯
  const paths: ("hit" | "miss")[][] = [
    ["hit", "miss"],
    ["miss", "hit"],
  ];
  const cell = 44;
  const gap = 10;
  const x0 = 118;
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="ちょうど1回起こる2本の道。上の道は「起こる・起こらない」、下の道は「起こらない・起こる」。どちらの道も、◯（起こる）が1つと×（起こらない）が1つ。道の本数や確率の値は書かない"
    >
      <text x="180" y="28" fontSize="12" fill={muted} textAnchor="middle">
        「ちょうど 1 回起こる」道を、ぜんぶ書き出すと
      </text>
      {paths.map((row, r) => (
        <g key={r}>
          {row.map((kind, c) => {
            const cx = x0 + c * (cell + gap);
            const cy = 70 + r * (cell + gap);
            return (
              <g key={c}>
                <rect
                  x={cx}
                  y={cy}
                  width={cell}
                  height={cell}
                  rx="7"
                  fill={kind === "hit" ? hitFill : "transparent"}
                  stroke={kind === "hit" ? accent : muted}
                  strokeWidth="1.3"
                />
                <text
                  x={cx + cell / 2}
                  y={cy + cell / 2 + 6}
                  fontSize="18"
                  fill={kind === "hit" ? accent : muted}
                  textAnchor="middle"
                >
                  {kind === "hit" ? "◯" : "×"}
                </text>
                <text
                  x={cx + cell / 2}
                  y={cy + cell + 16}
                  fontSize="10"
                  fill={muted}
                  textAnchor="middle"
                >
                  {c + 1}回め
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="180" y="192" fontSize="12" fill={accent} textAnchor="middle">
        どの道も、かける数の顔ぶれ（◯ と × の数）は同じ？
      </text>
    </svg>
  );
}

/** 確率 系5 step9: 最後の1マスが◯で固定された道。手前だけが自由。確率は書かない。 */
export function ProbPathsLast() {
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const freeFill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const lockFill = "color-mix(in oklch, var(--accent) 24%, transparent)";
  const cell = 44;
  const gap = 10;
  const n = 5;
  const x0 = 40;
  const y = 78;
  const freeCount = n - 1;
  const lastX = x0 + freeCount * (cell + gap);
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="5マスの道。最後の1マスだけが◯で決まっていて、その手前の4マスは自由に並べ替えられる。手前の4マスにはてなマークがつき、最後のマスには決まっている印がつく。確率の値は書かない"
    >
      {Array.from({ length: n }).map((_, c) => {
        const cx = x0 + c * (cell + gap);
        const isLast = c === n - 1;
        return (
          <g key={c}>
            <rect
              x={cx}
              y={y}
              width={cell}
              height={cell}
              rx="7"
              fill={isLast ? lockFill : freeFill}
              stroke={isLast ? accent : muted}
              strokeWidth={isLast ? 1.7 : 1.2}
              strokeDasharray={isLast ? undefined : "4 3"}
            />
            <text
              x={cx + cell / 2}
              y={y + cell / 2 + 6}
              fontSize="18"
              fill={isLast ? accent : muted}
              textAnchor="middle"
            >
              {isLast ? "◯" : "？"}
            </text>
            <text
              x={cx + cell / 2}
              y={y + cell + 16}
              fontSize="10"
              fill={muted}
              textAnchor="middle"
            >
              {c + 1}回め
            </text>
          </g>
        );
      })}
      {/* 手前は自由のブラケット */}
      <path
        d={`M ${x0} ${y - 12} L ${x0 + freeCount * cell + (freeCount - 1) * gap} ${y - 12}`}
        stroke={muted}
        strokeWidth="1.2"
      />
      <text
        x={x0 + (freeCount * cell + (freeCount - 1) * gap) / 2}
        y={y - 18}
        fontSize="11"
        fill={muted}
        textAnchor="middle"
      >
        ここは自由に並べ替えられる
      </text>
      <text x={lastX + cell / 2} y={y - 18} fontSize="11" fill={accent} textAnchor="middle">
        決まっている
      </text>
      <text x="180" y="192" fontSize="12" fill={accent} textAnchor="middle">
        最後のマスが決まっているとき、自由に並べられるのはどこまで？
      </text>
    </svg>
  );
}

/** 確率 系6 step1・辞書: 条件つき確率。左に面積1の全体と事象Aの帯、右に「Aが起こったと知ったあとの世界」＝Aの帯が新しい全体に拡大され、その中にBの領域。確率値は書かない。 */
export function ProbShrink() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const wholeFill = "color-mix(in oklch, var(--accent) 4%, transparent)";
  const aFill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const bFill = "color-mix(in oklch, var(--accent) 34%, transparent)";
  // 左：もとの全体（面積1）。x 24..168, y 46..170
  const lx = 24;
  const ly = 46;
  const lw = 144;
  const lh = 124;
  const aH = 46; // A の帯の高さ（上から）
  // 右：A が起こったと知ったあとの新しい全体（A の帯が拡大）。x 216..336
  const rx = 216;
  const rw = 120;
  const bH = 78; // 新しい全体の中の B の領域（上から）
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="左は面積1のもとの全体で、その中に事象Aの帯がある。右は、Aが起こったと知ったあとの新しい世界——Aの帯だけが拡大されて新しい全体になり、その中に事象Bの領域がある。左と右で、割合を測る全体そのものが取り替わっている。確率や割合の値は書かない"
    >
      {/* 左：もとの全体 */}
      <rect
        x={lx}
        y={ly}
        width={lw}
        height={lh}
        rx="8"
        fill={wholeFill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <rect x={lx} y={ly} width={lw} height={aH} fill={aFill} stroke={accent} strokeWidth="1.2" />
      <text x={lx + lw / 2} y={ly + aH / 2 + 5} fontSize="13" fill={stroke} textAnchor="middle">
        A
      </text>
      <text x={lx + lw / 2} y={ly + lh - 10} fontSize="11" fill={muted} textAnchor="middle">
        もとの全体 ＝ 1
      </text>
      <text x={lx + lw / 2} y={ly - 12} fontSize="11" fill={muted} textAnchor="middle">
        まだ何も知らない
      </text>
      {/* 矢印：A が起こったと知る → 全体の取り替え */}
      <path d="M 176 108 L 208 108" stroke={accent} strokeWidth="1.6" />
      <path d="M 208 108 L 200 103 M 208 108 L 200 113" stroke={accent} strokeWidth="1.6" fill="none" />
      <text x="192" y="98" fontSize="10.5" fill={accent} textAnchor="middle">
        A を知る
      </text>
      {/* A の帯から新しい全体への広がり（点線） */}
      <path d={`M ${lx + lw} ${ly} L ${rx} ${ly}`} stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      <path d={`M ${lx + lw} ${ly + aH} L ${rx} ${ly + lh}`} stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      {/* 右：A が新しい全体に拡大 */}
      <rect
        x={rx}
        y={ly}
        width={rw}
        height={lh}
        rx="8"
        fill={aFill}
        stroke={accent}
        strokeWidth="1.6"
      />
      <rect x={rx} y={ly} width={rw} height={bH} fill={bFill} stroke={accent} strokeWidth="1.2" />
      <text x={rx + rw / 2} y={ly + bH / 2 + 5} fontSize="13" fill={stroke} textAnchor="middle">
        B
      </text>
      <text x={rx + rw / 2} y={ly + lh - 10} fontSize="11" fill={accent} textAnchor="middle">
        新しい全体 ＝ A
      </text>
      <text x={rx + rw / 2} y={ly - 12} fontSize="11" fill={accent} textAnchor="middle">
        A が起こった世界
      </text>
      <text x="180" y="204" fontSize="12" fill={accent} textAnchor="middle">
        A が起こったと知ったとき、あなたの立っている「全体」はどちら？
      </text>
    </svg>
  );
}

/**
 * 確率 系7 step1・辞書「事後の確率」: 結果の列だけを新しい全体にする面積図（PROB_SHRINK の逆読み）。
 * 原因A・Bの2本の道が「結果が起こった世界」に流れ込み、その世界だけを新しい全体（分母）に取り替える。
 * 確率・割合の値は書かない。
 */
export function ProbPosterior() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const discardFill = "color-mix(in oklch, var(--muted) 8%, transparent)";
  const aFill = "color-mix(in oklch, var(--accent) 34%, transparent)";
  const bFill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  // 左：もとの全体（原因A・Bの2行）。x 20..172, y 46..170
  const lx = 20;
  const ly = 46;
  const lw = 152;
  const lh = 124;
  const aRow = 58; // 原因A の行の高さ（上）／残りが原因B の行
  const aRes = 66; // 原因A の行のうち「結果が起こった」左部分の幅
  const bRes = 42; // 原因B の行のうち「結果が起こった」左部分の幅
  // 右：結果が起こった世界だけを取り出して新しい全体にする。x 232..332
  const rx = 232;
  const rw = 100;
  const rTopH = 74; // 新しい全体の中の「原因A経由」の高さ（上）
  return (
    <svg
      viewBox="0 0 360 214"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="左はもとの全体で、上の行が原因A、下の行が原因B。各行の左の濃い部分が『その原因を通って結果が起こった』道で、右のうすい部分は結果が起こらなかった世界。右では、結果が起こった左の2つの部分だけを取り出して積み上げ、新しい全体をつくる——その中で原因A経由が占める割合が事後の確率。確率や割合の値は書かない"
    >
      {/* 左：もとの全体（原因A行・原因B行） */}
      <rect
        x={lx}
        y={ly}
        width={lw}
        height={lh}
        rx="6"
        fill={discardFill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      {/* 原因A行の「結果が起こった」道 */}
      <rect x={lx} y={ly} width={aRes} height={aRow} fill={aFill} stroke={accent} strokeWidth="1.2" />
      {/* 原因B行の「結果が起こった」道 */}
      <rect x={lx} y={ly + aRow} width={bRes} height={lh - aRow} fill={bFill} stroke={accent} strokeWidth="1.2" />
      {/* 行の区切り */}
      <path d={`M ${lx} ${ly + aRow} L ${lx + lw} ${ly + aRow}`} stroke={stroke} strokeWidth="1" strokeDasharray="3 3" />
      <text x={lx + aRes / 2} y={ly + aRow / 2 + 4} fontSize="10.5" fill={stroke} textAnchor="middle">
        A→結果
      </text>
      <text x={lx + bRes / 2} y={ly + aRow + (lh - aRow) / 2 + 4} fontSize="10.5" fill={stroke} textAnchor="middle">
        B→結果
      </text>
      <text x={lx + lw - 6} y={ly + 16} fontSize="9.5" fill={muted} textAnchor="end">
        原因A
      </text>
      <text x={lx + lw - 6} y={ly + aRow + 16} fontSize="9.5" fill={muted} textAnchor="end">
        原因B
      </text>
      <text x={lx + aRes + (lw - aRes) / 2} y={ly + aRow / 2 + 4} fontSize="9" fill={muted} textAnchor="middle">
        結果は
      </text>
      <text x={lx + aRes + (lw - aRes) / 2} y={ly + aRow / 2 + 15} fontSize="9" fill={muted} textAnchor="middle">
        起こらず
      </text>
      <text x={lx + lw / 2} y={ly - 10} fontSize="10.5" fill={muted} textAnchor="middle">
        起こりうるすべて
      </text>
      {/* 矢印：結果が起こった部分だけを取り出す */}
      <path d="M 178 108 L 226 108" stroke={accent} strokeWidth="1.6" />
      <path d="M 226 108 L 218 103 M 226 108 L 218 113" stroke={accent} strokeWidth="1.6" fill="none" />
      <text x="202" y="98" fontSize="9.5" fill={accent} textAnchor="middle">
        結果を知る
      </text>
      {/* 取り出しを示す点線 */}
      <path d={`M ${lx + aRes} ${ly} L ${rx} ${ly}`} stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      <path d={`M ${lx + bRes} ${ly + lh} L ${rx} ${ly + lh}`} stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      {/* 右：結果が起こった世界だけを新しい全体に */}
      <rect
        x={rx}
        y={ly}
        width={rw}
        height={lh}
        rx="6"
        fill={bFill}
        stroke={accent}
        strokeWidth="1.6"
      />
      <rect x={rx} y={ly} width={rw} height={rTopH} fill={aFill} stroke={accent} strokeWidth="1.2" />
      <text x={rx + rw / 2} y={ly + rTopH / 2 + 4} fontSize="10" fill={stroke} textAnchor="middle">
        A 経由
      </text>
      <text x={rx + rw / 2} y={ly + rTopH + (lh - rTopH) / 2 + 4} fontSize="10" fill={stroke} textAnchor="middle">
        B 経由
      </text>
      <text x={rx + rw / 2} y={ly - 10} fontSize="10.5" fill={accent} textAnchor="middle">
        新しい全体
      </text>
      <text x={rx + rw / 2} y={ly + lh + 16} fontSize="10" fill={accent} textAnchor="middle">
        ＝結果が起こった世界
      </text>
      <text x="180" y="208" fontSize="12" fill={accent} textAnchor="middle">
        結果が起こったと知ったとき、新しい「全体」はどの部分？
      </text>
    </svg>
  );
}

/**
 * 確率 系8 step1・step9・辞書「期待値」: 数直線の上に、大きさのちがう重り（＝確率の重み）が
 * いくつかの値の位置に乗った図。重い重り＝起こりやすい値。期待値は全体がつり合う位置だが、
 * その支点（つり合いの位置）は「？」のまま描かない（答えを見せない）。負の側にも重りを置ける。
 */
export function ProbExpectBalance() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const weightFill = "color-mix(in oklch, var(--accent) 26%, transparent)";
  const weightFillNeg = "color-mix(in oklch, var(--muted) 22%, transparent)";
  // 数直線 y=124, x 24..336。原点 0 は x=108（左に負の側を少し残す）
  const axisY = 124;
  const x0 = 24;
  const x1 = 336;
  const zeroX = 108;
  // 重り（円）：中心x・半径（半径＝確率の重み。値そのものは描かない）
  const weights = [
    { cx: 72, r: 9, neg: true }, // 負の側の軽い重り
    { cx: 156, r: 21, neg: false }, // よく起こる（重い）
    { cx: 228, r: 14, neg: false },
    { cx: 300, r: 8, neg: false }, // めったに起きない（軽い）
  ];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="数直線の上に、大きさのちがう重りがいくつかの値の位置に乗っている。重りの大きさはその値の起こりやすさ（確率の重み）を表し、大きい重りほどよく起こる値。数直線の左（0 より小さい負の側）にも小さな重りが1つ乗っている。下にある三角形の支点には「？」がついていて、これらの重りが全体としてつり合う位置（＝期待値）はまだ分からないことを示す。値や、つり合いの位置の数は書かない"
    >
      {/* 数直線 */}
      <path d={`M ${x0} ${axisY} L ${x1} ${axisY}`} stroke={stroke} strokeWidth="1.6" />
      <path
        d={`M ${x1} ${axisY} L ${x1 - 7} ${axisY - 4} M ${x1} ${axisY} L ${x1 - 7} ${axisY + 4}`}
        stroke={stroke}
        strokeWidth="1.6"
        fill="none"
      />
      {/* 原点 0 の目盛り */}
      <path d={`M ${zeroX} ${axisY - 5} L ${zeroX} ${axisY + 5}`} stroke={muted} strokeWidth="1.2" />
      <text x={zeroX} y={axisY + 20} fontSize="10.5" fill={muted} textAnchor="middle">
        0
      </text>
      <text x={x1 - 10} y={axisY + 20} fontSize="10" fill={muted} textAnchor="end">
        値（大きいほど右）
      </text>
      {/* 重り（円）。中心を数直線の上に接して置く */}
      {weights.map((w, k) => (
        <g key={k}>
          {/* 重りが乗る点の小さな目盛り */}
          <path d={`M ${w.cx} ${axisY - 3} L ${w.cx} ${axisY + 3}`} stroke={stroke} strokeWidth="1.1" />
          <circle
            cx={w.cx}
            cy={axisY - w.r}
            r={w.r}
            fill={w.neg ? weightFillNeg : weightFill}
            stroke={w.neg ? muted : accent}
            strokeWidth="1.3"
          />
        </g>
      ))}
      {/* 重さの大小の注記 */}
      <text x={156} y={72} fontSize="9.5" fill={accent} textAnchor="middle">
        重い＝よく起こる
      </text>
      <text x={300} y={96} fontSize="9" fill={muted} textAnchor="middle">
        軽い
      </text>
      <text x={72} y={100} fontSize="9" fill={muted} textAnchor="middle">
        負の側
      </text>
      {/* 支点（つり合いの位置）＝？。位置は答えを見せないよう中立に置き、？ でぼかす */}
      <path
        d={`M 176 ${axisY + 6} L 168 ${axisY + 22} L 184 ${axisY + 22} Z`}
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="3 2"
      />
      <text x={176} y={axisY + 38} fontSize="13" fill={accent} textAnchor="middle">
        ？
      </text>
      {/* キャプション（問いの形） */}
      <text x={180} y={192} fontSize="12" fill={accent} textAnchor="middle">
        重さがちがう重りたち——ぜんぶが 1 点でつり合う場所はどこ？
      </text>
    </svg>
  );
}

/** 系3 step8: 重なる2つの輪（包除原理）。重なりを二重に数えていないか。個数は描かない。 */
export function CountVenn() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillA = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const fillB = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const fillOverlap = "color-mix(in oklch, var(--accent) 26%, transparent)";
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="重なり合う2つの輪。左の輪がA、右の輪がB、真ん中の濃い部分が両方に入る重なり。重なりを二重に数えていないかを問う図。個数は書かない"
    >
      <circle
        cx="132"
        cy="100"
        r="66"
        fill={fillA}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <circle
        cx="208"
        cy="100"
        r="66"
        fill={fillB}
        stroke={stroke}
        strokeWidth="1.4"
      />
      {/* 重なり（レンズ形）を強調 */}
      <path
        d="M 170 47 A 66 66 0 0 1 170 153 A 66 66 0 0 1 170 47 Z"
        fill={fillOverlap}
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <text x="104" y="104" fontSize="14" fill={stroke} textAnchor="middle">
        A
      </text>
      <text x="236" y="104" fontSize="14" fill={stroke} textAnchor="middle">
        B
      </text>
      <text x="170" y="182" fontSize="11" fill={accent} textAnchor="middle">
        まん中は「両方」——足すだけだと二回数えていない？
      </text>
    </svg>
  );
}

/** 系4 step1: 区別ありの数えが2個ずつ束になる（重複度2）。組の総数は描かない。 */
export function CountPairBundle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const bundleFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const chip = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <rect
        x={x - 30}
        y={y - 13}
        width="60"
        height="26"
        rx="6"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x={x} y={y + 5} fontSize="13" fill={stroke} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  /** 「区別ありの数え」（あ→い と い→あ）が、同じ 1 組に束ねられる。 */
  const rows = [
    { y: 52, a: "あ→い", b: "い→あ" },
    { y: 116, a: "あ→う", b: "う→あ" },
    { y: 180, a: "い→う", b: "う→い" },
  ];
  return (
    <svg
      viewBox="0 0 340 224"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="区別ありの数えが2個ずつ束になる図。あ→いとい→あが同じ1組に束ねられる。どの束にも2つずつ入っている。組の総数は書かない"
    >
      <text x="70" y="24" fontSize="11" fill={muted} textAnchor="middle">
        区別ありの数え（2つずつ）
      </text>
      <text x="262" y="24" fontSize="11" fill={muted} textAnchor="middle">
        同じ組
      </text>
      {rows.map((r, i) => (
        <g key={`r${i}`}>
          <rect
            x="18"
            y={r.y - 26}
            width="104"
            height="52"
            rx="10"
            fill={bundleFill}
            stroke={accent}
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          {chip(70, r.y - 12, r.a, `a${i}`)}
          {chip(70, r.y + 12, r.b, `b${i}`)}
          <path
            d={`M 126 ${r.y} L 226 ${r.y}`}
            fill="none"
            stroke={muted}
            strokeWidth="1.2"
          />
          {chip(262, r.y, r.a.slice(0, 1) + "・" + r.a.slice(-1), `g${i}`)}
        </g>
      ))}
      <text x="70" y="214" fontSize="11" fill={accent} textAnchor="middle">
        どの束にも「2つずつ」——本当の組の数は？
      </text>
    </svg>
  );
}

/** 系4 step5: 3つ組の並べ替えが束になる（重複度 3!=6）。組の総数は描かない。 */
export function CountTripleBundle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const bundleFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  /** 同じ3人「あ・い・う」の並べ替え 6 通りが、1 つの組に束ねられる。 */
  const perms = [
    "あいう",
    "あうい",
    "いあう",
    "いうあ",
    "うあい",
    "ういあ",
  ];
  const chip = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <rect
        x={x - 26}
        y={y - 12}
        width="52"
        height="24"
        rx="5"
        fill={fillColor}
        stroke={stroke}
        strokeWidth="1.1"
      />
      <text x={x} y={y + 5} fontSize="12" fill={stroke} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="3つ組の並べ替えが束になる図。同じ3人あ・い・うの並べ替え6通りが、1つの組に束ねられる。束の中身は6つ。組の総数は書かない"
    >
      <text x="76" y="22" fontSize="11" fill={muted} textAnchor="middle">
        区別して並べる（順番つき）
      </text>
      <text x="272" y="22" fontSize="11" fill={muted} textAnchor="middle">
        同じ組
      </text>
      <rect
        x="16"
        y="34"
        width="120"
        height="176"
        rx="12"
        fill={bundleFill}
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      {perms.map((p, i) => chip(76, 54 + i * 30, p, `p${i}`))}
      <path
        d="M 140 122 L 232 122"
        fill="none"
        stroke={muted}
        strokeWidth="1.2"
      />
      {chip(272, 122, "あ・い・う", "grp")}
      <text x="76" y="228" fontSize="11" fill={accent} textAnchor="middle">
        1 組が「並べ替えの数」だけダブる——割る数は？
      </text>
    </svg>
  );
}

/** 系5 step1: 減っていく枝の樹形図（順列）。使ったものは使えないので枝が1ずつやせる。総数は描かない。 */
export function CountTreeShrink() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const dot = (x: number, y: number, key: string) => (
    <circle
      key={key}
      cx={x}
      cy={y}
      r="8"
      fill={fillColor}
      stroke={stroke}
      strokeWidth="1.2"
    />
  );
  /** 1段目 3 本 → そのどれからも 2 本（1 つ使ったので減る）→ さらに 1 本。 */
  const firsts = [50, 116, 182];
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="減っていく枝の樹形図。1段目からは3本、そのどれからも2本、さらに1本と、使ったものが使えないので枝が1段ごとに1本ずつやせていく。総数は書かない"
    >
      <text x="52" y="22" fontSize="11" fill={muted} textAnchor="middle">
        左（3本）
      </text>
      <text x="160" y="22" fontSize="11" fill={muted} textAnchor="middle">
        中（2本）
      </text>
      <text x="268" y="22" fontSize="11" fill={muted} textAnchor="middle">
        右（1本）
      </text>
      {firsts.map((fy, i) => (
        <g key={`f${i}`}>
          <path
            d={`M 30 116 L 52 ${fy}`}
            fill="none"
            stroke={muted}
            strokeWidth="1.2"
          />
          {dot(52, fy, `n${i}`)}
          {[-18, 18].map((dy, j) => {
            const my = fy + dy;
            return (
              <g key={`m${i}${j}`}>
                <path
                  d={`M 60 ${fy} L 160 ${my}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {dot(160, my, `mn${i}${j}`)}
                <path
                  d={`M 168 ${my} L 268 ${my}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {dot(268, my, `rn${i}${j}`)}
              </g>
            );
          })}
        </g>
      ))}
      {dot(30, 116, "root")}
      <text x="160" y="222" fontSize="11" fill={accent} textAnchor="middle">
        枝が 3 → 2 → 1 とやせていく——なぜ？
      </text>
    </svg>
  );
}

/** 系5 step5: しばりのある枠（先頭が限られた種類だけ）。総数は描かない。 */
export function CountSlotBound() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const openFill = "color-mix(in oklch, var(--accent) 5%, transparent)";
  const boundFill = "color-mix(in oklch, var(--accent) 20%, transparent)";
  const slot = (
    x: number,
    label: string,
    bound: boolean,
    key: string,
  ) => (
    <g key={key}>
      <rect
        x={x}
        y="70"
        width="58"
        height="58"
        rx="8"
        fill={bound ? boundFill : openFill}
        stroke={bound ? accent : stroke}
        strokeWidth={bound ? 1.6 : 1.2}
        strokeDasharray={bound ? "5 3" : undefined}
      />
      <text
        x={x + 29}
        y="104"
        fontSize="13"
        fill={bound ? accent : muted}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 176"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="4つの枠が横に並び、いちばん左（先頭）の枠だけがしばりつきで、置ける種類が限られている。残りの枠は自由。しばりの強い所を先に決めるかを問う図。総数は書かない"
    >
      <text x="49" y="52" fontSize="11" fill={accent} textAnchor="middle">
        しばりあり
      </text>
      <text x="223" y="52" fontSize="11" fill={muted} textAnchor="middle">
        残りは自由に並べる
      </text>
      {slot(20, "限られた種類", true, "s0")}
      {slot(106, "自由", false, "s1")}
      {slot(192, "自由", false, "s2")}
      {slot(278, "自由", false, "s3")}
      <text x="170" y="160" fontSize="11" fill={accent} textAnchor="middle">
        しばりの強い先頭から埋める？ 端から埋める？
      </text>
    </svg>
  );
}

/** 系6 step1: 減らない枝の樹形図（使っても減らない）。総数は描かない。 */
export function CountTreeConst() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const dot = (x: number, y: number, key: string) => (
    <circle
      key={key}
      cx={x}
      cy={y}
      r="8"
      fill={fillColor}
      stroke={stroke}
      strokeWidth="1.2"
    />
  );
  /** どの段からも同じ 3 本が伸び続ける（使っても減らない）。 */
  const firsts = [50, 116, 182];
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="減らない枝の樹形図。1段目からは3本、そのどれからも3本、さらに3本と、使っても減らないので枝が段ごとに同じ本数のまま伸び続ける。総数は書かない"
    >
      <text x="52" y="22" fontSize="11" fill={muted} textAnchor="middle">
        1回め（3本）
      </text>
      <text x="160" y="22" fontSize="11" fill={muted} textAnchor="middle">
        2回め（3本）
      </text>
      <text x="268" y="22" fontSize="11" fill={muted} textAnchor="middle">
        3回め（3本）
      </text>
      {firsts.map((fy, i) => (
        <g key={`f${i}`}>
          <path
            d={`M 30 116 L 52 ${fy}`}
            fill="none"
            stroke={muted}
            strokeWidth="1.2"
          />
          {dot(52, fy, `n${i}`)}
          {[-16, 0, 16].map((dy, j) => {
            const my = fy + dy;
            return (
              <g key={`m${i}${j}`}>
                <path
                  d={`M 60 ${fy} L 160 ${my}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {dot(160, my, `mn${i}${j}`)}
                <path
                  d={`M 168 ${my} L 268 ${my}`}
                  fill="none"
                  stroke={muted}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {dot(268, my, `rn${i}${j}`)}
              </g>
            );
          })}
        </g>
      ))}
      {dot(30, 116, "root")}
      <text x="160" y="222" fontSize="11" fill={accent} textAnchor="middle">
        枝が 3 → 3 → 3 と減らない——なぜ？
      </text>
    </svg>
  );
}

/** 系6 step5: 人→部屋の対応（選ぶ側の視点）。分け方の総数は描かない。 */
export function CountRoomChoice() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const personFill = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const roomFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  /** 4 人の子（左）が、東・西の 2 部屋（右）のどちらかを選ぶ矢印。 */
  const people = [40, 88, 136, 184];
  return (
    <svg
      viewBox="0 0 340 224"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="人から部屋への対応図。一人ずつが東の部屋か西の部屋のどちらかを選ぶ。各人の選び方は2通りで、それが人数ぶん続く。分け方の総数は書かない"
    >
      <text x="56" y="22" fontSize="11" fill={muted} textAnchor="middle">
        一人ずつが
      </text>
      <text x="260" y="22" fontSize="11" fill={muted} textAnchor="middle">
        部屋を選ぶ（2通り）
      </text>
      {/* 部屋 */}
      <rect x="228" y="40" width="86" height="52" rx="10" fill={roomFill} stroke={accent} strokeWidth="1.3" />
      <text x="271" y="71" fontSize="13" fill={accent} textAnchor="middle">東の部屋</text>
      <rect x="228" y="132" width="86" height="52" rx="10" fill={roomFill} stroke={accent} strokeWidth="1.3" />
      <text x="271" y="163" fontSize="13" fill={accent} textAnchor="middle">西の部屋</text>
      {/* 人と、どちらの部屋も選べる点線矢印 */}
      {people.map((py, i) => (
        <g key={`p${i}`}>
          <circle cx="48" cy={py} r="12" fill={personFill} stroke={stroke} strokeWidth="1.2" />
          <text x="48" y={py + 5} fontSize="12" fill={stroke} textAnchor="middle">{i + 1}</text>
          <path d={`M 62 ${py} L 226 66`} fill="none" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
          <path d={`M 62 ${py} L 226 158`} fill="none" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
        </g>
      ))}
      <text x="150" y="214" fontSize="11" fill={accent} textAnchor="middle">
        「分ける」を「各人が選ぶ」と見ると？
      </text>
    </svg>
  );
}

/** 系6 step10: 減る枝と減らない枝の対比。両方の総数は描かない。 */
export function CountTwoTrees() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const dot = (x: number, y: number, key: string, faded = false) => (
    <circle
      key={key}
      cx={x}
      cy={y}
      r="7"
      fill={faded ? "none" : fillColor}
      stroke={faded ? muted : stroke}
      strokeWidth="1.1"
      strokeDasharray={faded ? "3 3" : undefined}
    />
  );
  /** 左＝減らない枝（3→3）／右＝減る枝（3→2）。同じ入口から、枝の伸び方だけがちがう。 */
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="減る枝と減らない枝の対比図。左は使っても減らないので枝が同じ本数のまま、右は使ったら減るので枝が1本ずつやせる。同じ入口から枝の伸び方だけがちがう。どちらの総数も書かない"
    >
      {/* 左：減らない枝 */}
      <text x="86" y="24" fontSize="11" fill={accent} textAnchor="middle">
        減らない枝（また使える）
      </text>
      {[54, 106, 158].map((fy, i) => (
        <g key={`Lf${i}`}>
          <path d={`M 24 106 L 44 ${fy}`} fill="none" stroke={muted} strokeWidth="1.1" />
          {dot(44, fy, `Ln${i}`)}
          {[-14, 0, 14].map((dy, j) => (
            <g key={`Lc${i}${j}`}>
              <path d={`M 51 ${fy} L 128 ${fy + dy}`} fill="none" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
              {dot(128, fy + dy, `Lcn${i}${j}`)}
            </g>
          ))}
        </g>
      ))}
      {dot(24, 106, "Lroot")}
      <text x="86" y="204" fontSize="11" fill={muted} textAnchor="middle">
        3 → 3
      </text>
      {/* 仕切り */}
      <path d="M 170 40 L 170 200" fill="none" stroke={accent} strokeWidth="1.1" strokeDasharray="2 5" />
      {/* 右：減る枝 */}
      <text x="256" y="24" fontSize="11" fill={muted} textAnchor="middle">
        減る枝（使ったら消える）
      </text>
      {[54, 106, 158].map((fy, i) => (
        <g key={`Rf${i}`}>
          <path d={`M 196 106 L 216 ${fy}`} fill="none" stroke={muted} strokeWidth="1.1" />
          {dot(216, fy, `Rn${i}`)}
          {[-10, 10].map((dy, j) => (
            <g key={`Rc${i}${j}`}>
              <path d={`M 223 ${fy} L 300 ${fy + dy}`} fill="none" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
              {dot(300, fy + dy, `Rcn${i}${j}`)}
            </g>
          ))}
          {dot(300, fy - 26, `Rfade${i}`, true)}
        </g>
      ))}
      {dot(196, 106, "Rroot")}
      <text x="256" y="204" fontSize="11" fill={muted} textAnchor="middle">
        3 → 2
      </text>
      <text x="170" y="226" fontSize="11" fill={accent} textAnchor="middle">
        分かれ目は「使ったら減るか、減らないか」だけ
      </text>
    </svg>
  );
}

/** 系7 step1: 順列の一覧が同じ顔ぶれごとに束になる（順列→組）。組の総数は描かない。 */
export function CountPermBundle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const bundleFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const chip = (x: number, y: number, label: string, key: string) => (
    <g key={key}>
      <rect x={x - 26} y={y - 12} width="52" height="24" rx="5" fill={fillColor} stroke={stroke} strokeWidth="1.1" />
      <text x={x} y={y + 5} fontSize="12" fill={stroke} textAnchor="middle">{label}</text>
    </g>
  );
  /** 同じ 3 人「甲・乙・丙」の並べ方 6 通り（順列）が、1 つの組に束ねられる。 */
  const perms = ["甲乙丙", "甲丙乙", "乙甲丙", "乙丙甲", "丙甲乙", "丙乙甲"];
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="順列の一覧が同じ顔ぶれごとに束になる図。同じ3人の並べ方6通りが、順番を区別しない1つの組に束ねられる。束の中身は6つ。組の総数は書かない"
    >
      <text x="76" y="22" fontSize="11" fill={muted} textAnchor="middle">
        並べ方（順番あり）
      </text>
      <text x="272" y="22" fontSize="11" fill={muted} textAnchor="middle">
        同じ組（順番なし）
      </text>
      <rect x="16" y="34" width="120" height="176" rx="12" fill={bundleFill} stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
      {perms.map((p, i) => chip(76, 54 + i * 30, p, `p${i}`))}
      <path d="M 140 122 L 232 122" fill="none" stroke={muted} strokeWidth="1.2" />
      {chip(272, 122, "甲乙丙", "grp")}
      <text x="76" y="228" fontSize="11" fill={accent} textAnchor="middle">
        1 組が「並べ替えの数」だけ束になる——割る数は？
      </text>
    </svg>
  );
}

/** 系7 step9: 多角形と頂点の選びの対応（3頂点で三角形）。図形の個数は描かない。 */
export function CountPolygonPick() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dotFill = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const cx = 110;
  const cy = 118;
  const R = 76;
  const N = 13;
  const pts = Array.from({ length: N }, (_, k) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / N;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const chosen = [0, 3, 5];
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="多角形の頂点から3つを選ぶと三角形が1つ決まる対応図。頂点を選ぶことと三角形を作ることが同じになる。三角形の総数は書かない"
    >
      {/* 多角形の辺 */}
      <polygon
        points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke={muted}
        strokeWidth="1.1"
      />
      {/* 選んだ 3 頂点で作る三角形 */}
      <polygon
        points={chosen.map((k) => `${pts[k].x},${pts[k].y}`).join(" ")}
        fill="color-mix(in oklch, var(--accent) 8%, transparent)"
        stroke={accent}
        strokeWidth="1.6"
      />
      {pts.map((p, k) => (
        <circle
          key={`v${k}`}
          cx={p.x}
          cy={p.y}
          r={chosen.includes(k) ? 7 : 5}
          fill={chosen.includes(k) ? dotFill : "none"}
          stroke={chosen.includes(k) ? accent : stroke}
          strokeWidth="1.3"
        />
      ))}
      <text x="250" y="96" fontSize="12" fill={muted} textAnchor="middle">3 頂点を</text>
      <text x="250" y="116" fontSize="12" fill={muted} textAnchor="middle">選ぶと</text>
      <text x="250" y="136" fontSize="12" fill={accent} textAnchor="middle">三角形が1つ</text>
      <text x="110" y="224" fontSize="11" fill={accent} textAnchor="middle">
        「選ぶ」と「三角形を作る」は同じ？
      </text>
    </svg>
  );
}

/** 系8 step1: 番号つき円卓。席が区別できるうちは、円卓もただの順列。 */
export function CountCircleNum() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const cx = 118;
  const cy = 118;
  const R = 72;
  const N = 8;
  const seats = Array.from({ length: N }, (_, k) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / N;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), n: k + 1 };
  });
  return (
    <svg
      viewBox="0 0 340 236"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="1番から8番まで番号のついた席がある円卓の図。席が区別できる。座り方の総数は書かない"
    >
      <circle cx={cx} cy={cy} r={R - 26} fill="none" stroke={muted} strokeWidth="1.1" />
      {seats.map((s) => (
        <g key={`s${s.n}`}>
          <circle cx={s.x} cy={s.y} r={15} fill={fillColor} stroke={stroke} strokeWidth="1.2" />
          <text x={s.x} y={s.y + 4} fontSize="12" fill={stroke} textAnchor="middle">
            {s.n}
          </text>
        </g>
      ))}
      <text x="262" y="106" fontSize="12" fill={muted} textAnchor="middle">席に番号が</text>
      <text x="262" y="124" fontSize="12" fill={muted} textAnchor="middle">あるなら…</text>
      <text x="118" y="228" fontSize="11" fill={accent} textAnchor="middle">
        円くても、これは系5 の並べと同じ？
      </text>
    </svg>
  );
}

/** 系8 step2: 1つの座り方が回転で束になる図。円順列の総数は書かない。 */
export function CountRotateBundle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const bundleFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  /** 小さい円卓を 4 つ並べ、同じ座り方（甲乙丙…）が回転してゆく様子を示す */
  const mini = (mx: number, rot: number, key: string) => {
    const r = 26;
    const labels = ["甲", "乙", "丙", "丁"];
    return (
      <g key={key}>
        <circle cx={mx} cy={92} r={r - 12} fill="none" stroke={muted} strokeWidth="1" />
        {labels.map((l, k) => {
          const a = -Math.PI / 2 + (2 * Math.PI * ((k + rot) % 4)) / 4;
          return (
            <text
              key={`${key}${k}`}
              x={mx + r * Math.cos(a)}
              y={92 + r * Math.sin(a) + 4}
              fontSize="11"
              fill={stroke}
              textAnchor="middle"
            >
              {l}
            </text>
          );
        })}
      </g>
    );
  };
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="同じ座り方がテーブルごと回転して4つ並ぶ図。番号を消すと全部が同じ1つに束ねられる。総数は書かない"
    >
      <rect x="10" y="46" width="320" height="94" rx="12" fill={bundleFill} stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
      {[0, 1, 2, 3].map((r) => mini(52 + r * 78, r, `m${r}`))}
      <text x="170" y="30" fontSize="11" fill={muted} textAnchor="middle">
        1 つの座り方を、テーブルごと回すと…
      </text>
      <text x="170" y="164" fontSize="11" fill={accent} textAnchor="middle">
        番号を消したら、この束はぜんぶ「同じ」——束の中身は何個？
      </text>
    </svg>
  );
}

/** 系8 step9: 裏返しで重なる2つの配置（ブレスレット）。総数は書かない。 */
export function CountFlipPair() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const ring = (mx: number, mirror: boolean, key: string) => {
    const r = 34;
    const labels = ["あ", "い", "う", "え", "お"];
    return (
      <g key={key}>
        <circle cx={mx} cy={100} r={r - 14} fill="none" stroke={muted} strokeWidth="1.1" />
        {labels.map((l, k) => {
          const base = -Math.PI / 2 + (2 * Math.PI * k) / 5;
          const a = mirror ? Math.PI - base : base;
          return (
            <text
              key={`${key}${k}`}
              x={mx + r * Math.cos(a)}
              y={100 + r * Math.sin(a) + 4}
              fontSize="12"
              fill={stroke}
              textAnchor="middle"
            >
              {l}
            </text>
          );
        })}
      </g>
    );
  };
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="ビーズの輪と、それを裏返した鏡うつしの輪が並ぶ図。裏返して重なるものを同じとみなす。総数は書かない"
    >
      {ring(90, false, "a")}
      {ring(250, true, "b")}
      <path d="M 148 100 L 192 100" fill="none" stroke={accent} strokeWidth="1.4" strokeDasharray="5 3" />
      <text x="170" y="88" fontSize="11" fill={accent} textAnchor="middle">裏返すと…</text>
      <text x="170" y="180" fontSize="11" fill={accent} textAnchor="middle">
        この 2 つを「同じ」とみなすなら、さらに何で割る？
      </text>
    </svg>
  );
}

/** 系9 step1: 番号つきの列が、番号を消すと束になる図（同じものを含む順列）。総数は書かない。 */
export function CountSameBundle() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const bundleFill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const chip = (x: number, y: number, label: string, sub: string, key: string) => (
    <g key={key}>
      <rect x={x - 16} y={y - 13} width="32" height="26" rx="5" fill={fillColor} stroke={stroke} strokeWidth="1.1" />
      <text x={x - 3} y={y + 5} fontSize="13" fill={stroke} textAnchor="middle">{label}</text>
      {sub ? (
        <text x={x + 9} y={y + 8} fontSize="8" fill={muted} textAnchor="middle">{sub}</text>
      ) : null}
    </g>
  );
  /** 番号つき「か1 か2 い」と「か2 か1 い」が、番号を消すと同じ「かかい」に束なる */
  const row = (y: number, labels: [string, string][], key: string) => (
    <g key={key}>
      {labels.map(([l, s], j) => chip(46 + j * 40, y, l, s, `${key}${j}`))}
    </g>
  );
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="番号をつけて区別した2つの列が、番号を消すと同じ1つの列に束ねられる図。総数は書かない"
    >
      <text x="86" y="24" fontSize="11" fill={muted} textAnchor="middle">
        番号つき（区別あり）
      </text>
      <text x="266" y="24" fontSize="11" fill={muted} textAnchor="middle">
        番号を消すと
      </text>
      <rect x="14" y="36" width="146" height="118" rx="10" fill={bundleFill} stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
      {row(62, [["か", "1"], ["か", "2"], ["い", ""]], "r1")}
      {row(122, [["か", "2"], ["か", "1"], ["い", ""]], "r2")}
      <path d="M 166 95 L 212 95" fill="none" stroke={muted} strokeWidth="1.2" />
      {row(95, [], "r0")}
      <g>
        {["か", "か", "い"].map((l, j) => (
          <g key={`g${j}`}>
            <rect x={226 + j * 40 - 16} y={82} width="32" height="26" rx="5" fill={fillColor} stroke={stroke} strokeWidth="1.1" />
            <text x={226 + j * 40} y={100} fontSize="13" fill={stroke} textAnchor="middle">{l}</text>
          </g>
        ))}
      </g>
      <text x="170" y="178" fontSize="11" fill={accent} textAnchor="middle">
        番号を消すと、いくつずつが同じ列に化ける？
      </text>
    </svg>
  );
}

/** 系9 step5: 同じ文字のかたまりを1つの枠でくくる図。総数は書かない。 */
export function CountBlock() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillColor = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const chip = (x: number, label: string, key: string) => (
    <g key={key}>
      <rect x={x - 15} y={78} width="30" height="28" rx="5" fill={fillColor} stroke={stroke} strokeWidth="1.1" />
      <text x={x} y={97} fontSize="13" fill={stroke} textAnchor="middle">{label}</text>
    </g>
  );
  const seq = ["り", "り", "り", "す", "と", "す", "と"];
  return (
    <svg
      viewBox="0 0 340 180"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="り3枚をひとかたまりの枠でくくり、1文字あつかいで並べる図。かたまりの中は同じ文字。総数は書かない"
    >
      <rect x="16" y="66" width="112" height="52" rx="10" fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="5 3" />
      {seq.map((l, j) => chip(34 + j * 38, l, `c${j}`))}
      <text x="72" y="52" fontSize="11" fill={accent} textAnchor="middle">
        ひとかたまり（1文字あつかい）
      </text>
      <text x="170" y="150" fontSize="11" fill={accent} textAnchor="middle">
        かたまりの中は同じ「り」——中の入れかえは、数える？
      </text>
    </svg>
  );
}

/** 系10 step1: 格子の最短経路と矢印の列の対応。経路数は書かない。 */
export function CountGridArrows() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const g0 = 30;
  const cell = 34;
  const lines = [0, 1, 2];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="右2区画・上2区画の格子と、1本の最短経路を右右上上の矢印の列に分解する対応図。経路の総数は書かない"
    >
      {lines.map((k) => (
        <g key={`gl${k}`}>
          <path d={`M ${g0} ${138 - k * cell} L ${g0 + 2 * cell} ${138 - k * cell}`} fill="none" stroke={muted} strokeWidth="1" />
          <path d={`M ${g0 + k * cell} 138 L ${g0 + k * cell} ${138 - 2 * cell}`} fill="none" stroke={muted} strokeWidth="1" />
        </g>
      ))}
      {/* 例の経路：右右上上 */}
      <path
        d={`M ${g0} 138 L ${g0 + 2 * cell} 138 L ${g0 + 2 * cell} ${138 - 2 * cell}`}
        fill="none"
        stroke={accent}
        strokeWidth="2.4"
      />
      <circle cx={g0} cy={138} r={4} fill={stroke} />
      <circle cx={g0 + 2 * cell} cy={138 - 2 * cell} r={4} fill={accent} />
      <text x={g0 - 8} y={156} fontSize="11" fill={muted}>家</text>
      <text x={g0 + 2 * cell + 6} y={138 - 2 * cell + 4} fontSize="11" fill={muted}>公園</text>
      <path d="M 128 100 L 168 100" fill="none" stroke={muted} strokeWidth="1.2" />
      {["→", "→", "↑", "↑"].map((a, j) => (
        <g key={`a${j}`}>
          <rect x={182 + j * 36} y={84} width="30" height="30" rx="6" fill="color-mix(in oklch, var(--accent) 6%, transparent)" stroke={stroke} strokeWidth="1.1" />
          <text x={197 + j * 36} y={105} fontSize="15" fill={accent} textAnchor="middle">{a}</text>
        </g>
      ))}
      <text x="240" y="140" fontSize="11" fill={muted} textAnchor="middle">
        この列から、道はひとつに決まる？
      </text>
      <text x="170" y="178" fontSize="11" fill={accent} textAnchor="middle">
        道順と記号の列——数えるのは、どちらでもいい？
      </text>
    </svg>
  );
}

/** 系10 step9: ○と仕切り棒の列と詰め合わせの対応（重複組合せ）。総数は書かない。 */
export function CountStarsBars() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const seq = ["○", "○", "|", "○", "|", "|", "○", "○"];
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="○5個と仕切り棒3本の列が、4種類の個数の組（2個・1個・0個・2個）にちょうど1つ対応する図。総数は書かない"
    >
      {seq.map((c, j) => (
        <g key={`s${j}`}>
          <rect x={26 + j * 36} y={38} width="30" height="34" rx="6" fill={c === "|" ? "color-mix(in oklch, var(--accent) 12%, transparent)" : "color-mix(in oklch, var(--accent) 4%, transparent)"} stroke={c === "|" ? accent : stroke} strokeWidth="1.1" />
          <text x={41 + j * 36} y={62} fontSize="15" fill={c === "|" ? accent : stroke} textAnchor="middle">{c}</text>
        </g>
      ))}
      {[
        { x: 60, label: "1種類め 2個" },
        { x: 132, label: "2種類め 1個" },
        { x: 190, label: "3種類め 0個" },
        { x: 280, label: "4種類め 2個" },
      ].map((t, j) => (
        <text key={`t${j}`} x={t.x} y={j % 2 === 0 ? 100 : 120} fontSize="10" fill={muted} textAnchor="middle">
          {t.label}
        </text>
      ))}
      <text x="170" y="152" fontSize="11" fill={accent} textAnchor="middle">
        ○と棒の列ひとつで、詰め合わせはちょうどひとつ決まる？
      </text>
    </svg>
  );
}

/** 集合と論理 系1 step1: 判定基準が明確な集まり。要素の列挙（答え）は書かない。 */
export function SetMembers() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillA = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="条件の札がついた集まりの輪。輪の外に数がいくつか並び、輪の入口で『入る？入らない？』と判定される図。どの数が入るか（答え）は書かない"
    >
      <ellipse
        cx="220"
        cy="95"
        rx="86"
        ry="62"
        fill={fillA}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="220" y="46" fontSize="13" fill={stroke} textAnchor="middle">
        A
      </text>
      {/* 条件の札 */}
      <rect
        x="158"
        y="78"
        width="124"
        height="34"
        rx="6"
        fill="var(--background)"
        stroke={accent}
        strokeWidth="1.2"
      />
      <text x="220" y="93" fontSize="10" fill={stroke} textAnchor="middle">
        条件：〜以上〜以下の
      </text>
      <text x="220" y="106" fontSize="10" fill={stroke} textAnchor="middle">
        奇数（判定基準つき）
      </text>
      {/* 外に並ぶ候補たち */}
      <text x="26" y="60" fontSize="13" fill={stroke} textAnchor="middle">
        ?
      </text>
      <text x="44" y="100" fontSize="13" fill={stroke} textAnchor="middle">
        ?
      </text>
      <text x="28" y="140" fontSize="13" fill={stroke} textAnchor="middle">
        ?
      </text>
      <path
        d="M 60 98 L 122 96"
        stroke={muted}
        strokeWidth="1.2"
        markerEnd="none"
        strokeDasharray="4 3"
      />
      <text x="91" y="88" fontSize="10" fill={accent} textAnchor="middle">
        入る？入らない？
      </text>
      <text x="170" y="178" fontSize="11" fill={accent} textAnchor="middle">
        「誰が調べても同じ」に決めているものは、何？
      </text>
    </svg>
  );
}

/** 集合と論理 系1 step5: 部分集合——内側に収まる輪。部分集合の個数（答え）は書かない。 */
export function SetSubset() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const fillA = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const fillB = "color-mix(in oklch, var(--accent) 18%, transparent)";
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="大きい輪Aの内側にすっぽり収まる輪Bと、縁からはみ出す輪Cが並ぶ図。どちらが部分集合か（答え）は書かない"
    >
      <ellipse
        cx="150"
        cy="95"
        rx="110"
        ry="70"
        fill={fillA}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="150" y="42" fontSize="13" fill={stroke} textAnchor="middle">
        A
      </text>
      <circle
        cx="112"
        cy="105"
        r="34"
        fill={fillB}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x="112" y="109" fontSize="12" fill={stroke} textAnchor="middle">
        B
      </text>
      <circle
        cx="238"
        cy="120"
        r="34"
        fill="transparent"
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="5 3"
      />
      <text x="246" y="124" fontSize="12" fill={stroke} textAnchor="middle">
        C
      </text>
      <text x="170" y="180" fontSize="11" fill={accent} textAnchor="middle">
        メンバー全員が A の中——それはどちらの輪？
      </text>
    </svg>
  );
}

/** 集合と論理 系1 step8: 部分集合と○×列の1対1対応。総数（答え）は書かない。 */
export function SetSubsetBits() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="要素の列に○か×を割り当てると部分集合が1つ決まる対応の図。部分集合の総数（答え）は書かない"
    >
      <text x="60" y="34" fontSize="11" fill={muted} textAnchor="middle">
        要素
      </text>
      {["a", "b", "c", "…"].map((label, idx) => (
        <text
          key={label}
          x={120 + idx * 52}
          y={34}
          fontSize="12"
          fill={stroke}
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
      {/* 1行目の○×列 */}
      <text x="60" y="78" fontSize="11" fill={muted} textAnchor="middle">
        選び方
      </text>
      {["○", "×", "○", "…"].map((mark, idx) => (
        <text
          key={`r1-${idx}`}
          x={120 + idx * 52}
          y={78}
          fontSize="14"
          fill={mark === "○" ? accent : stroke}
          textAnchor="middle"
        >
          {mark}
        </text>
      ))}
      <path d="M 92 96 L 248 96" stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      <text x="270" y="100" fontSize="11" fill={stroke} textAnchor="middle">
        ↕ 1対1
      </text>
      {/* 対応する部分集合（中身は伏せる） */}
      <rect
        x="96"
        y="112"
        width="148"
        height="36"
        rx="8"
        fill="color-mix(in oklch, var(--accent) 8%, transparent)"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x="170" y="134" fontSize="12" fill={stroke} textAnchor="middle">
        部分集合がひとつ決まる
      </text>
      <text x="170" y="186" fontSize="11" fill={accent} textAnchor="middle">
        ○×の列と部分集合は、過不足なく対応している？
      </text>
    </svg>
  );
}

/** 集合と論理 系2 step5: 3 つの輪。答えの塗り（結果の領域）は書かない。 */
export function SetVennThree() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const fillA = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="3つの輪A・B・Cが互いに重なり合う図。かっこの順序で先に作る領域が変わることを問う。どの領域が答えか（塗りの結果）は書かない"
    >
      <circle
        cx="132"
        cy="92"
        r="60"
        fill={fillA}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <circle
        cx="208"
        cy="92"
        r="60"
        fill={fillA}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <circle
        cx="170"
        cy="150"
        r="60"
        fill={fillA}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="96" y="72" fontSize="14" fill={stroke} textAnchor="middle">
        A
      </text>
      <text x="244" y="72" fontSize="14" fill={stroke} textAnchor="middle">
        B
      </text>
      <text x="170" y="192" fontSize="14" fill={stroke} textAnchor="middle">
        C
      </text>
      <text x="170" y="16" fontSize="11" fill={accent} textAnchor="middle">
        先に合わせる？ 先に重ねる？——かっこはどちらを命じている？
      </text>
    </svg>
  );
}

/**
 * 集合 系3 step5・辞書: ド・モルガンの「塗り比べ」2 枚。
 * 左＝「合わせてから外を見る」道、右＝「それぞれの外の重なり」道。
 * 「一致する」という宣言は書かず、キャプションは問いで終える
 * （2 つの道が同じ場所に着くかどうかは学習者が塗って発見する）。
 */
export function SetDeMorgan() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const bg = "var(--background)";
  const fillUnion = "color-mix(in oklch, var(--accent) 20%, transparent)";
  const fillOutside = "color-mix(in oklch, var(--accent) 14%, transparent)";
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="2 枚の塗り比べ図。左は A と B を合わせた領域を塗り『その外を見ると？』と問い、右は A の外と B の外の重なりを塗る。2 つの道が同じ場所に着くかどうか（＝答え）は書かない"
    >
      {/* 左パネル：A ∪ B を作って、その外を見る道 */}
      <text x="90" y="24" fontSize="11" fill={muted} textAnchor="middle">
        合わせてから、外を見る道
      </text>
      <rect
        x="14"
        y="34"
        width="152"
        height="120"
        rx="8"
        fill={bg}
        stroke={stroke}
        strokeWidth="1.1"
        strokeDasharray="4 3"
      />
      <circle cx="74" cy="92" r="34" fill={fillUnion} stroke={stroke} strokeWidth="1.3" />
      <circle cx="108" cy="92" r="34" fill={fillUnion} stroke={stroke} strokeWidth="1.3" />
      <text x="54" y="70" fontSize="12" fill={stroke} textAnchor="middle">A</text>
      <text x="128" y="70" fontSize="12" fill={stroke} textAnchor="middle">B</text>
      <text x="90" y="148" fontSize="10.5" fill={accent} textAnchor="middle">
        塗ったのは「A または B」——その外は？
      </text>

      {/* 右パネル：A の外・B の外の重なり（外側を塗り、輪の中は背景でくり抜く） */}
      <text x="270" y="24" fontSize="11" fill={muted} textAnchor="middle">
        それぞれの外の、重なりの道
      </text>
      <rect
        x="194"
        y="34"
        width="152"
        height="120"
        rx="8"
        fill={fillOutside}
        stroke={stroke}
        strokeWidth="1.1"
        strokeDasharray="4 3"
      />
      <circle cx="254" cy="92" r="34" fill={bg} stroke={stroke} strokeWidth="1.3" />
      <circle cx="288" cy="92" r="34" fill={bg} stroke={stroke} strokeWidth="1.3" />
      <text x="234" y="70" fontSize="12" fill={stroke} textAnchor="middle">A</text>
      <text x="308" y="70" fontSize="12" fill={stroke} textAnchor="middle">B</text>
      <text x="270" y="148" fontSize="10.5" fill={accent} textAnchor="middle">
        塗ったのは「A でなく B でもない」
      </text>

      <text x="180" y="182" fontSize="12" fill={accent} textAnchor="middle">
        2 つの道は、同じ場所を塗っている？
      </text>
      <text x="180" y="202" fontSize="10.5" fill={muted} textAnchor="middle">
        自分で塗り重ねて、確かめてみよう。
      </text>
    </svg>
  );
}

/**
 * LOGIC_NUMLINE_GAP（系4 step1）：数直線上に、p を満たす範囲と q を満たす範囲を
 * ずらして重ねて描く。2 つの範囲の「ずれ」＝約束破り（反例）の住むすき間を「?」で示す。
 * 反例そのものの値は書かない（自得を裏切らない）。問いで終える。
 */
export function LogicNumlineGap() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillP = "color-mix(in oklch, var(--accent) 22%, transparent)";
  const fillGap = "color-mix(in oklch, var(--accent) 12%, transparent)";
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="数直線図。上の帯は『p を満たす範囲』、下の帯は『q を満たす範囲』で、q のほうが右にずれて始まる。p にはいるのに q からこぼれるすき間に「?」を置き、約束を破るものがそこにいるかを問う。反例の値は書かない"
    >
      {/* 数直線本体 */}
      <line x1="24" y1="150" x2="340" y2="150" stroke={stroke} strokeWidth="1.4" />
      <polygon points="340,150 332,146 332,154" fill={stroke} />
      <line x1="150" y1="146" x2="150" y2="154" stroke={stroke} strokeWidth="1.2" />
      <line x1="238" y1="146" x2="238" y2="154" stroke={stroke} strokeWidth="1.2" />
      <text x="150" y="170" fontSize="10.5" fill={muted} textAnchor="middle">
        p の左はし
      </text>
      <text x="238" y="170" fontSize="10.5" fill={muted} textAnchor="middle">
        q の左はし
      </text>

      {/* p を満たす範囲（上の帯・p の左はしから右へ） */}
      <text x="30" y="46" fontSize="11" fill={muted} textAnchor="start">
        p を満たす範囲
      </text>
      <rect x="150" y="54" width="182" height="14" rx="4" fill={fillP} stroke={accent} strokeWidth="1.2" />
      <polygon points="332,61 322,55 322,67" fill={accent} />

      {/* q を満たす範囲（下の帯・q の左はしから右へ） */}
      <text x="30" y="100" fontSize="11" fill={muted} textAnchor="start">
        q を満たす範囲
      </text>
      <rect x="238" y="108" width="94" height="14" rx="4" fill={fillP} stroke={accent} strokeWidth="1.2" />
      <polygon points="332,115 322,109 322,121" fill={accent} />

      {/* すき間（p にはいるが q からこぼれる帯） */}
      <rect x="150" y="82" width="88" height="12" rx="3" fill={fillGap} stroke={accent} strokeWidth="1" strokeDasharray="3 2" />
      <text x="194" y="91" fontSize="10" fill={accent} textAnchor="middle">
        ?
      </text>

      <text x="180" y="16" fontSize="12" fill={accent} textAnchor="middle">
        約束を破るものは、このすき間にいる？
      </text>
    </svg>
  );
}

/**
 * LOGIC_ARROW_ONEWAY（系4 step5）：内側の輪 p から外側の輪 q への一方通行の矢印。
 * 逆向き（q → p）には進入禁止マークを置いて、行きは歩けても帰りは歩けるとは限らない
 * ことを示す。各命題の真偽は書かない。問いで終える。
 */
export function LogicArrowOneway() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const bg = "var(--background)";
  const fillInner = "color-mix(in oklch, var(--accent) 20%, transparent)";
  const fillOuter = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const noEntry = "color-mix(in oklch, var(--accent) 55%, var(--foreground))";
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="内側の小さな輪 p が、外側の大きな輪 q に含まれている図。p から q へは一方通行の矢印が通り、q から p へ戻る向きには進入禁止マークが置かれている。行きは歩けても帰り道も歩けるかを問う。命題の真偽は書かない"
    >
      {/* 外側の輪 q */}
      <circle cx="130" cy="108" r="82" fill={fillOuter} stroke={stroke} strokeWidth="1.3" />
      <text x="130" y="52" fontSize="13" fill={stroke} textAnchor="middle">q</text>
      {/* 内側の輪 p */}
      <circle cx="112" cy="120" r="40" fill={fillInner} stroke={stroke} strokeWidth="1.3" />
      <text x="112" y="125" fontSize="13" fill={stroke} textAnchor="middle">p</text>

      {/* 行き：p ならば q（一方通行の矢印） */}
      <line x1="172" y1="96" x2="252" y2="80" stroke={accent} strokeWidth="2" />
      <polygon points="252,80 242,78 245,88" fill={accent} />
      <text x="214" y="66" fontSize="11" fill={accent} textAnchor="middle">
        p ならば q
      </text>

      {/* 帰り：進入禁止（q → p は保証されない） */}
      <line x1="252" y1="132" x2="176" y2="146" stroke={muted} strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="214" y="128" fontSize="11" fill={muted} textAnchor="middle">
        q ならば p ？
      </text>
      {/* 進入禁止マーク */}
      <circle cx="300" cy="112" r="18" fill={bg} stroke={noEntry} strokeWidth="2.4" />
      <line x1="288" y1="112" x2="312" y2="112" stroke={noEntry} strokeWidth="2.4" />

      <text x="180" y="186" fontSize="12" fill={accent} textAnchor="middle">
        行きは歩けても、帰り道も同じように歩ける？
      </text>
    </svg>
  );
}

/**
 * LOGIC_CHART（系5 step5・辞書 対偶）：もとの命題 p ⇒ q を左上に置き、
 * 逆（ひっくり返す）・裏（否定する）・対偶（否定してひっくり返す）を
 * 四つ角に配してラベル付きの矢印でつなぐチャート。
 * 真偽の一致関係（＝答え）は書かない。問いで終える。
 */
export function LogicChart() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const bg = "var(--background)";
  // すべてのボックスを同じ見た目にする（真偽の一致ペア＝答えを色で漏らさない）。
  const box = (x: number, y: number, tag: string, formula: string) => (
    <>
      <rect
        x={x}
        y={y}
        width="132"
        height="46"
        rx="7"
        fill={bg}
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x={x + 66} y={y + 19} fontSize="11.5" fill={muted} textAnchor="middle">
        {tag}
      </text>
      <text x={x + 66} y={y + 37} fontSize="11" fill={stroke} textAnchor="middle">
        {formula}
      </text>
    </>
  );
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="四つ角のチャート。左上にもとの命題『p ならば q』、右上に逆『q ならば p』（横向きの矢印にラベル『ひっくり返す＝逆』）、左下に裏『p でないならば q でない』（縦向きの矢印にラベル『否定する＝裏』）、右下に対偶『q でないならば p でない』（ななめの矢印にラベル『否定してひっくり返す＝対偶』）。この 4 つのうちもとと真偽が必ず一致するのはどれかを問う。真偽の一致関係は書かない"
    >
      {/* 4 つのボックス（見た目は同じ・答えを漏らさない） */}
      {box(24, 30, "もと", "p ならば q")}
      {box(204, 30, "逆", "q ならば p")}
      {box(24, 150, "裏", "p でない → q でない")}
      {box(204, 150, "対偶", "q でない → p でない")}

      {/* 逆：もと → 右（ひっくり返す・横） */}
      <line x1="156" y1="53" x2="204" y2="53" stroke={muted} strokeWidth="1.5" />
      <polygon points="204,53 194,49 194,57" fill={muted} />
      <text x="180" y="45" fontSize="9.5" fill={muted} textAnchor="middle">
        ひっくり返す
      </text>

      {/* 裏：もと → 下（否定する・縦） */}
      <line x1="90" y1="76" x2="90" y2="150" stroke={muted} strokeWidth="1.5" />
      <polygon points="90,150 86,140 94,140" fill={muted} />
      <text x="62" y="116" fontSize="9.5" fill={muted} textAnchor="middle">
        否定する
      </text>

      {/* 対偶：もと → 右下（否定してひっくり返す・ななめ） */}
      <line x1="150" y1="72" x2="214" y2="150" stroke={muted} strokeWidth="1.5" strokeDasharray="5 3" />
      <polygon points="214,150 204,146 210,138" fill={muted} />
      <text x="205" y="104" fontSize="9.5" fill={muted} textAnchor="middle">
        否定して
      </text>
      <text x="205" y="116" fontSize="9.5" fill={muted} textAnchor="middle">
        ひっくり返す
      </text>

      <text x="180" y="238" fontSize="11.5" fill={accent} textAnchor="middle">
        この 4 つのうち、もとと真偽が必ず一致するのはどれ？
      </text>
    </svg>
  );
}

/**
 * SET_NECSUF（系6 step1・辞書 十分条件／必要条件）：内側の小さな輪と外側の
 * 大きな輪。内側に立つ／外側にいない、という立ち位置で条件の名前が変わることを
 * 問いで気づかせる。「十分」「必要」のラベル（＝答え）は書かない。
 */
export function SetNecSuf() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillInner = "color-mix(in oklch, var(--accent) 20%, transparent)";
  const fillOuter = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="内側の小さな輪が、外側の大きな輪にすっぽり含まれている図。内側の輪に立つと外側は確定するか、外側の輪にいないと内側の可能性は残るか、という立ち位置を問う。『十分』『必要』のラベルは書かない"
    >
      {/* 外側の大きな輪 */}
      <circle cx="150" cy="108" r="86" fill={fillOuter} stroke={stroke} strokeWidth="1.3" />
      <text x="150" y="46" fontSize="12" fill={muted} textAnchor="middle">
        外側の条件
      </text>
      {/* 内側の小さな輪 */}
      <circle cx="132" cy="122" r="42" fill={fillInner} stroke={stroke} strokeWidth="1.3" />
      <text x="132" y="127" fontSize="12" fill={muted} textAnchor="middle">
        内側の条件
      </text>

      {/* 立ち位置を示す小さな人（点）。答えは書かない */}
      <circle cx="132" cy="150" r="3.5" fill={accent} />
      <text x="248" y="96" fontSize="10.5" fill={accent} textAnchor="start">
        内側に立つと
      </text>
      <text x="248" y="110" fontSize="10.5" fill={accent} textAnchor="start">
        外側は確定？
      </text>
      <text x="248" y="140" fontSize="10.5" fill={muted} textAnchor="start">
        外側にいないと
      </text>
      <text x="248" y="154" fontSize="10.5" fill={muted} textAnchor="start">
        内側の望みは？
      </text>

      <text x="180" y="200" fontSize="11.5" fill={accent} textAnchor="middle">
        立つ側が変わると、条件の名前はどう変わる？
      </text>
    </svg>
  );
}

/**
 * SET_NECSUF_BREAK（系6 step5）：$1$ 点だけの集合と $2$ 点の集合。方程式の解集合が
 * 複数要素になり、包含が片側だけ生きる場面。どちらがどちらに含まれるか（包含の向き）は
 * 書かず、問いで終える。
 */
export function SetNecSufBreak() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 14%, transparent)";
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="左に点が 1 つだけ入った集合、右に点が 2 つ入った集合を並べた図。1 点の集合は 2 点の集合にすっぽり入るか、包含はどちら向きに立つかを問う。包含の向きは書かない"
    >
      {/* 1 点だけの集合（左） */}
      <text x="96" y="34" fontSize="11" fill={muted} textAnchor="middle">
        1 点だけの集合
      </text>
      <ellipse cx="96" cy="108" rx="56" ry="46" fill={fill} stroke={stroke} strokeWidth="1.3" />
      <circle cx="96" cy="108" r="5" fill={accent} />

      {/* 2 点の集合（右） */}
      <text x="264" y="34" fontSize="11" fill={muted} textAnchor="middle">
        2 点の集合
      </text>
      <ellipse cx="264" cy="108" rx="62" ry="50" fill={fill} stroke={stroke} strokeWidth="1.3" />
      <circle cx="240" cy="108" r="5" fill={accent} />
      <circle cx="288" cy="108" r="5" fill={accent} />

      <text x="180" y="188" fontSize="11.5" fill={accent} textAnchor="middle">
        小さい方は大きい方にすっぽり入る？ 向きはどちら？
      </text>
    </svg>
  );
}

/**
 * PROOF_PARITY（系7 step1・辞書 背理法）：偶数 $2k$ の箱と奇数 $2k+1$ の箱。
 * 偶数・奇数を「式の形」で見る絵。$2$ で割った余りの値（＝答え）は書かず、
 * 「自分自身とかけ合わせると、どちらの仲間になる？」と問いで終える。
 */
export function ProofParity() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fillEven = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const fillOdd = "color-mix(in oklch, var(--accent) 8%, transparent)";
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="左に偶数を式で表した箱（2k）、右に奇数を式で表した箱（2k+1）を並べた図。奇数を自分自身とかけ合わせると偶数と奇数のどちらの仲間になるかを問う。2 で割った余りの値は書かない"
    >
      {/* 偶数の箱 */}
      <text x="96" y="34" fontSize="11" fill={muted} textAnchor="middle">
        偶数の箱
      </text>
      <rect x="36" y="52" width="120" height="70" rx="8" fill={fillEven} stroke={stroke} strokeWidth="1.3" />
      <text x="96" y="95" fontSize="22" fill={stroke} textAnchor="middle">
        2k
      </text>
      <text x="96" y="140" fontSize="10.5" fill={muted} textAnchor="middle">
        2 でちょうど分けられる
      </text>

      {/* 奇数の箱 */}
      <text x="264" y="34" fontSize="11" fill={muted} textAnchor="middle">
        奇数の箱
      </text>
      <rect x="204" y="52" width="120" height="70" rx="8" fill={fillOdd} stroke={stroke} strokeWidth="1.3" />
      <text x="264" y="95" fontSize="22" fill={stroke} textAnchor="middle">
        2k + 1
      </text>
      <text x="264" y="140" fontSize="10.5" fill={muted} textAnchor="middle">
        2 で分けると 1 だけあまる
      </text>

      <text x="180" y="172" fontSize="11.5" fill={accent} textAnchor="middle">
        自分自身とかけ合わせると、どちらの仲間になる？
      </text>
    </svg>
  );
}

/**
 * PROOF_LADDER（系7 step5・辞書 背理法）：「仮定 → … → 矛盾」の梯子。
 * 各段の中身（＝証明の関節の答え）は書かず、いちばん上に矛盾の亀裂の印だけを置く。
 * 「仮定から出発して、どんな段をのぼると矛盾に着く？」と問いで終える。
 */
export function ProofLadder() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const rail = "color-mix(in oklch, var(--foreground) 45%, transparent)";
  const fill = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const danger = "color-mix(in oklch, var(--accent) 22%, transparent)";
  // 段（下＝仮定、上＝矛盾）。中の関節は空欄。
  const rungs = [
    { y: 150, label: "仮定：書けたとする", accentLabel: true },
    { y: 116, label: "？" },
    { y: 82, label: "？" },
  ];
  return (
    <svg
      viewBox="0 0 320 210"
      className="w-full h-auto"
      style={{ maxWidth: 320 }}
      role="img"
      aria-label="下から『仮定：書けたとする』、途中は空欄の段、いちばん上に矛盾の亀裂、という梯子の図。仮定から出発してどんな段をのぼると矛盾に着くかを問う。各段の中身（証明の関節の答え）は書かない"
    >
      {/* 梯子の柱 */}
      <line x1="96" y1="44" x2="96" y2="168" stroke={rail} strokeWidth="2.4" />
      <line x1="224" y1="44" x2="224" y2="168" stroke={rail} strokeWidth="2.4" />

      {/* 段（下＝仮定、上＝空欄の関節） */}
      {rungs.map((r, k) => (
        <g key={k}>
          <rect
            x="104"
            y={r.y - 13}
            width="112"
            height="26"
            rx="5"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
          />
          <text
            x="160"
            y={r.y + 4}
            fontSize={r.accentLabel ? 10.5 : 15}
            fill={r.accentLabel ? accent : muted}
            textAnchor="middle"
          >
            {r.label}
          </text>
        </g>
      ))}

      {/* いちばん上＝矛盾の亀裂 */}
      <rect x="104" y="31" width="112" height="26" rx="5" fill={danger} stroke={accent} strokeWidth="1.4" />
      <polyline
        points="150,33 156,42 148,46 156,55"
        fill="none"
        stroke={accent}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <text x="176" y="48" fontSize="11" fill={accent} textAnchor="start">
        矛盾
      </text>

      <text x="160" y="196" fontSize="11.5" fill={accent} textAnchor="middle">
        仮定から、どんな段をのぼると矛盾に着く？
      </text>
    </svg>
  );
}

/**
 * LOGIC_NUMLINE_NEG（系5 step1・辞書 否定）：不等式条件の否定の塗り分け。
 * 上の帯は「もとの条件」（境界は白丸＝入らない）、下の帯は「否定した条件」で、
 * 反対側を塗り、境界が黒丸（＝入る）に変わる。境界の 1 点の帰属が
 * 否定でどちらに移るかを問う。境界の値は書かない（自得を裏切らない）。
 */
export function LogicNumlineNeg() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 14%, transparent)";
  const bg = "var(--background)";
  const bx = 186; // 境界の x 座標
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      style={{ maxWidth: 360 }}
      role="img"
      aria-label="2 本の数直線図。上は『もとの条件』で境界より左側を塗り、境界は白丸（入らない）。下は『否定した条件』で境界より右側を塗り、境界は黒丸（入る）。境界の 1 点が否定するとどちら側に入るのかを問う。境界の値は書かない"
    >
      {/* もとの条件（上・境界より左を塗り、境界は白丸＝入らない） */}
      <text x="30" y="34" fontSize="11" fill={muted} textAnchor="start">
        もとの条件
      </text>
      <line x1="24" y1="60" x2="336" y2="60" stroke={stroke} strokeWidth="1.3" />
      <polygon points="336,60 328,56 328,64" fill={stroke} />
      <rect x="24" y="53" width={bx - 24} height="14" rx="3" fill={fill} />
      <line x1="24" y1="60" x2={bx} y2="60" stroke={accent} strokeWidth="3" />
      <circle cx={bx} cy="60" r="6" fill={bg} stroke={accent} strokeWidth="1.8" />
      <text x={bx} y="86" fontSize="10" fill={muted} textAnchor="middle">
        境界（白丸＝入らない）
      </text>

      {/* 否定した条件（下・境界より右を塗り、境界は黒丸＝入る） */}
      <text x="30" y="128" fontSize="11" fill={muted} textAnchor="start">
        否定した条件
      </text>
      <line x1="24" y1="150" x2="336" y2="150" stroke={stroke} strokeWidth="1.3" />
      <polygon points="336,150 328,146 328,154" fill={stroke} />
      <rect x={bx} y="143" width={336 - bx} height="14" rx="3" fill={fill} />
      <line x1={bx} y1="150" x2="336" y2="150" stroke={accent} strokeWidth="3" />
      <circle cx={bx} cy="150" r="6" fill={accent} stroke={accent} strokeWidth="1.8" />
      <text x={bx} y="176" fontSize="10" fill={muted} textAnchor="middle">
        境界（黒丸＝入る？）
      </text>

      <text x="180" y="200" fontSize="11.5" fill={accent} textAnchor="middle">
        境界の 1 点は、否定するとどちら側に入る？
      </text>
    </svg>
  );
}

/* ============================================================================
 * データの分析ユニット（数Ⅰ・A 第7章）の図
 * 背骨：docs/data_analysis_series_design.md §12
 * 共通の作法：答えは描かない・キャプションは問いの形で終える
 * ========================================================================== */

/** データの分析 系1 step1: 生の数の列と、階級の枠。度数（答え）は書かない。 */
export function DataTally() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 8%, transparent)";
  const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <svg
      viewBox="0 0 340 180"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="ばらばらに並んだ数の列と、「◯以上△未満」と書かれた階級の枠。枠に入る個数（答え）は書かない"
    >
      {/* 散らばった生データ（値は伏せる） */}
      <text x="14" y="24" fontSize="10" fill={muted}>
        ばらばらに並んだ記録
      </text>
      {marks.map((m) => (
        <text
          key={m}
          x={22 + (m % 6) * 52}
          y={44 + Math.floor(m / 6) * 20}
          fontSize="13"
          fill={stroke}
          textAnchor="middle"
        >
          ?
        </text>
      ))}
      {/* 枠 */}
      <rect
        x="70"
        y="96"
        width="200"
        height="40"
        rx="6"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="170" y="121" fontSize="12" fill={stroke} textAnchor="middle">
        ◯ 以上 △ 未満
      </text>
      <path
        d="M 60 78 L 120 94"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <path
        d="M 280 78 L 224 94"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text x="170" y="166" fontSize="11" fill={accent} textAnchor="middle">
        端とぴったり同じ記録は、枠の内と外、どちら？
      </text>
    </svg>
  );
}

/** データの分析 系1 step5: 同じデータ・ちがう区切りの幅。柱の高さ（答え）は描かない。 */
export function DataHistWidth() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const band = "color-mix(in oklch, var(--accent) 10%, transparent)";
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="同じデータの帯に、粗い区切りと細かい区切りを当てた図。どちらの柱が高くなるか（答え）は描かない"
    >
      {/* 上：粗い区切り */}
      <text x="14" y="22" fontSize="10" fill={muted}>
        広い幅で区切ると
      </text>
      <rect x="30" y="30" width="280" height="30" fill={band} stroke={stroke} strokeWidth="1.2" />
      {[100, 170, 240].map((x) => (
        <line key={x} x1={x} y1="30" x2={x} y2="60" stroke={stroke} strokeWidth="1.2" />
      ))}
      {[65, 135, 205, 275].map((x) => (
        <text key={x} x={x} y="52" fontSize="13" fill={accent} textAnchor="middle">
          ?
        </text>
      ))}
      {/* 下：細かい区切り */}
      <text x="14" y="102" fontSize="10" fill={muted}>
        同じデータを、せまい幅で区切ると
      </text>
      <rect x="30" y="110" width="280" height="30" fill={band} stroke={stroke} strokeWidth="1.2" />
      {[65, 100, 135, 170, 205, 240, 275].map((x) => (
        <line key={x} x1={x} y1="110" x2={x} y2="140" stroke={stroke} strokeWidth="1" strokeDasharray="3 2" />
      ))}
      {[47, 82, 117, 152, 187, 222, 257, 292].map((x) => (
        <text key={x} x={x} y="132" fontSize="11" fill={accent} textAnchor="middle">
          ?
        </text>
      ))}
      <text x="170" y="172" fontSize="11" fill={accent} textAnchor="middle">
        同じ人たちなのに、いちばん混み合う場所は
      </text>
      <text x="170" y="188" fontSize="11" fill={accent} textAnchor="middle">
        上と下で同じところにできる？
      </text>
    </svg>
  );
}

/** データの分析 系1 step9: 度数だけが残ったヒストグラム。元の値は描かない。 */
export function DataHistRead() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const freq = [2, 5, 8, 6, 4];
  const baseY = 140;
  const unit = 13;
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="度数だけが残ったヒストグラム。いちばん右の柱の中で、一人ひとりがどこにいるかは描かない"
    >
      <line x1="40" y1={baseY} x2="310" y2={baseY} stroke={stroke} strokeWidth="1.2" />
      <line x1="40" y1="24" x2="40" y2={baseY} stroke={muted} strokeWidth="1" />
      {freq.map((f, i) => (
        <rect
          key={i}
          x={45 + i * 52}
          y={baseY - f * unit}
          width="52"
          height={f * unit}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.1"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <text
          key={i}
          x={45 + i * 52}
          y={baseY + 15}
          fontSize="10"
          fill={muted}
          textAnchor="middle"
        >
          {i * 20}
        </text>
      ))}
      <text x="24" y="30" fontSize="10" fill={muted}>
        人
      </text>
      <text x="316" y={baseY + 15} fontSize="10" fill={muted} textAnchor="middle">
        分
      </text>
      {/* いちばん右の柱の中の「どこか」 */}
      <text x="297" y={baseY - 4 * unit - 8} fontSize="13" fill={accent} textAnchor="middle">
        ?
      </text>
      <text x="170" y="176" fontSize="11" fill={accent} textAnchor="middle">
        いちばん長い人は、この柱のどこにいてもいい——どこまで小さくなれる？
      </text>
    </svg>
  );
}

/** データの分析 系8 step1: 分布全体がそろって横へずれる。散らばりの結論は描かない。 */
export function DataShiftSpread() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dot = "color-mix(in oklch, var(--accent) 70%, transparent)";
  /** もとの並び（値は伏せる。たがいの間隔だけが意味を持つ）。 */
  const xs = [70, 96, 112, 148, 166];
  /** そろって動く量（同じ矢印の長さ＝全員に同じだけ）。 */
  const shift = 78;
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="上下 2 本の数直線図。上はもとの記録の並び、下は同じ並びが全体としてそろって右へ移った状態。移動の量は全員同じで、矢印の長さもすべて等しい。点どうしのへだたりがどうなるか、平均や散らばりの値は描かない"
    >
      {/* 上：もとの並び */}
      <text x="14" y="24" fontSize="10" fill={muted}>
        もとの記録
      </text>
      <line x1="24" y1="52" x2="326" y2="52" stroke={stroke} strokeWidth="1.2" />
      <polygon points="326,52 318,48 318,56" fill={stroke} />
      {xs.map((x) => (
        <circle key={x} cx={x} cy="52" r="5" fill={dot} stroke={accent} strokeWidth="1.2" />
      ))}

      {/* そろって動く矢印（全員同じ長さ） */}
      {xs.map((x) => (
        <g key={`arrow-${x}`}>
          <line
            x1={x}
            y1="66"
            x2={x + shift - 8}
            y2="66"
            stroke={muted}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <polygon
            points={`${x + shift},66 ${x + shift - 8},62.5 ${x + shift - 8},69.5`}
            fill={muted}
          />
        </g>
      ))}
      <text x="170" y="88" fontSize="10" fill={muted} textAnchor="middle">
        全員に、同じだけ
      </text>

      {/* 下：そろって移ったあと */}
      <text x="14" y="120" fontSize="10" fill={muted}>
        そろって動かしたあと
      </text>
      <line x1="24" y1="148" x2="326" y2="148" stroke={stroke} strokeWidth="1.2" />
      <polygon points="326,148 318,144 318,152" fill={stroke} />
      {xs.map((x) => (
        <circle
          key={`moved-${x}`}
          cx={x + shift}
          cy="148"
          r="5"
          fill={dot}
          stroke={accent}
          strokeWidth="1.2"
        />
      ))}

      <text x="170" y="182" fontSize="11" fill={accent} textAnchor="middle">
        居場所はそろって動いた——点どうしのへだたりは、どうなった？
      </text>
    </svg>
  );
}

/** データの分析 系8 step5: 同じ割合で伸ばすと位置も幅も広がる。何倍になるかの結論は描かない。 */
export function DataScaleSpread() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const dot = "color-mix(in oklch, var(--accent) 70%, transparent)";
  /** まん中の位置（この線からのへだたりが伸びる）。 */
  const center = 120;
  /** もとのへだたり（値は伏せる）。 */
  const devs = [-46, -18, 0, 26, 44];
  /** 伸ばす割合（数は書かない——「同じ割合で」だけを見せる）。 */
  const k = 1.7;
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="上下 2 本の数直線図。上はもとの記録の並びとまん中の線、下は同じ並びを、まん中から見て同じ割合で外へ伸ばした状態。まん中からのへだたりが伸びる様子だけを描き、平均や分散が何倍になるかは描かない"
    >
      {/* 上：もとの並び */}
      <text x="14" y="24" fontSize="10" fill={muted}>
        もとの記録
      </text>
      <line x1="24" y1="56" x2="326" y2="56" stroke={stroke} strokeWidth="1.2" />
      <polygon points="326,56 318,52 318,60" fill={stroke} />
      <line x1={center} y1="40" x2={center} y2="72" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
      <text x={center} y="36" fontSize="9.5" fill={muted} textAnchor="middle">
        まん中
      </text>
      {devs.map((d) => (
        <circle key={d} cx={center + d} cy="56" r="5" fill={dot} stroke={accent} strokeWidth="1.2" />
      ))}

      <text x="170" y="98" fontSize="10" fill={muted} textAnchor="middle">
        ものさしを取り替えて、みんなを同じ割合で伸ばすと
      </text>

      {/* 下：同じ割合で伸ばしたあと */}
      <text x="14" y="128" fontSize="10" fill={muted}>
        伸ばしたあと
      </text>
      <line x1="24" y1="160" x2="326" y2="160" stroke={stroke} strokeWidth="1.2" />
      <polygon points="326,160 318,156 318,164" fill={stroke} />
      <line x1={center * k} y1="144" x2={center * k} y2="176" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
      <text x={center * k} y="140" fontSize="9.5" fill={muted} textAnchor="middle">
        まん中
      </text>
      {devs.map((d) => (
        <circle
          key={`scaled-${d}`}
          cx={center * k + d * k}
          cy="160"
          r="5"
          fill={dot}
          stroke={accent}
          strokeWidth="1.2"
        />
      ))}

      <text x="170" y="196" fontSize="11" fill={accent} textAnchor="middle">
        まん中からのへだたりは、どれだけ伸びた？
      </text>
    </svg>
  );
}

/** データの分析 系2 step1: でこぼこをならす。ならした高さ（平均の値）は描かない。 */
export function DataLeveling() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const baseY = 140;
  /** 高さはわざと不ぞろい。平均の位置が読めないよう、目盛も数値も置かない。 */
  const bars = [34, 72, 18, 52, 26, 60];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="高さのふぞろいな柱が並び、高い柱から低い柱へ向かう矢印がついた図。ならしたあとの高さ（平均の値）は描かない"
    >
      <text x="14" y="22" fontSize="10" fill={muted}>
        ひとりずつの記録は、でこぼこ
      </text>
      <line x1="24" y1={baseY} x2="286" y2={baseY} stroke={stroke} strokeWidth="1.2" />

      {bars.map((h, i) => (
        <rect
          key={i}
          x={32 + i * 42}
          y={baseY - h}
          width="30"
          height={h}
          rx="2"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.1"
        />
      ))}

      {/* 高いところから低いところへ配り直す（値は書かない） */}
      <path
        d="M 92 62 C 116 42, 140 42, 160 112"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="5 3"
      />
      <polygon points="160,120 155,109 165,109" fill={accent} />
      <path
        d="M 260 76 C 240 56, 216 56, 202 108"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="5 3"
      />
      <polygon points="202,116 197,105 207,105" fill={accent} />
      <text x="155" y="36" fontSize="10" fill={accent} textAnchor="middle">
        多いぶんを、少ないほうへ配り直す
      </text>

      {/* そろえたあとの高さは「?」のまま（答えを描かない） */}
      <line
        x1="300"
        y1="52"
        x2="300"
        y2={baseY}
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <polygon points="300,48 296,58 304,58" fill={muted} />
      <polygon points={`300,${baseY + 4} 296,${baseY - 6} 304,${baseY - 6}`} fill={muted} />
      <text x="316" y="100" fontSize="13" fill={accent} textAnchor="middle">
        ?
      </text>

      <text x="170" y="170" fontSize="11.5" fill={accent} textAnchor="middle">
        でこぼこを平らにならしたら、高さはどこでそろう？
      </text>
    </svg>
  );
}

/** データの分析 系2 step4: 並べた列と、まん中の席。中央値の値は描かない。 */
export function DataMedianPosition() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 12%, transparent)";
  const n = 9;
  const x0 = 42;
  const dx = 32;
  const y = 76;
  const mid = (n - 1) / 2;
  return (
    <svg
      viewBox="0 0 340 180"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="小さい順に並んだ 9 個の席と、両はしから同じ数ずつ数えて出会うまん中の席。そこに入る値（中央値）は描かない"
    >
      <text x="14" y="26" fontSize="10" fill={muted}>
        小さい順に並べる
      </text>
      <text x="30" y="46" fontSize="10" fill={muted} textAnchor="middle">
        小
      </text>
      <text x="312" y="46" fontSize="10" fill={muted} textAnchor="middle">
        大
      </text>
      <line x1="30" y1={y} x2="312" y2={y} stroke={muted} strokeWidth="1" />

      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={x0 + i * dx}
          cy={y}
          r={i === mid ? 12 : 8}
          fill={i === mid ? fill : "transparent"}
          stroke={i === mid ? accent : stroke}
          strokeWidth={i === mid ? 2 : 1.2}
        />
      ))}
      <text x={x0 + mid * dx} y={y + 5} fontSize="13" fill={accent} textAnchor="middle">
        ?
      </text>

      {/* 両はしから同じ数だけ数える */}
      <line
        x1={x0}
        y1={y + 28}
        x2={x0 + (mid - 1) * dx}
        y2={y + 28}
        stroke={muted}
        strokeWidth="1"
      />
      <line
        x1={x0 + (mid + 1) * dx}
        y1={y + 28}
        x2={x0 + (n - 1) * dx}
        y2={y + 28}
        stroke={muted}
        strokeWidth="1"
      />
      <text x={x0 + 1.5 * dx} y={y + 44} fontSize="10" fill={muted} textAnchor="middle">
        左から 4 つ
      </text>
      <text x={x0 + 6.5 * dx} y={y + 44} fontSize="10" fill={muted} textAnchor="middle">
        右から 4 つ
      </text>
      <text x={x0 + mid * dx} y={y - 22} fontSize="10" fill={accent} textAnchor="middle">
        出会う席
      </text>

      <text x="170" y="162" fontSize="11.5" fill={accent} textAnchor="middle">
        両はしから同じ数だけ数えて出会う席は、値の大きさと関係ある？
      </text>
    </svg>
  );
}

/** データの分析 系2 step7: 遠くの 1 点が支点を引っぱるてんびん。平均・中央値の値は描かない。 */
export function DataOutlierPull() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 14%, transparent)";
  const beamY = 92;
  /** かたまっている 10 点と、遠くの 1 点。目盛も値も置かない。 */
  const cluster = [46, 58, 68, 76, 88, 98, 110, 122, 136, 152];
  const far = 292;
  const rankMid = cluster[4] + 5;
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="細長い板の上に、左側にかたまった点の群れと、右のほうに離れた 1 点が乗っている図。板をささえる支点の位置と、順位のまん中の席はどちらも記号のままで、値は描かない"
    >
      <text x="14" y="24" fontSize="10" fill={muted}>
        小さい順にならべた記録（左ほど小さい）
      </text>

      {/* 板 */}
      <line x1="28" y1={beamY} x2="316" y2={beamY} stroke={stroke} strokeWidth="2" />

      {/* かたまっている点 */}
      {cluster.map((x) => (
        <circle key={x} cx={x} cy={beamY - 9} r="6" fill={fill} stroke={stroke} strokeWidth="1.1" />
      ))}
      {/* 遠くの 1 点 */}
      <circle cx={far} cy={beamY - 9} r="9" fill={fill} stroke={accent} strokeWidth="2" />
      <text x={far} y={beamY - 26} fontSize="10" fill={accent} textAnchor="middle">
        遠くの 1 点
      </text>

      {/* 順位のまん中の席（値は書かない） */}
      <line
        x1={rankMid}
        y1={beamY - 34}
        x2={rankMid}
        y2={beamY - 18}
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <text x={rankMid} y={beamY - 40} fontSize="10" fill={muted} textAnchor="middle">
        順位のまん中の席
      </text>

      {/* 支点は「?」のまま・左右に動きうることだけを示す */}
      <polygon
        points={`${rankMid},${beamY + 4} ${rankMid - 11},${beamY + 26} ${rankMid + 11},${beamY + 26}`}
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      <text x={rankMid} y={beamY + 46} fontSize="12" fill={accent} textAnchor="middle">
        ?
      </text>
      <line
        x1={rankMid - 34}
        y1={beamY + 40}
        x2={rankMid + 60}
        y2={beamY + 40}
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <polygon points={`${rankMid - 38},${beamY + 40} ${rankMid - 28},${beamY + 36} ${rankMid - 28},${beamY + 44}`} fill={muted} />
      <polygon points={`${rankMid + 64},${beamY + 40} ${rankMid + 54},${beamY + 36} ${rankMid + 54},${beamY + 44}`} fill={muted} />
      <text x={rankMid + 96} y={beamY + 44} fontSize="10" fill={muted} textAnchor="middle">
        つりあう場所は？
      </text>

      <text x="170" y="182" fontSize="11.5" fill={accent} textAnchor="middle">
        遠くの 1 点は、板がつりあう場所を引っぱる？ 順位のまん中の席も動く？
      </text>
    </svg>
  );
}

/** データの分析 系3 step1: 基準線と、そこから上下に出た ± のずれ。平均の位置・値は描かない。 */
export function DataAssumedMean() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const band = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const baseY = 92;
  /** 基準線からの見た目のずれ（上が＋・下が−）。値は伏せる。 */
  const gaps = [-16, 10, -26, 0, 30, -34, -6, 22];
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="自分で決めた基準の線と、そこから上下にのびた 8 本のずれ。平均の位置も平均の値も描かない"
    >
      {/* 基準の帯 */}
      <rect x="30" y={baseY - 3} width="280" height="6" fill={band} />
      <line
        x1="30"
        y1={baseY}
        x2="310"
        y2={baseY}
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="6 3"
      />
      <text x="30" y={baseY - 10} fontSize="10" fill={muted}>
        自分で決めた基準
      </text>

      {/* 各データのずれ（棒＋点）。数値は書かない */}
      {gaps.map((g, i) => {
        const x = 52 + i * 34;
        const y = baseY - g;
        return (
          <g key={i}>
            <line
              x1={x}
              y1={baseY}
              x2={x}
              y2={y}
              stroke={g >= 0 ? accent : stroke}
              strokeWidth="1.4"
            />
            <circle cx={x} cy={y} r="3.4" fill={g >= 0 ? accent : stroke} />
          </g>
        );
      })}

      {/* ± のラベル */}
      <text x="318" y={baseY - 26} fontSize="12" fill={accent} textAnchor="middle">
        ＋
      </text>
      <text x="318" y={baseY + 30} fontSize="12" fill={stroke} textAnchor="middle">
        −
      </text>
      <text x="30" y="30" fontSize="10" fill={muted}>
        もとの数は 4 けた・基準から見たずれは 1 けた
      </text>

      {/* 「返す」矢印（値は書かない） */}
      <path
        d="M 150 168 C 175 156, 195 156, 215 166"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
        fill="none"
      />
      <text x="170" y="186" fontSize="11" fill={accent} textAnchor="middle">
        ずれの平均が出たら、基準にはどう返す？
      </text>
    </svg>
  );
}

/** データの分析 系3 step5: 階級の幅と、まん中の代表点へ集める矢印。平均の値は描かない。 */
export function DataClassValue() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const band = "color-mix(in oklch, var(--accent) 10%, transparent)";
  const baseY = 118;
  const classes = [40, 130, 220];
  const width = 80;
  /** 階級の中での、実際のデータの居場所（値は伏せる）。まん中に揃っていないことが見える。 */
  const inside = [
    [14, 26, 34, 58],
    [10, 18, 44, 52, 68],
    [22, 30, 62],
  ];
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="階級の幅と、その真ん中の代表点へ矢印で集める図。平均の値は描かない"
    >
      <text x="14" y="22" fontSize="10" fill={muted}>
        1 つ 1 つの値は失われ、階級の枠だけが残っている
      </text>

      {classes.map((x0, c) => (
        <g key={c}>
          {/* 階級の枠 */}
          <rect
            x={x0}
            y="34"
            width={width}
            height="52"
            fill={band}
            stroke={stroke}
            strokeWidth="1.2"
          />
          {/* 階級の中の「どこか」（まん中に揃ってはいない） */}
          {inside[c].map((dx, k) => (
            <text
              key={k}
              x={x0 + dx}
              y="66"
              fontSize="11"
              fill={muted}
              textAnchor="middle"
            >
              ?
            </text>
          ))}
          {/* まん中へ集める矢印 */}
          <path
            d={`M ${x0 + 12} 90 L ${x0 + width / 2} 106`}
            stroke={accent}
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <path
            d={`M ${x0 + width - 12} 90 L ${x0 + width / 2} 106`}
            stroke={accent}
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          {/* 代表点（階級値） */}
          <circle cx={x0 + width / 2} cy={baseY} r="4.2" fill={accent} />
          <line
            x1={x0 + width / 2}
            y1="106"
            x2={x0 + width / 2}
            y2={baseY - 5}
            stroke={accent}
            strokeWidth="1.2"
          />
          {/* 階級の幅 */}
          <line x1={x0} y1="146" x2={x0 + width} y2="146" stroke={muted} strokeWidth="1" />
          <line x1={x0} y1="142" x2={x0} y2="150" stroke={muted} strokeWidth="1" />
          <line
            x1={x0 + width}
            y1="142"
            x2={x0 + width}
            y2="150"
            stroke={muted}
            strokeWidth="1"
          />
          <text
            x={x0 + width / 2}
            y="162"
            fontSize="10"
            fill={muted}
            textAnchor="middle"
          >
            階級の幅
          </text>
        </g>
      ))}

      <text x="170" y="180" fontSize="10" fill={muted} textAnchor="middle">
        どの階級も、まん中の 1 点で代表させる
      </text>

      <text x="170" y="198" fontSize="11" fill={accent} textAnchor="middle">
        枠の中の点がまん中に寄っていないとき、代表はどちらへ外れる？
      </text>
    </svg>
  );
}

/** データの分析 系4 step1: 並んだ点の列と、前半・後半・切れ目の位置。Q1・Q3 の値は描かない。 */
export function DataQuartileSplit() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const bg = "var(--surface)";
  const dots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const x = (i: number) => 30 + i * 28;
  const mid = 5;
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="小さい順に並んだ 11 個の点と、まん中の 1 個。前半・後半それぞれのまん中に立つ切れ目の値（答え）は書かない"
    >
      <text x="14" y="20" fontSize="10" fill={muted}>
        小さい順に並べた記録（値は伏せてある）
      </text>

      {/* 前半・後半の「？」（どこに切れ目が立つかは示さない） */}
      <text x="86" y="48" fontSize="14" fill={accent} textAnchor="middle">
        ?
      </text>
      <text x="254" y="48" fontSize="14" fill={accent} textAnchor="middle">
        ?
      </text>

      {/* 点の列 */}
      <line x1="20" y1="72" x2="320" y2="72" stroke={muted} strokeWidth="1" />
      {dots.map((i) => (
        <circle
          key={i}
          cx={x(i)}
          cy="72"
          r="6"
          fill={i === mid ? accent : bg}
          stroke={i === mid ? accent : stroke}
          strokeWidth="1.4"
        />
      ))}

      {/* まん中の 1 つ */}
      <line
        x1={x(mid)}
        y1="52"
        x2={x(mid)}
        y2="92"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />

      {/* 前半・後半のくくり */}
      <path
        d="M 22 92 L 22 102 L 158 102 L 158 92"
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M 182 92 L 182 102 L 318 102 L 318 92"
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <text x="90" y="118" fontSize="11" fill={stroke} textAnchor="middle">
        前半（下の半分）
      </text>
      <text x="250" y="118" fontSize="11" fill={stroke} textAnchor="middle">
        後半（上の半分）
      </text>
      <text x="170" y="140" fontSize="10" fill={muted} textAnchor="middle">
        まん中の 1 つ（どちらの半分に数える？）
      </text>

      <text x="170" y="168" fontSize="11.5" fill={accent} textAnchor="middle">
        まん中で 2 つに割った——その半分をもう一度割ると、
      </text>
      <text x="170" y="183" fontSize="11.5" fill={accent} textAnchor="middle">
        切れ目はどこに立つ？
      </text>
    </svg>
  );
}

/** データの分析 系4 step5: 目盛つきの箱ひげ図 1 本。読ませる値のラベルは描かない（目盛の数字だけ）。 */
export function DataBoxplotRead() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 14%, transparent)";
  /** 目盛 0〜20 を x=30〜310 に写す（1 目盛 = 14px）。 */
  const px = (v: number) => 30 + v * 14;
  const axisY = 128;
  const ticks = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const labeled = [0, 5, 10, 15, 20];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="目盛のついた箱ひげ図が 1 本。ひげの端・箱の端・箱の中の線が指す値のラベル（答え）は書かず、目盛の数字だけを描く"
    >
      <text x="14" y="20" fontSize="10" fill={muted}>
        5 つの数だけを残した図
      </text>

      {/* ひげ */}
      <line x1={px(2)} y1="72" x2={px(5)} y2="72" stroke={stroke} strokeWidth="1.3" />
      <line x1={px(14)} y1="72" x2={px(19)} y2="72" stroke={stroke} strokeWidth="1.3" />
      <line x1={px(2)} y1="58" x2={px(2)} y2="86" stroke={stroke} strokeWidth="1.6" />
      <line x1={px(19)} y1="58" x2={px(19)} y2="86" stroke={stroke} strokeWidth="1.6" />

      {/* 箱 */}
      <rect
        x={px(5)}
        y="52"
        width={px(14) - px(5)}
        height="40"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      {/* 箱の中の線 */}
      <line x1={px(9)} y1="52" x2={px(9)} y2="92" stroke={accent} strokeWidth="2.2" />

      {/* 箱の各部から目盛へ下ろす補助線 */}
      {[2, 5, 9, 14, 19].map((v) => (
        <line
          key={v}
          x1={px(v)}
          y1="96"
          x2={px(v)}
          y2={axisY - 10}
          stroke={muted}
          strokeWidth="0.9"
          strokeDasharray="3 3"
        />
      ))}

      {/* 目盛 */}
      <line x1="24" y1={axisY} x2="316" y2={axisY} stroke={stroke} strokeWidth="1.2" />
      {ticks.map((v) => (
        <line
          key={v}
          x1={px(v)}
          y1={axisY}
          x2={px(v)}
          y2={axisY + (labeled.includes(v) ? 9 : 5)}
          stroke={stroke}
          strokeWidth={labeled.includes(v) ? 1.3 : 0.9}
        />
      ))}
      {labeled.map((v) => (
        <text
          key={v}
          x={px(v)}
          y={axisY + 24}
          fontSize="10"
          fill={muted}
          textAnchor="middle"
        >
          {v}
        </text>
      ))}
      <text x="326" y={axisY + 24} fontSize="10" fill={muted} textAnchor="middle">
        分
      </text>

      <text x="170" y="178" fontSize="11.5" fill={accent} textAnchor="middle">
        ひげの端も箱の端も、目盛のどこに立っている？
      </text>
    </svg>
  );
}

/** データの分析 系4 step9: 2 本の箱ひげ図。どちらが散らばっているかの結論は描かない。 */
export function DataBoxplotCompare() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const faint = "color-mix(in oklch, var(--accent) 7%, transparent)";
  const minX = 50;
  const maxX = 300;
  const medX = 175;
  /** 箱の端は「まだ立てていない切れ目」なので、両群とも同じ位置に破線で置く。 */
  const boxL = 120;
  const boxR = 232;
  const rows = [
    { label: "A 店", cy: 58 },
    { label: "B 店", cy: 118 },
  ];
  return (
    <svg
      viewBox="0 0 340 205"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="最小値・中央値・最大値がそろった 2 本の箱ひげ図。箱の端はどちらも破線と疑問符で示し、どちらが散らばっているかは描かない"
    >
      <text x="14" y="20" fontSize="10" fill={muted}>
        最小・まん中・最大がそろった 2 つのデータ
      </text>

      {rows.map((r) => (
        <g key={r.label}>
          <text x="16" y={r.cy + 4} fontSize="11" fill={stroke}>
            {r.label}
          </text>
          {/* ひげ（最小・最大はそろっている） */}
          <line x1={minX} y1={r.cy} x2={maxX} y2={r.cy} stroke={stroke} strokeWidth="1.3" />
          <line x1={minX} y1={r.cy - 14} x2={minX} y2={r.cy + 14} stroke={stroke} strokeWidth="1.6" />
          <line x1={maxX} y1={r.cy - 14} x2={maxX} y2={r.cy + 14} stroke={stroke} strokeWidth="1.6" />
          {/* 箱（端はまだ決まっていない＝破線と ?） */}
          <rect
            x={boxL}
            y={r.cy - 20}
            width={boxR - boxL}
            height="40"
            fill={faint}
            stroke={muted}
            strokeWidth="1.1"
            strokeDasharray="5 4"
          />
          <text x={boxL} y={r.cy - 26} fontSize="12" fill={accent} textAnchor="middle">
            ?
          </text>
          <text x={boxR} y={r.cy - 26} fontSize="12" fill={accent} textAnchor="middle">
            ?
          </text>
          {/* まん中の線（そろっている） */}
          <line x1={medX} y1={r.cy - 20} x2={medX} y2={r.cy + 20} stroke={accent} strokeWidth="2.2" />
        </g>
      ))}

      <text x="175" y="152" fontSize="10" fill={muted} textAnchor="middle">
        ひげの両端も、まん中の線も、上と下でそろっている
      </text>

      <text x="170" y="178" fontSize="11.5" fill={accent} textAnchor="middle">
        切れ目をあと 2 本ずつ入れても、
      </text>
      <text x="170" y="194" fontSize="11.5" fill={accent} textAnchor="middle">
        この 2 つは同じ形のままでいられる？
      </text>
    </svg>
  );
}

/** データの分析 系5 step1: まん中の半分がおさまる帯＝物差し。幅（四分位範囲）の値は描かない。 */
export function DataIqrBand() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const band = "color-mix(in oklch, var(--accent) 14%, transparent)";
  const baseY = 88;
  /** 小さい順に並べた 11 個の記録（値は伏せる）。 */
  const dots = [42, 58, 76, 96, 118, 140, 162, 186, 214, 248, 292];
  const lowCut = dots[2]; // 下から 3 番目＝前半の中央値の位置（値は描かない）
  const highCut = dots[8]; // 下から 9 番目＝後半の中央値の位置（値は描かない）
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="小さい順に並んだ記録の上に、まん中の半分がおさまる帯をかぶせた図。帯の幅の値は描かない"
    >
      <text x="14" y="24" fontSize="10" fill={muted}>
        小さい順に並べた記録
      </text>

      {/* 数直線 */}
      <line x1="24" y1={baseY} x2="316" y2={baseY} stroke={stroke} strokeWidth="1.3" />
      <polygon points={`316,${baseY} 308,${baseY - 4} 308,${baseY + 4}`} fill={stroke} />

      {/* まん中の半分がおさまる帯 */}
      <rect
        x={lowCut}
        y={baseY - 24}
        width={highCut - lowCut}
        height="48"
        rx="5"
        fill={band}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text
        x={(lowCut + highCut) / 2}
        y={baseY - 32}
        fontSize="10.5"
        fill={accent}
        textAnchor="middle"
      >
        およそ半分が、この中
      </text>

      {/* 記録の点（内と外の印はつけない） */}
      {dots.map((x) => (
        <circle key={x} cx={x} cy={baseY} r="4.2" fill={stroke} opacity="0.75" />
      ))}

      {/* 2 本の切れ目（値は描かない） */}
      {[lowCut, highCut].map((x) => (
        <line
          key={x}
          x1={x}
          y1={baseY - 28}
          x2={x}
          y2={baseY + 28}
          stroke={accent}
          strokeWidth="1.6"
        />
      ))}
      <text x={lowCut} y={baseY + 42} fontSize="10" fill={muted} textAnchor="middle">
        下側の切れ目
      </text>
      <text x={highCut} y={baseY + 42} fontSize="10" fill={muted} textAnchor="middle">
        上側の切れ目
      </text>

      {/* 帯の幅を測る両矢印（値は「?」のまま） */}
      <line
        x1={lowCut}
        y1={baseY + 62}
        x2={highCut}
        y2={baseY + 62}
        stroke={accent}
        strokeWidth="1.2"
      />
      <polygon
        points={`${lowCut},${baseY + 62} ${lowCut + 9},${baseY + 58} ${lowCut + 9},${baseY + 66}`}
        fill={accent}
      />
      <polygon
        points={`${highCut},${baseY + 62} ${highCut - 9},${baseY + 58} ${highCut - 9},${baseY + 66}`}
        fill={accent}
      />
      <text
        x={(lowCut + highCut) / 2}
        y={baseY + 58}
        fontSize="13"
        fill={accent}
        textAnchor="middle"
      >
        ?
      </text>

      <text x="170" y="184" fontSize="11" fill={accent} textAnchor="middle">
        まん中の半分は、どれだけの幅におさまっている？
      </text>
    </svg>
  );
}

/** データの分析 系5 step5: 基準の柵と点の並び。どの点が外れ値かは名指ししない。 */
export function DataOutlierFence() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const band = "color-mix(in oklch, var(--accent) 14%, transparent)";
  const baseY = 92;
  /** 記録の点。柵の外にも点があるが、印もラベルもつけない（数えるのは学習者の仕事）。 */
  const dots = [30, 122, 132, 146, 154, 162, 172, 180, 188, 194, 198, 292, 306];
  const lowCut = 139; // 前半の中央値の位置（値は描かない）
  const highCut = 196; // 後半の中央値の位置（値は描かない）
  const lowFence = 54; // 箱の下のふちから、帯の幅の 1.5 倍だけ外
  const highFence = 282; // 箱の上のふちから、帯の幅の 1.5 倍だけ外
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="まん中の半分の箱と、その外側に立てた上下 2 本の柵、そして並んだ記録の点。どの点が外れ値かは示さない"
    >
      <text x="14" y="22" fontSize="10" fill={muted}>
        並べた記録と、データ自身から作った柵
      </text>

      {/* 数直線 */}
      <line x1="20" y1={baseY} x2="320" y2={baseY} stroke={stroke} strokeWidth="1.3" />

      {/* まん中の半分の箱 */}
      <rect
        x={lowCut}
        y={baseY - 18}
        width={highCut - lowCut}
        height="36"
        rx="4"
        fill={band}
        stroke={accent}
        strokeWidth="1.3"
      />
      <text
        x={(lowCut + highCut) / 2}
        y={baseY - 26}
        fontSize="10"
        fill={muted}
        textAnchor="middle"
      >
        まん中の半分
      </text>

      {/* 箱のふちから柵までの、同じ長さのへだたり */}
      <line x1={lowFence} y1={baseY + 32} x2={lowCut} y2={baseY + 32} stroke={muted} strokeWidth="1" />
      <line x1={highCut} y1={baseY + 32} x2={highFence} y2={baseY + 32} stroke={muted} strokeWidth="1" />
      <text
        x={(lowFence + lowCut) / 2}
        y={baseY + 46}
        fontSize="9.5"
        fill={muted}
        textAnchor="middle"
      >
        帯の幅の 1.5 倍
      </text>
      <text
        x={(highCut + highFence) / 2}
        y={baseY + 46}
        fontSize="9.5"
        fill={muted}
        textAnchor="middle"
      >
        帯の幅の 1.5 倍
      </text>

      {/* 上下 2 本の柵 */}
      {[lowFence, highFence].map((x) => (
        <line
          key={x}
          x1={x}
          y1={baseY - 38}
          x2={x}
          y2={baseY + 24}
          stroke={accent}
          strokeWidth="1.6"
          strokeDasharray="5 3"
        />
      ))}
      <text x={lowFence} y={baseY - 44} fontSize="10" fill={accent} textAnchor="middle">
        下の柵
      </text>
      <text x={highFence} y={baseY - 44} fontSize="10" fill={accent} textAnchor="middle">
        上の柵
      </text>

      {/* 記録の点（全部おなじ描き方。外に出ている点にも印をつけない） */}
      {dots.map((x) => (
        <circle key={x} cx={x} cy={baseY} r="4.2" fill={stroke} opacity="0.75" />
      ))}

      <text x="170" y="178" fontSize="11" fill={accent} textAnchor="middle">
        柵の外に出た記録は、どうやって見つける？
      </text>
      <text x="170" y="193" fontSize="11" fill={accent} textAnchor="middle">
        そして、外に出た記録は消してよいもの？
      </text>
    </svg>
  );
}

/**
 * データの分析 系9 step1・辞書（仮説検定）: 起こりにくさの帯と、基準の線。
 * 左端ほど「めったに起こらない」側で、そこに裾の帯を敷く。基準の線は破線で立てるが、
 * **この出来事がその線のどちら側に落ちるか（＝棄却できるかの判定）は描かない**——
 * 観測の位置は宙に浮いた「?」のままにして、矢印は軸に触れる前で止める。
 */
export function DataTestTail() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  const band = "color-mix(in oklch, var(--accent) 6%, transparent)";
  const axisY = 118;
  const x0 = 40; // 確率 0
  const x1 = 310; // 確率 1
  const xLine = 110; // 基準の線
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="起こりにくさ（確率）の帯。左端ほどめったに起こらない側で、そこに裾の帯が敷かれ、基準の線が破線で立っている。この出来事がどこに落ちるかは宙に浮いた疑問符のままで、線のどちら側かという判定は描かない"
    >
      {/* 帯（確率 0 から 1 まで） */}
      <rect
        x={x0}
        y={axisY - 14}
        width={x1 - x0}
        height="28"
        fill={band}
        stroke={stroke}
        strokeWidth="1.2"
      />
      {/* 裾（めったに起こらない側） */}
      <rect x={x0} y={axisY - 14} width={xLine - x0} height="28" fill={fill} />

      {/* 基準の線（破線）。ラベルは帯の下に置いて、上の「?」の行き先とぶつけない */}
      <line
        x1={xLine}
        y1={axisY - 22}
        x2={xLine}
        y2={axisY + 34}
        stroke={accent}
        strokeWidth="1.8"
        strokeDasharray="5 3"
      />
      <text x={xLine} y={axisY + 50} fontSize="10.5" fill={accent} textAnchor="middle">
        基準の線（どこに引く？）
      </text>

      {/* 目盛（両端だけ） */}
      <text x={x0} y={axisY + 30} fontSize="10" fill={muted} textAnchor="middle">
        0
      </text>
      <text x={x1} y={axisY + 30} fontSize="10" fill={muted} textAnchor="middle">
        1
      </text>
      <text x="14" y={axisY - 18} fontSize="10" fill={muted}>
        確率
      </text>

      {/* 帯の左右の性格 */}
      <text x={(x0 + xLine) / 2} y={axisY + 4} fontSize="9.5" fill={muted} textAnchor="middle">
        めったにない
      </text>
      <text x={(xLine + x1) / 2} y={axisY + 4} fontSize="9.5" fill={muted} textAnchor="middle">
        よくあること
      </text>

      {/* 観測した出来事は「?」のまま。行き先を左右 2 本の破線に割って、
          どちら側に落ちるか（＝棄却できるかの判定）を描かないようにする。 */}
      <text x="175" y="26" fontSize="10.5" fill={muted} textAnchor="middle">
        否定した世界での、この出来事
      </text>
      <text x="175" y="50" fontSize="15" fill={accent} textAnchor="middle">
        ?
      </text>
      <path
        d="M 172 58 L 80 92"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <path
        d="M 178 58 L 250 92"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      <text x="170" y="192" fontSize="11.5" fill={accent} textAnchor="middle">
        この出来事は、線のどちら側に落ちる？
      </text>
    </svg>
  );
}

/* ── dispatch 用スニペット（Math.tsx の <<DATA_HIST_READ>> 分岐の直後に貼る）──

        if (trimmed === "<<DATA_DEVIATION_SQUARE>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataDeviationSquare />
            </div>
          );
        }
        if (trimmed === "<<DATA_SD_UNIT>>") {
          return (
            <div key={i} className="my-6 flex justify-center">
              <DataSdUnit />
            </div>
          );
        }

   ──────────────────────────────────────────────────────────────────────── */

/** データの分析 系6 step1: 平均線からの ± のずれと、そのずれを 1 辺とする正方形。分散の値は描かない。 */
export function DataDeviationSquare() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 14%, transparent)";
  const meanY = 66;
  // 平均線からのずれ（マイナスが上＝平均より多い側）。値は伏せる
  const points = [
    { x: 60, dy: -26 },
    { x: 110, dy: 16 },
    { x: 160, dy: 5 },
    { x: 210, dy: -16 },
    { x: 260, dy: 22 },
  ];
  // 上のずれ 3 本ぶんを、辺の長さにして正方形にする
  const squares = [
    { x: 78, side: 26 },
    { x: 128, side: 16 },
    { x: 178, side: 22 },
  ];
  const baseY = 200;
  return (
    <svg
      viewBox="0 0 340 232"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="平均の線から上下に伸びる ± のずれと、そのずれを 1 辺にした正方形。分散の値は描かない"
    >
      {/* 上段：平均線と ± のずれ */}
      <text x="14" y="20" fontSize="10" fill={muted}>
        平均からのずれ（＋と −）
      </text>
      <line
        x1="26"
        y1={meanY}
        x2="314"
        y2={meanY}
        stroke={stroke}
        strokeWidth="1.3"
      />
      <text x="292" y={meanY - 6} fontSize="10" fill={muted} textAnchor="middle">
        平均
      </text>
      {points.map((p) => (
        <g key={p.x}>
          <line
            x1={p.x}
            y1={meanY}
            x2={p.x}
            y2={meanY + p.dy}
            stroke={accent}
            strokeWidth="2"
          />
          <circle cx={p.x} cy={meanY + p.dy} r="3.4" fill={accent} />
          <text
            x={p.x + 11}
            y={meanY + p.dy / 2 + 4}
            fontSize="12"
            fill={accent}
            textAnchor="middle"
          >
            {p.dy < 0 ? "＋" : "−"}
          </text>
        </g>
      ))}

      {/* 下段：ずれを 1 辺にした正方形 */}
      <text x="14" y="118" fontSize="10" fill={muted}>
        同じずれを 1 辺にして、正方形をつくると
      </text>
      <line
        x1="26"
        y1={baseY}
        x2="314"
        y2={baseY}
        stroke={muted}
        strokeWidth="1"
      />
      {squares.map((s) => (
        <g key={s.x}>
          <rect
            x={s.x}
            y={baseY - s.side}
            width={s.side}
            height={s.side}
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
          />
          <line
            x1={s.x}
            y1={baseY + 6}
            x2={s.x + s.side}
            y2={baseY + 6}
            stroke={accent}
            strokeWidth="1.6"
          />
        </g>
      ))}
      <text x="248" y={baseY - 8} fontSize="11" fill={muted} textAnchor="middle">
        1 辺 ＝ ずれ
      </text>

      <text x="170" y="224" fontSize="11.5" fill={accent} textAnchor="middle">
        ＋と − は足すと消えてしまうのに、正方形の面積はどうなる？
      </text>
    </svg>
  );
}

/** データの分析 系6 step5: 面積（もとの単位の 2 乗）から辺（もとの単位）へ戻す＝単位の払い戻し。標準偏差の値は描かない。 */
export function DataSdUnit() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 14%, transparent)";
  return (
    <svg
      viewBox="0 0 340 196"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="面積（もとの単位の 2 乗）で表された正方形から、矢印で 1 辺の長さ（もとの単位）へ戻す図。標準偏差の値は描かない"
    >
      {/* 左：面積＝分散 */}
      <text x="76" y="30" fontSize="10" fill={muted} textAnchor="middle">
        分散
      </text>
      <rect
        x="36"
        y="40"
        width="80"
        height="80"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <text x="76" y="76" fontSize="12" fill={stroke} textAnchor="middle">
        面積
      </text>
      <text x="76" y="94" fontSize="10" fill={muted} textAnchor="middle">
        もとの単位の
      </text>
      <text x="76" y="107" fontSize="10" fill={muted} textAnchor="middle">
        2 乗
      </text>
      <line x1="36" y1="130" x2="116" y2="130" stroke={muted} strokeWidth="1.2" />
      <text x="76" y="144" fontSize="10" fill={muted} textAnchor="middle">
        1 辺 ＝ ?
      </text>

      {/* 中央：払い戻しの矢印 */}
      <line x1="132" y1="80" x2="196" y2="80" stroke={accent} strokeWidth="1.6" />
      <polygon points="196,80 187,75 187,85" fill={accent} />
      <text x="164" y="68" fontSize="13" fill={accent} textAnchor="middle">
        √
      </text>

      {/* 右：辺の長さ＝標準偏差 */}
      <text x="256" y="30" fontSize="10" fill={muted} textAnchor="middle">
        標準偏差
      </text>
      <line x1="216" y1="80" x2="296" y2="80" stroke={accent} strokeWidth="3" />
      <line x1="216" y1="72" x2="216" y2="88" stroke={accent} strokeWidth="1.4" />
      <line x1="296" y1="72" x2="296" y2="88" stroke={accent} strokeWidth="1.4" />
      <text x="256" y="102" fontSize="11" fill={stroke} textAnchor="middle">
        辺の長さ
      </text>
      <text x="256" y="118" fontSize="10" fill={muted} textAnchor="middle">
        もとの単位
      </text>
      <text x="256" y="144" fontSize="10" fill={muted} textAnchor="middle">
        （記録と同じ物差し）
      </text>

      <text x="170" y="172" fontSize="11.5" fill={accent} textAnchor="middle">
        面積のままでは、もとの記録と同じ物差しでは比べられない——
      </text>
      <text x="170" y="188" fontSize="11.5" fill={accent} textAnchor="middle">
        辺の長さにもどすには、何をすればいい？
      </text>
    </svg>
  );
}

/** データの分析 系7 step1: 平均の十字で 4 つに分けた散布図。相関の結論・r の値は描かない。 */
export function DataScatterQuadrant() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  // 系7 step1 のデータ（肥料 2,5,9,11,13 kg／収穫 21,15,32,23,29 kg）と整合させた位置。
  // 値のラベルは書かないので、いくつあるかは数え直す必要がある。
  const pts = [
    [80, 106],
    [132, 139],
    [201, 46],
    [236, 95],
    [270, 63],
  ];
  const mx = 184;
  const my = 90;
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="点を打った散布図に、x の平均を通る縦線と y の平均を通る横線を引いて 4 つの区画に分けた図。どの区画に何個の点があるか（答え）は書かない"
    >
      {/* 軸 */}
      <line x1="45" y1="160" x2="312" y2="160" stroke={stroke} strokeWidth="1.2" />
      <line x1="45" y1="24" x2="45" y2="160" stroke={stroke} strokeWidth="1.2" />
      <text x="318" y="164" fontSize="10" fill={muted} textAnchor="middle">
        x
      </text>
      <text x="38" y="22" fontSize="10" fill={muted} textAnchor="middle">
        y
      </text>

      {/* 平均の十字 */}
      <line
        x1={mx}
        y1="24"
        x2={mx}
        y2="160"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <line
        x1="45"
        y1={my}
        x2="312"
        y2={my}
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text x={mx} y="20" fontSize="9.5" fill={muted} textAnchor="middle">
        x の平均
      </text>
      <text x="316" y={my - 5} fontSize="9.5" fill={muted} textAnchor="end">
        y の平均
      </text>

      {/* 点（値のラベルは付けない） */}
      {pts.map(([px, py], k) => (
        <circle
          key={k}
          cx={px}
          cy={py}
          r="5"
          fill={fill}
          stroke={accent}
          strokeWidth="1.6"
        />
      ))}

      {/* 区画の呼び名だけ（符号や正負の判定は書かない） */}
      <text x="112" y="42" fontSize="9" fill={muted} textAnchor="middle">
        左上
      </text>
      <text x="258" y="42" fontSize="9" fill={muted} textAnchor="middle">
        右上
      </text>
      <text x="112" y="152" fontSize="9" fill={muted} textAnchor="middle">
        左下
      </text>
      <text x="258" y="152" fontSize="9" fill={muted} textAnchor="middle">
        右下
      </text>

      <text x="170" y="186" fontSize="11" fill={accent} textAnchor="middle">
        4 つの区画のうち、2 つのずれの向きがそろうのはどこ？
      </text>
    </svg>
  );
}

/** データの分析 系7 step5: 形は同じで目盛だけがちがう散布図 2 枚。共分散・r の値は描かない。 */
export function DataCovScale() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  // 同じ形（同じ相対位置）の点を、左は kg の目盛、右は g の目盛で描く。
  const shape = [
    [15, -39],
    [37, -13],
    [66, -87],
    [81, -48],
    [95, -74],
  ];
  const panel = (x0: number, baseY: number) =>
    shape.map(([dx, dy]) => [x0 + dx, baseY + dy]);
  const left = panel(40, 150);
  const right = panel(200, 150);
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="同じ形に散らばる散布図を 2 枚並べ、片方は kg の目盛、もう片方は g の目盛で描いた図。共分散や相関係数の値は書かない"
    >
      {/* 左：kg の目盛 */}
      <text x="30" y="20" fontSize="10" fill={muted}>
        収穫量を kg で書くと
      </text>
      <line x1="40" y1="150" x2="150" y2="150" stroke={stroke} strokeWidth="1.2" />
      <line x1="40" y1="34" x2="40" y2="150" stroke={stroke} strokeWidth="1.2" />
      <text x="35" y="56" fontSize="8" fill={muted} textAnchor="end">
        20
      </text>
      <text x="35" y="132" fontSize="8" fill={muted} textAnchor="end">
        10
      </text>
      {left.map(([px, py], k) => (
        <circle key={k} cx={px} cy={py} r="4.2" fill={fill} stroke={accent} strokeWidth="1.5" />
      ))}

      {/* 右：g の目盛（形はまったく同じ） */}
      <text x="190" y="20" fontSize="10" fill={muted}>
        同じ収穫を g で書くと
      </text>
      <line x1="200" y1="150" x2="310" y2="150" stroke={stroke} strokeWidth="1.2" />
      <line x1="200" y1="34" x2="200" y2="150" stroke={stroke} strokeWidth="1.2" />
      <text x="195" y="56" fontSize="8" fill={muted} textAnchor="end">
        20000
      </text>
      <text x="195" y="132" fontSize="8" fill={muted} textAnchor="end">
        10000
      </text>
      {right.map(([px, py], k) => (
        <circle key={k} cx={px} cy={py} r="4.2" fill={fill} stroke={accent} strokeWidth="1.5" />
      ))}

      {/* 2 枚が同じ形であることの目印 */}
      <path
        d="M 158 92 L 192 92"
        stroke={muted}
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <text x="175" y="86" fontSize="9" fill={muted} textAnchor="middle">
        同じ形
      </text>

      <text x="170" y="178" fontSize="11" fill={accent} textAnchor="middle">
        散らばりの形は 1 ミリも変わっていないのに、
      </text>
      <text x="170" y="194" fontSize="11" fill={accent} textAnchor="middle">
        ずれの積の平均まで同じ数でいられる？
      </text>
    </svg>
  );
}

/** データの分析 系7 step9: 山形に並ぶ点。r がほぼ 0 という結論は描かない。 */
export function DataRNonlinear() {
  const stroke = "var(--foreground)";
  const accent = "var(--accent)";
  const muted = "var(--muted)";
  const fill = "color-mix(in oklch, var(--accent) 16%, transparent)";
  // 系7 step9 のデータ（明るさ 100〜500 lx／ページ数 9,21,25,21,9）と整合させた位置。
  const pts = [
    [50, 131],
    [110, 74],
    [170, 54],
    [230, 74],
    [290, 131],
  ];
  const mx = 170;
  const my = 96;
  return (
    <svg
      viewBox="0 0 340 205"
      className="w-full h-auto"
      style={{ maxWidth: 340 }}
      role="img"
      aria-label="山のかたちに並ぶ 5 つの点と、平均を通る縦線・横線。相関係数の値や、相関があるかどうかの結論は書かない"
    >
      {/* 軸 */}
      <line x1="40" y1="150" x2="312" y2="150" stroke={stroke} strokeWidth="1.2" />
      <line x1="40" y1="26" x2="40" y2="150" stroke={stroke} strokeWidth="1.2" />
      <text x="318" y="154" fontSize="10" fill={muted} textAnchor="middle">
        x
      </text>
      <text x="33" y="24" fontSize="10" fill={muted} textAnchor="middle">
        y
      </text>

      {/* 平均の十字 */}
      <line x1={mx} y1="26" x2={mx} y2="150" stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="40" y1={my} x2="312" y2={my} stroke={muted} strokeWidth="1" strokeDasharray="4 3" />
      <text x={mx} y="22" fontSize="9.5" fill={muted} textAnchor="middle">
        x の平均
      </text>
      <text x="316" y={my - 5} fontSize="9.5" fill={muted} textAnchor="end">
        y の平均
      </text>

      {/* 点 */}
      {pts.map(([px, py], k) => (
        <circle key={k} cx={px} cy={py} r="5" fill={fill} stroke={accent} strokeWidth="1.6" />
      ))}

      <text x="105" y="168" fontSize="9" fill={muted} textAnchor="middle">
        左半分
      </text>
      <text x="235" y="168" fontSize="9" fill={muted} textAnchor="middle">
        右半分
      </text>

      <text x="170" y="180" fontSize="11" fill={accent} textAnchor="middle">
        これほどきれいに並んでいても、
      </text>
      <text x="170" y="195" fontSize="11" fill={accent} textAnchor="middle">
        「右上がり」「右下がり」のどちらかに言える？
      </text>
    </svg>
  );
}
