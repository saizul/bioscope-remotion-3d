/**
 * Single source of truth for the master timeline. Root.tsx (scene previews), MainVideo.tsx
 * (master sequence) and scripts/check-timeline.ts all read these numbers, so a scene can
 * be lengthened in one place. Keep this file free of React imports so it runs in Node.
 */
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export type SceneKey = 'intro' | 'services' | 'organizations' | 'jobSeekers' | 'compliance' | 'outro';

export type SceneSpec = {
  key: SceneKey;
  /** Composition id of the standalone preview in the "Scenes" folder. */
  compositionId: string;
  name: string;
  from: number;
  durationInFrames: number;
};

export const SCENES: readonly SceneSpec[] = [
  { key: 'intro', compositionId: 'Scene1-Intro', name: 'Scene 1: 3D Intro & Hook', from: 0, durationInFrames: 450 },
  { key: 'services', compositionId: 'Scene2-Services', name: 'Scene 2: Core Services & Stats', from: 450, durationInFrames: 600 },
  { key: 'organizations', compositionId: 'Scene3-WhyOrganizations', name: 'Scene 3: Why Organizations', from: 1050, durationInFrames: 900 },
  { key: 'jobSeekers', compositionId: 'Scene4-WhyJobSeekers', name: 'Scene 4: Why Job Seekers', from: 1950, durationInFrames: 900 },
  { key: 'compliance', compositionId: 'Scene5-Compliance', name: 'Scene 5: Trust & Compliance', from: 2850, durationInFrames: 390 },
  { key: 'outro', compositionId: 'Scene6-Outro', name: 'Scene 6: CTA & Outro', from: 3240, durationInFrames: 360 },
];

export const TOTAL_FRAMES = SCENES.reduce((sum, s) => sum + s.durationInFrames, 0);

/** 1-based scene number that contains `frame`, or 0 when it is outside the video. */
export const sceneNumberAt = (frame: number): number => {
  const i = SCENES.findIndex((s) => frame >= s.from && frame < s.from + s.durationInFrames);
  return i + 1;
};
