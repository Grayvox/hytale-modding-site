<script lang="ts">
    import type { SearchEntry } from "$lib/types.ts";
    import type { FormEventHandler } from "svelte/elements";

    function mapEntryWithRank(entry: SearchEntry, keywords: string[]): SearchEntry & { rank: number } {
        console.log({ entry, keywords, rank: keywords.filter((keyword) => entry.title.toLowerCase().includes(keyword) || entry.content.includes(keyword)).length })
        return {
            ...entry,
            rank: keywords.filter((keyword) => entry.title.toLowerCase().includes(keyword) || entry.content.includes(keyword)).length
        }
    }

    function onEscape(event: KeyboardEvent) {
        if (event.key === "Escape")
            isOpen = false;
    }

    function onKeyPress() {
        const keywords = value.split(" ").map((keyword) => keyword.toLowerCase());
        searchEntries = searchIndex.map((entry) => mapEntryWithRank(entry, keywords))
            .filter((entry) => entry.rank !== 0)
            .sort((a, b) => {
                if (a.rank > b.rank) return -1;
                else if (a.rank < b.rank) return 1;
                else return 0;
            });
    }

    export const open = () => {
        isOpen = true;
    }

    export const close = () => {
        isOpen = false;
    }

    let { searchIndex }: { searchIndex: SearchEntry[] } = $props();
    let searchEntries = $state(searchIndex);
    let isOpen = $state(false);
    let value = $state("");
</script>


{#if isOpen}

<div class="absolute left-0 top-0 w-screen h-screen bg-black opacity-35"></div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={close} class="absolute left-0 top-0 w-screen h-screen flex justify-center items-center">
    <div class="bg-zinc-800 rounded-lg w-1/3 h-3/4 p-4 flex flex-col">
        <input oninput={onKeyPress} bind:value={value} type="text" placeholder="Search" class="bg-zinc-900 h-12 px-4 rounded-md hover:border-sky-300 hover:border focus:border-sky-300 focus:border-2 focus:outline-none focus:ring-0" />

        {#each searchEntries as searchEntry}
            <a href={`/docs/${searchEntry.slug}`} onclick={close} aria-label={searchEntry.title} class="border-4 border-zinc-700 rounded-md mt-4 px-2 py-1 flex flex-row hover:text-sky-300 hover:border-sky-300">
                {#if searchEntry.category !== ""}
                    <span class="uppercase font-bold">{searchEntry.category}</span>
                    <span class="ml-2">〉</span>
                {/if}

                <span>{searchEntry.title}</span>
            </a>
        {/each}
    </div>
</div>
{/if}

<svelte:window on:keydown={onEscape} />