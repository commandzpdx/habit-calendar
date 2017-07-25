import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserSetUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habitCategory: '',
      habit: '',
      habitID: '',
      error: false,
      redirect: false,
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelection(e) {
    this.setState({ habitCategory: e.target.value });
  }

  handleInput(e) {
    this.setState({ habit: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.habitCategory) {
      this.setState({ error: true });
      return;
    }

    fetch('/api/habits', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      body: JSON.stringify({
        category: this.state.habitCategory,
        habit: this.state.habit,
      }),
    })
      .then(res => res.json())
      .then((json) => {
        this.props.updateState({
          habit: json.habit,
          habitCategory: json.category,
          habitID: json._id,
        }, () => this.setState({ redirect: true }));
      });
  }

  render() {
    // Use this logic to redirect the user after the submit, instead of the history.push method
    if (this.state.redirect) {
      return <Redirect to="/firstname" />;
    }
    return (
      <div>
        <h1>SetUp</h1>
        <form onSubmit={this.handleSubmit}>
          <select id="habit" onChange={this.handleSelection}>
            <option value="" disabled selected>Select habit category</option>
            <option value="Exercise">Exercise</option>
            <option value="Diet">Diet</option>
            <option value="Habit">Habit</option>
            <option value="Chore">Chore</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="habit"
            onChange={this.handleInput}
          />
          <br />
          {this.state.error && (
            <p>Please select a habit category</p>
          )}
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

UserSetUp.propTypes = {
  updateState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default UserSetUp;
