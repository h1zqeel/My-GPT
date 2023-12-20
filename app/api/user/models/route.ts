import _ from 'lodash';

import { getAllowedModels } from '@/utils/ai';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { gptModels } from '@/constants';
import { parseOpenAIError } from '@/utils/helpers';

export async function GET(req: NextRequest) {
	try{
		const user = await getUserSession({ req });
		const { openAIModels: { data: openAImodels }, googleModels: { models: googleModels } } = await getAllowedModels({ user });
		const allowedUserModels = [_.map(openAImodels, 'id'), _.map(googleModels, 'name')].flat();
		const supportedModels = _.map(gptModels, 'value');

		return NextResponse.json({
			ok: true,
			models: _.intersection(allowedUserModels, supportedModels)
		});
	} catch(e : any) {
		console.log({ error: e });
		return NextResponse.json({
			ok: false,
			error: parseOpenAIError(e.response?.status),
			fullError: e,
			message: e.message,
			data: e.response?.data
		}, { status: e.response?.status ?? 500 });
	}
}