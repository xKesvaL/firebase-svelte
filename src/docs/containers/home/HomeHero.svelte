<script lang="ts">
	import { Button } from '$docs/ui/button/index.js';
	import IconArrowRight from '$docs/icons/IconArrowRight.svelte';
	import IconCustomGithub from '$docs/icons/custom/IconCustomGithub.svelte';
	import { ROUTES } from '$docs/config';
</script>

<section class="h-full">
	<div class="container flex h-full flex-col py-16">
		<div>
			<h1 class="my-4 flex items-center text-5xl lg:text-6xl">
				<span class="block">🔥</span>

				Firebase Svelte
			</h1>
			<div class="mx-4 flex gap-4">
				<Button class="gap-2" href={ROUTES.guideGetstarted}>
					Get Started
					<div class="max-w-[24px]">
						<IconArrowRight />
					</div>
				</Button>
				<Button
					class="gap-2"
					variant="secondary"
					href="https://github.com/xKesvaL/firebase-svelte"
					target="_blank"
				>
					<div class="max-w-[24px]">
						<IconCustomGithub />
					</div>
					Github
				</Button>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		background: radial-gradient(circle at 28% 37%, hsl(var(--primary-300) / 0.25), transparent 50%),
			radial-gradient(circle at 70% 66%, hsl(var(--secondary-300) / 0.25), transparent 50%);
	}
</style>
