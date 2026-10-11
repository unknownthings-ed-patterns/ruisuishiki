"use client";

import katex from "katex";
import { useMemo } from "react";

/**
 * KaTeX の薄いラッパー（react-katex の置き換え・2026-10-11 監査）。
 *
 * react-katex は自前の katex（0.16 系）を抱えていて、CSS（トップレベルの katex）と
 * 描画 JS の版が食い違っていた。また KaTeX の設定を渡せないため、日本語を数式の中に
 * 書いた式（約 700 か所）で描画のたびに strict モードの console.warn が出ていた。
 * ここではトップレベルの katex を直接使い、版を 1 つにそろえる。
 *
 * 振る舞いは react-katex と同じ：構文エラーでも例外は投げず、KaTeX が赤字で描く
 * （throwOnError: false）。全系列・辞書の数式 24,005 種で、旧 0.16.47 と現 0.19 の
 * 描画 HTML が「内部クラス名に katex- 接頭辞が付く」以外は一致することを確かめてから
 * 切り替えた（アプリの CSS は内部クラスに触れていない。CSS は同じ版の katex.min.css）。
 */
function renderMath(math: string, displayMode: boolean): string {
  try {
    return katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      // 「$x$ 円」ではなく「$3$ 人・$2$ 回」のように和文を数式に含める書き方が
      // 多くの系列の実績記法。表示は変わらないので、警告だけを止める。
      strict: "ignore",
    });
  } catch {
    // throwOnError: false でも、不正な入力型などでは例外になりうる。素の文字で出す。
    return math
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

export function InlineMath({ math }: { math: string }) {
  const html = useMemo(() => renderMath(math, false), [math]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ math }: { math: string }) {
  const html = useMemo(() => renderMath(math, true), [math]);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
