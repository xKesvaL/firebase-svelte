<script lang="ts">
	import type { Firestore, Query } from 'firebase/firestore';
	import { createCollectionGroupStore } from './stores.js';
	import { sdk } from '$lib/stores.js';

	interface $$Slots {
		default: {
			data: any[];
			ref: Query | null;
			count: number;
		};
		loading: Record<string, never>;
	}

	export let firestore: Firestore | undefined = $sdk?.firestore;
	export let ref: Query | string;
	export let startValue: any = undefined;
	export let once = false;
	export let log = false;
	export let refField: string | undefined = undefined;

	let store = createCollectionGroupStore(firestore, ref, {
		startValue,
		once,
		log,
		refField
	});
</script>

<slot name="before" />

{#if $store}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} error={store.error} />
{:else if store.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}

<slot name="after" />
