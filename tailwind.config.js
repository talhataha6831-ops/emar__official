module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        emar: {
          obsidian: "#08080A",
          card: "#121215",
          border: "#262218",
          gold: "#D4AF37",
          "gold-light": "#E5C158",
          champagne: "#F5E6C8",
          ivory: "#F7F5F0",
          silver: "#A1A1AA",
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212,175,55,0.15)',
        'gold-subtle': '0 4px 20px rgba(212,175,55,0.08)',
      }
    }
  },
  plugins: [],
}
