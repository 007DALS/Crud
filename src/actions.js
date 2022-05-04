import { firebaseApp } from './firebase';
import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import{
    collection,
    getDocs, 
    getFirestore, 
    addDoc, 
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    limit,
    orderBy,
    startAfter
} from '@firebase/firestore';

const db = getFirestore(firebaseApp);

export const getCollection = async(name) =>{
    const result = {statusResponse : false, data: null, error: null}
    try {
        const entities = collection(db,'tasks');
        const data = await getDocs(entities);
        const esto = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        result.statusResponse = true;
        result.data = esto;       

    } catch (error) {
        result.error = error;
    }
    return result;
}

export const addDocument = async(collectionName, data) =>{
    const result = {statusResponse : false, data: null, error: null}

    try {
        const entite = collection(db,collectionName);
        const response = await addDoc(entite, data);
        result.statusResponse = true;
        result.data = {id: response.id};
    } catch (error) {
        result.error = error;
    }

    return result;
}

export const getDocument = async(collectionName, id) =>{
    const result = {statusResponse : false, data: null, error: null}
    try {
        const docRef = doc(db, collectionName,id);
        const response = await getDoc(docRef);        
        result.data = {id: response.id, ...response.data()}
        result.statusResponse = true;        
    } catch (error) {
        result.error = error;
    }
    return result;
};

export const updateDocument = async(collectionName, id, data) =>{
    const result = {statusResponse : false, error: null}
    try {
        const entitieRef = doc(db,collectionName,id);
        await updateDoc(entitieRef,data);
        result.statusResponse = true;        
    } catch (error) {
        result.error = error;
    }
    return result;
};

export const deleteDocument = async(collectionName, id) =>{
    const result = {statusResponse : false, error: null}
    try {
        await deleteDoc(doc(db,collectionName,id));
        result.statusResponse = true;        
    } catch (error) {
        result.error = error;
    }
    return result;
};