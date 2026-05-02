---
title: "個人的VSCodeの設定まとめ"
description: "個人的に使っているVSCodeの設定をまとめました。"
pubDate: 2025-12-28
updatedDate: 2026-05-02
---

僕は普段から`Visual Studio Code`をメインのコードエディタとして使用していて、PC ごとにいちいち設定をするのが面倒なので、設定ファイルと使用している拡張機能をまとめようと思います。

ほぼ自分用ですが、参考になれば嬉しいです

## 設定ファイル

```jsonc title="setting.json"
{
  // ==================================================
  // 全体の設定
  // ==================================================
  "workbench.iconTheme": "material-icon-theme",
  "workbench.tree.enableStickyScroll": false,
  "workbench.startupEditor": "none",
  "workbench.editor.empty.hint": "hidden",

  "editor.fontFamily": "JetBrains Mono",
  "editor.fontSize": 12,
  "editor.tabSize": 4,
  "editor.formatOnSave": true,
  "editor.renderWhitespace": "all",
  "editor.accessibilitySupport": "off",
  "editor.stickyScroll.enabled": false,
  "editor.unicodeHighlight.ambiguousCharacters": false,
  "editor.unicodeHighlight.includeComments": false,
  "editor.unicodeHighlight.invisibleCharacters": false,
  "editor.unicodeHighlight.nonBasicASCII": false,
  "editor.insertSpaces": false,

  "terminal.integrated.fontFamily": "JetBrainsMono Nerd font",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.initialHint": false,
  "terminal.integrated.stickyScroll.enabled": false,

  "explorer.compactFolders": false,
  "explorer.confirmDragAndDrop": false,

  "files.insertFinalNewline": true,

  "search.mode": "reuseEditor",

  // ==================================================
  // JSONスキーマのダウンロードを許可するドメインの設定
  // ==================================================
  "json.schemaDownload.trustedDomains": {
    "https://biomejs.dev": true,
    "https://ui.shadcn.com/schema.json": true,
  },

  // ==================================================
  // GitHub Copilotの設定
  // ==================================================
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "scminput": false,
  },
  "chat.viewSessions.orientation": "stacked",

  // ==================================================
  // 言語ごとの設定
  // ==================================================
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome",
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[mdx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
  },
  "[terraform]": {
    "editor.defaultFormatter": "hashicorp.terraform",
    "editor.formatOnSave": true,
    "editor.formatOnSaveMode": "file",
  },
  "[terraform-vars]": {
    "editor.defaultFormatter": "hashicorp.terraform",
    "editor.formatOnSave": true,
    "editor.formatOnSaveMode": "file",
  },
}
```

## 使ってる拡張機能

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)
- [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform)
- [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [Edit CSV](https://marketplace.visualstudio.com/items?itemName=janisdd.vscode-edit-csv)
- [css-var-color-decorator](https://marketplace.visualstudio.com/items?itemName=meouwu.css-var-color-decorator)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
