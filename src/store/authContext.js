import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer

const AuthContext = createContext({
    token: '', 
    login: () => {},
    logout: () => {},
    userId: null, 
    email: null, 
    activisionId: null,
    username: null
})

const calculateRemaining = (exp) => {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}

const getLocalData = () => {
    const storedToken = localStorage.getItem('token')
    const storedExp = localStorage.getItem('exp')
    const storedUserId = localStorage.getItem('userId')
    const storedEmail = localStorage.getItem('email')
    const storedActivisionId = localStorage.getItem('activisionId')
    const storedUsername = localStorage.getItem('username')

    const remainingTime = calculateRemaining(storedExp)

    if( remainingTime <= 1000 * 60 * 30){
        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('activisionId')
        localStorage.removeItem('username')
        return null
    }
    
    return {
        token: storedToken,
        duration: remainingTime,
        userId: storedUserId,
        email: storedEmail,
        activisionId: storedActivisionId,
        username: storedUsername
    }
}

export const AuthContextProvider = (props) => {
    let localData = getLocalData()

    let initialToken
    let initialUserId
    let initialEmail
    let initialActivisionId
    let initialUsername

    if(localData){
        initialToken = localData.token
        initialUserId = localData.userId
        initialEmail = localData.email
        initialActivisionId = localData.activisionId
        initialUsername = localData.username
    }


    const [userId, setUserId] = useState(initialUserId)
    const [token, setToken] = useState(initialToken)
    const [email, setEmail] = useState(initialEmail)
    const [activisionId, setActivisionId] = useState(initialActivisionId)
    const [username, setUsername] = useState(initialUsername)

    const logout = useCallback(() => {
        setUserId(null)
        setToken(null)
        setEmail(null)
        setActivisionId(null)
        setUsername(null)

        localStorage.removeItem('token')
        localStorage.removeItem('expTime')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('activisionId')
        localStorage.removeItem('username')

        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const login = (token, exp, userId, email, activisionId, username) => {
        setUserId(+userId)
        setToken(token)
        setEmail(email)
        setActivisionId(activisionId)
        setUsername(username)

        localStorage.setItem('token', token)
        localStorage.setItem('userId', +userId)
        localStorage.setItem('email', email)
        localStorage.setItem('activisionId', activisionId)
        localStorage.setItem('username', username)
        localStorage.setItem('exp', exp)

       const remainingTime = calculateRemaining(exp)

        logoutTimer = setTimeout(logout, remainingTime)
        
    }

    useEffect(() => {
        if(localData){
            logoutTimer = setTimeout(logout, localData.duration)
        }
    })


    const contextValue = {
        token, 
        userId,
        email,
        username,
        activisionId,
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext