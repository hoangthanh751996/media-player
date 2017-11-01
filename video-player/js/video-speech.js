(function() {
	// Get some required handles
	var video = document.getElementById('video');
	var recStatus = document.getElementById('recStatus');
	var startRecBtn = document.getElementById('startRecBtn');
	var stopRecBtn = document.getElementById('stopRecBtn');

	// Define a new speech recognition instance
	var rec = null;
	try {
		var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
		var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
		var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

		var commands = ['play', 'stop', 'replay', 'volume', 'mute', 'big', 'small'];
		var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

		rec = new SpeechRecognition();
		var speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString(grammar, 1);
		rec.grammars = speechRecognitionList;
	} 
	catch(e) {
    	document.querySelector('.msg').setAttribute('data-state', 'show');
    	startRecBtn.setAttribute('disabled', 'true');
    	stopRecBtn.setAttribute('disabled', 'true');
    }
    if (rec) {
		rec.continuous = true;
		rec.interimResults = false;
		rec.lang = 'en';
		rec.maxAlternatives = 1;

		// Define a threshold above which we are confident(!) that the recognition results are worth looking at 
		var confidenceThreshold = 0.5;

		// Simple function that checks existence of s in str
		var userSaid = function(str, s) {
			return str.indexOf(s) > -1;
		}

		// Highlights the relevant command that was recognised in the command list for display purposes
		var highlightCommand = function(cmd) {
			var el = document.getElementById(cmd); 
			el.setAttribute('data-state', 'highlight');
			setTimeout(function() {
				el.setAttribute('data-state', '');
			}, 3000);
		}

		// Process the results when they are returned from the recogniser
		rec.onresult = function(e) {
			// Check each result starting from the last one
			for (var i = e.resultIndex; i < e.results.length; ++i) {
				// If this is a final result
	       		if (e.results[i].isFinal) {
	       			// If the result is equal to or greater than the required threshold
	       			console.log('confidence = ' + e.results[i][0].confidence);

	       			if (parseFloat(e.results[i][0].confidence) >= parseFloat(confidenceThreshold)) {
		       			var str = e.results[i][0].transcript;
		       			console.log('Recognised: ' + str);
		    			
		       			if ( userSaid(str, 'play') ){
		       				video.play();
		       			}
		       			else if ( userSaid(str, 'stop') ){
		       				video.pause();
		       			}
		       			else if ( userSaid(str, 'replay') ){
		       				video.currentTime = 0;
		       				video.play();
		       			}
		       			else if ( userSaid(str, 'volume') ){
		       				video.muted = false;
		       			}
		       			else if ( userSaid(str, 'mute') ){
		       				video.muted = true;
		       			}
		       			else if ( userSaid(str, 'big') ){
		       				var vol = Math.floor(video.volume * 10) / 10;
		       				if (vol >= 0.9) video.volume = 1;
		       				else video.volume += 0.1;
		       			}
		       			else if ( userSaid(str, 'small') ){
		       				var vol = Math.floor(video.volume * 10) / 10;
		       				if (vol <= 0.1) video.volume = 0;
		       				else video.volume -= 0.1;
		       			}
	       			}
	        	}
	    	}
		};

		// document.body.onclick = function() {
		// 	rec.stop();
		 	rec.start();
		  	// console.log('Ready to receive a color command.');
		// }
	}
})();