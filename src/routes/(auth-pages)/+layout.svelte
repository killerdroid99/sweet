<script>
	import '$lib/css/globals.css';
	import Header from '$lib/components/Header.svelte';
	import Notifications from '$lib/components/Notifications.svelte';

	const { children } = $props();
</script>

<Header />
<main>
	{@render children()}
</main>
<Notifications />
