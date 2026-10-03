import Link from 'next/link';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030612] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 • Destination Not Found</span>
        </div>

        <div className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_35px_rgba(0,229,255,0.25)]">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Page Has Moved or Doesn&apos;t Exist
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            The page you are looking for might have been renamed, removed, or is temporarily inaccessible.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-6 py-3 rounded-xl glass-panel border-white/10 hover:bg-white/5 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Case Studies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
