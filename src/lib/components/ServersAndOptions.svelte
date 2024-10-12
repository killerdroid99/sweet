<script lang="ts">
	import { serverStore } from '$lib/stores/servers.svelte';
	import PolkaDot from './icons/PolkaDot.svelte';

	import ServerIcon from './ServerIcon.svelte';

	let { action }: { action: () => void } = $props();
	console.log(serverStore.serverData);
</script>

<div
	id="channels-stuff"
	class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-center gap-3 border-r-2 border-r-neutral-900 pt-3"
>
	<button
		onclick={action}
		class="ease grid h-10 w-10 place-items-center rounded-xl border-none bg-neutral-400/20 text-2xl outline-none transition-all hover:rounded-full hover:bg-emerald-500 focus-visible:ring-2"
	>
		<PolkaDot />
	</button>

	<div class="my-2 h-1 w-5 rounded-full bg-neutral-500"></div>
	<div class="flex flex-col gap-4">
		{#each serverStore.serverData as server}
			<ServerIcon {...server} />
		{/each}
	</div>
</div>

<style>
	#channels-stuff {
		height: calc(100dvh - 3rem);
	}
</style>
