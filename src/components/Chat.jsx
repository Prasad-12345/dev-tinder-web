import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

function Chat() {
    const {targetUserId} = useParams()
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const user = useSelector((store) => store.userStore)
    const userId = user?._id

    const fetchChat = async () => {
      const res = await axios.get(BASE_URL+'/chat/'+targetUserId, {withCredentials:true})
      console.log(res?.data?.chat?.messages)
      const data = res?.data?.chat?.messages.map((msg) => {
        return {
          firstName : msg.senderId.firstName,
          lastName : msg.senderId.lastName,
          text : msg.text
        }
      })
      setMessages(data)
    }

    useEffect(() => {
      fetchChat()
    }, [])

    useEffect(() => {
        if(!userId) return
        const socket = createSocketConnection()
        socket.emit("joinChat", {userId, targetUserId})

        socket.on("messageReceived", ({firstName, lastName, text}) => {
            // console.log(firstName + 'message' + text)
            setMessages((messages)=>[...messages, {firstName, lastName, text}])
        })
        return () => {
            socket.disconnect()
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", {firstName : user.firstName, lastName : user.lastName, userId, targetUserId, text : newMessage})
        setNewMessage('')
    }
  return (
    <div className='w-full sm:w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p5 border-b border-gray-600 p-2'>Chat</h1>
      <div className='flex-1 overflow-scroll p-2'>
        {/* display message */}
        {messages.map((msg, index)=>(
            <div className={"chat " + (user.firstName == msg.firstName ? "chat-end" : "chat-start")} key={index}>
                <div className="chat-header">
                    {`${msg.firstName} ${msg.lastName}`}
                    <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
            </div>
        ))}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input type="text" className='bg-amber-50 text-black flex-1 rounder' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
        <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
      </div>
    </div>
  )
}

export default Chat
