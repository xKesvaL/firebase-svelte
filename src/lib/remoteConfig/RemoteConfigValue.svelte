<script lang="ts" generics="Value">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigValueStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigValueStore<Value>(remoteConfig, key);
	interface $$Slots {
		default: { value: Value };
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
