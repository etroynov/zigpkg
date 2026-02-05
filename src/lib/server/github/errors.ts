export class GitHubAPIError extends Error {
	constructor(
		message: string,
		public statusCode: number,
		public retryAfter?: number
	) {
		super(message);
		this.name = 'GitHubAPIError';
	}
}

export class RateLimitError extends GitHubAPIError {
	constructor(resetAt: Date) {
		const retryAfter = Math.ceil((resetAt.getTime() - Date.now()) / 1000);
		super(`GitHub API rate limit exceeded. Resets at ${resetAt.toISOString()}`, 429, retryAfter);
		this.name = 'RateLimitError';
	}
}

export function isRetryableError(error: unknown): boolean {
	if (error instanceof GitHubAPIError) {
		// 5xx errors and rate limits can be retried
		return error.statusCode >= 500 || error.statusCode === 429;
	}
	return false;
}
