<script lang="ts">
	import { auth, firestore } from '$docs/test/firebase';
	import { Button } from '$docs/ui/button/index.svelte';
	import {
		createDocStore,
		createCollectionStore,
		createUserStore,
		createNodeStore,
		RemoteConfig,
		RemoteConfigBoolean,
		RemoteConfigNumber,
		RemoteConfigString,
		RemoteConfigValue,
		DownloadUrl,
		UserState,
		DocState,
		CollectionState,
		NodeState,
	} from '$lib';

	import { signInAnonymously } from 'firebase/auth';

	interface Post {
		id: string;
		title: string;
		desc?: string;
	}

	const userState = new UserState(); // or createUserStore(auth)
	const node = new NodeState(null, 'messages/123'); // or createNodeStore(null, 'messages/123');
	const docStore = new DocState<Post>(null, 'posts/123'); // or createDocStore<Post>(null, 'posts/123');
	const colStore = new CollectionState<Post>(null, 'posts'); // or createCollectionStore<Post>(null, 'posts');
</script>

<section class="container flex flex-col gap-8">
	{#if userState.user}
		hi {userState.user?.uid}
		<Button onclick={() => userState.signOut()}>Log out</Button>
	{:else if userState.loading === true}
		loading...
	{:else}
		<div>
			<Button onclick={() => signInAnonymously(auth)}>Sign In</Button>
		</div>
	{/if}

	<div>
		{#if docStore.doc === undefined}
			loading...
		{:else}
			<h1 class="text-lg">
				{docStore.doc?.title}
			</h1>
			{docStore.doc?.desc || 'no desc'}
		{/if}
	</div>

	<div class="flex gap-4">
		<Button onclick={() => docStore.set({ id: docStore.doc?.id || '123', title: 'My Post' })}
			>Title = My Post</Button
		>
		<Button onclick={() => docStore.update({ title: 'hello world', desc: 'hehe description' })}
			>Title = Hello World, + Desc</Button
		>
	</div>
	<div>
		<h2>Post list</h2>
		{#if colStore.collection === undefined || colStore.collection === null}
			loading...
		{:else}
			{#each colStore.collection as post}
				<div>
					<h3>
						{post.title}
					</h3>
					{post.desc || 'no desc'}
				</div>
				<Button onclick={() => colStore.remove(post.id)}>Remove this</Button>
			{/each}
		{/if}
	</div>

	<Button
		onclick={() => {
			const id = Math.random().toString(36);
			colStore.add(id, {
				id,
				title: `Hey new post ${id}`,
				desc: 'yooo',
			});
		}}>New Post</Button
	>

	<div>
		<h2>Node</h2>
		{#if node.node === undefined}
			loading...
		{:else}
			{JSON.stringify(node.node)}
		{/if}
	</div>

	<div class="flex gap-4">
		<Button
			onclick={() => {
				node.set({});
			}}
		>
			Remove message
		</Button>
		<Button
			onclick={() => {
				node.set({
					id: '123',
					message: 'hey',
				});
			}}
		>
			Add message
		</Button>
	</div>

	<h2>Remote Config</h2>
	<RemoteConfig let:remoteConfig>
		{#if remoteConfig}
			<div>
				<RemoteConfigBoolean {remoteConfig} key="testBool" let:value>
					{value}
				</RemoteConfigBoolean>
			</div>
			<div>
				<RemoteConfigNumber {remoteConfig} key="testNum" let:value>
					{value}
				</RemoteConfigNumber>
			</div>
			<div>
				<RemoteConfigString {remoteConfig} key="testStr" let:value>
					{value}
				</RemoteConfigString>
			</div>
			<div>
				<RemoteConfigValue {remoteConfig} key="testVal" let:value>
					{JSON.stringify(value)}
				</RemoteConfigValue>
			</div>
		{/if}
	</RemoteConfig>

	<DownloadUrl ref="wow.png" let:link>
		{link}
		<img src={link} alt="a wow emoji face" />
	</DownloadUrl>
</section>
