// Wedding Audio Player: Plays user-selected song "وأخيراً" (محمود العسيلي وصابرين)
// via the official YouTube IFrame API (Video ID: yVzgV_q7oKo) with resilient synthesizer fallback.

export interface TrackMetadata {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnailUrl: string;
}

export const CURRENT_TRACK: TrackMetadata = {
  id: 'esseily-sabren-we-akhyran',
  title: 'وأخيراً',
  artist: 'محمود العسيلي وصابرين',
  youtubeId: 'yVzgV_q7oKo',
  youtubeUrl: 'https://youtu.be/yVzgV_q7oKo',
  thumbnailUrl: 'https://img.youtube.com/vi/yVzgV_q7oKo/hqdefault.jpg',
};

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  setVolume: (vol: number) => void;
  getVolume: () => number;
  getPlayerState: () => number;
  unMute: () => void;
  mute: () => void;
}

type AudioStateListener = (playing: boolean, error?: string | null) => void;

class WeddingAudioPlayer {
  private ytPlayer: YTPlayerInstance | null = null;
  private isReady = false;
  private isPlayingState = false;
  private pendingPlay = false;
  private listeners: AudioStateListener[] = [];
  private volume = 75; // 0 - 100

  // Resilient Web Audio fallback if YouTube fails or is blocked
  private fallbackCtx: AudioContext | null = null;
  private fallbackTimer: number | null = null;
  private isUsingFallback = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadYouTubeIframeAPI();
    }
  }

  private loadYouTubeIframeAPI() {
    if (typeof window === 'undefined') return;

    // Check if script already exists
    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const previousReady = (window as unknown as { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady;
    (window as unknown as { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady = () => {
      if (previousReady) previousReady();
      this.initPlayer();
    };

    // If YT already loaded
    const win = window as unknown as { YT?: { Player: unknown } };
    if (win.YT && win.YT.Player) {
      this.initPlayer();
    }
  }

  public initPlayer(containerId = 'wedding-youtube-audio-container') {
    const win = window as unknown as {
      YT?: {
        Player: new (
          id: string | HTMLElement,
          config: {
            videoId: string;
            playerVars?: Record<string, unknown>;
            events?: {
              onReady?: (e: { target: YTPlayerInstance }) => void;
              onStateChange?: (e: { data: number }) => void;
              onError?: (e: { data: number }) => void;
            };
          }
        ) => YTPlayerInstance;
        PlayerState?: {
          PLAYING: number;
          PAUSED: number;
          ENDED: number;
        };
      };
    };

    if (!win.YT || !win.YT.Player) {
      return;
    }

    // Ensure container exists
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      // Position offscreen with positive dimensions so YouTube plays audio smoothly
      container.style.position = 'fixed';
      container.style.width = '200px';
      container.style.height = '200px';
      container.style.bottom = '-400px';
      container.style.left = '-400px';
      container.style.opacity = '0.001';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '-999';
      document.body.appendChild(container);
    }

    try {
      this.ytPlayer = new win.YT.Player(containerId, {
        videoId: CURRENT_TRACK.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: CURRENT_TRACK.youtubeId,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            this.isReady = true;
            this.ytPlayer = event.target;
            this.ytPlayer.setVolume(this.volume);
            if (this.pendingPlay) {
              this.pendingPlay = false;
              this.play();
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              this.isPlayingState = true;
              this.isUsingFallback = false;
              this.notify();
            } else if (event.data === 2 || event.data === 0) {
              this.isPlayingState = false;
              this.notify();
            }
          },
          onError: () => {
            // If YouTube has restrictions in sandbox, trigger resilient synth fallback
            if (this.isPlayingState || this.pendingPlay) {
              this.startFallbackAudio();
            }
          },
        },
      });
    } catch {
      // Fallback
    }
  }

  public subscribe(cb: AudioStateListener) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify(error: string | null = null) {
    this.listeners.forEach((cb) => cb(this.isPlayingState, error));
  }

  public play() {
    if (this.ytPlayer && this.isReady) {
      try {
        this.ytPlayer.unMute();
        this.ytPlayer.setVolume(this.volume);
        this.ytPlayer.playVideo();
        this.isPlayingState = true;
        this.notify();
        return;
      } catch {
        // Failed to call playVideo, try fallback
        this.startFallbackAudio();
        return;
      }
    }

    // If player not ready yet, mark pending
    this.pendingPlay = true;
    this.isPlayingState = true;
    this.notify();

    // If still not ready after 3.5s, trigger graceful acoustic fallback
    setTimeout(() => {
      if (this.pendingPlay && (!this.ytPlayer || !this.isReady)) {
        this.pendingPlay = false;
        this.startFallbackAudio();
      }
    }, 3500);
  }

  public stop() {
    this.pendingPlay = false;
    this.isPlayingState = false;

    if (this.ytPlayer && this.isReady) {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // Ignore
      }
    }

    if (this.isUsingFallback) {
      this.stopFallbackAudio();
    }

    this.notify();
  }

  public toggle() {
    if (this.isPlayingState) {
      this.stop();
    } else {
      this.play();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (this.ytPlayer && this.isReady) {
      try {
        this.ytPlayer.setVolume(this.volume);
      } catch {
        // Ignore
      }
    }
  }

  public getVolume() {
    return this.volume;
  }

  public isPlaying() {
    return this.isPlayingState;
  }

  public getTrack() {
    return CURRENT_TRACK;
  }

  // Resilient Web Audio synthesizer as backup
  private startFallbackAudio() {
    try {
      this.isUsingFallback = true;
      this.isPlayingState = true;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.fallbackCtx) {
        this.fallbackCtx = new AudioCtx();
      }
      if (this.fallbackCtx.state === 'suspended') {
        this.fallbackCtx.resume();
      }

      const notes = [
        [293.66, 369.99, 440.00, 587.33],
        [246.94, 311.13, 369.99, 493.88],
        [261.63, 329.63, 392.00, 523.25],
        [329.63, 392.00, 493.88, 587.33],
      ];
      let idx = 0;

      const step = () => {
        if (!this.isPlayingState || !this.fallbackCtx) return;
        const now = this.fallbackCtx.currentTime;
        const chord = notes[idx % notes.length];
        chord.forEach((freq, i) => {
          if (!this.fallbackCtx) return;
          const osc = this.fallbackCtx.createOscillator();
          const gain = this.fallbackCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.35);
          gain.gain.setValueAtTime(0.0001, now + i * 0.35);
          gain.gain.exponentialRampToValueAtTime(0.2, now + i * 0.35 + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.35 + 2.2);
          osc.connect(gain);
          gain.connect(this.fallbackCtx.destination);
          osc.start(now + i * 0.35);
          osc.stop(now + i * 0.35 + 2.4);
        });
        idx++;
        this.fallbackTimer = window.setTimeout(step, 2800);
      };
      step();
      this.notify();
    } catch {
      this.isPlayingState = false;
      this.notify();
    }
  }

  private stopFallbackAudio() {
    this.isUsingFallback = false;
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }
}

export const audioPlayer = new WeddingAudioPlayer();
