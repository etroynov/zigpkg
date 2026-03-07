<script lang="ts">
  let { repositoryUrl, homepage }: { repositoryUrl: string; homepage: string | null } = $props();
</script>

<div class="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
  <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Links</h3>
  <div class="space-y-2.5">
    <a
      href={repositoryUrl}
      target="_blank"
      rel="noopener"
      class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors"
    >
      <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"
        ><path
          fill-rule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clip-rule="evenodd"
        /></svg
      >
      Repository
    </a>
    {#if homepage}
      <a
        href={homepage}
        target="_blank"
        rel="noopener"
        class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors"
      >
        <svg
          class="w-4 h-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        Homepage
      </a>
    {/if}
    <a
      href="{repositoryUrl}/issues"
      target="_blank"
      rel="noopener"
      class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors"
    >
      <svg
        class="w-4 h-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      Issues
    </a>
  </div>
</div>
