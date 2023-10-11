import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { getContext, setContext } from 'svelte';
import type { FirebaseStorage } from 'firebase/storage';
import type { Database } from 'firebase/database';
import type { FirebaseApp } from 'firebase/app';

export interface FirebaseSDKContext {
	app?: FirebaseApp;
	auth?: Auth;
	firestore?: Firestore;
	rtdb?: Database;
	storage?: FirebaseStorage;
}

export const contextKey = 'firebase-svelte-sdk';

/**
 * @description !WARNING! This function replaces all the SDKs, use updateFirebaseContext instead if you want to update only some of them
 * @param {FirebaseSDKContext} sdks the Firebase SDKs to set in the current context
 * @returns {void}
 */
export function setFirebaseContext(sdks: FirebaseSDKContext): void {
	setContext(contextKey, sdks);
}

/**
 * @description Get the Firebase SDKs from the current context
 * @returns {FirebaseSDKContext} the Firebase SDKs you defined
 */
export function getFirebaseContext(): FirebaseSDKContext {
	return getContext(contextKey);
}

/**
 * @description Update Firebase SDKs in the current context without replacing all of them
 * @param {FirebaseSDKContext} newSdks the Firebase SDKs to update in the current context
 * @returns {void}
 */
export function updateFirebaseContext(newSdks: FirebaseSDKContext): void {
	const sdks = getFirebaseContext();

	setFirebaseContext({
		...sdks,
		...newSdks
	});
}
