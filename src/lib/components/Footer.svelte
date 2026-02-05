<script lang="ts">
	const links = {
		about: [
			{ label: 'About', href: '/about' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Status', href: '/status' }
		],
		resources: [
			{ label: 'Documentation', href: '/docs' },
			{ label: 'API', href: '/docs/api' },
			{ label: 'CLI', href: '/docs/cli' }
		],
		community: [
			{ label: 'GitHub', href: 'https://github.com/zigpkg' },
			{ label: 'Discord', href: 'https://discord.gg/zig' },
			{ label: 'Twitter', href: 'https://twitter.com/zigpkg' }
		],
		legal: [
			{ label: 'Terms', href: '/terms' },
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Code of Conduct', href: '/code-of-conduct' }
		]
	};
</script>

<footer class="border-t bg-muted/30">
	<div class="container mx-auto px-4 py-12">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-8">
			<div class="col-span-2 md:col-span-1">
				<a href="/" class="flex items-center space-x-2">
					<svg class="h-6 w-6" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M200 50L350 150V300L200 400L50 300V150L200 50Z" fill="#F7A41D"/>
						<path d="M200 100L300 166.67V300L200 366.67L100 300V166.67L200 100Z" fill="#1A1A1A"/>
					</svg>
					<span class="font-bold">zigpkg</span>
				</a>
				<p class="text-sm text-muted-foreground mt-4">
					The package manager for the Zig ecosystem.
				</p>
			</div>

			<div>
				<h4 class="font-semibold mb-3">About</h4>
				<ul class="space-y-2">
					{#each links.about as link}
						<li>
							<a href={link.href} class="text-sm text-muted-foreground hover:text-foreground">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-3">Resources</h4>
				<ul class="space-y-2">
					{#each links.resources as link}
						<li>
							<a href={link.href} class="text-sm text-muted-foreground hover:text-foreground">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-3">Community</h4>
				<ul class="space-y-2">
					{#each links.community as link}
						<li>
							<a href={link.href} class="text-sm text-muted-foreground hover:text-foreground">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h4 class="font-semibold mb-3">Legal</h4>
				<ul class="space-y-2">
					{#each links.legal as link}
						<li>
							<a href={link.href} class="text-sm text-muted-foreground hover:text-foreground">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} zigpkg. All rights reserved.
			</p>
			<p class="text-sm text-muted-foreground">
				Made with love for the <a href="https://ziglang.org" class="hover:text-foreground">Zig</a> community.
			</p>
		</div>
	</div>
</footer>
