import React, { Component } from 'react';

import Header from './components/Header.jsx';
import TodoList from './components/TodoList.jsx';
import BoardGame from './components/BoardGame/BoardGame';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TodoList />
        <BoardGame />
      </div>
    );
  }
}

export default App;
