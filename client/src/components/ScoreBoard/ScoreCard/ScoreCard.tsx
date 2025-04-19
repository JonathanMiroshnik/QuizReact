import { Player } from "../../../App";
// import './ScoreCard.css'


function ScoreCard(player: Player) {
    return (
        <div>
            { player ? 
            <>
                <h1> {player.name} </h1>
                <h2>Score:</h2>
                <h2> {player.score} </h2>
            </>
            : null }            
        </div>
    );
}

export default ScoreCard;