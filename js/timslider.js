/*! timslider - v0.1.0 - 2014-04-26
* Copyright (c) 2014 ; Licensed BSD-2-Clause */

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

	getCapHeight: function() {
		var capHeight = '';
		if (this.cMinHeight) {
			var minHeight = this.cMinHeight;
			capHeight = "min-height: " + minHeight + ';';
		} else {
			capHeight = "height:"  + this.capHeight + ';';
		}
		return capHeight;
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
		var animString = this.buildAnimation(),
		capHeight = this.getCapHeight();

		var classString = this.container + "	{	box-sizing: border-box; -moz-box-sizing: border-box; display: inline-block; overflow: hidden; white-space: nowrap;	position: relative; font-size: 0; width: " + this.width + "; height: " + this.itemHeight + "}";

		classString += this.itemName + "{	box-sizing: border-box; -moz-box-sizing: border-box; display: inline-block; width: 100%; white-space: normal; position: relative; font-size: 1rem; right: 0; animation: " + animString + "; -webkit-animation:" + animString + "}";

		classString += this.itemName + " img {	box-sizing: border-box; -moz-box-sizing: border-box; width: 100%; height:" + this.itemHeight + "; vertical-align: middle;}";

		classString += this.slideCap + " {	box-sizing: border-box; -moz-box-sizing: border-box; position: absolute; bottom: 0; display: block; " + capHeight + "; width: 100%; background-color: " + this.capBgColor + "; overflow: hidden; text-align: " + this.capAlign + "; color: " + this.capFColor + "; padding: 0.5rem 1rem 1rem; overflow: hidden; text-overflow: ellipsis;} h1, h2, h3, h4 {	box-sizing: border-box; -moz-box-sizing: border-box; margin: 0; margin-bottom: 0.5rem;} p {	box-sizing: border-box; -moz-box-sizing: border-box; padding: 0; margin: 0;}";

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

	placeStyling: function() {
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
		this.width			= params.width						|| '100%';
		this.itemHeight = params.itemHeight 			|| 'auto';
		this.capAlign		=	params.captionAlign			|| 'left';
		this.capHeight	= params.captionHeight 		|| '30%';
		this.cMinHeight = params.captionMinHeight;
		this.capFColor	= params.captionTextColor	|| '#FFF';
		this.capBgColor	= params.captionBgColor 	|| 'rgba(0,0,0,0.4)';

		// Getting the number of slides
		this.numItems 	= this.countItems();

		// Getting duration based on number of slides and slide times
		this.duration 	= this.totalTime();
		this.durationS	= this.duration.toString() + 's';

		// Adding the css to the <head>
		this.placeStyling();

	}
};
