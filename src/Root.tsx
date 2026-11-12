import React from 'react';
import { Composition, Folder } from 'remotion';
import { MainVideo } from './MainVideo';
import { SCENE_COMPONENTS } from './sceneComponents';
import { FPS, HEIGHT, SCENES, TOTAL_FRAMES, WIDTH } from './timeline';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Complete 2-Minute Master 3D Video (3600 frames, 120s @ 30fps) */}
      <Composition
        id="BioscopeCorporateVideo"
        component={MainVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Individual Scene Previews for Easy Development & Fine-Tuning (lengths from timeline.ts) */}
      <Folder name="Scenes">
        {SCENES.map((scene) => (
          <Composition
            key={scene.key}
            id={scene.compositionId}
            component={SCENE_COMPONENTS[scene.key]}
            durationInFrames={scene.durationInFrames}
            fps={FPS}
            width={WIDTH}
            height={HEIGHT}
          />
        ))}
      </Folder>
    </>
  );
};
