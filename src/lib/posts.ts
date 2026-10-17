import { type CollectionEntry, getCollection } from "astro:content";
import type { GetStaticPaths } from "astro";

export type Post = CollectionEntry<"blog">;

/** 公開日の新しい順に並べた記事一覧 */
export async function getSortedPosts(): Promise<Post[]> {
	return (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export const postUrl = (post: Post) => `/blog/${post.id}/`;

export const postOgImageUrl = (post: Post) => `/og/${post.id}.png`;

/** 記事ごとのルート（/blog/[slug]/, /og/[slug].png）で共有する getStaticPaths */
export const getPostStaticPaths = (async () => {
	const posts = await getCollection("blog");
	return posts.map((post) => ({ params: { slug: post.id }, props: post }));
}) satisfies GetStaticPaths;
