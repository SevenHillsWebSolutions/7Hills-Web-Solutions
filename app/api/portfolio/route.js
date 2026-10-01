import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await sql`
    SELECT p.*, pr.project_code, pr.project_name
    FROM portfolio p
    LEFT JOIN projects pr ON p.project_id = pr.id
    ORDER BY p.id DESC
  `;

  return NextResponse.json({ portfolio: items });
}

export async function POST(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const {
    project_id,
    title,
    slug,
    description,
    category,
    technologies,
    features,
    thumbnail,
    live_url,
    featured = 0,
    published = 1,
    completion_date,
    client_name,
    problem,
    solution,
  } = body;

  if (!title || !description || !category || !thumbnail) {
    return NextResponse.json(
      { error: 'Title, description, category, and thumbnail image are required.' },
      { status: 400 }
    );
  }

  const generatedSlug = slug ? slugify(slug) : slugify(title);

  // Ensure unique slug
  let uniqueSlug = generatedSlug;
  const [existing] = await sql`SELECT id FROM portfolio WHERE slug = ${uniqueSlug}`;
  if (existing) {
    uniqueSlug = `${generatedSlug}-${Date.now().toString().slice(-4)}`;
  }

  const techJson = Array.isArray(technologies)
    ? JSON.stringify(technologies)
    : typeof technologies === 'string' && technologies.trim().startsWith('[')
    ? technologies
    : JSON.stringify(technologies ? technologies.split(',').map((t) => t.trim()) : ['Next.js']);

  const featJson = Array.isArray(features)
    ? JSON.stringify(features)
    : typeof features === 'string' && features.trim().startsWith('[')
    ? features
    : JSON.stringify(features ? features.split(',').map((t) => t.trim()) : []);

  const [row] = await sql`
    INSERT INTO portfolio (
      project_id, title, slug, description, category, technologies, features,
      thumbnail, live_url, featured, published, completion_date, client_name,
      problem, solution
    ) VALUES (
      ${project_id || null},
      ${title.trim()},
      ${uniqueSlug},
      ${description.trim()},
      ${category},
      ${techJson},
      ${featJson},
      ${thumbnail.trim()},
      ${live_url ? live_url.trim() : null},
      ${featured ? 1 : 0},
      ${published !== undefined ? (published ? 1 : 0) : 1},
      ${completion_date || new Date().toISOString().split('T')[0]},
      ${client_name ? client_name.trim() : null},
      ${problem ? problem.trim() : null},
      ${solution ? solution.trim() : null}
    )
    RETURNING id
  `;

  return NextResponse.json({
    success: true,
    message: 'Portfolio item created successfully.',
    portfolioId: row.id,
    slug: uniqueSlug,
  });
}

export async function PATCH(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const {
    id,
    title,
    slug,
    description,
    category,
    technologies,
    features,
    thumbnail,
    live_url,
    featured,
    published,
    completion_date,
    client_name,
    problem,
    solution,
  } = body;

  if (!id) return NextResponse.json({ error: 'Portfolio ID required' }, { status: 400 });

  let techJson = null;
  if (technologies !== undefined) {
    techJson = Array.isArray(technologies)
      ? JSON.stringify(technologies)
      : typeof technologies === 'string' && technologies.trim().startsWith('[')
      ? technologies
      : JSON.stringify(technologies ? technologies.split(',').map((t) => t.trim()) : []);
  }

  let featJson = null;
  if (features !== undefined) {
    featJson = Array.isArray(features)
      ? JSON.stringify(features)
      : typeof features === 'string' && features.trim().startsWith('[')
      ? features
      : JSON.stringify(features ? features.split(',').map((t) => t.trim()) : []);
  }

  await sql`
    UPDATE portfolio
    SET title = COALESCE(${title || null}, title),
        slug = COALESCE(${slug ? slugify(slug) : null}, slug),
        description = COALESCE(${description || null}, description),
        category = COALESCE(${category || null}, category),
        technologies = COALESCE(${techJson}, technologies),
        features = COALESCE(${featJson}, features),
        thumbnail = COALESCE(${thumbnail || null}, thumbnail),
        live_url = COALESCE(${live_url !== undefined ? live_url : null}, live_url),
        featured = COALESCE(${featured !== undefined ? (featured ? 1 : 0) : null}, featured),
        published = COALESCE(${published !== undefined ? (published ? 1 : 0) : null}, published),
        completion_date = COALESCE(${completion_date || null}, completion_date),
        client_name = COALESCE(${client_name !== undefined ? client_name : null}, client_name),
        problem = COALESCE(${problem !== undefined ? problem : null}, problem),
        solution = COALESCE(${solution !== undefined ? solution : null}, solution),
        updated_at = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true, message: 'Portfolio item updated.' });
}

export async function DELETE(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Portfolio ID required' }, { status: 400 });

  await sql`DELETE FROM portfolio WHERE id = ${id}`;

  return NextResponse.json({ success: true, message: 'Portfolio item deleted.' });
}
