'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { ProjectFormData } from '@/lib/validations/project';

import { projectService } from '../services/projectService';
import { useSessionStore } from '@/stores/session';

export function useProjects() {
    type Project = {
        id: string;
        name: string;
        description?: string | null;
        color?: string | null;
        emoji?: string | null;
    };

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSessionStore();
    const userId = user?.id;

    const fetchProjects = useCallback(async () => {
        if (!userId) {
            setProjects([]);
            return;
        }

        try {
            setLoading(true);
            const data = await projectService.getProjects({ userId });
            setProjects(data as Project[]);
        } catch {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    async function createProject(values: ProjectFormData) {
        if (!userId) {
            toast.error('You must be signed in to create projects');
            return;
        }

        try {
            await projectService.createProject({ userId, data: values });
            toast.success('Project created');
            fetchProjects();
        } catch {
            toast.error('Failed to create project');
        }
    }

    useEffect(() => {
        void fetchProjects();
    }, [fetchProjects]);

    return { projects, loading, createProject };
}
