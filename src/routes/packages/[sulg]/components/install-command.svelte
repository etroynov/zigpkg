<script lang="ts">
  let { repositoryUrl, version }: { repositoryUrl: string; version: string } = $props();

  let copied = $state(false);

  const installCommand = $derived(
    `zig fetch --save git+${repositoryUrl}${version !== "latest" ? "#" + version : ""}`,
  );

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="bg-white border border-gray-200 rounded-2xl p-5">
  <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
    Install
  </h3>
  <div class="relative group">
    <div
      class="bg-slate-900 rounded-xl px-4 py-3 font-mono text-sm text-slate-100 overflow-x-auto"
    >
      <span class="text-slate-500 select-none">$ </span>zig fetch --save
      <span class="text-yellow-300"
        >git+{repositoryUrl}{version !== "latest" ? "#" + version : ""}</span
      >
    </div>
    <button
      onclick={copyInstall}
      class="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
    >
      {#if copied}
        <svg
          class="w-4 h-4 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          /></svg
        >
      {:else}
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          /></svg
        >
      {/if}
    </button>
  </div>
</div>
