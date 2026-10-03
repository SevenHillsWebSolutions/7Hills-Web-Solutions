'use client';

import { 
  Rocket, 
  Store, 
  Building2, 
  ShoppingBag, 
  HeartPulse, 
  GraduationCap, 
  Utensils, 
  Hotel, 
  Home, 
  Hammer, 
  Factory, 
  Truck, 
  Briefcase, 
  ScanLine, 
  Landmark,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function IndustriesSection() {
  const industries = [
    {
      icon: Rocket,
      name: 'Startups',
      desc: 'Rapid MVP launches, investor-ready UI, and scalable modern web architecture.',
    },
    {
      icon: Store,
      name: 'Small Businesses',
      desc: 'Professional websites that drive local footfall, customer inquiries, and brand trust.',
    },
    {
      icon: Building2,
      name: 'Corporate',
      desc: 'Enterprise governance, compliant systems, investor relations, and security.',
    },
    {
      icon: ShoppingBag,
      name: 'E-commerce',
      desc: 'High-conversion stores, fast checkout flows, automated discounts, and inventory sync.',
    },
    {
      icon: HeartPulse,
      name: 'Healthcare',
      desc: 'Patient appointment scheduling, doctor profiles, and secure intake records.',
    },
    {
      icon: GraduationCap,
      name: 'Education',
      desc: 'Course management, student admissions, fee payments, and interactive modules.',
    },
    {
      icon: Utensils,
      name: 'Restaurants',
      desc: 'QR digital menus, online food ordering, table bookings, and delivery integration.',
    },
    {
      icon: Hotel,
      name: 'Hotels',
      desc: 'Direct room reservations, seasonal tariffs, guest verification, and reviews.',
    },
    {
      icon: Home,
      name: 'Real Estate',
      desc: 'Interactive property showcases, agent CRM, site visit bookings, and lead routing.',
    },
    {
      icon: Hammer,
      name: 'Construction',
      desc: 'Tender portals, project galleries, contractor bidding, and client milestone tracking.',
    },
    {
      icon: Factory,
      name: 'Manufacturing',
      desc: 'B2B catalog portals, dealer distribution networks, and production dashboards.',
    },
    {
      icon: Truck,
      name: 'Logistics',
      desc: 'Consignment tracking, rate calculators, fleet management, and dispatch logs.',
    },
    {
      icon: Briefcase,
      name: 'Professional Services',
      desc: 'Legal, accounting, and consulting firms requiring authority and consultation booking.',
    },
    {
      icon: ScanLine,
      name: 'Retail',
      desc: 'Omnichannel POS syncing, store locators, loyalty programs, and digital receipts.',
    },
    {
      icon: Landmark,
      name: 'Finance',
      desc: 'Loan calculators, encrypted customer documentation, and fintech platforms.',
    },
  ];

  return (
    <section id="industries" className="bg-[#F1F5F9] text-[#0F172A] py-20 lg:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <span>Domain Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Solutions for Every Stage of Business
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Every vertical presents unique technical hurdles. We customize data models, integrations, and user flows specifically for your industry.
          </p>
        </div>

        {/* 15 Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <Link
                    href={`/#project-form?industry=${encodeURIComponent(ind.name)}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <span>Build for {ind.name}</span>
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
