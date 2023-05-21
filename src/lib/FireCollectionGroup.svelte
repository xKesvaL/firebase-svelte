<script lang="ts">
	import type { Firestore, Query } from 'firebase/firestore';
	import { fireCollectionGroupStore, sdk } from '$lib/stores.js';

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

	let store = fireCollectionGroupStore(firestore, ref, startValue);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
	<slot name="loading" />
{/if}
