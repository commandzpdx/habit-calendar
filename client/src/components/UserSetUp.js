import React, { Component } from 'react';

class UserSetUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habitCategory: '',
      habit: '',
    };
  }

  render() {
    return (
      <div>
        <h1>SetUp</h1>
        <form>
          <select id="habit">
            <option value={0}>Exercise</option>
            <option value={1}>Diet</option>
            <option value={2}>Habit</option>
            <option value={3}>Chore</option>
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

};

export default UserSetUp;
