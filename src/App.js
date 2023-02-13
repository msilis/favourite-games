import './App.css';
import CardContainer from './Card_container/card_container';
import Header from './Header/header';

function App() {

  const games = []

  async function getGames(){
    const response = await fetch('/games');
    const result = await response.json()
    const gameArray = result.map(game => ({
      id: game.id,
      title: game.title,
      description: game.description,
      img_url: game.img_url
    }))
    
    games.push(gameArray)
  }

  getGames()
  console.log(games)

  return (
    <div className="App">
      <Header />
      <CardContainer gameList={games}/>
    </div>
  );
}

export default App;
