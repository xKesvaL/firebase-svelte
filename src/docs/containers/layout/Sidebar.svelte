<script lang="ts">
	import { ROUTES } from '$docs/config';
	import { sidebarShown } from '$docs/stores/sidebar.js';
	import { Button } from '$docs/ui/button';
	import { Separator } from '$docs/ui/separator/index.js';
</script>

<aside
	class="fixed {$sidebarShown
		? 'translate-x-0'
		: '-translate-x-full'} bottom-0 left-0 top-16 flex w-screen flex-shrink-0 flex-col overflow-y-scroll bg-card p-4 shadow-xl shadow-foreground/25 transition-transform lg:w-80 lg:translate-x-0"
	style="view-transition-name: sidebar;"
>
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Guides</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.guideGetstarted}>Get Started</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">App</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.appComponentsFirebase}>&lt;FirebaseApp&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.appStoresFirebase}>getFirebaseContext()</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Auth</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.authStoresUser}>createUserStore()</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.authComponentsUser}>&lt;User&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Firestore</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.firestoreStoresDoc}>createDocStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.firestoreStoresCollection}>createCollectionStore()</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.firestoreStoresCollectionGroup}>createCollectionGroupStore()</Button
		>

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.firestoreComponentsDoc}>&lt;Doc&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.firestoreComponentsCollection}>&lt;Collection&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.firestoreComponentsCollectionGroup}>&lt;CollectionGroup&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Realtime DB</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.rtdbStoresNode}>createNodeStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.rtdbStoresNodeList}>createNodeListStore()</Button
		>

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.rtdbComponentsNode}>&lt;Node&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.rtdbComponentsNodeList}>&lt;NodeList&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Remote Config</h2>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgStoresRemoteConfig}>createRemoteConfigActivationStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgStoresRemoteConfigValue}>createRemoteConfigValueStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgStoresRemoteConfigBoolean}>createRemoteConfigBooleanStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgStoresRemoteConfigNumber}>createRemoteConfigNumberStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgStoresRemoteConfigString}>createRemoteConfigStringStore()</Button
		>

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgComponentsRemoteConfig}>&lt;RemoteConfig&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgComponentsRemoteConfigValue}>&lt;RemoteConfigValue&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgComponentsRemoteConfigBoolean}>&lt;RemoteConfigBoolean&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgComponentsRemoteConfigNumber}>&lt;RemoteConfigNumber&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.remotecfgComponentsRemoteConfigString}>&lt;RemoteConfigString&gt;</Button
		>
	</div>
	<Separator class="my-4" />
	<div class="flex flex-col">
		<h2 class="mb-2 text-xl">Storage</h2>

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.storageStoresDownloadUrl}>createDownloadUrlStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.storageStoresStorageList}>createStorageListStore()</Button
		>
		<Button
			variant="link"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.storageStoresUploadTask}>createUploadTaskStore()</Button
		>

		<Separator class="mx-auto my-2 w-5/6 opacity-25" />

		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.storageComponentsDownloadUrl}>&lt;DownloadUrl&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.storageComponentsStorageList}>&lt;StorageList&gt;</Button
		>
		<Button
			variant="link"
			size="sm"
			class="h-auto justify-start px-0 py-1.5 text-foreground"
			href={ROUTES.storageComponentsUploadTask}>&lt;UploadTask&gt;</Button
		>
	</div>
</aside>
