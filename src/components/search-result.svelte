<script lang="ts">
  import Fuse from 'fuse.js';
  import { SearchData } from '../core/types';
  export let result: Fuse.FuseResult<SearchData>;

  // Split the text into normal and highlighted parts.
  function getHighlightedParts(
    text: string,
    indices: Fuse.RangeTuple[]
  ): { type: 'normal' | 'highlighted'; text: string }[] {
    const parts = [];
    let currentIndex = 0;
    for (const [start, end] of indices) {
      parts.push({ type: 'normal', text: text.substring(currentIndex, start) });
      parts.push({ type: 'highlighted', text: text.substring(start, end + 1) });
      currentIndex = end + 1;
    }
    parts.push({ type: 'normal', text: text.substring(currentIndex) });
    return parts.filter((part) => part.text.length > 0);
  }

  function matchToURL(
    result: Fuse.FuseResult<SearchData>,
    match: Fuse.FuseResultMatch
  ) {
    let url = result.item.path;
    if (match.key === 'headings.text') {
      const heading = result.item.headings.find((h) => h.text === match.value);
      if (heading && Object.hasOwn(heading, 'slug'))
        url +=
          '#' + result.item.headings.find((h) => h.text === match.value).slug;
    }
    return url;
  }
</script>

{#if !result}
  <div class="search-result-item">
    <h3>No results found.</h3>
  </div>
{:else}
  {#each result.matches as match}
    <div class="search-result-item">
      <span
        class="result-type"
        role="presentation"
        title={match.key === 'name' ? 'Page' : 'Heading'}
        >{match.key === 'name' ? '🔗' : '#️⃣'}</span
      >
      <a href={matchToURL(result, match)}>
        <b>
          {#each getHighlightedParts(match.value, match.indices.slice()) as part}
            {#if part.type === 'normal'}
              {part.text}
            {:else}
              <mark>{part.text}</mark>
            {/if}
          {/each}
        </b>
        <p>{result.item.path}</p>
      </a>
    </div>
  {/each}
{/if}

<style lang="scss">
  .search-result-item {
    @apply rounded-generic border-3 border-secondary-600 bg-secondary-300 hover:bg-secondary-400 focus:bg-secondary-400 focus:border-5 my-2 w-full border-solid p-2;
    @apply dark:bg-secondary-800 dark:border-secondary-600 dark:hover:bg-secondary-900 dark:focus:bg-secondary-900;
    span.result-type {
      @apply float-left mr-2;
    }
    a {
      @apply text-text-secondary-light dark:text-text-secondary-dark;
    }
    p {
      @apply overflow-hidden overflow-ellipsis whitespace-nowrap;
    }
  }
</style>
