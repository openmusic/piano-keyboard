var ac = new AudioContext();
var osc = ac.createOscillator();
var fullPianoKeyboard = document.getElementById('full');
var fullEvents = document.getElementById('fullEvents');
var fullLog = makeLogger(fullEvents);

// Listening to events
fullPianoKeyboard.addEventListener('noteon', function(e) {
	fullLog('noteon', e.detail);
});

fullPianoKeyboard.addEventListener('noteoff', function(e) {
	fullLog('noteoff', e.detail);
});

function makeLogger(el) {
	return function(evt, obj) {
		el.innerHTML = '<strong>' + evt + ':</strong> ' + JSON.stringify(obj, null, '');
	};
}

//osc.connect(destination);

// osc.start();


