"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MathText } from "@/components/Math";
import { findStaticSeries } from "@/lib/seriesCatalog";
import { deleteTeacherSeries, getTeacherSeries } from "@/lib/teacherStorage";
import type { LearnerSeries } from "@/lib/types";

type MyProblemKind = "similar" | "inverse" | "condition";

type MyProblemRecord = {
  kind: MyProblemKind;
  text: string;
  updatedAt: string;
};

type LearnerNote = {
  stepId: string;
  stepPosition: number;
  text: string;
};

const MY_PROBLEM_LABELS: Record<MyProblemKind, string> = {
  similar: "にている問題（数をかえる）",
  inverse: "さかさま問題（きくものをかえる）",
  condition: "条件をたす問題",
};

export default function SeriesPreview() {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [series, setSeries] = useState<LearnerSeries | null>(null);
  const [myProblem, setMyProblem] = useState<MyProblemRecord | null>(null);
  const [qualNotes, setQualNotes] = useState<LearnerNote[]>([]);
  const [isTeacherOwned, setIsTeacherOwned] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seriesId = params.get("id") ?? "";
    setId(seriesId);
    if (seriesId) {
      const teacherSeries = getTeacherSeries(seriesId);
      const activeSeries = teacherSeries ?? findStaticSeries(seriesId);
      setSeries(activeSeries);
      setIsTeacherOwned(Boolean(teacherSeries));
      if (activeSeries) {
        setMyProblem(loadMyProblem(activeSeries.id));
        setQualNotes(loadQualNotes(activeSeries));
      }
    }
    setHasHydrated(true);
  }, []);

  function handleDownload() {
    if (!series) return;
    const json = JSON.stringify(series, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${series.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDelete() {
    if (!series) return;
    deleteTeacherSeries(series.id);
    router.push("/teach/");
  }

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

  if (!series) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <p
            className="text-foreground"
            style={{ fontSize: "16px", lineHeight: 2 }}
          >
            系列が見つかりませんでした。
            <br />
            削除されたか、別のブラウザで作られた系列かもしれません。
          </p>
          <Link
            href="/teach/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-accent text-accent transition-colors"
            style={{ letterSpacing: "0.15em" }}
          >
            つくるへ戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        {/* パンくず */}
        <Link
          href="/teach/"
          className="text-muted hover:text-foreground transition-colors self-start"
          style={{ fontSize: "13px", letterSpacing: "0.1em" }}
        >
          ← つくる
        </Link>

        {/* ヘッダー */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-accent tnum"
              style={{ fontSize: "12px", letterSpacing: "0.2em" }}
            >
              {series.patternId}・{series.unit}
            </span>
            <span
              className="text-muted tnum"
              style={{ fontSize: "12px" }}
            >
              全 {series.steps.length} 問
            </span>
          </div>
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(28px, 3vw, 36px)", letterSpacing: "0.06em" }}
          >
            {series.title}
          </h1>
          <p
            className="text-muted"
            style={{ fontSize: "14px", lineHeight: 2 }}
          >
            {series.subtitle}
          </p>
        </header>

        {/* CTA */}
        <nav
          className="flex flex-wrap gap-3"
          aria-label="系列の操作"
        >
          <Link
            href={`/learn/play/?seriesId=${series.id}`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-background transition-transform duration-150 hover:scale-[1.02]"
            style={{ letterSpacing: "0.15em" }}
          >
            学習者ビューで開く →
          </Link>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-accent text-accent transition-colors hover:bg-accent-soft/40"
            style={{ letterSpacing: "0.1em" }}
          >
            JSON をダウンロード
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-accent text-accent transition-colors hover:bg-accent-soft/40 no-print"
            style={{ letterSpacing: "0.1em" }}
          >
            印刷（PDF保存）
          </button>
          {isTeacherOwned && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center justify-center px-6 py-3 text-muted hover:text-warning transition-colors no-print"
              style={{ letterSpacing: "0.1em" }}
            >
              削除
            </button>
          )}
        </nav>

        {/* 削除確認 */}
        {showDeleteConfirm && (
          <div
            className="p-5 rounded-lg border border-warning"
            style={{
              background: "color-mix(in oklch, var(--surface) 85%, var(--warning) 15%)",
            }}
          >
            <p
              className="text-foreground"
              style={{ fontSize: "14px", lineHeight: 2 }}
            >
              本当に削除しますか？ この操作は取り消せません。
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 rounded-lg bg-warning text-background transition-transform hover:scale-[1.02]"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                削除する
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 text-muted hover:text-foreground"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                やめる
              </button>
            </div>
          </div>
        )}

        {(myProblem || qualNotes.length > 0) && (
          <section className="flex flex-col gap-3">
            <h2
              className="text-foreground"
              style={{ fontSize: "13px", letterSpacing: "0.3em" }}
            >
              学習者の作った問題
            </h2>
            <div
              className="rounded-lg border border-border p-5"
              style={{ background: "var(--surface)" }}
            >
              {myProblem && (
                <article>
                  <span
                    className="text-accent"
                    style={{ fontSize: "12px", letterSpacing: "0.12em" }}
                  >
                    {MY_PROBLEM_LABELS[myProblem.kind]}
                  </span>
                  <p
                    className="mt-2 whitespace-pre-wrap text-foreground"
                    style={{ fontSize: "14px", lineHeight: 1.9 }}
                  >
                    {myProblem.text}
                  </p>
                </article>
              )}
              {qualNotes.length > 0 && (
                <div
                  className={myProblem ? "mt-5 border-t border-border pt-5" : ""}
                >
                  <span
                    className="text-muted"
                    style={{ fontSize: "12px", letterSpacing: "0.12em" }}
                  >
                    質的変化のひとことメモ
                  </span>
                  <ul className="mt-3 flex flex-col gap-2">
                    {qualNotes.map((note) => (
                      <li
                        key={note.stepId}
                        className="flex gap-3 text-foreground"
                        style={{ fontSize: "14px", lineHeight: 1.8 }}
                      >
                        <span className="text-muted tnum shrink-0">
                          {note.stepPosition}.
                        </span>
                        <span className="whitespace-pre-wrap">{note.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 問題プレビュー */}
        <section className="flex flex-col gap-3">
          <h2
            className="text-foreground"
            style={{ fontSize: "13px", letterSpacing: "0.3em" }}
          >
            問題の一覧（教師ビュー）
          </h2>
          <ol className="flex flex-col gap-3">
            {series.steps.map((step) => (
              <li
                key={step.id}
                className="rounded-lg border border-border p-5"
                style={{ background: "var(--surface)" }}
              >
                <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                  <span
                    className="text-accent tnum"
                    style={{ fontSize: "12px", letterSpacing: "0.15em" }}
                  >
                    {step.position}.
                    {step.variationFromPrevious && (
                      <span className="ml-2 text-muted">
                        {labelOfOp(step.variationFromPrevious)}
                      </span>
                    )}
                  </span>
                  <span
                    className="text-muted tnum"
                    style={{ fontSize: "12px" }}
                  >
                    <MathText text={step.formulaPreview} />
                  </span>
                </div>
                <p
                  className="text-foreground"
                  style={{ fontSize: "15px", lineHeight: 1.9 }}
                >
                  <MathText text={step.questionText} />
                </p>
                {/* 解答欄：印刷では空欄になる */}
                <p
                  className="mt-2 text-muted tnum print-hide-answer"
                  style={{ fontSize: "13px" }}
                >
                  → {step.unknownLabel}: {step.answerDisplay ?? `${step.answer}${step.unit}`}
                </p>
                {/* 印刷時のみ：答え欄の枠 */}
                <div
                  className="print-only mt-3"
                  style={{
                    borderTop: "1px solid #999",
                    paddingTop: "8mm",
                    minHeight: "20mm",
                  }}
                  aria-hidden
                >
                  <span style={{ fontSize: "11pt", color: "#666" }}>
                    答え（{step.unknownLabel}）：
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

function myProblemKey(seriesId: string): string {
  return `ruisuishiki:my_problem:${seriesId}`;
}

function qualNoteKey(seriesId: string, stepId: string): string {
  return `ruisuishiki:qual_note:${seriesId}:${stepId}`;
}

function loadMyProblem(seriesId: string): MyProblemRecord | null {
  try {
    const raw = window.localStorage.getItem(myProblemKey(seriesId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<MyProblemRecord>;
    if (
      parsed.kind !== "similar" &&
      parsed.kind !== "inverse" &&
      parsed.kind !== "condition"
    ) {
      return null;
    }
    if (typeof parsed.text !== "string" || parsed.text.trim() === "") {
      return null;
    }
    return {
      kind: parsed.kind,
      text: parsed.text,
      updatedAt:
        typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

function loadQualNotes(series: LearnerSeries): LearnerNote[] {
  const notes: LearnerNote[] = [];
  for (const step of series.steps) {
    if (step.variationFromPrevious !== "qualitative") continue;
    try {
      const text = window.localStorage.getItem(qualNoteKey(series.id, step.id));
      if (text && text.trim()) {
        notes.push({
          stepId: step.id,
          stepPosition: step.position,
          text,
        });
      }
    } catch {
      return notes;
    }
  }
  return notes;
}

function labelOfOp(op: string): string {
  switch (op) {
    case "same":
      return "同（材料置換）";
    case "inverse":
      return "逆";
    case "plus_alpha":
      return "+α";
    case "qualitative":
      return "質的変化";
    case "composite":
      return "複合";
    default:
      return op;
  }
}
