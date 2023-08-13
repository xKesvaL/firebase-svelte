<!--suppress TypeScriptUnresolvedReference -->
<script lang="ts">
	import type { DocumentReference, Firestore } from 'firebase/firestore';
	import { createDocStore } from './stores.js';
	import { sdk } from '$lib/stores.js';

	// eslint-disable-next-line no-undef
	type T = $$Generic<T>;

	interface $$Slots {
		default: {
			data: (T & { [key: string]: any }) | null;
			ref: DocumentReference | null;
			error: Error | null;
		};
		loading: Record<string, never>;
		before: Record<string, never>;
		after: Record<string, never>;
		fallback: Record<string, never>;
	}

	export let firestore: Firestore | undefined = $sdk?.firestore;
	export let ref: string | DocumentReference;
	export let startValue: T | undefined = undefined;
	export let log = false;
	export let once = false;

	let store = createDocStore(firestore, ref, {
		startValue,
		log,
		once
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
