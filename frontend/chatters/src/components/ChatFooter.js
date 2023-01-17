import React, { useState } from 'react'

const ChatFooter = (props) => {
    console.log(props)
    const [message, setMessage] = useState("")
    const handleTyping = () => props.socket.emit("typing", `${localStorage.getItem("userName")} is typing`)

    const handleSendMessage = (e) => {
        e.preventDefault()

        props.socket.emit("send_message",
            {
                userId: props.userId,
                message: props.message,
            }
        )
        setMessage("")
    }
    return (
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    )
}

export default ChatFooter