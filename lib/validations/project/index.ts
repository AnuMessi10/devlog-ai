// lib/validations/project.ts
import { z } from 'zod';

export const projectSchema = z.object({
    name: z.string().min(1, 'Project name is required').max(100),
    description: z.string().optional(),
    color: z
        .string()
        .regex(/^#[0-9A-F]{6}$/i)
        .optional(),
    emoji: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
