<script lang="ts">
	import { Button } from '$docs/ui/button/index.js';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import IconMenu2 from '$docs/icons/IconMenu2.svelte';

	import { sidebarShown } from '$docs/stores/sidebar.js';
</script>

<header
	class=" sticky left-0 right-0 top-0 flex min-h-[4rem] items-center gap-2 bg-card p-4 shadow-lg shadow-foreground/10"
	style="view-transition-name: header;"
>
	<Button
		variant="ghost"
		size="icon"
		class="p-1 lg:hidden"
		on:click={() => {
			sidebarShown.set(!$sidebarShown);
		}}
	>
		<IconMenu2 />
	</Button>

	<Button variant="link" class="h-auto p-0 text-lg text-foreground">
		<span>🔥 Firebase Svelte</span>
	</Button>

	<div class="ml-auto">
		<ThemeSwitcher />
	</div>
</header>
