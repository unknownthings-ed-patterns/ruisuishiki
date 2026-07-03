/**
 * 数学解答評価器の自己実行回帰テスト。
 *
 * 実行：`npm run test:math`（tsc でコンパイル → node 実行）。
 */
import assert from "node:assert/strict";
import {
  ANSWER_TOL,
  evaluateAnswer,
  judgeSingle,
  judgeSolutionSet,
} from "./answerEval";

function close(actual: number | null, expected: number, label: string) {
  assert.notEqual(actual, null, `${label}: evaluateAnswer returned null`);
  assert.ok(
    Math.abs((actual as number) - expected) < ANSWER_TOL,
    `${label}: ${actual} should be close to ${expected}`,
  );
}

// 後方互換：素の数値・小数・分数・桁区切り。
close(evaluateAnswer("5"), 5, "integer");
close(evaluateAnswer("-3"), -3, "negative integer");
close(evaluateAnswer("0.5"), 0.5, "decimal");
close(evaluateAnswer(".5"), 0.5, "leading-dot decimal");
close(evaluateAnswer("1/2"), 0.5, "fraction");
close(evaluateAnswer("1,080"), 1080, "comma thousands");
close(evaluateAnswer("３０／２"), 15, "full-width fraction");

// π・√・括弧・明示演算。
close(evaluateAnswer("π"), Math.PI, "pi symbol");
close(evaluateAnswer("pi/6"), Math.PI / 6, "pi word");
close(evaluateAnswer("√3/2"), Math.sqrt(3) / 2, "sqrt shorthand");
close(evaluateAnswer("sqrt(3)/2"), Math.sqrt(3) / 2, "sqrt word");
close(evaluateAnswer("(1+2)*3"), 9, "explicit arithmetic");
close(evaluateAnswer("3 + 4"), 7, "spaced explicit arithmetic");

// 暗黙積は記号 shorthand に限定する。
close(evaluateAnswer("5π"), 5 * Math.PI, "implicit number*pi");
close(evaluateAnswer("2√3"), 2 * Math.sqrt(3), "implicit number*sqrt");
assert.equal(evaluateAnswer("2 3"), null, "space-separated num num is invalid");
assert.equal(evaluateAnswer("2(3)"), null, "implicit num*(numeric group) is invalid");
assert.equal(evaluateAnswer("(2)(3)"), null, "implicit group*group numeric is invalid");
assert.equal(evaluateAnswer("2×3"), null, "multiplication sign num×num is invalid");

// パース不能・境界事例。
assert.equal(evaluateAnswer(""), null, "empty input is invalid");
assert.equal(evaluateAnswer("."), null, "dot-only input is invalid");
assert.equal(evaluateAnswer("√-1"), null, "sqrt negative is invalid");
assert.equal(evaluateAnswer("1/0"), null, "division by zero is invalid");
assert.equal(evaluateAnswer("2++3"), 5, "unary plus after binary plus remains valid");
assert.equal(judgeSingle("√3/2", Math.sqrt(3) / 2), true);
assert.equal(judgeSingle("0.866", Math.sqrt(3) / 2), false);

// 複数解：順不同・多重集合一致・過不足拒否。
assert.equal(judgeSolutionSet("5pi/6, pi/6", [Math.PI / 6, (5 * Math.PI) / 6]), true);
assert.equal(judgeSolutionSet("pi/6", [Math.PI / 6, (5 * Math.PI) / 6]), false);
assert.equal(judgeSolutionSet("pi/6, pi/6", [Math.PI / 6, (5 * Math.PI) / 6]), false);

console.log("answerEval: all regression tests passed");
