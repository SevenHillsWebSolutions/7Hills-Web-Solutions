import HeroSection from '@/components/public/HeroSection';
import ServicesSection from '@/components/public/ServicesSection';
import SolutionsSection from '@/components/public/SolutionsSection';
import IndustriesSection from '@/components/public/IndustriesSection';
import Why7HillsSection from '@/components/public/Why7HillsSection';
import TechnologySection from '@/components/public/TechnologySection';
import PortfolioSection from '@/components/public/PortfolioSection';
import ProcessSection from '@/components/public/ProcessSection';
import MaintenanceSection from '@/components/public/MaintenanceSection';
import PricingSection from '@/components/public/PricingSection';
import FAQSection from '@/components/public/FAQSection';
import FinalCTASection from '@/components/public/FinalCTASection';
import ProjectFormSection from '@/components/public/ProjectFormSection';
import { sql } from '@/lib/db';

export const metadata = {
  title: "7Hills Web Solutions | Web Development • Software Solutions • Business Automation",
  description: "We design, develop and maintain high-performance websites, e-commerce platforms, custom web applications and business software that help modern organizations grow.",
  alternates: {
    canonical: 'https://7hills-web-solutions.vercel.app',
  },
  openGraph: {
    title: '7Hills Web Solutions | Complete Technology Partner',
    description: 'Bespoke web development, enterprise software, e-commerce platforms, and business automation built for scale.',
    url: 'https://7hills-web-solutions.vercel.app',
    siteName: '7Hills Web Solutions',
    images: [
      {
        url: 'https://7hills-web-solutions.vercel.app/logo.png',
        width: 1200,
        height: 630,
        alt: '7Hills Web Solutions Brand Insignia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function HomePage() {
  let portfolioProjects = [];
  try {
    portfolioProjects = await sql`
      SELECT * FROM portfolio 
      WHERE published = 1 
      ORDER BY featured DESC, id ASC 
      LIMIT 6
    `;
  } catch (err) {
    console.warn('Portfolio query fallback in HomePage:', err.message);
  }

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Dark #07111F) */}
      <HeroSection />

      {/* 2. Services Section (Light #F8FAFC) */}
      <ServicesSection />

      {/* 3. Business Solutions Section (Dark #0D1B2A) */}
      <SolutionsSection />

      {/* 4. Industries Section (Light #F1F5F9) */}
      <IndustriesSection />

      {/* 5. Why 7Hills Section (Dark #07111F) */}
      <Why7HillsSection />

      {/* 6. Technology Section (Dark #0D1B2A) */}
      <TechnologySection />

      {/* 7. Portfolio Section (Dark #07111F) */}
      <PortfolioSection initialProjects={portfolioProjects} />

      {/* 8. Development Process Section (Light #F8FAFC) */}
      <ProcessSection />

      {/* 9. Maintenance & Support Section (Dark #0D1B2A) */}
      <MaintenanceSection />

      {/* 10. Pricing & Packages Section (Light #F1F5F9) */}
      <PricingSection />

      {/* 11. FAQ Section (Light #F8FAFC) */}
      <FAQSection />

      {/* 12. Final CTA Section (Dark #07111F) */}
      <FinalCTASection />

      {/* 13. Contact & 5-Step Project Form Section (Dark #0D1B2A) */}
      <ProjectFormSection />
    </div>
  );
}
