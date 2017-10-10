(function () {
  'use strict';

  // Does the browser actually support the video element?
  var supportsVideo = !!document.createElement('video').canPlayType;

  if (supportsVideo) {
  	// Obtain handles to main elements
  	var videoContainer = document.getElementById('videoContainer');
   	var video = document.getElementById('video');
   	var videoControls = document.getElementById('video-controls');

   	// Hide the default controls
   	video.controls = false;

   	// Display the user defined video controls
   	videoControls.style.display = 'block';

   	// Obtain handles to buttons and other elements
   	var playpause = document.getElementById('playpause');
   	var stop = document.getElementById('stop');
   	var mute = document.getElementById('mute');
   	var volinc = document.getElementById('volinc');
   	var voldec = document.getElementById('voldec');
   	var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
   	var fullscreen = document.getElementById('fs');

    // Check if the browser supports the Fullscreen API
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    // If the browser doesn't support the Fulscreen API then hide the fullscreen button
    if (!fullScreenEnabled) {
      fullscreen.style.display = 'none';
    }

   	// Change the volume
   	var alterVolume = function(dir) {
   		var currentVolume = Math.floor(video.volume * 10) / 10;
   		if (dir === '+') {
   			if (currentVolume < 1) video.volume += 0.1;
   		}
   		else if (dir === '-') {
  			if (currentVolume > 0) video.volume -= 0.1;
   		}
   	}

   	// Set the video container's fullscreen state
  	var setFullscreenData = function(state) {
  		videoContainer.setAttribute('data-fullscreen', !!state);
  	}

  	// Checks if the document is currently in fullscreen mode
   	var isFullScreen = function() {
   		return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
   	}

   	// Fullscreen
   	var handleFullscreen = function() {
   		// If fullscreen mode is active...	
    		if (isFullScreen()) {
    			// ...exit fullscreen mode
    			// (Note: this can only be called on document)
    			if (document.exitFullscreen) document.exitFullscreen();
    			else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    			else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    			else if (document.msExitFullscreen) document.msExitFullscreen();
    			setFullscreenData(false);
    		}
    		else {
    		  // ...otherwise enter fullscreen mode
    			// (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
          if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
    		  else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
    		  else if (videoContainer.webkitRequestFullScreen) {
    				// Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and 
            // ensures that our custom controls are visible:
            // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
            // figure[data-fullscreen=true] .controls { z-index:2147483647; }
    				video.webkitRequestFullScreen();
    			}
    			else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
    			setFullscreenData(true);
    		}
  	}

   	// Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
   	if (document.addEventListener) {
   		// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
   		video.addEventListener('loadedmetadata', function() {
   			progress.setAttribute('max', video.duration);
   		});

   		// Add events for all buttons
   		playpause.addEventListener('click', function(e) {
   			if (video.paused || video.ended) video.play();
   			else video.pause();
   		});

   		// The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
   		stop.addEventListener('click', function(e) {
   			video.pause();
   			video.currentTime = 0;
   			progress.value = 0;
   		});
   		mute.addEventListener('click', function(e) {
   			video.muted = !video.muted;
   		});
   		volinc.addEventListener('click', function(e) {
   			alterVolume('+');
   		});
   		voldec.addEventListener('click', function(e) {
   			alterVolume('-');
   		});
   		fs.addEventListener('click', function(e) {
   			handleFullscreen();
   		});

   		// As the video is playing, update the progress bar
   		video.addEventListener('timeupdate', function() {
        // For mobile browsers, ensure that the progress element's max attribute is set
        if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
   		});

      // React to the user clicking within the progress bar
      progress.addEventListener('click', function(e) {
        var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
        video.currentTime = pos * video.duration;
      });

   		// Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
   		document.addEventListener('fullscreenchange', function(e) {
   			setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
   		});
   		document.addEventListener('webkitfullscreenchange', function() {
   			setFullscreenData(!!document.webkitIsFullScreen);
   		});
   		document.addEventListener('mozfullscreenchange', function() {
   			setFullscreenData(!!document.mozFullScreen);
   		});
   		document.addEventListener('msfullscreenchange', function() {
   			setFullscreenData(!!document.msFullscreenElement);
   		});
   	}
  }

})();