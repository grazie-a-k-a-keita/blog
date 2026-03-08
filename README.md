## blog

### プレビュー

Wranglerを使ってプロジェクトをローカルでプレビューします。

```bash
pnpm astro build && pnpm wrangler pages dev ./dist
```

### デプロイ

https://docs.astro.build/ja/guides/deploy/cloudflare/

```bash
pnpm astro build && pnpm wrangler pages deploy ./dist
```
