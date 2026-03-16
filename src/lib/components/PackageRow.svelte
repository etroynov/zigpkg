<script lang="ts">
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui';
	import { formatNumber } from '$lib/utils/formatNumber';

	interface Props {
		name: string;
		fullName: string;
		version: string;
		packageType: string;
		description: string | null;
		stars: number;
		forks: number;
	}

	let { name, fullName, version, packageType, description, stars, forks }: Props = $props();
</script>

<div class="flex items-start gap-4 px-4 py-4 bg-card hover:bg-accent/30 transition-colors">
	<!-- Stats -->
	<div class="shrink-0 flex flex-col items-end gap-1 min-w-18 pt-0.5">
		<div class="flex items-center gap-1 text-sm font-medium text-foreground">
			<svg
				class="w-3.5 h-3.5 text-yellow-500"
				fill="currentColor"
				viewBox="0 0 20 20"
				aria-hidden="true"
			>
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
			{formatNumber(stars)}
		</div>
		<div class="flex items-center gap-1 text-xs text-muted-foreground">
			<svg
				class="w-3 h-3"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 7h.01M12 7h.01M16 7h.01M8 12h.01M12 12h.01M16 12h.01M8 17h.01M12 17h.01M16 17h.01"
				/>
			</svg>
			{formatNumber(forks)} forks
		</div>
	</div>

	<!-- Package Info -->
	<div class="flex-1 min-w-0">
		<div class="flex items-center flex-wrap gap-2 mb-1">
			<a
				href={resolve(`/packages/${fullName}`)}
				class="font-semibold text-foreground hover:text-primary transition-colors"
			>
				{fullName}
			</a>
			<Badge variant="outline" class="text-xs">{version}</Badge>
			<Badge variant="secondary" class="text-xs capitalize">{packageType}</Badge>
		</div>
		{#if description}
			<p class="text-sm text-muted-foreground line-clamp-2">{description}</p>
		{:else}
			<p class="text-sm text-muted-foreground/50 italic">No description</p>
		{/if}
	</div>
</div>
