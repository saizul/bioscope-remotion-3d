import React from 'react';
import { Audio, staticFile, Sequence } from 'remotion';
import { SFX_TRIGGERS } from './sfxTriggers';

export { SFX_TRIGGERS };

export const SFXLayer: React.FC = () => {
  return (
    <>
      {SFX_TRIGGERS.map((sfx) => (
        <Sequence
          key={sfx.id}
          from={sfx.frame}
          durationInFrames={60}
          name={`SFX: ${sfx.name}`}
        >
          <Audio
            src={staticFile(`sfx/${sfx.file}`)}
            volume={sfx.volume}
          />
        </Sequence>
      ))}
    </>
  );
};
