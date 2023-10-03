<script lang="ts">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigNumberStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigNumberStore(remoteConfig, key);

	interface $$Slots {
		default: { value: number };
		loading: {};
		fallback: {};
	}
</script>

{#if $store}
	<slot value={$store} />
{:else if store.loading}
	<slot name="loading" />
{:else}
	<slot name="fallback" />
{/if}
