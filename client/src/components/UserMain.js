import React from 'react';
import testSVG from '../assets/spiral_test.svg';

export default function UserMain() {
  return (
    <div>
      <h1>First name</h1>
      <h3>Category</h3>
      <h3>Habit (optional)</h3>
      <div>
        <img src={testSVG}/>
      </div>
    </div>
  );
}
