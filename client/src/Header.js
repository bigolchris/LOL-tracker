import React, { useEffect, useState, useRef} from 'react'
import { LoginForm } from "./UserFrom"
import { useAuth } from './login'
import { auth } from './firebase'



export function Header() {
    const navRef = useRef()
    const { currentUser, signout} = useAuth()
    const [cardOpen, setCardOpen] = useState(false)
    const [cardType, setCardType] = useState(null)
    



    function accountButtonClick(type) {
        setCardOpen(true);
        setCardType(type)
      }
    
      function signOut() {
        signout(auth);
      }
    
      function renderButtons() {
        if(currentUser) {
            return (
                <div className="btn-group">
                    <button className="from-btn signout" onClick={signOut}>Signout</button>
                </div>
            )
        } else {
            // return (
            //     <div className="btn-group">
            //         <button className="form-btn lgin" onClick={() => accountButtonClick("login")}>
            //             login
            //         </button>
            //         <button className="btn-group" onClick={() => accountButtonClick("signup")}>
            //             sign up
            //         </button>
            //     </div>
            // )
        }
      }
    
  return (
    <header>
        <div ref={navRef} className="nav-bar">
            {renderButtons()}
            <LoginForm 
                isOpen={cardOpen}
                setIsOpen={setCardOpen}
                type={cardType}
                setType={setCardType}
            />
        </div>
        {/* <LoginForm></LoginForm> */}
    </header>
  )
}
