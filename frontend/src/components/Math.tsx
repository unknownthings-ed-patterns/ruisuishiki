"use client";

import "katex/dist/katex.min.css";
import type React from "react";
import { InlineMath } from "react-katex";

/**
 * 問題文中の `$...$` を KaTeX でインライン描画する。
 *
 * 使い方：問題文の数式部分を $...$ で囲む。
 * 例：「$(x+1)(x+2)$ を展開すると $x^2 + \\square x + 2$ になります。」
 *
 * $...$ の外は通常テキストとして表示する。
 */
export function MathText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /\$([^$\n]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <InlineMath key={`m${keyCounter++}`} math={match[1]} />
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}
