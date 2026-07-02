/**
 * moraCount の自己実行テスト（テスト先行・C1 ゲート）。
 *
 * 実行：`npm run test:mora`（既存 tsc でコンパイル → node 実行。新規依存なし）。
 * node:assert/strict を使い、いずれか失敗すると throw して非ゼロ終了する。
 */
import assert from "node:assert/strict";
import { countMora } from "./moraCount";

// [入力, 期待拍数]。期待値の根拠は docs/段階0_俳句背骨_kokugo.md の表と対応。
const cases: [string, number][] = [
  ["さくら", 3],
  ["きょう", 2], // きょ=1, う=1
  ["がっこう", 4], // が・っ・こ・う（促音を数える）
  ["せんせい", 4], // せ・ん・せ・い（撥音を数える）
  ["ラーメン", 4], // ラ・ー・メ・ン（カタカナ＋長音符）
  ["しゃしん", 3], // しゃ・し・ん
  ["ウィスキー", 4], // ウ・ィ(0)・ス・キ・ー
  ["ふるいけや", 5], // 「古池や」上五
  ["", 0],
  ["ふるいけや　かわず", 8], // 全角空白を無視（5+3）
  ["古池や", 1], // 漢字は無視、「や」のみ
  // --- §6.1 全半角・合成の正規化（NFKC）---
  ["ﾗｰﾒﾝ", 4], // 半角カタカナ＋半角長音符 → ラ・ー・メ・ン
  ["ｷｮｳ", 2], // 半角の拗音 → キョ=1, ウ=1
  ["ｶﾞっこう", 4], // 半角濁点合成 ｶﾞ → ガ・っ・こ・う
  ["が", 1], // 分解形（か＋結合用濁点 U+3099）→ NFKC で が=1
  ["ちぢむ", 3], // ぢ は普通の1拍かな（誤って0にしない）
];

for (const [input, expected] of cases) {
  assert.equal(
    countMora(input),
    expected,
    `countMora(${JSON.stringify(input)}) は ${expected} を期待`,
  );
}

console.log(`moraCount: all ${cases.length} tests passed`);
