import './App.css';
import { Route , Switch } from "react-router-dom";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage.jsx"
import Home from './components/Home/Home.jsx';
import GameDetails from './components/gameDetails/gameDetails';
import CreateForm from './components/CreateForm/CreateForm';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/gamedetail/:id" component={GameDetails} />
      <Route exact path="/creategame" component={CreateForm}/>
    </div>
  );
}

export default App;
