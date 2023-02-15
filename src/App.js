import "./App.css";
import { useEffect, useState } from "react";
import CardContainer from "./Card_container/card_container";
import Header from "./Header/header";
import AddGame from "./AddGame/addGame";

function App() {
  /* const games = [] */
  const [games, setGames] = useState([]);
  const [addGame, setAddGame] = useState(false)

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
  }, [addGame]);

  console.log(Object.values(games));

  return (
    <div className="App">
      <Header />
      <CardContainer gameList={games} addGame={addGame}/>
      <AddGame addGameStateSetter={setAddGame} addGameState={addGame}/>
    </div>
  );
}

export default App;
