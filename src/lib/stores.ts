import { writable } from 'svelte/store';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Database } from 'firebase/database';

export interface StoreOptions {
	log?: boolean;
	once?: boolean;
}

interface SDK {
	auth: Auth;
	firestore?: Firestore;
	realtime?: Database;
}

export const sdk = writable<SDK>();
