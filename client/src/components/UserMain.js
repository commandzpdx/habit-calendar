import React from 'react';
import PropTypes from 'prop-types';

import SpiralCal from './SpiralCal';

export default function UserMain(props) {
  const nameArray = props.name.split(' ');
  const firstName = nameArray[0];
  const months = [0, 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dateArray = new Date().toLocaleDateString().split('/'); // month/dd/yyyy
  const date = `${months[dateArray[0]]} ${dateArray[1]}, ${dateArray[2]}`;

  return (
    <div>
      <h1>Hi {firstName}</h1>
      <h3>didju do your {props.habit
        ? `${props.habit} ${props.habitCategory} today?`
        : `${props.habitCategory} today?`}
      </h3>
      <h3>{date}</h3>
      <div>
        <SpiralCal habitID={props.habitID} />
      </div>
    </div>
  );
}

UserMain.propTypes = {
  name: PropTypes.string.isRequired,
  habit: PropTypes.string.isRequired,
  habitCategory: PropTypes.string.isRequired,
  habitID: PropTypes.string.isRequired,
};
