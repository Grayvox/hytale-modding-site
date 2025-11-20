export type ArticleCategory = {
    title: string;
    children: Article[];
}

export type Article = {
    title: string;
    category: string;
    slug: string;
}

export type SearchEntry = {
    slug: string;
    category: string;
    title: string;
    content: string;
}