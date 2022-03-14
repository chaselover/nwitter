import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import Oauth from "routes/Oauth";
import Write from "components/Write";
import Board from "routes/Board";
import Detail from "components/Detail";
import Update from "components/Update";

// 우리의 인증여부 즉 로그인상태, 로그아웃상태에따라 render시킬 Route를 다르게 줄꺼임.
// app으로부터 props인 isloggedin을 받음
// router component는 router역할만 하기위해 hook을 제외.
// redirect는 Route에 있을 때를 제외한 나머지 주소는 "/"(home)로 가라는뜻
/* <Redirect from="*" to="/" /> */
const AppRouter = ({ isLoggedIn, userObj, refreshUser, keyword }) => {
  return (
    <Router>
      <Navigation />
      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </div>
        ) : (
          <div>
            <Route exact path="/" component={Auth} />
            <Route exact path="/oauth/redirect" component={Oauth} />
            <Route path="/write" component={Write} />
            <Route path="/board/:type" component={Board} />

            <Route path="/detail" component={Detail} />
            <Route path="/update" component={Update} />
          </div>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
