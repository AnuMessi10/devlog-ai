import { prisma } from '@/lib/prisma';
import { CreateProjectInput } from '@/lib/schemas/project';

export const projectsRepo = {
    async findAll(userId: string) {
        return prisma.project.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    },

    async create(userId: string, data: CreateProjectInput) {
        return prisma.project.create({
            data: { ...data, userId },
        });
    },
};
