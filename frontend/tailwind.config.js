/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Turno-inspired color palette
        turno: {
          primary: '#059669',      // Sophisticated emerald green (eye-pleasing, modern)
          'primary-dark': '#047857', // Darker emerald for hover states
          'primary-light': '#D1FAE5', // Light emerald for backgrounds
          'bg-light': '#EDF5F0',   // Light sage green (more visible, complements green text)
          'bg-subtle': '#F5FAF7',  // Subtle sage green for hover states
          'card-bg': '#FFFFFF',    // Pure white for cards (clean contrast)
          'bg-warm': '#F3F9F6',    // Alternative sage-tinted background
          secondary: '#3B82F6',    // Blue for secondary actions
          'secondary-dark': '#2563EB',
          accent: '#F59E0B',       // Amber/orange for highlights
          price: '#0D9488',        // Deep teal for prices (sophisticated, complements green)
          'price-dark': '#0F766E',  // Darker teal for emphasis
          success: '#10B981',      // Success green
          'success-light': '#D1FAE5',
          warning: '#F59E0B',
          error: '#EF4444',
          'error-light': '#FEE2E2',
        },
      },
    },
  },
  plugins: [],
}
