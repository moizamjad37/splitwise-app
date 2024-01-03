import LogoFT from "../images/LogoFT.png"
import LogoAH from "../images/LogoAH.png"
import LogoNY from "../images/LogoNY.png"
import LogoHC from "../images/LogoHC.png"
import LogoTI from "../images/LogoTI.png"
import LogoBI from "../images/LogoBI.png"

export const NewsPostsSection = () => {
  return (
    <>
    <div className="NPS-Section1">
      
      <button className="NPS-Items">
        <div className="NPS-text">
          “Fundamental” for tracking finances. As good as WhatsApp for containing awkwardness.
        </div>
        <div className="NPS-logos">
          <img src={LogoFT} alt="FT Logo" className="NPS-logo"/>
        </div>
      </button>

      <button className="NPS-Items">
        <div className="NPS-text">
          Life hack for group trips. Amazing tool to use when traveling with friends! Makes life so easy!!
        </div>
        <div className="NPS-logos">
          <img src={LogoAH} alt="FT Logo" className="NPS-logo"/>
        </div>
      </button>

      <button className="NPS-Items">
        <div className="NPS-text">
          Makes it easy to split everything from your dinner bill to rent.
        </div>
        <div className="NPS-logos">
          <img src={LogoNY} alt="FT Logo" className="NPS-logo"/>
        </div>
      </button>
    </div>


    <div className="NPS-Section2">
      <button className="NPS-Items">
        <div className="NPS-text">
          So amazing to have this app manage balances and help keep money out of relationships. love it!
        </div>
        <div className="NPS-logos">
          <img src={LogoHC} alt="FT Logo" className="NPS-logo"/>
        </div>
      </button>

      <button className="NPS-Items">
        <div className="NPS-text">
         I never fight with roommates over bills because of this genius expense-splitting app
        </div>
        <div className="NPS-logos">
          <img src={LogoBI} alt="FT Logo" className="NPS-logo"/>
        </div>
      </button>

      <button className="NPS-Items">
        <div className="NPS-text">
          I use it everyday. I use it for trips, roommates, loans. I love splitwise.
        </div>
        <div className="NPS-logos">
          <img src={LogoTI} alt="FT Logo" className="NPS-logo"/>
        </div>
      </button>
    </div>
    
    </>
  )
}
