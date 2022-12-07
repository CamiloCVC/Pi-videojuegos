import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogame } from "../../actions";
import { loaded } from "../../actions";
import "./CreateForm.css";

import Loading from "../Loading/LoadingPage";

export default function CreateForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const Loaded = useSelector((state) => state.loaded);
  const generos = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    let error = {};

    if (!data.name) {
      error.name = "Name must be completed";
    }
    if (!data.platforms.length) {
      error.platforms = "Platform must be completed";
    }
    if (!data.description) {
      error.description = "Description must be completed";
    }
    if (!data.genres.length) {
      error.genres = "genres must be completed";
    }
    if (!data.released) {
      error.released = "22/22/2222";
    }
    if (!data.rating) {
      error.rating = 1;
    }
    return error;
  };

  useEffect(async () => {
    dispatch(loaded());
    await dispatch(getGenres());
    dispatch(loaded());
  }, []);

  const platforms = [
    "PC",
    "Linux",
    "Xbox One",
    "PlayStation 5",
    "PlayStation 4",
    "Wii U",
    "Nintendo Switch",
    "macOS",
    "iOS",
    "Nintendo 3DS",
    "Android",
    "Steam Deck",
  ];
  const [data, setData] = useState({
    name: "",
    description: "",
    platforms: [],
    genres: [],
    image: "",
    release: "",
    rating: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const errorsFields = validate(data);
    setErrors(errorsFields);
    if (!Object.keys(errorsFields).length) {
      await dispatch(postVideogame(data));
      setData({
        name: "",
        description: "",
        platforms: [],
        genres: [],
        image: "",
        release: "",
        rating: "",
      });
      alert("se ha creado correctamente!");
      history.push("/home");
    } else {
      alert("Please complete all the camps needed");
    }
  };
  const handlerAddData = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlePlatform = (e) => {
    if (e.target.checked) {
      setData({
        ...data,
        [e.target.name]: [...data.platforms, e.target.value],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: data.platforms.filter((a) => a !== e.target.value),
      });
    }
  };
  const handleGender = (e) => {
    if (e.target.checked) {
      setData({
        ...data,
        [e.target.name]: [...data.genres, e.target.value],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: data.genres.filter((a) => a !== e.target.value),
      });
    }
  };
  if (Loaded) {
    return (
      <div className="createContainer">
        <form className="createForm" onSubmit={(e) => handlerSubmit(e)}>
          <div className="inputsCont">
            <div className="inputTextCont">
              <div>
                <p>Game name </p>
                <input
                  name="name"
                  value={data.name}
                  type="text"
                  onChange={(e) => handlerAddData(e)}
                />
                {errors.name && (
                  <p className="error">{errors.name}</p>
               )}
              </div>
              <div>
                <p htmlFor="">Realease date </p>
                <input
                  name="release"
                  value={data.release}
                  type="date"
                  onChange={(e) => handlerAddData(e)}
                />
              </div>
              <div>
                <p htmlFor="">Rating </p>
                <input
                  name="rating"
                  value={data.rating}
                  type="text"
                  onChange={(e) => handlerAddData(e)}
                />
              </div>
              <div>
                <p htmlFor="">Add image url </p>
                <input
                  name="image"
                  value={data.image}
                  type="text"
                  onChange={(e) => handlerAddData(e)}
                />
              </div>
              <div>
                <p htmlFor="">Description </p>
                <textarea
                  name="description"
                  value={data.description}
                  rows="10"
                  cols="35"
                  onChange={(e) => handlerAddData(e)}
                />
                {errors.description && (
                     <p className="error">{errors.description}</p>
                  )}
              </div>
            </div>

            <div className="checkboxCont">
              <p>Añade plataformas</p>
              {platforms.map((p) => (
                <div>
                  <input
                    type="checkbox"
                    value={p}
                    name="platforms"
                    onChange={(e) => handlePlatform(e)}
                  />
                  <label>{p}</label>
                </div>
              ))}
            </div>
            <div className="checkboxCont">
              <p>Añade generos</p>
              {generos.map((g) => (
                <div>
                  <input
                    type="checkbox"
                    value={g.name}
                    name="genres"
                    onChange={(e) => handleGender(e)}
                  />
                  <label>{g.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="submitDiv">
            <Link to="/home">
              <button type="submit" className="submitBut">
                <span class="button_top"> Volver</span>
              </button>
            </Link>
            <button type="submit" className="submitBut">
              <span class="button_top"> Crear Juego</span>
            </button>
          </div>
        </form>
      </div>
    );
  } else return <Loading />;
}
