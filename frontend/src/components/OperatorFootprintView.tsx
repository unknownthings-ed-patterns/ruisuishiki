import Link from "next/link";
import { MathText } from "@/components/Math";
import { findStaticSeries, seriesHref } from "@/lib/seriesCatalog";
import type {
  LearningStats,
  OperatorViewData,
} from "@/lib/storage";
import type { VariationOp } from "@/lib/types";

export const OPERATOR_LABELS: Record<VariationOp, string> = {
  same: "同",
  inverse: "逆",
  plus_alpha: "＋α",
  qualitative: "質的変化",
  composite: "複合",
};

export function OperatorFootprintView({
  data,
  stats,
}: {
  data: OperatorViewData;
  stats?: LearningStats;
}) {
  const focusLabel = data.focusOp ? OPERATOR_LABELS[data.focusOp] : null;
  const focusSeries = data.focusSeries[0];
  const focusSeriesData = focusSeries
    ? findStaticSeries(focusSeries.seriesId)
    : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <p className="text-foreground" style={{ fontSize: "15px", lineHeight: 1.9 }}>
          {focusLabel
            ? `いまいちばんじっくり考えているのは【${focusLabel}】。`
            : "この一週間、ヒントなしで歩けています。"}
        </p>
        {data.focusOp && focusSeriesData && (
          <p className="text-muted" style={{ fontSize: "13px", lineHeight: 1.8 }}>
            <Link
              href={seriesHref(focusSeriesData.id)}
              className="text-accent hover:underline"
            >
              <MathText text={focusSeriesData.title} />
            </Link>
            {` の${OPERATOR_LABELS[data.focusOp]} step を歩き直すと効きます。`}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2" aria-label="オペレータの地図">
        {data.footprints.map((footprint) => {
          const denominator = Math.max(
            footprint.addressed,
            footprint.deepThought,
            1,
          );
          const width = Math.round(
            Math.min(1, footprint.deepThought / denominator) * 100,
          );
          return (
            <div
              key={footprint.op}
              className="grid items-center gap-x-3"
              style={{ gridTemplateColumns: "5.5rem minmax(0, 1fr) 4rem" }}
            >
              <span
                className="text-foreground"
                style={{ fontSize: "13px", letterSpacing: "0.08em" }}
              >
                {OPERATOR_LABELS[footprint.op]}
              </span>
              <span className="text-muted tnum" style={{ fontSize: "12px" }}>
                歩いた {footprint.addressed} ・ じっくり {footprint.deepThought}
              </span>
              <span
                className="h-1.5 overflow-hidden rounded-full"
                style={{ background: "var(--border)" }}
                aria-label={`${OPERATOR_LABELS[footprint.op]}のじっくり考えた割合 ${width}%`}
              >
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${width}%`, background: "var(--accent)" }}
                />
              </span>
            </div>
          );
        })}
      </div>

      {stats && (
        <div className="border-t border-border pt-4 flex flex-col gap-3">
          <p className="text-muted tnum" style={{ fontSize: "12px", lineHeight: 1.8 }}>
            今週 {stats.weeklyCorrect.toLocaleString()}問 ・ 累計{" "}
            {stats.lifetimeCorrect.toLocaleString()}問 ・ 歩いた系列{" "}
            {stats.seriesEngaged.toLocaleString()}本
          </p>
          {stats.lifetimeAccuracy !== null && (
            <details className="text-muted">
              <summary
                className="cursor-pointer select-none"
                style={{ fontSize: "12px", letterSpacing: "0.08em" }}
              >
                くわしく
              </summary>
              <p className="mt-2 tnum" style={{ fontSize: "12px" }}>
                正答率（試行ベース）{" "}
                {Math.round(stats.lifetimeAccuracy * 100)}%
              </p>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
