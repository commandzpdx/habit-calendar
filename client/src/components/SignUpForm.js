import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import fetch from '../fetch';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // TODO: should the pw really be in here? As in, it seems vulnerable...
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignUp(e) {
    e.preventDefault();

    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      // TODO: should the pw really be in here? As in, it seems vulnerable...
    };

    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }, () => {
          this.props.updateState({
            name: res.name,
            signedIn: true,
            token: res.token,
          });
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Sign up:</h3>
        <form onSubmit={this.handleSignUp} autoComplete="off" >
          <input
            name="firstName"
            type="text"
            placeholder="first name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          /> <br />
          <input
            name="lastName"
            type="text"
            placeholder="last name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          /> <br />
          <input
            name="email"
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          /> <br />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          /> <br />
          <button type="submit" >submit</button>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  updateState: PropTypes.func.isRequired,
};
