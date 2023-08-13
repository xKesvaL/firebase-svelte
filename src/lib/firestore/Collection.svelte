<script lang="ts">
	import type { CollectionReference, Firestore, Query, QueryConstraint } from 'firebase/firestore';
	import { createCollectionStore } from './stores.js';
	import { sdk } from '$lib/stores.js';

	interface $$Slots {
		default: {
			data: any[];
			ref: CollectionReference | Query | null;
			count: number;
		};
		loading: Record<string, never>;
	}

	export let firestore: Firestore | undefined = $sdk?.firestore;
	export let ref: string | CollectionReference;
	export let queryConstraints: QueryConstraint[] = [];
	export let log = false;
	export let startValue: any = undefined;
	export let once = false;
	export let refField: undefined | string = undefined;

	let store = createCollectionStore(firestore, ref, queryConstraints, {
		startValue,
		log,
		once,
		refField
	});
</script>

<slot name="before" />

{#if $store}
	<slot
		data={$store}
		ref={store.ref}
		count={$store?.length ?? 0}
		error={store.error}
		first={store.meta.first}
		last={store.meta.last}
	/>
{:else if store.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}

<slot name="after" />
