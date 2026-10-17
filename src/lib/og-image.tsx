import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { appConfig } from "@/shared/app.config";

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

const [fonts, logo] = await Promise.all([loadFonts(), loadLogo()]);
const fontFamily = fonts.map((f) => `"${f.name}"`).join(", ");

/** 記事タイトルを載せた OG 画像（PNG）を生成する */
export async function renderOgImage(title: string): Promise<Buffer> {
	const svg = await satori(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				padding: "36px",
				// ロゴの背景色に合わせた外枠
				backgroundColor: "#acbbd8",
				fontFamily,
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "56px 64px",
					borderRadius: "20px",
					backgroundColor: "#ffffff",
					boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
					color: "#0c0a09",
				}}
			>
				<div style={{ display: "flex", fontSize: 56, lineHeight: 1.5 }}>
					{title}
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
					<img
						src={logo}
						alt=""
						width={90}
						height={90}
						style={{
							display: "flex",
							width: "90px",
							height: "90px",
							borderRadius: "20px",
							border: "3px solid #d6e3ed",
						}}
					/>
					<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
						<div style={{ display: "flex", fontSize: 34 }}>
							{appConfig.author.name}
						</div>
						<div style={{ display: "flex", fontSize: 26, color: "#6e7b85" }}>
							{appConfig.xHandle}
						</div>
					</div>
				</div>
			</div>
		</div>,
		{ width: 1200, height: 630, fonts },
	);

	return sharp(Buffer.from(svg)).png().toBuffer();
}
