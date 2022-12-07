import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, img, name, genres }) {
  return (
    <Link to={`/gamedetail/${id}`}>
      <div class="card">
        <div class="card2">
          <h1 className="gameName">{name}</h1>
          <img className="gameImg" src={img} alt="img" style={{ width: "300px" }} />
          <h2 className="gameGen">Generos: {genres.join(", ")}</h2>
        </div>
      </div>
      {/* <div className="CardCont"></div> */}
    </Link>
  );
}
