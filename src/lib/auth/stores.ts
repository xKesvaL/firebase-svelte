import { logger } from '$lib/utils/logger.js';
import type { Auth, User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { readable, type Readable } from 'svelte/store';

type UserStore = Readable<User | null | undefined>;

/**
 * @param {Auth} auth - The Firebase Auth instance.
 * @returns {UserStore} A store for the current user's data.
 */
export function createUserStore(auth: Auth): UserStore {
	let unsubscribe: () => void;

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
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}
