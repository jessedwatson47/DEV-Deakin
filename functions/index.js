// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import {onCall} from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

const firebaseAdmin = initializeApp();
