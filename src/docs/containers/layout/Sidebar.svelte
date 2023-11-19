<script lang="ts">
	import { PAGES } from '$docs/ROUTES';
	import { runes, sidebarShown } from '$docs/stores/sidebar.js';
	import { Button } from '$docs/ui/button/index.svelte';
	import { Separator } from '$docs/ui/separator/index.svelte.js';
	import { Switch } from '$docs/ui/switch/index.svelte';
</script>

<aside
	class="fixed {$sidebarShown
		? 'translate-x-0'
		: '-translate-x-full'} bottom-0 left-0 top-20 z-10 flex w-screen flex-shrink-0 flex-col overflow-y-scroll bg-card p-4 shadow-foreground/25 transition-transform lg:w-80 lg:translate-x-0 lg:shadow-xl"
	style="view-transition-name: sidebar;"
>
	<div class="sticky -top-4 -mt-4 flex items-center gap-4 bg-card py-4">
		<Switch bind:checked={$runes} />
		<span class="text-lg"> Svelte 5 ✨ Runes ✨ </span>
	</div>
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Guides</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.guides_get_started()}>Get Started</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">App</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.app_components_firebase_app()}>&lt;FirebaseApp&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.app_stores_context()}>Firebase Context</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Auth</h2>
		{#if $runes}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.auth_states_user()}>new UserState()</Button
			>
		{:else}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.auth_stores_user()}>createUserStore()</Button
			>
		{/if}
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.auth_components_user()}>&lt;User&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Firestore</h2>
		{#if $runes}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.firestore_stores_doc()}>new DocState()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.firestore_stores_collection()}>new CollectionState()</Button
			>
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.firestore_stores_collection_group()}>new CollectionGroupState()</Button
			>
		{:else}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.firestore_stores_doc()}>createDocStore()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.firestore_stores_collection()}>createCollectionStore()</Button
			>
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.firestore_stores_collection_group()}>createCollectionGroupStore()</Button
			>
		{/if}

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.firestore_components_doc()}>&lt;Doc&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.firestore_components_collection()}>&lt;Collection&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.firestore_components_collection_group()}>&lt;CollectionGroup&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Realtime DB</h2>

		{#if $runes}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.realtime_db_states_node()}>new NodeState()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.realtime_db_states_node_list()}>new NodeListState()</Button
			>
		{:else}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.realtime_db_stores_node()}>createNodeStore()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.realtime_db_stores_node_list()}>createNodeListStore()</Button
			>
		{/if}

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.realtime_db_components_node()}>&lt;Node&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.realtime_db_components_node_list()}>&lt;NodeList&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Remote Config</h2>
		{#if $runes}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_states_remote_config()}>new RemoteConfigActivationState()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_states_remote_config_value()}>new RemoteConfigValueState()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_states_remote_config_boolean()}
				>new RemoteConfigBooleanState()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_states_remote_config_number()}
				>new RemoteConfigNumberState()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_states_remote_config_string()}
				>new RemoteConfigStringState()</Button
			>
		{:else}
			<Button
				variant="link"
				size="sm"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_stores_remote_config()}
				>createRemoteConfigActivationStore()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_stores_remote_config_value()}
				>createRemoteConfigValueStore()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_stores_remote_config_boolean()}
				>createRemoteConfigBooleanStore()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_stores_remote_config_number()}
				>createRemoteConfigNumberStore()</Button
			>
			<Button
				variant="link"
				class="h-auto justify-start px-0 py-1.5 text-foreground"
				href={PAGES.remote_config_stores_remote_config_string()}
				>createRemoteConfigStringStore()</Button
			>
		{/if}

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.remote_config_components_remote_config()}>&lt;RemoteConfig&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.remote_config_components_remote_config_value()}>&lt;RemoteConfigValue&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.remote_config_components_remote_config_boolean()}
			>&lt;RemoteConfigBoolean&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.remote_config_components_remote_config_number()}
			>&lt;RemoteConfigNumber&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.remote_config_components_remote_config_string()}
			>&lt;RemoteConfigString&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Storage</h2>

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.storage_stores_download_url()}>createDownloadUrlStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.storage_stores_storage_list()}>createStorageListStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.storage_stores_upload_task()}>createUploadTaskStore()</Button
		>

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.storage_components_download_url()}>&lt;DownloadUrl&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.storage_components_storage_list()}>&lt;StorageList&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={PAGES.storage_components_upload_task()}>&lt;UploadTask&gt;</Button
		>
	</div>
</aside>
