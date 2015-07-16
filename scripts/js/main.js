document.addEventListener("DOMContentLoaded", function(event) {
   
	var computedWaveform = JSON.parse("[0,0.06232381011920133,0.408927965071521,0.41488927970412237,0.09478671729141054,0.33605222485432434,0.20043931372709956,0.2729676303694203,0.3679512114423548,0.5448136308410935,0.343712868194702,0.12638161659348374,0.1663828353494134,0.208706555175258,0.7512749577475722,0.5538329551856218,0.755158969297118,0.8298869574820104,0.09883937016443994,0.5804230912269883,0.747638883201361,0.7035681884131028,0.6422983007786521,0.22790751270321033,0.43337307485121174,0.6641947357910224,0.7701591480075848,0.6534522684169142,0.1745495666964197,0.7500808338642099,0.599900597547667,0.8716877229134562,0.4469294092951658,0.33563945929580313,0.42765757908185265,0.41304717574255045,0.8865314865664146,0.692182464269473,0.5422651771019014,0.5553164173953663,0.5371327128884151,0.7104029864061185,0.3561052336156681,0.8705251129081818,0.43031434153680254,0.3154293572722443,0.6614859289321408,0.457664012532554,0.41101928321684555,0.30229554122186636,0.7609491895071,0.12320278551822565,0.366365061209059,0.5341284643170641,0.396014896386884,0.16741501373562362,0.35171189447382634,0.6735102962393414,0.1866222964454865,0.6311531134815245,0.49837538657709,0.3968758111168397,1,0.6975321072257364,0.9113874876619651,0.403316616155885,0.7783653962108175,0.598729116251587,0.5294358620323865,0.7316434698355981,0.5823151578132667,0.18638579224843382,0.07559773306641414,0.4161351852620232,0.4462259770065478,0.2001223676310611,0.39361281025133643,0.6198449236297238,0.07273984007352426,0.4309855444126139,0.06788199374919045,0.6733896730491453,0.26577397940430814,0.5724721304672389,0.08526560666793788,0.17577149844248474,0.3671118671845797,0.4512806789671359,0.698348337358917,0.38006828944679116,0.6055686801609951,0.6109501507191312,0.08556350637627567,0.22629414918569699,0.08108948913456812,0.40246832499184915,0.7023531321198334,0.44731280930799583,0.6184654595908338,0.09026553782624078,0.4916776540505703,0.3531964356787517,0.34558171824859596,0.6822101602485117,0.43865194911464533,0.5650941595052472,0.32758284137737986,0.6599684941156033,0.3566366291566619,0.5077783703233975,0.2710327105270473,0.12053411746601,0.04696697512186125,0.41101026825296083,0.1266137252365009,0.2361605017227147,0.6111882716174264,0.6110715107015245,0.32504549507348773,0.3811052493974975,0.5407594172372757,0.6411693291727427,0.4161532361572481,0.17111870502925974,0.32317561661759997,0.31647258004296425,0.615609692575515,0.6911626958251963,0.3281497947879878,0.6072342206744118,0.01564568759972697,0.44987879869008013,0.2764912162077535,0.6194267572206525,0.7016573414476892,0.7167290272117559,0.5128236642508364,0.29484659795927326,0.5722263598731832,0.36125080545136845,0.5728626683643807,0.30843640651986487,0.7302877908178835,0.6813135909332683,0.03156749307975022,0.5760239677249146,0.37408289157205343,0.10692395488237844,0.4837753857649891,0.5994829444239229,0.6186828195007943,0.36237323499088975,0.020419838665754256,0.10274239999472454,0.0691213457406348,0.023403803950780913,0.03969952197776555,0.13625537683191552,0.024679126539613242,0.07835019152543272,0.03457828778642782,0.09433881938586854,0.024018415573396932,0.2195694586896973,0.2285726383900987,0.4896011092070652,0.10414089027337793,0.36763721768234386,0.05109783631135637,0.4800761498187739,0.3883340908437017,0.628359763088479,0.3700198814023767,0.771259920825639,0.16872026108509328,0.34072513616416217,0.44843602406663036,0.2606773283916026,0.6697912407093304,0.09286034468642984,0.7267080525582434,0.4757943539551303,0.3007207543649991,0.445924635855854,0.04754388524322732,0.7907212365613265,0.02882229799963724,0.06951459231438994,0.4865741200311152,0.37531485166493983,0.6170348346192002,0.17334463393769967,0.7270083057691287,0.045850084780965666,0.07909407598738223,0.3320149189809316,0.4076531918527329,0.6846220271475619,0.11301651365718114,0.412995495386027,0.05164064516338245,0.1011763249906435,0.3832457799439003,0.3860959027850666,0.7266834170118712,0.23217599086672283,0.028918891689416082,0.2103022912256288,0.225145588552345,0.5439138667101714,0.37002420548521453,0.702337699045885,0.25150221153828495,0.00533156215635663,0.3857914256063976,0.08462884290610813]");
	
	wavesurferTraxair = 'use strict';
/* global WaveSurfer, YT */

WaveSurfer.TraxitV2 = {
	init: function(pWavesurfer) {
		var wavesurfer = Object.create(pWavesurfer);

		wavesurfer.init({
	        height:80,
	        container: '#waveform',
	        waveColor: '#FFB499',
	        progressColor: '#ff661a',
	        selectionColor: 'transparent',
	        dragSelection : true,
	        cursorColor   : 'transparent',
	        minPxPerSec : 1,
	        backend: 'MediaElement',
	        loopSelection: false
	    });

	    this.wavesurfer = wavesurfer;
	},

	/**
	*	Load a media
	*   Params :
	*	pSourceType {String} : where the media comes from, ex: 'soundcloud', 'youtube'
	* 	pSource {String} : the media-to-load's url(for Youtube, provide video ID)
	*/
	load: function(pSourceType, pSource, pWaveform) {
		var me = this;
		var mediaElementReadyEvent = new Event('mediaElementReady');

		//Provide precalculated waveform to wavesurfer
		this.wavesurfer.backend.peaks = pWaveform;
		this.wavesurfer.drawBuffer();

		var mediaElement;
		if(pSourceType === 'soundcloud') {
			mediaElement = document.createElement('audio');
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

			this.mediaElement = mediaElement;
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
		    		this.playVideo();
		    	};

		    	mediaElement.pause = function() {
		    		this.pauseVideo();
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
		me.addAllMarks(trackList.tracks);
		if(pCallback && typeof pCallback === 'function') pCallback();
	},
	onProgress: function() {
		var lProgress = this.mediaElement.currentTime / this.mediaElement.duration;
		this.wavesurfer.drawer.progress(lProgress);
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
	var wavesurferTraxair = Object.create(WaveSurfer.TraxitV2);
	wavesurferTraxair.init(WaveSurfer);
	//wavesurferTraxair.load('soundcloud', 'https://api.soundcloud.com/tracks/187317483/stream?client_id=b6143a5b7e4ba50c1cf2f26f84497e60');
	//wavesurferTraxair.load('soundcloud', 'assets/music/Alan_Braxe_Intro.mp3');
	wavesurferTraxair.load('youtube', 'M7lc1UVf-VE', computedWaveform);
});

var trackList = {
    "id": "eachrESiA88s6NJL3a2T8i",
    "done": false,
    "source": {
      "audio_url": "https://api.soundcloud.com/tracks/187317483/stream?client_id=b6143a5b7e4ba50c1cf2f26f84497e60",
      "title": "Fact Mix Ben Klock",
      "url": "https://soundcloud.com/traxers2/fact-mix-ben-klock",
      "artwork_url": null,
      "genre": null,
      "user_name": "Traxers2",
      "site": "soundcloud",
      "id": "187317483"
    },
    "tracks": [
      {
        "track": {
          "id": "a58b72456d42cd1a9019ddcf7b71c0f3",
          "url": "http://localhost:8000/v1/track/a58b72456d42cd1a9019ddcf7b71c0f3/",
          "title": "Variance 4 (Regis Edit)",
          "artist": "Function",
          "duration": 447,
          "cover_url": null
        },
        "start": 0,
        "end": 330
      },
      {
        "track": {
          "id": "573551a5b669ce7ff635db6c6c1f7084",
          "url": "http://localhost:8000/v1/track/573551a5b669ce7ff635db6c6c1f7084/",
          "title": "The Darkness",
          "artist": "Liquid Sky",
          "duration": 391,
          "cover_url": null
        },
        "start": 330,
        "end": 410
      },
      {
        "track": {
          "id": "d31db4dd90abc353eb6c4d1b50fdb900",
          "url": "http://localhost:8000/v1/track/d31db4dd90abc353eb6c4d1b50fdb900/",
          "title": "The Lower Upside Down (Surgeon Remix)",
          "artist": "Shed",
          "duration": 368,
          "cover_url": null
        },
        "start": 410,
        "end": 573
      },
      {
        "track": {
          "id": "3de7d9a4b0a44363fecf7ef44c7396cb",
          "url": "http://localhost:8000/v1/track/3de7d9a4b0a44363fecf7ef44c7396cb/",
          "title": "ManMade",
          "artist": "Norman Nodge",
          "duration": 311,
          "cover_url": null
        },
        "start": 573,
        "end": 810
      },
      {
        "track": null,
        "start": 810,
        "end": 940
      },
      {
        "track": {
          "id": "89b76bec0d07f77396dc4e0715413f76",
          "url": "http://localhost:8000/v1/track/89b76bec0d07f77396dc4e0715413f76/",
          "title": "Ain't The Way It's Supposed To Be",
          "artist": "The Mole",
          "duration": 363,
          "cover_url": null
        },
        "start": 940,
        "end": 1221
      },
      {
        "track": {
          "id": "406ec454287292c5eb5eb612dc7b2f0c",
          "url": "http://localhost:8000/v1/track/406ec454287292c5eb5eb612dc7b2f0c/",
          "title": "Prowler",
          "artist": "Surgeon",
          "duration": 460,
          "cover_url": null
        },
        "start": 1221,
        "end": 1400
      },
      {
        "track": {
          "id": "f21882e8e206577fe9c4f73935fe544d",
          "url": "http://localhost:8000/v1/track/f21882e8e206577fe9c4f73935fe544d/",
          "title": "Busaru Beats",
          "artist": "Omar-S",
          "duration": 274,
          "cover_url": null
        },
        "start": 1400,
        "end": 1536
      },
      {
        "track": {
          "id": "5f8309e5a1728076ee82c2bedc6567ba",
          "url": "http://localhost:8000/v1/track/5f8309e5a1728076ee82c2bedc6567ba/",
          "title": "Grip",
          "artist": "Ben Klock",
          "duration": 295,
          "cover_url": null
        },
        "start": 1536,
        "end": 1730
      },
      {
        "track": {
          "id": "b784e00af7d4b651eee5cf6bb99d48c9",
          "url": "http://localhost:8000/v1/track/b784e00af7d4b651eee5cf6bb99d48c9/",
          "title": "Six Figures",
          "artist": "Levon Vincent",
          "duration": 519,
          "cover_url": null
        },
        "start": 1730,
        "end": 1830
      },
      {
        "track": null,
        "start": 1830,
        "end": 2007
      },
      {
        "track": null,
        "start": 2007,
        "end": 2160
      },
      {
        "track": {
          "id": "bcba96276e8b33706ad48d6b01330a1e",
          "url": "http://localhost:8000/v1/track/bcba96276e8b33706ad48d6b01330a1e/",
          "title": "Rush",
          "artist": "Norman Nodge",
          "duration": 302,
          "cover_url": null
        },
        "start": 2160,
        "end": 2213
      },
      {
        "track": {
          "id": "576cf6c53e9f9d097bb0ab3bb4239cce",
          "url": "http://localhost:8000/v1/track/576cf6c53e9f9d097bb0ab3bb4239cce/",
          "title": "Before One",
          "artist": "Ben Klock",
          "duration": 444,
          "cover_url": null
        },
        "start": 2213,
        "end": 2538
      },
      {
        "track": {
          "id": "b2333c69e2abc239dc713dcd9bd5003b",
          "url": "http://localhost:8000/v1/track/b2333c69e2abc239dc713dcd9bd5003b/",
          "title": "Sweet Lies (Radio Slave Remix)",
          "artist": "Booka Shade",
          "duration": 791,
          "cover_url": null
        },
        "start": 2538,
        "end": 2887
      },
      {
        "track": null,
        "start": 2887,
        "end": 3045
      },
      {
        "track": {
          "id": "f23df0116608294b585aed2849d91547",
          "url": "http://localhost:8000/v1/track/f23df0116608294b585aed2849d91547/",
          "title": "Simplicity",
          "artist": "Roman Lindau",
          "duration": 339,
          "cover_url": null
        },
        "start": 3045,
        "end": 3582
      }
    ]
  }