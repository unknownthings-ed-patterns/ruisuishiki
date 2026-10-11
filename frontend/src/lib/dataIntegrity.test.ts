/**
 * 教材データの整合性テスト（2026-10-11 全体監査で追加）。
 *
 * 実行：`npm run test:data`（tsc でコンパイル → node 実行）。
 *
 * ## 何を見るか
 *
 * `scripts/audit_*.py` は **教材の質**（比較の指さし・オペレータ網羅・答えの先出し）を
 * 「報告専用」で見る。こちらは **壊れていれば必ず学習者に見える／アプリが誤動作する**
 * 種類の欠陥だけを、実際に読み込んだデータに対して検査する（設計判断を含まない）：
 *
 * - 系列・step の id 重複、position の飛び、前題参照（compareWithStepId）の宙づり
 * - ヒントが 3 層（L1・L2・L3）そろっていない
 * - 答えが有限の数でない／solutionSet に answer が入っていない／answerDisplay が別の値を指す
 * - 図マーカーが Figures.tsx の FIGURES 表に無い（`<<...>>` がそのまま見える）・段落の途中に置かれている
 * - KaTeX が構文エラーで赤字になる数式
 * - 数式の外の `$`・閉じていない `**`（記号がそのまま見える）
 * - 数式の外に書いた区間 `[1, 25]` や Obsidian 記法 `[[...]]`（用語リンクに食われて括弧が消える）
 * - 表のセルの中で `$` が割れている（`|` で分割されて数式が壊れる）
 * - 辞書の relatedSeriesId・リダイレクト先・模範文 id の参照切れ
 *
 * 描画の規則は components/Math.tsx の MathText / MathBody をそのまま写している。
 * あちらを変えたら、ここの写しも合わせて変えること。
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { evaluateAnswer, judgeSingle, judgeSolutionSet } from "./answerEval";
import { GLOSSARY } from "./glossary";
import { STATIC_KOKUGO_CATALOG } from "./kokugoCatalog";
import { KOKUGO_MENTOR_TEXTS } from "./mentorTexts";
import { buildStepOpIndexFromSummaries } from "./catalogIndex";
import {
  buildKokugoCatalogIndex,
  buildMathCatalogIndex,
  buildSeriesFileMap,
} from "./catalogIndex.server";
import { buildGlossaryIndex } from "./glossaryIndex";
import { buildStepOpIndex, SERIES_REDIRECTS, STATIC_CATALOG } from "./seriesCatalog";
import { loadStaticSeries } from "./seriesLoaders";

const problems: string[] = [];
const fail = (msg: string) => problems.push(msg);

// ── 図マーカー（Figures.tsx の FIGURES 表にあるもの） ─────────────────
const figuresSrc = fs.readFileSync(
  path.join(__dirname, "..", "src", "components", "Figures.tsx"),
  "utf8",
);
const knownMarkers = new Set(
  [...figuresSrc.matchAll(/^ {2}"(<<[A-Za-z0-9_]+>>)": \w+,$/gm)].map((m) => m[1]),
);
assert.ok(knownMarkers.size > 100, "Figures.tsx の FIGURES から図マーカーを読めなかった");

// ── MathText / MathBody の写し ──────────────────────────────────────
const glossaryTerms = new Set(Object.keys(GLOSSARY));
const mathSpans = new Map<string, string>(); // 数式 → 最初に見つかった場所

/** MathText 1 行ぶん（`**` → `$` → `[用語]` の順に解釈される）。 */
function inspectMathText(where: string, text: string): void {
  const withoutBold = text.replace(/\*\*([^*\n]+)\*\*/g, "$1");
  if (withoutBold.includes("**")) {
    fail(`${where}: 閉じていない ** がそのまま見える：${text.slice(0, 60)}`);
  }
  const mathRe = /\$\$([^$\n]+)\$\$|\$([^$\n]+)\$/g;
  for (const m of text.matchAll(mathRe)) {
    const src = m[1] ?? m[2];
    if (!mathSpans.has(src)) mathSpans.set(src, where);
  }
  const outside = text.replace(mathRe, "");
  if (outside.includes("$")) {
    fail(`${where}: 数式の外の $ がそのまま見える：${text.slice(0, 60)}`);
  }
  if (/<<[A-Za-z0-9_]+>>/.test(outside)) {
    fail(`${where}: 図マーカーが段落の途中にあり、<<...>> がそのまま見える`);
  }
  if (outside.includes("[[")) {
    fail(`${where}: [[...]]（Obsidian 記法）は用語リンクにならず括弧が残る`);
  }
  for (const m of outside.matchAll(/\[([^[\]\n]+)\]/g)) {
    // 辞書に無い [用語] は「設計は今・リンクは前提系列ができるたび」で素通しが正（CLAUDE.md）。
    // ただし数や区間は用語ではない——括弧が消えて意味が変わる。数式 $...$ の中へ入れる。
    if (!glossaryTerms.has(m[1]) && /^[-−\d\s,.π√/+]+$/.test(m[1])) {
      fail(`${where}: 数式の外の [${m[1]}] は括弧が消える（$...$ の中に入れる）`);
    }
  }
}

/** MathBody（段落・図マーカー・ディスプレイ数式・表）。 */
function inspectMathBody(where: string, text: string): void {
  for (const paragraph of text.split(/\n\s*\n/)) {
    const trimmed = paragraph.trim();
    if (/^<<[^>]+>>$/.test(trimmed)) {
      if (!knownMarkers.has(trimmed)) fail(`${where}: 未知の図マーカー ${trimmed}`);
      continue;
    }
    if (/^─{3,}$/.test(trimmed) || /^-{3,}$/.test(trimmed)) continue;
    const display = [...trimmed.matchAll(/\$\$([\s\S]+?)\$\$/g)];
    if (display.length > 0 && trimmed.replace(/\$\$([\s\S]+?)\$\$/g, "").trim() === "") {
      for (const m of display) {
        const src = m[1].trim();
        if (!mathSpans.has(src)) mathSpans.set(src, where);
      }
      continue;
    }
    const lines = trimmed.split("\n");
    const isTable =
      lines.length >= 2 &&
      lines.every((l) => l.trim().startsWith("|") && l.trim().endsWith("|")) &&
      /^\|[\s|:\-]+\|$/.test(lines[1].trim()) &&
      lines[1].includes("-");
    if (isTable) {
      lines.forEach((line, r) => {
        if (r === 1) return;
        for (const cell of line.trim().slice(1, -1).split("|")) {
          if ((cell.match(/\$/g) ?? []).length % 2 !== 0) {
            fail(`${where}: 表のセルで $ が割れている（セル内の | が区切りになる）：${cell.trim()}`);
          } else {
            inspectMathText(`${where}（表）`, cell.trim());
          }
        }
      });
      continue;
    }
    for (const line of lines) inspectMathText(where, line);
  }
}

// ── 数学系列 ────────────────────────────────────────────────────────
const mathIds = new Set<string>();
for (const entry of STATIC_CATALOG) {
  const s = entry.series;
  assert.ok(!mathIds.has(s.id), `カタログに系列 id の重複：${s.id}`);
  mathIds.add(s.id);

  for (const text of [s.title, s.subtitle, s.drivingQuestion, s.revelationLabel, entry.shortDescription]) {
    if (text) inspectMathText(s.id, text);
  }
  if (s.derivation) inspectMathBody(`${s.id}.derivation`, s.derivation);

  const stepIds = new Set<string>();
  s.steps.forEach((st, i) => {
    const w = `${s.id}/${st.id}`;
    if (stepIds.has(st.id)) fail(`${w}: step id の重複`);
    stepIds.add(st.id);
    if (st.position !== i + 1) fail(`${w}: position ${st.position} が並び順 ${i + 1} と違う`);
    if (i === 0) {
      if (st.variationFromPrevious !== null || st.compareWithStepId !== null) {
        fail(`${w}: 先頭 step に前題（variationFromPrevious / compareWithStepId）がある`);
      }
    } else {
      if (!st.variationFromPrevious) fail(`${w}: 2 問目以降なのに変化オペレータが無い`);
      if (st.compareWithStepId && !s.steps.slice(0, i).some((p) => p.id === st.compareWithStepId)) {
        fail(`${w}: 前題 ${st.compareWithStepId} がこの step より前に無い`);
      }
    }

    const layers = st.hints.map((h) => h.layer).join(",");
    if (layers !== "1,2,3") fail(`${w}: ヒントの層が [${layers}]（1,2,3 の順にそろえる）`);
    for (const h of st.hints) {
      if (!h.text.trim()) fail(`${w}: L${h.layer} が空`);
      inspectMathText(`${w}.L${h.layer}`, h.text);
    }
    for (const text of [st.questionText, st.formulaPreview, st.unknownLabel]) {
      inspectMathText(w, text);
    }
    if (st.figureMarker && !knownMarkers.has(st.figureMarker.trim())) {
      fail(`${w}: 未知の図マーカー ${st.figureMarker}`);
    }

    if (!Number.isFinite(st.answer)) fail(`${w}: answer が有限の数でない（${st.answer}）`);
    if (st.solutionSet) {
      if (st.solutionSet.length === 0 || !st.solutionSet.every(Number.isFinite)) {
        fail(`${w}: solutionSet が空か、有限でない値を含む`);
      }
      if (!st.solutionSet.some((v) => Math.abs(v - st.answer) < 1e-9)) {
        fail(`${w}: answer ${st.answer} が solutionSet に入っていない`);
      }
    }
    // answerDisplay は人が読む表示（判定には使わない）。数として読める表示なら、
    // 判定と同じ値を指していないと「正解はこれ」と別の値を見せてしまう。
    if (st.answerDisplay) {
      const ok = st.solutionSet
        ? judgeSolutionSet(st.answerDisplay, st.solutionSet)
        : judgeSingle(st.answerDisplay, st.answer);
      const value = evaluateAnswer(st.answerDisplay);
      if (!ok && !st.solutionSet && value !== null) {
        fail(`${w}: answerDisplay「${st.answerDisplay}」は ${value} を指すが、answer は ${st.answer}`);
      }
    }
  });
}

// リダイレクト：行き先が実在し、旧 id はカタログから外れている
for (const [from, to] of Object.entries(SERIES_REDIRECTS)) {
  if (!mathIds.has(to)) fail(`リダイレクト ${from} → ${to}：行き先がカタログに無い`);
  if (mathIds.has(from)) fail(`リダイレクト ${from}：旧 id がまだカタログにある`);
}

// ── 国語系列 ────────────────────────────────────────────────────────
const mentorIds = new Set(KOKUGO_MENTOR_TEXTS.map((m) => m.id));
assert.equal(mentorIds.size, KOKUGO_MENTOR_TEXTS.length, "模範文 id の重複");
const kokugoIds = new Set<string>();
for (const entry of STATIC_KOKUGO_CATALOG) {
  const s = entry.series;
  assert.ok(!kokugoIds.has(s.id) && !mathIds.has(s.id), `系列 id の重複：${s.id}`);
  kokugoIds.add(s.id);
  for (const text of [s.title, s.subtitle, s.drivingQuestion, entry.shortDescription]) {
    if (text) inspectMathText(s.id, text);
  }
  if (s.authorLandscape) inspectMathBody(`${s.id}.authorLandscape`, s.authorLandscape);
  for (const ref of s.furtherReadingRefs ?? []) {
    if (!mentorIds.has(ref)) fail(`${s.id}: もっと読む ${ref} が mentorTexts に無い`);
  }

  const stepIds = new Set<string>();
  s.steps.forEach((st, i) => {
    const w = `${s.id}/${st.id}`;
    if (stepIds.has(st.id)) fail(`${w}: step id の重複`);
    stepIds.add(st.id);
    if (st.position !== i + 1) fail(`${w}: position ${st.position} が並び順 ${i + 1} と違う`);
    if (i > 0 && !st.variationFromPrevious) fail(`${w}: 2 問目以降なのに変化オペレータが無い`);
    if (st.compareWithStepId && !s.steps.slice(0, i).some((p) => p.id === st.compareWithStepId)) {
      fail(`${w}: 前題 ${st.compareWithStepId} がこの step より前に無い`);
    }
    const layers = st.hints.map((h) => h.layer).join(",");
    if (layers !== "1,2,3") fail(`${w}: ヒントの層が [${layers}]`);
    for (const h of st.hints) inspectMathText(`${w}.L${h.layer}`, h.text);
    inspectMathText(w, st.questionText);
    for (const ref of st.mentorTextRefs ?? []) {
      if (!mentorIds.has(ref)) fail(`${w}: 模範文 ${ref} が mentorTexts に無い`);
    }
    const input = st.input;
    if (input?.type === "choice") {
      if (!(input.answerIndex >= 0 && input.answerIndex < input.options.length)) {
        fail(`${w}: answerIndex ${input.answerIndex} が選択肢の範囲外`);
      }
      if (new Set(input.options).size !== input.options.length) fail(`${w}: 同じ選択肢が 2 つある`);
    }
    if (input?.type === "reorder") {
      const sorted = [...input.answerOrder].sort((a, b) => a - b).join(",");
      if (sorted !== input.segments.map((_, j) => j).join(",")) {
        fail(`${w}: answerOrder が segments の並べ替えになっていない`);
      }
    }
  });
}

// ── 辞書 ────────────────────────────────────────────────────────────
for (const [term, entry] of Object.entries(GLOSSARY)) {
  if (entry.relatedSeriesId && !mathIds.has(entry.relatedSeriesId) && !kokugoIds.has(entry.relatedSeriesId)) {
    fail(`辞書[${term}]: relatedSeriesId ${entry.relatedSeriesId} がカタログに無い`);
  }
  inspectMathText(`辞書[${term}].short`, entry.short);
  for (const key of ["easy", "meaning", "figures", "scenes", "relatedTerms"] as const) {
    const text = entry[key];
    if (text) inspectMathBody(`辞書[${term}].${key}`, text);
  }
}

// ── KaTeX（構文エラーは赤字で学習者に見える） ─────────────────────────
for (const [src, where] of mathSpans) {
  try {
    katex.renderToString(src, { throwOnError: true, strict: "ignore" });
  } catch (e) {
    fail(`${where}: KaTeX 構文エラー $${src.slice(0, 60)}$ → ${(e as Error).message.split("\n")[0]}`);
  }
}

// ── バンドル分割の索引・ローダー（2026-10-11）が、全データ版と同じものを返すか ─────────
// 学習者ページは軽い索引と系列ファイル単位の遅延読み込みで描く。索引やローダーが
// 全データ版（seriesCatalog・glossary）とずれると、カタログや作戦ビューが黙って欠ける。
async function checkSplitIndexes(): Promise<void> {
  const files = await buildSeriesFileMap(); // カタログに読み込み先の無い系列があれば例外
  for (const entry of STATIC_CATALOG) {
    const loaded = await loadStaticSeries(entry.series.id, files);
    if (loaded !== entry.series) {
      fail(`${entry.series.id}: seriesLoaders で読み込んだ系列がカタログの系列と同じものでない`);
    }
  }
  const mathIndex = buildMathCatalogIndex();
  assert.equal(mathIndex.length, STATIC_CATALOG.length);
  const fromSummaries = buildStepOpIndexFromSummaries(mathIndex.map((e) => e.series));
  const fromFull = buildStepOpIndex();
  for (const entry of STATIC_CATALOG) {
    for (const step of entry.series.steps) {
      const key = `${entry.series.id}::${step.id}`;
      if (fromSummaries.get(key) !== fromFull.get(key)) {
        fail(`${key}: 索引のオペレータが全データ版と違う`);
      }
    }
  }
  assert.equal(buildKokugoCatalogIndex().length, STATIC_KOKUGO_CATALOG.length);
  const glossaryIndex = buildGlossaryIndex(GLOSSARY);
  for (const [term, entry] of Object.entries(GLOSSARY)) {
    const lite = glossaryIndex[term];
    if (
      !lite ||
      lite.short !== entry.short ||
      lite.hasDetail !== Boolean(entry.easy || entry.meaning) ||
      lite.relatedSeriesId !== entry.relatedSeriesId
    ) {
      fail(`辞書[${term}]: 索引が辞書本体と違う`);
    }
  }
}

checkSplitIndexes()
  .then(() => {
    if (problems.length > 0) {
      console.error(problems.map((p) => `  ✗ ${p}`).join("\n"));
      assert.fail(`教材データに ${problems.length} 件の欠陥`);
    }
    console.log(
      `dataIntegrity: 数学 ${mathIds.size} 系列・国語 ${kokugoIds.size} 系列・辞書 ${glossaryTerms.size} 語・数式 ${mathSpans.size} 種を検査、欠陥なし`,
    );
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
