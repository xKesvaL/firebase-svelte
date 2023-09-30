<script lang="ts">
	import IconCopy from '$docs/icons/IconCopy.svelte';
	import { toasts } from '$docs/stores/toasts';
	import { Button } from '$docs/ui/button';
	import Prism from 'prismjs';

	export let filename: string = 'index.js';
	export let language: string = 'javascript';

	let code: HTMLDivElement | null = null;

	$: if (code) Prism.highlightElement(code);

	const copyToClipboard = () => {
		if (!code) return;

		navigator.clipboard.writeText(code.innerText);

		toasts.add({
			id: Math.random(),
			message: `✅ Copied to clipboard`
		});
	};
</script>

<div
	class="relative flex-1 overflow-x-auto rounded-lg bg-black p-4 text-white shadow-2xl shadow-primary/10"
>
	<header class="flex items-center">
		<div class="flex flex-1 gap-2">
			<div class="h-4 w-4 rounded-full bg-red-500" />
			<div class="h-4 w-4 rounded-full bg-yellow-500" />
			<div class="h-4 w-4 rounded-full bg-green-500" />
		</div>
		<div class="flex justify-center text-sm text-slate-200">
			<span>{filename}</span>
		</div>
		<div class="flex-1"></div>
	</header>
	<div
		class="code p-2 pb-0 font-mono language-{language} w-full overflow-x-auto whitespace-pre"
		bind:this={code}
	>
		<slot />
	</div>
	<Button class="absolute right-2 top-2 p-2" variant="ghost" size="icon" on:click={copyToClipboard}>
		<IconCopy />
	</Button>
</div>

<style lang="scss">
	.code {
		&::-webkit-scrollbar {
			height: 0.5rem;
		}

		font-size: 0.6rem;

		@include mq(xs) {
			font-size: var(--fs-200);
		}
	}
</style>
