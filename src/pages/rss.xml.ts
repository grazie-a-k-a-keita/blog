import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getSortedPosts, postUrl } from "@/lib/posts";
import { appConfig } from "@/shared/app.config";

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("astro.config の site が未設定です");

	const posts = await getSortedPosts();
	return rss({
		title: appConfig.title,
		description: appConfig.description,
		site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postUrl(post),
		})),
		customData: "<language>ja</language>",
	});
};
