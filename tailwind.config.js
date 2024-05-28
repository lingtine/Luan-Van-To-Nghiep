/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1240px",
        "2xl": "1240px",
      },
      colors: {
        primary: "#EA4335",
        "primary-1": "#363738",
        "primary-2": "#0A0A0A",
        "primary-3": {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        secondary: "#F5F5F5",
        "secondary-2": "#FEFAF1",
        "secondary-3": "#DB4444",
        "secondary-4": "#8AC389",
        "secondary-5": "#FE5E37",
        "secondary-6": "#ECEDEF",
        "color-1": "#FAFAFA",
        "text-secondary": "#7D8184",
        "text-black": "#000000",
        black: "#000",
        white: "#fff",
      },
      backgroundImage: {
        "banner-1": "url('/public/images/banner/iphone-15.jpg')",
      },
      container: {
        center: true,
      },
      borderWidth: {
        10: "10px",
      },
    },
  },
  plugins: [],
});
