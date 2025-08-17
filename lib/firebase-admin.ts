// /** Firebase Admin configuration for server-side operations. */

// import { cert, getApps, initializeApp } from 'firebase-admin/app'
// import { getFirestore } from 'firebase-admin/firestore'

// const firebaseAdminConfig = {
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   // clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.replace(/\\n/g, '\n'),
// }

// // Initialize Firebase Admin only if it hasn't been initialized already
// const adminApp = getApps().length === 0
//   ? initializeApp({
//     credential: cert(firebaseAdminConfig),
//     projectId: firebaseAdminConfig.projectId,
//   })
//   : getApps()[0]

// // Initialize Firestore Admin
// export const adminDb = getFirestore(adminApp)

// export default adminApp