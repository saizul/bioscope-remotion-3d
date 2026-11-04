import React from 'react';
import { ThreeCanvas } from '@remotion/three';

interface ThreeCanvasWrapperProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

export const ThreeCanvasWrapper: React.FC<ThreeCanvasWrapperProps> = ({
  children,
  cameraPosition = [0, 0, 8],
  cameraFov = 45,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
      }}
    >
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: cameraPosition, fov: cameraFov }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#00e5ff" />
        <pointLight position={[10, 5, 5]} intensity={1.5} color="#ffd700" />
        <pointLight position={[0, -5, 5]} intensity={0.8} color="#00ff88" />
        {children}
      </ThreeCanvas>
    </div>
  );
};
