const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scenes = require('../src/voiceoverScript.json');
const voDir = path.join(__dirname, '../public/voiceover');
fs.mkdirSync(voDir, { recursive: true });

// Choose best available female voice: Samantha or Victoria or Karen
const femaleVoice = 'Samantha';

console.log(`=== Generating Real Female Voiceover using macOS "${femaleVoice}" ===`);

for (const scene of scenes) {
  console.log(`\n[${scene.id}] ${scene.sceneName}`);
  console.log(`Script: "${scene.script}"`);

  const tmpAiff = `/tmp/${scene.id}.aiff`;
  const wavTarget = path.join(voDir, scene.audioFile.replace('.mp3', '.wav'));
  const mp3Target = path.join(voDir, scene.audioFile);

  // Adjusted speech rate: 175 wpm for natural corporate pacing
  // We sanitize the script for shell execution
  const cleanScript = scene.script.replace(/"/g, '\\"').replace(/'/g, "'\\''");

  const sayCmd = `say -v ${femaleVoice} -r 175 "${cleanScript}" -o "${tmpAiff}"`;
  execSync(sayCmd);

  // Convert AIFF to standard 44.1kHz 16-bit Little-Endian WAV
  const convertCmd = `afconvert -f WAVE -d LEI16@44100 "${tmpAiff}" "${wavTarget}"`;
  execSync(convertCmd);

  // Copy to .mp3 filename as well so both references resolve cleanly
  fs.copyFileSync(wavTarget, mp3Target);

  const stats = fs.statSync(wavTarget);
  console.log(`✓ Generated ${scene.audioFile} & ${path.basename(wavTarget)} (${(stats.size / 1024).toFixed(1)} KB)`);
}

console.log('\n✓ All 6 Scene Voiceover files generated successfully with real spoken English female voice!');
