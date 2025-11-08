// lib/validations/log.ts
import { z } from 'zod';

export const logSchema = z.object({
    title: z.string().optional(),
    projectId: z.string().min(1, 'Project is required'),
    date: z.date().default(() => new Date()),
    tasks: z.string().optional(),
    bugs: z.string().optional(),
    learnings: z.string().optional(),
    nextSteps: z.string().optional(),
    notes: z.string().optional(),
    tags: z.array(z.string()).default([]),
    duration: z.number().int().positive().optional(),
    mood: z.enum(['great', 'good', 'okay', 'bad', 'terrible']).optional(),
});

export type LogFormData = z.infer<typeof logSchema>;
