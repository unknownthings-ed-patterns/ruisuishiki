"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RATIO_BASIC_SERIES } from "@/lib/seriesData";
import { getResumeIndex, loadSeriesHistory } from "@/lib/storage";

export default function LearnIndex() {
  const series = RATIO_BASIC_SERIES;
  // hydration ミスマッチを避けるため、初回マウント後に履歴を読む
  const [resumeIndex, setResumeIndex] = useState<number | null>(null);
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    const history = loadSeriesHistory(series.id);
    setHasHistory(history.length > 0);
    setResumeIndex(
      getResumeIndex(
        history,
        series.steps.map((s) => s.id),
      ),
    );
  }, [series.id, series.steps]);

  const isCompleted =
    resumeIndex !== null && resumeIndex >= series.steps.length;
  const canResume =
    hasHistory && resumeIndex !== null && resumeIndex > 0 && !isCompleted;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-10">
        {/* ヘッダー */}
        <header className="flex flex-col items-center gap-4">
          <p
            className="text-muted"
            style={{
              fontSize: "13px",
              letterSpacing: "0.3em",
            }}
          >
            今日の系列
          </p>
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.08em" }}
          >
            {series.title}
          </h1>
          <p
            className="text-muted max-w-prose"
            style={{ fontSize: "clamp(15px, 1rem, 16px)", lineHeight: 2 }}
          >
            {series.subtitle}
          </p>
        </header>

        {/* 系列の概要 + 進度 */}
        <div
          className="w-full p-8 rounded-lg border border-border"
          style={{ background: "var(--surface)" }}
        >
          <div className="flex items-center justify-center gap-3">
            {series.steps.map((step, i) => {
              const done = resumeIndex !== null && i < resumeIndex;
              return (
                <span
                  key={step.id}
                  className="block rounded-full transition-colors duration-300"
                  style={{
                    width: 8,
                    height: 8,
                    background: done ? "var(--accent)" : "var(--border)",
                    opacity: done ? 0.6 : 1,
                  }}
                  aria-hidden
                />
              );
            })}
          </div>
          <p
            className="mt-6 text-center text-muted tnum"
            style={{ fontSize: "13px", letterSpacing: "0.1em" }}
          >
            {isCompleted ? (
              <>すべて解けました ({series.steps.length}/{series.steps.length})</>
            ) : resumeIndex !== null && resumeIndex > 0 ? (
              <>
                {resumeIndex}/{series.steps.length} まで解きました
              </>
            ) : (
              <>全{series.steps.length}問</>
            )}
          </p>
        </div>

        {/* 主要 CTA */}
        <nav
          className="flex flex-col sm:flex-row gap-4"
          aria-label="入り口"
        >
          {/* 続きから（履歴がある時） */}
          {canResume && (
            <Link
              href="/learn/play/"
              className="inline-flex items-center justify-center min-w-[200px] px-12 py-5 rounded-lg bg-accent text-background text-lg font-medium transition-transform duration-150 hover:scale-[1.02] focus-visible:scale-[1.02]"
              style={{ letterSpacing: "0.2em" }}
            >
              続きから
            </Link>
          )}
          {/* 最初から（既定 or 履歴がない時） */}
          <Link
            href="/learn/play/?fresh=1"
            className={
              canResume
                ? "inline-flex items-center justify-center min-w-[200px] px-12 py-5 rounded-lg border border-accent text-accent text-lg font-medium transition-colors duration-150 hover:bg-accent-soft/40"
                : "inline-flex items-center justify-center min-w-[200px] px-12 py-5 rounded-lg bg-accent text-background text-lg font-medium transition-transform duration-150 hover:scale-[1.02] focus-visible:scale-[1.02]"
            }
            style={{ letterSpacing: "0.2em" }}
          >
            {isCompleted ? "もう一度" : canResume ? "最初から" : "はじめる"}
          </Link>
        </nav>

        {/* 戻る */}
        <Link
          href="/"
          className="text-muted hover:text-foreground transition-colors"
          style={{ fontSize: "13px", letterSpacing: "0.1em" }}
        >
          ← ホームに戻る
        </Link>
      </div>
    </main>
  );
}
