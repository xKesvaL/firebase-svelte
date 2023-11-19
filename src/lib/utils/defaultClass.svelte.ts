import type { StateError, StateErrorCode } from '$lib/types';
import { logger } from './logger';

export class DefaultState {
	public loading: boolean = $state(true);
	public error: StateError | null = $state(null);

	protected noSdk = (options: { sdk: string; className: string }) => {
		if (!globalThis.window) {
			logger('warn', `No ${options.sdk} provided to ${options.className} nor in the context`);
			this.error = {
				code: `missing-sdk/${options.sdk}` as StateErrorCode,
				message: `No ${options.sdk} provided to ${options.className} nor in the context`,
			};
		}

		this.loading = false;
	};
}
