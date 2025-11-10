import type { Metadata } from 'next';

import { ThemeProvider } from '@/providers/theme';
import { ToastProvider } from '@/providers/toast';

import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'Devlog AI - Developer Logging Tool',
    description: 'Track your coding journey, log your progress, and gain AI-powered insights',
    keywords: ['developer', 'logging', 'productivity', 'coding journal', 'dev tools'],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <ThemeProvider>
                    <ToastProvider />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
