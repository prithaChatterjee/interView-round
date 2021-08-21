import React,{useContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [getusermessage, setgetusermessage] = useState({
        message :'', 
        error: "",
        loading: true
    })

    const [currentUser, setcurrentUser] = useState()

    const signup = (email, password) => {
        setgetusermessage({...getusermessage, loading: true})
        return auth.createUserWithEmailAndPassword(email, password).then(
            response => {
                console.log(response)
                setgetusermessage({...getusermessage, message: response.message, loading: false})
            }
        ).catch(
            error => setgetusermessage({...getusermessage, message: error.message, loading: false})
        )
    }

    const signin = (email, password) => {
        setgetusermessage({...getusermessage, loading: true})
        return auth.signInWithEmailAndPassword(email, password).then(
            response => {
                console.log(response)
                setgetusermessage({...getusermessage, message: response.message, loading: false})}
        ).catch(
            error => {
                console.log(error)
                setgetusermessage({...getusermessage, message: error.message, loading: false})
            }
        )
    }

    const logout = () => {
        auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => 
             setcurrentUser(user)
        )
        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        signup,
        signin,
        logout,
        getusermessage
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
