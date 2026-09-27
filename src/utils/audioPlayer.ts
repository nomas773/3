// Web Audio API Synthesizer for romantic acoustic harp & oriental wedding ambient music
// Completely client-side, zero CORS / 404 network failure risks.

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlayingState = false;
  private timer: number | null = null;
  private volumeGain: GainNode | null = null;
  private masterVolume = 0.25;
  private listeners: ((playing: boolean) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeGain = this.ctx.createGain();
      this.volumeGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.volumeGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlayingState));
  }

  // Plays a gentle plucked chord note (like an oud / harp string)
  private playPluck(freq: number, startTime: number, duration: number = 2.4, decay: number = 0.08) {
    if (!this.ctx || !this.volumeGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 1.002, startTime); // subtle chorus detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration * 0.7);

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.28, startTime + decay);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.volumeGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  public toggle() {
    if (this.isPlayingState) {
      this.stop();
    } else {
      this.play();
    }
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.isPlayingState = true;
      this.notify();

      // Wedding chord progression (Hijaz/Bayat inspired gentle acoustic arpeggios):
      // D4, F#4, A4, C5, B4, G4, E4, D4
      const notes = [
        [293.66, 369.99, 440.00, 587.33], // D major
        [246.94, 311.13, 369.99, 493.88], // Bm
        [261.63, 329.63, 392.00, 523.25], // C / G
        [329.63, 392.00, 493.88, 587.33], // Em
        [293.66, 369.99, 440.00, 554.37], // Dmaj7
      ];

      let chordIdx = 0;
      const playNextArpeggio = () => {
        if (!this.isPlayingState || !this.ctx) return;
        const now = this.ctx.currentTime;
        const currentChord = notes[chordIdx % notes.length];
        
        currentChord.forEach((freq, i) => {
          this.playPluck(freq, now + i * 0.35, 2.5);
        });

        // Add soft high chime
        if (chordIdx % 2 === 0) {
          this.playPluck(currentChord[currentChord.length - 1] * 1.5, now + 1.2, 3.0, 0.05);
        }

        chordIdx++;
        this.timer = window.setTimeout(playNextArpeggio, 2600);
      };

      playNextArpeggio();
    } catch {
      this.isPlayingState = false;
      this.notify();
    }
  }

  public stop() {
    this.isPlayingState = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.notify();
  }

  public isPlaying() {
    return this.isPlayingState;
  }
}

export const audioPlayer = new WeddingAudioPlayer();
