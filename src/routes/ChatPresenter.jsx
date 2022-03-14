import React from "react";

// props들을 받음.
export const ChatPresenter = ({
  contents,
  message,
  sender,
  setMessage,
  setSender,
  handleEnter
}) => {
  // 닉네임 칸에 입려된 값이 바뀌면 Username state도 바꿈.
  // content리스트는 돌면서 닉네임 : 내용을 출력
  // 메시지 입력칸은 메세지 내용이 변하면 seMessage실행. 엔터부르면 hadleEnter실행.
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      handleEnter(sender, message);
    }
  };
  return (
    <div className={"chat-box"}>
      <div className="header">
        유저이름 :
        <input
          style={{ flex: 1 }}
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      </div>
      <div className={"contents"}>
        {contents.map((msg) => (
          <div>
            {" "}
            {msg.sender} : {msg.content}{" "}
          </div>
        ))}
      </div>
      <div>
        <input
          placeholder="input your messages..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={onCheckEnter}
        />
      </div>
    </div>
  );
};
