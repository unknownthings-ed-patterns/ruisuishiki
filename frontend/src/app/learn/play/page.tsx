"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { MathBody, MathText } from "@/components/Math";
import { RATIO_BASIC_SERIES } from "@/lib/seriesData";
import { findStaticSeries } from "@/lib/seriesCatalog";
import {
  clearSeriesHistory,
  getResumeIndex,
  loadSeriesHistory,
  saveStepRecord,
} from "@/lib/storage";
import { getTeacherSeries } from "@/lib/teacherStorage";
import type { LearnerSeries, LearnerStep } from "@/lib/types";

type Status = "answering" | "correct" | "incorrect" | "completed";

export default function Play() {
  const [series, setSeries] = useState<LearnerSeries>(RATIO_BASIC_SERIES);
  const [stepIndex, setStepIndex] = useState(0);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintsOpened, setHintsOpened] = useState<0 | 1 | 2 | 3>(0);
  const [status, setStatus] = useState<Status>("answering");

  const step = series.steps[stepIndex];
  const totalSteps = series.steps.length;
  const isLast = stepIndex === totalSteps - 1;

  // 「比較せよ」のヒント表示用に、前題を取得
  const comparedStep: LearnerStep | null = useMemo(() => {
    if (!step.compareWithStepId) return null;
    return series.steps.find((s) => s.id === step.compareWithStepId) ?? null;
  }, [step.compareWithStepId, series.steps]);

  // 初回マウント時：URLパラメータで系列を選び、履歴から復元（or ?fresh=1 でクリア）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // 系列を選ぶ：?seriesId=xxx で
    // 1) 静的カタログにあるか確認、2) なければ教師作成系列を localStorage から探す、
    // 3) どちらにもなければ既定の RATIO_BASIC_SERIES
    const seriesIdParam = params.get("seriesId");
    let activeSeries: LearnerSeries = RATIO_BASIC_SERIES;
    if (seriesIdParam) {
      const staticSeries = findStaticSeries(seriesIdParam);
      if (staticSeries) {
        activeSeries = staticSeries;
        setSeries(staticSeries);
      } else {
        const teacherSeries = getTeacherSeries(seriesIdParam);
        if (teacherSeries) {
          activeSeries = teacherSeries;
          setSeries(teacherSeries);
        }
      }
    }

    if (params.get("fresh") === "1") {
      clearSeriesHistory(activeSeries.id);
      // URL から fresh パラメータを取り除く（リロード時に常時クリアにならないように）
      const cleanQuery = seriesIdParam ? `?seriesId=${seriesIdParam}` : "";
      window.history.replaceState(
        null,
        "",
        window.location.pathname + cleanQuery,
      );
      setStepIndex(0);
    } else {
      const history = loadSeriesHistory(activeSeries.id);
      const resume = getResumeIndex(
        history,
        activeSeries.steps.map((s) => s.id),
      );
      if (resume >= activeSeries.steps.length) {
        // 全問正答済み → 完了画面へ
        setStatus("completed");
      } else if (resume > 0) {
        setStepIndex(resume);
      }
    }
    setHasHydrated(true);
  }, []);

  // 問題が変わるたびに状態をリセット
  useEffect(() => {
    setUserAnswer("");
    setAttempts(0);
    setHintsOpened(0);
    setStatus((current) => (current === "completed" ? current : "answering"));
  }, [stepIndex]);

  // 正答時に Enter キーで「次の問題へ」を押せるようにする
  useEffect(() => {
    if (status !== "correct") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter") return;
      // テキスト入力エリアにフォーカスがある場合は除外（IME変換確定の Enter を奪わない）
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      handleNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isLast]);

  // 解答中・誤答中に h キーでヒントを順に開く
  useEffect(() => {
    if (status === "correct" || status === "completed") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "h" && e.key !== "H") return;
      // 入力欄にフォーカスがある時は無視（h を打鍵したいことがあるかもしれない）
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      handleOpenHint();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, hintsOpened]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 正答後は再評価しない（次へボタンで進む）
    if (status === "correct") return;

    const parsed = parseFloat(userAnswer.replace(/[, ]/g, ""));
    if (Number.isNaN(parsed)) return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const isCorrect = Math.abs(parsed - step.answer) < 1e-6;

    if (isCorrect) {
      setStatus("correct");
      // 履歴に保存（F8予防：文型×オペレータ軸の素材を集計可能な形で）
      saveStepRecord(series.id, {
        stepId: step.id,
        attempts: nextAttempts,
        hintsOpened,
        correct: true,
        answeredAt: new Date().toISOString(),
      });
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

  // hydration 前の描画ちらつき防止（短時間の読み込み中表示）
  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <p
          className="text-muted"
          style={{ fontSize: "13px", letterSpacing: "0.2em" }}
        >
          読み込んでいます…
        </p>
      </main>
    );
  }

  // 完了画面
  if (status === "completed") {
    return (
      <main className="flex min-h-screen flex-col items-center px-6 py-16">
        <div className="w-full max-w-2xl flex flex-col items-center gap-10">
          <h1
            className="font-serif text-foreground text-center"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.08em" }}
          >
            おわり
          </h1>
          <p
            className="text-muted text-center"
            style={{ fontSize: "16px", lineHeight: 2 }}
          >
            {totalSteps} 問すべて解けました。
            <br />
            気づいたことはありましたか？
          </p>

          {/* 公式の景色（系列に derivation がある時のみ） */}
          {series.derivation && (
            <details
              className="w-full rounded-lg border border-border p-6 sm:p-8"
              style={{
                background: "var(--surface)",
              }}
            >
              <summary
                className="cursor-pointer font-serif text-foreground"
                style={{
                  fontSize: "16px",
                  letterSpacing: "0.08em",
                  listStyle: "none",
                }}
              >
                <span className="text-accent mr-2">▸</span>
                公式の景色 — この公式はどこから？
              </summary>
              <div
                className="mt-6 text-foreground/85"
                style={{ fontSize: "15px" }}
              >
                <MathBody text={series.derivation} />
              </div>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href={`/learn/play/?seriesId=${series.id}&fresh=1`}
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg bg-accent text-background"
              style={{ letterSpacing: "0.2em" }}
            >
              もう一度
            </Link>
            <Link
              href="/learn/"
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg border border-accent text-accent"
              style={{ letterSpacing: "0.2em" }}
            >
              系列カタログ
            </Link>
          </div>
        </div>

        <style jsx global>{`
          details[open] summary span:first-of-type {
            display: inline-block;
            transform: rotate(90deg);
          }
          details summary span:first-of-type {
            display: inline-block;
            transition: transform 0.2s var(--ease-smooth);
          }
        `}</style>
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
              <MathText text={step.questionText} />
            </p>
          </section>

          {/* 質的変化の正答時：「同じ仕組みだった」の発見演出
              桝田の言う「喜びのグレードアップ」を、これまでの全式を並べることで支える */}
          {status === "correct" && step.variationFromPrevious === "qualitative" && (
            <section
              className="rounded-lg border border-accent-warm p-6 sm:p-8 animate-fade-in-slow"
              style={{
                background:
                  "color-mix(in oklch, var(--surface) 75%, var(--accent-warm) 25%)",
              }}
              aria-label="同じ仕組みだった"
            >
              <p
                className="font-serif text-foreground text-center"
                style={{
                  fontSize: "clamp(20px, 1.5rem, 24px)",
                  letterSpacing: "0.08em",
                }}
              >
                気づいたかな?
              </p>
              <p
                className="mt-4 text-foreground/85 text-center"
                style={{ fontSize: "14px", lineHeight: 2 }}
              >
                ここまでの問題はすべて
                <br />
                <span className="font-serif">
                  「{series.revelationLabel ?? "同じ仕組み"}」
                </span>
                <br />
                という同じ仕組みでした。
              </p>
              <ol
                className="mt-6 flex flex-col gap-2.5 max-w-sm mx-auto tnum"
                aria-label="解いた問題の式の一覧"
              >
                {series.steps.slice(0, stepIndex + 1).map((s, i) => (
                  <li
                    key={s.id}
                    className="flex items-baseline justify-between animate-revelation-row"
                    style={{
                      animationDelay: `${300 + i * 120}ms`,
                      opacity: 0,
                      animationFillMode: "forwards",
                    }}
                  >
                    <span
                      className="text-muted shrink-0"
                      style={{ fontSize: "11px", letterSpacing: "0.15em" }}
                    >
                      {s.position}.
                    </span>
                    <span
                      className="flex-1 px-3 text-foreground text-center"
                      style={{ fontSize: "15px" }}
                    >
                      <MathText text={s.formulaPreview} />
                    </span>
                    <span
                      className="text-muted shrink-0"
                      style={{ fontSize: "12px" }}
                    >
                      ({s.unit})
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ヒント表示（問題文の真下に積層） */}
          {hintsOpened > 0 && (
            <section
              className="flex flex-col gap-3"
              aria-label="ヒント"
            >
              {step.hints.slice(0, hintsOpened).map((hint) => (
                <Fragment key={hint.layer}>
                  <div
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
                      <MathText text={hint.text} />
                    </p>
                  </div>

                  {/* ヒント1 の直後に、前題カードをスライドインで表示
                      「比較せよ」を視覚で支える——推理式の核 */}
                  {hint.layer === 1 && comparedStep && (
                    <article
                      className="relative px-5 py-4 rounded-lg border border-border animate-slide-in-left ml-4 sm:ml-8"
                      style={{
                        background: "var(--surface)",
                      }}
                      aria-label="前の問題（比較対象）"
                    >
                      {/* 左側の接続線（前題が「ここ」と紐づいている感を出す） */}
                      <span
                        className="absolute -left-4 sm:-left-8 top-1/2 block"
                        style={{
                          width: "1rem",
                          borderTop: "1px solid var(--border)",
                          transform: "translateY(-50%)",
                        }}
                        aria-hidden
                      />
                      <span
                        className="text-muted"
                        style={{ fontSize: "11px", letterSpacing: "0.2em" }}
                      >
                        前の問題
                      </span>
                      <p
                        className="mt-1.5 text-foreground/85"
                        style={{ fontSize: "14px", lineHeight: 1.8 }}
                      >
                        <MathText text={comparedStep.questionText} />
                      </p>
                      <p
                        className="mt-2 text-muted tnum"
                        style={{ fontSize: "13px", letterSpacing: "0.05em" }}
                      >
                        → {comparedStep.unknownLabel}は{" "}
                        <span className="text-foreground">
                          {comparedStep.answer}
                          {comparedStep.unit}
                        </span>
                      </p>
                    </article>
                  )}
                </Fragment>
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
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revelation-row {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 300ms var(--ease-smooth);
        }
        .animate-slide-in-left {
          animation: slide-in-left 500ms var(--ease-smooth);
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 700ms var(--ease-smooth);
        }
        .animate-revelation-row {
          animation: revelation-row 400ms var(--ease-smooth);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-slide-in-left,
          .animate-fade-in-slow,
          .animate-revelation-row {
            animation: none;
            opacity: 1 !important;
          }
        }
      `}</style>
    </main>
  );
}
