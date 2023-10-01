import { getFirebaseContext } from '$lib/sdk/stores';
import { logger } from '$lib/utils/logger.js';
import type { Auth, User } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { readable, type Readable } from 'svelte/store';

interface UserStore extends Readable<User | null | undefined> {
	signOut: () => Promise<void>;
}

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
				subscribe,
				signOut: async () => {
					return;
				}
			};
		}

		logger('warn', 'Auth was not initialized.');

		const { subscribe } = readable(null);
		return {
			subscribe,
			signOut: async () => {}
		};
	}

	const { subscribe } = readable<User | null | undefined>(auth?.currentUser ?? undefined, (set) => {
		unsubscribe = onAuthStateChanged(auth as Auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		signOut: async () => {
			await signOut(auth as Auth).catch((error) => {
				logger('error', error);
			});
		}
	};
}
