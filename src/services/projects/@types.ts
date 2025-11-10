import type { Project } from '@prisma/client';

import type { ProjectFormData } from '@/lib/validations/project';

export type RemoteUrl = `http${string}`;

export type GetProjectsArgs = {
    userId: string;
    remotePath?: string;
};

export type CreateProjectArgs = {
    userId: string;
    data: ProjectFormData;
    remotePath?: string;
};

export type ProjectList = Project[];
