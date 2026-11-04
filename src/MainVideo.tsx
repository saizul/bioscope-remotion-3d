import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2Services } from './scenes/Scene2Services';
import { Scene3WhyOrganizations } from './scenes/Scene3WhyOrganizations';
import { Scene4WhyJobSeekers } from './scenes/Scene4WhyJobSeekers';
import { Scene5Compliance } from './scenes/Scene5Compliance';
import { Scene6Outro } from './scenes/Scene6Outro';
import { SFXLayer } from './sfxConfig';
import voiceoverData from './voiceoverScript.json';

export const MainVideo: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#050a14',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* =========================================================================
          VIDEO SCENES TIMELINE (Total: 3600 frames | 120 seconds at 30 fps)
          ========================================================================= */}
      
      {/* Scene 1: 3D Intro & Brand Hook (0:00 – 0:15 | Frames 0 – 450) */}
      <Sequence from={0} durationInFrames={450} name="Scene 1: 3D Intro & Hook">
        <Scene1Intro />
      </Sequence>

      {/* Scene 2: 6 Core Services & Impact Numbers (0:15 – 0:35 | Frames 450 – 1050) */}
      <Sequence from={450} durationInFrames={600} name="Scene 2: Core Services & Stats">
        <Scene2Services />
      </Sequence>

      {/* Scene 3: Why Organizations Request Manpower (0:35 – 1:05 | Frames 1050 – 1950) */}
      <Sequence from={1050} durationInFrames={900} name="Scene 3: Why Organizations">
        <Scene3WhyOrganizations />
      </Sequence>

      {/* Scene 4: Why Job Seekers Should Apply (1:05 – 1:35 | Frames 1950 – 2850) */}
      <Sequence from={1950} durationInFrames={900} name="Scene 4: Why Job Seekers">
        <Scene4WhyJobSeekers />
      </Sequence>

      {/* Scene 5: Trust, Compliance & Credentials (1:35 – 1:48 | Frames 2850 – 3240) */}
      <Sequence from={2850} durationInFrames={390} name="Scene 5: Trust & Compliance">
        <Scene5Compliance />
      </Sequence>

      {/* Scene 6: Call to Action & Contact Outro (1:48 – 2:00 | Frames 3240 – 3600) */}
      <Sequence from={3240} durationInFrames={360} name="Scene 6: CTA & Outro">
        <Scene6Outro />
      </Sequence>

      {/* =========================================================================
          VOICEOVER TIMELINE (Professional English Female Voiceover)
          ========================================================================= */}
      {voiceoverData.map((vo) => (
        <Sequence
          key={vo.id}
          from={vo.startFrame}
          durationInFrames={vo.durationInFrames}
          name={`VO: ${vo.sceneName}`}
        >
          <Audio
            src={staticFile(`voiceover/${vo.audioFile}`)}
            volume={1.0}
          />
        </Sequence>
      ))}

      {/* =========================================================================
          SFX TIMELINE (Crisp UI Sound Effects: whoosh, pop, swoosh, chime, click)
          NOTE: NO BACKGROUND MUSIC INCLUDED AS PER SPECIFICATION
          ========================================================================= */}
      <SFXLayer />
    </div>
  );
};
