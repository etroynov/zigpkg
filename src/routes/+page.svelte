<script lang="ts">
  import { goto } from '$app/navigation';
  import { formatNumber } from "$lib/utils/formatNumber";
  import { SvelteSet } from "svelte/reactivity";
  import PackageCard from '$lib/components/PackageCard.svelte';
  import { Search, ArrowUpNarrowWide } from 'lucide-svelte';

  let { data } = $props();

  const allPackages = $derived.by(() => {
    const seen = new SvelteSet<string>();
    return [
      ...data.popularPackages,
      ...data.newPackages,
      ...data.recentlyUpdated,
    ].filter((pkg) => {
      if (seen.has(pkg.fullName)) return false;
      seen.add(pkg.fullName);
      return true;
    });
  });

  let searchQuery = $state('');

  function handleSearch(e: Event) {
    e.preventDefault();
    goto('/search?q=' + encodeURIComponent(searchQuery));
  }
</script>

<div
  class="text-slate-900 font-sans selection:bg-yellow-200 selection:text-black scroll-smooth"
>
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
        <div class="text-sm text-slate-500 font-bold tracking-widest uppercase">
          Packages
        </div>
      </div>
      <div class="text-center border-l-2 border-gray-100 pl-12 sm:pl-16 group">
        <div
          class="text-6xl sm:text-7xl font-bold text-slate-900 mb-2 group-hover:scale-105 transition-transform duration-300"
        >
          {formatNumber(data.stats.totalStars)}
        </div>
        <div class="text-sm text-slate-500 font-bold tracking-widest uppercase">
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
    <form onsubmit={handleSearch} class="relative w-full md:max-w-md group flex">
      <div class="relative flex-1">
        <div
          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
        >
          <Search class="h-5 w-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
        </div>
        <input
          bind:value={searchQuery}
          type="search"
          placeholder="Search a package..."
          class="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-l-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>
      <button
        type="submit"
        class="px-5 py-3 rounded-r-xl bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-500 transition-colors shrink-0"
      >
        Search
      </button>
    </form>

    <!-- Sorting Controls -->
    <div class="flex items-center gap-3 w-full md:w-auto">
      <div class="flex bg-gray-100/50 p-1.5 rounded-xl border border-gray-200">
        <button
          class="px-4 py-1.5 text-sm font-semibold rounded-lg bg-white text-slate-900 shadow-sm border border-gray-100 ring-1 ring-black/5"
          >Stars</button
        >
        <button
          class="px-4 py-1.5 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
          >Name</button
        >
      </div>

      <button
        class="p-2.5 bg-white border border-gray-200 rounded-xl text-slate-500 hover:text-slate-900 hover:border-gray-300 transition-colors shadow-sm"
      >
        <ArrowUpNarrowWide class="h-6 w-6" />
      </button>
    </div>
  </div>

  <!-- Packages Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each allPackages as pkg (pkg.fullName)}
      <PackageCard {...pkg} />
    {/each}
  </div>

  <!-- Community Section / Footer Extension -->
  <div class="py-16 text-center">
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
</div>
