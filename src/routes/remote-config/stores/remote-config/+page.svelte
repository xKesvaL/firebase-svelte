<script>
	import { Button } from '$docs/ui/button';

	const title = `Remote Config Store | Firebase Svelte`;
	const description = `The createRemoteConfigStore() function creates a store that contains the current remote config instance.`;
	const url = `https://firebase-svelte.vercel.app/remote-config/stores/remote-config`;
	const image = ``;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<meta name="description" content={description} />
	<meta name="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<meta name="og:url" content={url} />
	<meta name="twitter:url" content={url} />

	<meta name="og:image" content={image} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1
			id="create-remote-config-activation-store"
			class="font-mono text-4xl font-black lg:text-5xl"
		>
			createRemoteConfigActivationStore()
		</h1>
		<p class="max-w-prose">
			<code>createRemoteConfigActivationStore&lt;T&gt;(remoteConfig)</code> creates a store that will
			activate the current remoteconfig instance. The store contains a boolean value that will be true
			if the remote config is activated, and false if it's not.
		</p>
		<h2 id="parameters" class="text-3xl lg:text-4xl">Parameters</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>remoteConfig: RemoteConfig</code> - The remote config instance. If you put the <Button
					variant="link"
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this store, you can use
				<code>null</code> or <code>undefined</code> as the parameter and the store will retrieve the
				database instance from the context.
			</li>
		</ul>
		<h2 id="properties" class="text-3xl lg:text-4xl">Properties</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>subscribe: ((val: boolean) => void)) => void;</code> - Subscribe method for the Svelte
				store. Allows for the `$store` syntax.
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
