<script lang="ts">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigBooleanStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigBooleanStore(remoteConfig, key);

	interface $$Slots {
		default: { value: boolean };
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
