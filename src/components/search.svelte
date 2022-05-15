<script lang="ts">
  import type Fuse from 'fuse.js';
  import { SearchData } from '../core/types';
  import SearchResult from './search-result.svelte';
  import { debounce } from 'throttle-debounce';
  import { onMount } from 'svelte';

  export let data: SearchData[];
  export let options: Fuse.IFuseOptions<SearchData>;
  export let placeholder = 'Search for something...';
  export let limit = 10;

  let query = '';
  let results: Fuse.FuseResult<SearchData>[] = [];
  let searcher: Fuse<SearchData>;

  onMount(async () => {
    const Fuse = (await import('fuse.js')).default;
    searcher = new Fuse<SearchData>(data, {
      threshold: 0.4,
      ...options,
      shouldSort: true,
      includeScore: true,
      minMatchCharLength: 2,
      keys: ['name', 'headings.text'],
    });
  });

  const handleInput = debounce(500, (e: Event) => {
    query = (e.target as HTMLInputElement).value;
    if (searcher) results = searcher.search(query, { limit });
  });
</script>

<section class="search">
  <input type="search" on:input={handleInput} {placeholder} />
  <section class="results">
    {#if results.length === 0 && query.length > 0}
      <SearchResult result={null} />
    {:else}
      {#each results as result}
        <SearchResult {result} />
      {/each}
    {/if}
  </section>
</section>

<style lang="scss">
  input {
    @apply bg-light-200 dark:bg-dark-100  dark:text-light-100 rounded-generic focus:border-secondary-500 border-secondary-700 w-full max-w-full border-2 border-solid p-1 text-lg outline-transparent;
  }
</style>
