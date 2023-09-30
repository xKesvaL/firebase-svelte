<script lang="ts">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigNumberStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigNumberStore(remoteConfig, key);

	interface $$Slots {
		default: { value: number };
		loading: {};
	}
</script>

{#if $store !== undefined}
	<slot value={$store} />
{:else}
	<slot name="loading" />
{/if}
