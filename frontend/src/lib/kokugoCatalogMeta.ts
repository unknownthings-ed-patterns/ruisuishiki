/**
 * 国語カタログのうち、系列データを持たない部品（ジャンルの見出し・並び・URL）。
 * kokugoCatalog.ts（全国語系列を import する）から分けてある（2026-10-11 バンドル分割）。
 */

/** ジャンル id（ViewpointList.genreId と対応）。 */
export type KokugoGenreId =
  | "haiku"
  | "shi"
  | "monogatari"
  | "nikki"
  | "zuihitsu";

/** 表示順。エントリが無いジャンルは UI 側で出さない。 */
export const KOKUGO_GENRE_ORDER: KokugoGenreId[] = [
  "haiku",
  "shi",
  "monogatari",
  "nikki",
  "zuihitsu",
];

/** 折りたたみ見出し用ラベル（UI。「自由詩」ではなく「詩」でまとめる）。 */
export const KOKUGO_GENRE_LABEL: Record<KokugoGenreId, string> = {
  haiku: "俳句",
  shi: "詩",
  monogatari: "物語",
  nikki: "日記",
  // 「随筆」一語ではなく「随筆（エッセイ）」と添える（2026-08-22 岩井裁定5）。
  zuihitsu: "随筆（エッセイ）",
};

/** ジャンル見出し直下の短い導入（任意）。 */
export const KOKUGO_GENRE_INTRO: Partial<Record<KokugoGenreId, string>> = {
  haiku:
    "はじめてなら、まず「五七五のかたち」から。声に出して数えるところから始まります。",
  shi: "俳句の五・七・五という「器」を外すと、こんどは自分で行を切ることになります。",
  monogatari:
    "ありえないことを一つだけゆるして、あとは筋のとおりにたどる——短いお話のつくり方から。",
  nikki:
    "きのうのことを、おきたじゅんにならべる。それだけで、読んだ人がその時間をいっしょに歩けます。",
  zuihitsu:
    "小さな「見つけた！」に、考えを一歩そえる。それだけで、ただの一日が随筆になります。",
};

/** 折りたたみ状態のキー（数学の `${subject}|${topicGroup}` に対応）。 */
export function kokugoGenreGroupKey(genreId: KokugoGenreId): string {
  return `kokugo|${genreId}`;
}

/** genreId ごとにまとめる（順序はカタログ入力順を維持）。 */
export function groupKokugoByGenre<T extends { genreId: KokugoGenreId }>(
  entries: T[],
): { genreId: KokugoGenreId; items: T[] }[] {
  const map = new Map<KokugoGenreId, T[]>();
  for (const entry of entries) {
    const list = map.get(entry.genreId);
    if (list) list.push(entry);
    else map.set(entry.genreId, [entry]);
  }
  return KOKUGO_GENRE_ORDER.filter((id) => map.has(id)).map((genreId) => ({
    genreId,
    items: map.get(genreId)!,
  }));
}

/** 国語系列の学習者ビュー URL。 */
export function kokugoSeriesHref(
  seriesId: string,
  opts?: { fresh?: boolean; resume?: boolean },
): string {
  const base = `/learn/haiku/?seriesId=${seriesId}`;
  if (opts?.fresh) return `${base}&fresh=1`;
  return base;
}
