<script>
	import { ROUTES } from '$docs/config';
	import { Button } from '$docs/ui/button';
</script>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1 class="font-mono text-4xl font-black lg:text-5xl">&lt;StorageList&gt;</h1>
		<h2 class="text-3xl xl:text-4xl">Props</h2>
		<ul class="flex max-w-prose flex-col gap-4">
			<li>
				<code>storage?: FirebaseStorage</code> - The firebase storage instance, optional if you put
				the <Button
					variant="link"
					href={ROUTES.appComponentsFirebase}
					class="h-auto p-0 text-base text-accent">&lt;FirebaseApp&gt;</Button
				> component at the root of your app, or higher than where you're using this component.
			</li>
			<li>
				<code>ref: string | StorageReference&lt;Data&gt;</code> - The node reference to create the
				store from. Can be a string, just like <code>posts/123</code> or a
				<code>StorageReference</code>.
			</li>
		</ul>
		<h2 class="text-3xl xl:text-4xl">Slots & Props</h2>
		<div class="flex flex-col gap-4">
			<h3 class="font-mono text-2xl font-bold lg:text-3xl">default</h3>
			<p class="max-w-prose">The default slot is rendered when data is found.</p>
			<ul class="flex max-w-prose flex-col gap-2">
				<li>
					<code>list: ListResult</code> - The link to the file.
				</li>
				<li>
					<code>ref: StorageReference&lt;Data&gt; | null</code> - The storage reference you gave.
				</li>
				<li>
					<code>storage: FirebaseStorage</code> - The firebase storage instance.
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
