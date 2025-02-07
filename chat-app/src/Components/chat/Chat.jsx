import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./chat.css";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socketInstance;
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
  const [isjoined, setIsJoined] = useState(false);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [totalUser, setTotalUsers] = useState(0);

  const sendmsg = () => {
    const message = msg;
    socketInstance.emit("message", { message, id });
    document.querySelector(".chatInputBox").value = "";
    setMsg("");
  };

  useEffect(() => {
    socketInstance = socketIo(ENDPOINT, { transports: ["websocket"] });

    socketInstance.on("totalUsers", (count) => {
      setTotalUsers(count); // Set the correct initial count
    });

    // the moment socket is connected
    socketInstance.on("connect", () => {
      // console.log("Connected to socket:", socketInstance.id);
      setId(socketInstance.id);
      if (!isjoined) {
        socketInstance.emit("joined", { user });
        setIsJoined(true);
      }
    });

    // Event listeners after the user has joined
    socketInstance.on("welcome", (data) => {
      // setTotalUsers((user)=>user+1);
      // Add type inside the existing data object
      const updatedData = { ...data, type: true };
      setMessages((prevMessages) => [...prevMessages, updatedData]);
      console.log(data.user, data.message);
    });

    socketInstance.on("userJoined", (data) => {
      // Add type inside the existing data object
      // setTotalUsers((prev) => prev + 1); // Increment user count
      const updatedData = { ...data, type: true };
      setMessages((prevMessages) => [...prevMessages, updatedData]);
      console.log(data.user, data.message);
    });

    socketInstance.on("left", (data) => {
      // setTotalUsers((prev) => Math.max(prev - 1, 1)); // Decrement but prevent going below 1
      // Add type inside the existing data object
      const updatedData = { ...data, type: true };
      setMessages((prevMessages) => [...prevMessages, updatedData]);
      console.log(data.user, data.message);
    });

    // Cleanup on component unmount
    return () => {
      socketInstance.off("totalUsers");
      socketInstance.emit("disconectIt");
      socketInstance.off();
    };
  }, []); // Re-run only when isjoined state changes

  // to handel messages
  useEffect(() => {
    socketInstance.on("sendMessage", (data) => {
      // Add type inside the existing data object
      const updatedData = { ...data, type: false };
      setMessages((prevMessages) => [...prevMessages, updatedData]);
      // console.log(data.user, data.message, data.id);
    });

    return () => {
      socketInstance.off();
    };
  }, []);

  return (
    <div className='chatpage'>
      <div className='chatcard'>
        <div className='chatHeader'>
          <div className='chatTitle'>Group Chat</div>
          <div className='chatSubTitle'>{totalUser} online</div>
        </div>
        <ReactScrollToBottom className='chatbody' followButtonClassName='mybtn'>
          {messages.map((m) => {
            return (
              <Message
                message={m.message}
                user={m.id === id ? "" : m.user}
                type={m.type}
                classs={m.id === id ? "right" : "left"}
              />
            );
          })}
        </ReactScrollToBottom>
        <div className='chatInput'>
          <input
            type='text'
            className='chatInputBox'
            placeholder='type your message..'
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendmsg();
              }
            }}
          />
          <button
            className='sendbutton'
            onClick={(e) => {
              if (msg.trim() !== "") {
                sendmsg();
              }
            }}
          >
            <i className='sendIcon fa-solid fa-paper-plane'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
