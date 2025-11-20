<script lang="ts">
    import { page } from "$app/state";
    import type { ArticleCategory } from "$lib/types.ts";

    let { articleList }: { articleList: ArticleCategory[] } = $props();
    const currentArticle = $derived(() => {
        return articleList.flatMap((category) => category.children)
            .find((article) => (page.url.pathname + "/") === `/docs/${article.slug}`);
    });
</script>

<div class="bg-zinc-900 left-0 top-0 pt-4 px-8 min-w-80 min-h-screen flex flex-col">
    {#each articleList as category}
        <hr class="my-4 text-zinc-700" />
        
        {#if category.title}
            <b class="uppercase mb-2">{category.title}</b>
        {/if}

        {#each category.children as article}
            <a href={`/docs/${article.slug}`}  class="{article === currentArticle() ? "text-sky-300" : "text-zinc-400"} hover:cursor-pointer hover:text-sky-300 hover:duration-500">{article.title}</a>
        {/each}
    {/each}
</div>