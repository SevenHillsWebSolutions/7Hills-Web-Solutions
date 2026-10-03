'use client';

import Link from 'next/link';
import { 
  Globe, 
  ShoppingCart, 
  Server, 
  Code, 
  Palette, 
  Cpu, 
  Database, 
  Share2, 
  Smartphone, 
  TrendingUp, 
  Cloud, 
  LifeBuoy,
  ArrowRight
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      desc: 'Business websites, corporate websites, landing pages and custom websites designed for performance and conversions.',
      tag: 'Web Presence',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Development',
      desc: 'Online stores with product management, payments, orders, inventory and customer management.',
      tag: 'Online Sales',
    },
    {
      icon: Server,
      title: 'Web Application Development',
      desc: 'Custom web applications, SaaS platforms, dashboards and portals.',
      tag: 'SaaS & Portals',
    },
    {
      icon: Code,
      title: 'Custom Software Solutions',
      desc: 'Technology solutions designed around unique business workflows and requirements.',
      tag: 'Bespoke Logic',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      desc: 'Professional user interfaces, responsive layouts, dashboards and customer experiences.',
      tag: 'Design Systems',
    },
    {
      icon: Cpu,
      title: 'Business Automation',
      desc: 'Automate repetitive business processes and reduce manual work.',
      tag: 'Efficiency',
    },
    {
      icon: Database,
      title: 'CRM & ERP Solutions',
      desc: 'Custom CRM, ERP, inventory, billing and business management systems.',
      tag: 'Enterprise Systems',
    },
    {
      icon: Share2,
      title: 'API & Integrations',
      desc: 'Connect websites and applications with payment gateways, WhatsApp, email, SMS, maps and external services.',
      tag: 'Connectivity',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      desc: 'Business and customer-facing mobile applications.',
      tag: 'Cross-Platform',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Digital Growth',
      desc: 'Technical SEO, performance optimization, analytics and conversion-focused improvements.',
      tag: 'Search Visibility',
    },
    {
      icon: Cloud,
      title: 'Cloud & Deployment',
      desc: 'Cloud deployment, domains, SSL, hosting, database and production infrastructure.',
      tag: 'DevOps & Cloud',
    },
    {
      icon: LifeBuoy,
      title: 'Maintenance & Support',
      desc: 'Security updates, bug fixing, backups, monitoring, optimization and ongoing development.',
      tag: '24/7 SLA',
    },
  ];

  return (
    <section id="services" className="bg-[#F8FAFC] text-[#0F172A] py-20 lg:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <span>Capabilities & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Complete Digital Solutions for Modern Businesses
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            From your first website to complete business software, we build technology around your goals.
          </p>
        </div>

        {/* Clean 12-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={`/#project-form?service=${encodeURIComponent(item.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:underline"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
