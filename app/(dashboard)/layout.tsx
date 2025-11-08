import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { ThemeToggle } from '@/components/ui/theme/toggle';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            <header className="border-b border-border bg-card/60 backdrop-blur">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                            Signed in as
                        </span>
                        <span className="text-base font-semibold">
                            {session.user.name ?? session.user.email}
                        </span>
                    </div>
                    <ThemeToggle />
                </div>
            </header>
            <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
        </div>
    );
}
