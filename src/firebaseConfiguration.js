import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ46XNhx6tkzGlJgazj0kkHFnIEjs3Ixo',
  authDomain: 'attendance-taking-embedded.firebaseapp.com',
  databaseURL:
    'https://attendance-taking-embedded-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'attendance-taking-embedded',
  storageBucket: 'attendance-taking-embedded.appspot.com',
  messagingSenderId: '614971424695',
  appId: '1:614971424695:web:930a813d59ba4c651b7232',
  measurementId: 'G-P18FHPDZWH',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
