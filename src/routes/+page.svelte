<script lang="ts">
	import { firestore, auth, realtimeDB } from './firebase.js';
	import { signInAnonymously } from 'firebase/auth';
	import { FireCollection, FireDoc, User, FirebaseApp } from '$lib';
	import { addDoc, collection, orderBy, query } from 'firebase/firestore';

	async function addPost(uid: string) {
		const posts = collection(firestore, `users/${uid}/posts`);
		await addDoc(posts as never, {
			content: (Math.random() + 1).toString(36).substring(7),
			created: Date.now()
		});
	}

	$: makeQuery = (uid: string) => {
		return query(collection(firestore, `users/${uid}/posts`), orderBy('created', 'desc'));
	};
</script>

<FirebaseApp {auth} {firestore} {realtimeDB}>
	<FireDoc ref="posts/test" startValue={{ content: 'sup' }} let:data={post}>
		{#if post}
			<p>{post.content}</p>
		{/if}
		<div slot="loading">
			<p>Loading...</p>
		</div>
	</FireDoc>

	<User let:user>
		<p>Hello {user?.uid}</p>

		<FireDoc ref="posts/test" let:data={post}>
			{#if post}
				<p>{post.content}</p>
			{/if}
			<div slot="loading">
				<p>Loading...</p>
			</div>
		</FireDoc>

		<h1>Your Posts</h1>

		<FireCollection ref={makeQuery(user.uid)} startValue={[]} let:data={posts} let:count>
			<p>You've made {count} posts</p>

			{#if posts}
				<ul>
					{#each posts as post (post.id)}
						<li>{post.content} ... {post.id}</li>
					{/each}
				</ul>
			{/if}

			<button on:click={() => addPost(user.uid)}>Add Post</button>
		</FireCollection>

		<div slot="signedOut">
			<p>Sign in to do stuff</p>
			<button on:click={() => signInAnonymously(auth)}>Sign in</button>
		</div>

		<div slot="loading">The auth is loading...</div>
	</User>
</FirebaseApp>
