import FirebaseApp from './FirebaseApp.svelte';
import User from '$lib/User.svelte';
import FireDoc from '$lib/FireDoc.svelte';
import FireCollection from '$lib/FireCollection.svelte';

import {
	userStore,
	realtimeDataStore,
	fireCollectionGroupStore,
	fireCollectionStore,
	fireDocStore
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
} from '$lib/stores';

export { FirebaseApp, User, FireDoc, FireCollection, userStore, realtimeDataStore, fireCollectionGroupStore, fireCollectionStore, fireDocStore };
