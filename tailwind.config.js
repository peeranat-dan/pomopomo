module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        thai: ['IBM Plex Sans Thai', 'san-serif']
      },
      colors: {
        'background': '#f5f5f5',
        'primary': {
          50: '#cfdfd7',
          100: '#5F937A',
          200: '#56846e',
          300: '#4c7662',
          400: '#436755',
          500: '#395849',
          600: '#304a3d',
          700: '#263b31',
          800: '#1c2c25',
          900: '#090f0c'
        },
        'secondary': {
          100: '#656194',
          200: '#5b5785',
          300: '#514e76',
        },
        'timerMain': {
          100:'#c1745f',
          200: '#ae6856',
          300: '#9a5d4c'
        },
        'backlog': '#d1ddcc',
        'wip': '#ffeedf',
        'done': '#faf7ff',
      }
    },
  },
  plugins: [],
}