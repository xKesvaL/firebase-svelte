<script>
	import Code from '$docs/components/Code.svelte';
	import { Button } from '$docs/ui/button';

	const title = `Get Started | Firebase Svelte`;
	const description = `Get started with Firebase Svelte.`;
	const url = `https://firebase-svelte.vercel.app/guides/get-started`;
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
	<div class="container flex flex-col gap-4 py-8 lg:py-16 xl:py-24">
		<h1 class="text-5xl lg:text-6xl">⭐ Get Started</h1>
		<p class="max-w-prose">
			This example works in both Svelte and SvelteKit, but we recommend you to use SvelteKit as it
			can be used just like svelte, with more functionnalities.
		</p>
		<ol class="py-4">
			<li>
				<h2 class="text-3xl">1. Install</h2>
				<p class="max-w-prose">Install the package from npm:</p>
				<Code filename="" language="bash">npm install firebase-svelte firebase</Code>
			</li>
			<li>
				<h2 class="text-3xl">2. Initialize</h2>
				<p class="max-w-prose">
					Initalize firebase using your config and add the <code>`&lt;FirebaseApp&gt;`</code>
					component somewhere in your project, typically in the <code>`+layout.svelte`</code> file to
					use Firebase everywhere.
				</p>
				<p class="max-w-prose">
					Keep in mind that if you, for example, only provide the <code>`auth`</code> prop, you will
					only be able to use the auth components. <Button
						variant="link"
						class="h-auto p-0 text-base text-accent">Here</Button
					> is a list of all the available props of the `&lt;FirebaseApp&gt;` component.
				</p>
				<Code filename="+layout.svelte" language="html">
					<pre>
&lt;script lang="ts"&gt;
  import &lbrace; FirebaseApp &rbrace; from 'firebase-svelte';
  import &lbrace; initializeApp &rbrace; from 'firebase/app';
  import &lbrace; getFirestore &rbrace; from 'firebase/firestore';
  import &lbrace; getAuth &rbrace; from 'firebase/auth';

  // Initialize Firebase
  const app = initializeApp(/* Firebase Config */)
  const auth = getAuth(app);
  const firestore = getFirestore(app);
&lt;/script&gt;

&lt;FirebaseApp &lbrace;auth&rbrace; &lbrace;firestore&rbrace;&gt;
  &lt;slot /&gt;
&lt;/FirebaseApp&gt;
          </pre>
				</Code>
			</li>
			<li>
				<h2 class="text-3xl">3. Use as much as you want</h2>
				<p class="max-w-prose">Now you can use any component you want, for example :</p>
				<Code filename="+page.svelte" language="html">
					<pre>
&lt;script&gt;
  import &lbrace; Collection, Doc, User &rbrace; from 'firebase-svelte';
  import &lbrace; firestore, auth &rbrace; from '$lib/firebase';
&lt;/script&gt;


&lt;!-- 1. 🧑‍🤝‍🧑 User --&gt;
&lt;User let:user&gt
  
  &lt;p&gtHello, &lbrace;user.displayName&rbrace;&lt;/p&gt

  &lt;!-- 2. 📄 Document, for example owned by a user --&gt;
  &lt;Doc 
	  ref=&lbrace;`posts/$&lbrace;user.uid&rbrace;`&rbrace; 
	  let:data=&lbrace;post&rbrace; 
	  let:ref=&lbrace;postRef&rbrace;
  &gt

  &lt;h2&gt&lbrace;post.title&rbrace;&lt;/h2&gt

    &lt;!-- 3. 📚 Collection, 
    for example comments on a post --&gt;
    &lt;Collection 
      ref=&lbrace;`$&lbrace;postRef.path&rbrace;/comments`&rbrace; 
      let:data=&lbrace;comments&rbrace;
    &gt
      &lbrace;#each comments as comment&rbrace;
        &lt;p&gt;&lbrace;comment.content&rbrace;&lt;/p&gt
      &lbrace;/each&rbrace;
    &lt;/Collection&gt
  &lt;/Doc&gt
&lt;/User&gt
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
			gap: 4rem;

			li {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
			}
		}
	}
</style>
