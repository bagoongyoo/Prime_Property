export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        prime: {
          black: "#1A1A1A",
          gold: "#C9A961",
          red: "#B33A3A",
          soft: "#F5F5F5",
          green: "#16A34A",
          purple: "#7C3AED",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0,0,0,0.16)",
        gold: "0 18px 40px rgba(201,169,97,0.18)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(44px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(44px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-14px) translateX(8px)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(16px,-22px,0) rotate(8deg)" },
          "100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "80px 80px" },
        },
      },
      animation: {
        "fade-in": "fadeIn .35s ease-out both",
        "fade-out": "fadeOut .5s ease-out both",
        "fade-up": "fadeUp .55s ease-out both",
        "slide-in-right": "slideInRight .5s cubic-bezier(.22,1,.36,1) both",
        "slide-out-right": "slideOutRight .5s cubic-bezier(.22,1,.36,1) both",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite",
        "grid-move": "gridMove 18s linear infinite",
      },
    },
  },
  plugins: [],
};
