import { Player } from "../../App";
import ScoreCard from "./ScoreCard/ScoreCard";

// import './ScoreBoard.css'

function ScoreBoard(players: Player[]) {
    return (
        <div>
            { players.map((p) => {
                <ScoreCard player={p} />
            })}
        </div>
    );
}

export default ScoreBoard;