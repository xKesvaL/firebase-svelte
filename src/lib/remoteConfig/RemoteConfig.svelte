<script lang="ts">
	import { getFirebaseContext, updateFirebaseContext } from '$lib/sdk/stores.js';
	import type { RemoteConfig } from 'firebase/remote-config';
	import { onMount } from 'svelte';
	import { createRemoteConfigActivationStore, type RemoteConfigStore } from './stores.js';
	import { logger } from '$lib/utils/logger.js';

	export let minimumFetchIntervalInSeconds = 3600;
	export let defaultValue = {};
	export let remoteConfig: RemoteConfig | undefined = getFirebaseContext().remoteConfig;

	let configActivated: RemoteConfigStore<boolean | undefined>;

	onMount(() => {
		if (remoteConfig === undefined) {
			return logger('warn', 'RemoteConfig is not initialized');
		}
		remoteConfig.settings.minimumFetchIntervalMillis = minimumFetchIntervalInSeconds * 1000;
		remoteConfig.defaultConfig = defaultValue;

		updateFirebaseContext({ remoteConfig });

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
