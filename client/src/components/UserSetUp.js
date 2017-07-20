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
  }

  handleSelection(e) {
    this.setState({ habitCategory: e.target.value });
    this.props.updateState({ habitCategory: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>SetUp</h1>
        <form>
          <select id="habit" onChange={this.handleSelection}>
            <option value="Exercise">Exercise</option>
            <option value="Diet">Diet</option>
            <option value="Habit">Habit</option>
            <option value="Chore">Chore</option>
          </select>
          <br />
          <input type="text" placeholder="habit" />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

UserSetUp.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default UserSetUp;
