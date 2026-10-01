/**
 * POST /api/admin/migrate
 *
 * Runs the PostgreSQL schema migration (CREATE TABLE IF NOT EXISTS)
 * and seeds initial data (admin user, sample customers, portfolio, etc.)
 *
 * Protected by a MIGRATE_SECRET env var — only someone with that secret
 * can trigger it. Run once after Neon DB is connected.
 *
 * Usage:
 *   curl -X POST https://your-domain.vercel.app/api/admin/migrate \
 *     -H "Content-Type: application/json" \
 *     -d '{"secret":"<your-MIGRATE_SECRET>"}'
 */

import { NextResponse } from 'next/server';
import { initSchema, seedInitialData } from '@/lib/db';

export async function POST(request) {
  try {
    const { secret } = await request.json();

    const MIGRATE_SECRET = process.env.MIGRATE_SECRET;
    if (!MIGRATE_SECRET || secret !== MIGRATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized. Provide the correct MIGRATE_SECRET.' }, { status: 401 });
    }

    await initSchema();
    await seedInitialData();

    return NextResponse.json({
      success: true,
      message: 'Database schema initialized and seed data applied successfully.',
    });
  } catch (err) {
    console.error('Migration error:', err);
    return NextResponse.json(
      { error: 'Migration failed.', details: err.message },
      { status: 500 }
    );
  }
}
