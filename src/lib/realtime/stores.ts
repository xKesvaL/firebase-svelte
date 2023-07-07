import type { Database, DatabaseReference } from 'firebase/database';
import { readable } from 'svelte/store';
import { ref as getDbRef } from '@firebase/database';
import { onValue } from 'firebase/database';
import type { StoreOptions } from '$lib/stores.js';

interface RealtimeStoreOptions<T> extends StoreOptions {
	startValue?: T;
}

/**
 * @description Important: Use this on the lowest level needed for watching changes. Don't put this on the root of your app, or you will get a lot of reads and your data will be enormous.
 * @param {Database} realtimeDB - The Firebase Realtime Database instance.
 * @param {string | DatabaseReference} ref - The path to the data.
 * @param {any} [startValue] - The initial value of the store.
 * @returns A store with realtime data on given path.
 */
export function createRealtimeDataStore<T>(
	realtimeDB: Database | undefined,
	ref: string | DatabaseReference,
	options: RealtimeStoreOptions<T> = {}
) {
	let unsubscribe: () => void;
	const { log, startValue, once } = options;

	if (!realtimeDB) {
		const { subscribe } = readable(startValue);
		const store = {
			subscribe,
			ref: null,
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
			'%c[FIREBASE-SV] %cRealtime Database was not initialized.',
			'color: #ff3e00; font-weight: bold;',
			'color: initial;'
		);

		return store;
	}

	let loading = startValue === undefined;
	let error: Error | null = null;
	const dataRef = typeof ref === 'string' ? getDbRef(realtimeDB, ref) : ref;

	const { subscribe } = readable<T>(startValue, (set) => {
		unsubscribe = onValue(
			dataRef,
			(snapshot) => {
				const data = snapshot.val();
				if (log) {
					console.groupCollapsed(`[FIREBASE-SV] Realtime: ${dataRef.key}`);
					console.log(`Path: ${dataRef.ref}`);
					console.table(data);
					console.groupEnd();
				}

				set(data as T);
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
		ref: dataRef,
		key: dataRef.key,
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};
}
