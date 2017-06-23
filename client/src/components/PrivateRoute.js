import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import NotFound from './NotFound';

/******* WIP **********************/
// TODO: ISSUE: this component should evaluate if you're signed in
// If you're signed in you should go to a setup or dashboard calendar page
// If you're signed out you should go to the home/signin page
export default class PrivateRoute extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('/api/user/token', { headers: { Authorization: `Bearer ${this.props.token}` } })
    .then(
      (res) => {
        if (res.status === 401) {
          this.props.updateState({
            name: '',
            signedIn: false,
            token: '',
          });
        } else {
          this.props.updateState({
            signedIn: true,
            token: this.props.token,
          });
        }
      },
    );
  }

  render() {
    const { component: PrivateComponent, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (this.props.token ? <PrivateComponent {...props} updateState={rest.updateState} /> : <NotFound />)}
      />
    );
  }
}

PrivateRoute.propTypes = {
  token: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
};
