import { getCurrentAdmin } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

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
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}
