import React, {useState} from "react";
import {storageService, dbService} from "fBase"
import {v4 as uuidv4} from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({userObj}) => {
    // submit을 위한 state
    const [nweet, setNweet] = useState("");
    const [attachment,setAttachment] = useState("")

    // Create - collection add 
    // Read - collection get


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
    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
          }
        event.preventDefault();
        // if문 안에서는 밖으로 못나오기 때문에 let변수처리해서 값이 바뀔수 있게끔.
        let attachmentUrl = "";
        if(attachment !== "") {
        // child는 collection같은 느낌. 뒤에는 주소같이 
        // 1. file의 reference를 만듦. 
        // (userid로 만든 refence폴더가 bucket에 들어가고 uuid로 랜덤한 이미지네임으로 data를 받을 준비를함.)
        const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`)
        //2. 파일데이터를 reference로 보냄.
        // putString은 data와 data formet이 필요함. 사진을 url형식으로 refernce에 넣음.
        const response = await attachmentRef.putString(attachment, "data_url");
        // promise를 리턴하는 함수는 날 기다려줘! 의 의미
        // console.log(await response.ref.getDownloadURL());
        attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        // console.log(userObj); 여기서 id부분 찾아옴
        // add는 doc를 collection에 넣음.
        // add는 promise를 내보냄(마우스대면 나옴)
        // => async await쓰기
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    }
    // event안에있는 target안에있는 value를 주세요
    const onChange = (event) => {
        const {
            target:{value}
        } = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        // console.log(event.target.files);
        // event안의 target으로가서 files를 받아오는 ES6문법.
        // files 안의 배열에서 
        const {target:{files}} = event;
        const theFile = files[0];
        // console.log(theFile);
        // FileReader API이용. MDN참조.
        const reader = new FileReader();
        // URL읽는게(loading이) 끝나면 finishedEvent를 갖게되는데 이걸 받아 가져옴.
        // 이 객체 안의 result URL은 브라우저에서 볼수있는 사진에 대한 주소
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
        // reader기능을 만들고 theFile의 URL을 읽어옴.
        reader.readAsDataURL(theFile);
    }
    const onClearAtttachment = () => setAttachment("")
    // image파일을 받을껀데 /(형식)이고 /*은 이미지파일이면 어떤형식이든 받는다는뜻.
    return(
        <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input 
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
              opacity: 0,
            }} 
        />
        {attachment && (
            <div className="factoryForm__attachment">
                <img
                  src={attachment}
                  style={{
                    backgroundImage: attachment,
                  }}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                  <span>Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            )
            }    
        </form>
    )

}

export default NweetFactory;