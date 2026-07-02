/**
 * 俳句の「音数」＝拍（モーラ）を数える純粋関数。
 *
 * 位置づけ：国語版 ruisuishiki MVP（俳句ユニット）の入力系ゲート C1。
 * 設計の正：docs/段階0_俳句背骨_kokugo.md（および vault 第3弾 §段階1）。
 *
 * 方針：
 * - 対象は「よみがな欄」のかな文字列。漢字の読み推定はしない（作品欄とよみがな欄は別入力）。
 * - これは正誤判定ではなく可視化のための計数（meterPolicy: "visualize"）。字余り・字足らずも俳句。
 * - `answerEval.ts` の `normalizeInput` は流用しない（あれは長音符「ー」をハイフンに変換する別用途。
 *   ここでは「ー」を 1 拍として保持する必要がある）。よって自己完結の実装にしてある。
 *
 * 拍の規則（標準的な俳句の音数勘定・vault 第3弾 §6.1）：
 * - 数える前に NFKC 正規化する。これで半角カタカナ（ﾗｰﾒﾝ）・半角濁点（ｶﾞ）・
 *   全角空白・濁点合成文字（か＋゙）を全角の合成済みかなに畳んでから数える。
 *   （第3弾は「NFC」と書くが、NFC は半角カタカナを畳まない。§6.1 が要求する
 *   「カタカナ・全角半角の正規化」を満たすには NFKC が正しい。）
 * - 小書きの拗音・小母音（ゃゅょ／ぁぃぅぇぉ／ゎ 等、カタカナ同）は数えない（直前の拍に付く。「きょう」=2）。
 * - 促音「っ／ッ」・撥音「ん／ン」・長音符「ー」は 1 拍として数える。
 * - 空白（半角・全角）・句読点・その他の非かな文字（漢字含む）は無視する。
 * - ひらがな・カタカナは同等に扱う。
 */

/**
 * 直前の拍に付く小書きかな（拗音・小母音）。これ自体は拍として数えない。
 * 促音「っ／ッ」・撥音「ん／ン」・長音符「ー」は 1 拍なので、ここには含めない。
 */
const NON_MORAIC_SMALL_KANA = new Set(
  // ひらがな小書き
  "ぁぃぅぇぉゃゅょゎゕゖ" +
    // カタカナ小書き
    "ァィゥェォャュョヮヵヶ",
);

/** 拍として数える対象のかな文字か（ひらがな／カタカナ／長音符）。 */
function isCountableKana(codePoint: number): boolean {
  return (
    (codePoint >= 0x3041 && codePoint <= 0x3096) || // ひらがな ぁ〜ゖ
    (codePoint >= 0x30a1 && codePoint <= 0x30fa) || // カタカナ ァ〜ヺ
    codePoint === 0x30fc // 長音符 ー
  );
}

/**
 * かな文字列の拍（モーラ）数を返す。
 *
 * @param kana よみがな欄の文字列。非かな（漢字・空白・記号）は無視される。
 * @returns 拍数（0 以上）。
 */
export function countMora(kana: string): number {
  let count = 0;
  // NFKC で半角カタカナ・半角濁点・全角空白・濁点合成を畳んでから数える（§6.1）。
  for (const ch of kana.normalize("NFKC")) {
    if (NON_MORAIC_SMALL_KANA.has(ch)) continue;
    const codePoint = ch.codePointAt(0);
    if (codePoint !== undefined && isCountableKana(codePoint)) {
      count += 1;
    }
  }
  return count;
}
