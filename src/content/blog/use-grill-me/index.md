---
title: "grill-meでAIに詰めてもらうという体験"
description: "grill-meというスキルを使用してみた所管など"
pubDate: 2026-05-27
---

GitHub CopilotなどのAIチャットは以前から使用してましたが、今更ですが、Claude Codeを使い始めて、本格的にAIを使いたいなというモチベが湧いてきました。

ただ、どうしてもこういう使い方になりがちでした。

1. ざっくりした要件を投げる
2. 出てきたものを手直しする

これでもアウトプットは出て、効率化してる感じはあるものの、なんとなく納得感が薄かったり、自分の中で整理しきれていないまま先に進んでいる感覚がありました。

そのモヤモヤを解消してくれたのが、「grill-me」というスキルでした。（少し話題になっているかもしれませんが...）

## grill-meとは

一言でいうと、「AIに自分の計画や設計を徹底的に問い詰めてもらうスキル」です。

`/grill-me <やりたいこと>`と打つと、Claude Codeは「詰める係」に徹し、答えを出すのではなく、問いを投げ続けてくれます。

## 使ってみた場面

### 設計を詰めるとき

機能の設計を考えていたとき、頭の中には大まかな方針があり、「なんとなくこれでいけそう」という状態でClaude Codeに渡すと、「なんとなく」をそのまま実装してくれます。

そんなときに、`/grill-me`を使うと、Claude Codeは実行フェーズに入らず、こんな問いを投げてきます。

> 「この設計で想定しているエラーケースは何ですか？私のおすすめは〇〇のケースを先に洗い出すことです」

自分では気づいていなかった観点を突かれて、返答を重ねるたびに、自分の考えが整理され、不明だった箇所が言語化されます。

結果として、自分とAIの認識がほとんど一致し、手直しがほぼ不要なアウトプットが得られることが増えました。

### この記事を書くとき

こんな感じで、この記事も大枠を作成してもらいました。

```bash
❯ /grill-me @blog/xxxxx/index.md にブログでのAI利活用の記事として、マークダウンで記事を作成しようと思っています。内容はgrill-meのスキルについての感触が良かったので、grill-meをトピックにしようと思います。読んでて飽きないぐらいのボリュームで草案を作成してほしいです。
```

AIの返答はこんな感じで、10回ほどのやり取りを経て、草案が完成しました。

```bash
了解です。記事の草案作成に向けて、一つずつ詰めていきましょう。

---
Q1: 読者層はどんな人を想定していますか？

社内ブログとのことですが、エンジニア向けですか？それとも非エンジニアも読む前提ですか？

私のおすすめ: エンジニア寄りだが、Claude Code を使っていない人にも届く想定で書く。「Claude Code を知らなくても、AI と仕事する感覚が変わった話」として読めるようにする。

...
```

## Before・After

使用前後でこのような変化がありました

|                        | Before                           | After                                         |
| ---------------------- | -------------------------------- | --------------------------------------------- |
| AIへの渡し方           | ざっくりした要件をそのまま投げる | `/grill-me`でざっくりした要件をそのまま投げる |
| 自分の思考             | 曖昧な箇所は曖昧なまま           | 問いに答える中で整理される                    |
| アウトプットの精度     | 手直しが必要なことが多い         | 納得感が高く、そのまま使えることが増えた      |
| アウトプットまでの時間 | 短い                             | 長い                                          |

上記のテーブルにもある通り、アウトプットまでの時間は質問攻めにされる分、やっぱり長くなります...

## 仕組みはシンプル

面白いのは、このスキルの中身がたった数行だということです。

```markdown
---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the codebase instead.
```

これだけです。

AIに「答えを出す役」ではなく「問いを立てる役」を与えることで、体験が変わりました！

## まとめ

「AIに詰めてもらう」という使い方は、少し時間がかかりますが、自分の思考の解像度が上がっていく感覚がありました。

AIを使って作業を始める際はいつでも、ぜひ使ってみてほしいなと思います！

## 参考

- https://zenn.dev/ryonakae/articles/8783c6b3ead2cb#%E3%81%BE%E3%81%A8%E3%82%81
- https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md
- https://www.skills.sh/mattpocock/skills/grill-me
