'use strict';

import {
  TOGGLE_WORK,
  RECEIVE_LUNCH_TIME,
  RECEIVE_CURRENT_TIME,
  ADD_FIVE_MINUTES,
  HALT_BACKGROUND,
} from '../constants';

export const toggleWork = isWorking =>
  ({type: TOGGLE_WORK, isWorking});

export const receiveLunchTime = (lunchTime) =>
  ({type: RECEIVE_LUNCH_TIME, lunchTime});

export const receiveCurrentTime = (currentTime) =>
  ({type: RECEIVE_CURRENT_TIME, currentTime});
