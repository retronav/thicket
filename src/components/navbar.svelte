<script lang="ts">
  import Sidebar from '../components/sidebar.svelte';
  import Search from '../components/search.svelte';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  export let title: string = '';

  export let sidebarProps = {};
  export let searchProps = {};
  export let linkPrefix = '/';

  let visible = writable(false);
  let visibleClass = false;

  visible.subscribe((v) => (visibleClass = v));

  onMount(() => {
    const body = document.body;

    visible.subscribe((val) => {
      if (val) {
        body.style.position = 'fixed';
        body.style.top = `-${window.scrollY}px`;
        body.classList.add('sidebar-open');
      } else if (body.classList.contains('sidebar-open')) {
        body.style.removeProperty('position');
        body.style.removeProperty('top');
        body.classList.remove('sidebar-open');
      }
    });
  });

  function toggleAside() {
    visible.update((v) => !v);
  }
</script>

<nav>
  <section class="title">
    <p><a href={linkPrefix}>{title}</a></p>
    <button class="expand" on:click={toggleAside}> &equiv; </button>
  </section>
  <aside class:visible={visibleClass}>
    <Search {...searchProps} />
    <Sidebar {...sidebarProps} />
  </aside>
</nav>

<style lang="scss">
  nav {
    @apply px-4 py-2;
  }
  section.title {
    @apply mb-2 flex h-[3rem] flex-row place-content-between items-center;
    p {
      @apply text-2xl;
      a,
      a:visited {
        @apply text-current;
      }
    }
    button.expand {
      @apply sm:hidden bg-secondary-500 border-solid border-secondary-700 dark:text-text-secondary-dark text-text-secondary-dark border-2 rounded-generic w-8 h-8 text-2xl;
    }
  }
  aside {
    @apply <sm:(hidden bg-light-200 dark:bg-dark-600 mt-[3rem] top-0 left-0 h-[calc(100%-3rem)] w-full p-2 overflow-y-auto);
    &.visible {
      @apply <sm:(block fixed);
    }
    :global(.search) {
      @apply relative pb-2;
      :global(.results) {
        @apply z-900 absolute mt-2 max-h-[30vh] w-full;
        :global(.search-result-item) {
          @apply m-0 border-0;
        }
      }
    }
  }
</style>
