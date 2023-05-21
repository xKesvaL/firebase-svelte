<script lang="ts">
	import type { CollectionReference, Firestore, Query } from 'firebase/firestore';
	import { fireCollectionStore, sdk } from '$lib/stores';

	interface $$Slots {
		default: {
			data: any[];
			ref: CollectionReference | Query | null;
			count: number;
		};
		loading: Record<string, never>;
	}

	export let firestore: Firestore | undefined = $sdk?.firestore;
	export let ref: string | CollectionReference | Query;
	export let startValue: any = undefined;

	let store = fireCollectionStore(firestore, ref, startValue);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
	<slot name="loading" />
{/if}
