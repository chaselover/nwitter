import React, { useState, Fragment, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fBase";


// 로직은 App.js에서만 다룰것임.
function App() {
  const [init,setInit] = useState(false);
  // currentUser메소드를 통해 로그인 여부를 판별할 수 있게 됨.
  // currentUser는 로그아웃인지 firebase가 시작 안되서 유저가 없는건지 판별 어려움.
  // const [isLoggedIn, setIsLogedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);
  // 그래서 onAuthStateChanged가 로그인 여부를 감시함.
  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
      // console.log(user)
    if(user){
      // setIsLogedIn(true);
      // 로그인하면 로그인한 user를 받아서 저장함.
      setUserObj(user);
    } 
    // else {
    //   setIsLogedIn(false);  
    // }
    setInit(true)
    });
  }, [])
  // console.log(authService.currentUser)
  // setInterval(() => {
  //   console.log(authService.currentUser)
  // },2000)
  // login state없애고 userObj 있냐 없냐로 대체함.=>render하나 줄임.
  return (
    <Fragment>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..." }
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </Fragment>
  );
}

export default App;
