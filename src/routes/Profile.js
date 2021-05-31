import { authService } from "fBase";
import React, { Fragment, useState } from "react"
import { useHistory } from "react-router";



const Profile = ({refreshUser, userObj}) => {
    // hook를 통해 로그아웃 이벤트가 끝나면 다시 home으로 돌아갈 수 있도록
    // redirect를 useHistory를 이용한 hook으로 구현.
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    }
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            // console.log(userObj.updateProfile);
            await userObj.updateProfile({
                displayName: newDisplayName
            })
            // firebase update후 react.js profile을 새로고침하는 함수.
            refreshUser();
        }
    }
    /*
    // where은 조건 필터 함수. where(A,연산자,B)
    // DB data 필터링 하는 방법.
    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets").where("creatorId","==", userObj.uid).orderBy("createAt").get();
        console.log(nweets.docs.map(doc => doc.data()));
    }
    useEffect(()=>{
        getMyNweets()
    },[])
    */



    return (
        <Fragment>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newDisplayName} type="text" placeholder="Display name" />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </Fragment>
    )
}
export default Profile;