"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type CatalogEntry,
  type SeriesSubject,
  STATIC_CATALOG,
  SUBJECT_GROUP_LABEL,
  SUBJECT_ORDER,
} from "@/lib/seriesCatalog";
import { getResumeIndex, loadSeriesHistory } from "@/lib/storage";
import {
  listTeacherSeries,
  type TeacherSeriesSummary,
} from "@/lib/teacherStorage";

type CatalogWithProgress = {
  entry: CatalogEntry;
  resumeIndex: number;
  total: number;
};

export default function LearnIndex() {
  const [catalog, setCatalog] = useState<CatalogWithProgress[]>([]);
  const [teacherSeries, setTeacherSeries] = useState<TeacherSeriesSummary[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // 静的カタログ各系列について履歴を読み、進度を計算
    const withProgress = STATIC_CATALOG.map((entry) => {
      const history = loadSeriesHistory(entry.series.id);
      const resume = getResumeIndex(
        history,
        entry.series.steps.map((s) => s.id),
      );
      return {
        entry,
        resumeIndex: resume,
        total: entry.series.steps.length,
      };
    });
    setCatalog(withProgress);
    setTeacherSeries(listTeacherSeries());
    setHasHydrated(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-14">
        {/* ヘッダー */}
        <header className="flex flex-col items-center text-center gap-4">
          <p
            className="text-muted"
            style={{ fontSize: "13px", letterSpacing: "0.3em" }}
          >
            まなぶ
          </p>
          <h1
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "0.08em",
            }}
          >
            系列カタログ
          </h1>
          <p
            className="text-muted max-w-prose"
            style={{ fontSize: "clamp(15px, 1rem, 16px)", lineHeight: 2 }}
          >
            小学校の算数から、高校の数と式まで。
            <br className="hidden sm:inline" />
            戸田の系列原則で編まれた問題を、ひとつずつ歩いてみてください。
          </p>
        </header>

        {/* 静的カタログ：subject（学年領域）でグループ化 */}
        {!hasHydrated ? (
          <p className="text-muted" style={{ fontSize: "13px" }}>
            読み込んでいます…
          </p>
        ) : (
          (() => {
            // subject ごとに分類してから、SUBJECT_ORDER の順に並べる
            const grouped = new Map<SeriesSubject, typeof catalog>();
            for (const item of catalog) {
              const key = item.entry.subject;
              if (!grouped.has(key)) grouped.set(key, []);
              grouped.get(key)!.push(item);
            }
            return SUBJECT_ORDER.filter((s) => grouped.has(s)).map(
              (subject) => (
                <section key={subject} className="flex flex-col gap-4">
                  <h2
                    className="text-foreground"
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.3em",
                    }}
                  >
                    {SUBJECT_GROUP_LABEL[subject]}
                  </h2>
                  <ol className="flex flex-col gap-3">
                    {grouped.get(subject)!.map(
                      ({ entry, resumeIndex, total }) => {
                        const isCompleted = resumeIndex >= total;
                        const inProgress = resumeIndex > 0 && !isCompleted;
                        const href = inProgress
                          ? `/learn/play/?seriesId=${entry.series.id}`
                          : `/learn/play/?seriesId=${entry.series.id}&fresh=1`;
                        return (
                          <li key={entry.series.id}>
                            <Link
                              href={href}
                              className="block rounded-lg border border-border p-5 sm:p-6 transition-colors hover:border-accent"
                              style={{ background: "var(--surface)" }}
                            >
                              <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                                <span
                                  className="text-muted"
                                  style={{
                                    fontSize: "12px",
                                    letterSpacing: "0.15em",
                                  }}
                                >
                                  {entry.shortDescription}
                                </span>
                                {isCompleted && (
                                  <span
                                    className="text-success tnum"
                                    style={{ fontSize: "12px" }}
                                  >
                                    ✓ {total}/{total}
                                  </span>
                                )}
                                {inProgress && (
                                  <span
                                    className="text-muted tnum"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {resumeIndex}/{total} 解いた
                                  </span>
                                )}
                                {!isCompleted && !inProgress && (
                                  <span
                                    className="text-muted tnum"
                                    style={{ fontSize: "12px" }}
                                  >
                                    全 {total} 問
                                  </span>
                                )}
                              </div>
                              <p
                                className="font-serif text-foreground"
                                style={{
                                  fontSize: "clamp(17px, 1.25rem, 20px)",
                                  letterSpacing: "0.06em",
                                }}
                              >
                                {entry.series.title}
                              </p>
                              {inProgress && (
                                <div className="mt-3">
                                  <span
                                    className="text-accent"
                                    style={{
                                      fontSize: "12px",
                                      letterSpacing: "0.15em",
                                    }}
                                  >
                                    続きから →
                                  </span>
                                </div>
                              )}
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ol>
                </section>
              ),
            );
          })()
        )}

        {/* 教師作成カタログ */}
        {hasHydrated && teacherSeries.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2
              className="text-foreground"
              style={{ fontSize: "13px", letterSpacing: "0.3em" }}
            >
              あなたが作った系列
            </h2>
            <ol className="flex flex-col gap-3">
              {teacherSeries.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/learn/play/?seriesId=${s.id}`}
                    className="block rounded-lg border border-border p-5 transition-colors hover:border-accent"
                    style={{ background: "var(--surface)" }}
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                      <span
                        className="text-accent tnum"
                        style={{
                          fontSize: "12px",
                          letterSpacing: "0.2em",
                        }}
                      >
                        教師作成・{s.patternId}
                      </span>
                      <span
                        className="text-muted tnum"
                        style={{ fontSize: "12px" }}
                      >
                        全 {s.stepsCount} 問
                      </span>
                    </div>
                    <p
                      className="font-serif text-foreground"
                      style={{ fontSize: "17px", letterSpacing: "0.06em" }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="mt-1.5 text-muted truncate"
                      style={{ fontSize: "13px" }}
                    >
                      {s.subtitle}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 戻る */}
        <Link
          href="/"
          className="self-center text-muted hover:text-foreground transition-colors"
          style={{ fontSize: "13px", letterSpacing: "0.1em" }}
        >
          ← ホームに戻る
        </Link>
      </div>
    </main>
  );
}
