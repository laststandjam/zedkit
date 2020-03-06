import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCd8M6eubEPrbjcG_0UtTK9bHVdw-D2vvI",
  authDomain: "project-money-maker-af76e.firebaseapp.com",
  databaseURL: "https://project-money-maker-af76e.firebaseio.com",
  projectId: "project-money-maker-af76e",
  storageBucket: "project-money-maker-af76e.appspot.com",
  messagingSenderId: "126532214031",
  appId: "1:126532214031:web:cf7410dc5febdcbfbdf27a",
  measurementId: "G-B6JE5DXMMP"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    // Get a reference to the database service
    this.database = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSignOut = () => this.auth.signOut();

  getUser = () => {
    var user = this.auth.currentUser;
    if (user) {
      return user
    } else {
      console.log("not signed in")
    }
  };
  getBookRef = ()=>{
    const bookRef = Firebase.database.collection("the book").doc('balance')
    return bookRef
}

  // doGetViewedMovies = () => this.database
}

const firebase = new Firebase();

export default firebase;
