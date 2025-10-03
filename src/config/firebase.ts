import * as dotenv from 'dotenv';

dotenv.config();

const {initializeApp, applicationDefault} = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

const firestoreDb = getFirestore(firebaseApp);

export { firebaseApp, firestoreDb };
