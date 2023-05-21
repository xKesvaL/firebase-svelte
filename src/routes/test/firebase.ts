import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	// TODO: REMOVE THIS BEFORE COMMIT
	apiKey: 'AIzaSyCnCe7PP-fAinMINSBUgMHpr4kMC_vJE8s',
	authDomain: 'xchessval.firebaseapp.com',
	databaseURL: 'https://xchessval-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'xchessval',
	storageBucket: 'xchessval.appspot.com',
	messagingSenderId: '648455008302',
	appId: '1:648455008302:web:97e66920c42705a0386fbf',
	measurementId: 'G-S3P768HM3L'
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export const realtimeDB = getDatabase(app);
export const auth = getAuth(app);
