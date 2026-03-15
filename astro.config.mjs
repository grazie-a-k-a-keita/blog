// @ts-check

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { astroExpressiveCode } from "astro-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import remarkLinkCard from "remark-link-card-plus";
import { appConfig } from "./src/shared/app.config";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [[remarkLinkCard, { cache: true, noThumbnail: true }]],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{ target: "_blank", rel: ["noopener", "noreferrer"] },
			],
		],
	},
	site: appConfig.siteUrl,
	integrations: [
		react(),
		sitemap(),
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
