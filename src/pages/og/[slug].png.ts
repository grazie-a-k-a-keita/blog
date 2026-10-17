import type { APIRoute } from "astro";
import { renderOgImage } from "@/lib/og-image";
import { getPostStaticPaths, type Post } from "@/lib/posts";

export const getStaticPaths = getPostStaticPaths;

export const GET: APIRoute<Post> = async ({ props }) => {
	const png = await renderOgImage(props.data.title);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
