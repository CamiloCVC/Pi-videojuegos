import React from "react";
import Load from "./1.gif";
import "./LoadingPage.css";


export default function Loading() {
  return (
    <div className="LoadingDiv">
      <div class="spinner">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
      <img className="LoadingGif" src={Load} alt="not found" />
    </div>
  );
}
