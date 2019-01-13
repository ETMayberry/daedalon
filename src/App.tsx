import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { ReactThree } from './ReactThree';

class App extends React.Component {
  public render() {
    const divstyle = {
      height: "100%",
      margin: "0px"
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Daedalon</h1>
        </header>
        <p className="App-intro">
          To get started, run <code>npm start</code> and save to reload.
        </p>
        <div style={divstyle}>
          <ReactThree />
        </div>
      </div>
    );
  }
}

export default App;
