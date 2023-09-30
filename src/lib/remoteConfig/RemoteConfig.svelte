<script lang="ts">
	import { getFirebaseContext } from '$lib/sdk/stores.js';
	import { getRemoteConfig, type RemoteConfig } from 'firebase/remote-config';
	import { onMount } from 'svelte';
	import { createRemoteConfigActivationStore, type RemoteConfigStore } from './stores.js';
	import type { FirebaseApp } from 'firebase/app';

	export let minimumFetchIntervalInSeconds = 3600;
	export let defaultValue = {};
	export let app: FirebaseApp | undefined = getFirebaseContext().app;

	let configActivated: RemoteConfigStore<boolean | undefined>;
	let remoteConfig: RemoteConfig | null;

	onMount(() => {
		remoteConfig = getRemoteConfig(app);
		remoteConfig.settings.minimumFetchIntervalMillis = minimumFetchIntervalInSeconds * 1000;
		remoteConfig.defaultConfig = defaultValue;

		configActivated = createRemoteConfigActivationStore(remoteConfig);
	});

	interface $$Slots {
		default: { remoteConfig: RemoteConfig | null };
		loading: {};
		disabled: {};
	}
</script>

{#if remoteConfig !== undefined && $configActivated === true}
	<slot {remoteConfig} />
{:else if remoteConfig !== undefined && $configActivated === false}
	<slot name="disabled" />
{:else}
	<slot name="loading" />
{/if}
```
