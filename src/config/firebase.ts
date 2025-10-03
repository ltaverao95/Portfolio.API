import * as firebaseAdmin from "firebase-admin";
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount = require(process.env.FIREBASE_CERT_PATH);

const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const firestoreDb = firebaseApp.firestore();

export { firebaseApp, firestoreDb };
