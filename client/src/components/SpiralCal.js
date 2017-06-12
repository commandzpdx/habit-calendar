import React, { Component } from 'react';
import spiralSVG from '../assets/spiral_progress.svg';
import './SpiralCal.css';

export default class SpiralCal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [
        {
          month: 'December',
          pathClassName: 'st0',
          textClassName: 'st2 st3',
          current: false,
          monthCircle: {
            pathD: '',
            text: 'dec',
            id: 'dec-circle',
          },
          days: [
            {
              pathD: 'M318.3,131.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8s9.8,4.4,9.8,9.8S323.7,131.6,318.3,131.6z',
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
  }
  render() {
    return (
      <svg viewBox="-196 -8 565.5 576" style={{ enableBackground: 'new -196 -8 565.5 576' }}>
        <g id="december_circ">
          <g>
            <path className="st0" d="M304.2,113.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8c5.4,0,9.8,4.4,9.8,9.8S309.6,113.6,304.2,113.6z" />
            <text transform="matrix(1 0 0 1 298.5571 107.0385)" className="st5 st6">30</text>
          </g>
          <g onClick={() => { alert('clicked'); } } >
            <path className="st0" d="M318.3,131.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8s9.8,4.4,9.8,9.8S323.7,131.6,318.3,131.6z" />
            <text transform="matrix(1 0 0 1 312.6571 125.0386)" className="st5 st6">31</text>
          </g>
          <g>
            <path className="st1" d="M-173.6,321.6c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8c5.4,0,9.8,4.4,9.8,9.8S-168.2,321.6-173.6,321.6z" />
            <text transform="matrix(1 0 0 1 -180.1002 314.3097)" className="st2 st3 st4">dec</text>
          </g>
        </g>
      </svg>
    );
  }
}
