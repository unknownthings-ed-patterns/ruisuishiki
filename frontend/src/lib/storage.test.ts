/**
 * 学習トップ統計の自己実行テスト。
 *
 * 実行：`npm run test:stats`（tsc でコンパイル → node 実行）。
 * 国語ユニットの kokugo_* 履歴はトップ統計から除外する。
 */
import assert from "node:assert/strict";
import {
  calculateLearningStatsFromHistory,
  calculateOperatorView,
  selectRevisitCandidate,
} from "./storage";
import type { StepRecord, VariationOp } from "./types";

const now = Date.UTC(2026, 6, 4, 12, 0, 0);
const dayMs = 24 * 60 * 60 * 1000;

function record(
  stepId: string,
  attempts: number,
  correct: boolean,
  daysAgo: number,
  hintsOpened: 0 | 1 | 2 | 3 = 0,
  skipped = false,
): StepRecord {
  return {
    stepId,
    attempts,
    hintsOpened,
    correct,
    skipped,
    answeredAt: new Date(now - daysAgo * dayMs).toISOString(),
  };
}

const stats = calculateLearningStatsFromHistory(
  [
    {
      seriesId: "linear_equation_basic",
      records: [
        record("math-recent-correct", 2, true, 1),
        record("math-old-correct", 3, true, 8),
        record("math-incorrect", 1, false, 1),
      ],
    },
    {
      seriesId: "stats_median_01",
      records: [record("stats-recent-correct", 1, true, 2)],
    },
    {
      seriesId: "kokugo_haiku_form_01",
      records: [
        record("kokugo-recent-correct", 10, true, 1),
        record("kokugo-old-correct", 5, true, 20),
      ],
    },
    {
      seriesId: "kokugo_haiku_kire_01",
      records: [record("kokugo-incorrect", 4, false, 1)],
    },
  ],
  now,
);

assert.deepEqual(stats, {
  weeklyCorrect: 2,
  lifetimeCorrect: 3,
  lifetimeAttempts: 7,
  lifetimeAccuracy: 3 / 7,
  seriesEngaged: 2,
});

console.log("storage stats: kokugo_* histories are excluded");

const opByStep = new Map<string, VariationOp | null>([
  ["trig_general_angle_01::entry", null],
  ["trig_general_angle_01::same", "same"],
  ["trig_general_angle_01::inverse-old", "inverse"],
  ["trig_general_angle_01::inverse-new", "inverse"],
  ["trig_general_angle_01::plus", "plus_alpha"],
  ["trig_general_angle_01::qualitative", "qualitative"],
  ["trig_general_angle_01::composite", "composite"],
]);
const canonicalSeriesId = (seriesId: string) =>
  seriesId === "algebra2_trig_period_01"
    ? "trig_general_angle_01"
    : seriesId;
const operatorView = calculateOperatorView(
  [
    {
      seriesId: "algebra2_trig_period_01",
      records: [
        record("entry", 1, true, 1, 3),
        record("same", 2, true, 1, 2),
        record("inverse-old", 1, false, 8, 3, true),
        record("removed-step", 1, true, 1, 3),
      ],
    },
    {
      seriesId: "trig_general_angle_01",
      records: [
        record("inverse-new", 3, true, 1, 3),
        record("plus", 1, true, 1, 1),
        record("qualitative", 1, false, 1, 2),
        record("composite", 2, true, 8, 2),
      ],
    },
    {
      seriesId: "kokugo_haiku_form_01",
      records: [record("same", 10, true, 1, 3)],
    },
  ],
  (seriesId, stepId) => opByStep.get(`${seriesId}::${stepId}`),
  now,
  canonicalSeriesId,
);

assert.deepEqual(operatorView, {
  footprints: [
    {
      op: "same",
      addressed: 1,
      deepThought: 1,
      workedExample: 0,
      weeklyDeepThought: 1,
      correctAttempts: { sum: 2, count: 1 },
    },
    {
      op: "inverse",
      addressed: 2,
      deepThought: 2,
      workedExample: 2,
      weeklyDeepThought: 1,
      correctAttempts: { sum: 3, count: 1 },
    },
    {
      op: "plus_alpha",
      addressed: 1,
      deepThought: 0,
      workedExample: 0,
      weeklyDeepThought: 0,
      correctAttempts: { sum: 1, count: 1 },
    },
    {
      op: "qualitative",
      addressed: 0,
      deepThought: 1,
      workedExample: 0,
      weeklyDeepThought: 1,
      correctAttempts: { sum: 0, count: 0 },
    },
    {
      op: "composite",
      addressed: 1,
      deepThought: 1,
      workedExample: 0,
      weeklyDeepThought: 0,
      correctAttempts: { sum: 2, count: 1 },
    },
  ],
  focusOp: "inverse",
  focusSeries: [{ seriesId: "trig_general_angle_01", deepSteps: 2 }],
});

console.log("operator view: boundaries and old series redirects are covered");

const revisit = selectRevisitCandidate(
  [
    {
      seriesId: "recent_complete",
      completed: true,
      records: [record("last", 1, true, 3)],
      completionDates: [],
    },
    {
      seriesId: "old_complete",
      completed: true,
      records: [record("last", 1, true, 10)],
      completionDates: [],
    },
    {
      seriesId: "older_but_revisited",
      completed: true,
      records: [record("last", 1, true, 30)],
      completionDates: [new Date(now - 8 * dayMs).toISOString()],
    },
    {
      seriesId: "unfinished",
      completed: false,
      records: [record("last", 1, true, 20)],
      completionDates: [],
    },
  ],
  now,
);

assert.deepEqual(revisit, {
  seriesId: "old_complete",
  completedAt: new Date(now - 10 * dayMs).toISOString(),
  daysSinceCompletion: 10,
});

assert.equal(
  selectRevisitCandidate(
    [{
      seriesId: "recent_only",
      completed: true,
      records: [record("last", 1, true, 6)],
      completionDates: [],
    }],
    now,
  ),
  null,
);

console.log("revisit: seven-day threshold, migration fallback, and one-item selection are covered");
