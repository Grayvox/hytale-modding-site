import type { Article, ArticleCategory } from "$lib/types.ts";

const articleList = import.meta.glob("/src/routes/docs/**/*.{md,svx}", {
    eager: true,
    import: "metadata"
}) as Record<string, { title?: string } | undefined>;

export function getArticleList(): ArticleCategory[] {
    const allArticles: Article[] = Object.entries(articleList)
        .map(([path, metadata]) => {
            const slug = path.replace("/src/routes/docs/", "")
                .replace(/(\+page)?\.(md|svx)$/, "");

            const slugChunks = slug.split("/");
            const category = slugChunks.length > 1 ? slugChunks[slugChunks.length - 2] : "";

            return {
                title: metadata?.title ?? slug,
                category,
                slug
            }
        });

    const categories: Record<string, ArticleCategory> = {};

    for (const article of allArticles) {
        if (!categories[article.category]) {
            const title = article.category?.replace(/-/g, " ") ?? "";
            categories[article.category] = { title, children: [] };
        }

        const category = categories[article.category];
        category.children.push(article);
    }

    return Object.values(categories)
        .sort((a, b) => a.title.localeCompare(b.title));
}