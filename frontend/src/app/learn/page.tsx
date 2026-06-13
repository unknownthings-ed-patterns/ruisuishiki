import Link from "next/link";
import { RATIO_BASIC_SERIES } from "@/lib/seriesData";

export default function LearnIndex() {
  const series = RATIO_BASIC_SERIES;

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

        {/* 系列の概要 */}
        <div
          className="w-full p-8 rounded-lg border border-border"
          style={{ background: "var(--surface)" }}
        >
          <div className="flex items-center justify-center gap-3">
            {series.steps.map((step) => (
              <span
                key={step.id}
                className="block rounded-full bg-border"
                style={{ width: 8, height: 8 }}
                aria-hidden
              />
            ))}
          </div>
          <p
            className="mt-6 text-center text-muted"
            style={{ fontSize: "13px" }}
          >
            全{series.steps.length}問
          </p>
        </div>

        {/* はじめるボタン */}
        <Link
          href="/learn/play/"
          className="inline-flex items-center justify-center min-w-[200px] px-12 py-5 rounded-lg bg-accent text-background text-lg font-medium transition-transform duration-150 hover:scale-[1.02] focus-visible:scale-[1.02]"
          style={{ letterSpacing: "0.2em" }}
        >
          はじめる
        </Link>

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
