<script lang="ts">
  let { readme }: { readme: string | null } = $props();
</script>

<div class="bg-white border border-gray-200 rounded-2xl p-8">
  {#if readme}
    <div
      class="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:text-slate-100"
    >
      {@html readme}
    </div>
  {:else}
    <p class="text-slate-400 text-center py-8">README not available.</p>
  {/if}
</div>
