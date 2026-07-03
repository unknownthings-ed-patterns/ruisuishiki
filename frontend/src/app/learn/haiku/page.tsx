"use client";

/**
 * 国語ユニット（俳句）の学習者ビュー。
 *
 * 数学の play/page.tsx（LearnerSeries 専用・1123行）とは別型 KokugoSeries を
 * 扱うため、既存ページを壊さないよう独立ルートにした（正典§7.1「分岐追加」の
 * 加法的解釈）。共有プリミティブ（MathText・countMora・storage）は再利用する。
 *
 * 中核ふるまい（正典§6.3・§7・§8）：
 *  - 音数は判定でなく可視化（meterPolicy: "visualize"。字余り・字足らずも俳句・G2）。
 *  - creation（本歌取・自作）に「答えを見る」ボタンを置かない（代筆禁止・G10）。
 *  - 観点セルフチェックは読み比べ後の creation step にのみ出す（発見が先・G1）。
 *  - 模範句の viewpointTags は子ども UI に出さない（G1）。
 *  - ヒントは3層を順に開く（比較の指さし）。
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MathText } from "@/components/Math";
import { countMora } from "@/lib/moraCount";
import { getMentorText } from "@/lib/mentorTexts";
import { KOKUGO_HAIKU_FORM_SERIES } from "@/lib/seriesKokugoHaiku";
import { getViewpointList } from "@/lib/viewpointLists";
import {
  clearSeriesHistory,
  getResumeIndex,
  loadSeriesHistory,
  saveStepRecord,
} from "@/lib/storage";

const SERIES = KOKUGO_HAIKU_FORM_SERIES;

/** 音数メーター：かな文字列の拍を可視化する（正誤ではない）。 */
function MoraMeter({
  reading,
  target,
  segments,
}: {
  reading: string;
  target?: number;
  segments?: number[]; // [5,7,5] のとき区切り表示（canon §6.2）
}) {
  const n = countMora(reading);

  // 五・七・五の区切り表示（●=入力ずみ ○=あきわく ｜=くぎり）。色でなく形で示す。
  if (segments && segments.length > 0) {
    const total = segments.reduce((a, b) => a + b, 0);
    let rem = n;
    const parts = segments.map((seg) => {
      const filled = Math.min(rem, seg);
      rem -= filled;
      return { seg, filled };
    });
    const extra = rem; // 字余り分
    const note =
      n === total
        ? `${total}音ぴったり`
        : n > total
        ? `字余り ＋${n - total}（字余りも俳句だよ）`
        : `字足らず －${total - n}`;
    return (
      <span
        className="inline-flex flex-wrap items-center gap-1 tnum"
        style={{ fontSize: "13px", letterSpacing: "0.08em" }}
        aria-label={`${n}音・${note}`}
      >
        {parts.map((p, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-accent" aria-hidden>
              {"●".repeat(p.filled)}
            </span>
            <span className="text-muted" aria-hidden>
              {"○".repeat(p.seg - p.filled)}
            </span>
            {i < parts.length - 1 && (
              <span className="text-muted mx-1" aria-hidden>
                ｜
              </span>
            )}
          </span>
        ))}
        {extra > 0 && (
          <span className="text-foreground" aria-hidden>
            {" ＋"}
            {"●".repeat(extra)}
          </span>
        )}
        <span className="text-muted ml-2">
          {n}音・{note}
        </span>
      </span>
    );
  }

  // 合計だけの表示（fillIn スロットなど）
  let note = "";
  let tone = "var(--muted)";
  if (target != null) {
    if (n === target) {
      note = `${target}音ぴったり`;
      tone = "var(--accent)";
    } else if (n > target) {
      note = `${target}音より ${n - target} 多い（字余りも俳句だよ）`;
      tone = "var(--foreground)";
    } else {
      note = `${target}音より ${target - n} 少ない`;
      tone = "var(--foreground)";
    }
  }
  return (
    <span
      className="inline-flex items-center gap-2 tnum"
      style={{ fontSize: "12px", letterSpacing: "0.08em", color: tone }}
    >
      <span aria-hidden>{"●".repeat(Math.min(n, 20))}</span>
      <span>
        {n}音{note ? `・${note}` : ""}
      </span>
    </span>
  );
}

/** 模範句カード（縦書き）。viewpointTags は出さない（G1）。 */
function MentorCard({ id }: { id: string }) {
  const m = getMentorText(id);
  if (!m) return null;
  return (
    <article
      className="rounded-lg border border-border px-4 py-5 flex flex-col items-center gap-3"
      style={{ background: "var(--surface)" }}
    >
      <p
        className="font-serif text-foreground"
        style={{
          writingMode: "vertical-rl",
          // 俳句は縦書き1行（1列）。折り返して複数列にしない。
          whiteSpace: "nowrap",
          fontSize: "clamp(15px, 2.4vh, 20px)",
          letterSpacing: "0.12em",
          maxHeight: "60vh",
        }}
      >
        {m.text}
      </p>
      {m.reading && (
        <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.05em" }}>
          {m.reading}（{countMora(m.reading)}音）
        </span>
      )}
      <span className="text-muted" style={{ fontSize: "12px" }}>
        — {m.author}
      </span>
    </article>
  );
}

export default function HaikuPlay() {
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [hintsOpened, setHintsOpened] = useState(0);

  // 入力状態（step 種別ごと）
  const [choice, setChoice] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [work, setWork] = useState("");
  const [reading, setReading] = useState("");
  const [checked, setChecked] = useState<boolean[]>([]);
  // 読み比べ（comparison）step の「気づき」メモ。localStorage に軽量保存する
  // （正式な履歴の国語軸・句会記録との統合は段階3の後続）。
  const [note, setNote] = useState("");
  // 観点抽出 step で選んだ観点（ViewpointList の各項目の選択状態）。
  const [vpChecked, setVpChecked] = useState<boolean[]>([]);
  const viewpointList = getViewpointList(SERIES.genreId);
  // 清書カード（§7.2）：自作句を大きく縦書き表示・匿名切替。句会で見せ合う。
  const [showCard, setShowCard] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [showName, setShowName] = useState(false); // 既定は匿名（選のあと作者を明かす運用）

  const step = SERIES.steps[stepIndex];
  const total = SERIES.steps.length;
  const isLast = stepIndex === total - 1;
  const input = step.input;

  // 復元（初回のみ）：?fresh=1 でクリア、なければ resume 位置へ
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("fresh") === "1") {
      clearSeriesHistory(SERIES.id);
      window.history.replaceState(null, "", window.location.pathname);
      setStepIndex(0);
    } else {
      const history = loadSeriesHistory(SERIES.id);
      const resume = getResumeIndex(
        history,
        SERIES.steps.map((s) => s.id),
      );
      if (resume >= SERIES.steps.length) setCompleted(true);
      else if (resume > 0) setStepIndex(resume);
    }
    setAuthorName(window.localStorage.getItem("kokugo_author") ?? "");
    setHydrated(true);
  }, []);

  // step が変わるたびに入力状態をリセット
  useEffect(() => {
    setHintsOpened(0);
    setChoice(null);
    setOrder([]);
    const savedHaiku = step.input?.type === "haikuText" ? loadHaiku(step.id) : null;
    setWork(savedHaiku?.work ?? "");
    setReading(savedHaiku?.reading ?? "");
    if (input?.type === "fillIn") {
      setSlots(new Array(input.slotConstraints.length).fill(""));
    } else {
      setSlots([]);
    }
    setChecked(
      step.creationCheck
        ? new Array(step.creationCheck.selfChecklist.length).fill(false)
        : [],
    );
    setNote(
      typeof window !== "undefined"
        ? window.localStorage.getItem(noteKey(step.id)) ?? ""
        : "",
    );
    if (step.pickViewpoints && viewpointList) {
      const saved =
        typeof window !== "undefined"
          ? window.localStorage.getItem(vpKey(step.id))
          : null;
      const chosen: string[] = saved ? JSON.parse(saved) : [];
      setVpChecked(viewpointList.items.map((it) => chosen.includes(it.text)));
    } else {
      setVpChecked([]);
    }
    setShowCard(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  // exercise は正解で解錠。comparison / creation は常に進める（判定しない）。
  const choiceCorrect =
    input?.type === "choice" && choice === input.answerIndex;
  const reorderCorrect =
    input?.type === "reorder" &&
    order.length === input.segments.length &&
    order.every((v, i) => v === input.answerOrder[i]);
  const canAdvance =
    step.kind !== "exercise" || choiceCorrect || reorderCorrect;

  function persist() {
    saveStepRecord(SERIES.id, {
      stepId: step.id,
      attempts: 1,
      hintsOpened: Math.min(hintsOpened, 3) as 0 | 1 | 2 | 3,
      correct: true, // 国語は「取り組んだ＝addressed」を進度に使う（正答率にしない・G8）
      answeredAt: new Date().toISOString(),
    });
  }

  function handleNext() {
    persist();
    if (isLast) {
      setCompleted(true); // 完了画面へ（stepIndex は範囲内に保つ）
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  const comparedStep = useMemo(
    () =>
      step.compareWithStepId
        ? SERIES.steps.find((s) => s.id === step.compareWithStepId) ?? null
        : null,
    [step.compareWithStepId],
  );

  if (!hydrated) {
    return <main className="min-h-screen" aria-hidden />;
  }

  // 完了画面
  if (completed) {
    return (
      <main className="flex min-h-screen flex-col items-center px-6 py-16">
        <div className="w-full max-w-2xl flex flex-col items-center gap-10">
          <h1
            className="font-serif text-foreground text-center"
            style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.08em" }}
          >
            おわり
          </h1>
          <p className="text-muted text-center" style={{ fontSize: "16px", lineHeight: 2 }}>
            {total} の問いを歩きました。
            <br />
            できた句を、だれかと読み合ってみよう（句会）。
          </p>

          {/* あしあと（履歴の国語軸・G8）。正答率は出さない。
              オペレータ×ヒント到達層×見つけた観点で「歩き」をふり返る。 */}
          {(() => {
            const fp = collectFootprints();
            return (
              <section
                className="w-full rounded-lg border border-border p-6 flex flex-col gap-4"
                style={{ background: "var(--surface)" }}
                aria-label="あしあと"
              >
                <h2 className="text-foreground" style={{ fontSize: "13px", letterSpacing: "0.3em" }}>
                  あしあと
                </h2>
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  歩いた step：{fp.walked} / {total}
                </p>
                <div className="flex flex-col gap-1">
                  <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.15em" }}>
                    じっくり考えたところ（ヒントをよく開いた）
                  </span>
                  {fp.hard.length === 0 ? (
                    <span className="text-foreground" style={{ fontSize: "14px" }}>
                      すっと歩けたね
                    </span>
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {fp.hard.map((h, i) => (
                        <li key={i} className="text-foreground" style={{ fontSize: "14px" }}>
                          ・{h.op}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.15em" }}>
                    見つけた「いいところ」
                  </span>
                  {fp.chosen.length === 0 ? (
                    <span className="text-muted" style={{ fontSize: "13px" }}>
                      （まだ選んでいないよ）
                    </span>
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {fp.chosen.map((c, i) => (
                        <li key={i} className="text-foreground" style={{ fontSize: "14px" }}>
                          ・{c}
                        </li>
                      ))}
                    </ul>
                  )}
                  {fp.noteCount > 0 && (
                    <span className="text-muted" style={{ fontSize: "13px" }}>
                      気づきを書いた：{fp.noteCount} か所
                    </span>
                  )}
                </div>
              </section>
            );
          })()}

          <div className="flex flex-col sm:flex-row gap-4">
            {/* アプリ内でリセット（画面遷移しないので basePath 非依存で確実）。 */}
            <button
              type="button"
              onClick={() => {
                clearSeriesHistory(SERIES.id);
                setStepIndex(0);
                setCompleted(false);
              }}
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg bg-accent text-background"
              style={{ letterSpacing: "0.2em" }}
            >
              もう一度
            </button>
            <Link
              href="/learn/"
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg border border-accent text-accent"
              style={{ letterSpacing: "0.2em" }}
            >
              系列カタログ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* 上部ナビ */}
      <nav
        className="sticky top-0 z-10 border-b border-border backdrop-blur-sm"
        style={{ background: "color-mix(in oklch, var(--background) 92%, transparent)" }}
        aria-label="サイト全体のナビゲーション"
      >
        <div className="mx-auto w-full max-w-2xl px-6 py-2 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3" style={{ fontSize: "12px", letterSpacing: "0.05em" }}>
            <Link href="/learn/" className="text-muted hover:text-foreground transition-colors">
              ← 学ぶ
            </Link>
            <span className="text-muted opacity-30" aria-hidden>/</span>
            <Link href="/" className="text-muted hover:text-foreground transition-colors">
              ホーム
            </Link>
          </div>
          <span className="text-muted truncate" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            {SERIES.title}
          </span>
        </div>
      </nav>

      <div className="flex-1 mx-auto w-full max-w-2xl px-6 py-8 flex flex-col gap-6">
        {/* 中心の問い */}
        {SERIES.drivingQuestion && (
          <section
            className="rounded-lg border border-accent/30 px-5 py-3"
            style={{ background: "color-mix(in oklch, var(--surface) 85%, var(--accent) 15%)" }}
            aria-label="中心の問い"
          >
            <span className="block text-muted mb-1" style={{ fontSize: "10px", letterSpacing: "0.25em" }}>
              中心の問い
            </span>
            <p className="text-foreground" style={{ fontSize: "13px", lineHeight: 1.7, letterSpacing: "0.02em" }}>
              <MathText text={SERIES.drivingQuestion} />
            </p>
          </section>
        )}

        {/* 進度（文型タグは出さない・G1/F1） */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {SERIES.steps.map((_, i) => (
              <span
                key={i}
                className="block rounded-full transition-colors duration-300"
                style={{
                  width: 8,
                  height: 8,
                  background: i <= stepIndex ? "var(--accent)" : "var(--border)",
                  opacity: i < stepIndex ? 0.5 : 1,
                }}
                aria-hidden
              />
            ))}
          </div>
          <span className="text-muted tnum" style={{ fontSize: "13px", letterSpacing: "0.1em" }}>
            Step {stepIndex + 1} / 全 {total} 問
          </span>
        </header>

        {/* 問題文 */}
        <section className="p-6 sm:p-8 rounded-lg border border-border" style={{ background: "var(--surface)" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "clamp(16px, 1.2rem, 19px)", lineHeight: 1.9, letterSpacing: "0.04em" }}
          >
            <MathText text={step.questionText} />
          </p>
        </section>

        {/* 模範句（読み比べの素材）。読み比べ(comparison)ではここが主役。
            作る(creation)では上部に出さず、ヒント横に「くらべる句」として添える。 */}
        {step.kind === "comparison" && step.mentorTextRefs && step.mentorTextRefs.length > 0 && (
          <section
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.min(step.mentorTextRefs.length, 2)}, minmax(0, 1fr))` }}
            aria-label="読みくらべる句"
          >
            {step.mentorTextRefs.map((id) => (
              <MentorCard key={id} id={id} />
            ))}
          </section>
        )}

        {/* 気づきメモ（読み比べ step）。canon §7.1「気づきを選ぶ/書く」。
            観点リスト（選べるリスト）は初期版の項目選定が先生マターのため段階3で追加。 */}
        {step.pickViewpoints && viewpointList && (
          <section
            className="rounded-lg border border-border px-5 py-4 flex flex-col gap-2"
            style={{ background: "var(--surface)" }}
            aria-label="いいなと思うところをえらぶ"
          >
            <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              いいなと思うところ（えらんでいいよ）
            </span>
            {viewpointList.items.map((it, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer" style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  checked={vpChecked[i] ?? false}
                  onChange={() =>
                    setVpChecked((c) => {
                      const next = [...c];
                      next[i] = !next[i];
                      window.localStorage.setItem(
                        vpKey(step.id),
                        JSON.stringify(
                          viewpointList.items
                            .filter((_, j) => next[j])
                            .map((v) => v.text),
                        ),
                      );
                      return next;
                    })
                  }
                  className="mt-1"
                />
                <span className="text-foreground">{it.text}</span>
              </label>
            ))}
          </section>
        )}

        {step.kind === "comparison" && (
          <section className="flex flex-col gap-2" aria-label="きづいたこと">
            <label className="flex flex-col gap-1">
              <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
                きづいたこと（同じところ・ちがうところ・いいなと思ったところ）
              </span>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  window.localStorage.setItem(noteKey(step.id), e.target.value);
                }}
                rows={3}
                placeholder="自分のことばで書いてみよう"
                className="rounded-md border px-3 py-2"
                style={{
                  borderColor: "var(--accent-soft)",
                  background: "var(--background)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  resize: "vertical",
                }}
              />
            </label>
          </section>
        )}

        {/* ── 入力 UI（種別ごと）── */}
        {input?.type === "choice" && (
          <section className="flex flex-col gap-2" aria-label="えらぶ">
            {input.options.map((opt, i) => {
              const picked = choice === i;
              const showRight = picked && choiceCorrect;
              const showWrong = picked && !choiceCorrect;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setChoice(i)}
                  className="px-5 py-3 rounded-lg border text-left transition-colors"
                  style={{
                    borderColor: showRight
                      ? "var(--accent)"
                      : showWrong
                      ? "var(--border)"
                      : "var(--border)",
                    background: showRight
                      ? "color-mix(in oklch, var(--surface) 70%, var(--accent-warm) 30%)"
                      : "var(--surface)",
                    fontSize: "16px",
                  }}
                >
                  {opt}
                  {showRight && <span className="text-accent ml-2">✓ そのとおり</span>}
                  {showWrong && <span className="text-muted ml-2">もう一度・ヒントを見てね</span>}
                </button>
              );
            })}
          </section>
        )}

        {input?.type === "reorder" && (
          <section className="flex flex-col gap-4" aria-label="ならべかえ">
            <div className="flex flex-wrap gap-2">
              {input.segments.map((seg, i) => {
                const used = order.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={used}
                    onClick={() => setOrder((o) => [...o, i])}
                    className="px-4 py-2 rounded-lg border font-serif transition-opacity"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                      opacity: used ? 0.3 : 1,
                      fontSize: "17px",
                    }}
                  >
                    {seg}（{countMora(seg)}音）
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 flex-wrap min-h-[2.5rem]">
              {order.map((idx, pos) => (
                <span key={pos} className="font-serif text-foreground" style={{ fontSize: "18px" }}>
                  {input.segments[idx]}
                  {pos < order.length - 1 && <span className="text-muted mx-1">／</span>}
                </span>
              ))}
              {order.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOrder([])}
                  className="text-muted ml-2"
                  style={{ fontSize: "12px" }}
                >
                  やりなおす
                </button>
              )}
            </div>
            {order.length === input.segments.length && (
              <p style={{ fontSize: "14px" }} className={reorderCorrect ? "text-accent" : "text-muted"}>
                {reorderCorrect ? "✓ 五・七・五になったね" : "五・七・五の順になっているかな？ 音を数えてみよう"}
              </p>
            )}
          </section>
        )}

        {input?.type === "fillIn" && (
          <section className="flex flex-col gap-3" aria-label="あなをうめる">
            {/* かたちのプレビュー（あなは「◯音」の箱で示す） */}
            <p
              className="font-serif text-foreground flex flex-wrap items-center gap-1"
              style={{ fontSize: "18px", letterSpacing: "0.06em" }}
            >
              {renderTemplate(input.template).map((part, i) =>
                part.slot == null ? (
                  <span key={i}>{part.text}</span>
                ) : (
                  <span
                    key={i}
                    className="inline-block rounded border border-accent-soft px-2 text-muted"
                    style={{ fontSize: "13px" }}
                  >
                    {input.slotConstraints[part.slot]?.moraCount ?? ""}音
                  </span>
                ),
              )}
            </p>
            {/* あなごとに、ラベル付きの入力欄を縦に積む（スマホでも見やすい） */}
            {input.slotConstraints.map((c, si) => (
              <label key={si} className="flex flex-col gap-1">
                <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
                  {input.slotConstraints.length > 1
                    ? si === 0
                      ? "上のことば"
                      : "下のことば"
                    : "あなのことば"}
                  （{c.moraCount}音・よみがな）
                </span>
                <input
                  value={slots[si] ?? ""}
                  onChange={(e) =>
                    setSlots((s) => {
                      const next = [...s];
                      next[si] = e.target.value;
                      return next;
                    })
                  }
                  placeholder="ぜんぶひらがなで"
                  className="rounded-md border px-3 py-2"
                  style={{ borderColor: "var(--accent-soft)", background: "var(--background)", fontSize: "16px" }}
                  aria-label={`${si + 1}つめのあな（よみがな）`}
                />
                <MoraMeter reading={slots[si] ?? ""} target={c.moraCount} />
              </label>
            ))}
            <p className="text-muted" style={{ fontSize: "12px" }}>
              ※音の数はメーターで見えるだけ。正解を出す機械ではないよ（字余りも俳句）。
            </p>
          </section>
        )}

        {input?.type === "haikuText" && (
          <section className="flex flex-col gap-3" aria-label="いっくつくる">
            <label className="flex flex-col gap-1">
              <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
                作品（漢字かなまじりでOK）
              </span>
              <input
                value={work}
                onChange={(e) => {
                  setWork(e.target.value);
                  saveHaiku(step.id, e.target.value, reading);
                }}
                className="rounded-md border px-3 py-2"
                style={{ borderColor: "var(--accent-soft)", background: "var(--background)", fontSize: "17px" }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
                よみがな（ひらがな。音を数えるのに使うよ）
              </span>
              <input
                value={reading}
                onChange={(e) => {
                  setReading(e.target.value);
                  saveHaiku(step.id, work, e.target.value);
                }}
                placeholder="ぜんぶひらがなで"
                className="rounded-md border px-3 py-2"
                style={{ borderColor: "var(--accent-soft)", background: "var(--background)", fontSize: "17px" }}
              />
            </label>
            <MoraMeter reading={reading} segments={step.creationCheck?.meterTarget} />
            <p className="text-muted" style={{ fontSize: "12px" }}>
              ※五・七・五にしても、外してもいい。メーターはあなたの音を見せる鏡だよ。
            </p>
            <button
              type="button"
              onClick={() => setShowCard(true)}
              disabled={!work.trim()}
              className="self-start px-6 py-2 rounded-lg border border-accent text-accent disabled:opacity-30"
              style={{ fontSize: "14px", letterSpacing: "0.1em" }}
            >
              清書カードにする →
            </button>
          </section>
        )}

        {/* 観点セルフチェック（creation step のみ・読み比べの後） */}
        {step.creationCheck && step.creationCheck.selfChecklist.length > 0 && (
          <section
            className="rounded-lg border border-border px-5 py-4 flex flex-col gap-2"
            style={{ background: "var(--surface)" }}
            aria-label="じぶんでたしかめる"
          >
            <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              じぶんでたしかめる
            </span>
            {step.creationCheck.selfChecklist.map((item, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer" style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={checked[i] ?? false}
                  onChange={() =>
                    setChecked((c) => {
                      const next = [...c];
                      next[i] = !next[i];
                      return next;
                    })
                  }
                  className="mt-1"
                />
                <span className="text-foreground">{item}</span>
              </label>
            ))}
          </section>
        )}

        {/* ヒント（3層を順に開く・比較の指さし） */}
        <section className="flex flex-col gap-3" aria-label="ヒント">
          {/* 作る step では、ヒントを開いたら「くらべる句」を横に添える（比較の指さし）。
              本歌があればその句、無ければ「さっきつくった句」（前 step の自作）。 */}
          {step.kind === "creation" &&
            hintsOpened >= 1 &&
            (() => {
              const refs = step.mentorTextRefs ?? [];
              const prior =
                refs.length === 0 && step.compareWithStepId
                  ? loadHaiku(step.compareWithStepId)
                  : null;
              if (refs.length === 0 && !prior?.work) return null;
              return (
                <article
                  className="rounded-lg border border-border p-4 flex flex-col gap-2 animate-fade-in"
                  style={{ background: "var(--surface)" }}
                  aria-label="くらべる句"
                >
                  <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
                    {refs.length ? "元の句" : "さっきの句"}
                  </span>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {refs.length ? (
                      refs.map((id) => <MentorCard key={id} id={id} />)
                    ) : (
                      <p
                        className="font-serif text-foreground"
                        style={{
                          writingMode: "vertical-rl",
                          whiteSpace: "nowrap",
                          fontSize: "clamp(15px, 2.4vh, 20px)",
                          letterSpacing: "0.12em",
                          maxHeight: "40vh",
                        }}
                      >
                        {prior?.work}
                      </p>
                    )}
                  </div>
                </article>
              );
            })()}
          {step.hints.slice(0, hintsOpened).map((hint) => (
            <div
              key={hint.layer}
              className="px-5 py-4 rounded-lg border border-accent-soft"
              style={{ background: "color-mix(in oklch, var(--surface) 80%, var(--accent-soft) 20%)" }}
            >
              <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
                ヒント {hint.layer}
              </span>
              <p className="mt-1.5 text-foreground" style={{ fontSize: "15px", lineHeight: 1.8 }}>
                <MathText text={hint.text} />
              </p>
            </div>
          ))}
          {hintsOpened < 3 && (
            <button
              type="button"
              onClick={() => setHintsOpened((n) => Math.min(n + 1, 3))}
              className="self-start text-accent"
              style={{ fontSize: "13px", letterSpacing: "0.1em" }}
            >
              ヒント{hintsOpened === 0 ? "を見る" : "をもう一つ"} →
            </button>
          )}
        </section>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            disabled={stepIndex === 0}
            className="text-muted disabled:opacity-30"
            style={{ fontSize: "14px", letterSpacing: "0.1em" }}
          >
            ← 前へ
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className="px-8 py-3 rounded-lg bg-accent text-background disabled:opacity-30"
            style={{ letterSpacing: "0.15em" }}
          >
            {isLast ? "おわる" : canAdvance ? "次へ →" : "えらんでね"}
          </button>
        </div>
      </div>

      {/* 清書カード（§7.2）：全画面・縦書き・匿名切替。句会で見せ合う。 */}
      {showCard && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6"
          style={{ background: "var(--background)" }}
          role="dialog"
          aria-label="清書カード"
        >
          <p
            className="font-serif text-foreground text-center"
            style={{
              writingMode: "vertical-rl",
              // 俳句は縦書き1行（1列）。折り返さず、高さは画面に収まるよう文字サイズを決める。
              whiteSpace: "nowrap",
              fontSize: "clamp(20px, 4vh, 44px)",
              letterSpacing: "0.18em",
            }}
          >
            {work}
          </p>
          <p className="text-muted" style={{ fontSize: "15px", letterSpacing: "0.1em" }}>
            {showName && authorName.trim() ? authorName : "よみ人しらず"}
          </p>

          {/* コントロール（印刷には出さない） */}
          <div className="flex flex-col items-center gap-3 no-print">
            <div className="flex items-center gap-2">
              <input
                value={authorName}
                onChange={(e) => {
                  setAuthorName(e.target.value);
                  window.localStorage.setItem("kokugo_author", e.target.value);
                }}
                placeholder="名前（任意）"
                className="rounded-md border px-3 py-1"
                style={{ borderColor: "var(--border)", background: "var(--surface)", fontSize: "14px", width: "10em" }}
                aria-label="名前"
              />
              <button
                type="button"
                onClick={() => setShowName((v) => !v)}
                className="px-4 py-1 rounded-md border border-border text-muted"
                style={{ fontSize: "13px" }}
              >
                {showName ? "名前をかくす" : "名前を見せる"}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-lg border border-accent text-accent"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                印刷
              </button>
              <button
                type="button"
                onClick={() => setShowCard(false)}
                className="px-5 py-2 rounded-lg bg-accent text-background"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                とじる
              </button>
            </div>
          </div>
          <style jsx global>{`
            @media print {
              .no-print {
                display: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}

/** 気づきメモの localStorage キー。 */
function noteKey(stepId: string): string {
  return `kokugo_note:${SERIES.id}:${stepId}`;
}

/** オペレータの子ども向けラベル（履歴の国語軸で使う）。 */
const OP_LABEL_JA: Record<string, string> = {
  same: "同じかたちで作る",
  inverse: "ならべかえ・逆",
  plus_alpha: "じょうけんを足す",
  qualitative: "かたちを変える（自由律）",
  composite: "重ねわざ",
};

/**
 * あしあと（履歴の国語軸・G8）を localStorage から集める。
 * 正答率は出さない——オペレータ×ヒント到達層×見つけた観点でふり返る。
 */
function collectFootprints(): {
  walked: number;
  hard: { op: string }[];
  chosen: string[];
  noteCount: number;
} {
  const history = loadSeriesHistory(SERIES.id);
  const walked = new Set(history.map((r) => r.stepId)).size;
  const hard: { op: string }[] = [];
  for (const r of history) {
    if (r.hintsOpened >= 2) {
      const st = SERIES.steps.find((s) => s.id === r.stepId);
      const op = st?.variationFromPrevious;
      if (op && OP_LABEL_JA[op]) hard.push({ op: OP_LABEL_JA[op] });
    }
  }
  let chosen: string[] = [];
  try {
    const raw = window.localStorage.getItem(vpKey("step8"));
    if (raw) chosen = JSON.parse(raw);
  } catch {
    chosen = [];
  }
  let noteCount = 0;
  for (const s of SERIES.steps) {
    const n = window.localStorage.getItem(noteKey(s.id));
    if (n && n.trim()) noteCount++;
  }
  return { walked, hard, chosen, noteCount };
}

/** 選んだ観点の localStorage キー（段階3後続で句会記録・版管理と統合）。 */
function vpKey(stepId: string): string {
  return `kokugo_vp:${SERIES.id}:${stepId}`;
}

/** 自作句（作品＋よみがな）の localStorage キー。次の step の「さっきの句」参照・清書に使う。 */
function haikuKey(stepId: string): string {
  return `kokugo_haiku:${SERIES.id}:${stepId}`;
}
function saveHaiku(stepId: string, work: string, reading: string): void {
  window.localStorage.setItem(haikuKey(stepId), JSON.stringify({ work, reading }));
}
function loadHaiku(stepId: string): { work: string; reading: string } | null {
  try {
    const raw = window.localStorage.getItem(haikuKey(stepId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** fillIn テンプレートを「＿」の連続で区切り、テキストとスロットに分解。 */
function renderTemplate(tmpl: string): { text?: string; slot?: number }[] {
  const parts: { text?: string; slot?: number }[] = [];
  const re = /＿+/g;
  let last = 0;
  let si = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tmpl))) {
    if (m.index > last) parts.push({ text: tmpl.slice(last, m.index) });
    parts.push({ slot: si++ });
    last = m.index + m[0].length;
  }
  if (last < tmpl.length) parts.push({ text: tmpl.slice(last) });
  return parts;
}
