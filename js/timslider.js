/*! timslider - v0.1.0 - 2014-04-24
* Copyright (c) 2014 ; Licensed  */

var TimSlider = {

	countItems: function() {
		var imgs = document.querySelectorAll(this.container + ' ' + this.itemName);
		var count = imgs.length;
		return count > 0 ? count : false;
	},

	totalTime: function() {
		var dur = this.slideDur * this.numItems + this.numItems * this.animDur;
		return dur;
	},

	getAnimArray: function () {
		var animArray = [
		this.name,
		this.durationS,
		this.timingFunction,
		this.delay,
		this.direction,
		this.itCount
		];

		return animArray;
	},

	buildAnimation: function() {
		var animString = '',
		anAr = this.getAnimArray(),
		i = 0,
		len = anAr.length;

		for (; i < len; i++) {
			if (anAr[i] !== undefined) {
				animString += anAr[i].toString() + ' ';
			}
		}

		return animString;
	},

	getCss: function() {
		var animString = this.buildAnimation();

		var classString = this.container + "	{	display: inline-block; overflow: hidden; white-space: nowrap;	position: relative; font-size: 0; width: " + this.width + ";}";

		classString += this.itemName + '{ display: inline-block; white-space: normal; position: relative; font-size: 1rem; right: 0; animation: ' + animString + '; -webkit-animation:' + animString + '}';

		classString += this.itemName + ' img { width: 100%; height: auto; vertical-align: middle;}';

		classString += this.slideCap + ' { position: absolute; bottom: 0; display: block; height: 30%; background-color: rgba(0,0,0,0.45); overflow: hidden; text-overflow: ellipsis; text-align: ' + this.capDir + '; color: #FFF; padding: 0.5rem;} h1, h2, h3 { margin: 0 0 0.75rem;}';

		classString += this.getKeyframeString();

		return classString;
	},

	getKeyframes: function() {
		var slidePerc = parseFloat(parseFloat(100 / (this.duration / this.slideDur)).toFixed(3)),
		animPerc = parseFloat(parseFloat(100 / (this.duration / this.animDur)).toFixed(3)),
		kString = '',
		steady = slidePerc,
		second = 0,
		secPerc = 0,
		i = 0;

		for (; i < this.numItems; i++) {
			kString += slidePerc + '% { right: ' + i + '00% } ';
			second = slidePerc + animPerc;

			if (i !== this.numItems -1) {
				secPerc = parseInt(i) + 1;

				kString += second + '% { right: ' + secPerc + '00% }';
				slidePerc += steady + animPerc;
			}

		}

		return kString;

	},

	getKeyframeString: function() {
		var kfString = "@keyframes " + this.name + " {";
		kfString += this.getKeyframes() + '}';

		kfString += "@-webkit-keyframes " + this.name + " {";
		kfString += this.getKeyframes() + "}";

		return kfString;
	},

	placeKeyframes: function() {
		var head = document.head || document.getElementsByTagName('head')[0],
		css = document.createTextNode(this.getCss()),
		styleTag = document.createElement('style');

		styleTag.appendChild(css);

		head.appendChild(styleTag);
	},

	init: function(paras) {

		var params = paras || {};

		// The elements to pull around
		this.container 	= params.container	|| '.slider-container';
		this.itemName 	= params.item				|| '.slider-item';
		this.slideCap		= params.caption		|| '.slider-caption';

		// Animation settings
		this.name 			= params.name 			|| 'timslider';
		this.direction 	= params.direction 	|| 'normal';
		this.itCount	 	= params.iteration 	|| 'infinite';

		this.timingFunc = params.timingFunc;
		this.delay			= params.delay;


		this.animDur		= parseInt(params.animationDuration) || 1;
		this.slideDur 	= parseInt(params.slideDuration) || 7;

		// Layout options
		this.width			= params.width			|| '48rem';
		this.capDir			=	params.captionDir || 'left';

		// Getting the number of slides
		this.numItems 	= this.countItems();

		// Getting duration based on number of slides and slide times
		this.duration 	= this.totalTime();
		this.durationS	= this.duration.toString() + 's';

		// Adding the css to the <head>
		this.placeKeyframes();

	}
};
