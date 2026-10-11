import { buildSeriesFileMap } from "@/lib/catalogIndex.server";
import Play from "./Play";

/**
 * /learn/play の入口（サーバー側・ビルド時に 1 回だけ走る）。「系列 → 系列ファイル」の表だけを渡し、
 * 系列の本文は、URL の ?seriesId= で選ばれた系列のファイルだけを後から読む（2026-10-11 バンドル分割）。
 */
export default async function Page() {
  return <Play seriesFiles={await buildSeriesFileMap()} />;
}
