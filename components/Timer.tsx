import React, { useState, useEffect, useRef } from 'react';
import { AppSettings, TimerState } from '../types';
import { formatDuration } from '../utils/time';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import IconButton from './IconButton';

interface TimerProps {
  settings: AppSettings;
}

const Timer: React.FC<TimerProps> = ({ settings }) => {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    timeLeft: 25 * 60,
    initialDuration: 25 * 60,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ h: '00', m: '00', s: '00' });
  const editContainerRef = useRef<HTMLDivElement>(null);
  const prevTimeRef = useRef(timerState.timeLeft);

  // Sound player
  const playTimerCompleteSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Pleasant chime sound
      // Sine wave starting at C5 (523.25Hz) and gently fading
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(440.0, ctx.currentTime + 0.1); // Slide slightly
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  // Watch for timer completion to play sound
  useEffect(() => {
    // If time just hit 0 (was > 0 before), play sound
    if (prevTimeRef.current > 0 && timerState.timeLeft === 0) {
      if (settings.soundEnabled) {
        playTimerCompleteSound();
      }
    }
    prevTimeRef.current = timerState.timeLeft;
  }, [timerState.timeLeft, settings.soundEnabled]);

  // Timer tick logic
  useEffect(() => {
    let interval: number | undefined;

    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimerState((prev) => {
          if (prev.timeLeft <= 1) {
            return { ...prev, timeLeft: 0, isRunning: false };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft]);

  // Focus first input when entering edit mode
  useEffect(() => {
    if (isEditing && editContainerRef.current) {
      const firstInput = editContainerRef.current.querySelector('input');
      if (firstInput) {
        firstInput.focus();
        firstInput.select();
      }
    }
  }, [isEditing]);

  const toggleTimer = () => {
    setTimerState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    setIsEditing(false);
  };

  const resetTimer = () => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.initialDuration,
    }));
    setIsEditing(false);
  };

  const adjustTime = (amount: number) => {
    setTimerState((prev) => {
      if (prev.isRunning) {
        const newTimeLeft = Math.max(0, prev.timeLeft + amount);
        return {
          ...prev,
          timeLeft: newTimeLeft
        };
      }
      const newDuration = Math.max(60, prev.initialDuration + amount);
      return {
        ...prev,
        initialDuration: newDuration,
        timeLeft: newDuration,
      };
    });
  };

  const handleEditClick = () => {
    if (timerState.isRunning) {
      setTimerState(prev => ({ ...prev, isRunning: false }));
    }
    
    const seconds = timerState.timeLeft;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    setEditValues({
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    });
    
    setIsEditing(true);
  };

  const handleSave = () => {
    const h = parseInt(editValues.h || '0', 10);
    const m = parseInt(editValues.m || '0', 10);
    const s = parseInt(editValues.s || '0', 10);

    let totalSeconds = h * 3600 + m * 60 + s;

    // Limit max duration to prevent overflow issues (e.g. 99 hours)
    if (totalSeconds > 359999) totalSeconds = 359999;

    // Update state even if 0, user might want to clear it
    setTimerState({
      isRunning: false,
      timeLeft: totalSeconds,
      initialDuration: totalSeconds > 0 ? totalSeconds : 60, // Default to 1 min if 0 set as initial? Or just allow 0.
    });
    
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the new focus is still within the edit container
    if (editContainerRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    handleSave();
  };

  const handleInputChange = (field: 'h' | 'm' | 's', value: string) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;
    // Limit length (2 digits)
    if (value.length > 2) return;

    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const progress = timerState.initialDuration > 0 
    ? 1 - (timerState.timeLeft / timerState.initialDuration)
    : 0;
  
  // Clamp progress between 0 and 1 for visual ring
  const visualProgress = Math.max(0, Math.min(1, progress));
  const strokeDashoffset = 283 - (283 * visualProgress);

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in duration-700 w-full px-4">
      <div className="relative mb-8 flex justify-center items-center">
        {/* Progress Ring */}
        <svg className="w-[70vw] h-[70vw] max-w-[20rem] max-h-[20rem] md:w-96 md:h-96 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-800"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke={settings.accentColor}
            strokeWidth="3"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        
        {/* Time Display/Input centered in ring */}
        <div className="absolute inset-0 flex items-center justify-center flex-col p-8">
           {isEditing ? (
             <div 
               ref={editContainerRef}
               className="flex items-center justify-center gap-1 md:gap-3"
               onBlur={handleBlur}
             >
               {/* Hours */}
               <div className="flex flex-col items-center">
                  <input
                    value={editValues.h}
                    onChange={(e) => handleInputChange('h', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="font-mono text-2xl sm:text-4xl md:text-6xl font-bold bg-transparent text-center outline-none w-10 sm:w-16 md:w-24 border-b border-white/20 pb-2 placeholder-white/10"
                    style={{ color: settings.textColor || settings.accentColor, caretColor: settings.accentColor }}
                    placeholder="00"
                    autoFocus
                  />
                  <span className="text-[8px] md:text-xs text-gray-500 font-sans mt-2 tracking-widest">HR</span>
               </div>
               
               <span className="text-2xl sm:text-4xl md:text-6xl font-bold pb-6 opacity-50" style={{ color: settings.textColor || settings.accentColor }}>:</span>

               {/* Minutes */}
               <div className="flex flex-col items-center">
                  <input
                    value={editValues.m}
                    onChange={(e) => handleInputChange('m', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="font-mono text-2xl sm:text-4xl md:text-6xl font-bold bg-transparent text-center outline-none w-10 sm:w-16 md:w-24 border-b border-white/20 pb-2 placeholder-white/10"
                    style={{ color: settings.textColor || settings.accentColor, caretColor: settings.accentColor }}
                    placeholder="00"
                  />
                  <span className="text-[8px] md:text-xs text-gray-500 font-sans mt-2 tracking-widest">MIN</span>
               </div>

               <span className="text-2xl sm:text-4xl md:text-6xl font-bold pb-6 opacity-50" style={{ color: settings.textColor || settings.accentColor }}>:</span>

               {/* Seconds */}
               <div className="flex flex-col items-center">
                  <input
                    value={editValues.s}
                    onChange={(e) => handleInputChange('s', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="font-mono text-2xl sm:text-4xl md:text-6xl font-bold bg-transparent text-center outline-none w-10 sm:w-16 md:w-24 border-b border-white/20 pb-2 placeholder-white/10"
                    style={{ color: settings.textColor || settings.accentColor, caretColor: settings.accentColor }}
                    placeholder="00"
                  />
                  <span className="text-[8px] md:text-xs text-gray-500 font-sans mt-2 tracking-widest">SEC</span>
               </div>
             </div>
           ) : (
             <div 
               className="font-mono text-[10vw] md:text-7xl font-bold tracking-tight select-none transition-opacity cursor-pointer hover:opacity-80"
               style={{ color: settings.textColor || settings.accentColor }}
               onClick={handleEditClick}
               title="Click to edit time"
             >
               {formatDuration(timerState.timeLeft)}
             </div>
           )}
           <div className="text-gray-500 text-xs md:text-sm mt-2 md:mt-6 font-sans tracking-wider uppercase h-6 text-center">
             {isEditing ? 'Set Timer' : (timerState.isRunning ? 'Focusing' : (timerState.timeLeft === 0 ? 'Done' : 'Ready'))}
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 md:gap-6">
        <IconButton onClick={() => adjustTime(-60)} disabled={isEditing}>
          <Minus size={20} className="md:w-6 md:h-6" />
        </IconButton>
        
        <button
          onClick={toggleTimer}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          style={{ backgroundColor: settings.accentColor, color: '#000' }}
          disabled={isEditing}
        >
          {timerState.isRunning ? <Pause size={24} className="md:w-8 md:h-8" fill="currentColor" /> : <Play size={24} className="ml-1 md:w-8 md:h-8" fill="currentColor" />}
        </button>
        
        <IconButton onClick={resetTimer} disabled={isEditing}>
          <RotateCcw size={20} className="md:w-6 md:h-6" />
        </IconButton>

        <IconButton onClick={() => adjustTime(60)} disabled={isEditing}>
          <Plus size={20} className="md:w-6 md:h-6" />
        </IconButton>
      </div>
      
      <p className="mt-8 text-gray-600 text-[10px] md:text-xs font-sans opacity-60 text-center px-4">
        {timerState.isRunning ? "Click time to edit (pauses timer)" : "Click time to edit, or use +/- to adjust."}
      </p>
    </div>
  );
};

export default Timer;