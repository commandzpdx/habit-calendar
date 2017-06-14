import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import Home from './Home';
import UserMain from './UserMain';
import UserSetUp from './UserSetUp';

// TODO: replace /firstname with /:firstname when backend is connected
function Main(props) {
  return (
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" render={rest => <SignIn {...rest} updateState={props.updateState} />} />
      <Route exact path="/firstname" component={UserMain} />
      <Route exact path="/setup" component={UserSetUp} />
    </main>
  );
}

Main.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default Main;
