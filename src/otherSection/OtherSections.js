import phone from "../images/phone.png"
import phone2 from "../images/phone2.png"
import phone3 from "../images/phone3.png"
import phone4 from "../images/phone4.png"
import phone5 from "../images/phone5.png"
import { Link } from "react-router-dom"

export const OtherSections = () => {
  return (
    <>
    <div className="SecondarySection">

        <div className="SS-Section1">         
          <h1 className="SS-title">Track balances</h1>
          <p className="SS-text">Keep track of shared expenses, balances, and whoowes who.</p>
          <div className="phoneContainer">
            <img className="phoneImage" alt="Phone" src={phone} />
          </div>
        </div>
        
        <div className="SS-Section2">
          <h1 className="SS-title">Organize expenses</h1>
          <p className="SS-text">Split expenses with any group: trips, housemates, friends, and family.</p>
          <div className="phoneContainer">
            <img className="phoneImage" alt="Phone2" src={phone2} />
          </div>
        </div>  

    </div>


    <div className="TertiarySection">
        
        <div className="TS-Section1">
          <h1 className="TS-title">Add expenses easily </h1>
          <p className="TS-text">Quickly add expenses on the go before you forget who paid.</p>
          <div className="phoneContainer">
            <img className="phoneImage" alt="Phone3" src={phone3} />
          </div>
        </div>
        
        <div className="TS-Section2">
          <h1 className="TS-title">Pay friends back </h1>
          <p className="TS-text">Settle up with a friend and record any cash or online payment.</p>
          <div className="phoneContainer">
            <img className="phoneImage" alt="Phone4" src={phone4} />
          </div>
        </div>
      
    </div>


    <div className="QuaternarySection">
        
        <div className="QS-Section1">
          <h1 className="QS-title">Get even more with PRO</h1>
          <p className="QS-text">Get even more organized with receipt scanning, charts and graphs, currency conversion, and more!</p>
          <div className="QS-buttonContainer">
          <Link to="/signup" className="QS-SignupButton">Sign up</Link>
          </div>
        </div>
        
        <div className="QS-Section2">
          <div className="QS-phoneContainer">
            <img className="QS-phoneImage" alt="Phone5" src={phone5} />
          </div>
        </div>
      
      </div>

    </>
  )
}
