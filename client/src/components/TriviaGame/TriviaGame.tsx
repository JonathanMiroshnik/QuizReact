import { useState } from 'react'

import PlayerConfiguration from '../PlayerConfiguration/PlayerConfiguration'
import WinnerOverlay from '../WinnerOverlay/WinnerOverlay'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import QuestionCard from '../Question/QuestionCard'
import { fetchQuestions, Question } from '../api/questionService'

import './TriviaGame.css'

// TODO: add unique ID for each player?
export interface Player {
  name: string;
  score: number;
}

export enum QuestionOrigins {
  PublicDatabase,
  LLM
}

const QUESTIONS_PER_PLAYER = 3;
const MIN_NUMBER_PLAYERS = 1;
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


function TriviaGame() {
  // TODO: need to deepcopy Player object too?
  const [players, setPlayers] = useState<Player[]>([...START_PLAYERS]);
  const [currentPlayerInd, setCurrentPlayerInd] = useState<number>(0); 
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionInd, setCurrentQuestionInd] = useState<number>(0);

  // const [questionsOrigin, setQuestionsOrigin] = useState<QuestionOrigins>(QuestionOrigins.PublicDatabase);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [winner, setWinner] = useState<Player>();
  const [openWinnerOverlay, setOpenWinnerOverlay] = useState<boolean>(false);

  // TODO: not sure if this is useful
  // useEffect(() => {
  //   preGameSetup();
  // }, []);

  const handleGameStart = async (players: Player[]) => {
    try {
      const questions: Question[] = await fetchQuestions({
        amount: players.length * QUESTIONS_PER_PLAYER
      });

      setQuestions(() => [...questions]);      

    } catch (error) {
      console.error(error);
    }
  };

  function nextPlayer() {
    setCurrentPlayerInd(prevInd => (prevInd + 1) % players.length);
  }

  function onPlayerChange(playerInd: number, playerToChangeTo: Player) {
    if (playerInd >= players.length) {
      return;
    }

    setPlayers(prevPlayers => {
      return prevPlayers.map((player, index) => {
        if (index === playerInd) {
          return { name: playerToChangeTo.name, score: playerToChangeTo.score };
        }
        return player;
      });
    });
  }

  function determineCorrect(answer: boolean) {
    // TODO: maybe this if statement is redundant and confusing.
    if (answer) {
      setPlayers(prevPlayers => {
        return prevPlayers.map((player, index) => {
          if (index === currentPlayerInd) {
            return { ...player, score: player.score + 1 };
          }
          return player;
        });
      });
    }

    nextPlayer();
    nextQuestion();
  }

  function determineWinner() {
    let winnerPlayerInd = 0;
    let highestScore = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].score > highestScore) {
        highestScore = players[i].score;
        winnerPlayerInd = i;
      }
    }

    setWinner(() => players[winnerPlayerInd]);
  }

  function nextQuestion() {
    if (questions.length > currentQuestionInd + 1) {
      setCurrentQuestionInd(prevInd => prevInd + 1);
    }
    else {
      determineWinner();
      setOpenWinnerOverlay(() => true);
      setGameStarted(() => false);
    }
  }


  async function startGame() {
    // TODO: do I need this if statement if the button is disabled through this anyways?
    if (gameStarted || players.length < MIN_NUMBER_PLAYERS) {
      return;
    }

    await handleGameStart(players);
    setGameStarted(true);
  }

  async function preGameSetup() {
    setQuestions([]);
    setCurrentPlayerInd(0);
    setCurrentQuestionInd(0);
    setPlayers(prevPlayers => {
      return prevPlayers.map((player) => {
        return { ...player, score: 0 };
      });
    });
  }


  return (
    <>
      { openWinnerOverlay && 
        <WinnerOverlay winner={winner} setIsOpen={setOpenWinnerOverlay} onClose={preGameSetup} /> 
      }
      {!gameStarted && 
        <PlayerConfiguration players={players} 
        addPlayer={() => setPlayers(prevPlayers => [...prevPlayers, { name: 'Player ' + (players.length+1).toString(), score: 0 }])} 
        removePlayer={() => setPlayers(prevPlayers => [...prevPlayers].slice(0, -1))} 
        onPlayerChange={onPlayerChange} />
      }
      {!gameStarted &&
        <button onClick={startGame} disabled={gameStarted || players.length < MIN_NUMBER_PLAYERS}> Start </button>
      }
      {gameStarted && 
        <ScoreBoard players={players} currentPlayerInd={currentPlayerInd} />
      }
      {gameStarted && questions?.length > 0 && 
        <QuestionCard questionAPIStructure={questions[currentQuestionInd]} onAnswer={determineCorrect} /> 
      }
    </>
  )
}

export default TriviaGame;
