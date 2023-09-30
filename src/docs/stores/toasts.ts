import { writable } from 'svelte/store';

export interface Toast {
	id: number;
	message: string;
	timeout?: number;
}

const createToastStore = () => {
	const { subscribe, set, update } = writable<Toast[]>([]);

	return {
		subscribe,
		add: (toast: Toast) => {
			update((toasts) => [toast, ...toasts]);

			setTimeout(() => {
				update((toasts) => toasts.filter((t) => t.id !== toast.id));
			}, toast.timeout || 7500);
		},
		remove: (id: number) => update((toasts) => toasts.filter((t) => t.id !== id)),
		clear: () => set([]),
		get length() {
			let length = 0;
			subscribe((toasts) => (length = toasts.length));
			return length;
		}
	};
};

export const toasts = createToastStore();
