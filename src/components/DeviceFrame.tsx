import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeScreenTitle: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, activeScreenTitle }) => {
  return (
    <div className="py-8 sm:py-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-stone-200/70">
      <div className="text-center mb-4">
        <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold block">
          Mobile Preview Mode
        </span>
        <h3 className="font-serif text-lg text-stone-900">
          iPhone 16 Pro Viewport · {activeScreenTitle}
        </h3>
      </div>

      {/* Realistic Phone Chassis */}
      <div className="relative w-[390px] h-[844px] max-w-full bg-stone-900 rounded-[52px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border-4 border-stone-800 ring-1 ring-black/20 flex flex-col">
        {/* Top Hardware Antenna / Side buttons simulation */}
        <div className="absolute -left-[7px] top-[140px] w-[3px] h-[36px] bg-stone-700 rounded-l" />
        <div className="absolute -left-[7px] top-[190px] w-[3px] h-[54px] bg-stone-700 rounded-l" />
        <div className="absolute -left-[7px] top-[255px] w-[3px] h-[54px] bg-stone-700 rounded-l" />
        <div className="absolute -right-[7px] top-[180px] w-[3px] h-[75px] bg-stone-700 rounded-r" />

        {/* Screen Display Container */}
        <div className="w-full h-full bg-[#FAF8F5] rounded-[44px] overflow-hidden flex flex-col relative">
          
          {/* iOS Status Bar & Dynamic Island */}
          <div className="h-11 w-full bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-7 pt-2 flex-shrink-0 select-none">
            <span className="text-[12px] font-semibold text-stone-900 tracking-tight font-sans">
              9:41
            </span>

            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-end pr-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-stone-700/50" />
            </div>

            <div className="flex items-center gap-1.5 text-stone-900">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Inner Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="h-6 w-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 pb-1 z-40">
            <div className="w-32 h-1 bg-stone-900/80 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
