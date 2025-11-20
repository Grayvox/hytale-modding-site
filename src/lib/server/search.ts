import type { SearchEntry } from "$lib/types.ts";

const articles: Record<string, string> = import.meta.glob("/src/routes/docs/**/*.{md,svx}", {
    eager: true,
    query: "?raw",
    import: "default"
});

const articleTitles: Record<string, { title: string }> = import.meta.glob("/src/routes/docs/**/*.{md,svx}", {
    eager: true,
    import: "metadata"
});

export const searchIndex: SearchEntry[] = Object.entries(articles)
    .map(([path, content]) => {
        const slug = path.replace("/src/routes/docs/", "")
                .replace(/(\+page)?\.(md|svx)$/, "");

        const slugChunks = slug.split("/");
        const category = slugChunks.length > 1 ? slugChunks[slugChunks.length - 2] : "";

        const title = articleTitles[path]?.title ?? slug;
        return {
            slug,
            title,
            category,
            content: content.replace(/\s+/g, " ")
                .toLowerCase()
        } as SearchEntry;
    });