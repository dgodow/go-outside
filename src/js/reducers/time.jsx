'use strict';

import {
	WORK_DURATION,
	BREAK_DURATION,
	EAT_DURATION,
	START_TIME
} from '../constants';

const initialState = {
  workDuration: (1000 * 10),
  breakDuration: (1000 * 10),
  eatDuration: (1000 * 10),
  startTime: 0
};

export default (state = initialState, action) => {
	let newState = Object.assign({}, state);

	switch (action.type){
		case WORK_DURATION:
			newState.workDuration = action.workDuration;
			break;

		case BREAK_DURATION:
			newState.breakDuration = action.breakDuration;
			break;

		case EAT_DURATION:
			newState.eatDuration = action.eatDuration;
			break;

		case START_TIME:
			newState.startTime = action.startTime;
			break;

		default:
			break;
	}
	return newState;
};
