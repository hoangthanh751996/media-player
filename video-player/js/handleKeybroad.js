var xTriggered = 0;
$(document).keyup(function( event ) {
  xTriggered++;
  var msg = "Handler for .keyup() called " + xTriggered + " time(s).";
  let key = event.keyCode;
  if(key == 39) {
    console.log("ArrowRight");
    var video = document.getElementById("video");
       video.currentTime += 5;
  }
  if(key == 37) {
    console.log("ArrowLeft");
    var video = document.getElementById("video");
       video.currentTime += -5;
  }
  if(key == 38) {
    console.log("ArrowUp");
    var video = document.getElementById("video");
    if(video.volume >= 0.8) {
         video.volume = 1;
    } else {
      video.volume += 0.2;
    }
  }
  if(key == 40) {
    console.log("ArrowDown");
    var video = document.getElementById("video");
    if(video.volume <= 0.3) {
         video.volume = 0;
    } else {
      video.volume -= 0.2;
    }

  }

  if(key == 32) {
    console.log("space");
    var video = document.getElementById("video");
    if(video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
})
