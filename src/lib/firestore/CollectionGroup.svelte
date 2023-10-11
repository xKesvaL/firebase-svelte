<script lang="ts" generics="Data extends CollectionReference">
	import type { Firestore, Query, CollectionReference } from 'firebase/firestore';
	import { createCollectionGroupStore } from './stores.js';
	import { getFirebaseContext } from '$lib/sdk/stores.js';

	interface $$Slots {
		default: {
			data: Data[];
			ref: Query<Data[]> | null | undefined;
			count: number;
		};
		loading: Record<string, never>;
		fallback: Record<string, never>;
	}

	export let firestore: Firestore | undefined = getFirebaseContext().firestore;
	export let ref: Query | string;
	export let startValue: Data[] = [];
	export let once = false;
	export let log = false;
	export let refField: string | undefined = undefined;

	let store = createCollectionGroupStore<Data>(firestore, ref, {
		startValue,
		once,
		log,
		refField
	});
</script>

{#if $store}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else if $store === undefined}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}
