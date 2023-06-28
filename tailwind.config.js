/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ], theme: {
        extend: {
            aspectRatio: {
                '4/3': '1 / 1.414',
            },
        },
    },
    plugins: [],
}

