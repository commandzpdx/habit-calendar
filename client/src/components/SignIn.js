import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      errorMessage: '',
      password: '',
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/user/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then((json) => {
        if (json.token) {
          this.setState({
            email: '',
            errorMessage: '',
            password: '',
          }, () => {
            // TODO: redirect to main page after signing in was successful and state was updated
            this.props.updateState({
              name: json.name,
              signedIn: true,
              token: json.token,
            });
          });
        } else {
          this.setState({
            errorMessage: json.message,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Sign in:</h1>
        {this.state.errorMessage && (
          <p>{this.state.errorMessage}</p>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="off"
            placeholder="email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="off"
            placeholder="password"
            required
          />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default SignIn;
