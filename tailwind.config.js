/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./designSystem/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        foreground: "hsl(var(--color-text-primary))",
        primary: "hsl(var(--color-primary))",
        secondary: "hsl(var(--color-secondary))",
        accent: "hsl(var(--color-accent))",
        "accent-foreground": "hsl(var(--color-accent-foreground))",
        input: "hsl(var(--color-input))",

        success: "hsl(var(--color-success))",
        error: "hsl(var(--color-error))",
        background: {
          DEFAULT: "hsl(var(--color-background-primary))",
          secondary: "hsl(var(--color-background-secondary))",
          skeleton: "hsl(var(--color-black) / 0.1)",
        },
        badge: {
          "active-border": "hsl(var(--color-badge-active-border))",
          "active-background": "hsl(var(--color-badge-active-background))",
          "active-foreground": "hsl(var(--color-badge-active-foreground))",
          "inactive-border": "hsl(var(--color-badge-inactive-border))",
          "inactive-background": "hsl(var(--color-badge-inactive-background))",
          "inactive-foreground": "hsl(var(--color-badge-inactive-foreground))",
          "expired-border": "hsl(var(--color-badge-expired-border))",
          "expired-background": "hsl(var(--color-badge-expired-background))",
          "expired-foreground": "hsl(var(--color-badge-expired-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--color-border))",
          secondary: "hsl(var(--color-border-secondary))",
        },
        button: {
          DEFAULT: "hsl(var(--color-button-primary))",
          secondary: "hsl(var(--color-button-secondary))",
          tertiary: "hsl(var(--color-button-tertiary))",
          foreground: "hsl(var(--color-button-foreground))",
          "progress-bar": "hsl(var(--color-button-progress-bar))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-white))",
        },
        text: {
          DEFAULT: "hsl(var(--color-text-primary))",
          primary: "hsl(var(--color-text-primary))",
          secondary: "hsl(var(--color-text-secondary))",
          tertiary: "hsl(var(--color-text-tertiary))",
          quaternary: "hsl(var(--color-text-quaternary))",
          menu: "hsl(var(--color-text-menu))",
          "muted-foreground": "hsl(var(--color-text-muted-foreground))",
          "popover-foreground": "hsl(var(--color-text-popover-foreground))",
          "sidebar-foreground": "hsl(var(--color-text-sidebar-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent) / 0.19)",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
      screens: {
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addVariant }) {
      addVariant("lm-theme", ".lm-theme &"); // Add colorful variant
    },
  ],
};
