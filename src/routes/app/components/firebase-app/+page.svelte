<script>
	import Code from '$docs/components/Code.svelte';
</script>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1 class="font-mono text-4xl font-black lg:text-5xl xl:text-6xl">&lt;FirebaseApp&gt;</h1>
		<p class="max-w-prose">
			The <code>&lt;FirebaseApp&gt;</code> component is the root of your Firebase app. It provides the
			SDKs to all the other components without having to import them again.
		</p>
		<ol>
			<li>
				<h2 class="text-3xl lg:text-4xl">Examples</h2>
				<p class="max-w-prose">
					Here's an example of how to use the <code>&lt;FirebaseApp&gt;</code> component.
				</p>
				<Code language="html" filename="+layout.svelte">
					<pre>
&lt;script&gt;
  import &lbrace; FirebaseApp &rbrace; from 'firebase-svelte';
  // import only the ones you need
  import &lbrace; 
    auth,
    firestore,
    realtimeDb,
    remoteConfig,
    storage 
  &rbrace; from '$lib/firebase'; 
&lt;/script&gt;

&lt;FirebaseApp
  &lbrace;auth&rbrace;
  &lbrace;firestore&rbrace;
  &lbrace;realtimeDb&rbrace;
  &lbrace;remoteConfig&rbrace;
  &lbrace;storage&rbrace;
&gt;
  &lt;slot /&gt;
&lt;/FirebaseApp&gt;
          </pre>
				</Code>
			</li>
		</ol>
	</div>
</section>

<style lang="scss">
	section {
		background: radial-gradient(circle at 28% 37%, hsl(var(--primary-300) / 0.25), transparent 50%),
			radial-gradient(circle at 70% 66%, hsl(var(--secondary-300) / 0.25), transparent 50%);

		ol {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			li {
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}
		}
	}
</style>
