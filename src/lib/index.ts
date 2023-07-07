import FirebaseApp from './FirebaseApp.svelte';
import User from '$lib/auth/User.svelte';
import Doc from '$lib/firestore/Doc.svelte';
import Collection from '$lib/firestore/Collection.svelte';
import CollectionGroup from '$lib/firestore/CollectionGroup.svelte';
import Realtime from '$lib/realtime/Realtime.svelte';

import { createRealtimeDataStore } from '$lib/realtime/stores.js';

import { createUserStore } from '$lib/auth/stores.js';

import { createDocStore } from '$lib/firestore/stores.js';

import { addOnline, setOnline, updateOnline, deleteOnline } from '$lib/firestore/firestore-lite.js';

// User Stores
export { createUserStore };

// Firestore Stores
export { createDocStore };

// Realtime Stores
export { createRealtimeDataStore };

// firestore-lite
export { addOnline, setOnline, updateOnline, deleteOnline };

// Components
export {
	FirebaseApp,
	// Auth
	User,
	// Firestore
	Doc,
	Collection,
	CollectionGroup,
	// Realtime
	Realtime
};
