# Firebase-Svelte

[![Version](https://img.shields.io/npm/v/firebase-svelte?style=for-the-badge)](https://www.npmjs.com/package/firebase-svelte) [![Issues](https://img.shields.io/github/issues/xKesvaL/firebase-svelte?style=for-the-badge)](https://github.com/xKesvaL/firebase-svelte/issues) [![License](https://img.shields.io/github/license/xKesvaL/firebase-svelte?style=for-the-badge)](https://github.com/xKesvaL/firebase-svelte/blob/main/LICENSE)

Use the power of Svelte stores with Firebase in a Component-based way. Here's how:

_Maintained version of [SvelteFire](https://github.com/codediodeio/sveltefire). Since [SvelteFire](https://github.com/codediodeio/sveltefire) is rarely updated and has no support for realtime nor answers any issues, I have decided to create this library and add features such as support for Realtime Database._

<!-- TOC -->

- [Firebase-Svelte](#firebase-svelte)
  - [Example](#example)
  - [Why ?](#why-)
  - [Quick start](#quick-start)
  - [Components](#components)
  - [Stores](#stores)
  - [Performance](#performance)
  <!-- TOC -->

## Example

`+page.svelte`

```svelte
<script lang="ts">
	import { FirebaseApp, User, FireDoc, FireCollection, Realtime } from 'firebase-svelte';
	import { auth, firestore, realtime } from './firebase.ts';
</script>

<!-- 1. 🔥 Firebase App -->
<FirebaseApp {auth} {firestore} {realtime}>
	<!-- 2. 👤 Get the current user -->
	<User let:user>
		<h1>Welcome, {user.displayName}!</h1>

		<!-- 3. 📜 Get a Firestore document owned by a user -->
		<FireDoc ref={`posts/${user.uid}`} let:data={post} let:ref={postRef}>
			<h2>{post.title}</h2>

			<!-- 4. 💬 Get all the comments in its sub-collection -->
			<FireCollection ref={postRef.path + '/comments'} let:data={comments}>
				{#each comments as comment}
					<p>{comment}</p>
				{/each}
			</FireCollection>

			<!-- 5. ❤️ Get the likes of the post with realtime -->
			<Realtime ref={postRef.path + '/likes'} let:data={likes}>
				️{likes} ❤️
			</Realtime>
		</FireDoc>
	</User>
</FirebaseApp>
```

## Why ?

Firebase is a great tool for building apps with real-time data, and without having to buy a server. This library solves these problems:

- Accessing user data, Firestore documents and Realtime Database data as Svelte stores
- Using Firebase in a component-based way
- Automatically unsubscribing from Firebase listeners when the component is destroyed to avoid memory leaks
- Using Firebase in a TypeScript project
- Hydrating SvelteKit server data into a realtime Firebase stream

[//]: # 'TODO: Create documentation and add a link to it here'

## Quick start

1. Install the library

> ```bash
> npm install firebase-svelte
> ```

2. Initialize Firebase in your app

> `lib/firebase.js`
>
> ```js
> import { initializeApp } from 'firebase/app';
> import { getFirestore } from 'firebase/firestore';
> import { getAuth } from 'firebase/auth';
> import { getDatabase } from 'firebase/database';
>
> // Initialize Firebase
> const app = initializeApp(/* your firebase config */);
> export const auth = getAuth(app);
> export const db = getFirestore(app); // Optional
> export const realtime = getDatabase(app); // Optional
> ```

3. Choose a way to use Firebase : Component-based or Store-based

> `store-based` [See here](#stores)
>
> ```svelte
> <script lang="ts">
> 	import { auth } from '$lib/firebase';
> 	import { userStore } from 'firebase-svelte';
> 	const user = userStore(auth);
> </script>
>
> Hi {$user?.displayName}!
> ```

> `component-based` [See here](#components)
>
> ```svelte
> <script lang="ts">
> 	import { auth } from '$lib/firebase';
> 	import { User } from 'firebase-svelte';
> </script>
>
> <User {auth} let:user>
> 	Hi {user.displayName}!
> 	<!-- Use {user} anywhere here -->
> </User>
> ```

4. Enjoy!

## Components
Firebase-Svelte provides a set of components that can build complex realtime apps without leaving the HTML, and making it very readable.

### FirebaseApp
While this component is optional, we recommend to use it. It will initialize the firebase app and make it available to all its children components, so you don't have to pass any firebase object to them.

```svelte
<script>
    import { auth, firestore, realtime } from './firebase.ts';
    import { FirebaseApp } from 'firebase-svelte';
</script>

<FirebaseApp {auth} {firestore} {realtime}>
    <!-- All the children components will have access to the firebase app -->
    <User let:user>
        <h1>Welcome, {user.displayName}!</h1>
    </User>
    <!-- This works for all components -->
</FirebaseApp>
```

### User
This gets the current user (`user`) context. It has a signed out and a loading slot. 
```svelte
<User let:user>
    Hi {user.displayName}
    
    <div slot="signedOut">
        You are signed out. Sign in...
    </div>
    
    <div slot="loading">
        Loading...
    </div>
</User>
```

### FireDoc
This component gets a Firestore document data (`data`) and its reference (`ref`). It has a loading slot, and you can provide it a startValue to avoid the loading state and start with some data.

```svelte
<FireDoc ref="posts/test" startValue={{content: "Hi!"}} let:data={post}>
    <!-- We renamed data to post up here -->
    {post.content} <!-- Will show "Hi!" instead of loading -->
    
    <!-- Will show this if there is not startValue -->
    <div slot="loading">
        Loading...
    </div>
</FireDoc>
```

### FireCollection
Collection are arrays of objects containing documents. FireCollections give the document data (`data`), collection reference (`ref`) and the document count (`count`). The document inside have data as well as an id and a reference. It has a loading slot, and you can provide it a startValue to avoid the loading state and start with some data.

```svelte
<FireCollection ref="posts" let:data let:count>
    Fetched {count} documents
    {#each data as post}
        {post.id}
        {post.ref.path}
        {post.content}
    {/each}
</FireCollection>
```

FireCollections can also take a query instead of a path. This query can be a simple one or a reactive ($-prefixed) one. It will automatically update the data when the query changes.
This can be useful for plenty of things, such as a search bar, or getting the posts of a user when he logs in without having to reload the page:

```svelte
<script>
    $: buildQuery = (userId) => {
        return query(collection(firestore, 'posts'), where('uid', '==', userId))
    }
</script>

<User>
    <FireCollection ref={buildQuery()} let:data let:count>
        {#each data as post}
            {post.content}
        {/each}
    </FireCollection>
</User>
```

### FireCollectionGroup
These are the same as FireCollections, but for collection groups.

### Realtime
This component gets a realtime database reference (`ref`) and its data (`data`). It has a loading slot, and you can provide it a startValue to avoid the loading state and start with some data.
Realtime Database is faster and simpler than Firestore, but it doesn't have the same features. It is a good choice for simple data that needs to be updated in realtime, such as likes, views, etc.

```svelte
<Realtime ref={"posts/{user.uid}/likes"} startValue={0} let:data={likes}>
    {likes} ❤️
</Realtime>
```

### All together

```svelte
<FirebaseApp {auth} {firestore} {realtime}>
  <User let:user>
      <p>UID: {user.uid}</p>

      <h3>Profile</h3>
      <FireDoc ref={`posts/${user.uid}`} let:data={profile} let:ref={profileRef}>

        {profile.content}

        <h4>Comments</h4>
        <FireCollection ref={profileRef.path + '/comments'} let:data={comments}>
          {#each comments as comment}
            <strong>{comment.content}</strong>
          {/each}

          <div slot="loading">Loading Comments...</div>
        </FireCollection>
        
        <h4>Views</h4>
        <Realtime ref={`posts/${user.uid}/views`} startValue={0} let:data={views}>
          {views} views
        </Realtime>

        <div slot="loading">Loading Profile...</div>
      </FireDoc>

      <div slot="signedOut">Signed out</div>
  </User>
</FirebaseApp>
```

## Stores
Instead of components, you can use stores directly. (Which components use under the hood)

### User Store
This store gives you the current user and listens to changes.
/!\ User has 3 states: User, undefined and null. Undefined means that the auth is loading, null means that the user is signed out, and User means that the user is signed in.

```svelte
<script>
  import { userStore } from 'firebase-svelte';

  const user = userStore(auth);
</script>

{#if $user}
    <p>Hi {$user.uid}</p>
{:else if $user === undefined}
    <p>Loading</p>
{:else}
    <p>Sign in...</p>
{/if}
```

### Firestore Stores
Subscribe to realtime changes on a document or a collection. It will automatically unsubscribe when the store is destroyed.

```svelte
<script>
  import { fireDocStore, fireCollectionStore } from 'firebase-svelte';

  const post = fireDocStore(firestore, 'posts/test');

  // OR 

  const posts = fireCollectionStore(firestore, 'posts');
</script>

{$post?.content}

{#each $posts as p}

{/each}
```

You can use Types to with these stores!
```ts
interface Post {
    id: string;
    title: string;
    content: string;
}

const post = docStore<Post>(firestore, 'posts/test');
const posts = collectionStore<Post>(firestore, 'posts');
```

### Realtime Database Store
Same as Firestore stores, but for Realtime Database.

```svelte
<script>
  import { realtimeDataStore } from 'firebase-svelte';

  const likes = realtimeDataStore(realtime, 'posts/test/likes');
</script>

{$likes}
```

## Performance

When you subscribe to a store or a component, the library will automatically subscribe to the data path you gave it using the firebase sdk. That means, you can subscribe to a store as much as you want, and it will only result in one read request to firebase.
For example, in this code, there will only be one read request to firebase, even if you subscribe to the `post` store 3 times:

```svelte
<script>
	import { firestore } from '$lib/firebase';
	import { docStore } from 'firebase-svelte';

	const post = docStore(firestore, 'posts/test');
</script>

{$post?.content}
{$post?.title}
{$post?.author}
```

## Notes
- This library should run on the client, not on the server. It will still work with SSR (Server-Side Rendering), but it will only fetch the data on the client.
