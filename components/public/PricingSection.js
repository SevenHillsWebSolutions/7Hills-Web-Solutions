'use client';

import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function PricingSection() {
  const packages = [
    {
      name: 'Starter Website',
      target: 'For individuals, consultants and small local businesses.',
      badge: 'Fast Launch',
      popular: false,
      features: [
        '1 to 5 Bespoke Designed Pages',
        'Mobile & Tablet Responsive',
        'Contact & Lead Capture Form',
        'Google Maps & WhatsApp Integration',
        'Basic Technical On-Page SEO',
        '1 Month Post-Launch Support',
      ],
      idealFor: 'Landing pages, portfolio sites, and initial online business presence.',
      cta: 'Request a Quote',
      type: 'Business Website',
    },
    {
      name: 'Business Website',
      target: 'For growing companies, clinics, agencies and corporate firms.',
      badge: 'Most Popular',
      popular: true,
      features: [
        '6 to 15 Structured Authority Pages',
        'Custom UI/UX & Interactive Design System',
        'Multi-Channel Inbound Lead Routing',
        'Client Showcase & Case Study Vault',
        'Advanced On-Page SEO & Schema Markup',
        '3 Months Priority SLA Support',
      ],
      idealFor: 'Enterprises wanting credibility, authority, and steady qualified leads.',
      cta: 'Request a Quote',
      type: 'Business Website',
    },
    {
      name: 'E-Commerce Store',
      target: 'For retail brands and distributors selling products online.',
      badge: 'High Conversion',
      popular: false,
      features: [
        'Complete Product Catalog & Filters',
        'Cart & Frictionless Checkout Flow',
        'Razorpay, UPI, Cards & NetBanking',
        'Order & Inventory Sync Management',
        'Customer Accounts & Order History',
        'Shipping & Invoice Email Generation',
      ],
      idealFor: 'Direct-to-consumer stores, boutique brands, and wholesale B2B catalogs.',
      cta: 'Request a Quote',
      type: 'E-Commerce',
    },
    {
      name: 'Custom Web Application',
      target: 'For organizations needing bespoke workflows and SaaS systems.',
      badge: 'Full-Stack',
      popular: false,
      features: [
        'Relational Database Architecture (PostgreSQL)',
        'Role-Based Access & Authentication',
        'Custom Admin Dashboards & Reporting',
        'REST / GraphQL API Endpoints',
        'Third-Party API & Webhook Integrations',
        'Scalable Serverless Cloud Deployment',
      ],
      idealFor: 'Internal CRM/ERP tools, client portals, and SaaS MVP platforms.',
      cta: 'Request a Quote',
      type: 'Web Application',
    },
    {
      name: 'Enterprise Solution',
      target: 'For complex organizations requiring dedicated engineering.',
      badge: 'Mission Critical',
      popular: false,
      features: [
        'High-Concurrency Microservices / Edge',
        'Multi-Branch & Multi-Tenant Databases',
        'Custom Workflow Engine & Automations',
        'Dedicated DevOps & Cloud Governance',
        'Custom Security Audits & Compliance',
        '24/7 Dedicated SLA with Engineer Hotline',
      ],
      idealFor: 'Hospital networks, logistics fleets, fintechs, and high-scale platforms.',
      cta: 'Request a Quote',
      type: 'Custom Software',
    },
  ];

  return (
    <section id="pricing" className="bg-[#F1F5F9] text-[#0F172A] py-20 lg:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <span>Packages & Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Transparent Scope & Custom Estimates
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Every business has unique objectives. Rather than forcing rigid cookie-cutter plans, we tailor each project scope to deliver maximum commercial return on your investment.
          </p>
        </div>

        {/* 5 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular 
                  ? 'bg-white border-2 border-blue-600 shadow-xl lg:-translate-y-2' 
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Recommended
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#64748B] min-h-[32px]">
                    {pkg.target}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-800 mb-2 uppercase tracking-wider">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2 text-xs text-[#475569]">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={`/#project-form?package=${encodeURIComponent(pkg.name)}&type=${encodeURIComponent(pkg.type)}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
