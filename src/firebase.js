import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwtqk2AWDz9__0NSm4CSupbfvo2uJrRKo",
  authDomain: "task-app-redux.firebaseapp.com",
  projectId: "task-app-redux",
  storageBucket: "task-app-redux.appspot.com",
  messagingSenderId: "651577981096",
  appId: "1:651577981096:web:5e2fae4e4bdd0044392a9d",
};

app.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { db, auth };
