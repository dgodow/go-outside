'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import TimeInputForm from './TimeInputForm';
import store from '../store';
import {convertMillisecondsToHM, convertHMToMilliseconds} from '../utils';
import {
  setWorkDuration,
  setBreakDuration,
  setLunchDuration,
  setStartTime
} from '../action-creators/time';



class Settings extends Component {
  constructor(props) {
    super(props);
    const {
      workDuration,
      breakDuration,
      lunchDuration
    } = props.time;
    const workTimeObject = convertMillisecondsToHM(workDuration);
    const workHours = workTimeObject.hours;
    const workMinutes = workTimeObject.minutes;
    const breakTimeObject = convertMillisecondsToHM(breakDuration);
    const breakHours = breakTimeObject.hours;
    const breakMinutes = breakTimeObject.minutes;
    const lunchTimeObject = convertMillisecondsToHM(lunchDuration);
    const lunchHours = lunchTimeObject.hours;
    const lunchMinutes = lunchTimeObject.minutes;
    this.state = {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      notNumberWarning: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.workHoursHandleChange = this.workHoursHandleChange.bind(this);
    this.workMinutesHandleChange = this.workMinutesHandleChange.bind(this);
    this.breakHoursHandleChange = this.breakHoursHandleChange.bind(this);
    this.breakMinutesHandleChange = this.breakMinutesHandleChange.bind(this);
    this.lunchHoursHandleChange = this.lunchHoursHandleChange.bind(this);
    this.lunchMinutesHandleChange = this.lunchMinutesHandleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes
    } = this.state;
    const workDuration = convertHMToMilliseconds(workHours, workMinutes);
    const breakDuration = convertHMToMilliseconds(breakHours, breakMinutes);
    const lunchDuration = convertHMToMilliseconds(lunchHours, lunchMinutes);
    store.dispatch(setWorkDuration(workDuration));
    store.dispatch(setBreakDuration(breakDuration));
    store.dispatch(setLunchDuration(lunchDuration));
    chrome.storage.sync.set({workDuration, breakDuration, lunchDuration}, () => {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  }

  componentDidMount() {
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes
    } = this.state;
    const workDuration = convertHMToMilliseconds(workHours, workMinutes);
    const breakDuration = convertHMToMilliseconds(breakHours, breakMinutes);
    const lunchDuration = convertHMToMilliseconds(lunchHours, lunchMinutes);
    chrome.storage.sync.get({workDuration, breakDuration, lunchDuration}, (storage) => {
      const {workDuration, breakDuration, lunchDuration} = storage;
      store.dispatch(setWorkDuration(workDuration));
      store.dispatch(setBreakDuration(breakDuration));
      store.dispatch(setLunchDuration(lunchDuration));
      const workTimeObject = convertMillisecondsToHM(workDuration);
      const workHours = workTimeObject.hours;
      const workMinutes = workTimeObject.minutes;
      const breakTimeObject = convertMillisecondsToHM(breakDuration);
      const breakHours = breakTimeObject.hours;
      const breakMinutes = breakTimeObject.minutes;
      const lunchTimeObject = convertMillisecondsToHM(lunchDuration);
      const lunchHours = lunchTimeObject.hours;
      const lunchMinutes = lunchTimeObject.minutes;
      this.setState({
        workHours,
        workMinutes,
        breakHours,
        breakMinutes,
        lunchHours,
        lunchMinutes,
      });
    });
  }

  workHoursHandleChange(event) {
    let workHours = +event.target.value;
    const notNumberWarning = isNaN(workHours);
    if (notNumberWarning) workHours = this.state.workHours;
    this.setState({workHours, notNumberWarning});
  }

  workMinutesHandleChange(event) {
    let workMinutes = +event.target.value;
    const notNumberWarning = isNaN(workMinutes);
    if (notNumberWarning) workMinutes = this.state.workMinutes;
    this.setState({workMinutes, notNumberWarning});
  }

  breakHoursHandleChange(event) {
    let breakHours = +event.target.value;
    const notNumberWarning = isNaN(breakHours);
    if (notNumberWarning) breakHours = this.state.breakHours;
    this.setState({breakHours, notNumberWarning});
  }

  breakMinutesHandleChange(event) {
    let breakMinutes = +event.target.value;
    const notNumberWarning = isNaN(breakMinutes);
    if (notNumberWarning) breakMinutes = this.state.breakMinutes;
    this.setState({breakMinutes, notNumberWarning});
  }

  lunchHoursHandleChange(event) {
    let lunchHours = +event.target.value;
    const notNumberWarning = isNaN(lunchHours);
    if (notNumberWarning) lunchHours = this.state.lunchHours;
    this.setState({lunchHours, notNumberWarning});
  }

  lunchMinutesHandleChange(event) {
    let lunchMinutes = +event.target.value;
    const notNumberWarning = isNaN(lunchMinutes);
    if (notNumberWarning) lunchMinutes = this.state.lunchMinutes;
    this.setState({lunchMinutes, notNumberWarning});
  }

  render() {
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      notNumberWarning
    } = this.state;

    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <TimeInputForm
            category={'Work'}
            hours={workHours}
            minutes={workMinutes}
            hoursHandleChange={this.workHoursHandleChange}
            minutesHandleChange={this.workMinutesHandleChange}
          />
          <TimeInputForm
            category={'Break'}
            hours={breakHours || 0}
            minutes={breakMinutes || 0}
            hoursHandleChange={this.breakHoursHandleChange}
            minutesHandleChange={this.breakMinutesHandleChange}
          />
          <TimeInputForm
            category={'Lunch'}
            hours={lunchHours || 0}
            minutes={lunchMinutes || 0}
            hoursHandleChange={this.lunchHoursHandleChange}
            minutesHandleChange={this.lunchMinutesHandleChange}
          />
          {notNumberWarning ? (<h3>Numbers only, please!</h3>) : <h3 className="col-xs-1"></h3>}
          <button type="submit" className="btn btn-primary">Change Schedule</button>
        </form>
      </div>
    );
  }
}

const mapState = ({time}) => ({time});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
