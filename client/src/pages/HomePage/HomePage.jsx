import React from "react";
import BackGround from "./BackGround.jsx";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./HomePage.css";

export default function LandingPage(){

    return (
        <div className="home-page">
          <Navbar /> 
          <BackGround/>
          <div>
            
          </div>
          <Footer />    
        </div>
    );
}
