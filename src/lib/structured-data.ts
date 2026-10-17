import type { Post } from "@/lib/posts";
import { appConfig } from "@/shared/app.config";

type Ref = { "@id": string };

interface WebSite {
	"@type": "WebSite";
	"@id": string;
	name: string;
	description: string;
	url: string;
	inLanguage: "ja";
	author: Ref;
}

interface Person {
	"@type": "Person";
	"@id": string;
	name: string;
	alternateName: string;
	url: string;
	sameAs: readonly string[];
}

interface BlogPosting {
	"@type": "BlogPosting";
	"@id": string;
	headline: string;
	description: string;
	url: string;
	mainEntityOfPage: string;
	image: string;
	datePublished: string;
	dateModified: string;
	inLanguage: "ja";
	author: Ref;
	publisher: Ref;
	isPartOf: Ref;
}

interface ListItem {
	"@type": "ListItem";
	position: number;
	name: string;
	/** 末尾（現在のページ）では省略する */
	item?: string;
}

interface BreadcrumbList {
	"@type": "BreadcrumbList";
	itemListElement: ListItem[];
}

type JsonLdNode = WebSite | Person | BlogPosting | BreadcrumbList;

interface Options {
	/** 現在のページの URL */
	url: URL;
	ogImage: URL;
	/** 記事ページのときだけ渡す */
	article?: Post;
}

/** ページに埋め込む JSON-LD を、そのまま <script> に入れられる文字列で返す */
export function buildJsonLd({ url, ogImage, article }: Options): string {
	const siteUrl = new URL("/", url).href;
	const websiteId = `${siteUrl}#website`;
	const authorId = `${siteUrl}#author`;

	const graph: JsonLdNode[] = [
		{
			"@type": "WebSite",
			"@id": websiteId,
			name: appConfig.title,
			description: appConfig.description,
			url: siteUrl,
			inLanguage: "ja",
			author: { "@id": authorId },
		},
		{
			"@type": "Person",
			"@id": authorId,
			name: appConfig.author.name,
			alternateName: appConfig.author.alternateName,
			url: siteUrl,
			sameAs: appConfig.author.sameAs,
		},
	];

	if (article) {
		const publishedTime = article.data.pubDate.toISOString();
		graph.push(
			{
				"@type": "BlogPosting",
				"@id": `${url.href}#article`,
				headline: article.data.title,
				description: article.data.description,
				url: url.href,
				mainEntityOfPage: url.href,
				image: ogImage.href,
				datePublished: publishedTime,
				dateModified: article.data.updatedDate?.toISOString() ?? publishedTime,
				inLanguage: "ja",
				author: { "@id": authorId },
				publisher: { "@id": authorId },
				isPartOf: { "@id": websiteId },
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: appConfig.title,
						item: siteUrl,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "blog",
						item: new URL("/blog/", url).href,
					},
					{ "@type": "ListItem", position: 3, name: article.data.title },
				],
			},
		);
	}

	// </script> などで構造化データが閉じられないよう < をエスケープする
	return JSON.stringify({
		"@context": "https://schema.org",
		"@graph": graph,
	}).replace(/</g, "\\u003c");
}
