import style from "./card_container.module.css";
import editIcon from "../Media/icons8-pencil-30.png";
import deleteIcon from "../Media/icons8-remove-30.png";

export default function CardContainer(props) {
  //props from app component
  const games = props.gameList;
  const setDeleteGame = props.setDeleteGame;
  const editClick = props.showModal;
  const setGameId = props.setGameId;

  //If games array has not been fetched yet, console log value instead of throwing eror
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
    const gameToDelete = event.target.parentNode.parentNode["id"];
    //Check if delete button has been clicked and handle result
    if (event.target["id"] === "delete") {
      //send delete request to API
      fetch("/game/" + gameToDelete, {
        method: "DELETE",
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
      }).then((response) => console.log(response));
      //Set delete state to whatever is opposite of already set state causing rerender of game card component
      setDeleteGame(true);
    } else if (event.target["id"] === "edit") {
      /* console.log(event.target.parentNode.parentNode["id"]) */
      setGameId(event.target.parentNode.parentNode["id"]);
      //Call edit click function to bring up modal
      editClick();
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
