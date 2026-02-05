import type { GitHubSearchResponse, GitHubRepository } from '$lib/types/github';
import { env } from '$env/dynamic/private';
import { GitHubAPIError, RateLimitError } from './errors';

const GITHUB_API_BASE = 'https://api.github.com';
const MAX_PER_PAGE = 100; // GitHub's maximum

export type TopicType = 'zig-package' | 'zig-program';

interface SearchOptions {
	topic: TopicType;
	page?: number;
	perPage?: number;
	sort?: 'stars' | 'updated' | 'forks';
	order?: 'asc' | 'desc';
}

export class GitHubClient {
	private rateLimitRemaining = 30; // Conservative default
	private rateLimitReset = 0;

	private getHeaders(): HeadersInit {
		const headers: HeadersInit = {
			Accept: 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28'
		};

		if (env.GITHUB_TOKEN) {
			headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
		}

		return headers;
	}

	async searchRepositories(options: SearchOptions): Promise<GitHubSearchResponse> {
		const { topic, page = 1, perPage = MAX_PER_PAGE, sort = 'stars', order = 'desc' } = options;

		// Check rate limit before making request
		if (this.rateLimitRemaining <= 1 && Date.now() < this.rateLimitReset * 1000) {
			throw new RateLimitError(new Date(this.rateLimitReset * 1000));
		}

		const query = `topic:${topic}`;
		const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
		url.searchParams.set('q', query);
		url.searchParams.set('page', page.toString());
		url.searchParams.set('per_page', perPage.toString());
		url.searchParams.set('sort', sort);
		url.searchParams.set('order', order);

		const response = await fetch(url.toString(), {
			headers: this.getHeaders()
		});

		// Update rate limit info from response headers
		this.rateLimitRemaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '30');
		this.rateLimitReset = parseInt(response.headers.get('X-RateLimit-Reset') || '0');

		if (!response.ok) {
			if (response.status === 403 && this.rateLimitRemaining === 0) {
				throw new RateLimitError(new Date(this.rateLimitReset * 1000));
			}
			throw new GitHubAPIError(
				`GitHub API error: ${response.status} ${response.statusText}`,
				response.status
			);
		}

		return response.json();
	}

	// Fetch all pages for a topic (with rate limiting awareness)
	async *searchAllRepositories(topic: TopicType): AsyncGenerator<GitHubRepository[]> {
		let page = 1;
		let hasMore = true;

		while (hasMore) {
			const response = await this.searchRepositories({ topic, page, perPage: MAX_PER_PAGE });

			if (response.items.length > 0) {
				yield response.items;
			}

			// GitHub search API returns max 1000 results (10 pages of 100)
			hasMore = response.items.length === MAX_PER_PAGE && page < 10;
			page++;

			// Small delay between paginated requests to be respectful
			if (hasMore) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
	}

	async getLatestTag(owner: string, repo: string): Promise<string | null> {
		if (this.rateLimitRemaining <= 1 && Date.now() < this.rateLimitReset * 1000) {
			return null; // Skip tag fetch if rate limited
		}

		const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/tags?per_page=1`;
		const response = await fetch(url, { headers: this.getHeaders() });

		this.rateLimitRemaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '30');
		this.rateLimitReset = parseInt(response.headers.get('X-RateLimit-Reset') || '0');

		if (!response.ok) return null;

		const tags: { name: string }[] = await response.json();
		return tags.length > 0 ? tags[0].name : null;
	}

	getRateLimitStatus() {
		return {
			remaining: this.rateLimitRemaining,
			resetAt: new Date(this.rateLimitReset * 1000)
		};
	}
}

export const githubClient = new GitHubClient();
