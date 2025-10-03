import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebaseConfig from './firebase.config';


const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);

export default firestoreDb;
