import type {
	DocumentData,
	DocumentReference,
	Firestore,
	Query,
	QueryConstraint,
} from 'firebase/firestore';
import { readable, type Readable, writable, type Writable } from 'svelte/store';
import {
	collection,
	collectionGroup,
	CollectionReference,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
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
	set: (value: T) => Promise<unknown>;
	update: (value: Partial<T>) => Promise<unknown>;
}

/**
 * @param {Firestore | undefined | null} firestore - The Firebase Firestore instance.
 * @param {string | DocumentReference} ref - The path to the document.
 * @param {DocStoreOptions<T>} [options] - The options for the store. See our docs
 * @returns {DocStore} A store with realtime data on given doc path.
 */
export function createDocStore<T = unknown>(
	firestore: Firestore | undefined | null,
	ref: string | DocumentReference,
	options: DocStoreOptions<T> = {},
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

			set: async () => {
				return;
			},
			update: async () => {
				return;
			},
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Firestore was not initialized.');

		return store;
	}

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
			},
			(err) => {
				logger('error', `${err.code} ${err.name}, ${err.message}`);
			},
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

		set: async (value) => {
			return await setDoc(docRef, value as never);
		},
		update: async (value) => {
			return await updateDoc(docRef, value as never);
		},
	};
}

export interface CollectionStore<T> extends Readable<T[]> {
	ref: CollectionReference<T[]> | null | undefined;
	id: string;
	meta: {
		first: unknown;
		last: unknown;
	};
	add: (key: string, value: T) => Promise<DocumentReference<T> | void>;
	remove: (key: string) => Promise<void>;
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
	options: CollectionStoreOptions<T> = {},
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
			get meta() {
				return { first: null, last: null };
			},
			add: async () => {
				return;
			},
			remove: async () => {
				return;
			},
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Firestore was not initialized.');

		return store;
	}

	let meta = { first: null, last: null };
	const collectionRef = typeof ref === 'string' ? collection(firestore, ref) : ref;
	const q = query(collectionRef, ...queryConstraints);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const calcMeta = (val: any) => {
		return val && val.length
			? {
					first: val[0],
					last: val[val.length - 1],
			  }
			: {
					first: null,
					last: null,
			  };
	};

	const { subscribe } = writable<T[]>(startValue, (set) => {
		unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const data = snapshot.docs.map((docSnap) => ({
					...docSnap.data(),
					...(idField ? { [idField]: docSnap.id } : null),
					...(refField ? { [refField]: docSnap.ref } : null),
				})) as T[];

				if (log) {
					logger('debug', `CollectionStore: Query ${collectionRef.id} | ${data.length} hits`, data);
				}
				set(data);
				meta = calcMeta(data);
			},
			(err) => {
				logger('error', `${err.code} ${err.name}, ${err.message}`);
			},
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
		get meta() {
			return meta;
		},
		add: async (key, value) => {
			return await setDoc(doc(collectionRef, key), value as never);
		},
		remove: async (key) => {
			return await deleteDoc(doc(collectionRef, key));
		},
	};
}

export interface CollectionGroupStore<T> extends Readable<T[]> {
	ref: Query<T[], DocumentData> | null | undefined;
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
	options: CollectionStoreOptions<T> = {},
): CollectionGroupStore<T> {
	let unsubscribe: () => void;
	const { log, startValue, once, refField, idField } = { idField: 'id', ...options };

	firestore = firestore ?? getFirebaseContext()?.firestore ?? null;

	if (!firestore) {
		const { subscribe } = writable<T[]>(startValue);
		const store = {
			subscribe,
			ref: undefined,
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Firestore was not initialized.');

		return store;
	}

	const collectionRef = typeof ref === 'string' ? collectionGroup(firestore, ref) : ref;

	const { subscribe } = writable<T[]>(startValue, (set) => {
		unsubscribe = onSnapshot(
			collectionRef,
			(snapshot) => {
				const data = snapshot.docs.map((docSnap) => ({
					...docSnap.data(),
					...(idField ? { [idField]: docSnap.id } : null),
					...(refField ? { [refField]: docSnap.ref } : null),
				})) as T[];

				if (log) {
					logger('debug', `CollectionGroupStore: Query | ${data.length} hits`, data);
				}
				set(data);
			},
			(err) => {
				logger('error', `${err.code} ${err.name}, ${err.message}`);
			},
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
	};
}
