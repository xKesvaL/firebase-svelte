<script lang="ts">
	import { getFirebaseContext } from '$lib/sdk/stores.js';
	import type { FirebaseStorage, StorageReference } from 'firebase/storage';
	import { createDownloadUrlStore } from './stores.js';

	export let ref: string | StorageReference;
	export let storage: FirebaseStorage | undefined = getFirebaseContext().storage;

	const urlStore = createDownloadUrlStore(storage!, ref, {});

	interface $$Slots {
		default: { link: string | null; ref: StorageReference | null; storage?: FirebaseStorage };
		loading: {};
	}
</script>

{#if $urlStore !== undefined}
	<slot link={$urlStore} ref={urlStore.ref} {storage} />
{:else}
	<slot name="loading" />
{/if}
