"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import {
  MathBody,
  MathText,
  StructuredDictionaryPage,
} from "@/components/Math";
import { GLOSSARY } from "@/lib/glossary";

/**
 * 辞書ページ専用ルート。
 *
 * URL 例：
 *   /learn/glossary/?term=サイン
 *   /learn/glossary/?term=タンジェント
 *
 * URL の term パラメータが GLOSSARY に存在すれば、その辞書ページを直接表示。
 * パラメータがない or 該当用語がない場合は、登録されている全用語の一覧を表示。
 *
 * useSearchParams は Suspense 必須なので、内容を子コンポーネントに切り出す。
 */
export default function GlossaryPage() {
  return (
    <Suspense fallback={<GlossaryFallback />}>
      <GlossaryPageContent />
    </Suspense>
  );
}

function GlossaryFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p
        className="text-muted"
        style={{ fontSize: "13px", letterSpacing: "0.2em" }}
      >
        読み込んでいます…
      </p>
    </main>
  );
}

function GlossaryPageContent() {
  // useSearchParams は URL の変化を React に通知してくれるので、
  // Link で別の用語に飛んだら自動で再描画される。
  const params = useSearchParams();
  const term = params.get("term");
  const entry = term ? GLOSSARY[term] : undefined;
  const allTerms = useMemo(() => Object.keys(GLOSSARY).sort(), []);

  return (
    <main
      className="min-h-screen px-4 sm:px-6 py-8 sm:py-12"
      style={{
        maxWidth: "min(720px, 100%)",
        margin: "0 auto",
      }}
    >
      <nav
        className="mb-8 flex items-baseline gap-4"
        style={{ fontSize: "12px", letterSpacing: "0.1em" }}
      >
        <Link
          href="/learn"
          className="text-muted hover:text-foreground transition-colors"
        >
          ← 学ぶに戻る
        </Link>
        {term && (
          <>
            <span className="text-muted opacity-30" aria-hidden>
              /
            </span>
            <Link
              href="/learn/glossary/"
              className="text-muted hover:text-foreground transition-colors"
            >
              ← 数学用語辞典に戻る
            </Link>
          </>
        )}
      </nav>

      {term && entry ? (
        <GlossaryEntryView term={term} />
      ) : term && !entry ? (
        <NotFoundView term={term} allTerms={allTerms} />
      ) : (
        <IndexView allTerms={allTerms} />
      )}
    </main>
  );
}

function GlossaryEntryView({ term }: { term: string }) {
  const entry = GLOSSARY[term];
  if (!entry) return null;

  return (
    <article>
      <header className="mb-6 pb-4 border-b border-border">
        <h1
          className="font-serif text-foreground"
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            letterSpacing: "0.06em",
          }}
        >
          {term}
        </h1>
        <p
          className="text-muted mt-2"
          style={{ fontSize: "14px", lineHeight: 1.8 }}
        >
          <MathText text={entry.short} />
        </p>
      </header>

      <div className="text-foreground/85" style={{ fontSize: "14px" }}>
        {entry.meaning ? (
          <StructuredDictionaryPage entry={entry} />
        ) : entry.easy ? (
          <MathBody text={entry.easy} />
        ) : (
          <p className="text-muted" style={{ fontSize: "13px" }}>
            この用語の詳しい辞書ページはまだ準備中です。
          </p>
        )}
      </div>

      {entry.relatedSeriesId && (
        <div className="mt-8 pt-6 border-t border-border">
          <Link
            href={`/learn/play/?seriesId=${entry.relatedSeriesId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background transition-transform hover:scale-[1.02]"
            style={{ fontSize: "13px", letterSpacing: "0.15em" }}
          >
            系列を歩いて体感する →
          </Link>
        </div>
      )}
    </article>
  );
}

function NotFoundView({
  term,
  allTerms,
}: {
  term: string;
  allTerms: string[];
}) {
  return (
    <div>
      <h1
        className="font-serif text-foreground mb-4"
        style={{ fontSize: "clamp(22px, 3vw, 28px)" }}
      >
        「{term}」は辞書に登録されていません
      </h1>
      <p className="text-muted mb-8" style={{ fontSize: "13px", lineHeight: 1.8 }}>
        下から探してみてください。
      </p>
      <IndexView allTerms={allTerms} />
    </div>
  );
}

function IndexView({ allTerms }: { allTerms: string[] }) {
  const withMeaning = allTerms.filter(
    (t) => GLOSSARY[t].meaning || GLOSSARY[t].easy,
  );
  const stubsOnly = allTerms.filter(
    (t) => !GLOSSARY[t].meaning && !GLOSSARY[t].easy,
  );
  return (
    <div>
      <h1
        className="font-serif text-foreground mb-2"
        style={{
          fontSize: "clamp(24px, 3.5vw, 32px)",
          letterSpacing: "0.06em",
        }}
      >
        数学用語辞典
      </h1>
      <p
        className="text-muted mb-8"
        style={{ fontSize: "13px", lineHeight: 1.8 }}
      >
        各用語のページでは、定義（説明）と例・使う場面・にていることばを
        ワークシート形式で読めます。
      </p>

      <section className="mb-10">
        <h2
          className="text-muted mb-4"
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
          }}
        >
          § 辞書ページが書かれている用語（{withMeaning.length}）
        </h2>
        <div className="flex flex-wrap gap-2">
          {withMeaning.map((t) => (
            <Link
              key={t}
              href={`/learn/glossary/?term=${encodeURIComponent(t)}`}
              className="px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-surface transition-colors"
              style={{ fontSize: "13px" }}
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {stubsOnly.length > 0 && (
        <section>
          <h2
            className="text-muted mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
            }}
          >
            § 短い説明だけの用語（{stubsOnly.length}）
          </h2>
          <div className="flex flex-wrap gap-2">
            {stubsOnly.map((t) => (
              <Link
                key={t}
                href={`/learn/glossary/?term=${encodeURIComponent(t)}`}
                className="px-3 py-1.5 rounded-lg border border-border/50 text-muted hover:text-foreground transition-colors"
                style={{ fontSize: "12px" }}
              >
                {t}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
