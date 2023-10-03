<script lang="ts">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigStringStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigStringStore(remoteConfig, key);

	interface $$Slots {
		default: { value: string };
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
