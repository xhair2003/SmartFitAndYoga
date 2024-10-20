import React from "react";
import BackGround from "./BackGround.jsx";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./LandingPage.css";

export default function LandingPage(){

    return (
        <div className="landing-page">
          <Navbar /> 
          <BackGround/>
        </div>
    );
}
