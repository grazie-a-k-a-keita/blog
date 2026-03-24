---
title: "サクッと始めるTypeScript"
description: "初心者向けTypeScript環境構築のまとめ。"
pubDate: 2025-10-05
updatedDate: 2026-03-24
---

今回は、**TypeScript**の環境構築についてまとめます。

なるべくシンプルな構成にします。

ターミナルでコマンド操作ができる方であれば、初心者でもセットアップできる内容です。

## 準備

まず、TypeScriptを動かすには**Node.js**の環境が必要です。

ここからNode.jsをインストールできます。

https://nodejs.org/ja/download

### 余談

私は**nodebrew**というNode.jsのバージョン管理ツールを使用していますが、とくにこだわりが無ければ、先程の公式サイトからインストールすれば問題ないです。

https://github.com/hokaccha/nodebrew

バージョン確認を行って、バージョンが表示されればOK。👌

```sh
node -v
# v22.18.0
```

## TypeScript実行まで

では早速、TypeScriptをインストールしていきましょう。

まずは、任意の作業ディレクトリに移動して、以下のコマンドでプロジェクトを作成します。

```sh
npm init -y
# "package.json"が作成されたらOK
```

次に、TypeScriptをインストールします。

```sh
npm install typescript
# "node_modules"と"package-lock.json"が作成されたらOK

npx tsc -v
# Version 5.9.3
```

では、実際にTypeScriptを動かしてみましょう。

まずは、実行用のファイルを作成します。

```sh
mkdir -p src && touch src/index.ts
```

TypeScriptファイルに、以下のコードを記述してみます。

```ts title="src/index.ts"
const helloWorld: string = "Hello World";
console.log(helloWorld);
```

実行します。

```sh
# まずは、tscコマンドでコンパイルしてから、生成されたindex.jsを実行している
npx tsc src/index.ts && node src/index.js
# Hello World
```

`Hello World`が出力されたら成功です。

## ちょっと応用

ただ、今のままだと

1. 実行ごとに毎回コンパイルを行って
2. JavaScriptファイルを生成して
3. nodeコマンドで実行する

というのは手間なので、TypeScriptファイルを変更したら、JavaScriptファイルを生成せずとも勝手に実行されるように設定しましょう。

今回は、**tsx**というものを使用します。

> tsxはTypeScriptExecuteの略で、TypeScriptを実行するためのNode.js拡張機能です。

nodeコマンドと同じように使えるみたいです。

```sh
# tsxインストール
npm install -D tsx

# まずはコンパイルされたファイルを削除しておきましょう
rm src/index.js

# 実行
npx tsx src/index.ts
# Hello World
```

これで、JavaScriptのコンパイルされたファイルを生成せずとも、実行できました。

## ウォッチモード

tsxのデフォルトでは以下の**ディレクトリ内のファイル以外**の変更を監視して、**変更**があるたびにスクリプトを再実行できる便利機能があります。

- node_modules
- bower_components
- vendor
- dist
- 隠しディレクトリ（.\*）

```sh
# tsxのあとに"watch"をつけるだけ
npx tsx watch src/index.ts
```

そしたら、`src/index.ts`を好きに変更してみましょう。

保存するたびに再実行されているはずです。

## スクリプトに登録

最後に、`package.json`にコマンドを登録して、実行を簡単にしていきましょう。

```json title="package.json" {7}
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "^5.9.3"
  },
  "devDependencies": {
    "tsx": "^4.20.6"
  }
}
```

より厳密にチェックしたい方は、`tsc --noEmit`を先に実行させることで、型チェックも行うようにするのもおすすめです。

```json
// tsc --noEmitを先に実行させることで型チェックも行うようにする例
{
  "scripts": {
    "dev": "tsc --noEmit && tsx watch src/index.ts"
  }
}
```

ここまでできたら、あとは以下のコマンドを実行したら、TypeScriptの開発・実行環境の出来上がりです。

```sh
npm run dev

# > typescript@1.0.0 dev
# > tsx watch src/index.ts

# Hello World
```

お疲れ様でした！🚀
