"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CONTEXT_CATEGORIES,
  type ContextId,
  PATTERN_LIST,
  type PatternId,
} from "@/lib/patterns";
import { buildMaterialPrompt } from "@/lib/promptBuilder";
import { buildSeries } from "@/lib/seriesBuilder";
import {
  generateSeriesId,
  saveTeacherSeries,
} from "@/lib/teacherStorage";
import { parseCandidatesJson, verifyCandidate } from "@/lib/verification";

type VerifyStatus =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | {
      kind: "verified";
      okCount: number;
      droppedCount: number;
      errors: string[];
    };

export default function NewSeries() {
  const router = useRouter();
  const [patternId, setPatternId] = useState<PatternId>("P1");
  const [contextId, setContextId] = useState<ContextId>("shopping");
  const [count, setCount] = useState(5);
  const [lastIsQualitative, setLastIsQualitative] = useState(true);

  // ペースト → 検証
  const [pastedJson, setPastedJson] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>({ kind: "idle" });

  // タイトル
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  // 生成されたプロンプト
  const prompt = useMemo(
    () => buildMaterialPrompt(patternId, contextId, count),
    [patternId, contextId, count],
  );
  const [promptCopied, setPromptCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      // クリップボード API が使えない場合のフォールバック：何もしない
    }
  }

  function handleVerify() {
    try {
      const candidates = parseCandidatesJson(pastedJson);
      if (candidates.length === 0) {
        setVerifyStatus({ kind: "error", message: "候補が0件です" });
        return;
      }

      const errors: string[] = [];
      let okCount = 0;
      for (let i = 0; i < candidates.length; i++) {
        const r = verifyCandidate(patternId, candidates[i]);
        if (r.ok) okCount++;
        else errors.push(`候補${i + 1}：${r.reason}`);
      }
      setVerifyStatus({
        kind: "verified",
        okCount,
        droppedCount: errors.length,
        errors: errors.slice(0, 5),
      });
    } catch (e) {
      setVerifyStatus({
        kind: "error",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  function handleSave() {
    if (verifyStatus.kind !== "verified" || verifyStatus.okCount === 0) return;

    try {
      const candidates = parseCandidatesJson(pastedJson);
      const id = generateSeriesId();
      const builtTitle = title.trim() || `${patternId}・${contextOf(contextId)}の系列`;
      const builtSubtitle =
        subtitle.trim() || `${candidates.length}問の練習`;
      const result = buildSeries({
        seriesId: id,
        title: builtTitle,
        subtitle: builtSubtitle,
        patternId,
        contextId,
        candidates,
        lastIsQualitative,
      });

      if (!result.ok) {
        setVerifyStatus({ kind: "error", message: result.reason });
        return;
      }

      saveTeacherSeries(result.series);
      router.push(`/teach/series/?id=${id}`);
    } catch (e) {
      setVerifyStatus({
        kind: "error",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {/* ヘッダー */}
        <header className="flex flex-col gap-3">
          <Link
            href="/teach/"
            className="text-muted hover:text-foreground transition-colors self-start"
            style={{ fontSize: "13px", letterSpacing: "0.1em" }}
          >
            ← つくる
          </Link>
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(28px, 3vw, 36px)", letterSpacing: "0.06em" }}
          >
            新しい系列を作る
          </h1>
        </header>

        {/* Step 1: 文型 */}
        <Step number={1} label="文型を選ぶ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PATTERN_LIST.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPatternId(p.id)}
                className="text-left px-4 py-3 rounded-lg border transition-colors"
                style={{
                  borderColor:
                    patternId === p.id ? "var(--accent)" : "var(--border)",
                  background:
                    patternId === p.id
                      ? "color-mix(in oklch, var(--surface) 80%, var(--accent-soft) 20%)"
                      : "var(--surface)",
                }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className="text-foreground"
                    style={{ fontSize: "15px" }}
                  >
                    {p.naturalLanguage}
                  </span>
                  <span
                    className="text-accent tnum shrink-0"
                    style={{ fontSize: "12px", letterSpacing: "0.15em" }}
                  >
                    {p.id}
                  </span>
                </div>
                <p
                  className="mt-1.5 text-muted tnum"
                  style={{ fontSize: "13px" }}
                >
                  {p.formulaTemplate}
                </p>
              </button>
            ))}
          </div>
        </Step>

        {/* Step 2: 文脈 */}
        <Step number={2} label="文脈を選ぶ">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CONTEXT_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setContextId(c.id)}
                className="px-4 py-3 rounded-lg border transition-colors text-center"
                style={{
                  borderColor:
                    contextId === c.id ? "var(--accent)" : "var(--border)",
                  background:
                    contextId === c.id
                      ? "color-mix(in oklch, var(--surface) 80%, var(--accent-soft) 20%)"
                      : "var(--surface)",
                  fontSize: "14px",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Step>

        {/* Step 3: 問題数と変化順 */}
        <Step number={3} label="問題数と並べ方">
          <div className="flex flex-col gap-5">
            <label className="flex items-center gap-4 flex-wrap">
              <span
                className="text-muted"
                style={{ fontSize: "13px", letterSpacing: "0.15em" }}
              >
                問題数
              </span>
              <input
                type="range"
                min={3}
                max={10}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                className="flex-1 min-w-[200px]"
              />
              <span
                className="tnum text-foreground"
                style={{ fontSize: "18px" }}
              >
                {count} 問
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lastIsQualitative}
                onChange={(e) => setLastIsQualitative(e.target.checked)}
                className="mt-1"
              />
              <span className="flex-1">
                <span
                  className="text-foreground"
                  style={{ fontSize: "14px" }}
                >
                  最後の1問を「質的変化」にする
                </span>
                <span
                  className="block mt-1 text-muted"
                  style={{ fontSize: "12px", lineHeight: 1.7 }}
                >
                  系列の最後で別の文脈に切り替え、「同じ仕組みだった」発見の喜びを増幅します（推奨）。
                  別文脈の候補は後で個別に編集します。
                </span>
              </span>
            </label>
          </div>
        </Step>

        {/* Step 4a: プロンプトのコピー */}
        <Step number={4} label="AI へ指示文を渡す">
          <div className="flex flex-col gap-4">
            <p
              className="text-muted"
              style={{ fontSize: "13px", lineHeight: 1.9 }}
            >
              下のボタンで指示文をコピーし、Claude Code / Codex / ChatGPT
              などに貼り付けてください。返ってきた JSON
              を、次の枠に貼り付けます。
            </p>
            <pre
              className="overflow-x-auto p-4 rounded-lg border border-border text-foreground/85 whitespace-pre-wrap"
              style={{
                background: "var(--surface)",
                fontSize: "12px",
                lineHeight: 1.6,
                maxHeight: "240px",
              }}
            >
              {prompt}
            </pre>
            <button
              type="button"
              onClick={copyPrompt}
              className="self-start inline-flex items-center justify-center px-7 py-2.5 rounded-lg border border-accent text-accent transition-colors hover:bg-accent-soft/40"
              style={{ letterSpacing: "0.15em" }}
            >
              {promptCopied ? "✓ コピーしました" : "指示文をコピー"}
            </button>
          </div>
        </Step>

        {/* Step 4b: 結果のペーストと検証 */}
        <Step number={5} label="AI が返した JSON を貼り付ける">
          <div className="flex flex-col gap-4">
            <textarea
              value={pastedJson}
              onChange={(e) => {
                setPastedJson(e.target.value);
                setVerifyStatus({ kind: "idle" });
              }}
              placeholder='{"candidates":[...]}'
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground tnum focus-visible:outline-none focus-visible:border-accent transition-colors font-mono"
              style={{ fontSize: "12px", lineHeight: 1.7 }}
            />
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleVerify}
                disabled={!pastedJson.trim()}
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-lg bg-accent text-background disabled:opacity-40 disabled:cursor-not-allowed transition-transform duration-150 hover:scale-[1.02]"
                style={{ letterSpacing: "0.15em" }}
              >
                検証する
              </button>
              {verifyStatus.kind === "verified" && (
                <span
                  className="text-success"
                  style={{ fontSize: "13px", letterSpacing: "0.05em" }}
                >
                  ✓ {verifyStatus.okCount} 問 通過
                  {verifyStatus.droppedCount > 0 && (
                    <span className="text-warning ml-3">
                      / {verifyStatus.droppedCount} 問 除外
                    </span>
                  )}
                </span>
              )}
              {verifyStatus.kind === "error" && (
                <span
                  className="text-warning"
                  style={{ fontSize: "13px" }}
                >
                  ✗ {verifyStatus.message}
                </span>
              )}
            </div>
            {verifyStatus.kind === "verified" &&
              verifyStatus.errors.length > 0 && (
                <details
                  className="text-muted"
                  style={{ fontSize: "12px" }}
                >
                  <summary
                    className="cursor-pointer"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    除外された理由を見る
                  </summary>
                  <ul className="mt-2 ml-4 list-disc">
                    {verifyStatus.errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </details>
              )}
          </div>
        </Step>

        {/* Step 6: タイトルと保存 */}
        {verifyStatus.kind === "verified" && verifyStatus.okCount > 0 && (
          <Step number={6} label="タイトルを付けて保存">
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span
                  className="text-muted"
                  style={{ fontSize: "13px", letterSpacing: "0.15em" }}
                >
                  タイトル
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`${patternId}・${contextOf(contextId)}の系列`}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus-visible:outline-none focus-visible:border-accent transition-colors"
                  style={{ fontSize: "15px" }}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span
                  className="text-muted"
                  style={{ fontSize: "13px", letterSpacing: "0.15em" }}
                >
                  ひとこと説明
                </span>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder={`${verifyStatus.okCount}問の練習`}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus-visible:outline-none focus-visible:border-accent transition-colors"
                  style={{ fontSize: "15px" }}
                />
              </label>
              <button
                type="button"
                onClick={handleSave}
                className="self-start inline-flex items-center justify-center px-10 py-3 rounded-lg bg-accent text-background transition-transform duration-150 hover:scale-[1.02]"
                style={{ letterSpacing: "0.15em" }}
              >
                系列を保存
              </button>
            </div>
          </Step>
        )}
      </div>
    </main>
  );
}

function Step({
  number,
  label,
  children,
}: {
  number: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span
          className="text-accent tnum"
          style={{ fontSize: "13px", letterSpacing: "0.2em" }}
        >
          STEP {number}
        </span>
        <h2
          className="font-serif text-foreground"
          style={{ fontSize: "18px", letterSpacing: "0.06em" }}
        >
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}

function contextOf(id: ContextId): string {
  return CONTEXT_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
