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
        soft: "0 18px 60px rgba(0,0,0,0.12)",
        gold: "0 18px 40px rgba(201,169,97,0.18)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(42px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        softPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.92" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in": "fadeIn .35s ease-out both",
        "fade-up": "fadeUp .55s ease-out both",
        "slide-in-right": "slideInRight .5s cubic-bezier(.22,1,.36,1) both",
        "soft-pulse": "softPulse 2.8s ease-in-out infinite",
        "float-slow": "floatSlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
