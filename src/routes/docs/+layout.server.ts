import { getArticleList } from "$lib/server/docs.ts";
import { searchIndex } from "$lib/server/search.ts";

export function load() {
    return {
        articleList: getArticleList(),
        searchIndex: searchIndex
    }
}