'use client';

import { useEffect } from 'react';

import { Button } from '@/components/button';

type DashboardErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Something went wrong</h2>
                <p className="text-muted-foreground">
                    We couldn’t load your dashboard. Please try again in a moment.
                </p>
            </div>
            <Button onClick={reset}>Try again</Button>
        </div>
    );
}
