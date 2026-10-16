import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactElement } from "react";
import satori from "satori";
import sharp from "sharp";
import { appConfig } from "@/shared/app.config";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const FONT_DIR = path.join(
	process.cwd(),
	"node_modules/@fontsource/noto-sans-jp/files",
);
const LOGO_PATH = path.join(process.cwd(), "src/asset/logo.png");

// satori は woff2 を読めないため、fontsource の woff（サブセット分割済み）を使う。
// 同名で渡すと最初のサブセットしか参照されないので、サブセットごとに別名を付けて fontFamily に全て並べる
async function loadFonts() {
	const files = (await readdir(FONT_DIR)).filter((f) =>
		f.endsWith("-700-normal.woff"),
	);
	return Promise.all(
		files.map(async (f, i) => ({
			name: `Noto Sans JP ${i}`,
			data: await readFile(path.join(FONT_DIR, f)),
			weight: 700 as const,
			style: "normal" as const,
		})),
	);
}

async function loadLogo() {
	const png = await sharp(LOGO_PATH).resize(180, 180).png().toBuffer();
	return `data:image/png;base64,${png.toString("base64")}`;
}

let assets:
	| Promise<[Awaited<ReturnType<typeof loadFonts>>, string]>
	| undefined;

// satori に渡す要素ツリーを JSX なしで組み立てるための小さなヘルパー
const h = (
	type: string,
	style: Record<string, string | number>,
	children?: ReactElement | string | ReactElement[],
	props: Record<string, unknown> = {},
): ReactElement => ({
	type,
	key: null,
	props: { ...props, style: { display: "flex", ...style }, children },
});

/** 記事タイトルを載せた OG 画像（PNG）を生成する */
export async function renderOgImage(title: string): Promise<Buffer> {
	assets ??= Promise.all([loadFonts(), loadLogo()]);
	const [fonts, logo] = await assets;

	const svg = await satori(
		h(
			"div",
			{
				width: "100%",
				height: "100%",
				padding: "36px",
				// ロゴの背景色に合わせた外枠
				backgroundColor: "#acbbd8",
				fontFamily: fonts.map((f) => `"${f.name}"`).join(", "),
			},
			h(
				"div",
				{
					width: "100%",
					height: "100%",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "56px 64px",
					borderRadius: "20px",
					backgroundColor: "#ffffff",
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
					color: "#0c0a09",
				},
				[
					h("div", { fontSize: 56, lineHeight: 1.5 }, title),
					h("div", { alignItems: "center", gap: "28px" }, [
						h(
							"img",
							{
								width: "90px",
								height: "90px",
								borderRadius: "20px",
								border: "3px solid #d6e3ed",
							},
							undefined,
							{ src: logo, width: 90, height: 90 },
						),
						h("div", { flexDirection: "column", gap: "4px" }, [
							h("div", { fontSize: 34 }, appConfig.author.name),
							h("div", { fontSize: 26, color: "#6e7b85" }, appConfig.xHandle),
						]),
					]),
				],
			),
		),
		{ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, fonts },
	);

	return sharp(Buffer.from(svg)).png().toBuffer();
}
