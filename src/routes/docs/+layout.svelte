<script lang="ts">
    import ArticleList from "$lib/components/ArticleList.svelte";
    import Topbar from "$lib/components/Topbar.svelte";
    import "./layout.css";

    let { children, data } = $props();
</script>

<div class="flex flex-row">
    <ArticleList articleList={data.articleList} />

    <div class="flex flex-col w-full">
        <Topbar searchIndex={data.searchIndex} />

        <div class="m-12 w-1/2">
            {@render children()}
        </div>
    </div>
</div>