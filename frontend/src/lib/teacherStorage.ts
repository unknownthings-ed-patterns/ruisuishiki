/**
 * 教師の作成した系列を localStorage に保存する層。
 *
 * CLAUDE.md「ローカルファースト・運営にデータ渡らない」原則を、
 * 教師の作成物にも適用する。
 *
 * 保存形式は LearnerSeries そのまま——学習者ビューがそのまま使える。
 */

import type { LearnerSeries } from "./types";

const TEACHER_INDEX_KEY = "ruisuishiki:teacher_series_index";
const TEACHER_SERIES_PREFIX = "ruisuishiki:teacher_series:";

function seriesKey(id: string): string {
  return TEACHER_SERIES_PREFIX + id;
}

export type TeacherSeriesSummary = {
  id: string;
  title: string;
  subtitle: string;
  patternId: string;
  stepsCount: number;
  createdAt: string;
};

/** 教師作成系列の一覧（メタ情報のみ）を取得。 */
export function listTeacherSeries(): TeacherSeriesSummary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TEACHER_INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 個別の系列本体を取得。 */
export function getTeacherSeries(id: string): LearnerSeries | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(seriesKey(id));
    if (!raw) return null;
    return JSON.parse(raw) as LearnerSeries;
  } catch {
    return null;
  }
}

/** 系列を保存（新規 or 上書き）。 */
export function saveTeacherSeries(series: LearnerSeries): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(seriesKey(series.id), JSON.stringify(series));
    const summary: TeacherSeriesSummary = {
      id: series.id,
      title: series.title,
      subtitle: series.subtitle,
      patternId: series.patternId,
      stepsCount: series.steps.length,
      createdAt: new Date().toISOString(),
    };
    const index = listTeacherSeries();
    const filtered = index.filter((s) => s.id !== series.id);
    filtered.unshift(summary); // 新しいものを先頭に
    window.localStorage.setItem(TEACHER_INDEX_KEY, JSON.stringify(filtered));
  } catch {
    // localStorage が使えない環境でも壊れない
  }
}

/** 系列を削除。 */
export function deleteTeacherSeries(id: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(seriesKey(id));
    const index = listTeacherSeries();
    const filtered = index.filter((s) => s.id !== id);
    window.localStorage.setItem(TEACHER_INDEX_KEY, JSON.stringify(filtered));
  } catch {
    // 失敗しても続ける
  }
}

/** ランダムな系列ID を生成。 */
export function generateSeriesId(): string {
  return `series_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
