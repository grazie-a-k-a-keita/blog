---
title: "TypeScriptにパターンマッチングを導入する"
description: "ts-patternを使ってTypeScriptにパターンマッチングを導入する方法。"
pubDate: 2025-10-13
updatedDate: 2026-03-22
---

今回は**ts-pattern**というライブラリの紹介。

https://github.com/gvergnaud/ts-pattern

TypeScriptでパターンマッチングを実現するためのライブラリで、複雑な条件分岐を簡潔に表現できます。

より安全で読みやすいコードを書くための大きな助けとなります。

## ts-patternとは

公式ではこのように記載があります。

> より適切で安全な条件式を記述しましょう。パターンマッチングにより、複雑な条件を単一の簡潔な式で表現できます。コードが短くなり、読みやすくなります。網羅性チェックにより、考えられるケースをすべて網羅的にチェックできます。

なかなか良さそう。

ちなみに、パターンマッチングというのは、関数型プログラミング言語でよく使われる手法らしい。

データの構造に基づいて処理を分岐させる方法で、Python、Rust、Swift、Haskellなどで広く使われている。

これをTypeScriptで実現しようというのがts-patternです。

## パターンマッチングのメリット

まずは、従来のSwitch文での条件分岐を例に、ステータスを判断し、それに応じたメッセージを返す関数を考えます。

```ts
type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error" };

function getState(fetchState: FetchState) {
  switch (fetchState.status) {
    case "loading":
      return "ローディング中...";
    case "success":
      return `${fetchState.data}`;
    case "error":
      return "エラーが発生しました";
  }
}
```

普通のSwitch文ですがなんだか見た目も冗長で、型安全性もあまり感じられない気がします。

ここで試しに`other`という状態を追加します。

```ts {5}
type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error" }
  | { status: "other" };

function getState(fetchState: FetchState) {
  switch (fetchState.status) {
    case "loading":
      return "ローディング中...";
    case "success":
      return `${fetchState.data}`;
    case "error":
      return "エラーが発生しました";
  }
}

// "other"が追加されたのに、Switch文での網羅性チェックがされない...
```

書き手のミスで、`other`のケースを忘れてしまう可能性があります。

一応、上記を回避する方法はあります。

```ts
type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error" }
  | { status: "other" };

function safeGuard(arg: never) {}

function getState(fetchState: FetchState) {
  switch (fetchState.status) {
    case "loading":
      return "ローディング中...";
    case "success":
      return `${fetchState.data}`;
    case "error":
      return "エラーが発生しました";
    default:
      safeGuard(fetchState);
    // Error: 型'{ status: "other"; }'の引数を型'never'のパラメーターに割り当てることはできません。
  }
}

getState({ status: "other" });
// Output: undefined
```

しかし、上記のように冗長なコードを書く必要があり、実行時にはエラーになってくれません。

では、ts-patternを使うとどうなるでしょうか？

```ts
import { match } from "ts-pattern";

type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error" }
  | { status: "other" };

function getState(fetchState: FetchState) {
  return match(fetchState)
    .with({ status: "loading" }, () => "ローディング中...")
    .with({ status: "success" }, (state) => `${state.data}`)
    .with({ status: "error" }, () => "エラーが発生しました")
    .exhaustive();
  // Error: この式は呼び出し可能ではありません。型'NonExhaustiveError<{ status: "other"; }>'には呼び出しシグネチャがありません。
}

getState({ status: "other" });
// Output: throw new NonExhaustiveError(input);
// [Error]: Pattern matching error: no pattern matches value "other"
```

上記のように、コンパイル時に網羅性チェックがされ、実行時にも例外が発生してくれます。👏

ここで変わったのは以下です。

1. 実行時の安全性が上がった
2. 条件分岐が文から式になった
3. 可読性が上がった

## 嬉しいポイント

### より複雑なケースにも対応できる

これは「2(形)×2(色)」の簡単な例ですが、以下のように複数の条件を組み合わせたパターンマッチングも可能です。

Switch文の場合は、ネストさせる必要があるので、可読性はかなり上がります。

```ts
import { match } from "ts-pattern";

type Shape = { type: "circle" } | { type: "square" };
type Color = "red" | "blue";
type ColoredShape = { shape: Shape; color: Color };

// ts-patternでパターンマッチングをする場合
const getColoredShape1 = (coloredShape: ColoredShape): string => {
  return match(coloredShape)
    .with({ shape: { type: "circle" }, color: "red" }, () => "Red Circle")
    .with({ shape: { type: "circle" }, color: "blue" }, () => "Blue Circle")
    .with({ shape: { type: "square" }, color: "red" }, () => "Red Square")
    .with({ shape: { type: "square" }, color: "blue" }, () => "Blue Square")
    .exhaustive();
};

// switch文で同じことをする場合
const getColoredShape2 = (coloredShape: ColoredShape): string => {
  const { shape, color } = coloredShape;
  switch (shape.type) {
    case "circle":
      switch (color) {
        case "red":
          return "Red Circle";
        case "blue":
          return "Blue Circle";
      }
      break;
    case "square":
      switch (color) {
        case "red":
          return "Red Square";
        case "blue":
          return "Blue Square";
      }
  }
};
```

### letをconstにできる

ts-patternの場合、式として評価されるので、**let**を使う必要がなくなり、**const**にできます。

これはめちゃくちゃシンプルな例ですが、以下のように書けます。

```ts
import { match } from "ts-pattern";

const NUMBER = 5;

// 式なのでそのままconstで宣言できる
const isOdd = match((NUMBER % 2) as 0 | 1)
  .with(0, () => false)
  .with(1, () => true)
  .exhaustive();

// 文なので条件によって値を変更したい場合は、再代入するしかない
let isEven = false;

if (NUMBER % 2 === 0) {
  isEven = true;
}
```

まだまだ他にも、ts-patternにはたくさんの機能が備わっているので、興味がある方はぜひ[ドキュメント](https://github.com/gvergnaud/ts-pattern)を覗いてみてください。

## デメリット

ts-patternは内部的に型レベルの計算に依存しており、プロジェクトの型チェックが遅くなる可能性があるそうです。

Switch文を使っている方が、パフォーマンス的には良いかもしれません。

ただ、型安全性と保守性という面で考えると、個人的にはts-patternを使う方が良いと思っていますが、ここはトレードオフの部分なので、プロジェクトの規模や要件に応じて選択するといいと思います。

## 参考

https://dev.to/gvergnaud/bringing-pattern-matching-to-typescript-introducing-ts-pattern-v3-0-o1k
