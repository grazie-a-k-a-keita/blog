---
title: ".astroファイルにBiomeを適応する"
description: ".astroファイルにBiomeを適応する方法についての話です。"
pubDate: 2026-03-15
---

この前までAstroを使用する際、`.astro`ファイルにフォーマッターとして、[Prettier](https://prettier.io/)を使用していましたが、開発を続けてるとフォーマッターが重くなるので、[Biome](https://biomejs.dev/)に切り替えることにした。

https://docs.astro.build/ja/editor-setup/#prettier

## 環境

- エディタ：Visual Studio Code
  - formatOnSaveの設定を有効にしてる → 重くなるのはこれのせい!??
- フォーマッター：Prettier → Biome

## 背景

普段はBiomeをメインで使っているので、ほんとはBiomeを最初から使いたかったけど、HTML部分をフォーマットさせる方法がわからなかった。

特にカスタムルール等作らない主義なので、Biomeのほうが、シンプルで速いから使いやすいと感じている。

## ドキュメントをちゃんと読んだ

`html.experimentalFullSupportEnabled`を`true`にすればいいっぽい。

https://biomejs.dev/ja/reference/configuration/#html

### 前提

そもそも、現在は実験的なサポートをしている段階（2026/03/15時点）

### 設定方法

```diff lang="json" title="biome.json"
{
  "$schema": "https://biomejs.dev/schemas/2.4.6/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "ignoreUnknown": false },
  "formatter": { "enabled": true, "indentStyle": "tab" },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
+  "html": {
+    "formatter": { "enabled": true },
+    "experimentalFullSupportEnabled": true
+  },
  "javascript": {
    "formatter": { "quoteStyle": "double" }
  },
  "css": {
    "parser": { "tailwindDirectives": true }
  },
  "assist": {
    "enabled": true,
    "actions": { "source": { "organizeImports": "on" } }
  },
+  "overrides": [
+    {
+      "includes": ["**/*.astro"],
+      "linter": { "rules": { "correctness": { "useJsxKeyInIterable": "off" } } }
+    }
+  ]
}
```

`overrides`を使ったら、特定のルールだけ除外することもできた。

以上。👋
