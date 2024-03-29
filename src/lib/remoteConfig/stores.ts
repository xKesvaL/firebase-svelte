import type { StoreOptions } from '$lib/types/index.js';
import { logger } from '$lib/utils/logger.js';
import type { Readable } from 'svelte/motion';
import { readable } from 'svelte/store';
import {
	fetchAndActivate,
	getBoolean,
	getNumber,
	getString,
	getValue,
	isSupported,
	type RemoteConfig
} from 'firebase/remote-config';

export interface RemoteConfigStoreOptions<T> extends Omit<StoreOptions, 'once'> {
	startValue?: T;
}

export interface RemoteConfigStore<T> extends Readable<T> {
	error: unknown;
	loading: boolean;
}

/**
 *
 * @param {RemoteConfig} remoteConfig firebase remote config instance
 * @param {RemoteConfigStoreOptions<T>} options the store options
 * @returns {RemoteConfigStore<T>} a store with the fallack remote config value
 */
function fallback<T>(
	remoteConfig: RemoteConfig,
	options: RemoteConfigStoreOptions<T> = {}
): RemoteConfigStore<T> | void {
	if (!remoteConfig) {
		const { subscribe } = readable<T>(options.startValue);
		const store = {
			subscribe,
			get error() {
				return null;
			},
			get loading() {
				return false;
			}
		};

		if (!globalThis.window) {
			return store;
		}

		logger('warn', 'Remote config was not initialized properly.');

		return store;
	}
}

/**
 *
 * @param {RemoteConfig} remoteConfig firebase remote config instance
 * @returns {RemoteConfigStore<boolean | undefined>} a store with the remote config activation status
 */
export function createRemoteConfigActivationStore(
	remoteConfig: RemoteConfig
): RemoteConfigStore<boolean | undefined> {
	const fallbackStore = fallback<boolean | undefined>(remoteConfig);

	if (fallbackStore) {
		return fallbackStore;
	}

	let loading = true;
	let error: unknown = null;

	const { subscribe } = readable<boolean | undefined>(undefined, (set) => {
		isSupported()
			.then(async (isSupp) => {
				if (isSupp) {
					fetchAndActivate(remoteConfig as RemoteConfig).then(() => set(true));
				}
			})
			.catch((err) => {
				logger('error', err);
				error = err;
			})
			.finally(() => {
				loading = false;
			});
	});

	return {
		subscribe,
		get error() {
			return error;
		},
		get loading() {
			return loading;
		}
	};
}

/**
 *
 * @param {RemoteConfig} remoteConfig firebase remote config instance
 * @param {string} key the remote config key
 * @param {RemoteConfigStoreOptions<T>} options the store options
 * @returns {RemoteConfigStore<T>} a store with the remote config value
 */
export function createRemoteConfigValueStore<T = unknown>(
	remoteConfig: RemoteConfig,
	key: string,
	options: RemoteConfigStoreOptions<T> = {}
): RemoteConfigStore<T> {
	const fallbackStore = fallback<T>(remoteConfig, options);

	if (fallbackStore) {
		return fallbackStore;
	}

	let loading = true;

	const { subscribe } = readable<T>(options.startValue, (set) => {
		set(getValue(remoteConfig as RemoteConfig, key) as T);
		loading = false;
	});

	return {
		subscribe,
		get error() {
			return null;
		},
		get loading() {
			return loading;
		}
	};
}

/**
 *
 * @param {RemoteConfig} remoteConfig firebase remote config instance
 * @param {string} key the remote config key
 * @param {RemoteConfigStoreOptions<boolean>} options the store options
 * @returns {RemoteConfigStore<boolean>} a store with the remote config boolean
 */
export function createRemoteConfigBooleanStore(
	remoteConfig: RemoteConfig,
	key: string,
	options: RemoteConfigStoreOptions<boolean> = {}
): RemoteConfigStore<boolean> {
	const fallbackStore = fallback<boolean>(remoteConfig, options);

	if (fallbackStore) {
		return fallbackStore;
	}

	let loading = true;

	const { subscribe } = readable<boolean>(options.startValue, (set) => {
		set(getBoolean(remoteConfig as RemoteConfig, key));
		loading = false;
	});

	return {
		subscribe,
		get error() {
			return null;
		},
		get loading() {
			return loading;
		}
	};
}

/**
 *
 * @param {RemoteConfig} remoteConfig firebase remote config instance
 * @param {string} key the remote config key
 * @param {RemoteConfigStoreOptions<number>} options the store options
 * @returns {RemoteConfigStore<number>} a store with the remote config number
 */
export function createRemoteConfigNumberStore(
	remoteConfig: RemoteConfig,
	key: string,
	options: RemoteConfigStoreOptions<number> = {}
): RemoteConfigStore<number> {
	const fallbackStore = fallback<number>(remoteConfig, options);

	if (fallbackStore) {
		return fallbackStore;
	}

	let loading = true;

	const { subscribe } = readable<number>(options.startValue, (set) => {
		set(getNumber(remoteConfig as RemoteConfig, key));
		loading = false;
	});

	return {
		subscribe,
		get error() {
			return null;
		},
		get loading() {
			return loading;
		}
	};
}

/**
 *
 * @param {RemoteConfig} remoteConfig firebase remote config instance
 * @param {string} key the remote config key
 * @param {RemoteConfigStoreOptions<string>} options the store options
 * @returns {RemoteConfigStore<string>} a store with the remote config string
 */
export function createRemoteConfigStringStore(
	remoteConfig: RemoteConfig,
	key: string,
	options: RemoteConfigStoreOptions<string> = {}
): RemoteConfigStore<string> {
	const fallbackStore = fallback<string>(remoteConfig, options);

	if (fallbackStore) {
		return fallbackStore;
	}

	let loading = true;

	const { subscribe } = readable<string>(options.startValue, (set) => {
		set(getString(remoteConfig as RemoteConfig, key));
		loading = false;
	});

	return {
		subscribe,
		get error() {
			return null;
		},
		get loading() {
			return loading;
		}
	};
}
