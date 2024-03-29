<script>
	import { ROUTES } from '$docs/config';
	import { Button } from '$docs/ui/button';

	const title = `User Component | Firebase Svelte`;
	const description = `The <User> component is a component that renders different content depending on the user's auth state and gives you access to the user object.`;
	const url = `https://firebase-svelte.vercel.app/auth/components/user`;
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
		<h1 id="user" class="font-mono text-4xl font-black lg:text-5xl">&lt;User&gt;</h1>
		<h2 id="props" class="text-3xl xl:text-4xl">Props</h2>
		<ul class="max-w-prose">
			<li>
				<code>auth?</code> - The firebase auth instance, optional if you put the <Button
					variant="link"
					href={ROUTES.appComponentsFirebase}
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this component.
			</li>
		</ul>
		<h2 id="slot-props" class="text-3xl xl:text-4xl">Slots & Props</h2>
		<div class="flex flex-col gap-4">
			<h3 id="slot-default" class="font-mono text-2xl font-bold lg:text-3xl">default</h3>
			<p class="max-w-prose">The default slot is rendered when the user is signed in.</p>
			<ul class="flex max-w-prose flex-col gap-2">
				<li>
					<code>user: User</code> - The user object from firebase auth.
				</li>
				<li>
					<code>signOut: () => Promise&lt;void&gt;</code> - The user object from firebase auth.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-4">
			<h3 id="slot-loading" class="font-mono text-2xl font-bold lg:text-3xl">loading</h3>
			<p class="max-w-prose">The loading slot.</p>
		</div>
		<div class="flex flex-col gap-4">
			<h3 id="slot-signed-out" class="font-mono text-2xl font-bold lg:text-3xl">signedOut</h3>
			<p class="max-w-prose">The signedOut slot is rendered when the user is signed out.</p>
			<ul class="flex max-w-prose flex-col gap-2">
				<li>
					<code>auth: Auth</code> - The firebase auth instance. This is passed in as a prop, so you can
					use it to sign in the user.
				</li>
			</ul>
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
