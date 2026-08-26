/**
 * 国語系列カタログ（学習者ビュー `/learn` 用）。
 *
 * 数学の STATIC_CATALOG（subject → topicGroup）に対応する薄いミラー。
 * トップ見出し「国語」の下に、ジャンル（俳句／詩／物語…）で折りたたみ、
 * その中に系列カードを並べる。系列を足すときはここへ 1 エントリ追加する。
 *
 * 型は KokugoSeries のまま（LearnerSeries と混ぜない・第3弾§5 加法的拡張）。
 */

import { KOKUGO_HAIKU_SERIES_LIST } from "./seriesKokugoHaiku";
import { KOKUGO_HANASHI_SERIES_LIST } from "./seriesKokugoHanashi";
import { KOKUGO_NIKKI_SERIES_LIST } from "./seriesKokugoNikki";
import { KOKUGO_SHI_SERIES_LIST } from "./seriesKokugoShi";
import { KOKUGO_ZUIHITSU_SERIES_LIST } from "./seriesKokugoZuihitsu";
import type { KokugoSeries } from "./types";

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

export type KokugoCatalogEntry = {
  series: KokugoSeries;
  genreId: KokugoGenreId;
  /** カード下段の短い説明（回帰者向けナビ）。 */
  shortDescription: string;
  /** 「はじめてはこちら」など、入口を示す任意バッジ。 */
  badge?: string;
};

function byId(
  list: KokugoSeries[],
  id: string,
): KokugoSeries {
  const found = list.find((s) => s.id === id);
  if (!found) {
    throw new Error(`kokugoCatalog: series not found: ${id}`);
  }
  return found;
}

/**
 * 国語静的カタログ。順序＝画面の並び。
 * 物語などが増えたら、genreId を足してここに並べる。
 */
export const STATIC_KOKUGO_CATALOG: KokugoCatalogEntry[] = [
  {
    series: byId(KOKUGO_HAIKU_SERIES_LIST, "kokugo_haiku_form_01"),
    genreId: "haiku",
    shortDescription:
      "声に出して音を数え、五・七・五という「器」が何をしてくれるかを歩く。読みくらべ → まねっこ → 一句づくりまで、全 10 問。",
    badge: "はじめてはこちら",
  },
  {
    series: byId(KOKUGO_HAIKU_SERIES_LIST, "kokugo_haiku_kigo_01"),
    genreId: "haiku",
    shortDescription:
      "たった一語の季語で句の世界ぜんぶの季節が決まる。季語さがし → 季語交換で世界が変わる → 季語で一句まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_HAIKU_SERIES_LIST, "kokugo_haiku_kire_01"),
    genreId: "haiku",
    shortDescription:
      "句を「切れ」で二つに割ると、間と対比が生まれる。切れさがし → 二つのものの対比 → 切れで一句まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_5byo_01"),
    genreId: "shi",
    shortDescription:
      "気持ちのことばを消して、見えたものを見えた順に置くと、たった5秒がゆっくり・濃く見えてくる。読みくらべ → 行のかわり目の発見 → 自分の5秒まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_me_01"),
    genreId: "shi",
    shortDescription:
      "文字のすがたとならべ方が絵になり、さいごの一行と出会って詩になる。読みくらべ → 一字だけちがう字 → さいごの一行の発見 → 自分の一編まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_nazo_01"),
    genreId: "shi",
    shortDescription:
      "名前を一度も言わずに、にたものの名前だけをならべると、こたえがうかび上がる。読みくらべ → きめての行さがし → さいごのたとえが跳ぶ発見 → 自分のなぞなぞまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_owarai_01"),
    genreId: "shi",
    shortDescription:
      "行のおわりの音をそろえると期待が生まれ、さいごの一行がそれを裏切ると笑いになる。声に出して読みくらべ → そろえる音さがし → オチの発見 → 自分の一口お笑いまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_yume_01"),
    genreId: "shi",
    shortDescription:
      "そのものになりきって、ほんとうのすがたをゆめの中でうらがえすと、ねがいが濃く見えてくる。読みくらべ → ゆめから本体の当てっこ → うらがえしの発見 → 自分の「〜のゆめ」まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_kakeai_01"),
    genreId: "shi",
    shortDescription:
      "音のことばは、そのものの体と動きを運ぶ。せつめいの行とかけ合わせると、動きがその場で立ち上がる。声に出して読みくらべ → 音から体を当てる → ようすことばの有無の発見 → 自分のかけ合いの詩まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_heya_01"),
    genreId: "shi",
    shortDescription:
      "へやに分けてことばを集めると、だれでも詩の材料が手に入る。おなじことばをかさねると強さとリズムが生まれ、その回数は場面が決める。声に出して読みくらべ → へやと詩の行き来 → くりかえしの発見 → 自分の6つのへやの詩まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_SHI_SERIES_LIST, "kokugo_shi_suki_01"),
    genreId: "shi",
    shortDescription:
      "「好き」をならべるだけ——詩のいちばん低い入口。くわしさを一つ足し、行のおわりを少し動かすだけで、書いた人の顔が立ち上がる。読みくらべ → リストから人の逆算 → 行のおわりの発見 → 自分の好きリストまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_HANASHI_SERIES_LIST, "kokugo_hanashi_moshi_01"),
    genreId: "monogatari",
    shortDescription:
      "ありえない「もし」を一つだけ置いて、あとを筋のとおりにたどると、お話がほんとうらしく動きだす。読みくらべ → さいごの一回の破れの発見 → 自分の「もし」まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_HANASHI_SERIES_LIST, "kokugo_hanashi_nikoushiki_01"),
    genreId: "monogatari",
    shortDescription:
      "なんのかんけいもない二つのことばを出会わせると、お話のタネが生まれる。二つは遠いほどいい。読みくらべ → タネの逆算 → 二語の遠さの発見 → 自分のファンタジーまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_HANASHI_SERIES_LIST, "kokugo_hanashi_parody_01"),
    genreId: "monogatari",
    shortDescription:
      "人も場所も道具もぜんぶ入れかえたのに、それでもお話が立つ。よくできた入れ物を借りて中身を入れかえてみると、借りた入れ物のかたち——昔話の骨——が、はじめて手の中に見えてくる。読みくらべ → 入れ物と中身の見分け → 骨の図鑑との突き合わせ → 自分の書き換えまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_HANASHI_SERIES_LIST, "kokugo_hanashi_princess_01"),
    genreId: "monogatari",
    shortDescription:
      "みんなが同じだけたいせつにされて、そっくり同じになると、だれもえらべなくなる。止まったお話を動かすのは、たった一つのちがい。読みくらべ → ことばとねがいのずれ → そろいの行きどまりの発見 → 自分の「ちがう一つ」まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_HANASHI_SERIES_LIST, "kokugo_hanashi_settei_01"),
    genreId: "monogatari",
    shortDescription:
      "すきなもの・にがてなもの・もちもの・口ぐせ——わくに分けてならべただけのカードから、その人のお話が動き出す。せっていは、うごき出す前のストーリー。カードに分ける → 3つの特徴で当てる → せってい一つちがいの発見 → 自分の一座まで、全 10 問。",
  },
  {
    series: byId(KOKUGO_NIKKI_SERIES_LIST, "kokugo_nikki_mashita_01"),
    genreId: "nikki",
    shortDescription:
      "きのうを、おきたじゅんに、ました、ましたとならべると、読んだ人がその時間をいっしょに歩ける。読みくらべ → ならべかえ → 「」の発見 → じぶんのきのうまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_NIKKI_SERIES_LIST, "kokugo_nikki_slow_01"),
    genreId: "nikki",
    shortDescription:
      "文と文のすきまをなくすと、たった5びょうが、いっぱいに広がる。読みくらべ → すきまさがし → 時間を刻む道具の発見 → じぶんの5びょうまで、全 10 問。",
  },
  {
    series: byId(KOKUGO_ZUIHITSU_SERIES_LIST, "kokugo_zuihitsu_mitsuke_01"),
    genreId: "zuihitsu",
    shortDescription:
      "小さな「見つけた！」に、考えを一歩そえると、読んだ人までいっしょに考えはじめる。読みくらべ → 事実と考えの仕分け → 考えの一歩の発見 → じぶんの発見まで、全 10 問。",
  },
];

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
