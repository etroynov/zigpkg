<script lang="ts">
  import { formatSize } from "$lib/utils/formatSize.js";

  let {
    files,
  }: {
    files: { name: string; path: string; type: string; size: number; htmlUrl: string | null }[];
  } = $props();
</script>

<div class="bg-white border border-gray-200 rounded-2xl p-6">
  <h2 class="text-lg font-bold text-slate-900 mb-4">Source Files</h2>
  {#if files.length > 0}
    <div class="border border-gray-100 rounded-xl overflow-hidden">
      {#each files as item (item.path)}
        <a
          href={item.htmlUrl ?? '#'}
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-t border-gray-100 first:border-t-0"
        >
          {#if item.type === "dir"}
            <svg
              class="w-5 h-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              /></svg
            >
          {:else}
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              /></svg
            >
          {/if}
          <span
            class="text-sm {item.type === 'dir'
              ? 'font-semibold text-slate-900'
              : 'text-slate-600'}">{item.name}</span
          >
          {#if item.type !== "dir" && item.size}
            <span class="text-xs text-slate-400 ml-auto">{formatSize(item.size)}</span>
          {/if}
        </a>
      {/each}
    </div>
  {:else}
    <p class="text-slate-400 text-center py-8">Could not load repository contents.</p>
  {/if}
</div>
