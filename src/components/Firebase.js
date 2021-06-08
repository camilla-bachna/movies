import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA20IZyEhXb8tavglTimWjgc5TUelxMz5s',
  authDomain: 'prueba-h-b5099.firebaseapp.com',
  databaseURL: 'https://prueba-h-b5099.firebaseio.com',
  projectId: 'prueba-h-b5099',
  storageBucket: 'prueba-h-b5099.appspot.com',
  messagingSenderId: '480760190009',
  appId: '1:480760190009:web:71123afad477716c2769e8',
  measurementId: 'G-CP339BM5G5',
});

var db = firebaseApp.firestore();

export { db };
