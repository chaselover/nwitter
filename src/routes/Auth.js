import { authService, firebaseInstance } from "fBase";
import React, {useState} from "react";


// 이메일 등록, 구글아이디 등록, 깃헙 아이디 등록
const Auth = () => {

// 우리가 Log in에서 가져갈 control할 state들
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("")

// input이 change할때.
    const onChange = (event) => {
        // console.log(event.target.name);
        // event중 변경이 일어난 부분인 name과 value
        const { target: {name,value}} = event;
        // name으로 구분하고 그 value값의 state를 바꿔줌.
        if(name === "email"){
            setEmail(value);
        } else if (name ==="password"){
            setPassword(value);
        }
    }

// submit하는 순간에 새로고침되고 그순간 우리 react코드들도 사라짐.
// refresh를 막아야함.
    const onSubmit = async (event) => {
        event.preventDefault();
        // 에러코드 제외시킬 코드
        try{
            let data;
            if(newAccount){
                //create account
                // 공식문서에 Create보면 promise사용하라고 되어있음(async, await)
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data);
        } catch(error) {
            // console.log(error);
            setError(error.message)
        }

    }
    // newAccount 이전값을 가져와서 그 값에 반대된느 것을 리턴.
    const toggleAccount = () => setNewAccount((prev) => !prev);
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
            <form onSubmit={onSubmit} className="container">
                <input name= "email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? " Create Account" : " Log In "} />
                {error}            
                </form>
                <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;