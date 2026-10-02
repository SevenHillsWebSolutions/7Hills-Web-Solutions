'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  ArrowRight, 
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'General & Engagement',
      question: 'How does 7Hills Web Solutions differ from traditional digital agencies?',
      answer: 'Traditional agencies frequently reuse rigid, bloated WordPress or template themes that compromise speed and security. At 7Hills Web Solutions, we engineer bespoke web platforms in pure modern JavaScript, Next.js, and relational databases. You receive custom source code, sub-second load times, and direct access to senior software engineers.',
    },
    {
      category: 'Timelines & Process',
      question: 'What is the typical turnaround timeline for a project?',
      answer: 'Timelines depend on scope and feature complexity. High-impact landing pages take 1 to 2 weeks. Corporate business websites typically take 2 to 4 weeks. Full-scale e-commerce stores and custom web applications take 1 to 2 months. We also offer fast-track urgent sprints for time-sensitive launches.',
    },
    {
      category: 'Requirement Intake',
      question: 'What happens after I submit the Start a Project requirement form?',
      answer: 'Our system instantly logs your submission in our relational database, generates an official Requirement ID (e.g. 7HWS-REQ-2026-0001), and notifies our lead architects. We inspect your business objectives, prepare a technical feasibility breakdown, and contact you via your preferred channel within 24 hours with an actionable proposal.',
    },
    {
      category: 'Technology & Code',
      question: 'Do you use templates or CMS builders like WordPress or Wix?',
      answer: 'No. We pride ourselves on zero-template integrity. Everything is engineered using modern JavaScript, React/Next.js, Tailwind CSS, and secure database architectures. This ensures your website loads under 1.2 seconds, scores 95+ on Google Core Web Vitals, and is not vulnerable to common third-party plugin exploits.',
    },
    {
      category: 'Domain & Hosting',
      question: 'Do I need to purchase a domain and hosting before contacting you?',
      answer: 'Not necessarily! In our requirement form, you can indicate whether you already have a domain and hosting or if you need us to procure and configure high-performance cloud hosting (such as Vercel, AWS, or managed cloud servers) with SSL certificates on your behalf.',
    },
    {
      category: 'Pricing & Budget',
      question: 'How are project costs calculated?',
      answer: 'Pricing is based on clear milestones, architectural complexity, required third-party integrations (payment gateways, courier APIs, maps), and expected delivery urgency. Our requirement wizard allows you to select your target budget bracket so we can design a high-ROI scope that fits your financial goals without hidden fees.',
    },
    {
      category: 'Maintenance & Support',
      question: 'Do you provide ongoing support after deployment?',
      answer: 'Yes. We offer comprehensive Website Maintenance & SLA agreements that include 24/7 uptime monitoring, security updates, database backups, Core Web Vitals tuning, and dedicated monthly engineering hours for new feature rollouts.',
    },
    {
      category: 'Security & Privacy',
      question: 'How do you safeguard client data and project specifications?',
      answer: 'In strict compliance with our SRS Section 10 and 12, client phone numbers, emails, and private requirements are never publicly exposed. All database inputs use parameterized queries to prevent SQL injection, HTTPS is strictly enforced, and only work explicitly approved by you is showcased in our public portfolio.',
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers to Common Questions (SRS Section 9)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Everything you need to know about our engineering standards, project delivery workflows, technology stack, and pricing models.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-cyan-400/40 bg-slate-900/80 shadow-xl shadow-cyan-500/10' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-cyan-500 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Have a Specific Technical Question?</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Our software architects are ready to evaluate your requirements and offer guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-white/10"
            >
              Direct Contact Form
            </Link>
            <Link
              href="/start-project"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/25"
            >
              Launch Requirement Wizard
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
