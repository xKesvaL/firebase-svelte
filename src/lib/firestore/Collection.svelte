<script lang="ts" generics="Data extends CollectionReference">
	import { getFirebaseContext } from '$lib/sdk/stores.js';

	import type { CollectionReference, Firestore, Query, QueryConstraint } from 'firebase/firestore';
	import { createCollectionStore } from './stores.js';

	interface $$Slots {
		default: {
			data: any[];
			ref: CollectionReference<Data[]> | null | undefined;
			count: number;
			error: Error | null;
			first: any | null;
			last: any | null;
		};
		loading: Record<string, never>;
		fallback: Record<string, never>;
	}

	export let firestore: Firestore | undefined = getFirebaseContext().firestore;
	export let ref: string | CollectionReference;
	export let queryConstraints: QueryConstraint[] = [];
	export let log = false;
	export let startValue: Data[] = [];
	export let once = false;
	export let refField: undefined | string = undefined;

	let store = createCollectionStore<Data>(firestore, ref, queryConstraints, {
		startValue,
		log,
		once,
		refField
	});
</script>

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
