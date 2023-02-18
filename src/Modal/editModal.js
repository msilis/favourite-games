import { useRef } from "react";
import style from "./editModal.module.css";

export default function EditModal(props) {
  //pull in state and functions from outer components
  const modalClassName = props.modalState
    ? style.modalVisible
    : style.modalHidden;
  const cancelClick = props.cancelClick;
  const gameId = props.gameId;
  const gameUpdate = props.gameUpdate;
  const setGameUpdate = props.setGameUpdate;
  const editedName = useRef();
  const editedDescription = useRef();

  //Functions to handle button clicks
  function handleCancelClick() {
    cancelClick();
  }
  //Handle save button click
  function handleSaveClick() {
    //Organise data to send to put request
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
      //Clear input fields in modal
      editedName.current.value = "";
      editedDescription.current.value = "";
      //Toggle gameUpdate state so component re-renders
      setGameUpdate(!gameUpdate);
      //Trigger cancel function so modal closes
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
