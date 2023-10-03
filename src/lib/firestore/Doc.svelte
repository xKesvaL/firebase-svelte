<script lang="ts" generics="Data extends DocumentData">
	import { getFirebaseContext } from '$lib/sdk/stores.js';

	import type { DocumentData, DocumentReference, Firestore } from 'firebase/firestore';
	import { createDocStore } from './stores.js';

	interface $$Slots {
		default: {
			data: (Data & { [key: string]: any }) | null;
			ref: DocumentReference<Data> | null;
			error: Error | null;
		};
		loading: Record<string, never>;
		fallback: Record<string, never>;
	}

	export let firestore: Firestore | undefined = getFirebaseContext().firestore;
	export let ref: string | DocumentReference<Data>;
	export let startValue: Data | undefined = undefined;
	export let log = false;
	export let once = false;

	let store = createDocStore<Data>(firestore, ref, {
		startValue,
		log,
		once
	});
</script>

{#if $store}
	<slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}
