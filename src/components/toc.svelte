<script lang="ts">
  import type { MarkdownHeader } from '@astrojs/markdown-remark';
  import { onMount } from 'svelte';
  export let headings: MarkdownHeader[] = [];
  let list!: HTMLUListElement;
  let headingsDOM: {
    [slug: string]: HTMLElement;
  } = {};
  onMount(() => {
    headings.forEach(
      (heading) =>
        (headingsDOM[heading.slug] = document.querySelector(`#${heading.slug}`))
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          list
            .querySelectorAll('li')
            .forEach((li) => li.classList.remove('active'));
          const id = intersecting[0].target.id;
          list.querySelector(`li[data-slug="${id}"]`).classList.add('active');
        }
      },
      {
        root: null,
        // Capture intersect when it crosses 80vh from bottom toward top
        rootMargin: '0% 0% -80%',
        threshold: 1,
      }
    );
    Object.values(headingsDOM).forEach((heading) => {
      observer.observe(heading)
    });
  });
</script>

{#if headings.length > 0}
  <ul class="headings-list" bind:this={list}>
    {#each headings as { slug, text, depth }, i}
      <li data-slug={slug} class={`depth-${depth}`} class:active={i === 0}>
        <a href={`#${slug}`}>{text}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p class="no-headings ml-2">No headings :(</p>
{/if}

<style lang="scss" global>
  ul.headings-list {
    @apply list-none w-9/10 p-0 ml-2;
    li {
      @apply p-1 pl-2 rounded-tr-generic rounded-br-generic cursor-pointer border-solid border-0 border-l-2 border-transparent;
      @apply hover:(bg-secondary-500 bg-opacity-20 border-secondary-700);
      &.active {
        @apply bg-secondary-700 bg-opacity-20 border-secondary-700;
      }
      &.depth-2 {
        @apply pl-4;
      }
      &.depth-3 {
        @apply pl-6;
      }
      &.depth-4 {
        @apply pl-8;
      }
      &.depth-5,
      &.depth-6 {
        @apply pl-10;
      }
      a {
        @apply no-underline text-current w-full inline-block;
      }
    }
  }
</style>
