'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { LogFormData } from '@/lib/validations/logs';

import { logService } from '../services/logService';
import { useSessionStore } from '@/stores/session';

export function useLogs() {
    type Log = {
        id: string;
        title?: string | null;
        tasks?: string | null;
        date?: string | null;
    };

    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSessionStore();
    const userId = user?.id;

    const fetchLogs = useCallback(async () => {
        if (!userId) {
            setLogs([]);
            return;
        }

        try {
            setLoading(true);
            const data = await logService.getLogs({ userId });
            setLogs(data as Log[]);
        } catch {
            toast.error('Failed to load logs');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    async function createLog(values: LogFormData) {
        if (!userId) {
            toast.error('You must be signed in to create logs');
            return;
        }

        try {
            await logService.createLog({ userId, data: values });
            toast.success('Log created');
            fetchLogs();
        } catch {
            toast.error('Failed to create log');
        }
    }

    useEffect(() => {
        void fetchLogs();
    }, [fetchLogs]);

    return { logs, loading, createLog };
}
