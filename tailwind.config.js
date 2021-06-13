module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#69ddff",
        secondary: "#222e50",
        light: "#f8fcda",
        info: "#7596ff",
        browny: "#847577",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled", "active"],
      textColor: ["disabled", "active"],
      borderWidth: ["disabled", "last"],
      borderColor: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
