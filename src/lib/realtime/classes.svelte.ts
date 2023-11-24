import { getFirebaseContext } from '$lib/sdk/stores';
import { DefaultState } from '$lib/utils/defaultClass.svelte';
import { logger } from '$lib/utils/logger';
import {
	onValue,
	ref as dbRef,
	type Database,
	type DatabaseReference,
	set,
} from 'firebase/database';

export interface StateOptions {
	once?: boolean;
}

class DefaultRealtimeState extends DefaultState {
	public options = $state<StateOptions>({
		once: false,
	});

	public constructor(opt: StateOptions = {}) {
		super();

		this.options = opt;
	}
}

/**
 * Creates a new NodeState instance.
 * @param realtimedb - The realtimedb instance.
 * @param ref - The path to the node or the DatabaseReference.
 * @link https://firebase-svelte.vercel.app/realtime-db/states/node
 */
export class NodeState<T = Record<string, unknown>> extends DefaultRealtimeState {
	public realtimedb: Database | null = $state(null);
	public node: T | null | undefined = $state(undefined);
	public optimisticNode: T | null | undefined = $state(undefined);
	public unsubscribe: () => void = $state(() => {});
	public ref: DatabaseReference | null = $state(null);
	public key: string | null = $state(null);

	/**
	 * Creates a new NodeState instance.
	 * @param realtimedb - The realtimedb instance.
	 * @param ref - The path to the node or the DatabaseReference.
	 * @link https://firebase-svelte.vercel.app/realtime-db/states/node
	 */
	public constructor(
		realtimedb: Database | null | undefined,
		ref: string | DatabaseReference,
		options?: StateOptions & { startValue?: T },
	) {
		super(options);

		if (options?.startValue) {
			this.node = options.startValue;
		}
		this.realtimedb = realtimedb ?? getFirebaseContext()?.rtdb ?? null;
		this.loading = this.node === undefined;

		if (this.realtimedb) {
			this.ref = typeof ref === 'string' ? dbRef(this.realtimedb, ref) : ref;

			this.key = this.ref.key;

			this.unsubscribe = onValue(
				this.ref,
				(snapshot) => {
					this.node = snapshot.val();
					this.loading = false;
				},
				(err) => {
					this.error = {
						message: err.message,
						code: 'internal/unknown',
					};
					this.loading = false;

					logger('error', 'NodeState', err);
				},
			);

			if (this.options.once) {
				this.unsubscribe();
			} else {
				$effect(() => {
					return () => this.unsubscribe();
				});
			}
		} else {
			this.noSdk({ sdk: 'realtimedb', className: 'NodeState' });
		}
	}

	public set = async (value: T) => {
		if (!this.realtimedb || !this.ref) {
			return;
		}
		this.optimisticNode = value;
		await set(this.ref, value);
	};

	public update = async (value: Partial<T>) => {
		if (!this.realtimedb || !this.ref) {
			return;
		}
		this.optimisticNode = { ...this.node, ...value } as T;
		await set(this.ref, this.optimisticNode);
	};
}

/**
 * Creates a new NodeListState instance.
 * @description Important: Use this on the lowest level needed for watching changes. Don't put this on the root of your app, or you will get a lot of reads and your data will be enormous.
 * @param realtimedb - The realtimedb instance.
 * @param ref - The path to the node list or the DatabaseReference.
 * @link https://firebase-svelte.vercel.app/realtime-db/states/node-list
 */

export class NodeListState<T = Record<string, unknown>> extends DefaultRealtimeState {
	public realtimedb: Database | null = $state(null);
	public nodeList: (T & { key: string })[] | null | undefined = $state(undefined);
	public unsubscribe: () => void = $state(() => {});
	public ref: DatabaseReference | null = $state(null);
	public key: string | null = $state(null);

	/**
	 * Creates a new NodeListState instance.
	 * @description Important: Use this on the lowest level needed for watching changes. Don't put this on the root of your app, or you will get a lot of reads and your data will be enormous.
	 * @param realtimedb - The realtimedb instance.
	 * @param ref - The path to the node list or the DatabaseReference.
	 * @link https://firebase-svelte.vercel.app/realtime-db/states/node-list
	 */
	public constructor(
		realtimedb: Database | null | undefined,
		ref: string | DatabaseReference,
		options?: StateOptions & { startValue?: T[] },
	) {
		super(options);

		if (options?.startValue) {
			this.nodeList = options.startValue as (T & { key: string })[];
		}
		this.realtimedb = realtimedb ?? getFirebaseContext()?.rtdb ?? null;
		this.loading = this.nodeList === undefined;

		if (this.realtimedb) {
			this.ref = typeof ref === 'string' ? dbRef(this.realtimedb, ref) : ref;

			this.key = this.ref.key;

			this.unsubscribe = onValue(
				this.ref,
				(snapshot) => {
					const dataArr: (T & { key: string })[] = [];

					snapshot.forEach((childSnapshot) => {
						const childData = childSnapshot.val();
						dataArr.push({
							key: childSnapshot.ref.key,
							...(typeof childData === 'object' ? childData : {}),
						});
					});

					this.nodeList = dataArr;
					this.loading = false;
				},
				(err) => {
					this.error = {
						message: err.message,
						code: 'internal/unknown',
					};
					this.loading = false;

					logger('error', 'NodeListState', err);
				},
			);

			if (this.options.once) {
				this.unsubscribe();
			} else {
				$effect(() => {
					return () => this.unsubscribe();
				});
			}
		} else {
			this.noSdk({ sdk: 'realtimedb', className: 'NodeListState' });
		}
	}
}
