/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette based on the reference design
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fbd7ac',
          300: '#f8bb77',
          400: '#f59440',
          500: '#f37316', // Main orange color from the design
          600: '#e45a0c',
          700: '#bd450c',
          800: '#973612',
          900: '#7a2e12',
        },
        dark: {
          900: '#0f172a', // Main dark background
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        }
      },
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'rgb(226 232 240)',
            '--tw-prose-headings': 'rgb(248 250 252)',
            '--tw-prose-lead': 'rgb(203 213 225)',
            '--tw-prose-links': 'rgb(243 115 22)',
            '--tw-prose-bold': 'rgb(248 250 252)',
            '--tw-prose-counters': 'rgb(156 163 175)',
            '--tw-prose-bullets': 'rgb(75 85 99)',
            '--tw-prose-hr': 'rgb(55 65 81)',
            '--tw-prose-quotes': 'rgb(248 250 252)',
            '--tw-prose-quote-borders': 'rgb(55 65 81)',
            '--tw-prose-captions': 'rgb(156 163 175)',
            '--tw-prose-code': 'rgb(248 250 252)',
            '--tw-prose-pre-code': 'rgb(226 232 240)',
            '--tw-prose-pre-bg': 'rgb(17 24 39)',
            '--tw-prose-th-borders': 'rgb(55 65 81)',
            '--tw-prose-td-borders': 'rgb(31 41 55)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
