import axios from 'axios';

const BASE_URL = 'https://guess-the-number-game-129p.onrender.com/api';

export const startGame = async (): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/start_game`);
    return response.data.message;
  } catch (error) {
    console.error('Error starting the game:', error);
    throw error;
  }
};

export const submitGuess = async (guess: number): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/guess`, { guess });
    return response.data.result;
  } catch (error) {
    console.error('Error submitting the guess:', error);
    throw error;
  }
};
