CREATE TABLE users (
  id serial PRIMARY KEY,
  github_id bigint NOT NULL UNIQUE,
  username varchar(255) NOT NULL UNIQUE,
  avatar_url text,
  bio text,
  html_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE packages (
  id serial PRIMARY KEY,
  github_id bigint NOT NULL UNIQUE,
  name varchar(255) NOT NULL,
  full_name varchar(512) NOT NULL,
  owner_id integer NOT NULL REFERENCES users(id),
  description text,
  version varchar(50) DEFAULT 'latest',
  stars integer NOT NULL DEFAULT 0,
  forks integer NOT NULL DEFAULT 0,
  open_issues integer NOT NULL DEFAULT 0,
  license varchar(100),
  homepage text,
  repository_url text NOT NULL,
  topics text,
  package_type varchar(20) NOT NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  pushed_at timestamptz NOT NULL,
  cached_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE package_content (
  id serial PRIMARY KEY,
  package_id integer NOT NULL UNIQUE REFERENCES packages(id) ON DELETE CASCADE,
  readme text,
  tags jsonb,
  files jsonb,
  zon_content text,
  last_sync timestamptz
);

CREATE TABLE sync_metadata (
  id serial PRIMARY KEY,
  topic varchar(100) NOT NULL UNIQUE,
  last_sync_at timestamptz NOT NULL,
  total_count integer DEFAULT 0,
  next_sync_at timestamptz NOT NULL
);
