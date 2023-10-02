<script lang="ts">
	import { Button } from '$docs/ui/button/index.js';
	import IconArrowRight from '$docs/icons/IconArrowRight.svelte';
	import IconCustomGithub from '$docs/icons/custom/IconCustomGithub.svelte';
	import { ROUTES } from '$docs/config';
	import Code from '$docs/components/Code.svelte';
</script>

<section>
	<div class="container flex h-full flex-col gap-8 py-8 xl:py-24">
		<div class="flex flex-col gap-8 xl:flex-row">
			<div>
				<h1 class="my-4 flex items-center gap-2 text-5xl md:gap-0 lg:text-6xl">
					<span class="block">🔥</span>
					Firebase Svelte
				</h1>
				<p class="mx-4 mb-4 max-w-[60ch]">
					Firebase Svelte is a collection of stores and components that make it easy to integrate
					realtime firebase services in your Svelte app. We currently support Auth, Firestore,
					Realtime DB, Remote Config and Storage.
				</p>
				<div class="mx-4 flex gap-4">
					<Button class="gap-2" href={ROUTES.guideGetstarted}>
						Get Started
						<div class="max-w-[24px]">
							<IconArrowRight />
						</div>
					</Button>
					<Button
						class="gap-2"
						variant="secondary"
						href="https://github.com/xKesvaL/firebase-svelte"
						target="_blank"
					>
						<div class="max-w-[24px]">
							<IconCustomGithub />
						</div>
						Github
					</Button>
				</div>
			</div>

			<Code filename="+page.svelte" language="html">
				<pre>
&lt;script&gt;
  import &lbrace; createUserStore &rbrace; from 'firebase-svelte';

  const user = createUserStore(/* Auth Instance */);
&lt;/script&gt;

&lt;h1&gt;Hello &lbrace;$user.displayName&rbrace;&lt;/h1&gt;
				</pre>
			</Code>
		</div>
		<div class="md:p-4">
			<h2 class="mb-4 text-3xl lg:text-4xl">Okay but why?</h2>
			<p class=" max-w-prose">
				Let's be honest. Firebase APIs can sometimes be annoying to work with with their callbacks
				and all, although they are very powerful. Firebase Svelte aims to help to :
			</p>
			<ul class="points my-6 flex flex-col gap-4 pl-8">
				<li style="--mrkr: '💽'">Access realtime data from Firebase using Svelte stores</li>
				<li style="--mrkr: '🔥'">Automatically disposing of data subscriptions</li>
				<li style="--mrkr: '❤️'">Enhance the typescript experience using firebase</li>
				<li style="--mrkr: '✅'">
					Provide easier ways of getting and showing data using components
				</li>
				<li style="--mrkr: '⚒️'">
					Have a maintained and up-to-date library of consistent firebase APIs
				</li>
			</ul>
		</div>
	</div>
</section>
<section class="border-t-[1px]">
	<div class="container flex h-full flex-col gap-8 py-8 xl:py-24">
		<div class="flex flex-col gap-4 md:p-4">
			<h2 class="text-3xl lg:text-4xl">Stores</h2>
			<p class="max-w-prose">
				Every store is reactive so it updates when the data changes, and it will unsubscribe when
				the component is unmounted.
			</p>
			<p class="max-w-prose">
				Some stores also have methods to update the data, like the <code>update</code> or
				<code>set</code> method on the <code>doc</code> store. These methods will not update the data
				in the store, which allows you to create optimistic updates.
			</p>
			<Code filename="+page.svelte" language="html">
				<pre>
&lt;script&gt;
  import &lbrace; createDocStore &rbrace; from 'firebase-svelte';
  import &lbrace; firestore &rbrace; from '$lib/firebase';

  const post = createDocStore(firestore, 'posts/123');

  function updatePost() &lbrace;
    post.update(&lbrace; title: 'New Title' &rbrace;);
  &rbrace;
&lt;/script&gt;

&lt;h1&gt;&lbrace;$post.title&rbrace;&lt;/h1&gt;

&lt;section class="prose"&gt;
  &lt;p&gt;&lbrace;$post.content&rbrace;&lt;/p&gt;
&lt;/section&gt;

&lt;button on:click=&lbrace;updatePost&rbrace;&gt;Update&lt;/button&gt;
				</pre>
			</Code>
		</div>
		<div class="flex flex-col gap-4 md:p-4">
			<h2 class="mb-4 text-3xl lg:text-4xl">Components</h2>
			<p class="max-w-prose">
				Altough components also use stores, they might be easier to use for some cases such as
				simply getting data from a collection or a document.
			</p>
			<p class="max-w-prose">
				Also, stacking components is a great way to make your app more modular and reusable, as the
				example below shows.
			</p>
			<Code filename="+page.svelte" language="html">
				<pre>
&lt;script&gt;
 import &lbrace; Collection, Doc, User &rbrace; from 'firebase-svelte';
 import &lbrace; firestore, auth &rbrace; from '$lib/firebase';
&lt;/script&gt;

&lt;!-- 1. 🔥 Firebase App --&gt;
&lt;FirebaseApp &lbrace;auth&rbrace; &lbrace;firestore&rbrace;&gt

 &lt;!-- 2. 🧑‍🤝‍🧑 User --&gt;
 &lt;User let:user&gt
    
 &lt;p&gtHello, &lbrace;user.displayName&rbrace;&lt;/p&gt

  &lt;!-- 3. 📄 Document, for example owned by a user --&gt;
  &lt;Doc 
    ref=&lbrace;`posts/$&lbrace;user.uid&rbrace;`&rbrace; 
    let:data=&lbrace;post&rbrace; 
    let:ref=&lbrace;postRef&rbrace;
  &gt

   &lt;h2&gt&lbrace;post.title&rbrace;&lt;/h2&gt

   &lt;!-- 4. 📚 Collection, 
	 for example comments on a post --&gt;
   &lt;Collection 
     ref=&lbrace;`$&lbrace;postRef.path&rbrace;/comments`&rbrace; 
     let:data=&lbrace;comments&rbrace;
   &gt
    &lbrace;#each comments as comment&rbrace;
     &lt;p&gt;&lbrace;comment.content&rbrace;&lt;/p&gt
    &lbrace;/each&rbrace;
				</pre>
			</Code>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		background: radial-gradient(circle at 28% 37%, hsl(var(--primary-300) / 0.25), transparent 50%),
			radial-gradient(circle at 70% 66%, hsl(var(--secondary-300) / 0.25), transparent 50%);

		.points {
			--mrkr: '🔥';

			li {
				padding-left: 1rem;
				position: relative;
				max-width: 60ch;

				&::before {
					content: var(--mrkr);
					position: absolute;
					left: -1rem;
				}
			}
		}
	}
</style>
