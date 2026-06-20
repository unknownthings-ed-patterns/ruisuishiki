"use client";

import { useState } from "react";

/**
 * ポリアの「いかにして問題をとくか」を、岩井先生が小学校算数の授業で
 * 15 年以上かけて精選した「問題解決のための質問」を表示する。
 *
 * 3 カテゴリ（問題を理解する / 計画を立てる・実行 / ふりかえる）。
 * 折りたたみ式（B-3）。横サイドパネル（A）。
 *
 * デスクトップ（xl 以上）：右側に固定サイドパネル
 * モバイル：右下のフローティングボタン → ドロワー
 */

type Category = {
  key: string;
  icon: string;
  label: string;
  questions: string[];
};

const POLYA_QUESTIONS: Category[] = [
  {
    key: "understand",
    icon: "📋",
    label: "問題を理解する",
    questions: [
      "もとめることは何かな？",
      "あたえられていることは何かな？",
      "前に似たことはあった？",
      "どこが同じでどこが違う？",
      "図や表、式などに表せないかな？",
    ],
  },
  {
    key: "plan",
    icon: "🧭",
    label: "計画を立てる・実行",
    questions: [
      "どうすればできそうかな？",
      "まず、何をする？",
      "ほかの考え方もあるかな？",
    ],
  },
  {
    key: "reflect",
    icon: "🔄",
    label: "ふりかえる",
    questions: [
      "まとめるとどんなことが言えそう？",
      "たとえば？",
      "どんなときにつかえそう？",
    ],
  },
];

const CREDIT = "ポリア『いかにして問題をとくか』に基づく";

export function PolyaQuestionsPanel() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const renderCategories = (variant: "side" | "drawer") => {
    const labelSize = variant === "side" ? "12px" : "13px";
    const itemSize = variant === "side" ? "12px" : "13px";
    return (
      <>
        {POLYA_QUESTIONS.map((cat) => {
          const isOpen = openKey === cat.key;
          return (
            <div
              key={cat.key}
              className="rounded-lg border border-border overflow-hidden mb-2"
            >
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : cat.key)}
                className="flex w-full items-center justify-between px-3 py-2 text-foreground transition-colors"
                style={{
                  fontSize: labelSize,
                  letterSpacing: "0.08em",
                  background: isOpen ? "var(--surface)" : "transparent",
                }}
                aria-expanded={isOpen}
              >
                <span>
                  <span style={{ marginRight: 6 }}>{cat.icon}</span>
                  {cat.label}
                </span>
                <span
                  className="text-muted"
                  style={{
                    fontSize: "10px",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    display: "inline-block",
                  }}
                  aria-hidden
                >
                  ▸
                </span>
              </button>
              {isOpen && (
                <ul
                  className="flex flex-col gap-2 px-4 py-3 border-t border-border"
                  style={{ background: "var(--surface)" }}
                >
                  {cat.questions.map((q, i) => (
                    <li
                      key={i}
                      className="text-foreground/85"
                      style={{
                        fontSize: itemSize,
                        lineHeight: 1.7,
                      }}
                    >
                      ・{q}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <p
          className="text-muted mt-3"
          style={{ fontSize: "10px", fontStyle: "italic", lineHeight: 1.5 }}
        >
          {CREDIT}
        </p>
      </>
    );
  };

  return (
    <>
      {/* デスクトップ（xl 以上）：右側に固定サイドパネル */}
      <aside
        className="hidden xl:flex flex-col fixed right-6 z-10 w-72 max-h-[78vh] overflow-y-auto rounded-lg border border-border p-4"
        style={{
          top: "84px",
          background:
            "color-mix(in oklch, var(--background) 92%, transparent)",
          backdropFilter: "blur(4px)",
        }}
        aria-label="問題を解くための問い"
      >
        <h3
          className="text-foreground mb-3"
          style={{ fontSize: "11px", letterSpacing: "0.25em" }}
        >
          問いの引き出し
        </h3>
        {renderCategories("side")}
      </aside>

      {/* xl 未満：右下のフローティングボタン */}
      <button
        type="button"
        onClick={() => setMobileDrawerOpen(true)}
        className="xl:hidden fixed right-4 z-20 rounded-full bg-accent text-background shadow-lg w-12 h-12 flex items-center justify-center hover:scale-[1.05] transition-transform"
        style={{ bottom: "110px", fontSize: "18px" }}
        aria-label="問題を解くための問いを開く"
      >
        📋
      </button>

      {/* モバイル：ドロワー */}
      {mobileDrawerOpen && (
        <div
          className="xl:hidden fixed inset-0 z-50 flex items-end animate-fade-in"
          style={{
            background:
              "color-mix(in oklch, var(--background) 60%, transparent)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="問題を解くための問い"
        >
          <div
            className="w-full rounded-t-2xl border-t border-border p-5 max-h-[80vh] overflow-y-auto"
            style={{ background: "var(--background)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3
                className="text-foreground"
                style={{ fontSize: "12px", letterSpacing: "0.25em" }}
              >
                問いの引き出し
              </h3>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="text-muted hover:text-foreground transition-colors"
                style={{ fontSize: "12px", letterSpacing: "0.1em" }}
              >
                閉じる ✕
              </button>
            </div>
            {renderCategories("drawer")}
          </div>
        </div>
      )}
    </>
  );
}
