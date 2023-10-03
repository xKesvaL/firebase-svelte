<script>
	import { Button } from '$docs/ui/button';
</script>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1 class="font-mono text-4xl font-black lg:text-5xl">createUserStore()</h1>
		<p class="max-w-prose">
			<code>createUserStore(authInstance)</code> creates a store that holds the current user's data.
			The store is updated automatically when the user's data changes.
		</p>
		<h2 class="text-3xl lg:text-4xl">Parameters</h2>
		<ul class="max-w-prose">
			<li>
				<code>authInstance: Auth</code> - The firebase auth instance. If you put the <Button
					variant="link"
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this store, you can use
				<code>null</code> or <code>undefined</code> as the parameter and the store will retrieve the
				auth instance from the context.
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Properties</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>subscribe: (auth: Auth) => void;</code> - Subscribe method for the Svelte store. Allows
				for the `$store` syntax.
			</li>
			<li>
				<code>signOut: () => Promise&lt;void&gt;</code> - Signs the user out.
			</li>
			<li>
				<code>loading: boolean</code>
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	section {
		background: radial-gradient(circle at 28% 37%, hsl(var(--primary-300) / 0.25), transparent 50%),
			radial-gradient(circle at 70% 66%, hsl(var(--secondary-300) / 0.25), transparent 50%);

		ul {
			li {
				position: relative;
				padding-left: 1.5rem;

				&::before {
					content: '•';
					position: absolute;
					left: 0;
				}
			}
		}
	}
</style>
