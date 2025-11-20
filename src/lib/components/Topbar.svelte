<script lang="ts">
    import MagnifyingGlass from "$lib/icons/search.svg?url";
    import Search from "$lib/components/Search.svelte";
    import Discord from "$lib/icons/discord.svg?url";
    import GitHub from "$lib/icons/github.svg?url";
    import type { SearchEntry } from "$lib/types.ts";

    let { searchIndex }: { searchIndex: SearchEntry[] } = $props();
    let search: Search;

    function onClick() {
        search.open();
    }
</script>

<Search searchIndex={searchIndex} bind:this={search} />

<div class="bg-zinc-900 border-l border-l-zinc-950 w-full h-14 flex flex-row items-center">
    <button onclick={onClick} class="rounded-md border border-zinc-950 bg-zinc-950 text-zinc-400 hover:border-sky-300 hover:text-gray-300 hover:cursor-pointer duration-500 ml-4 px-5 py-1 flex flex-row items-center">
        <img src={MagnifyingGlass} alt="Search" class="h-4 mr-2 fill-white stroke-white" />
        Search
    </button>

    <a href="https://discord.gg/KrHK7B39pY" class="ml-auto mr-4">
        <img src={Discord} alt="Discord" class="h-6" />
    </a>

    <a href="https://github.com/HytaleModding/site" class="mr-4">
        <img src={GitHub} alt="GitHub" class="h-6" />
    </a>
</div>