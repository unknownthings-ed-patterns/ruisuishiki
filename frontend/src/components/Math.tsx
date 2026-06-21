"use client";

import "katex/dist/katex.min.css";
import React, { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { GLOSSARY, type GlossaryEntry, type VerifyResult } from "@/lib/glossary";

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
            <span className="block text-foreground">{entry.short}</span>
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
                  href={`/learn/play/?seriesId=${entry.relatedSeriesId}`}
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
              href={`/learn/play/?seriesId=${relatedSeriesId}`}
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
