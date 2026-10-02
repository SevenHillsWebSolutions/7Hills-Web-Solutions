'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Check, 
  User, 
  Building, 
  Globe, 
  Layers, 
  Palette, 
  Server, 
  DollarSign, 
  Copy, 
  ExternalLink,
  Loader2,
  FileCheck,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  ShoppingCart,
  CreditCard,
  Lock,
  Search,
  Bell,
  UploadCloud,
  Database,
  Sliders,
  Send
} from 'lucide-react';
import Link from 'next/link';

export default function RequirementWizard() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'Business Website';

  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State matching all SRS Section 4 requirements
  const [formData, setFormData] = useState({
    // 4.1 Customer Information
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    whatsapp: '',
    location: '',
    preferredContact: 'WhatsApp',
    // 4.2 Business Information
    businessType: 'Private Enterprise',
    industry: '',
    businessDescription: '',
    existingWebsite: '',
    socialLinks: '',
    // 4.3 Website Requirements
    websiteType: initialService,
    purpose: '',
    requiredPages: 'Home, About Us, Services, Portfolio, Contact',
    functionalRequirements: '',
    // 4.4 Features (SRS 4.4 exact items)
    features: ['Contact Form', 'WhatsApp Integration', 'Google Maps', 'SEO & Social Integration'],
    customFeatureNotes: '',
    // 4.5 Design
    designStyle: 'Modern Dark & Sleek',
    brandColors: '#0F172A, #3B82F6, #06B6D4',
    logoAvailable: 'Yes, we have high-res vector/PNG',
    referenceWebsites: '',
    designRequirements: '',
    // 4.6 Domain & Hosting
    hasDomain: 'No, need registration assistance',
    domainDetails: '',
    hasHosting: 'No, need high-speed cloud hosting setup',
    hostingDetails: '',
    // 4.7 Budget & Timeline
    budget: '$3,000 - $5,000',
    timeline: '2 to 4 weeks',
    additionalRequirements: '',
  });

  const availableFeatures = [
    { id: 'Contact Form', name: 'Contact Form', icon: Mail, desc: 'Lead capture with validation' },
    { id: 'WhatsApp Integration', name: 'WhatsApp Integration', icon: MessageSquare, desc: 'Instant 1-click client chats' },
    { id: 'Google Maps', name: 'Google Maps', icon: MapPin, desc: 'Store locator & interactive maps' },
    { id: 'SEO & Social Integration', name: 'Social Integration', icon: Globe, desc: 'Open Graph and social feed sync' },
    { id: 'Online Payments', name: 'Online Payments', icon: CreditCard, desc: 'Razorpay, Stripe & UPI gateways' },
    { id: 'Product Catalogue', name: 'Product Catalogue', icon: Layers, desc: 'Structured grid with filters' },
    { id: 'Shopping Cart', name: 'Shopping Cart', icon: ShoppingCart, desc: 'Seamless multi-item checkout' },
    { id: 'Login / Authentication', name: 'Login & Authentication', icon: Lock, desc: 'Secure passwords & sessions' },
    { id: 'Admin Dashboard', name: 'Admin Dashboard', icon: Sliders, desc: 'Internal control & analytics' },
    { id: 'Booking System', name: 'Booking System', icon: CheckCircle2, desc: 'Online appointment calendars' },
    { id: 'Site Search', name: 'Global Search', icon: Search, desc: 'Instant indexed search bar' },
    { id: 'Notifications', name: 'Notifications', icon: Bell, desc: 'Automated email & SMS alerts' },
    { id: 'Email Integration', name: 'Email Integration', icon: Mail, desc: 'Transactional SMTP notifications' },
    { id: 'File Upload', name: 'File Upload', icon: UploadCloud, desc: 'Secure file & document uploads' },
    { id: 'Customer Dashboard', name: 'Customer Dashboard', icon: User, desc: 'Client portal & order history' },
    { id: 'Relational Database', name: 'Relational Database', icon: Database, desc: 'SQLite / PostgreSQL data model' },
    { id: 'API Integration', name: 'API Integration', icon: Server, desc: 'External CRM / ERP sync' },
    { id: 'Custom Requirements', name: 'Custom Requirements', icon: Sparkles, desc: 'Proprietary business algorithms' },
  ];

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (featureName) => {
    setFormData((prev) => {
      const exists = prev.features.includes(featureName);
      if (exists) {
        return { ...prev, features: prev.features.filter((f) => f !== featureName) };
      } else {
        return { ...prev, features: [...prev.features, featureName] };
      }
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email) {
        alert('Please provide your Full Name and Email Address.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit requirement');
      }

      setResult(data);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      alert(`Submission Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Celebration Success State
  if (result) {
    return (
      <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border-emerald-500/30 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 mx-auto shadow-xl shadow-emerald-500/20">
          <div className="w-full h-full bg-[#090d16] rounded-[22px] flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Requirement Successfully Registered
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your Project Requirement is Logged!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our software architects will review your specifications and contact you with a formal proposal within 24 business hours.
          </p>
        </div>

        {/* Tracking Reference Code Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 max-w-lg mx-auto space-y-3">
          <div className="text-xs text-slate-400 font-medium">Official Requirement Reference ID:</div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-mono font-extrabold text-cyan-400 tracking-wider">
              {result.requirementCode}
            </span>
            <button
              onClick={() => copyToClipboard(result.requirementCode)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copy ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {copied && <div className="text-[11px] text-emerald-400">Copied to clipboard!</div>}
          <div className="text-xs text-slate-500 pt-1">
            Customer Code: <span className="font-mono text-slate-300">{result.customerCode}</span>
          </div>
        </div>

        {/* What Happens Next Roadmap */}
        <div className="text-left p-6 rounded-2xl bg-slate-900/50 border border-white/5 space-y-4 max-w-xl mx-auto">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">What Happens Next (12-Stage Process):</h3>
          <ol className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
              <span><strong>Admin Notification:</strong> Your requirement is routed to our engineering dashboard for architectural evaluation.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
              <span><strong>Discovery Contact:</strong> We reach out via {formData.preferredContact} to clarify technical scope and confirm timeline.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
              <span><strong>Proposal & Prototype:</strong> We issue a formal deliverables schedule, milestone dates, and initiate UI/UX wireframing.</span>
            </li>
          </ol>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-white/10"
          >
            Return to Homepage
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/25"
          >
            Explore Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Step Progress Tracker */}
      <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">
            Step {step} of {totalSteps}:{' '}
            <span className="text-cyan-400">
              {step === 1 && 'Customer Information'}
              {step === 2 && 'Business Details'}
              {step === 3 && 'Website Specifications'}
              {step === 4 && 'Features & Modules'}
              {step === 5 && 'Design & Branding'}
              {step === 6 && 'Domain & Hosting'}
              {step === 7 && 'Budget, Timeline & Review'}
            </span>
          </span>
          <span className="font-mono text-slate-500 font-bold">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-400 transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/10 space-y-8">
        
        {/* STEP 1: Customer Information (SRS 4.1) */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.1</span>
              <h2 className="text-2xl font-bold text-white">Your Contact Details</h2>
              <p className="text-slate-400 text-sm mt-1">
                Tell us who you are and how you prefer our engineering team to reach you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleTextChange}
                  placeholder="e.g. Arun Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Business / Company Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleTextChange}
                  placeholder="e.g. Apex Global Logistics"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleTextChange}
                  placeholder="arun@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleTextChange}
                  placeholder="+91 98450 00000"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleTextChange}
                  placeholder="+91 98450 00000 (if different)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Location / City & Country</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleTextChange}
                  placeholder="e.g. Bangalore, India"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-300">Preferred Contact Method</label>
              <div className="grid grid-cols-3 gap-3">
                {['WhatsApp', 'Email', 'Phone Call'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, preferredContact: method }))}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      formData.preferredContact === method
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-md shadow-cyan-500/25'
                        : 'bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Business Information (SRS 4.2) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.2</span>
              <h2 className="text-2xl font-bold text-white">Business Information</h2>
              <p className="text-slate-400 text-sm mt-1">
                Help us understand your industry, market positioning, and existing digital assets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Business / Entity Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleTextChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                >
                  <option value="Startup / New Venture">Startup / New Venture</option>
                  <option value="Private Enterprise">Private Enterprise / Established Corp</option>
                  <option value="Retail & D2C Brand">Retail & Direct-to-Consumer Brand</option>
                  <option value="Professional Services / Clinic">Professional Services / Healthcare / Legal</option>
                  <option value="Non-Profit / Educational">Non-Profit / Educational Institution</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Industry / Domain</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleTextChange}
                  placeholder="e.g. Healthcare, Logistics, FinTech, E-Commerce"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Business Description & Core Offerings</label>
              <textarea
                name="businessDescription"
                rows={3}
                value={formData.businessDescription}
                onChange={handleTextChange}
                placeholder="Briefly describe what your company does, who your target customers are, and what makes you unique..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Existing Website (if redesigning)</label>
                <input
                  type="url"
                  name="existingWebsite"
                  value={formData.existingWebsite}
                  onChange={handleTextChange}
                  placeholder="https://yourcurrentsite.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Social Media / LinkedIn Links</label>
                <input
                  type="text"
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleTextChange}
                  placeholder="e.g. linkedin.com/company/apex, instagram.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Website Requirements (SRS 4.3) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.3</span>
              <h2 className="text-2xl font-bold text-white">Website Requirements</h2>
              <p className="text-slate-400 text-sm mt-1">
                Define the primary purpose and scope of pages you wish to launch.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Website Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Business Website',
                  'E-Commerce Development',
                  'Web Application',
                  'Landing Page',
                  'Website Maintenance',
                  'Custom Web Solution',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, websiteType: type }))}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                      formData.websiteType === type
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-md shadow-cyan-500/25'
                        : 'bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Primary Purpose & Key Objective</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleTextChange}
                placeholder="e.g. Generate enterprise inbound leads, sell direct-to-consumer, provide customer portal..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Required Pages / Sections</label>
              <input
                type="text"
                name="requiredPages"
                value={formData.requiredPages}
                onChange={handleTextChange}
                placeholder="e.g. Home, About, Services, Case Studies, Pricing, Blog, Contact, Client Portal"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Detailed Functional Requirements</label>
              <textarea
                name="functionalRequirements"
                rows={3}
                value={formData.functionalRequirements}
                onChange={handleTextChange}
                placeholder="Any special workflows, user roles, calculation logic, or integrations needed..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Features Selection (SRS 4.4) */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.4</span>
              <h2 className="text-2xl font-bold text-white">Features & Functionality Checklist</h2>
              <p className="text-slate-400 text-sm mt-1">
                Select the modules you need implemented. Click to toggle on or off.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {availableFeatures.map((feat) => {
                const isSelected = formData.features.includes(feat.id);
                const Icon = feat.icon;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3.5 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border border-cyan-400 text-white shadow-sm shadow-cyan-500/25'
                        : 'bg-slate-900/60 border border-white/5 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{feat.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400">{feat.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-300">Custom Feature Notes or Unlisted Items</label>
              <input
                type="text"
                name="customFeatureNotes"
                value={formData.customFeatureNotes}
                onChange={handleTextChange}
                placeholder="e.g. Integrate with our custom ERP system, support multi-currency EUR/USD, etc."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Design & Branding (SRS 4.5) */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.5</span>
              <h2 className="text-2xl font-bold text-white">Design & Aesthetic Preferences</h2>
              <p className="text-slate-400 text-sm mt-1">
                Help us align with your visual identity and aesthetic goals.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Preferred Design Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Modern Dark & Sleek',
                  'Clean Minimalist Light',
                  'Bold High-Tech & Vibrant',
                  'Classic Corporate Luxury',
                ].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, designStyle: style }))}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                      formData.designStyle === style
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-md shadow-cyan-500/25'
                        : 'bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Brand Colours / Preferred Hex Codes</label>
                <input
                  type="text"
                  name="brandColors"
                  value={formData.brandColors}
                  onChange={handleTextChange}
                  placeholder="#0F172A, #3B82F6, #10B981"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Logo Availability</label>
                <select
                  name="logoAvailable"
                  value={formData.logoAvailable}
                  onChange={handleTextChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                >
                  <option value="Yes, we have high-res vector/PNG">Yes, ready in vector SVG/PNG</option>
                  <option value="We have a logo but need touchups/redesign">We have a logo but need touchups</option>
                  <option value="No, need brand identity and logo creation">No, need 7Hills to design logo</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Reference Websites You Admire (URLs)</label>
              <input
                type="text"
                name="referenceWebsites"
                value={formData.referenceWebsites}
                onChange={handleTextChange}
                placeholder="e.g. stripe.com, linear.app, flexport.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Additional Design Instructions</label>
              <textarea
                name="designRequirements"
                rows={2}
                value={formData.designRequirements}
                onChange={handleTextChange}
                placeholder="Specific typography preferences, animations, or mood guidelines..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Domain & Hosting (SRS 4.6) */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.6</span>
              <h2 className="text-2xl font-bold text-white">Domain & Cloud Hosting</h2>
              <p className="text-slate-400 text-sm mt-1">
                Let us know if you already own your domain and server infrastructure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Do you already own a registered domain?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Yes, domain already purchased and owned',
                    'No, need registration assistance from 7Hills',
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, hasDomain: opt }))}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        formData.hasDomain === opt
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-md shadow-cyan-500/25'
                          : 'bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Domain Name / Registrar Details (if available)</label>
                <input
                  type="text"
                  name="domainDetails"
                  value={formData.domainDetails}
                  onChange={handleTextChange}
                  placeholder="e.g. apexlogistics.com on Cloudflare / GoDaddy / Namecheap"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-300">Do you currently have a web hosting provider?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Yes, have active cloud/server hosting',
                    'No, need high-speed cloud hosting setup from 7Hills',
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, hasHosting: opt }))}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        formData.hasHosting === opt
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-md shadow-cyan-500/25'
                          : 'bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Hosting Details or Preferences</label>
                <input
                  type="text"
                  name="hostingDetails"
                  value={formData.hostingDetails}
                  onChange={handleTextChange}
                  placeholder="e.g. AWS, Vercel, DigitalOcean, or recommend best setup"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Budget, Timeline & Review (SRS 4.7 & 4.8) */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Section 4.7 & 4.8</span>
              <h2 className="text-2xl font-bold text-white">Budget, Timeline & Review</h2>
              <p className="text-slate-400 text-sm mt-1">
                Configure your target financial range and expected delivery window before submitting.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Budget Range (Configurable)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Under $2,000',
                  '$2,000 - $4,000',
                  '$4,000 - $7,000',
                  '$7,000 - $12,000',
                  '$12,000+',
                  'Flexible / To Be Advised',
                ].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, budget: b }))}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                      formData.budget === b
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-md shadow-cyan-500/25'
                        : 'bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Project Timeline Urgency</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Urgent (Fast-track sprint)',
                  'One week',
                  'Two to four weeks',
                  'One to two months',
                  'Flexible / Undecided',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, timeline: t }))}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                      formData.timeline === t
                        ? 'bg-cyan-600 text-white border border-cyan-400 shadow-md shadow-cyan-600/30'
                        : 'bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Additional Instructions or Requests</label>
              <textarea
                name="additionalRequirements"
                rows={2}
                value={formData.additionalRequirements}
                onChange={handleTextChange}
                placeholder="Any special milestones, NDA requirements, or launch events..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            {/* Structured Summary Preview */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Intake Summary Overview:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <div><strong>Client:</strong> {formData.fullName} ({formData.email})</div>
                <div><strong>Company:</strong> {formData.businessName || 'Not specified'}</div>
                <div><strong>Website Type:</strong> {formData.websiteType}</div>
                <div><strong>Budget & Timeline:</strong> {formData.budget} / {formData.timeline}</div>
                <div className="sm:col-span-2"><strong>Selected Modules ({formData.features.length}):</strong> {formData.features.join(', ')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Next: Step {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-white text-sm font-extrabold shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging Requirement & Generating ID...</span>
                </>
              ) : (
                <>
                  <span>Submit Requirement & Generate ID</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
