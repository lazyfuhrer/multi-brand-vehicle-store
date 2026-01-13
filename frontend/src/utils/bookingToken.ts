/**
 * Utility functions for managing booking token in localStorage
 * The booking token is used to scope bookings to a specific browser/client
 */

const BOOKING_TOKEN_KEY = 'booking_token';

/**
 * Get the booking token from localStorage
 * @returns The booking token or null if not found
 */
export const getBookingToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(BOOKING_TOKEN_KEY);
};

/**
 * Save the booking token to localStorage
 * @param token The booking token to save
 */
export const saveBookingToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BOOKING_TOKEN_KEY, token);
};

/**
 * Remove the booking token from localStorage
 */
export const clearBookingToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(BOOKING_TOKEN_KEY);
};

/**
 * Check if a booking token exists
 * @returns True if token exists, false otherwise
 */
export const hasBookingToken = (): boolean => {
  return getBookingToken() !== null;
};
