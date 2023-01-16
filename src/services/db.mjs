import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

let db = false

export const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: 'AIzaSyC8bU1o7hYMArI1ScG7bnFnlzk8CiLASqs',
      authDomain: 'swapi-dex.firebaseapp.com',
      projectId: 'swapi-dex',
      storageBucket: 'swapi-dex.appspot.com',
      messagingSenderId: '858003716034',
      appId: '1:858003716034:web:9015d009ae2bd02d69485b'
    }

    const app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  }

  return db
}
