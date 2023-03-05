// 명령어 입력 필요
// npm install sockjs-client - 클라이언트 측
// npm install sockjs - 서버 측
// cd로 서버 파일 위치 찾은 후 node BoardServer.js

import styles from "./TestBoard.module.css";
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";

function Chat() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  // SocketJS 연결 설정
  useEffect(() => {
    const socket = new SockJS("http://localhost:3000/chat");

    socket.onopen = () => {
      console.log("connected");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessagesList((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log("disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !message) return;

    const newMessage = {
      name: name,
      message: message,
    };

    // SocketJS로 메시지 전송
    const socket = new SockJS("http://localhost:3000/chat");
    socket.send(JSON.stringify(newMessage));

    setMessage("");
  };

  // 스크롤 이동
  const messagesEndRef = React.useRef(null);
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <div>
      {/* 채팅 목록 */}
      <div className={styles.chatcontainer}>
        {messagesList.map((item, index) => (
          <div key={index}>
            <strong>{item.name}: </strong>
            {item.message}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* 메시지 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input type="text" value={name} onChange={handleChangeName} />
        </label>
        <br />
        <label>
          메시지:
          <input type="text" value={message} onChange={handleChangeMessage} />
        </label>
        <br />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}

export default Chat;

// 소켓 안 쓰고 그냥 useState로 입출력하는 코드
// import React from 'react';
// import styles from "./TestBoard.module.css";

// function Chat() {
//     const [message, setMessage] = React.useState("");
//     const [name, setName] = React.useState("");

//     React.useEffect(() => {
        
//     }, []);

//     // 새로운 메시지가 추가될 때마다 자동으로 스크롤을 아래쪽으로 이동
//     const messagesEndRef = React.useRef(null); // useRef를 이용하여 messagesEndRef 변수 생성


//     const handleChangeMessage = (event) => {
//         setMessage(event.target.value);
//     };

//     const handleChangeName = (event) => {
//         setName(event.target.value);
//     };

    

//     return (
//         <div>
//             {/* 채팅 목록 */}
//             <div className={styles.chatcontainer}>

//                 <div ref={messagesEndRef}></div>
//                 {/*<div ref={messagesEndRef}></div>*/} {/* ref 속성을 이용하여 messagesEndRef 변수와 div 요소를 연결 */}
//             </div>

//             {/* 메시지 입력 폼 */}
//             <form>
//                 <label>
//                     이름:
//                     <input type="text" value={name} onChange={handleChangeName} />
//                 </label>
//                 <br />
//                 <label>
//                     메시지:
//                     <input
//                         type="text"
//                         value={message}
//                         onChange={handleChangeMessage}
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">보내기</button>
//             </form>
//         </div>
//     );
// }

// export default Chat;