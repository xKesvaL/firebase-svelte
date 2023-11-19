/**
 * Creates a new Remote Config instance.
 * @param remoteconfig - The remote config instance.
 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config
 */

import { DefaultState } from '$lib/utils/defaultClass.svelte';
import { logger } from '$lib/utils/logger';
import {
	fetchAndActivate,
	getBoolean,
	getNumber,
	getString,
	getValue,
	isSupported,
	type RemoteConfig,
} from 'firebase/remote-config';

export class RemoteConfigActivationState extends DefaultState {
	public active: boolean | null = $state(null);
	public remoteConfig: RemoteConfig | null = $state(null);

	/**
	 * Creates a new Remote Config instance.
	 * @param remoteconfig - The remote config instance.
	 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config
	 */
	public constructor(remoteConfig: RemoteConfig) {
		super();

		this.remoteConfig = remoteConfig;

		if (this.remoteConfig !== null) {
			isSupported()
				.then(async (isSupp) => {
					if (isSupp) {
						fetchAndActivate(this.remoteConfig as RemoteConfig).then(() => (this.active = true));
					}
				})
				.catch((err) => {
					logger('error', err, err);
					this.error = {
						code: 'internal/unknown',
						message: err,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'remoteconfig', className: 'RemoteConfigActivation' });
		}
	}
}

/**
 * Creates a new Remote Config Value State.
 * @param remoteconfig - The remote config instance.
 * @param key - The remote config key.
 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-value
 */
export class RemoteConfigValueState<T> extends DefaultState {
	public value: T | null = $state(null);
	public remoteConfig: RemoteConfig | null = $state(null);
	public key: string | null = $state(null);

	/**
	 * Creates a new Remote Config Value State.
	 * @param remoteconfig - The remote config instance.
	 * @param key - The remote config key.
	 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-value
	 */
	public constructor(remoteConfig: RemoteConfig, key: string) {
		super();

		this.remoteConfig = remoteConfig;
		this.key = key ?? null;

		if (this.remoteConfig !== null) {
			isSupported()
				.then(async (isSupp) => {
					if (isSupp) {
						this.value = getValue(this.remoteConfig as RemoteConfig, key) as T;
					}
				})
				.catch((err) => {
					logger('error', err, err);
					this.error = {
						code: 'internal/unknown',
						message: err,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'remoteconfig', className: 'RemoteConfigValue' });
		}
	}
}

/**
 * Creates a new Remote Config Boolean State.
 * @param remoteconfig - The remote config instance.
 * @param key - The remote config key.
 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-boolean
 */
export class RemoteConfigBooleanState extends DefaultState {
	public value: boolean | null = $state(null);
	public remoteConfig: RemoteConfig | null = $state(null);
	public key: string | null = $state(null);

	/**
	 * Creates a new Remote Config Boolean State.
	 * @param remoteconfig - The remote config instance.
	 * @param key - The remote config key.
	 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-boolean
	 */
	public constructor(remoteConfig: RemoteConfig, key: string) {
		super();

		this.remoteConfig = remoteConfig;
		this.key = key ?? null;

		if (this.remoteConfig !== null) {
			isSupported()
				.then(async (isSupp) => {
					if (isSupp) {
						this.value = getBoolean(this.remoteConfig as RemoteConfig, key);
					}
				})
				.catch((err) => {
					logger('error', err, err);
					this.error = {
						code: 'internal/unknown',
						message: err,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'remoteconfig', className: 'RemoteConfigBoolean' });
		}
	}
}

/**
 * Creates a new Remote Config Number State.
 * @param remoteconfig - The remote config instance.
 * @param key - The remote config key.
 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-number
 */
export class RemoteConfigNumberState extends DefaultState {
	public value: number | null = $state(null);
	public remoteConfig: RemoteConfig | null = $state(null);
	public key: string | null = $state(null);

	/**
	 * Creates a new Remote Config Number State.
	 * @param remoteconfig - The remote config instance.
	 * @param key - The remote config key.
	 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-number
	 */
	public constructor(remoteConfig: RemoteConfig, key: string) {
		super();

		this.remoteConfig = remoteConfig;
		this.key = key ?? null;

		if (this.remoteConfig !== null) {
			isSupported()
				.then(async (isSupp) => {
					if (isSupp) {
						this.value = getNumber(this.remoteConfig as RemoteConfig, key);
					}
				})
				.catch((err) => {
					logger('error', err, err);
					this.error = {
						code: 'internal/unknown',
						message: err,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'remoteconfig', className: 'RemoteConfigNumber' });
		}
	}
}

/**
 * Creates a new Remote Config String State.
 * @param remoteconfig - The remote config instance.
 * @param key - The remote config key.
 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-string
 */
export class RemoteConfigStringState extends DefaultState {
	public value: string | null = $state(null);
	public remoteConfig: RemoteConfig | null = $state(null);
	public key: string | null = $state(null);

	/**
	 * Creates a new Remote Config String State.
	 * @param remoteconfig - The remote config instance.
	 * @param key - The remote config key.
	 * @link https://firebase-svelte.vercel.app/remote-config/states/remote-config-string
	 */
	public constructor(remoteConfig: RemoteConfig, key: string) {
		super();

		this.remoteConfig = remoteConfig;
		this.key = key ?? null;

		if (this.remoteConfig !== null) {
			isSupported()
				.then(async (isSupp) => {
					if (isSupp) {
						this.value = getString(this.remoteConfig as RemoteConfig, key);
					}
				})
				.catch((err) => {
					logger('error', err, err);
					this.error = {
						code: 'internal/unknown',
						message: err,
					};
				})
				.finally(() => {
					this.loading = false;
				});
		} else {
			this.noSdk({ sdk: 'remoteconfig', className: 'RemoteConfigString' });
		}
	}
}
