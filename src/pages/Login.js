import { Navbar } from '../navbar/Navbar'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { storeUserEmail } from '../slices/userEmailSlice'
import { useDispatch } from "react-redux";


export const Login = () => {

    const [displayError, setDisplayError] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            dispatch(storeUserEmail(emailRef.current.value))
            navigate("/dashboard")
        } catch {
            setError("Username or Password incorrect");
            setDisplayError(true);
        }
        setLoading(false);
    }
  
    return (
    <>
    <Navbar />
    <div className="formContainer">  
      
      <form className="form" onSubmit={handleSubmit}>

      <h1>Login</h1>
      {displayError && <div className="error" style={{color: 'red'}}>{error}</div>}
        <input
          type="email"
          placeholder="E-mail Address"
          id="email"
          name="email"
          ref={emailRef}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          ref={passwordRef}
          required
        />
        
        <button type="submit" id="submit" disabled={loading}>SUBMIT</button>

      </form>
      </div>

      </>
  )
}
