<script>
	import { notifications } from '$lib/stores/notifications.svelte';
	import Notification from './Notification.svelte';
</script>

<div class="absolute bottom-12 right-12 flex w-fit flex-col-reverse gap-4 overscroll-x-none">
	{#each notifications.current as n}
		<Notification>
			{n}
		</Notification>
	{/each}
</div>
