/**
 * 学習履歴のブラウザ localStorage 保存。
 *
 * CLAUDE.md「データプライバシー：ローカルファースト」を実装する核。
 * 運営サーバーには履歴が一切送られない。ブラウザを変えるとリセットされる
 * 引き換えに、完全な個人プライバシーが保たれる。
 *
 * 集計軸は文型×オペレータ（第2弾失敗モード F8 の予防）。
 * 単純な正答率ではなく、どの変化オペレータで詰まったかを保持する。
 */

import type { StepRecord, VariationOp } from "./types";

const STORAGE_PREFIX = "ruisuishiki:history:";

function storageKey(seriesId: string): string {
  return STORAGE_PREFIX + seriesId;
}

/** 系列の履歴をすべて読み込む。localStorage が使えない環境では空配列を返す。 */
export function loadSeriesHistory(seriesId: string): StepRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(seriesId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 1問の解答記録を保存（同じステップIDがあれば上書き）。 */
export function saveStepRecord(seriesId: string, record: StepRecord): void {
  if (typeof window === "undefined") return;
  try {
    const history = loadSeriesHistory(seriesId);
    const filtered = history.filter((r) => r.stepId !== record.stepId);
    filtered.push(record);
    window.localStorage.setItem(
      storageKey(seriesId),
      JSON.stringify(filtered),
    );
  } catch {
    // localStorage 不可（プライベートブラウジング等）でも壊れない
  }
}

/** 系列の履歴を完全に消す（「最初から」用）。 */
export function clearSeriesHistory(seriesId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey(seriesId));
  } catch {
    // 失敗しても続ける
  }
}

/**
 * 履歴から「次に解くべきステップのindex」を求める。
 * 正答済み or スキップ済みのステップは「addressed」として進める。
 * 全ステップが addressed なら totalSteps を返す（completed の意味）。
 */
export function getResumeIndex(
  history: StepRecord[],
  stepIds: string[],
): number {
  const addressedIds = new Set(
    history.filter((r) => r.correct || r.skipped).map((r) => r.stepId),
  );
  for (let i = 0; i < stepIds.length; i++) {
    if (!addressedIds.has(stepIds[i])) {
      return i;
    }
  }
  return stepIds.length; // 全問が addressed
}

/* ====================================================================== */
/* 学習統計（全系列横断）                                                  */
/* ====================================================================== */

/** すべての学習履歴を取得（series 別に）。 */
export function loadAllHistory(): { seriesId: string; records: StepRecord[] }[] {
  if (typeof window === "undefined") return [];
  const results: { seriesId: string; records: StepRecord[] }[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
      const seriesId = key.slice(STORAGE_PREFIX.length);
      const records = loadSeriesHistory(seriesId);
      if (records.length > 0) {
        results.push({ seriesId, records });
      }
    }
  } catch {
    // 失敗しても続ける
  }
  return results;
}

export type LearningStats = {
  /** 今週（過去7日）に正答した問題数 */
  weeklyCorrect: number;
  /** 累計の正答した問題数 */
  lifetimeCorrect: number;
  /** 累計の試行回数 */
  lifetimeAttempts: number;
  /** 累計の正答率（試行ベース、0..1）。試行ゼロなら null */
  lifetimeAccuracy: number | null;
  /** 取り組んだ系列の数（少なくとも1問は解いた） */
  seriesEngaged: number;
};

export type SeriesHistory = { seriesId: string; records: StepRecord[] };

const OPERATOR_ORDER: VariationOp[] = [
  "same",
  "inverse",
  "plus_alpha",
  "qualitative",
  "composite",
];

export type OperatorFootprint = {
  op: VariationOp;
  addressed: number;
  deepThought: number;
  workedExample: number;
  weeklyDeepThought: number;
  correctAttempts: { sum: number; count: number };
};

export type OperatorViewData = {
  footprints: OperatorFootprint[];
  focusOp: VariationOp | null;
  focusSeries: { seriesId: string; deepSteps: number }[];
};

type FocusSeriesAccumulator = {
  deepSteps: number;
  latestAnsweredAt: number;
};

function isLearningTopStatsSeries(seriesId: string): boolean {
  return !seriesId.startsWith("kokugo_");
}

export function calculateLearningStatsFromHistory(
  all: SeriesHistory[],
  now: number = Date.now(),
): LearningStats {
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  let weeklyCorrect = 0;
  let lifetimeCorrect = 0;
  let lifetimeAttempts = 0;
  let seriesEngaged = 0;
  for (const { seriesId, records } of all) {
    if (!isLearningTopStatsSeries(seriesId)) continue;
    let engaged = false;
    for (const r of records) {
      lifetimeAttempts += r.attempts;
      if (r.correct) {
        lifetimeCorrect++;
        engaged = true;
        const ts = new Date(r.answeredAt).getTime();
        if (!Number.isNaN(ts) && ts >= oneWeekAgo) weeklyCorrect++;
      }
    }
    if (engaged) seriesEngaged++;
  }
  return {
    weeklyCorrect,
    lifetimeCorrect,
    lifetimeAttempts,
    lifetimeAccuracy:
      lifetimeAttempts > 0 ? lifetimeCorrect / lifetimeAttempts : null,
    seriesEngaged,
  };
}

export function calculateLearningStats(): LearningStats {
  return calculateLearningStatsFromHistory(loadAllHistory());
}

export function calculateOperatorView(
  all: SeriesHistory[],
  opOf: (
    seriesId: string,
    stepId: string,
  ) => VariationOp | null | undefined,
  now: number = Date.now(),
  canonicalSeriesId: (seriesId: string) => string = (seriesId) => seriesId,
): OperatorViewData {
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const footprints = new Map<VariationOp, OperatorFootprint>(
    OPERATOR_ORDER.map((op) => [
      op,
      {
        op,
        addressed: 0,
        deepThought: 0,
        workedExample: 0,
        weeklyDeepThought: 0,
        correctAttempts: { sum: 0, count: 0 },
      },
    ]),
  );
  const seriesByOp = new Map<
    VariationOp,
    Map<string, FocusSeriesAccumulator>
  >();

  for (const { seriesId, records } of all) {
    const canonicalId = canonicalSeriesId(seriesId);
    if (!isLearningTopStatsSeries(canonicalId)) continue;
    for (const record of records) {
      const op = opOf(canonicalId, record.stepId);
      if (op === null || op === undefined) continue;
      const footprint = footprints.get(op);
      if (!footprint) continue;

      if (record.correct || record.skipped) footprint.addressed++;
      if (record.correct) {
        footprint.correctAttempts.sum += record.attempts;
        footprint.correctAttempts.count++;
      }
      if (record.hintsOpened >= 2) {
        footprint.deepThought++;
        const answeredAt = new Date(record.answeredAt).getTime();
        if (!Number.isNaN(answeredAt) && answeredAt >= oneWeekAgo) {
          footprint.weeklyDeepThought++;
        }
        let bySeries = seriesByOp.get(op);
        if (!bySeries) {
          bySeries = new Map();
          seriesByOp.set(op, bySeries);
        }
        const current = bySeries.get(canonicalId) ?? {
          deepSteps: 0,
          latestAnsweredAt: 0,
        };
        current.deepSteps++;
        if (!Number.isNaN(answeredAt)) {
          current.latestAnsweredAt = Math.max(
            current.latestAnsweredAt,
            answeredAt,
          );
        }
        bySeries.set(canonicalId, current);
      }
      if (record.hintsOpened === 3) footprint.workedExample++;
    }
  }

  const orderedFootprints = OPERATOR_ORDER.map((op) => footprints.get(op)!);
  const focus = orderedFootprints.reduce<OperatorFootprint | null>(
    (best, candidate) => {
      if (!best) return candidate;
      if (candidate.weeklyDeepThought !== best.weeklyDeepThought) {
        return candidate.weeklyDeepThought > best.weeklyDeepThought
          ? candidate
          : best;
      }
      return candidate.deepThought > best.deepThought ? candidate : best;
    },
    null,
  );
  const focusOp = focus && focus.deepThought > 0 ? focus.op : null;
  const focusSeries = focusOp
    ? [...(seriesByOp.get(focusOp)?.entries() ?? [])]
        .sort((a, b) => {
          const recent = b[1].latestAnsweredAt - a[1].latestAnsweredAt;
          return recent !== 0 ? recent : b[1].deepSteps - a[1].deepSteps;
        })
        .slice(0, 3)
        .map(([seriesId, value]) => ({
          seriesId,
          deepSteps: value.deepSteps,
        }))
    : [];

  return { footprints: orderedFootprints, focusOp, focusSeries };
}
