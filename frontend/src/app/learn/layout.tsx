import type { ReactNode } from "react";
import { GlossaryIndexProvider } from "@/components/GlossaryIndexProvider";
import { GLOSSARY } from "@/lib/glossary";
import { buildGlossaryIndex } from "@/lib/glossaryIndex";

/**
 * 辞書の索引（語・1 文の説明・関連系列）をビルド時に作り、配下のページの MathText へ配る。
 * 辞書の本体はクライアントへ送らない（詳しいページを開いたときに読み込む）。
 */
const GLOSSARY_INDEX = buildGlossaryIndex(GLOSSARY);

export default function Layout({ children }: { children: ReactNode }) {
  return <GlossaryIndexProvider index={GLOSSARY_INDEX}>{children}</GlossaryIndexProvider>;
}
