'use client';

import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Boxes, 
  Receipt, 
  LayoutDashboard, 
  Layers, 
  ShieldCheck, 
  GraduationCap, 
  Truck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function SolutionsSection() {
  const solutions = [
    {
      icon: Users,
      title: 'CRM Systems',
      desc: 'Manage customers, leads, sales and communication.',
      highlights: ['Lead Scoring', 'Pipelines', 'Client History'],
    },
    {
      icon: Briefcase,
      title: 'ERP Systems',
      desc: 'Manage business operations, employees, inventory and processes.',
      highlights: ['Workflow Automation', 'Resource Planning', 'Audit Logs'],
    },
    {
      icon: Calendar,
      title: 'Booking Systems',
      desc: 'Appointments, reservations and scheduling.',
      highlights: ['Calendar Sync', 'Automated Reminders', 'Slot Management'],
    },
    {
      icon: Boxes,
      title: 'Inventory Systems',
      desc: 'Products, stock, suppliers and inventory tracking.',
      highlights: ['Real-time Stock Alerts', 'Barcode & SKU', 'Supplier POs'],
    },
    {
      icon: Receipt,
      title: 'Billing Systems',
      desc: 'Invoices, payments, customers and reports.',
      highlights: ['Automated Recurring Invoices', 'GST Compliance', 'Payment Links'],
    },
    {
      icon: LayoutDashboard,
      title: 'Admin Dashboards',
      desc: 'Centralized control over business operations.',
      highlights: ['Role Permissions', 'Data Analytics', 'Live Activity Feed'],
    },
    {
      icon: Layers,
      title: 'SaaS Platforms',
      desc: 'Multi-user and scalable software platforms.',
      highlights: ['Multi-Tenant Database', 'Subscription Billing', 'API Access'],
    },
    {
      icon: ShieldCheck,
      title: 'Customer Portals',
      desc: 'Secure portals for customers and businesses.',
      highlights: ['Document Vaults', 'Ticket Management', 'Self-Service KYC'],
    },
    {
      icon: GraduationCap,
      title: 'Learning Platforms',
      desc: 'Courses, students, instructors, assessments and progress.',
      highlights: ['Video Streaming', 'Quizzes & Grading', 'Certificate Generation'],
    },
    {
      icon: Truck,
      title: 'Logistics Solutions',
      desc: 'Orders, delivery tracking and operational management.',
      highlights: ['GPS & Dispatch', 'Proof of Delivery', 'Route Optimization'],
    },
  ];

  return (
    <section id="solutions" className="bg-[#0D1B2A] text-[#F8FAFC] py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Specialized Business Software</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Business Solutions That Solve Real Problems
          </h2>
          <p className="text-base sm:text-lg text-[#A8B3C2] leading-relaxed">
            Scalable software architectures engineered to replace messy spreadsheets, reduce manual bottlenecks, and give leadership complete operational visibility.
          </p>
        </div>

        {/* 10 Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#111F30] rounded-2xl p-5 border border-white/5 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A8B3C2] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <Link
                    href={`/#project-form?solution=${encodeURIComponent(item.title)}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                  >
                    <span>Discuss Architecture</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
