import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserSetUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habitCategory: '',
      habit: '',
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelection(e) {
    this.setState({ habitCategory: e.target.value });
    // this.props.updateState({ habitCategory: e.target.value });
  }

  handleInput(e) {
    this.setState({ habit: e.target.value });
    // this.props.updateState({ habit: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

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
      }, () => this.props.history.push('/firstname'));
    });
  }

  render() {
    return (
      <div>
        <h1>SetUp</h1>
        <form onSubmit={this.handleSubmit}>
          <select id="habit" onChange={this.handleSelection}>
            {/* TODO: make a default unselectable option  */}
            <option value="Exercise">Exercise</option>
            <option value="Diet">Diet</option>
            <option value="Habit">Habit</option>
            <option value="Chore">Chore</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="habit"
            onChange={this.handleInput}
          />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

UserSetUp.propTypes = {
  updateState: PropTypes.func.isRequired,
  // history: PropTypes.obj.isRequired,
};

export default UserSetUp;
