import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { errors } from '@/constants';
import { getUserSession } from '@/utils/session';
interface RequestContext {
	params: {
		id: number | string;
	};
}
const router = createEdgeRouter<NextRequest, RequestContext>();

router
	.use(chatBelongsToUser)
	.delete(async(req: NextRequest, { params } : RequestContext) => {
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
	});
;

async function handler(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx);
}

export { handler as DELETE };