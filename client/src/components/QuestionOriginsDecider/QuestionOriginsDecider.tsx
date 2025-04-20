// import { Player } from "../../App";
// import ScoreCard from "./ScoreCard/ScoreCard";

import { QuestionOrigins } from "../../App";

// import './ScoreBoard.css'



function QuestionOriginsDecider() {
    return (
        <div>
            { Object.keys(QuestionOrigins).map(origin => (
                <button>{origin}</button>
            ))}
            
            <input 
                // key={index}
                // value={player.name}
                // Two way binding
                // onChange={(e) => { playerConfigurationProps.onPlayerChange(index, {name: e.target.value , score: player.score}) }}
            />
        </div>
    );
}

export default QuestionOriginsDecider;