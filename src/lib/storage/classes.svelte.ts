import { getFirebaseContext } from '$lib/sdk/stores';
import type { StateErrorCode } from '$lib/types';
import { DefaultState } from '$lib/utils/defaultClass.svelte';
import { logger } from '$lib/utils/logger';
import {
	type FirebaseStorage,
	type StorageReference,
	ref as getStorageRef,
	getDownloadURL,
	type ListResult,
	list,
	type UploadTask,
	type UploadMetadata,
	uploadBytesResumable,
	type UploadTaskSnapshot,
} from 'firebase/storage';

/**
 * Creates a new DownloadUrlState instance.
 * @param storage - The Firebase storage instance.
 * @link https://firebase-svelte.vercel.app/storage/states/download-url
 */
export class DownloadUrlState extends DefaultState {
	public ref: StorageReference | null = $state(null);
	public storage: FirebaseStorage | null = $state(null);
	public url: string | null = $state(null);

	/**
	 * Creates a new DownloadUrlState instance.
	 * @param storage - The Firebase storage instance.
	 * @link https://firebase-svelte.vercel.app/storage/states/download-url
	 */
	public constructor(storage: FirebaseStorage | null, ref: string | StorageReference) {
		super();

		this.storage = storage ?? getFirebaseContext().storage ?? null;

		if (this.storage) {
			this.ref = typeof ref === 'string' ? getStorageRef(this.storage, ref) : ref;

			getDownloadURL(this.ref)
				.then((snapshot) => {
					this.url = snapshot;
				})
				.catch((e) => {
					logger('error', e);
					this.error = {
						code: 'internal/unknown',
						message: e,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'storage', className: 'DownloadUrlState' });
		}
	}
}

/**
 * Creates a new Storage List instance.
 * @param storage - The Firebase storage instance.
 * @param reference - The path to the storage reference.
 * @link https://firebase-svelte.vercel.app/storage/states/storage-list
 */
export class StorageListState extends DefaultState {
	public ref: StorageReference | null = $state(null);
	public storage: FirebaseStorage | null = $state(null);
	public list: ListResult | null = $state(null);

	/**
	 * Creates a new Storage List instance.
	 * @param storage - The Firebase storage instance.
	 * @param reference - The path to the storage reference.
	 * @link https://firebase-svelte.vercel.app/storage/states/storage-list
	 */
	public constructor(storage: FirebaseStorage | null, ref: string | StorageReference) {
		super();

		this.storage = storage ?? getFirebaseContext().storage ?? null;

		if (this.storage) {
			this.ref = typeof ref === 'string' ? getStorageRef(this.storage, ref) : ref;

			list(this.ref)
				.then((snapshot) => {
					this.list = snapshot;
				})
				.catch((e) => {
					logger('error', e);
					this.error = {
						code: 'internal/unknown',
						message: e,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'storage', className: 'StorageListState' });
		}
	}
}

/**
 * Creates a new Upload Task instance.
 * @param storage - The Firebase storage instance.
 * @param reference - The path to the storage reference.
 * @link https://firebase-svelte.vercel.app/storage/states/storage-list
 */
export class UploadTaskState extends DefaultState {
	public ref: StorageReference | null = $state(null);
	public storage: FirebaseStorage | null = $state(null);
	public task: UploadTask | null = $state(null);
	public taskSnapshot: UploadTaskSnapshot | null = $state(null);
	public data: Blob | Uint8Array | ArrayBuffer | null = $state(null);
	public metadata: UploadMetadata | null = $state(null);
	public unsubscribe: () => void = $state(() => {});

	/**
	 * Creates a new Upload Task instance.
	 * @param storage - The Firebase storage instance.
	 * @param reference - The path to the storage reference.
	 * @link https://firebase-svelte.vercel.app/storage/states/storage-list
	 */
	public constructor(
		storage: FirebaseStorage | null,
		ref: string | StorageReference,
		data: Blob | Uint8Array | ArrayBuffer,
		metadata: UploadMetadata | null = null,
	) {
		super();

		this.storage = storage ?? getFirebaseContext().storage ?? null;

		if (this.storage) {
			this.ref = typeof ref === 'string' ? getStorageRef(this.storage, ref) : ref;
			this.data = data;
			this.metadata = metadata;

			this.task = uploadBytesResumable(this.ref, this.data, this.metadata ?? undefined);

			this.unsubscribe = this.task.on(
				'state_changed',
				(snapshot) => {
					this.taskSnapshot = snapshot;
				},
				(e) => {
					logger('error', e.message, e);
					this.error = {
						code: (e.code as StateErrorCode) ?? 'internal/unknown',
						message: e.message,
					};
				},
				() => {
					this.loading = false;
				},
			);
		} else {
			this.noSdk({ sdk: 'storage', className: 'UploadTaskState' });
		}
	}
}
