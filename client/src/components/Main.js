import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import Home from './Home';
import UserMain from './UserMain';
import UserSetUp from './UserSetUp';
import NotFound from './NotFound';

// TODO: replace /firstname with /:firstname when backend is connected
function Main(props) {
  return (
    <main>
      <Switch>
        <Route exact path="/" render={rest => <Home {...rest} updateState={props.updateState} />} />
        <Route exact path="/signin" render={rest => <SignIn {...rest} updateState={props.updateState} />} />
        <Route exact path="/firstname" component={UserMain} />
        <Route exact path="/setup" render={rest => <UserSetUp {...rest} updateState={props.updateState} />} />
        {/* default case when the route does not exist */}
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

Main.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default Main;
