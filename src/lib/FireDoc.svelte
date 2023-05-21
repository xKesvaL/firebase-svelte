<!--suppress TypeScriptUnresolvedReference -->
<script lang="ts">
	import type { DocumentReference, Firestore } from 'firebase/firestore';
	import { fireDocStore, sdk } from '$lib/stores';

	// eslint-disable-next-line no-undef
	type T = $$Generic<T>;

	interface $$Slots {
		default: {
			data: (T & { [key: string]: any }) | null;
			ref: DocumentReference | null;
		};
		loading: Record<string, never>;
	}

	export let firestore: Firestore | undefined = $sdk?.firestore;
	export let ref: string | DocumentReference;
	export let startValue: T | undefined = undefined;

	let store = fireDocStore(firestore, ref, startValue);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} />
{:else}
	<slot name="loading" />
{/if}
