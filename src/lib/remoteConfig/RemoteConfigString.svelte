<script lang="ts">
	import type { RemoteConfig } from 'firebase/remote-config';
	import { createRemoteConfigStringStore } from './stores.js';

	export let remoteConfig: RemoteConfig;
	export let key: string;

	let store = createRemoteConfigStringStore(remoteConfig, key);

	interface $$Slots {
		default: { value: string };
		loading: {};
	}
</script>

{#if $store !== undefined}
	<slot value={$store} />
{:else}
	<slot name="loading" />
{/if}
