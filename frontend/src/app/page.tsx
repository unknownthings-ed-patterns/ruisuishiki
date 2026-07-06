import Link from "next/link";

// public/ 配下の静的ファイル（理論文書の .md）へのリンクは、Next の basePath を
// 手動で前置する必要がある（Link コンポーネントはルートに対しては basePath を
// 自動付与するが、ここでは「ブラウザで開いて素の markdown を見る」用途なので
// 通常のアンカータグで配信する）。
const BP = process.env.NODE_ENV === "production" ? "/ruisuishiki" : "";

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
            算数・数学とことばを、考える喜びへ。
          </p>
        </header>

        {/* 説明 */}
        <p
          className="text-foreground/85 max-w-prose"
          style={{ fontSize: "clamp(15px, 1rem, 16px)", lineHeight: 2 }}
        >
          戸田城外『推理式指導算術』(1930) の方法論を、
          <br className="hidden sm:inline" />
          数とことばの系列としてひらきなおし、
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

        <section
          aria-label="今歩ける入口"
          className="w-full grid gap-3 sm:grid-cols-2 text-left"
        >
          <Link
            href="/learn/"
            className="rounded-lg border border-border px-5 py-4 transition-colors hover:border-accent/50"
            style={{ background: "var(--surface)" }}
          >
            <span
              className="block text-foreground font-serif"
              style={{ fontSize: "16px", letterSpacing: "0.05em" }}
            >
              算数・数学の系列
            </span>
            <span className="block text-muted mt-1" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              小学校算数から高校数学まで、前題と比べながら歩く。
            </span>
          </Link>
          <Link
            href="/learn/haiku/?seriesId=kokugo_haiku_form_01"
            className="rounded-lg border border-border px-5 py-4 transition-colors hover:border-accent/50"
            style={{ background: "var(--surface)" }}
          >
            <span
              className="block text-foreground font-serif"
              style={{ fontSize: "16px", letterSpacing: "0.05em" }}
            >
              国語（俳句）の系列
            </span>
            <span className="block text-muted mt-1" style={{ fontSize: "13px", lineHeight: 1.7 }}>
              声に出して読みくらべ、五七五・季語・切れを見つける。
            </span>
          </Link>
        </section>

        {/* この方法論について（理論文書） */}
        <section
          aria-labelledby="theory-heading"
          className="mt-20 w-full max-w-prose text-left border-t pt-12"
          style={{ borderColor: "var(--border)" }}
        >
          <h2
            id="theory-heading"
            className="font-serif text-foreground mb-4"
            style={{ fontSize: "20px", letterSpacing: "0.05em" }}
          >
            この方法論について
          </h2>
          <p
            className="text-foreground/85 mb-6"
            style={{ fontSize: "14px", lineHeight: 1.9 }}
          >
            このプロジェクトは戸田城外『推理式指導算術』(1930) の方法論を AI 時代に
            再構成し、算数・数学だけでなく国語の読み書きにもひらく試みです。
            背後にある理論文書を公開しています——
            <strong>アプリは消えても、考え方は残るように</strong>。
          </p>
          <p
            className="text-foreground/85 mb-6"
            style={{ fontSize: "14px", lineHeight: 1.9 }}
          >
            「<em>よい教育は、そこに働くパタンの圧縮として観察できる</em>」——
            <code style={{ fontSize: "13px" }}>ruisuishiki</code>{" "}
            は教育のパタン・ランゲージの実践として、戸田の推理式・胚細胞モデル・駆動質問という
            3 つの世代・分野からの応答を 1 つのコードに圧縮したものです。
          </p>
          <ul
            className="space-y-2 mb-6"
            style={{ fontSize: "14px", lineHeight: 1.7 }}
          >
            <li>
              <a
                href={`${BP}/theory/01-統合理論.md`}
                className="text-accent hover:underline"
              >
                第 1 弾：統合理論
              </a>
              <span className="text-muted ml-2">
                — 戸田の推理式の核を AI 時代に再構成する基本テーゼ
              </span>
            </li>
            <li>
              <a
                href={`${BP}/theory/02-批判的検討.md`}
                className="text-accent hover:underline"
              >
                第 2 弾：批判的検討
              </a>
              <span className="text-muted ml-2">
                — 10 の失敗モードを特定し、テーゼを修正
              </span>
            </li>
            <li>
              <a
                href={`${BP}/theory/03-MVP仕様書.md`}
                className="text-accent hover:underline"
              >
                第 3 弾：MVP 仕様書
              </a>
              <span className="text-muted ml-2">
                — 修正版テーゼに基づく実装仕様（執筆時点のアーカイブ）
              </span>
            </li>
            <li>
              <a
                href={`${BP}/theory/README.md`}
                className="text-accent hover:underline"
              >
                索引・継承者へのメッセージ
              </a>
            </li>
          </ul>
          <p
            className="text-muted"
            style={{ fontSize: "12px", lineHeight: 1.8 }}
          >
            理論文書は{" "}
            <a
              href={`${BP}/LICENSE-THEORY`}
              className="text-muted hover:text-foreground underline decoration-dotted"
            >
              CC BY-SA 4.0
            </a>{" "}
            で公開されています。原著者のクレジットを残し、派生物を同じライセンスで公開する限り、
            自由に複製・改変・継承できます。
          </p>
        </section>

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
