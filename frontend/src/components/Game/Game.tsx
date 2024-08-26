import React, { useState, useEffect } from 'react';
import { startGame, submitGuess } from '../../api/numbers-api';
import css from './Game.module.css';

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
      setGameState({ guess: '', result });
    } catch {
      console.error('Failed to submit the guess');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({ ...gameState, guess: e.target.value });
  };

  return (
    <div className={css.gameContainer}>
      <input
        className={css.guessInput}
        value={gameState.guess}
        onChange={handleChange}
        placeholder="Введіть ваше число"
      />
      <button type="submit" className={css.submitButton} onClick={handleSubmit}>
        Вгадати!
      </button>
      <div className={css.result}>{gameState.result}</div>
    </div>
  );
};
