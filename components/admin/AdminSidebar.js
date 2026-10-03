'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  Users, 
  ClipboardList, 
  FolderKanban, 
  CheckSquare, 
  Briefcase, 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useAdminUI } from './AdminUIContext';

export default function AdminSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileMenuOpen, closeMobileMenu } = useAdminUI();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Requirements', href: '/admin/requirements', icon: ClipboardList },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Files', href: '/admin/files', icon: FolderOpen },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    } catch (e) {
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
  };

  const isActive = (href) => {
    if (href === '/admin' && pathname === '/admin') return true;
    if (href !== '/admin' && pathname.startsWith(href)) return true;
    return false;
  };

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-[#070b13] text-slate-100">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link 
          href="/admin" 
          onClick={isMobile ? closeMobileMenu : undefined}
          className="flex flex-col gap-1 group"
        >
          <div className="relative h-10 w-40 px-2 py-0.5 bg-white rounded-xl shadow-[0_0_12px_rgba(0,229,255,0.3)] border border-cyan-400/40 flex items-center justify-center">
            <Image 
              src="/logo-sm.webp" 
              alt="7Hills Web Solutions" 
              fill 
              sizes="160px"
              className="object-contain p-0.5"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Admin Management</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">v1.0</span>
          </div>
        </Link>

        {isMobile && (
          <button
            onClick={closeMobileMenu}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Management Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={isMobile ? closeMobileMenu : undefined}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                active
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/25 to-violet-600/20 text-white border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.name}</span>
              </div>
              {active && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info & Logout */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Agency Site</span>
          </div>
          <span className="text-[10px] text-slate-500">View</span>
        </Link>

        {user && (
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
            <div className="truncate pr-2">
              <div className="text-xs font-bold text-white truncate">{user.name || 'Admin'}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#070b13] border-r border-white/10 flex-col shrink-0 min-h-screen sticky top-0 h-screen z-30">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={closeMobileMenu} 
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10 border-r border-white/10">
            {renderSidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
