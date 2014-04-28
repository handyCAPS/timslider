
var TimSlider = {

	/**
	 * Count number of items to slide
	 * @return {int} Number of slides
	 */
	countItems: function() {
		var items = document.querySelectorAll(this.container + ' ' + this.itemName);
		var count = items.length;

		return count;
	},

	/**
	 * Compute animation duration
	 * @return {int} Total duration
	 */
	totalTime: function() {
		var dur = this.slideDur * this.numItems + this.numItems * this.animDur;

		return dur;
	},

	/**
	 * Attach a named and numbered class to elements
	 * @param  {string} item A valid css selector
	 * @param  {string} name The name each claass starts with
	 * @return {void}
	 */
	nameItems: function(item, name) {
		var items = document.querySelectorAll(item);

		for (var i = 0; i < items.length; i++) {
			items[i].className += ' ' + name + parseInt(i + 1, 10);
		}
	},

	/**
	 * Set either a fixed or minimum height for the caption
	 * @return {string} Css attribute and value
	 */
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

	/**
	 * Create a css circle for each slider-item
	 * @return {string} Html elements styled as a circle
	 */
	getBullets: function() {
		var allBullets = '',
		bullet = "<div style='display: inline-block; width: " + this.blltHeight + "; height: " + this.blltHeight + "; border-radius: 50%; background-color: " + this.blltColor + "; margin: 0 " + (parseInt(this.blltHeight, 10) / 4) + "px;' class='bullet'></div>";

		for (var i = 0; i < this.numItems; i++) {
			allBullets += bullet;
		}

		return allBullets;
	},

	placeBullets: function() {
		var bulletHolster = document.createElement("div"),
		bullets = this.getBullets(),
		targets = document.querySelectorAll(this.container);

		bulletHolster.className = 'bullet-holster';
		var bs = bulletHolster.style;
		bs.margin = (parseInt(this.blltHeight, 10) / 1.5).toString() + 'px auto';
		bs.textAlign = 'center';
		bs.overflow = 'hidden';

		for (var i = 0; i < targets.length; i++) {
			targets[i].appendChild(bulletHolster);
		}

		var holsters = document.querySelectorAll(this.container + ' .bullet-holster');

		for (var j = 0; j < holsters.length; j++) {
			holsters[j].innerHTML = bullets;
		}

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

		var classString = this.container + "	{	box-sizing: border-box; -moz-box-sizing: border-box; display: inline-block; overflow: hidden; white-space: nowrap;	position: relative; font-size: 0; width: " + this.width + "; height: auto}";

		classString += this.itemName + "{	box-sizing: border-box; -moz-box-sizing: border-box; display: inline-block; width: 100%;" + this.itemHeight + "; white-space: normal; position: relative; font-size: 1rem; right: 0; animation: " + animString + "; -webkit-animation:" + animString + "; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0);}";

		classString += this.itemName + " img {	box-sizing: border-box; -moz-box-sizing: border-box; width: 100%; height:" + this.itemHeight + "; vertical-align: middle;}";

		classString += this.slideCap + " {	box-sizing: border-box; -moz-box-sizing: border-box; position: absolute; bottom: 0; display: block; " + capHeight + "; width: 100%; background-color: " + this.capBgColor + "; overflow: hidden; text-align: " + this.capAlign + "; color: " + this.capFColor + "; padding: 0.5rem 1rem 1rem; overflow: hidden; text-overflow: ellipsis;} h1, h2, h3, h4 {	box-sizing: border-box; -moz-box-sizing: border-box; margin: 0; margin-bottom: 0.5rem;} p {	box-sizing: border-box; -moz-box-sizing: border-box; padding: 0; margin: 0;}";

		classString += this.getKeyframeString();

		return classString;
	},

	getKeyframes: function() {
		var slidePerc = parseFloat((100 / (this.duration / this.slideDur)).toFixed(3)),
		animPerc = parseFloat((100 / (this.duration / this.animDur)).toFixed(3)),
		kString = '',
		steady = slidePerc,
		second = 0,
		secPerc = 0,
		i = 0;

		for (; i < this.numItems; i++) {
			kString += slidePerc + '% { right: ' + i + '00% } ';
			second = slidePerc + animPerc;

			if (i !== this.numItems -1) {
				secPerc = parseInt(i, 10) + 1;

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


		this.animDur		= parseInt(params.animationDuration, 10) || 1;
		this.slideDur 	= parseInt(params.slideDuration, 10) || 7;

		// Layout options
		this.width			= params.width						|| '100%';
		this.itemHeight = params.itemHeight 			|| 'auto';

		this.capAlign		=	params.captionAlign			|| 'left';
		this.capHeight	= params.captionHeight 		|| '33.333%';
		this.cMinHeight = params.captionMinHeight;
		this.capFColor	= params.captionTextColor	|| '#FFF';
		this.capBgColor	= params.captionBgColor 	|| 'rgba(0,0,0,0.4)';

		this.bullets		= params.bullets === undefined || params.bullets === true ? true : false;
		this.blltColor	= params.bulletColor			|| '#7f8c8d';
		this.blltHeight	= params.bulletHeight			|| '16px';

		// Getting the number of slides
		this.numItems 	= this.countItems();

		// Getting duration based on number of slides and slide times
		this.duration 	= this.totalTime();
		this.durationS	= this.duration.toString() + 's';

		// Adding the css to the <head>
		this.placeStyling();

		// Giving each slide a unique name
		this.nameItems(this.itemName, 'slide');

		if (this.bullets) {
			this.placeBullets();
			this.nameItems('.bullet', 'bullet');
		}

console.log(document.querySelectorAll(this.itemName)[2].offsetLeft);
	}
};
