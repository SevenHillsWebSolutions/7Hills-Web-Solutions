'use client';

import { AdminUIProvider } from './AdminUIContext';
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ user, children }) {
  return (
    <AdminUIProvider>
      <div className="min-h-screen bg-[#060910] text-slate-100 flex">
        {user && <AdminSidebar user={user} />}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </AdminUIProvider>
  );
}
