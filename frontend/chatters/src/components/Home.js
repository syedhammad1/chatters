import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
const Home = ({ socket }) => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        // localStorage.setItem("userName", name)
        console.log("THIS HITS")
        // socket.emit("newUser", { name, socketID: socket.id })
        axios.post(`http://localhost:3009/users/create`, { name, email })
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err.message, "SHOW THIS ERROR")
            })
        navigate("/chat")
    }
    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Sign in to Open Chat</h2>
            <label htmlFor="username">Name</label>
            <input type="text"
                minLength={6}
                name="name"
                id='name'
                className='username__input'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label htmlFor="username">Email</label>
            <input type="text"
                minLength={6}
                name="email"
                id='email'
                className='username__input'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button className='home__cta'>Guest Log IN</button>


        </form>
    )
}

export default Home