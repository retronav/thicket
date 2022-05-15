/**
 * Checks if a given URL is ambiguous.
 * Example: 'foo-bar' is ambiguous, but './foo-bar' is not.
 * @param url The URL to check.
 * @returns True if the URL is ambiguous, false otherwise.
 */
export const isAmbiguousUrl = (url: string) =>
  !(url.startsWith('/') && url.startsWith('./') && url.startsWith('../'));
