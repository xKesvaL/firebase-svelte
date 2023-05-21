<script lang="ts">
	import type { Auth } from 'firebase/auth';
	import type { Firestore } from 'firebase/firestore';
	import type { Database } from 'firebase/database';
	import { sdk } from '$lib/stores';

	export let auth: Auth;
	export let firestore: Firestore | undefined = undefined;

	export let realtime: Database | undefined = undefined;

	sdk.set({ auth, firestore, realtime });
</script>

<slot />
