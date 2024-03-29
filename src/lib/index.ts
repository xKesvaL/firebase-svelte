// sdk
import FirebaseApp from './FirebaseApp.svelte';
import { getFirebaseContext, setFirebaseContext, updateFirebaseContext } from '$lib/sdk/stores.js';

// auth
import User from '$lib/auth/User.svelte';
import { createUserStore } from '$lib/auth/stores.js';

// firestore
import Doc from '$lib/firestore/Doc.svelte';
import Collection from '$lib/firestore/Collection.svelte';
import CollectionGroup from '$lib/firestore/CollectionGroup.svelte';
import {
	createDocStore,
	createCollectionStore,
	createCollectionGroupStore
} from '$lib/firestore/stores.js';

// rtdb
import Node from '$lib/realtime/Node.svelte';
import NodeList from '$lib/realtime/NodeList.svelte';
import { createNodeStore, createNodeListStore } from '$lib/realtime/stores.js';

// remote config
import RemoteConfig from '$lib/remoteConfig/RemoteConfig.svelte';
import RemoteConfigBoolean from '$lib/remoteConfig/RemoteConfigBoolean.svelte';
import RemoteConfigNumber from '$lib/remoteConfig/RemoteConfigNumber.svelte';
import RemoteConfigString from '$lib/remoteConfig/RemoteConfigString.svelte';
import RemoteConfigValue from '$lib/remoteConfig/RemoteConfigValue.svelte';
import {
	createRemoteConfigActivationStore,
	createRemoteConfigBooleanStore,
	createRemoteConfigNumberStore,
	createRemoteConfigStringStore,
	createRemoteConfigValueStore
} from '$lib/remoteConfig/stores.js';

// cloud storage
import DownloadUrl from '$lib/storage/DownloadUrl.svelte';
import StorageList from '$lib/storage/StorageList.svelte';
import UploadTask from '$lib/storage/UploadTask.svelte';
import {
	createStorageListStore,
	createDownloadUrlStore,
	createUploadTaskStore
} from '$lib/storage/stores.js';

export {
	// SDK Context
	getFirebaseContext,
	setFirebaseContext,
	updateFirebaseContext,
	// User Stores
	createUserStore,
	// Firestore Stores
	createDocStore,
	createCollectionStore,
	createCollectionGroupStore,
	// Realtime Stores
	createNodeStore,
	createNodeListStore,
	// Remote Config Stores
	createRemoteConfigActivationStore,
	createRemoteConfigBooleanStore,
	createRemoteConfigNumberStore,
	createRemoteConfigStringStore,
	createRemoteConfigValueStore,
	// Cloud Storage Stores
	createStorageListStore,
	createDownloadUrlStore,
	createUploadTaskStore,

	// SDK
	FirebaseApp,
	// Auth
	User,
	// Firestore
	Doc,
	Collection,
	CollectionGroup,
	// Realtime
	Node,
	NodeList,
	// Remote Config
	RemoteConfig,
	RemoteConfigBoolean,
	RemoteConfigNumber,
	RemoteConfigString,
	RemoteConfigValue,
	// Cloud Storage,
	DownloadUrl,
	StorageList,
	UploadTask
};
