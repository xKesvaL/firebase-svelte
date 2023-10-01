<script lang="ts">
	import { toasts } from '$docs/stores/toasts.js';
	import { fly } from 'svelte/transition';
</script>

<div class="pointer-events-none fixed bottom-0 right-0 top-20 flex h-screen flex-col gap-2 p-4">
	{#each $toasts as toast, i}
		<div
			class="rounded-lg bg-background/80 p-4 shadow-lg shadow-foreground/10 backdrop-blur-md transition-transform"
			in:fly={{ y: -64, duration: 200 }}
			out:fly={{ x: 64, duration: 200 }}
		>
			{toast.message}
		</div>
	{/each}
</div>
