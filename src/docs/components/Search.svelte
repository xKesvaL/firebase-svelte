<script lang="ts">
	import { Button } from '$docs/ui/button/index.svelte';
	import docsearch from '@docsearch/js';

	import '@docsearch/css';
	import '$docs/styles/docsearch.scss';

	import { onMount } from 'svelte';

	onMount(() => {
		docsearch({
			appId: 'NDRA2U8ZHN',
			apiKey: 'de2bab8f3c156912d8440973468d085f',
			indexName: 'firebase-svelte',
			insights: true,
			container: '#docsearch'
		});
	});
</script>

<Button id="docsearch" class="w-10 flex-shrink-0 overflow-hidden rounded-full px-0.5 py-2 md:w-48"
	>Search</Button
>
