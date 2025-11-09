import { z } from 'zod';

export const logFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    tasks: z.string().optional(),
    date: z.string().optional(),
});

export type LogFormData = z.infer<typeof logFormSchema>;

export type CreateLogInput = LogFormData;
