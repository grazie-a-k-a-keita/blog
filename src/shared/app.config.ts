const githubUser = "grazie-a-k-a-keita";
const xUser = "grazie_Engineer";

export const appConfig = {
	siteUrl: "https://kotukotu-stack-log.com",
	title: "GrazieHub",
	description: "オオノケイタの個人ブログ",
	author: {
		name: "Ohno Keita",
		alternateName: "オオノケイタ",
		githubUrl: `https://github.com/${githubUser}`,
		x: { url: `https://twitter.com/${xUser}`, handle: `@${xUser}` },
	},
	repositoryUrl: `https://github.com/${githubUser}/blog`,
	ogImage: "/og-default.png",
} as const;
