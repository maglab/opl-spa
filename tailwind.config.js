/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        "max-height": "max-height",
        width: "width",
        opacity: "opacity",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadein: "fadein 0.5s ease-in",
        fadeout: "fadeout 0.5 ease-out",
      },
      colors: {
        "hover-grey": "grey-200",
        "bg-grey": "#f5f5f5",
        "theme-blue": "#4675CE",
        "theme-blue-light": "#1976d21c",
        "theme-blue-shade": "#1A2C4D",
        secondary: "#1976D2",
        accent: "#B98A31",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
