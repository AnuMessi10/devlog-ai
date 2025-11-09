'use server';

import type { LogFormData } from '@/lib/validations/logs';

import { client } from '@/lib/http/client';
import { logsRepo } from '@/lib/repos/logs';

type GetLogsArgs = {
    userId: string;
    remotePath?: string;
};

type CreateLogArgs = {
    userId: string;
    data: LogFormData;
    remotePath?: string;
};

const isRemotePath = (path?: string) => Boolean(path && /^https?:\/\//i.test(path));

export const logService = {
    async getLogs({ userId, remotePath }: GetLogsArgs) {
        if (isRemotePath(remotePath)) {
            const { data } = await client().get(remotePath);
            return data;
        }

        return logsRepo.findAll(userId);
    },
    async createLog({ userId, data, remotePath }: CreateLogArgs) {
        if (isRemotePath(remotePath)) {
            const { data: response } = await client().post(remotePath, data);
            return response;
        }

        return logsRepo.create(userId, data);
    },
};
