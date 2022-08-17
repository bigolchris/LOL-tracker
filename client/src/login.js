import {getAuth, onAuthStateChanged}  from './firebase';
import React, {useContext, useState, useEffect} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { database } from './firebase'
import { doc, setDoc } from 'firebase/firestore'


export const AuthContext = React.createContext()

export const useAuth = () => {
    console.log(AuthContext)
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

    const signUp = async (email, password) => {
        let userRef = await createUserWithEmailAndPassword(auth, email, password)
        let docRef = await setDoc(doc(database, "users", userRef.user.uid), {
            email: email,
            favorite: null
        })
        console.log(userRef)
        console.log(typeof userRef.user.uid)
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {setCurrentUser(userCredentials.user)})
        
    }
    const signout = () => {
        return signOut(auth)
    }

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     if(user){
            

    //         const uid = user.uid
    //     }
    // }

 console.log(currentUser)

    const value = {
        currentUser,
        signUp,
        signIn,
        signout,
    }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
