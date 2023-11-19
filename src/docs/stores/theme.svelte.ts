import { browser } from '$app/environment';

// const createTheme = () => {
// 	let currentTheme;
// 	if (browser) {
// 		currentTheme = localStorage.getItem('theme') || 'auto';
// 	}

// 	const { subscribe, set } = writable<string>(currentTheme);

// 	return {
// 		subscribe,
// 		set: (value: string) => {
// 			if (browser) {
// 				localStorage.setItem('theme', value);
// 				document.firstElementChild?.setAttribute('data-theme', value);
// 			}
// 			set(value);
// 		}
// 	};
// };

// export const theme = createTheme();

class Theme {
	public value: 'auto' | 'dark' | 'light' = $state('dark');

	public constructor() {
		if (browser) {
			this.value = (localStorage.getItem('theme') as 'auto' | 'dark' | 'light') || 'dark';
		}
	}

	public set(value: 'auto' | 'dark' | 'light') {
		if (browser) {
			localStorage.setItem('theme', value);
			document.firstElementChild?.setAttribute('data-theme', value);
		}
		this.value = value;
	}
}

export const theme = new Theme();
