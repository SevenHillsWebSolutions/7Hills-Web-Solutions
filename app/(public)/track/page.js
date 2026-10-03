'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FolderKanban, 
  Layers, 
  ArrowRight, 
  MessageSquare, 
  Loader2, 
  AlertCircle,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchStatus = async (searchCode) => {
    const q = (searchCode || code).trim();
    if (!q) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Tracking ID not found.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchStatus(initialCode);
    }
  }, [initialCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatus();
  };

  const stages = [
    { num: 1, title: 'Intake Registered', desc: 'Requirement logged' },
    { num: 2, title: 'Feasibility Review', desc: 'Architecture review' },
    { num: 3, title: 'Discovery & Scope', desc: 'Scope finalized' },
    { num: 4, title: 'Milestone Proposal', desc: 'Proposal issued' },
    { num: 5, title: 'In Development', desc: 'Active engineering' },
    { num: 6, title: 'Live & Deployed', desc: 'Production release' },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Milestone Visibility</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Track Your Project Status
          </h1>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Enter your official <span className="text-cyan-400 font-semibold">7HWS Requirement Code</span>, Project Code, or Inquiry ID to check real-time engineering milestones.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border-cyan-500/25 shadow-2xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. 7HWS-REQ-2026-0001 or 7HWS-PRJ-..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors uppercase font-mono tracking-wider"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="glass-panel p-6 rounded-2xl border-rose-500/30 text-rose-300 flex items-start gap-3 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <div className="font-semibold text-white">Tracking ID Not Found</div>
              <p className="text-slate-300">{error}</p>
              <div className="text-xs text-slate-400 pt-2">
                Tip: Tracking codes follow the format <code>7HWS-REQ-YYYY-XXXX</code> for requirements or <code>7HWS-PRJ-XXXX</code> for projects.
              </div>
            </div>
          </div>
        )}

        {/* Result Card: Requirement */}
        {result?.found && result.type === 'requirement' && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-cyan-500/30 shadow-2xl space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  {result.data.code}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {result.data.service}
                </h2>
                <div className="text-xs text-slate-400 mt-1">
                  Client: <strong className="text-white">{result.data.clientName}</strong> • Submitted: {formatDate(result.data.submittedAt)}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Status: {result.data.status}</span>
              </div>
            </div>

            {/* Current Stage Highlight */}
            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-2">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Current Operational Stage
              </div>
              <div className="text-lg font-bold text-white">
                Stage {result.data.stage}: {result.data.stageTitle}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {result.data.stageDesc}
              </p>
            </div>

            {/* Visual Step Tracker */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                12-Stage Lifecycle Progress
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stages.map((st) => {
                  const isCurrent = st.num === result.data.stage;
                  const isPassed = st.num < result.data.stage;
                  return (
                    <div
                      key={st.num}
                      className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                          : isPassed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-900/40 border-white/5 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>Stage 0{st.num}</span>
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                      </div>
                      <div className={`font-semibold ${isCurrent ? 'text-white' : ''}`}>
                        {st.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{st.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                Need to add assets or request an expedited sprint?
              </div>
              <a
                href={`https://wa.me/919500118875?text=${encodeURIComponent(`Hi 7Hills Team, inquiring about my requirement ${result.data.code}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Discuss via WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Result Card: Active Project */}
        {result?.found && result.type === 'project' && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-cyan-500/30 shadow-2xl space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  {result.data.code}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {result.data.name}
                </h2>
                <div className="text-xs text-slate-400 mt-1">
                  Client: <strong className="text-white">{result.data.clientName}</strong>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                {result.data.status}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Development Milestone Completion</span>
                <span className="font-mono text-cyan-400 font-bold">{result.data.progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${result.data.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block">Expected Completion</span>
                <span className="text-white font-semibold">{formatDate(result.data.expectedEndDate) || 'In Sprint'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                <span className="text-slate-400 block">Staging / Live Environment</span>
                {result.data.liveUrl ? (
                  <a href={result.data.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-semibold truncate block">
                    {result.data.liveUrl}
                  </a>
                ) : (
                  <span className="text-slate-500">Private Internal Staging</span>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-slate-400">Loading tracking portal...</div>}>
      <TrackContent />
    </Suspense>
  );
}
