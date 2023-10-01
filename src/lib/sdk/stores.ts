import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { getContext, setContext } from 'svelte';
import type { FirebaseStorage } from 'firebase/storage';
import type { Database } from 'firebase/database';
import type { RemoteConfig } from 'firebase/remote-config';

export interface FirebaseSDKContext {
	auth?: Auth;
	firestore?: Firestore;
	rtdb?: Database;
	storage?: FirebaseStorage;
	remoteConfig?: RemoteConfig;
}

export const contextKey = 'firebase-svelte-sdk';

export function setFirebaseContext(sdks: FirebaseSDKContext) {
	setContext(contextKey, sdks);
}

/**
 * Get the Firebase SDKs from Svelte context
 */
export function getFirebaseContext(): FirebaseSDKContext {
	return getContext(contextKey);
}

export function updateFirebaseContext(newSdks: FirebaseSDKContext): FirebaseSDKContext {
	const sdks = getFirebaseContext();

	setFirebaseContext({
		...sdks,
		...newSdks
	});

	return {
		...sdks,
		...newSdks
	};
}
