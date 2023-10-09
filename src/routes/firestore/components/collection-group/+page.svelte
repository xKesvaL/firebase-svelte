<script>
	import { ROUTES } from '$docs/config';
	import { Button } from '$docs/ui/button';

	const title = `Collection Group Component | Firebase Svelte`;
	const description = `The <CollectionGroup> component is a component that renders different content depending on the data in a collection group and gives you access to the collection group reference.`;
	const url = `https://firebase-svelte.vercel.app/firestore/components/collection-group`;
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
		<h1 id="collection-group" class="font-mono text-4xl font-black lg:text-5xl">
			&lt;CollectionGroup&gt;
		</h1>
		<h2 id="props" class="text-3xl xl:text-4xl">Props</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>firestore?: Firestore</code> - The firebase firestore instance, optional if you put
				the <Button
					variant="link"
					href={ROUTES.appComponentsFirebase}
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this component.
			</li>
			<li>
				<code>ref: string | Query</code> - The collection reference to create the store from. Can be
				a string, just like <code>posts</code> or a
				<code>CollectionReference</code>
				object, using the <code>collection</code> firebase function.
			</li>
			<li>
				<code>startValue?: Data[]</code> - The initial value of the store. This is useful if you want
				to avoid a loading state. The `Data` type is inferred from what data you give it and used for
				the CollectionReference too.
			</li>
			<li>
				<code>log: boolean = false</code> - If true, the store will log additional information to the
				console.
			</li>
			<li>
				<code>once: boolean = false</code> - If true, the store will only fetch the data once, and will
				not update when the data changes.
			</li>
			<li>
				<code>refField: string</code> - The field to use for the reference.
			</li>
		</ul>
		<h2 id="slot-props" class="text-3xl xl:text-4xl">Slots & Props</h2>
		<div class="flex flex-col gap-4">
			<h3 id="slot-default" class="font-mono text-2xl font-bold lg:text-3xl">default</h3>
			<p class="max-w-prose">The default slot is rendered when data is found.</p>
			<ul class="flex max-w-prose flex-col gap-2">
				<li>
					<code>data: Data[]</code> - The data object from firestore.
				</li>
				<li>
					<code>ref: Query | null</code> - The collection reference you gave.
				</li>
				<li>
					<code>count: number</code> - The number of documents in the collection.
				</li>
				<li>
					<code>error: Error | null</code> - Error if any.
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-4">
			<h3 id="slot-loading" class="font-mono text-2xl font-bold lg:text-3xl">loading</h3>
			<p class="max-w-prose">The loading slot. This is rendered while the data is fetching.</p>
		</div>
		<div class="flex flex-col gap-4">
			<h3 id="slot-fallback" class="font-mono text-2xl font-bold lg:text-3xl">fallback</h3>
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
