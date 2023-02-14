import './App.css';
import { useEffect, useState } from 'react';
import CardContainer from './Card_container/card_container';
import Header from './Header/header';

function App() {

  /* const games = [] */
  const [games, setGames] = useState([])

  useEffect(()=>{
    async function getGames(){
      const response = await fetch('/games');
      const result = await response.json()
      const gameArray = result.map(game => ({
        id: game.id,
        title: game.title,
        description: game.description,
        img_url: game.img_url
      }))
      
      setGames(gameArray)
  
    }
    getGames()
  }, [])

  

  
  console.log(Object.values(games))

  return (
    <div className="App">
      <Header />
      <CardContainer gameList={games}/>
    </div>
  );
}

export default App;
