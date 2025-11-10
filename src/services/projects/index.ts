'use server';

import type { Project } from '@prisma/client';

import type { CreateProjectArgs, GetProjectsArgs, RemoteUrl } from './@types';

import { client } from '@/lib/http/client';
import { projectsRepo } from '@/lib/repos/projects';

const isRemotePath = (path?: string): path is RemoteUrl =>
    typeof path === 'string' && /^https?:\/\//i.test(path);

export const projectService = {
    async getProjects({ userId, remotePath }: GetProjectsArgs): Promise<Project[]> {
        if (isRemotePath(remotePath)) {
            const { data } = await client().get<Project[]>(remotePath);
            return data;
        }

        return projectsRepo.findAll(userId);
    },
    async createProject({ userId, data, remotePath }: CreateProjectArgs): Promise<Project> {
        if (isRemotePath(remotePath)) {
            const { data: response } = await client().post<Project>(remotePath, data);
            return response;
        }

        return projectsRepo.create(userId, data);
    },
};
