export interface ZonDependency {
	name: string;
	url: string | null;
	hash: string | null;
	path: string | null;
}

export interface ZonPackageInfo {
	name: string | null;
	version: string | null;
	minimum_zig_version: string | null;
	dependencies: ZonDependency[];
}

function extractString(content: string, field: string): string | null {
	const regex = new RegExp(`\\.${field}\\s*=\\s*"([^"]*)"`, 's');
	const match = content.match(regex);
	return match ? match[1] : null;
}

function findMatchingBrace(content: string, startIndex: number): number {
	let depth = 0;
	for (let i = startIndex; i < content.length; i++) {
		if (content[i] === '{') depth++;
		else if (content[i] === '}') {
			depth--;
			if (depth === 0) return i;
		}
	}
	return -1;
}

function parseDependencies(content: string): ZonDependency[] {
	const depsMatch = content.match(/\.dependencies\s*=\s*\.(\{)/);
	if (!depsMatch || depsMatch.index === undefined) return [];

	const braceStart = depsMatch.index + depsMatch[0].length - 1;
	const braceEnd = findMatchingBrace(content, braceStart);
	if (braceEnd === -1) return [];

	const depsBlock = content.slice(braceStart + 1, braceEnd);
	const deps: ZonDependency[] = [];

	// Match dependency names: .@"name" = .{ or .name = .{
	const depRegex = /\.(?:@"([^"]+)"|(\w+))\s*=\s*\.(\{)/g;
	let match;

	while ((match = depRegex.exec(depsBlock)) !== null) {
		const name = match[1] || match[2];
		const innerStart = match.index + match[0].length - 1;
		const innerEnd = findMatchingBrace(depsBlock, innerStart);
		if (innerEnd === -1) continue;

		const depContent = depsBlock.slice(innerStart, innerEnd + 1);

		deps.push({
			name,
			url: extractString(depContent, 'url'),
			hash: extractString(depContent, 'hash'),
			path: extractString(depContent, 'path')
		});
	}

	return deps;
}

export function parseZonFile(content: string): ZonPackageInfo {
	try {
		return {
			name: extractString(content, 'name'),
			version: extractString(content, 'version'),
			minimum_zig_version: extractString(content, 'minimum_zig_version'),
			dependencies: parseDependencies(content)
		};
	} catch {
		return {
			name: null,
			version: null,
			minimum_zig_version: null,
			dependencies: []
		};
	}
}
