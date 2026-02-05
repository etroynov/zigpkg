<script lang="ts">
	import { Input } from '$lib/components/ui';
	import { Button } from '$lib/components/ui';
</script>

<section class="py-20 md:py-32">
	<div class="container mx-auto px-4">
		<div class="flex flex-col items-center text-center">
			<svg class="h-24 w-24 mb-8" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M200 50L350 150V300L200 400L50 300V150L200 50Z" fill="#F7A41D"/>
				<path d="M200 100L300 166.67V300L200 366.67L100 300V166.67L200 100Z" fill="#1A1A1A"/>
			</svg>
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
				The package manager for <span class="text-[#F7A41D]">Zig</span>
			</h1>
			<p class="mt-6 max-w-2xl text-lg text-muted-foreground">
				Find, publish, and manage Zig packages. The official package registry for the Zig ecosystem.
			</p>
			<div class="mt-10 w-full max-w-xl">
				<form class="flex gap-2">
					<Input
						type="search"
						placeholder="Search packages..."
						class="h-12 text-lg"
					/>
					<Button size="lg" class="h-12 px-8">
						Search
					</Button>
				</form>
			</div>
			<div class="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
				<span>Popular:</span>
				<a href="/packages/std" class="hover:text-foreground hover:underline">std</a>
				<a href="/packages/zls" class="hover:text-foreground hover:underline">zls</a>
				<a href="/packages/zig-network" class="hover:text-foreground hover:underline">zig-network</a>
				<a href="/packages/zig-http" class="hover:text-foreground hover:underline">zig-http</a>
			</div>
		</div>
	</div>
</section>
