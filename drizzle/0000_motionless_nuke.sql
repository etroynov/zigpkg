CREATE TABLE "packages" (
	"id" serial PRIMARY KEY NOT NULL,
	"github_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"full_name" varchar(512) NOT NULL,
	"owner" varchar(255) NOT NULL,
	"owner_avatar_url" text,
	"description" text,
	"version" varchar(50) DEFAULT 'latest',
	"stars" integer DEFAULT 0 NOT NULL,
	"forks" integer DEFAULT 0 NOT NULL,
	"license" varchar(100),
	"homepage" text,
	"repository_url" text NOT NULL,
	"topics" text,
	"package_type" varchar(20) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"pushed_at" timestamp NOT NULL,
	"cached_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "packages_github_id_unique" UNIQUE("github_id")
);
--> statement-breakpoint
CREATE TABLE "sync_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic" varchar(100) NOT NULL,
	"last_sync_at" timestamp NOT NULL,
	"total_count" integer DEFAULT 0,
	"next_sync_at" timestamp NOT NULL,
	CONSTRAINT "sync_metadata_topic_unique" UNIQUE("topic")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"age" integer
);
--> statement-breakpoint
CREATE INDEX "packages_stars_idx" ON "packages" USING btree ("stars");--> statement-breakpoint
CREATE INDEX "packages_updated_idx" ON "packages" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "packages_cached_idx" ON "packages" USING btree ("cached_at");--> statement-breakpoint
CREATE INDEX "packages_type_idx" ON "packages" USING btree ("package_type");--> statement-breakpoint
CREATE UNIQUE INDEX "packages_github_id_idx" ON "packages" USING btree ("github_id");