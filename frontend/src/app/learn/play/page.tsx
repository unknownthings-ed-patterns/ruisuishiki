"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RATIO_BASIC_SERIES } from "@/lib/seriesData";

type Status = "answering" | "correct" | "incorrect" | "completed";

export default function Play() {
  const series = RATIO_BASIC_SERIES;
  const [stepIndex, setStepIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintsOpened, setHintsOpened] = useState<0 | 1 | 2 | 3>(0);
  const [status, setStatus] = useState<Status>("answering");

  const step = series.steps[stepIndex];
  const totalSteps = series.steps.length;
  const isLast = stepIndex === totalSteps - 1;

  // 問題が変わるたびに状態をリセット
  useEffect(() => {
    setUserAnswer("");
    setAttempts(0);
    setHintsOpened(0);
    setStatus("answering");
  }, [stepIndex]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 正答後は再評価しない（次へボタンで進む）
    if (status === "correct") return;

    const parsed = parseFloat(userAnswer.replace(/[, ]/g, ""));
    if (Number.isNaN(parsed)) return;

    setAttempts((a) => a + 1);
    if (Math.abs(parsed - step.answer) < 1e-6) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }
  }

  function handleNext() {
    if (isLast) {
      setStatus("completed");
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleOpenHint() {
    if (hintsOpened < 3) {
      setHintsOpened((h) => (h + 1) as 0 | 1 | 2 | 3);
    }
  }

  function handleAnswerChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserAnswer(e.target.value);
    // 入力を書き換えた瞬間、誤答メッセージは消す（書き直し中の摩擦を減らす）
    if (status === "incorrect") {
      setStatus("answering");
    }
  }

  // 完了画面
  if (status === "completed") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-2xl flex flex-col items-center text-center gap-10">
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.08em" }}
          >
            おわり
          </h1>
          <p className="text-muted" style={{ fontSize: "16px", lineHeight: 2 }}>
            {totalSteps} 問すべて解けました。
            <br />
            気づいたことはありましたか？
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/learn/"
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg bg-accent text-background"
              style={{ letterSpacing: "0.2em" }}
            >
              もう一度
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg border border-accent text-accent"
              style={{ letterSpacing: "0.2em" }}
            >
              ホームへ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* 上部：スクロール可能エリア（進度バー・問題文・ヒント）
          フォームは画面下部に sticky 固定なので、ここがどれだけ長くなっても
          メインアクション（解答送信）は常に視野に入る */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-6">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* 進度表示（文型タグは出さない・第2弾失敗モードF1の予防） */}
          <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {series.steps.map((_, i) => (
              <span
                key={i}
                className="block rounded-full transition-colors duration-300"
                style={{
                  width: 8,
                  height: 8,
                  background:
                    i < stepIndex
                      ? "var(--accent)"
                      : i === stepIndex
                      ? "var(--accent)"
                      : "var(--border)",
                  opacity: i < stepIndex ? 0.5 : 1,
                }}
                aria-hidden
              />
            ))}
          </div>
            <span
              className="text-muted tnum"
              style={{ fontSize: "13px", letterSpacing: "0.1em" }}
            >
              {stepIndex + 1} / {totalSteps}
            </span>
          </header>

          {/* 問題文 */}
          <section
            className="p-6 sm:p-10 rounded-lg border border-border transition-colors duration-500"
            style={{
              background:
                status === "correct" ? "color-mix(in oklch, var(--surface) 70%, var(--accent-warm) 30%)" : "var(--surface)",
            }}
          >
            <p
              className="text-foreground"
              style={{
                fontSize: "clamp(17px, 1.25rem, 20px)",
                lineHeight: 1.9,
                letterSpacing: "0.04em",
              }}
            >
              {step.questionText}
            </p>
          </section>

          {/* ヒント表示（問題文の真下に積層） */}
          {hintsOpened > 0 && (
            <section
              className="flex flex-col gap-3"
              aria-label="ヒント"
            >
              {step.hints.slice(0, hintsOpened).map((hint) => (
                <div
                  key={hint.layer}
                  className="px-5 py-4 rounded-lg border border-accent-soft animate-fade-in"
                  style={{
                    background: "color-mix(in oklch, var(--surface) 80%, var(--accent-soft) 20%)",
                  }}
                >
                  <span
                    className="text-muted"
                    style={{ fontSize: "11px", letterSpacing: "0.2em" }}
                  >
                    ヒント {hint.layer}
                  </span>
                  <p
                    className="mt-1.5 text-foreground"
                    style={{ fontSize: "15px", lineHeight: 1.8 }}
                  >
                    {hint.text}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* 下部：sticky フォーム or 正答時 CTA
          画面下端に固定し、メインアクションを常に視野に置く */}
      <div
        className="sticky bottom-0 border-t border-border backdrop-blur-sm"
        style={{ background: "color-mix(in oklch, var(--background) 92%, transparent)" }}
      >
        <div className="mx-auto w-full max-w-2xl px-6 py-4">
          {/* 解答フォーム */}
          {status !== "correct" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-muted shrink-0"
                  style={{ fontSize: "13px", letterSpacing: "0.1em" }}
                >
                  {step.unknownLabel}
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={userAnswer}
                  onChange={handleAnswerChange}
                  autoFocus
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xl tnum focus-visible:outline-none focus-visible:border-accent transition-colors"
                  aria-label={step.unknownLabel}
                />
                <span
                  className="text-foreground shrink-0"
                  style={{ fontSize: "16px", letterSpacing: "0.05em" }}
                >
                  {step.unit}
                </span>
              </div>

              {status === "incorrect" && (
                <p
                  className="text-warning"
                  style={{ fontSize: "13px", letterSpacing: "0.05em" }}
                  role="status"
                >
                  ちがうみたい。ヒントを見るか、もう一度考えてみよう。
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={!userAnswer.trim()}
                  className="inline-flex items-center justify-center px-7 py-2.5 rounded-lg bg-accent text-background disabled:opacity-40 disabled:cursor-not-allowed transition-transform duration-150 hover:scale-[1.02]"
                  style={{ letterSpacing: "0.15em" }}
                >
                  答えを送る
                </button>
                {hintsOpened < 3 && (
                  <button
                    type="button"
                    onClick={handleOpenHint}
                    className="inline-flex items-center justify-center px-7 py-2.5 rounded-lg border border-accent text-accent transition-colors duration-150 hover:bg-accent-soft/40"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    ヒント
                  </button>
                )}
              </div>
            </form>
          )}

          {/* 正答時 */}
          {status === "correct" && (
            <section className="flex items-center justify-between gap-4 animate-fade-in flex-wrap">
              <div className="flex flex-col gap-1">
                <p
                  className="text-success font-medium"
                  style={{ fontSize: "14px", letterSpacing: "0.1em" }}
                >
                  ✓ 正解。{step.unknownLabel}は {step.answer}{step.unit}。
                </p>
                {attempts > 1 && (
                  <p
                    className="text-muted"
                    style={{ fontSize: "12px" }}
                  >
                    {attempts}回目で見つけられたね。
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center px-8 py-2.5 rounded-lg bg-accent text-background transition-transform duration-150 hover:scale-[1.02]"
                style={{ letterSpacing: "0.15em" }}
              >
                {isLast ? "おわりへ" : "次の問題へ →"}
              </button>
            </section>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 300ms var(--ease-smooth);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
