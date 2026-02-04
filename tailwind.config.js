/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#182d59',
          dark: '#424f7a',
          light: '#0e1012',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
        },
        theme: {
          'bg-primary': 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          'bg-tertiary': 'var(--bg-tertiary)',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-tertiary': 'var(--text-tertiary)',
          'accent-primary': 'var(--accent-primary)',
          'accent-secondary': 'var(--accent-secondary)',
          'accent-hover': 'var(--accent-hover)',
          'border': 'var(--border-color)',
          'border-light': 'var(--border-light)',
          'card-bg': 'var(--card-bg)',
          'card-hover': 'var(--card-hover)',
          'code-bg': 'var(--code-bg)',
          'code-text': 'var(--code-text)',
        },
      },
      backgroundColor: {
        'theme-primary': 'var(--bg-primary)',
        'theme-secondary': 'var(--bg-secondary)',
        'theme-card': 'var(--card-bg)',
      },
      textColor: {
        'theme-primary': 'var(--text-primary)',
        'theme-secondary': 'var(--text-secondary)',
      },
      borderColor: {
        'theme': 'var(--border-color)',
      },
    },
  },
  plugins: [],
}
