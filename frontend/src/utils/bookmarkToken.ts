/**
 * Utility functions for managing bookmark token in localStorage
 * The bookmark token is used to scope bookmarks to a specific browser/client
 */

const BOOKMARK_TOKEN_KEY = 'bookmark_token';

/**
 * Get the bookmark token from localStorage
 * @returns The bookmark token or null if not found
 */
export const getBookmarkToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(BOOKMARK_TOKEN_KEY);
};

/**
 * Save the bookmark token to localStorage
 * @param token The bookmark token to save
 */
export const saveBookmarkToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BOOKMARK_TOKEN_KEY, token);
};

/**
 * Remove the bookmark token from localStorage
 */
export const clearBookmarkToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(BOOKMARK_TOKEN_KEY);
};

/**
 * Check if a bookmark token exists
 * @returns True if token exists, false otherwise
 */
export const hasBookmarkToken = (): boolean => {
  return getBookmarkToken() !== null;
};
