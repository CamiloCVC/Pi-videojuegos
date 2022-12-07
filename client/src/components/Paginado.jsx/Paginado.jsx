import React from "react";
import "./Paginado.css"

export default function Paginado({gamesPerPage,paginado,AllGames}){
    const pageNumber = []

    for(let i = 0; i < Math.ceil(AllGames/gamesPerPage);i++){
        pageNumber.push(i+1)
    }
    return(
        <div className="PagContainer">
            <ul>
                {
                    pageNumber.map(number => {
                        return(
                            <li key={number}>
                                <button className="PageButton" onClick={()=> paginado(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
        
    
}