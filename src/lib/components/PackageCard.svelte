<script lang="ts">
  import { formatNumber } from "$lib/utils/formatNumber";

  type Props = {
    name: string; 
    stars: number;
    description: string;
    fullName: string;
    version: string;
    owner: string;
    pushedAt: string;
    openIssues: number;
  };

  let copiedPkg = $state<string | null>(null);

  async function copyFetchCommand(
    owner: string,
    name: string,
    version: string,
  ) {
    const archivePath =
      version === "latest"
        ? "archive/HEAD.tar.gz"
        : `archive/refs/tags/${version}.tar.gz`;
    const url = `https://github.com/${owner}/${name}/${archivePath}`;
    const command = `zig fetch --save ${url}`;
    await navigator.clipboard.writeText(command);
    copiedPkg = `${owner}/${name}`;
    setTimeout(() => {
      copiedPkg = null;
    }, 2000);
  }

  function formatDate(iso: string): string {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;
    const diffYears = Math.floor(diffMonths / 12);
    if (diffYears === 1) return "1 year ago";
    return `${diffYears} years ago`;
  }

  let { name, fullName, version, owner, stars, openIssues, pushedAt, description }: Props = $props();
</script>

<div
  class="group relative flex flex-col bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 hover:border-yellow-400/50"
>
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-all duration-300"
      >
        📦
      </div>
      <h2
        class="text-lg font-bold text-slate-900 group-hover:text-yellow-600 transition-colors"
      >
        <a href={`/packages/${fullName}`}>{fullName}</a>
      </h2>
    </div>
    <div class="flex items-center gap-1.5">
      <span
        class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-slate-500 border border-gray-200 group-hover:border-yellow-200 group-hover:bg-yellow-50 group-hover:text-yellow-700 transition-colors"
      >
        {version}
      </span>
      <button
        onclick={() => copyFetchCommand(owner, name, version)}
        class="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-gray-100 transition-colors"
        title="Copy zig fetch command"
      >
        {#if copiedPkg === `${owner}/${name}`}
          <svg
            class="w-3.5 h-3.5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        {:else}
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <p class="text-sm text-slate-500 mb-6 grow leading-relaxed">
    {description}
  </p>

  <footer class="flex items-center gap-4 text-xs font-medium text-slate-400">
    <!-- Stars -->
    <div
      class="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-default"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      {formatNumber(stars)}
    </div>
    <!-- Issues -->
    <div
      class="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-default"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {openIssues}
    </div>
    <!-- Last commit -->
    <div
      class="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-default"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      {formatDate(pushedAt)}
    </div>
  </footer>
</div>
