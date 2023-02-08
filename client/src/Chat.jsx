import React, { useEffect, useState } from 'react'

export const Chat = ({socket,username,room}) => {
    const [currentMessage,setCurrentMessage]=useState("");

    const sendMessage= async()=>{
        if(currentMessage !==""){
            const message={
                room:room,
                username:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+
                new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message",message)

        }
    }

    useEffect(() => {
      socket.on("send_message",(data)=>{
        console.log(data)
      }) 
      
    }, [socket])
    

  return (
    <div>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer'>
        <input type="text" aria-placeholder='Hey...' 
        value={currentMessage}
        onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
        <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}
