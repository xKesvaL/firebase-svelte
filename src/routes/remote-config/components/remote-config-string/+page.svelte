<script>
	import { ROUTES } from '$docs/config';
	import { Button } from '$docs/ui/button';

	const title = `Remote Config String Component | Firebase Svelte`;
	const description = `The <RemoteConfigString> component is a component that renders different content depending on the data in a remote config string value and gives you access to the remote config instance.`;
	const url = `https://firebase-svelte.vercel.app/remote-config/components/remote-config-string`;
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
		<h1 class="font-mono text-4xl font-black lg:text-5xl">&lt;RemoteConfigString&gt;</h1>
		<h2 class="text-3xl xl:text-4xl">Props</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>remoteConfig?: RemoteConfig</code> - The remote config instance, optional if you put
				the <Button
					variant="link"
					href={ROUTES.appComponentsFirebase}
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this component.
			</li>
			<li>
				<code>key: string</code> - The key of the remote config string value.
			</li>
		</ul>
		<h2 class="text-3xl xl:text-4xl">Slots & Props</h2>
		<div class="flex flex-col gap-4">
			<h3 class="font-mono text-2xl font-bold lg:text-3xl">default</h3>
			<p class="max-w-prose">The default slot is rendered when data is found.</p>
			<ul class="flex max-w-prose flex-col gap-2">
				<li>
					<code>value: string</code> - The remote config string value.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-4">
			<h3 class="font-mono text-2xl font-bold lg:text-3xl">loading</h3>
			<p class="max-w-prose">The loading slot. This is rendered while the data is fetching.</p>
		</div>
		<div class="flex flex-col gap-4">
			<h3 class="font-mono text-2xl font-bold lg:text-3xl">fallback</h3>
			<p class="max-w-prose">The fallback slot. This is rendered when the data is not found.</p>
		</div>
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
