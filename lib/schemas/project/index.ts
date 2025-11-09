import { z } from 'zod';

export const projectFormSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    color: z.string().optional(),
    emoji: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export type CreateProjectInput = ProjectFormData;
