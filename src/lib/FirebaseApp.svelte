<script lang="ts">
	import type { Auth } from 'firebase/auth';
	import type { Firestore } from 'firebase/firestore';
	import type { Database } from 'firebase/database';
	import { setFirebaseContext } from './sdk/stores.js';
	import type { FirebaseStorage } from 'firebase/storage';
	import type { RemoteConfig } from 'firebase/remote-config';

	export let auth: Auth;
	export let firestore: Firestore | undefined = undefined;
	export let rtdb: Database | undefined = undefined;
	export let storage: FirebaseStorage | undefined = undefined;
	export let remoteConfig: RemoteConfig | undefined = undefined;

	setFirebaseContext({ auth, firestore, rtdb, storage, remoteConfig });
</script>

<slot />
