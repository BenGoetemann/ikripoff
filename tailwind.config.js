export default {
  theme: {
    extend: {
      colors: {
        background: "#000000",
        primary: "#00DB95",
        secondary: "#007650",
        tertiary: "#002418",
        attention: "#EA3323",
        borders: "#1E1E1E",
        decent: "#4D4D4D",
      },
      borderRadius: {
        subtile: "0px",
        prominent: "12px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
  ],
};
