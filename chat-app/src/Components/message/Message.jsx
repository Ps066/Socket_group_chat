import React from 'react'
import './message.css'

const Message = ({message , classs, user, type}) => {
  return (
    <div className={`messageBox ${classs}`}>
        <div className="msgSender">
            Prashant
        </div>
        {message}
    </div>
  )
}

export default Message