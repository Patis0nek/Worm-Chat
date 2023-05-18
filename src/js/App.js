import React, { useRef, useState, useEffect } from 'react';
import '../css/App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/functions';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmile, faHandPointDown, faSignOut } from "@fortawesome/free-solid-svg-icons";


import { $ } from 'jquery';

import Picker from 'emoji-picker-react';
import DarkMode from './themes.js';


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Loading />
      <header>
        <h1 onclick={refresh}><c>Worm</c> Chat</h1>
        <Settings />
      </header>

      <sector>
        {user ? <ChatRoom /> : <SignIn />}
      </sector>

    </div >
  );
}

function Loading() {
  setTimeout(function () {
    console.log("done");
  }, 100);
  return (
    <div class="hjz">
      <div class="gooey">
        <span class="dot"></span>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

function refresh() {
  var myElement = document.getElementById('dummy');
  myElement.current.scrollIntoView({ behavior: 'smooth' });
}

function Settings() {
  var user = firebase.auth().currentUser;
  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    setIsActive(current => !current);
  };


  if (user) {
    const { displayName, uid, photoURL } = auth.currentUser;


    return (
      <>
        <DarkMode />
        <span class="zk" onClick={() => auth.signOut()}><FontAwesomeIcon icon={faSignOut} /></span>
        <img onClick={handleClick} className="fotk" src={photoURL} />
        <div className={isActive ? 'aktywny' : 'nieaktywny'} id="mn">
          <span className="kl">{displayName}</span>
        </div>
      </>
    )
  } else {
  }
}


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" class="fot"></img>
        <d>Sign in with Google</d>
      </button>
    </>
  )

}


function SignOut() {
  return auth.currentUser && (
    <button class="signa" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setFormValue(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };


  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName: auth.currentUser.displayName,
    })


    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play();
  }

  return (<>
    <main>
      <span onClick={() => dummy.current.scrollIntoView({ behavior: 'smooth' })} class="tp"><qs><FontAwesomeIcon icon={faHandPointDown} /></qs></span>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>
      <div class="bot">
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message..." />
        <emoji onClick={() => setShowPicker(val => !val)}><FontAwesomeIcon class="smiling" icon={faSmile} /></emoji>
        {showPicker &&
          <div className="picker-container">
            <Picker className="pr"
              pickerStyle={{ fontSize: '24px', borderRadius: '10px', boxShadow: '0 0 0 0', position: 'absolute', height: '310px', width: '98.5%', marginTop: '-345px', border: '#ccc', marginLeft: '-84.3%', backgroundColor: 'white', scrollbarColor: 'red', backgroundColor: '#424448' }}
              onEmojiClick={onEmojiClick}
              disableSearchBar={true}
              native={true}
              preload={true}
              groupNames={{
                smileys_people: 'Smileys & People',
                animals_nature: 'Animals & Nature',
                food_drink: 'Food & Drink',
                travel_places: 'Travel & Places',
                activities: 'Activity',
                objects: 'Objects',
                symbols: 'Symbols',
                flags: 'Flags',
                recently_used: 'Frequently used',
              }}
            />
          </div>
        }
        <button type="submit" class="ikona" onClick={() => setShowPicker(false)} disabled={!formValue}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </form>
  </>)
}

function ChatMessage(props) {
  const { createdAt, displayName, text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  const godzina = new Date(createdAt?.toDate()).toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true });

  return (<>
    <div className={`message ${messageClass}`}>
      <p onclick={''}>{text}</p>
      <img src={photoURL} alt="" class="avatar" />
      <o className="czas">{godzina}</o>
    </div>
  </>)
}



export default App;