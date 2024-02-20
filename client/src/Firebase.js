import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "barbill-v2-8edfb.firebaseapp.com",
  projectId: "barbill-v2-8edfb",
  storageBucket: "barbill-v2-8edfb.appspot.com",
  messagingSenderId: "112411074577",
  appId: "1:112411074577:web:f35e3acb9ac760ecea11b0"
}

export const app = initializeApp(firebaseConfig)