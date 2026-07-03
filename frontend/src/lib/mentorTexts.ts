/**
 * 模範句（MentorText）— 国語ユニット（俳句）の読み比べ・本歌取の素材。
 *
 * 正典: 推理式指導読方MVP仕様書（国語版第3弾）§5.4・§9（模範文調達計画）。
 *
 * 調達の三本柱（§9・G12）：
 *  1. パブリックドメイン（rights: "PD"）＝**戦前没の俳人に限定**。没年を1件ずつ確認。
 *     虚子（1959没）等の戦後没は保護期間70年により当面使わない。
 *  2. 自作（rights: "original"）＝設計者/先生の自作。比較ペアの相方（字余り・定型の対）は
 *     自作でしか作れないことが多い。牧口が「新川」で自作した正統な継承。
 *  3. 許諾（rights: "licensed"）＝学習者・家族の句（shareable のもののみ・実名は載せない）。
 *
 * ※docs や背骨には模範句の現物を書かない（G12）。現物はこのデータファイルにのみ置く。
 * ※reading（よみがな）は音数表示用。moraCount の入力になる。漢字の読み推定はしない。
 * ※viewpointTags は教師/設計者ビュー用。子ども UI には出さない（発見を奪わない・G1）。
 */

import type { MentorText } from "./types";

export const HAIKU_MENTOR_TEXTS: MentorText[] = [
  // ── パブリックドメイン（戦前没・定型） ──────────────────────────
  {
    id: "haiku_furuike",
    text: "古池や蛙飛びこむ水の音",
    reading: "ふるいけやかわずとびこむみずのおと",
    author: "松尾芭蕉",
    sourceNote:
      "松尾芭蕉（1644–1694）。『蛙合』（1686）所収。没後100年超によりパブリックドメイン。",
    rights: "PD",
    kigo: { word: "蛙", season: "春" },
    viewpointTags: ["切れ（や）", "静と動の対比", "音"],
    shareable: false,
  },
  {
    id: "haiku_nanohana",
    text: "菜の花や月は東に日は西に",
    reading: "なのはなやつきはひがしにひはにしに",
    author: "与謝蕪村",
    sourceNote:
      "与謝蕪村（1716–1784）。没後100年超によりパブリックドメイン。",
    rights: "PD",
    kigo: { word: "菜の花", season: "春" },
    viewpointTags: ["切れ（や）", "東と西の対比", "広がり"],
    shareable: false,
  },
  {
    id: "haiku_yasegaeru",
    text: "やせ蛙まけるな一茶これにあり",
    reading: "やせがえるまけるないっさこれにあり",
    author: "小林一茶",
    sourceNote:
      "小林一茶（1763–1828）。『七番日記』（1816）所収。没後100年超によりパブリックドメイン。",
    rights: "PD",
    kigo: { word: "蛙", season: "春" },
    viewpointTags: ["呼びかけ", "応援", "作者が出てくる"],
    shareable: false,
  },
  {
    id: "haiku_kaki",
    text: "柿くへば鐘が鳴るなり法隆寺",
    reading: "かきくえばかねがなるなりほうりゅうじ",
    author: "正岡子規",
    sourceNote:
      "正岡子規（1867–1902）。没後100年超によりパブリックドメイン。",
    rights: "PD",
    kigo: { word: "柿", season: "秋" },
    viewpointTags: ["音", "場所", "取り合わせ"],
    shareable: false,
  },

  // ── パブリックドメイン（戦前没・自由律） ────────────────────────
  {
    id: "free_seki",
    text: "咳をしても一人",
    reading: "せきをしてもひとり",
    author: "尾崎放哉",
    sourceNote:
      "尾崎放哉（1885–1926）。自由律俳句。没後100年近くパブリックドメイン。",
    rights: "PD",
    viewpointTags: ["自由律（型なし）", "孤独", "短さ"],
    shareable: false,
  },
  {
    id: "free_wakeitte",
    text: "分け入つても分け入つても青い山",
    reading: "わけいってもわけいってもあおいやま",
    author: "種田山頭火",
    sourceNote:
      "種田山頭火（1882–1940）。自由律俳句。没後80年超によりパブリックドメイン。",
    rights: "PD",
    viewpointTags: ["自由律（型なし）", "くり返し", "歩く感じ"],
    shareable: false,
  },

  // ── 自作（比較ペアの相方・音数の題材） ──────────────────────────
  // 字余りの minimal pair（step4）。同じ光景で「そめてる」→「そめている」を
  // 一語だけ伸ばし、中七が八音になる。定型と字余りの最小対。
  {
    id: "orig_yuyake_teikei",
    text: "夕焼けが山をそめてる帰り道",
    reading: "ゆうやけがやまをそめてるかえりみち",
    author: "（自作）",
    sourceNote: "設計者の自作（字余り比較ペアの定型側）。",
    rights: "original",
    kigo: { word: "夕焼け", season: "夏" },
    viewpointTags: ["定型（5-7-5）", "情景"],
    shareable: false,
  },
  {
    id: "orig_yuyake_jiamari",
    text: "夕焼けが山をそめている帰り道",
    reading: "ゆうやけがやまをそめているかえりみち",
    author: "（自作）",
    sourceNote: "設計者の自作（字余り比較ペアの字余り側・中八）。",
    rights: "original",
    kigo: { word: "夕焼け", season: "夏" },
    viewpointTags: ["字余り（中八）", "情景"],
    shareable: false,
  },
  // 音数の識別題材（step2）。拗音・長音・撥音・促音をすべて含む。
  {
    id: "orig_kyushoku",
    text: "給食でラーメン食べたおいしいっ",
    reading: "きゅうしょくでラーメンたべたおいしいっ",
    author: "（自作）",
    sourceNote:
      "設計者の自作（拗音きゅ・しょ／長音ー／撥音ン／促音っ をすべて含む音数の題材。5-7-5）。",
    rights: "original",
    viewpointTags: ["拗音", "長音", "撥音", "促音"],
    shareable: false,
  },

  // ── 系列②「季語」用 ──────────────────────────────
  // PD（季語が明快な句・識別/季節あて）
  {
    id: "haiku_yuki_shiki",
    text: "いくたびも雪の深さを尋ねけり",
    reading: "いくたびもゆきのふかさをたずねけり",
    author: "正岡子規",
    sourceNote: "正岡子規（1867–1902）。没後100年超によりパブリックドメイン。",
    rights: "PD",
    kigo: { word: "雪", season: "冬" },
    viewpointTags: ["季語（冬）", "くり返し", "病床の景"],
    shareable: false,
  },
  {
    id: "haiku_harunoumi",
    text: "春の海ひねもすのたりのたりかな",
    reading: "はるのうみひねもすのたりのたりかな",
    author: "与謝蕪村",
    sourceNote: "与謝蕪村（1716–1784）。没後100年超によりパブリックドメイン。",
    rights: "PD",
    kigo: { word: "春の海", season: "春" },
    viewpointTags: ["季語（春）", "くり返しの音", "のどかさ"],
    shareable: false,
  },
  // 季語交換ペア（自作）。同じ句型で季語だけ替え、世界が春↔秋に変わる（質的変化の核）。
  {
    id: "orig_tsugakuro_haru",
    text: "さくら咲く一年生の通学路",
    reading: "さくらさくいちねんせいのつうがくろ",
    author: "（自作）",
    sourceNote: "設計者の自作（季語交換ペアの春側）。",
    rights: "original",
    kigo: { word: "さくら", season: "春" },
    viewpointTags: ["季語（春）", "はじまりの希望"],
    shareable: false,
  },
  {
    id: "orig_tsugakuro_aki",
    text: "もみじ散る一年生の通学路",
    reading: "もみじちるいちねんせいのつうがくろ",
    author: "（自作）",
    sourceNote: "設計者の自作（季語交換ペアの秋側・同型で季語だけ替えた相方）。",
    rights: "original",
    kigo: { word: "もみじ", season: "秋" },
    viewpointTags: ["季語（秋）", "落ち着き・移ろい"],
    shareable: false,
  },

  // ── 系列③「切れ」用 ──────────────────────────────
  // 切れ字の有無ペア（＋α）。orig_yuyake_teikei（切れなし・叙述）の相方。
  // 「が」を「や」に一字替えると、ひとつづきの叙述が「夕焼け！」で切れて二物の並置になる。
  {
    id: "orig_yuyake_kire",
    text: "夕焼けや山をそめてる帰り道",
    reading: "ゆうやけややまをそめてるかえりみち",
    author: "（自作）",
    sourceNote: "設計者の自作（切れ字の有無ペアの切れ字あり側。orig_yuyake_teikei の相方）。",
    rights: "original",
    kigo: { word: "夕焼け", season: "夏" },
    viewpointTags: ["切れ（や）", "二物の並置"],
    shareable: false,
  },
];

/** id から模範句を引く（未登録は undefined）。 */
export function getMentorText(id: string): MentorText | undefined {
  return HAIKU_MENTOR_TEXTS.find((m) => m.id === id);
}
