---
title: "Zodで型安全性を強化するブランド型（Branded Type）を活用する"
description: "TypeScriptとZodで型の混同を防ぐブランド型（Branded Type）の実装方法とメリット。"
pubDate: 2025-10-04
updatedDate: 2026-03-25
---

JavaScriptは柔軟で便利ですが、その反面、型の不一致や予期せぬ値の扱いでバグが発生しやすいという弱点もあります。

実行するまでわからない...

そこで登場したのが型という概念を組み込んだTypeScriptです。

JavaScriptの弱みであった型による静的チェックを導入することで、バグの早期発見が可能になりました。

ただし、TypeScriptには**同じ構造の型は同じものとして扱う**という特徴があります。

JavaやPHPに慣れ親しんでいる方からすると、違和感のある型構造かもしれません。

例えば、「ユーザー」と「商品」を区別したい場合、同じ構造である限りはエラーにはなりません。

```typescript title="TypeScriptの例"
class User {
  constructor(
    public id: number,
    public name: string,
  ) {}
}

class Product {
  constructor(
    public id: number,
    public name: string,
  ) {}
}

// UserとProductはどちらもidとnameを持つクラスなので、「互換性」があるとみなされる
// エラーにはならない！
const user: User = new Product(1, "Product");

console.log(user);
// Output: Product { id: 1, name: 'Product' }
```

User型の変数に「商品」のデータを入れても動作します...

そこで役立つのが**ブランド型**（Branded Type）です。

「幽霊型」という呼び方もあるみたいですね！

今回は、TypeScriptの型システムの特徴を理解しつつ、ブランド型を使って型の区別を強化する方法まとめます。

## 2パターンの型区別

型の区別には大きく分けて以下の2パターンあります。

1. 名前的型付け
2. 構造的型付け

### 名前的型付け（Nominal Typing）

型の名前が一致するかどうかで互換性を判断する方式で、構造が同じでも名前が違えば別物として扱うのが特徴です。

#### 採用している言語の例

- Java
- PHP
- C#

```java title="Javaの例"
class User {
    public int id;
    public String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

class Product {
    public int id;
    public String name;

    public Product(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        // 型の「名前」が違うのでエラーになる
        User user = new Product(1, "Product");
        // error: incompatible types: Product cannot be converted to User
    }
}
```

### 構造的型付け（Structural Typing）

型の構造が同じなら互換性ありとみなす方式で、名前が違っても構造が同じなら代入可能となります。

#### 採用している言語の例

- Go
- TypeScript

サンプルは上記の「TypeScriptの例」を参照ください。

この柔軟さのおかげで直感的なオブジェクトの操作や、一時的な型の定義が容易になります。

特に、モックの作成時とかに、適当なオブジェクトを作りたいときとかはかなり楽です。

## 個人的に微妙なところ

これは個人的にですが、構造的型付けの思想自体は肯定派ですが、TypeScriptの構造的部分型という機能が厄介だなと感じるシーンが多々あります...

例えば、こんなケース

```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

type Product = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "Alice",
  age: 30,
};

const product: Product = {
  id: 1,
  name: "Product",
};

function printProductName(product: Product) {
  console.log(product);
}

printProductName(user);
// Output: { id: 1, name: 'Alice', age: 30 }
// Product型に存在しない、ageまでもが渡ってしまう...
```

このように、User型はProduct型のスーパーセットであるため、User型の値をProduct型のパラメータに渡すことができます。

つまり、構造が**完全一致**じゃなくても渡せる場合があるため、意図せず不要な値が渡る可能性があるんですね...

## なぜ構造的型付けなのか？

TypeScriptが構造的型付けを採用する理由は、JavaScriptが動的型付け言語であり、**ダック・タイピング**という型付けスタイルを取っているのが理由として挙げられるみたいです。

> If it walks like a duck and quacks like a duck, it must be a duck（もしもそれがアヒルのように歩き、アヒルのように鳴くのなら、それはアヒルに違いない）

つまり、そのオブジェクトが「ID」と「名前」を持っているなら、Userともみなせるし、Productともみなせる。

みたいなイメージでしょうか。

## ブランド型（Branded Type）

ブランド型とは、型を区別するための意味を型に持たせることで、その型を別物として扱うテクニックです。

TypeScriptの型システムだけで表現できる手法で、実行時には通常の値と変わりません。

```typescript
type UserId = {
  // UserIdというブランドを付与
  __userId: never;
  id: number;
};

type ProductId = {
  // ProductIdというブランドを付与
  __productId: never;
  id: number;
};

const printProductId = (userId: ProductId) => {
  console.log(userId);
};

// 型アサーションを使用して、UserIdとして定義する！
const userId = { id: 1 } as UserId;

// エラーが発生する
printProductId(userId);
// 型'UserId'の引数を型'ProductId'のパラメーターに割り当てることはできません。
// プロパティ'__productId'は型'UserId'にありませんが、型'ProductId'では必須です。
```

これで「ユーザーID」と「商品ID」を別物として区別できるようになります。

付与するブランドには意味のある名前をつけて、値を持たせる必要はないため、`never`型を使用して、実行時には存在しないプロパティとして定義するのが一般的みたい。

ただこれでもいいんですが、`as`を使用しているのがスマートじゃないですね。

## もっとスマートに

上記を踏まえて、**Zod**を使用すれば、もっとスマートにブランド型を実装できます。

https://zod.dev

ちなみに、ZodとはTypeScript向けのスキーマ宣言およびバリデーションライブラリです。

```sh
npm install zod
```

## Zodでの実装例

Zodの`brand()`メソッドを使用すれば、ブランド型を簡単に実装できます。

```typescript
import { z } from "zod";

// 1. Zodのスキーマ定義 + brand()メソッドでブランド型を定義
const UserIdSchema = z.number().brand<"UserId">();
const ProductIdSchema = z.number().brand<"ProductId">();

// 2. スキーマから型を生成
type UserId = z.infer<typeof UserIdSchema>;
type ProductId = z.infer<typeof ProductIdSchema>;
// => type UserId = number & z.core.$brand<"UserId">
// => type ProductId = number & z.core.$brand<"ProductId">

// 3. スキーマの構造に一致するデータをパースすることで自動的にブランドを付与できる
const userId = UserIdSchema.parse(1);
const productId = ProductIdSchema.parse(2);
// => const userId: number & z.core.$brand<"UserId">
// => const productId: number & z.core.$brand<"ProductId">

function getUserById(userId: UserId) {
  console.log(userId);
}

function getProductById(productId: ProductId) {
  console.log(productId);
}

// OKパターン
getUserById(userId);
getProductById(productId);

// NGパターン
getUserById(productId);
// => プロパティ'[$brand]'の型に互換性がありません。
```

更に、Zodを使用するメリットは、`parse()`メソッドを使用することで、型の検証も同時に行える点です。

## ブランド型が使える場面

個人的にはドメインモデルの型定義などで有効に活用できると感じています。

ブログ記事の例でいうと、以下のような感じでしょうか。

```typescript
import { z } from "zod";

const articleSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .brand("Article");

type Article = z.infer<typeof articleSchema>;

export const findAll = async (): Promise<Article[]> => {
  // 記事データを取得する処理
  const articles = await fetch();

  return articles.map((article) =>
    articleSchema.parse({
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      createdAt: new Date(article.createdAt),
      updatedAt: new Date(article.updatedAt),
    }),
  );
};
```

上記のようにすることで、`findAll()`メソッドで取得できるデータは、必ず型検証済みで、且つ必要なデータだけ保持しているArticle型であることが担保できます。

## 終わりに

構造的型付けはTypeScriptの型システムの根幹で、ときに便利ですが、ときに意図しない型の互換性が発生することがあります。

ブランド型を適切に使用することで、構造的型付けの利便性を損なわずに、型の区別を強化できます。

Zodの`brand()`を使えば実行時検証と型安全を両立でき、バグ予防や可読性向上に寄与します。

どのような場面で使用するかの見極めはある程度必要ですが、導入は軽量で効果も高いと感じました。🚀
