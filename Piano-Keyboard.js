(function() {
	
	var proto = Object.create(HTMLElement.prototype);

	proto.createdCallback = function() {
		this.keyClass = 'key';
		this.keyBlackClass = 'key black';
		this.keyboardLayout = 'ZSXDCVGBHNJMQ2W3ER5T6Y7U'.split('');
		this.blackKeys = [ false, true, false, true, false, false, true, false, true, false, true, false ];

		this.rebuildKeyboard();
	};

	proto.rebuildKeyboard = function() {
		this.keys = [];
		this.numOctaves = this.getAttribute('octaves');
		initLayout(this);
	};

	function initLayout(kb) {
		var blacksDiv;
		var numBlacks = kb.blackKeys.length;

		kb.innerHTML = '';
		kb.classList.add('keyboard');
		
		blacksDiv = document.createElement('div');
		kb.appendChild(blacksDiv);
		blacksDiv.className = 'blacks';

		for(var i = 0; i < kb.numOctaves; i++) {

			for(var j = 0; j < numBlacks; j++) {

				var isBlack = kb.blackKeys[j],
					keyDiv = document.createElement( 'div' ),
					index = j + numBlacks * i,
					label = kb.keyboardLayout[ index ];

				keyDiv.className = isBlack ? kb.keyBlackClass : kb.keyClass;
				keyDiv.innerHTML = label;
				keyDiv.dataset.index = index;

				keyDiv.addEventListener('mousedown', makeCallback(kb, onDivMouseDown), false);
				keyDiv.addEventListener('mouseup', makeCallback(kb, onDivMouseUp), false);

				kb.keys.push( keyDiv );

				if(isBlack) {
					blacksDiv.appendChild( keyDiv );

					if(j >= 2 && !kb.blackKeys[j - 1] && !kb.blackKeys[j - 2] || (j === 1 && i > 0) ) {
						keyDiv.classList.add('prevwhite');
					}
				} else {
					kb.appendChild( keyDiv );
				}

			}
		}

		// Even if we set tabIndex here, the browser is smart enough to
		// let us cycle between keyboards when there's more than one on screen
		// at the same time, by pressing TAB
		kb.tabIndex = 1;
		kb.addEventListener('keydown', makeCallback(kb, onKeyDown), false);
		kb.addEventListener('keyup', makeCallback(kb, onKeyUp), false);
	}

	function makeCallback(kb, fn) {

		var cb = function(e) {
			fn(kb, e);
		};

		return cb;

	}

	function onDivMouseDown( keyboard, ev ) {

		if( keyboard.keyPressed ) {
			return;
		}

		var key = ev.target;

		dispatchNoteOn( keyboard, key.dataset.index );

	}


	function onDivMouseUp( keyboard, ev ) {

		if( keyboard.keyPressed ) {
			dispatchNoteOff( keyboard );
		}

	}


	function onKeyDown( keyboard, e ) {

		var index = findKeyIndex( keyboard, e );

		if( keyboard.keyPressed ) {
			return;
		}

		if( index === -1 || e.altKey || e.altGraphKey || e.ctrlKey || e.metaKey || e.shiftKey ) {
			// no further processing
			return;
		}

		dispatchNoteOn( keyboard, index );

	}


	function onKeyUp( keyboard, e ) {

		// Only fire key up if the key is in the defined layout
		if( findKeyIndex( keyboard, e ) !== -1 ) {
			dispatchNoteOff( keyboard );
		}

	}


	function findKeyIndex( keyboard, e ) {

		var keyCode = e.keyCode || e.which,
			keyChar = String.fromCharCode( keyCode ),
			index = keyboard.keyboardLayout.indexOf( keyChar );

		return index;

	}


	function dispatchNoteOn( keyboard, index ) {

		keyboard.keyPressed = true;

		var key = keyboard.keys[index],
			currentClass = key.className;

		key.classList.add('active');

		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent('noteon', false, false, { index: index });
		keyboard.dispatchEvent(evt);

	}


	function dispatchNoteOff( keyboard ) {

		var activeKey = keyboard.querySelector( '.active' );

		if( activeKey ) {
			activeKey.classList.remove('active');
		}

		keyboard.keyPressed = false;

		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent('noteoff', false, false, null);
		keyboard.dispatchEvent(evt);
		
	}

	//

	var component = {};
	component.prototype = proto;
	component.register = function(name) {
		document.registerElement(name, {
			prototype: proto
		});
	};

	if(typeof define === 'function' && define.amd) {
		define(function() { return component; });
	} else if(typeof module !== 'undefined' && module.exports) {
		module.exports = component;
	} else {
		component.register('openmusic-piano-keyboard'); // automatic registration
	}

}).call(this);

