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
	import Footer from '$docs/containers/layout/Footer.svelte';
	import { sidebarShown } from '$docs/stores/sidebar';
	import { BRAND } from '$docs/config';

	onNavigate((navigation) => {
		sidebarShown.set(false);

		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta content={BRAND.author.name} name="copyright" />
	<meta content={BRAND.name} name="og:site_name" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<div class="flex flex-1 flex-col">
		<Sidebar />
		<main class="flex-1 lg:ml-80">
			<slot />
		</main>
		<div class="lg:ml-80">
			<Footer />
		</div>
	</div>
</div>

<Toasts />
