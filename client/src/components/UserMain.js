import React from 'react';
import PropTypes from 'prop-types';

import SpiralCal from './SpiralCal';

export default function UserMain(props) {
  const nameArray = props.name.split(' ');
  const firstName = nameArray[0];

  return (
    <div>
      <h1>Hi {firstName}</h1>
      <h3>didju do your {props.habit
        ? <h3>{props.habit} {props.habitCategory} today?</h3>
        : <h3>{props.habitCategory} today?</h3>}
      </h3>
      <div>
        <SpiralCal />
      </div>
    </div>
  );
}

UserMain.propTypes = {
  name: PropTypes.string.isRequired,
  habit: PropTypes.string.isRequired,
  habitCategory: PropTypes.string.isRequired,
};
