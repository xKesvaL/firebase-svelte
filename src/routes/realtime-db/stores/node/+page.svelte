<script>
	import Code from '$docs/components/Code.svelte';
	import { Button } from '$docs/ui/button';

	const title = `Node Store | Firebase Svelte`;
	const description = `The node store is a store that holds the data of a node.`;
	const url = `https://firebase-svelte.vercel.app/realtime-db/stores/node`;
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
		<h1 class="font-mono text-4xl font-black lg:text-5xl">createNodeStore()</h1>
		<p class="max-w-prose">
			<code>createNodeStore&lt;T&gt;(realtimeDb, ref, options)</code> creates a store based on a node
			reference. The store will update when the node changes.
		</p>
		<h2 class="text-3xl lg:text-4xl">Parameters</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>rtdb: Database</code> - The realtime database instance. If you put the <Button
					variant="link"
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this store, you can use
				<code>null</code> or <code>undefined</code> as the parameter and the store will retrieve the
				database instance from the context.
			</li>
			<li>
				<code>ref: string | DatabaseReference</code> - The database node reference to create the
				store from. Can be a string, just like <code>posts/123</code> or a
				<code>DatabaseReference</code>
				object, using the <code>ref</code> database function.
			</li>
			<li>
				<code>options?: NodeStoreOptions&lt;T&gt;</code> - Options for the store.
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Properties</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>subscribe: ((val: T) => void)) => void;</code> - Subscribe method for the Svelte store.
				Allows for the `$store` syntax.
			</li>
			<li>
				<code>ref: DatabaseReference</code> - The node reference used to create the store.
			</li>
			<li>
				<code>key: string</code> - The node key
			</li>
			<li>
				<code>loading: boolean</code> - If the node is loading (undefined)
			</li>
			<li>
				<code>error: Error | null</code> - Error if any
			</li>
			<li>
				<code>set: (val: T) => Promise&lt;void&gt;</code>
			</li>
			<li>
				<code>update: (val: T) => Promise&lt;void&gt;</code>
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Types</h2>
		<Code language="javascript" filename="">
			{`interface NodeStoreOptions<T> {
  log?: boolean;
  once?: boolean;
  startValue?: T;
}`}
		</Code>
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
