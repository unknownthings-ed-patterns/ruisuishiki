/**
 * 学習トップ統計の自己実行テスト。
 *
 * 実行：`npm run test:stats`（tsc でコンパイル → node 実行）。
 * 国語ユニットの kokugo_* 履歴はトップ統計から除外する。
 */
import assert from "node:assert/strict";
import { calculateLearningStatsFromHistory } from "./storage";
import type { StepRecord } from "./types";

const now = Date.UTC(2026, 6, 4, 12, 0, 0);
const dayMs = 24 * 60 * 60 * 1000;

function record(
  stepId: string,
  attempts: number,
  correct: boolean,
  daysAgo: number,
): StepRecord {
  return {
    stepId,
    attempts,
    hintsOpened: 0,
    correct,
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
