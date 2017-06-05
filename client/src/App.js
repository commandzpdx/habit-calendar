import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={NavBar} />
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
