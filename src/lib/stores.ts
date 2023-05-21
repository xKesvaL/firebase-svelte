import { readable, writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, collection, collectionGroup } from 'firebase/firestore';
import { ref as getDbRef, onValue } from 'firebase/database';
import type { Auth, User } from 'firebase/auth';
import type { DocumentReference, Firestore, Query, CollectionReference } from 'firebase/firestore';
import type { Database, DatabaseReference } from 'firebase/database';

/**
 * @param {Firestore} firestore - The Firebase Firestore instance.
 * @param {string | DocumentReference} ref - The path to the document.
 * @param {any} [startValue] - The initial value of the store.
 * @returns A store with realtime data on given doc path.
 */
export function fireDocStore<T>(
	firestore: Firestore | undefined,
	ref: string | DocumentReference,
	startValue?: T
) {
	let unsubscribe: () => void;

	if (!firestore) {
		if (!globalThis.window) {
			const { subscribe } = readable(startValue);
			return {
				subscribe,
				ref: null,
				id: ''
			};
		}
		console.warn(
			'%c[FIREBASE-SV] %cFirestore was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		const { subscribe } = readable(startValue);
		return {
			subscribe,
			ref: null,
			id: ''
		};
	}

	const docRef = typeof ref === 'string' ? doc(firestore, ref) : ref;

	const { subscribe } = readable<T | null>(startValue, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

/**
 * @param {Firestore} firestore - The Firebase Firestore instance.
 * @param {string | Query | CollectionReference} ref - The path to the collection.
 * @param {any[]} [startValue=[]] - The initial value of the store.
 * @returns A store with realtime data on given collection path.
 */
export function fireCollectionStore<T>(
	firestore: Firestore | undefined,
	ref: string | Query | CollectionReference,
	startValue: T[] = []
) {
	let unsubscribe: () => void;

	if (!firestore) {
		if (!globalThis.window) {
			const { subscribe } = readable(startValue);
			return {
				subscribe,
				ref: null,
				id: ''
			};
		}
		console.warn(
			'%c[FIREBASE-SV] %cFirestore was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		const { subscribe } = readable(startValue);
		return {
			subscribe,
			ref: null,
			id: ''
		};
	}

	const collectionRef = typeof ref === 'string' ? collection(firestore, ref) : ref;

	const { subscribe } = readable<T[] | null>(startValue, (set) => {
		unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					ref: doc.ref,
					...doc.data()
				} as T;
			});
			set(data);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: collectionRef
	};
}

export function fireCollectionGroupStore<T>(
	firestore: Firestore | undefined,
	ref: string | Query,
	startValue: T[] = []
) {
	let unsubscribe: () => void;

	if (!firestore) {
		if (!globalThis.window) {
			const { subscribe } = readable(startValue);
			return {
				subscribe,
				ref: null,
				id: ''
			};
		}
		console.warn(
			'%c[FIREBASE-SV] %cFirestore was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		const { subscribe } = readable(startValue);
		return {
			subscribe,
			ref: null,
			id: ''
		};
	}

	const collectionRef = typeof ref === 'string' ? collectionGroup(firestore, ref) : ref;

	const { subscribe } = readable<T[]>(startValue, (set) => {
		unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					ref: doc.ref,
					...doc.data()
				} as T;
			});
			set(data);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: collectionRef
	};
}

/**
 * @param {Auth} auth - The Firebase Auth instance.
 * @returns A (subscribe-only) store for the current user's data.
 */
export function userStore(auth: Auth) {
	let unsubscribe: () => void;

	if (!auth) {
		if (!globalThis.window) {
			const { subscribe } = readable(null);
			return {
				subscribe
			};
		}
		console.warn(
			'%c[FIREBASE-SV] %cAuth was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		const { subscribe } = readable(null);
		return {
			subscribe
		};
	}

	const { subscribe } = readable<User | null | undefined>(auth?.currentUser ?? undefined, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}

/**
 * @description Important: Use this on the lowest level needed for watching changes. Don't put this on the root of your app, or you will get a lot of reads and your data will be enormous.
 * @param {Database} realtimeDB - The Firebase Realtime Database instance.
 * @param {string | DatabaseReference} ref - The path to the data.
 * @param {any} [startValue] - The initial value of the store.
 * @returns A store with realtime data on given path.
 */
export function realtimeDataStore<T>(
	realtimeDB: Database | undefined,
	ref: string | DatabaseReference,
	startValue?: T
) {
	let unsubscribe: () => void;

	if (!realtimeDB) {
		if (!globalThis.window) {
			const { subscribe } = readable(startValue);
			return {
				subscribe,
				ref: null
			};
		}
		console.warn(
			'%c[FIREBASE-SV] %cRealtime Database was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		const { subscribe } = readable(startValue);
		return {
			subscribe,
			ref: null
		};
	}

	const dataRef = typeof ref === 'string' ? getDbRef(realtimeDB, ref) : ref;

	const { subscribe } = readable<T>(startValue, (set) => {
		unsubscribe = onValue(dataRef, (snapshot) => {
			set(snapshot.val() as T);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: dataRef
	};
}

interface SDK {
	auth: Auth;
	firestore?: Firestore;
	realtime?: Database;
}

export const sdk = writable<SDK>();
