import _ from 'lodash';

import { getAllowedModels } from '@/utils/ai';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { errors, gptModels } from '@/constants';

export async function GET(req: NextRequest) {
	try{
		const user = await getUserSession({ req });
		const { openAIModels: { data: openAImodels }, googleModels: { models: googleModels }, claudeModels } = await getAllowedModels({ user });
		const allowedUserModels = [_.map(openAImodels, 'id'), _.map(googleModels, 'name'), _.map(claudeModels, 'id')].flat();
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