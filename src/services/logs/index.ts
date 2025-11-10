'use server';

import type { Log } from '@prisma/client';

import type { CreateLogArgs, GetLogsArgs, RemoteUrl } from './@types';

import { client } from '@/lib/http/client';
import { logsRepo } from '@/lib/repos/logs';

const isRemotePath = (path?: string): path is RemoteUrl =>
    typeof path === 'string' && /^https?:\/\//i.test(path);

export const logService = {
    async getLogs({ userId, remotePath }: GetLogsArgs): Promise<Log[]> {
        if (isRemotePath(remotePath)) {
            const { data } = await client().get<Log[]>(remotePath);
            return data;
        }

        return logsRepo.findAll(userId);
    },
    async createLog({ userId, data, remotePath }: CreateLogArgs): Promise<Log> {
        if (isRemotePath(remotePath)) {
            const { data: response } = await client().post<Log>(remotePath, data);
            return response;
        }

        return logsRepo.create(userId, data);
    },
};
