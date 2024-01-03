import React from 'react'
import facebookIcon from "../images/facebook.png"
import instagramIcon from "../images/instagram.png"
import twitterIcon from "../images/twitter.png"

export const FooterSection = () => {
  return (
    <div className="FooterContainer">
        <div className="FCo-Section1">
            <div className="FCo-S1-P1">
                <ul className="FCo-List1">
                    <p className="FCo-ListTitle1">Splitwise</p>
                    <li className="FCo-ListItems">About</li>
                    <li className="FCo-ListItems">Press</li>
                    <li className="FCo-ListItems">Blog</li>
                    <li className="FCo-ListItems">Jobs</li>
                    <li className="FCo-ListItems">Calculators</li>
                    <li className="FCo-ListItems">API</li>               
                </ul>
            </div>
            
            <div className="FCo-S1-P2">
                <ul className="FCo-List1">
                    <p className="FCo-ListTitle2">Account</p>
                    <li className="FCo-ListItems">Log in</li>
                    <li className="FCo-ListItems">Sign up</li>
                    <li className="FCo-ListItems">Reset password</li>
                    <li className="FCo-ListItems">Settings</li>
                    <li className="FCo-ListItems">Splitwise Pro</li>
                    <li className="FCo-ListItems">Splitwise Pay</li>               
                </ul>
            </div>
            
            <div className="FCo-S1-P3">
                <ul className="FCo-List1">
                    <p className="FCo-ListTitle3">More</p>
                    <li className="FCo-ListItems">Contact us</li>
                    <li className="FCo-ListItems">FAQ</li>
                    <li className="FCo-ListItems">Terms of Service</li>
                    <li className="FCo-ListItems">Privacy Policy</li>           
                </ul>
                <div className="FCo-IconsContainer">
                    <img className="FCo-Icons" src={twitterIcon} alt="Twitter icon" />
                    <img className="FCo-Icons" src={facebookIcon} alt="Facebook icon" />
                    <img className="FCo-Icons" src={instagramIcon} alt="Instagram icon" />
                </div>
            </div>
        </div>

        <div className="FCo-Section2">
            
            <a className="btn btn-google" href="#" title="Google Play">Google Play</a>
            <a href="/" tabIndex="0"><img class="bn46" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"alt="bn45"/></a>
            
        </div>
    </div>
  )
}
