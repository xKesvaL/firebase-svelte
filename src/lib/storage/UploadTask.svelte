<script lang="ts">
	import type {
		FirebaseStorage,
		StorageReference,
		UploadMetadata,
		UploadTask,
		UploadTaskSnapshot
	} from 'firebase/storage';
	import { createUploadTaskStore } from './stores.js';
	import { getFirebaseContext } from '$lib/sdk/stores.js';

	export let storage: FirebaseStorage | undefined = getFirebaseContext().storage;
	export let ref: string | StorageReference;
	export let data: Blob | Uint8Array | ArrayBuffer;
	export let metadata: UploadMetadata | undefined = undefined;

	const upload = createUploadTaskStore(storage!, ref, data, metadata);

	interface $$Slots {
		default: {
			task: UploadTask | undefined;
			ref: StorageReference | null;
			snapshot: UploadTaskSnapshot | null;
			progress: number;
			storage?: FirebaseStorage;
		};
	}

	$: progress = ($upload?.bytesTransferred! / $upload?.totalBytes!) * 100 ?? 0;
</script>

{#if $upload !== undefined}
	<slot task={$upload?.task} snapshot={$upload} {progress} ref={upload.ref} {storage} />
{/if}
