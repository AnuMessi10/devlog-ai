// components/ui/theme-toggle.tsx
'use client';

import { useTheme } from '@/components/providers/theme';
import { Button } from '@/components/ui/button';
import { Monitor, Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun className="h-5 w-5" />;
            case 'dark':
                return <Moon className="h-5 w-5" />;
            case 'system':
                return <Monitor className="h-5 w-5" />;
        }
    };

    const getLabel = () => {
        switch (theme) {
            case 'light':
                return 'Light mode';
            case 'dark':
                return 'Dark mode';
            case 'system':
                return 'System theme';
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={getLabel()}
            title={getLabel()}
            className="transition-transform hover:scale-110"
        >
            {getIcon()}
        </Button>
    );
}

// Alternative: Dropdown version
export function ThemeToggleDropdown() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex gap-1 rounded-lg bg-secondary p-1 shadow-sm transition-colors">
            <Button
                variant={theme === 'light' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme('light')}
                className="gap-2"
            >
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Light</span>
            </Button>
            <Button
                variant={theme === 'dark' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme('dark')}
                className="gap-2"
            >
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Dark</span>
            </Button>
            <Button
                variant={theme === 'system' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme('system')}
                className="gap-2"
            >
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">System</span>
            </Button>
        </div>
    );
}
