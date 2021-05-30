import firebase from "firebase/app";
import "firebase/auth"
//   실질적 코드를 숨기고 .env에 정리하는 이유는 
// github에 노출되는 것을 막기위함. 어차피 웹에서 firebase접근시 노출되나 github에서만 막기위함.
// gitignore을 통해 업데이트하지 않을 수 있음.
//  요약 : github에 내 key들을 보여주고싶지 않음.
// Your web app's Firebase configuration
// 환경변수 = .env(REACT_APP_써주는거 필수.)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_ADD_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//  모든걸 export하는 대신  auth서비스만 export
export const authService = firebase.auth();