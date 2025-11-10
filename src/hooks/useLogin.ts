'use client';

import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import type { LoginFormData } from '@/lib/schemas/auth';

type LoginResult = {
    success: boolean;
    error?: string;
};

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (values: LoginFormData): Promise<LoginResult> => {
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                ...values,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error || 'Invalid credentials. Please try again.');
                return { success: false, error: result.error };
            }

            toast.success('Welcome back! Redirecting you now.');
            return { success: true };
        } catch (error) {
            toast.error('Unable to sign in. Please try again.');
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { login, isLoading };
}
