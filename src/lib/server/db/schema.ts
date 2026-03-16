import { sql } from 'drizzle-orm';
import {
	pgTable,
	serial,
	bigint,
	integer,
	text,
	timestamp,
	varchar,
	jsonb,
	index,
	check
} from 'drizzle-orm/pg-core';

// Users table - GitHub profiles (owners of packages + registered users)
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	githubId: bigint('github_id', { mode: 'number' }).notNull().unique(),
	username: varchar('username', { length: 255 }).notNull().unique(),
	avatarUrl: text('avatar_url'),
	bio: text('bio'),
	htmlUrl: text('html_url'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

// Packages table - cache for GitHub repositories
export const packages = pgTable(
	'packages',
	{
		id: serial('id').primaryKey(),
		githubId: bigint('github_id', { mode: 'number' }).notNull().unique(),
		name: varchar('name', { length: 255 }).notNull(),
		fullName: varchar('full_name', { length: 512 }).notNull(),
		ownerId: integer('owner_id')
			.notNull()
			.references(() => users.id),
		description: text('description'),
		version: varchar('version', { length: 50 }).default('latest'),
		stars: integer('stars').default(0).notNull(),
		forks: integer('forks').default(0).notNull(),
		openIssues: integer('open_issues').default(0).notNull(),
		license: varchar('license', { length: 100 }),
		homepage: text('homepage'),
		repositoryUrl: text('repository_url').notNull(),
		topics: jsonb('topics').$type<string[]>(),
		packageType: varchar('package_type', { length: 20 }).notNull(), // 'library' or 'application'
		createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
		pushedAt: timestamp('pushed_at', { withTimezone: true }).notNull(),
		cachedAt: timestamp('cached_at', { withTimezone: true }).defaultNow().notNull()
	},
	(table) => [
		index('packages_stars_idx').on(table.stars),
		index('packages_updated_idx').on(table.updatedAt),
		index('packages_cached_idx').on(table.cachedAt),
		index('packages_type_idx').on(table.packageType),
		index('packages_owner_idx').on(table.ownerId),
		check('packages_package_type_check', sql`${table.packageType} IN ('library', 'application')`)
	]
);

// Package content table - heavy content stored separately (1:1 with packages)
export const packageContent = pgTable('package_content', {
	id: serial('id').primaryKey(),
	packageId: integer('package_id')
		.notNull()
		.unique()
		.references(() => packages.id, { onDelete: 'cascade' }),
	readme: text('readme'),
	tags: jsonb('tags').$type<{ name: string; sha: string }[]>(),
	files: jsonb('files').$type<
		{ name: string; path: string; type: string; size: number; htmlUrl: string | null }[]
	>(),
	zonContent: text('zon_content'),
	lastSync: timestamp('last_sync', { withTimezone: true })
});

// Sync metadata table - track last sync time per topic
export const syncMetadata = pgTable('sync_metadata', {
	id: serial('id').primaryKey(),
	topic: varchar('topic', { length: 100 }).notNull().unique(),
	lastSyncAt: timestamp('last_sync_at', { withTimezone: true }).notNull(),
	totalCount: integer('total_count').default(0),
	nextSyncAt: timestamp('next_sync_at', { withTimezone: true }).notNull()
});
