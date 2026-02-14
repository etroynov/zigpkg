<script lang="ts">
  import { page } from "$app/state";
  import { locales, localizeHref } from "$lib/paraglide/runtime";
  import favicon from "$lib/assets/favicon.svg";
  import { Header, Footer } from "$lib/components";

  import "./layout.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>zigpkg - The package manager for Zig</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-[#fafafa]">
  <Header />
  <main class="container mx-auto py-12">
    {@render children()}
  </main>
  <Footer />
</div>

<div style="display:none">
  {#each locales as locale}
    <a href={localizeHref(page.url.pathname, { locale })}>
      {locale}
    </a>
  {/each}
</div>
