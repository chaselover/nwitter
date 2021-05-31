import { dbService } from "fBase";
import React, { useEffect,useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory"

// userObj props를받음(App로그인 -> 라우터 -> 홈)
// 이제 로그인한 사람이 누군지 알고있음(수정,삭제 가능)
const Home = ({userObj}) => {
    const [nweets,setNweets] = useState([]);

    useEffect(()=>{
        // getNweets();
        // db를 실시간(realtime) 변화를 감지하는 onSnapshot!!!
        // forEach를 하고 getNweets를 하거나(위에 주석한 방법)
        // 배열을 만들고setNweets하는 방법 두가지 다 할수있음.
        dbService.collection("nweets").onSnapshot(snapshot => {
            // console.log(snapshot.docs)
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data(),
            }));
            // console.log(nweetArray);
            setNweets(nweetArray);
        })
    },[])

    return(
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj = {nweet} isOwner = {nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home