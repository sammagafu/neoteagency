import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                ink: {
                    DEFAULT: '#10141a',
                    soft: '#1c2430',
                },
                paper: {
                    DEFAULT: '#eef1f4',
                    deep: '#e2e7ed',
                },
                mist: '#6b7583',
                accent: {
                    DEFAULT: '#0f9ea8',
                    deep: '#0b7f87',
                    soft: '#d7f3f5',
                },
            },
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
                display: ['Syne', ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                '7xl': '80rem',
            },
            transitionTimingFunction: {
                agency: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        },
    },

    plugins: [forms],
};
