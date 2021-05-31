import { dbService } from "fBase";
import React, { useEffect,useState } from "react";
import Nweet from "components/Nweet";


// userObj props를받음(App로그인 -> 라우터 -> 홈)
// 이제 로그인한 사람이 누군지 알고있음(수정,삭제 가능)
const Home = ({userObj}) => {
    // console.log(userObj); 여기서 id부분 찾아옴.

    // Create - collection add 
    // submit을 위한 state
    const [nweet, setNweet] = useState("");
    // Read - collection get
    const [nweets,setNweets] = useState([]);

    /*const getNweets = async()=>{
        // get은 collection에서 doc를 QuerySnapShat형태로 가져옴.

        const dbNweets = await dbService.collection("nweets").get();
        // console.log(dbNweets);
        dbNweets.forEach((document)=> {
            // nweetObject에는 data와 id가 있다.
            const nweetObject = {
                ...document.data(),
                id : document.id,
            }
            // set으로 시작하는 함수의 인자로 함수가 들어오면 
            // prev를 써 이전값에 접근할수 있게 해줌.(배열형태로)
            setNweets(prev => [nweetObject, ...prev])
        });
    }*/

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
    const onSubmit = async (event) => {
        event.preventDefault();
        // add는 doc를 collection에 넣음.
        // add는 promise를 내보냄(마우스대면 나옴)
        // => async await쓰기
        await dbService.collection("nweets").add({
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    }
    // event안에있는 target안에있는 value를 주세요
    const onChange = (event) => {
        const {
            target:{value}
        } = event;
        setNweet(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj = {nweet} isOwner = {nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home