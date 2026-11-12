/**
 * Consistency checks between the master timeline (timeline.ts), the voice-over script
 * (voiceoverScript.json) and the SFX cue list (sfxTriggers.ts). Pure functions, no React.
 */
import type { SFXTrigger, VoiceoverScene } from '../types';
import type { SceneSpec } from '../timeline';

export type Issue = { level: 'error' | 'warning'; where: string; message: string };

export const SFX_FILES = ['whoosh.mp3', 'swoosh.mp3', 'pop.mp3', 'click.mp3', 'chime.mp3'] as const;

/** Comfortable narration pace for a TTS voice; above this the voice-over will not fit. */
export const MAX_WORDS_PER_MINUTE = 160;

const isInt = (n: unknown): n is number => typeof n === 'number' && Number.isInteger(n);

/** Frames to "m:ss" at the given fps, e.g. 1950 @ 30 -> "1:05". */
export const formatTime = (frames: number, fps: number) => {
  const total = Math.round(frames / fps);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

export const countWords = (text: string) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,-]*/gu) ?? []).length;

/** Seconds needed to read `text` at `wpm` words per minute. */
export const speechSeconds = (text: string, wpm = MAX_WORDS_PER_MINUTE) => (countWords(text) / wpm) * 60;

export function checkScenes(scenes: readonly SceneSpec[], expectedTotal?: number): Issue[] {
  const issues: Issue[] = [];
  let cursor = 0;
  const keys = new Set<string>();
  const ids = new Set<string>();
  scenes.forEach((s, i) => {
    const where = `timeline: ${s.compositionId}`;
    if (keys.has(s.key)) issues.push({ level: 'error', where, message: `duplicate scene key "${s.key}"` });
    if (ids.has(s.compositionId)) issues.push({ level: 'error', where, message: 'duplicate composition id' });
    keys.add(s.key);
    ids.add(s.compositionId);
    if (!isInt(s.durationInFrames) || s.durationInFrames < 1) {
      issues.push({ level: 'error', where, message: `durationInFrames must be a positive integer (got ${s.durationInFrames})` });
    }
    if (s.from !== cursor) {
      issues.push({
        level: 'error',
        where,
        message: i === 0 ? `first scene must start at frame 0 (got ${s.from})` : `starts at ${s.from} but the previous scene ends at ${cursor} (${s.from > cursor ? 'gap' : 'overlap'})`,
      });
    }
    cursor = s.from + s.durationInFrames;
  });
  if (expectedTotal !== undefined && cursor !== expectedTotal) {
    issues.push({ level: 'error', where: 'timeline', message: `scenes end at ${cursor}, expected ${expectedTotal}` });
  }
  return issues;
}

export function checkVoiceover(vo: readonly VoiceoverScene[], scenes: readonly SceneSpec[], fps: number): Issue[] {
  const issues: Issue[] = [];
  if (vo.length !== scenes.length) {
    issues.push({ level: 'error', where: 'voiceoverScript.json', message: `${vo.length} entries for ${scenes.length} scenes` });
  }
  const files = new Set<string>();
  vo.forEach((v, i) => {
    const where = `voiceoverScript.json: ${v.id}`;
    const scene = scenes[i];
    if (v.endFrame - v.startFrame !== v.durationInFrames) {
      issues.push({ level: 'error', where, message: `endFrame - startFrame = ${v.endFrame - v.startFrame} but durationInFrames is ${v.durationInFrames}` });
    }
    if (scene && (v.startFrame !== scene.from || v.durationInFrames !== scene.durationInFrames)) {
      issues.push({
        level: 'error',
        where,
        message: `frames ${v.startFrame}-${v.endFrame} do not match ${scene.compositionId} (${scene.from}-${scene.from + scene.durationInFrames}); update the JSON after changing timeline.ts`,
      });
    }
    const expectedRange = `${formatTime(v.startFrame, fps)} - ${formatTime(v.endFrame, fps)}`;
    const range = (v as VoiceoverScene & { timeRange?: string }).timeRange;
    if (range !== undefined && range !== expectedRange) {
      issues.push({ level: 'warning', where, message: `timeRange "${range}" should be "${expectedRange}"` });
    }
    if (!/^[\w.-]+\.(mp3|wav|m4a)$/i.test(v.audioFile)) {
      issues.push({ level: 'error', where, message: `audioFile "${v.audioFile}" must be a plain .mp3/.wav/.m4a file name` });
    }
    if (files.has(v.audioFile)) issues.push({ level: 'error', where, message: `audioFile "${v.audioFile}" is used twice` });
    files.add(v.audioFile);
    if (!v.script || !v.script.trim()) {
      issues.push({ level: 'error', where, message: 'script is empty' });
    } else {
      const need = speechSeconds(v.script);
      const have = v.durationInFrames / fps;
      if (need > have) {
        issues.push({
          level: 'warning',
          where,
          message: `${countWords(v.script)} words need about ${need.toFixed(1)} s at ${MAX_WORDS_PER_MINUTE} wpm but the scene is ${have.toFixed(1)} s; the narration will be cut off`,
        });
      }
    }
  });
  return issues;
}

export function checkSfx(triggers: readonly SFXTrigger[], scenes: readonly SceneSpec[], total: number): Issue[] {
  const issues: Issue[] = [];
  const ids = new Set<string>();
  const sceneAt = (frame: number) => scenes.findIndex((s) => frame >= s.from && frame < s.from + s.durationInFrames) + 1;
  triggers.forEach((t) => {
    const where = `sfxTriggers.ts: ${t.id}`;
    if (ids.has(t.id)) issues.push({ level: 'error', where, message: 'duplicate id' });
    ids.add(t.id);
    if (!isInt(t.frame) || t.frame < 0 || t.frame >= total) {
      issues.push({ level: 'error', where, message: `frame ${t.frame} is outside the video (0-${total - 1})` });
      return;
    }
    if (!(SFX_FILES as readonly string[]).includes(t.file)) {
      issues.push({ level: 'error', where, message: `unknown file "${t.file}" (expected one of ${SFX_FILES.join(', ')})` });
    }
    if (typeof t.volume !== 'number' || t.volume < 0 || t.volume > 1) {
      issues.push({ level: 'error', where, message: `volume must be between 0 and 1 (got ${t.volume})` });
    }
    const m = /^s(\d+)_/.exec(t.id);
    const actual = sceneAt(t.frame);
    if (m && Number(m[1]) !== actual) {
      issues.push({ level: 'error', where, message: `id says scene ${m[1]} but frame ${t.frame} is in scene ${actual}` });
    }
  });
  return issues;
}
