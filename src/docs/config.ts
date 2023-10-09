import type { Brand } from './typings/standard';

export const BRAND = {
	author: {
		name: 'KesvaL',
		url: 'https://kesval.com'
	},
	logo: {
		dark: '/images/logos/logo.png',
		light: '/images/logos/logo.png'
	},
	name: 'Starter',
	url: 'https://starter.kesval.com'
} as const satisfies Brand;

export const ROUTES = {
	home: '/',
	guideGetstarted: '/guides/get-started',
	appStoresFirebase: '/app/stores/context',
	appComponentsFirebase: '/app/components/firebase-app',
	authStoresUser: '/auth/stores/user',
	authComponentsUser: '/auth/components/user',
	firestoreStoresDoc: '/firestore/stores/doc',
	firestoreStoresCollection: '/firestore/stores/collection',
	firestoreStoresCollectionGroup: '/firestore/stores/collection-group',
	firestoreComponentsDoc: '/firestore/components/doc',
	firestoreComponentsCollection: '/firestore/components/collection',
	firestoreComponentsCollectionGroup: '/firestore/components/collection-group',
	rtdbStoresNode: '/realtime-db/stores/node',
	rtdbStoresNodeList: '/realtime-db/stores/node-list',
	rtdbComponentsNode: '/realtime-db/components/node',
	rtdbComponentsNodeList: '/realtime-db/components/node-list',
	remotecfgStoresRemoteConfig: '/remote-config/stores/remote-config',
	remotecfgStoresRemoteConfigValue: '/remote-config/stores/remote-config-value',
	remotecfgStoresRemoteConfigBoolean: '/remote-config/stores/remote-config-boolean',
	remotecfgStoresRemoteConfigNumber: '/remote-config/stores/remote-config-number',
	remotecfgStoresRemoteConfigString: '/remote-config/stores/remote-config-string',
	remotecfgComponentsRemoteConfig: '/remote-config/components/remote-config',
	remotecfgComponentsRemoteConfigValue: '/remote-config/components/remote-config-value',
	remotecfgComponentsRemoteConfigBoolean: '/remote-config/components/remote-config-boolean',
	remotecfgComponentsRemoteConfigNumber: '/remote-config/components/remote-config-number',
	remotecfgComponentsRemoteConfigString: '/remote-config/components/remote-config-string',
	storageStoresDownloadUrl: '/storage/stores/download-url',
	storageStoresStorageList: '/storage/stores/storage-list',
	storageStoresUploadTask: '/storage/stores/upload-task',
	storageComponentsDownloadUrl: '/storage/components/download-url',
	storageComponentsStorageList: '/storage/components/storage-list',
	storageComponentsUploadTask: '/storage/components/upload-task'
} as const;
