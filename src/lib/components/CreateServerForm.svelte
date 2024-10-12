<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Close from './icons/Close.svelte';
	import axios from 'axios';
	import { pushNotifications } from '$lib/stores/notifications.svelte';
	import Loader from './icons/Loader.svelte';
	import { getJoinedServers } from '$lib/stores/servers.svelte';
	import { goto } from '$app/navigation';

	type Tprops = {
		close: () => void;
	};

	let { close }: Tprops = $props();

	let isLoading = $state(false);
	let serverNameErrors = $state('');
	let serverNameErrorRing = $derived(serverNameErrors.length > 0);

	const handleSubmit = async (e: SubmitEvent) => {
		isLoading = true;
		serverNameErrors = '';
		e.preventDefault();
		const f = new FormData(e.currentTarget as HTMLFormElement);
		const serverName = f.get('serverName');

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/servers`,
				{
					serverName
				},
				{
					withCredentials: true
				}
			);
			pushNotifications(res.data.msg);
			await getJoinedServers();
			close();
			goto(`/${res.data.serverId as string}`);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.data.serverName) {
					serverNameErrors = err.response?.data.serverName[0];
				}
			}
		}
		isLoading = false;
	};

	$effect(() => {
		document.getElementById('serverName')?.focus();
	});
</script>

<div
	role="none"
	class="fixed z-50 grid h-screen w-screen select-none place-items-center bg-slate-900/20 backdrop-blur-sm"
	transition:fade
	onclick={(e) => {
		if (e.target === e.currentTarget) close();
	}}
>
	<form
		onsubmit={handleSubmit}
		transition:scale
		class="relative grid w-96 gap-4 rounded-xl bg-slate-900 p-8 text-white md:w-1/2 xl:w-1/4"
	>
		<button
			tabindex="0"
			type="button"
			class="absolute right-4 top-4 cursor-pointer rounded-full border-none bg-rose-500 p-1 outline-none hover:bg-rose-600 focus-visible:text-red-800"
			onclick={close}
		>
			<Close />
		</button>
		<h2
			class="mb-8 text-center text-xl font-semibold underline decoration-fuchsia-500 decoration-wavy underline-offset-4"
		>
			Create a new Server
		</h2>
		<div class="grid gap-1">
			<label for="serverName" class:text-rose-500={serverNameErrorRing} class="select-none text-sm"
				>Server name</label
			>
			<input
				id="serverName"
				class:err-ring={serverNameErrorRing}
				onfocusin={() => (serverNameErrors = '')}
				oninputcapture={() => (serverNameErrors = '')}
				type="text"
				class="rounded border-none bg-inherit p-2 text-lg outline-none ring-1 ring-slate-400/50 transition-all ease-out hover:ring-fuchsia-500 focus-visible:ring-fuchsia-400"
				name="serverName"
			/>
			<small class="text-rose-500">{serverNameErrors}</small>
		</div>
		<button
			disabled={isLoading}
			class="w-fit select-none rounded border-none bg-fuchsia-500 px-6 py-3 text-sm text-slate-900 outline-none ring-fuchsia-500 ring-offset-slate-900 transition-all ease-out hover:bg-fuchsia-500/90 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:animate-pulse disabled:bg-slate-500"
		>
			{#if isLoading}
				<Loader />
			{:else}
				Submit
			{/if}
		</button>
	</form>
</div>
