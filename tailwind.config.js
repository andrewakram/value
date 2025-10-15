/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'ambassador-blue': '#192F52',
        'amour': '#F86061',
        'legal-eagle': '#6D758F',
        'thunder': '#4D4D4D',
        'carbon-fiber': '#2E2E2E',
        'carbon': '#333333',
        'snow': '#FFFAFA',
        'arctic-dawn': '#E2E4E7',
        'whiteout': '#FBFBFB',
        'chimney-sweep': '#292E37',
        'vintage-indigo': '#525D73',
        'spotted-snake': '#afd3e1',
        'coronation': '#ECECEC',
        'dull': '#717171',
        'unique-grey': '#C9C9C9',
        'liberty-blue': '#0F172A',
        'pure-purple': '#701A75',
        'rainmaker': '#475569',
        'night-sky': '#292D32'
      }
    },
  },
  plugins: [],
}

