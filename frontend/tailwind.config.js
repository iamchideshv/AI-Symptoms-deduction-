/** @type {import('tailwindcss').Config} */

function svgToDataUri(svg) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function flattenColorPalette(colors) {
    const result = {};
    Object.keys(colors).forEach((key) => {
        if (typeof colors[key] === "object") {
            Object.keys(colors[key]).forEach((subKey) => {
                const colorKey = subKey === "DEFAULT" ? key : `${key}-${subKey}`;
                result[colorKey] = colors[key][subKey];
            });
        } else {
            result[key] = colors[key];
        }
    });
    return result;
}

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                    50: '#f0f9fa',
                    100: '#d0f1f4',
                    200: '#aedde5',
                    300: '#7bc9d6',
                    400: '#48b5c7',
                    500: '#0e7490',
                    600: '#155e75',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "spotlight-new": "spotlight-new 7s ease-in-out infinite",
                "fade-in": "fade-in 0.5s ease-out forwards",
            },
            keyframes: {
                "spotlight-new": {
                    "0%, 100%": { transform: "translateY(-350px) rotate(-45deg) translateX(0)" },
                    "50%": { transform: "translateY(-350px) rotate(-45deg) translateX(100px)" },
                },
                "fade-in": {
                    "0%": { opacity: 0, transform: "translateY(10px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [
        function ({ addVariant, addUtilities, matchUtilities, theme }) {
            matchUtilities(
                {
                    "bg-grid": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                },
                { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
            );
        },
    ],
}
