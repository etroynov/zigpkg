<script lang="ts">
  let { stars, forks, openIssues }: { stars: number; forks: number; openIssues: number } =
    $props();
</script>

<div class="bg-white border border-gray-200 rounded-2xl p-5">
  <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Stats</h3>
  <div class="space-y-3.5">
    <div class="flex items-center justify-between">
      <span class="text-sm text-slate-500">Stars</span>
      <div class="flex items-center gap-1.5">
        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"
          ><path
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          /></svg
        >
        <span class="text-sm font-bold text-slate-900">{stars.toLocaleString()}</span>
      </div>
    </div>
    <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
      <span class="text-sm text-slate-500">Forks</span>
      <span class="text-sm font-bold text-slate-900">{forks.toLocaleString()}</span>
    </div>
    <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
      <span class="text-sm text-slate-500">Open Issues</span>
      <span class="text-sm font-bold text-slate-900">{openIssues.toLocaleString()}</span>
    </div>
  </div>
</div>
