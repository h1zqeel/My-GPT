import db from '@/db/connection';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';

async function main() {
	await migrate(db, { migrationsFolder: './db/drizzle' });
}

main().then(() => {
	console.log('Migrations Completed');
	process.exit(0);
});