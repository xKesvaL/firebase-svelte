<script lang="ts" generics="Data extends DatabaseReference">
	import { getFirebaseContext } from '$lib/sdk/stores.js';
	import { createNodeStore } from './stores.js';
	import type { Database, DatabaseReference } from 'firebase/database';

	interface $$Slots {
		default: {
			data: Data;
			ref: DatabaseReference | null;
			error: Error | null;
		};
		loading: Record<string, never>;
		fallback: Record<string, never>;
	}

	export let rtdb: Database | undefined = getFirebaseContext().rtdb;
	export let ref: string | DatabaseReference;
	export let startValue: Data | undefined = undefined;
	export let once = false;
	export let log = false;

	let store = createNodeStore<Data>(rtdb, ref, {
		startValue,
		once,
		log
	});
</script>

{#if $store}
	<slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}
