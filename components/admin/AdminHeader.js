'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  Plus, 
  ShieldCheck, 
  Database,
  ExternalLink,
  User
} from 'lucide-react';

export default function AdminHeader({ title, user, subtitle }) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <header className="h-16 bg-[#070b13]/80 border-b border-white/10 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
            {title || 'Dashboard'}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live DB indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live SQLite Database</span>
        </div>

        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick Action</span>
          </button>

          {showQuickAdd && (
            <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl border-white/10 shadow-2xl py-2 z-50 text-xs">
              <Link
                href="/admin/customers?action=new"
                onClick={() => setShowQuickAdd(false)}
                className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                + New Customer
              </Link>
              <Link
                href="/admin/projects?action=new"
                onClick={() => setShowQuickAdd(false)}
                className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                + New Project
              </Link>
              <Link
                href="/admin/portfolio?action=new"
                onClick={() => setShowQuickAdd(false)}
                className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                + New Portfolio Item
              </Link>
              <Link
                href="/admin/enquiries"
                onClick={() => setShowQuickAdd(false)}
                className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 border-t border-white/5"
              >
                View Incoming Enquiries
              </Link>
            </div>
          )}
        </div>

        {/* Public Website Preview Link */}
        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-white/10 transition-colors"
          title="Open Public Website"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
