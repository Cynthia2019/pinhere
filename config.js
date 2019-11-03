import * as firebase from "firebase/app";
 const firebaseConfig = {
  apiKey: "AIzaSyAvB44_kg0VwexqoNSTg2NK6zitUffnDKo",
  authDomain: "pinhere-d9790.firebaseapp.com",
  databaseURL: "https://pinhere-d9790.firebaseio.com",
  projectId: "pinhere-d9790",
  storageBucket: "pinhere-d9790.appspot.com",
  messagingSenderId: "506689204318",
  appId: "1:506689204318:web:4f6604163f64db004844cf",
  measurementId: "G-RCFYR6H7EM"
};

export const init = firebase.initializeApp(firebaseConfig)