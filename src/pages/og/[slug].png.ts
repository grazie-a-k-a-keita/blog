import { type CollectionEntry, getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { renderOgImage } from "@/lib/og-image";

export const getStaticPaths = (async () => {
	const posts = await getCollection("blog");
	return posts.map((post) => ({
		params: { slug: post.id },
		props: post,
	}));
}) satisfies GetStaticPaths;

export const GET: APIRoute<CollectionEntry<"blog">> = async ({ props }) => {
	const png = await renderOgImage(props.data.title);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
