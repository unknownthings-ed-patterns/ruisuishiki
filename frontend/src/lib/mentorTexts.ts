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
  // 在庫（未使用・読み比べ/句会の追加素材）。系列本文では未参照だが、
  // G4「アンソロジーを厚く」に沿って残す。「呼びかけ・応援」は句会で子ども
  // から出やすい観点で、observedIn:"kukai" の初出候補（第6弾 Q4 推奨裁定）。
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
      "尾崎放哉（1885–1926）。自由律俳句。没後100年（1926没）によりパブリックドメイン。",
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

/* ============================================================================
 * 自由詩ユニット（系列①「5秒の詩（見たままを置く）」）の模範文
 *
 * 正典: docs/自由詩背骨_kokugo.md（模範文調達計画・権利規律）。
 *
 * 権利規律の拡張条項（2026-08-09 先生裁定）：
 *  - 外国作品は**自前訳のみ掲載・原文は外部リンク**（原文はリポジトリのどこにも置かない）。
 *    訳は既存訳を参照せず原文から自前で作る（訳文の著作権は別建てのため）。
 *  - 日本でのPD判定を1篇ずつ文書化する：著者没年＋50年の満了 × 初出が 1952-04-28
 *    （講和条約発効）以降＝戦時加算なし × 2018-12-30 時点で満了済み＝延長で復活しない。
 *  - 日本人著者は 1967年以前没＝PD（戦時加算は日本人著者に適用されない）。
 *
 * form が free_verse のときは「音数の器を持たない」印。moraCount は適用しない（G2 の徹底）。
 * ※この注釈で `form` を「キー: 値」の形で書かないこと——audit の MentorText 分割は
 *   `id:` の出現位置で区切る素朴な実装なので、直前のエントリの値として拾われてしまう。
 * text の改行 `\n` が行分けそのもの＝作品の一部なので、表示でも保つ。
 * ========================================================================== */

export const SHI_MENTOR_TEXTS: MentorText[] = [
  // ── 自作：Step1 の対比ペア（同じ5秒の場面を、説明文と詩で） ──────────
  // 対比変数の制御が命なので自作でしか作れない（背骨§模範文調達計画）。
  {
    id: "shi_inu_setsumei",
    text: "けさ、いぬが みずを のんでいた。ぴちゃぴちゃと おとが して、とても かわいかった。",
    author: "（自作）",
    sourceNote:
      "設計者の自作（Step1 対比ペアの説明文側。同じ5秒の場面を、まとめと気持ちのことばで書いた版）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["説明文（ふつうの文）", "気持ちのことばで締める", "まとめてしまう"],
    shareable: false,
  },
  {
    id: "shi_inu_shi",
    text: "いぬが みずを のむ\nももいろの したが\nでて は ひっこむ\nうつわの なかで\nひかりが\nゆれて は もどる",
    author: "（自作）",
    sourceNote:
      "設計者の自作（Step1 対比ペアの詩側。同じ5秒を、気持ちのことばなしで、見えた順に置いて行分けした版）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["見たままを置く", "行分け", "ゆっくり見せる", "5秒"],
    shareable: false,
  },

  // ── 自作：Step2 の識別ペア（別題材・見たまま／気持ちのことば入り） ──────
  {
    id: "shi_pool_mitamama",
    text: "プールから あがると\nコンクリートに\n足の かたちが\nついて\nすぐ きえた",
    author: "（自作）",
    sourceNote: "設計者の自作（Step2 識別ペアの見たまま側）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["見たままを置く", "5秒", "消えるまでを見る"],
    shareable: false,
  },
  {
    id: "shi_pool_kimochi",
    text: "プールは つめたくて きもちよかった。とても たのしかった。",
    author: "（自作）",
    sourceNote:
      "設計者の自作（Step2 識別ペアの気持ちのことば入り側。同じ題材で、見たものが消えて感想だけが残る版）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["気持ちのことばだけ", "見たものが消える"],
    shareable: false,
  },

  // ── 自作：Step3 の最小対（一語＝感想語だけ違う） ──────────────────
  {
    id: "shi_semi_a",
    text: "せみの ぬけがらが\nてつぼうに\nつかまって いた",
    author: "（自作）",
    sourceNote: "設計者の自作（Step3 最小対の A 側。感想語なし）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["見たままを置く", "最小対（なし側）"],
    shareable: false,
  },
  {
    id: "shi_semi_b",
    text: "せみの ぬけがらが\nてつぼうに\nつかまって いて\nかわいそうだった",
    author: "（自作）",
    sourceNote:
      "設計者の自作（Step3 最小対の B 側。A に一行＝気持ちのことばだけを足した相方）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["気持ちのことばを足す", "最小対（あり側）"],
    shareable: false,
  },

  // ── 自作：Step5 の改行位置違い2版（同一文・切る位置だけ違う＝質的変化の核）──
  {
    id: "shi_curtain_a",
    text: "ゆうがたの きょうしつで\nカーテンが ふくらんで\nもどる",
    author: "（自作）",
    sourceNote:
      "設計者の自作（Step5 改行位置ペアの A 版。同一文「ゆうがたの きょうしつで カーテンが ふくらんで もどる」を 3 行に切った版）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["行のかわり目", "3行に切る"],
    shareable: false,
  },
  {
    id: "shi_curtain_b",
    text: "ゆうがたの\nきょうしつで\nカーテンが\nふくらんで\nもどる",
    author: "（自作）",
    sourceNote:
      "設計者の自作（Step5 改行位置ペアの B 版。A と同一文を 5 行に切った相方。変えたのは切る位置だけ）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["行のかわり目", "5行に切る", "ゆっくり見せる"],
    shareable: false,
  },

  // ── 自作：Step6 の素材文（制約＝2回切って3行に）──────────────────
  {
    id: "shi_zokin_moto",
    text: "あさの ろうかで ぞうきんの みずが ひかって いた",
    author: "（自作）",
    sourceNote: "設計者の自作（Step6 の素材文。切れ目のない一続きの文）。",
    rights: "original",
    form: "free_verse",
    viewpointTags: ["切る前の一続き", "5秒"],
    shareable: false,
  },

  // ── 日本のパブリックドメイン詩（Step4「詩→ふつうの文に戻す」の材料）──────
  // 山村暮鳥 1884–1924。没後50年は1974年末に満了（2018-12-30 の延長施行前に満了済み
  // ＝復活しない）。本文は青空文庫で一次確認（下記URL）。旧仮名づかいなので
  // reading に現代かなの読みを添える（音数検算には使わない）。
  {
    id: "shi_tsubame_bocho",
    text: "きり\nきり\nつばめ\n燕（つばめ）、どこいつた\nわたしの目へ飛びこんだ\n\nきり\nきり\nさへづつて\n飛びこんだとおもつたら\nもう彼方（あちら）をとんでゐた",
    reading:
      "きり／きり／つばめ／つばめ、どこいった／わたしのめへとびこんだ／きり／きり／さえずって／とびこんだとおもったら／もうあちらをとんでいた",
    author: "山村暮鳥",
    sourceNote:
      "山村暮鳥（1884–1924）「燕」。底本『日本児童文学大系 第一四巻』ほるぷ出版, 1977（底本の親本『春の海のうた』教文館, 1941）。本文は青空文庫の図書カード（https://www.aozora.gr.jp/cards/000136/card45048.html）で一次確認。著者は1924年没＝死後50年が1974年末に満了しており、2018年の保護期間延長でも復活しないためパブリックドメイン。旧仮名づかいは底本のまま。",
    rights: "PD",
    form: "free_verse",
    viewpointTags: ["見たままを置く", "5秒", "行分け", "音のことば"],
    shareable: false,
  },

  // ── W.C.ウィリアムズ（自前訳・原文は掲載せず外部リンクのみ）────────────
  // 1963年没＝死後50年が2013年末に満了。初出が 1952-04-28 以降の詩に限り
  // 戦時加算がかからず日本PD。2018-12-30 時点で満了済みなので延長でも復活しない。
  {
    id: "shi_iris_wcw",
    text: "あやめが どっと さいた\n朝ごはんに おりてきて\nわたしたちは\n\nへやから へやへ さがした\nあの いちばん あまい\nにおいの\n\nみなもとを はじめは\nどこから くるのか\nわからなかった\n\nそのとき 海のような\n青が ふいに\n目に とびこんだ\n\nらっぱのかたちの 花びらの\nあいだから わたしたちを\nおどろかせて",
    author: "ウィリアム・カルロス・ウィリアムズ（訳: ruisuishiki）",
    sourceNote:
      "William Carlos Williams「Iris」。Pictures from Brueghel and Other Poems (New Directions, 1962) の新作セクション（1958–62年執筆分）所収。著者1963年没・初出1952年以降＝戦時加算なし・日本では死後50年が2013年末に満了・2018年の延長でも復活せず＝日本ではパブリックドメイン。訳は原文から自前（既存訳は参照していない）。原文は本リポジトリに置かず外部リンクのみ（2026-08-09 先生裁定）。初出年の一次確認済み（2026-08-09）：本書1963年英国版（MacGibbon & Kee・Distributed Proofreaders Canada 電子化 FadedPage #20191144）の著作権ページで、The Desert Music=©1949–1954・Journey to Love=©1954–1955 と明記され、巻全体©年の残余 1956/1957/1959/1960/1961/1962 が新作セクションの初出年に対応。本詩は目次・本文位置から新作セクション所収を確認→初出は早くても1956年＝1952-04-28以降が確定。",
    rights: "PD",
    form: "free_verse",
    viewpointTags: ["見たままを置く", "さがす順に置く", "最後に色が来る", "本歌（Step7）"],
    shareable: false,
  },
  {
    id: "shi_turtle_wcw",
    text: "目の せいじゃない、\nとりみたいな 目の せいじゃなく、\nくちばしが あるからだ、\nとりみたいに、なにかを つつくための——\nだから きみは かめに ひかれた。\nきみの たったひとつの ペット。\nいっしょに いると\nきみは かめの ことしか はなさない。\nかめの ちょっとした うごきにも\nぶっそうな たくらみを\nいちいち 見つけては。\nきみは たのむ、\nぼくに 詩を かいてくれ と、\nかめの 詩なんて かけるなら、だけど。\nかめは どろの なかに すんでいる、\nでも どろみたいじゃ ない。\nすんだ 目を みれば\nそれが わかる。\nいま とじこめられている ところから\nにげだしたら、\nかめは 世界じゅうを のし歩いて\nなんでも こわして まわるだろう、\nその するどい くちばしで。\nまちの とおりで\nたちふさがる ものは\nみんな たおれる。\nくるまは ひっくりかえる。\nそして その せなかに\nのって、\nせいふくの たびに でるのは、\nわがきみ、\nきみだ！\nきみが おうさまに なるんだ！\nはじまりの ときには\n大きな かめが いて\n世界を せおっていた。\nその うえに\nすべてが けっきょくは\nのっている。\nかめが いなければ\nなにも 立って いられない。\nかめは なんでも しっていて\nうさぎより はやく はしれる。\nよるには\nその 目が かめを\nしらない 場所へ つれていく。\nかめは きみの ともだちだ。",
    author: "ウィリアム・カルロス・ウィリアムズ（訳: ruisuishiki）",
    sourceNote:
      "William Carlos Williams「The Turtle（かめ——まごのために）」。Pictures from Brueghel and Other Poems (New Directions, 1962) の新作セクション（1958–62年執筆分）所収。著者1963年没・初出1952年以降＝戦時加算なし・日本では死後50年が2013年末に満了・2018年の延長でも復活せず＝日本ではパブリックドメイン。訳は原文から自前（既存訳は参照していない）。原文は本リポジトリに置かず外部リンクのみ（2026-08-09 先生裁定）。初出年の一次確認済み（2026-08-09）：本書1963年英国版（MacGibbon & Kee・Distributed Proofreaders Canada 電子化 FadedPage #20191144）の著作権ページで、The Desert Music=©1949–1954・Journey to Love=©1954–1955 と明記され、巻全体©年の残余 1956/1957/1959/1960/1961/1962 が新作セクションの初出年に対応。本詩は目次・本文位置から新作セクション所収を確認→初出は早くても1956年＝1952-04-28以降が確定。用途は比較教材ではなくアンソロジー（G4 の厚み）＝「見たままから空想へ広げてもいい」幅の見本。",
    rights: "PD",
    form: "free_verse",
    viewpointTags: ["見たままから空想へ", "呼びかけ", "長い詩", "アンソロジー"],
    shareable: false,
  },
];

/** 国語ユニットの模範文（俳句＋自由詩）。 */
export const KOKUGO_MENTOR_TEXTS: MentorText[] = [
  ...HAIKU_MENTOR_TEXTS,
  ...SHI_MENTOR_TEXTS,
];

/** id から模範文を引く（俳句・自由詩の両方。未登録は undefined）。 */
export function getMentorText(id: string): MentorText | undefined {
  return KOKUGO_MENTOR_TEXTS.find((m) => m.id === id);
}
