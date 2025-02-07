import React, { useState } from 'react'
import './join.css';
import { Link } from 'react-router-dom';

let user;

const Join = () => {
  const [name, setName] = useState('');

  const senduser = ()=>{
    user = name;
  }

  return (
    <div className="joinPage">
      <div className="joinContainer">
        <h2 className='joinHeading'>Join the chat</h2>
        <input type="text" placeholder='Enter your name' className="joinInput" onChange={(e)=>setName(e.target.value)}/>
        <Link onClick={(e)=>!name?e.preventDefault():null} to='/chat'>
          <button className="joinBtn" onClick={senduser}>Join Chat</button>
        </Link>
      </div>
    </div>
  )
}

export default Join
export {user}