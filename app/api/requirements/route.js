import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import { generateRequirementCode, generateCustomerCode } from '@/lib/ids';
import { notifyAdminNewRequirement, sendClientRequirementConfirmation } from '@/lib/email';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  let requirements;

  if (status && status !== 'All' && search) {
    const term = `%${search}%`;
    requirements = await sql`
      SELECT r.*, c.customer_code as customer_ref_code
      FROM requirements r
      LEFT JOIN customers c ON r.customer_id = c.id
      WHERE r.status = ${status}
        AND (r.requirement_code ILIKE ${term} OR r.customer_name ILIKE ${term} OR r.customer_email ILIKE ${term} OR r.website_type ILIKE ${term})
      ORDER BY r.id DESC
    `;
  } else if (status && status !== 'All') {
    requirements = await sql`
      SELECT r.*, c.customer_code as customer_ref_code
      FROM requirements r
      LEFT JOIN customers c ON r.customer_id = c.id
      WHERE r.status = ${status}
      ORDER BY r.id DESC
    `;
  } else if (search) {
    const term = `%${search}%`;
    requirements = await sql`
      SELECT r.*, c.customer_code as customer_ref_code
      FROM requirements r
      LEFT JOIN customers c ON r.customer_id = c.id
      WHERE r.requirement_code ILIKE ${term} OR r.customer_name ILIKE ${term} OR r.customer_email ILIKE ${term} OR r.website_type ILIKE ${term}
      ORDER BY r.id DESC
    `;
  } else {
    requirements = await sql`
      SELECT r.*, c.customer_code as customer_ref_code
      FROM requirements r
      LEFT JOIN customers c ON r.customer_id = c.id
      ORDER BY r.id DESC
    `;
  }

  return NextResponse.json({ requirements });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'Requirement ID and status required' }, { status: 400 });
  }

  await sql`
    UPDATE requirements
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Status updated' });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      businessName,
      email,
      phone,
      whatsapp,
      location,
      preferredContact,
      businessType,
      industry,
      businessDescription,
      existingWebsite,
      socialLinks,
      websiteType,
      purpose,
      requiredPages,
      functionalRequirements,
      features = [],
      customFeatureNotes,
      designStyle,
      brandColors,
      logoAvailable,
      referenceWebsites,
      designRequirements,
      hasDomain,
      domainDetails,
      hasHosting,
      hostingDetails,
      budget,
      timeline,
      additionalRequirements,
    } = body;

    if (!fullName || !email || !websiteType) {
      return NextResponse.json(
        { error: 'Full name, email, and website type are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const requirementCode = generateRequirementCode();
    let customerCode = generateCustomerCode();

    if (!process.env.DATABASE_URL) {
      console.log('Requirement received (DB not configured yet):', {
        requirementCode,
        customerCode,
        fullName,
        email,
        phone,
        whatsapp,
        businessName,
        websiteType,
        budget,
        timeline,
        features,
      });
      return NextResponse.json({
        success: true,
        message: 'Project requirement successfully submitted and registered.',
        requirementCode,
        customerCode,
        requirementId: 1,
      });
    }

    // Check or create customer
    let [customer] = await sql`SELECT id, customer_code FROM customers WHERE email = ${email.trim().toLowerCase()}`;
    let customerId;

    if (customer) {
      customerId = customer.id;
      customerCode = customer.customer_code;
      await sql`
        UPDATE customers
        SET phone = COALESCE(phone, ${phone || null}),
            whatsapp = COALESCE(whatsapp, ${whatsapp || null}),
            business_name = COALESCE(${businessName || null}, business_name),
            location = COALESCE(${location || null}, location),
            updated_at = NOW()
        WHERE id = ${customerId}
      `;
    } else {
      customerCode = generateCustomerCode();
      const [newCust] = await sql`
        INSERT INTO customers (customer_code, name, business_name, email, phone, whatsapp, location, website, notes)
        VALUES (
          ${customerCode},
          ${fullName.trim()},
          ${businessName ? businessName.trim() : null},
          ${email.trim().toLowerCase()},
          ${phone ? phone.trim() : null},
          ${whatsapp ? whatsapp.trim() : null},
          ${location ? location.trim() : null},
          ${existingWebsite ? existingWebsite.trim() : null},
          ${`Auto-created from Requirement Intake Form. Industry: ${industry || 'Unspecified'}`}
        )
        RETURNING id
      `;
      customerId = newCust.id;
    }

    const fullBusinessDetails = JSON.stringify({
      businessDescription: businessDescription || '',
      socialLinks: socialLinks || '',
      existingWebsite: existingWebsite || '',
    });

    const fullDomainDetails = JSON.stringify({
      hasDomain: hasDomain || 'no',
      details: domainDetails || '',
    });

    const fullHostingDetails = JSON.stringify({
      hasHosting: hasHosting || 'no',
      details: hostingDetails || '',
    });

    const fullDesignPrefs = JSON.stringify({
      style: designStyle || 'Modern & Clean',
      requirements: designRequirements || '',
    });

    const fullFeatures = JSON.stringify({
      selected: features,
      customNotes: customFeatureNotes || '',
      functionalRequirements: functionalRequirements || '',
    });

    const [reqRow] = await sql`
      INSERT INTO requirements (
        requirement_code, customer_id, customer_name, customer_email, customer_phone, customer_whatsapp,
        customer_location, preferred_contact, business_type, industry, business_details,
        website_type, purpose, pages, features, design_preferences, brand_colors,
        logo_available, reference_websites, domain_details, hosting_details, budget, timeline,
        additional_requirements, status
      ) VALUES (
        ${requirementCode},
        ${customerId},
        ${fullName.trim()},
        ${email.trim().toLowerCase()},
        ${phone ? phone.trim() : null},
        ${whatsapp ? whatsapp.trim() : null},
        ${location ? location.trim() : null},
        ${preferredContact || 'Email'},
        ${businessType || ''},
        ${industry || ''},
        ${fullBusinessDetails},
        ${websiteType},
        ${purpose || ''},
        ${requiredPages || ''},
        ${fullFeatures},
        ${fullDesignPrefs},
        ${brandColors || ''},
        ${logoAvailable || 'Need assistance'},
        ${referenceWebsites || ''},
        ${fullDomainDetails},
        ${fullHostingDetails},
        ${budget || 'Flexible'},
        ${timeline || 'Flexible'},
        ${additionalRequirements || ''},
        'New'
      )
      RETURNING id
    `;

    // Dispatch emails asynchronously
    Promise.allSettled([
      notifyAdminNewRequirement({
        requirementCode,
        customerName: fullName.trim(),
        customerEmail: email.trim().toLowerCase(),
        customerPhone: phone ? phone.trim() : null,
        preferredContact,
        businessName,
        customerLocation: location,
        websiteType,
        budget,
        timeline,
        domainDetails,
        hostingDetails,
        features: Array.isArray(features) ? features.join(', ') : '',
        purpose,
        pages: requiredPages,
        designPreferences: designStyle,
        brandColors,
        referenceWebsites,
        additionalRequirements,
      }),
      sendClientRequirementConfirmation({
        to: email.trim().toLowerCase(),
        name: fullName.trim(),
        requirementCode,
        websiteType,
        budget,
        timeline,
      }),
    ]).catch((e) => console.error('Background requirement email error:', e));

    return NextResponse.json({
      success: true,
      message: 'Project requirement successfully submitted and registered.',
      requirementCode,
      customerCode,
      requirementId: reqRow.id,
    });
  } catch (err) {
    console.error('Requirement submission error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your requirement.' },
      { status: 500 }
    );

  }
}
