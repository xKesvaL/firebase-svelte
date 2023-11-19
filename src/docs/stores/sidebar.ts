import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const sidebarShown = writable(false);

const createRuneStore = () => {
	let defaultValue = false;

	if (browser) {
		defaultValue = localStorage.getItem('runes') === 'true';
	}

	const { subscribe, set } = writable(defaultValue);

	return {
		subscribe,
		set: (value: boolean) => {
			if (browser) {
				localStorage.setItem('runes', value.toString());
			}
			set(value);
		},
	};
};

export const runes = createRuneStore();
