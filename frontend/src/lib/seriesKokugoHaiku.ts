/**
 * 国語ユニット（俳句）系列①「五七五のかたち（音数とリズム）」。
 *
 * 正典: 推理式指導読方MVP仕様書（国語版第3弾）§3.2（系列①背骨）・§5（型）・§6（moraCount）・§8（audit）。
 * 背骨: docs/段階0_俳句背骨_kokugo.md（(b)自由律で確定・10-step）。
 *
 * 数学版のお手本（TRIG_GENERAL_ANGLE_SERIES 等）を mirror しつつ、国語固有の
 * 中核ふるまいを守る：
 *  - ヒント3層＝比較の指さし（L1 呼びかけ／L2 差異1つ／L3 模範句側を指す）。**代筆は L3 でも禁止**（G10）。
 *  - 音数チェックは正誤でなく可視化（meterPolicy: "visualize"。字余りも俳句・G2）。
 *  - creation step に模範解答フィールドを型レベルで持たない（代筆禁止を型で担保）。
 *  - 観点セルフチェックは読み比べ（step1）の後の creation step にのみ出す（発見が先・G1）。
 *  - 図は Step1（入口）と Step7（質的変化）のみ（フェードアウトする足場）。
 *
 * 模範句の現物は mentorTexts.ts にのみ置く（背骨・docs には書かない・G12）。
 * 全 mentorText の reading の音数は countMora で検証済み。
 */

import type { KokugoSeries } from "./types";

/** 系列①：五七五のかたち（音数とリズム）。 */
export const KOKUGO_HAIKU_FORM_SERIES: KokugoSeries = {
  id: "kokugo_haiku_form_01",
  title: "五七五のかたち（音数とリズム）",
  subtitle:
    "俳句ユニットより — 声に出して[拍]を数え、五・七・五という『器』が何をしてくれるかを $10$ の問いで感じとる。",
  genreId: "haiku",
  unit: "俳句",
  drivingQuestion:
    "なぜ五・七・五に「しばる」と、ことばは減るのに、かえって見たものが濃くうつるのだろう？",
  steps: [
    // ── Step1 comparison 基本原形：読み比べ・声に出して数える ──────────
    {
      id: "step1",
      position: 1,
      kind: "comparison",
      questionText:
        "二つの句を、声に出して読んでみよう。手をたたきながら[拍]（音のかず）を数えると、それぞれいくつになる？ 二つの句で、同じところはどこ？",
      mentorTextRefs: ["haiku_furuike", "haiku_nanohana"],
      hints: [
        {
          layer: 1,
          text: "声に出すと、ことばはいくつかのかたまりに分かれるね。手をたたきながら読むと、ひとつの句で手を何回たたくかな？ 二つの句をくらべて、たたく数はどうだろう？",
        },
        {
          layer: 2,
          text: "小さい「ゃゅょ」は前の音にくっつくから、たたくのは前の音と一回だけ。のばす「ー」・つまる「っ」・はねる「ん」は、それぞれ一回たたくよ。この数え方で二つの句をくらべると、何が見えてくる？",
        },
        {
          layer: 3,
          text: "「ふるいけや／かわずとびこむ／みずのおと」は $5$・$7$・$5$。「なのはなや／つきはひがしに／ひはにしに」も $5$・$7$・$5$。作者もことばもぜんぜんちがうのに、音のかたち（[上五]・[中七]・[下五]）は同じ。これが俳句の『器』だね。",
        },
      ],
      variationFromPrevious: null,
      compareWithStepId: null,
      figureMarker: "<<HAIKU_MORA_STEP1>>",
    },

    // ── Step2 exercise 同：音数の識別（拗音・促音・長音・撥音） ──────────
    {
      id: "step2",
      position: 2,
      kind: "exercise",
      questionText:
        "「給食でラーメン食べたおいしいっ」は、ぜんぶで何[音数]でしょう？ 手をたたいて数えてみよう。",
      mentorTextRefs: ["orig_kyushoku"],
      input: {
        type: "choice",
        options: ["16音", "17音", "18音"],
        answerIndex: 1,
      },
      hints: [
        {
          layer: 1,
          text: "前の句と同じ数え方でいいよ。何が同じで、何が違う？ 違うのは中のことばだけ。声に出して、たたきながら数えてみよう。",
        },
        {
          layer: 2,
          text: "前題と変わったのは「小さい字やのばす音があること」だけ。「きゅ」「しょ」は前とくっついて一回、「ー」「ん」「っ」はそれぞれ一回。ここだけ気をつければ、数え方は前と同じ。",
        },
        {
          layer: 3,
          text: "「きゅう／しょ／く／で」で $5$、「ラー／メ／ン／た／べ／た」…と数えると中は $7$、「お／い／し／い／っ」で $5$。合わせて $17$。小さい字は前の音に乗るだけ、のばす・つまる・はねるは一回ずつ——これが数え方のきまり。",
        },
      ],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
    },

    // ── Step3 exercise 逆：語順の並べ替え（読む→組み立てる） ──────────
    {
      id: "step3",
      position: 3,
      kind: "exercise",
      questionText:
        "バラバラになった三つのかたまりを、五・七・五の順にならべて、意味の通る句にしよう。",
      input: {
        type: "reorder",
        segments: ["かえりみち", "ゆうやけが", "やまをそめてる"],
        answerOrder: [1, 2, 0],
      },
      hints: [
        {
          layer: 1,
          text: "これまでは出来上がった句を「読んで」数えてきたね。今度は逆に、自分で「組み立てる」番。何が同じで何が違う？ かたまりの音を数えるのは同じだよ。",
        },
        {
          layer: 2,
          text: "前題までと変わったのは「向き」だけ——読むのではなく、ならべる。まず $5$ 音のかたまりを見つけて上に、$7$ 音を真ん中に。どのかたまりが $5$ でどれが $7$ か、数えて分けてみよう。",
        },
        {
          layer: 3,
          text: "「ゆうやけが」は $5$ 音、「やまをそめてる」は $7$ 音、「かえりみち」は $5$ 音。$5$-$7$-$5$ の器に入れると「ゆうやけが／やまをそめてる／かえりみち」。読むのと逆に、音の数を手がかりに組み立てられたね。",
        },
      ],
      variationFromPrevious: "inverse",
      compareWithStepId: "step2",
    },

    // ── Step4 comparison ＋α：字余りと定型の比較（型の縁） ──────────
    {
      id: "step4",
      position: 4,
      kind: "comparison",
      questionText:
        "よく似た二つの句を読みくらべよう。声に出して数えると、どこかが少しちがう。どこがちがう？",
      mentorTextRefs: ["orig_yuyake_teikei", "orig_yuyake_jiamari"],
      hints: [
        {
          layer: 1,
          text: "前の句と同じ光景だね。何が同じで、何が違う？ 二つを声に出してくらべて、どちらかがふくらんでいないか、音を数えてみよう。",
        },
        {
          layer: 2,
          text: "変わったのは真ん中のかたまり一つだけ。片方は $7$ 音ぴったり、もう片方は数えると一つ多くない？ どちらも同じことを言っているのに、音の数だけがちがう。",
        },
        {
          layer: 3,
          text: "「やまをそめてる」は $7$ 音、「やまをそめている」は $8$ 音。ことばを少しのばすと、器からはみ出す。でも、どちらもちゃんと句として読める——ぴったりの型と、少しはみ出した形、その両方を知っておくと、器のちょうどよさが分かるね。",
        },
      ],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step1",
    },

    // ── Step5 creation 同：本歌取・一語差し替え ──────────
    {
      id: "step5",
      position: 5,
      kind: "creation",
      questionText:
        "芭蕉の句のかたちを借りて、まねっこで作ってみよう（[本歌取]）。「蛙（かわず）」のところに、池に飛びこむ何か・あなたの見たものを $3$ 音で入れてみて。",
      mentorTextRefs: ["haiku_furuike"],
      input: {
        type: "fillIn",
        template: "古池や ＿＿＿飛びこむ 水の音",
        slotConstraints: [{ moraCount: 3 }],
      },
      creationCheck: {
        meterTarget: [5, 7, 5],
        meterPolicy: "visualize",
        selfChecklist: [
          "声に出して、五・七・五になっているか手をたたいて確かめた",
          "入れたことばは、句の中でしっくりくる",
        ],
      },
      hints: [
        {
          layer: 1,
          text: "元の句と、あなたが作る句、何が同じで何を変える？ かたちはそのまま、変えるのは一つのことばだけだよ。",
        },
        {
          layer: 2,
          text: "変えるのは「かわず（蛙）」のところ一つだけ。ここは $3$ 音。あなたのことばも $3$ 音にすると、まわりの音がくずれない。声に出して数えてみよう。",
        },
        {
          layer: 3,
          text: "芭蕉は「かわず（蛙）」が池に飛びこむ音をとらえたね。「ふるいけや」「とびこむ」「みずのおと」はそのまま。あなたは同じ場所に、$3$ 音の「池に飛びこむ何か」を置く番——作り方は元の句が見せてくれている。",
        },
      ],
      variationFromPrevious: "same",
      compareWithStepId: "step1",
    },

    // ── Step6 creation ＋α：本歌取・二語差し替え ──────────
    {
      id: "step6",
      position: 6,
      kind: "creation",
      questionText:
        "今度は真ん中「山をそめてる」はそのままに、上と下の二か所（それぞれ $5$ 音）を、あなたの見た景色に変えてみよう。",
      mentorTextRefs: ["orig_yuyake_teikei"],
      input: {
        type: "fillIn",
        template: "＿＿＿＿＿ 山をそめてる ＿＿＿＿＿",
        slotConstraints: [{ moraCount: 5 }, { moraCount: 5 }],
      },
      creationCheck: {
        meterTarget: [5, 7, 5],
        meterPolicy: "visualize",
        selfChecklist: [
          "上と下の二か所、それぞれ五音になっているか数えた",
          "真ん中とつながって、一つの景色になっている",
        ],
      },
      hints: [
        {
          layer: 1,
          text: "前の問題と、何が同じで何が違う？ かたちを借りて変えるのは同じ。変える場所の数だけがちがうよ。",
        },
        {
          layer: 2,
          text: "前は変えるところが一つだった。今度は上と下の二つに増えた——これが増えた条件。真ん中はさわらず、二か所とも $5$ 音でそろえるのがコツ。",
        },
        {
          layer: 3,
          text: "元の「夕焼けが／山をそめてる／かえりみち」は、上 $5$・下 $5$。真ん中の $7$ 音を残して上下を入れかえても、器はこわれない。二つの $5$ を、あなたの景色のことばで満たしてみよう——形の作り方は元の句が見せている。",
        },
      ],
      variationFromPrevious: "plus_alpha",
      compareWithStepId: "step5",
    },

    // ── Step7 comparison 質的変化：定型と自由律の読み比べ ──────────
    {
      id: "step7",
      position: 7,
      kind: "comparison",
      questionText:
        "これまでの句と、次の二つの句を読みくらべよう。声に出すと、音のかぞえ方の「きまり」が、これまでと同じかな？ 何が同じで、何が違う？",
      mentorTextRefs: ["free_seki", "free_wakeitte"],
      hints: [
        {
          layer: 1,
          text: "これまでの句と、この二つ、何が同じで何が違う？ 声に出して数えてみよう。五・七・五の器に、きちんとおさまっているだろうか？",
        },
        {
          layer: 2,
          text: "変わったのは一つ——音の数を「そろえているか、そろえていないか」。これまでは器に合わせていた。この句たちは、数にしばられず、言いたいことの長さのまま流れている。それでも句として心にのこる。",
        },
        {
          layer: 3,
          text: "「せきをしても／ひとり」は数えると $9$ 音、器に入っていない。「わけいっても…」もそう。それでもさびしさや、山の深さが伝わってくる。五・七・五は強い器だけれど、器を外しても俳句は作れる——器があることの意味は、外した句とくらべると、よけいにはっきりするね。",
        },
      ],
      variationFromPrevious: "qualitative",
      compareWithStepId: "step1",
      figureMarker: "<<HAIKU_FREE_STEP7>>",
    },

    // ── Step8 comparison 観点抽出：よい俳句の特徴を選ぶ・書く ──────────
    {
      id: "step8",
      position: 8,
      kind: "comparison",
      questionText:
        "ここまで、いろいろな句を読みくらべてきたね。あなたが「いいな」と思った句には、どんなところがあった？ 下のリストから選んだり、自分のことばで書いたりしてみよう。",
      pickViewpoints: true,
      hints: [
        {
          layer: 1,
          text: "どの句が心にのこった？ その句と、あまりのこらなかった句、何が同じで何が違ったかな。ちがいの中に、あなたが見つけた「いいところ」がかくれているよ。",
        },
        {
          layer: 2,
          text: "たとえば、音がそろっているところ？ 見えないものが見えてくるところ？ 短いのに広がるところ？ 一つに決めなくていい。あなたが「これ」と思った一つを、まず選んでみよう。",
        },
        {
          layer: 3,
          text: "正解はないよ。芭蕉の句で「音」に気づいた人、蕪村の句で「東と西の広がり」に気づいた人、放哉の句で「短さ」に気づいた人——みんなちがっていい。あなたの気づきが、これから句を作るときの「めじるし」になる。",
        },
      ],
      variationFromPrevious: "same",
      compareWithStepId: "step7",
    },

    // ── Step9 creation 複合：型を選んで題材を変えて一句 ──────────
    {
      id: "step9",
      position: 9,
      kind: "creation",
      questionText:
        "いよいよ自分で作ってみよう。五・七・五の器に入れても、放哉たちのように器を外してもいい。あなたの選んだかたちで、見たこと・感じたことを一句にしてみて。（作品と、よみがなを書いてね）",
      mentorTextRefs: ["orig_yuyake_teikei", "free_seki"],
      input: { type: "haikuText" },
      creationCheck: {
        meterTarget: [5, 7, 5],
        meterPolicy: "visualize",
        selfChecklist: [
          "声に出して読んで、リズムを確かめた",
          "五・七・五にするか、外すか、自分で選んだ",
          "step8 で見つけた「いいところ」を一つ入れてみた",
        ],
      },
      hints: [
        {
          layer: 1,
          text: "これまでの「まねっこ」と、何が同じで何が違う？ 音を数えるのは同じ。今度は、かたちを使うか外すかも、題材も、あなたが選ぶ。",
        },
        {
          layer: 2,
          text: "step7 で見た「器を外す」ことと、step5・6 でやった「作る」ことを、重ねてみよう。まず、五・七・五にするか外すかを決める。それから、step8 で選んだ「いいところ」を一つ入れてみる。",
        },
        {
          layer: 3,
          text: "作り方はもう手の中にあるよ。器を使うなら、音を数えながら $5$・$7$・$5$ に。外すなら、言いたいことの長さのまま。メーターは正解を出す機械じゃなく、あなたの音を見せる鏡——見ながら、あなたの一句をととのえてね。",
        },
      ],
      variationFromPrevious: "composite",
      compareWithStepId: "step6",
    },

    // ── Step10 creation 自由制作：一句自作 ──────────
    {
      id: "step10",
      position: 10,
      kind: "creation",
      questionText:
        "最後は、まったく自由に一句。題材も、かたちも、あなたのもの。できた句は「清書カード」にして、だれかと読み合ってみよう（句会）。",
      input: { type: "haikuText" },
      creationCheck: {
        meterTarget: [5, 7, 5],
        meterPolicy: "visualize",
        selfChecklist: [
          "声に出して読んで、いちばんしっくりくる形にした",
          "この句で、いちばん伝えたいことは何か言える",
        ],
      },
      hints: [
        {
          layer: 1,
          text: "前の一句と、何が同じで何が違う？ 作り方は同じ。今度はヒントも「めじるし」も気にせず、あなたの見た世界を、あなたのことばで。",
        },
        {
          layer: 2,
          text: "むずかしく考えなくていい。今日いちばん心が動いたものを、一つ思いうかべる。それを、声に出して気持ちいい長さで置いてみる。それだけで一句になる。",
        },
        {
          layer: 3,
          text: "俳句は、たった十七音（かそれ以下）で世界を切りとる小さな器。うまく作ろうとしなくていい。あなたが「これ」と思った景色や気持ちを、正直に置く——それがいちばんいい句になる。できたら、だれかに読んでもらおう。",
        },
      ],
      variationFromPrevious: "composite",
      compareWithStepId: "step9",
    },
  ],
};

/** 国語（俳句）系列のリスト。カタログ登録は段階3のUI統合で行う。 */
export const KOKUGO_HAIKU_SERIES_LIST: KokugoSeries[] = [
  KOKUGO_HAIKU_FORM_SERIES,
];
