<script>
	import Code from '$docs/components/Code.svelte';
	import { Button } from '$docs/ui/button';
</script>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1 class="font-mono text-4xl font-black lg:text-5xl">createDocStore()</h1>
		<p class="max-w-prose">
			<code>createDocStore&lt;T&gt;(firestore, ref, options)</code> creates a store based on a document
			reference. The store will update when the document changes.
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
				<code>ref: string | DocumentReference</code> - The document reference to create the store
				from. Can be a string, just like <code>posts/123</code> or a <code>DocumentReference</code>
				object, using the <code>doc</code> firebase function.
			</li>
			<li>
				<code>options: DocStoreOptions&lt;T&gt;</code> - Options for the store.
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Properties</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>subscribe: (val: T) => void;</code> - Subscribe method for the Svelte store. Allows for
				the `$store` syntax.
			</li>
			<li>
				<code>ref: DocumentReference</code> - The document reference used to create the store.
			</li>
			<li>
				<code>id: string</code> - The document id
			</li>
			<li>
				<code>loading: boolean</code> - If the document is loading (undefined)
			</li>
			<li>
				<code>error: Error | null</code> - Error if any
			</li>
			<li>
				<code>set: (val: T) => Promise&lt;void&gt;</code>
			</li>
			<li>
				<code>update: (val: Promise&lt;T&gt;) => Promise&lt;void&gt;</code>
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Types</h2>
		<Code language="javascript" filename="">
			{`interface DocStoreOptions<T> {
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
