import React from 'react';
import './App.css';

import firebase from 'firebase/app';  // Firebase SDK
import 'firebase/firestore'           // Database
import 'firebase/auth';               // Authentication

import { useAuthstate } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initialize({

})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      </header>
    </div>
  );
}

export default App;
