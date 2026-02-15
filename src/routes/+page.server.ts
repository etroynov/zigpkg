import type { PageServerLoad } from './$types';
import {
	getMostPopular,
	getNewPackages,
	getRecentlyUpdated,
	getStats,
} from '$lib/server/packages/queries';
import { syncRepositories, shouldSync } from '$lib/server/github/sync';

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
}

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Check if we need to sync (trigger in background, don't block page load)
	const needsLibrarySync = await shouldSync('zig-package');
	const needsProgramSync = await shouldSync('zig-program');

	if (needsLibrarySync || needsProgramSync) {
		// Trigger background sync (non-blocking)
		Promise.allSettled([
			needsLibrarySync ? syncRepositories('zig-package') : Promise.resolve(),
			needsProgramSync ? syncRepositories('zig-program') : Promise.resolve()
		]).catch(console.error);
	}

	// Fetch data from cache (database)
	const [popularPackages, newPackages, recentlyUpdated, stats] = await Promise.all([
		getMostPopular(6),
		getNewPackages(4),
		getRecentlyUpdated(4),
		getStats()
	]);

	// Set cache headers for CDN/browser caching
	setHeaders({
		'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
	});

	return {
		popularPackages: popularPackages.map((pkg) => ({
			name: pkg.name,
			owner: pkg.owner,
			description: pkg.description || '',
			version: pkg.version || 'latest',
			stars: pkg.stars,
			openIssues: pkg.openIssues,
			pushedAt: pkg.pushedAt.toISOString()
		})),
		newPackages: newPackages.map((pkg) => ({
			name: pkg.name,
			owner: pkg.owner,
			description: pkg.description || '',
			version: pkg.version || 'latest',
			stars: pkg.stars,
			openIssues: pkg.openIssues,
			pushedAt: pkg.pushedAt.toISOString(),
			isNew: true
		})),
		recentlyUpdated: recentlyUpdated.map((pkg) => ({
			name: pkg.name,
			owner: pkg.owner,
			description: pkg.description || '',
			version: pkg.version || 'latest',
			stars: pkg.stars,
			openIssues: pkg.openIssues,
			pushedAt: pkg.pushedAt.toISOString()
		})),
		stats: {
			totalPackages: stats?.totalPackages ?? 0,
			totalLibraries: stats?.totalLibraries ?? 0,
			totalApplications: stats?.totalApplications ?? 0,
			totalStars: stats?.totalStars ?? 0
		}
	};
};
