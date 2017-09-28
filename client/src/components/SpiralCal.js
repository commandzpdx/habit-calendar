import React, { Component } from 'react';
import classNames from 'classnames';
import './SpiralCal.css';

export default class SpiralCal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: [],
    };

    this.onClickDayCircle = this.onClickDayCircle.bind(this);
    this.createDay = this.createDay.bind(this);
    this.updateDay = this.updateDay.bind(this);
  }

  componentDidMount() {
    fetch(`/api/day-circles?habitId=${this.props.habitID}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((circles) => this.setState({ circles }));
  }

  onClickDayCircle(event) {
    const { monthCircleIndex, dayCircleIndex } = event.target.parentNode.dataset;
    const circles = [...this.state.circles];
    const dayId = circles[monthCircleIndex].dayCircles[dayCircleIndex].day._id;

    if (dayId) {
      const isFilled = !circles[monthCircleIndex].dayCircles[dayCircleIndex].day.isFilled;

      this.updateDay(dayId, isFilled)
        .then((day) => {
          circles[monthCircleIndex].dayCircles[dayCircleIndex].day.isFilled = day.isFilled;

          this.setState({ circles });
        });
    } else {
      const { month } = circles[monthCircleIndex];
      const {
        _id: dayCircleId,
        textContent: day,
      } = circles[monthCircleIndex].dayCircles[dayCircleIndex];
      const year = new Date().getFullYear();
      const date = new Date(`${month} ${day}, ${year}`);
      const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

      this.createDay(year, weekday, dayCircleId, this.props.habitID)
        .then((day) => {
          circles[monthCircleIndex].dayCircles[dayCircleIndex].day = day;

          this.setState({ circles });
        });
    }
  }

  createDay(year, weekday, dayCircle, habit) {
    return fetch('/api/days', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        isFilled: true,
        year,
        weekday,
        dayCircle,
        habit,
      }),
    })
      .then((res) => res.json());
  }

  updateDay(id, isFilled) {
    return fetch(`/api/days/${id}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ isFilled }),
    })
      .then((res) => res.json());
  }

  render() {
    return (
      <svg
        style={{ enableBackground: 'new -196 -8 565.5 576' }}
        viewBox="-196 -8 565.5 576"
      >
        {this.state.circles.map((m, mIndex) => (
          <g key={m._id}>
            <g>
              <path
                className={m.monthPathClassName}
                d={m.monthCircle.pathD}
              />
              <text
                className={m.monthTextClassName}
                transform={m.monthCircle.textTransform}
              >{m.monthCircle.textContent}</text>
            </g>
            {m.dayCircles.map((d, dIndex) => (
              <g
                data-day-circle-index={dIndex}
                data-month-circle-index={mIndex}
                key={d._id}
                onClick={this.onClickDayCircle}
              >
                <path
                  className={classNames({
                    [m.dayPathClassName]: true,
                    filled: d.day.isFilled,
                  })}
                  d={d.pathD}
                />
                <text
                  className={m.dayTextClassName}
                  transform={d.textTransform}
                >{d.textContent}</text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    );
  }
}
