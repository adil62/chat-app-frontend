import React, { useEffect, useHooks, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

import './Chat.css'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:5000'  

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    
    socket = io(ENDPOINT)

    setRoom(room)
    setName(name)

    socket.emit('join', { name, room }, ({ error }) => {
      if (error) 
        alert(error)
    })

    return () => {
      socket.emit('disconnect') 

      socket.off() 
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([ ...messages, message ])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log('message is ')
  console.log(message)
  console.log('messages')
  console.log(messages)

  return ( 
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages name={name} messages={messages} />
        <Input 
          sendMessage={sendMessage} 
          setMessage={setMessage} 
          message={message}
        />
      </div>
    </div>
  )  
}

export default Chat