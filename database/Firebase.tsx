import { LogBox, YellowBox } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as geofirex from 'geofirex'; 

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
const MAPS = 'Maps';


export function InitializeFirebase(){
    // Initialize Firebase
    LogBox.ignoreLogs(['Setting a timer'])
    if(firebase.apps.length === 0)
      firebase.initializeApp(firebaseConfig);
}

export function firebase_get_nearest_map_coords(func,{center, radius}){
    
        const geo = geofirex.init(firebase);

        const geoQuery = geo.query(MAPS);
        const field = 'position';
        center = geo.point(center.lat, center.long);
        geoQuery.within(center, radius, field)
        .subscribe((hits) => func(hits))
}

export function firebase_add_hospital_on_map(){
    const geo = geofirex.init(firebase);
    const cities = firebase.firestore().collection(MAPS);
 

    const position = geo.point(14.606363, 120.9656804);
 
    cities.add({ name: 'Me', position });
}


export async function firebase_get_collection(collection){
    try{
      const data = await firebase.firestore()
            .collection(collection)
            .get();
        return data.docs.map(doc => {return { id : doc.id, ...doc.data()}});
    }catch{

    }
}

export async function firebase_get_doctors(item){
    try{
      const data = await firebase.firestore()
      .collection(item.collection)
      .doc(item.id)
      .collection(item.department)
      .get();
  return data.docs.map(doc => {return { id : doc.id, ...doc.data()}});
    }catch{

    }
}


export async function firebase_search(collection,text){
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


export async function firebase_search_doctors(item,text){
    try{
      const data = await firebase.firestore()
            .collection(item.collection)
            .doc(item.id)
            .collection(item.department)
            .orderBy("search")
            .startAt(text)
            .endAt(text+"\uf8ff")
            .get();
            
        return data.docs.map(doc => {return { id : doc.id, ...doc.data()}});
    }catch{

    }
}

export function TestFirebase(){
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