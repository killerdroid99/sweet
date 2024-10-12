<script lang="ts">
	import { format } from 'date-fns';

	const { date } = $props();

	let f_date = $derived(format(date as Date, 'MMMM dd, yyyy'));
</script>

<span class="my-2 flex w-full items-center text-xs text-neutral-400/70">
	<div class="h-px flex-1 bg-neutral-400/40"></div>
	<time class="px-2">
		{f_date}
	</time>
	<div class="h-px flex-1 bg-neutral-400/40"></div>
</span>
