'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How long does website development take?',
      a: 'The delivery timeline depends on project scope, number of pages, required integrations, and functional complexity. A focused corporate landing page or starter website typically takes 1 to 2 weeks, while a comprehensive business website or e-commerce platform takes 2 to 4 weeks. Custom web applications and ERP/CRM systems require 4 to 8 weeks with phased milestone releases.',
    },
    {
      q: 'Do you build custom websites?',
      a: 'Yes, absolutely. We do not use cookie-cutter, bloated WordPress templates. Every website and software system is engineered from the ground up using modern frameworks (Next.js, React, Tailwind CSS, PostgreSQL) ensuring lightning-fast performance, rock-solid security, and complete alignment with your brand.',
    },
    {
      q: 'Can you redesign an existing website?',
      a: 'Yes. We frequently modernize legacy websites that are sluggish, outdated, or hard to use on mobile devices. When redesigning, we preserve all your existing URL structures, 301 redirects, and organic search rankings while substantially elevating aesthetics and conversion rates.',
    },
    {
      q: 'Do you build e-commerce websites?',
      a: 'Yes. We build high-speed e-commerce storefronts equipped with robust product catalogs, product variant options, automated shopping carts, coupon engines, automated invoice delivery, and stock inventory tracking.',
    },
    {
      q: 'Can you integrate payment gateways?',
      a: 'Yes. We seamlessly connect Indian and international payment gateways including Razorpay, Stripe, UPI, credit/debit cards, and NetBanking, adhering to strict PCI-DSS and encrypted tokenization standards.',
    },
    {
      q: 'Do you provide website maintenance and support?',
      a: 'Yes. We offer continuous maintenance packages covering security updates, automated daily backups, uptime monitoring, bug fixing, content adjustments, and database optimization with committed SLA response times.',
    },
    {
      q: 'Can you build custom business software?',
      a: 'Yes. We specialize in building operational software including bespoke CRM systems, ERP suites, booking and scheduling calendars, inventory tracking, multi-tier billing engines, and internal admin dashboards.',
    },
    {
      q: 'Do you provide hosting and deployment?',
      a: 'Yes. Depending on your needs, we handle full production deployment, domain DNS mapping, SSL certificate configuration, and cloud serverless hosting setup across Vercel, AWS, Google Cloud, or Azure.',
    },
    {
      q: 'Do you build mobile applications?',
      a: 'Yes. Where included in project scope, we develop responsive Progressive Web Apps (PWAs) as well as cross-platform mobile applications that seamlessly connect to your central database and API backend.',
    },
    {
      q: 'How do I start a project with 7Hills?',
      a: 'You can begin immediately by submitting your project specifications via our interactive Requirement Form below, or by calling our engineering desk at +91 95001 18875. We will evaluate your scope and deliver an architectural roadmap and proposal within 24 hours.',
    },
  ];

  return (
    <section id="faq" className="bg-[#F8FAFC] text-[#0F172A] py-20 lg:py-28 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Direct Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Everything you need to know about our technology, development process, commercial terms, and ongoing support.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#0F172A] hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#475569] leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#0F172A]">Have a specific question not listed here?</h4>
            <p className="text-xs text-[#64748B]">Our senior engineering team is happy to discuss your technical architecture.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shrink-0"
          >
            <span>Ask Us Directly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
