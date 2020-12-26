import { LogBox, YellowBox } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBBvaH8wQoqzJTzQWOhUdNWz4tA5bJ0Gjs",
    authDomain: "hospitalline.firebaseapp.com",
    projectId: "hospitalline",
    storageBucket: "hospitalline.appspot.com",
    messagingSenderId: "386498233338",
    appId: "1:386498233338:web:4643e933052b8a0380da43",
    measurementId: "G-V2606QPWS2"

};

const HOSPITALS = 'Hospitals';

function InitializeFirebase(){
    // Initialize Firebase
    LogBox.ignoreLogs(['Setting a timer'])
    if(firebase.apps.length === 0)
      firebase.initializeApp(firebaseConfig);
}

async function firebase_get_collection(collection){
    try{
      const data = await firebase.firestore()
            .collection(collection)
            .get();
        return data.docs.map(doc => {return { id : doc.id, ...doc.data()}});
    }catch{

    }
}

async function firebase_search(collection,text){
    try{
      const data = await firebase.firestore()
            .collection(collection)
            .orderBy("search")
            .startAt(text)
            .endAt(text+"\uf8ff")
            .get();
            
        return data.docs.map(doc => {return { id : doc.id, ...doc.data()}});
    }catch{

    }
}


function TestFirebase(){
    firebase.firestore()
        .collection(HOSPITALS)
        .doc('doc1')
        .set({
            Eco: 'eco'
        })
        .then(()=>{
            console.log('Wat');
        })
}

export {
    InitializeFirebase,
    TestFirebase,
    firebase_get_collection,
    firebase_search,
}