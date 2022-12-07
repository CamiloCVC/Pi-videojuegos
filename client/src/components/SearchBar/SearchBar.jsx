import React from "react";
import { useState } from "react";
import { getGamesByName } from "../../actions";
import { useDispatch } from "react-redux";
import "./SearchBar.css"

export default function SearchBar(){
    const [games, setGames] = useState("");
    
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (games !== ""){
            onSearch(games);
            setGames("")
        }
    }
    const onSearch = (games)=>{
        dispatch(getGamesByName(games))
    }
    return(
        <div className="SearchBarCont">
            <input 
            className="input" 
            type="text" 
            placeholder="Search for a game!" 
            value={games} 
            onChange={e => setGames(e.target.value)}/>
            <input 
            className="buttonSubmit" 
            type="submit"    
            value="🔍"
            onClick={(e)=>{handleSubmit(e)}}/>
        </div>
    )
}