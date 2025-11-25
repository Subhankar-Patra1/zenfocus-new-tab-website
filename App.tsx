import React, { useState, useEffect } from 'react';
import { AppMode, AppSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { Clock as ClockIcon, Timer as TimerIcon, Settings as SettingsIcon } from 'lucide-react';
import Clock from './components/Clock';
import Timer from './components/Timer';
import SettingsModal from './components/SettingsModal';
import IconButton from './components/IconButton';
import GoogleAppsMenu from './components/GoogleAppsMenu';
import AiToolsMenu from './components/AiToolsMenu';

declare var chrome: any;

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('clock');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  // Load settings from storage (Chrome Sync or LocalStorage)
  useEffect(() => {
    const loadSettings = () => {
      // Check for Chrome Storage API availability
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(['zenclock-settings'], (result: any) => {
          if (result['zenclock-settings']) {
            // Merge with default settings to ensure all fields exist
            setSettings({ ...DEFAULT_SETTINGS, ...result['zenclock-settings'] });
          }
          setLoaded(true);
        });
      } else {
        // Fallback for development environment
        const savedSettings = localStorage.getItem('zenclock-settings');
        if (savedSettings) {
          try {
            setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
          } catch (e) {
            console.error("Failed to parse settings", e);
          }
        }
        setLoaded(true);
      }
    };

    loadSettings();
  }, []);

  // Save settings
  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    
    // Save to Chrome Storage if available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ 'zenclock-settings': newSettings });
    }
    
    // Always save to localStorage as backup/sync
    localStorage.setItem('zenclock-settings', JSON.stringify(newSettings));
  };

  // Prevent render until settings loaded to avoid flash of default content
  if (!loaded) return <div className="min-h-screen" style={{ backgroundColor: DEFAULT_SETTINGS.backgroundColor }} />;

  return (
    <div 
      className="min-h-screen w-full flex flex-col relative overflow-hidden selection:bg-white/20 transition-colors duration-700"
      style={{ backgroundColor: settings.backgroundColor || DEFAULT_SETTINGS.backgroundColor }}
    >
      
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-10 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: settings.accentColor }}
      />

      {/* Header / Controls */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-end items-center gap-2 z-[60]">
        {settings.showGoogleApps && <GoogleAppsMenu />}
        <IconButton 
          onClick={() => setIsSettingsOpen(true)} 
          tooltip="Settings"
          className="hover:rotate-90 transition-transform duration-500"
        >
          <SettingsIcon size={24} />
        </IconButton>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center relative">
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            mode === 'clock' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Clock settings={settings} />
        </div>

        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            mode === 'timer' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Timer settings={settings} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex justify-center z-40">
        <div className="bg-gray-900/50 backdrop-blur-md border border-white/5 rounded-full p-1 flex gap-1 shadow-xl">
          <button
            onClick={() => setMode('clock')}
            className={`
              flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${mode === 'clock' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            <ClockIcon size={18} />
            <span>Clock</span>
          </button>
          <button
            onClick={() => setMode('timer')}
            className={`
              flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${mode === 'timer' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            <TimerIcon size={18} />
            <span>Timer</span>
          </button>
        </div>
      </footer>

      {settings.showAiTools && <AiToolsMenu settings={settings} />}

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />
    </div>
  );
};

export default App;