import { Player } from "../../App";
import ScoreCard from "./ScoreCard/ScoreCard";

import './ScoreBoard.css'

interface ScoreBoardProps {
    players: Player[];
    currentPlayerInd: number;
}


function ScoreBoard({players, currentPlayerInd = 0} : ScoreBoardProps) {
    return (
        <div>
            { players.map((p, i) => {
                    if (i === currentPlayerInd) {
                        return (
                            <div className="current-player-highlight">
                                <ScoreCard player={p} />
                            </div>                            
                        )
                    }
                    return <ScoreCard player={p} />
                })}
        </div>
    );
}

export default ScoreBoard;