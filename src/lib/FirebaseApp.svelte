<script lang="ts">
	import type { Auth } from 'firebase/auth';
	import type { Firestore } from 'firebase/firestore';
	import type { Database } from 'firebase/database';
	import type { FirebaseStorage } from 'firebase/storage';
	import type { FirebaseApp } from 'firebase/app';
	import { setFirebaseContext } from './sdk/stores.js';

	export let app: FirebaseApp | undefined = undefined;
	export let auth: Auth | undefined = undefined;
	export let firestore: Firestore | undefined = undefined;
	export let realtimeDb: Database | undefined = undefined;
	export let storage: FirebaseStorage | undefined = undefined;

	setFirebaseContext({ app, auth, firestore, rtdb: realtimeDb, storage });
</script>

<slot />
