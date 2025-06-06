import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL!;

if (process.env.NODE_ENV === 'development') {
	neonConfig.fetchEndpoint = (host) => {
		const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
		console.log({ host, protocol, port });
		return `${protocol}://${host}:${port}/sql`;
	};
	const connectionStringUrl = new URL(connectionString);
	neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== 'db.localtest.me';
	neonConfig.wsProxy = (host) => (host === 'db.localtest.me' ? `${host}:4444/v2` : `${host}/v2`);
}

const sql = neon(connectionString);
const db = drizzle(sql as any);

export default db;
