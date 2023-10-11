<script lang="ts">
	import { FirebaseApp } from '$lib';
	import { auth, firestore, realtimeDb, app, storage } from '$docs/test/firebase';
</script>

<FirebaseApp {app} {auth} {firestore} {realtimeDb} {storage}>
	<slot />
</FirebaseApp>
