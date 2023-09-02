import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';


const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

migrate(db, { migrationsFolder: './db/drizzle' }).then(()=>{
	console.log('Migrations done');
});

export default db;
