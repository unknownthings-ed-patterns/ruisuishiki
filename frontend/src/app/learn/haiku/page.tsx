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
import { useEffect, useState, type ReactNode } from "react";
import { MathBody, MathText } from "@/components/Math";
import { countMora } from "@/lib/moraCount";
import { getMentorText } from "@/lib/mentorTexts";
import { catalogFocusHref, rememberCatalogFocus } from "@/lib/seriesCatalog";
import { KOKUGO_HAIKU_SERIES_LIST } from "@/lib/seriesKokugoHaiku";
import { KOKUGO_HANASHI_SERIES_LIST } from "@/lib/seriesKokugoHanashi";
import { KOKUGO_NIKKI_SERIES_LIST } from "@/lib/seriesKokugoNikki";
import { KOKUGO_SHI_SERIES_LIST } from "@/lib/seriesKokugoShi";
import { KOKUGO_ZUIHITSU_SERIES_LIST } from "@/lib/seriesKokugoZuihitsu";
import { getViewpointList } from "@/lib/viewpointLists";
import type { KokugoSeries, MentorText, ViewpointItem } from "@/lib/types";
import {
  clearSeriesHistory,
  getResumeIndex,
  loadSeriesHistory,
  saveStepRecord,
} from "@/lib/storage";

/**
 * このプレイヤーが歩ける国語系列の全部（俳句3＋詩7＋お話1＋日記2＋随筆1）。
 * 解禁順（revealedInSeries）・作品集の収集・?seriesId の解決は、すべてこの順が正。
 */
const KOKUGO_ALL_SERIES: KokugoSeries[] = [
  ...KOKUGO_HAIKU_SERIES_LIST,
  ...KOKUGO_SHI_SERIES_LIST,
  ...KOKUGO_HANASHI_SERIES_LIST,
  ...KOKUGO_NIKKI_SERIES_LIST,
  ...KOKUGO_ZUIHITSU_SERIES_LIST,
];

/** id から国語系列を引く（俳句・自由詩の両方。未登録は undefined）。 */
function resolveKokugoSeries(id: string): KokugoSeries | undefined {
  return KOKUGO_ALL_SERIES.find((s) => s.id === id);
}

type HaikuAnthologyItem = {
  seriesId: string;
  seriesTitle: string;
  stepId: string;
  work: string;
  reading: string;
  /** 目で見て楽しむ詩の step で作った作品か（詰めた縦書きで見せる）。 */
  visual: boolean;
};

/**
 * ジャンルごとの作品の呼び名と、作品を書く欄のことば
 * （俳句＝句集、自由詩＝詩集、お話＝お話集）。
 * ジャンルが増えても既存の呼び名を変えずに済むよう、ここで切り替える。
 */
function worksLabels(series: KokugoSeries): {
  collection: string;
  counter: string;
  empty: string;
  /** 複数行入力（poemText）の見出し・注記。器は同じで、呼び名だけ変える。 */
  compose: {
    aria: string;
    field: string;
    placeholder: string;
    note: string;
  };
  /** 読み比べ・本歌カードの呼び名（俳句「元の句」を他ジャンルで出さない）。 */
  mentor: {
    /** 本歌・手本のラベル（例：元の句／元の詩／元の日記／元のお話） */
    original: string;
    /** 前 step の自作を指すラベル（例：さっきの句） */
    prior: string;
    /** カード群の aria 名（例：くらべる句） */
    aria: string;
  };
} {
  if (series.genreId === "shi") {
    return {
      collection: "わたしの詩集",
      counter: "編",
      empty: "まだ詩がありません。系列を歩くと、ここにたまっていくよ",
      compose: {
        aria: "詩をかく",
        field: "作品（漢字かなまじりでOK。行をかえたいところで改行してね）",
        placeholder: "いちぎょうずつ\nかいてみよう",
        note: "※音の数はかぞえないよ。行の長さも、行の数も、あなたが決めていい。",
      },
      mentor: { original: "元の詩", prior: "さっきの詩", aria: "くらべる詩" },
    };
  }
  if (series.genreId === "nikki") {
    return {
      collection: "わたしの日記帳",
      counter: "日ぶん",
      empty: "まだ日記がありません。系列を歩くと、ここにたまっていくよ",
      compose: {
        aria: "日記をかく",
        field: "作品（漢字かなまじりでOK。文のきれ目で改行すると、あとで読みやすいよ）",
        placeholder: "きょう、",
        note: "※音の数はかぞえないよ。長さも、文の数も、あなたが決めていい。",
      },
      mentor: { original: "元の日記", prior: "さっきの日記", aria: "くらべる日記" },
    };
  }
  if (series.genreId === "zuihitsu") {
    return {
      collection: "わたしの随筆集",
      counter: "編",
      empty: "まだ随筆がありません。系列を歩くと、ここにたまっていくよ",
      compose: {
        aria: "随筆をかく",
        field: "作品（漢字かなまじりでOK。文のきれ目で改行すると、あとで読みやすいよ）",
        placeholder: "見つけた。",
        note: "※音の数はかぞえないよ。長さも、文の数も、あなたが決めていい。",
      },
      mentor: { original: "元の随筆", prior: "さっきの随筆", aria: "くらべる随筆" },
    };
  }
  if (series.genreId === "monogatari") {
    return {
      collection: "わたしのお話集",
      counter: "話",
      empty: "まだお話がありません。系列を歩くと、ここにたまっていくよ",
      compose: {
        aria: "お話をかく",
        field: "作品（漢字かなまじりでOK。文のきれ目で改行すると、あとで読みやすいよ）",
        placeholder: "もし、",
        note: "※音の数はかぞえないよ。長さも、文の数も、あなたが決めていい。",
      },
      mentor: { original: "元のお話", prior: "さっきのお話", aria: "くらべるお話" },
    };
  }
  return {
    collection: "わたしの句集",
    counter: "句",
    empty: "まだ句がありません。系列を歩くと、ここにたまっていくよ",
    compose: {
      aria: "詩をかく",
      field: "作品（漢字かなまじりでOK。行をかえたいところで改行してね）",
      placeholder: "いちぎょうずつ\nかいてみよう",
      note: "※音の数はかぞえないよ。行の長さも、行の数も、あなたが決めていい。",
    },
    mentor: { original: "元の句", prior: "さっきの句", aria: "くらべる句" },
  };
}

/**
 * 現在の系列で見せる観点（revealedInSeries で系列の核を先出ししない・G1）。
 * その系列とそれ以前で解禁された項目のみ返す。
 * 未知の系列 id を指す項目は非表示に倒す（安全側・handoff T-7）。
 */
function visibleViewpointItems(series: KokugoSeries): ViewpointItem[] {
  const vl = getViewpointList(series.genreId);
  if (!vl) return [];
  const order = KOKUGO_ALL_SERIES.findIndex((s) => s.id === series.id);
  return vl.items.filter((it) => {
    if (!it.revealedInSeries) return true;
    const revealedAt = KOKUGO_ALL_SERIES.findIndex(
      (s) => s.id === it.revealedInSeries,
    );
    return revealedAt !== -1 && revealedAt <= order;
  });
}

/**
 * 行分けを保った縦書き表示（行＝列）。
 *
 * 俳句の「縦書き1列 nowrap」原則の複数行版：1 行を 1 つのブロックにすると、
 * 縦書き（vertical-rl）ではブロックが右から左へ積まれる＝日本語の詩の組み方に
 * そのままなる。空行（連のあいだ）は全角空白で 1 列ぶんの間として残す。
 *
 * 折り返しは殺さない（pre-wrap）——詩の行は短いので実質 1 行＝1 列になり、
 * 比較用に置く「ふつうの文」（長い一続き）だけが自然に複数列へ流れる。
 *
 * visual＝目で見て楽しむ詩（視覚詩）。**文字のならべ方そのものが作品**なので、
 * 字間・行間を詰めた等幅グリッドで描く（letterSpacing 0・lineHeight 1.6）。
 * 数値は先生が検収した縦書きプレビュー（vault 個人/視覚詩_縦書きプレビュー.html）と同じ。
 * 既定（false）は従来の値のままなので、俳句・自由詩・お話・日記の見た目は不変。
 */
function PoemLines({
  text,
  fontSize = "clamp(14px, 2.2vh, 18px)",
  maxHeight = "50vh",
  visual = false,
}: {
  text: string;
  fontSize?: string;
  maxHeight?: string;
  visual?: boolean;
}) {
  const lines = text.split("\n");
  return (
    <div
      // 書体は visual でも変えない（プレビューも明朝で組んで検収済み。日本語の
      // かな漢字・全角スペースはもともと同じ幅なので、明朝のままで格子が立つ）。
      className="font-serif text-foreground"
      style={{
        writingMode: "vertical-rl",
        maxHeight,
        maxWidth: "100%",
        overflowX: "auto",
        fontSize,
        letterSpacing: visual ? 0 : "0.12em",
        lineHeight: visual ? 1.6 : 1.9,
      }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", whiteSpace: "pre-wrap" }}>
          {line === "" ? "　" : line}
        </span>
      ))}
    </div>
  );
}

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

/** 模範文カード（縦書き）。viewpointTags は出さない（G1）。 */
function MentorCard({ id }: { id: string }) {
  const m = getMentorText(id);
  if (!m) return null;
  // 自由詩・お話（散文）・目で見て楽しむ詩は音数の器を持たないので、
  // 行を保った複数列表示・音数は出さない。
  const isFreeVerse =
    m.form === "free_verse" || m.form === "prose" || m.form === "visual";
  // 視覚詩だけ、字間・行間を詰めた等幅グリッドで描く（ならべ方が作品）。
  const isVisual = m.form === "visual";
  return (
    <article
      className="rounded-lg border border-border px-4 py-5 flex flex-col items-center gap-3"
      style={{ background: "var(--surface)" }}
    >
      {isFreeVerse ? (
        <PoemLines text={m.text} visual={isVisual} />
      ) : (
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
      )}
      {m.reading && (
        <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.05em" }}>
          {isFreeVerse ? m.reading : `${m.reading}（${countMora(m.reading)}音）`}
        </span>
      )}
      <span className="text-muted" style={{ fontSize: "12px" }}>
        — {m.author}
      </span>
    </article>
  );
}

export default function HaikuPlay() {
  const [series, setSeries] = useState<KokugoSeries>(KOKUGO_ALL_SERIES[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [view, setView] = useState<"play" | "anthology">("play");
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
  const shownViewpoints = visibleViewpointItems(series);
  // 清書カード（§7.2）：自作句を大きく縦書き表示・匿名切替。句会で見せ合う。
  const [showCard, setShowCard] = useState(false);
  // 作品集から清書カードを開いたとき、その作品が視覚詩かどうか（詰めた縦書きにする）。
  const [cardVisual, setCardVisual] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [showName, setShowName] = useState(false); // 既定は匿名（選のあと作者を明かす運用）

  const step = series.steps[stepIndex];
  const labels = worksLabels(series);
  const total = series.steps.length;
  const isLast = stepIndex === total - 1;
  const input = step.input;
  /**
   * 縦書き入力（docs/視覚詩背骨_kokugo.md 技術ゲート1）。
   * orientation 未指定の poemText は従来どおり横書き＝自由詩①・お話・日記は挙動不変。
   * この step は「ならべ方そのものが作品」なので、書く画面と読む画面の形をそろえる。
   */
  const poemVertical =
    input?.type === "poemText" && input.orientation === "vertical";

  // 復元（初回のみ）：URL ?seriesId で系列を選び、?fresh=1 でクリア、なければ resume 位置へ
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("seriesId");
    const resolved = (sid && resolveKokugoSeries(sid)) || KOKUGO_ALL_SERIES[0];
    setSeries(resolved);
    if (params.get("fresh") === "1") {
      clearSeriesHistory(resolved.id);
      window.history.replaceState(
        null,
        "",
        window.location.pathname + `?seriesId=${resolved.id}`,
      );
      setStepIndex(0);
    } else {
      const history = loadSeriesHistory(resolved.id);
      const resume = getResumeIndex(
        history,
        resolved.steps.map((s) => s.id),
      );
      if (resume >= resolved.steps.length) setCompleted(true);
      else if (resume > 0) setStepIndex(resume);
    }
    setAuthorName(window.localStorage.getItem("kokugo_author") ?? "");
    setHydrated(true);
  }, []);

  // step（または系列）が変わるたびに入力状態をリセット
  useEffect(() => {
    setHintsOpened(0);
    setChoice(null);
    setOrder([]);
    const savedHaiku =
      step.input?.type === "haikuText" || step.input?.type === "poemText"
        ? loadHaiku(series.id, step.id)
        : null;
    setWork(savedHaiku?.work ?? "");
    setReading(savedHaiku?.reading ?? "");
    if (input?.type === "fillIn") {
      const savedSlots = loadFillInSlots(series.id, step.id);
      setSlots(
        input.slotConstraints.map((_, i) =>
          typeof savedSlots?.[i] === "string" ? savedSlots[i] : "",
        ),
      );
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
        ? window.localStorage.getItem(noteKey(series.id, step.id)) ?? ""
        : "",
    );
    if (step.pickViewpoints) {
      const saved =
        typeof window !== "undefined"
          ? window.localStorage.getItem(vpKey(series.id, step.id))
          : null;
      const chosen: string[] = saved ? JSON.parse(saved) : [];
      setVpChecked(shownViewpoints.map((it) => chosen.includes(it.text)));
    } else {
      setVpChecked([]);
    }
    setShowCard(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, series.id]);

  // exercise は正解で解錠。comparison / creation は常に進める（判定しない）。
  const choiceCorrect =
    input?.type === "choice" && choice === input.answerIndex;
  // 並べ替えの判定は2方式（input.judge。未指定＝"mora"＝俳句の従来判定で挙動不変）。
  //  - "mora"（既定）：「固定の語順」ではなく「モーラ列が 5-7-5 になる並び」で判定する。
  //    同じ音数のかたまり（例：5音が二つ）が入れ替わった倒置の句も正解にするため。
  //    目標のモーラ列は正典の answerOrder（5-7-5 になる並び）から導く。
  //  - "exact"：answerOrder との正順一致。散文の文ならべ（日記系列①）は音数に意味がなく、
  //    「おきたじゅん」が一意に決まるので、並びそのものを見る
  //    （docs/日記背骨_kokugo.md 技術ゲート1）。
  const reorderExact = input?.type === "reorder" && input.judge === "exact";
  const reorderCorrect =
    input?.type === "reorder" &&
    order.length === input.segments.length &&
    (input.judge === "exact"
      ? order.every((idx, pos) => idx === input.answerOrder[pos])
      : (() => {
          const segMora = input.segments.map((seg) => countMora(seg));
          const targetMora = input.answerOrder.map((i) => segMora[i]);
          return order.every((idx, pos) => segMora[idx] === targetMora[pos]);
        })());
  const canAdvance =
    step.kind !== "exercise" || choiceCorrect || reorderCorrect;

  function persist() {
    saveStepRecord(series.id, {
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

  if (!hydrated) {
    return <main className="min-h-screen" aria-hidden />;
  }

  if (view === "anthology") {
    const haikuWorks = collectHaikuAnthology();
    return (
      <main
        className={`flex min-h-screen flex-col${showCard ? " haiku-card-print-mode" : ""}`}
      >
        <nav
          className="sticky top-0 z-10 border-b border-border backdrop-blur-sm"
          style={{ background: "color-mix(in oklch, var(--background) 92%, transparent)" }}
          aria-label="サイト全体のナビゲーション"
        >
          <div className="mx-auto w-full max-w-2xl px-6 py-2 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setView("play")}
              className="text-muted hover:text-foreground transition-colors"
              style={{ fontSize: "12px", letterSpacing: "0.05em" }}
            >
              ← もどる
            </button>
            <span className="text-muted truncate" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
              {labels.collection}
            </span>
          </div>
        </nav>
        <div className="flex-1 mx-auto w-full max-w-2xl px-6 py-10 flex flex-col gap-8">
          <header className="flex items-center justify-between gap-4">
            <h1
              className="font-serif text-foreground"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "0.12em" }}
            >
              {labels.collection}
            </h1>
            <span className="text-muted tnum" style={{ fontSize: "13px", letterSpacing: "0.1em" }}>
              {haikuWorks.length}
              {labels.counter}
            </span>
          </header>

          {haikuWorks.length === 0 ? (
            <p className="text-muted text-center py-16" style={{ fontSize: "15px", lineHeight: 2 }}>
              {labels.empty}
            </p>
          ) : (
            <section className="flex flex-col gap-5" aria-label="保存した作品">
              {haikuWorks.map((item) => (
                <article
                  key={`${item.seriesId}:${item.stepId}`}
                  className="rounded-lg border border-border px-5 py-5 flex items-center justify-between gap-5"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-5">
                    {item.work.includes("\n") || item.visual ? (
                      <PoemLines
                        text={item.work}
                        fontSize="clamp(13px, 2vh, 18px)"
                        maxHeight="42vh"
                        visual={item.visual}
                      />
                    ) : (
                      <p
                        className="font-serif text-foreground"
                        style={{
                          writingMode: "vertical-rl",
                          whiteSpace: "nowrap",
                          fontSize: "clamp(16px, 3vh, 24px)",
                          letterSpacing: "0.14em",
                          maxHeight: "42vh",
                        }}
                      >
                        {item.work}
                      </p>
                    )}
                    <span className="text-muted" style={{ fontSize: "12px", lineHeight: 1.7 }}>
                      {item.seriesTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setWork(item.work);
                      setReading(item.reading);
                      setCardVisual(item.visual);
                      setShowCard(true);
                    }}
                    className="shrink-0 px-4 py-2 rounded-lg border border-accent text-accent"
                    style={{ fontSize: "13px", letterSpacing: "0.08em" }}
                  >
                    清書カードにする
                  </button>
                </article>
              ))}
            </section>
          )}
        </div>

        {showCard && (
          <HaikuCardOverlay
            work={work}
            authorName={authorName}
            showName={showName}
            setAuthorName={setAuthorName}
            setShowName={setShowName}
            onClose={() => setShowCard(false)}
            visual={cardVisual}
          />
        )}
      </main>
    );
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
            {series.genreId === "shi"
              ? "できた詩を、だれかと読み合ってみよう。"
              : series.genreId === "monogatari"
              ? "できたお話を、だれかと読み合ってみよう。"
              : series.genreId === "nikki"
              ? "できた日記を、だれかと読み合ってみよう。"
              : series.genreId === "zuihitsu"
              ? "できた随筆を、だれかと読み合ってみよう（発見の交換会）。"
              : "できた句を、だれかと読み合ってみよう（句会）。"}
          </p>

          {/* あしあと（履歴の国語軸・G8）。正答率は出さない。
              オペレータ×ヒント到達層×見つけた観点で「歩き」をふり返る。 */}
          {(() => {
            const fp = collectFootprints(series);
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

          {/* 出口「作家の風景」（数学版「公式の景色」の国語版）。
              系列が authorLandscape を持つときだけ出す（フィールド駆動・俳句3系列は不変）。 */}
          {series.authorLandscape && <AuthorLandscape series={series} />}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setView("anthology")}
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg border border-accent text-accent"
              style={{ letterSpacing: "0.2em" }}
            >
              {labels.collection}
            </button>
            {/* アプリ内でリセット（画面遷移しないので basePath 非依存で確実）。 */}
            <button
              type="button"
              onClick={() => {
                clearSeriesHistory(series.id);
                setStepIndex(0);
                setCompleted(false);
              }}
              className="inline-flex items-center justify-center min-w-[160px] px-10 py-4 rounded-lg bg-accent text-background"
              style={{ letterSpacing: "0.2em" }}
            >
              もう一度
            </button>
            <Link
              href={catalogFocusHref(series.id)}
              scroll={false}
              onClick={() => rememberCatalogFocus(series.id)}
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
    <main
      className={`flex min-h-screen flex-col${showCard ? " haiku-card-print-mode" : ""}`}
    >
      {/* 上部ナビ */}
      <nav
        className="sticky top-0 z-10 border-b border-border backdrop-blur-sm"
        style={{ background: "color-mix(in oklch, var(--background) 92%, transparent)" }}
        aria-label="サイト全体のナビゲーション"
      >
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
          <div className="flex shrink-0 items-baseline gap-2 sm:gap-3" style={{ fontSize: "12px", letterSpacing: "0.05em" }}>
            <Link href="/learn/" className="text-muted hover:text-foreground transition-colors whitespace-nowrap">
              ← 学ぶ
            </Link>
            <span className="hidden sm:inline text-muted opacity-30" aria-hidden>/</span>
            <Link href="/" className="hidden sm:inline text-muted hover:text-foreground transition-colors whitespace-nowrap">
              ホーム
            </Link>
          </div>
          <span className="text-muted truncate" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            {series.title}
          </span>
          <button
            type="button"
            onClick={() => setView("anthology")}
            className="shrink-0 text-accent hover:text-foreground transition-colors whitespace-nowrap"
            style={{ fontSize: "12px", letterSpacing: "0.08em" }}
          >
            {labels.collection}
          </button>
        </div>
      </nav>

      <div className="flex-1 mx-auto w-full max-w-2xl px-6 py-8 flex flex-col gap-6">
        {/* 中心の問い */}
        {series.drivingQuestion && (
          <section
            className="rounded-lg border border-accent/30 px-5 py-3"
            style={{ background: "color-mix(in oklch, var(--surface) 85%, var(--accent) 15%)" }}
            aria-label="中心の問い"
          >
            <span className="block text-muted mb-1" style={{ fontSize: "10px", letterSpacing: "0.25em" }}>
              中心の問い
            </span>
            <p className="text-foreground" style={{ fontSize: "13px", lineHeight: 1.7, letterSpacing: "0.02em" }}>
              <MathText text={series.drivingQuestion} />
            </p>
          </section>
        )}

        {/* 進度（文型タグは出さない・G1/F1） */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {series.steps.map((_, i) => (
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
            作る(creation)では上部に出さず、ヒント横に「くらべる句」として添える。
            例外＝showMentorUpfront（本歌取など「読んでから型を借りる」step は元の作品が
            最初から見えている必要がある）。 */}
        {(step.kind === "comparison" || step.showMentorUpfront) && step.mentorTextRefs && step.mentorTextRefs.length > 0 && (
          <section
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.min(step.mentorTextRefs.length, 2)}, minmax(0, 1fr))` }}
            aria-label={`読み${labels.mentor.aria}`}
          >
            {step.mentorTextRefs.map((id) => (
              <MentorCard key={id} id={id} />
            ))}
          </section>
        )}

        {/* 気づきメモ（読み比べ step）。canon §7.1「気づきを選ぶ/書く」。
            観点リスト（選べるリスト）は初期版の項目選定が先生マターのため段階3で追加。 */}
        {step.pickViewpoints && shownViewpoints.length > 0 && (
          <section
            className="rounded-lg border border-border px-5 py-4 flex flex-col gap-2"
            style={{ background: "var(--surface)" }}
            aria-label="いいなと思うところをえらぶ"
          >
            <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              いいなと思うところ（えらんでいいよ）
            </span>
            {shownViewpoints.map((it, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer" style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  checked={vpChecked[i] ?? false}
                  onChange={() =>
                    setVpChecked((c) => {
                      const next = [...c];
                      next[i] = !next[i];
                      window.localStorage.setItem(
                        vpKey(series.id, step.id),
                        JSON.stringify(
                          shownViewpoints
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
                  window.localStorage.setItem(noteKey(series.id, step.id), e.target.value);
                }}
                rows={3}
                placeholder={
                  series.id === "kokugo_haiku_kire_01"
                    ? "わからないところも、そのまま書いていい"
                    : "自分のことばで書いてみよう"
                }
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
            {/* 散文の文ならべ（judge: "exact"）は 1 文が長いので縦に積み、音数は出さない
                （音数はこのジャンルの器ではない）。俳句（既定）は従来どおり横並び＋音数。 */}
            <div className={reorderExact ? "flex flex-col gap-2" : "flex flex-wrap gap-2"}>
              {input.segments.map((seg, i) => {
                const used = order.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={used}
                    onClick={() => setOrder((o) => [...o, i])}
                    className={`px-4 py-2 rounded-lg border font-serif transition-opacity${
                      reorderExact ? " text-left" : ""
                    }`}
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                      opacity: used ? 0.3 : 1,
                      fontSize: "17px",
                    }}
                  >
                    {reorderExact ? seg : `${seg}（${countMora(seg)}音）`}
                  </button>
                );
              })}
            </div>
            <div
              className={
                reorderExact
                  ? "flex flex-col gap-1 min-h-[2.5rem]"
                  : "flex items-center gap-2 flex-wrap min-h-[2.5rem]"
              }
            >
              {order.map((idx, pos) => (
                <span key={pos} className="font-serif text-foreground" style={{ fontSize: "18px" }}>
                  {reorderExact && <span className="text-muted mr-1 tnum">{pos + 1}.</span>}
                  {input.segments[idx]}
                  {!reorderExact && pos < order.length - 1 && (
                    <span className="text-muted mx-1">／</span>
                  )}
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
                {reorderExact
                  ? reorderCorrect
                    ? "✓ おきたじゅんになったね"
                    : "この じゅんばんで、ほんとうに できるかな？ 上から声に出して読んでみよう"
                  : reorderCorrect
                  ? "✓ 五・七・五になったね"
                  : "五・七・五の順になっているかな？ 音を数えてみよう"}
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
                      saveFillInSlots(series.id, step.id, next);
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
                  saveHaiku(series.id, step.id, e.target.value, reading);
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
                  saveHaiku(series.id, step.id, work, e.target.value);
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

        {/* 自由詩の複数行入力（作品欄のみ・よみがな欄なし・音数メーターなし）。
            改行がそのまま行分け＝作品の一部なので、入力の改行を保って保存・表示する。
            orientation: "vertical" の step（目で見て楽しむ詩）では、作品欄そのものを
            縦書き（vertical-rl）で開き、字間・行間を表示側と同じに詰める——ならべ方が
            作品なので、書きながら形が見えないと作れない（技術ゲート1）。 */}
        {input?.type === "poemText" && (
          <section className="flex flex-col gap-3" aria-label={labels.compose.aria}>
            <label className="flex flex-col gap-1">
              <span className="text-muted" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
                {poemVertical
                  ? "作品（たて書き。ますをあけたいところは、ぜんかくスペース）"
                  : labels.compose.field}
              </span>
              <textarea
                value={work}
                onChange={(e) => {
                  setWork(e.target.value);
                  saveHaiku(series.id, step.id, e.target.value, "");
                }}
                rows={poemVertical ? undefined : 6}
                placeholder={
                  poemVertical
                    ? "たてに かいてみよう\nますを あけたいところは、ぜんかくスペース"
                    : labels.compose.placeholder
                }
                className={`rounded-md border px-3 py-2${poemVertical ? " font-serif" : ""}`}
                style={
                  poemVertical
                    ? {
                        borderColor: "var(--accent-soft)",
                        background: "var(--background)",
                        fontSize: "17px",
                        // 表示（PoemLines の visual）と同じ組み方にそろえる。
                        writingMode: "vertical-rl",
                        letterSpacing: 0,
                        lineHeight: 1.6,
                        width: "100%",
                        height: "46vh",
                        resize: "vertical",
                      }
                    : {
                        borderColor: "var(--accent-soft)",
                        background: "var(--background)",
                        fontSize: "16px",
                        lineHeight: 1.9,
                        resize: "vertical",
                      }
                }
              />
            </label>
            {work.trim() && (
              <div className="flex flex-col gap-1">
                <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
                  {poemVertical ? "できあがりの かたち" : "たてに読むと"}
                </span>
                <div className="flex justify-center rounded-lg border border-border px-4 py-4" style={{ background: "var(--surface)" }}>
                  <PoemLines text={work} maxHeight="40vh" visual={poemVertical} />
                </div>
              </div>
            )}
            <p className="text-muted" style={{ fontSize: "12px" }}>
              {poemVertical
                ? "※音の数はかぞえないよ。文字も、ならべ方も、あなたが決めていい。ますをあけたいところは、ぜんかくスペースでね。"
                : labels.compose.note}
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
                  ? loadHaiku(series.id, step.compareWithStepId)
                  : null;
              if (refs.length === 0 && !prior?.work) return null;
              return (
                <article
                  className="rounded-lg border border-border p-4 flex flex-col gap-2 animate-fade-in"
                  style={{ background: "var(--surface)" }}
                  aria-label={labels.mentor.aria}
                >
                  <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
                    {refs.length ? labels.mentor.original : labels.mentor.prior}
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
        <HaikuCardOverlay
          work={work}
          authorName={authorName}
          showName={showName}
          setAuthorName={setAuthorName}
          setShowName={setShowName}
          onClose={() => setShowCard(false)}
          visual={poemVertical}
        />
      )}
    </main>
  );
}

type ExternalRead = { href: string; label: string; note: string };

/**
 * 「作家の風景」の付属（外部リンクと出典）。系列ごとに持つ。
 *
 * 権利：外国作品は**自前訳のみ掲載・原文は外部リンク**（2026-08-09 先生裁定）。
 * 原文はこのリポジトリのどこにも置かない。リンクは複製ではないので自由。
 * 外部リンクは basePath の影響を受けない（絶対URL）。
 * 出典は memory ruisuishiki-citation-format の3点セット（見出し／APA 風／「— 」注記）。
 */
const AUTHOR_LANDSCAPE_EXTRAS: Record<
  string,
  {
    english: ExternalRead[];
    japanese: ExternalRead[];
    citation: { apa: ReactNode; note: string };
  }
> = {
  kokugo_shi_5byo_01: {
    english: [
      {
        href: "https://poets.org/poem/red-wheelbarrow",
        label: "The Red Wheelbarrow（赤い手押し車）",
        note: "16語だけの、いちばん有名な「見たままを置く」詩",
      },
      {
        href: "https://poets.org/poem/just-say",
        label: "This Is Just To Say（ちょっとひとこと）",
        note: "冷蔵庫のすももを食べてしまった、という置き手紙の詩",
      },
    ],
    japanese: [
      {
        href: "https://www.aozora.gr.jp/cards/000136/card45048.html",
        label: "山村暮鳥「燕」（青空文庫）",
        note: "step4 で読んだ詩。日本語の本物はここで読める",
      },
    ],
    citation: {
      apa: (
        <>
          Williams, W. C. (1962). <i>Pictures from Brueghel and Other Poems</i>. New Directions.（訳は
          ruisuishiki による自前訳）
        </>
      ),
      note: "— 日本では新作セクションの初出が1956年以降（1963年英国版著作権ページで確認）のため保護期間満了。",
    },
  },
  // 詩系列②「目で見て楽しむ詩」。保護中の作品（内田麟太郎・新国誠一・寺山修司）は
  // 本文も図版も載せず、書誌だけを出す＝「本物に会う」方式（背骨§権利の整理2）。
  // 日本語リンクは PD の暮鳥「風景」だけ（本物を読める場所）。
  kokugo_shi_me_01: {
    english: [],
    japanese: [
      {
        href: "https://www.aozora.gr.jp/cards/000136/card52348.html",
        label: "山村暮鳥「風景　純銀もざいく」（青空文庫）",
        note: "step3 で読んだ詩。本物はここで読める",
      },
    ],
    citation: {
      apa: (
        <>
          山村暮鳥（1915）「風景　純銀もざいく」『聖三稜玻璃』.／内田麟太郎（2000）
          <i>うみがわらっている：内田麟太郎詩集</i>. 銀の鈴社（ジュニアポエムシリーズ
          143）.／新国誠一（2019）<i>新国誠一詩集</i>. 思潮社（現代詩文庫 243）.／
          寺山修司「階段」.／Apollinaire, G. (1918). <i>Calligrammes</i>. Mercure de
          France.
        </>
      ),
      note: "— 「風景」は著者が1924年に亡くなっていて保護期間が満了しているので、全文を載せています（青空文庫の本文と突き合わせて確認しました）。新国誠一・寺山修司の作品はいまも著作権で守られているため、このページには本文も図版も載せていません（書名だけです）。内田麟太郎さんの目で見て楽しむ詩は、詩集『うみがわらっている』（銀の鈴社）などで会えます——としょかんで さがしてみてね。「白鳥のお散歩」は岩井輝久の自筆（本人の許諾つき）で、数え上げの形は同詩集所収の「はるのいけ」に学んだ本歌取です（構成を借り、文字と場面はオリジナル）。",
    },
  },
  // 詩系列③「見える見えるなぞなぞ詩」。創作遊びの型の出どころ（白谷明美）を書誌で示す。
  // 本の例詩（きゅうり・とけい・ごみばこ・数字の5）は保護中＝本文非掲載・書誌のみ。
  // 外国語の原文も PD の日本語作品も無いので english/japanese は空（見出しごと出ない）。
  kokugo_shi_nazo_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          白谷明美（2009）
          <i>詩が生まれるとき書けるとき——だれにでもできる楽しい詩のつくり方</i>. 銀の鈴社.
        </>
      ),
      note: "— 「見える見えるなぞなぞ遊び」という詩のつくり方は、白谷明美さんのこの本にある「ひゆ遊び」に学びました。遊び方（アイデア）は借りてよいものですが、本にのっている詩そのものは著作権で守られているので、このページには載せていません（書名だけです）。この系列に出てくる問題の詩は、岩井の教室の子どもたちの詩の組み立てに学んで、場面もことばもこちらで書き下ろした自作です（子どもたちの詩の本文は使っていません）。「見える見えるなぞなぞ」（スプーン）は岩井輝久の自筆で、本人の許諾つきです。",
    },
  },
  // 詩系列④「一口お笑い（脚韻）」。創作遊びの型の出どころ（白谷明美）を書誌で示す。
  // 本の作例（です・ちり・さい・たね・たい・ちゅう・なし）は保護中＝本文非掲載・書誌のみ。
  // 教え子の作品も本文非掲載（2026-08-21 先生裁定）。外国語の原文も PD の日本語作品も
  // 無いので english/japanese は空（見出しごと出ない）。
  kokugo_shi_owarai_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          白谷明美（2009）
          <i>詩が生まれるとき書けるとき——だれにでもできる楽しい詩のつくり方</i>. 銀の鈴社.
        </>
      ),
      note: "— 「一口お笑い」という詩のつくり方は、白谷明美さんのこの本にあります。遊び方（アイデア）は借りてよいものですが、本にのっている詩そのものは著作権で守られているので、このページには載せていません（書名だけです）。この系列に出てくる問題の詩は、本の作例と、岩井の教室の子どもたちの詩の組み立てに学んで、そろえる音も場面もこちらで書き下ろした自作です（本や子どもたちの詩の本文は使っていません）。「とって」は岩井輝久の自筆で、本人の許諾つきです。",
    },
  },
  // 詩系列⑤「〜のゆめ（イメージ遊び）」。創作遊びの型の出どころ（白谷明美）と、枠の本歌
  // （くどうなおこ「のはらうた」）を書誌で示す。くどうなおこさんは存命＝保護中なので
  // 本文も引用も載せない（書誌のみ・背骨 裁定3）。本の作例・教え子の作品も本文非掲載。
  // 外国語の原文も PD の日本語作品も無いので english/japanese は空（見出しごと出ない）。
  kokugo_shi_yume_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          白谷明美（2009）
          <i>詩が生まれるとき書けるとき——だれにでもできる楽しい詩のつくり方</i>. 銀の鈴社.／
          くどうなおこ（1984）<i>のはらうた I</i>. 童話屋.（以降シリーズ続刊）
        </>
      ),
      note: "— 「〜のゆめ」という詩のつくり方（イメージ遊び）は、白谷明美さんのこの本にあります。遊び方（アイデア）は借りてよいものですが、本にのっている詩そのものは著作権で守られているので、このページには載せていません（書名だけです）。この遊びのお手本になった、くどうなおこさんの「のはらうた」のかたつむりのゆめの詩も、いまも著作権で守られているため、本文はいっさい載せていません（書名だけです）——としょかんで さがしてみてね。この系列に出てくる問題の詩は、その詩たちと、岩井の教室の子どもたちの詩の組み立てに学んで、なりきる相手も場面もこちらで書き下ろした自作です（本や、のはらうたや、子どもたちの詩の本文は使っていません）。「かにのゆめ」は岩井輝久の自筆で、本人の許諾つきです。",
    },
  },
  // 詩系列⑥「ようすことばのかけ合い（オノマトペ）」。創作遊びの型の出どころ（白谷明美）と、
  // 本歌の北原白秋「兎の電報」の底本・初出を書誌で示す。白秋は1942年没＝戦前没なので
  // 全文を載せている。本の作例（うなぎの電報・かけ合いの6編）と教え子の作品は本文非掲載。
  // 外国語の原文も、外部で読める PD の日本語作品も無いので english/japanese は空
  // （見出しごと出ない。白秋の底本・一次典拠はどちらもオンライン公開されていない）。
  kokugo_shi_kakeai_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          白谷明美（2009）
          <i>詩が生まれるとき書けるとき——だれにでもできる楽しい詩のつくり方</i>. 銀の鈴社.／
          北原白秋「兎の電報」<i>北原白秋のうたの絵本</i>. 北原白秋生家保存会（掲載版に拠る）.
          （初出＝<i>白秋童謡集 第2集（兎の電報）</i>. アルス, 1921）
        </>
      ),
      note: "— 「ようすことば」「二人でかけ合い」という詩のつくり方は、白谷明美さんのこの本にあります。遊び方（アイデア）は借りてよいものですが、本にのっている詩そのものは著作権で守られているので、このページには載せていません（書名だけです）。「兎の電報」は、作者の北原白秋が1942年に亡くなっていて保護期間が満了しているので、全文を載せています（本文は、白谷さんの本に転載された、北原白秋生家保存会『北原白秋のうたの絵本』掲載版に拠りました。いちばん古い出どころの『白秋童謡集 第2集』は、国立国会図書館デジタルコレクションで館内限定の公開なので、書名だけを確かめています）。この系列に出てくる問題の詩は、その本の作例と、岩井の教室の子どもたちの詩の組み立てに学んで、生きものも場面も音もこちらで書き下ろした自作です（本や子どもたちの詩の本文は使っていません）。「線香花火の一生」は岩井輝久の自筆で、本人の許諾つきです。",
    },
  },
  // 詩系列⑦「6つのへやの詩（くりかえし）」。創作遊びの型の出どころ（ジョージア・ハード
  // の Six-Room Poem）を、参照した本（Heart Maps 2016）と原出（Awakening the Heart 1999）
  // の**両方併記**で示す（2026-08-22 裁定7）。ワークシートのイラスト（ネット素材）は
  // 載せず、テキストだけを翻刻した（裁定3）。教え子の作品「山梨県」と、ペペの写真
  // （web引用）は非掲載。外国語の原文も PD の日本語作品も無いので english/japanese は空
  // （見出しごと出ない。ハードの本は英語の書籍で、本文はオンライン公開されていない）。
  kokugo_shi_heya_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          Heard, G. (2016). <i>Heart Maps: Helping Students Create and Craft Authentic
          Writing</i>. Heinemann.／Heard, G. (1999). <i>Awakening the Heart: Exploring Poetry
          in Elementary and Middle School</i>. Heinemann.（Six-Room Poem の原出）
        </>
      ),
      note: "— 「6つのへやの詩」という詩のつくり方（Six-Room Poem）は、アメリカの詩人で先生のジョージア・ハードさんが考えたものです。つくり方（アイデア）は借りてよいものですが、本にのっている詩や文章そのものは著作権で守られているので、このページには載せていません（書名だけです）。日本語のワークシートにしたのは岩井輝久で、このページに出てくるワークシートと「犬のペペ」（書き直す前の版・書き直したあとの版）は、どちらも岩井輝久の自筆で、本人の許諾つきです。ワークシートに入っていたイラストはインターネットの素材なので載せず、集めたことばだけを写しました。Step5 の「くりかえしを縮めた版」は、読みくらべのために、作者の許諾を得てキーワードの行だけを縮めたものです（もとの詩は、三回くりかえすほうです）。岩井の教室の子どもたちの詩は、回数を自分で決めるという組み立てにだけ学んで、本文は載せていません。「バスまち」は、この教材のために書き下ろした自作です。",
    },
  },
  kokugo_hanashi_moshi_01: {
    english: [
      {
        href: "https://gutenberg.ca/ebooks/farjeone-littlebookroom/farjeone-littlebookroom-00-h.html",
        label: "The Little Bookroom（『ムギと王さま』の原書・Gutenberg Canada）",
        note: "「おくさまの部屋（The Lady's Room）」「七番めの王女（The Seventh Princess）」の英語原文",
      },
    ],
    japanese: [],
    citation: {
      apa: (
        <>
          Farjeon, E. (1955). <i>The Little Bookroom</i>. Oxford University Press.（あらすじと訳は
          ruisuishiki による自前訳）
        </>
      ),
      note: "— 「おくさまの部屋」「七番めの王女」は、初出年が確定できず日本では保護中の可能性があるため、全文は載せず、あらすじと急所の場面だけを引用しています（著作権法32条の引用・翻訳しての引用は47条の6）。",
    },
  },
  // お話系列②「二つのことばが出会うと（ファンタジーの二項式）」。創作遊びの型の出どころ
  // （ロダーリ）を、参照した邦訳（ちくま文庫 1990）と原著（1973）の**両方併記**で示す。
  // ロダーリは1980年没＝保護中なので本文も例語も非掲載・書誌のみ。日本の教室での系譜
  // （村田1980・田丸2020）も書誌のみで、本文と子どもの作品は載せない。岩瀬直樹さんの
  // 実践は、掲載誌が特定できなかったため書誌を出さず、『りんと金の魚』の系譜として
  // 名前だけを挙げる（2026-08-22 裁定3）。外国語の原文も PD の日本語作品も無いので
  // english/japanese は空（見出しごと出ない）。
  kokugo_hanashi_nikoushiki_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          ジャンニ・ロダーリ（1990）<i>ファンタジーの文法</i>. 窪田富男訳. 筑摩書房
          （ちくま文庫）.（原著 <i>Grammatica della fantasia</i>, 1973）／村田栄一（1980）
          <i>ことばのびっくりばこ</i>. 宇野文雄絵. さ・え・ら書房.／田丸雅智（2020）
          <i>たった40分で誰でも必ず小説が書ける超ショートショート講座</i>（増補新装版）.
          WAVE出版.
        </>
      ),
      note: "— 「二つのことばが出会うと」というお話のつくり方（ファンタジーの二項式）は、イタリアの作家ジャンニ・ロダーリさんが『ファンタジーの文法』に書いたものです。つくり方（アイデア）は借りてよいものですが、本の文章と、本に出てくる例のことばそのものは、いまも著作権で守られているので、このページには載せていません（書名だけです）——としょかんで さがしてみてね。村田栄一さんの『ことばのびっくりばこ』と、田丸雅智さんの『超ショートショート講座』も同じで、本文と、本にのっている子どもの作品は載せていません。この系列に出てくる二つのことばの組（かさとことり、くつしたとゆうびん、しゃべるれいぞうこ、いぬとほね／いぬとたまご、かめとしんかんせん）と、お話は、この教材のために書き下ろした自作です。「りんと金の魚」は岩井輝久の自筆で、本人の許諾つきです——岩瀬直樹さんの「ウソの詩を書こう」の実践に学んで、岩井さんが散文のお話として書き下ろしたもので、借りたのは書き方のアイデアだけ、ことばはすべて岩井さん自身のものです。",
    },
  },
  // 日記系列②。外国語の原文は無いので english/japanese は空（見出しごと出ない）。
  // 「5びょう日記」という考え方の出どころ（古賀）と、系列①で構成を借りた教科書の
  // クレジットを、出典欄で正確に示す（memory ruisuishiki-citation-format の3点セット）。
  kokugo_nikki_slow_01: {
    english: [],
    japanese: [],
    citation: {
      apa: (
        <>
          古賀及子（2026）『5秒日記』ホーム社.／光村図書出版（2年）「日記を書こう」
        </>
      ),
      note: "— 「5びょう日記」という書き方は古賀及子さんが見つけたもので、「作家の風景」の一文は同書まえがき・紹介文からの引用です。系列①の手本（ぎょうざ日記）は、光村図書2年「日記を書こう」の構成だけを借りて、場面も文もこちらで作りました（本文は使っていません）。日記の本文と手本は、この教材のために書き下ろした自作と、岩井輝久の自筆（本人の許諾つき）です。",
    },
  },
  // 随筆系列①「見つけたこと作文（発見作文）」。寺田寅彦は1935年没＝戦前没なので
  // 『柿の種』の短章は全文を載せている（本文は青空文庫版と照合済み）。日本語リンクは
  // 青空文庫の図書カード1本だけ（本物を丸ごと読める場所）。外国語の原文は無いので
  // english は空（見出しごと出ない）。『楽しい随筆の授業』は随筆の定義・単元構成を
  // 参考にした本で、本文と子どもの作例は載せていない（書誌のみ）。
  kokugo_zuihitsu_mitsuke_01: {
    english: [],
    japanese: [
      {
        href: "https://www.aozora.gr.jp/cards/000042/card1684.html",
        label: "『柿の種』全文（青空文庫）",
        note: "スウスウ雲もコスモスも、ねこの居眠りも——寅彦さんの発見の短章が百以上読める",
      },
    ],
    citation: {
      apa: (
        <>
          寺田寅彦（1996）<i>柿の種</i>. 岩波文庫.（初出＝俳誌「渋柿」）／中島礼子・
          今井成司（編著）（2011）<i>楽しい随筆の授業</i>（作文シリーズ3）. 日本標準.
        </>
      ),
      note: "— 寺田寅彦は1935年に亡くなっていて保護期間が満了しているので、『柿の種』の短章は全文を載せています（本文は青空文庫『柿の種』〔底本＝岩波文庫1996年版〕と突き合わせて、一字も変わっていないことを確認しました）。随筆とは何かという説明と、単元の組み立ては、中島礼子さん・今井成司さんたちの『楽しい随筆の授業』に学びました。考え方（アイデア）は借りてよいものですが、本の本文と、本にのっている子どもの作例は、このページには載せていません（書名だけです）。ダンゴムシとかさ立ての文は、この教材のために書き下ろした自作です。「いつもの八百屋で」は岩井輝久の自筆で、本人の許諾つきです（日記の系列②と同じ一編を、随筆の目で読み直しています）。",
    },
  },
};

/**
 * 出口「作家の風景」（完了画面）。数学版 derivation ＝「公式の景色」の国語版で、
 * 骨格を mirror する：中心の問いの再掲 → 本文 → もっと読む → 出典。
 *
 * フィールド駆動：series.authorLandscape / series.furtherReadingRefs だけを見る
 * （系列 id のハードコードをしない＝新しい系列は型に値を入れるだけで出る）。
 * 歩き終えてから開く順は崩さない（発見が先・G1）。
 *
 * 「もっと読む」は比較教材ではなくアンソロジー（G4 の厚み）＝読むだけの詩。
 * 長い詩は PoemLines の maxHeight 内で横スクロール（縦書きは行＝列なので、
 * 行数が増えるほど横に伸びる）。
 */
function AuthorLandscape({ series }: { series: KokugoSeries }) {
  const reads = (series.furtherReadingRefs ?? [])
    .map((id) => getMentorText(id))
    .filter((m): m is MentorText => Boolean(m));
  const extras = AUTHOR_LANDSCAPE_EXTRAS[series.id];
  return (
    <section
      className="w-full rounded-lg border border-border p-6 flex flex-col gap-5"
      style={{ background: "var(--surface)" }}
      aria-label="作家の風景"
    >
      <h2 className="text-foreground" style={{ fontSize: "13px", letterSpacing: "0.3em" }}>
        作家の風景
      </h2>

      {/* 中心の問いの再掲（この風景は、どの問いの背景か） */}
      {series.drivingQuestion && (
        <p className="text-muted" style={{ fontSize: "12px", lineHeight: 1.9 }}>
          <MathText text={series.drivingQuestion} />
        </p>
      )}

      {/* 本文（authored 文字列は MathBody で描画・空行で段落） */}
      <div className="text-foreground/85" style={{ fontSize: "15px", lineHeight: 2 }}>
        <MathBody text={series.authorLandscape ?? ""} />
      </div>

      {/* もっと読む（アンソロジー・G4）。比較でなく、ただ読む。 */}
      {reads.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
            もっと読む
          </span>
          <div className="grid gap-4 sm:grid-cols-2">
            {reads.map((m) => (
              <article
                key={m.id}
                className="rounded-lg border border-border px-4 py-5 flex flex-col items-center gap-3"
                style={{ background: "var(--background)" }}
              >
                {m.title && (
                  <h3 className="font-serif text-foreground text-center" style={{ fontSize: "14px", letterSpacing: "0.08em" }}>
                    {m.title}
                  </h3>
                )}
                <PoemLines
                  text={m.text}
                  fontSize="clamp(14px, 2.1vh, 17px)"
                  maxHeight="46vh"
                  visual={m.form === "visual"}
                />
                <span className="text-muted text-center" style={{ fontSize: "12px" }}>
                  — {m.author}
                </span>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 原文・本文はよそのサイトで（このページにあるのは日本語の訳だけ）。
          外国語の原文を持たない系列（日記など）では、英語の見出しと注記は出さない
          ——リンクが 1 本も無いのに「原文は上のリンクで」と書くと嘘になるため。 */}
      {extras && extras.english.length + extras.japanese.length > 0 && (
        <div className="flex flex-col gap-2">
          {extras.english.length > 0 && (
            <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
              えいごで 読みたい人へ
            </span>
          )}
          {extras.english.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-foreground transition-colors"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              {l.label}
              <span className="text-muted" style={{ fontSize: "12px" }}>
                {" "}
                — {l.note} ↗
              </span>
            </a>
          ))}
          {extras.english.length > 0 && (
            <p className="text-muted" style={{ fontSize: "12px", lineHeight: 1.8 }}>
              ※このページにあるのは日本語の訳だけ。英語の原文は、上のリンク先で読んでね。
            </p>
          )}
          {extras.japanese.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-foreground transition-colors"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              {l.label}
              <span className="text-muted" style={{ fontSize: "12px" }}>
                {" "}
                — {l.note} ↗
              </span>
            </a>
          ))}
        </div>
      )}

      {/* 出典（memory ruisuishiki-citation-format の3点セット書式） */}
      {extras && (
        <div className="flex flex-col gap-1 border-t border-border pt-4">
          <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
            出典
          </span>
          <p className="text-muted" style={{ fontSize: "12px", lineHeight: 1.8 }}>
            {extras.citation.apa}
          </p>
          <p className="text-muted" style={{ fontSize: "12px", lineHeight: 1.8 }}>
            {extras.citation.note}
          </p>
        </div>
      )}
    </section>
  );
}

function HaikuCardOverlay({
  work,
  authorName,
  showName,
  setAuthorName,
  setShowName,
  onClose,
  visual = false,
}: {
  work: string;
  authorName: string;
  showName: boolean;
  setAuthorName: (name: string) => void;
  setShowName: (updater: (value: boolean) => boolean) => void;
  onClose: () => void;
  /** 目で見て楽しむ詩（視覚詩）の作品か。字間・行間を詰めて、ならべ方を崩さない。 */
  visual?: boolean;
}) {
  return (
    <div
      className="haiku-card-print-root fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6"
      style={{ background: "var(--background)" }}
      role="dialog"
      aria-label="清書カード"
    >
      {work.includes("\n") || visual ? (
        // 自由詩は行＝列。俳句の「縦書き1列 nowrap」原則の複数行版。
        <PoemLines
          text={work}
          fontSize="clamp(16px, 3.2vh, 32px)"
          maxHeight="66vh"
          visual={visual}
        />
      ) : (
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
      )}
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
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-accent text-background"
            style={{ fontSize: "13px", letterSpacing: "0.1em" }}
          >
            とじる
          </button>
        </div>
      </div>
    </div>
  );
}

/** 気づきメモの localStorage キー。 */
function noteKey(seriesId: string, stepId: string): string {
  return `kokugo_note:${seriesId}:${stepId}`;
}

/** 選んだ観点の localStorage キー（段階3後続で句会記録・版管理と統合）。 */
function vpKey(seriesId: string, stepId: string): string {
  return `kokugo_vp:${seriesId}:${stepId}`;
}

/** fillIn の穴埋め入力の localStorage キー。戻る/再読込でも作りかけを保つ。 */
function fillInKey(seriesId: string, stepId: string): string {
  return `kokugo_fillin:${seriesId}:${stepId}`;
}
function saveFillInSlots(seriesId: string, stepId: string, slots: string[]): void {
  window.localStorage.setItem(fillInKey(seriesId, stepId), JSON.stringify(slots));
}
function loadFillInSlots(seriesId: string, stepId: string): string[] | null {
  try {
    const raw = window.localStorage.getItem(fillInKey(seriesId, stepId));
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : null;
  } catch {
    return null;
  }
}

/** 自作句（作品＋よみがな）の localStorage キー。次の step の「さっきの句」参照・清書に使う。 */
function haikuKey(seriesId: string, stepId: string): string {
  return `kokugo_haiku:${seriesId}:${stepId}`;
}
function saveHaiku(seriesId: string, stepId: string, work: string, reading: string): void {
  window.localStorage.setItem(haikuKey(seriesId, stepId), JSON.stringify({ work, reading }));
}
function loadHaiku(seriesId: string, stepId: string): { work: string; reading: string } | null {
  try {
    const raw = window.localStorage.getItem(haikuKey(seriesId, stepId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** 全国語系列の産出 step（俳句・自由詩・お話）から、自作の作品だけを集める。 */
function collectHaikuAnthology(): HaikuAnthologyItem[] {
  const items: HaikuAnthologyItem[] = [];
  for (const s of KOKUGO_ALL_SERIES) {
    for (const st of s.steps) {
      if (st.input?.type !== "haikuText" && st.input?.type !== "poemText") continue;
      const saved = loadHaiku(s.id, st.id);
      if (!saved?.work.trim()) continue;
      items.push({
        seriesId: s.id,
        seriesTitle: s.title,
        stepId: st.id,
        work: saved.work,
        reading: saved.reading,
        visual:
          st.input.type === "poemText" && st.input.orientation === "vertical",
      });
    }
  }
  return items;
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
function collectFootprints(series: KokugoSeries): {
  walked: number;
  hard: { op: string }[];
  chosen: string[];
  noteCount: number;
} {
  const history = loadSeriesHistory(series.id);
  const walked = new Set(history.map((r) => r.stepId)).size;
  const hard: { op: string }[] = [];
  for (const r of history) {
    if (r.hintsOpened >= 2) {
      const st = series.steps.find((s) => s.id === r.stepId);
      const op = st?.variationFromPrevious;
      if (op && OP_LABEL_JA[op]) hard.push({ op: OP_LABEL_JA[op] });
    }
  }
  let chosen: string[] = [];
  const pvStep = series.steps.find((s) => s.pickViewpoints);
  if (pvStep) {
    try {
      const raw = window.localStorage.getItem(vpKey(series.id, pvStep.id));
      if (raw) chosen = JSON.parse(raw);
    } catch {
      chosen = [];
    }
  }
  let noteCount = 0;
  for (const s of series.steps) {
    const n = window.localStorage.getItem(noteKey(series.id, s.id));
    if (n && n.trim()) noteCount++;
  }
  return { walked, hard, chosen, noteCount };
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
