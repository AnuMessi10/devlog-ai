// tailwind.config.ts
import type { Config } from 'tailwindcss';

import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            // ============================================
            // COLORS - Define once, use everywhere
            // ============================================
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                // Primary (Deep Blue)
                primary: {
                    50: '#e6f0ff',
                    100: '#b3d4ff',
                    200: '#80b8ff',
                    300: '#4d9cff',
                    400: '#1a80ff',
                    500: '#0066e6',
                    600: '#0052b3',
                    700: '#003d80',
                    800: '#00284d',
                    900: '#00141a',
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                // Accent (Electric Cyan)
                accent: {
                    50: '#e6ffff',
                    100: '#b3ffff',
                    200: '#80ffff',
                    300: '#4dffff',
                    400: '#1affff',
                    500: '#00e6e6',
                    600: '#00b3b3',
                    700: '#008080',
                    800: '#004d4d',
                    900: '#001a1a',
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-tertiary': 'var(--text-tertiary)',
                // Semantic colors
                success: {
                    50: '#e6fff5',
                    500: '#00cc88',
                    700: '#008855',
                    DEFAULT: '#00cc88',
                },
                warning: {
                    50: '#fff8e6',
                    500: '#ffaa00',
                    700: '#cc8800',
                    DEFAULT: '#ffaa00',
                },
                error: {
                    50: '#ffe6e6',
                    500: '#ff3333',
                    700: '#cc0000',
                    DEFAULT: '#ff3333',
                },
                info: {
                    50: '#e6f5ff',
                    500: '#3399ff',
                    700: '#0066cc',
                    DEFAULT: '#3399ff',
                },
            },

            // ============================================
            // TYPOGRAPHY
            // ============================================
            fontFamily: {
                display: ['Orbitron', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25' }],
                sm: ['0.875rem', { lineHeight: '1.5' }],
                base: ['1rem', { lineHeight: '1.5' }],
                lg: ['1.125rem', { lineHeight: '1.75' }],
                xl: ['1.25rem', { lineHeight: '1.75' }],
                '2xl': ['1.5rem', { lineHeight: '1.75' }],
                '3xl': ['1.875rem', { lineHeight: '1.25' }],
                '4xl': ['2.25rem', { lineHeight: '1.25' }],
            },

            // ============================================
            // SPACING (use Tailwind defaults mostly)
            // ============================================
            spacing: {
                // Add any custom spacing if needed
            },

            // ============================================
            // BORDERS
            // ============================================
            borderRadius: {
                sm: '0.25rem',
                DEFAULT: '0.5rem',
                md: '0.5rem',
                lg: '0.75rem',
                xl: '1rem',
                '2xl': '1.5rem',
                full: '9999px',
            },

            // ============================================
            // SHADOWS
            // ============================================
            boxShadow: {
                sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.07)',
                md: '0 4px 6px rgba(0, 0, 0, 0.07)',
                lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
                xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
            },

            // ============================================
            // ANIMATIONS
            // ============================================
            animation: {
                'fade-in': 'fadeIn 200ms ease-in-out',
                'slide-in': 'slideIn 200ms ease-in-out',
                'slide-up': 'slideUp 200ms ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [tailwindcssAnimate],
};

export default config;
