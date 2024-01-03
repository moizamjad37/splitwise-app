import React, { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import {storeUserEmail} from "../slices/userEmailSlice"
import { useDispatch } from 'react-redux'

export const Signup = () => {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const databaseUpdate = () => {
        // add user along with email in database
        db.collection("users").doc(emailRef.current.value).set({
          email: emailRef.current.value,
          name: nameRef.current.value
        })     
        .then(() => {
          console.log(`Collection "${"1"}" created.`);
        })
        .catch((error) => {
          console.error('Error creating collection: ', error);
        });
      }
      

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            databaseUpdate();
            dispatch(storeUserEmail(emailRef.current.value))
            navigate("/dashboard")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false);
    }
  
    return (
    <>
    <div className="formContainer">  
      
      {error && alert(error)}

      <form className="form" onSubmit={handleSubmit}>

      <h1>Sign Up</h1>
        
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

        <input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          ref={nameRef}
          required
        />
        
        <button type="submit" id="submit" disabled={loading}>SUBMIT</button>

      </form>
      </div>

      </>
  )
}
