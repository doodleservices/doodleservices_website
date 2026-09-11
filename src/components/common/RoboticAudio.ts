"use client";

/**
 * Robotic Web Audio API Sound Synthesizer
 * Generates futuristic robotic ringtones, mechanical servo sweeps, and telemetry beeps.
 * Zero external audio files required — 100% lightweight and instant.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Initialize AudioContext on user interaction
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("doodle_sfx_enabled");
  if (stored === null) return true; // Default to ON
  return stored === "true";
}

export function setAudioEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("doodle_sfx_enabled", enabled ? "true" : "false");
  }
  if (enabled) {
    playRoboticRingtone();
  }
}

/**
 * Play an iconic 4-note ascending cybernetic robot ringtone / boot sequence
 */
export function playRoboticRingtone(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 440, time: 0, dur: 0.08 },
    { freq: 587.33, time: 0.09, dur: 0.08 },
    { freq: 880, time: 0.18, dur: 0.12 },
    { freq: 1174.66, time: 0.32, dur: 0.22 },
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, now + time);
    // Slight robotic pitch glide
    osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + time + dur);

    gain.gain.setValueAtTime(0.001, now + time);
    gain.gain.linearRampToValueAtTime(0.12, now + time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    // Bandpass for metallic resonance
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq * 1.5, now + time);
    filter.Q.value = 4.0;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

/**
 * Futuristic telemetry chirp on button hover
 */
export function playRoboticChirp(): void {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(980, now);
  osc.frequency.exponentialRampToValueAtTime(1480, now + 0.06);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Mechanical servo slide on navigation / section clicks
 */
export function playMechanicalServo(): void {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.linearRampToValueAtTime(380, now + 0.08);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}
