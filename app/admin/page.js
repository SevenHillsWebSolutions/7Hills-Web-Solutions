import { getCurrentAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { 
  Users, 
  Inbox, 
  FolderKanban, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  AlertCircle,
  Plus,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminDashboardPage() {
  const user = await getCurrentAdmin();
  if (!user) {
    redirect('/admin/login');
  }

  const db_dummy = null; // removed - using Neon sql directly

  // Dynamic statistics
  const [[{ c: totalCustomers }], [{ c: newEnquiries }], [{ c: totalEnquiries }], [{ c: activeProjects }], [{ c: completedProjects }], [{ c: portfolioProjects }], [{ c: totalRequirements }]] = await Promise.all([
    sql`SELECT COUNT(*)::int as c FROM customers`,
    sql`SELECT COUNT(*)::int as c FROM enquiries WHERE status = 'New'`,
    sql`SELECT COUNT(*)::int as c FROM enquiries`,
    sql`SELECT COUNT(*)::int as c FROM projects WHERE status != 'Completed'`,
    sql`SELECT COUNT(*)::int as c FROM projects WHERE status = 'Completed'`,
    sql`SELECT COUNT(*)::int as c FROM portfolio WHERE published = 1`,
    sql`SELECT COUNT(*)::int as c FROM requirements`,
  ]);

  // Recent enquiries
  const recentEnquiries = await sql`
    SELECT e.*, c.name as cust_name, c.customer_code
    FROM enquiries e
    LEFT JOIN customers c ON e.customer_id = c.id
    ORDER BY e.id DESC
    LIMIT 5
  `;

  // Recent submitted requirements
  const recentRequirements = await sql`
    SELECT * FROM requirements
    ORDER BY id DESC
    LIMIT 4
  `;

  // Active projects list
  const activeProjectList = await sql`
    SELECT p.*, c.name as customer_name, c.business_name
    FROM projects p
    JOIN customers c ON p.customer_id = c.id
    WHERE p.status != 'Completed'
    ORDER BY p.id DESC
    LIMIT 4
  `;

  const stats = [
    { title: 'Total Customers', value: totalCustomers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', href: '/admin/customers' },
    { title: 'New Enquiries', value: newEnquiries, icon: Inbox, color: 'text-amber-400', bg: 'bg-amber-500/10', href: '/admin/enquiries' },
    { title: 'Active Projects', value: activeProjects, icon: FolderKanban, color: 'text-cyan-400', bg: 'bg-cyan-500/10', href: '/admin/projects' },
    { title: 'Completed Projects', value: completedProjects, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', href: '/admin/projects' },
    { title: 'Portfolio Projects', value: portfolioProjects, icon: Briefcase, color: 'text-cyan-400', bg: 'bg-cyan-500/10', href: '/admin/portfolio' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Agency Operations Dashboard" 
        subtitle="7Hills Web Solutions Management Platform (SRS Section 5.1)" 
        user={user} 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
        
        {/* Welcome Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/25 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Operational Status: Healthy & Online</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              You have <span className="text-amber-400 font-semibold">{newEnquiries} new lead enquiries</span> and <span className="text-cyan-400 font-semibold">{activeProjects} active client projects</span> currently in development.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/enquiries"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Review Enquiries</span>
            </Link>
            <Link
              href="/admin/projects"
              className="px-4 py-2.5 rounded-xl glass-panel text-slate-200 hover:text-white text-xs font-semibold border-white/10 hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Pipeline</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Statistics KPI Cards (SRS Section 5.1) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                href={stat.href}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border-white/5 space-y-3 block"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{stat.title}</span>
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {stat.value}
                </div>
              </Link>
            );
          })}
        </div>

        {/* 2-Column Section: Active Projects & Recent Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Projects (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-cyan-400" />
                <span>Active Projects in Development ({activeProjects})</span>
              </h3>
              <Link
                href="/admin/projects"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {activeProjectList.length === 0 ? (
                <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs">
                  No active projects currently in development.
                </div>
              ) : (
                activeProjectList.map((prj) => (
                  <div
                    key={prj.id}
                    className="glass-panel p-5 rounded-2xl border-white/5 space-y-3 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-cyan-400">
                            {prj.project_code}
                          </span>
                          <StatusBadge status={prj.status} />
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">
                          <Link href={`/admin/projects/${prj.id}`} className="hover:text-cyan-300 transition-colors">
                            {prj.project_name}
                          </Link>
                        </h4>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Client: <span className="text-slate-200">{prj.customer_name}</span> ({prj.business_name || 'Individual'})
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {prj.progress || 0}%
                        </span>
                        <div className="text-[10px] text-slate-500">Target: {formatDate(prj.expected_end_date)}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                        style={{ width: `${prj.progress || 5}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Enquiries (5 cols) (SRS Section 5.1 & 5.2) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-amber-400" />
                <span>Recent Incoming Enquiries</span>
              </h3>
              <Link
                href="/admin/enquiries"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                <span>Manage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="glass-panel rounded-2xl border-white/5 divide-y divide-white/5 overflow-hidden">
              {recentEnquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No incoming enquiries logged.
                </div>
              ) : (
                recentEnquiries.map((enq) => (
                  <div key={enq.id} className="p-4 space-y-1.5 hover:bg-slate-900/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                        {enq.enquiry_code}
                      </span>
                      <StatusBadge status={enq.status} />
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {enq.subject}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{enq.name || enq.cust_name || 'Prospective Client'}</span>
                      <span>{formatDate(enq.created_at)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Recent Submitted Requirements (SRS Section 5.4) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Recent Requirement Intakes ({totalRequirements} Total)</span>
            </h3>
            <Link
              href="/admin/requirements"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <span>View All Requirements</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentRequirements.map((req) => (
              <div
                key={req.id}
                className="glass-panel p-5 rounded-2xl border-white/5 space-y-3 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-300 font-bold">
                    {req.requirement_code}
                  </span>
                  <StatusBadge status={req.status} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white truncate">{req.customer_name}</h4>
                  <div className="text-xs text-slate-400 truncate">{req.website_type}</div>
                </div>
                <div className="text-[11px] text-slate-400 space-y-0.5 border-t border-white/5 pt-2">
                  <div><strong>Budget:</strong> {req.budget || 'Flexible'}</div>
                  <div><strong>Timeline:</strong> {req.timeline || 'Flexible'}</div>
                </div>
                <div className="pt-1">
                  <Link
                    href={`/admin/requirements?code=${req.requirement_code}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Inspect details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
