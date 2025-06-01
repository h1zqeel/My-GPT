import _ from 'lodash';

import { getAllowedModels } from '@/utils/ai';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { errors, gptModels } from '@/constants';
import { auth0 } from '@/utils/auth';
import db from '@/db/connection';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function GET(req: NextRequest) {
	try{
		const session = await auth0.getSession(req);
		const user = session?.user;

		const [userData] = await db
			.select()
			.from(users)
			.where(eq(users.userSub, user?.sub ?? ''))
			.limit(1);

		const { openAIModels, googleModels: { models: googleModels }, claudeModels } = await getAllowedModels({ user: userData });
		const allowedUserModels = [_.map(openAIModels, 'id'), _.map(googleModels, 'name'), _.map(claudeModels, 'id')].flat();
		const supportedModels = _.map(gptModels, 'value');
		const availableModels = _.intersection(allowedUserModels, supportedModels);
		if(availableModels.length < 1) {
			throw new Error('No Models Available, Did you add a Valid OpenAI or GoogleAI Key ?');
		}
		return NextResponse.json({
			ok: true,
			models: availableModels
		});
	} catch(e : any) {
		return NextResponse.json({
			ok: false,
			e,
			error: e.message ?? errors.DEFAULT
		}, { status: e.response?.status ?? 500 });
	}
}