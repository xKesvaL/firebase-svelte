<script lang="ts">
	import { Button } from '$docs/ui/button/index.svelte.js';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	import { sidebarShown } from '$docs/stores/sidebar.js';
	import { Badge } from '$docs/ui/badge/index.svelte';
	import Search from '$docs/components/Search.svelte';
	import Hamburger from '$docs/components/Hamburger.svelte';
	import { PAGES } from '$docs/ROUTES';
</script>

<header
	class="sticky left-0 right-0 top-0 z-10 flex min-h-[5rem] items-center gap-2 bg-card p-4 shadow-lg shadow-foreground/10"
	style="view-transition-name: header;"
>
	<Button
		variant="ghost"
		size="icon"
		class="flex-shrink-0 p-1 lg:hidden"
		on:click={() => {
			sidebarShown.set(!$sidebarShown);
		}}
		aria-label="Open sidebar"
	>
		<Hamburger close={$sidebarShown} />
	</Button>

	<Button
		variant="link"
		class="h-auto p-0 text-base text-foreground lg:text-lg"
		href={PAGES._ROOT()}
	>
		<span>🔥 Firebase Svelte</span>
	</Button>
	<Badge>v{__PKG_VERSION__ ? __PKG_VERSION__.split('.')[0] : 'x'}</Badge>

	<div class="ml-auto flex items-center gap-2 md:gap-4">
		<div class="flex-shrink-0">
			<ThemeSwitcher />
		</div>
		<Search />
	</div>
</header>
