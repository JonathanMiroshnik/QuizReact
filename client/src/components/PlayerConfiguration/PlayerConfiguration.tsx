import { Player } from '../../App';

import './PlayerConfiguration.css'

interface PlayerConfigurationProps {
    players: Player[];
    addPlayer: () => void;
    removePlayer: () => void;
    onPlayerChange: (playerInd: number, playerToChangeTo: Player) => void;
}

function PlayerConfiguration(playerConfigurationProps: PlayerConfigurationProps) {
    return (
        <div>
            <h1> Players: </h1>            
            <em> Total: { playerConfigurationProps.players.length } </em>
            { playerConfigurationProps.players.map((player, index) => (
                <input 
                    key={index}
                    value={player.name}
                    // Two way binding
                    onChange={(e) => { playerConfigurationProps.onPlayerChange(index, {name: e.target.value , score: player.score}) }}
                />
            ))}
            <button onClick={playerConfigurationProps.addPlayer}> + </button>
            { playerConfigurationProps.players.length >= 3 &&
                <button onClick={playerConfigurationProps.removePlayer}> - </button> 
            }    
        </div>
    );
}

export default PlayerConfiguration;