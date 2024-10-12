<script lang="ts">
	import { user } from '$lib/stores/auth.svelte';
	import { serverStore, getServerChannels } from '$lib/stores/servers.svelte';
	import CreateChannelForm from './CreateChannelForm.svelte';
	import Hash from './icons/Hash.svelte';
	import Plus from './icons/Plus.svelte';
	const { serverId }: { serverId: string } = $props();

	let creatingChannel = $state(false);
	let isUserLoggedIn = $derived(user.name !== undefined);

	$effect(() => {
		getServerChannels(serverId);
		document.addEventListener('keydown', (e) => {
			if (isUserLoggedIn && creatingChannel && e.key === 'Escape') {
				creatingChannel = false;
			}
		});
	});
</script>

{#if creatingChannel}
	<CreateChannelForm {serverId} close={() => (creatingChannel = false)} />
{/if}

{#if user.name}
	<div class="col-start-2 col-end-3 w-52 border-r-2 border-r-neutral-900">
		<div class="flex w-full items-center justify-between px-4 pb-2 pt-4">
			<small class="text-neutral-400">CHANNELS</small>
			<button
				class="border-none outline-none focus-visible:text-fuchsia-500"
				onclick={() => (creatingChannel = true)}
			>
				<Plus class="text-xs" />
			</button>
		</div>
		<div class="mt-1 grid gap-3 px-4">
			{#each serverStore.currentChannelData as channel}
				<a
					href={`/${serverId}/${channel.id}`}
					data-sveltekit-preload-data="hover"
					class="flex items-center space-x-1"
				>
					<Hash class="text-xl" />
					<span>{channel.name}</span>
				</a>
			{/each}
		</div>
	</div>
{/if}
