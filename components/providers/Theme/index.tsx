// components/providers/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const getInitialTheme = (): Theme => {
        if (typeof window === 'undefined') {
            return 'system';
        }

        const savedTheme = localStorage.getItem('theme') as Theme | null;
        return savedTheme ?? 'system';
    };

    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
    const getSystemTheme = (): 'light' | 'dark' => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);
    const resolvedTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            setSystemTheme(event.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        root.setAttribute('data-theme', resolvedTheme);
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [resolvedTheme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
