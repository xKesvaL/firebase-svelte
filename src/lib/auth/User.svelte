<script lang="ts">
	import type { Auth, User } from 'firebase/auth';
	import { createUserStore } from './stores.js';
	import { getFirebaseContext } from '$lib/sdk/stores.js';

	interface $$Slots {
		default: { user: User };
		signedOut: Record<string, never>;
		loading: Record<string, never>;
	}

	export let auth: Auth = getFirebaseContext().auth!;

	const user = createUserStore(auth);
</script>

{#if $user}
	<slot user={$user} />
{:else if $user === undefined}
	<slot name="loading" />
{:else}
	<slot name="signedOut" />
{/if}
