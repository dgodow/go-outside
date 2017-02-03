'use strict';
import { setTimeRemaining } from '../action-creators/time';
import { fetchWeather } 		from '../action-creators/weather';
import { receiveData }		from '../action-creators/db';

const Tabs 					= require('./Tabs'),
			WebRequest 		= require('./WebRequest'),
			Notifications = require('./Notifications'),
			Idle 					= require('./Idle'),
			Greylist 			= require('./Greylist'),
			Auth 					= require('./Auth');
      firebase      = require('./firebase');

class Core {
	constructor(store) {
		this.tabs 			= new Tabs(store);
		this.webRequest 	= new WebRequest();
		this.auth = new Auth();
		this.notifications 	= new Notifications(store);

		this.idle 					= new Idle();
		this.greylist 			= new Greylist();
		this.store 					= store;
	}

	init(){
		const { dispatch, getState } = this.store;
    const storedData = firebase.database().ref().once('value', (snapshot) => snapshot);
		this.tabs.init(); // <-- for keylogger;
		this.idle._init();
    this.auth.onAuthStateChanged();

    dispatch(receiveData(storedData));
		dispatch(fetchWeather(10004));
		// if (!this.store.getState().auth) {
		// 	console.log('no user');
		// 	this.notifications.login();
		// } else {
			console.log('welcome notification');
			this.notifications.welcome();
		// }
		this.watchMinute();
	}

	watchMinute(){
		const { dispatch, getState } = this.store,
				minute = 60000; // 5 seconds for testing

		setInterval(() => {
			if (!getState().status.pause) {
				// Deprecate time remaining by 1 minute and dispatch to storee
				const time = getState().status.timeRemaining - 60000;
				dispatch(setTimeRemaining(time));

				if (time === 5 * minute) { // 5 Minutes
					this.notifications.warningNote();
				}
				else if (time === 0) {
					this.notifications.statusChange();
				}
				else if (time === -5 * minute) {
					this.notifications.whereAreYou();
					dispatch(setTimeRemaining(-1 * minute));
				}
			} else {
        // When paused, interval keeps running -- but does nothing
				console.log('We are paused');
			}
		}, 5000); // 5 seconds for testing
	}

	setStatus(){
		// let { dispatch, getState } = this.store;
		//
		// dispatch(toggleWork());
		// const isWorking = getState().status.isWorking;
		// console.log('setStatus', isWorking);
		// if (isWorking){
		// 	dispatch(setTimeRemaining(getState().time.workDuration));
		// 	this.workStarts();
		// } else {
		// 	dispatch(setTimeRemaining(getState().time.breakDuration));
		// 	this.breakStarts();
		// }
	}

	breakStarts(){
		// console.log('breakStarts', this)
		// let tabs 				= this.tabs,
		// 		webRequest 	= this.webRequest;
		//
		// tabs.createAndLock()
    //   .then(() => {
		// 		webRequest.addOnBeforeRequestEvent();
		// 	}).catch(console.error);
	}

	workStarts(){
	// 	console.log('workStarts', this)
	// 	let tabs 				= this.tabs,
	// 			webRequest 	= this.webRequest;
	//
	// 	tabs.remove(tabs.lockedTab.id)
	// 			.then(() => webRequest.removeOnBeforeRequestEvent())
	// 			.catch(console.error);
	}
}

module.exports = Core;
