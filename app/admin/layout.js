import { getCurrentAdmin } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: "Admin Portal | 7Hills Web Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }) {
  const user = await getCurrentAdmin();

  return (
    <div className="min-h-screen bg-[#060910] text-slate-100 flex">
      {user && <AdminSidebar user={user} />}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
