'use server';

import type { ProjectFormData } from '@/lib/validations/project';

import { client } from '@/lib/http/client';
import { projectsRepo } from '@/lib/repos/projects';

type GetProjectsArgs = {
    userId: string;
    remotePath?: string;
};

type CreateProjectArgs = {
    userId: string;
    data: ProjectFormData;
    remotePath?: string;
};

const isRemotePath = (path?: string) => Boolean(path && /^https?:\/\//i.test(path));

export const projectService = {
    async getProjects({ userId, remotePath }: GetProjectsArgs) {
        if (isRemotePath(remotePath)) {
            const { data } = await client().get(remotePath);
            return data;
        }

        return projectsRepo.findAll(userId);
    },
    async createProject({ userId, data, remotePath }: CreateProjectArgs) {
        if (isRemotePath(remotePath)) {
            const { data: response } = await client().post(remotePath, data);
            return response;
        }

        return projectsRepo.create(userId, data);
    },
};
