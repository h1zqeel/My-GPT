import db from '@/prisma/db';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { errors } from '@/constants';
interface RequestContext {
	params: {
		id: number | string;
	};
}

export async function DELETE(req: NextRequest, { params } : RequestContext) {
	const user = await getUserSession({ req });
	const { id: chatId } = params;


	if(chatId) {
		const chat = await db.chat.update({
			data: {
				archived: true
			},
			where: {
				id: Number(chatId),
				creatorId: user?.id
			}
		});

		return NextResponse.json(
			{ ok: true, chat },
			{ status: 200 }
		);
	} else {
		return NextResponse.json(
			{ ok: false, error: errors.INVALID_REQUEST },
			{ status: 400 }
		);
	}
}