"use client";

import "katex/dist/katex.min.css";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { GlossaryIndexContext } from "@/components/GlossaryIndexProvider";
import { BlockMath, InlineMath } from "@/components/Katex";
import { seriesHref } from "@/lib/catalogMeta";
import type { GlossaryEntry, VerifyResult } from "@/lib/glossary";

/**
 * 用語リンク：[用語名] と書かれた部分が、辞書に登録されていれば
 * ホバーまたはクリックで簡易説明と関連系列リンクを表示する。
 *
 * 辞書にない用語はそのまま素通し（リンクなし）で表示。
 */
function TermLink({ term }: { term: string }) {
  const index = useContext(GlossaryIndexContext);
  const [open, setOpen] = useState(false);
  const [easyOpen, setEasyOpen] = useState(false);
  // 索引（語・1 文の説明・関連系列）だけで描く。辞書の本体は詳しいページを開いたときに読む。
  const entry = index?.[term];

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
              {entry.hasDetail && (
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
                // Link は本番の basePath（/ruisuishiki）を自動で前置する。素の <a> だと 404 になる。
                <Link
                  href={seriesHref(entry.relatedSeriesId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                  style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  歩いて学ぶ → 関連の系列へ
                </Link>
              )}
            </span>
          </span>
        )}
      </span>
      {easyOpen && entry.hasDetail && (
        <GlossaryDetailModal term={term} onClose={() => setEasyOpen(false)} />
      )}
    </>
  );
}

/**
 * 辞書の本体（glossary.ts）をここで初めて読み込んで、詳しいページのモーダルを開く。
 * 読み込みの間は、同じ位置に「読み込んでいます…」だけを出す。
 */
function GlossaryDetailModal({ term, onClose }: { term: string; onClose: () => void }) {
  const [entry, setEntry] = useState<GlossaryEntry | null>(null);
  useEffect(() => {
    let alive = true;
    import("@/lib/glossary").then((m) => {
      if (alive) setEntry(m.GLOSSARY[term] ?? null);
    });
    return () => {
      alive = false;
    };
  }, [term]);
  if (!entry) {
    return (
      <span
        role="status"
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "color-mix(in oklch, var(--background) 70%, transparent)" }}
        onClick={onClose}
      >
        <span className="text-muted" style={{ fontSize: "13px", letterSpacing: "0.2em" }}>
          読み込んでいます…
        </span>
      </span>
    );
  }
  return <EasyExplanationModal term={term} entry={entry} onClose={onClose} />;
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
            <Link
              href={seriesHref(relatedSeriesId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background transition-transform hover:scale-[1.02]"
              style={{ fontSize: "13px", letterSpacing: "0.15em" }}
            >
              系列を歩いて体感する →
            </Link>
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
  // `$$...$$` を先に拾う。拾わないと `/\$([^$\n]+)\$/` が 2 文字目の `$` から
  // マッチしてしまい、前後に裸の `$` が 1 個ずつ学習者に見える。
  // ここは <p> の中なので BlockMath（div）は使えず、インラインで描画する。
  const regex = /\$\$([^$\n]+)\$\$|\$([^$\n]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(...renderTermLinks(before, `${keyPrefix}m${keyCounter}`));
    }
    parts.push(
      <InlineMath
        key={`${keyPrefix}m${keyCounter++}`}
        math={match[1] ?? match[2]}
      />
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
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage はマウント後にしか読めない（static export）
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
 * 図マーカー（<<NAME>>）を描く。図の本体（Figures.tsx・約 4 万行の SVG）は別チャンクに分け、
 * 図が要る段落が来たときに初めて読み込む。読み込み中は高さだけを確保して、描画のずれを抑える。
 */
const LazyFigureByMarker = React.lazy(() => import("@/components/Figures"));

function Figure({ marker }: { marker: string }) {
  return (
    <React.Suspense fallback={<div aria-hidden="true" style={{ minHeight: 160 }} />}>
      <LazyFigureByMarker marker={marker} />
    </React.Suspense>
  );
}

/** 図が出るとわかっているページで、図のチャンクを先に読み始める（描画の待ちを短くする）。 */
export function preloadFigures(): void {
  void import("@/components/Figures");
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
        // 特殊マーカー：図（<<NAME>> だけの段落）。図の本体は Figures.tsx の FIGURES 表にあり、
        // 図を含む段落が来たときにだけ読み込む（学習者ページの初回読み込みを軽くするため）。
        if (/^<<[A-Za-z0-9_]+>>$/.test(trimmed)) {
          return (
            <div key={i} className="my-6 flex justify-center">
              <Figure marker={trimmed} />
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
