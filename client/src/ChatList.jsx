import React from 'react'

export const ChatList = ({usuario, mensaje,tiempo,autor}) => {
  return (
    <div className='message' id={usuario === autor ? "you":"other"} >
        <div>
            <div className='message-content'>
                <p>{mensaje}</p>
            </div>
            <div className='message-meta'>
                <p id='time'>{tiempo}</p>
                <p id='author'>{autor}</p>
            </div> 
        </div>
    </div>
  )
}
