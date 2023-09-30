<script lang="ts">
	import { Button } from '$docs/ui/button/index.js';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import IconMenu2 from '$docs/icons/IconMenu2.svelte';

	import { sidebarShown } from '$docs/stores/sidebar.js';
	import { ROUTES } from '$docs/config';
	import { Badge } from '$docs/ui/badge';
	import { Input } from '$docs/ui/input';
</script>

<header
	class="sticky left-0 right-0 top-0 flex min-h-[5rem] items-center gap-2 bg-card p-4 shadow-lg shadow-foreground/10"
	style="view-transition-name: header;"
>
	<Button
		variant="ghost"
		size="icon"
		class="flex-shrink-0 p-1 lg:hidden"
		on:click={() => {
			sidebarShown.set(!$sidebarShown);
		}}
	>
		<IconMenu2 />
	</Button>

	<Button variant="link" class="h-auto p-0 text-base text-foreground lg:text-lg" href={ROUTES.home}>
		<span>🔥 Firebase Svelte</span>
	</Button>
	<Badge>{typeof window === 'object' ? __PKG_VERSION__ : '...'}</Badge>

	<div class="ml-auto flex items-center gap-4">
		<Input type="search" placeholder="Search" class="hidden md:flex" />
		<div class="flex-shrink-0">
			<ThemeSwitcher />
		</div>
	</div>
</header>
