import React, { useState } from 'react';
import { AppSettings, ColorOption } from '../types';
import { COLOR_OPTIONS, DEFAULT_SETTINGS } from '../constants';
import { X, Check, Volume2, VolumeX, Palette, ChevronRight, Grid } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  if (!isOpen) return null;

  const handlePresetColorClick = (colorValue: string) => {
    onUpdateSettings({
      ...settings,
      accentColor: colorValue,
      textColor: colorValue,
      backgroundColor: DEFAULT_SETTINGS.backgroundColor
    });
    setShowCustomPicker(false);
  };

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm mx-4 transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-sans font-semibold text-white">
            {showCustomPicker ? 'Custom Theme' : 'Customize'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {showCustomPicker ? (
          <div className="animate-in slide-in-from-right duration-300">
            <button 
              onClick={() => setShowCustomPicker(false)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ChevronRight className="rotate-180" size={16} />
              Back to presets
            </button>

            {/* Background Color Picker */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Background Color
              </label>
              <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                <input 
                  type="color" 
                  value={settings.backgroundColor || DEFAULT_SETTINGS.backgroundColor}
                  onChange={(e) => onUpdateSettings({ ...settings, backgroundColor: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                />
                <span className="text-gray-300 font-mono text-sm uppercase">
                  {settings.backgroundColor || DEFAULT_SETTINGS.backgroundColor}
                </span>
              </div>
            </div>

            {/* Text Color Picker */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Text Color
              </label>
              <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                <input 
                  type="color" 
                  value={settings.textColor || settings.accentColor}
                  onChange={(e) => onUpdateSettings({ ...settings, textColor: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                />
                <span className="text-gray-300 font-mono text-sm uppercase">
                  {settings.textColor || settings.accentColor}
                </span>
              </div>
            </div>

            {/* Accent/Buttons Color Picker */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Buttons & Highlights
              </label>
              <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg">
                <input 
                  type="color" 
                  value={settings.accentColor}
                  onChange={(e) => onUpdateSettings({ ...settings, accentColor: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                />
                <span className="text-gray-300 font-mono text-sm uppercase">
                  {settings.accentColor}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Format Toggle */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Time Format
              </label>
              <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => onUpdateSettings({ ...settings, useAmPm: true })}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    settings.useAmPm ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  12 Hour
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, useAmPm: false })}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    !settings.useAmPm ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  24 Hour
                </button>
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Sound
              </label>
              <div className="bg-gray-800 p-1 rounded-lg">
                 <button
                  onClick={() => onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-700 transition-all group"
                >
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-200">
                    {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-gray-500" />}
                    <span>{settings.soundEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.soundEnabled ? 'bg-emerald-500/20' : 'bg-gray-600/20'}`}>
                    <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                      settings.soundEnabled ? 'bg-emerald-500 left-5' : 'bg-gray-500 left-1'
                    }`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Google Apps Toggle */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Features
              </label>
              <div className="bg-gray-800 p-1 rounded-lg">
                 <button
                  onClick={() => onUpdateSettings({ ...settings, showGoogleApps: !settings.showGoogleApps })}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-gray-700 transition-all group"
                >
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-200">
                    <Grid size={18} className={settings.showGoogleApps ? 'text-white' : 'text-gray-500'} />
                    <span>Google Apps Menu</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.showGoogleApps ? 'bg-emerald-500/20' : 'bg-gray-600/20'}`}>
                    <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                      settings.showGoogleApps ? 'bg-emerald-500 left-5' : 'bg-gray-500 left-1'
                    }`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Accent Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_OPTIONS.map((color: ColorOption) => (
                  <button
                    key={color.value}
                    onClick={() => handlePresetColorClick(color.value)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
                    style={{ backgroundColor: color.value, boxShadow: settings.accentColor === color.value ? `0 0 10px ${color.value}` : 'none' }}
                    title={color.label}
                  >
                    {settings.accentColor === color.value && !showCustomPicker && (
                       <Check size={16} className={color.value === '#ffffff' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
                
                {/* Custom Color Button */}
                <button
                  onClick={() => setShowCustomPicker(true)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
                  title="Custom Colors"
                >
                  <Palette size={16} className="text-white" />
                </button>
              </div>
            </div>
          </>
        )}
        
        <button 
          onClick={onClose}
          className="w-full mt-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Done
        </button>

        <div className="mt-4 text-center">
          <a 
            href="/privacy.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;