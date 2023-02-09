import React, { memo, useCallback, useEffect, useState } from 'react'
import { ChatList } from './ChatList';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Chat = ({socket,username,room}) => {
    const [currentMessage,setCurrentMessage]=useState("");
    const [messageList,setMessageList]=useState([]);

    const sendMessage= useCallback(async()=>{
        if(currentMessage !==""){
            const message={
                room:room,
                username:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+
                new Date(Date.now()).getMinutes(),
            }
            setMessageList((list)=>[...list,message])
            await socket.emit("send_message",message)
            setCurrentMessage("")
            
        }
    })

    useEffect(() => {
      socket.on("send_message",(data)=>{
        setMessageList((list)=>[...list,data])
      }) 
      
    }, [socket])
    

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>

          {messageList.map((message,id)=>{
            return <ChatList key={id} usuario={username} mensaje={message.message} tiempo={message.time} autor={message.username} />
          })}
          </ScrollToBottom>
        </div>
        <div className='chat-footer'>
        <input type="text" aria-placeholder='Hey...' 
        value={currentMessage}
        onChange={(e)=>{setCurrentMessage(e.target.value)}}
        onKeyPress={(e)=>{e.key==="Enter" && sendMessage()}}/>

        <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}
