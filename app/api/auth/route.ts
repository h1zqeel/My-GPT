import db from '@/db/connection';
import { getUserSession } from '@/utils/session';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const preferredRegion = 'fra1';

export async function GET(req: NextRequest) {
	const sessionId = req.cookies.get(process.env.TOKEN_NAME)?.value;
	await db.execute(sql`SELECT 1;`);
	if(sessionId) {
		const session = await getUserSession({ sessionId });
		return NextResponse.json({ user: session });
	} else {
		return NextResponse.redirect(new URL('/login', req.url));
	}
}