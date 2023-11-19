export interface StoreOptions {
	log?: boolean;
	once?: boolean;
}

export interface StateError {
	message: string;
	code: StateErrorCode;
}

export const stateErrorCodes = [
	'missing-sdk/auth',
	'missing-sdk/firestore',
	'missing-sdk/storage',
	'missing-sdk/realtimedb',
	'missing-sdk/remoteconfig',
	'internal/unknown',
] as const;

export type StateErrorCode = (typeof stateErrorCodes)[number];
