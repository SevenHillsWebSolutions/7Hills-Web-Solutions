import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = (searchParams.get('code') || '').trim();

    if (!code) {
      return NextResponse.json({ error: 'Please provide a valid tracking code.' }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        found: true,
        type: 'requirement',
        data: {
          code,
          customerName: 'Demo Client',
          service: 'Business Website Platform',
          status: 'Under Review',
          submittedAt: new Date().toISOString(),
          stage: 2,
          stageTitle: 'Technical Feasibility Review',
          description: 'Our lead software architects are evaluating your specifications and third-party integrations.',
        },
      });
    }

    // 1. Search in Requirements
    const [req] = await sql`
      SELECT 
        requirement_code,
        customer_name,
        website_type,
        budget,
        timeline,
        status,
        created_at
      FROM requirements
      WHERE requirement_code ILIKE ${code}
    `;

    if (req) {
      let stage = 1;
      let stageTitle = 'Requirement Registered';
      let stageDesc = 'Your project questionnaire has been logged into our system.';

      if (req.status === 'Reviewed') {
        stage = 2;
        stageTitle = 'Technical Feasibility & Architecture';
        stageDesc = 'Our engineering team is analyzing your specifications and scope.';
      } else if (req.status === 'Contacted' || req.status === 'Discovery') {
        stage = 3;
        stageTitle = 'Client Discovery & Scope Confirmation';
        stageDesc = 'We are coordinating with you regarding milestones and timeline.';
      } else if (req.status === 'Proposal Sent') {
        stage = 4;
        stageTitle = 'Proposal & Milestone Schedule Dispatched';
        stageDesc = 'Formal project deliverables and timeline schedule issued.';
      } else if (req.status === 'Converted' || req.status === 'In Development') {
        stage = 5;
        stageTitle = 'Development & Engineering Sprint';
        stageDesc = 'Your bespoke platform is actively being engineered by our team.';
      }

      return NextResponse.json({
        found: true,
        type: 'requirement',
        data: {
          code: req.requirement_code,
          clientName: req.customer_name,
          service: req.website_type,
          status: req.status || 'New',
          submittedAt: req.created_at,
          budget: req.budget,
          timeline: req.timeline,
          stage,
          stageTitle,
          stageDesc,
        },
      });
    }

    // 2. Search in Active Projects
    const [proj] = await sql`
      SELECT 
        p.project_code,
        p.project_name,
        p.status,
        p.progress,
        p.start_date,
        p.expected_end_date,
        p.completed_date,
        p.live_url,
        c.name as customer_name
      FROM projects p
      JOIN customers c ON p.customer_id = c.id
      WHERE p.project_code ILIKE ${code}
    `;

    if (proj) {
      return NextResponse.json({
        found: true,
        type: 'project',
        data: {
          code: proj.project_code,
          name: proj.project_name,
          clientName: proj.customer_name,
          status: proj.status,
          progress: proj.progress || 0,
          startDate: proj.start_date,
          expectedEndDate: proj.expected_end_date,
          completedDate: proj.completed_date,
          liveUrl: proj.live_url,
        },
      });
    }

    // 3. Search in Inquiries
    const [enq] = await sql`
      SELECT 
        enquiry_code,
        name,
        subject,
        status,
        created_at
      FROM enquiries
      WHERE enquiry_code ILIKE ${code}
    `;

    if (enq) {
      return NextResponse.json({
        found: true,
        type: 'enquiry',
        data: {
          code: enq.enquiry_code,
          clientName: enq.name,
          subject: enq.subject,
          status: enq.status,
          submittedAt: enq.created_at,
        },
      });
    }

    return NextResponse.json({
      found: false,
      message: 'No active requirement, project, or inquiry found with this tracking ID. Please verify the code and try again.',
    }, { status: 404 });
  } catch (error) {
    console.error('Error tracking status:', error);
    return NextResponse.json({ error: 'Server error while fetching tracking status.' }, { status: 500 });
  }
}
