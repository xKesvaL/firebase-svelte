<script lang="ts">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigBooleanStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigBooleanStore(remoteConfig, key);

	interface $$Slots {
		default: { value: boolean };
		loading: {};
	}
</script>

{#if $store !== undefined}
	<slot value={$store} />
{:else}
	<slot name="loading" />
{/if}
