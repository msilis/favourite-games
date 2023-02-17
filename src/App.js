import "./App.css";
import { useEffect, useState } from "react";
import CardContainer from "./Card_container/card_container";
import Header from "./Header/header";
import AddGame from "./AddGame/addGame";
import EditModal from "./Modal/editModal";

function App() {
  //Keep track of games in gameInfo.json
  const [games, setGames] = useState([]);
  //Keep track of games being added
  const [addGame, setAddGame] = useState(false);
  //Keep track of games bein deleted
  const [deleteGame, setDeleteGame] = useState(false);
  //Edit Modal state
  const [showModal, setShowModal] = useState(false);
  //Grab id of game clicked and put in state for modal to use
  const [gameId, setGameId] = useState(null);
  //Update game state
  const [gameUpdate, setGameUpdate] = useState(false)

  //Run on initial page load and any time addGame, deleteGame, or editGame changes
  useEffect(() => {
    async function getGames() {
      const response = await fetch("/games");
      const result = await response.json();
      const gameArray = result.map((game) => ({
        id: game.id,
        title: game.title,
        description: game.description,
        img_url: game.img_url,
      }));

      setGames(gameArray);
    }
    getGames();
  }, [addGame, deleteGame, gameUpdate]);

  //Handle cancel button being clicked in modal
  function handleCancelClick() {
    setShowModal(false);
  }

  //Handle edit click in CardContainer
  function handleEditClick() {
    setShowModal(true);
  }

  //Handle setting game ID
  function handleGameId(number) {
    setGameId(number);
  }
  

  return (
    <div className="App">
      <Header />
      <CardContainer
        gameList={games}
        addGame={addGame}
        deleteGame={deleteGame}
        setDeleteGame={setDeleteGame}
        showModal={handleEditClick}
        setGameId={handleGameId}
      />
      <AddGame addGameStateSetter={setAddGame} addGameState={addGame} />
      <EditModal
        modalState={showModal}
        cancelClick={handleCancelClick}
        gameId={gameId}
        gameList={games}
        gameUpdate={gameUpdate}
        setGameUpdate={setGameUpdate}
      />
    </div>
  );
}

export default App;
