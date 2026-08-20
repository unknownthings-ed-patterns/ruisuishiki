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

/**
 * 自由詩の観点リスト。俳句と同じく**薄く生まれる**（G1）。
 *
 * 3項目とも系列①「5秒の詩」の**発見の核**なので、initial（最初から見える）には
 * 置かず revealedInSeries でこの系列から解禁する。系列①の中では、読み比べ
 * （step1〜step7）を歩いたあとの観点抽出 step（step8・pickViewpoints）で
 * はじめて目に入る＝発見が先（俳句の「季語」を系列②で解禁するのと同じ手）。
 *
 * 系列②「目で見て楽しむ詩」の3項目（v2 で追加）も同じ扱い＝②の発見の核なので
 * ②から解禁する。系列①を歩く子には①の3項目だけが見え、②へ進むと②の3項目が
 * 足される（KOKUGO_SHI_SERIES_LIST／KOKUGO_ALL_SERIES の並び順が解禁順の正）。
 * 文面は docs/視覚詩背骨_kokugo.md の「観点リスト追加候補」で確定したもの。
 *
 * 系列③「見える見えるなぞなぞ詩」の3項目（v3 で追加）も同じ扱い＝③の発見の核なので
 * ③から解禁する。文面は docs/なぞなぞ詩背骨_kokugo.md の「観点リスト追加候補」で
 * 確定したもの（「さいごのたとえが、形をこえて跳んでいる」＝系列の核）。
 */
export const SHI_VIEWPOINT_LIST_V1: ViewpointList = {
  genreId: "shi",
  version: 3,
  items: [
    {
      text: "5秒のことを書いている",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_5byo_01",
    },
    {
      text: "気持ちのことばを使わずに、気持ちまで伝えている",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_5byo_01",
    },
    {
      text: "行のかわり目で止まると、ゆっくり見える",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_5byo_01",
    },
    {
      text: "文字が、もののかたちに見える",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_me_01",
    },
    {
      text: "ならべ方が、けしきになっている",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_me_01",
    },
    {
      text: "さいごの一行が、絵とであっている",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_me_01",
    },
    {
      text: "にたものの名前が、いくつもならんでいる",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_nazo_01",
    },
    {
      text: "言い方がいろいろにかわる（見える・みたい・のようだ）",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_nazo_01",
    },
    {
      text: "さいごのたとえが、形をこえて跳んでいる",
      addedIn: "reading",
      revealedInSeries: "kokugo_shi_nazo_01",
    },
  ],
};

/**
 * お話（物語）の観点リスト。俳句・自由詩と同じく**薄く生まれる**（G1）。
 *
 * 3項目とも系列①「『もし』のお話」の**発見の核**なので initial には置かず、
 * revealedInSeries でこの系列から解禁する。系列①の中では、読み比べ
 * （step1〜step7）を歩いたあとの観点抽出 step（step8・pickViewpoints）で
 * はじめて目に入る＝発見が先。文面は docs/ファージョン背骨_kokugo.md の
 * 「観点リスト追加候補」で確定したもの。
 */
export const MONOGATARI_VIEWPOINT_LIST_V1: ViewpointList = {
  genreId: "monogatari",
  version: 1,
  items: [
    {
      text: "「もし」は一つだけ",
      addedIn: "reading",
      revealedInSeries: "kokugo_hanashi_moshi_01",
    },
    {
      text: "くりかえしが、同じ形になっている",
      addedIn: "reading",
      revealedInSeries: "kokugo_hanashi_moshi_01",
    },
    {
      text: "さいごの一回で、形が破れている",
      addedIn: "reading",
      revealedInSeries: "kokugo_hanashi_moshi_01",
    },
  ],
};

/**
 * 日記（生活文）の観点リスト。俳句・自由詩・お話と同じく**薄く生まれる**（G1）。
 *
 * 2系列ぶんの6項目とも、それぞれの系列の**発見の核**なので initial には置かず、
 * revealedInSeries でその系列から解禁する。系列①を歩く子には①の3項目だけが見え、
 * 系列②へ進むと②の3項目が足される（KOKUGO_ALL_SERIES の並び順が解禁順の正）。
 * 文面は docs/日記背骨_kokugo.md の「観点候補」で確定したもの。
 *
 * ②の「文と文が、すきまなくぴったりつながっている」は、岩井の恩師の学級文集から
 * 教室へ受けつがれてきた指導言そのまま＝系列②の合言葉（2026-08-19 先生指示で収載。
 * 由来は完了画面「作家の風景」に系譜として明記してある）。
 */
export const NIKKI_VIEWPOINT_LIST_V1: ViewpointList = {
  genreId: "nikki",
  version: 1,
  items: [
    {
      text: "おきたじゅんに、ました、ましたと書いている",
      addedIn: "reading",
      revealedInSeries: "kokugo_nikki_mashita_01",
    },
    {
      text: "言ったことが「」で書いてある",
      addedIn: "reading",
      revealedInSeries: "kokugo_nikki_mashita_01",
    },
    {
      text: "したこと・見たこと・言ったこと・思ったことが入っている",
      addedIn: "reading",
      revealedInSeries: "kokugo_nikki_mashita_01",
    },
    {
      text: "5びょうくらいの、みじかい時間のことを書いている",
      addedIn: "reading",
      revealedInSeries: "kokugo_nikki_slow_01",
    },
    {
      text: "文と文が、すきまなくぴったりつながっている",
      addedIn: "reading",
      revealedInSeries: "kokugo_nikki_slow_01",
    },
    {
      text: "音や「」や、心の中のことばで、時間がゆっくりすすむ",
      addedIn: "reading",
      revealedInSeries: "kokugo_nikki_slow_01",
    },
  ],
};

const LISTS: Record<string, ViewpointList> = {
  haiku: HAIKU_VIEWPOINT_LIST_V1,
  shi: SHI_VIEWPOINT_LIST_V1,
  monogatari: MONOGATARI_VIEWPOINT_LIST_V1,
  nikki: NIKKI_VIEWPOINT_LIST_V1,
};

/** ジャンルの現在の観点リストを返す（未登録は undefined）。 */
export function getViewpointList(genreId: string): ViewpointList | undefined {
  return LISTS[genreId];
}
