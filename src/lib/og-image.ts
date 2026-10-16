import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
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
	const png = await sharp(LOGO_PATH).resize(144, 144).png().toBuffer();
	return `data:image/png;base64,${png.toString("base64")}`;
}

let assets:
	| Promise<[Awaited<ReturnType<typeof loadFonts>>, string]>
	| undefined;

/** 記事タイトルを載せた OG 画像（PNG）を生成する */
export async function renderOgImage(title: string): Promise<Buffer> {
	assets ??= Promise.all([loadFonts(), loadLogo()]);
	const [fonts, logo] = await assets;

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "80px",
					backgroundColor: "#fafaf9",
					color: "#0c0a09",
					fontFamily: fonts.map((f) => `"${f.name}"`).join(", "),
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								fontSize: 64,
								lineHeight: 1.4,
								wordBreak: "break-all",
							},
							children: title,
						},
					},
					{
						type: "div",
						props: {
							style: { display: "flex", alignItems: "center", gap: "24px" },
							children: [
								{
									type: "img",
									props: {
										src: logo,
										width: 72,
										height: 72,
										style: { borderRadius: "9999px" },
									},
								},
								{
									type: "div",
									props: {
										style: { fontSize: 36, color: "#57534e" },
										children: appConfig.title,
									},
								},
							],
						},
					},
				],
			},
		},
		{ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, fonts },
	);

	return sharp(Buffer.from(svg)).png().toBuffer();
}
