/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 8px)',
        md: 'calc(var(--radius) - 4px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.06)',
        elevated: '0 4px 16px rgba(0, 0, 0, 0.10)',
        green: '0 4px 12px rgba(45, 90, 61, 0.30)',
        gold: '0 4px 12px rgba(245, 166, 35, 0.30)',
      },
      animation: {
        'scan-line': 'scanLine 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'fade-in-chip': 'fadeInChip 0.4s ease forwards',
        'float-up': 'floatUp 0.6s ease forwards',
        'spin-slow': 'spin-slow 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};