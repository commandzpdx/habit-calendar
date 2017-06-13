import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
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
        this.props.updateState({
          signedIn: true,
          token: json.token,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Sign in:</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            autoComplete="off"
            placeholder="email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
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
