import React from "react"
import {HashRouter as Router, Route, Switch} from "react-router-dom"    
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation"
import Profile from "routes/Profile";



// 우리의 인증여부 즉 로그인상태, 로그아웃상태에따라 render시킬 Route를 다르게 줄꺼임.
// app으로부터 props인 isloggedin을 받음
// router component는 router역할만 하기위해 hook을 제외.
// redirect는 Route에 있을 때를 제외한 나머지 주소는 "/"(home)로 가라는뜻
const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {    
    return(
        <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <div
                    style={{
                      maxWidth: 890,
                      width: "100%",
                      margin: "0 auto",
                      marginTop: 80,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    >
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                        {/* <Redirect from="*" to="/" /> */}
                    </div>
                ):(
                    <Route exact path="/">
                         <Auth /> 
                    </Route>
                )}
            </Switch>
        </Router>
    );
};
export default AppRouter;