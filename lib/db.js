/**
 * lib/db.js — Neon Serverless PostgreSQL client
 *
 * Replaces the original better-sqlite3 file-based DB with a
 * Neon serverless PostgreSQL connection that works on Vercel.
 *
 * Usage:
 *   import { sql } from '@/lib/db';
 *   const rows = await sql`SELECT * FROM customers ORDER BY id DESC`;
 *
 * The exported `sql` tagged-template-literal automatically handles
 * parameter binding. Use ${'value'} for parameterised values.
 */

import { neon } from '@neondatabase/serverless';

let _client = null;
function getClient() {
  if (!_client) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL environment variable is not set.\n' +
        'Add it to .env.local (local dev) or Vercel environment variables (production).\n' +
        'Get your connection string from https://neon.tech'
      );
    }
    _client = neon(process.env.DATABASE_URL);
  }
  return _client;
}

export const sql = new Proxy(function () {}, {
  apply(_target, thisArg, args) {
    return Reflect.apply(getClient(), thisArg, args);
  },
  get(_target, prop) {
    return getClient()[prop];
  },
});

/**
 * Run the CREATE TABLE IF NOT EXISTS migrations.
 * Call once via the /api/admin/migrate route or a CLI script.
 *
 * Tables use PostgreSQL types (SERIAL, TEXT, BOOLEAN, INTEGER, TIMESTAMPTZ).
 */
export async function initSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      customer_code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      business_name TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      whatsapp TEXT,
      location TEXT,
      website TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      enquiry_code TEXT UNIQUE NOT NULL,
      customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
      name TEXT,
      email TEXT,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New',
      source TEXT DEFAULT 'Website',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS requirements (
      id SERIAL PRIMARY KEY,
      requirement_code TEXT UNIQUE NOT NULL,
      customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      customer_whatsapp TEXT,
      customer_location TEXT,
      preferred_contact TEXT,
      business_type TEXT,
      industry TEXT,
      business_details TEXT,
      website_type TEXT NOT NULL,
      purpose TEXT,
      pages TEXT,
      features TEXT,
      design_preferences TEXT,
      brand_colors TEXT,
      logo_available TEXT,
      reference_websites TEXT,
      domain_details TEXT,
      hosting_details TEXT,
      budget TEXT,
      timeline TEXT,
      additional_requirements TEXT,
      status TEXT NOT NULL DEFAULT 'New',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      project_code TEXT UNIQUE NOT NULL,
      customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      requirement_id INTEGER REFERENCES requirements(id) ON DELETE SET NULL,
      project_name TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'Planning',
      progress INTEGER DEFAULT 0,
      start_date TEXT,
      expected_end_date TEXT,
      completed_date TEXT,
      live_url TEXT,
      repository_url TEXT,
      technologies TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS portfolio (
      id SERIAL PRIMARY KEY,
      project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      technologies TEXT NOT NULL,
      features TEXT,
      thumbnail TEXT NOT NULL,
      live_url TEXT,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      completion_date TEXT,
      client_name TEXT,
      problem TEXT,
      solution TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Unread',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS project_tasks (
      id SERIAL PRIMARY KEY,
      project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'To Do',
      priority TEXT DEFAULT 'Medium',
      due_date TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS files (
      id SERIAL PRIMARY KEY,
      project_id INTEGER,
      requirement_id INTEGER,
      customer_id INTEGER,
      file_name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_size INTEGER,
      file_type TEXT,
      uploaded_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

/**
 * Seed initial data (admin user + sample data).
 * Only inserts if tables are empty — safe to call repeatedly.
 */
export async function seedInitialData() {
  const bcrypt = (await import('bcryptjs')).default;

  // Admin user
  const [existingAdmin] = await sql`SELECT id FROM users WHERE email = 'admin@7hills.com'`;
  if (!existingAdmin) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES ('7Hills Administrator', 'admin@7hills.com', ${passwordHash}, 'admin')
    `;
  }

  // Sample customers
  const [{ count: customerCount }] = await sql`SELECT COUNT(*)::int as count FROM customers`;
  if (customerCount === 0) {
    await sql`
      INSERT INTO customers (customer_code, name, business_name, email, phone, whatsapp, location, website, notes)
      VALUES
        ('7HWS-CUS-0001', 'Arun Kumar', 'Apex Global Logistics', 'arun@apexlogistics.com', '+91 98450 12345', '+91 98450 12345', 'Bangalore, India', 'https://apexlogistics.example.com', 'Enterprise freight forwarding client.'),
        ('7HWS-CUS-0002', 'Priya Sharma', 'Verde Organic Essentials', 'priya@verdeorganics.com', '+91 98110 56789', '+91 98110 56789', 'Mumbai, India', 'https://verdeorganics.example.com', 'Direct-to-consumer organic skincare store.'),
        ('7HWS-CUS-0003', 'Dr. Rajesh Varma', 'Pulse Healthcare Clinics', 'dr.varma@pulsehealth.com', '+91 97230 44556', '+91 97230 44556', 'Hyderabad, India', 'https://pulsehealth.example.com', 'Multi-branch medical clinic.'),
        ('7HWS-CUS-0004', 'Elena Rostova', 'AeroTech Solutions', 'elena@aerotech.io', '+1 415 555 0199', '+1 415 555 0199', 'San Francisco, USA', 'https://aerotech.example.io', 'B2B SaaS startup.')
    `;
  }

  // Sample portfolio items
  const [{ count: portfolioCount }] = await sql`SELECT COUNT(*)::int as count FROM portfolio`;
  if (portfolioCount === 0) {
    await sql`
      INSERT INTO portfolio (title, slug, description, category, technologies, features, thumbnail, live_url, featured, published, completion_date, client_name, problem, solution)
      VALUES
        (
          'Apex Freight Global Logistics Platform',
          'apex-freight-logistics',
          'A scalable enterprise web application for freight forwarders featuring real-time vessel tracking, instant air/sea quotes, and client consignment management.',
          'Web Applications',
          '["Next.js","React","Tailwind CSS","PostgreSQL","Mapbox GL"]',
          '["Live Container Tracking","Instant Freight Quotation","Client Document Vault","Automated Invoicing","Vessel API Integration"]',
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
          'https://apexlogistics-demo.7hillsweb.com',
          1, 1, '2026-02-25', 'Apex Global Logistics',
          'Apex was losing high-value accounts due to manual Excel-based cargo quotes and delayed email tracking updates.',
          '7Hills Web Solutions engineered a custom Next.js web application integrating global container tracking APIs and automated quotation generation.'
        ),
        (
          'Verde Botanics Luxury Organic Marketplace',
          'verde-botanics-marketplace',
          'Direct-to-consumer e-commerce boutique engineered for ultra-fast page loads, personalized skincare routines, and recurring subscriptions.',
          'E-Commerce Development',
          '["Next.js","Tailwind CSS","Stripe","Node.js","Cloud Storage"]',
          '["1-Click Checkout","Smart Skin Quiz","Subscription Replenishment","Custom Order Bundles","Customer Loyalty Portal"]',
          'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
          'https://verde-staging.7hillsweb.com',
          1, 1, '2026-01-18', 'Verde Organics',
          'Standard template stores were sluggish causing a 42% cart abandonment rate on mobile devices.',
          'We designed an ultra-lightweight bespoke storefront achieving a 99/100 Google Lighthouse score.'
        ),
        (
          'AeroTech Autonomous B2B SaaS Platform',
          'aerotech-autonomous-saas',
          'Interactive marketing platform with dynamic pricing matrices, real-time ROI savings calculators, and customer onboarding funnels.',
          'Business Websites',
          '["React","Next.js","Tailwind CSS","Lucide Icons","HTML5 Canvas"]',
          '["Interactive ROI Engine","Automated Lead Qualification","SaaS Feature Showcases","Multi-Tiered Pricing Table","Self-Serve Demo Booking"]',
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
          'https://aerotech.7hillsweb.com',
          1, 1, '2026-02-12', 'AeroTech Solutions',
          'AeroTech had groundbreaking software but their legacy website failed to generate enterprise sales demos.',
          'We designed an immersive tech experience with interactive hardware models and automated enterprise booking funnels.'
        ),
        (
          'Kinetix Performance Gym & Athletic Club',
          'kinetix-athletic-club',
          'High-impact modern fitness website with member class scheduling, trainer profiles, virtual tour, and automated membership checkout.',
          'Landing Pages',
          '["Next.js","Tailwind CSS","Google Maps API","Razorpay"]',
          '["Class Booking Calendar","Trainer Matcher","Virtual Studio Tour","Membership Tier Checkout","WhatsApp Instant Coach Chat"]',
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
          'https://kinetix-demo.7hillsweb.com',
          0, 1, '2025-12-05', 'Kinetix Athletic Group',
          'Drop-in clients were bottlenecked at the front desk due to lack of an online booking system.',
          'Developed a mobile-first platform where athletes book training slots with 2 taps and receive calendar sync reminders.'
        ),
        (
          'Crestview Private Wealth Management',
          'crestview-wealth-management',
          'Bespoke institutional financial advisory website with secure portfolio portals, market research insights, and compliance-certified contact flows.',
          'Custom Solutions',
          '["Next.js","Tailwind CSS","Node.js","Chart.js","AES-256 Encryption"]',
          '["Market Index Ticker","Retirement Planning Simulator","Client Vault","SEC/FINRA Compliant Disclosures","Secure Encrypted Enquiry"]',
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          'https://crestview-demo.7hillsweb.com',
          0, 1, '2025-11-20', 'Crestview Capital Partners',
          'High-net-worth investors expect uncompromising prestige and institutional security from their wealth manager.',
          'Crafted a bespoke digital identity featuring understated luxury typography and private encrypted correspondence channels.'
        ),
        (
          'Artisan Hearth Bakery & Cafe',
          'artisan-hearth-bakery',
          'Warm artisanal food & beverage site with daily freshly-baked batch counter, online takeout ordering, and event catering requests.',
          'Website Maintenance',
          '["Next.js","Tailwind CSS","WhatsApp Business API","Local SEO"]',
          '["Daily Menu Live Board","Pre-Order Pickup System","Catering Quote Builder","Instagram Feed Sync","Local Search Schema"]',
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
          'https://artisan-hearth.7hillsweb.com',
          0, 1, '2025-10-14', 'Artisan Hearth Co.',
          'Morning queues were out the door and custom cake orders were constantly misplaced.',
          'Implemented an intuitive web app with order scheduling and WhatsApp automated order slips.'
        )
    `;
  }

  // Sample enquiries
  const [{ count: enquiryCount }] = await sql`SELECT COUNT(*)::int as count FROM enquiries`;
  if (enquiryCount === 0) {
    await sql`
      INSERT INTO enquiries (enquiry_code, name, email, phone, subject, message, status, source, notes)
      VALUES
        ('7HWS-ENQ-2026-0001', 'Vikram Sethi', 'vikram@urbanarch.com', '+91 99887 66554',
          'Redesigning architecture portfolio and VR walkthroughs',
          'We are an architecture firm with 40+ completed high-rises. Need a modern minimal website to showcase 4K render galleries and Matterport 3D embeds.',
          'New', 'Website Contact Form', 'High priority lead. Recommended scheduling a discovery call this Wednesday.'),
        ('7HWS-ENQ-2026-0002', 'Sunita Rao', 'sunita@finflow.co', '+91 98765 43210',
          'Fintech payment landing page with demo sandbox',
          'Looking for a high conversion landing page for our new UPI payment stack launching next month.',
          'Proposal Sent', 'Website Contact Form', 'Proposal for 2-week fast-track sprint sent on March 26.')
    `;
  }

  // Sample messages
  const [{ count: messageCount }] = await sql`SELECT COUNT(*)::int as count FROM contact_messages`;
  if (messageCount === 0) {
    await sql`
      INSERT INTO contact_messages (name, email, phone, subject, message, status)
      VALUES
        ('Amitabh Roy', 'amitabh@techcorp.in', '+91 98300 11223',
          'Annual Website Maintenance Contract',
          'We have an existing Next.js e-commerce app that needs monthly security audits, speed optimization, and content updates. Do you offer SLA plans?',
          'Unread'),
        ('Dr. Ananya Sen', 'dr.sen@dentalcare.com', '+91 98401 22334',
          'Dental Clinic Website Inquiry',
          'Interested in building an informative website for our dental clinic with WhatsApp appointment booking and patient testimonials.',
          'Read')
    `;
  }
}

export default sql;
