import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { version } from './package.json';
import { kitRoutes } from 'vite-plugin-kit-routes';

import type { KIT_ROUTES } from '$docs/ROUTES';

export default defineConfig({
	plugins: [
		sveltekit(),
		kitRoutes<KIT_ROUTES>({
			generated_file_path: 'src/docs/ROUTES.ts',
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "node_modules/@kesval/design/scss/utilities" as *;',
			},
		},
	},
	define: {
		__PKG_VERSION__: JSON.stringify(version),
	},
	resolve: {
		alias: {
			$docs: './src/docs',
			$routes: './src/routes',
		},
	},
});
