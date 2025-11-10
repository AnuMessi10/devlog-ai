'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Project } from '@prisma/client';

import type { ProjectFormData } from '@/lib/schemas/project';
import { projectService } from '@/services/projects';
import { useSessionStore } from '@/stores/session';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSessionStore();
    const userId = user?.id;

    const fetchProjects = useCallback(async () => {
        if (!userId) {
            setProjects([]);
            return;
        }

        try {
            setIsLoading(true);
            const data = await projectService.getProjects({ userId });
            setProjects(data);
        } catch {
            toast.error('Failed to load projects');
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const createProject = useCallback(
        async (values: ProjectFormData) => {
            if (!userId) {
                toast.error('You must be signed in to create projects');
                return;
            }

            try {
                await projectService.createProject({ userId, data: values });
                toast.success('Project created');
                void fetchProjects();
            } catch {
                toast.error('Failed to create project');
            }
        },
        [fetchProjects, userId]
    );

    useEffect(() => {
        void fetchProjects();
    }, [fetchProjects]);

    return { projects, isLoading, createProject };
}
