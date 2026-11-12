import type React from 'react';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Services } from './scenes/Scene2Services';
import { Scene3WhyOrganizations } from './scenes/Scene3WhyOrganizations';
import { Scene4WhyJobSeekers } from './scenes/Scene4WhyJobSeekers';
import { Scene5Compliance } from './scenes/Scene5Compliance';
import { Scene6Outro } from './scenes/Scene6Outro';
import type { SceneKey } from './timeline';

export const SCENE_COMPONENTS: Record<SceneKey, React.FC> = {
  intro: Scene1Intro,
  services: Scene2Services,
  organizations: Scene3WhyOrganizations,
  jobSeekers: Scene4WhyJobSeekers,
  compliance: Scene5Compliance,
  outro: Scene6Outro,
};
