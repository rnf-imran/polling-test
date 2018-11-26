import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBmFKjEWYHQkIEffIKH6UnrbBov8LGIo1Q",
  authDomain: "imran-c8b78.firebaseapp.com",
  databaseURL: "https://imran-c8b78.firebaseio.com",
  projectId: "imran-c8b78",
  storageBucket: "",
  messagingSenderId: "1020966372101"
};
//firebase.initializeApp(config);



  firebase.initializeApp(config);
  const auth = firebase.auth();
  const database = firebase.database();


export {
  auth,database
};