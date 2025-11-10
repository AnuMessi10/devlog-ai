import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const registerBaseSchema = loginSchema.extend({
    name: z.string().min(1, 'Name is required'),
});

export const registerSchema = registerBaseSchema
    .extend({
        confirmPassword: z.string().min(8, 'Please confirm your password'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export const registerPayloadSchema = registerBaseSchema;

export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
