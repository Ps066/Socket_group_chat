import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./chat.css";
import Message from "../message/Message";
import ReactScrollToBottom from 'react-scroll-to-bottom';

let socketInstance;
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
    

    const [isjoined, setIsJoined] = useState(false);
    const [msg, setMsg] = useState("");
    const [id, setId] = useState("");
    const [messages , setMessages] = useState([])

    const sendmsg = () =>{
        const message = msg;
        socketInstance.emit('message', {message, id});
        document.querySelector('.chatInputBox').value = '';
        setMsg('');
    }
  
    useEffect(() => {
      socketInstance = socketIo(ENDPOINT, { transports: ["websocket"] });
  
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
        // Add type inside the existing data object
        const updatedData = { ...data, type: "info" };
        setMessages((prevMessages) => [...prevMessages, updatedData])
        console.log(data.user, data.message);
      });

      socketInstance.on("userJoined", (data) => {
        // Add type inside the existing data object
        const updatedData = { ...data, type: "info" };
        setMessages((prevMessages) => [...prevMessages, updatedData])
        console.log(data.user, data.message);
      });

      
      socketInstance.on("left", (data)=>{
        // Add type inside the existing data object
        const updatedData = { ...data, type: "info" };
        setMessages((prevMessages) => [...prevMessages, updatedData])
        console.log(data.user, data.message);        
      })

      // Cleanup on component unmount
      return () => {
        socketInstance.emit('disconectIt');
        socketInstance.off();
      };
    }, []); // Re-run only when isjoined state changes


    // to handel messages 
    useEffect(()=>{
        socketInstance.on('sendMessage', (data)=>{
            // Add type inside the existing data object
            const updatedData = { ...data, type: "msg" };
            setMessages((prevMessages) => [...prevMessages, updatedData])
            console.log(data.user, data.message, data.id);
        })
    },[])


  return (
    <div className='chatpage'>
      <div className='chatcard'>
        <div className='chatHeader'>
          <div className='chatTitle'>Group Chat</div>
          <div className='chatSubTitle'>3 online</div>
        </div>
        <ReactScrollToBottom className='chatbody' followButtonClassName="mybtn">
            {
                messages.map((m)=>{
                    return <Message message={m.message} user={m.user} type={m.type}/>
                })
            }
        </ReactScrollToBottom>
        <div className='chatInput'>
          <input
            type='text'
            className='chatInputBox'
            placeholder='type your message..'
            onChange={(e)=>{
                setMsg(e.target.value)
            }}
          />
          <button className='sendbutton' onClick={sendmsg}>
            <i className='sendIcon fa-solid fa-paper-plane'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
