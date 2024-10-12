<script lang="ts">
	import { serverStore } from '$lib/stores/servers.svelte';

	let {
		serverId,
		serverName,
		mainChannelId
	}: {
		serverId: string;
		serverName: string;
		mainChannelId: string;
	} = $props();
	console.log(mainChannelId);
	let isSelected = $derived(serverId === serverStore.selectedServer);
</script>

<a href={`/${serverId}/${mainChannelId}`} data-sveltekit-preload-data="off">
	<div
		class="leading-2 group relative grid h-10 w-10 place-items-center rounded-full bg-indigo-500 p-1 font-mono text-xl font-bold capitalize"
	>
		<div
			class:selected={isSelected}
			class:not-selected={!isSelected}
			class="absolute -left-[15px] h-2 w-2 rounded bg-white transition-all ease-in group-hover:rounded-sm"
		></div>
		{serverName[0]}
	</div>
</a>
