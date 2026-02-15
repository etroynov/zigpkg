import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPackageByName } from '$lib/server/packages/queries';
import { githubClient } from '$lib/server/github/client';
import { parseZonFile } from '$lib/server/packages/zon-parser';

function rewriteRelativeUrls(html: string, owner: string, repo: string): string {
	html = html.replace(
		/href="(?!https?:\/\/|#|mailto:)([^"]+)"/g,
		`href="https://github.com/${owner}/${repo}/blob/main/$1"`
	);
	html = html.replace(
		/src="(?!https?:\/\/)([^"]+)"/g,
		`src="https://raw.githubusercontent.com/${owner}/${repo}/main/$1"`
	);
	return html;
}

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const pkg = await getPackageByName(params.sulg);

	if (!pkg) {
		error(404, { message: 'Package not found' });
	}

	const [readme, tags, contents, zonContent] = await Promise.allSettled([
		githubClient.getReadme(pkg.owner, pkg.name),
		githubClient.getTags(pkg.owner, pkg.name),
		githubClient.getContents(pkg.owner, pkg.name),
		githubClient.getFileContent(pkg.owner, pkg.name, 'build.zig.zon')
	]);

	const zonRaw = zonContent.status === 'fulfilled' ? zonContent.value : null;
	const zonInfo = zonRaw ? parseZonFile(zonRaw) : null;

	let readmeHtml = readme.status === 'fulfilled' ? readme.value : null;
	if (readmeHtml) {
		readmeHtml = rewriteRelativeUrls(readmeHtml, pkg.owner, pkg.name);
	}

	const tagList =
		tags.status === 'fulfilled' && tags.value
			? tags.value.map((t) => ({ name: t.name, sha: t.commit.sha }))
			: [];

	const fileList =
		contents.status === 'fulfilled' && contents.value
			? contents.value
					.map((c) => ({
						name: c.name,
						path: c.path,
						type: c.type,
						size: c.size,
						htmlUrl: c.html_url
					}))
					.sort((a, b) => {
						if (a.type === 'dir' && b.type !== 'dir') return -1;
						if (a.type !== 'dir' && b.type === 'dir') return 1;
						return a.name.localeCompare(b.name);
					})
			: [];

	let topics: string[] = [];
	try {
		topics = pkg.topics ? JSON.parse(pkg.topics) : [];
	} catch {
		topics = [];
	}

	setHeaders({
		'Cache-Control': 'public, max-age=120, s-maxage=600, stale-while-revalidate=1200'
	});

	return {
		package: {
			name: pkg.name,
			fullName: pkg.fullName,
			owner: pkg.owner,
			ownerAvatarUrl: pkg.ownerAvatarUrl,
			description: pkg.description || '',
			version: pkg.version || 'latest',
			stars: pkg.stars,
			forks: pkg.forks,
			openIssues: pkg.openIssues,
			license: pkg.license,
			homepage: pkg.homepage,
			repositoryUrl: pkg.repositoryUrl,
			topics,
			packageType: pkg.packageType,
			createdAt: pkg.createdAt.toISOString(),
			updatedAt: pkg.updatedAt.toISOString(),
			pushedAt: pkg.pushedAt.toISOString()
		},
		readme: readmeHtml,
		tags: tagList,
		files: fileList,
		dependencies: zonInfo?.dependencies ?? [],
		zonInfo: zonInfo
			? {
					name: zonInfo.name,
					version: zonInfo.version,
					minimumZigVersion: zonInfo.minimum_zig_version
				}
			: null
	};
};
