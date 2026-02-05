<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  class={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
  {...rest}
>
  {@render children?.()}
</div>
