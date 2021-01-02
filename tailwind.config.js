module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'maxmd': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      },  
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
