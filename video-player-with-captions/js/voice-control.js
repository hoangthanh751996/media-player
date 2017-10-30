// create by quydx
// 23/10/2017
// control media player use annyang

if (annyang) {
  // Let's define a command.
	var commands = {
	    'play': function() {
	        document.querySelector('video').play();
	    },
	    'pause': function() {
	        document.querySelector('video').pause();
	    },
      'mute' : function(){
        if (currentVolume >= 0) video.muted = true;
      },
      'increase volume' : function(){
        if (currentVolume < 1) video.volume += 0.1;
      },
      'decrease volume' : function(){
        if (currentVolume > 1) video.volume -= 0.1;
      },
      'full screen' : function (){
        setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
      }
	};


  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();


   // Tell KITT to use annyang
  SpeechKITT.annyang();

  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('../css/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();
}