import React from 'react';
import './App.css';

import firebase from 'firebase/app';  // Firebase SDK
import 'firebase/firestore'           // Database
import 'firebase/auth';               // Authentication

import { useAuthstate } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initialize({
  apiKey: "AIzaSyCVKP34K0T2CZRDe0VDXk8AskDlQKsi_J0",
  authDomain: "superchat-ab9aa.firebaseapp.com",
  projectId: "superchat-ab9aa",
  storageBucket: "superchat-ab9aa.appspot.com",
  messagingSenderId: "330157601809",
  appId: "1:330157601809:web:a14fb476de92812f3aedb0",
  measurementId: "G-QJQF88ZTL8"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = userAuthState(auth); // Signed in:   user is an object
                                      // Signed out:  user is null

  return (
    <div className="App">
      <header className="App-header">
      
      </header>

      <section >
        {user ? <Chatroom /> : <SignIn/>} 
      </section>

    </div>
  );
}

function SignIn() {
  const singInWIthGoogle = () => {
    // Google auth provide
    const provider =  new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopip(provider); // Trigger pop up window when
                                    // btn is clicked
  }

  return (
    <button onClick={signInWithGoogle}> Sign in with Google </button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {}

export default App;
