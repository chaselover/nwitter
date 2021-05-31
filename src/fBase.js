import firebase from "firebase/app";
import "firebase/auth";
// firebase의 database를 firestore라 함
import "firebase/firestore";
import "firebase/storage";



//   실질적 코드를 숨기고 .env에 정리하는 이유는 
// github에 노출되는 것을 막기위함. 어차피 웹에서 firebase접근시 노출되나 github에서만 막기위함.
// gitignore을 통해 업데이트하지 않을 수 있음.
//  요약 : github에 내 key들을 보여주고싶지 않음.
// Your web app's Firebase configuration
// 환경변수 = .env(REACT_APP_써주는거 필수.)
const firebaseConfig = {
    apiKey: "AIzaSyB-444pbALaNxUIKnTV-qFOwIswmauxFkI",
    authDomain: "nwitter-8b625.firebaseapp.com",
    projectId: "nwitter-8b625",
    storageBucket: "nwitter-8b625.appspot.com",
    messagingSenderId: "548960960262",
    appId: "1:548960960262:web:60124462b903f4a6faa887"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase는 모듈에서 나온것.
//  모든걸 export하는 대신  auth서비스만 export
export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storageService = firebase.storage();