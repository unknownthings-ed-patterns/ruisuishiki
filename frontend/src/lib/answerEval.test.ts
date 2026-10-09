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
assert.equal(evaluateAnswer("2×3"), 6, "multiplication sign × is accepted (2026-10-07 先生の裁定・1c9d584)");

// パース不能・境界事例。
assert.equal(evaluateAnswer(""), null, "empty input is invalid");
assert.equal(evaluateAnswer("."), null, "dot-only input is invalid");
assert.equal(evaluateAnswer("√-1"), null, "sqrt negative is invalid");
assert.equal(evaluateAnswer("1/0"), null, "division by zero is invalid");
assert.equal(evaluateAnswer("2++3"), 5, "unary plus after binary plus remains valid");
assert.equal(judgeSingle("√3/2", Math.sqrt(3) / 2), true);
assert.equal(judgeSingle("0.866", Math.sqrt(3) / 2), false);

// 自然対数 log（別名 ln）・ネイピア数 e（2026-10-01・数Ⅲ・C 積分法の裁定 Q2）。
close(evaluateAnswer("log3"), Math.log(3), "log shorthand");
close(evaluateAnswer("log 3"), Math.log(3), "log with space");
close(evaluateAnswer("log(3/2)"), Math.log(1.5), "log of group");
close(evaluateAnswer("log3/2"), Math.log(3) / 2, "log binds the next factor like sqrt");
close(evaluateAnswer("2log3"), 2 * Math.log(3), "implicit number*log");
close(evaluateAnswer("-log2"), -Math.log(2), "negative log");
close(evaluateAnswer("ln3"), Math.log(3), "ln alias");
close(evaluateAnswer("LOG3"), Math.log(3), "case-insensitive log");
close(evaluateAnswer("e"), Math.E, "e constant");
close(evaluateAnswer("e-1"), Math.E - 1, "e minus one");
close(evaluateAnswer("1-2/e"), 1 - 2 / Math.E, "one minus two over e");
close(evaluateAnswer("3e"), 3 * Math.E, "implicit number*e");
close(evaluateAnswer("9e-24"), 9 * Math.E - 24, "e linear expression");
close(evaluateAnswer("elog2"), Math.E * Math.log(2), "e then log without space");
close(evaluateAnswer("loge"), 1, "log e");
close(evaluateAnswer("(3log3-2)/2"), (3 * Math.log(3) - 2) / 2, "log inside group");
close(evaluateAnswer("π-2"), Math.PI - 2, "pi minus two still works");
close(evaluateAnswer("pie"), Math.PI * Math.E, "pi then e");
assert.equal(evaluateAnswer("log0"), null, "log of zero is invalid");
assert.equal(evaluateAnswer("log(-1)"), null, "log of negative is invalid");
assert.equal(evaluateAnswer("log"), null, "log without argument is invalid");
assert.equal(evaluateAnswer("exp1"), null, "unknown word exp is invalid");
assert.equal(evaluateAnswer("lg3"), null, "unknown word lg is invalid");
assert.equal(judgeSingle("log 4/3", Math.log(4) / 3), true);
assert.equal(judgeSingle("log(4/3)", Math.log(4 / 3)), true);
assert.equal(judgeSingle("1.0986", Math.log(3)), false);
close(evaluateAnswer("2(e+1)"), 2 * (Math.E + 1), "number times symbolic group");
close(evaluateAnswer("3(e-1)"), 3 * (Math.E - 1), "number times symbolic group 2");
close(evaluateAnswer("2(√3+1)"), 2 * (Math.sqrt(3) + 1), "number times sqrt group");
close(evaluateAnswer("(e+1)(e-1)"), Math.E * Math.E - 1, "symbolic group times symbolic group");
close(evaluateAnswer("1/2(1+log3)"), (1 + Math.log(3)) / 2, "half of a log group");
assert.equal(evaluateAnswer("2(3)"), null, "number times numeric group stays invalid");

// 複数解：順不同・多重集合一致・過不足拒否。
assert.equal(judgeSolutionSet("5pi/6, pi/6", [Math.PI / 6, (5 * Math.PI) / 6]), true);
assert.equal(judgeSolutionSet("pi/6", [Math.PI / 6, (5 * Math.PI) / 6]), false);
assert.equal(judgeSolutionSet("pi/6, pi/6", [Math.PI / 6, (5 * Math.PI) / 6]), false);

// 末尾の単位は外す（2026-10-09 先生の裁定）。先頭・途中の日本語は外さない。
close(evaluateAnswer("13人"), 13, "trailing japanese unit");
close(evaluateAnswer("30 本"), 30, "spaced unit");
close(evaluateAnswer("５ｃｍ".replace("ｃｍ", "cm")), 5, "full-width digit with unit");
close(evaluateAnswer("12cm²"), 12, "squared unit");
close(evaluateAnswer("1.5m^2"), 1.5, "caret squared unit");
close(evaluateAnswer("60km/時"), 60, "compound unit");
close(evaluateAnswer("2√3cm"), 2 * Math.sqrt(3), "symbolic value with unit");
close(evaluateAnswer("1/2cm"), 0.5, "fraction with unit");
assert.equal(evaluateAnswer("約13"), null, "leading japanese stays invalid");
assert.equal(evaluateAnswer("13と5"), null, "japanese between numbers stays invalid");
assert.equal(judgeSolutionSet("2, 3 cm", [2, 3]), true);
assert.equal(judgeSolutionSet("2cm, 3cm", [2, 3]), true);

// カンマは桁区切りだけを外す（2026-10-09）。「3,2」を 32 として通さない。
close(evaluateAnswer("7,560"), 7560, "comma thousands 2");
close(evaluateAnswer("1,000,000"), 1000000, "comma millions");
assert.equal(evaluateAnswer("3,2"), null, "non-thousands comma is invalid");
assert.equal(evaluateAnswer("1,7,2,8"), null, "digit-by-digit commas are invalid");
assert.equal(evaluateAnswer("12,34"), null, "two-digit group is invalid");
assert.equal(judgeSingle("3,2", 32), false);

console.log("answerEval: all regression tests passed");
