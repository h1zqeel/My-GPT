import db from '@/db/connection';
import { users } from '@/db/schema';
import { auth0 } from '@/utils/auth';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function GET(req: NextRequest) {
	const session = await auth0.getSession(req);
	const user = session?.user;
	await db.execute(sql`SELECT 1;`);

	const [userData] = await db
		.select()
		.from(users)
		.where(sql`${users.userSub} = ${user?.sub}`);
	return NextResponse.json(
		{
			user: {
				name: user?.name,
				email: user?.email,
				openAIKey: userData?.openAIKey,
				googleAIKey: userData?.googleAIKey,
				anthropicAIKey: userData?.anthropicAIKey,
			},
		},
		{ status: 200 }
	);
}
