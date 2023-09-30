import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { version } from './package.json';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "node_modules/@kesval/design/scss/utilities" as *;'
			}
		}
	},
	define: {
		__PKG_VERSION__: JSON.stringify(version)
	}
});
