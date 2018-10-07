import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SnakeBoard from './SnakeBoard.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <SnakeBoard
            width={320}
            height={240}
            fruitExpiration={100}
            fruitSize={18}
            newFruitProbability={0.1}
            snakeSegmentSize={10}
            tickDelay={200}
            initialSnakeSize={6}
          />
        </div>
      </div>
    );
  }
}

export default App;
