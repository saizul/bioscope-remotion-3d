# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- `src/timeline.ts`: one source of truth for scene start frames, lengths, fps and size.
- `npm run check` (`scripts/check-timeline.ts`): validates the timeline, the voice-over
  script and the SFX cue list against each other (gaps/overlaps, 2:00 total, voice-over
  frames per scene, narration pace, SFX ids, files, volumes and scene ranges).
- Unit tests (`npm test`, node:test via tsx) and CI steps for the check and the tests.

### Changed
- `Root.tsx` and `MainVideo.tsx` build their compositions and sequences from
  `timeline.ts` instead of repeating frame numbers.
- SFX cue data moved to `src/sfxTriggers.ts` (still re-exported from `sfxConfig.tsx`).

## [1.0.0]

- Six-scene, 120-second 3D corporate video with SFX and voice-over timeline.
