import React, {useState, useContext} from 'react'
import axios from 'axios'

import AuthContext from '../../store/authContext'
// state value to keep track of if they're registering or logging
// state values to keep track of their auth data as they enter it into the form
// Two forms to collect auth data (register & login)
// onclick handlers to update the state values
// axios.post to register or login, sending the user data on body

const Auth = () => {
  const [register, setRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [activisionId, setActivisionId] = useState('')

  const authCtx = useContext(AuthContext)

  const handleAuth = (e) => {
    e.preventDefault()
    const body = {username, password, email, activisionId}
    axios.post(`${register ? `/register` : '/login'}`, body)
      .then(res => {
        console.log(res.data)
        console.log(authCtx)
        const {token, exp, userId, email, activisionId, username} = res.data
        authCtx.login(token, exp, userId, email, activisionId, username)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Welcome to our site! {register ? 'Register' : "Login"} below!</h1>
      {register ? (
        <div>
          <form onSubmit={e => handleAuth(e)}>
            <input placeholder='username' onChange={e => setUsername(e.target.value)} value={username}/>
            <input placeholder='password' onChange={e => setPassword(e.target.value)} value={password}/>
            <input placeholder='email' onChange={e => setEmail(e.target.value)} value={email}/>
            <input placeholder='activision Id' onChange={e => setActivisionId(e.target.value)} value={activisionId}/>
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={e => handleAuth(e)}>
            <input placeholder='username' onChange={e => setUsername(e.target.value)} value={username}/>
            <input placeholder='password' onChange={e => setPassword(e.target.value)} value={password}/>
            <button>Submit</button>
          </form>
        </div>
      )}

      <button onClick={() => setRegister(!register)}>{register ? "Login": "Register"}</button>
    </div>
  )
}

export default Auth