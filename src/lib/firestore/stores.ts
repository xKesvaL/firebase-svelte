import type {
	DocumentData,
	DocumentReference,
	Firestore,
	Query,
	QueryConstraint
} from 'firebase/firestore';
import { readable, type Readable, writable, type Writable } from 'svelte/store';
import {
	collection,
	collectionGroup,
	CollectionReference,
	doc,
	onSnapshot,
	query,
	setDoc,
	updateDoc
} from 'firebase/firestore';
import type { StoreOptions } from '$lib/types/index.js';
import { logger } from '$lib/utils/logger.js';
import { getFirebaseContext } from '$lib/sdk/stores';

export interface DocStoreOptions<T> extends StoreOptions {
	startValue?: T;
}

export interface DocStore<T> extends Omit<Writable<T | undefined | null>, 'set' | 'update'> {
	ref: DocumentReference<T> | null;
	id: string;
	loading: boolean;
	error: Error | null;
	set: (value: unknown) => Promise<unknown>;
	update: (value: unknown) => Promise<unknown>;
}

/**
 * @param {Firestore | undefined | null} firestore - The Firebase Firestore instance.
 * @param {string | DocumentReference} ref - The path to the document.
 * @param {DocStoreOptions} [options] - The options for the store. See our docs
 * @returns {DocStore} A store with realtime data on given doc path.
 */
export function createDocStore<T = unknown>(
	firestore: Firestore | undefined | null,
	ref: string | DocumentReference,
	options: DocStoreOptions<T> = {}
): DocStore<T> {
	const { log, startValue, once } = options;
	let unsubscribe: () => void;

	firestore = firestore ?? getFirebaseContext()?.firestore ?? null;

	if (!firestore) {
		const { subscribe } = writable(startValue);
		const store = {
			subscribe,
			ref: null,
			id: '',
			get loading() {
				return false;
			},
			get error() {
				return null;
			},
			set: async () => {
				return;
			},
			update: async () => {
				return;
			}
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Firestore was not initialized.');

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const docRef = typeof ref === 'string' ? doc(firestore, ref) : ref;

	const { subscribe } = writable<T | null>(startValue, (set) => {
		unsubscribe = onSnapshot(
			docRef,
			(snapshot) => {
				const data = snapshot.data();
				if (log) {
					logger('debug', `DocStore: ${snapshot.id}`, data);
				}

				set((data as T) ?? null);
				loading = false;
			},
			(err) => {
				logger('error', `${err.code} ${err.name}, ${err.message}`);
				error = err;
			}
		);

		if (once) {
			unsubscribe();
			return;
		}

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef as DocumentReference<T>,
		id: docRef.id,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		set: async (value) => {
			return await setDoc(docRef, value);
		},
		update: async (value) => {
			return await updateDoc(docRef, value as never);
		}
	};
}

export interface CollectionStore<T> extends Readable<T[]> {
	ref: CollectionReference<T[]> | null | undefined;
	id: string;
	loading: boolean;
	error: Error | null;
	meta: {
		first: unknown;
		last: unknown;
	};
}

export interface CollectionStoreOptions<T> extends StoreOptions {
	refField?: string;
	startValue?: T[];
}

/**
 * @param {Firestore | undefined | null} firestore - The Firebase Firestore instance.
 * @param {string | CollectionReference} ref - The path to the collection.
 * @param {QueryConstraint[]} [queryConstraints] - The query constraints.
 * @param {CollectionStoreOptions} [options] - The options for the store. See our docs
 * @returns {CollectionStore} A store with realtime data on given collection path.
 */
export function createCollectionStore<T = unknown>(
	firestore: Firestore | undefined | null,
	ref: string | CollectionReference,
	queryConstraints: QueryConstraint[] = [],
	options: CollectionStoreOptions<T> = {}
): CollectionStore<T> {
	let unsubscribe: () => void;
	const { log, startValue, once, refField, idField } = { idField: 'id', ...options };

	firestore = firestore ?? getFirebaseContext()?.firestore ?? null;

	if (!firestore) {
		const { subscribe } = readable<T[]>(startValue);
		const store = {
			subscribe,
			ref: undefined,
			id: '',
			get loading() {
				return false;
			},
			get error() {
				return null;
			},
			get meta() {
				return { first: null, last: null };
			}
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Firestore was not initialized.');

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	let meta = { first: null, last: null };
	const collectionRef = typeof ref === 'string' ? collection(firestore, ref) : ref;
	const q = query(collectionRef, ...queryConstraints);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const calcMeta = (val: any) => {
		return val && val.length
			? {
					first: val[0],
					last: val[val.length - 1]
			  }
			: {
					first: null,
					last: null
			  };
	};

	const { subscribe } = writable<T[]>(startValue, (set) => {
		unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const data = snapshot.docs.map((docSnap) => ({
					...docSnap.data(),
					...(idField ? { [idField]: docSnap.id } : null),
					...(refField ? { [refField]: docSnap.ref } : null)
				})) as T[];

				if (log) {
					const type = loading ? 'New Query' : 'Updated Query';

					logger(
						'debug',
						`CollectionStore: ${type} ${collectionRef.id} | ${data.length} hits`,
						data
					);
				}
				set(data);
				loading = false;
				meta = calcMeta(data);
			},
			(err) => {
				logger('error', `${err.code} ${err.name}, ${err.message}`);
				error = err;
			}
		);

		if (once) {
			unsubscribe();
			return;
		}

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: collectionRef as CollectionReference<T[]>,
		id: collectionRef.id,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		get meta() {
			return meta;
		}
	};
}

export interface CollectionGroupStore<T> extends Readable<T[]> {
	ref: Query<T[], DocumentData> | null | undefined;
	loading: boolean;
	error: Error | null;
}

/**
 * @param {Firestore | undefined | null} firestore - The Firebase Firestore instance.
 * @param {string | Query} ref - The query to the collection group.
 * @param {CollectionStoreOptions} [options] - The options for the store. See our docs
 * @returns {CollectionGroupStore} A store with realtime data on given collection group path.
 */
export function createCollectionGroupStore<T = unknown>(
	firestore: Firestore | undefined | null,
	ref: string | Query,
	options: CollectionStoreOptions<T> = {}
): CollectionGroupStore<T> {
	let unsubscribe: () => void;
	const { log, startValue, once, refField, idField } = { idField: 'id', ...options };

	firestore = firestore ?? getFirebaseContext()?.firestore ?? null;

	if (!firestore) {
		const { subscribe } = writable<T[]>(startValue);
		const store = {
			subscribe,
			ref: undefined,
			get loading() {
				return false;
			},
			get error() {
				return null;
			}
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Firestore was not initialized.');

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const collectionRef = typeof ref === 'string' ? collectionGroup(firestore, ref) : ref;

	const { subscribe } = writable<T[]>(startValue, (set) => {
		unsubscribe = onSnapshot(
			collectionRef,
			(snapshot) => {
				const data = snapshot.docs.map((docSnap) => ({
					...docSnap.data(),
					...(idField ? { [idField]: docSnap.id } : null),
					...(refField ? { [refField]: docSnap.ref } : null)
				})) as T[];

				if (log) {
					const type = loading ? 'New Query' : 'Updated Query';

					logger('debug', `CollectionGroupStore: ${type} | ${data.length} hits`, data);
				}
				set(data);
				loading = false;
			},
			(err) => {
				logger('error', `${err.code} ${err.name}, ${err.message}`);
				error = err;
			}
		);

		if (once) {
			unsubscribe();
			return;
		}

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: collectionRef as Query<T[], DocumentData>,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};
}
