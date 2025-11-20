<script lang="ts">
	import "./layout.css";
	
	let { children } = $props();
</script>

<main class="fixed left-0 top-0 w-screen min-h-screen bg-zinc-800 text-gray-200 font-sans">
	{@render children()}
</main>
