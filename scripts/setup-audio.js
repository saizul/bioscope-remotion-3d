const fs = require('fs');
const path = require('path');

// Ensure directories exist
const sfxDir = path.join(__dirname, '../public/sfx');
const voDir = path.join(__dirname, '../public/voiceover');
fs.mkdirSync(sfxDir, { recursive: true });
fs.mkdirSync(voDir, { recursive: true });

// Helper to create a valid 16-bit mono PCM WAV buffer
function createWavBuffer(sampleRate, durationSeconds, sampleGenerator) {
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // RIFF identifier
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);

  // 'fmt ' chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Chunk size
  buffer.writeUInt16LE(1, 20); // Audio format: PCM
  buffer.writeUInt16LE(1, 22); // Channels: 1
  buffer.writeUInt32LE(sampleRate, 24); // Sample rate
  buffer.writeUInt32LE(sampleRate * 2, 28); // Byte rate
  buffer.writeUInt16LE(2, 32); // Block align
  buffer.writeUInt16LE(16, 34); // Bits per sample

  // 'data' chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.max(-1, Math.min(1, sampleGenerator(t, durationSeconds, i)));
    buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

const sampleRate = 44100;

// 1. Whoosh SFX (Swelling noise with bandpass feel)
const whoosh = createWavBuffer(sampleRate, 0.8, (t, dur) => {
  const env = Math.sin((t / dur) * Math.PI);
  const noise = (Math.random() * 2 - 1) * 0.4;
  const tone = Math.sin(2 * Math.PI * (120 + 300 * (t / dur)) * t) * 0.6;
  return (noise + tone) * env;
});

// 2. Swoosh SFX (Quick aerodynamic pitch shift)
const swoosh = createWavBuffer(sampleRate, 0.5, (t, dur) => {
  const env = Math.sin((t / dur) * Math.PI);
  const freq = 450 - 250 * (t / dur);
  return Math.sin(2 * Math.PI * freq * t) * env * 0.8;
});

// 3. Pop SFX (Fast snappy bubble pop)
const pop = createWavBuffer(sampleRate, 0.15, (t, dur) => {
  const env = Math.exp(-t * 28);
  const freq = 600 - 450 * (t / dur);
  return Math.sin(2 * Math.PI * freq * t) * env;
});

// 4. Click SFX (Crisp mechanical tick)
const click = createWavBuffer(sampleRate, 0.08, (t) => {
  const env = Math.exp(-t * 60);
  return (Math.sin(2 * Math.PI * 1800 * t) * 0.6 + (Math.random() * 2 - 1) * 0.4) * env;
});

// 5. Chime SFX (Rich crystal harmonic bell with decay)
const chime = createWavBuffer(sampleRate, 1.8, (t) => {
  const env = Math.exp(-t * 2.2);
  const harmonic1 = Math.sin(2 * Math.PI * 880 * t) * 0.5;
  const harmonic2 = Math.sin(2 * Math.PI * 1320 * t) * 0.3;
  const harmonic3 = Math.sin(2 * Math.PI * 1760 * t) * 0.2;
  return (harmonic1 + harmonic2 + harmonic3) * env;
});

// Write sound effects
fs.writeFileSync(path.join(sfxDir, 'whoosh.mp3'), whoosh);
fs.writeFileSync(path.join(sfxDir, 'swoosh.mp3'), swoosh);
fs.writeFileSync(path.join(sfxDir, 'pop.mp3'), pop);
fs.writeFileSync(path.join(sfxDir, 'click.mp3'), click);
fs.writeFileSync(path.join(sfxDir, 'chime.mp3'), chime);

console.log('✓ Successfully created all 5 UI sound effects (whoosh, swoosh, pop, click, chime) in public/sfx/');

// Write placeholder audio for voiceovers so Remotion can render immediately
const emptyAudio = createWavBuffer(sampleRate, 1.0, () => 0);
for (let i = 1; i <= 6; i++) {
  const voFile = path.join(voDir, `voiceover_scene${i}.mp3`);
  if (!fs.existsSync(voFile)) {
    fs.writeFileSync(voFile, emptyAudio);
  }
}
console.log('✓ Successfully created voiceover audio slots (scene 1 - 6) in public/voiceover/');
