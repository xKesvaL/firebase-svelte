import { getFirebaseContext } from '$lib/sdk/stores';
import type { StateErrorCode } from '$lib/types';
import { DefaultState } from '$lib/utils/defaultClass.svelte';
import { logger } from '$lib/utils/logger';
import {
	onSnapshot,
	type Firestore,
	DocumentReference,
	doc,
	collection,
	CollectionReference,
	Query,
	collectionGroup,
	setDoc,
	deleteDoc,
	updateDoc,
	query,
	QueryConstraint,
} from 'firebase/firestore';

export interface StateOptions {
	once?: boolean;
}

class DefaultFirestoreState extends DefaultState {
	public options = $state<StateOptions>({
		once: false,
	});

	public constructor(opt: StateOptions = {}) {
		super();

		this.options = opt;
	}
}

/**
 * Creates a new DocState instance.
 * @param firestore - The firestore instance.
 * @param ref - The path to the document or the DocumentReference.
 * @link https://firebase-svelte.vercel.app/auth/states/doc
 */
export class DocState<T = Record<string, unknown>> extends DefaultFirestoreState {
	public firestore: Firestore | null = $state(null);
	public doc: T | null | undefined = $state(undefined);
	public optimisticDoc: T | null | undefined = $state(undefined);
	public unsubscribe: () => void = $state(() => {});
	public ref: DocumentReference<T> | null = $state(null);
	public id: string | null = $state(null);

	/**
	 * Creates a new DocState instance.
	 * @param firestore - The firestore instance.
	 * @param ref - The path to the document or the DocumentReference.
	 * @link https://firebase-svelte.vercel.app/auth/states/doc
	 */
	public constructor(
		firestore: Firestore | null | undefined,
		ref: string | DocumentReference<T>,
		options?: StateOptions & { startValue?: T },
	) {
		super(options);

		if (options?.startValue) {
			this.doc = options.startValue;
		}
		this.firestore = firestore ?? getFirebaseContext().firestore ?? null;
		this.loading = this.doc === undefined;

		if (this.firestore) {
			this.loading = true;

			this.ref = (typeof ref === 'string' ? doc(this.firestore, ref) : ref) as DocumentReference<T>;

			this.unsubscribe = onSnapshot(
				this.ref,
				(doc) => {
					this.doc = doc.data() ?? null;
					this.id = doc.id;
					this.loading = false;
				},
				(err) => {
					this.error = {
						message: err.message,
						code: (err.code as StateErrorCode) ?? 'internal/unknown',
					};
					this.loading = false;

					logger('error', 'DocState', err);
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
			this.noSdk({ sdk: 'firestore', className: 'DocState' });
		}
	}

	public set = async (value: T) => {
		if (!this.firestore || !this.ref) return;
		this.optimisticDoc = value;
		return await setDoc(this.ref, value);
	};

	public delete = async () => {
		if (!this.firestore || !this.ref) return;
		this.optimisticDoc = null;
		return await deleteDoc(this.ref);
	};

	public update = async (value: Partial<T>) => {
		if (!this.firestore || !this.ref) return;
		this.optimisticDoc = { ...this.optimisticDoc, ...value } as T;
		return updateDoc(this.ref, value);
	};
}

/**
 * Creates a new CollectionState instance.
 * @param firestore - The firestore instance.
 * @param ref - The path to the collection or the CollectionReference.
 * @link https://firebase-svelte.vercel.app/auth/states/collection
 */

export class CollectionState<T = Record<string, unknown>> extends DefaultFirestoreState {
	public firestore: Firestore | null = $state(null);
	public collection: (T & { id: string; ref: DocumentReference<T> })[] | null = $state(null);
	public unsubscribe: () => void = $state(() => {});
	public ref: string | CollectionReference<T> | null = $state(null);
	public meta: { first: T | null; last: T | null } = $state({ first: null, last: null });

	/**
	 * Creates a new CollectionState instance.
	 * @param firestore - The firestore instance.
	 * @param ref - The path to the collection or the CollectionReference.
	 * @link https://firebase-svelte.vercel.app/auth/states/collection
	 */
	public constructor(
		firestore: Firestore | null | undefined,
		ref: string | CollectionReference<T>,
		queryConstraints: QueryConstraint[] = [],
		options?: StateOptions,
	) {
		super(options);

		this.firestore = firestore ?? getFirebaseContext().firestore ?? null;
		this.loading = this.collection === null;

		if (this.firestore) {
			this.loading = true;

			this.ref = (
				typeof ref === 'string' ? collection(this.firestore, ref) : ref.path
			) as CollectionReference<T>;

			if (!this.ref) return;

			const q = query(this.ref, ...queryConstraints);

			const calcMeta = (val: T[]) => {
				return val && val.length
					? {
							first: val[0],
							last: val[val.length - 1],
					  }
					: {
							first: null,
							last: null,
					  };
			};

			this.unsubscribe = onSnapshot(
				q,
				(collection) => {
					this.collection =
						collection.docs.map((d) => ({ ...(d.data() as T), id: d.id, ref: d.ref })) ?? null;
					this.loading = false;

					this.meta = calcMeta(this.collection ?? []);
				},
				(err) => {
					this.error = {
						message: err.message,
						code: (err.code as StateErrorCode) ?? 'internal/unknown',
					};
					this.loading = false;

					logger('error', 'CollectionState', err);
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
			this.noSdk({ sdk: 'firestore', className: 'CollectionState' });
		}
	}

	public add = (id: string, value: T) => {
		if (!this.firestore || !this.ref) return;
		return setDoc(doc(this.ref as CollectionReference, id), value as never);
	};

	public remove = (id: string) => {
		if (!this.firestore || !this.ref) return;
		return deleteDoc(doc(this.ref as CollectionReference, id));
	};
}

/**
 * Creates a new CollectionGroupState instance.
 * @param firestore - The firestore instance.
 * @param ref - The path to the collection group.
 * @link https://firebase-svelte.vercel.app/auth/states/collection-group
 */
export class CollectionGroupState<T = Record<string, unknown>> extends DefaultFirestoreState {
	public firestore: Firestore | null = $state(null);
	public collection: (T & { id: string; ref: DocumentReference })[] | null = $state(null);
	public unsubscribe: () => void = $state(() => {});
	public ref: string | Query | null = $state(null);

	/**
	 * Creates a new CollectionGroupState instance.
	 * @param firestore - The firestore instance.
	 * @param ref - The path to the collection group.
	 * @link https://firebase-svelte.vercel.app/auth/states/collection-group
	 */

	public constructor(firestore: Firestore | null | undefined, ref: string, options?: StateOptions) {
		super(options);

		this.firestore = firestore ?? getFirebaseContext().firestore ?? null;
		this.loading = this.collection === null;

		if (this.firestore) {
			this.loading = true;

			this.ref = typeof ref === 'string' ? collectionGroup(this.firestore, ref) : ref;

			this.unsubscribe = onSnapshot(
				this.ref,
				(collection) => {
					this.collection =
						collection.docs.map((d) => ({ ...(d.data() as T), id: d.id, ref: d.ref })) ?? null;
					this.loading = false;
				},
				(err) => {
					this.error = {
						message: err.message,
						code: (err.code as StateErrorCode) ?? 'internal/unknown',
					};
					this.loading = false;

					logger('error', 'CollectionGroupState', err);
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
			this.noSdk({ sdk: 'firestore', className: 'CollectionGroupState' });
		}
	}
}
