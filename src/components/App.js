import React, { useState, Fragment } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fBase";


// 로직은 App.js에서만 다룰것임.
function App() {
  console.log(authService.currentUser)
  // currentUser메소드를 통해 로그인 여부를 판별할 수 있게 됨.
  const [isLoggedIn, setIsLogedIn] = useState(authService.currentUser);
  return (
    <Fragment>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </Fragment>
  );
}

export default App;
