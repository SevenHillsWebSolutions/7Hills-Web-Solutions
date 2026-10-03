'use client';

import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectFormSection() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // 5-Step Form State matching Section 19 exactly
  const [formData, setFormData] = useState({
    // Step 1: About You
    fullName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    // Step 2: Project Type
    projectType: 'Business Website',
    // Step 3: Requirements
    description: '',
    requiredFeatures: '',
    existingWebsite: '',
    referenceWebsites: '',
    // Step 4: Budget
    budget: '₹50,000 – ₹1,00,000',
    // Step 5: Timeline
    timeline: '1–2 months',
  });

  const projectTypes = [
    'Business Website',
    'E-Commerce',
    'Web Application',
    'Mobile Application',
    'CRM',
    'ERP',
    'SaaS',
    'Custom Software',
    'Website Redesign',
    'Maintenance',
    'Other',
  ];

  const budgetOptions = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹3,00,000',
    '₹3,00,000+',
    'Not sure',
  ];

  const timelineOptions = [
    'ASAP',
    '1 month',
    '1–2 months',
    '2–3 months',
    'Flexible',
  ];

  const validateStep = (currentStep) => {
    setError('');
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setError('Please enter your full name.');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Please provide a valid business or personal email address.');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Please provide a phone number so our engineers can connect with you.');
        return false;
      }
    }
    if (currentStep === 3) {
      if (!formData.description.trim()) {
        setError('Please provide a short description of what you want to build.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);
    setError('');

    try {
      const payload = {
        fullName: formData.fullName,
        businessName: formData.company,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        websiteType: formData.projectType,
        purpose: formData.description,
        features: formData.requiredFeatures ? [formData.requiredFeatures] : [],
        existingWebsite: formData.existingWebsite,
        referenceWebsites: formData.referenceWebsites,
        budget: formData.budget,
        timeline: formData.timeline,
      };

      const res = await fetch('/api/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project request.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (result?.requirementCode) {
      navigator.clipboard.writeText(result.requirementCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="project-form" className="bg-[#0D1B2A] text-[#F8FAFC] py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a Project</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Let&apos;s Build Something That Moves Your Business Forward
          </h2>
          <p className="text-base sm:text-lg text-[#A8B3C2] leading-relaxed">
            Tell us what you want to build. We&apos;ll understand your requirements, recommend the right approach and help turn your idea into a reliable digital solution.
          </p>
        </div>

        {/* 2-Column Layout: Direct Contact on Left, Multi-Step Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111F30] rounded-2xl p-6 sm:p-7 border border-white/5 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Official Company Email</div>
                    <a href="mailto:sanjayelumalai7363@gmail.com" className="font-semibold text-white hover:text-blue-400 transition-colors">
                      sanjayelumalai7363@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Direct Engineering Desk</div>
                    <a href="tel:+919500118875" className="font-semibold font-mono text-white hover:text-blue-400 transition-colors">
                      +91 95001 18875
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">WhatsApp Instant Chat</div>
                    <a 
                      href="https://wa.me/919500118875?text=Hi%207Hills%20Web%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-400 hover:underline"
                    >
                      Chat With Us Directly &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Headquarters</div>
                    <span className="text-slate-300">
                      7Hills Tech Tower, Outer Ring Rd, Bangalore, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Portal Quick Link */}
              <div className="pt-4 border-t border-white/5">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorized Staff: Access Admin Portal</span>
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-[#111F30] rounded-2xl p-6 border border-white/5 space-y-3 text-xs text-[#A8B3C2]">
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24-Hour Proposal Commitment</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NDA & Complete Code Ownership</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Hidden Fees or Licensing Trap</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Step Project Requirement Form */}
          <div className="lg:col-span-8">
            <div className="bg-[#111F30] rounded-2xl p-6 sm:p-10 border border-white/5 shadow-2xl relative">
              
              {result ? (
                /* Success Screen */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      Project Request Submitted Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A8B3C2] max-w-md mx-auto">
                      Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our engineering team has logged your specifications and will follow up within 24 hours.
                    </p>
                  </div>

                  {result.requirementCode && (
                    <div className="p-4 rounded-xl bg-[#07111F] border border-blue-500/40 inline-flex items-center gap-3">
                      <div className="text-left">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Your Official Tracking ID</div>
                        <div className="text-base font-mono font-bold text-blue-400">{result.requirementCode}</div>
                      </div>
                      <button
                        onClick={copyCode}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy Code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {copied && <div className="text-xs text-emerald-400">Tracking ID copied to clipboard!</div>}

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/track?code=${result.requirementCode || ''}`}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Track Project Status
                    </Link>
                    <button
                      onClick={() => {
                        setResult(null);
                        setStep(1);
                        setFormData({
                          fullName: '',
                          company: '',
                          email: '',
                          phone: '',
                          location: '',
                          projectType: 'Business Website',
                          description: '',
                          requiredFeatures: '',
                          existingWebsite: '',
                          referenceWebsites: '',
                          budget: '₹50,000 – ₹1,00,000',
                          timeline: '1–2 months',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#0D1B2A] text-slate-300 hover:text-white text-xs font-medium"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Multi-Step Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Progress Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-blue-400 uppercase tracking-wider">
                        Step 0{step} of 0{totalSteps}
                      </span>
                      <span>
                        {step === 1 && 'About You'}
                        {step === 2 && 'Project Type'}
                        {step === 3 && 'Requirements'}
                        {step === 4 && 'Budget'}
                        {step === 5 && 'Timeline'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#07111F] overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2.5 text-xs">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Step 1: About You */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-base font-bold text-white">Step 1 — Tell us about yourself</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Ramesh Nair"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Company / Organization Name</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Nair Logistics Pvt Ltd"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. ramesh@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp Number *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +91 98450 12345"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Location (City / Country)</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Bangalore, India"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Type */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-base font-bold text-white">Step 2 — What type of project are you building?</h4>
                      <p className="text-xs text-[#A8B3C2]">Choose the option that most closely matches your vision:</p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {projectTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`p-3.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                              formData.projectType === type
                                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                : 'bg-[#07111F] text-slate-300 hover:text-white border border-white/10 hover:border-blue-400'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Requirements */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-base font-bold text-white">Step 3 — Project Requirements & Scope</h4>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Project Description *</label>
                        <textarea
                          rows={4}
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe the primary goals, target audience, and key problems this website or software needs to solve..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Required Key Features</label>
                        <input
                          type="text"
                          value={formData.requiredFeatures}
                          onChange={(e) => setFormData({ ...formData, requiredFeatures: e.target.value })}
                          placeholder="e.g. Payment gateway, user login, admin panel, WhatsApp chat"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Existing Website (If redesigning)</label>
                          <input
                            type="text"
                            value={formData.existingWebsite}
                            onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                            placeholder="https://yourcurrentwebsite.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300">Reference Websites You Like</label>
                          <input
                            type="text"
                            value={formData.referenceWebsites}
                            onChange={(e) => setFormData({ ...formData, referenceWebsites: e.target.value })}
                            placeholder="e.g. stripe.com, apple.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#07111F] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Budget */}
                  {step === 4 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-base font-bold text-white">Step 4 — What is your estimated investment budget?</h4>
                      <p className="text-xs text-[#A8B3C2]">This helps our architects recommend the optimal technology stack and delivery timeline:</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {budgetOptions.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`p-4 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                              formData.budget === b
                                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                : 'bg-[#07111F] text-slate-300 hover:text-white border border-white/10 hover:border-blue-400'
                            }`}
                          >
                            <span>{b}</span>
                            {formData.budget === b && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Timeline */}
                  {step === 5 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-base font-bold text-white">Step 5 — What is your target timeline?</h4>
                      <p className="text-xs text-[#A8B3C2]">When do you need the project delivered or launched?</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {timelineOptions.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setFormData({ ...formData, timeline: t })}
                            className={`p-4 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                              formData.timeline === t
                                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                : 'bg-[#07111F] text-slate-300 hover:text-white border border-white/10 hover:border-blue-400'
                            }`}
                          >
                            <span>{t}</span>
                            {formData.timeline === t && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Form Navigation Controls */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-5 py-2.5 rounded-xl bg-[#07111F] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>Continue to Step 0{step + 1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Project Request</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
