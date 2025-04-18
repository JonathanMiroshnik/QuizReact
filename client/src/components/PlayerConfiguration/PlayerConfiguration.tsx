import './PlayerConfiguration.css'

interface PlayerConfigurationProps {
    players: Array<string>;
    addPlayer: () => void;
}

function PlayerConfiguration(playerConfigurationProps: PlayerConfigurationProps) {
    return (
        <div>
            <h1> Players: </h1>            
            <em> Total: { playerConfigurationProps.players.length } </em>
            { playerConfigurationProps.players.map((player, index) => (
                <input 
                    key={index}
                    value={player}
                    // onChange={(e) => {/* Handle input changes */}}
                />
            ))}
            <button onClick={playerConfigurationProps.addPlayer}> + </button>
        </div>
    );
}

export default PlayerConfiguration;