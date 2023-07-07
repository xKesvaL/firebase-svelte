import type { DocumentReference, Firestore, Query, QueryConstraint } from 'firebase/firestore';
import { readable } from 'svelte/store';
import {
	collection,
	collectionGroup,
	CollectionReference,
	doc,
	onSnapshot,
	query
} from 'firebase/firestore';
import type { StoreOptions } from '$lib/stores.js';

interface docStoreOptions<T> extends StoreOptions {
	startValue?: T;
}

interface collectionStoreOptions<T> extends StoreOptions {
	refField?: string;
	startValue?: T[];
}

/**
 * @param {Firestore} firestore - The Firebase Firestore instance.
 * @param {string | DocumentReference} ref - The path to the document.
 * @param {docStoreOptions} [options] - The options for the store. See our docs
 * @returns A store with realtime data on given doc path.
 */
export function createDocStore<T>(
	firestore: Firestore | undefined,
	ref: string | DocumentReference,
	options: docStoreOptions<T> = {}
) {
	const { log, startValue, once } = options;
	let unsubscribe: () => void;

	if (!firestore) {
		const { subscribe } = readable(startValue);
		const store = {
			subscribe,
			ref: null,
			id: '',
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
		console.warn(
			'%c[FIREBASE-SV] %cFirestore was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const docRef = typeof ref === 'string' ? doc(firestore, ref) : ref;

	const { subscribe } = readable<T | null>(startValue, (set) => {
		unsubscribe = onSnapshot(
			docRef,
			(snapshot) => {
				const data = snapshot.data();
				if (log) {
					console.groupCollapsed(`[FIREBASE-SV] DocStore: ${snapshot.id}`);
					console.log(`Path: ${docRef.path}`);
					console.table(data);
					console.groupEnd();
				}

				set((data as T) ?? null);
				loading = false;
			},
			(err) => {
				console.error(err);
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
		ref: docRef,
		id: docRef.id,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};
}

/**
 * @param {Firestore} firestore - The Firebase Firestore instance.
 * @param {string | CollectionReference} ref - The path to the collection.
 * @param {QueryConstraint[]} [queryConstraints] - The query constraints.
 * @param {collectionStoreOptions} [options] - The options for the store. See our docs
 * @returns A store with realtime data on given collection path.
 */
export function createCollectionStore<T>(
	firestore: Firestore | undefined,
	ref: string | CollectionReference,
	queryConstraints: QueryConstraint[] = [],
	options: collectionStoreOptions<T> = {}
) {
	let unsubscribe: () => void;
	const { log, startValue, once, refField, idField } = { idField: 'id', ...options };

	if (!firestore) {
		const { subscribe } = readable(startValue);
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
		console.warn(
			'%c[FIREBASE-SV] %cFirestore was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

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

	const { subscribe } = readable<T[] | undefined>(startValue, (set) => {
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
					console.groupCollapsed(
						`[FIREBASE-SV] CollectionStore: ${type} ${collectionRef.id} | ${data.length} hits`
					);
					console.log(`Path: ${collectionRef.path}`);
					console.table(data);
					console.groupEnd();
				}
				set(data);
				loading = false;
				meta = calcMeta(data);
			},
			(err) => {
				console.error(err);
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
		ref: collectionRef,
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

/**
 * @param {Firestore} firestore - The Firebase Firestore instance.
 * @param {string | Query} ref - The query to the collection group.
 * @param {collectionStoreOptions} [options] - The options for the store. See our docs
 * @returns A store with realtime data on given collection group path.
 */
export function createCollectionGroupStore<T>(
	firestore: Firestore | undefined,
	ref: string | Query,
	options: collectionStoreOptions<T> = {}
) {
	let unsubscribe: () => void;
	const { log, startValue, once, refField, idField } = { idField: 'id', ...options };

	if (!firestore) {
		const { subscribe } = readable(startValue);
		const store = {
			subscribe,
			ref: undefined,
			id: '',
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
		console.warn(
			'%c[FIREBASE-SV] %cFirestore was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const collectionRef = typeof ref === 'string' ? collectionGroup(firestore, ref) : ref;

	const { subscribe } = readable<T[] | undefined>(startValue, (set) => {
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
					console.groupCollapsed(
						`[FIREBASE-SV] CollectionGroupStore: ${type} | ${data.length} hits`
					);
					console.table(data);
					console.groupEnd();
				}
				set(data);
				loading = false;
			},
			(err) => {
				console.error(err);
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
		ref: collectionRef,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};
}
