/**
 * 観点リスト（ViewpointList）— ジャンルごとの「よい作品に共通する特徴」。
 *
 * 正典: 推理式指導読方MVP仕様書（国語版第3弾）§5.5・§7.3・§8.3。
 *
 * 設計の核（G1・アトウェル）：
 *  - **薄く生まれる**。岩井2017 のフルリストを最初から与えない。読み比べや句会で育つ。
 *  - version を持つ生き物。句会の「なぜよかったか」で addedIn:"kukai" の項目が増えると版が上がる。
 *  - **各系列の核となる観点は initial に入れない**。子どもがその系列で発見すべきものを先出ししない。
 *    例：俳句の「季語」は系列②の発見の核なので initial から外す（2026-07-03 岩井先生裁定）。
 *    季語は子どもが読み比べで気づく（addedIn:"reading"）か系列②で発見して足される。
 *
 * 初期版（v1）の3項目は岩井先生が「系列①の模範句から最初に見せてよい最小」として選定。
 */

import type { ViewpointList } from "./types";

/**
 * 俳句の観点リスト。育つ生き物。
 * 各項目は revealedInSeries で「どの系列から見せるか」を持ち、系列の核を先出ししない（G1）。
 * - 初期3項目（五七五/リズム/見たまま）＝系列①から（revealedInSeries 未指定＝initial）
 * - 季語＝系列②「季語」で解禁（addedIn:"reading"）。系列①では見えない
 */
export const HAIKU_VIEWPOINT_LIST_V1: ViewpointList = {
  genreId: "haiku",
  version: 2,
  items: [
    { text: "五七五になっている", addedIn: "initial" },
    { text: "リズムがよい（声に出して気持ちいい）", addedIn: "initial" },
    { text: "見たこと（見たまま）を書いている", addedIn: "initial" },
    {
      text: "季節のことば（季語）がある",
      addedIn: "reading",
      revealedInSeries: "kokugo_haiku_kigo_01",
    },
    {
      text: "二つのものを向かい合わせている（切れ）",
      addedIn: "reading",
      revealedInSeries: "kokugo_haiku_kire_01",
    },
  ],
};

const LISTS: Record<string, ViewpointList> = {
  haiku: HAIKU_VIEWPOINT_LIST_V1,
};

/** ジャンルの現在の観点リストを返す（未登録は undefined）。 */
export function getViewpointList(genreId: string): ViewpointList | undefined {
  return LISTS[genreId];
}
