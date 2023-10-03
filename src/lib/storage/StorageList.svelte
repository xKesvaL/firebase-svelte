<script lang="ts">
	import { getFirebaseContext } from '$lib/sdk/stores.js';
	import type { FirebaseStorage, ListResult, StorageReference } from 'firebase/storage';
	import { createStorageListStore } from './stores.js';

	export let ref: string | StorageReference;
	export let storage: FirebaseStorage | undefined = getFirebaseContext().storage;

	const listStore = createStorageListStore(storage!, ref, {});

	interface $$Slots {
		default: { list: ListResult | null; ref: StorageReference | null; storage?: FirebaseStorage };
		loading: {};
		fallback: {};
	}
</script>

{#if $listStore}
	<slot list={$listStore} ref={listStore.ref} {storage} />
{:else if listStore.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}
