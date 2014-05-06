HandyCAPSSlider
===============
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

### Pure JS slider

A slider made for practice, turned out pretty useful. Simply add classes to the container, items, and captions and a single line of js gets the thing sliding. Add configuration options by passing an object literal to the init function.

Installation
------------

Using bower: `bower install --save handyCAPSSLider`
This is linked to the 'timslider' repo, because bower has some growing up to do.

Not using bower:

1. Download the js folder or clone the repo. There's a minified and full version.
2. Link to the script in your page.
3. Add classes to the desired items. Defaults are:
	* container: 'slider-container'
	* item: 'slider-item'
	* caption: 'slider-caption'
		* Make sure to use classes and not id's.
		* You can change the classnames in the options object.
4. To start the slider you have two choices.
	* Single line: `handyCAPSSlider.init();`
	* Using a constructor (notice the capital H)
	```js
	var MySlider = new HandyCAPSSlider();
	MySlider.init();
	```
	* With the constuctor you can make multiple sliders per page. Just make sure to give the containers different classes. The container class can be set in the init options or directly in the constructor: `var MySlider = new HandyCAPSSlider('my-container');`

Options
-------

All options can be set by passing an object to the init function. All options are ehm optional.

```js
handyCAPSSlider.init({
	width: '300px',
	capMinHeight: '30%',
	bulletColor: '#F74C89',
	stopOnHover: false
});
```

### Classes

This slider works with classes to determin its styling. If any of the classnames clash with the rest of your page or you want multiple sliders on one page, you can change them to whatever you want. For multiple sliders you only need different containers classes for each.

#### container
Type `String`
Default `'slider-container'`

Can be set in the init object or as a parameter for the constructor. The leading `.` is optional. Should be unique for every slider on the page.

#### item
Type `string`
Default `'slider-item'`

Name for every slide. Can be the same for every slider on the page.

#### caption
Type `String`
Default `'slider-caption'`

Name for the caption on every slide . Can be the same for every slider on the page.


```js
handyCAPSSlider.init({
	container: 'my-container',
	item: 'my-item',
	caption: 'my-caption'
});
```

### Animations

Customize your slider.

#### stopOnHover
Type `Boolean`
Default `true`

Stops the animation when the user hovers over a slide. Animation resumes on mouseout. Can be disabled with the value `false` or `'nibble'`

#### minies
Type `Booleamn`
Deafult `true`

Shows minitures of all images in the slider. Can be disabled with the value  `false` or `'bacon'`

#### slideDur
Type `Float | String`
Default `7`

How long each slide should stay visible. For milliseconds use a string ending in `'ms'`

#### animationDur
Type `Float | String`
Default `2`

How long transitions from one slide to the next should take. For milliseconds use a string ending in `'ms'`

#### timingFunc
Type `String`
Default `'cubic-bezier(0.75,0,0.3,1)'`

Css animation timing function. Gives the slide a swing. Options are :
* `'linear'`
* `'ease'`
* `'ease-in'`
* `'ease-out'`
* `'ease-in-out'`
* `'cubic-bezier(x1, y1, x2, y2)'` see http://cubic-bezier.com (Made by the brilliant [@LeaVerou](https://twitter.com/LeaVerou))

#### animType
Type `String`
Default `'normal'`

Want to annoy your visitors, but please the marketing department ? This slider has a few custom transition animations available. Options are :
* `'normal'` Default value. Smooth slides from right to left.
* `'flip'` Flips each slide 360 degs top to bottom.
* `'spin'` Spins slides around.
* `'twirl'` Skews each slide full circle.

```js
handyCAPSLider.init({
	slideDur: 9,
	animDur: '1500ms',
	timingFunc: 'linear',
	animType: 'twirl',
	stopOnHover: false
});
```

### Styling

Adjust styling options to fit with your own designs.

#### itemWidth
Type `String`
Default `'100%'`

How wide the entire slider will be. Can be any valid css value. Defaults to filling the parent element.

#### itemHeight
Type `String`
Default `'auto'`

Height of the slides. Can be any valid css value. Doesn't include bullets.

#### captionHeight
Type `String`
Default `'33.333%'`

Height of the caption. This value specifies a fixed height.

#### capMinHeight
Type `String`
Default `undefined`

Optional minimum height for the caption. If set, the caption will adjust to its contents.

#### captionColor
Type `String`
Default `'rgba(0,0,0,0.4)'`

Background color for the caption. Specify an rgba or hsla color if you want opacity.

#### capTextColor
Type `String`
Default `'#FFF'`

Text color for the caption. Can be any css color.

#### capFontSize
Type `String`
Default `'16px'`

Fontsize for the caption container.


```js
handyCAPSSlider.init({
	itemWidth: '300px',
	itemHeight: '200px',
	captionHeight: '50px',
	captionColor: 'rgba(135, 146, 158, 0.6)',
	capTextColor: '#222'
});
```


#### bullets
Type `Boolean`
Default `true`

If set to true, shows a bullet for each slide under the items. Clicking bullet will show the corresponding slide. Set to `false` or `'shoelace'` to disable bullets.

#### bulletSize
Type `String`
Default `'16px'`

Size of the bullets. Do not use ems.

#### bulletColor
Type `String`
Default `'#7F8C8D'`

Color of the bullets. Accepts any valid css color. Invalid input here will give you red bullets.

#### bulletBright
Type `Integer`
Default `-30`

By default, the bullet corresponding to the slide shown will be darkened by 30%. If you use a very dark color for the bullets, or want different highlighting, you can set the percentage here. Positive values will lighten the color, negative values darken it.

#### bulAltColor
Type `String`
Default `Calculated by bulletColor and bulletBright`

Directly set the color of the highlighted bullet. This will override the bulletBright setting.


```js
handyCAPSSlider.init({
	bullets: true, // default
	bulletSize: '12px',
	bulletColor: '#AC5A55',
	bulletBright: -20
});
```

----------------

## Copyright

&copy; 2014 Tim Doppenberg (handyCAPS)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
