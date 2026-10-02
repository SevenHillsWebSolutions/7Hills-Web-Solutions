import ContactForm from '@/components/public/ContactForm';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Contact & Project Inquiries | 7Hills Web Solutions",
  description: "Get in touch with 7Hills Web Solutions for enterprise web development, e-commerce platforms, and custom software engineering.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Communication (SRS Section 3.6)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Connect With Our Engineering Team
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            Whether you have a general inquiry, require ongoing website maintenance, or want to discuss enterprise architecture, we are here to assist.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">7Hills Office & Contact Hub</h2>
              
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Email Inquiries</span>
                    <a href="mailto:sanjayelumalai7363@gmail.com" className="text-white hover:text-cyan-400 font-semibold transition-colors">
                      sanjayelumalai7363@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Phone & WhatsApp</span>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <a href="tel:+919500118875" className="text-white hover:text-cyan-400 font-semibold transition-colors">
                        +91 95001 18875
                      </a>
                      <a 
                        href="https://wa.me/919500118875?text=Hi%207Hills%20Web%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-500/25 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-400" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Headquarters</span>
                    <span className="text-white font-semibold">
                      7Hills Technology Tower, Outer Ring Road, Bangalore 560103, India
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Operating Hours</span>
                    <span className="text-white font-semibold">
                      Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM IST
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Need a full project quote? Highlight */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#060c1f] via-slate-900 to-slate-950 border border-cyan-500/30 space-y-4 shadow-xl">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Need Detailed Architecture & Budget?
              </span>
              <h3 className="text-xl font-bold text-white">Starting a New Project?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For detailed quotes, use our intelligent requirement wizard. It collects your exact feature lists, domain status, design preferences, and generates an official Requirement ID.
              </p>
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
              >
                <span>Launch Requirement Intake Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
