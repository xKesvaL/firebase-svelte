# Firebase-Svelte

Use the power of Svelte stores with Firebase in a Component-based way. Here's how:

_Maintained version of [SvelteFire](https://github.com/codediodeio/sveltefire). Since [SvelteFire](https://github.com/codediodeio/sveltefire) is rarely updated and has no support for realtimeDB nor answers any issues, I have decided to create this library and add features such as support for Realtime Database._

## Example

`+page.svelte`

```sveltehtml
<script lang="ts">
  import { FirebaseApp, User, FireDoc, FireCollection, Realtime } from 'firebase-svelte';
  import { auth, firestore, realtimeDB } from './firebase.ts';
</script>

<!-- 1. 🔥 Firebase App -->
<FirebaseApp {auth} {firestore} {realtimeDB}>

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

      <!-- 5. ❤️ Get the likes of the post with realtimeDB -->
      <Realtime ref={postRef.path + '/likes'} let:data={likes}>
        ️{likes.length} ❤️
      </Realtime>
    </FireDoc>

  </User>
</FirebaseApp>
```
