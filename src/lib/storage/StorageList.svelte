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
	}
</script>

{#if $listStore !== undefined}
	<slot list={$listStore} ref={listStore.ref} {storage} />
{:else}
	<slot name="loading" />
{/if}
