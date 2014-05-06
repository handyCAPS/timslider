
/**
 * Create sliders with minimal effort and maximum configurability
 * @param {String} cont Optional classname for container element
 */
function HandyCAPSSlider(cont)  {

	/**
	 * Triggers a callback at set intervals
	 * @param  {Int}  time  Time between steps in milliseconds
	 * @param  {Var} 	cb   	Callback function to execute at each step
	 * @return {void}
	 */
	this.every = function (time,cb) {
		// Set local var to id of interval, so I can stop it
		this.timerid = window.setInterval(cb.bind(this), time);

	};

	/**
	 * Turn a hex value into an rgb value
	 * @param  {String} col Hex color to be converted, can be full or shorthand
	 * @return {String}     A css valid rgb color
	 */
	this.hexToRgb = function(col) {
		var color = col.replace('#', ''),
		rgbArray = [];

		if (color.length !== 3 && color.length !== 6 || /[^a-f0-9]/gi.test(color)) {
			// If it's not a valid hex, you get a red
			return "rgb(255,0,0)";
		}

		// If it's shorthand, lengthen and recurse
		if (color.length === 3) {
			var sixColor = '';
			for (var i = 0; i < 3; i++) {
				sixColor += color[i] + color[i];
			}

			return this.hexToRgb(sixColor);
		}

		// Split the hex into pairs
		for (var j = 0; j < 6; j = j + 2) {
			var sec = parseInt(j + 1, 10);
			// Parse hex to integer
			rgbArray.push(parseInt(color[j] + color[sec], 16));
		}

		var rgbColor = "rgb(" + rgbArray.join(',') + ")";

		return rgbColor;
	};

	/**
	 * Change the brightness of a hex or rgb color
	 * @param  {Int} 		perc  Positive for lighter, negative for darker
	 * @param  {String} color Hex or rgb color
	 * @return {String}       Altered color, as string containing rgb value
	 */
	this.brightness = function(perc, color) {
		var rgbString = color,
		alteredColor = "";

		if (/#/.test(color)) {
			rgbString = this.hexToRgb(color);
		}

		var numbers = rgbString.replace(/[^0-9,]/g, '');
		var cArray = numbers.split(',');

		for (var i = 0; i < cArray.length; i++) {
			var newColor = parseInt(cArray[i], 10) + Math.floor(parseInt(perc, 10) * 2.55);
			if (newColor < 0) {newColor = 0;}
			if (newColor > 255) {newColor = 255;}
			cArray[i] = newColor;
		}

		alteredColor = "rgb(" + cArray.join(',') + ")";

		return alteredColor;

	};

	/**
	 * Make sure it's a classname
	 * @param  {String} cName The string to classify
	 * @return {String}       The string classified
	 */
	this.classify = function(cName) {

		if (cName.indexOf('#') === 0) {
			alert('I can\'t let you do that Dave. Please use classes and not id\'s');
			return;
		}

		if (cName.indexOf('.') === 0) {
			return cName;
		}

		return '.' + cName;
	};

	/**
	 * Give properties a classname
	 * @param  {Array} props Properties as string
	 * @return {void}
	 */
	this.setClasses = function(props) {
		for (var i = 0; i < props.length; i++) {
			this[props[i]] = this.classify(this[props[i]]);
		}
	};

	/**
	 * Get float for milliseconds or seconds string
	 * @param  {String} time 	Contains a number and either ms or s
	 * @return {Float}      	Float representation of seconds
	 */
	this.getSeconds = function(time) {
		if (!/[^0-9.]/g.test(time)) {
			return parseFloat(time);
		}
		if (/m/gi.test(time)) {
			return parseInt(time.replace(/[^0-9]/, ''), 10) / 1000;
		}
		return parseFloat(time.replace(/[^0-9]/,''));
	};

	/**
	 * Get all the slides
	 * @return {Array} Nodelist of all slides
	 */
	this.getItems = function() {
		return document.querySelectorAll(this.container + ' ' + this.item);
	};

	this.targetBullets = function() {
		return document.querySelectorAll(this.classify(this.bulClass));
	};

	/**
	 * Count the number of slides
	 * @return {Int} Number of slides for this slider
	 */
	this.countItems = function() {
		var items = this.getItems();

		return items.length;
	};

	/**
	 * Set a numbered classname
	 * @param  {String} item The elements to give a name
	 * @param  {String} name The name to give
	 * @return {void}
	 */
	this.nameItems = function(item, name) {
		var items = document.querySelectorAll(this.container + ' ' + item);

		for (var i = 0; i < items.length; i++) {
			items[i].className += " " + name + parseInt(i + 1, 10);
		}
	};

	/**
	 * Make a bullet shape for every slide
	 * @return {String} A set of html elements
	 */
	this.getBullets = function() {
		var slideCount = this.countItems(),
		allBullets = '',
		bullet = "<div class='" + this.bulClass + "' style='display: inline-block; border-radius: 50%; cursor: pointer; transition: 0.3s " + parseInt(this.getSeconds(this.animDur) - 0.3, 10) + "s;";
		bullet += "margin: 0 " + (parseInt(this.bulSize, 10) / 4) + 'px;';
		bullet += "width: " + this.bulSize + ';';
		bullet += "height: " + this.bulSize + ';';
		bullet += " background-color: " + this.bulColor + ';';
		bullet += "'></div>";

		for (var i = 0; i < slideCount; i++) {
			allBullets += bullet;
		}

		return allBullets;
	};

	/**
	 * Display the bullets under the slider
	 * @return {void}
	 */
	this.placeBullets = function() {
		var bulletHolster = document.createElement("div"),
		bullets = this.getBullets(),
		target = document.querySelectorAll(this.container)[0];

		bulletHolster.className = 'bullet-holster';
		var bs = bulletHolster.style;
		bs.margin = (parseInt(this.bulSize, 10) / 1.5).toString() + 'px auto';
		bs.textAlign = 'center';
		bs.overflow = 'hidden';

		target.appendChild(bulletHolster);

		var holsters = document.querySelectorAll(this.container + ' .bullet-holster');

		holsters[0].innerHTML = bullets;

	};

	/**
	 * Callback for the click event
	 * @param  {Object} event Event object for the clicked element
	 * @return {void}
	 */
	this.bulletCb = function(event) {
		var allBullets = this.targetBullets(),
		clickedBul = event.currentTarget,
		// The bullets all have a numbered classname
		bulNum = parseInt(clickedBul.className.replace(/[^0-9]/g, ''), 10);

		// Highlight the clicked bullet
		clickedBul.style.backgroundColor = this.bulAltCol;
		// Reset styling on bullet we're moving away from
		allBullets[this.i].style.backgroundColor = this.bulColor;
		// Set the global itterator to the corresponding slide
		this.i = bulNum - 2;
		// Go to that slide
		this.goToSlide();
		// Bump the global itterator
		this.i++;
	};

	/**
	 * Add event listeners to every bullet
	 * @return {void}
	 */
	this.listenToBullets = function() {
		var bullets = this.targetBullets();

		for (var i = 0; i < bullets.length; i++) {
			bullets[i].addEventListener('click',this.bulletCb.bind(this));
		}
	};

	/**
	 * Get a css rule for the height of the caption
	 * @return {String} A css rule
	 */
	this.getCapHeight = function() {

		if (this.cMHeight === undefined) {
			return "height: " + this.capHeight + ";";
		} else {
			return "min-height: " + this.cMHeight + ";";
		}
	};

	/**
	 * Get the total time for each itteration
	 * @return {Float} Total time each slide is visible including transition
	 */
	this.getSlideDur = function() {
		return this.getSeconds(this.slideDur) + this.getSeconds(this.animDur);
	};

	/**
	 * Get the styling that will go in the <head>
	 * @return {String} A string of css rules to style the slider
	 */
	this.getCSS = function() {
		// Border-box all the things
		var css = this.container + "," + this.container + " * {box-sizing: border-box; -moz-box-sizing: border-box;}";
		// Basic styling for container
		css += this.container + "{ overflow: hidden; position: relative; white-space: nowrap; font-size: 0;";
		// Optional styling
		css += "width: " + this.itemWidth + ";";

		css += "}";

		// Basic styling for items
		css += this.container + ' ' + this.item + "{ position: relative; display: inline-block; width: 100%; font-size: 16px; font-size: 1rem; white-space: normal; transition: " + this.getSeconds(this.animDur) + "s " + this.sTimFunc + ';';

		css += "}";

		// Styling the images
		css += this.container + ' ' + this.item + " > img { width: 100%; vertical-align: middle;";
		css += "height: " + this.itemHeight + ";";

		css += "}";

		// Basic styling for captions
		css += this.container + ' ' + this.caption + " { position: absolute; bottom: 0; padding: 0.25em 0.5em;";

		css += this.getCapHeight();

		css += "background-color: " + this.capColor + ";";
		css += "color: " + this.cTxtColor + ";";
		css += "font-size: " + this.cFontSize + ";";

		css += "}";

		// Resetting some styling
		css += this.container + " > div {font-size: 16px; font-size: 1rem; white-space: normal;}";
		css += this.container + " p { margin: 0;}";
		css += this.container + " h2,";
		css += this.container + " h3 {margin: 0 0 0.5em;}";

		return css;
	};

	/**
	 * Create a style tag in the header and place the style rules in it
	 * @return {void}
	 */
	this.placeHeadStyles = function() {
		var head = document.head || document.getElementsByTagName('head')[0],
		styles = document.createTextNode(this.getCSS()),
		style = document.createElement('style');

		style.appendChild(styles);

		head.appendChild(style);
	};

	/**
	 * Get the css rule for the type of slide transition selected
	 * @param  {Int} perc The amount to transform, depends on the slide calling
	 * @return {String}   A css rule for transforming a slide
	 */
	this.getTransformString = function(perc) {
		var degs = parseInt(perc, 10) * 360,
		translate = "translateX(-" + perc + "00%)";
		switch(this.animType) {
			case ('normal') :
				return translate;
			case ('spin') :
				translate += " rotateY(-" + degs + "deg)";
				return translate;
			case ('flip') :
				translate += " rotateX(-" + degs + "deg)";
				return translate;
			case ('twirl') :
				translate += " skewX(-" + degs + "deg)";
				return translate;
			default:
				return translate;
		}
	};

	/**
	 * Style all slides so the one we want gets shown
	 * @return {void}
	 */
	this.goToSlide = function() {
		var perc = this.i + 1,
		slides = this.getItems();

		for (var i = 0; i < slides.length; i++){
				slides[i].style.transform = this.getTransformString(perc);
				slides[i].style.webkitTransform = this.getTransformString(perc);
			}
	};

	/**
	 * Callback for setInterval. Fires when proper conditions are met
	 * @return {void} [description]
	 */
	this.moveSlides = function () {
		var numItems = this.countItems(),
		slide = this.getItems(),
		bullets = this.targetBullets();

		// If we're doing bullets, style the one we're sliding away from back to original
		if(this.bullets) { bullets[this.i].style.backgroundColor = this.bulColor;}

		// If every slide has been shown, rinse and repeat
		if (this.i >= numItems - 1) {
			// Reset the global itterator
			this.i = 0;

			// Reset all transforms of the slides to 0
			for (var i = 0; i < numItems; i++) {
				slide[i].style.transform = this.getTransformString(0);
				slide[i].style.webkitTransform = this.getTransformString(0);
			}

			// Highlight the first bullet
			if (this.bullets) {bullets[0].style.backgroundColor = this.bulAltCol;}

			// Bail out early
			return;
		}

		// Highlight the bullet we're sliding to
		if (this.bullets) { bullets[this.i + 1].style.backgroundColor = this.bulAltCol;}

		// Adjust styling for each slide
		this.goToSlide();

		// Raise the global itterator
		this.i++;
	};

	// To pause on hover, clear the interval
	this.pauseCb = function() {
		window.clearInterval(this.timerid);
	};

	// To restart, set a new interval
	this.resumeCb = function() {
		this.every(this.getSlideDur() * 1000, this.moveSlides);
	};

	/**
	 * Attach event listeners to every slide
	 * @return {void}
	 */
	this.pauseOnHover = function() {
		var slides = this.getItems(),
		count = this.countItems();

		for (var i = 0; i < count; i++) {
			slides[i].addEventListener('mouseenter', this.pauseCb.bind(this));
			slides[i].addEventListener('mouseleave', this.resumeCb.bind(this));
		}
	};

	/**
	 * Initiate the slider
	 * @param  {Obj} paras Object literal containing custom options
	 * @return {void}
	 */
	this.init = function(paras) {

		var params = paras || {};

		// Basic settings
		this.container 	= params.container 		|| cont || 'slider-container';
		this.item 			= params.item 				|| 'slider-item';
		this.caption 		= params.caption 			|| 'slider-caption';
		// Making sure everything gets a working classname
		this.setClasses(['container', 'item', 'caption']);

		this.pauseHover = params.pauseOnHover === undefined || params.pauseOnHover === true ? true : false;

		// Animation setting
		this.animDur		= params.animationDur	|| 2;
		this.slideDur		= params.slideDur			|| 7;
		this.sTimFunc		= params.timingFunc 	|| 'cubic-bezier(0.75,0,0.3,1)';
		this.animType		= params.animType 		|| 'normal';

		// Naming all the slider items
		this.nameItems(this.item, 'slide');

		// Styling settings
		this.itemWidth	= params.itemWidth		|| '100%';
		this.itemHeight	=	params.itemHeight		|| 'auto';

		this.capHeight	= params.captionHeight	|| '33.333%';
		this.cMHeight		= params.capMinHeight;
		this.capColor		= params.captionColor		|| 'rgba(0,0,0,0.4)';
		this.cTxtColor 	= params.capTextColor		|| '#FFF';
		this.cFontSize	= params.capFontSize		|| '16px';

		this.bullets 		= params.bullets === undefined || params.bullets === true ? true : false;
		this.bulSize 		= params.bulletSize 	|| '16px';
		this.bulColor		= params.bulletColor	|| '#7f8c8d';
		this.bulClass		= params.bulletClass	|| 'bullet';
		this.bulBright	= params.bulletBright	|| -30;
		this.bulAltCol	= params.bulAltColor	|| this.brightness(this.bulBright, this.bulColor);
		// Placing basic css in the head
		this.placeHeadStyles();

		// This value represents the index of the slide being shown
		this.i = 0;

		// Placing and styling bullets. Defaults to true
		if (this.bullets) {
			this.placeBullets();
			this.nameItems(this.classify(this.bulClass), 'bullet');
			var bul = this.targetBullets();
			bul[this.i].style.backgroundColor = this.bulAltCol;
			this.listenToBullets();
		}

		// Pauses the animation on mouse over. Defaults to true
		if (this.pauseHover) {this.pauseOnHover();}

		// Get the show rolling
		this.every(this.getSlideDur() * 1000, this.moveSlides);

	};

}
// For ease, to start the slider with a single line
var handyCAPSSlider = new HandyCAPSSlider();