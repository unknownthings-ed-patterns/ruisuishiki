/**
 * 辞書の軽い索引（2026-10-11 バンドル分割）。
 *
 * MathText の用語リンク（[用語]）が描画のたびに要るのは「その語が辞書にあるか・1 文の説明・
 * 詳しいページがあるか・関連系列」だけ。辞書の本体（glossary.ts・約 1.3 MB）は、詳しいページを
 * 開いたときに初めて読み込む。索引はビルド時にレイアウト（サーバー側）で作ってページへ渡す。
 */
import type { GlossaryEntry } from "./glossary";

export type GlossaryIndexEntry = {
  short: string;
  /** 「もっと詳しく」で開く辞書ページ（meaning または easy）があるか。 */
  hasDetail: boolean;
  relatedSeriesId?: string;
};

export type GlossaryIndex = Record<string, GlossaryIndexEntry>;

export function buildGlossaryIndex(glossary: Record<string, GlossaryEntry>): GlossaryIndex {
  const index: GlossaryIndex = {};
  for (const [term, entry] of Object.entries(glossary)) {
    index[term] = {
      short: entry.short,
      hasDetail: Boolean(entry.easy || entry.meaning),
      ...(entry.relatedSeriesId ? { relatedSeriesId: entry.relatedSeriesId } : {}),
    };
  }
  return index;
}
