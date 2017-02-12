import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {TestableTimer} from '../../src/js/components/Timer';
import Donut from '../../src/js/components/Timer/Donut';
import statusReducer from '../../src/js/reducers/status';
import * as types from '../../src/js/constants';

const minute = 60000;

describe('<Timer>', () => {

	let timerSpy, testStore, action

	beforeEach('Create component and spy', () => {
		testStore = createStore(statusReducer);
		action = {type: 'give me your tired, your hungry, your global states yearning to be hydrated'};
		testStore.dispatch(action);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
	});

	it('has the expected props', () => {
		const status = {
		  timeRemaining: 0,
		  isWorking: false,
		  isPaused: true,
		  durations: {
		    workDuration: 25 * minute,
		    breakDuration: 5 * minute,
		    lunchDuration: 60 * minute,
		    nuclear: false
		  }
		};
		expect(timerSpy.props().status).to.be.deep.equal(status);
	});

	it('renders a play button when paused', () => {
		const arrayOfPlayButtons = timerSpy
			.dive().find('.fa-play');
		expect(arrayOfPlayButtons).to.have.length(1);
	});

	it('renders the appropriate buttons when timer is going and user is on break', () => {
		const unPauseAction = {type: types.TOGGLE_PAUSE};
		testStore.dispatch(unPauseAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const arrayOfPauseButtons = timerSpy
			.dive().find('.fa-pause');
		const arrayOfAddFiveMinutesButtons = timerSpy
			.dive().find('.fa-history');
		const arrayOfWorkButtons = timerSpy
			.dive().find('.fa-suitcase');
		expect(arrayOfPauseButtons).to.have.length(1);
		expect(arrayOfAddFiveMinutesButtons).to.have.length(1);
		expect(arrayOfWorkButtons).to.have.length(1);
	});

	it('renders the appropriate buttons when timer is going and user is on work', () => {
		const onWorkAction = {type: types.START_WORK};
		testStore.dispatch(onWorkAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const arrayOfPauseButtons = timerSpy
			.dive().find('.fa-pause');
		const arrayOfAddFiveMinutesButtons = timerSpy
			.dive().find('.fa-history');
		const arrayOfBreakButtons = timerSpy
			.dive().find('.fa-beer');
		expect(arrayOfPauseButtons).to.have.length(1);
		expect(arrayOfAddFiveMinutesButtons).to.have.length(1);
		expect(arrayOfBreakButtons).to.have.length(1);
	});

	it('renders the right message if timer is paused', () => {
		const message = (
			<div className="timer-message">
        <span>Timer is paused</span>
      </div>
		)
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});

	it('renders the right message if timer is playing and user is on work', () => {
		const onWorkAction = {type: types.START_WORK};
		testStore.dispatch(onWorkAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const message = (
			<div className="timer-message">
        <span>You're on work</span>
      </div>
		)
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});

	it('renders the right message if timer is playing and user is on break', () => {
		const onBreakAction = {type: types.START_BREAK};
		testStore.dispatch(onBreakAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const message = (
			<div className="timer-message">
        <span>You're on break</span>
      </div>
		);
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});

	it('renders a Donut', () => {
		const donut = (
      <Donut
      	status={testStore.getState()}
      	diameter={250}
      	center={10}
      />
    );
		expect(timerSpy.dive().contains(donut))
			.to.equal(true);
	});
});
