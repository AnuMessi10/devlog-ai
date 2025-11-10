'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Log } from '@prisma/client';

import type { LogFormData } from '@/lib/validations/logs';
import { logService } from '@/services/logs';
import { useSessionStore } from '@/stores/session';

export function useLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSessionStore();
    const userId = user?.id;

    const fetchLogs = useCallback(async () => {
        if (!userId) {
            setLogs([]);
            return;
        }

        try {
            setIsLoading(true);
            const data = await logService.getLogs({ userId });
            setLogs(data);
        } catch {
            toast.error('Failed to load logs');
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const createLog = useCallback(
        async (values: LogFormData) => {
            if (!userId) {
                toast.error('You must be signed in to create logs');
                return;
            }

            try {
                await logService.createLog({ userId, data: values });
                toast.success('Log created');
                void fetchLogs();
            } catch {
                toast.error('Failed to create log');
            }
        },
        [fetchLogs, userId]
    );

    useEffect(() => {
        void fetchLogs();
    }, [fetchLogs]);

    return { logs, isLoading, createLog };
}
