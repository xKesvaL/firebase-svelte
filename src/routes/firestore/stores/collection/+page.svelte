<script>
	import Code from '$docs/components/Code.svelte';
	import { Button } from '$docs/ui/button';
</script>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1 class="font-mono text-4xl font-black lg:text-5xl">createCollectionStore()</h1>
		<p class="max-w-prose">
			<code>createCollectionStore&lt;T&gt;(firestore, ref, queryConstraints, options)</code> creates
			a store based on a collection reference. The store will update when the collection changes.
		</p>
		<h2 class="text-3xl lg:text-4xl">Parameters</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>firestore: Firestore</code> - The firebase firestore instance. If you put the <Button
					variant="link"
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this store, you can use
				<code>null</code> or <code>undefined</code> as the parameter and the store will retrieve the
				firestore instance from the context.
			</li>
			<li>
				<code>ref: string | CollectionReference</code> - The collection reference to create the
				store from. Can be a string, just like <code>posts</code> or a
				<code>CollectionReference</code>
				object, using the <code>collection</code> firebase function.
			</li>
			<li>
				<code>queryConstraints: QueryConstraint[]</code> - An array of query constraints to apply to
				the collection.
			</li>
			<li>
				<code>options?: CollectionStoreOptions&lt;T&gt;</code> - Options for the store.
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Properties</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>subscribe: ((val: T) => void) => void;</code> - Subscribe method for the Svelte store.
				Allows for the `$store` syntax.
			</li>
			<li>
				<code>ref: CollectionReference</code> - The collection reference used to create the store.
			</li>
			<li>
				<code>id: string</code> - The collection id
			</li>
			<li>
				<code>loading: boolean</code> - If the collection is loading (undefined)
			</li>
			<li>
				<code>error: Error | null</code> - Error if any
			</li>
			<li>
				<code>meta: &lbrace; first: unknown, last: unknown &rbrace;</code> - Meta data about the
				collection. <code>first</code> and <code>last</code> are the first and last documents in the
				collection, respectively.
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Types</h2>
		<Code language="javascript" filename="">
			{`interface CollectionStoreOptions<T> {
  log?: boolean;
  once?: boolean;
  startValue?: T;
  refField?: string;
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
