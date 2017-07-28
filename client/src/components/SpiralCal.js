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
    this.saveClick = this.saveClick.bind(this);
    this.updateFill = this.updateFill.bind(this);
  }

  componentDidMount() {
    fetch('/api/circles')
      .then(res => res.json())
      .then(circles => this.setState({ circles }));
  }

  clickDayCircle(monthIndex, dayIndex) {
    const currentState = [...this.state.circles];
    const month = currentState[monthIndex].month;
    let day = currentState[monthIndex].dayCircles[dayIndex].textContent;
    const year = new Date().getFullYear();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(`${month} ${day}, ${year}`);
    const weekday = weekdays[date.getDay()];

    currentState[monthIndex].dayCircles[dayIndex].circleFilled = !currentState[monthIndex].dayCircles[dayIndex].circleFilled;
    console.log(currentState[monthIndex].dayCircles[dayIndex]._id)
    if (currentState[monthIndex].dayCircles[dayIndex].dayId) {  
      this.updateFill(currentState[monthIndex].dayCircles[dayIndex].dayId, currentState[monthIndex].dayCircles[dayIndex].circleFilled)
        .then(() => {
          this.setState({
            circles: currentState,
          });
        });
    } else {
      this.saveClick(
          currentState[monthIndex].dayCircles[dayIndex].circleFilled,
          year,
          weekday,
          currentState[monthIndex].dayCircles[dayIndex]._id,
        )
        .then((json) => {
          currentState[monthIndex].dayCircles[dayIndex]._id = json._id;
          this.setState({
            circles: currentState,
          });
        });
    }
  }

  saveClick(circleFilled, year, weekday, dayCircle, habit) {
    //token check?
    return fetch('/api/days', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        circleFilled,
        year,
        weekday,
        dayCircle,
        //habit,
      }),
    })
    .then(res => res.json());
  }

  updateFill( id, circleFilled) {
    return fetch('/api/days', {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
        id,
        circleFilled,
      }),
    })
    .then(res => res.json());
  }

  render() {
    return (
      <svg viewBox="-196 -8 565.5 576" style={{ enableBackground: 'new -196 -8 565.5 576' }}>
        {this.state.circles.map((m, mIndex) => {
          return (
            <g key={m._id}>
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
                        filled: d.circleFilled,
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
