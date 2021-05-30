import React from "react"
import {HashRouter as Router, Route, Switch} from "react-router-dom"    
import Auth from "../routes/Auth";
import Home from "../routes/Home";



// 우리의 인증여부 즉 로그인상태, 로그아웃상태에따라 render시킬 Route를 다르게 줄꺼임.
// app으로부터 props인 isloggedin을 받음
// router component는 router역할만 하기위해 hook을 제외.
const AppRouter = ({isLoggedIn}) => {    
    return(
        <Router>
            <Switch>
                {isLoggedIn ? (
                    
                    <Route exact path="/">
                        <Home />
                    </Route>
                    
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