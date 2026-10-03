import IndustriesSection from '@/components/public/IndustriesSection';
import FinalCTASection from '@/components/public/FinalCTASection';
import ProjectFormSection from '@/components/public/ProjectFormSection';
import { Building2 } from 'lucide-react';

export const metadata = {
  title: "Industry Solutions | Specialized Web Engineering | 7Hills Web Solutions",
  description: "Specialized web solutions and software architectures engineered for Startups, Small Businesses, Healthcare, Education, E-Commerce, Hospitality, Real Estate, and Logistics.",
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full bg-[#07111F] text-[#F8FAFC]">
      
      {/* Header */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111F30] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Industry Expertise</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Solutions for Every Stage of Business
        </h1>
        <p className="text-base sm:text-lg text-[#A8B3C2] max-w-2xl mx-auto leading-relaxed">
          From fast-growing early-stage startups to established corporate enterprises, we engineer web platforms customized to your specific vertical and regulatory standards.
        </p>
      </section>

      {/* Industries Grid */}
      <IndustriesSection />

      {/* Project Requirement Form */}
      <ProjectFormSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
}
