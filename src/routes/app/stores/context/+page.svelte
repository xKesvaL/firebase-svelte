<script>
	import Code from '$docs/components/Code.svelte';
	import { Button } from '$docs/ui/button';
</script>

<section>
	<div class="container flex flex-col gap-8 py-8 lg:py-16 xl:py-24">
		<h1 class="text-4xl font-black lg:text-5xl xl:text-6xl">Firebase Context</h1>
		<p class="max-w-prose">
			There are some cases where you need to access the Firebase SDKs directly. For example, if you
			want to use any method from <code>firebase/auth</code> to log in your users. In this case, you
			can use the methods we provide.
		</p>
		<ul>
			<li>
				<h2 class="text-3xl lg:text-4xl">Why?</h2>
				<p class="max-w-prose">
					This might look weird to you because you would say: "Why can't I just import the Firebase
					SDKs I put in the <code>FirebaseApp</code> component?". You can, but this means you have
					to create a specific file to define your SDKs and then import them in
					<code>FirebaseApp</code> and everywhere else. The goal here is to avoid this and let you
					just define the SDKs once in the <code>FirebaseApp</code> component and then use them everywhere
					else with our methods that use the Svelte context API.
				</p>
			</li>
			<li>
				<h2 class="text-3xl lg:text-4xl">Methods</h2>
				<h3 class="mt-4 font-mono text-2xl font-black lg:text-3xl">getFirebaseContext()</h3>
				<p class="max-w-prose">
					<code
						>getFirebaseContext(sdks: <Button
							variant="link"
							class="h-auto p-0 text-base text-accent"
							href="#FirebaseSDKContext">FirebaseSDKContext</Button
						>)</code
					>
					is a method that returns the Firebase SDKs you defined in the <code>FirebaseApp</code> component.
					You can use it to access the SDKs directly.
				</p>
				<h3 class="mt-8 font-mono text-2xl font-black lg:text-3xl">updateFirebaseContext()</h3>
				<p class="max-w-prose">
					<code
						>updateFirebaseContext(sdks: <Button
							variant="link"
							class="h-auto p-0 text-base text-accent"
							href="#FirebaseSDKContext">FirebaseSDKContext</Button
						>)</code
					>
					is a method that updates the Firebase SDKs you defined in the <code>FirebaseApp</code> component
					without replacing the old ones. You can use it to define new SDKs directly.
				</p>
				<p class="flex max-w-prose rounded-md bg-destructive p-2">
					We do not recommend using this method nor updating the Firebase SDKs at all as it can lead
					to unexpected behavior.
				</p>
			</li>
			<li>
				<h2 class="text-3xl lg:text-4xl">Types</h2>
				<h3 class="font-mono text-2xl font-black lg:text-3xl" id="FirebaseSDKContext">
					FirebaseSDKContext
				</h3>
				<Code filename="" language="javascript">
					<pre>
interface FirebaseSDKContext &lbrace;
	auth?: Auth;
	firestore?: Firestore;
	rtdb?: Database;
	storage?: FirebaseStorage;
	remoteConfig?: RemoteConfig;
&rbrace;
					</pre>
				</Code>
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	section {
		background: radial-gradient(circle at 28% 37%, hsl(var(--primary-300) / 0.25), transparent 50%),
			radial-gradient(circle at 70% 66%, hsl(var(--secondary-300) / 0.25), transparent 50%);

		ul {
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
