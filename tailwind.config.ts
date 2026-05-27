import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "thermo-bg": "#FFFFFF",
        "thermo-surface": "#F8F9FA",
        "thermo-blue": "#38BDF8",
        "thermo-green": "#10B981",
        "thermo-dark": "#1F2937",
      },
      backdropBlur: {
        md: "16px",
      },
      borderColor: {
        DEFAULT: "#E5E7EB",
      },
      boxShadow: {
        panel: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
