import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyCEwC1jq3HXrIl3Z0RZmNsivUDJZYysheM",
    authDomain: "cordoba-service.firebaseapp.com",
    databaseURL: "https://cordoba-service.firebaseio.com",
    projectId: "cordoba-service",
    storageBucket: "cordoba-service.appspot.com",
    messagingSenderId: "108751692238",
    appId: "1:108751692238:web:e8f91c7a05039fef"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.database()
const auth = firebase.auth();
const provider =  new firebase.auth.GoogleAuthProvider();
const provider_dos = new firebase.auth.FacebookAuthProvider();
const currentUser = auth.currentUser;

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
//db.settings(settings)

// firebase collections
//const tablaUsuarios = db.collection('usuarios')

export default {
    db,
    auth,
    currentUser,
    provider
    //tablaUsuarios
}
