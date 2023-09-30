<script>
	import '@kesval/design';
	import '$docs/styles/inter.scss';
	import '$docs/styles/poppins.scss';
	import '$docs/styles/main.scss';
	import '$docs/styles/codeHighlights.scss';
	import '../app.postcss';

	import { onNavigate } from '$app/navigation';
	import Sidebar from '$docs/containers/layout/Sidebar.svelte';
	import Header from '$docs/containers/layout/Header.svelte';
	import Toasts from '$docs/containers/layout/Toasts.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<div class="flex flex-1">
		<Sidebar />
		<main class="flex-1 lg:ml-80">
			<slot />
		</main>
	</div>
</div>

<Toasts />
