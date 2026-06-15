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
function StructuredDictionaryPage({ entry }: { entry: GlossaryEntry }) {
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
