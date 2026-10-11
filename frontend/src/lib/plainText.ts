/**
 * authored 文字列（`$...$`・`**強調**`・`[用語]` を含みうる）を、HTML 属性に入れられる
 * 素のテキストへ落とす。
 *
 * 画面に出す authored 文字列は必ず MathText / MathBody を通す（CLAUDE.md「authored 文字列が
 * どの経路で描画されるか」）。ただし `title` 属性（ツールチップ）のように React 要素を
 * 入れられない場所には、記号を剥がした素の文字列が要る。生の文字列を渡すと `$1$` が
 * そのまま見える。
 *
 * 完全な LaTeX → 読み下し変換ではない。系列タイトル程度の短い数式（`$1$`・`$i$`・
 * `$(x^\alpha)'$`）が自然に読める範囲だけを扱う。
 */

const COMMANDS: Record<string, string> = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  theta: "θ",
  lambda: "λ",
  mu: "μ",
  pi: "π",
  sigma: "σ",
  varphi: "φ",
  phi: "φ",
  omega: "ω",
  infty: "∞",
  le: "≤",
  leq: "≤",
  ge: "≥",
  geq: "≥",
  ne: "≠",
  neq: "≠",
  times: "×",
  div: "÷",
  cdot: "·",
  cdots: "…",
  ldots: "…",
  dots: "…",
  to: "→",
  in: "∈",
  angle: "∠",
  circ: "°",
  square: "□",
  pm: "±",
};

function latexToPlain(math: string): string {
  return math
    .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2")
    .replace(/\\sqrt\{([^{}]*)\}/g, "√$1")
    .replace(/\\(?:mathrm|text|vec|overline|bar)\{([^{}]*)\}/g, "$1")
    .replace(/\\([a-zA-Z]+)/g, (_, name: string) => COMMANDS[name] ?? "")
    .replace(/\\[,;:! ]/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function toPlainText(text: string): string {
  // 数式の中の角括弧（区間 [1, 25] 等）は残し、数式の外の [用語] だけ括弧を外す
  // （MathText が用語リンクにするのと同じ振る舞い）。
  const parts: string[] = [];
  const regex = /\$\$([^$]+)\$\$|\$([^$\n]+)\$/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    parts.push(text.slice(last, match.index).replace(/\[([^[\]\n]+)\]/g, "$1"));
    parts.push(latexToPlain(match[1] ?? match[2]));
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last).replace(/\[([^[\]\n]+)\]/g, "$1"));
  return parts.join("").replace(/\*\*/g, "");
}
