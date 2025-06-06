import { auth0 } from './auth';
import db from '@/db/connection';
import { users } from '@/db/schema';
import { TUser } from '@/types/User';
import { sql } from 'drizzle-orm';

const getUserSession = async () => {
	const session = await auth0.getSession();
	if (!session || !session.user) {
		return null;
	}

	const [userData] = await db
		.select({
			openAIKey: users.openAIKey,
			googleAIKey: users.googleAIKey,
			anthropicAIKey: users.anthropicAIKey,
		})
		.from(users)
		.where(sql`${users.userSub} = ${session?.user?.sub}`);

	return { ...session.user, ...userData } as TUser;
};

export { getUserSession };
