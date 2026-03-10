---
title: "個人的VSCodeの設定まとめ"
description: "個人的に使っているVSCodeの設定をまとめました。"
pubDate: 2025-12-28
updatedDate: 2026-03-10
---

僕は普段から`Visual Studio Code`をメインのコードエディタとして使用していて、PC ごとにいちいち設定をするのが面倒なので、設定ファイルと使用している拡張機能をまとめようと思います！

## 設定ファイル

```jsonc title="setting.json"
{
  // エディタのテーマ設定
  "workbench.colorTheme": "GitHub Dark",
  "workbench.iconTheme": "material-icon-theme",
  // スティッキースクロールを無効化
  "workbench.tree.enableStickyScroll": false,
  "editor.stickyScroll.enabled": false,
  "terminal.integrated.stickyScroll.enabled": false,
  // スタートアップエディタを無効化
  "workbench.startupEditor": "none",
  // ファイルの末尾に改行を挿入
  "files.insertFinalNewline": true,
  // ウィンドウ全体のズームレベル
  "window.zoomLevel": 1,
  // 空のフォルダをまとめて表示しない
  "explorer.compactFolders": false,
  // ドラック＆ドロップの確認ダイアログを無効化
  "explorer.confirmDragAndDrop": false,
  // フォント設定
  "terminal.integrated.fontFamily": "Ricty Diminished, Consolas, 'Courier New', monospace",
  "editor.fontFamily": "Ricty Diminished, Consolas, 'Courier New', monospace",
  // フォントサイズ
  "terminal.integrated.fontSize": 13,
  "editor.fontSize": 13,
  // 保存時の自動フォーマット
  "editor.formatOnSave": true,
  // タブサイズ
  "editor.tabSize": 4,
  // すべての空白を表示
  "editor.renderWhitespace": "all",
  // 曖昧なUnicode文字のハイライトを無効化
  "editor.unicodeHighlight.ambiguousCharacters": false,
  // コメント内のUnicodeハイライトを無効化
  "editor.unicodeHighlight.includeComments": false,
  // 不可視文字のハイライトを無効化
  "editor.unicodeHighlight.invisibleCharacters": false,
  // 非ASCII文字のハイライトを無効化
  "editor.unicodeHighlight.nonBasicASCII": false,
  // TypeScriptのインレイヒント設定
  "typescript.inlayHints.parameterNames.enabled": "all",
  // GitHub Copilotの設定
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "scminput": false,
  },
  // ファイルごとの設定
  "[sql]": {
    "editor.defaultFormatter": "mtxr.sqltools",
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[mdx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
}
```

## 拡張機能

| 名称                                          | 備考                            |
| --------------------------------------------- | ------------------------------- |
| Japanese Language Pack for Visual Studio Code | 日本語サポート                  |
| GitHub Theme                                  | テーマ                          |
| Material Icon Theme                           | ファイル・フォルダ用アイコン    |
| Docker                                        | Docker 関連                     |
| Docker DX                                     | Docker 補完                     |
| Remote Development                            | コンテナ開発                    |
| Playwright Test for VSCode                    | テストツール                    |
| Git Graph                                     | Git Log                         |
| GitHub Copilot                                | AI コード補完                   |
| GitHub Copilot Chat                           | AI コード補完 （チャット）      |
| Code Spell Checker                            | 誤字脱字                        |
| Path Intellisense                             | パス補完                        |
| IntelliCode                                   | AI 支援開発                     |
| Error Lens                                    | エラー表示                      |
| Live Server                                   | プレビューサーバー              |
| Prettier - Code formatter                     | コードフォーマッター            |
| ESLint                                        | リンター補助                    |
| Auto Close Tag                                | HTML タグ補助                   |
| Auto Rename Tag                               | HTML タグ補助                   |
| css-var-color-decorator                       | CSS カラー表示                  |
| MDX                                           | MDX サポート                    |
| Markdown All in One                           | マークダウンサポート            |
| SQLTools                                      | SQL フォーマッター・DB 操作補助 |
| Biome                                         | フォーマッター・リンター        |
| Draw.io Integration                           | Draw.io が VSCode で使用可能    |
| shadcn/ui                                     | UI コンポーネントライブラリ     |
| Tailwind CSS IntelliSense                     | Tailwind CSS サポート           |
| Prisma                                        | Prisma 補助                     |
