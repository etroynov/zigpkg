import {
	pgTable,
	serial,
	integer,
	text,
	timestamp,
	varchar,
	index,
	uniqueIndex
} from 'drizzle-orm/pg-core';

// Existing user table
export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});

// Packages table - cache for GitHub repositories
export const packages = pgTable(
	'packages',
	{
		id: serial('id').primaryKey(),
		githubId: integer('github_id').notNull().unique(),
		name: varchar('name', { length: 255 }).notNull(),
		fullName: varchar('full_name', { length: 512 }).notNull(),
		owner: varchar('owner', { length: 255 }).notNull(),
		ownerAvatarUrl: text('owner_avatar_url'),
		description: text('description'),
		version: varchar('version', { length: 50 }).default('latest'),
		stars: integer('stars').default(0).notNull(),
		forks: integer('forks').default(0).notNull(),
		openIssues: integer('open_issues').default(0).notNull(),
		license: varchar('license', { length: 100 }),
		homepage: text('homepage'),
		repositoryUrl: text('repository_url').notNull(),
		topics: text('topics'), // JSON string array
		packageType: varchar('package_type', { length: 20 }).notNull(), // 'library' or 'application'
		createdAt: timestamp('created_at').notNull(),
		updatedAt: timestamp('updated_at').notNull(),
		pushedAt: timestamp('pushed_at').notNull(),
		cachedAt: timestamp('cached_at').defaultNow().notNull()
	},
	(table) => [
		index('packages_stars_idx').on(table.stars),
		index('packages_updated_idx').on(table.updatedAt),
		index('packages_cached_idx').on(table.cachedAt),
		index('packages_type_idx').on(table.packageType),
		uniqueIndex('packages_github_id_idx').on(table.githubId)
	]
);

// Sync metadata table - track last sync time per topic
export const syncMetadata = pgTable('sync_metadata', {
	id: serial('id').primaryKey(),
	topic: varchar('topic', { length: 100 }).notNull().unique(),
	lastSyncAt: timestamp('last_sync_at').notNull(),
	totalCount: integer('total_count').default(0),
	nextSyncAt: timestamp('next_sync_at').notNull()
});
