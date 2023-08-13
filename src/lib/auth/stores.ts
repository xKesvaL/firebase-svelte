import type { Auth, User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { readable } from 'svelte/store';

/**
 * @param {Auth} auth - The Firebase Auth instance.
 * @returns A (subscribe-only) store for the current user's data.
 */
export function createUserStore(auth: Auth) {
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
