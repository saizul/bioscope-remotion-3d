// Validates timeline.ts, voiceoverScript.json and sfxTriggers.ts against each other.
// Usage: npx tsx scripts/check-timeline.ts [--strict]   (exit 1 on errors; --strict also on warnings)
import voiceover from '../src/voiceoverScript.json';
import { SFX_TRIGGERS } from '../src/sfxTriggers';
import { FPS, SCENES, TOTAL_FRAMES } from '../src/timeline';
import { checkScenes, checkSfx, checkVoiceover, type Issue } from '../src/lib/timelineCheck';

export const EXPECTED_TOTAL = 120 * FPS; // the brief: exactly 2 minutes

export const collectIssues = (): Issue[] => [
  ...checkScenes(SCENES, EXPECTED_TOTAL),
  ...checkVoiceover(voiceover, SCENES, FPS),
  ...checkSfx(SFX_TRIGGERS, SCENES, TOTAL_FRAMES),
];

if (process.argv[1] && /check-timeline\.ts$/.test(process.argv[1])) {
  const strict = process.argv.includes('--strict');
  const issues = collectIssues();
  for (const i of issues) console.log(`${i.level === 'error' ? 'ERROR' : 'warn '}  ${i.where}: ${i.message}`);
  const errors = issues.filter((i) => i.level === 'error').length;
  const warnings = issues.length - errors;
  console.log(`${SCENES.length} scenes, ${voiceover.length} voice-over lines, ${SFX_TRIGGERS.length} sound effects: ${errors} error(s), ${warnings} warning(s)`);
  process.exit(errors || (strict && warnings) ? 1 : 0);
}
