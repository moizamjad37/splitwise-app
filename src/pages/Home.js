import React from 'react'
import { Navbar } from '../navbar/Navbar'
import { MainSection } from '../mainSection/MainSection'
import { OtherSections } from '../otherSection/OtherSections'
import { FeaturesSection } from '../featuresSection/FeaturesSection'
import { NewsPostsSection } from '../newsPostsSection/NewsPostsSection'
import { FooterSection } from '../footerSection/FooterSection'
import FooterPicture from "../images/FooterPicture.png"

export const Home = () => {
  return (
    <>
    <Navbar />
    <MainSection />
    <OtherSections/>
    <FeaturesSection />
    <NewsPostsSection />
    <FooterSection />
    <div className="FooterPictureContainer">
      <img src={FooterPicture} className="FPC-Picture" alt="footer"/>
    </div>
    </>
  )
}
