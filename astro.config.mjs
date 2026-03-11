// @ts-check

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode, { astroExpressiveCode } from "astro-expressive-code";
import { appConfig } from "./src/shared/app.config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {},
  site: appConfig.siteUrl,
  integrations: [
    react(),
    sitemap(),
    expressiveCode(),
    astroExpressiveCode({
      themes: ["github-light", "github-dark"],
      themeCssSelector: (theme) => {
        if (theme.type === "dark") return ".dark";
        return ":root";
      },
      useDarkModeMediaQuery: false,
    }),
  ],
  adapter: cloudflare(),
});
