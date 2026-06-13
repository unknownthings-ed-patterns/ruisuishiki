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

import type { StepRecord } from "./types";

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
 * 全問正答済みなら totalSteps を返す（completed の意味）。
 */
export function getResumeIndex(
  history: StepRecord[],
  stepIds: string[],
): number {
  const correctIds = new Set(
    history.filter((r) => r.correct).map((r) => r.stepId),
  );
  for (let i = 0; i < stepIds.length; i++) {
    if (!correctIds.has(stepIds[i])) {
      return i;
    }
  }
  return stepIds.length; // 全問正答済み
}
