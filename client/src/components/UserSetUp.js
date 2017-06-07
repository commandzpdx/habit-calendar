import React from 'react';

export default function UserSetUp() {
  return (
    <div>
      <h1>SetUp</h1>
      <form>
        <select>
          <option>Exercise</option>
          <option>Diet</option>
          <option>Habit</option>
          <option>Chore</option>
        </select>
        <br />
        <input type="text" placeholder="habit" />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
