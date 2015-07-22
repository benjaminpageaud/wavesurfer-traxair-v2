'use strict';
/* global WaveSurfer, YT */

WaveSurfer.TraxitV2 = {
  init: function(pWavesurfer) {
        this.wavesurfer = pWavesurfer;
        console.log('init');
  },

  /**
  * Load a media
  *   Params :
  * pSourceType {String} : where the media comes from, ex: 'soundcloud', 'youtube'
  *   pSource {String} : the media-to-load's url(for Youtube, provide video ID)
  */
  load: function(pSourceType, pSource, pWaveform) {
    console.log('traxit load()')
    var me = this;
    var mediaElementReadyEvent = new Event('mediaElementReady');
    this.mediaElement = {
        play: function() {},
        pause: function() {}
    }
    //Provide precalculated waveform to wavesurfer
    this.wavesurfer.backend.peaks = pWaveform;
    this.wavesurfer.drawBuffer();

    var mediaElement;
    if(pSourceType === 'soundcloud') {
      mediaElement = document.createElement('audio');
      mediaElement.src = pSource;

      console.log('mediaElement created');
      mediaElement.addEventListener('timeupdate', function() {
        me.onProgress();
      });

      mediaElement.seekTo = function(pTime) {
        mediaElement.currentTime = pTime;
      };

      mediaElement.addEventListener('canplay', function() {
        me.onMediaElementReady();
      });

      this.mediaElement = mediaElement;
      document.dispatchEvent(mediaElementReadyEvent);
    } else if (pSourceType === 'youtube') { 
      //Loading YT player
      this.loadYoutubePlayer(pSource);

      //Fired when youtube player is ready
        document.addEventListener('youtubeReady', function(pEvent) {
          //On fait ça propre, on enlève l'écouteur :)
          document.removeEventListener('youtubeReady');

          //pEvent.detail contains the instance of the youtube Player
          mediaElement = pEvent.detail;

          var progressInterval; 
          //Reference to the setInterval which update the waveform
          //Recreation of a 'timeupdate' event
          mediaElement.addEventListener('onStateChange',function(pEvent) {
            console.log(pEvent.data);
            if(pEvent.data === 1) {
              progressInterval = setInterval(function() {
                me.onProgress();
              }, 100);
            } else {
              clearInterval(progressInterval);
            }
          });
          
          //Creation de la couche d'abstraction youtube pour avoir les mêmes méthodes partout
          mediaElement.play = function() {
            mediaElement.playVideo();
          };

          mediaElement.pause = function() {
            mediaElement.pauseVideo();
          };

          mediaElement.duration = mediaElement.getDuration();

          //Création de la prop currentTime qui renvoie le résultat de la fonction getCurrentTime du player youtube
          Object.defineProperty(mediaElement, 'currentTime', { get: function () { return this.getCurrentTime(); } });

          me.mediaElement = mediaElement;
          document.dispatchEvent(mediaElementReadyEvent);
        });
    }

    document.addEventListener('mediaElementReady', function() {
      me.onMediaElementReady();
    });
    
  },
  onMediaElementReady: function(pCallback) {
    var me = this;
    this.wavesurfer.drawer.on('click', function(pEvent, pProgress) {
      me.seekTo(pProgress);
    });
    if(pCallback && typeof pCallback === 'function') pCallback();
  },
  onProgress: function() {
    var lProgress = this.mediaElement.currentTime / this.mediaElement.duration;
    this.wavesurfer.drawer.progress(lProgress);
    this.wavesurfer.fireEvent('progress');
  },
  seekTo: function(pProgress) {
    this.wavesurfer.drawer.progress(pProgress);
    this.mediaElement.seekTo(pProgress * this.mediaElement.duration);
    this.mediaElement.play();
  },
  addMark: function() {

  },
  addAllMarks: function(pTracklist) {
    var me = this;
    for(var i = 0; i < pTracklist.length; i++) {
      var lMark = document.createElement('div');
      var waveformContainer = document.querySelector('#waveform');
      waveformContainer.appendChild(lMark);
      lMark.id = 'mark_'+i;
      lMark.style.width = '1px';
      lMark.style.height = '100px';
      lMark.style.position = 'absolute';
      lMark.style.top = '0px';

      var leftOffset = pTracklist[i].start / this.mediaElement.duration * waveformContainer.offsetWidth;
      lMark.style.left = leftOffset + 'px';
      lMark.style.display = 'inline-block';
      lMark.style.zIndex = '5';
      lMark.style.backgroundColor = 'rgb(200, 200, 200)';

      var lIcon = document.createElement('div');
      lMark.appendChild(lIcon);
      lIcon.style.width = '40px';
      lIcon.style.height = '40px';
      lIcon.style.position = 'relative';
      lIcon.style.top = '100px';
      lIcon.style.backgroundColor = 'rgb(100, 100, 100)';
      if(pTracklist[i].track)
        lIcon.style.backgroundImage = pTracklist[i].track.cover ? 'url("'+ pTracklist[i].track.cover +'")' : 'url("assets/img/notfound.png")';

      lIcon.style.backgroundSize = 'contain';

      lIcon.addEventListener('mouseenter', me.onMouseEnterMark);
      lIcon.addEventListener('mouseout', me.onMouseOutMark);
    }
  },
  onMouseEnterMark: function(pEvent) {
    pEvent.target.style.width = '80px';
    pEvent.target.style.height = '80px';
    pEvent.target.parentNode.style.zIndex = '10';
    pEvent.target.style.transform = 'translate(0, -50%)';
  },
  onMouseOutMark: function(pEvent) {
    pEvent.target.style.width = '40px';
    pEvent.target.style.height = '40px';
    pEvent.target.parentNode.style.zIndex = '5';
    pEvent.target.style.transform = 'translate(0, 0)';
  },
  loadYoutubePlayer: function(pUrl) {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
      window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('yt_player', {
          height: '0',
          width: '640',
          videoId: pUrl,
          events: {
            'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
          }
        });
        
      }

      function onPlayerReady(event) {
        var ytReadyEvent = new CustomEvent('youtubeReady', {'detail': player});
        document.dispatchEvent(ytReadyEvent);
      }
  }
};