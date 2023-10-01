import { getFirebaseContext } from '$lib/sdk/stores';
import { logger } from '$lib/utils/logger.js';
import {
	ref as getStorageRef,
	type FirebaseStorage,
	type ListResult,
	type StorageReference,
	list,
	getDownloadURL,
	type UploadTaskSnapshot,
	type UploadMetadata,
	uploadBytesResumable
} from 'firebase/storage';
import { readable, type Readable } from 'svelte/store';

export interface StorageListStore extends Readable<ListResult> {
	ref: StorageReference | null;
}

export interface StorageListStoreOptions {
	startValue?: ListResult;
}

/**
 *
 * @param {FirebaseStorage | undefined | null} storage the firebase storage instance
 * @param {string | StorageReference} reference the path to the storage reference
 * @param {StorageListStoreOptions} options the store options
 * @returns {StorageListStore} a store with the list of files in the storage reference
 */
export function createStorageListStore(
	storage: FirebaseStorage | undefined | null,
	reference: string | StorageReference,
	options: StorageListStoreOptions
): StorageListStore {
	const { startValue } = options;

	storage = storage ?? getFirebaseContext().storage ?? null;

	if (!storage) {
		const { subscribe } = readable(startValue);
		const store = {
			subscribe,
			ref: null
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Cloud Storage was not initialized.');

		return store;
	}

	const ref = typeof reference === 'string' ? getStorageRef(storage, reference) : reference;

	const { subscribe } = readable(startValue, (set) => {
		list(ref).then((snapshot) => {
			set(snapshot);
		});
	});

	return {
		subscribe,
		ref
	};
}

interface DownloadUrlStore extends Readable<string | null> {
	ref: StorageReference | null;
}

interface DownloadUrlStoreOptions {
	startValue?: string | null;
}

/**
 *
 * @param {FirebaseStorage | undefined | null} storage the firebase storage instance
 * @param {string | StorageReference} reference the path to the storage reference
 * @param {DownloadUrlStoreOptions} options the store options
 * @returns {DownloadUrlStore} a store with the download url of the storage reference
 */

export function createDownloadUrlStore(
	storage: FirebaseStorage | undefined | null,
	reference: string | StorageReference,
	options: DownloadUrlStoreOptions
): DownloadUrlStore {
	const { startValue } = options;

	storage = storage ?? getFirebaseContext().storage ?? null;

	if (!storage) {
		const { subscribe } = readable(startValue);
		const store = {
			subscribe,
			ref: null
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Cloud Storage was not initialized.');

		return store;
	}

	const ref = typeof reference === 'string' ? getStorageRef(storage, reference) : reference;

	const { subscribe } = readable(startValue, (set) => {
		getDownloadURL(ref).then((snapshot) => {
			set(snapshot);
		});
	});

	return {
		subscribe,
		ref
	};
}

interface UploadTaskStore extends Readable<UploadTaskSnapshot | null> {
	ref: StorageReference | null;
}

export function createUploadTaskStore(
	storage: FirebaseStorage | undefined | null,
	reference: string | StorageReference,
	data: Blob | Uint8Array | ArrayBuffer,
	metadata?: UploadMetadata
): UploadTaskStore {
	storage = storage ?? getFirebaseContext().storage ?? null;

	if (!storage) {
		const { subscribe } = readable(null);

		const store = {
			subscribe,
			ref: null
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Cloud Storage was not initialized.');

		return store;
	}

	const ref = typeof reference === 'string' ? getStorageRef(storage, reference) : reference;

	let unsubscribe: () => void;

	const { subscribe } = readable<UploadTaskSnapshot | null>(null, (set) => {
		const task = uploadBytesResumable(ref, data, metadata);

		unsubscribe = task.on(
			'state_changed',
			(snapshot) => {
				set(snapshot);
			},
			(error) => {
				logger('error', `${error.code} ${error.name}, ${error.message}`);
				set(task.snapshot);
			},
			() => {
				set(task.snapshot);
			}
		);

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref
	};
}
