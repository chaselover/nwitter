import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLogin from "./isLogin";

const AuthRoute = ({ component: Component, needAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLogin() && needAuth ? ( //토큰여부 확인, needAuth true,false로 처리
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export default AuthRoute;
