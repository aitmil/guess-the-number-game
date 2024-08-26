import React from 'react';
import { Game } from './Game/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Guess the Number Game</h1>
      <Game />
    </div>
  );
};

export default App;
