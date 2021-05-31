import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fBase";
import AuthForm from "components/AuthForm"


// 이메일 등록, 구글아이디 등록, 깃헙 아이디 등록
const Auth = () => {

// 우리가 Log in에서 가져갈 control할 state들



    const onSocialClick = async (event) => {
        // console.log(event)
        const {target:{name}} = event;
        // using a popup으로 설정.(공식문서 따라서) 구글,깃헙 로그인 팝업창 띄워줌/
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name ==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
        <div className="authContainer">
            <FontAwesomeIcon
              icon={faTwitter}
              color={"#04AAFF"}
              size="3x"
              style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
              Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
            <button onClick={onSocialClick} name="github" className="authBtn">
              Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
}

export default Auth;