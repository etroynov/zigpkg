import { db } from '$lib/server/db';
import { packages } from '$lib/server/db/schema';
import { desc, eq, sql, or, ilike, and } from 'drizzle-orm';
import type { PackageType } from '$lib/types/package';

export type SortOption = 'stars' | 'updated' | 'new' | 'name';

interface QueryOptions {
	limit?: number;
	offset?: number;
	sort?: SortOption;
	packageType?: PackageType;
	search?: string;
}

function getSortColumn(sort: SortOption) {
	switch (sort) {
		case 'stars':
			return desc(packages.stars);
		case 'new':
			return desc(packages.createdAt);
		case 'name':
			return packages.name;
		default:
			return desc(packages.stars);
	}
}

export async function getPackages(options: QueryOptions = {}) {
	const { limit = 20, offset = 0, sort = 'stars', packageType, search } = options;

	const conditions = [];

	if (packageType) {
		conditions.push(eq(packages.packageType, packageType));
	}

	if (search) {
		conditions.push(
			or(ilike(packages.name, `%${search}%`), ilike(packages.description, `%${search}%`))
		);
	}

	const query = db.select().from(packages).orderBy(getSortColumn(sort)).limit(limit).offset(offset);

	if (conditions.length > 0) {
		return query.where(and(...conditions));
	}

	return query;
}

export async function getMostPopular(limit = 6) {
	// Using stars as a proxy for popularity since GitHub doesn't expose downloads
	return db.select().from(packages).orderBy(desc(packages.stars)).limit(limit);
}

export async function getNewPackages(limit = 4) {
	// Just return newest packages by creation date
	return db.select().from(packages).orderBy(desc(packages.createdAt)).limit(limit);
}

export async function getRecentlyUpdated(limit = 4) {
	return db.select().from(packages).orderBy(desc(packages.pushedAt)).limit(limit);
}

export async function getPackageByName(name: string) {
	const [pkg] = await db.select().from(packages).where(eq(packages.name, name)).limit(1);

	return pkg;
}

export async function getStats() {
	const [result] = await db
		.select({
			totalPackages: sql<number>`count(*)::int`,
			totalLibraries: sql<number>`count(*) filter (where ${packages.packageType} = 'library')::int`,
			totalApplications: sql<number>`count(*) filter (where ${packages.packageType} = 'application')::int`,
			totalStars: sql<number>`coalesce(sum(${packages.stars}), 0)::int`
		})
		.from(packages);

	return result;
}

export async function getPackageCount() {
	const [result] = await db
		.select({
			count: sql<number>`count(*)::int`
		})
		.from(packages);

	return result?.count ?? 0;
}
