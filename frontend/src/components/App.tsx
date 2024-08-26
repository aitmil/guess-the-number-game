import React from 'react';
import { Game } from './Game/Game';
import css from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={css.app}>
      <h1 className={css.header}>Вгадай Число!</h1>
      <Game />
    </div>
  );
};

export default App;
