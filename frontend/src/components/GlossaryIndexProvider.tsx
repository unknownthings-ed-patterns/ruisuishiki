"use client";

import { createContext, type ReactNode } from "react";
import type { GlossaryIndex } from "@/lib/glossaryIndex";

/**
 * 辞書の索引を MathText（用語リンク）へ配る。索引はレイアウト（サーバー側）がビルド時に作る。
 * 索引の無い場所では、[用語] はリンクにならず素通しで表示される（辞書に無い語と同じ扱い）。
 */
export const GlossaryIndexContext = createContext<GlossaryIndex | null>(null);

export function GlossaryIndexProvider({
  index,
  children,
}: {
  index: GlossaryIndex;
  children: ReactNode;
}) {
  return <GlossaryIndexContext.Provider value={index}>{children}</GlossaryIndexContext.Provider>;
}
