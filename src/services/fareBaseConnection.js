import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
     apiKey: "AIzaSyC7ts2_UWjQSpikU_SrEBGl1OzMeNZUzuY",
     authDomain: "myapp-cdafb.firebaseapp.com",
     databaseURL: "https://myapp-cdafb.firebaseio.com",
     projectId: "myapp-cdafb",
     storageBucket: "myapp-cdafb.appspot.com",
     messagingSenderId: "239429992808",
     appId: "1:239429992808:web:d72c82ea122cc27cf396dd",
     measurementId: "G-T6GYR7JM66"
  };

  if(!firebase.apps.length){
       firebase.initializeApp(firebaseConfig);
  }

  export default firebase
 