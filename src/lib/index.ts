import FirebaseApp from './FirebaseApp.svelte';
// auth
import User from '$lib/auth/User.svelte';
// firestore
import Doc from '$lib/firestore/Doc.svelte';
import Collection from '$lib/firestore/Collection.svelte';
import CollectionGroup from '$lib/firestore/CollectionGroup.svelte';
// rtdb
import Node from '$lib/realtime/Node.svelte';
import NodeList from '$lib/realtime/NodeList.svelte';

import { createNodeStore, createNodeListStore } from '$lib/realtime/stores.js';

import { createUserStore } from '$lib/auth/stores.js';

import {
	createDocStore,
	createCollectionStore,
	createCollectionGroupStore
} from '$lib/firestore/stores.js';

// User Stores
export { createUserStore };

// Firestore Stores
export { createDocStore, createCollectionStore, createCollectionGroupStore };

// Realtime Stores
export { createNodeStore, createNodeListStore };

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
	Node,
	NodeList
};
