
$(document).ready(function(){
   $('.qualitypick').change(function(){

      //Have several videos in file, so have to navigate directly
      video = $(this).parent().find("video");
      select = $('.qualitypick').val();
      //Need access to DOM element for some functionality
      videoDOM = video.get(0);
      curtime = videoDOM.currentTime;  //Get Current Time of Video
      source = video.find("source[label=" + select + "]"); //Copy Source
      source.remove();                 //Remove the source from select
      video.prepend(source);           //Prepend source on top of options
      video.load();                    //Reload Video
      videoDOM.currentTime = curtime;  //Continue from video's stop
      videoDOM.play();                 //Resume video
   })
})
