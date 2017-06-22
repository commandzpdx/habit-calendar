import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    const storageState = localStorage.getItem('app');
    const defaultState = {
      name: '',
      signedIn: false,
      token: '',
    };

    super(props);

    this.updateState = this.updateState.bind(this);

    this.state = (storageState) ? JSON.parse(storageState) : defaultState;
  }

  updateState(newState, callback = null) {
    this.setState(newState, () => {
      localStorage.setItem('app', JSON.stringify(this.state));
      if (callback) callback();
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" render={rest => <NavBar {...rest} signedIn={this.state.signedIn} updateState={this.updateState} />} />
          <Main updateState={this.updateState} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    );
  }
}

export default App;
