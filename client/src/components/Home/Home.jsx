import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getGenres,
  filterByGenre,
  filterApiDb,
  loaded,
  filterGames,
} from "../../actions";
import CardsContainer from "../CardsContainer/CardsContainer";
import Paginado from "../Paginado.jsx/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/LoadingPage";
import LoadingText from "../LoadingText/LoadingText";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [cardsLoader, setCardsLoader] = useState(true);
  const AllGames = useSelector((state) => state.games);
  const Loaded = useSelector((state) => state.loaded);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;
  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - 15;
  const currentGames = AllGames.slice(indexFirstGame, indexLastGame);

  const paginado = (index) => {
    setCurrentPage(index);
  };

  const genres = useSelector((state) => state.genres);

  const handleClick = async (e) => {
    e.preventDefault();
    setCardsLoader(false);
    await dispatch(getGames());
    setCardsLoader(true);
    for (let i = 1; i <= 3; i++) {
      document.getElementById("my_select" + i).selectedIndex = 0;
    }
    setOrder("");
  };

  // const handleSortByName = async(e) => {
  //   e.preventDefault();
  //   await dispatch(sortByName(e.target.value));
  //   paginado(1);
  //   setOrder(`Order ${e.target.value}`);
  // };

  // const handleSortByRating = async(e) => {
  //   e.preventDefault();
  //   await dispatch(filterByRating(e.target.value));
  //   paginado(1);
  //   setOrder(`Order ${e.target.value}`);
  // };

  const handleFilterByGenre = async (e) => {
    e.preventDefault();
    await dispatch(filterByGenre(e.target.value));
    paginado(1);
    setOrder(`Order ${e.target.value}`);
  };
  const handleFilterByApi = async (e) => {
    e.preventDefault();
    await dispatch(filterApiDb(e.target.value));
    paginado(1);
    setOrder(`Order ${e.target.value}`);
  };
  const handlerOrden = async (e) => {
    setOrder(e.target.value);
    dispatch(filterGames(e.target.value));
    paginado(1);
  };

  useEffect(async () => {
    if (order === "") {
      dispatch(getGenres());
      dispatch(loaded());
      await dispatch(getGames());
      dispatch(loaded());
    } else {
      dispatch(filterGames(order));
    }
  }, [dispatch]);

  if (Loaded === true) {
    return (
      <div className="container">
        <div className="BackgroundImg"></div>
        <div className="HeaderHome">
          <div className="CreateHeader">
            <Link to="/creategame">
              <button className="createButton">Crear Juego</button>
            </Link>
          </div>
          <div className="TitleHeader">
            <h1>VIDEOGAMES</h1>
          </div>
          <div className="SearchHeader">
            <SearchBar paginado={paginado}/>
          </div>
        </div>
        <div className="FiltersContainer">
          <div className="customSelect">
            <select
              id="my_select1"
              onChange={(e) => {
                handleFilterByApi(e);
              }}
            >
              <option value="all">All</option>
              <option value="db">Data Base</option>
              <option value="api">Api</option>
            </select>
          </div>
          <div className="customSelect">
            <select
              id="my_select2"
              onChange={(e) => {
                handlerOrden(e);
              }}
            >
              <option value="-">-</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="higher">Higher Rating</option>
              <option value="lower">Lower Rating</option>
            </select>
          </div>
          <div className="customSelect">
            <select id="my_select3" onChange={(e) => handleFilterByGenre(e)}>
              <option value="All">All</option>
              {genres.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="resetButton"
              type="reset"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Refresh
            </button>
          </div>
        </div>
        <Paginado
          gamesPerPage={gamesPerPage}
          paginado={paginado}
          AllGames={AllGames.length}
        />
        <div className="cardsContainer">
          {cardsLoader === true ? (
            <CardsContainer AllGames={currentGames}/>
          ) : (
            <LoadingText />
          )}
        </div>
      </div>
    );
  } else return <Loading />;
}
