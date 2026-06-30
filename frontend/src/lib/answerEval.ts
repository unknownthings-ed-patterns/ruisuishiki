/**
 * 学習者の解答入力を安全に数値評価する評価器。
 *
 * 設計の正：docs/answer_input_extension_design.md
 *
 * 方針：
 * - `eval()` は使わない。トークナイザ＋再帰下降パーサで数式を float に評価する。
 * - 後方互換が最重要：整数・小数・分数 `a/b` は従来の `parseAnswer`（parseFloat ベース）
 *   とビット同一の結果を返す。パース不能は `null`。
 * - 拡張：π（`π`/`pi`）・根号（`√3`/`√(3)`/`sqrt(3)`）・`+ - * /`・括弧・暗黙の積。
 *
 * 静的配信（バックエンド無し）の制約下では、記号代数の厳密同値判定は使えないので、
 * 数値評価＋許容誤差で根号値も π 角も同じ仕組みで扱う（設計 §1〜2）。
 */

/** 判定の許容誤差。設計の判断ずみ事項①：厳密（記号入力を促す）。 */
export const ANSWER_TOL = 1e-6;

/**
 * 入力文字列の全角を半角に正規化する。
 * 日本語入力モードのまま答えても自然に通るように。
 *
 * 対応：
 * - 全角数字 ０１２３４５６７８９ → 半角 0123456789
 * - 全角ピリオド／句点 ． 。 → 半角 .
 * - 全角コンマ／読点 ， 、 → 半角 ,
 * - 全角スラッシュ ／ → 半角 /
 * - 全角マイナス／長音／ダッシュ ー − – — → 半角 -
 * - 全角プラス ＋ → 半角 +
 * - 全角アスタリスク ＊ → 半角 *
 * - 全角丸括弧 （ ） → 半角 ( )
 */
export function normalizeInput(input: string): string {
  return input
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[．。]/g, ".")
    .replace(/[，、]/g, ",")
    .replace(/／/g, "/")
    .replace(/[ー−–—―]/g, "-")
    .replace(/＋/g, "+")
    .replace(/＊/g, "*")
    .replace(/（/g, "(")
    .replace(/）/g, ")");
}

// ── トークナイザ ──────────────────────────────────────────────

type Token =
  | { kind: "num"; value: number }
  | { kind: "pi" }
  | { kind: "sqrt" }
  | { kind: "op"; value: "+" | "-" | "*" | "/" }
  | { kind: "lparen" }
  | { kind: "rparen" };

/**
 * 文字列をトークン列に分解する。未知の文字に当たったら null（＝パース不能）。
 * 空白は無視。π・√ の記号も pi・sqrt の英単語も受ける。
 */
function tokenize(s: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];

    // 空白は読み飛ばす
    if (c === " " || c === "\t" || c === "\n" || c === "\r") {
      i++;
      continue;
    }

    // 数（整数・小数。先頭ドット .5 も許容）
    if ((c >= "0" && c <= "9") || c === ".") {
      let j = i;
      let dotSeen = false;
      while (j < s.length) {
        const d = s[j];
        if (d >= "0" && d <= "9") {
          j++;
        } else if (d === "." && !dotSeen) {
          dotSeen = true;
          j++;
        } else {
          break;
        }
      }
      const text = s.slice(i, j);
      // "." 単体は数値でない
      if (text === ".") return null;
      const value = parseFloat(text);
      if (Number.isNaN(value)) return null;
      tokens.push({ kind: "num", value });
      i = j;
      continue;
    }

    // 記号 π・√
    if (c === "π") {
      tokens.push({ kind: "pi" });
      i++;
      continue;
    }
    if (c === "√") {
      tokens.push({ kind: "sqrt" });
      i++;
      continue;
    }

    // 英字の並び（pi / sqrt）。大文字小文字は無視。
    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
      let j = i;
      while (j < s.length) {
        const d = s[j];
        if ((d >= "a" && d <= "z") || (d >= "A" && d <= "Z")) j++;
        else break;
      }
      const word = s.slice(i, j).toLowerCase();
      if (word === "pi") tokens.push({ kind: "pi" });
      else if (word === "sqrt") tokens.push({ kind: "sqrt" });
      else return null; // 未知の英単語
      i = j;
      continue;
    }

    // 演算子・括弧
    if (c === "+" || c === "-" || c === "*" || c === "/") {
      tokens.push({ kind: "op", value: c });
      i++;
      continue;
    }
    if (c === "(") {
      tokens.push({ kind: "lparen" });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ kind: "rparen" });
      i++;
      continue;
    }

    // 未知の文字（カンマ含む。複数解の分割は呼び出し側で済ませる）
    return null;
  }
  return tokens;
}

// ── 再帰下降パーサ ────────────────────────────────────────────
//
// 文法（左から右へ評価。暗黙の積は term レベルで隣接により発生）：
//
//   expression := ('+'|'-')? term ( ('+'|'-') term )*
//   term       := factor ( ('*'|'/')? factor )*     // 演算子省略＝暗黙の積
//   factor     := ('√'|'sqrt') factor               // 根号は次の factor に束縛
//               | ('-'|'+') factor                   // 単項符号
//               | primary
//   primary    := number | π | '(' expression ')'
//
// √ が primary でなく factor に効くので、√3/2 は (√3)/2 ではなく √(3) を作ったあと
// term 側で /2 される（= sqrt(3)/2 ≈ 0.866）。一方 2√3 は term で 2 と √3 が隣接 →
// 2 * sqrt(3)。-1/√2 は expression 単項マイナス → -(1/√2)。

class Parser {
  private pos = 0;
  constructor(private readonly tokens: Token[]) {}

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private next(): Token | undefined {
    return this.tokens[this.pos++];
  }

  /** トークンを使い切るまで式を評価。失敗（構文エラー）は例外。 */
  parse(): number {
    const value = this.parseExpression();
    if (this.pos !== this.tokens.length) {
      throw new Error("unexpected trailing tokens");
    }
    return value;
  }

  private parseExpression(): number {
    // 先頭の単項符号
    let sign = 1;
    let t = this.peek();
    while (t && t.kind === "op" && (t.value === "+" || t.value === "-")) {
      if (t.value === "-") sign = -sign;
      this.next();
      t = this.peek();
    }
    let value = sign * this.parseTerm();

    for (;;) {
      const op = this.peek();
      if (op && op.kind === "op" && (op.value === "+" || op.value === "-")) {
        this.next();
        const rhs = this.parseTerm();
        value = op.value === "+" ? value + rhs : value - rhs;
      } else {
        break;
      }
    }
    return value;
  }

  private parseTerm(): number {
    let value = this.parseFactor();
    for (;;) {
      const t = this.peek();
      if (!t) break;
      if (t.kind === "op" && (t.value === "*" || t.value === "/")) {
        this.next();
        const rhs = this.parseFactor();
        value = t.value === "*" ? value * rhs : value / rhs;
      } else if (this.startsFactor(t)) {
        // 演算子なしで factor が続く＝暗黙の積（5π, 2√3, 3(…) 等）
        const rhs = this.parseFactor();
        value = value * rhs;
      } else {
        break;
      }
    }
    return value;
  }

  /** そのトークンが factor の開始になりうるか（暗黙の積の判定に使う）。 */
  private startsFactor(t: Token): boolean {
    return (
      t.kind === "num" ||
      t.kind === "pi" ||
      t.kind === "sqrt" ||
      t.kind === "lparen"
    );
    // 注意：op('-'/'+') は暗黙の積の連結に含めない（"2-3" を 2*(-3) にしないため）。
  }

  private parseFactor(): number {
    const t = this.peek();
    if (!t) throw new Error("unexpected end of input");

    if (t.kind === "sqrt") {
      this.next();
      const inner = this.parseFactor();
      if (inner < 0) throw new Error("sqrt of negative");
      return Math.sqrt(inner);
    }
    if (t.kind === "op" && (t.value === "-" || t.value === "+")) {
      this.next();
      const inner = this.parseFactor();
      return t.value === "-" ? -inner : inner;
    }
    return this.parsePrimary();
  }

  private parsePrimary(): number {
    const t = this.next();
    if (!t) throw new Error("unexpected end of input");
    if (t.kind === "num") return t.value;
    if (t.kind === "pi") return Math.PI;
    if (t.kind === "lparen") {
      const value = this.parseExpression();
      const close = this.next();
      if (!close || close.kind !== "rparen") {
        throw new Error("missing closing paren");
      }
      return value;
    }
    throw new Error("unexpected token in primary");
  }
}

/**
 * 学習者の入力を数値として評価する。
 *
 * 受け付ける形式：
 * - 整数・小数：「5」「-3」「0.5」「.5」（全角も OK）
 * - 分数 / 四則：「1/2」「3+4」「(1+2)*3」
 * - π：「π」「pi」「5π」「pi/6」
 * - 根号：「√3」「√(3)」「sqrt(3)」「2√3」「√3/2」
 *
 * 後方互換：整数・小数・`a/b` は従来の parseFloat ベースと同値。
 * パース不能・空文字・不正な構文は null。
 */
export function evaluateAnswer(input: string): number | null {
  if (input == null) return null;
  // 後方互換：旧 parseAnswer はカンマ・空白を除去してから解釈していた
  // （桁区切り「1,080」「30,000」を学習者が打っても通る）。同じ前処理を踏襲する。
  // 複数解パス（judgeSolutionSet）は先にカンマで分割してから各片を渡すので無影響。
  const normalized = normalizeInput(input).replace(/[,\s]/g, "");
  const tokens = tokenize(normalized);
  if (tokens === null || tokens.length === 0) return null;
  try {
    const value = new Parser(tokens).parse();
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * 単数解の判定。`Math.abs(評価値 − 期待値) < TOL`。
 * 入力がパース不能なら false。
 */
export function judgeSingle(
  input: string,
  answer: number,
  tol: number = ANSWER_TOL,
): boolean {
  const parsed = evaluateAnswer(input);
  if (parsed === null) return false;
  return Math.abs(parsed - answer) < tol;
}

/**
 * 複数解の判定（多重集合一致）。
 *
 * - 入力を `,` で分割し、各片を evaluateAnswer に通す。
 * - 期待集合の各要素がちょうど 1 回ずつ・過不足なし・各比較は |diff| < TOL。
 * - 1 つでも評価不能／過不足／不一致なら false。
 *
 * 順不同。重複解（多重集合）は個数まで一致を要求する。
 */
export function judgeSolutionSet(
  input: string,
  solutionSet: number[],
  tol: number = ANSWER_TOL,
): boolean {
  // 空白も区切りに含めず、純粋に "," で分割（空白は evaluateAnswer 側で無視）。
  const pieces = normalizeInput(input)
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // 個数が違えば即不一致（過不足を弾く）
  if (pieces.length !== solutionSet.length) return false;

  const values: number[] = [];
  for (const piece of pieces) {
    const v = evaluateAnswer(piece);
    if (v === null) return false;
    values.push(v);
  }

  // 多重集合一致：期待値それぞれに対し、未消費の入力値からちょうど 1 つ割り当てる。
  const consumed = new Array(values.length).fill(false);
  for (const expected of solutionSet) {
    let matchedIndex = -1;
    for (let k = 0; k < values.length; k++) {
      if (!consumed[k] && Math.abs(values[k] - expected) < tol) {
        matchedIndex = k;
        break;
      }
    }
    if (matchedIndex === -1) return false;
    consumed[matchedIndex] = true;
  }
  // 個数一致を確認済みなので、全期待値が割り当て成功＝過不足なし。
  return true;
}
