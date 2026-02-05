import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { syncRepositories } from '$lib/server/github/sync';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	// Simple API key authentication for admin endpoint
	const authHeader = request.headers.get('Authorization');
	if (!env.SYNC_API_KEY || authHeader !== `Bearer ${env.SYNC_API_KEY}`) {
		error(401, 'Unauthorized');
	}

	try {
		const [libraryCount, programCount] = await Promise.all([
			syncRepositories('zig-package'),
			syncRepositories('zig-program')
		]);

		return json({
			success: true,
			synced: {
				libraries: libraryCount,
				programs: programCount
			}
		});
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		error(500, `Sync failed: ${message}`);
	}
};
