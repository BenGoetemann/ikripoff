export default {
  theme: {
    extend: {
      colors: {
        background: "#FCFCFC",
        primary: "#FAB716",
        secondary: "#1770FF",
        attention: "#EA3323",
        borders: "#EBEBEB",
        decent: "#C1C1C1",
      },
      borderRadius: {
        subtile: "3px",
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
