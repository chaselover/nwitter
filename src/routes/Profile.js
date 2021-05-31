import { authService } from "fBase";
import React, { Fragment } from "react"
import { useHistory } from "react-router";



const Profile = () => {
    // hook를 통해 로그아웃 이벤트가 끝나면 다시 home으로 돌아갈 수 있도록
    // redirect를 useHistory를 이용한 hook으로 구현.
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    }
    return (
        <Fragment>
            <button onClick={onLogOutClick}>Log Out</button>
        </Fragment>
    )
}
export default Profile;