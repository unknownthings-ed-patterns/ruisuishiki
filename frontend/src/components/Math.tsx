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

function renderBoldSegments(text: string, keyPrefix: string): React.ReactNode[] {
  // まず **強調** をパースし、その隙間で [用語] をパースする
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*\n]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const between = text.slice(lastIndex, match.index);
      parts.push(...renderTermLinks(between, `${keyPrefix}b${keyCounter}`));
    }
    parts.push(
      <strong key={`${keyPrefix}b${keyCounter++}`} className="text-foreground">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex);
    parts.push(...renderTermLinks(tail, `${keyPrefix}bt${keyCounter}`));
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
 */
export function MathText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /\$([^$\n]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(...renderBoldSegments(before, `m${keyCounter}`));
    }
    parts.push(
      <InlineMath key={`m${keyCounter++}`} math={match[1]} />
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex);
    parts.push(...renderBoldSegments(tail, `mt${keyCounter}`));
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
 * 複数段落・ディスプレイ数式を含むテキストを KaTeX で描画する。
 *
 * 「公式の景色」のような導出説明用：
 * - 段落は空行で区切る
 * - $$...$$ だけの行は BlockMath（中央寄せのディスプレイ数式）
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
        // $$...$$ だけの段落は BlockMath
        const blockMatch = trimmed.match(/^\$\$([\s\S]+)\$\$$/);
        if (blockMatch) {
          return (
            <div key={i} className="my-4">
              <BlockMath math={blockMatch[1].trim()} />
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
