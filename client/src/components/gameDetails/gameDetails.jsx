import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGameById, loaded } from "../../actions";
import Loading from "../Loading/LoadingPage";
import "./gameDetails.css";

export default function GameDetails() {
  const game = useSelector((state) => state.gameByid);
  const Loaded = useSelector((state) => state.loaded);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(loaded());
    await dispatch(getGameById(id));
    dispatch(loaded());
  }, [dispatch]);

  if (game.length && Loaded) {
    return (
      <div className="comtainerDetails">
        <div
          className="backgroundDetails"
          style={{ backgroundImage: `url(${game[0].img})` }}
        ></div>
        <div className="content">
          <div className="titleDet">
            <h1>{game[0].name}</h1>
          </div>
          <div className="imageDet">
            <img src={game[0].img} alt="F" style={{ maxWidth: "400px" }} />
          </div>
          <div className="descriptionDet">
            <p>{game[0].description}</p>
          </div>
          <div className="dataDet">
            <p>Release date: {game[0].release}</p>
            <p>Rating: {game[0].rating}</p>
            <p>Platforms: {game[0].platforms.join(", ")}</p>
            <p>Genders: {game[0].generes.join(", ")}</p>
          </div>
          <div>
            <Link to="/home">
              <button className="volverBut">
                <span class="button_top"> Volver</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
