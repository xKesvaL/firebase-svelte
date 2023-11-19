<script lang="ts">
	import IconBrandGithub from '$docs/icons/IconBrandGithub.svelte';
	import { Button } from '$docs/ui/button/index.svelte';
</script>

<footer class="container flex flex-col items-center justify-center gap-4 lg:flex-row">
	<div>
		<Button href="https://github.com/xKesvaL/firebase-svelte" target="_blank" class="gap-2">
			Github
			<div class="h-6 w-6">
				<IconBrandGithub />
			</div>
		</Button>
	</div>
	<div>
		A project by <Button
			href="https://kesval.com"
			variant="link"
			target="_blank"
			class="h-auto p-0 text-base text-accent">KesvaL</Button
		>
	</div>
</footer>
