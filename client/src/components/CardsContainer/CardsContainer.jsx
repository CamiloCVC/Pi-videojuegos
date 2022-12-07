import React from "react";
import Card from "../Card/Card";
import "./CardsContainer.css"

export default function CardsContainer({ AllGames }) {
  return (
    <div className="CardsCont">
      {AllGames.map((g) => {
        return (
          <Card
            key={g.id}
            id={g.id}
            img={g.img}
            name={g.name}
            genres={g.generes}
          />
        );
      })}
    </div>
  );
  
}
