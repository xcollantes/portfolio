/** Firebase configuration for client-side operations. */

import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check if Firebase config is complete
const isFirebaseConfigValid = Object.values(firebaseConfig).every(value => value && value !== '')

let app: FirebaseApp | null = null
let db: Firestore | null = null

if (isFirebaseConfigValid && typeof window !== 'undefined') {
  try {
    // Initialize Firebase only if it hasn't been initialized already and we're on client side
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

    // Initialize Firestore
    db = getFirestore(app)
  } catch (error) {
    console.warn('Firebase initialization failed:', error)
  }
}

export { db }
export default app