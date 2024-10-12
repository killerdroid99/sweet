<script lang="ts">
	import '$lib/css/globals.css';
	import Header from '$lib/components/Header.svelte';
	import CreateServerForm from '$lib/components/CreateServerForm.svelte';
	import ServersAndOptions from '$lib/components/ServersAndOptions.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import { getCurrentUser, user } from '$lib/stores/auth.svelte.js';
	import { getJoinedServers, serverStore } from '$lib/stores/servers.svelte.js';

	let { children } = $props();
	let isUserLoggedIn = $derived(user.name !== undefined);

	// <button onclick={() => pushNotifications('soul soul soul')}>push</button>
	let creatingServer = $state(false);
	$effect(() => {
		document.addEventListener('keydown', (e) => {
			if (isUserLoggedIn && creatingServer && e.key === 'Escape') {
				creatingServer = false;
			}
		});
	});

	$inspect(serverStore).with(console.trace);
	$effect(() => {
		getCurrentUser();
		getJoinedServers();
	});
</script>

<main>
	<Header />
	{#if creatingServer}
		<CreateServerForm close={() => (creatingServer = false)} />
	{/if}

	{#if isUserLoggedIn}
		<ServersAndOptions
			action={() => {
				creatingServer = true;
			}}
		/>
	{/if}
	{@render children()}
	<Notifications />
</main>

<style scoped>
	main {
		display: grid;
		max-height: 100dvh;
		grid-auto-flow: column;
		grid-auto-columns: 4rem 13rem auto;
		grid-auto-rows: min-content auto;
		overflow-y: hidden;
	}
</style>
