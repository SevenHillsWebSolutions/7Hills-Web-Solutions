'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(15);
  const [phaseText, setPhaseText] = useState('Initializing Digital Engine...');

  useEffect(() => {
    // Check if intro was already played in this browser session
    const hasSeenIntro = sessionStorage.getItem('7h_intro_seen');
    if (hasSeenIntro) {
      setVisible(false);
      return;
    }

    // Step-by-step progress simulation
    const t1 = setTimeout(() => {
      setProgress(45);
      setPhaseText('Synchronizing Cloud Services...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(85);
      setPhaseText('Rendering Elite Experience...');
    }, 900);

    const t3 = setTimeout(() => {
      setProgress(100);
      setPhaseText('Welcome to 7Hills Web Solutions');
    }, 1400);

    const t4 = setTimeout(() => {
      handleComplete();
    }, 2000);

    // Allow replaying intro via global event
    const handleReplay = () => {
      setVisible(true);
      setExiting(false);
      setProgress(10);
      setPhaseText('Initializing Digital Engine...');
      setTimeout(() => setProgress(60), 300);
      setTimeout(() => setProgress(100), 800);
      setTimeout(() => handleComplete(), 1600);
    };
    window.addEventListener('replay-7hills-intro', handleReplay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('replay-7hills-intro', handleReplay);
    };
  }, []);

  const handleComplete = () => {
    setExiting(true);
    sessionStorage.setItem('7h_intro_seen', 'true');
    setTimeout(() => {
      setVisible(false);
    }, 700);
  };

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030610] text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glows matching 3D logo aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-gradient-to-tr from-cyan-600/25 via-blue-600/20 to-indigo-700/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      
      {/* Cybernetic grid lines */}
      <div className="absolute inset-0 ambient-grid opacity-25 pointer-events-none" />

      {/* Diagonal neon light accents reflecting logo bevels */}
      <div className="absolute top-0 right-0 w-[400px] h-[1px] bg-gradient-to-l from-cyan-400/80 via-blue-500/40 to-transparent rotate-45 transform origin-top-right shadow-[0_0_15px_#00e5ff]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[1px] bg-gradient-to-r from-cyan-400/80 via-blue-500/40 to-transparent rotate-45 transform origin-bottom-left shadow-[0_0_15px_#00e5ff]" />

      {/* Main logo reveal container */}
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto px-6 text-center">
        
        {/* Pulsing neon halo */}
        <div className="relative mb-6 group cursor-pointer" onClick={handleComplete}>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-indigo-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
          
          {/* Logo Card with Diagonal Neon Rim */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-[#060b18]/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,210,255,0.25)] backdrop-blur-xl">
            {/* Real Official 3D Metallic 7Hills Logo */}
            <div className="relative w-64 sm:w-80 md:w-96 h-28 sm:h-36 mx-auto">
              <Image 
                src="/logo.png" 
                alt="7Hills Web Solutions" 
                fill 
                priority 
                className="object-contain drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]"
              />
            </div>
            
            {/* Glowing sweep beam animation across logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none rounded-2xl" />
          </div>
        </div>

        {/* Dynamic subtext with animated glowing cyan bullet points */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-slate-300 mb-8">
          <span className="text-cyan-400 drop-shadow-[0_0_8px_#00e5ff]">Innovate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-ping" />
          <span className="text-slate-100">Build</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#0070f3]" />
          <span className="text-cyan-400 drop-shadow-[0_0_8px_#00e5ff]">Grow</span>
        </div>

        {/* Futuristic progress indicator */}
        <div className="w-64 sm:w-72 space-y-2.5">
          <div className="w-full h-1.5 bg-slate-900/80 rounded-full overflow-hidden p-[1px] border border-cyan-500/30">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_#00e5ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 tracking-wider">
            <span className="text-cyan-300 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {phaseText}
            </span>
            <span className="font-mono text-slate-500">{progress}%</span>
          </div>
        </div>

        {/* Instant Skip / Enter button */}
        <button
          onClick={handleComplete}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-xs text-slate-400 hover:text-cyan-300 transition-all duration-200"
        >
          <span>Enter Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
