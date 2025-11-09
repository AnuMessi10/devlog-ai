import { prisma } from '@/lib/db/prisma';
import { CreateLogInput } from '@/lib/schemas/logs';

export const logsRepo = {
    async findAll(userId: string) {
        return prisma.log.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    },

    async create(userId: string, data: CreateLogInput) {
        return prisma.log.create({
            data: { ...data, userId },
        });
    },
};
