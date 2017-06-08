import React from 'react';
import SpiralCal from './SpiralCal';

export default function UserMain() {
  return (
    <div>
      <h1>First name</h1>
      <h3>Category</h3>
      <h3>Habit (optional)</h3>
      <div>
        <SpiralCal />
      </div>
    </div>
  );
}
