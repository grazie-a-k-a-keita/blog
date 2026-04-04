import type { MarkdownHeading } from "astro";

export default function Toc({ headings }: { headings: MarkdownHeading[] }) {
	return (
		<nav>
			<h2>目次</h2>
			<ul>
				{headings
					.filter((h) => h.depth === 2)
					.map((h) => (
						<li key={h.slug}>
							<a href={`#${h.slug}`}>{h.text.replace(/#$/, "")}</a>
						</li>
					))}
			</ul>
		</nav>
	);
}
