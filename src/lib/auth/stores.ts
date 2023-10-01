import { getFirebaseContext } from '$lib/sdk/stores';
import { logger } from '$lib/utils/logger.js';
import type { Auth, User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { readable, type Readable } from 'svelte/store';

type UserStore = Readable<User | null | undefined>;

/**
 * @param {Auth | undefined | null} auth - The Firebase Auth instance.
 * @returns {UserStore} A store for the current user's data.
 */
export function createUserStore(auth: Auth | null = null): UserStore {
	let unsubscribe: () => void;

	auth = auth ?? getFirebaseContext()?.auth ?? null;

	if (!auth) {
		if (!globalThis.window) {
			const { subscribe } = readable(null);
			return {
				subscribe
			};
		}

		logger('warn', 'Auth was not initialized.');

		const { subscribe } = readable(null);
		return {
			subscribe
		};
	}

	const { subscribe } = readable<User | null | undefined>(auth?.currentUser ?? undefined, (set) => {
		unsubscribe = onAuthStateChanged(auth as Auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}
