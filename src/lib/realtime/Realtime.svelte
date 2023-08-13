<script lang="ts">
	import { createRealtimeDataStore } from './stores.js';
	import { sdk } from '$lib/stores.js';
	import type { Database, DatabaseReference } from 'firebase/database';

	interface $$Slots {
		default: {
			data: any[];
			ref: DatabaseReference | null;
			error: Error | null;
		};
		loading: Record<string, never>;
		before: Record<string, never>;
		after: Record<string, never>;
		fallback: Record<string, never>;
	}

	export let realtimeDB: Database | undefined = $sdk?.realtime;
	export let ref: string | DatabaseReference;
	export let startValue: any = undefined;
	export let once = false;
	export let log = false;

	let store = createRealtimeDataStore(realtimeDB, ref, {
		startValue,
		once,
		log
	});
</script>

<slot name="before" />

{#if $store}
	<slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}

<slot name="after" />
