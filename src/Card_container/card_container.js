import style from './card_container.module.css';

export default function CardContainer(props){

    const games = props.gameList;
    console.log(games)
    
    if(typeof (Object.values(games)) === 'undefined' || typeof (Object.values(games) === null )){
        console.log('empty')
    }else {
        console.log(Object.values(games[0]))
    }
    

    const gameCards = Object.values(games).map((game, index) => {
        return(
        <div key={index} className={style.card_square}>
            <img src={game.img_url} alt='game thumbnail' className={style.thumbnail} />
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