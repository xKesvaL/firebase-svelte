<script>
	import { Button } from '$docs/ui/button';

	const title = `Upload Task Store | Firebase Svelte`;
	const description = `createUploadTaskStore(storage, ref, data, metadata) creates a store that will upload a file to a reference.`;
	const url = `https://firebase-svelte.vercel.app/storage/stores/upload-task`;
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
		<h1 class="font-mono text-4xl font-black lg:text-5xl">createUploadTaskStore()</h1>
		<p class="max-w-prose">
			<code>createUploadTaskStore(storage, ref, data, metadata)</code> creates a store that will upload
			a file to a reference.
		</p>
		<h2 class="text-3xl lg:text-4xl">Parameters</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>storage: FirebaseStorage</code> - The firebase storage instance. If you put the <Button
					variant="link"
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this store, you can use
				<code>null</code> or <code>undefined</code> as the parameter and the store will retrieve the
				database instance from the context.
			</li>
			<li>
				<code>ref: string | StorageReference</code> - The storage reference to the file list.
			</li>
			<li>
				<code> data: Blob | Uint8Array | ArrayBuffer </code>
			</li>
			<li>
				<code>metadata?: UploadMetadata</code> - Options for the store.
			</li>
		</ul>
		<h2 class="text-3xl lg:text-4xl">Properties</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>subscribe: ((val: string | null) => void)) => void</code> - Subscribe method for the Svelte
				store. Allows for the `$store` syntax.
			</li>
			<li>
				<code>ref: StorageReference</code> - The storage reference to the file you want to upload to.
			</li>
			<li>
				<code>loading: boolean</code> - When the upload task is loading. (Not when it's uploading!)
			</li>
			<li>
				<code>error: Error | null</code> - Error if any.
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
