import style from "./card_container.module.css";
import editIcon from "../Media/icons8-pencil-30.png";
import deleteIcon from "../Media/icons8-remove-30.png";
import { useState } from "react";

export default function CardContainer(props) {
  const games = props.gameList;
  console.log(games);
  const [deleteGame, setDeleteGame] = useState(false)

  if (
    typeof Object.values(games) === "undefined" ||
    typeof (Object.values(games) === null)
  ) {
    console.log("empty");
  } else {
    console.log(Object.values(games[0]));
  }

  //Handle click on button
  function handleButtonClick(event) {
    console.log(event.target["id"]);
    console.log(event.target.parentNode.parentNode["id"]);
    const gameToDelete = event.target.parentNode.parentNode["id"];
    console.log(gameToDelete)

    if (event.target["id"] === "delete") {
      setDeleteGame(!deleteGame);
      console.log(deleteGame)
      return fetch("/game/" + gameToDelete, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      }).then((response) => console.log(response));
      
    }
    
    
   
  }

  const gameCards = Object.values(games).map((game, index) => {
    return (
      <div key={index} id={game.id} className={style.card_square}>
        <img
          src={game.img_url}
          alt="game thumbnail"
          className={style.thumbnail}
        />
        <h4>{game.title}</h4>
        <p>{game.description}</p>
        <div className={style.buttonContainer} onClick={handleButtonClick}>
          <img
            src={editIcon}
            alt="edit icon"
            id="edit"
            className={style.editIcon}
          />
          <img
            src={deleteIcon}
            alt="delete icon"
            id="delete"
            className={style.deleteIcon}
          />
        </div>
      </div>
    );
  });

  return <div className={style.main_card_container}>{gameCards}</div>;
}
