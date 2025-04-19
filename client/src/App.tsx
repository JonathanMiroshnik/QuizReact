import { useState } from 'react'

import PlayerConfiguration from './components/PlayerConfiguration/PlayerConfiguration'
import DataFetcher from './components/DataFetcher'
import WinnerOverlay from './components/WinnerOverlay'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// TODO: add unique ID for each player?
export interface Player {
  name: string;
  score: number;
}

const START_PLAYERS: Player[] = [
  {
    name: "Player 1",
    score: 0,
  },
  {
    name: "Player 2",
    score: 0,
  },
];

function App() {
  const [count, setCount] = useState(0)
  // TODO: need to deepcopy Player object too?
  const [players, setPlayers] = useState<Player[]>([...START_PLAYERS]);
  const [gameStarted, setGameStarted] = useState(false);  

  function startGame() {
    // TODO: do I need this if statement if the button is disabled through this anyways?
    if (gameStarted || players.length < 2) {
      return;
    }

    setGameStarted(true);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <DataFetcher /> */}
      <WinnerOverlay 
                isOpen={true} 
                onClose={()=>{}}
            />
      <PlayerConfiguration players={["hi1", "hi2"]} addPlayer={()=>{}} />
      <button onClick={startGame} disabled={gameStarted || players.length < 2}> Start </button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
