/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9fa',
                    100: '#d0f1f4',
                    200: '#aedde5',
                    300: '#7bc9d6',
                    400: '#48b5c7',
                    500: '#0e7490',
                    600: '#0c627a',
                    700: '#0a5165',
                    800: '#084050',
                    900: '#062f3b',
                },
            },
        },
    },
    plugins: [],
}
