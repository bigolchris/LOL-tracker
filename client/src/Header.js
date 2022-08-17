import React, { useEffect, useState, useRef} from 'react'
import { LoginForm } from "./UserFrom"
import { useAuth } from './login'
import { auth } from './firebase'



export function Header() {
    const navRef = useRef()
    const { currentUser, signout} = useAuth()
    const [cardOpen, setCardOpen] = useState(false)
    const [cardType, setCardType] = useState(null)
    const [formOpen, setFormOpen] = useState(false);
    

    function accountButtonClick(type) {
        setCardOpen(true);
        setCardType(type)
      }
    
      function signOut() {
        signout(auth);
      }
    
      function renderButtons() {
        if(currentUser && !formOpen) {
            return (
                <div className="btn-group">
                    <button className="from-signout" onClick={signOut}>Signout</button>
                </div>
            )
        }
      }
    
  return (
    <header>
        <div ref={navRef} className="nav-bar">
            {renderButtons()}
            <LoginForm setIsFormOpen={setFormOpen}/>
        </div>
        {/* <LoginForm></LoginForm> */}
    </header>
  )
}
