import React, { useState, useRef, useForm } from "react";
import { useAuth } from "./login";
import { AuthProvider } from "./login";

export function LoginForm() {
  const { signUp, signIn } = useAuth();
  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  const signUpEmailRef = useRef()
  const signUpPasswordRef = useRef()
  const signUpPasswordConfirmRef = useRef()

  const [accountError, setAccountError] = useState("")
  const [accountLoading, setAccountLoading] = useState(false)

  

  
  const [isOpen, setIsOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  async function signupSubmit(e) {
    e.preventDefault()

    if (
        signUpPasswordConfirmRef.current.value !== signUpPasswordConfirmRef.current.value
    ) {
        return setAccountError("passwords do not match")
    }


    try {
        setAccountError("")
        setAccountLoading(true)
        const sign = await signUp(
            signUpEmailRef.current.value,
            signUpPasswordRef.current.value
        );
        // await userProfile(sign.user)
    } catch (err) {
        if (err.code === "auth/email-already-in-use") {
            const email = signUpEmailRef.current.value;
            // setType("login")
            loginEmailRef.current.value = email;
            loginPasswordRef.current.value = "";
            setAccountError("Email already in use");
            return;
        }
        console.log(err);
        return setAccountError("failed to signup")
    } finally {
        setAccountLoading(false);
    }

  }



  async function loginSubmit(e) {
    e.preventDefault();
    const emailRef = loginEmailRef.current.value;
    const passwordRef = loginPasswordRef.current.value;
    if(!emailRef || !passwordRef) {
        return setAccountError("Enter an email and password");
    }
    try {
        setAccountError("")
        setAccountLoading(true);
        await signIn(emailRef, passwordRef);
    } catch (err) {
        console.log(err.code)
        if(err.code === "auth/wrong-password") {
            setAccountError("incorrect password")
            loginPasswordRef.current.value = ""
            return;
        }
        if (err.code === "auth/user-not-found") {
            setAccountError("user does not exist")
            return;
        }
        return setAccountError("user does not exist with that email")
    } finally {
        setAccountLoading(false);
    }

  }


//   return (
//     // <header>
        
//     // </header>
//   )



  if (isOpen === true) {
    if (isLogin === true) {
      return (

        
        <div className="log-body">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            close
          </button>

          <h3 className="log-title">Login</h3>
          {accountError ? <p className="account-error">{accountError}</p> : null}
          <form className="login-form" onSubmit={loginSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter your email"
              ref={loginEmailRef}
            ></input>

            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              ref={loginPasswordRef}
            ></input>

            <button className="submit-btn" type="submit">
              Login
            </button>
          </form>

          <button className="form-login" onClick={() => setIsLogin(true)}>
            login
          </button>
          <button className="form-signup" onClick={() => setIsLogin(false)}>
            signup
          </button>
        </div>
      );
      }else{
      return (
        <div className="signup-body">
          <button className="close-btn" onClick={() => setIsOpen(false)}>close</button>

          <h3 className="signup-title">Signup</h3>
          {accountError ? <p className="account-error">{accountError}</p> : null}
          <form className="signup-form" onSubmit={signupSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter your email"
              ref={signUpEmailRef}
            ></input>

            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              ref={signUpPasswordRef}
            ></input>
            <input
              className="form-input"
              type="password"
              placeholder="confirm your password"
              ref={signUpPasswordConfirmRef}
            ></input>

            <button disabled={accountLoading} className="signup-submit" type="submit">signup</button>
          </form>

          <button className="form-login" onClick={() => setIsLogin(true)}>
            login
          </button>
          <button className="form-signup" onClick={() => setIsLogin(false)}>
            signup
          </button>
        </div>
      );
      
    }
    
  }else{
  return <button className="show-card" onClick={() => setIsOpen(true)}>Login/Signup</button>
}
}
