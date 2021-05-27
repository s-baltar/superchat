import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';  // Firebase SDK
import 'firebase/firestore'           // Database
import 'firebase/auth';               // Authentication

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCVKP34K0T2CZRDe0VDXk8AskDlQKsi_J0",
    authDomain: "superchat-ab9aa.firebaseapp.com",
    projectId: "superchat-ab9aa",
    storageBucket: "superchat-ab9aa.appspot.com",
    messagingSenderId: "330157601809",
    appId: "1:330157601809:web:a14fb476de92812f3aedb0",
    measurementId: "G-QJQF88ZTL8"
  })
} else { // If already initialized
  firebase.app();
}


const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth); // Signed in:   user is an object
                                      // Signed out:  user is null

  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>

      <section >
        {user ? <ChatRoom /> : <SignIn />} 
      </section>

    </div>
  );
}


function SignIn() {

  const signInWithGoogle = () => {
    // Google auth provide
    const provider =  new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider); // Trigger pop up window when
                                    // btn is clicked
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}


function SignOut() {

  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {

  const dummy = useRef();

  // Reference firestore collection
  const messagesRef = firestore.collection('messages');
  // console.log("HI: "+ messagesRef);
  // Query documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(25);

  // Listen to updates data with a hook
  // Returns array of objects where each object is a message in the DB
  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async(e) => {

    e.preventDefault(); // Stop page refresh when form is submitted

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({ // Create new doc in firestore
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue(''); // Reset form value to empty string

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  

  return (
    <>
      <main>
        
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
       
        <div ref={dummy}></div>
      
      </main>
      
      <form onSubmit={sendMessage}>
          
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

          <button type="submit">send</button>

        </form>
    </>
  )
}


function ChatMessage(props) {
  // Show text by accessing prop
  const { text, uid, photoURL } = props.message;

  // Compare uid on Firestore doc to currently logged in user
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  return (
    <div className={'message ${messageClass}'}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
    
  )
}

export default App;
