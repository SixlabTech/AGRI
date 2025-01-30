import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Candara', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

export default config
