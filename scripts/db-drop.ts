import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is not set');

const parsed = new URL(url);
const dbName = parsed.pathname.slice(1);

// Connect to default postgres db to drop target db
parsed.pathname = '/postgres';
const sql = postgres(parsed.toString(), { max: 1 });

try {
	const exists = await sql`SELECT 1 FROM pg_database WHERE datname = ${dbName}`;
	if (exists.length > 0) {
		await sql.unsafe(`DROP DATABASE "${dbName}"`);
		console.log(`Database "${dbName}" dropped`);
	} else {
		console.log(`Database "${dbName}" does not exist`);
	}
} finally {
	await sql.end();
}
