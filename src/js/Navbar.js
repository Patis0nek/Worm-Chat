import React, { useRef, useState, useEffect } from 'react';
import '../css/App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/functions';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();


function navbar() {
    var user = firebase.auth().currentUser;

    if (user) {
        const { displayName, uid, photoURL } = auth.currentUser;
        return (
            <>
                <img class="fotk" src={photoURL} onClick={() => auth.signOut()} />
            </>
        )
    } else {
    }
}

export default navbar;