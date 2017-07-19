import React, { Component } from 'react';
import spiralSVG from '../assets/spiral_progress.svg';
import './SpiralCal.css';
import classNames from 'classnames';

export default class SpiralCal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [],
    };
    this.clickDayCircle = this.clickDayCircle.bind(this);
  }

  componentDidMount() {
    fetch('/api/circles')
      .then(res => res.json())
      .then(circles => this.setState({ circles }));
  }

  clickDayCircle(monthIndex, dayIndex) {
    let currentState = [...this.state.circles];
    currentState[monthIndex].days[dayIndex].filled = !currentState[monthIndex].days[dayIndex].filled;
    this.setState({
      circles: currentState,
    });
  }

  render() {
    return (
      <svg viewBox="-196 -8 565.5 576" style={{ enableBackground: 'new -196 -8 565.5 576' }}>
        {this.state.circles.map((m, mIndex) => {
          return (
            <g key={m.month}>
              <g>
                <path className={m.monthPathClassName} d={m.monthCircle.pathD} />
                <text transform={m.monthCircle.textTransform} className={m.monthTextClassName}>{m.monthCircle.textContent}</text>
              </g>
              {m.dayCircles.map((d, dIndex) => {
                return (
                  <g key={d._id} onClick={() => this.clickDayCircle(mIndex, dIndex)}>
                    <path
                      className={classNames({
                        [m.dayPathClassName]: true,
                        filled: d.filled,
                      })}
                      d={d.pathD}
                    />
                    <text transform={d.textTransform} className={m.dayTextClassName} >{d.textContent}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  }
}
