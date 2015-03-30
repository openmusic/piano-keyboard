# openmusic-piano-keyboard

> A piano keyboard component

[![Install with NPM](https://nodei.co/npm/openmusic-piano-keyboard.png?downloads=true&stars=true)](https://nodei.co/npm/openmusic-piano-keyboard/)

** YOU NEED SUPPORT FOR WEB COMPONENTS IN YOUR BROWSER BECAUSE WE'RE NOT SHIMMING ANYTHING IN **

Firefox: go to `about:config`, find `dom.webcomponents.enabled` and set it to true.

Chrome: maybe nothing to do?

## Installation

Grab `Piano-Keyboard.js` and `Piano-Keyboard.css` from the repo or do `npm install openmusic-piano-keyboard`.

## Usage

### If not using any package manager

Include `Piano-Keyboard.js` and `Piano-Keyboard.css` before you use the component. It will be registered automatically as `openmusic-piano-keyboard` so you can run `document.createElement('openmusic-piano-keyboard')` or have `<openmusic-piano-keyboard>` elements in your HTML source.

E.g.:

```html
<link rel="stylesheet" href="Piano-Keyboard.css">
<script src="Piano-Keyboard.js" defer></script>
```

### If using npm

You need to load the module and then register it--it is not automatically registered!

```javascript
require('openmusic-piano-keyboard').register('openmusic-piano-keyboard');
```

But you could even register it with other name. Up to you.

Remember to load the css file too or the component will be unstyled.

## API

```html
<openmusic-piano-keyboard octaves="2"></openmusic-piano-keyboard>
```
### Attributes

#### `octaves`

Attribute for selecting how many octaves to render. Can be 1 or 2.

### Events

Events are DOM events, additional data is in the `detail` field of each event.

#### `noteon`

detail: `index` containing the index of the pressed key (either by mouse or keyboard)

E.g.

```javascript
keyboard.addEventListener('noteon', function(e) {
	console.log('note on on key index: ', e.detail.index);
});
```

#### `noteoff`

detail: `index` containing the index of the released key (either by mouse or keyboard)

E.g.

```javascript
keyboard.addEventListener('noteoff', function(e) {
	console.log('note off on key index: ', e.detail.index);
});
```


## Demo

Have a look at the demo file in `index.html` for a usage example.
