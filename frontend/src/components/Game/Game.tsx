import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

import { startGame, submitGuess } from '../../api/numbers-api';
import css from './Game.module.css';

type GameState = {
  guess: number | string;
  result: string;
  isGameOver: boolean;
  isError: boolean;
};

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    guess: '',
    result: '',
    isGameOver: false,
    isError: false,
  });

  useEffect(() => {
    const initializeGame = async () => {
      setGameState(prevState => ({ ...prevState, isError: false }));
      try {
        const message = await startGame();
        console.log(message);
      } catch {
        setGameState(prevState => ({ ...prevState, isError: true }));
        toast.error('Не вдалося почати гру. Будь ласка, спробуйте ще раз.');
        console.error('Failed to start the game');
      }
    };

    initializeGame();
  }, []);

  const handleSubmit = async () => {
    setGameState(prevState => ({ ...prevState, isError: false }));
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
        setGameState(prevState => ({
          ...prevState,
          guess: '',
          result,
          isGameOver: true,
        }));
      } else {
        setGameState(prevState => ({
          ...prevState,
          guess: '',
          result,
          isGameOver: false,
        }));
      }
    } catch {
      setGameState(prevState => ({ ...prevState, isError: true }));
      toast.error(
        'Не вдалося надіслати ваше припущення. Будь ласка, спробуйте ще раз.'
      );
      console.error('Failed to submit the guess');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState(prevState => ({ ...prevState, guess: e.target.value }));
  };

  const handleRestart = async () => {
    setGameState(prevState => ({ ...prevState, isError: false }));
    try {
      const message = await startGame();
      console.log(message);
      setGameState(prevState => ({
        ...prevState,
        result: '',
        isGameOver: false,
      }));
    } catch {
      setGameState(prevState => ({ ...prevState, isError: true }));
      toast.error(
        'Не вдалося перезапустити гру. Будь ласка, спробуйте ще раз.'
      );
      console.error('Failed to restart the game');
    }
  };

  const getResultClass = () => {
    if (gameState.result === 'Число вгадано') {
      return css.correct;
    } else if (gameState.result === 'Загадане число більше') {
      return css.higher;
    } else if (gameState.result === 'Загадане число меньше') {
      return css.lower;
    }
    return '';
  };

  return (
    <>
      {/* {gameState.isLoading && <Loader />} */}
      {gameState.isError && (
        <Toaster
          toastOptions={{
            style: {
              textAlign: 'center',
            },
          }}
        />
      )}
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
        <div className={clsx(css.result, getResultClass())}>
          {gameState.result}
        </div>
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
