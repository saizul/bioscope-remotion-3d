import React from 'react';
import { Composition, Folder } from 'remotion';
import { MainVideo } from './MainVideo';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Services } from './scenes/Scene2Services';
import { Scene3WhyOrganizations } from './scenes/Scene3WhyOrganizations';
import { Scene4WhyJobSeekers } from './scenes/Scene4WhyJobSeekers';
import { Scene5Compliance } from './scenes/Scene5Compliance';
import { Scene6Outro } from './scenes/Scene6Outro';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Complete 2-Minute Master 3D Video (3600 frames, 120s @ 30fps) */}
      <Composition
        id="BioscopeCorporateVideo"
        component={MainVideo}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual Scene Previews for Easy Development & Fine-Tuning */}
      <Folder name="Scenes">
        <Composition
          id="Scene1-Intro"
          component={Scene1Intro}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene2-Services"
          component={Scene2Services}
          durationInFrames={600}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene3-WhyOrganizations"
          component={Scene3WhyOrganizations}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene4-WhyJobSeekers"
          component={Scene4WhyJobSeekers}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene5-Compliance"
          component={Scene5Compliance}
          durationInFrames={390}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene6-Outro"
          component={Scene6Outro}
          durationInFrames={360}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
