import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      listStyleImage: {
        checkmark: 'url("/img/icon/ic_check-bg-blue.png")',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch", // add required value here
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...fontFamily.sans],
      },
      fontSize: {
        xs: ["12px", "16.8px"],
        sm: ["14px", "21px"],
        md: ["16px", "23.68px"],
        lg: ["20px", "24px"],
        xl: ["24px", "31.2px"],
        "2xl": ["28px", "33.6px"],
        "3xl": ["32px", "39.68px"],
        "4xl": ["40px", "50px"],
        "5xl": ["48px", "60px"],
        "6xl": ["56px", "70px"],
      },
      backgroundImage: {},
      colors: {
        border: "#E8E8E8",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: "#09102B",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: "#767676",
        "light-blue": "#53C3D9",
        surface: "#F7F8FA",
        "oxford-blue": "#062C48",
        "patrick-blue": "#23377D",
        "blue-tint": "#337ABC",
        "blue-tint-10": "#EBF2F8",
        "dark-cornflower-blue": "#2A3D7F",
        "dark-blue": "#113244",
        // brand colors
        instagram: "#dd2a7b",
        twitter: "#00acee",
        facebook: "#1877f2",
        linkedin: "#0077b5",
        opensea: "#2081e2",
        youtube: "#e62117",
        pinterest: "#e60023",
        whatsapp: "#25d366",
        medium: "#00ab6c",
        tiktok: "#ee1d52",
        discord: "#7289da",
        email: "#e54e43",
        soundcloud: "#ff5500",
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "kf_loading_line_inner--1": "kf_loading_line_inner--1 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite",
        "kf_loading_line_inner--2": "kf_loading_line_inner--2 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite",
        "kf_loading_line": "kf_loading_line 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite",
      },
      transitionTimingFunction: {
        css: "ease",
        "css-in": "ease-in",
        "css-out": "ease-out",
        "css-in-out": "ease-in-out",
        "in-sine": "cubic-bezier(0.12, 0, 0.39, 0)",
        "out-sine": "cubic-bezier(0.61, 1, 0.88, 1)",
        "in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",
        "in-quad": "cubic-bezier(0.11, 0, 0.5, 0)",
        "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
        "in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
        "in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
        "in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        "in-quint": "cubic-bezier(0.64, 0, 0.78, 0)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
        "out-circ": "cubic-bezier(0, 0.55, 0.45, 1)",
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
        "in-back": "cubic-bezier(0.36, 0, 0.66, -0.56)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
      transitionDelay: {
        "delay-400": "transition-delay: 400ms;",
        "delay-600": "transition-delay: 600ms;",
        "delay-800": "transition-delay: 800ms;",
        "delay-900": "transition-delay: 900ms;",
        "delay-1000": "transition-delay: 1000ms;",
        "delay-1100": "transition-delay: 1100ms;",
        "delay-1200": "transition-delay: 1200ms;",
        "delay-1300": "transition-delay: 1300ms;",
      },
      keyframes: {
        "kf_loading_line_inner--1": {
          "0%": {
            transform: 'scaleY(0)'
          },
          "25%": {
            transform: "scaleY(1)"
          },
          "100%": {
            transform: "scaleY(1)"
          }
        },
        "kf_loading_line_inner--2": {
          "0%": {
            transform: "scaleY(0)"
          },
          "25%": {
            transform: "scaleY(0)"
          },
          "50%": {
            transform: "scaleY(1)"
          },
          "100%": {
            transform: "scaleY(1)"
          }
        },
        "kf_loading_line": {
          "0%": {
            transform: "scaleY(1)"
          },
          "50%": {
            transform: "scaleY(1)"
          },
          "100%": {
            transform: "scaleY(0)"
          }
        }
      },
      transformOrigin: {
        "0-100": '0% 100%',
        "0-0": '0% 0%',
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
export default config
