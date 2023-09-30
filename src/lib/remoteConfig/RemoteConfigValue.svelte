<script lang="ts" generics="Value">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigValueStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigValueStore<Value>(remoteConfig, key);

	interface $$Slots {
		default: { value: Value };
		loading: {};
	}
</script>

{#if $store !== undefined}
	<slot value={$store} />
{:else}
	<slot name="loading" />
{/if}
