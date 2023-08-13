<script lang="ts">
	import type { Auth, User } from 'firebase/auth';
	import { createUserStore } from './stores.js';
	import { sdk } from '$lib/stores.js';

	interface $$Slots {
		default: { user: User };
		signedOut: Record<string, never>;
		loading: Record<string, never>;
	}

	export let auth: Auth = $sdk.auth;

	const user = createUserStore(auth);

	$: console.log($user);
</script>

{#if $user}
	<slot user={$user} />
{:else if $user === undefined}
	<slot name="loading" />
{:else}
	<slot name="signedOut" />
{/if}
