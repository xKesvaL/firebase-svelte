<script>
	import Code from '$docs/components/Code.svelte';

	const title = `Firebase App Component | Firebase Svelte`;
	const description = `The <FirebaseApp> component is the root of your Firebase app. It provides the SDKs to all the other components without having to import them again.`;
	const url = `https://firebase-svelte.vercel.app/app/components/firebase-app`;
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
		<h1 class="font-mono text-4xl font-black lg:text-5xl xl:text-6xl" id="firebase-app">
			&lt;FirebaseApp&gt;
		</h1>
		<p class="max-w-prose">
			The <code>&lt;FirebaseApp&gt;</code> component is the root of your Firebase app. It provides the
			SDKs to all the other components without having to import them again.
		</p>
		<ol>
			<li>
				<h2 class="text-3xl lg:text-4xl" id="props">Props</h2>
				<ul>
					<li><code>auth?</code> <span>-</span> Firebase Auth Instance</li>
					<li><code>firestore?</code> <span>-</span> Firebase Firestore Instance</li>
					<li><code>realtimeDb?</code> <span>-</span> Firebase Realtime Database Instance</li>
					<li><code>remoteConfig?</code> <span>-</span> Firebase Remote Config Instance</li>
					<li><code>storage?</code> <span>-</span> Firebase Storage Instance</li>
				</ul>
			</li>
			<li>
				<h2 class="text-3xl lg:text-4xl" id="examples">Examples</h2>
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

				ul {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					padding-left: 1.25rem;
					position: relative;

					li {
						flex-direction: row;
						gap: 0.75rem;

						&::before {
							content: '•';
							left: 0;
							position: absolute;
						}
					}
				}
			}
		}
	}
</style>
