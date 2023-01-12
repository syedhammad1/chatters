import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
let options = { withCredentials: false, transports: ['websocket'] };
// let socket = io.connect('http://localhost', options);
let socket
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isCorrectUser, setIsCorrectUser] = useState("")
  const [isSignUp, setSignUp] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      console.log("CONNECTED")
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);


  function Login() {
    console.log(email, password)
    setIsCorrectUser(true)
  }
  function SignUp() {
    console.log(email, password)
  }
  function LoginComponent() {
    return (
      <>
        <h2>Login to continue</h2>
        <div>
          <input type="text" placeholder='email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
        </div>
        <div>
          <input type="text" placeholder='password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
        </div>
        <button onClick={() => {
          Login()
          setEmail("")
          setPassword("")
        }}>Login</button>
        <br />

        <a href='#' onClick={() => {
          setSignUp(true)

        }}>Or Sign Up</a>
      </>
    )
  }
  function ChatComponent() {
    return (
      <>
        <h1>Welcome to chat application</h1>
        <button onClick={() => {
          setIsCorrectUser(false)
        }}>Logout</button>
      </>
    )
  }
  function SignUpComponent() {
    return (
      <>
        <h2>Login to continue</h2>
        <div>
          <input type="text" placeholder='email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
        </div>
        <div>
          <input type="text" placeholder='password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
        </div>
        <button onClick={() => {
          SignUp()
          setEmail("")
          setPassword("")
        }}>Sign Up</button>
        <br />
        <a href='#' onClick={() => {
          setSignUp(false)
        }}>Or Log In</a>
      </>
    )
  }
  return (
    <div className="App">
      {isCorrectUser ? ChatComponent() : isSignUp ? SignUpComponent() : LoginComponent()}
    </div>
  );
}

export default App;
