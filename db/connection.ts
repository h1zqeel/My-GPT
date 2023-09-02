import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: 'postgres://hxzqll:iQqASceB4u9s@ep-late-pond-26867545-pooler.eu-central-1.aws.neon.tech/my-gpt' });
const db = drizzle(pool);

export default db;
