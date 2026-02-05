<script lang="ts">
  import { Button } from "$lib/components/ui";
  import { Input } from "$lib/components/ui";
</script>

<header
  class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
  <div class="container mx-auto flex h-14 items-center px-4">
    <div class="mr-4 flex">
      <a href="/" class="mr-6 flex items-center space-x-2">
        <span class="font-bold">zigpkg</span>
      </a>
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
        <a
          href="/packages"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Packages
        </a>
        <a
          href="/docs"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Docs
        </a>
      </nav>
    </div>
    <div class="flex flex-1 items-center justify-end space-x-2">
      <div class="w-full max-w-sm">
        <Input type="search" placeholder="Search packages..." class="h-8" />
      </div>
      <nav class="flex items-center space-x-2">
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button size="sm">Sign up</Button>
      </nav>
    </div>
  </div>
</header>
