import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          < Route path='/' component={NavBar} />
        </div>
      </Router>
    );
  }
}

export default App;
