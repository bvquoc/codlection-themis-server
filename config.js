const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyAluRe0cXHbkLqSY5Jc6MZ7J1zaFhG6EW8',
  authDomain: 'ci-onlinejudge.firebaseapp.com',
  projectId: 'ci-onlinejudge',
  storageBucket: 'ci-onlinejudge.appspot.com',
  messagingSenderId: '208800042172',
  appId: '1:208800042172:web:216326089b914e98f894b9',
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const submitDir = '.';

module.exports = { app, db, submitDir, firebase };
