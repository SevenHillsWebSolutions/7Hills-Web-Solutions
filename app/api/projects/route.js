import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import { generateProjectCode } from '@/lib/ids';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  let projects;

  if (status && status !== 'All' && search) {
    const term = `%${search}%`;
    projects = await sql`
      SELECT p.*, c.name as customer_name, c.business_name, c.email as customer_email,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id)::int as task_count,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id AND status = 'Done')::int as completed_task_count
      FROM projects p
      JOIN customers c ON p.customer_id = c.id
      WHERE p.status = ${status}
        AND (p.project_name ILIKE ${term} OR p.project_code ILIKE ${term} OR c.name ILIKE ${term} OR c.business_name ILIKE ${term})
      ORDER BY p.id DESC
    `;
  } else if (status && status !== 'All') {
    projects = await sql`
      SELECT p.*, c.name as customer_name, c.business_name, c.email as customer_email,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id)::int as task_count,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id AND status = 'Done')::int as completed_task_count
      FROM projects p
      JOIN customers c ON p.customer_id = c.id
      WHERE p.status = ${status}
      ORDER BY p.id DESC
    `;
  } else if (search) {
    const term = `%${search}%`;
    projects = await sql`
      SELECT p.*, c.name as customer_name, c.business_name, c.email as customer_email,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id)::int as task_count,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id AND status = 'Done')::int as completed_task_count
      FROM projects p
      JOIN customers c ON p.customer_id = c.id
      WHERE p.project_name ILIKE ${term} OR p.project_code ILIKE ${term} OR c.name ILIKE ${term} OR c.business_name ILIKE ${term}
      ORDER BY p.id DESC
    `;
  } else {
    projects = await sql`
      SELECT p.*, c.name as customer_name, c.business_name, c.email as customer_email,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id)::int as task_count,
        (SELECT COUNT(*) FROM project_tasks WHERE project_id = p.id AND status = 'Done')::int as completed_task_count
      FROM projects p
      JOIN customers c ON p.customer_id = c.id
      ORDER BY p.id DESC
    `;
  }

  return NextResponse.json({ projects });
}

export async function POST(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const {
    customer_id,
    requirement_id,
    project_name,
    description,
    status = 'Planning',
    progress = 0,
    start_date,
    expected_end_date,
    live_url,
    repository_url,
    technologies,
    notes,
  } = body;

  if (!customer_id || !project_name) {
    return NextResponse.json({ error: 'Customer and project name are required.' }, { status: 400 });
  }

  const projectCode = generateProjectCode();

  const techJson = Array.isArray(technologies)
    ? JSON.stringify(technologies)
    : typeof technologies === 'string' && technologies.trim().startsWith('[')
    ? technologies
    : JSON.stringify(technologies ? technologies.split(',').map((t) => t.trim()) : ['Next.js', 'Tailwind CSS']);

  const [row] = await sql`
    INSERT INTO projects (
      project_code, customer_id, requirement_id, project_name, description,
      status, progress, start_date, expected_end_date, live_url, repository_url,
      technologies, notes
    ) VALUES (
      ${projectCode},
      ${customer_id},
      ${requirement_id || null},
      ${project_name.trim()},
      ${description ? description.trim() : null},
      ${status},
      ${progress || 0},
      ${start_date || new Date().toISOString().split('T')[0]},
      ${expected_end_date || null},
      ${live_url ? live_url.trim() : null},
      ${repository_url ? repository_url.trim() : null},
      ${techJson},
      ${notes ? notes.trim() : null}
    )
    RETURNING id
  `;

  return NextResponse.json({
    success: true,
    message: 'Project created successfully.',
    projectId: row.id,
    projectCode,
  });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const {
    id,
    project_name,
    description,
    status,
    progress,
    start_date,
    expected_end_date,
    completed_date,
    live_url,
    repository_url,
    technologies,
    notes,
  } = body;

  if (!id) return NextResponse.json({ error: 'Project ID required' }, { status: 400 });

  let techJson = null;
  if (technologies !== undefined) {
    techJson = Array.isArray(technologies)
      ? JSON.stringify(technologies)
      : typeof technologies === 'string' && technologies.trim().startsWith('[')
      ? technologies
      : JSON.stringify(technologies ? technologies.split(',').map((t) => t.trim()) : []);
  }

  await sql`
    UPDATE projects
    SET project_name = COALESCE(${project_name || null}, project_name),
        description = COALESCE(${description !== undefined ? description : null}, description),
        status = COALESCE(${status || null}, status),
        progress = COALESCE(${progress !== undefined ? Number(progress) : null}, progress),
        start_date = COALESCE(${start_date || null}, start_date),
        expected_end_date = COALESCE(${expected_end_date !== undefined ? expected_end_date : null}, expected_end_date),
        completed_date = COALESCE(${completed_date !== undefined ? completed_date : null}, completed_date),
        live_url = COALESCE(${live_url !== undefined ? live_url : null}, live_url),
        repository_url = COALESCE(${repository_url !== undefined ? repository_url : null}, repository_url),
        technologies = COALESCE(${techJson}, technologies),
        notes = COALESCE(${notes !== undefined ? notes : null}, notes),
        updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Project updated successfully.' });
}

export async function DELETE(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Project ID required' }, { status: 400 });

  await sql`DELETE FROM projects WHERE id = ${id}`;

  return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
}
