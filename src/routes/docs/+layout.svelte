<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from './Sidebar.svelte';

	export let data: LayoutData;

	const { docs } = data;

	console.log(docs);
</script>

<Sidebar />

<slot />
