<script lang="ts">
	import { realtimeDataStore, sdk } from '$lib/stores';
	import type { Database, DatabaseReference } from 'firebase/database';

	interface $$Slots {
		default: {
			data: any[];
			ref: DatabaseReference | null;
		};
		loading: Record<string, never>;
	}

	export let realtimeDB: Database | undefined = $sdk?.realtime;

	export let ref: string | DatabaseReference;

	export let startValue: any = undefined;

	let store = realtimeDataStore(realtimeDB, ref, startValue);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} />
{:else}
	<slot name="loading" />
{/if}
