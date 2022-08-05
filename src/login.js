import getAuth from './firebase';
import React, {useContext, useState, useEffect} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';


export const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return () => unsubscribe
    }, [])

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signout = () => {
        return signOut(auth)
    }

    const value = {
        currentUser,
        signUp,
        signIn,
        signout,
    }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
