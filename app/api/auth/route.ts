import db from '@/db/connection';
import { getUserSession } from '@/utils/user';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function GET(req: NextRequest) {
	const user = await getUserSession();
	await db.execute(sql`SELECT 1;`);

	return NextResponse.json(
		{
			user
		},
		{ status: 200 }
	);
}
