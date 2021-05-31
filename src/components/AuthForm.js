import React, { Fragment,useState } from "react"
import { authService} from "fBase";

const AuthForm = () => {
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
    return (
        <Fragment>
            <form onSubmit={onSubmit} className="container">
                <input 
                    name= "email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={onChange}
                    className="authInput"
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={onChange}
                    className="authInput"
                />
                <input 
                    type="submit" 
                    value={newAccount ? " Create Account" : " Log In "} 
                    className="authInput authSubmit"
                />
                {error && <span className="authError">{error}</span>}           
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign in" : "Create Account"}</span>
        </Fragment>
    )
}

export default AuthForm