<script lang="ts">
	import { auth } from '$docs/test/firebase';
	import { Button } from '$docs/ui/button';
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
		DownloadUrl
	} from '$lib';

	import { signInAnonymously } from 'firebase/auth';

	interface Post {
		id: string;
		title: string;
		desc?: string;
	}

	const user = createUserStore();
	const node = createNodeStore(null, 'messages/123');
	const docStore = createDocStore<Post>(null, 'posts/123');
	const colStore = createCollectionStore<Post>(null, 'posts');
</script>

<section class="container flex flex-col gap-8">
	{#if $user}
		hi {$user?.uid}
		<Button on:click={() => user.signOut()}>Log out</Button>
	{:else if $user === undefined}
		loading...
	{:else if $user === null}
		<div>
			<Button on:click={() => signInAnonymously(auth)}>Sign In</Button>
		</div>
	{/if}

	<div>
		{#if $docStore === undefined}
			loading...
		{:else}
			<h1 class="text-lg">
				{$docStore?.title}
			</h1>
			{$docStore?.desc || 'no desc'}
		{/if}
	</div>

	<div class="flex gap-4">
		<Button on:click={() => docStore.set({ id: $docStore?.id || '123', title: 'My Post' })}
			>Title = My Post</Button
		>
		<Button on:click={() => docStore.update({ title: 'hello world', desc: 'hehe description' })}
			>Title = Hello World, + Desc</Button
		>
	</div>
	<div>
		<h2>Post list</h2>
		{#if $colStore === undefined}
			loading...
		{:else}
			{#each $colStore as post}
				<div>
					<h3>
						{post.title}
					</h3>
					{post.desc || 'no desc'}
				</div>
				<Button on:click={() => colStore.remove(post.id)}>Remove this</Button>
			{/each}
		{/if}
	</div>

	<Button
		on:click={() => {
			const id = Math.random().toString(36);
			colStore.add(id, {
				id,
				title: `Hey new post ${id}`,
				desc: 'yooo'
			});
		}}>New Post</Button
	>

	<div>
		<h2>Node</h2>
		{#if $node === undefined}
			loading...
		{:else}
			{JSON.stringify($node)}
		{/if}
	</div>

	<div class="flex gap-4">
		<Button
			on:click={() => {
				node.set(null);
			}}
		>
			Remove message
		</Button>
		<Button
			on:click={() => {
				node.set({
					id: '123',
					message: 'hey'
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
