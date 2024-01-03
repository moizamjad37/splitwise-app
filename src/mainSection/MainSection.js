import plane from "../images/plane.png"
import house from "../images/house.png"
import heart from "../images/heart.png"
import asterisk from "../images/asterisk.png"
import apple from "../images/apple.png"
import android from "../images/android.png"
import airplane from "../images/airplane.png"
import { Link } from "react-router-dom"

export const MainSection = () => {
  return ( 
  
    <div className="MainSection">
        
        <div className="Section1">
            <h1 className="title">Less stress when sharing expenses <span>on trips.</span></h1>
            
            <div className="outerIconContainer">
                <div className="innerIconContainer">
                    <img className="icons" src={plane} alt="plane" />
                    <img className="icons" src={house} alt="house" />
                    <img className="icons" src={heart} alt="heart" />
                    <img className="icons" src={asterisk} alt="asterisk" />
                </div>
            </div>
            
            <h3 className="text"> Keep track of your shared expenses and balances with housemates, trips, groupd, friends, and family.</h3>
            
            <div className="buttonContainer">
              <Link to="/signup" className="DownlaodButton">Sign up</Link>
            </div>
            
            <p className="logoText">
                Free for <img className="logos" src={apple} alt="apple logo"/> iPhone, <img className="logos" src={android} alt="android logo"/> Android, and Web.
            </p>               
        </div>

        <div className="Section2">
          <img src={airplane} alt="Airplane"/>  
        </div>

    </div>


  )
}
