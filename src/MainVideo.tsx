import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { SCENE_COMPONENTS } from './sceneComponents';
import { HEIGHT, SCENES, WIDTH } from './timeline';
import { SFXLayer } from './sfxConfig';
import voiceoverData from './voiceoverScript.json';

export const MainVideo: React.FC = () => {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: '#050a14',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* =========================================================================
          VIDEO SCENES TIMELINE (Total: 3600 frames | 120 seconds at 30 fps)
          ========================================================================= */}
      
      {/* Scene sequences: frame ranges come from src/timeline.ts */}
      {SCENES.map((scene) => {
        const SceneComponent = SCENE_COMPONENTS[scene.key];
        return (
          <Sequence key={scene.key} from={scene.from} durationInFrames={scene.durationInFrames} name={scene.name}>
            <SceneComponent />
          </Sequence>
        );
      })}

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
