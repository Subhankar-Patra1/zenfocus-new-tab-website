export type AppMode = 'clock' | 'timer';

export interface AppSettings {
  useAmPm: boolean;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  soundEnabled: boolean;
  showGoogleApps: boolean;
  showAiTools: boolean;
}

export interface TimerState {
  isRunning: boolean;
  timeLeft: number; // in seconds
  initialDuration: number; // in seconds
}

export interface ColorOption {
  label: string;
  value: string;
}