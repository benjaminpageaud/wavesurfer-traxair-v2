'use strict';
/* global WaveSurfer, YT */

var TraxitSurferV2 = {
  init: function(pParams) {
    //console.log('init()');
    this.wavesurfer = pParams.wavesurfer;
  },

  /**
  * Load a media
  *   Params :
  *   pSourceType {String} : where the media comes from, ex: 'soundcloud', 'youtube'
  *   pSource {String} : the media-to-load's url(for Youtube, provide video ID)
  */
  load: function(pSourceType, pSource, pWaveform) {
    //console.log('load()');
    var me = this;
    var mediaElementReadyEvent = document.createEvent('CustomEvent');
    mediaElementReadyEvent.initCustomEvent('mediaElementReady', false, false, null);
    this.currentTime = 0;
    //Provide precalculated waveform to wavesurfer
    this.wavesurfer.backend.peaks = pWaveform;
    this.wavesurfer.drawBuffer();

    var mediaElement;
    if(pSourceType === 'soundcloud') {
        mediaElement = document.createElement('audio');
		document.body.appendChild(mediaElement);
        mediaElement.src = pSource;

        mediaElement.addEventListener('timeupdate', function() {
          me.onProgress();
        });

        mediaElement.seekTo = function(pTime) {
          mediaElement.currentTime = pTime;
        };

        mediaElement.addEventListener('canplay', function() {
          me.onMediaElementReady();
        });

        this.play = function() {
          mediaElement.play();
        };

        this.pause = function() {
          mediaElement.pause();
        };

        this.mediaElement = mediaElement;
        document.dispatchEvent(mediaElementReadyEvent);
    } else if (pSourceType === 'youtube') { 
      //Loading YT player
      
      this.loadYoutubePlayer(pSource);

      //Fired when youtube player is ready
        document.addEventListener('youtubeReady', function(pEvent) {
            //console.log('youtubeReady');
            //On fait ça propre, on enlève l'écouteur :)
            document.removeEventListener('youtubeReady');

            //pEvent.detail contains the instance of the youtube Player
            mediaElement = pEvent.detail;

            var progressInterval; 
            //Reference to the setInterval which update the waveform
            //Recreation of a 'timeupdate' event
            mediaElement.addEventListener('onStateChange',function(pEvent) {
              //console.log(pEvent.data);
              if(pEvent.data === 1) {
                progressInterval = setInterval(function() {
                  me.onProgress();
                }, 200);
              } else {
                clearInterval(progressInterval);
              }
            });
            
            //Creation de la couche d'abstraction youtube pour avoir les mêmes méthodes partout
            me.play = function() {
                //console.log('youtubePlay');
              mediaElement.playVideo();
            };

            me.pause = function() {
              mediaElement.pauseVideo();
            };

            Object.defineProperty(mediaElement, 'duration', { get: function () { return this.getDuration(); } });

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
  play: function() {},
  pause: function() {},
  onMediaElementReady: function() {
    var me = this;
    //document.removeEventListener('mediaElementReady', me.onMediaElementReady);
    this.duration = this.mediaElement.duration;
    this.wavesurfer.drawer.on('click', function(pEvent, pProgress) {
      me.seekTo(pProgress);
    });
    if(this.onMediaElementReadyCallback) this.onMediaElementReadyCallback();
  },
  onProgress: function() {
    var lProgress = this.mediaElement.currentTime / this.mediaElement.duration;
    this.wavesurfer.drawer.progress(lProgress);
    this.currentTime = this.mediaElement.currentTime;
    this.wavesurfer.fireEvent('progress');
  },
  seekTo: function(pProgress) {
    this.wavesurfer.drawer.progress(pProgress);
    this.mediaElement.seekTo(pProgress * this.mediaElement.duration);
    this.play();
    this.setPlayingMark(null);
    if(this.seekToCallback) this.seekToCallback();
  },
  getPercentages: function(pTime) {
    return pTime / this.duration;
  },
  addMark: function() {

  },
  addAllMarks: function(pTracklist) {
    if(!pTracklist) return;
    var me = this;
    if(!this.marks) this.marks = [];
    this.removeAllMarks();

    var waveformContainer = document.querySelector('#waveform');
    for(var i = 0; i < pTracklist.length; i++) {
        var lMark;
        if(this.marks[i]) {
          lMark = this.marks[i];
        } else {
          lMark = document.createElement('div');
          this.addClass(lMark, 'mark');
          this.marks[i] = lMark;
        }
        
       
        waveformContainer.appendChild(lMark);
        lMark.id = 'mark_'+i;

        var leftOffset = pTracklist[i].start / this.duration * waveformContainer.offsetWidth;
        lMark.style.left = leftOffset + 'px';

        var lIcon = document.createElement('div');
        this.addClass(lIcon, 'iconMark');

        lMark.appendChild(lIcon);
        if(pTracklist[i].track) {
            if(pTracklist[i].track.cover_url)
                lIcon.style.backgroundImage = 'url("'+ pTracklist[i].track.cover_url +'")';
            else 
                this.addClass(lIcon, 'cover_not_found');
        } else {
            this.addClass(lIcon, 'not_found');
        }
    }
  },
  addClass: function(pElement, pClass) {
    if(pElement.className.indexOf(pClass) === -1)
        pElement.className += ' '+pClass;
  },
  removeClass: function(pElement, pClass) {
    if(!pElement) return;
    var lRegex = new RegExp('(?:^|\s)' + pClass + '(?!\S)', 'g');
    pElement.className = pElement.className.replace(pClass , '');
  },
  removeAllMarks: function() {
    for(var i = this.marks.length - 1; i >= 0; i--) {
      var mark = document.querySelector('#mark_'+i);
      mark.remove();
      this.marks.splice(i, 1);
    }
  },
  setPlayingMark: function(pIdMark) {

    if(pIdMark === null) {
        var lPlayingMark = document.querySelector('#mark_' + this.idPlayingMark);
        if(!lPlayingMark) return;
        this.removeClass(lPlayingMark, ' playing');
        var lPlayingIcon = lPlayingMark.querySelector('div');
        this.removeClass(lPlayingIcon, ' playing');
        return;
    }
    var lMark = document.querySelector('#mark_' + pIdMark);
    var lIcon = lMark.querySelector('div');
    this.addClass(lMark, 'playing');
    this.addClass(lIcon, 'playing');

    if(this.idPlayingMark !== undefined) {
        var lPlayingMark = document.querySelector('#mark_' + this.idPlayingMark);
        this.removeClass(lPlayingMark, ' playing');
        var lPlayingIcon = lPlayingMark.querySelector('div');
        this.removeClass(lPlayingIcon, 'playing');
    }


    this.idPlayingMark = pIdMark;
  },
  loadYoutubePlayer: function(pUrl) {
    //console.log('load youtube script');
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
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
        //console.log('onPlayerReady()');
        var ytReadyEvent = new CustomEvent('youtubeReady', {'detail': player});
        document.dispatchEvent(ytReadyEvent);
      }
  }
};