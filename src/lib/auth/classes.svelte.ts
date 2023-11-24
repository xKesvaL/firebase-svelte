import { getFirebaseContext } from '$lib/sdk/stores';
import { DefaultState } from '$lib/utils/defaultClass.svelte';
import { signOut, type Auth, type User } from 'firebase/auth';

export class UserState extends DefaultState {
	public auth: Auth | null = $state(null);
	public user: User | null | undefined = $state(undefined);
	public unsubscribe: () => void = $state(() => {});

	/**
	 * Creates a new UserState instance.
	 * @param {Auth} firebaseAuth - The Firebase Auth instance.
	 * @link https://firebase-svelte.vercel.app/auth/states/user
	 */
	public constructor(firebaseAuth?: Auth) {
		super();

		this.auth = firebaseAuth ?? getFirebaseContext().auth ?? null;
		this.loading = this.user === undefined;

		if (this.auth) {
			this.loading = true;

			this.unsubscribe = this.auth.onAuthStateChanged((user) => {
				this.user = user;
				this.loading = false;
			});

			$effect(() => {
				return () => this.unsubscribe();
			});
		} else {
			this.noSdk({ sdk: 'auth', className: 'UserState' });
		}
	}

	public signOut = async () => {
		if (!this.auth) {
			return;
		}

		signOut(this.auth);
	};
}
