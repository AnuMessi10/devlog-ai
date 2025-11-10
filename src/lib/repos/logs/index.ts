import { prisma } from '@/lib/prisma';
import type { CreateLogInput } from '@/lib/schemas/logs';

export const logsRepo = {
    async findAll(userId: string) {
        return prisma.log.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    },

    async create(userId: string, data: CreateLogInput) {
        const { projectId, date, ...rest } = data;

        return prisma.log.create({
            data: {
                ...rest,
                userId,
                projectId,
                date: date ? new Date(date) : undefined,
            },
        });
    },
};
