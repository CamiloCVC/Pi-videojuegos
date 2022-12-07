import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import bg from "./2.mp4";

export default function LandingPage() {
  return (
    <div className="landingDiv">
      <video autoPlay loop muted>
        <source src={bg} type="video/mp4" />
      </video>
      <Link to="/home">
        <button className="landingButton">Get started</button>
      </Link>
    </div>
  );
}
