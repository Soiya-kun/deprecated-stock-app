module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ffb300",
          dark: "#CD9000",
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s linear   both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
    screens: {
      "ph-in": { max: "40rem" },
      "ph-out": { min: "40rem" },
    },
    minHeight: {
      content: "calc(100vh - 13rem)",
    },
  },
  plugins: [],
};
