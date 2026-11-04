export interface VoiceoverScene {
  id: string;
  sceneName: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  audioFile: string;
  script: string;
}

export interface SFXTrigger {
  id: string;
  name: string;
  frame: number;
  file: string;
  volume: number;
}

export interface CoreService {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  iconName: string;
}

export interface ManpowerCategory {
  id: number;
  title: string;
  positionsCount: number;
  color: string;
}
