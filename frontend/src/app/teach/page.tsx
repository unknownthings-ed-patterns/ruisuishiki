"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  listTeacherSeries,
  type TeacherSeriesSummary,
} from "@/lib/teacherStorage";

export default function TeachIndex() {
  const [series, setSeries] = useState<TeacherSeriesSummary[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setSeries(listTeacherSeries());
    setHasHydrated(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16">
      <div className="w-full max-w-3xl flex flex-col gap-12">
        {/* ヘッダー */}
        <header className="flex flex-col items-center text-center gap-4">
          <p
            className="text-muted"
            style={{ fontSize: "13px", letterSpacing: "0.3em" }}
          >
            つくる
          </p>
          <h1
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.08em" }}
          >
            教材生成
          </h1>
          <p
            className="text-muted max-w-prose"
            style={{ fontSize: "clamp(15px, 1rem, 16px)", lineHeight: 2 }}
          >
            文型と文脈を選び、AIに材料候補を生成させ、
            <br className="hidden sm:inline" />
            戸田の系列原則に従って自分のクラス用の問題を編む。
          </p>
        </header>

        {/* 新しい系列 CTA */}
        <section
          className="rounded-lg border border-accent p-8 sm:p-10 flex flex-col items-center text-center gap-6"
          style={{
            background: "color-mix(in oklch, var(--surface) 85%, var(--accent-soft) 15%)",
          }}
        >
          <p
            className="font-serif text-foreground"
            style={{ fontSize: "clamp(20px, 1.5rem, 24px)", letterSpacing: "0.06em" }}
          >
            新しい系列を作る
          </p>
          <p
            className="text-muted max-w-md"
            style={{ fontSize: "14px", lineHeight: 1.9 }}
          >
            4つのステップで、AIへの指示文を作って貼り付け、検証済みの問題を保存します。
          </p>
          <Link
            href="/teach/new/"
            className="inline-flex items-center justify-center min-w-[200px] px-12 py-4 rounded-lg bg-accent text-background text-base font-medium transition-transform duration-150 hover:scale-[1.02] focus-visible:scale-[1.02]"
            style={{ letterSpacing: "0.2em" }}
          >
            はじめる
          </Link>
        </section>

        {/* 既存系列リスト */}
        <section className="flex flex-col gap-4">
          <h2
            className="text-foreground"
            style={{ fontSize: "13px", letterSpacing: "0.3em" }}
          >
            これまでの系列
          </h2>

          {!hasHydrated ? (
            <p className="text-muted" style={{ fontSize: "13px" }}>
              読み込んでいます…
            </p>
          ) : series.length === 0 ? (
            <p
              className="text-muted py-8 text-center"
              style={{ fontSize: "14px", lineHeight: 2 }}
            >
              まだ作成した系列はありません。
              <br />
              上の「はじめる」から1つ目を作ってみてください。
            </p>
          ) : (
            <ol className="flex flex-col gap-3">
              {series.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/teach/series/?id=${s.id}`}
                    className="block rounded-lg border border-border p-5 transition-colors hover:bg-surface"
                    style={{ background: "var(--surface)" }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-serif text-foreground truncate"
                          style={{ fontSize: "17px", letterSpacing: "0.04em" }}
                        >
                          {s.title}
                        </p>
                        <p
                          className="mt-1.5 text-muted truncate"
                          style={{ fontSize: "13px" }}
                        >
                          {s.subtitle}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className="text-accent tnum"
                          style={{ fontSize: "12px", letterSpacing: "0.15em" }}
                        >
                          {s.patternId}
                        </span>
                        <span
                          className="text-muted tnum"
                          style={{ fontSize: "12px" }}
                        >
                          {s.stepsCount}問
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>

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
