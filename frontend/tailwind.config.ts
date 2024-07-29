import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import flowbite from "flowbite-react/tailwind"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        sm: "400px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    flowbite.plugin(),
    nextui({
      themes: {
        light: {
          colors: {
            success: {
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#ffeead",
              foreground: "#000000",
            }
          },
        },
        dark: {},
      },
    }),
  ],
};
export default config;
