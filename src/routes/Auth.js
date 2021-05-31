import { authService, firebaseInstance } from "fBase";
import React from "react";
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
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;