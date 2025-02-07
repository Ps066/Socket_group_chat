import React from 'react'
import './message.css'

const Message = ({message , classs, user, type}) => {
    if(type){
        return(
            <div className="msgInfoBox">
                <div className="msgInfo">{message}</div>
            </div>
        )
    }else{
        if(user){
            return (
                <div className={`messageBox ${classs}`}>
                    <div className="msgSender">
                        {user}
                    </div>
                    {message}
                </div>
              )
        }else{
            return (
                <div className={`messageBox ${classs}`}>
                    <div className="msgSender">
                        You
                    </div>
                    {message}
                </div>
            )
        }


        
    }


  
}

export default Message