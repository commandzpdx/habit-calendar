import React, { Component } from 'react';
import spiralSVG from '../assets/spiral_progress.svg';
import './SpiralCal.css';
import classNames from 'classnames';

export default class SpiralCal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [
        {
          month: 'January',
          monthPathClassName: 'st28',
          monthTextClassName: 'st2 st3 st4',
          dayPathClassName: 'st27',
          dayTextClassName: 'st3 st6',
          current: false,
          monthCircle: {
            pathD: 'M8.6,285.9c0,5.4-4.4,9.8-9.8,9.8s-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8S8.6,280.5,8.6,285.9z',
            textContent: 'jan',
            textTransform: 'matrix(1 0 0 1 -6.5001 288.0145)',
            id: 'jan-circle',
          },
          days: [
            {
              pathD: 'M2.5,253.4c-5.4,0-9.8,4.4-9.8,9.8s4.4,9.8,9.8,9.8s9.8-4.4,9.8-9.8S7.9,253.4,2.5,253.4z',
              textContent: 1,
              textTransform: 'matrix(1 0 0 1 -0.3213 266.4384)',
              id: 'jan-1',
              filled: false,
            },
            {
              pathD: 'M10.3,232.1c-5.4,0-9.8,4.4-9.8,9.8c0,5.4,4.4,9.8,9.8,9.8s9.8-4.4,9.8-9.8S15.7,232.1,10.3,232.1z',
              textContent: 2,
              textTransform: 'matrix(1 0 0 1 7.4785 245.1386)',
              id: 'jan-2',
              filled: false,
            },
          ],
        },
        {
          month: 'December',
          monthPathClassName: 'st1',
          monthTextClassName: 'st2 st3 st4',
          dayPathClassName: 'st0',
          dayTextClassName: 'st5 st6',
          current: false,
          monthCircle: {
            pathD: 'M-173.6,321.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8c5.4,0,9.8,4.4,9.8,9.8S-168.2,321.6-173.6,321.6z',
            textContent: 'dec',
            textTransform: 'matrix(1 0 0 1 -180.1002 314.3097)',
            id: 'dec-circle',
          },
          days: [
            {
              pathD: 'M304.2,113.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8c5.4,0,9.8,4.4,9.8,9.8S309.6,113.6,304.2,113.6z',
              textContent: 30,
              textTransform: 'matrix(1 0 0 1 298.5571 107.0385)',
              id: 'dec-30',
              filled: false,
            },
            {
              pathD: 'M318.3,131.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8s9.8,4.4,9.8,9.8S323.7,131.6,318.3,131.6z',
              textContent: 31,
              textTransform: 'matrix(1 0 0 1 312.6571 125.0386)',
              id: 'dec-31',
              filled: false,
            },
          ],
        },
      ],
    };
    this.clickDayCircle = this.clickDayCircle.bind(this);
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
              {m.days.map((d, dIndex) => {
                return (
                  <g key={d.id} onClick={() => this.clickDayCircle(mIndex, dIndex)}>
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
