import type { Log } from '@prisma/client';

import type { LogFormData } from '@/lib/schemas/logs';

export type RemoteUrl = `http${string}`;

export type GetLogsArgs = {
    userId: string;
    remotePath?: string;
};

export type CreateLogArgs = {
    userId: string;
    data: LogFormData;
    remotePath?: string;
};

export type LogList = Log[];
