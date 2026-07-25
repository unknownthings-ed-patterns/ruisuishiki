/**
 * 「関数と関数のグラフ」ユニット（高校数学Ⅰ・A 第2章）の系列。
 *
 * 背骨設計：docs/functions_graphs_series_design.md（2026-07-25）。
 * お手本 mirror：seriesNumbersExpressions.ts / seriesTrig.ts。
 *
 * ハブ胚細胞：「式の顔を変えるとグラフの部品が見え、グラフを見ると
 * 方程式・不等式が読める」（第1章「帰着」の幾何版）。
 * 系列1 はその第1相＝「対応を図に開く」。
 *
 * 旧 topicGroup「2 次関数」の初期プロトタイプは系列3・4 へ吸収し SERIES_REDIRECTS へ移す（背骨 D3）。
 * sum/prod は第2章に節がないためカタログから外すのみ（行き先なきリダイレクト禁止）。
 *
 * 出典: 池田洋介『数学Ⅰ・A 入門問題精講 改訂版』旺文社 第2章の節構成を参考。
 * 問題の値はすべてオリジナル（原典 練習1 等の値との衝突なしを確認済み）。
 */

import type { LearnerSeries } from "./types";

/** FG1: 関数の対応と1次関数（対応を図に開くと、傾きと切片のつまみが見える）。 */
export const FG_FUNCTION_LINEAR_SERIES: LearnerSeries = {
  id: "algebra1_function_linear_01",
  title: "関数の対応と1次関数",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — 対応の一意性・傾き・切片・変域での最大最小まで $10$ 問。",
  patternId: "FG1",
  unit: "algebra_1",
  revelationLabel:
    "1次関数は傾きと切片の2つのつまみで決まり、変域があれば最大・最小は必ず端点（増減は途中で折り返さない）",
  drivingQuestion:
    "$x$ を決めると $y$ が「ただ1つ」に決まる対応を、なぜわざわざ図に開く？——点がつながって直線になったとき、傾きと切片の2つのつまみだけで変化の様子が言い当てられるとしたら、グラフは何の地図か？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "[関数] $y = 3x - 1$ に $x = 2$ を入れると、$y$ の値はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "y の値",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "中学で出会った「$x$ を決めると $y$ が決まる」式を思い出してみよう。この箱に $2$ を入れたら、出てくる数は1つだけ？ それとも複数ありそう？ [関数] の目で見てみよう。",
        },
        {
          layer: 2,
          text: "やることは、$x$ の場所に $2$ を置いて計算するだけ。出てくる数がいくつあるか——「ただ1つ」かどうかを、手を動かして確かめてみよう。",
        },
        {
          layer: 3,
          text: "$x = 2$ を代入すると $y = 3 \\cdot 2 - 1 = 5$。出てくる値は $5$ のひとつだけ。**$x$ を決めると $y$ がただ1つに決まる対応を [関数] と呼ぶ**——ここが出発点。同じ箱に別の $x$ を入れれば別の $y$ が出るが、1回の入力に対する出力はいつも1つ。",
        },
      ],
      formulaPreview: "y = 3·2 − 1 = 5",
      figureMarker: "<<FUNC_BOX_STEP1>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "同じ関数 $y = 3x - 1$ に、今度は $x = -1$ を入れると、$y$ の値はいくつでしょう？",
      answer: -4,
      unit: "",
      unknownLabel: "y の値",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「$x$ の場所に数を置いて $y$ を出す」。変わったのは入れる数だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$x$ が正から負になったこと。かけ算の符号に注意して、同じ式に当てはめればいい。",
        },
        {
          layer: 3,
          text: "$x = -1$ を代入すると $y = 3 \\cdot (-1) - 1 = -3 - 1 = -4$。前題の $5$ とは違う値が出た——**入力が違えば出力も違う**が、どちらも「その入力に対してはただ1つ」。関数の対応は、入力ごとに1本の矢印で結ばれている。",
        },
      ],
      formulaPreview: "y = 3·(−1) − 1 = −4",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "直線 $y = \\dfrac{3}{2}x$ の**傾き**はいくつでしょう？",
      answer: 1.5,
      answerDisplay: "3/2",
      unit: "",
      unknownLabel: "傾き",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは「1つの $x$ に対する $y$」を見てきた。今度は直線全体の「斜め具合」を1つの数で言いたい。[傾き] という言葉で何を数えているか、思い出してみよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが「1点の $y$」から「直線の斜め具合」になったこと。$y = ax$ の形なら、その $a$ がそのまま傾きを表す。",
        },
        {
          layer: 3,
          text: "$y = \\dfrac{3}{2}x$ は $y = ax + b$ で $a = \\dfrac{3}{2}$、$b = 0$ の形。よって [傾き] は $\\dfrac{3}{2}$。意味は「$x$ が $1$ 増えると $y$ が $\\dfrac{3}{2}$ 増える」——右に1歩で上に $1.5$。比例の直線は原点を通り、傾きだけで向きが決まる。",
        },
      ],
      formulaPreview: "y = (3/2)x → 傾き 3/2",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "直線 $y = -4x + 7$ の **$y$ 切片**はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "y 切片",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題では傾き（向き）を読んだ。今度は直線がどこを通るか——特に $y$ 軸との交わり——を知りたい。[切片] は何を指している数だった？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが傾きから「$y$ 軸との交点の高さ」になったこと。$x = 0$ を入れたときの $y$ が、そのままその高さになる。",
        },
        {
          layer: 3,
          text: "$x = 0$ を代入すると $y = -4 \\cdot 0 + 7 = 7$。よって [切片]（$y$ 切片）は $7$。$y = ax + b$ の $b$ がそのまま $y$ 切片——傾きが向き、切片が位置を決める。2つのつまみで直線が1本に固定される。",
        },
      ],
      formulaPreview: "x = 0 → y = 7（y 切片）",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$y = 5x - 2$ について、$0 \\le x \\le 3$ の範囲で考えます。この範囲での**最大値**はいくつでしょう？",
      answer: 13,
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題までは直線の「向き」と「位置」を読んできた。今度は、直線のうち決まった幅だけを切り出して、そこでの一番大きい $y$ を知りたい。傾きの符号は、切り出した両端のどちらが高くなるかにどう効く？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、求めるものが切片から「変域の中の最大の $y$」になったこと。$1$ 次関数は途中で折り返さない（単調）ので、最大は必ずどちらかの端点にある。傾きが正なら、右端と左端のどちらが高くなる？",
        },
        {
          layer: 3,
          text: "傾き $5 > 0$ なので、右へ行くほど $y$ は増える（上り坂）。変域 $0 \\le x \\le 3$ では右端 $x = 3$ が最大で、$y = 5 \\cdot 3 - 2 = 13$。左端 $x = 0$ では $y = -2$（最小）。**$1$ 次関数の増減は傾きの符号だけで決まり、変域があれば最大・最小は必ず端点**——ここが質的な転換点。",
        },
      ],
      formulaPreview: "傾き 5 > 0 → 右端 x=3 で最大 y=13",
      figureMarker: "<<LINEAR_SLOPE_DOMAIN>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$y = -3x + 4$ について、$-1 \\le x \\le 2$ の範囲での**最小値**はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "最小値",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「変域の端で $y$ を比べる」。変わったのは傾きの符号と、聞くものが最大から最小になったこと。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、傾きが負（下り坂）になったこと。下り坂なら、右端と左端のどちらが低くなる？ 最小はその低い方の端の $y$。",
        },
        {
          layer: 3,
          text: "傾き $-3 < 0$ なので、右へ行くほど $y$ は減る。変域 $-1 \\le x \\le 2$ では右端 $x = 2$ が最小で、$y = -3 \\cdot 2 + 4 = -2$。左端 $x = -1$ では $y = 7$（最大）。前題と同じ手つき——**符号がひっくり返ると、高い端と低い端が入れ替わる**。",
        },
      ],
      formulaPreview: "傾き −3 < 0 → 右端 x=2 で最小 y=−2",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "傾きが正の $1$ 次関数について、変域 $-2 \\le x \\le 4$ での**最大値をとる $x$** はいくつでしょう？（式の具体形は知らなくてよい）",
      answer: 4,
      unit: "",
      unknownLabel: "最大値をとる x",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは式が先にあって、端点の $y$ を求めてきた。今度は向きが逆——傾きの符号と変域だけが与えられて、「最大になる $x$」を聞きたい。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。傾きが正なら上り坂——最大はどちらの端の $x$ か、step5 の結論を逆から読むだけ。",
        },
        {
          layer: 3,
          text: "傾きが正 ⇒ 右へ行くほど $y$ は増える ⇒ 変域の右端で最大。変域 $-2 \\le x \\le 4$ の右端は $x = 4$。よって答えは $4$。式の係数を知らなくても、**符号と変域の端だけで最大の場所が決まる**——これが逆向きの読み。",
        },
      ],
      formulaPreview: "傾き > 0 → 最大は右端 x=4",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$y = \\dfrac{2}{3}x - 1$ について、$-3 \\le x \\le 3$ の範囲での**最大値**はいくつでしょう？",
      answer: 1,
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。最大をとる場所を決める道具（傾きの符号）は同じ。変わったのは、係数が分数になったことと、実際の $y$ の値まで聞くこと。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、傾きが分数 $\\dfrac{2}{3}$（それでも正）になったこと。最大の端は前題と同じルールで決まり、あとはその端に代入するだけ。",
        },
        {
          layer: 3,
          text: "傾き $\\dfrac{2}{3} > 0$ なので最大は右端 $x = 3$。$y = \\dfrac{2}{3} \\cdot 3 - 1 = 2 - 1 = 1$。分数でも手つきは変わらない——符号で端を選び、代入して値を出す。",
        },
      ],
      formulaPreview: "傾き 2/3 > 0 → 右端 x=3 で最大 y=1",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$y = -5x + 1$ について、$-1 \\le x \\le 2$ の範囲での**最大値**はいくつでしょう？",
      answer: 6,
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。「右端がいつも最大」と思い込んでいないか？ 傾きの符号が前題とどう違うかに目を向けてから、端を選ぼう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、傾きが負になったこと——ただこれだけ。下り坂なら、最大は右端ではなく左端にある。素朴に右端だけ見ると必ず外れる。",
        },
        {
          layer: 3,
          text: "傾き $-5 < 0$ なので上り坂ではなく下り坂。最大は左端 $x = -1$ で、$y = -5 \\cdot (-1) + 1 = 5 + 1 = 6$。右端 $x = 2$ では $y = -9$（こちらが最小）。**「右端が常に最大」は傾きが正のときだけの話**——符号を見ずに端を決めると、この問題は絶対に解けない。ここがこの系列の必然性の1問。",
        },
      ],
      formulaPreview: "傾き −5 < 0 → 左端 x=−1 で最大 y=6（右端ではない）",
      figureMarker: "<<LINEAR_SLOPE_DOMAIN>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$y = 4x + 3$ について、$-2 \\le x \\le 1$ の範囲での**最大値**はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は傾き・切片・変域がすべて揃った式で、最大値を一気に出す。step3〜5 で身につけた道具を、どの順で使えばよさそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、傾きが再び正になったことと、切片も式に見えること。手順は (1) 符号で端を選ぶ (2) その端に代入——切片は代入のときに自動で効く。",
        },
        {
          layer: 3,
          text: "傾き $4 > 0$ なので最大は右端 $x = 1$。$y = 4 \\cdot 1 + 3 = 7$。確認：左端 $x = -2$ では $y = -8 + 3 = -5$（最小）。傾き（向き）と切片（位置）と変域（窓）——**3つを重ねると、1次関数の変化の地図が読み切れる**。対応を図に開いたから、つまみが見えた。",
        },
      ],
      formulaPreview: "傾き 4 > 0 → 右端 x=1 で最大 y=7",
    },
  ],
  derivation: `**中心の問い** ｜ $x$ を決めると $y$ が「ただ1つ」に決まる対応を、なぜわざわざ図に開く？——点がつながって直線になったとき、傾きと切片の2つのつまみだけで変化の様子が言い当てられるとしたら、グラフは何の地図か？

────────

**対応を図に開くと、変化の法則がつまみとして読める。**

中学で出会った式 $y = ax + b$ は、もともと「$x$ を入れると $y$ がただ1つ出てくる箱」——これが [関数] です。箱の中身を一つずつ計算して点を打っていくと、点がつながって直線になります。点が並んだ地図が **グラフ**。

<<FUNC_BOX_STEP1>>

**Step 1〜2：ただ1つの対応**

$y = 3x - 1$ に $x = 2$ を入れると $y = 5$、$x = -1$ を入れると $y = -4$。入力が違えば出力も違うが、**1回の入力に対する出力はいつも1つ**。これが関数の約束です（$1$ 次関数も $2$ 次関数も、この約束の上に立っています）。

**Step 3〜4：直線を決める2つのつまみ**

$y = ax + b$ の $a$ が [傾き]（右に1で上下にいくつ）、$b$ が [切片]（$y$ 軸との交点の高さ）。傾きが向き、切片が位置——2つで直線が1本に固定されます。

$$y = \\frac{3}{2}x \\quad\\text{（傾き }\\tfrac{3}{2}\\text{・原点通し）},\\qquad y = -4x + 7 \\quad\\text{（切片 }7\\text{）}$$

**Step 5〜6：変域を切り取ると、最大・最小は端点**

$1$ 次関数は途中で折り返しません（単調）。だから決まった幅（変域）の中での最大・最小は、**必ずどちらかの端点**にあります。

- 傾き $> 0$（上り坂）→ 右端が最大・左端が最小
- 傾き $< 0$（下り坂）→ 左端が最大・右端が最小

<<LINEAR_SLOPE_DOMAIN>>

**Step 7：逆向き——符号と変域だけで「最大の場所」が決まる**

式の係数を知らなくても、傾きが正なら最大は右端。対応の地図を読めるようになると、式→値だけでなく値の場所→条件、という逆の道も通れる。

**Step 9：必然性の1問——「右端が常に最大」は通じない**

$y = -5x + 1$（$-1 \\le x \\le 2$）の最大は左端の $6$ で、右端は最小。素朴に右端だけ見ると必ず外れる。**傾きの符号を見る**という、この系列の核だけで解ける問題です。

**Step 10：傾き・切片・変域を重ねる**

3つの情報が揃うと、$1$ 次関数の変化の地図は読み切れます。次の系列では、この「つまみ」の言語が $2$ 次関数の頂点 $(p, q)$ へと広がります。

────────

**もっと深く** — グラフは何の地図か

グラフは「対応の全体像」を一目で見せる地図です。式だけ見ていると $x = 2$ のときの $y$ は計算できますが、「どこで最大か」「増えているのか減っているのか」は、点を打つか・傾きを読むまで見えません。図に開くというのは、**個別の計算を、法則の読み取りに昇格させる**操作です。

**誤概念**：「変域の右端がいつも最大」——傾きが負なら逆です（Step 9）。「$1$ 次関数も途中で折り返すことがある」——折り返すのは $2$ 次関数（次系列以降）。$1$ 次は単調だから端点だけで足りる、という対比が次への橋になります。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章「関数と関数のグラフ」の節構成（関数とは何か・1次関数のグラフ・増減と最大最小）を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

対応を図に開くと、変化の法則が傾きと切片というつまみとして読める。グラフは「$x$ を決めると $y$ が決まる」という約束の、全体地図である。`,
};

/** FG2: 標準形と平行移動（平行移動は変数の置き換え）。 */
export const FG_QUAD_STANDARD_SERIES: LearnerSeries = {
  id: "algebra1_quad_standard_01",
  title: "標準形と平行移動",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — $y=ax^2$ から標準形 $y=a(x-p)^2+q$ まで。頂点と軸を読む $10$ 問。",
  patternId: "FG2",
  unit: "algebra_1",
  revelationLabel:
    "平行移動は変数の置き換え。$x$ を $x-p$ にするとグラフは右へ $p$、$y$ を $y-q$ にすると上へ $q$。頂点は $(p,q)$",
  drivingQuestion:
    "$y=ax^2$ を横にずらすとき、なぜ式では $x$ を **$x-p$** に書き換える？——『引いたらプラス方向』が直感に反するのに、値が遅れて現れるなら、平行移動は式のどの置き換えと同じか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "[2次関数] $y = 3x^2$ のグラフは、下に凸でしょうか？ 下に凸なら $1$、上に凸なら $0$ と答えてください。",
      answer: 1,
      unit: "",
      unknownLabel: "下に凸なら1、上に凸なら0",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列1 では直線の傾きの符号が上り坂／下り坂を決めたね。[2次関数] $y = a\\cdot x\\cdot x$ では、$a$ の符号が何を決めるだろう？ お椀の口は上向き？ 下向き？",
        },
        {
          layer: 2,
          text: "手がかりは $x^2$ の係数 $a$ の符号だけ。$a > 0$ のとき、大きな $\\lvert x \\rvert$ で $y$ はどうなる？",
        },
        {
          layer: 3,
          text: "$a = 3 > 0$ なので、$\\lvert x \\rvert$ が大きいほど $y$ は大きくなる——口が上のお椀（**下に凸**）。よって $1$。系列1 の傾きの符号が「向き」を決めたのと同じく、$2$ 次では $a$ の符号が凸の向きを決める。",
        },
      ],
      formulaPreview: "a = 3 > 0 → 下に凸 → 1",
      figureMarker: "<<PARABOLA_OPENING_BUNDLE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$y = -4x^2$ は下に凸でしょうか？ 下に凸なら $1$、上に凸なら $0$ と答えてください。",
      answer: 0,
      unit: "",
      unknownLabel: "下に凸なら1、上に凸なら0",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ「$a$ の符号で凸を読む」。変わったのは $a$ の符号だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$a$ が負になったこと。口の向きはどうひっくり返る？",
        },
        {
          layer: 3,
          text: "$a = -4 < 0$ なので、大きな $\\lvert x \\rvert$ で $y$ は小さくなる——口が下の逆さお椀（**上に凸**）。よって $0$。",
        },
      ],
      formulaPreview: "a = −4 < 0 → 上に凸 → 0",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$y = 3x^2 + 5$ の頂点の **$y$ 座標**はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "頂点の y 座標",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題までは原点に頂点がある傘だった。今度は定数が足されている。系列1 で $+b$ が直線をどう動かしたか、思い出してみよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$+5$ がついたこと——$y$ 方向の平行移動。頂点の高さはどう変わる？",
        },
        {
          layer: 3,
          text: "$y = 3x^2$ の頂点は $(0, 0)$。全体に $5$ を足すと、すべての点が上へ $5$ 動くので頂点は $(0, 5)$。よって $y$ 座標は $5$。系列1 の「$+b$＝$y$ 方向移動」が、$2$ 次でもそのまま効く。",
        },
      ],
      formulaPreview: "y = 3x² + 5 → 頂点の y = 5",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$y = 3(x - 4)^2$ の頂点の **$x$ 座標**はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題は上下への移動だった。今度は $(x-4)$ という形——横方向の話。頂点の $x$ はどこに来そう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$x$ が $x-4$ に置き換わったこと。$(x-4)^2$ が $0$ になる $x$ が、頂点の横位置。",
        },
        {
          layer: 3,
          text: "$(x-4)^2 = 0$ のとき $x = 4$。ここが一番低い（または高い）点——頂点の $x$ 座標は $4$。標準形 $y = a(x-p)^2+q$ では、頂点の $x$ が $p$。",
        },
      ],
      formulaPreview: "y = 3(x−4)² → 頂点の x = 4",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$y = 3(x - 4)^2 + 1$ の頂点の **$x$ 座標**はいくつでしょう？（「$4$ を引いているから左へずれる」と思わないこと）",
      answer: 4,
      unit: "",
      unknownLabel: "頂点の x 座標",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。式の核は同じ $(x-4)$。直感は「引いたらマイナス方向」と言いたくなるが、前題の結論とその直感は食い違うだろうか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは $+1$ がついたことだけで、頂点の $x$ を決める部分は同じ。『引いたら左』という素朴な読みは、ここでは必ず外れる。",
        },
        {
          layer: 3,
          text: "やはり $(x-4)^2 = 0$ のとき $x = 4$。グラフは $y = 3x^2$ を**右へ** $4$ 動かしたもの（値が $4$ 遅れて現れる）。よって頂点の $x$ は $4$。**$x$ を $x-p$ に置き換えると、グラフは $+p$ 方向へ動く**——ここがこの系列の必然性の1問。",
        },
      ],
      formulaPreview: "x → x−4 は右へ +4（頂点 x = 4）",
      figureMarker: "<<TRANSLATE_DELAY>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$y = 2(x + 1)^2 - 7$ の頂点の **$y$ 座標**はいくつでしょう？",
      answer: -7,
      unit: "",
      unknownLabel: "頂点の y 座標",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。標準形の外側についている定数の文字が、頂点の高さを表すかに目を向けて。",
        },
        {
          layer: 2,
          text: "前題と変わったのは具体的な係数。$(x+1)^2 = \\{x-(-1)\\}^2$ と読めるが、聞かれているのは $y$ 座標——$q$ の部分。",
        },
        {
          layer: 3,
          text: "標準形の定数項（外側の $+q$）が頂点の $y$。ここでは $q = -7$。よって $-7$。",
        },
      ],
      formulaPreview: "y = 2(x+1)² − 7 → 頂点の y = −7",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$y = 2(x + 1)^2 - 7$ の軸の方程式は $x = p$ の形です。**$p$** はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "軸 x = p の p",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題では同じ式の頂点の $y$ を読んだ。今度は軸——頂点を通る縦の直線。$x = p$ の $p$ は頂点のどの座標と同じ？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが高さから「軸の位置」になったこと。$(x+1)^2$ を $(x-p)^2$ の形に直すと $p$ が見える。",
        },
        {
          layer: 3,
          text: "$(x+1)^2 = \\{x-(-1)\\}^2$ なので $p = -1$。軸は直線 $x = -1$。方程式の文脈では「$x$ の値が $-1$」に慣れているが、グラフでは**直線の式**として読む（誤概念 F2）。",
        },
      ],
      formulaPreview: "軸 x = −1 → p = −1",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "頂点が $(3, -2)$、[標準形] が $y = (x - 3)^2 - 2$ のとき、このグラフの **$y$ 切片**はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "y 切片",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題までは式から頂点を読んできた。今度は向きが逆——頂点（と式）が先にあって、$y$ 軸との交わりを知りたい。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。$y$ 切片は $x = 0$ を入れたときの $y$。",
        },
        {
          layer: 3,
          text: "$x = 0$ を代入すると $y = (0-3)^2 - 2 = 9 - 2 = 7$。よって $y$ 切片は $7$。頂点から式を組み立て、そこから切片を読む——逆向きの道。",
        },
      ],
      formulaPreview: "x = 0 → y = 9 − 2 = 7",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$y = -\\dfrac{1}{2}(x - 1)^2 + 4$ の頂点の **$y$ 座標**はいくつでしょう？（この値は最大値でもある）",
      answer: 4,
      answerDisplay: "4",
      unit: "",
      unknownLabel: "頂点の y 座標（最大値）",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。今度は $a < 0$——逆さお椀。頂点の高さは、最大と最小のどちらの意味を持つか？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$a$ が負になったこと。頂点は谷ではなく山のてっぺん。標準形の $q$ はそのまま頂点の $y$。",
        },
        {
          layer: 3,
          text: "$q = 4$ が頂点の $y$。$a < 0$ なのでこれは**最大値**でもある。下に凸のときの最小と、上に凸のときの最大——同じ「頂点の $y$」が役割を入れ替える。",
        },
      ],
      formulaPreview: "a < 0 → 頂点 y = 4 が最大値",
      figureMarker: "<<STANDARD_FORM_VERTEX>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$y = 2(x - 3)^2 + 1$ の **$y$ 切片**はいくつでしょう？",
      answer: 19,
      unit: "",
      unknownLabel: "y 切片",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。頂点の読み（step4〜6）と切片の読み（step8）を重ねて一気に出す番。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが頂点から $y$ 切片になったこと。手順は (1) 式を確認 (2) $x = 0$ を入れる——頂点の知識は検算に使える。",
        },
        {
          layer: 3,
          text: "$x = 0$ を代入すると $y = 2(0-3)^2 + 1 = 2 \\cdot 9 + 1 = 19$。頂点は $(3, 1)$——$x$ 方向の置き換えと $y$ 方向の定数が揃った標準形から、切片まで一本道で読める。",
        },
      ],
      formulaPreview: "x = 0 → y = 2·9 + 1 = 19",
    },
  ],
  derivation: `**中心の問い** ｜ $y=ax^2$ を横にずらすとき、なぜ式では $x$ を **$x-p$** に書き換える？——『引いたらプラス方向』が直感に反するのに、値が遅れて現れるなら、平行移動は式のどの置き換えと同じか？

────────

**平行移動は、変数の置き換えである。**

系列1 で直線の $+b$ が上下移動だったように、$2$ 次の傘 $y = ax^2$ にも同じ言語が使える。上下に $q$ 動かすのは $y = ax^2 + q$。左右に $p$ 動かすのは——直感に反して——$y = a(x-p)^2$。

<<PARABOLA_OPENING_BUNDLE>>

**Step 1〜2：$a$ の符号が凸を決める**

$a > 0$ は下に凸、$a < 0$ は上に凸。開きの広さは $\\lvert a \\rvert$。

**Step 3〜4・6〜7：標準形のつまみ**

$$y = a(x-p)^2 + q$$

頂点は $(p, q)$、軸は直線 $x = p$。$p$ と $q$ が位置、$a$ が形。

<<TRANSLATE_DELAY>>

**Step 5：必然性——「引いたら左」は通じない**

$y = 3(x-4)^2$ の頂点の $x$ は $4$（右へずれた先）。値が $4$ 遅れて現れるから、式では $x$ を $x-4$ に書き換える。衛星放送の遅延と同じ構造です。

**Step 8〜10：逆向きと重ね技**

頂点から式を組み立て、$y$ 切片を読む。上に凸なら頂点の $y$ は最大値。

<<STANDARD_FORM_VERTEX>>

────────

**もっと深く** — 忘れても導ける

平行移動の一般則は「$x$ を $x-p$ に、$y$ を $y-q$ に置き換える」。$y - q = a(x-p)^2$ と書けば、$x$ 方向と $y$ 方向が同じ型になる。暗記より、値の表で「同じ $y$ がどこで現れるか」を一度追う方が忘れにくい。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（2次関数のグラフ・平行移動・標準形）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

平行移動は変数の置き換えである。$x \\to x-p$ はグラフを $+p$ 方向へ動かし、頂点 $(p,q)$ が標準形のつまみとして読める。`,
};


/** FG3: 一般形からグラフを読む（代数の帰着は幾何の読み取りになる）。 */
export const FG_QUAD_GENERAL_GRAPH_SERIES: LearnerSeries = {
  id: "algebra1_quad_general_graph_01",
  title: "一般形からグラフを読む",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — 一般形を平方完成して頂点・軸・切片を読む。決定と移動まで $10$ 問。",
  patternId: "FG3",
  unit: "algebra_1",
  revelationLabel:
    "一般形 $ax^2+bx+c$ は平方完成で標準形になり、頂点・軸・$y$ 切片が一度に読める。代数の帰着がグラフの読み取りになる",
  drivingQuestion:
    "ばらけた $ax^2+bx+c$ から、どうやって頂点の地図を開く？——第1章で身につけた**平方完成**が、そのままグラフの読み取りボタンだとしたら、一般形に隠れていた部品は何か？",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "[一般形] $y = 2x^2 - 8x + 11$ の **$y$ 切片**はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "y 切片",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "系列2 では標準形から頂点を読んだね。一般形の定数項は、$x = 0$ のとき何が残るだろう？ [切片] の目で見てみよう。" },
        { layer: 2, text: "やることは、$x$ の場所に $0$ を置くだけ。残る数は式のどの部分？" },
        { layer: 3, text: "$x = 0$ のとき $y = 11$。一般形の定数項 $c$ がそのまま [切片]（$y$ 切片）。**一般形でも、$y$ 軸との交わりだけは一目で読める**——ここが出発点。" },
      ],
      formulaPreview: "x = 0 → y = 11",
      figureMarker: "<<GENERAL_TO_STANDARD>>",
    },
    {
      id: "step2", position: 2,
      questionText: "$y = 2x^2 - 8x + 11$ を平方完成すると $y = 2(x - 2)^2 + 3$ になります。頂点の **$x$ 座標**はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "頂点の x 座標",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は標準形の顔に直したあとの、系列2 で身につけた読み方。" },
        { layer: 2, text: "前題と変わったのは、聞くものが切片から頂点の横位置になったこと。標準形 $2(x-2)^2+3$ の $p$ はどれ？" },
        { layer: 3, text: "標準形 $y = 2(x-2)^2+3$ より頂点の $x$ は $2$。第1章の [平方完成] が、系列2 の読み取りボタンを押す鍵だった。" },
      ],
      formulaPreview: "標準形 → 頂点の x = 2",
    },
    {
      id: "step3", position: 3,
      questionText: "同じ標準形 $y = 2(x - 2)^2 + 3$ の頂点の **$y$ 座標**はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "頂点の y 座標",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。同じ標準形から、今度は高さを読む。" },
        { layer: 2, text: "前題と変わったのは、聞くものが横から縦になったこと。外側の定数が $q$。" },
        { layer: 3, text: "$q = 3$。よって頂点の $y$ は $3$。頂点は $(2, 3)$。" },
      ],
      formulaPreview: "頂点の y = 3",
    },
    {
      id: "step4", position: 4,
      questionText: "同じ関数の軸は $x = p$ の形です。**$p$** はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "軸の p",
      variationFromPrevious: "same", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。軸の $p$ は頂点のどの座標と同じだった？" },
        { layer: 2, text: "前題と変わったのは、聞くものが頂点の高さから軸の位置になったこと。答えは step2 と同じ数。" },
        { layer: 3, text: "軸は $x = 2$。よって $p = 2$。頂点の $x$ と軸の $p$ は同じ。" },
      ],
      formulaPreview: "軸 x = 2 → p = 2",
    },
    {
      id: "step5", position: 5,
      questionText: "$y = -2x^2 + 12x - 10$ を平方完成すると頂点の **$x$ 座標**はいくつでしょう？（先に $-2$ でくくる）",
      answer: 3, unit: "", unknownLabel: "頂点の x 座標",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は $x$ の2乗の係数が $1$ でない。くくってから系列2 の読みに持ち込む。" },
        { layer: 2, text: "前題と変わったのは、$a = -2$ になったこと。$-2\\{x^2 - 6x\\}$ の形にしてから平方完成する。" },
        { layer: 3, text: "$y = -2(x^2 - 6x) - 10 = -2\\{(x-3)^2 - 9\\} - 10 = -2(x-3)^2 + 8$。頂点の $x$ は $3$。" },
      ],
      formulaPreview: "−2(x−3)²+8 → 頂点の x = 3",
    },
    {
      id: "step6", position: 6,
      questionText: "$y = x^2 + 5x + 3$ の頂点の **$x$ 座標**はいくつでしょう？",
      answer: -2.5, answerDisplay: "-5/2", unit: "", unknownLabel: "頂点の x 座標",
      variationFromPrevious: "qualitative", compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。「$-b$ を $2a$ で割る」と暗記だけで符号を急ぐと、ここで必ず外れる配置になっている。" },
        { layer: 2, text: "前題と変わったのは、係数が分数の頂点を生むこと。平方完成の手つき——$x$ の係数の半分——で確かめるしか安定しない。" },
        { layer: 3, text: "$x^2 + 5x = (x + \\dfrac{5}{2})^2 - (\\dfrac{5}{2})^2$。頂点の $x$ は $-\\dfrac{5}{2}$。暗記の符号ミスが効く配置——**平方完成の手つきでしか安定しない**のが必然性の1問。" },
      ],
      formulaPreview: "頂点の x = −5/2",
      figureMarker: "<<COMPLETE_SQUARE_AREA>>",
    },
    {
      id: "step7", position: 7,
      questionText: "頂点が $(1, 4)$ で点 $(2, 1)$ を通る [標準形] $y = a(x-1)^2 + 4$ の **$a$** はいくつでしょう？",
      answer: -3, unit: "", unknownLabel: "a",
      variationFromPrevious: "inverse", compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題までは式から頂点を読んできた。今度は向きが逆——頂点と通過点から $a$ を決める。" },
        { layer: 2, text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。点を式に当てはめると $a$ が残る。" },
        { layer: 3, text: "$1 = a(2-1)^2 + 4$ より $1 = a + 4$、$a = -3$。よって $a = -3$（上に凸）。" },
      ],
      formulaPreview: "1 = a·1 + 4 → a = −3",
    },
    {
      id: "step8", position: 8,
      questionText: "$y = 2(x-1)^2 + 3$ を $x$ 軸方向に $+2$ 平行移動したあと、頂点の **$x$ 座標**はいくつでしょう？",
      answer: 3, unit: "", unknownLabel: "移動後の頂点の x",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。系列2 の平行移動が、ここで部品として戻ってくる。" },
        { layer: 2, text: "前題と変わったのは、聞くものが決定から移動になったこと。元の頂点 $x$ に $+2$ すればよい。" },
        { layer: 3, text: "元の頂点は $(1, 3)$。$x$ 方向 $+2$ で $(3, 3)$。よって $3$。系列2 の合流。" },
      ],
      formulaPreview: "頂点 x: 1 → 3",
    },
    {
      id: "step9", position: 9,
      questionText: "$y = (x-2)^2 + 5$ を $x$ 軸について対称移動したあと、頂点の **$y$ 座標**はいくつでしょう？",
      answer: -5, unit: "", unknownLabel: "対称移動後の頂点の y",
      variationFromPrevious: "qualitative", compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "前題と比べてみよう。平行移動ではなく上下反転——$y$ の符号がひっくり返る。" },
        { layer: 2, text: "前題と変わったのは、移動の種類が対称になったこと。頂点 $(2, 5)$ の $y$ は符号が反転する。" },
        { layer: 3, text: "$x$ 軸対称で $(2, 5) \\to (2, -5)$。よって頂点の $y$ は $-5$。同時に $a$ の符号も反転する（上に凸↔下に凸）。" },
      ],
      formulaPreview: "頂点 y: 5 → −5",
      figureMarker: "<<STANDARD_FORM_VERTEX>>",
    },
    {
      id: "step10", position: 10,
      questionText: "3点 $(0, 2)$、$(1, 3)$、$(-1, 5)$ を通る $y = ax^2 + bx + c$ の **$b$**（$x$ の係数）はいくつでしょう？",
      answer: -1, unit: "", unknownLabel: "b",
      variationFromPrevious: "composite", compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "前題と比べてみよう。頂点情報がないときは一般形で連立する。求めるのは $b$ だけ。" },
        { layer: 2, text: "前題と変わったのは、条件が3点になったこと。$x = 0$ で $c$ が決まり、残り2式で $a$ と $b$ が決まる。" },
        { layer: 3, text: "$(0,2)$ より $c = 2$。$(1,3)$: $a+b+2=3$ → $a+b=1$。$(-1,5)$: $a-b+2=5$ → $a-b=3$。辺々を足して $2a=4$、$a=2$。よって $b = 1-2 = -1$。" },
      ],
      formulaPreview: "a=2, b=−1, c=2",
    },
  ],
  derivation: `**中心の問い** ｜ ばらけた $ax^2+bx+c$ から、どうやって頂点の地図を開く？——第1章で身につけた**平方完成**が、そのままグラフの読み取りボタンだとしたら、一般形に隠れていた部品は何か？

────────

**代数の帰着は、幾何の読み取りになる。**

一般形の定数項 $c$ は $y$ 切片。平方完成で標準形に直すと、系列2 のつまみ $(p,q)$ が見える。第1章の「扱えない形を扱える形に」が、そのままグラフの地図を開く。

<<GENERAL_TO_STANDARD>>

**必然性**：$-b/(2a)$ の暗記だけで符号を急ぐと外れる。平方完成の手つきが砦。

**合流**：平行移動・対称移動・3点決定——系列2 と決定問題が部品になる。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（一般形のグラフ・平行移動・対称・決定）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

一般形に隠れていた部品は、平方完成で標準形にした瞬間に見える頂点・軸・切片である。代数の帰着がグラフの読み取りになる。`,
};

/** FG4: 変域付き最大・最小（全体の形と見ている窓は別物）。 */
export const FG_QUAD_MINMAX_SERIES: LearnerSeries = {
  id: "algebra1_quad_minmax_01",
  title: "変域付き最大・最小",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — 軸と変域の位置関係で最大・最小を読む $10$ 問。",
  patternId: "FG4",
  unit: "algebra_1",
  revelationLabel:
    "2次関数の最大・最小は、頂点が変域の内か外かで決まる。同じ式でも切り取る窓が変われば答えが変わる",
  drivingQuestion:
    "同じお椀なのに、切り取る幅を変えると最大・最小が入れ替わるのはなぜ？——軸と変域の**位置関係**だけが、どの端点・頂点が効くかを決めているとしたら？",
  steps: [
    {
      id: "step1", position: 1,
      questionText: "$y = (x-2)^2 - 5$ について、$0 \\le x \\le 4$ の範囲での**最小値**はいくつでしょう？",
      answer: -5, unit: "", unknownLabel: "最小値",
      variationFromPrevious: null, compareWithStepId: null,
      hints: [
        { layer: 1, text: "系列1 では1次関数の最大は必ず端点だったね。2次でも同じと言い切れる？ 途中に谷があるとしたら、最小はどこに現れそう？" },
        { layer: 2, text: "頂点は $(2, -5)$。変域 $0\\le x\\le 4$ の中に頂点はあるだろうか？" },
        { layer: 3, text: "頂点 $x = 2$ は変域の中。下に凸なので最小は頂点の $y = -5$。**1次と違い、端点以外が効く**——ここが出発点。" },
      ],
      formulaPreview: "頂点が変域内 → 最小 = −5",
      figureMarker: "<<DOMAIN_WINDOW_MIN>>",
    },
    {
      id: "step2", position: 2,
      questionText: "同じ $y = (x-2)^2 - 5$ について、$3 \\le x \\le 5$ の範囲での**最小値**はいくつでしょう？",
      answer: -4, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "same", compareWithStepId: "step1",
      hints: [
        { layer: 1, text: "前題と比べてみよう。式は同じなのに変域だけが変わった。答えは同じままだろうか？" },
        { layer: 2, text: "前題と変わったのは変域だけ。頂点 $x = 2$ は新しい窓の外——最小は軸に近い端点。" },
        { layer: 3, text: "頂点は外。軸に近い端は $x = 3$ で $y = 1 - 5 = -4$。**同じ式でも窓が変われば答えが変わる**（誤概念 F4）。" },
      ],
      formulaPreview: "頂点外 → 端 x=3 で最小 −4",
    },
    {
      id: "step3", position: 3,
      questionText: "同じ $y = (x-2)^2 - 5$ について、$4 \\le x \\le 6$ の範囲での**最小値**はいくつでしょう？",
      answer: -1, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step2",
      hints: [
        { layer: 1, text: "前題と比べてみよう。また窓が右へずれた。軸に近い端はどちらか？" },
        { layer: 2, text: "前題と変わったのは変域の位置。左端 $x = 4$ が軸に近い。" },
        { layer: 3, text: "$x = 4$ で $y = 4 - 5 = -1$。よって最小は $-1$。" },
      ],
      formulaPreview: "端 x=4 で最小 −1",
    },
    {
      id: "step4", position: 4,
      questionText: "$y = -(x-1)^2 + 7$ について、$0 \\le x \\le 3$ の範囲での**最大値**はいくつでしょう？",
      answer: 7, unit: "", unknownLabel: "最大値",
      variationFromPrevious: "qualitative", compareWithStepId: "step3",
      hints: [
        { layer: 1, text: "前題と比べてみよう。今度は上に凸——山のてっぺんが変域の中にあるか？" },
        { layer: 2, text: "前題と変わったのは、凸の向きが逆になったこと。頂点が内なら最大は頂点の $y$。" },
        { layer: 3, text: "頂点 $(1, 7)$ は変域内。上に凸なので最大は $7$。" },
      ],
      formulaPreview: "上に凸・頂点内 → 最大 = 7",
      figureMarker: "<<DOMAIN_WINDOW_MAX>>",
    },
    {
      id: "step5", position: 5,
      questionText: "前題の関数で、最大値をとる **$x$** はいくつでしょう？",
      answer: 1, unit: "", unknownLabel: "最大をとる x",
      variationFromPrevious: "same", compareWithStepId: "step4",
      hints: [
        { layer: 1, text: "前題と比べてみよう。最大値の場所——頂点の $x$ を聞くだけ。" },
        { layer: 2, text: "前題と変わったのは、聞くものが値から $x$ になったこと。" },
        { layer: 3, text: "最大は頂点で、$x = 1$。" },
      ],
      formulaPreview: "最大をとる x = 1",
    },
    {
      id: "step6", position: 6,
      questionText: "$y = (x-1)^2 - 4$ について、$-2 \\le x \\le 3$ の範囲での**最小値**はいくつでしょう？",
      answer: -4, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "qualitative", compareWithStepId: "step5",
      hints: [
        { layer: 1, text: "前題と比べてみよう。端点の $y$ だけ比べて頂点を見落とすと、ここで必ず外れる。" },
        { layer: 2, text: "前題と変わったのは、下に凸で頂点が変域の中にある配置。端だけ見る素朴な方法では足りない。" },
        { layer: 3, text: "頂点 $(1, -4)$ は変域内。最小は $-4$。端点は $x=-2$ で $y=5$、$x=3$ で $y=0$——どちらも頂点より大きい。**端点だけ見る誤り（F3）への必然性の1問**。" },
      ],
      formulaPreview: "頂点内 → 最小 = −4（端点ではない）",
    },
    {
      id: "step7", position: 7,
      questionText: "$y = (x-2)^2 + 1$ について、変域 $0 \\le x \\le a$ で最小値が頂点の値 $1$ になるための、$a$ の**最小の整数**はいくつでしょう？（頂点が変域に入る）",
      answer: 2, unit: "", unknownLabel: "a の最小の整数",
      variationFromPrevious: "inverse", compareWithStepId: "step6",
      hints: [
        { layer: 1, text: "前題までは窓が先にあって答えを出した。今度は向きが逆——最小が頂点値になるような窓の右端を決める。" },
        { layer: 2, text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。頂点 $x = 2$ が窓に入る条件は？" },
        { layer: 3, text: "頂点が内に入るには $a \\ge 2$。最小の整数は $2$。" },
      ],
      formulaPreview: "a ≥ 2 → 最小の整数 a = 2",
    },
    {
      id: "step8", position: 8,
      questionText: "$y = (x-2)^2 + 1$ について、$0 \\le x \\le 1$ の範囲での**最小値**はいくつでしょう？",
      answer: 2, unit: "", unknownLabel: "最小値",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step7",
      hints: [
        { layer: 1, text: "前題と比べてみよう。右端が $1$ で頂点 $2$ に届かない場合——前題の境界の外側。" },
        { layer: 2, text: "前題と変わったのは、$a = 1$ で軸が外にあること。最小は軸に近い端。" },
        { layer: 3, text: "$x = 1$ で $y = 1 + 1 = 2$。よって最小は $2$。" },
      ],
      formulaPreview: "頂点外 → 端 x=1 で最小 2",
    },
    {
      id: "step9", position: 9,
      questionText: "$y = (x-1)^2$ について、$0 \\le x \\le 4$ の範囲での**最大値**はいくつでしょう？",
      answer: 9, unit: "", unknownLabel: "最大値",
      variationFromPrevious: "plus_alpha", compareWithStepId: "step8",
      hints: [
        { layer: 1, text: "前題と比べてみよう。下に凸の最大は、軸から遠い端点。" },
        { layer: 2, text: "前題と変わったのは、聞くものが最小から最大になったこと。軸 $x = 1$ から遠い端は？" },
        { layer: 3, text: "左端までの距離 $1$、右端までの距離 $3$。遠いのは $x = 4$ で $y = 9$。よって最大は $9$。" },
      ],
      formulaPreview: "遠い端 x=4 で最大 9",
    },
    {
      id: "step10", position: 10,
      questionText: "$y = x^2 - 8x + 18$ について、$1 \\le x \\le 4$ の範囲での**最大値**はいくつでしょう？",
      answer: 11, unit: "", unknownLabel: "最大値",
      variationFromPrevious: "composite", compareWithStepId: "step9",
      hints: [
        { layer: 1, text: "前題と比べてみよう。一般形を平方完成してから、系列3 と本系列の判定を重ねる。" },
        { layer: 2, text: "前題と変わったのは、式が一般形なこと。頂点を出してから窓との位置関係を見る。" },
        { layer: 3, text: "$y = (x-4)^2 + 2$。頂点 $(4,2)$ は変域の右端（最小は $2$）。最大は遠い端 $x=1$ で $y = 1 - 8 + 18 = 11$。" },
      ],
      formulaPreview: "遠い端 x=1 で最大 11",
    },
  ],
  derivation: `**中心の問い** ｜ 同じお椀なのに、切り取る幅を変えると最大・最小が入れ替わるのはなぜ？——軸と変域の**位置関係**だけが、どの端点・頂点が効くかを決めているとしたら？

────────

**全体の形と、見ている窓は別物である。**

1次関数は単調なので最大最小は端点だけ。2次は頂点で折り返す。頂点が窓の中ならそこが極値、外なら軸に近い端／遠い端で決まる。

<<DOMAIN_WINDOW_MIN>>

**誤概念**：端点が常に最小（F3）。同じ関数なら答えは同じ（F4）。

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（変域付き最大最小・軸と変域）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

軸と変域の位置関係だけが、どの端点・頂点が効くかを決める。全体の形と見ている窓は別物である。`,
};


/** FG5: 関数記号と図形への応用。 */
export const FG_FUNCTION_NOTATION_SERIES: LearnerSeries = {
  id: "algebra1_function_notation_01",
  title: "関数記号と図形への応用",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — $f(x)$ 記法と、変域付きの図形最大最小 $10$ 問。",
  patternId: "FG5",
  unit: "algebra_1",
  revelationLabel:
    "現実の制約は変域になり、最適化は系列4（頂点と窓）に帰着する。$f(x)$ は対応に名前をつけただけ",
  drivingQuestion:
    "ロープの長さが決まった長方形の面積は、なぜ2次関数になる？——変化させてよい量を $x$ と名づけ、**変域という制約**を先に書くと、最大は頂点の話に帰着するのでは？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText: "$f(x) = 2x + 5$ のとき、$f(3)$ の値はいくつでしょう？",
      answer: 11,
      unit: "",
      unknownLabel: "f(3)",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "系列1 で $y = 2x + 5$ に数を入れるのと、何が同じで何が違うだろう？ $f(3)$ は何を短く書いた記号？",
        },
        {
          layer: 2,
          text: "やることは、かっこ内の数を式の $x$ の場所に置くこと。出てくる数は1つだけ？",
        },
        {
          layer: 3,
          text: "$f(3) = 2\\cdot 3 + 5 = 11$。**$f(3)$ は「$x$ に $3$ を入れた関数の値」の省略記法**——対応に名前をつけただけ。",
        },
      ],
      formulaPreview: "f(3) = 11",
      figureMarker: "<<F_NOTATION_HOLE>>",
    },
    {
      id: "step2",
      position: 2,
      questionText: "$f(x) = 2x + 5$ のとき、$f(-4)$ の値はいくつでしょう？",
      answer: -3,
      unit: "",
      unknownLabel: "f(-4)",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ。変わったのは入れる数の符号だけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、負の数を入れたこと。かけ算の符号に注意。",
        },
        {
          layer: 3,
          text: "$f(-4) = 2\\cdot(-4) + 5 = -3$。",
        },
      ],
      formulaPreview: "f(-4) = −3",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$f(x) = x^2$ のグラフを $x$ 軸方向に $+3$、$y$ 軸方向に $-1$ 平行移動した式は $y + 1 = f(x - 3)$ と書けます。移動後の頂点の **$x$ 座標**はいくつでしょう？",
      answer: 3,
      unit: "",
      unknownLabel: "頂点の x",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$f$ 記法で平行移動を書くと、系列2 の置き換えが短く見える。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが値から移動後の頂点になったこと。$x-3$ の $3$ が横ずれ。",
        },
        {
          layer: 3,
          text: "$y = f(x-3) - 1 = (x-3)^2 - 1$。頂点の $x$ は $3$。",
        },
      ],
      formulaPreview: "頂点 x = 3",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "周の長さが $20$ の長方形で、横を $x$、縦を $10 - x$ とすると面積は $f(x) = x(10 - x)$ です。展開したとき $x^2$ の係数はいくつでしょう？（符号込み）",
      answer: -1,
      unit: "",
      unknownLabel: "x^2 の係数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。図形の条件から $2$ 次の式が立ち上がる。広げたとき $x$ の2乗の係数は？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、場面が図形になったこと。$x(10-x)$ を広げると先頭に何が残る？",
        },
        {
          layer: 3,
          text: "$f(x) = 10x - x^2 = -x^2 + 10x$。$x^2$ の係数は $-1$。",
        },
      ],
      formulaPreview: "f(x) = −x² + 10x → 係数 −1",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "前題の長方形で、横 $x$ と縦 $10 - x$ がどちらも正であるための変域は $0 < x < 10$ です。変域の**右端の数**（含めない端）はいくつでしょう？",
      answer: 10,
      unit: "",
      unknownLabel: "変域の右端",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。長さが正という制約が、変域という窓になる。変域を付け忘れると何が起きそう？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、式から制約の読み取りになったこと。縦が正である境界の数は？",
        },
        {
          layer: 3,
          text: "$x > 0$ かつ $10 - x > 0$ より $0 < x < 10$。右端の数は $10$。**長さは正 → 開区間の変域**。",
        },
      ],
      formulaPreview: "0 < x < 10 → 右端 10",
      figureMarker: "<<RECT_CONSTRAINT>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$f(x) = -x^2 + 10x$ について、$0 < x < 10$ での**最大値**はいくつでしょう？",
      answer: 25,
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。系列4 の道具——頂点が窓の中か——が合流する。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが最大値になったこと。標準形に直すと頂点が見える。",
        },
        {
          layer: 3,
          text: "$f(x) = -(x-5)^2 + 25$。頂点 $(5, 25)$ は変域内。最大は $25$（正方形）。系列4 の合流。",
        },
      ],
      formulaPreview: "最大 = 25（x = 5）",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "もし変域を付けず実数全体で $f(x) = -x^2 + 10x$ の最大を求めると、前題と同じ $25$ になります。では $0 \\le x \\le 4$ に制限したときの最大値はいくつでしょう？",
      answer: 24,
      unit: "",
      unknownLabel: "制限後の最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。頂点 $x = 5$ が窓の外に出た——変域なしでは意味を失う配置。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、窓が $0 \\le x \\le 4$ になり頂点が外に出たこと。最大は軸に近い端。",
        },
        {
          layer: 3,
          text: "頂点は外。上に凸なので最大は軸に近い端 $x = 4$ で $f(4) = 24$。**変域込みでしか解けない必然性**。",
        },
      ],
      formulaPreview: "頂点外 → 端で最大 24",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "周 $20$ の長方形の面積最大が $25$ のとき、そのときの横 $x$ はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "横 x",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題までは面積を求めた。今度は向きが逆——最大面積から辺の長さを戻す。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。頂点の $x$ が答え。",
        },
        {
          layer: 3,
          text: "最大は $x = 5$ のとき。正方形。",
        },
      ],
      formulaPreview: "最大のとき x = 5",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "放物線 $y = 8 - x^2$ と $x$ 軸で囲まれた部分に、底辺が $x$ 軸上で高さが放物線まで届く長方形を内接させ、底辺の右端の $x$ 座標を $t$（$0 < t < \\sqrt{8}$）とします。周の長さ $l(t) = 2t + 2(8 - t^2)$ の、展開後の $t^2$ の係数はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "t^2 の係数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。独立変数を $t$ にした——放物線の $x$ と混同しない。別の文字を使う意味は？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、内接長方形の周になったこと。$l(t) = 2t + 16 - 2t\\cdot t$ の先頭係数。",
        },
        {
          layer: 3,
          text: "$l(t) = -2t^2 + 2t + 16$。$t^2$ の係数は $-2$。",
        },
      ],
      formulaPreview: "l(t) = −2t² + 2t + 16",
      figureMarker: "<<INSCRIBED_RECT>>",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "前題の $l(t) = -2t^2 + 2t + 16$ について、$0 < t < 2\\sqrt{2}$ での**最大値**はいくつでしょう？",
      answer: 16.5,
      answerDisplay: "33/2",
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。式をつくり、変域、最大まで一気。系列4 の頂点読み。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが係数から最大値になったこと。標準形の定数項が最大。",
        },
        {
          layer: 3,
          text: "$l(t) = -2\\left(t - \\dfrac{1}{2}\\right)^2 + \\dfrac{33}{2}$。頂点 $t = \\dfrac{1}{2}$ は変域内。最大は $\\dfrac{33}{2}$。",
        },
      ],
      formulaPreview: "最大 = 33/2",
    },
  ],
  derivation: `**中心の問い** ｜ ロープの長さが決まった長方形の面積は、なぜ2次関数になる？——変化させてよい量を $x$ と名づけ、**変域という制約**を先に書くと、最大は頂点の話に帰着するのでは？

────────

**現実の制約は変域になり、最適化は系列4 に帰着する。**

$f(x)$ は対応に名前をつけた記法。図形では (1) 変数 (2) 変域 (3) $f(x)$ (4) 最大最小、の4段階。

<<RECT_CONSTRAINT>>

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（関数記号・図形応用）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

変化させてよい量を $x$ と名づけ、変域を先に書くと、最大は頂点の話（系列4）に帰着する。`,
};

/** FG6: 3つの形と方程式。 */
export const FG_QUAD_THREE_FORMS_SERIES: LearnerSeries = {
  id: "algebra1_quad_three_forms_01",
  title: "3つの形と方程式",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — 一般形・標準形・因数分解形と、$x$ 軸交点 $10$ 問。",
  patternId: "FG6",
  unit: "algebra_1",
  revelationLabel:
    "3つの形は読みたい部品用の顔。$f(x)=0$ の実数解はグラフと $x$ 軸の交点の $x$ 座標",
  drivingQuestion:
    "同じ放物線なのに、式の書き方を変えると見える部品が変わるのはなぜ？——一般形・標準形・因数分解形は別物ではなく、**読みたい部品用の顔**だとしたら、$f(x)=0$ の解はグラフのどこか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$y = (x + 2)(x - 5)$ のグラフが $x$ 軸と交わる点のうち、**小さい方の $x$ 座標**はいくつでしょう？",
      answer: -2,
      unit: "",
      unknownLabel: "小さい方の x 切片",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "$y = 0$ となる $x$ は、グラフでは何と交わった点の横座標か？ 因数分解形から読める部品は？",
        },
        {
          layer: 2,
          text: "かっこの中が $0$ になる $x$ が交点。小さい方はどれ？",
        },
        {
          layer: 3,
          text: "$x = -2$ または $x = 5$。小さい方は $-2$。**因数分解形は $x$ 切片用の顔**。",
        },
      ],
      formulaPreview: "x 切片 −2 と 5 → 小さい方 −2",
      figureMarker: "<<THREE_FORMS_CHART>>",
    },
    {
      id: "step2",
      position: 2,
      questionText: "同じ関数の、**大きい方の $x$ 座標**はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "大きい方の x 切片",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。もう一方の交点。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、小さい方から大きい方へ。",
        },
        {
          layer: 3,
          text: "$x = 5$。",
        },
      ],
      formulaPreview: "大きい方 x = 5",
    },
    {
      id: "step3",
      position: 3,
      questionText: "$y = 3x^2 - x + 7$ の **$y$ 切片**はいくつでしょう？",
      answer: 7,
      unit: "",
      unknownLabel: "y 切片",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。一般形から読める部品は切片。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、形が一般形になったこと。定数項が何を表す？",
        },
        {
          layer: 3,
          text: "$c = 7$ が $y$ 切片。",
        },
      ],
      formulaPreview: "y 切片 = 7",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$y = 2(x + 1)^2 - \\dfrac{1}{2}$ の頂点の **$y$ 座標**はいくつでしょう？",
      answer: -0.5,
      answerDisplay: "-1/2",
      unit: "",
      unknownLabel: "頂点の y",
      variationFromPrevious: "same",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。標準形から読める部品は頂点。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、形が標準形になったこと。定数項の位置の数が頂点の高さ。",
        },
        {
          layer: 3,
          text: "$q = -\\dfrac{1}{2}$。",
        },
      ],
      formulaPreview: "頂点 y = −1/2",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$y = x^2 - 4x + 7$ と $x$ 軸の共有点はいくつでしょう？（$0$・$1$・$2$ のいずれか）",
      answer: 0,
      unit: "個",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$f(x) = 0$ の実数解の個数は、グラフと $x$ 軸の共有点数——第1章の判別式の再訪。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが切片から交点の個数になったこと。判別式の符号を見る。",
        },
        {
          layer: 3,
          text: "$D = 16 - 28 = -12 < 0$ なので共有点は $0$ 個。**方程式の解＝交点の $x$** という対応が見える転換点。",
        },
      ],
      formulaPreview: "D < 0 → 共有点 0 個",
      figureMarker: "<<DISCRIMINANT_THREE_CASES>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$y = -3(x-2)(x+4)$ の **$y$ 切片**はいくつでしょう？",
      answer: 24,
      unit: "",
      unknownLabel: "y 切片",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。因数分解形から別の部品（切片）を読むには、$x = 0$ を入れる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、形が因数分解形のまま切片を聞くこと。",
        },
        {
          layer: 3,
          text: "$x = 0$ で $y = -3(0-2)(0+4) = -3(-2)(4) = 24$。",
        },
      ],
      formulaPreview: "y 切片 = 24",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$x$ 切片が $-1$ と $4$、$a = 2$ の因数分解形 $y = 2(x+1)(x-4)$ を展開した一般形の**定数項**はいくつでしょう？",
      answer: -8,
      unit: "",
      unknownLabel: "定数項 c",
      variationFromPrevious: "inverse",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題までは形から部品を読んだ。今度は向きが逆——切片から一般形の定数項を作る。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。$x = 0$ の値が定数項。",
        },
        {
          layer: 3,
          text: "$y = 2(x+1)(x-4) = 2(x^2 - 3x - 4) = 2x^2 - 6x - 8$。定数項は $-8$。",
        },
      ],
      formulaPreview: "c = −8",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$y = x^2 - 2x - 3$ について、頂点の $y$ 座標と、$y$ 切片の**差**（頂点の y − y切片）はいくつでしょう？",
      answer: -1,
      unit: "",
      unknownLabel: "差",
      variationFromPrevious: "composite",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。頂点も切片も要る——1つの形だけ見ていては足りない必然性。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、2つの部品の差を聞くこと。標準形と一般形を切り替える。",
        },
        {
          layer: 3,
          text: "$y = (x-1)^2 - 4$。頂点の $y = -4$、$y$ 切片 $= -3$。差は $-4 - (-3) = -1$。**形を切り替える必然性**。",
        },
      ],
      formulaPreview: "−4 − (−3) = −1",
    },
    {
      id: "step9",
      position: 9,
      questionText: "$y = (x-3)^2$ と $x$ 軸の共有点はいくつでしょう？",
      answer: 1,
      unit: "個",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。重解——接する。個数の数え方は第1章と同じ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、判別式が $0$ のケース。交点は1つ（重なっている）。",
        },
        {
          layer: 3,
          text: "頂点が $x$ 軸上。共有点は $1$ 個。",
        },
      ],
      formulaPreview: "接する → 1 個",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$y = x^2 - 7x + 10$ について、$D$ は平方数です。因数分解して得られる交点の $x$ のうち**大きい方**はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "大きい方の交点の x",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。第1章の判別式で個数を確認してから、因数分解で交点を読む合流。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、判別式が正で2交点があり、因数分解できるケース。",
        },
        {
          layer: 3,
          text: "$D = 49 - 40 = 9$。$y = (x-2)(x-5)$。大きい方は $5$。判別式と因数分解の合流。",
        },
      ],
      formulaPreview: "交点 x = 2, 5 → 大きい方 5",
    },
  ],
  derivation: `**中心の問い** ｜ 同じ放物線なのに、式の書き方を変えると見える部品が変わるのはなぜ？——一般形・標準形・因数分解形は別物ではなく、**読みたい部品用の顔**だとしたら、$f(x)=0$ の解はグラフのどこか？

────────

**目的が形を選ばせる。**

一般形→$y$ 切片、標準形→頂点、因数分解形→$x$ 切片。$f(x)=0$ の実数解＝グラフと $x$ 軸の交点の $x$。

<<THREE_FORMS_CHART>>

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（関数と方程式・3つの形）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

3つの形は読みたい部品用の顔であり、$f(x)=0$ の解はグラフと $x$ 軸の交点の $x$ 座標である。`,
};

/** FG7: 2次不等式。 */
export const FG_QUAD_INEQUALITY_SERIES: LearnerSeries = {
  id: "algebra1_quad_inequality_01",
  title: "2次不等式",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — グラフが $x$ 軸の上か下かで範囲を読む $10$ 問。",
  patternId: "FG7",
  unit: "algebra_1",
  revelationLabel:
    "2次不等式の答えは範囲。グラフが $x$ 軸の上／下を読む。判別式が負で常に正なら「すべての実数」もありうる",
  drivingQuestion:
    "方程式の答えが『点』なのに、不等式の答えが『範囲』になるのはなぜ？——グラフが $x$ 軸の**上か下か**を読んでいるだけだとしたら、$x^2>4$ に $x>\\pm 2$ と書く誤りは何を見失っているか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$(x+4)(x-2) > 0$ を満たす整数 $x$ は、$-6 \\le x \\le 6$ の範囲にいくつあるでしょう？",
      answer: 6,
      unit: "個",
      unknownLabel: "整数の個数",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "方程式の解は点。不等式の答えは範囲——グラフが $x$ 軸のどちら側にあるかを読むと見える。外側と内側、どちらが正だろう？",
        },
        {
          layer: 2,
          text: "境界は $-4$ と $2$（含まない）。正になるのは外側。その整数を窓 $-6\\le x\\le 6$ で数える。",
        },
        {
          layer: 3,
          text: "解は $x < -4$ または $x > 2$。整数は $-6,-5$ と $3,4,5,6$ の $6$ 個。**答えは範囲**——ここが出発点。",
        },
      ],
      formulaPreview: "外側の整数 6 個",
      figureMarker: "<<QUAD_INEQ_SIGN>>",
    },
    {
      id: "step2",
      position: 2,
      questionText:
        "$(x+1)(x-5) > 0$ を満たす整数 $x$ は、$-3 \\le x \\le 8$ の範囲にいくつあるでしょう？",
      answer: 5,
      unit: "個",
      unknownLabel: "整数の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。やることは同じ。境界が変わっただけ。",
        },
        {
          layer: 2,
          text: "前題と変わったのは境界が $-1$ と $5$ になったこと。外側を数える。",
        },
        {
          layer: 3,
          text: "$x < -1$ または $x > 5$。整数は $-3,-2$ と $6,7,8$ の $5$ 個。",
        },
      ],
      formulaPreview: "外側の整数 5 個",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$(x+3)(x-4) < 0$ を満たす整数 $x$ は、$-5 \\le x \\le 5$ の範囲にいくつあるでしょう？",
      answer: 6,
      unit: "個",
      unknownLabel: "整数の個数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。不等号の向きが変わった——グラフが下側にある範囲を読む。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、外側から内側へ。境界は含まない。",
        },
        {
          layer: 3,
          text: "解は $-3 < x < 4$。整数は $-2,-1,0,1,2,3$ の $6$ 個。",
        },
      ],
      formulaPreview: "内側の整数 6 個",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$(x+2)(x-3) \\le 0$ を満たす整数 $x$ は、$-5 \\le x \\le 5$ の範囲にいくつあるでしょう？",
      answer: 6,
      unit: "個",
      unknownLabel: "整数の個数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。等号がついた——境界を含むかどうかが変わる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、境界 $-2$ と $3$ を入れること。",
        },
        {
          layer: 3,
          text: "解は $-2 \\le x \\le 3$。整数は $-2,-1,0,1,2,3$ の $6$ 個。",
        },
      ],
      formulaPreview: "境界込み 6 個",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$x^2 > 9$ を満たす $x$ の範囲は、$x < -3$ または $x > 3$ です。正しい側の境界の**絶対値**はいくつでしょう？（「$x > \\pm 3$」と書いてしまう誤りを避ける）",
      answer: 3,
      unit: "",
      unknownLabel: "境界の絶対値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。「$x$ の2乗が $9$ より大きい」を「$x > \\pm 3$」と書くと何が消える？——負の側の範囲が見えなくなる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$x^2 > k$ 型。正しい答えは両外側。境界の絶対値は？",
        },
        {
          layer: 3,
          text: "境界は $\\pm 3$。絶対値は $3$。**不等式の答えは範囲**——片側だけ書くのは誤り。",
        },
      ],
      formulaPreview: "境界の絶対値 = 3",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "$x^2 - 4x - 1 > 0$ の解の境界のうち、**大きい方**はいくつでしょう？（$\\sqrt{\\cdot}$ を使ってよい）",
      answer: 2 + 5 ** 0.5,
      answerDisplay: "2+√5",
      unit: "",
      unknownLabel: "大きい方の境界",
      inputAffordances: ["sqrt"],
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。因数分解できない——解の公式で根を出してからグラフを読む。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、根が平方根を含むこと。大きい方は公式のプラス側。",
        },
        {
          layer: 3,
          text: "根は $2 \\pm \\sqrt{5}$。大きい方は $2 + \\sqrt{5}$。外側が正。",
        },
      ],
      formulaPreview: "大きい境界 = 2+√5",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "$2x^2 + 2x + 5 > 0$ は、すべての実数 $x$ で成り立つでしょうか？ 成り立つなら $1$、成り立たないなら $0$ と答えてください。",
      answer: 1,
      unit: "",
      unknownLabel: "1 または 0",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。判別式が負で常に正なら——解なしではなく「すべての実数」。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$D < 0$ かつ上に開くケース。グラフは $x$ 軸より上で交わらない。",
        },
        {
          layer: 3,
          text: "$D = 4 - 40 = -36 < 0$ で先頭係数正。常に正なので答えは $1$（すべての実数で成り立つ）。",
        },
      ],
      formulaPreview: "常に正 → 1",
      figureMarker: "<<ALWAYS_ABOVE>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "同じ式 $2x^2 + 2x + 5 < 0$ を満たす整数 $x$ はいくつあるでしょう？",
      answer: 0,
      unit: "個",
      unknownLabel: "整数の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。向きが逆——常に正なら「未満」は空集合。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、不等号の向きだけ。解はない。",
        },
        {
          layer: 3,
          text: "常に正なので $< 0$ は解なし。整数は $0$ 個。",
        },
      ],
      formulaPreview: "解なし → 0 個",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "解の範囲が $-2 \\le x \\le 3$ となる不等式 $(x+2)(x-3) \\le 0$ を展開すると $x^2 - x + c \\le 0$ の形になります。定数項 $c$ はいくつでしょう？",
      answer: -6,
      unit: "",
      unknownLabel: "定数項 c",
      variationFromPrevious: "inverse",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題までは範囲を読んだ。今度は向きが逆——範囲から元の式の定数項を戻す。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。積の展開の定数項。",
        },
        {
          layer: 3,
          text: "$(x+2)(x-3) = x^2 - x - 6$。定数項は $-6$。",
        },
      ],
      formulaPreview: "c = −6",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$-x^2 + x + 6 \\ge 0$ を満たす整数 $x$ は、$-5 \\le x \\le 5$ の範囲にいくつあるでしょう？",
      answer: 6,
      unit: "個",
      unknownLabel: "整数の個数",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。先頭が負——向きを反転してから読む合流（第1章不等式＋本系列）。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$a < 0$ で両辺に $-1$ をかけると不等号が反転すること。",
        },
        {
          layer: 3,
          text: "$-x^2 + x + 6 \\ge 0$ ⇔ $x^2 - x - 6 \\le 0$ ⇔ $(x-3)(x+2) \\le 0$。解は $-2 \\le x \\le 3$。整数 $6$ 個。",
        },
      ],
      formulaPreview: "反転して内側 → 6 個",
    },
  ],
  derivation: `**中心の問い** ｜ 方程式の答えが『点』なのに、不等式の答えが『範囲』になるのはなぜ？——グラフが $x$ 軸の**上か下か**を読んでいるだけだとしたら、$x^2>4$ に $x>\\pm 2$ と書く誤りは何を見失っているか？

────────

**不等式はグラフの側の読み取り。**

答えは範囲。$D<0$ で常に正なら「すべての実数」もありうる（解なしではない）。

<<QUAD_INEQ_SIGN>>

<<ALWAYS_ABOVE>>

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（2次不等式）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

不等式の答えは範囲であり、$x>\\pm\\sqrt{k}$ と書く誤りは負の側を見失っている。`,
};

/** FG8: パラメータと文字定数。 */
export const FG_QUAD_PARAMETER_SERIES: LearnerSeries = {
  id: "algebra1_quad_parameter_01",
  title: "パラメータと文字定数",
  subtitle:
    "数Ⅰ・A 関数と関数のグラフより — 文字定数の場合分けと、正の2実数根 $10$ 問。",
  patternId: "FG8",
  unit: "algebra_1",
  revelationLabel:
    "文字定数は場合分けのスイッチ。条件『正の2実数根』はグラフのチェックリスト（判別式・頂点・切片）に翻訳する",
  drivingQuestion:
    "文字 $a$ が入った瞬間、なぜ場合分けが始まる？——$a$ は動く変数ではなく**固定の未知数**で、軸や判別式の位置だけが $a$ で切り替わるとしたら、条件『正の2実数根』はグラフの何枚のチェックか？",
  steps: [
    {
      id: "step1",
      position: 1,
      questionText:
        "$y = x^2 - 8x + a$ で $a = 5$ のとき、判別式 $D$ の値はいくつでしょう？",
      answer: 44,
      unit: "",
      unknownLabel: "D",
      variationFromPrevious: null,
      compareWithStepId: null,
      hints: [
        {
          layer: 1,
          text: "判別式が正なら『2点で交わる』。では『交わる2点の $x$ がどちらも正』には、あと何が要る？——まずは具体の $a$ で $D$ を読む。",
        },
        {
          layer: 2,
          text: "$a$ は固定の未知数。いまは $5$ が入っている。$b^2 - 4ac$ を数にする。",
        },
        {
          layer: 3,
          text: "$D = 64 - 4\\cdot 1\\cdot 5 = 44$。**$a$ は動く変数ではなく固定の未知数**。",
        },
      ],
      formulaPreview: "D = 44",
      figureMarker: "<<DISCRIMINANT_THREE_CASES>>",
    },
    {
      id: "step2",
      position: 2,
      questionText: "前題のとき、$x$ 軸との共有点はいくつでしょう？",
      answer: 2,
      unit: "個",
      unknownLabel: "共有点の個数",
      variationFromPrevious: "same",
      compareWithStepId: "step1",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。$D > 0$ なら共有点はいくつ？",
        },
        {
          layer: 2,
          text: "前題と変わったのは、聞くものが $D$ の値から個数になったこと。",
        },
        {
          layer: 3,
          text: "$D = 44 > 0$ なので共有点は $2$ 個。",
        },
      ],
      formulaPreview: "共有点 2 個",
    },
    {
      id: "step3",
      position: 3,
      questionText:
        "$y = x^2 - 4x + m$ が $x$ 軸と異なる2点で交わるのは $m < 4$ のときです。この境界の数 $4$ は、$D = 0$ になる $m$ の値です。その境界の値はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "境界の m",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step2",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。『異なる2交点』になる条件の境界は、$D = 0$ のとき。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$m$ が境界を動くこと。$D = 16 - 4m = 0$ のとき。",
        },
        {
          layer: 3,
          text: "$16 - 4m = 0$ より $m = 4$。境界の値は $4$。",
        },
      ],
      formulaPreview: "境界 m = 4",
    },
    {
      id: "step4",
      position: 4,
      questionText:
        "$x^2 - 3x + a > 0$ がすべての実数 $x$ で成り立つ整数 $a$ は、$0 \\le a \\le 8$ の範囲にいくつあるでしょう？",
      answer: 6,
      unit: "個",
      unknownLabel: "整数 a の個数",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step3",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。『すべての $x$ で正』——系列7 の常に正が、文字定数の条件になる。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$D < 0$ かつ先頭係数正という条件。$a$ の下限は？",
        },
        {
          layer: 3,
          text: "$D = 9 - 4a < 0$ より $a > \\dfrac{9}{4}$。整数は $3,4,5,6,7,8$ の $6$ 個。",
        },
      ],
      formulaPreview: "a > 9/4 → 整数 6 個",
    },
    {
      id: "step5",
      position: 5,
      questionText:
        "$f(x) = x^2 - 8x + 7$ について、$0 \\le x \\le 2$ での**最小値**はいくつでしょう？（軸は変域の外）",
      answer: -5,
      unit: "",
      unknownLabel: "最小値",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step4",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。文字定数 $a$ を動かして最小を求めるのではなく——$a$ は固定。軸と窓の位置だけを見る（系列4）。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、定義域付き最小で軸が窓の外に出たケース。最小は軸に近い端。",
        },
        {
          layer: 3,
          text: "軸 $x = 4$ は右側の外。下に凸なので最小は近い端 $x = 2$ で $f(2) = -5$。",
        },
      ],
      formulaPreview: "軸外 → 端で最小 −5",
      figureMarker: "<<DOMAIN_WINDOW_MIN>>",
    },
    {
      id: "step6",
      position: 6,
      questionText:
        "同じ $f(x) = x^2 - 8x + 7$ について、$0 \\le x \\le 6$ での**最小値**はいくつでしょう？",
      answer: -9,
      unit: "",
      unknownLabel: "最小値",
      variationFromPrevious: "same",
      compareWithStepId: "step5",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。窓が広がって軸が中に入った。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、軸 $x = 4$ が変域内になったこと。最小は頂点。",
        },
        {
          layer: 3,
          text: "$f(4) = 16 - 32 + 7 = -9$。",
        },
      ],
      formulaPreview: "軸内 → 頂点で最小 −9",
    },
    {
      id: "step7",
      position: 7,
      questionText:
        "方程式 $x^2 - 2a x + (a + 3) = 0$ が**異なる正の2実数根**をもつ整数 $a$ は、$0 \\le a \\le 6$ の範囲にいくつあるでしょう？（判別式だけでは足りない）",
      answer: 4,
      unit: "個",
      unknownLabel: "整数 a の個数",
      variationFromPrevious: "qualitative",
      compareWithStepId: "step6",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。正の2実数根——判別式が正だけでは不足。頂点の位置と切片も要る。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、3条件（$D>0$・和が正・積が正）の交わり。失敗例は頂点が左／切片が非正。",
        },
        {
          layer: 3,
          text: "$D > 0$ ⇔ $a^2 - a - 3 > 0$ ⇔ $a \\ge 3$（整数）。和 $2a > 0$・積 $a+3 > 0$ も $a \\ge 3$ で満たす。$a = 3,4,5,6$ の $4$ 個。**3条件の交わりでしか決まらない**。",
        },
      ],
      formulaPreview: "3条件の交わり → 4 個",
      figureMarker: "<<PARAM_ROOT_FAIL>>",
    },
    {
      id: "step8",
      position: 8,
      questionText:
        "$f(x) = x^2 - 2a x + 3$ を $0 \\le x \\le 4$ で見るとき、最小値が頂点の $y$ と一致するのは軸が変域内のときです。その軸の位置 $a$ の**右端の境界**はいくつでしょう？",
      answer: 4,
      unit: "",
      unknownLabel: "右端の a",
      variationFromPrevious: "inverse",
      compareWithStepId: "step7",
      hints: [
        {
          layer: 1,
          text: "前題までは条件から $a$ の個数を数えた。今度は向きが逆——最小＝頂点となる $a$ の境界を戻す。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、与えられているものと求めるものが入れ替わったこと。軸 $x = a$ が $0 \\le a \\le 4$。",
        },
        {
          layer: 3,
          text: "右端の境界は $a = 4$。",
        },
      ],
      formulaPreview: "右端 a = 4",
    },
    {
      id: "step9",
      position: 9,
      questionText:
        "$g(x) = -x^2 + 4x + 1$ について、$0 \\le x \\le 3$ での**最大値**はいくつでしょう？",
      answer: 5,
      unit: "",
      unknownLabel: "最大値",
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step8",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。最大値の場合分け——軸と変域の中央ではなく、軸が窓の中か。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、上に凸で最大を聞くこと。軸 $x = 2$ は変域内。",
        },
        {
          layer: 3,
          text: "$g(2) = -4 + 8 + 1 = 5$。",
        },
      ],
      formulaPreview: "最大 = 5",
    },
    {
      id: "step10",
      position: 10,
      questionText:
        "$a = 4$ のとき $y = x^2 - 2a x + (a + 1)$ について、$0 \\le x \\le 6$ での**最小値**はいくつでしょう？（判別式・変域・不等式の合流）",
      answer: -11,
      unit: "",
      unknownLabel: "最小値",
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
      hints: [
        {
          layer: 1,
          text: "前題と比べてみよう。判別式（系列6）＋変域最大最小（系列4）＋不等式（系列7）の合流。",
        },
        {
          layer: 2,
          text: "前題と変わったのは、$a$ を入れてから窓の中の最小を読むこと。$y = x^2 - 8x + 5$。",
        },
        {
          layer: 3,
          text: "軸 $x = 4$ は変域内。最小は $y = -11$。$D = 64 - 20 = 44 > 0$ で $x$ 軸とも交わる——条件と最大最小が同じグラフの話であることの合流。",
        },
      ],
      formulaPreview: "合流 → 最小 −11",
    },
  ],
  derivation: `**中心の問い** ｜ 文字 $a$ が入った瞬間、なぜ場合分けが始まる？——$a$ は動く変数ではなく**固定の未知数**で、軸や判別式の位置だけが $a$ で切り替わるとしたら、条件『正の2実数根』はグラフの何枚のチェックか？

────────

**文字定数は場合分けのスイッチ。**

条件をグラフのチェックリスト（判別式・頂点・切片）に翻訳する。

<<PARAM_ROOT_FAIL>>

**出典**

- 池田洋介（2023）『数学Ⅰ・A 入門問題精講 改訂版』旺文社
  — 第2章（パラメータ・文字定数・正の2実数根）の節構成を参考。問題の値はすべてオリジナル。

────────

**問いに戻ると**

$a$ は固定の未知数であり、『正の2実数根』はグラフの複数枚のチェックの交わりである。`,
};


export const FUNCTIONS_GRAPHS_SERIES_LIST: LearnerSeries[] = [
  FG_FUNCTION_LINEAR_SERIES,
  FG_QUAD_STANDARD_SERIES,
  FG_QUAD_GENERAL_GRAPH_SERIES,
  FG_QUAD_MINMAX_SERIES,
  FG_FUNCTION_NOTATION_SERIES,
  FG_QUAD_THREE_FORMS_SERIES,
  FG_QUAD_INEQUALITY_SERIES,
  FG_QUAD_PARAMETER_SERIES,
];
