import { useRef } from "react";
import style from "./editModal.module.css";

export default function EditModal(props) {
  //pull in state and functions from outer components
  const modalClassName = props.modalState
    ? style.modalVisible
    : style.modalHidden;
  const cancelClick = props.cancelClick;
  const gameId = props.gameId;
  const gameList = props.gameList;
  const gameUpdate = props.gameUpdate;
  const setGameUpdate = props.setGameUpdate;
  const gameIndex = gameList.findIndex((item) => item.id === Number(gameId));
  const editedName = useRef();
  const editedDescription = useRef();

  //Functions to handle button clicks
  function handleCancelClick() {
    cancelClick();
  }

  function handleSaveClick() {
    console.log("Save clicked");
    console.log(gameList[gameIndex].title);
    const data = {
      game_id: gameId,
      game_name: editedName.current?.value,
      game_description: editedDescription.current?.value,
    };
    fetch("/game", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json)
      .then((info) => console.log(info));
      editedName.current.value = "";
      editedDescription.current.value = "";
      setGameUpdate(!gameUpdate);
      cancelClick()
  }

  return (
    <div className={modalClassName}>
      <div className={style.modalContainer}>
        <h4>Edit Game Info</h4>
        <input placeholder="New name" ref={editedName}></input>
        <input
          placeholder="New Description"
          ref={editedDescription}
        ></input>
        <button
          type="submit"
          onClick={handleSaveClick}
          className={style.modalButton}
        >
          Save
        </button>
        <button
          type="submit"
          onClick={handleCancelClick}
          className={style.modalButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
