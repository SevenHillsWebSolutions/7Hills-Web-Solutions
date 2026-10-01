import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('project_id');
  const status = searchParams.get('status');

  let tasks;

  if (projectId && status && status !== 'All') {
    tasks = await sql`
      SELECT t.*, p.project_name, p.project_code, c.name as customer_name
      FROM project_tasks t
      JOIN projects p ON t.project_id = p.id
      JOIN customers c ON p.customer_id = c.id
      WHERE t.project_id = ${projectId} AND t.status = ${status}
      ORDER BY t.id DESC
    `;
  } else if (projectId) {
    tasks = await sql`
      SELECT t.*, p.project_name, p.project_code, c.name as customer_name
      FROM project_tasks t
      JOIN projects p ON t.project_id = p.id
      JOIN customers c ON p.customer_id = c.id
      WHERE t.project_id = ${projectId}
      ORDER BY t.id DESC
    `;
  } else if (status && status !== 'All') {
    tasks = await sql`
      SELECT t.*, p.project_name, p.project_code, c.name as customer_name
      FROM project_tasks t
      JOIN projects p ON t.project_id = p.id
      JOIN customers c ON p.customer_id = c.id
      WHERE t.status = ${status}
      ORDER BY t.id DESC
    `;
  } else {
    tasks = await sql`
      SELECT t.*, p.project_name, p.project_code, c.name as customer_name
      FROM project_tasks t
      JOIN projects p ON t.project_id = p.id
      JOIN customers c ON p.customer_id = c.id
      ORDER BY t.id DESC
    `;
  }

  return NextResponse.json({ tasks });
}

export async function POST(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { project_id, title, description, priority = 'Medium', due_date, status = 'To Do' } = body;

  if (!project_id || !title) {
    return NextResponse.json({ error: 'Project ID and title are required.' }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO project_tasks (project_id, title, description, status, priority, due_date)
    VALUES (${project_id}, ${title.trim()}, ${description || null}, ${status}, ${priority}, ${due_date || null})
    RETURNING id
  `;

  return NextResponse.json({ success: true, taskId: row.id, message: 'Task added' });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, title, description, status, priority, due_date } = body;

  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 });

  await sql`
    UPDATE project_tasks
    SET title = COALESCE(${title || null}, title),
        description = COALESCE(${description !== undefined ? description : null}, description),
        status = COALESCE(${status || null}, status),
        priority = COALESCE(${priority || null}, priority),
        due_date = COALESCE(${due_date !== undefined ? due_date : null}, due_date),
        updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Task updated' });
}

export async function DELETE(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 });

  await sql`DELETE FROM project_tasks WHERE id = ${id}`;

  return NextResponse.json({ success: true, message: 'Task deleted' });
}
