import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import socketIo from 'socket.io-client'
let options = { withCredentials: false, transports: ['websocket'] };
let socket = socketIo.connect('http://localhost:80', options);
const ChatPage = () => {
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        socket.on('connect', () => {
            console.log("CONNECTED socket")
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            // setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    // useEffect(() => {
    //     socket.on("messageResponse", data => setMessages([...messages, data]))
    // }, [socket, messages])

    // useEffect(() => {
    //     socket.on("typingResponse", data => setTypingStatus(data))
    // }, [socket])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className='chat__main'>
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket} userId="63c6a7b7d97b7f3c890c81f0" message="HELLO BROTHER" />
            </div>
        </div>
    )
}

export default ChatPage