import { useRef } from "react";
import Button from "../Button/button";
import style from "./addGame.module.css";

export default function AddGame(props) {
  //Refs to grab form input
  const game_name = useRef();
  const game_description = useRef();

  //props for adding game
  let setAddGame = props.addGameStateSetter;
  let addGame = props.addGameState;

  function submitFormHandler() {
    //organise data to send to fetch request
    const data = {
      game_id: Math.floor((Math.random() * 80000) +1), //generate (mostly) random number for game id
      game_name: game_name.current?.value,
      game_description: game_description.current?.value,
    };

    fetch("/add_game", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json)
      .then((info) => {
        console.log(info);
      });

    //Toggle addGame state so component re-renders
    setAddGame(!addGame);
    //Clear inputs on form
    game_name.current.value = "";
    game_description.current.value = "";
  }

  return (
    <div className={style.add_game_container}>
      <h2>Add a game</h2>
      <form className={style.add_game_form}>
        <label>Name of Game</label>
        <input id="game_name" ref={game_name}></input>
        <label>Brief Description</label>
        <input id="game_description" ref={game_description}></input>
        <Button submitForm={submitFormHandler} />
      </form>
    </div>
  );
}
