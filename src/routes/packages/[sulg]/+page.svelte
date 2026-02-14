<script lang="ts">
  import type { PageProps } from "../$types";
  let { params }: PageProps = $props();

  let activeTab = $state('readme');
  let copied = $state(false);

  const installCommand = 'zig fetch --save git+https://github.com/ziglang/zig-network#v0.7.0';

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }
</script>

<div class="container mx-auto">
  <div class="mb-6">
    <div class="flex flex-wrap items-center gap-3 mb-2">
      <a href="/packages" class="text-sm text-slate-400 hover:text-yellow-600 transition-colors flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        Back to packages
      </a>
    </div>

    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div class="flex flex-wrap items-center gap-3 mb-2">
          <h1 class="text-3xl font-bold text-slate-900">zig-network</h1>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">0.7.0</span>
          <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200">public</span>
        </div>
        <p class="text-slate-500 text-lg max-w-2xl">Cross-platform networking library for Zig. Provides async I/O, TCP, UDP sockets, and TLS support.</p>
      </div>

      <div class="flex items-center gap-3 mt-1">
        <a href="/" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-slate-700 hover:border-yellow-400 hover:text-yellow-700 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
          Repository
        </a>
      </div>
    </div>
  </div>

  <div class="border-b border-gray-200 mb-8">
    <nav class="flex gap-0 -mb-px">
      <button
        onclick={() => activeTab = 'readme'}
        class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors {activeTab === 'readme' ? 'border-yellow-400 text-yellow-700' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-gray-300'}"
      >Readme</button>
      <button
        onclick={() => activeTab = 'code'}
        class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors {activeTab === 'code' ? 'border-yellow-400 text-yellow-700' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-gray-300'}"
      >Code</button>
      <button
        onclick={() => activeTab = 'versions'}
        class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 {activeTab === 'versions' ? 'border-yellow-400 text-yellow-700' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-gray-300'}"
      >Versions <span class="text-xs bg-gray-100 text-slate-500 px-2 py-0.5 rounded-full">12</span></button>
      <button
        onclick={() => activeTab = 'dependencies'}
        class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 {activeTab === 'dependencies' ? 'border-yellow-400 text-yellow-700' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-gray-300'}"
      >Dependencies <span class="text-xs bg-gray-100 text-slate-500 px-2 py-0.5 rounded-full">3</span></button>
      <button
        onclick={() => activeTab = 'dependents'}
        class="px-5 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 {activeTab === 'dependents' ? 'border-yellow-400 text-yellow-700' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-gray-300'}"
      >Dependents <span class="text-xs bg-gray-100 text-slate-500 px-2 py-0.5 rounded-full">48</span></button>
    </nav>
  </div>

  <div class="flex flex-col lg:flex-row gap-8">
    <div class="flex-1 min-w-0">

      {#if activeTab === 'readme'}
        <div class="bg-white border border-gray-200 rounded-2xl p-8">
          <div class="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:text-slate-100">
            {@html `
              <h1>zig-network</h1>
              <p>Cross-platform networking library for Zig. Provides async I/O, TCP, UDP sockets, and TLS support with a clean and ergonomic API.</p>

              <h2>Installation</h2>
              <p>Add <code>zig-network</code> to your <code>build.zig.zon</code> dependencies:</p>
              <pre><code>zig fetch --save git+https://github.com/ziglang/zig-network#v0.7.0</code></pre>
              <p>Then in your <code>build.zig</code>:</p>
              <pre><code>const zig_network = b.dependency("zig-network", .{
    .target = target,
    .optimize = optimize,
});
exe.root_module.addImport("network", zig_network.module("zig-network"));</code></pre>

              <h2>Quick Start</h2>
              <pre><code>const std = @import("std");
const network = @import("network");

pub fn main() !void {
    var socket = try network.connectToHost("example.com", 80);
    defer socket.close();

    try socket.writer().writeAll("GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n");

    var buf: [4096]u8 = undefined;
    const n = try socket.reader().read(&amp;buf);
    std.debug.print("{s}\\n", .{buf[0..n]});
}</code></pre>

              <h2>Features</h2>
              <ul>
                <li>TCP and UDP socket support</li>
                <li>Async I/O with configurable event loops</li>
                <li>TLS 1.3 support via system libraries</li>
                <li>DNS resolution</li>
                <li>Cross-platform (Linux, macOS, Windows)</li>
                <li>Zero allocations in hot paths</li>
              </ul>

              <h2>API Reference</h2>
              <p>Full API documentation is available at <a href="/">docs.zigpkg.dev/zig-network</a>.</p>

              <h2>License</h2>
              <p>MIT License. See <a href="/">LICENSE</a> for details.</p>
            `}
          </div>
        </div>

      {:else if activeTab === 'versions'}
        <div class="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
          <h2 class="text-lg font-bold text-slate-900 mb-4">Version History</h2>
          {#each [
            { version: '0.7.0', date: '2 days ago', tag: 'latest' },
            { version: '0.6.2', date: '3 weeks ago', tag: '' },
            { version: '0.6.1', date: '1 month ago', tag: '' },
            { version: '0.6.0', date: '2 months ago', tag: '' },
            { version: '0.5.4', date: '4 months ago', tag: '' },
            { version: '0.5.3', date: '5 months ago', tag: '' },
            { version: '0.5.2', date: '6 months ago', tag: '' },
            { version: '0.5.1', date: '7 months ago', tag: '' },
            { version: '0.5.0', date: '8 months ago', tag: '' },
            { version: '0.4.0', date: '10 months ago', tag: '' },
            { version: '0.3.0', date: '1 year ago', tag: '' },
            { version: '0.2.0', date: '1 year ago', tag: '' },
          ] as item (item.version)}
            <div class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors {item.tag === 'latest' ? 'bg-yellow-50/50 border border-yellow-100' : ''}">
              <div class="flex items-center gap-3">
                <span class="font-mono font-semibold text-slate-900">{item.version}</span>
                {#if item.tag}
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">{item.tag}</span>
                {/if}
              </div>
              <span class="text-sm text-slate-400">{item.date}</span>
            </div>
          {/each}
        </div>
        {:else if activeTab === 'dependencies'}
        <div class="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 class="text-lg font-bold text-slate-900 mb-4">Dependencies <span class="text-sm font-normal text-slate-400">(3)</span></h2>
          <div class="space-y-3">
            {#each [
              { name: 'zig-tls', version: '^0.3.0', description: 'TLS implementation for Zig' },
              { name: 'zig-async', version: '^0.5.0', description: 'Async primitives and event loop' },
              { name: 'zig-dns', version: '^0.2.1', description: 'DNS resolution library' },
            ] as dep (dep.name)}
              <a href="/packages/{dep.name}" class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors group">
                <div>
                  <span class="font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">{dep.name}</span>
                  <p class="text-sm text-slate-400 mt-0.5">{dep.description}</p>
                </div>
                <span class="text-sm font-mono text-slate-500 shrink-0 ml-4">{dep.version}</span>
              </a>
            {/each}
          </div>
        </div>

      {:else if activeTab === 'dependents'}
        <div class="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 class="text-lg font-bold text-slate-900 mb-4">Dependents <span class="text-sm font-normal text-slate-400">(48)</span></h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {#each [
              { name: 'http-server', owner: 'zigtools' },
              { name: 'websocket-zig', owner: 'karlseguin' },
              { name: 'zig-curl', owner: 'jiacai2050' },
              { name: 'zighttp', owner: 'nektro' },
              { name: 'zig-mqtt', owner: 'mqtt-zig' },
              { name: 'zig-grpc', owner: 'cloudflare' },
            ] as dep (dep.name)}
              <a href="/packages/{dep.name}" class="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors group">
                <div class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-sm group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-colors">📦</div>
                <div>
                  <span class="font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors text-sm">{dep.name}</span>
                  <p class="text-xs text-slate-400">{dep.owner}</p>
                </div>
              </a>
            {/each}
          </div>
          <button class="mt-4 w-full py-2.5 text-sm font-medium text-slate-500 hover:text-slate-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            View all 48 dependents
          </button>
        </div>

      {:else if activeTab === 'code'}
        <div class="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 class="text-lg font-bold text-slate-900 mb-4">Source Files</h2>
          <div class="border border-gray-100 rounded-xl overflow-hidden">
            {#each [
              { name: 'src/', type: 'dir' },
              { name: 'tests/', type: 'dir' },
              { name: 'build.zig', type: 'file' },
              { name: 'build.zig.zon', type: 'file' },
              { name: 'README.md', type: 'file' },
              { name: 'LICENSE', type: 'file' },
            ] as item (item.name)}
              <div class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-t border-gray-100 first:border-t-0">
                {#if item.type === 'dir'}
                  <svg class="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                {:else}
                  <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {/if}
                <span class="text-sm {item.type === 'dir' ? 'font-semibold text-slate-900' : 'text-slate-600'}">{item.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <aside class="w-full lg:w-80 shrink-0 space-y-5">
      <div class="bg-white border border-gray-200 rounded-2xl p-5">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Install</h3>
        <div class="relative group">
          <div class="bg-slate-900 rounded-xl px-4 py-3 font-mono text-sm text-slate-100 overflow-x-auto">
            <span class="text-slate-500 select-none">$ </span>zig fetch --save <span class="text-yellow-300">git+https://...</span>
          </div>
          <button
            onclick={copyInstall}
            class="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
          >
            {#if copied}
              <svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            {:else}
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            {/if}
          </button>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Links</h3>
        <div class="space-y-2.5">
          <a href="/" class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors">
            <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
            Repository
          </a>
          <a href="/" class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Homepage
          </a>
          <a href="/" class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Documentation
          </a>
          <a href="/" class="flex items-center gap-2.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Report Issue
          </a>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-5">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Stats</h3>
        <div class="space-y-3.5">
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-500">Weekly Downloads</span>
            <span class="text-sm font-bold text-slate-900">12,842</span>
          </div>
          <div class="w-full h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-end gap-px px-1 pb-1">
            {#each [30, 45, 35, 60, 50, 70, 65, 80, 55, 75, 90, 85, 95, 88, 78, 92, 100] as h (h)}
              <div class="flex-1 bg-yellow-400/80 rounded-sm" style="height: {h}%"></div>
            {/each}
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Stars</span>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              <span class="text-sm font-bold text-slate-900">2,348</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Forks</span>
            <span class="text-sm font-bold text-slate-900">186</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Open Issues</span>
            <span class="text-sm font-bold text-slate-900">23</span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-5">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Details</h3>
        <div class="space-y-3.5">
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-500">Version</span>
            <span class="text-sm font-semibold text-slate-900">0.7.0</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">License</span>
            <span class="text-sm font-semibold text-slate-900">MIT</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Min Zig Version</span>
            <span class="text-sm font-semibold text-slate-900">0.13.0</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Last Updated</span>
            <span class="text-sm font-semibold text-slate-900">2 days ago</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Published</span>
            <span class="text-sm font-semibold text-slate-900">8 months ago</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Total Files</span>
            <span class="text-sm font-semibold text-slate-900">42</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span class="text-sm text-slate-500">Unpacked Size</span>
            <span class="text-sm font-semibold text-slate-900">284 kB</span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-5">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Maintainers</h3>
        <div class="space-y-3">
          {#each [
            { name: 'andrewrk', avatar: 'A' },
            { name: 'kubkon', avatar: 'K' },
            { name: 'ifreund', avatar: 'I' },
          ] as person (person.name)}
            <a href="/packages?maintainer={person.name}" class="flex items-center gap-3 group">
              <div class="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold">{person.avatar}</div>
              <span class="text-sm font-medium text-slate-700 group-hover:text-yellow-600 transition-colors">{person.name}</span>
            </a>
          {/each}
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-5">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Keywords</h3>
        <div class="flex flex-wrap gap-2">
          {#each ['networking', 'tcp', 'udp', 'tls', 'async', 'sockets', 'io', 'cross-platform'] as keyword (keyword)}
            <a href="/packages?keyword={keyword}" class="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-50 text-slate-600 border border-gray-100 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200 transition-colors">{keyword}</a>
          {/each}
        </div>
      </div>

    </aside>
  </div>
</div>
