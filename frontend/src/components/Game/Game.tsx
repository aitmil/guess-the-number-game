import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { startGame, submitGuess } from '../../api/numbers-api';
import css from './Game.module.css';

type GameState = {
  guess: number | string;
  result: string;
  isGameOver: boolean;
};

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    guess: '',
    result: '',
    isGameOver: false,
  });

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const message = await startGame();
        console.log(message);
        setGameState({ guess: '', result: '', isGameOver: false });
      } catch {
        console.error('Failed to start the game');
      }
    };

    initializeGame();
  }, []);

  const handleSubmit = async () => {
    try {
      const guessNumber = Number(gameState.guess);

      if (
        gameState.guess === '' ||
        guessNumber > 100 ||
        guessNumber < 1 ||
        !Number.isInteger(guessNumber)
      ) {
        toast.error('Введіть ціле число від 1 до 100 включно');
        return;
      }

      const result = await submitGuess(guessNumber);

      if (result === 'Число вгадано') {
        toast.success('Ви вгадали число! Почніть нову гру.');
        setGameState({ guess: '', result, isGameOver: true });
      } else {
        setGameState({ guess: '', result, isGameOver: false });
      }
    } catch {
      console.error('Failed to submit the guess');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState({ ...gameState, guess: e.target.value });
  };

  const handleRestart = async () => {
    try {
      const message = await startGame();
      console.log(message);
      setGameState({ guess: '', result: '', isGameOver: false });
    } catch {
      console.error('Failed to restart the game');
    }
  };

  return (
    <>
      <div className={css.gameContainer}>
        <input
          className={css.guessInput}
          value={gameState.guess}
          onChange={handleChange}
          placeholder="Введіть ваше число"
          disabled={gameState.isGameOver}
        />
        <button
          type="submit"
          className={css.submitButton}
          onClick={handleSubmit}
          disabled={gameState.isGameOver}
        >
          Вгадати!
        </button>
        <div className={css.result}>{gameState.result}</div>
        {gameState.isGameOver && (
          <button className={css.restartButton} onClick={handleRestart}>
            Почати знову
          </button>
        )}
      </div>
      <Toaster
        toastOptions={{
          style: {
            textAlign: 'center',
          },
        }}
      />
    </>
  );
};
