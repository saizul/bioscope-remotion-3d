/**
 * Professional English Female Voiceover Generator for Bioscope Limited 3D Video
 *
 * Supported TTS Engines:
 * 1. Microsoft Edge TTS (Free, high-quality neural female voice: en-US-AriaNeural / en-US-JennyNeural)
 *    Command: pip install edge-tts
 * 2. OpenAI Audio API (Model: tts-1, Voice: 'nova' or 'shimmer')
 * 3. ElevenLabs API (Custom studio female voice)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scripts = require('../src/voiceoverScript.json');
const outputDir = path.join(__dirname, '../public/voiceover');
fs.mkdirSync(outputDir, { recursive: true });

async function generateWithEdgeTTS() {
  console.log('--- Generating Female Voiceover using Edge-TTS (Voice: en-US-AriaNeural) ---');
  for (const scene of scripts) {
    const outputPath = path.join(outputDir, scene.audioFile);
    console.log(`[${scene.id}] Generating: "${scene.script.slice(0, 50)}..."`);

    try {
      // Use edge-tts CLI (free, natural neural female voice)
      const sanitizedText = scene.script.replace(/"/g, '\\"');
      const cmd = `edge-tts --voice en-US-AriaNeural --text "${sanitizedText}" --write-media "${outputPath}"`;
      execSync(cmd, { stdio: 'inherit' });
      console.log(`✓ Saved: ${scene.audioFile}`);
    } catch (err) {
      console.warn(`! Edge-TTS CLI not found or failed. You can install it using: pip install edge-tts`);
      console.log(`Alternative: Use ElevenLabs or OpenAI TTS with voice "nova".`);
      break;
    }
  }
}

async function generateWithOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('No OPENAI_API_KEY detected. Falling back to edge-tts check or instructions.');
    return false;
  }

  console.log('--- Generating Female Voiceover with OpenAI TTS (Voice: nova) ---');
  // Dynamic fetch for node 18+
  for (const scene of scripts) {
    const outputPath = path.join(outputDir, scene.audioFile);
    console.log(`[${scene.id}] Requesting OpenAI TTS...`);
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'nova', // Professional clear female voice
        input: scene.script,
      }),
    });

    if (!res.ok) {
      console.error(`Error generating voiceover: ${res.statusText}`);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ Saved: ${scene.audioFile}`);
  }
  return true;
}

async function main() {
  if (process.env.OPENAI_API_KEY) {
    await generateWithOpenAI();
  } else {
    try {
      await generateWithEdgeTTS();
    } catch (e) {
      console.log('To generate voiceover with Free Edge-TTS:');
      console.log('1. pip install edge-tts');
      console.log('2. npm run tts');
    }
  }
}

main();
