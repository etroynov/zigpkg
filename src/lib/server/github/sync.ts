import { db } from '$lib/server/db';
import { packages, syncMetadata } from '$lib/server/db/schema';
import { githubClient, type TopicType } from './client';
import { eq } from 'drizzle-orm';
import type { GitHubRepository } from '$lib/types/github';
import type { PackageType } from '$lib/types/package';

const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 hour between full syncs

function mapGitHubRepoToPackage(repo: GitHubRepository, packageType: PackageType) {
	return {
		githubId: repo.id,
		name: repo.name,
		fullName: repo.full_name,
		owner: repo.owner.login,
		ownerAvatarUrl: repo.owner.avatar_url,
		description: repo.description || '',
		version: 'latest', // Could be enhanced to fetch from build.zig.zon
		stars: repo.stargazers_count,
		forks: repo.forks_count,
		openIssues: repo.open_issues_count,
		license: repo.license?.spdx_id || null,
		homepage: repo.homepage,
		repositoryUrl: repo.html_url,
		topics: JSON.stringify(repo.topics),
		packageType,
		createdAt: new Date(repo.created_at),
		updatedAt: new Date(repo.updated_at),
		pushedAt: new Date(repo.pushed_at),
		cachedAt: new Date()
	};
}

export async function syncRepositories(topic: TopicType): Promise<number> {
	const packageType: PackageType = topic === 'zig-package' ? 'library' : 'application';
	let syncedCount = 0;

	for await (const repos of githubClient.searchAllRepositories(topic)) {
		const packageData = repos.map((repo) => mapGitHubRepoToPackage(repo, packageType));

		// Upsert packages (insert or update on conflict)
		for (const pkg of packageData) {
			// Fetch latest tag for this repo
			const latestTag = await githubClient.getLatestTag(pkg.owner, pkg.name);
			if (latestTag) {
				pkg.version = latestTag;
			}

			await db
				.insert(packages)
				.values(pkg)
				.onConflictDoUpdate({
					target: packages.githubId,
					set: {
						name: pkg.name,
						fullName: pkg.fullName,
						description: pkg.description,
						version: pkg.version,
						stars: pkg.stars,
						forks: pkg.forks,
						openIssues: pkg.openIssues,
						license: pkg.license,
						homepage: pkg.homepage,
						topics: pkg.topics,
						updatedAt: pkg.updatedAt,
						pushedAt: pkg.pushedAt,
						cachedAt: pkg.cachedAt
					}
				});
			syncedCount++;

			// Small delay between tag fetches to be rate-limit friendly
			await new Promise((resolve) => setTimeout(resolve, 50));
		}
	}

	// Update sync metadata
	const now = new Date();
	await db
		.insert(syncMetadata)
		.values({
			topic,
			lastSyncAt: now,
			totalCount: syncedCount,
			nextSyncAt: new Date(now.getTime() + SYNC_INTERVAL_MS)
		})
		.onConflictDoUpdate({
			target: syncMetadata.topic,
			set: {
				lastSyncAt: now,
				totalCount: syncedCount,
				nextSyncAt: new Date(now.getTime() + SYNC_INTERVAL_MS)
			}
		});

	return syncedCount;
}

export async function shouldSync(topic: string): Promise<boolean> {
	const [meta] = await db.select().from(syncMetadata).where(eq(syncMetadata.topic, topic)).limit(1);

	if (!meta) return true;
	return new Date() > meta.nextSyncAt;
}

export async function getLastSyncInfo(topic: string) {
	const [meta] = await db.select().from(syncMetadata).where(eq(syncMetadata.topic, topic)).limit(1);

	return meta;
}
