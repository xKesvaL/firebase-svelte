import type { Database, DatabaseReference } from 'firebase/database';
import { writable, type Writable } from 'svelte/store';
import { ref as getDbRef, set, update } from 'firebase/database';
import { onValue } from 'firebase/database';
import type { StoreOptions } from '$lib/types/index.js';
import { logger } from '$lib/utils/logger.js';
import { getFirebaseContext } from '$lib/sdk/stores';

export interface RealtimeStoreOptions<T> extends StoreOptions {
	startValue?: T;
}

export interface NodeStore<T> extends Omit<Writable<T | undefined | null>, 'set' | 'update'> {
	ref: DatabaseReference | null;
	key: string | null;
	loading: boolean;
	error: Error | null;
	set: (value: unknown) => Promise<unknown>;
	update: (value: object) => Promise<unknown>;
}

/**
 * @description Important: Use this on the lowest level needed for watching changes. Don't put this on the root of your app, or you will get a lot of reads and your data will be enormous.
 * @param {Database | undefined | null} rtdb - The Firebase Realtime Database instance.
 * @param {string | DatabaseReference} ref - The path to the data.
 * @param {RealtimeStoreOptions<T>} [options] - The initial value of the store.
 * @returns {NodeStore<T>} A store with realtime data on given path.
 */
export function createNodeStore<T = unknown>(
	rtdb: Database | undefined | null,
	ref: string | DatabaseReference,
	options: RealtimeStoreOptions<T> = {}
): NodeStore<T> {
	let unsubscribe: () => void;
	const { log, startValue, once } = options;

	rtdb = rtdb ?? getFirebaseContext()?.rtdb ?? null;

	if (!rtdb) {
		const { subscribe } = writable(startValue);
		const store = {
			subscribe,
			ref: null,
			key: null,
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

		logger('warn', 'Realtime Database was not initialized.');

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const dataRef = typeof ref === 'string' ? getDbRef(rtdb, ref) : ref;

	const { subscribe } = writable<T>(startValue, (set) => {
		unsubscribe = onValue(
			dataRef,
			(snapshot) => {
				const data = snapshot.val();
				if (log) {
					logger('debug', `Realtime: ${dataRef.key}`, data);
				}

				set(data as T);
				loading = false;
			},
			(err) => {
				logger('error', `${err.name} - ${err.message}`);
				error = err;
				loading = false;
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
		ref: dataRef,
		key: dataRef.key,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		set: async (value) => {
			return set(dataRef, value);
		},
		update: async (value) => {
			return update(dataRef, value);
		}
	};
}

export interface NodeListStore<T> extends Omit<Writable<T | undefined | null>, 'set' | 'update'> {
	ref: DatabaseReference | null;
	key: string | null;
	loading: boolean;
	error: Error | null;
}

/**
 * @description Important: Use this on the lowest level needed for watching changes. Don't put this on the root of your app, or you will get a lot of reads and your data will be enormous.
 * @param {Database | undefined | null} rtdb - The Firebase Realtime Database instance.
 * @param {string | DatabaseReference} ref - The path to the data.
 * @param {RealtimeStoreOptions<T>} [options] - The initial value of the store.
 * @returns {NodeListStore<T>} A store with realtime data on given path.
 */
export function createNodeListStore<T = unknown>(
	rtdb: Database | undefined | null,
	ref: string | DatabaseReference,
	options: RealtimeStoreOptions<T> = {}
): NodeListStore<T> {
	let unsubscribe: () => void;
	const { log, startValue, once } = options;

	rtdb = rtdb ?? getFirebaseContext()?.rtdb ?? null;

	if (!rtdb) {
		const { subscribe } = writable(startValue);
		const store = {
			subscribe,
			ref: null,
			key: null,
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

		logger('warn', 'Realtime Database was not initialized.');

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const listRef = typeof ref === 'string' ? getDbRef(rtdb, ref) : ref;

	const { subscribe } = writable<T>(startValue, (set) => {
		unsubscribe = onValue(
			listRef,
			(snapshot) => {
				const dataArr: T[] = [];

				snapshot.forEach((childSnapshot) => {
					const childData = childSnapshot.val();
					dataArr.push({
						nodeKey: childSnapshot.ref.key,
						...(typeof childData === 'object' ? childData : {})
					});
				});

				if (log) {
					logger('debug', `Realtime: ${listRef.key}`, dataArr);
				}

				set(dataArr as T);
				loading = false;
			},
			(err) => {
				logger('error', `${err.name} - ${err.message}`);
				error = err;
				loading = false;
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
		ref: listRef,
		key: listRef.key,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};
}
