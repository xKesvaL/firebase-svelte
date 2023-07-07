import type {
	CollectionReference,
	DocumentReference,
	WithFieldValue,
	PartialWithFieldValue,
	UpdateData
} from 'firebase/firestore/lite';
import {
	addDoc,
	getFirestore,
	collection,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	getDoc
} from 'firebase/firestore/lite';

type CollectionPredicate<T> = string | CollectionReference<T>;
type DocPredicate<T> = string | DocumentReference<T>;

function colRef<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
	const db = getFirestore();
	return typeof ref === 'string' ? (collection(db, ref) as CollectionReference<T>) : ref;
}

function docRef<T>(ref: DocPredicate<T>): DocumentReference<T> {
	if (typeof ref === 'string') {
		const pathParts = ref.split('/');
		const documentId = pathParts.pop();
		const collectionString = pathParts.join('/');
		return doc<T>(colRef(collectionString), documentId);
	} else {
		return ref;
	}
}

async function getDocument<T>(ref: DocPredicate<T>): Promise<(T & { id: any }) | null> {
	const docSnap = await getDoc(docRef(ref));
	return docSnap.exists() ? { ...(docSnap.data() as T), id: docSnap.id } : null;
}

export function addOnline<T>(
	ref: CollectionPredicate<T>,
	data: WithFieldValue<T>
): Promise<DocumentReference<T>> {
	return addDoc(colRef(ref), data);
}
export async function setOnline<T>(ref: DocPredicate<T>, data: WithFieldValue<T>): Promise<void> {
	const snap = await getDocument(ref);
	if (snap) {
		return await updateOnline(ref, data);
	}
	return await setDoc(docRef(ref), data);
}
export async function updateOnline<T>(
	ref: DocPredicate<T>,
	data: PartialWithFieldValue<T>
): Promise<void> {
	return updateDoc(docRef(ref), data as UpdateData<T>);
}
export async function deleteOnline<T>(ref: DocPredicate<T>): Promise<void> {
	return deleteDoc(docRef(ref));
}
