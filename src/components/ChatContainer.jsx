import React, { useState, useEffect } from "react";
import { ChatPresenter } from "routes/ChatPresenter";
import SockJS from "sockjs-client";
import Stomp, { setConnected } from "stompjs";

// 소켓통신 연결로직 정의
let sockJS = new SockJS("http://localhost:8080/ws");
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

export const ChatContainer = () => {
  // 메세지 리스트
  const [contents, setContents] = useState([]);
  // 닉네임
  const [messageType, setMessageType] = useState("ENTER");
  //메세지
  const [roomId, setRoomId] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  // 소켓 연결
  useEffect(() => {
    stompClient.connect({}, () => {
      setRoomId(5);
      setConnected(true);
      stompClient.subscribe(`/sub/chat/rooms/${roomId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
        setMessageType("TALK");
      });
    });
  }, [roomId]);

  // 엔터눌렀을 때 메세지 전송부
  const handleEnter = (roomId, sender, message) => {
    const newMessage = { messageType, roomId, sender, message };
    console.log(message);
    stompClient.send("/pub/message", {}, JSON.stringify(newMessage));
    setMessage("");
  };

  // 리스트에 메세지 하나 추가.
  const addMessage = (msg) => {
    setContents((prev) => [...prev, msg]);
  };

  // 보여지는 부분에 보낼 것은. 리스트, 엔터 눌렀을때 실행할 함수, 현 메세지, setMessage 함수, username, setUsername함수
  return (
    <div className={"container"}>
      <ChatPresenter
        contents={contents}
        handleEnter={handleEnter}
        message={message}
        setMessage={setMessage}
        sender={sender}
        setSender={setSender}
      />
    </div>
  );
};
