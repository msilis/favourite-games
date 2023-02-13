import style from './card_container.module.css';

export default function CardContainer(props){

    const games = props.gameList;
    console.log(games)
    
    console.log(Object.values(games))

    const gameCards = Object.values(games).map((game, index) => {
        return(
        <div key={index}>
            <h4>{game.title}</h4>
            <p>{game.description}</p>
        </div>)
    })
    

    return(
        <div className={style.main_card_container}>
            {gameCards}
        </div>
    )
}