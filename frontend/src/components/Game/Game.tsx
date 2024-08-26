import React, { useState, useEffect } from 'react';
import { startGame, submitGuess } from '../../api/numbers-api';

type GameState = {
  guess: number | string;
  result: string;
};

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    guess: '',
    result: '',
  });

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const message = await startGame();
        console.log(message);
      } catch {
        console.error('Failed to start the game');
      }
    };

    initializeGame();
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await submitGuess(Number(gameState.guess));
      setGameState({ ...gameState, result });
    } catch {
      console.error('Failed to submit the guess');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({ ...gameState, guess: e.target.value });
  };

  return (
    <div>
      <input type="number" value={gameState.guess} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit Guess</button>
      <div>{gameState.result}</div>
    </div>
  );
};
