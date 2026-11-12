import test from 'node:test';
import assert from 'node:assert/strict';
import voiceover from '../src/voiceoverScript.json';
import { SFX_TRIGGERS } from '../src/sfxTriggers';
import { FPS, SCENES, TOTAL_FRAMES, sceneNumberAt, type SceneSpec } from '../src/timeline';
import { checkScenes, checkSfx, checkVoiceover, countWords, formatTime, speechSeconds } from '../src/lib/timelineCheck';
import { collectIssues } from '../scripts/check-timeline';
import type { SFXTrigger, VoiceoverScene } from '../src/types';

const errors = (issues: { level: string; message: string }[]) => issues.filter((i) => i.level === 'error').map((i) => i.message);
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

test('the shipped timeline, voice-over and SFX are consistent', () => {
  assert.deepEqual(collectIssues(), []);
  assert.equal(TOTAL_FRAMES, 3600);
});

test('sceneNumberAt and formatTime', () => {
  assert.equal(sceneNumberAt(0), 1);
  assert.equal(sceneNumberAt(449), 1);
  assert.equal(sceneNumberAt(450), 2);
  assert.equal(sceneNumberAt(3599), 6);
  assert.equal(sceneNumberAt(3600), 0);
  assert.equal(formatTime(1950, 30), '1:05');
  assert.equal(formatTime(3600, 30), '2:00');
});

test('gaps, overlaps, wrong start and wrong total are errors', () => {
  const scenes: SceneSpec[] = clone([...SCENES]);
  scenes[0].from = 5;
  scenes[2].from = 1060; // gap after scene 2
  scenes[4].from = 2840; // overlap
  const msgs = errors(checkScenes(scenes, 3600)).join('\n');
  assert.match(msgs, /first scene must start at frame 0/);
  assert.match(msgs, /gap/);
  assert.match(msgs, /overlap/);
  scenes.length = 5;
  assert.ok(errors(checkScenes(scenes, 3600)).some((m) => /expected 3600/.test(m)));
  const dup: SceneSpec[] = clone([...SCENES]);
  dup[1].key = dup[0].key;
  assert.match(errors(checkScenes(dup))[0], /duplicate scene key/);
});

test('voice-over must follow the timeline', () => {
  const vo: VoiceoverScene[] = clone(voiceover);
  vo[1].durationInFrames = 610;
  vo[2].startFrame = 1000;
  vo[3].audioFile = vo[0].audioFile;
  vo[4].audioFile = '../escape.mp3';
  const msgs = errors(checkVoiceover(vo, SCENES, FPS)).join('\n');
  assert.match(msgs, /durationInFrames is 610/);
  assert.match(msgs, /do not match Scene3-WhyOrganizations/);
  assert.match(msgs, /used twice/);
  assert.match(msgs, /plain \.mp3/);
  assert.match(errors(checkVoiceover(vo.slice(0, 5), SCENES, FPS))[0], /5 entries for 6 scenes/);
});

test('narration that cannot fit its scene and stale timeRange are warnings', () => {
  const vo: VoiceoverScene[] = clone(voiceover);
  vo[5].script = Array(80).fill('word').join(' ');
  (vo[0] as VoiceoverScene & { timeRange: string }).timeRange = '0:00 - 0:14';
  const warnings = checkVoiceover(vo, SCENES, FPS).filter((i) => i.level === 'warning');
  assert.equal(warnings.length, 2);
  assert.match(warnings[0].message, /should be "0:00 - 0:15"/);
  assert.match(warnings[1].message, /80 words need about 30\.0 s/);
  vo[2].script = '  ';
  assert.ok(errors(checkVoiceover(vo, SCENES, FPS)).includes('script is empty'));
});

test('word counting and speech time', () => {
  assert.equal(countWords("We're Bangladesh's trusted partner—across all 64 districts."), 8);
  assert.equal(speechSeconds(Array(160).fill('a').join(' ')), 60);
});

test('SFX: duplicates, range, file, volume and scene prefix', () => {
  const sfx: SFXTrigger[] = clone(SFX_TRIGGERS);
  sfx.push({ ...sfx[0] });
  sfx.push({ id: 's1_late', name: 'x', frame: 500, file: 'pop.mp3', volume: 0.5 });
  sfx.push({ id: 'x_end', name: 'x', frame: 3600, file: 'pop.mp3', volume: 0.5 });
  sfx.push({ id: 's6_bad', name: 'x', frame: 3300, file: 'boom.wav', volume: 1.5 });
  const msgs = errors(checkSfx(sfx, SCENES, TOTAL_FRAMES)).join('\n');
  assert.match(msgs, /duplicate id/);
  assert.match(msgs, /id says scene 1 but frame 500 is in scene 2/);
  assert.match(msgs, /frame 3600 is outside the video/);
  assert.match(msgs, /unknown file "boom\.wav"/);
  assert.match(msgs, /volume must be between 0 and 1/);
});
