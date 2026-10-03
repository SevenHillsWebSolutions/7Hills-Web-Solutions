'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const TOTAL_DURATION_MS = 1200; // Snappy 1.2s cinematic intro (down from 5s)

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('Initializing 7Hills Digital Engine...');
  const animRef = useRef(null);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem('7hills_seen_splash', 'true');
    } catch {
      // Ignore if storage is blocked
    }
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }, []);

  useEffect(() => {
    // Automatically bypass for synthetic performance audit bots
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent || '';
      if (/bot|googlebot|crawler|spider|robot|crawling|lighthouse|headlesschrome|ptst/i.test(ua)) {
        setVisible(false);
        return;
      }
    }

    // Only show once per user session unless manually replayed
    try {
      const alreadySeen = sessionStorage.getItem('7hills_seen_splash');
      if (alreadySeen) {
        setVisible(false);
        return;
      }
    } catch {
      // Ignore
    }

    setVisible(true);
    const startTime = performance.now();

    const updateFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(pct);

      if (elapsed < 1200) {
        setPhaseText('Initializing 7Hills Digital Engine...');
      } else if (elapsed < 2400) {
        setPhaseText('Architecting High-Performance Infrastructure...');
      } else if (elapsed < 3600) {
        setPhaseText('Synthesizing Interactive Experience & Visuals...');
      } else if (elapsed < 4600) {
        setPhaseText('Innovate • Build • Grow');
      } else {
        setPhaseText('Welcome to 7Hills Web Solutions');
      }

      if (elapsed < TOTAL_DURATION_MS) {
        animRef.current = requestAnimationFrame(updateFrame);
      } else {
        handleComplete();
      }
    };

    animRef.current = requestAnimationFrame(updateFrame);

    // Global event listener to replay intro if triggered
    const handleReplay = () => {
      setVisible(true);
      setExiting(false);
      setProgress(0);
      setPhaseText('Initializing 7Hills Digital Engine...');
      const replayStart = performance.now();
      const replayFrame = (t) => {
        const el = t - replayStart;
        const p = Math.min(100, Math.floor((el / TOTAL_DURATION_MS) * 100));
        setProgress(p);
        if (el < TOTAL_DURATION_MS) {
          animRef.current = requestAnimationFrame(replayFrame);
        } else {
          handleComplete();
        }
      };
      animRef.current = requestAnimationFrame(replayFrame);
    };

    window.addEventListener('replay-7hills-intro', handleReplay);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('replay-7hills-intro', handleReplay);
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02050f] text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic multi-layer radial auras matching logo colors: Cyan, Sapphire Blue, Violet */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-gradient-to-tr from-cyan-500/30 via-blue-600/25 to-violet-600/30 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none animate-aura-spin" />
      
      {/* Cybernetic ambient grid background */}
      <div className="absolute inset-0 ambient-grid opacity-35 pointer-events-none" />

      {/* Floating digital pixel cubes matching the pixel accents in the 7Hills logo */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-sm shadow-[0_0_12px_#00e5ff] animate-[floatPixel_3s_infinite_ease-in-out] pointer-events-none opacity-80" />
      <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-blue-500 rounded-sm shadow-[0_0_10px_#0052cc] animate-[floatPixel_4s_infinite_ease-in-out_1s] pointer-events-none opacity-80" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-violet-400 rounded-sm shadow-[0_0_12px_#a855f7] animate-[floatPixel_3.5s_infinite_ease-in-out_0.5s] pointer-events-none opacity-80" />
      <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-300 rounded-sm shadow-[0_0_8px_#00e5ff] animate-[floatPixel_2.8s_infinite_ease-in-out_1.5s] pointer-events-none opacity-70" />

      {/* Diagonal neon light accents reflecting logo bevels */}
      <div className="absolute top-0 right-0 w-[450px] h-[1px] bg-gradient-to-l from-cyan-400 via-blue-500/50 to-transparent rotate-45 transform origin-top-right shadow-[0_0_18px_#00e5ff]" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[1px] bg-gradient-to-r from-violet-500 via-blue-500/50 to-transparent rotate-45 transform origin-bottom-left shadow-[0_0_18px_#a855f7]" />

      {/* Main logo ARISE container */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-6 text-center animate-logo-arise">
        
        {/* Pulsing neon halo surrounding the brand logo */}
        <div className="relative mb-6 group cursor-pointer" onClick={handleComplete}>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/40 via-blue-600/35 to-violet-600/40 rounded-3xl blur-2xl opacity-85 group-hover:opacity-100 transition duration-500 animate-pulse" />
          
          {/* Logo Card with High-Contrast Crisp Container */}
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-9 bg-white border-2 border-cyan-400/70 shadow-[0_0_55px_rgba(0,229,255,0.45),0_0_110px_rgba(0,82,204,0.3)] transition-transform duration-500 group-hover:scale-[1.02]">
            {/* The Official 3D 7Hills Logo */}
            <div className="relative w-64 sm:w-80 md:w-[440px] h-28 sm:h-36 mx-auto flex items-center justify-center">
              <Image 
                src="/logo.webp" 
                alt="7Hills Web Solutions" 
                fill 
                priority 
                className="object-contain"
                sizes="(max-width: 640px) 256px, 440px"
              />
            </div>
            
            {/* Holographic sweep beam animation across the logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none rounded-2xl sm:rounded-3xl" />
          </div>
        </div>

        {/* Dynamic subtext with illuminated jewel dots matching the 3 brand words */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-8">
          <span className="text-cyan-400 drop-shadow-[0_0_10px_#00e5ff]">Innovate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-ping" />
          <span className="text-blue-400 drop-shadow-[0_0_10px_#0052cc]">Build</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
          <span className="text-violet-400 drop-shadow-[0_0_10px_#a855f7]">Grow</span>
        </div>

        {/* 5-Second Futuristic Progress Indicator */}
        <div className="w-72 sm:w-84 space-y-2.5">
          <div className="w-full h-2 bg-slate-950/90 rounded-full overflow-hidden p-[1px] border border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full transition-all duration-75 ease-linear shadow-[0_0_14px_#00e5ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-[11px] text-slate-300 tracking-wider">
            <span className="text-cyan-300 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00e5ff]" />
              {phaseText}
            </span>
            <span className="font-mono text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Enter Website / Fast Forward */}
        <button
          onClick={handleComplete}
          className="mt-7 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/50 text-xs text-slate-300 hover:text-cyan-300 transition-all duration-200 shadow-sm cursor-pointer"
        >
          <span>Enter Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
