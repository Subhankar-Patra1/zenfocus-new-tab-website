import { ColorOption, AppSettings } from './types';

export const COLOR_OPTIONS: ColorOption[] = [
  { label: 'White', value: '#ffffff' },
  { label: 'Cyan', value: '#22d3ee' },
  { label: 'Emerald', value: '#34d399' },
  { label: 'Rose', value: '#fb7185' },
  { label: 'Amber', value: '#fbbf24' },
  { label: 'Violet', value: '#a78bfa' },
];

export const DEFAULT_SETTINGS: AppSettings = {
  useAmPm: true,
  accentColor: '#ffffff',
  textColor: '#ffffff',
  backgroundColor: '#030712', // gray-950
  soundEnabled: true,
  showGoogleApps: false,
  showAiTools: true,
};

export const DEFAULT_TIMER_DURATION = 25 * 60; // 25 minutes