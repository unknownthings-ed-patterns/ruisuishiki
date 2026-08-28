"use client";

import { MathBody } from "@/components/Math";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, type CSSProperties } from "react";

/**
 * 図版エクスポート用の開発ページ。
 *
 * URL:
 *   /figure-export/?marker=NUMBER_EXPANSION_STEP1
 *   /figure-export/?marker=<<NUMBER_EXPANSION_STEP1>>&capture=1
 *
 * 本番ビルドには既定で含めない（next.config の pageExtensions + page.dev.tsx）。
 * 学習者向けナビには出さない。文型タグも出さない。
 */
export default function FigureExportPage() {
  return (
    <Suspense fallback={<CaptureFallback />}>
      <FigureExportBody />
    </Suspense>
  );
}

function CaptureFallback() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", margin: 0 }} />
  );
}

function normalizeMarker(raw: string | null): string {
  if (!raw) return "";
  return raw.trim().replace(/^<<\s*/, "").replace(/\s*>>$/, "");
}

const LIGHT_TOKENS: Record<string, string> = {
  "--background": "#ffffff",
  "--surface": "#ffffff",
  "--foreground": "#222222",
  "--muted": "#666666",
  "--border": "#dddddd",
  "--accent": "#2c6aa0",
  "--accent-warm": "#c47a2a",
  "--accent-soft": "#c5d8ea",
};

const lightStyle = LIGHT_TOKENS as CSSProperties;

/** SSR 時点で紙色・dev インジケータを消す。白トリムがページ全体を掴むのを防ぐ。 */
const PAGE_RESET_CSS = `
  html, body { background:#ffffff !important; color-scheme:light;
    min-height:0 !important; height:auto !important; margin:0; }
  nextjs-portal, [data-next-badge-root], [data-nextjs-dev-overlay],
  #__next-build-watcher { display:none !important; }
`;

function FigureExportBody() {
  const params = useSearchParams();
  const marker = useMemo(
    () => normalizeMarker(params.get("marker")),
    [params],
  );
  const capture = params.get("capture") === "1" || Boolean(marker);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.colorScheme = "light";
    html.style.background = "#ffffff";
    body.style.background = "#ffffff";
    body.style.margin = "0";
    for (const [k, v] of Object.entries(LIGHT_TOKENS)) {
      html.style.setProperty(k, v);
    }

    const root = document.getElementById("figure-capture-root");
    const hasSvg = Boolean(root?.querySelector("svg"));
    const leftover = Boolean(root?.textContent?.includes("<<"));
    html.dataset.figureReady = marker ? "1" : "index";
    html.dataset.figureUnknown = marker && (!hasSvg || leftover) ? "1" : "0";
    if (root) {
      root.dataset.unknown = html.dataset.figureUnknown;
    }
  }, [marker]);

  if (!marker) {
    return (
      <main
        style={{
          background: "#ffffff",
          color: "#222222",
          minHeight: "100vh",
          padding: "32px 28px",
          fontFamily:
            'var(--font-sans), "Hiragino Sans", "Noto Sans JP", sans-serif',
          maxWidth: 640,
        }}
      >
        <style>{PAGE_RESET_CSS}</style>
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            color: "#666666",
            margin: "0 0 16px",
          }}
        >
          開発用・本番ナビには出ません
        </p>
        <h1
          style={{
            fontFamily:
              'var(--font-serif), "Hiragino Mincho ProN", serif',
            fontSize: 28,
            fontWeight: 400,
            margin: "0 0 12px",
          }}
        >
          図版エクスポート
        </h1>
        <p style={{ lineHeight: 1.8, fontSize: 15 }}>
          既存の <code>figureMarker</code>（Math.tsx のマーカー）を、白背景に単体で描画します。撮影は{" "}
          <code>~/book-math1a/tools/capture_figures.py</code> が Chrome headless
          で行います。
        </p>
        <p style={{ lineHeight: 1.8, fontSize: 15 }}>
          例：
          <br />
          <code>/figure-export/?marker=NUMBER_EXPANSION_STEP1</code>
        </p>
      </main>
    );
  }

  const markerText = `<<${marker}>>`;

  return (
    <main
      style={{
        background: "#ffffff",
        color: "#222222",
        margin: 0,
        padding: 0,
        colorScheme: "light",
        ...lightStyle,
      }}
    >
      <style>{PAGE_RESET_CSS}</style>
      {!capture && (
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "#888888",
            padding: "8px 12px",
            margin: 0,
          }}
        >
          {marker}
        </p>
      )}
      <div
        id="figure-capture-root"
        data-marker={marker}
        style={{
          display: "inline-block",
          background: "#ffffff",
          padding: 40,
          ...lightStyle,
        }}
      >
        <style>{`
          #figure-capture-root > * { margin: 0 !important; }
        `}</style>
        <MathBody text={markerText} />
      </div>
    </main>
  );
}
