/**
 * 数学Ⅱ・B の系列カタログ。
 * 三角関数の周期性・対数。
 */

import type { LearnerSeries } from "./types";

/** T1: 三角関数の周期性。x°を[0°,360°)に正規化 */
export const ALGEBRA2_TRIG_PERIOD_SERIES: LearnerSeries = {
  id: "algebra2_trig_period_01",
  title: "三角関数の周期",
  subtitle:
    "$\\sin x°, \\cos x°$ は 360° ごとに同じ値。x を [0°, 360°) に直す5問。",
  patternId: "T1",
  unit: "algebra_2",
  revelationLabel: "角度を 360° で割った余りが、基本周期での同値角",
  derivation: `**三角関数は「単位円上の座標」**

$\\sin\\theta$ や $\\cos\\theta$ は、もともと **単位円**（半径 1 の円）の上の点の座標で定義されます。

単位円の中心を原点とし、x 軸の正の向きから **角度 $\\theta$ 回転** した点を考えると、その座標は：

$$(\\cos\\theta,\\ \\sin\\theta)$$

つまり、$\\cos$ が **x 座標**、$\\sin$ が **y 座標**。

**「1 周回ると戻る」から周期 360°**

円を1周回ると、もとの位置に戻ります。だから：

$$\\sin(\\theta + 360°) = \\sin\\theta,\\quad \\cos(\\theta + 360°) = \\cos\\theta$$

これが **三角関数の周期性**——$360°$ ごとに同じ値を取ります。

**$\\sin 370°$ は $\\sin 10°$ と同じ**

$370°$ は「$360°$ + $10°$」なので、$10°$ と同じ点。だから $\\sin 370° = \\sin 10°$。

**たくさん回っても同じ**

$\\sin 720°$ は「$360° \\times 2$」で **2 周回って原点に戻る**。だから $\\sin 0° = 0$ と同じ。

一般化すると、**$\\sin$ や $\\cos$ の角度を「360 で割った余り」** に変換すると、$0°$〜$360°$ の範囲の **同じ値の角** に直せます。

$$\\theta_{\\text{基本}} = \\theta \\bmod 360°$$

「mod」（モッド）は割り算の余りを表す記号。たとえば $370 \\bmod 360 = 10$、$540 \\bmod 360 = 180$、$720 \\bmod 360 = 0$。

**周期 360° の意味**

「360°（または $2\\pi$）ごとに同じ値を繰り返す」——この性質を **周期 $360°$** と言います。三角関数の最も基本的な性質です。

**負の角度・1 周以上**

- $\\sin(-30°)$ も意味があります。これは時計回りに $30°$ 回転した点。
- $\\sin(1000°)$ なら、$1000 \\bmod 360 = 280$ なので、$\\sin 280°$ と同じ。

**応用：周期は時間や空間にも現れる**

- **季節**：1年（365日）周期
- **波**：音波・光波・電波——すべて周期関数の重ね合わせ
- **円運動**：振り子・歯車・タイヤ

三角関数の周期性は、世界中の **周期的な現象** を記述する基本道具。フーリエ変換という手法を使うと、複雑な信号も三角関数の重ね合わせで表現できます。

**「単位円の1点」を回転させる視点が出発点**——これがすべての三角関数の理解の鍵です。`,
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$\\sin 370°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 10,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "$\\sin$ は 360° ごとに同じ値を取る。" },
        { layer: 2, text: "370° = 360° + 10°。" },
        { layer: 3, text: "$x = 10$。" },
      ],
      formulaPreview: "370 mod 360 = 10",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$\\sin 450°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 90,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ。360° を引く。" },
        { layer: 2, text: "450° - 360° = 90°。" },
        { layer: 3, text: "$x = 90$。" },
      ],
      formulaPreview: "450 mod 360 = 90",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$\\sin 720°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 0,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "360° の2周分。" },
        { layer: 2, text: "720° = 360° × 2 + 0°。" },
        { layer: 3, text: "$x = 0$。" },
      ],
      formulaPreview: "720 mod 360 = 0",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$\\sin 540°$ は、$0° \\leq x < 360°$ では $\\sin x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 180,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "540° から 360° を引く。" },
        { layer: 2, text: "540° - 360° = 180°。" },
        { layer: 3, text: "$x = 180$。" },
      ],
      formulaPreview: "540 mod 360 = 180",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$\\cos 405°$ は、$0° \\leq x < 360°$ では $\\cos x°$ と等しいです。$x$ はいくつでしょう？",
      answer: 45,
      unit: "°",
      unknownLabel: "x",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "$\\sin$ から $\\cos$ に変わっただけ。周期は同じ 360°。",
        },
        { layer: 2, text: "405° - 360° = 45°。" },
        { layer: 3, text: "$x = 45$。" },
      ],
      formulaPreview: "405 mod 360 = 45",
    },
  ],
};

/** L1: 対数の値 log_b(v) */
export const ALGEBRA2_LOG_SERIES: LearnerSeries = {
  id: "algebra2_log_01",
  title: "対数の入り口",
  subtitle:
    "$\\log_b v$ を整数で求める5問。「底を何回かけたら真数になるか」。",
  patternId: "L1",
  unit: "algebra_2",
  revelationLabel: "log_b(v) は「b を何回かけたら v になるか」の回数",
  derivation: `**対数は「指数の逆」**

$\\log_b v$ という記号は、「**底 $b$ を何回かけたら $v$ になるか**」という回数を表します。

$$\\log_2 8 = 3 \\quad \\Longleftrightarrow \\quad 2^3 = 8$$

つまり、対数は **指数関数の逆** の関係にあります。

**指数と対数の対応表**

| 指数の式 | 対数の式 |
|---|---|
| $2^3 = 8$ | $\\log_2 8 = 3$ |
| $3^4 = 81$ | $\\log_3 81 = 4$ |
| $5^2 = 25$ | $\\log_5 25 = 2$ |
| $10^3 = 1000$ | $\\log_{10} 1000 = 3$ |

「$b^x = v$」と「$\\log_b v = x$」は **完全に同じ関係** を、2 通りの記号で書いただけ。

**なぜ対数が必要なのか**

指数は「掛け算を繰り返す」操作で、急激に大きくなります。$2^{30}$ は約 10 億、$2^{40}$ は約 1 兆。こんな大きな数を扱うとき、**指数だけで会話する** と便利です。

「**桁数で大小を語る**」「**かけ算を足し算に直す**」——これが対数の威力。

**対数の3つの基本性質**

| 性質 | 内容 |
|---|---|
| 1. かけ算は足し算 | $\\log_b (xy) = \\log_b x + \\log_b y$ |
| 2. 割り算は引き算 | $\\log_b (x/y) = \\log_b x - \\log_b y$ |
| 3. 指数は係数に下りる | $\\log_b (x^n) = n \\log_b x$ |

これら3つは、指数法則 $b^p \\cdot b^q = b^{p+q}$ などを **逆向き** に翻訳したもの。

たとえば「1 から 100 までの整数の積（$100! = 1 \\cdot 2 \\cdots 100$）」のような巨大な数も、対数で扱えば足し算に変わります。

**現代社会で対数が顔を出す場面**

- **音の大きさ（デシベル dB）**：対数スケール
- **地震のマグニチュード**：マグニチュード 1 違うと、エネルギーは約 32 倍
- **pH（酸性・アルカリ性）**：水素イオン濃度の対数
- **コンピュータの計算量**：二分探索は $\\log_2 n$ 回で答えに辿り着く
- **音楽の音階**：1オクターブで周波数が 2 倍 → 半音は $2^{1/12}$ 倍

「**何倍違うか**」を扱うときに、対数は最も自然な道具です。

**自然対数 $\\ln$ と常用対数**

特に重要な底は：

- **底 $e$（ネイピア数 $\\approx 2.718$）**：自然対数 $\\ln$。微分積分で頻出
- **底 $10$**：常用対数 $\\log$。桁数を直接表すので、桁の話で便利

**指数と対数は「同じものの表と裏」**

$2^3 = 8$ は「$2$ を 3 回かけたら 8」。
$\\log_2 8 = 3$ は「$2$ を **何回**かけたら $8$ になる？ → **3 回**」。

同じ情報を、**指数 → 値** の方向で書くか、**値 → 指数** の方向で書くかの違いだけ。`,
  steps: [
    {
      id: "step1",
      position: 1,
      questionText: "$\\log_2 4$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        { layer: 1, text: "「2 を何回かけたら 4 になるか」を考える。" },
        { layer: 2, text: "$2^2 = 4$。" },
        { layer: 3, text: "答え 2。" },
      ],
      formulaPreview: "2² = 4 → log = 2",
    },
    {
      id: "step2",
      position: 2,
      questionText: "$\\log_2 8$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ手順。" },
        { layer: 2, text: "$2^3 = 8$。" },
        { layer: 3, text: "答え 3。" },
      ],
      formulaPreview: "2³ = 8 → log = 3",
    },
    {
      id: "step3",
      position: 3,
      questionText: "$\\log_3 9$ はいくつでしょう？",
      answer: 2,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "same",
      compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "底が 3 に変わった。「3 を何回かけたら 9」？" },
        { layer: 2, text: "$3^2 = 9$。" },
        { layer: 3, text: "答え 2。" },
      ],
      formulaPreview: "3² = 9 → log = 2",
    },
    {
      id: "step4",
      position: 4,
      questionText: "$\\log_5 125$ はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "「5 を何回かけたら 125」？" },
        { layer: 2, text: "$5^3 = 125$。" },
        { layer: 3, text: "答え 3。" },
      ],
      formulaPreview: "5³ = 125 → log = 3",
    },
    {
      id: "step5",
      position: 5,
      questionText: "$\\log_2 16$ はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "対数の値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "底は 2 に戻ったが、真数が大きく。" },
        { layer: 2, text: "$2^4 = 16$。" },
        { layer: 3, text: "答え 4。" },
      ],
      formulaPreview: "2⁴ = 16 → log = 4",
    },
  ],
};

/** A1: 等差数列の n 項目 */
export const ALGEBRA2_ARITH_NTH_SERIES: LearnerSeries = {
  id: "algebra2_arith_nth_01",
  title: "等差数列の n 項目",
  subtitle:
    "初項と公差から n 項目の値を求める5問。$a_n = a_1 + (n-1)d$。",
  patternId: "A1",
  unit: "algebra_2",
  revelationLabel: "a_n = 初項 + (n − 1) × 公差",
  derivation: `**等差数列の「n 項目」の公式**

初項 $a$、公差 $d$ の等差数列の第 $n$ 項は：

$$a_n = a + (n - 1) d$$

なぜ「$n - 1$」なのか——ここに公式の鍵があります。

**数列を順に書いてみる**

$$\\begin{aligned}
a_1 &= a \\\\
a_2 &= a + d \\\\
a_3 &= a + 2d \\\\
a_4 &= a + 3d \\\\
&\\,\\,\\vdots
\\end{aligned}$$

並べてみると **「公差 $d$ を何回足したか」が項番号より 1 つ少ない** ことに気づきます。

- 2 項目には $d$ を **1 回** 足す
- 3 項目には $d$ を **2 回** 足す
- $n$ 項目には $d$ を **$(n - 1)$ 回** 足す

なぜ「1 つ少ない」かというと、**初項そのもの $a_1$** は $d$ を 1 回も足していないから。「**$n$ 項目に行くまでに、何回ステップを踏んだか**」と考えると $(n-1)$ 回。

**公式の完成**

$$a_n = a + (n - 1) d$$

「**初項に、(項数 - 1) 個の公差を足したもの**」——これが公式の意味。

**たとえば**

初項 1、公差 2 の数列 $1, 3, 5, 7, 9, \\ldots$ の第 10 項：

$$a_{10} = 1 + (10 - 1) \\times 2 = 1 + 18 = 19$$

実際に書き並べると $1, 3, 5, 7, 9, 11, 13, 15, 17, 19$。ちゃんと第 10 項は 19。

**応用：項数が問われる**

逆に、$a_n = ?$ から **項数 $n$ を求める** こともあります。公式を $n$ について解くと：

$$n = \\frac{a_n - a}{d} + 1$$

「**末項から初項を引いて、公差で割って、1 を足す**」。

**等差数列のすべての公式は1つの式から**

| 項目 | 公式 |
|---|---|
| 第 $n$ 項 | $a_n = a + (n-1)d$ |
| 和 $S_n$ | $\\dfrac{n(a + a_n)}{2}$ |
| 項数 | $\\dfrac{a_n - a}{d} + 1$ |

第 $n$ 項の公式さえ覚えれば、和の公式と組み合わせて等差数列のすべての問題を解けます。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "初項 1、公差 2 の等差数列の 5 項目はいくつでしょう？",
      answer: 9, unit: "", unknownLabel: "5 項目の値",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "数列：1, 3, 5, 7, 9, ..." },
        { layer: 2, text: "公式：$a_n = a_1 + (n-1)d = 1 + 4 \\times 2$。" },
        { layer: 3, text: "9。" },
      ],
      formulaPreview: "1 + 4·2 = 9",
    },
    {
      id: "step2", position: 2,
      questionText:
        "初項 2、公差 3 の等差数列の 4 項目はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "4 項目の値",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。" },
        { layer: 2, text: "$2 + 3 \\times 3$。" },
        { layer: 3, text: "11。" },
      ],
      formulaPreview: "2 + 3·3 = 11",
    },
    {
      id: "step3", position: 3,
      questionText:
        "初項 5、公差 2 の等差数列の 10 項目はいくつでしょう？",
      answer: 23, unit: "", unknownLabel: "10 項目の値",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "公式は同じ。" },
        { layer: 2, text: "$5 + 9 \\times 2$。" },
        { layer: 3, text: "23。" },
      ],
      formulaPreview: "5 + 9·2 = 23",
    },
    {
      id: "step4", position: 4,
      questionText:
        "初項 10、公差 -1 の等差数列の 6 項目はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "6 項目の値",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "公差が負（減っていく数列）。" },
        { layer: 2, text: "$10 + 5 \\times (-1)$。" },
        { layer: 3, text: "5。" },
      ],
      formulaPreview: "10 + 5·(-1) = 5",
    },
    {
      id: "step5", position: 5,
      questionText:
        "初項 3、公差 4 の等差数列で、20 項目はいくつでしょう？",
      answer: 79, unit: "", unknownLabel: "20 項目の値",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "項数が大きくなっただけ。公式は同じ。" },
        { layer: 2, text: "$3 + 19 \\times 4$。" },
        { layer: 3, text: "79。" },
      ],
      formulaPreview: "3 + 19·4 = 79",
    },
  ],
};

/** A2: 等差数列の和 */
export const ALGEBRA2_ARITH_SUM_SERIES: LearnerSeries = {
  id: "algebra2_arith_sum_01",
  title: "等差数列の和",
  subtitle:
    "初項・末項・項数から和を求める5問。$S_n = n(a + l) / 2$。",
  patternId: "A2",
  unit: "algebra_2",
  revelationLabel: "S = 項数 × (初項 + 末項) ÷ 2",
  derivation: `**ガウスの少年時代の発見**

「$1 + 2 + 3 + \\cdots + 100$ を計算しなさい」——19世紀ドイツの小学校で、ガウス（当時9歳）に出された課題だったと言われています。

ふつうなら、紙とエンピツで地道に足し算を続けます。でもガウスは数分で答えを出しました。**5050**。

**どうやって？**

ガウスは数字を **両端から組にして** 見たのです：

$$\\underbrace{1 + 100}_{= 101},\\ \\underbrace{2 + 99}_{= 101},\\ \\underbrace{3 + 98}_{= 101},\\ \\ldots,\\ \\underbrace{50 + 51}_{= 101}$$

両端から組を作っていくと、どの組も **和が 101**。組は全部で 50 組できます。だから：

$$1 + 2 + \\cdots + 100 = 101 \\times 50 = 5050$$

**この発想を公式にする**

初項 $a$、末項 $l$、項数 $n$ の等差数列を考えます。両端から組にすると、どの組も和は $a + l$。組の数は項数の半分、$n / 2$。

$$S = (a + l) \\times \\frac{n}{2} = \\frac{n(a + l)}{2}$$

これが等差数列の和の公式。ガウスのアイデアがそのまま式になっています。

**逆順加算でも同じ結果**

別の見方もできます。

$$\\begin{aligned}
S &= a + (a + d) + (a + 2d) + \\cdots + l \\\\
S &= l + (l - d) + (l - 2d) + \\cdots + a \\quad \\text{（逆順）}
\\end{aligned}$$

この2つを足し算すると、各項のペアがすべて $a + l$ になります。$n$ 個のペアができるので：

$$2S = n(a + l) \\quad\\Longrightarrow\\quad S = \\frac{n(a + l)}{2}$$

「逆順を書いて足す」だけで証明完了。これがガウスの発想の正体です。

**項数 $n$ さえわかれば計算できる**

公式は3つの数 $n, a, l$ から和を出します。項数の $n$ は

$$n = \\frac{l - a}{d} + 1$$

で計算できます（初項から末項まで、公差 $d$ で何回進むか + 1）。

**有名な等差数列の和**

| 数列 | 和 |
|---|---|
| $1 + 2 + \\cdots + n$ | $\\dfrac{n(n+1)}{2}$ |
| $1 + 3 + 5 + \\cdots + (2n-1)$（奇数の和） | $n^2$ |
| $2 + 4 + 6 + \\cdots + 2n$（偶数の和） | $n(n+1)$ |

特に「最初の $n$ 個の奇数の和が $n^2$」は美しい性質です。階段状に並べると、$1, 3, 5, 7, \\ldots$ がちょうど正方形を埋めていきます。

ガウスのアイデアは「**逆向きに並べると、対称性が出る**」という発想。これはこの先、もっと複雑な数列でも何度も顔を出します。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "1 から 10 までの整数の和（初項 1、末項 10、項数 10）はいくつでしょう？",
      answer: 55, unit: "", unknownLabel: "和",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$S = n(a + l) / 2$。" },
        { layer: 2, text: "$10 \\times (1 + 10) / 2 = 10 \\times 11 / 2$。" },
        { layer: 3, text: "55。" },
      ],
      formulaPreview: "10·11/2 = 55",
    },
    {
      id: "step2", position: 2,
      questionText:
        "2 から 20 までの偶数の和（初項 2、末項 20、項数 10）はいくつでしょう？",
      answer: 110, unit: "", unknownLabel: "和",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前と同じ公式。" },
        { layer: 2, text: "$10 \\times (2 + 20) / 2$。" },
        { layer: 3, text: "110。" },
      ],
      formulaPreview: "10·22/2 = 110",
    },
    {
      id: "step3", position: 3,
      questionText:
        "1 から 100 までの整数の和（ガウスの故事）はいくつでしょう？",
      answer: 5050, unit: "", unknownLabel: "和",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$100 \\times (1 + 100) / 2$。" },
        { layer: 2, text: "$100 \\times 101 / 2$。" },
        { layer: 3, text: "5050。" },
      ],
      formulaPreview: "100·101/2 = 5050",
    },
    {
      id: "step4", position: 4,
      questionText:
        "1 から 50 までの奇数の和（初項 1、末項 49、項数 25）はいくつでしょう？",
      answer: 625, unit: "", unknownLabel: "和",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "奇数 1, 3, 5, ..., 49 は 25 個。" },
        { layer: 2, text: "$25 \\times (1 + 49) / 2 = 25 \\times 25$。" },
        { layer: 3, text: "625（= 25²）。" },
      ],
      formulaPreview: "25·50/2 = 625",
    },
    {
      id: "step5", position: 5,
      questionText:
        "ボウリングのピン配置：1+2+3+4=10 のように積み上げる。初項 1、末項 20、項数 20 の和はいくつでしょう？",
      answer: 210, unit: "", unknownLabel: "和",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "三角数。公式は同じ。" },
        { layer: 2, text: "$20 \\times (1 + 20) / 2$。" },
        { layer: 3, text: "210。" },
      ],
      formulaPreview: "20·21/2 = 210",
    },
  ],
};

/** VEC1: ベクトルの内積 */
export const ALGEBRA2_DOT_SERIES: LearnerSeries = {
  id: "algebra2_dot_01",
  title: "ベクトルの内積",
  subtitle:
    "2次元ベクトル $(a, b) \\cdot (c, d) = ac + bd$ を求める5問。",
  patternId: "VEC1",
  unit: "algebra_2",
  revelationLabel: "(a, b) · (c, d) = ac + bd",
  derivation: `**ベクトルの内積：「向きの一致度」を測る数**

2つのベクトル $\\vec{u} = (a, b)$ と $\\vec{v} = (c, d)$ の **内積** は：

$$\\vec{u} \\cdot \\vec{v} = ac + bd$$

ただの「成分どうしの積の和」ですが、これは **2つのベクトルが「どれくらい同じ向きを向いているか」を測る数** です。

**3つの場合分け**

| 内積の符号 | 2つのベクトルの関係 |
|---|---|
| 正 ($\\vec{u} \\cdot \\vec{v} > 0$) | 同じ方向に近い（鋭角） |
| 0 ($\\vec{u} \\cdot \\vec{v} = 0$) | **垂直**（直交） |
| 負 ($\\vec{u} \\cdot \\vec{v} < 0$) | 逆方向に近い（鈍角） |

特に「**内積が 0 なら垂直**」は重要な性質。たとえば $(1, 0)$（x 軸方向）と $(0, 1)$（y 軸方向）の内積は $1 \\cdot 0 + 0 \\cdot 1 = 0$。これらは確かに直交しています。

**なぜ $ac + bd$ で「向きの一致度」が測れるか**

内積には、もう1つの表現があります：

$$\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos\\theta$$

ここで $|\\vec{u}|, |\\vec{v}|$ は各ベクトルの **大きさ**、$\\theta$ は2つのベクトルがなす **角度**。

- $\\theta = 0°$（同じ方向）なら $\\cos\\theta = 1$ で **内積最大**
- $\\theta = 90°$（垂直）なら $\\cos\\theta = 0$ で **内積はゼロ**
- $\\theta = 180°$（反対方向）なら $\\cos\\theta = -1$ で **内積最小（負）**

$\\cos\\theta$ の値そのものが「向きの一致度」だから、これに各ベクトルの大きさを掛けた値が内積。

**2つの定義が一致する理由**

実は $ac + bd$ と $|\\vec{u}| |\\vec{v}| \\cos\\theta$ は **完全に同じ値** になります。これは余弦定理（三角形の辺と角度の関係）を使って証明されます。

つまり、内積は「**成分から計算する手軽な方法**」（$ac + bd$）と「**意味を表す式**」（$|\\vec{u}| |\\vec{v}| \\cos\\theta$）の2つの顔を持ちます。

**応用：垂直判定が一瞬で**

成分が与えられたら、$ac + bd$ を計算するだけで、2 つのベクトルが垂直かどうか判定できます。

例：$\\vec{u} = (3, 4)$、$\\vec{v} = (4, -3)$ の場合：

$$\\vec{u} \\cdot \\vec{v} = 3 \\cdot 4 + 4 \\cdot (-3) = 12 - 12 = 0$$

垂直！

**応用：仕事量・なす角の計算**

物理では、力 $\\vec{F}$ と移動方向 $\\vec{s}$ の内積が「**仕事量**」を表します。「力の向き」と「移動の向き」がずれているほど、仕事は少なくなる——これも内積の意味です。

「**ただの成分の積の和**」が、こんなに豊かな意味を持っています。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText:
        "$\\vec{u} = (1, 2)$, $\\vec{v} = (3, 4)$ の内積 $\\vec{u} \\cdot \\vec{v}$ はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "内積",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "公式：$ac + bd$。" },
        { layer: 2, text: "$1 \\times 3 + 2 \\times 4 = 3 + 8$。" },
        { layer: 3, text: "11。" },
      ],
      formulaPreview: "1·3 + 2·4 = 11",
    },
    {
      id: "step2", position: 2,
      questionText:
        "$\\vec{u} = (2, 1)$, $\\vec{v} = (3, 5)$ の内積はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "内積",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "公式は同じ。" },
        { layer: 2, text: "$2 \\times 3 + 1 \\times 5 = 6 + 5$。" },
        { layer: 3, text: "11。" },
      ],
      formulaPreview: "2·3 + 1·5 = 11",
    },
    {
      id: "step3", position: 3,
      questionText:
        "$\\vec{u} = (3, 4)$, $\\vec{v} = (2, 1)$ の内積はいくつでしょう？",
      answer: 10, unit: "", unknownLabel: "内積",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$3 \\times 2 + 4 \\times 1$。" },
        { layer: 2, text: "$6 + 4$。" },
        { layer: 3, text: "10。" },
      ],
      formulaPreview: "3·2 + 4·1 = 10",
    },
    {
      id: "step4", position: 4,
      questionText:
        "$\\vec{u} = (-1, 2)$, $\\vec{v} = (3, 4)$ の内積はいくつでしょう？",
      answer: 5, unit: "", unknownLabel: "内積",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "負の数があるが公式は同じ。" },
        { layer: 2, text: "$(-1) \\times 3 + 2 \\times 4 = -3 + 8$。" },
        { layer: 3, text: "5。" },
      ],
      formulaPreview: "(-1)·3 + 2·4 = 5",
    },
    {
      id: "step5", position: 5,
      questionText:
        "$\\vec{u} = (5, 0)$, $\\vec{v} = (0, 5)$ の内積はいくつでしょう？（垂直なベクトル）",
      answer: 0, unit: "", unknownLabel: "内積",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "$5 \\times 0 + 0 \\times 5$。" },
        { layer: 2, text: "$0 + 0 = 0$。" },
        { layer: 3, text: "0。内積が 0 のとき2ベクトルは垂直。" },
      ],
      formulaPreview: "5·0 + 0·5 = 0",
    },
  ],
};

/** DIFF1: 微分 f'(1) for f(x) = a·x^n */
export const ALGEBRA2_DIFF_SERIES: LearnerSeries = {
  id: "algebra2_diff_01",
  title: "微分の入り口",
  subtitle:
    "$f(x) = a x^n$ を微分して $x = 1$ での値 $f'(1)$ を求める5問。",
  patternId: "DIFF1",
  unit: "algebra_2",
  revelationLabel: "f(x) = ax^n の f'(x) = anx^(n-1)。f'(1) = a × n",
  derivation: `**微分とは「変化の速さ」**

関数 $f(x)$ を **微分** した式を $f'(x)$ と書きます。これは「**$x$ がほんの少し増えたとき、$f(x)$ がどれくらい増えるか**」——つまり **変化の速さ** を表す関数です。

**多項式の微分公式**

$f(x) = x^n$ を微分すると：

$$f'(x) = n \\cdot x^{n-1}$$

「**指数を前に下ろして、指数を 1 つ減らす**」——これが微分の基本ルール。

| もとの関数 | 微分 |
|---|---|
| $f(x) = x$ | $f'(x) = 1$ |
| $f(x) = x^2$ | $f'(x) = 2x$ |
| $f(x) = x^3$ | $f'(x) = 3x^2$ |
| $f(x) = x^4$ | $f'(x) = 4x^3$ |
| $f(x) = a x^n$ | $f'(x) = a n x^{n-1}$ |

**なぜ「指数を前に下ろす」？**

直感的には、$x^n$ という関数のグラフの **傾き** を考えます。$n$ が大きいほど、$x$ が増えたときの値の増え方は **急** になります。だから、$n$ を係数として前に出すのは、「速さに $n$ がどれだけ効くか」の表現。

正式には、「微分の定義」（極限を使う）から：

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$

これを $f(x) = x^n$ で計算すると、二項定理を使って **$n x^{n-1}$** が出てきます。

**微分の幾何学的意味：接線の傾き**

$f'(a)$ は、グラフ $y = f(x)$ の点 $(a, f(a))$ における **接線の傾き** を表します。

たとえば $f(x) = x^2$ なら $f'(x) = 2x$。点 $(1, 1)$ での接線の傾きは $f'(1) = 2$。グラフを描くと、確かに $(1, 1)$ を通る接線が傾き $2$ で引けます。

**微分の応用：最大・最小**

関数の **最大値・最小値** は、微分を使って見つけられます。

- $f'(x) = 0$ となる $x$ が、極大・極小の候補
- $f'(x) > 0$ なら関数は **増加中**、$f'(x) < 0$ なら **減少中**

これが最適化問題の基本道具になります。

**微分は「変化を見る顕微鏡」**

物理では「位置 → 速度 → 加速度」も微分の連鎖。

- 位置 $x(t)$ を微分 → **速度** $v(t) = x'(t)$
- 速度を微分 → **加速度** $a(t) = v'(t)$

経済学・工学・統計学・機械学習……あらゆる分野で「変化の速さ」を扱うのに、微分は必須の道具。

ニュートンとライプニッツが17世紀に独立に発見したこの道具は、現代科学のすべての分野で使われ続けています。「**$x^n$ を $n x^{n-1}$ に変える**」というシンプルなルールが、世界を読み解く鍵なのです。`,
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$f(x) = 2x^3$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "$\\dfrac{d}{dx}(x^n) = n x^{n-1}$。" },
        { layer: 2, text: "$f'(x) = 6x^2$。$f'(1) = 6 \\times 1^2$。" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "2 × 3 = 6",
    },
    {
      id: "step2", position: 2,
      questionText: "$f(x) = 3x^2$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 6, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "$f'(x) = 6x$。" },
        { layer: 2, text: "$f'(1) = 6$。" },
        { layer: 3, text: "6。" },
      ],
      formulaPreview: "3 × 2 = 6",
    },
    {
      id: "step3", position: 3,
      questionText: "$f(x) = x^4$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 4, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: "same", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "$f'(x) = 4x^3$。" },
        { layer: 2, text: "$f'(1) = 4$。" },
        { layer: 3, text: "4。" },
      ],
      formulaPreview: "1 × 4 = 4",
    },
    {
      id: "step4", position: 4,
      questionText: "$f(x) = 5x^3$ のとき、$f'(1)$ はいくつでしょう？",
      answer: 15, unit: "", unknownLabel: "f'(1)",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "$f'(x) = 15x^2$。" },
        { layer: 2, text: "$f'(1) = 15$。" },
        { layer: 3, text: "15。" },
      ],
      formulaPreview: "5 × 3 = 15",
    },
    {
      id: "step5", position: 5,
      questionText: "$g(y) = 2y^4$ のとき、$g'(1)$ はいくつでしょう？",
      answer: 8, unit: "", unknownLabel: "g'(1)",
      variationFromPrevious: "qualitative", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "変数記号が $y$ になっただけ。$g'(y) = 8y^3$。" },
        { layer: 2, text: "$g'(1) = 8$。" },
        { layer: 3, text: "8。" },
      ],
      formulaPreview: "2 × 4 = 8",
    },
  ],
};

/** G1: 等比数列の n 項目 a_n = a × r^(n-1) */
export const ALGEBRA2_GEO_NTH_SERIES: LearnerSeries = {
  id: "algebra2_geo_nth_01",
  title: "等比数列の n 項目",
  subtitle:
    "初項と公比から n 項目を求める10問。$a_n = a \\times r^{n-1}$。",
  patternId: "G1",
  unit: "algebra_2",
  revelationLabel: "a_n = 初項 × 公比^(n − 1)",
  derivation: `**等比数列の「n 項目」**

初項 $a$、公比 $r$ の等比数列の第 $n$ 項：

$$a_n = a \\cdot r^{n - 1}$$

等差数列が「**$d$ を $(n-1)$ 回 足す**」のに対して、等比数列は「**$r$ を $(n-1)$ 回 掛ける**」。

**数列を順に書いてみる**

$$\\begin{aligned}
a_1 &= a \\\\
a_2 &= a \\cdot r \\\\
a_3 &= a \\cdot r^2 \\\\
a_4 &= a \\cdot r^3 \\\\
&\\,\\,\\vdots
\\end{aligned}$$

「公比 $r$ を何回掛けたか」が項番号より 1 つ少ない。等差数列とまったく同じ理屈です（「足す」が「掛ける」になっただけ）。

**たとえば**

初項 1、公比 2 の数列 $1, 2, 4, 8, 16, \\ldots$ の第 10 項：

$$a_{10} = 1 \\cdot 2^{10 - 1} = 2^9 = 512$$

倍々に増えていく数列は、**指数関数的** に大きくなります。

**指数関数的成長の威力：「倍々ゲーム」の体感**

伝説のチェス盤の話があります。「**1 マス目に米1粒、2 マス目に2粒、3 マス目に4粒、…**」と倍々に置いていくと、64 マス目には：

$$a_{64} = 1 \\cdot 2^{63} = 約 920京（9.2 \\times 10^{18}）粒$$

世界中の米全部を集めても足りない量になります。等比数列の本領は、この **指数関数的増加** にあります。

**等差と等比の比較**

| | 等差数列 | 等比数列 |
|---|---|---|
| 操作 | 公差 $d$ を **足す** | 公比 $r$ を **掛ける** |
| 第 $n$ 項 | $a + (n-1)d$ | $a \\cdot r^{n-1}$ |
| 増え方 | 一定（直線的） | 倍々（指数的） |

公式の構造は同じ。「足す世界」と「掛ける世界」の対応関係になっています。

**$r$ が1未満なら「減る等比数列」**

$0 < r < 1$ のときは、項を進めるたびに値が小さくなります。たとえば $r = 0.5$ なら：

$$1, 0.5, 0.25, 0.125, 0.0625, \\ldots$$

これは「半減期」の話などで実生活にも顔を出します。指数関数的に減っていくのです。`,
  steps: [
    { id: "step1", position: 1, questionText: "初項 1、公比 2 の等比数列の 4 項目はいくつでしょう？", answer: 8, unit: "", unknownLabel: "4 項目", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "数列：1, 2, 4, 8, ..." }, { layer: 2, text: "$1 \\times 2^3$。" }, { layer: 3, text: "8。" }], formulaPreview: "1·2³ = 8" },
    { id: "step2", position: 2, questionText: "初項 1、公比 2 の等比数列の 5 項目はいくつでしょう？", answer: 16, unit: "", unknownLabel: "5 項目", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "前の続き。" }, { layer: 2, text: "$1 \\times 2^4$。" }, { layer: 3, text: "16。" }], formulaPreview: "1·2⁴ = 16" },
    { id: "step3", position: 3, questionText: "初項 2、公比 3 の等比数列の 3 項目はいくつでしょう？", answer: 18, unit: "", unknownLabel: "3 項目", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "数列：2, 6, 18, ..." }, { layer: 2, text: "$2 \\times 3^2$。" }, { layer: 3, text: "18。" }], formulaPreview: "2·3² = 18" },
    { id: "step4", position: 4, questionText: "初項 1、公比 3 の等比数列の 4 項目はいくつでしょう？", answer: 27, unit: "", unknownLabel: "4 項目", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "数列：1, 3, 9, 27, ..." }, { layer: 2, text: "$1 \\times 3^3$。" }, { layer: 3, text: "27。" }], formulaPreview: "1·3³ = 27" },
    { id: "step5", position: 5, questionText: "初項 1、公比 2 の等比数列の 8 項目はいくつでしょう？", answer: 128, unit: "", unknownLabel: "8 項目", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "倍々ゲーム。" }, { layer: 2, text: "$2^7$。" }, { layer: 3, text: "128。" }], formulaPreview: "1·2⁷ = 128" },
    { id: "step6", position: 6, questionText: "初項 3、公比 2 の等比数列の 5 項目はいくつでしょう？", answer: 48, unit: "", unknownLabel: "5 項目", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$3 \\times 2^4$。" }, { layer: 2, text: "$3 \\times 16$。" }, { layer: 3, text: "48。" }], formulaPreview: "3·2⁴ = 48" },
    { id: "step7", position: 7, questionText: "初項 2、公比 3 の等比数列の 5 項目はいくつでしょう？", answer: 162, unit: "", unknownLabel: "5 項目", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$2 \\times 3^4$。" }, { layer: 2, text: "$2 \\times 81$。" }, { layer: 3, text: "162。" }], formulaPreview: "2·3⁴ = 162" },
    { id: "step8", position: 8, questionText: "初項 1、公比 4 の等比数列の 4 項目はいくつでしょう？", answer: 64, unit: "", unknownLabel: "4 項目", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "公比が大きい。$1 \\times 4^3$。" }, { layer: 2, text: "$4^3 = 64$。" }, { layer: 3, text: "64。" }], formulaPreview: "1·4³ = 64" },
    { id: "step9", position: 9, questionText: "初項 1、公比 2 の等比数列の 10 項目はいくつでしょう？", answer: 512, unit: "", unknownLabel: "10 項目", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$2^9$。" }, { layer: 2, text: "512。" }, { layer: 3, text: "512。" }], formulaPreview: "1·2⁹ = 512" },
    { id: "step10", position: 10, questionText: "初項 1、公比 10 の数列の 4 項目はいくつでしょう？（10進法の桁の正体）", answer: 1000, unit: "", unknownLabel: "4 項目", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "公比 10 は 10 倍ずつ。" }, { layer: 2, text: "1, 10, 100, 1000, ..." }, { layer: 3, text: "1000。10進法の桁はこれ。" }], formulaPreview: "1·10³ = 1000" },
  ],
};

/** G2: 等比数列の和 S = a(r^n - 1)/(r - 1) */
export const ALGEBRA2_GEO_SUM_SERIES: LearnerSeries = {
  id: "algebra2_geo_sum_01",
  title: "等比数列の和",
  subtitle: "等比数列の和を求める10問。指数の指数的増加。",
  patternId: "G2",
  unit: "algebra_2",
  revelationLabel: "S = 初項 × (公比^n − 1) ÷ (公比 − 1)",
  derivation: `**等比数列の和の公式の正体**

初項 $a$、公比 $r$、項数 $n$ の等比数列の和：

$$S = a + ar + ar^2 + ar^3 + \\cdots + ar^{n-1}$$

これを **公式** で計算するなら：

$$S = \\frac{a(r^n - 1)}{r - 1}\\quad(r \\neq 1)$$

「えっ、こんな複雑な式どこから出てきたの？」と最初は思います。でも、ガウスの等差数列の和と同じく、**ちょっとした技** で出てきます。

**両辺に $r$ を掛けてみる**

$S$ の式の **両辺に公比 $r$ を掛ける** と：

$$rS = ar + ar^2 + ar^3 + \\cdots + ar^{n-1} + ar^n$$

これと元の $S$ を **並べて比べる**：

$$\\begin{aligned}
S &= a + ar + ar^2 + \\cdots + ar^{n-1} \\\\
rS &= \\phantom{a +\\ } ar + ar^2 + \\cdots + ar^{n-1} + ar^n
\\end{aligned}$$

**真ん中の項がそっくり同じ**！

両辺を引き算すると、真ん中がごっそり消えて：

$$rS - S = ar^n - a$$

左辺をまとめて：

$$S(r - 1) = a(r^n - 1)$$

両辺を $r - 1$ で割ると：

$$S = \\frac{a(r^n - 1)}{r - 1}$$

これが公式の出所。「**1 つ右にずらして引く**」だけで証明完了。

**なぜこの技が効くのか**

等比数列は「次の項は前の項を $r$ 倍したもの」という性質を持っています。だから、もとの数列を「$r$ 倍して書く」と、項どうしがずれて、ほとんどが打ち消し合う構造になっているのです。

ガウスの等差数列の技が「逆順を書いて足す」だったのに対し、等比数列は「**$r$ 倍をして引く**」。どちらも **対称性の利用** という発想は同じ。

**有名な例**

| 数列 | 和 |
|---|---|
| $1 + 2 + 4 + \\cdots + 2^{n-1}$ | $2^n - 1$ |
| $1 + 3 + 9 + \\cdots + 3^{n-1}$ | $(3^n - 1)/2$ |

特に「2倍ずつ増える」場合の和は、$2^n - 1$ という極めてシンプルな形になります。コンピュータの 2 進法とも関係する、$2^n - 1$（メルセンヌ数）と同じ形です。

**「$r = 1$ のときは別扱い」**

公式の分母に $r - 1$ があるので、$r = 1$ では割り算ができません。でも $r = 1$ なら、数列は $a, a, a, \\ldots$ と同じ値が並ぶだけなので、和は単に $S = na$ です（$n$ 個足すだけ）。

公式は「公比が 1 でない等比数列」を対象にしている、という前提があります。`,
  steps: [
    { id: "step1", position: 1, questionText: "初項 1、公比 2 の等比数列の最初の 3 項の和（1+2+4）はいくつでしょう？", answer: 7, unit: "", unknownLabel: "和", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "公式：$a(r^n - 1)/(r - 1)$。" }, { layer: 2, text: "$1 \\times (2^3 - 1) / (2 - 1) = 7/1$。" }, { layer: 3, text: "7。" }], formulaPreview: "1·(2³-1)/1 = 7" },
    { id: "step2", position: 2, questionText: "初項 1、公比 2 の最初の 4 項の和は？", answer: 15, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "$(2^4 - 1)/1$。" }, { layer: 2, text: "$16 - 1$。" }, { layer: 3, text: "15。" }], formulaPreview: "(2⁴-1) = 15" },
    { id: "step3", position: 3, questionText: "初項 1、公比 2 の最初の 5 項の和は？", answer: 31, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "$2^5 - 1$。" }, { layer: 2, text: "$32 - 1$。" }, { layer: 3, text: "31。" }], formulaPreview: "(2⁵-1) = 31" },
    { id: "step4", position: 4, questionText: "初項 1、公比 3 の最初の 3 項の和（1+3+9）は？", answer: 13, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "$1 \\times (3^3 - 1)/(3 - 1)$。" }, { layer: 2, text: "$26 / 2$。" }, { layer: 3, text: "13。" }], formulaPreview: "(27-1)/2 = 13" },
    { id: "step5", position: 5, questionText: "初項 2、公比 2 の最初の 3 項の和（2+4+8）は？", answer: 14, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "$2 \\times (2^3 - 1)/1$。" }, { layer: 2, text: "$2 \\times 7$。" }, { layer: 3, text: "14。" }], formulaPreview: "2·(8-1) = 14" },
    { id: "step6", position: 6, questionText: "初項 1、公比 2 の最初の 6 項の和は？", answer: 63, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$2^6 - 1$。" }, { layer: 2, text: "$64 - 1$。" }, { layer: 3, text: "63。" }], formulaPreview: "(2⁶-1) = 63" },
    { id: "step7", position: 7, questionText: "初項 1、公比 2 の最初の 7 項の和は？", answer: 127, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$2^7 - 1$。" }, { layer: 2, text: "$128 - 1$。" }, { layer: 3, text: "127。" }], formulaPreview: "(2⁷-1) = 127" },
    { id: "step8", position: 8, questionText: "初項 2、公比 3 の最初の 3 項の和（2+6+18）は？", answer: 26, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$2 \\times (3^3 - 1)/(3 - 1)$。" }, { layer: 2, text: "$2 \\times 26 / 2$。" }, { layer: 3, text: "26。" }], formulaPreview: "2·(27-1)/2 = 26" },
    { id: "step9", position: 9, questionText: "初項 1、公比 2 の最初の 10 項の和は？", answer: 1023, unit: "", unknownLabel: "和", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$2^{10} - 1$。" }, { layer: 2, text: "$1024 - 1$。" }, { layer: 3, text: "1023。" }], formulaPreview: "(2¹⁰-1) = 1023" },
    { id: "step10", position: 10, questionText: "初項 1、公比 4 の最初の 4 項の和（1+4+16+64）は？", answer: 85, unit: "", unknownLabel: "和", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "公比 4。$1 \\times (4^4 - 1)/(4 - 1)$。" }, { layer: 2, text: "$255 / 3$。" }, { layer: 3, text: "85。" }], formulaPreview: "(256-1)/3 = 85" },
  ],
};

/** EXP1: 指数 b^n */
export const ALGEBRA2_EXP_SERIES: LearnerSeries = {
  id: "algebra2_exp_01",
  title: "指数の値",
  subtitle: "$b^n$ を整数で求める10問。指数法則の土台。",
  patternId: "EXP1",
  unit: "algebra_2",
  revelationLabel: "b^n は「b を n 回かけたもの」",
  steps: [
    { id: "step1", position: 1, questionText: "$2^3$ はいくつでしょう？", answer: 8, unit: "", unknownLabel: "値", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "2 を 3 回かける。" }, { layer: 2, text: "$2 \\times 2 \\times 2$。" }, { layer: 3, text: "8。" }], formulaPreview: "2³ = 8" },
    { id: "step2", position: 2, questionText: "$2^4$ はいくつでしょう？", answer: 16, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "$2^3 \\times 2$。" }, { layer: 2, text: "$8 \\times 2$。" }, { layer: 3, text: "16。" }], formulaPreview: "2⁴ = 16" },
    { id: "step3", position: 3, questionText: "$3^2$ はいくつでしょう？", answer: 9, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "3 を 2 回かける。" }, { layer: 2, text: "$3 \\times 3$。" }, { layer: 3, text: "9。" }], formulaPreview: "3² = 9" },
    { id: "step4", position: 4, questionText: "$2^5$ はいくつでしょう？", answer: 32, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "$2^4 \\times 2$。" }, { layer: 2, text: "$16 \\times 2$。" }, { layer: 3, text: "32。" }], formulaPreview: "2⁵ = 32" },
    { id: "step5", position: 5, questionText: "$3^3$ はいくつでしょう？", answer: 27, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "$3 \\times 3 \\times 3$。" }, { layer: 2, text: "$9 \\times 3$。" }, { layer: 3, text: "27。" }], formulaPreview: "3³ = 27" },
    { id: "step6", position: 6, questionText: "$2^6$ はいくつでしょう？", answer: 64, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$2^5 \\times 2$。" }, { layer: 2, text: "$32 \\times 2$。" }, { layer: 3, text: "64。" }], formulaPreview: "2⁶ = 64" },
    { id: "step7", position: 7, questionText: "$5^2$ はいくつでしょう？", answer: 25, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "$5 \\times 5$。" }, { layer: 2, text: "25。" }, { layer: 3, text: "25。" }], formulaPreview: "5² = 25" },
    { id: "step8", position: 8, questionText: "$2^7$ はいくつでしょう？", answer: 128, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$2^6 \\times 2$。" }, { layer: 2, text: "$64 \\times 2$。" }, { layer: 3, text: "128。" }], formulaPreview: "2⁷ = 128" },
    { id: "step9", position: 9, questionText: "$4^3$ はいくつでしょう？", answer: 64, unit: "", unknownLabel: "値", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$4 \\times 4 \\times 4$。" }, { layer: 2, text: "$16 \\times 4$。" }, { layer: 3, text: "64。" }], formulaPreview: "4³ = 64" },
    { id: "step10", position: 10, questionText: "$10^3$ はいくつでしょう？（10進法の千の位）", answer: 1000, unit: "", unknownLabel: "値", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "$10 \\times 10 \\times 10$。" }, { layer: 2, text: "$100 \\times 10$。" }, { layer: 3, text: "1000。" }], formulaPreview: "10³ = 1000" },
  ],
};

/** VEC2: ベクトルの大きさ |v| = √(a² + b²) */
export const ALGEBRA2_VEC_MAG_SERIES: LearnerSeries = {
  id: "algebra2_vec_mag_01",
  title: "ベクトルの大きさ",
  subtitle: "$|\\vec{v}| = \\sqrt{a^2 + b^2}$ を求める10問。整数結果になる組合せで。",
  patternId: "VEC2",
  unit: "algebra_2",
  revelationLabel: "ベクトルの大きさ = √(x² + y²)",
  derivation: `**ベクトルの大きさは「矢印の長さ」**

ベクトル $\\vec{v} = (a, b)$ は、平面上の **「向きと大きさを持った矢印」** です。その大きさ（長さ）は：

$$|\\vec{v}| = \\sqrt{a^2 + b^2}$$

**ピタゴラスの定理そのもの**

ベクトル $(a, b)$ を矢印として描くと、原点から点 $(a, b)$ への矢印。これは、横 $a$・縦 $b$ の **直角三角形の斜辺** と同じです。

ピタゴラスの定理から：

$$|\\vec{v}|^2 = a^2 + b^2$$

両辺の正の平方根を取って：

$$|\\vec{v}| = \\sqrt{a^2 + b^2}$$

「**ベクトルの大きさはピタゴラスの定理の応用**」——これが核心です。

**たとえば**

| ベクトル | 大きさ |
|---|---|
| $(3, 4)$ | $\\sqrt{9 + 16} = \\sqrt{25} = 5$ |
| $(5, 12)$ | $\\sqrt{25 + 144} = \\sqrt{169} = 13$ |
| $(8, 15)$ | $\\sqrt{64 + 225} = \\sqrt{289} = 17$ |
| $(7, 24)$ | $\\sqrt{49 + 576} = \\sqrt{625} = 25$ |

これらはすべて **ピタゴラス数**（3 数すべてが整数になる組）の例。

**3 次元のベクトル**

3 次元空間 $(a, b, c)$ のベクトルでも、同じ発想で：

$$|\\vec{v}| = \\sqrt{a^2 + b^2 + c^2}$$

「**各成分を 2 乗して足してルート**」——次元が増えても、原理は同じ。

**ベクトルどうしの距離**

2 点 $A(a_1, b_1)$ と $B(a_2, b_2)$ の距離は、ベクトル $\\vec{AB} = (a_2 - a_1, b_2 - b_1)$ の大きさ：

$$|\\vec{AB}| = \\sqrt{(a_2 - a_1)^2 + (b_2 - b_1)^2}$$

「**2 点間の距離公式**」と呼ばれます。これもベクトルの大きさの公式から自然に出てきます。

**単位ベクトル**

大きさが 1 のベクトルを **単位ベクトル** と言います。任意のベクトル $\\vec{v}$ を **その大きさ** で割ると、**同じ向きで大きさ 1** のベクトルが作れます：

$$\\hat{v} = \\frac{\\vec{v}}{|\\vec{v}|}$$

これは「**向きだけ**」を取り出すテクニック。物理（力の向き）や3D グラフィックス（光の向き）でよく使われます。

**ベクトルは「矢印」と「数」の橋渡し**

ベクトルの大きさ・内積などの計算は、

- **図形的な意味**（矢印・角度・面積）
- **代数的な計算**（成分の四則演算）

の **両方の世界** を行き来できる便利な道具。物理学・工学・コンピュータグラフィックス・機械学習など、現代科学の至るところで使われています。

ピタゴラスの定理が紀元前から知られていたのに対して、ベクトルという概念は 19 世紀になってから整理されました。それでも、ベクトルの大きさが古典的なピタゴラスの定理と完全に同じ式になるのは、**幾何学の根本が変わっていない** ことの証です。`,
  steps: [
    { id: "step1", position: 1, questionText: "$\\vec{v} = (3, 4)$ の大きさはいくつでしょう？", answer: 5, unit: "", unknownLabel: "大きさ", variationFromPrevious: null, compareWithStepId: null, hints: [{ layer: 1, text: "$\\sqrt{3^2 + 4^2}$。" }, { layer: 2, text: "$\\sqrt{9 + 16} = \\sqrt{25}$。" }, { layer: 3, text: "5。" }], formulaPreview: "√(9+16) = 5" },
    { id: "step2", position: 2, questionText: "$\\vec{v} = (6, 8)$ の大きさはいくつでしょう？", answer: 10, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step1", hints: [{ layer: 1, text: "$\\sqrt{36 + 64}$。" }, { layer: 2, text: "$\\sqrt{100}$。" }, { layer: 3, text: "10。" }], formulaPreview: "√(36+64) = 10" },
    { id: "step3", position: 3, questionText: "$\\vec{v} = (5, 12)$ の大きさはいくつでしょう？", answer: 13, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step2", hints: [{ layer: 1, text: "$\\sqrt{25 + 144}$。" }, { layer: 2, text: "$\\sqrt{169}$。" }, { layer: 3, text: "13。" }], formulaPreview: "√(25+144) = 13" },
    { id: "step4", position: 4, questionText: "$\\vec{v} = (8, 15)$ の大きさはいくつでしょう？", answer: 17, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step3", hints: [{ layer: 1, text: "$\\sqrt{64 + 225}$。" }, { layer: 2, text: "$\\sqrt{289}$。" }, { layer: 3, text: "17。" }], formulaPreview: "√(64+225) = 17" },
    { id: "step5", position: 5, questionText: "$\\vec{v} = (9, 12)$ の大きさはいくつでしょう？", answer: 15, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step4", hints: [{ layer: 1, text: "$\\sqrt{81 + 144}$。" }, { layer: 2, text: "$\\sqrt{225}$。" }, { layer: 3, text: "15。" }], formulaPreview: "√(81+144) = 15" },
    { id: "step6", position: 6, questionText: "$\\vec{v} = (7, 24)$ の大きさはいくつでしょう？", answer: 25, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step5", hints: [{ layer: 1, text: "$\\sqrt{49 + 576}$。" }, { layer: 2, text: "$\\sqrt{625}$。" }, { layer: 3, text: "25。" }], formulaPreview: "√(49+576) = 25" },
    { id: "step7", position: 7, questionText: "$\\vec{v} = (12, 16)$ の大きさはいくつでしょう？", answer: 20, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step6", hints: [{ layer: 1, text: "(3,4) の 4 倍。" }, { layer: 2, text: "$\\sqrt{144 + 256} = \\sqrt{400}$。" }, { layer: 3, text: "20。" }], formulaPreview: "√(144+256) = 20" },
    { id: "step8", position: 8, questionText: "$\\vec{v} = (20, 21)$ の大きさはいくつでしょう？", answer: 29, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step7", hints: [{ layer: 1, text: "$\\sqrt{400 + 441}$。" }, { layer: 2, text: "$\\sqrt{841}$。" }, { layer: 3, text: "29。" }], formulaPreview: "√(400+441) = 29" },
    { id: "step9", position: 9, questionText: "$\\vec{v} = (3, 0)$ の大きさはいくつでしょう？", answer: 3, unit: "", unknownLabel: "大きさ", variationFromPrevious: "same", compareWithStepId: "step8", hints: [{ layer: 1, text: "$\\sqrt{9 + 0}$。" }, { layer: 2, text: "$\\sqrt{9}$。" }, { layer: 3, text: "3。" }], formulaPreview: "√(9+0) = 3" },
    { id: "step10", position: 10, questionText: "$\\vec{v} = (24, 7)$ の大きさはいくつでしょう？（成分の順を入れ替えても同じ大きさ）", answer: 25, unit: "", unknownLabel: "大きさ", variationFromPrevious: "qualitative", compareWithStepId: "step9", hints: [{ layer: 1, text: "step 6 と成分が入れ替わっただけ。" }, { layer: 2, text: "$\\sqrt{576 + 49}$。" }, { layer: 3, text: "25。同じ。" }], formulaPreview: "√(576+49) = 25" },
  ],
};

export const ALGEBRA_2_SERIES_LIST: LearnerSeries[] = [
  ALGEBRA2_TRIG_PERIOD_SERIES,
  ALGEBRA2_LOG_SERIES,
  ALGEBRA2_ARITH_NTH_SERIES,
  ALGEBRA2_ARITH_SUM_SERIES,
  ALGEBRA2_GEO_NTH_SERIES,
  ALGEBRA2_GEO_SUM_SERIES,
  ALGEBRA2_DOT_SERIES,
  ALGEBRA2_VEC_MAG_SERIES,
  ALGEBRA2_EXP_SERIES,
  ALGEBRA2_DIFF_SERIES,
];
