module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}", // if using Next.js 13+ app dir
    ],
    theme: {
        extend: {
            fontFamily: {
                /* Tailwind class `font-sans` → Arimo */
                sans: ['var(--font-arimo)'],

                /* Tailwind class `font-serif` → Bodoni Moda */
                serif: ['var(--font-bodoni)'],
            },
        },
    },
    plugins: [],
}