<script lang="ts">
  import { formatNumber } from "$lib/utils/formatNumber";
  import { SvelteSet } from "svelte/reactivity";

  let { data } = $props();

  const allPackages = $derived.by(() => {
    const seen = new SvelteSet<string>();
    return [
      ...data.popularPackages,
      ...data.newPackages,
      ...data.recentlyUpdated,
    ].filter((pkg) => {
      if (seen.has(pkg.name)) return false;
      seen.add(pkg.name);
      return true;
    });
  });

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
</script>

<div
  class="text-slate-900 font-sans selection:bg-yellow-200 selection:text-black scroll-smooth"
>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero Section -->
    <div
      class="relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 mb-12 flex flex-col md:flex-row items-center justify-between"
    >
      <!-- Decor: Subtle Light Gradient -->
      <div
        class="absolute inset-0 bg-linear-to-br from-yellow-50/50 via-transparent to-transparent pointer-events-none"
      ></div>

      <div class="relative z-10 flex-1">
        <h1
          class="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
        >
          Packages
        </h1>
        <p class="text-xl text-slate-500 max-w-xl leading-relaxed">
          A gateway to our galaxy of Zig utilities, libraries, and tools created
          to empower developers.
        </p>
      </div>

      <div class="relative z-10 flex gap-12 sm:gap-16">
        <div class="text-center group">
          <div
            class="text-6xl sm:text-7xl font-bold text-slate-900 mb-2 group-hover:scale-105 transition-transform duration-300"
          >
            {data.stats.totalPackages}
          </div>
          <div
            class="text-sm text-slate-500 font-bold tracking-widest uppercase"
          >
            Packages
          </div>
        </div>
        <div
          class="text-center border-l-2 border-gray-100 pl-12 sm:pl-16 group"
        >
          <div
            class="text-6xl sm:text-7xl font-bold text-slate-900 mb-2 group-hover:scale-105 transition-transform duration-300"
          >
            {formatNumber(data.stats.totalStars)}
          </div>
          <div
            class="text-sm text-slate-500 font-bold tracking-widest uppercase"
          >
            Total Stars
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Section (Search & Sort) -->
    <div
      class="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between"
    >
      <!-- Search -->
      <div class="relative w-full md:max-w-md group">
        <div
          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search a package..."
          class="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>

      <!-- Sorting Controls -->
      <div class="flex items-center gap-3 w-full md:w-auto">
        <div
          class="flex bg-gray-100/50 p-1.5 rounded-xl border border-gray-200"
        >
          <button
            class="px-4 py-1.5 text-sm font-semibold rounded-lg bg-white text-slate-900 shadow-sm border border-gray-100 ring-1 ring-black/5"
            >Stars</button
          >
          <button
            class="px-4 py-1.5 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
            >Downloads</button
          >
          <button
            class="px-4 py-1.5 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
            >Name</button
          >
        </div>

        <button
          class="p-2.5 bg-white border border-gray-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-gray-300 transition-colors shadow-sm"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Packages Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each allPackages as pkg (pkg.name)}
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
                {pkg.name}
              </h2>
            </div>
            <div class="flex items-center gap-1.5">
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-slate-500 border border-gray-200 group-hover:border-yellow-200 group-hover:bg-yellow-50 group-hover:text-yellow-700 transition-colors"
              >
                {pkg.version}
              </span>
              <button
                onclick={() =>
                  copyFetchCommand(pkg.owner, pkg.name, pkg.version)}
                class="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-gray-100 transition-colors"
                title="Copy zig fetch command"
              >
                {#if copiedPkg === `${pkg.owner}/${pkg.name}`}
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
            {pkg.description}
          </p>

          <footer
            class="flex items-center gap-4 text-xs font-medium text-slate-400"
          >
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
              {formatNumber(pkg.stars)}
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
              {pkg.openIssues}
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
              {formatDate(pkg.pushedAt)}
            </div>
          </footer>
        </div>
      {/each}
    </div>

    <!-- Community Section / Footer Extension -->
    <div class="mt-20 py-16 text-center">
      <h3 class="text-slate-900 font-bold mb-4 text-2xl">Join the Community</h3>
      <p class="text-slate-500 mb-8 max-w-lg mx-auto text-lg">
        Contribute to our packages, report issues, and help us grow the Zig
        ecosystem together.
      </p>
      <div class="flex justify-center gap-4">
        <a
          href="https://github.com/zig-toolbelt"
          class="inline-flex items-center px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20"
        >
          GitHub
        </a>
        <a
          href="/docs"
          class="inline-flex items-center px-8 py-3 rounded-full border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          Documentation
        </a>
      </div>
    </div>
  </main>
</div>
