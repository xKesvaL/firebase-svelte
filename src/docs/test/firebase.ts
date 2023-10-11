import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyD4T7oevOp8EAJ3MQqN_bV6LqVpC2EHKAI',
	authDomain: 'fir-svelte-test-a28e3.firebaseapp.com',
	databaseURL: 'https://fir-svelte-test-a28e3-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'fir-svelte-test-a28e3',
	storageBucket: 'fir-svelte-test-a28e3.appspot.com',
	messagingSenderId: '548992637545',
	appId: '1:548992637545:web:bc5e9dea7c878dda26e0f8'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const realtimeDb = getDatabase(app);
const storage = getStorage(app);

export { app, realtimeDb, firestore, auth, storage };
