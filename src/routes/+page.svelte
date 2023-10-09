<script lang="ts">
	import HomeHero from '$docs/containers/home/HomeHero.svelte';

	const title = `Firebase Svelte`;
	const description = `Firebase Svelte is a collection of open-source Firebase integrations for Svelte, using stores for maximum reactivity.`;
	const url = `https://firebase-svelte.vercel.app/`;
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

<HomeHero />
