---
title: "Prettier、ESLintを卒業してBiomeを導入する"
description: "JavaScript・TypeScriptプロジェクトでPrettierとESLintに代わる新しいツール「Biome」の導入。設定の一元管理、高速なフォーマット・リント機能、VSCode拡張機能の設定、Git Hooksを使った自動チェックまでやります。"
pubDate: 2025-09-23
updatedDate: 2026-03-15
---

今回は、**Biome**を導入します。

今まではPrettierとESLintを組み合わせて使用するのが一般的だったように思うのですが、Biomeはこれらのツールの機能を統合して提供しています。

インストール、設定、GitHooksあたりをまとめます。

## Biomeとは

これです。

https://biomejs.dev/ja

設定を一元管理できるのが嬉しい。

## 所感

### 良かった点

- 設定を一元管理できる
  - 設定がシンプル
  - 別にルールをカスタマイズしなくても、いい感じに規制してくれる
- 速い

### 微妙？な点

- ルールをカスタマイズしたい場合、実験的なものとかも割とあるイメージ

1年近く使用してますが、個人的には今のところ、そこまで不満は感じてません。

個人とか、小・中規模で普通に開発する分には十分な気がします。

## 導入

### インストール

```sh
npm install --save-dev --save-exact @biomejs/biome
```

### 設定

実行したら、`biome.json`が生成されます。

```sh
npx @biomejs/biome init
```

私は、こんな感じで設定してます。

- 好みのフォーマット設定
- TailwindCSSをよく使用するので、見栄えを良くするためにクラスをソートする設定
- Git管理しているファイルに対してのみ実行する設定

```diff lang="json" title="biome.json"
{
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
  "vcs": {
+    "enabled": true,
    "clientKind": "git",
+    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
+    "indentWidth": 4,
+    "lineWidth": 120
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
+      "nursery": {
+        "useSortedClasses": {
+          "level": "warn",
+          "fix": "safe",
+          "options": {}
+        }
+      }
    }
  },
  "javascript": {
    "formatter": {
+      "quoteStyle": "single",
+      "jsxQuoteStyle": "single"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

お好みの設定に変更してください。

https://biomejs.dev/ja/reference/configuration/

### 使い方

```sh
# ./app配下に対してFormatを実行
npx @biomejs/biome format --write ./app

# ./app配下に対してLintを実行
npx @biomejs/biome lint --write ./app

# ./app配下に対してFormat、Lint、インポートの整理を実行
npx @biomejs/biome check --write ./app
```

### VSCodeの設定

#### 拡張機能

https://marketplace.visualstudio.com/items?itemName=biomejs.biome

以下をサポートしてくれます。

- 保存時にフォーマット
- コードリファクタリング
- インライン提案とクイックフィックス

#### settings.json

この辺の設定を入れておくと、ファイル保存時に勝手にインポート文のソートやら、フォーマットが行われます。

```json title="settings.json"
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": { "source.fixAll.biome": "explicit" }
}
```

https://biomejs.dev/ja/reference/vscode/#%E4%BF%9D%E5%AD%98%E6%99%82%E3%81%AE%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%83%88

### Git Hooks

Gitのコミットやプッシュ時にフォーマットやリントを実行して、コードの品質や一貫性を維持できます。

今回は**Lefthook**というツールを使用します。

```sh
# lefthookのインストール
npm install lefthook --save-dev
```

ルートに`lefthook.yml`というファイルを追加する。

```yaml title="lefthook.yml"
# コミット前にフォーマットチェックやリントを行い、安全な修正を行う
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      stage_fixed: true

# プッシュ前にフォーマットとリントのチェックを行う
pre-push:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {push_files}
```

Gitプロジェクトにインストールして設定を完了します。

```sh
npx lefthook install
```

これで、コミット、プッシュ時にエラーがあると自動的にチェックしてくれるようになります。

https://github.com/evilmartians/lefthook

https://biomejs.dev/ja/recipes/git-hooks/

## おわりに

この構成であれば、フォーマッターやリンターの設定を修正したいときは、`biome.json`を見るだけで済むので、かなり楽です。

開発体験もかなり良くなったと感じてます。✌️
