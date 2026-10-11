import { buildKokugoCatalogIndex, buildMathCatalogIndex } from "@/lib/catalogIndex.server";
import LearnIndex from "./LearnIndex";

/**
 * /learn の入口（サーバー側・ビルド時に 1 回だけ走る）。全系列から軽い索引を作って渡すだけで、
 * 系列の本文はクライアントに送らない（2026-10-11 バンドル分割）。
 */
export default function Page() {
  return <LearnIndex math={buildMathCatalogIndex()} kokugo={buildKokugoCatalogIndex()} />;
}
