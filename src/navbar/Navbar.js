import React from 'react'
import logo from '../images/logo.png' 
import { Link } from 'react-router-dom'

export const Navbar = () => {
    
  return (
    <nav className="NavbarContainer">
        <header className="Navbar">
            <div className="LeftSection">
                <Link to="/">
                <img className="Logo" href="/" src={logo} alt="Splitwise Logo"></img>
                </Link>
            </div >
            <div className="RightSection">
                <Link to="/login" className="LoginButton"> Log in </Link>
                <Link to="/signup" className="SignupButton"> Sign up </Link>
            </div>
        </header>
    </nav>
  )
}
