var mediaElements = document.querySelectorAll('video');
for (var i = 0, total = mediaElements.length; i < total; i++) {
  var features = ['prevtrack', 'playpause', 'nexttrack', 'current', 'progress', 'duration', 'speed', 'skipback', 'jumpforward',
  'markers', 'volume', 'playlist', 'loop', 'shuffle', 'contextmenu'];
  // To demonstrate the use of Chromecast with audio

    new MediaElementPlayer(mediaElements[i], {
      // This is needed to make Jump Forward to work correctly
          pluginPath: 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.5/',
      shimScriptAccess: 'always',
      autoRewind: false,
      features: features,
      currentMessage: 'Now playing:'
    });
  }
