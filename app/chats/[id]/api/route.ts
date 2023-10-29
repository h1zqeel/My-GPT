import db from '@/db/connection';
import { sql } from 'drizzle-orm';
import { chats } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { errors } from '@/constants';
import { getUserSession } from '@/utils/session';
import { invalidateChatsCache } from '@/utils/chat';
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

			await db.update(chats).set({ archived: true })
				.where(sql`${chats.id} = ${chatId} AND ${chats.creatorId} = ${user?.id}`);
			await invalidateChatsCache(user?.id as number);

			return NextResponse.json(
				{ ok: true },
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
	return router.run(request, ctx) as any;
}

export { handler as DELETE };