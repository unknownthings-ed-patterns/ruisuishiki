import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-12">
        {/* ヒーロー */}
        <header className="flex flex-col items-center gap-5">
          <h1
            className="font-serif tracking-wide text-foreground"
            style={{ fontSize: "clamp(48px, 6vw, 84px)", letterSpacing: "0.08em" }}
          >
            ruisuishiki
          </h1>
          <p
            className="text-muted"
            style={{ fontSize: "clamp(16px, 1.125rem, 18px)" }}
          >
            算数・数学を、考える喜びへ。
          </p>
        </header>

        {/* 説明 */}
        <p
          className="text-foreground/85 max-w-prose"
          style={{ fontSize: "clamp(15px, 1rem, 16px)", lineHeight: 2 }}
        >
          戸田城外『推理式指導算術』(1930) の方法論を、
          <br className="hidden sm:inline" />
          子どもにも、大人にも、教師にも開かれた
          <br className="hidden sm:inline" />
          無料の教育プラットホームとして再構成する試み。
        </p>

        {/* 2つの大きなボタン */}
        <nav
          aria-label="入り口"
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <Link
            href="/learn/"
            className="inline-flex items-center justify-center min-w-[160px] px-10 py-5 rounded-lg bg-accent text-background text-lg font-medium tracking-widest transition-transform duration-150 hover:scale-[1.02] focus-visible:scale-[1.02]"
            style={{ letterSpacing: "0.2em" }}
          >
            学ぶ
          </Link>
          <Link
            href="/teach/"
            className="inline-flex items-center justify-center min-w-[160px] px-10 py-5 rounded-lg border border-accent text-accent text-lg font-medium tracking-widest transition-colors duration-150 hover:bg-accent-soft/40"
            style={{ letterSpacing: "0.2em" }}
          >
            作る
          </Link>
        </nav>

        {/* フッター・補足 */}
        <footer
          className="mt-20 text-muted text-center"
          style={{ fontSize: "12px", letterSpacing: "0.1em" }}
        >
          オープンソース　／　無料　／　GitHub Pages
        </footer>
      </div>
    </main>
  );
}
