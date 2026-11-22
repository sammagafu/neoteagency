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
                    DEFAULT: '#0a0a0a',
                    soft: '#1a1a1a',
                },
                paper: {
                    DEFAULT: '#f7f7f5',
                    deep: '#ecece8',
                },
                mist: '#6f6f6c',
                accent: {
                    DEFAULT: '#e23b1c',
                    deep: '#b92d14',
                    soft: '#fde8e3',
                },
            },
            fontFamily: {
                sans: ['Ample Soft Pro', ...defaultTheme.fontFamily.sans],
                display: ['Ample Soft Pro', ...defaultTheme.fontFamily.sans],
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
