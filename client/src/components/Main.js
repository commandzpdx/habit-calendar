import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
      {/* Naving to the path '/firstname' or '/setup' is permitted only if the user is signed in  */}
      <Switch>
        <Route exact path="/" render={rest => <Home {...rest} updateState={props.updateState} />} />
        <Route exact path="/signin" render={rest => <SignIn {...rest} updateState={props.updateState} />} />
        <Route
          exact
          path="/firstname"
          render={rest => (
            props.signedIn
              ? <UserMain {...rest} name={props.name} habitCategory={props.habitCategory} habit={props.habit} />
              : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/setup"
          render={rest => (
            props.signedIn
              ? <UserSetUp {...rest} updateState={props.updateState} token={props.token} />
              : <Redirect to="/" />)}
        />
        {/* default case when the route does not exist */}
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

Main.propTypes = {
  name: PropTypes.string.isRequired,
  habitCategory: PropTypes.string.isRequired,
  habit: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  signedIn: PropTypes.bool.isRequired,
};

export default Main;
