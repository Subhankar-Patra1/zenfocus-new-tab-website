import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { formatTime, getAmPmLabel } from '../utils/time';
import SearchBar from './SearchBar';

interface ClockProps {
  settings: AppSettings;
}

const Clock: React.FC<ClockProps> = ({ settings }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = formatTime(time, settings.useAmPm);
  // We split to render AM/PM separately for styling if needed, 
  // but simpler to just render the time string and the suffix separately.
  
  // Logic to separate time from AM/PM label for better typography
  let mainTime = timeString;
  let suffix = '';
  
  if (settings.useAmPm) {
    suffix = getAmPmLabel(time);
    // formatTime returns full string in some utils, but here let's re-format specifically for this UI
    let hours = time.getHours();
    const minutes = time.getMinutes();
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    mainTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    mainTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div 
      className="flex flex-col items-center justify-center w-full h-full relative transition-colors duration-700"
      style={{ color: settings.textColor || settings.accentColor }}
    >
      <div className="absolute top-[15%] z-50">
        <SearchBar />
      </div>

      <div className="flex items-baseline font-mono leading-none select-none">
        <span className="text-[12vw] md:text-[10rem] font-bold tracking-tighter drop-shadow-2xl">
          {mainTime}
        </span>
        <div className="flex flex-col justify-between ml-4 h-[8vw] md:h-[7rem] py-2">
           {settings.useAmPm && (
            <span className="text-2xl md:text-4xl font-bold opacity-80">
              {suffix}
            </span>
          )}
          <span className="text-2xl md:text-4xl font-bold opacity-60">
            {seconds}
          </span>
        </div>
      </div>
      <div className="mt-4 text-gray-400 font-sans text-lg md:text-xl font-light tracking-widest uppercase opacity-50">
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};

export default Clock;